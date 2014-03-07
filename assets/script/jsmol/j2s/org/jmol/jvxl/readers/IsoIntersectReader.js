Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.AtomDataReader", "org.jmol.util.BitSet"], "org.jmol.jvxl.readers.IsoIntersectReader", ["java.lang.Float"], function () {
c$ = Clazz.decorateAsClass (function () {
this.myBsA = null;
this.myBsB = null;
this.bsAtomMinMax = null;
this.func = null;
this.funcType = 0;
this.thisPlaneB = null;
this.values = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "IsoIntersectReader", org.jmol.jvxl.readers.AtomDataReader);
Clazz.prepareFields (c$, function () {
this.myBsA =  new org.jmol.util.BitSet ();
this.myBsB =  new org.jmol.util.BitSet ();
this.bsAtomMinMax =  new Array (2);
this.values =  Clazz.newFloatArray (2, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.IsoIntersectReader, []);
});
Clazz.overrideMethod (c$, "readVolumeParameters", 
function (isMapData) {
this.setup (isMapData);
if (isMapData) return false;
this.initializeVolumetricData ();
this.volumeData.setUnitVectors ();
this.thisPlaneB =  Clazz.newFloatArray (this.volumeData.getYzCount (), 0);
this.voxelSource =  Clazz.newIntArray (this.volumeData.nPoints, 0);
this.getAtomMinMax (this.myBsA, this.bsAtomMinMax[0] =  new Array (this.nPointsX));
this.getAtomMinMax (this.myBsB, this.bsAtomMinMax[1] =  new Array (this.nPointsX));
return true;
}, "~B");
Clazz.defineMethod (c$, "setup", 
function (isMapData) {
Clazz.superCall (this, org.jmol.jvxl.readers.IsoIntersectReader, "setup", [isMapData]);
this.params.fullyLit = true;
this.point = this.params.point;
if (Clazz.instanceOf (this.params.func, String)) {
this.funcType = (this.params.func.equals ("a-b") ? 2 : this.params.func.equals ("a+b") ? 1 : 3);
} else if (this.params.func == null || this.atomDataServer == null) {
this.funcType = 2;
} else {
this.func = this.params.func;
}if (this.contactPair == null) {
var bsA = this.params.intersection[0];
var bsB = this.params.intersection[1];
var bsSelected =  new org.jmol.util.BitSet ();
bsSelected.or (bsA);
bsSelected.or (bsB);
this.doUseIterator = true;
this.getAtoms (bsSelected, this.doAddHydrogens, true, true, false, false, false, NaN);
for (var i = bsA.nextSetBit (0); i >= 0; i = bsA.nextSetBit (i + 1)) this.myBsA.set (this.myIndex[i]);

for (var i = bsB.nextSetBit (0); i >= 0; i = bsB.nextSetBit (i + 1)) this.myBsB.set (this.myIndex[i]);

this.setHeader ("VDW intersection surface", this.params.calculationType);
this.setRanges (this.params.solvent_ptsPerAngstrom, this.params.solvent_gridMax, 0);
this.margin = 5;
} else {
this.setVolumeData ();
}this.isProgressive = this.isXLowToHigh = true;
}, "~B");
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
if (this.yzCount == 0) {
this.initPlanes ();
}this.thisX = x;
this.thisPlane = this.yzPlanes[x % 2];
if (this.contactPair == null) {
this.thisAtomSet = this.bsAtomMinMax[0][x];
this.resetPlane (3.4028235E38);
this.markSphereVoxels (0, this.params.distance);
this.thisPlane = this.thisPlaneB;
this.thisAtomSet = this.bsAtomMinMax[1][x];
this.resetPlane (3.4028235E38);
this.markSphereVoxels (0, this.params.distance);
} else {
this.markPlaneVoxels (this.contactPair.myAtoms[0], this.contactPair.radii[0]);
this.thisPlane = this.thisPlaneB;
this.markPlaneVoxels (this.contactPair.myAtoms[1], this.contactPair.radii[1]);
}this.thisPlane = this.yzPlanes[x % 2];
if (!this.setVoxels ()) this.resetPlane (0);
if (this.contactPair == null) this.unsetVoxelData ();
return this.thisPlane;
}, "~N");
Clazz.defineMethod (c$, "setVoxels", 
($fz = function () {
for (var i = 0; i < this.yzCount; i++) {
var va = this.thisPlane[i];
var vb = this.thisPlaneB[i];
var v = this.getValue (va, vb);
if (Float.isNaN (v)) return false;
this.thisPlane[i] = v;
}
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getValue", 
($fz = function (va, vb) {
if (va == 3.4028235E38 || vb == 3.4028235E38 || Float.isNaN (va) || Float.isNaN (vb)) return 3.4028235E38;
switch (this.funcType) {
case 1:
return (va + vb);
case 2:
case 4:
return (va - vb);
case 3:
return (va > vb ? va : vb);
default:
this.values[0] = va;
this.values[1] = vb;
return this.atomDataServer.evalFunctionFloat (this.func[0], this.func[1], this.values);
}
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getValueAtPoint", 
function (pt) {
return this.getValue (this.getValueAtPoint (pt, this.myBsA), this.getValueAtPoint (pt, this.myBsB));
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "getValueAtPoint", 
($fz = function (pt, bs) {
var value = 3.4028235E38;
for (var iAtom = bs.nextSetBit (0); iAtom >= 0; iAtom = bs.nextSetBit (iAtom + 1)) {
var r = pt.distance (this.atomXyz[iAtom]) - this.atomRadius[iAtom];
if (r < value) value = r;
}
return (value == 3.4028235E38 ? NaN : value);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f,org.jmol.util.BitSet");
Clazz.defineStatics (c$,
"TYPE_FUNCTION", 0,
"TYPE_SUM", 1,
"TYPE_DIFF", 2,
"TYPE_MAX", 3,
"TYPE_DIFF_PAIR", 4);
});
