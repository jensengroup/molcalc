Clazz.declarePackage ("org.jmol.adapter.readers.quantum");
Clazz.load (["org.jmol.adapter.smarter.AtomSetCollectionReader", "java.util.ArrayList", "$.Hashtable"], "org.jmol.adapter.readers.quantum.BasisFunctionReader", ["java.lang.Character", "java.util.Arrays", "org.jmol.api.JmolAdapter", "org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.shells = null;
this.moData = null;
this.orbitals = null;
this.nOrbitals = 0;
this.ignoreMOs = false;
this.alphaBeta = "";
this.dfCoefMaps = null;
this.filterTokens = null;
this.filterIsNot = false;
this.nCoef = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.quantum, "BasisFunctionReader", org.jmol.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.moData =  new java.util.Hashtable ();
this.orbitals =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "filterMO", 
function () {
var isHeader = (this.line.indexOf ('\n') == 0);
if (!isHeader && !this.doReadMolecularOrbitals) return false;
if (this.filter == null) return true;
var isOK = true;
var nOK = 0;
this.line += " " + this.alphaBeta;
var ucline = this.line.toUpperCase ();
if (this.filterTokens == null) {
this.filterIsNot = (this.filter.indexOf ("!") >= 0);
this.filterTokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.filter.$replace ('!', ' ').$replace (',', ' ').$replace (';', ' '));
}for (var i = 0; i < this.filterTokens.length; i++) if (ucline.indexOf (this.filterTokens[i]) >= 0) {
if (!this.filterIsNot) {
nOK = this.filterTokens.length;
break;
}} else if (this.filterIsNot) {
nOK++;
}
isOK = (nOK == this.filterTokens.length);
if (!isHeader) org.jmol.util.Logger.info ("filter MOs: " + isOK + " for \"" + this.line + "\"");
return isOK;
});
Clazz.defineMethod (c$, "setMO", 
function (mo) {
if (this.dfCoefMaps != null) mo.put ("dfCoefMaps", this.dfCoefMaps);
this.orbitals.add (mo);
}, "java.util.Map");
Clazz.defineMethod (c$, "isQuantumBasisSupported", 
function (ch) {
return ("SPLDF".indexOf (Character.toUpperCase (ch)) >= 0);
}, "~S");
Clazz.defineMethod (c$, "getDFMap", 
function (fileList, shellType, jmolList, minLength) {
if (fileList.equals (jmolList)) return true;
this.getDfCoefMaps ();
var tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (fileList);
var isOK = true;
for (var i = 0; i < this.dfCoefMaps[shellType].length && isOK; i++) {
var key = tokens[i];
if (key.length >= minLength) {
var pt = jmolList.indexOf (key);
if (pt >= 0) {
pt /= 6;
this.dfCoefMaps[shellType][pt] = i - pt;
continue;
}}isOK = false;
}
if (!isOK) {
org.jmol.util.Logger.error ("Disabling orbitals of type " + shellType + " -- Cannot read orbital order for: " + fileList + "\n expecting: " + jmolList);
this.dfCoefMaps[shellType][0] = -2147483648;
}return isOK;
}, "~S,~N,~S,~N");
Clazz.defineMethod (c$, "getDfCoefMaps", 
function () {
if (this.dfCoefMaps == null) this.dfCoefMaps = org.jmol.api.JmolAdapter.getNewDfCoefMap ();
return this.dfCoefMaps;
});
c$.canonicalizeQuantumSubshellTag = Clazz.defineMethod (c$, "canonicalizeQuantumSubshellTag", 
function (tag) {
var firstChar = tag.charAt (0);
if (firstChar == 'X' || firstChar == 'Y' || firstChar == 'Z') {
var sorted = tag.toCharArray ();
java.util.Arrays.sort (sorted);
return  String.instantialize (sorted);
}return tag;
}, "~S");
Clazz.defineMethod (c$, "fixSlaterTypes", 
function (typeOld, typeNew) {
if (this.shells == null) return 0;
this.nCoef = 0;
for (var i = this.shells.size (); --i >= 0; ) {
var slater = this.shells.get (i);
if (slater[1] == typeOld) slater[1] = typeNew;
this.nCoef += this.getDfCoefMaps ()[slater[1]].length;
}
return this.nCoef;
}, "~N,~N");
Clazz.defineStatics (c$,
"CANONICAL_DC_LIST", "DXX   DYY   DZZ   DXY   DXZ   DYZ",
"CANONICAL_FC_LIST", "XXX   YYY   ZZZ   XYY   XXY   XXZ   XZZ   YZZ   YYZ   XYZ",
"CANONICAL_DS_LIST", "d0    d1+   d1-   d2+   d2-",
"CANONICAL_FS_LIST", "f0    f1+   f1-   f2+   f2-   f3+   f3-");
});
