Clazz.declarePackage ("org.jmol.adapter.readers.quantum");
Clazz.load (["org.jmol.adapter.readers.quantum.SpartanInputReader"], "org.jmol.adapter.readers.quantum.SpartanSmolReader", ["java.lang.Boolean", "java.util.Hashtable", "org.jmol.adapter.readers.quantum.SpartanArchive", "org.jmol.util.Logger", "$.Parser", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.iHaveModelStatement = false;
this.isCompoundDocument = false;
this.inputOnly = false;
this.espCharges = false;
this.endCheck = "END Directory Entry ";
this.title = null;
this.spartanArchive = null;
this.titles = null;
this.haveCharges = false;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.quantum, "SpartanSmolReader", org.jmol.adapter.readers.quantum.SpartanInputReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.modelName = "Spartan file";
this.isCompoundDocument = (this.readLine ().indexOf ("Compound Document File Directory") >= 0);
this.inputOnly = this.checkFilterKey ("INPUT");
this.espCharges = !this.checkFilterKey ("MULLIKEN");
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
var lcline;
if (this.isCompoundDocument && (lcline = this.line.toLowerCase ()).equals ("begin directory entry molecule") || this.line.indexOf ("JMOL_MODEL") >= 0 && !this.line.startsWith ("END")) {
if (this.modelNumber > 0) this.applySymmetryAndSetTrajectory ();
this.iHaveModelStatement = true;
var modelNo = this.getModelNumber ();
this.modelNumber = (this.bsModels == null && modelNo != -2147483648 ? modelNo : this.modelNumber + 1);
this.bondData = "";
if (!this.doGetModel (this.modelNumber, null)) return this.checkLastModel ();
if (this.modelAtomCount == 0) this.atomSetCollection.newAtomSet ();
this.moData =  new java.util.Hashtable ();
this.moData.put ("isNormalized", Boolean.TRUE);
if (modelNo == -2147483648) {
modelNo = this.modelNumber;
this.title = "Model " + modelNo;
} else {
this.title = this.titles.get ("Title" + modelNo);
this.title = "Profile " + modelNo + (this.title == null ? "" : ": " + this.title);
}org.jmol.util.Logger.info (this.title);
this.atomSetCollection.setAtomSetName (this.title);
this.atomSetCollection.setAtomSetAuxiliaryInfo ("isPDB", Boolean.FALSE);
this.atomSetCollection.setCurrentAtomSetNumber (modelNo);
if (this.isCompoundDocument) this.readTransform ();
return true;
}if (this.iHaveModelStatement && !this.doProcessLines) return true;
if ((this.line.indexOf ("BEGIN") == 0)) {
lcline = this.line.toLowerCase ();
if (lcline.endsWith ("input")) {
this.bondData = "";
this.readInputRecords ();
if (this.atomSetCollection.errorMessage != null) {
this.continuing = false;
return false;
}if (this.title != null) this.atomSetCollection.setAtomSetName (this.title);
this.setCharges ();
if (this.inputOnly) {
this.continuing = false;
return false;
}} else if (lcline.endsWith ("_output")) {
return true;
} else if (lcline.endsWith ("output")) {
this.readOutput ();
return false;
} else if (lcline.endsWith ("molecule") || lcline.endsWith ("molecule:asbinarystring")) {
this.readTransform ();
return false;
} else if (lcline.endsWith ("proparc") || lcline.endsWith ("propertyarchive")) {
this.readProperties ();
return false;
} else if (lcline.endsWith ("archive")) {
this.readArchive ();
return false;
}return true;
}if (this.line.indexOf ("5D shell") >= 0) this.moData.put ("calculationType", this.calculationType = this.line);
return true;
});
Clazz.defineMethod (c$, "finalizeReader", 
function () {
Clazz.superCall (this, org.jmol.adapter.readers.quantum.SpartanSmolReader, "finalizeReader", []);
if (this.atomCount > 0 && this.spartanArchive != null && this.atomSetCollection.getBondCount () == 0 && this.bondData != null) this.spartanArchive.addBonds (this.bondData, 0);
if (this.moData != null) {
var n = this.atomSetCollection.getAtomSetCollectionAuxiliaryInfo ("HOMO_N");
if (n != null) this.moData.put ("HOMO", Integer.$valueOf (n.intValue ()));
}});
Clazz.defineMethod (c$, "readTransform", 
($fz = function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var mat;
var binaryCodes = this.readLine ();
var tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (binaryCodes.trim ());
if (tokens.length < 16) return;
var bytes =  Clazz.newByteArray (tokens.length, 0);
for (var i = 0; i < tokens.length; i++) bytes[i] = org.jmol.util.Parser.parseIntRadix (tokens[i], 16);

mat =  Clazz.newFloatArray (16, 0);
for (var i = 16, j = bytes.length; --i >= 0; j -= 8) mat[i] = org.jmol.adapter.readers.quantum.SpartanSmolReader.bytesToDoubleToFloat (bytes, j);

this.setTransform (mat[0], mat[1], mat[2], mat[4], mat[5], mat[6], mat[8], mat[9], mat[10]);
}, $fz.isPrivate = true, $fz));
c$.bytesToDoubleToFloat = Clazz.defineMethod (c$, "bytesToDoubleToFloat", 
($fz = function (bytes, j) {
{
{
var o = org.jmol.adapter.readers.quantum.SpartanSmolReader;
if (o.fracIEEE == null);
o.setFracIEEE();
var b1 = bytes[--j] & 0xFF;
var b2 = bytes[--j] & 0xFF;
var b3 = bytes[--j] & 0xFF;
var b4 = bytes[--j] & 0xFF;
var b5 = bytes[--j] & 0xFF;
var s = ((b1 & 0x80) == 0 ? 1 : -1);
var e = ((b1 & 0x7F) << 4 | (b2 >> 4)) - 1026;
b2 = (b2 & 0xF) | 0x10;
return s * (o.shiftIEEE(b2, e) + o.shiftIEEE(b3, e - 8) + o.shiftIEEE(b4, e - 16)
+ o.shiftIEEE(b5, e - 24));
}}}, $fz.isPrivate = true, $fz), "~A,~N");
c$.setFracIEEE = Clazz.defineMethod (c$, "setFracIEEE", 
function () {
($t$ = org.jmol.adapter.readers.quantum.SpartanSmolReader.fracIEEE =  Clazz.newFloatArray (270, 0), org.jmol.adapter.readers.quantum.SpartanSmolReader.prototype.fracIEEE = org.jmol.adapter.readers.quantum.SpartanSmolReader.fracIEEE, $t$);
for (var i = 0; i < 270; i++) org.jmol.adapter.readers.quantum.SpartanSmolReader.fracIEEE[i] = Math.pow (2, i - 141);

});
c$.shiftIEEE = Clazz.defineMethod (c$, "shiftIEEE", 
function (f, i) {
if (f == 0 || i < -140) return 0;
if (i > 128) return 3.4028235E38;
return f * org.jmol.adapter.readers.quantum.SpartanSmolReader.fracIEEE[i + 140];
}, "~N,~N");
Clazz.defineMethod (c$, "readOutput", 
($fz = function () {
this.titles =  new java.util.Hashtable ();
var header =  new org.jmol.util.StringXBuilder ();
var pt;
while (this.readLine () != null && !this.line.startsWith ("END ")) {
header.append (this.line).append ("\n");
if ((pt = this.line.indexOf (")")) > 0) this.titles.put ("Title" + this.parseIntRange (this.line, 0, pt), (this.line.substring (pt + 1).trim ()));
}
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("fileHeader", header.toString ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readArchive", 
($fz = function () {
this.spartanArchive =  new org.jmol.adapter.readers.quantum.SpartanArchive (this, this.bondData, this.endCheck);
if (this.readArchiveHeader ()) {
this.modelAtomCount = this.spartanArchive.readArchive (this.line, false, this.atomCount, false);
if (this.atomCount == 0 || !this.isTrajectory) this.atomCount += this.modelAtomCount;
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setCharges", 
($fz = function () {
if (this.haveCharges || this.atomSetCollection.getAtomCount () == 0) return;
this.haveCharges = (this.espCharges && this.atomSetCollection.setAtomSetCollectionPartialCharges ("ESPCHARGES") || this.atomSetCollection.setAtomSetCollectionPartialCharges ("MULCHARGES") || this.atomSetCollection.setAtomSetCollectionPartialCharges ("Q1_CHARGES") || this.atomSetCollection.setAtomSetCollectionPartialCharges ("ESPCHARGES"));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readProperties", 
($fz = function () {
if (this.spartanArchive == null) {
this.readLine ();
return;
}this.spartanArchive.readProperties ();
this.readLine ();
this.setCharges ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getModelNumber", 
($fz = function () {
try {
var pt = this.line.indexOf ("JMOL_MODEL ") + 11;
return this.parseIntAt (this.line, pt);
} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
return 0;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readArchiveHeader", 
($fz = function () {
var modelInfo = this.readLine ();
org.jmol.util.Logger.debug (modelInfo);
if (modelInfo.indexOf ("Error:") == 0) return false;
this.atomSetCollection.setCollectionName (modelInfo);
this.modelName = this.readLine ();
org.jmol.util.Logger.debug (this.modelName);
this.readLine ();
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"fracIEEE", null);
});
