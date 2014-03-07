Clazz.declarePackage ("org.jmol.adapter.readers.quantum");
Clazz.load (["org.jmol.adapter.readers.quantum.MOReader"], "org.jmol.adapter.readers.quantum.GamessReader", ["java.lang.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.api.JmolAdapter", "org.jmol.util.ArrayUtil", "$.Logger", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atomNames = null;
this.calcOptions = null;
this.isTypeSet = false;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.quantum, "GamessReader", org.jmol.adapter.readers.quantum.MOReader);
Clazz.defineMethod (c$, "readGaussianBasis", 
function (initiator, terminator) {
var gdata =  new java.util.ArrayList ();
this.gaussianCount = 0;
var nGaussians = 0;
this.shellCount = 0;
var thisShell = "0";
var tokens;
this.discardLinesUntilContains (initiator);
this.readLine ();
var slater = null;
var shellsByAtomType =  new java.util.Hashtable ();
var slatersByAtomType =  new java.util.ArrayList ();
var atomType = null;
while (this.readLine () != null && this.line.indexOf (terminator) < 0) {
if (this.line.indexOf ("(") >= 0) this.line = org.jmol.adapter.readers.quantum.GamessReader.fixBasisLine (this.line);
tokens = this.getTokens ();
switch (tokens.length) {
case 1:
if (atomType != null) {
if (slater != null) {
slater[2] = nGaussians;
slatersByAtomType.add (slater);
slater = null;
}shellsByAtomType.put (atomType, slatersByAtomType);
}slatersByAtomType =  new java.util.ArrayList ();
atomType = tokens[0];
break;
case 0:
break;
default:
if (!tokens[0].equals (thisShell)) {
if (slater != null) {
slater[2] = nGaussians;
slatersByAtomType.add (slater);
}thisShell = tokens[0];
this.shellCount++;
slater = [org.jmol.api.JmolAdapter.getQuantumShellTagID (this.fixShellTag (tokens[1])), this.gaussianCount, 0];
nGaussians = 0;
}++nGaussians;
++this.gaussianCount;
gdata.add (tokens);
}
}
if (slater != null) {
slater[2] = nGaussians;
slatersByAtomType.add (slater);
}if (atomType != null) shellsByAtomType.put (atomType, slatersByAtomType);
this.gaussians = org.jmol.util.ArrayUtil.newFloat2 (this.gaussianCount);
for (var i = 0; i < this.gaussianCount; i++) {
tokens = gdata.get (i);
this.gaussians[i] =  Clazz.newFloatArray (tokens.length - 3, 0);
for (var j = 3; j < tokens.length; j++) this.gaussians[i][j - 3] = this.parseFloatStr (tokens[j]);

}
var atomCount = this.atomNames.size ();
if (this.shells == null && atomCount > 0) {
this.shells =  new java.util.ArrayList ();
for (var i = 0; i < atomCount; i++) {
atomType = this.atomNames.get (i);
var slaters = shellsByAtomType.get (atomType);
if (slaters == null) {
org.jmol.util.Logger.error ("slater for atom " + i + " atomType " + atomType + " was not found in listing. Ignoring molecular orbitals");
return;
}for (var j = 0; j < slaters.size (); j++) {
slater = slaters.get (j);
this.shells.add ([i, slater[0], slater[1], slater[2]]);
}
}
}if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug (this.shellCount + " slater shells read");
org.jmol.util.Logger.debug (this.gaussianCount + " gaussian primitives read");
}}, "~S,~S");
Clazz.defineMethod (c$, "readFrequencies", 
function () {
this.discardLinesUntilContains ("FREQUENCY:");
var haveFreq = false;
while (this.line != null && this.line.indexOf ("FREQUENCY:") >= 0) {
var frequencyCount = 0;
var tokens = this.getTokens ();
var frequencies =  Clazz.newFloatArray (tokens.length, 0);
for (var i = 0; i < tokens.length; i++) {
var frequency = this.parseFloatStr (tokens[i]);
if (tokens[i].equals ("I")) frequencies[frequencyCount - 1] = -frequencies[frequencyCount - 1];
if (Float.isNaN (frequency)) continue;
frequencies[frequencyCount++] = frequency;
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ((this.vibrationNumber + 1) + " frequency=" + frequency);
}}
var red_masses = null;
var intensities = null;
this.readLine ();
if (this.line.indexOf ("MASS") >= 0) {
red_masses = this.getTokens ();
this.readLine ();
}if (this.line.indexOf ("INTENS") >= 0) {
intensities = this.getTokens ();
}var atomCount = this.atomSetCollection.getLastAtomSetAtomCount ();
var iAtom0 = this.atomSetCollection.getAtomCount ();
var ignore =  Clazz.newBooleanArray (frequencyCount, false);
for (var i = 0; i < frequencyCount; i++) {
ignore[i] = !this.doGetVibration (++this.vibrationNumber);
if (ignore[i]) continue;
if (haveFreq) {
this.atomSetCollection.cloneLastAtomSet ();
} else {
haveFreq = true;
iAtom0 -= atomCount;
}this.atomSetCollection.setAtomSetFrequency (null, null, "" + frequencies[i], null);
if (red_masses != null) this.atomSetCollection.setAtomSetModelProperty ("ReducedMass", red_masses[red_masses.length - frequencyCount + i] + " AMU");
if (intensities != null) this.atomSetCollection.setAtomSetModelProperty ("IRIntensity", intensities[intensities.length - frequencyCount + i] + " D^2/AMU-Angstrom^2");
}
this.discardLinesUntilBlank ();
this.fillFrequencyData (iAtom0, atomCount, atomCount, ignore, false, 20, 12, null, 0);
this.readLines (13);
}
});
c$.fixBasisLine = Clazz.defineMethod (c$, "fixBasisLine", 
function (line) {
var pt;
var pt1;
line = line.$replace (')', ' ');
while ((pt = line.indexOf ("(")) >= 0) {
pt1 = pt;
while (line.charAt (--pt1) == ' ') {
}
while (line.charAt (--pt1) != ' ') {
}
line = line.substring (0, ++pt1) + line.substring (pt + 1);
}
return line;
}, "~S");
Clazz.defineMethod (c$, "setCalculationType", 
function () {
if (this.calcOptions == null || this.isTypeSet) return;
this.isTypeSet = true;
var SCFtype = this.calcOptions.get ("contrl_options_SCFTYP");
var Runtype = this.calcOptions.get ("contrl_options_RUNTYP");
var igauss = this.calcOptions.get ("basis_options_IGAUSS");
var gbasis = this.calcOptions.get ("basis_options_GBASIS");
var DFunc = !"0".equals (this.calcOptions.get ("basis_options_NDFUNC"));
var PFunc = !"0".equals (this.calcOptions.get ("basis_options_NPFUNC"));
var FFunc = !"0".equals (this.calcOptions.get ("basis_options_NFFUNC"));
var DFTtype = this.calcOptions.get ("contrl_options_DFTTYP");
var perturb = this.parseIntStr (this.calcOptions.get ("contrl_options_MPLEVL"));
var CItype = this.calcOptions.get ("contrl_options_CITYP");
var CCtype = this.calcOptions.get ("contrl_options_CCTYP");
if (igauss == null && SCFtype == null) return;
if (this.calculationType.equals ("?")) this.calculationType = "";
if (igauss != null) {
if ("0".equals (igauss)) {
var recognized = false;
if (this.calculationType.length > 0) this.calculationType += " ";
if (gbasis.startsWith ("ACC")) this.calculationType += "aug-cc-p";
if (gbasis.startsWith ("CC")) this.calculationType += "cc-p";
if ((gbasis.startsWith ("ACC") || gbasis.startsWith ("CC")) && gbasis.endsWith ("C")) this.calculationType += "C";
if (gbasis.indexOf ("CCD") >= 0) {
this.calculationType += "VDZ";
recognized = true;
}if (gbasis.indexOf ("CCT") >= 0) {
this.calculationType += "VTZ";
recognized = true;
}if (gbasis.indexOf ("CCQ") >= 0) {
this.calculationType += "VQZ";
recognized = true;
}if (gbasis.indexOf ("CC5") >= 0) {
this.calculationType += "V5Z";
recognized = true;
}if (gbasis.indexOf ("CC6") >= 0) {
this.calculationType += "V6Z";
recognized = true;
}if (!recognized) this.calculationType += gbasis;
} else {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += igauss + "-" + org.jmol.util.TextFormat.simpleReplace (gbasis, "N", "");
if ("T".equals (this.calcOptions.get ("basis_options_DIFFSP"))) {
if ("T".equals (this.calcOptions.get ("basis_options_DIFFS"))) this.calculationType += "+";
this.calculationType += "+";
}this.calculationType += "G";
if (DFunc || PFunc || FFunc) {
this.calculationType += "(";
if (FFunc) {
this.calculationType += "f";
if (DFunc || PFunc) this.calculationType += ",";
}if (DFunc) {
this.calculationType += "d";
if (PFunc) this.calculationType += ",";
}if (PFunc) this.calculationType += "p";
this.calculationType += ")";
}}if (DFTtype != null && DFTtype.indexOf ("NONE") < 0) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += DFTtype;
}if (CItype != null && CItype.indexOf ("NONE") < 0) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += CItype;
}if (CCtype != null && CCtype.indexOf ("NONE") < 0) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += CCtype;
}if (perturb > 0) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += "MP" + perturb;
}if (SCFtype != null) {
if (this.calculationType.length > 0) this.calculationType += " ";
this.calculationType += SCFtype + " " + Runtype;
}}});
Clazz.defineMethod (c$, "readControlInfo", 
function () {
this.readCalculationInfo ("contrl_options_");
});
Clazz.defineMethod (c$, "readBasisInfo", 
function () {
this.readCalculationInfo ("basis_options_");
});
Clazz.defineMethod (c$, "readCalculationInfo", 
($fz = function (type) {
if (this.calcOptions == null) {
this.calcOptions =  new java.util.Hashtable ();
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("calculationOptions", this.calcOptions);
}while (this.readLine () != null && (this.line = this.line.trim ()).length > 0) {
if (this.line.indexOf ("=") < 0) continue;
var tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (org.jmol.util.TextFormat.simpleReplace (this.line, "=", " = ") + " ?");
for (var i = 0; i < tokens.length; i++) {
if (!tokens[i].equals ("=")) continue;
try {
var key = type + tokens[i - 1];
var value = (key.equals ("basis_options_SPLIT3") ? tokens[++i] + " " + tokens[++i] + " " + tokens[++i] : tokens[++i]);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug (key + " = " + value);
this.calcOptions.put (key, value);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
}
}, $fz.isPrivate = true, $fz), "~S");
});
