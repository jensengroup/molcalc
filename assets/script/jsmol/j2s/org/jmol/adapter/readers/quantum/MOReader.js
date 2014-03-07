Clazz.declarePackage ("org.jmol.adapter.readers.quantum");
Clazz.load (["org.jmol.adapter.readers.quantum.BasisFunctionReader"], "org.jmol.adapter.readers.quantum.MOReader", ["java.lang.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.api.JmolAdapter", "org.jmol.util.ArrayUtil", "$.Logger", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.shellCount = 0;
this.gaussianCount = 0;
this.gaussians = null;
this.energyUnits = "";
this.moTypes = null;
this.getNBOs = false;
this.getNBOCharges = false;
this.haveNboCharges = false;
this.haveNboOrbitals = false;
this.orbitalsRead = false;
this.HEADER_GAMESS_UK_MO = 3;
this.HEADER_GAMESS_OCCUPANCIES = 2;
this.HEADER_GAMESS_ORIGINAL = 1;
this.HEADER_NONE = 0;
this.haveCoeffMap = false;
this.iMo0 = 1;
this.lastMoData = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.quantum, "MOReader", org.jmol.adapter.readers.quantum.BasisFunctionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.line = "\nNBOs in the AO basis:";
this.getNBOs = this.filterMO ();
this.line = "\nNBOCHARGES";
this.getNBOCharges = (this.filter != null && this.filterMO ());
if (this.filter == null) return;
var f = org.jmol.util.TextFormat.simpleReplace (this.filter, "NBOCHARGES", "");
if (f.length < 3) this.filter = null;
});
Clazz.defineMethod (c$, "checkNboLine", 
function () {
if (this.getNBOs) {
if (this.line.indexOf ("(Occupancy)   Bond orbital/ Coefficients/ Hybrids") >= 0) {
this.getNboTypes ();
return false;
}if (this.line.indexOf ("NBOs in the AO basis:") >= 0) {
this.readMolecularOrbitals (0);
return false;
}if (this.line.indexOf (" SECOND ORDER PERTURBATION THEORY ANALYSIS") >= 0) {
this.readSecondOrderData ();
return false;
}}if (this.getNBOCharges && this.line.indexOf ("Summary of Natural Population Analysis:") >= 0) {
this.getNboCharges ();
return true;
}return true;
});
Clazz.defineMethod (c$, "getNboCharges", 
($fz = function () {
if (this.haveNboCharges) return;
this.discardLinesUntilContains ("----");
this.discardLinesUntilContains ("----");
this.haveNboCharges = true;
var atomCount = this.atomSetCollection.getAtomCount ();
var i0 = this.atomSetCollection.getLastAtomSetAtomIndex ();
var atoms = this.atomSetCollection.getAtoms ();
for (var i = i0; i < atomCount; ++i) {
while (atoms[i].elementNumber == 0) ++i;

var tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLine ());
var charge;
if (tokens == null || tokens.length < 3 || Float.isNaN (charge = this.parseFloatStr (tokens[2]))) {
org.jmol.util.Logger.info ("Error reading NBO charges: " + this.line);
return;
}atoms[i].partialCharge = charge;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("Atom " + i + " using NBOcharge: " + charge);
}
org.jmol.util.Logger.info ("Using NBO charges for Model " + this.atomSetCollection.getAtomSetCount ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getNboTypes", 
function () {
this.moTypes =  new java.util.ArrayList ();
this.iMo0 = (this.orbitals == null ? 0 : this.orbitals.size ()) + 1;
this.readLine ();
this.readLine ();
var n = 0;
var pt = 0;
while (this.line != null && (pt = this.line.indexOf (".")) >= 0 && pt < 10) {
if (this.parseIntRange (this.line, 0, pt) != n + 1) break;
this.moTypes.add (n++, this.line.substring (pt + 1, Math.min (40, this.line.length)).trim ());
while (this.readLine () != null && this.line.startsWith ("       ")) {
}
}
org.jmol.util.Logger.info (n + " natural bond AO basis functions found");
});
Clazz.defineMethod (c$, "readMolecularOrbitals", 
function (headerType) {
if (this.ignoreMOs) {
this.readLine ();
return;
}this.dfCoefMaps = null;
if (this.haveNboOrbitals) {
this.orbitals =  new java.util.ArrayList ();
this.alphaBeta = "";
}this.haveNboOrbitals = true;
this.orbitalsRead = true;
var mos = null;
var data = null;
var dCoeffLabels = "";
var fCoeffLabels = "";
var pCoeffLabels = "";
var ptOffset = -1;
var fieldSize = 0;
var nThisLine = 0;
this.readLine ();
var moCount = 0;
var nBlank = 0;
var haveMOs = false;
if (this.line.indexOf ("---") >= 0) this.readLine ();
while (this.readLine () != null) {
var tokens = this.getTokens ();
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug (tokens.length + " --- " + this.line);
}if (this.line.indexOf ("end") >= 0) break;
if (this.line.indexOf (" ALPHA SET ") >= 0) {
this.alphaBeta = "alpha";
if (this.readLine () == null) break;
} else if (this.line.indexOf (" BETA SET ") >= 0) {
if (haveMOs) break;
this.alphaBeta = "beta";
if (this.readLine () == null) break;
}var str = this.line.toUpperCase ();
if (str.length == 0 || str.indexOf ("--") >= 0 || str.indexOf (".....") >= 0 || str.indexOf ("NBO BASIS") >= 0 || str.indexOf ("CI EIGENVECTORS WILL BE LABELED") >= 0 || str.indexOf ("LZ VALUE") >= 0 || str.indexOf ("   THIS LOCALIZATION HAD") >= 0) {
if (!this.haveCoeffMap) {
this.haveCoeffMap = true;
var isOK = true;
if (pCoeffLabels.length > 0) isOK = this.getDFMap (pCoeffLabels, org.jmol.api.JmolAdapter.SHELL_P, "(PX)  (PY)  (PZ)", 4);
if (dCoeffLabels.length > 0) {
if (dCoeffLabels.indexOf ("X") >= 0) isOK = this.getDFMap (dCoeffLabels, org.jmol.api.JmolAdapter.SHELL_D_CARTESIAN, org.jmol.adapter.readers.quantum.BasisFunctionReader.CANONICAL_DC_LIST, 2);
 else if (dCoeffLabels.indexOf ("(D6)") >= 0) isOK = this.getDFMap (dCoeffLabels, org.jmol.api.JmolAdapter.SHELL_D_CARTESIAN, "(D1)  (D4)  (D6)  (D2)  (D3)  (D5)", 4);
 else isOK = this.getDFMap (dCoeffLabels, org.jmol.api.JmolAdapter.SHELL_D_SPHERICAL, "(D5)  (D2)  (D3)  (D4)  (D1)", 4);
}if (fCoeffLabels.length > 0) {
if (fCoeffLabels.indexOf ("X") >= 0) isOK = this.getDFMap (fCoeffLabels, org.jmol.api.JmolAdapter.SHELL_F_CARTESIAN, org.jmol.adapter.readers.quantum.BasisFunctionReader.CANONICAL_FC_LIST, 2);
 else if (fCoeffLabels.indexOf ("(F10)") >= 0) isOK = this.getDFMap (fCoeffLabels, org.jmol.api.JmolAdapter.SHELL_F_CARTESIAN, org.jmol.adapter.readers.quantum.MOReader.FC_LIST, 5);
 else isOK = this.getDFMap (fCoeffLabels, org.jmol.api.JmolAdapter.SHELL_F_SPHERICAL, "(F1)  (F2)  (F3)  (F4)  (F5)  (F6)  (F7)", 4);
}if (!isOK) {
}}if (str.length == 0) nBlank++;
 else nBlank = 0;
if (nBlank == 2) break;
if (str.indexOf ("LZ VALUE") >= 0) this.discardLinesUntilBlank ();
for (var iMo = 0; iMo < nThisLine; iMo++) {
var coefs =  Clazz.newFloatArray (data[iMo].size (), 0);
var iCoeff = 0;
while (iCoeff < coefs.length) {
coefs[iCoeff] = this.parseFloatStr (data[iMo].get (iCoeff));
iCoeff++;
}
haveMOs = true;
mos[iMo].put ("coefficients", coefs);
moCount = this.setMOType (mos[iMo], moCount);
this.setMO (mos[iMo]);
}
nThisLine = 0;
if (this.line.length == 0) continue;
break;
}nBlank = 0;
if (nThisLine == 0) {
nThisLine = tokens.length;
if (tokens[0].equals ("AO")) {
nThisLine--;
ptOffset = 16;
fieldSize = 8;
}if (mos == null || nThisLine > mos.length) {
mos = org.jmol.util.ArrayUtil.createArrayOfHashtable (nThisLine);
data = org.jmol.util.ArrayUtil.createArrayOfArrayList (nThisLine);
}for (var i = 0; i < nThisLine; i++) {
mos[i] =  new java.util.Hashtable ();
data[i] =  new java.util.ArrayList ();
}
this.getMOHeader (headerType, tokens, mos, nThisLine);
continue;
}var nSkip = tokens.length - nThisLine;
var type = tokens[nSkip - 1];
var ch;
if (type.charAt (0) == '(') {
ch = type.charAt (1);
if (!this.haveCoeffMap) {
switch (ch) {
case 'p':
pCoeffLabels += " " + type.toUpperCase ();
break;
case 'd':
dCoeffLabels += " " + org.jmol.adapter.readers.quantum.BasisFunctionReader.canonicalizeQuantumSubshellTag (type.toUpperCase ());
break;
case 'f':
fCoeffLabels += " " + org.jmol.adapter.readers.quantum.BasisFunctionReader.canonicalizeQuantumSubshellTag (type.toUpperCase ());
break;
case 's':
}
}} else {
var nChar = type.length;
ch = (nChar < 4 ? 'S' : nChar == 4 ? 'G' : nChar == 5 ? 'H' : '?');
if (!this.haveCoeffMap && nChar == 3) fCoeffLabels += " " + org.jmol.adapter.readers.quantum.BasisFunctionReader.canonicalizeQuantumSubshellTag (type.toUpperCase ());
 else if (!this.haveCoeffMap && nChar == 2) dCoeffLabels += " " + org.jmol.adapter.readers.quantum.BasisFunctionReader.canonicalizeQuantumSubshellTag (type.toUpperCase ());
}if (this.isQuantumBasisSupported (ch)) {
if (ptOffset < 0) {
for (var i = 0; i < nThisLine; i++) data[i].add (tokens[i + nSkip]);

} else {
var pt = ptOffset;
for (var i = 0; i < nThisLine; i++, pt += fieldSize) data[i].add (this.line.substring (pt, pt + fieldSize).trim ());

}}this.line = "";
}
this.energyUnits = "a.u.";
this.setMOData (!this.alphaBeta.equals ("alpha"));
this.haveCoeffMap = false;
this.dfCoefMaps = null;
}, "~N");
Clazz.defineMethod (c$, "setMOType", 
function (mo, i) {
if (this.moTypes != null) {
var s = this.moTypes.get (i % this.moTypes.size ());
i++;
mo.put ("type", s);
mo.put ("occupancy",  new Float (s.indexOf ("*") >= 0 ? 0 : 2));
} else if (this.alphaBeta.length > 0) {
mo.put ("type", this.alphaBeta);
}return i;
}, "java.util.Map,~N");
Clazz.defineMethod (c$, "getMOHeader", 
function (headerType, tokens, mos, nThisLine) {
this.readLine ();
switch (headerType) {
default:
case 0:
return;
case 3:
for (var i = 0; i < nThisLine; i++) mos[i].put ("energy",  new Float (tokens[i]));

this.readLines (5);
return;
case 1:
tokens = this.getTokens ();
if (tokens.length == 0) tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLine ());
for (var i = 0; i < nThisLine; i++) {
mos[i].put ("energy",  new Float (tokens[i]));
}
this.readLine ();
break;
case 2:
var haveSymmetry = (this.line.length > 0 || this.readLine () != null);
tokens = this.getTokens ();
for (var i = 0; i < nThisLine; i++) mos[i].put ("occupancy",  new Float (tokens[i].charAt (0) == '-' ? 2.0 : this.parseFloatStr (tokens[i])));

this.readLine ();
if (!haveSymmetry) return;
}
if (this.line.length > 0) {
tokens = this.getTokens ();
for (var i = 0; i < nThisLine; i++) mos[i].put ("symmetry", tokens[i]);

}}, "~N,~A,~A,~N");
Clazz.defineMethod (c$, "addMOData", 
function (nColumns, data, mos) {
for (var i = 0; i < nColumns; i++) {
var coefs =  Clazz.newFloatArray (data[i].size (), 0);
for (var j = coefs.length; --j >= 0; ) coefs[j] = this.parseFloatStr (data[i].get (j));

mos[i].put ("coefficients", coefs);
this.setMO (mos[i]);
}
}, "~N,~A,~A");
Clazz.defineMethod (c$, "setMOData", 
function (clearOrbitals) {
if (this.shells != null && this.gaussians != null && this.orbitals.size () != 0) {
this.moData.put ("calculationType", this.calculationType);
this.moData.put ("energyUnits", this.energyUnits);
this.moData.put ("shells", this.shells);
this.moData.put ("gaussians", this.gaussians);
this.moData.put ("mos", this.orbitals);
this.setMOData (this.lastMoData = this.moData);
}if (clearOrbitals) {
this.orbitals =  new java.util.ArrayList ();
this.moData =  new java.util.Hashtable ();
this.alphaBeta = "";
}}, "~B");
Clazz.defineMethod (c$, "readSecondOrderData", 
($fz = function () {
if (this.lastMoData == null || this.moTypes == null) return;
var ht =  new java.util.Hashtable ();
for (var i = this.moTypes.size (); --i >= 0; ) ht.put (org.jmol.util.TextFormat.simpleReplace (this.moTypes.get (i).substring (10), " ", ""),  new Integer (i + this.iMo0));

var strSecondOrderData =  new java.util.ArrayList ();
this.readLines (5);
while (this.readLine () != null && this.line.indexOf ("NBO") < 0) {
if (this.line.length < 5 || this.line.charAt (4) != '.') continue;
strSecondOrderData.add ([org.jmol.util.TextFormat.simpleReplace (this.line.substring (5, 27).trim (), " ", ""), org.jmol.util.TextFormat.simpleReplace (this.line.substring (32, 54).trim (), " ", ""), this.line.substring (55, 62).trim (), this.line.substring (71).trim ()]);
}
var secondOrderData =  Clazz.newFloatArray (strSecondOrderData.size (), 4, 0);
this.lastMoData.put ("secondOrderData", secondOrderData);
this.lastMoData = null;
var IMO;
for (var i = strSecondOrderData.size (); --i >= 0; ) {
var a = strSecondOrderData.get (i);
IMO = ht.get (a[0]);
if (IMO != null) secondOrderData[i][0] = IMO.intValue ();
IMO = ht.get (a[1]);
if (IMO != null) secondOrderData[i][1] = IMO.intValue ();
secondOrderData[i][2] = this.parseFloatStr (a[2]);
secondOrderData[i][3] = this.parseFloatStr (a[3]);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"P_LIST", "(PX)  (PY)  (PZ)",
"DS_LIST", "(D5)  (D2)  (D3)  (D4)  (D1)",
"DC_LIST", "(D1)  (D4)  (D6)  (D2)  (D3)  (D5)",
"FS_LIST", "(F1)  (F2)  (F3)  (F4)  (F5)  (F6)  (F7)",
"FC_LIST", "(F1)  (F2)  (F10) (F4)  (F2)  (F3)  (F6)  (F9)  (F8)  F(5)");
});
