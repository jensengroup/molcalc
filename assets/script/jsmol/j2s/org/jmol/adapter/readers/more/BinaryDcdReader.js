Clazz.declarePackage ("org.jmol.adapter.readers.more");
Clazz.load (["org.jmol.adapter.readers.more.BinaryReader"], "org.jmol.adapter.readers.more.BinaryDcdReader", ["org.jmol.util.BitSetUtil", "$.Escape", "$.Logger", "$.Point3f", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nModels = 0;
this.nAtoms = 0;
this.nFree = 0;
this.bsFree = null;
this.xAll = null;
this.yAll = null;
this.zAll = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.more, "BinaryDcdReader", org.jmol.adapter.readers.more.BinaryReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.initializeTrajectoryFile ();
});
Clazz.overrideMethod (c$, "readDocument", 
function () {
var bytes =  Clazz.newByteArray (40, 0);
var n = this.binaryDoc.readInt ();
this.binaryDoc.setStream (null, n != 0x54);
n = this.binaryDoc.readInt ();
this.nModels = this.binaryDoc.readInt ();
this.binaryDoc.readInt ();
this.binaryDoc.readInt ();
this.binaryDoc.readInt ();
this.binaryDoc.readInt ();
this.binaryDoc.readInt ();
this.binaryDoc.readInt ();
var ndegf = this.binaryDoc.readInt ();
this.nFree = Clazz.doubleToInt (ndegf / 3);
var nFixed = this.binaryDoc.readInt ();
this.binaryDoc.readInt ();
this.binaryDoc.readByteArray (bytes, 0, 36);
this.binaryDoc.readInt ();
n = this.binaryDoc.readInt ();
n = this.binaryDoc.readInt ();
n = this.binaryDoc.readInt ();
var sb =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < n; i++) sb.append (this.binaryDoc.readString (80).trim ()).appendC ('\n');

n = this.binaryDoc.readInt ();
org.jmol.util.Logger.info ("BinaryDcdReadaer:\n" + sb);
n = this.binaryDoc.readInt ();
this.nAtoms = this.binaryDoc.readInt ();
n = this.binaryDoc.readInt ();
this.nFree = this.nAtoms - nFixed;
if (nFixed != 0) {
this.binaryDoc.readInt ();
this.bsFree = org.jmol.util.BitSetUtil.newBitSet (this.nFree);
for (var i = 0; i < this.nFree; i++) this.bsFree.set (this.binaryDoc.readInt () - 1);

n = Clazz.doubleToInt (this.binaryDoc.readInt () / 4);
org.jmol.util.Logger.info ("free: " + this.bsFree.cardinality () + " " + org.jmol.util.Escape.escape (this.bsFree));
}this.readCoordinates ();
org.jmol.util.Logger.info ("Total number of trajectory steps=" + this.trajectorySteps.size ());
});
Clazz.defineMethod (c$, "readFloatArray", 
($fz = function () {
var n = Clazz.doubleToInt (this.binaryDoc.readInt () / 4);
var data =  Clazz.newFloatArray (n, 0);
for (var i = 0; i < n; i++) data[i] = this.binaryDoc.readFloat ();

n = Clazz.doubleToInt (this.binaryDoc.readInt () / 4);
if (org.jmol.util.Logger.debugging) System.out.println (this.modelNumber + " " + this.binaryDoc.getPosition () + ": " + n + " " + data[0] + "\t" + data[1] + "\t" + data[2]);
return data;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readCoordinates", 
($fz = function () {
var atomCount = (this.bsFilter == null ? this.templateAtomCount : (this.htParams.get ("filteredAtomCount")).intValue ());
for (var i = 0; i < this.nModels; i++) if (this.doGetModel (++this.modelNumber, null)) {
var trajectoryStep =  new Array (atomCount);
if (!this.getTrajectoryStep (trajectoryStep)) return;
this.trajectorySteps.add (trajectoryStep);
if (this.isLastModel (this.modelNumber)) return;
} else {
this.readFloatArray ();
this.readFloatArray ();
this.readFloatArray ();
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getTrajectoryStep", 
($fz = function (trajectoryStep) {
try {
var atomCount = trajectoryStep.length;
var n = -1;
var x = this.readFloatArray ();
var y = this.readFloatArray ();
var z = this.readFloatArray ();
var bs = (this.xAll == null ? null : this.bsFree);
if (bs == null) {
this.xAll = x;
this.yAll = y;
this.zAll = z;
}for (var i = 0, vpt = 0; i < this.nAtoms; i++) {
var pt =  new org.jmol.util.Point3f ();
if (bs == null || bs.get (i)) {
pt.set (x[vpt], y[vpt], z[vpt]);
vpt++;
} else {
pt.set (this.xAll[i], this.yAll[i], this.zAll[i]);
}if (this.bsFilter == null || this.bsFilter.get (i)) {
if (++n == atomCount) return true;
trajectoryStep[n] = pt;
}}
return true;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~A");
});
