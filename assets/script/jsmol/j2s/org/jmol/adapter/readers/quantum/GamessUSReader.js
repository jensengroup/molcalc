Clazz.declarePackage ("org.jmol.adapter.readers.quantum");
Clazz.load (["org.jmol.adapter.readers.quantum.GamessReader"], "org.jmol.adapter.readers.quantum.GamessUSReader", ["java.lang.Float", "java.util.ArrayList", "org.jmol.util.Logger", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lowdenCharges = false;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.quantum, "GamessUSReader", org.jmol.adapter.readers.quantum.GamessReader);
Clazz.defineMethod (c$, "initializeReader", 
function () {
this.lowdenCharges = this.checkFilterKey ("CHARGE=LOW");
Clazz.superCall (this, org.jmol.adapter.readers.quantum.GamessUSReader, "initializeReader", []);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
var isBohr;
if (this.line.indexOf ("BASIS OPTIONS") >= 0) {
this.readBasisInfo ();
return true;
}if (this.line.indexOf ("$CONTRL OPTIONS") >= 0) {
this.readControlInfo ();
return true;
}if (this.line.indexOf ("ATOMIC BASIS SET") >= 0) {
this.readGaussianBasis ("SHELL TYPE", "TOTAL");
return false;
}if ((isBohr = this.line.indexOf ("COORDINATES (BOHR)") >= 0) || this.line.indexOf ("COORDINATES OF ALL ATOMS ARE (ANGS)") >= 0) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.atomNames =  new java.util.ArrayList ();
if (isBohr) this.readAtomsInBohrCoordinates ();
 else this.readAtomsInAngstromCoordinates ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.indexOf ("FREQUENCIES IN CM") >= 0) {
this.readFrequencies ();
return true;
}if (this.line.indexOf ("SUMMARY OF THE EFFECTIVE FRAGMENT") >= 0) {
this.readEFPInBohrCoordinates ();
return false;
}if (this.line.indexOf ("  TOTAL MULLIKEN AND LOWDIN ATOMIC POPULATIONS") >= 0) {
this.readPartialCharges ();
return false;
}if (this.line.indexOf ("ELECTROSTATIC MOMENTS") >= 0) {
this.readDipoleMoment ();
return true;
}if (this.line.indexOf ("- ALPHA SET -") >= 0) this.alphaBeta = "alpha";
 else if (this.line.indexOf ("- BETA SET -") >= 0) this.alphaBeta = "beta";
 else if (this.line.indexOf ("  EIGENVECTORS") >= 0 || this.line.indexOf ("  INITIAL GUESS ORBITALS") >= 0 || this.line.indexOf ("  MCSCF OPTIMIZED ORBITALS") >= 0 || this.line.indexOf ("  MCSCF NATURAL ORBITALS") >= 0 || this.line.indexOf ("  MOLECULAR ORBITALS") >= 0 && this.line.indexOf ("  MOLECULAR ORBITALS LOCALIZED BY THE POPULATION METHOD") < 0) {
if (!this.filterMO ()) return true;
this.readMolecularOrbitals (1);
return false;
}if (this.line.indexOf ("EDMISTON-RUEDENBERG ENERGY LOCALIZED ORBITALS") >= 0 || this.line.indexOf ("  THE PIPEK-MEZEY POPULATION LOCALIZED ORBITALS ARE") >= 0) {
if (!this.filterMO ()) return true;
this.readMolecularOrbitals (0);
return false;
}if (this.line.indexOf ("  NATURAL ORBITALS IN ATOMIC ORBITAL BASIS") >= 0) {
if (!this.filterMO ()) return true;
this.readMolecularOrbitals (2);
return false;
}return this.checkNboLine ();
});
Clazz.defineMethod (c$, "readMolecularOrbitals", 
function (headerType) {
this.setCalculationType ();
Clazz.superCall (this, org.jmol.adapter.readers.quantum.GamessUSReader, "readMolecularOrbitals", [headerType]);
}, "~N");
Clazz.defineMethod (c$, "readEFPInBohrCoordinates", 
function () {
var atomCountInFirstModel = this.atomSetCollection.getAtomCount ();
this.discardLinesUntilContains ("MULTIPOLE COORDINATES");
this.readLine ();
this.readLine ();
while (this.readLine () != null && this.line.length >= 72) {
var atomName = this.line.substring (1, 2);
if (atomName.charAt (0) == 'Z') atomName = this.line.substring (2, 3);
 else if (this.parseFloatRange (this.line, 67, 73) == 0) continue;
var x = this.parseFloatRange (this.line, 8, 25);
var y = this.parseFloatRange (this.line, 25, 40);
var z = this.parseFloatRange (this.line, 40, 56);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.atomSetCollection.addNewAtom ();
atom.atomName = atomName + (++atomCountInFirstModel);
this.setAtomCoordXYZ (atom, x * 0.5291772, y * 0.5291772, z * 0.5291772);
this.atomNames.add (atomName);
}
});
Clazz.overrideMethod (c$, "readAtomsInBohrCoordinates", 
function () {
this.readLine ();
var atomName;
this.atomSetCollection.newAtomSet ();
var n = 0;
while (this.readLine () != null && (atomName = this.parseTokenRange (this.line, 1, 11)) != null) {
var x = this.parseFloatRange (this.line, 17, 37);
var y = this.parseFloatRange (this.line, 37, 57);
var z = this.parseFloatRange (this.line, 57, 77);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.atomSetCollection.addNewAtom ();
atom.elementSymbol = org.jmol.adapter.smarter.AtomSetCollectionReader.getElementSymbol (this.parseIntRange (this.line, 11, 14));
atom.atomName = atom.elementSymbol + (++n);
this.setAtomCoordXYZ (atom, x * 0.5291772, y * 0.5291772, z * 0.5291772);
this.atomNames.add (atomName);
}
});
Clazz.defineMethod (c$, "readAtomsInAngstromCoordinates", 
($fz = function () {
this.readLine ();
this.readLine ();
var atomName;
this.atomSetCollection.newAtomSet ();
var n = 0;
while (this.readLine () != null && (atomName = this.parseTokenRange (this.line, 1, 11)) != null) {
var x = this.parseFloatRange (this.line, 16, 31);
var y = this.parseFloatRange (this.line, 31, 46);
var z = this.parseFloatRange (this.line, 46, 61);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.atomSetCollection.addNewAtom ();
this.setAtomCoordXYZ (atom, x, y, z);
atom.elementSymbol = org.jmol.adapter.smarter.AtomSetCollectionReader.getElementSymbol (this.parseIntRange (this.line, 11, 14));
atom.atomName = atom.elementSymbol + (++n);
this.atomNames.add (atomName);
}
if (this.line.indexOf ("COORDINATES OF FRAGMENT MULTIPOLE CENTERS (ANGS)") >= 0) {
this.readLine ();
this.readLine ();
this.readLine ();
while (this.readLine () != null && (atomName = this.parseTokenRange (this.line, 1, 2)) != null) {
if (this.parseTokenRange (this.line, 1, 2).equals ("Z")) atomName = this.parseTokenRange (this.line, 2, 3);
 else if (this.parseTokenRange (this.line, 1, 9).equals ("FRAGNAME")) continue;
 else atomName = this.parseTokenRange (this.line, 1, 2);
var x = this.parseFloatRange (this.line, 16, 31);
var y = this.parseFloatRange (this.line, 31, 46);
var z = this.parseFloatRange (this.line, 46, 61);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.atomSetCollection.addNewAtom ();
atom.atomName = atomName + (++n);
this.setAtomCoordXYZ (atom, x, y, z);
this.atomNames.add (atomName);
}
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "fixShellTag", 
function (tag) {
return tag;
}, "~S");
Clazz.defineMethod (c$, "readPartialCharges", 
function () {
var tokens = null;
var searchstr = (this.lowdenCharges ? "LOW.POP." : "MULL.POP.");
while (this.readLine () != null && ("".equals (this.line.trim ()) || this.line.indexOf ("ATOM") >= 0)) {
tokens = this.getTokens ();
}
var poploc = 0;
for (; ++poploc < tokens.length; ) if (searchstr.equals (tokens[poploc])) break;

if (++poploc >= tokens.length || !"CHARGE".equals (tokens[poploc++])) return;
var atoms = this.atomSetCollection.getAtoms ();
var startAtom = this.atomSetCollection.getLastAtomSetAtomIndex ();
var endAtom = this.atomSetCollection.getAtomCount ();
for (var i = startAtom; i < endAtom && this.readLine () != null; ++i) atoms[i].partialCharge = this.parseFloatStr (org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.prevline)[poploc]);

});
Clazz.defineMethod (c$, "readDipoleMoment", 
function () {
var tokens = null;
this.readLine ();
while (this.line != null && ("".equals (this.line.trim ()) || this.line.indexOf ("DX") < 0)) {
this.readLine ();
}
tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line);
if (tokens.length != 5) return;
if ("DX".equals (tokens[0]) && "DY".equals (tokens[1]) && "DZ".equals (tokens[2])) {
tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLine ());
var dipole = org.jmol.util.Vector3f.new3 (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]));
org.jmol.util.Logger.info ("Molecular dipole for model " + this.atomSetCollection.getAtomSetCount () + " = " + dipole);
this.atomSetCollection.setAtomSetAuxiliaryInfo ("dipole", dipole);
}});
});
