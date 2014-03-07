Clazz.declarePackage ("org.jmol.api");
Clazz.load (["org.jmol.constant.EnumQuantumShell"], "org.jmol.api.JmolAdapter", ["java.util.Hashtable", "org.jmol.api.JmolViewer", "org.jmol.modelset.Group", "org.jmol.util.Elements", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.adapterName = null;
Clazz.instantialize (this, arguments);
}, org.jmol.api, "JmolAdapter");
c$.getShellEnumeration = Clazz.defineMethod (c$, "getShellEnumeration", 
function (i) {
return org.jmol.constant.EnumQuantumShell.getItem (i);
}, "~N");
c$.getNewDfCoefMap = Clazz.defineMethod (c$, "getNewDfCoefMap", 
function () {
return org.jmol.constant.EnumQuantumShell.getNewDfCoefMap ();
});
c$.getElementSymbol = Clazz.defineMethod (c$, "getElementSymbol", 
function (elementNumber) {
return org.jmol.util.Elements.elementSymbolFromNumber (elementNumber);
}, "~N");
c$.getElementNumber = Clazz.defineMethod (c$, "getElementNumber", 
function (elementSymbol) {
return org.jmol.util.Elements.elementNumberFromSymbol (elementSymbol, false);
}, "~S");
c$.getNaturalIsotope = Clazz.defineMethod (c$, "getNaturalIsotope", 
function (elementNumber) {
return org.jmol.util.Elements.getNaturalIsotope (elementNumber);
}, "~N");
c$.isHetero = Clazz.defineMethod (c$, "isHetero", 
function (group3) {
return org.jmol.viewer.JmolConstants.isHetero (group3);
}, "~S");
c$.getQuantumShellTagID = Clazz.defineMethod (c$, "getQuantumShellTagID", 
function (tag) {
return org.jmol.constant.EnumQuantumShell.getQuantumShellTagID (tag);
}, "~S");
c$.getQuantumShellTagIDSpherical = Clazz.defineMethod (c$, "getQuantumShellTagIDSpherical", 
function (tag) {
return org.jmol.constant.EnumQuantumShell.getQuantumShellTagIDSpherical (tag);
}, "~S");
c$.lookupGroupID = Clazz.defineMethod (c$, "lookupGroupID", 
function (group3) {
return org.jmol.modelset.Group.lookupGroupID (group3);
}, "~S");
c$.getBondingRadiusFloat = Clazz.defineMethod (c$, "getBondingRadiusFloat", 
function (atomicNumberWithIsotope, charge) {
return org.jmol.util.Elements.getBondingRadiusFloat (atomicNumberWithIsotope, charge);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (adapterName) {
this.adapterName = adapterName;
}, "~S");
Clazz.defineMethod (c$, "getAdapterName", 
function () {
return this.adapterName;
});
Clazz.defineMethod (c$, "getAtomSetCollectionFromReader", 
function (name, type, bufferedReader, htParams) {
if (htParams == null) htParams =  new java.util.Hashtable ();
if (!htParams.containsKey ("viewer")) htParams.put ("viewer", org.jmol.api.JmolViewer.allocateViewer (null, this));
var a = this.getAtomSetCollectionReader (name, type, bufferedReader, htParams);
if (Clazz.instanceOf (a, String)) return a;
return this.getAtomSetCollection (a);
}, "~S,~S,java.io.BufferedReader,java.util.Map");
Clazz.defineMethod (c$, "openBufferedReader", 
function (name, bufferedReader) {
return this.getAtomSetCollectionFromReader (name, null, bufferedReader, null);
}, "~S,java.io.BufferedReader");
Clazz.defineMethod (c$, "openBufferedReader", 
function (name, bufferedReader, htParams) {
return this.getAtomSetCollectionFromReader (name, null, bufferedReader, htParams);
}, "~S,java.io.BufferedReader,java.util.Map");
Clazz.defineMethod (c$, "openBufferedReader", 
function (name, type, bufferedReader) {
return this.getAtomSetCollectionFromReader (name, type, bufferedReader, null);
}, "~S,~S,java.io.BufferedReader");
Clazz.defineMethod (c$, "finish", 
function (atomSetCollection) {
}, "~O");
c$.canonizeAlphaDigit = Clazz.defineMethod (c$, "canonizeAlphaDigit", 
function (ch) {
if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) return ch;
return '\0';
}, "~S");
c$.canonizeChainID = Clazz.defineMethod (c$, "canonizeChainID", 
function (chainID) {
return org.jmol.api.JmolAdapter.canonizeAlphaDigit (chainID);
}, "~S");
c$.canonizeInsertionCode = Clazz.defineMethod (c$, "canonizeInsertionCode", 
function (insertionCode) {
return org.jmol.api.JmolAdapter.canonizeAlphaDigit (insertionCode);
}, "~S");
c$.canonizeAlternateLocationID = Clazz.defineMethod (c$, "canonizeAlternateLocationID", 
function (altLoc) {
return org.jmol.api.JmolAdapter.canonizeAlphaDigit (altLoc);
}, "~S");
Clazz.defineStatics (c$,
"ORDER_COVALENT_SINGLE", 1,
"ORDER_COVALENT_DOUBLE", 2,
"ORDER_COVALENT_TRIPLE", 3,
"ORDER_AROMATIC", 515,
"ORDER_AROMATIC_SINGLE", 513,
"ORDER_AROMATIC_DOUBLE", 514,
"ORDER_HBOND", 2048,
"ORDER_STEREO_NEAR", 1025,
"ORDER_STEREO_FAR", 1041,
"ORDER_PARTIAL01", 33,
"ORDER_PARTIAL12", 66,
"ORDER_PARTIAL23", 97,
"ORDER_PARTIAL32", 100,
"ORDER_UNSPECIFIED", 17);
c$.SHELL_S = c$.prototype.SHELL_S = org.jmol.constant.EnumQuantumShell.S.id;
c$.SHELL_P = c$.prototype.SHELL_P = org.jmol.constant.EnumQuantumShell.P.id;
c$.SHELL_SP = c$.prototype.SHELL_SP = org.jmol.constant.EnumQuantumShell.SP.id;
c$.SHELL_L = c$.prototype.SHELL_L = org.jmol.constant.EnumQuantumShell.SP.id;
c$.SHELL_D_SPHERICAL = c$.prototype.SHELL_D_SPHERICAL = org.jmol.constant.EnumQuantumShell.D_SPHERICAL.id;
c$.SHELL_D_CARTESIAN = c$.prototype.SHELL_D_CARTESIAN = org.jmol.constant.EnumQuantumShell.D_CARTESIAN.id;
c$.SHELL_F_SPHERICAL = c$.prototype.SHELL_F_SPHERICAL = org.jmol.constant.EnumQuantumShell.F_SPHERICAL.id;
c$.SHELL_F_CARTESIAN = c$.prototype.SHELL_F_CARTESIAN = org.jmol.constant.EnumQuantumShell.F_CARTESIAN.id;
c$.SUPPORTED_BASIS_FUNCTIONS = c$.prototype.SUPPORTED_BASIS_FUNCTIONS = "SPLDF";
c$.NOTE_SCRIPT_FILE = c$.prototype.NOTE_SCRIPT_FILE = "NOTE: file recognized as a script file: ";
Clazz.defineStatics (c$,
"cellParamNames", ["_cell_length_a", "_cell_length_b", "_cell_length_c", "_cell_angle_alpha", "_cell_angle_beta", "_cell_angle_gamma"]);
});
