Clazz.declarePackage ("org.jmol.geodesic");
Clazz.load (["org.jmol.atomdata.AtomData", "org.jmol.util.Point3f"], "org.jmol.geodesic.EnvelopeCalculation", ["org.jmol.atomdata.RadiusData", "org.jmol.util.ArrayUtil", "$.BitSet", "$.BitSetUtil", "$.Geodesic", "$.Normix", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.geodesicMap = null;
this.mapT = null;
this.mads = null;
this.atomData = null;
this.viewer = null;
this.atomCount = 0;
this.maxRadius = 0;
this.modelZeroBased = false;
this.disregardNeighbors = false;
this.bsMySelected = null;
this.dotsConvexMaps = null;
this.dotsConvexMax = 0;
this.geodesicCount = 0;
this.bsSurface = null;
this.radiusP = 0;
this.diameterP = 0;
this.bsTemp = null;
this.bsIgnore = null;
this.onlySelectedDots = false;
this.isSurface = false;
this.multiModel = false;
this.currentPoints = null;
this.indexI = 0;
this.centerI = null;
this.radiusI = 0;
this.radiiIP2 = 0;
this.pointT = null;
this.centerT = null;
this.vertexTest = null;
this.neighborCount = 0;
this.neighborIndices = null;
this.neighborCenters = null;
this.neighborPlusProbeRadii2 = null;
this.neighborRadii2 = null;
Clazz.instantialize (this, arguments);
}, org.jmol.geodesic, "EnvelopeCalculation");
Clazz.prepareFields (c$, function () {
this.atomData =  new org.jmol.atomdata.AtomData ();
this.pointT =  new org.jmol.util.Point3f ();
this.vertexTest =  new Array (12);
{
for (var i = 0; i < 12; i++) this.vertexTest[i] =  new org.jmol.util.Point3f ();

}this.neighborIndices =  Clazz.newIntArray (16, 0);
this.neighborCenters =  new Array (16);
this.neighborPlusProbeRadii2 =  Clazz.newFloatArray (16, 0);
this.neighborRadii2 =  Clazz.newFloatArray (16, 0);
});
Clazz.makeConstructor (c$, 
function (viewer, atomCount, mads) {
this.viewer = viewer;
this.atomCount = atomCount;
this.mads = mads;
this.geodesicCount = org.jmol.util.Geodesic.getVertexCount (3);
this.geodesicMap = org.jmol.util.BitSetUtil.newBitSet (this.geodesicCount);
this.mapT = org.jmol.util.BitSetUtil.newBitSet (this.geodesicCount);
($t$ = org.jmol.geodesic.EnvelopeCalculation.EMPTY_SET = org.jmol.util.BitSetUtil.emptySet, org.jmol.geodesic.EnvelopeCalculation.prototype.EMPTY_SET = org.jmol.geodesic.EnvelopeCalculation.EMPTY_SET, $t$);
}, "org.jmol.atomdata.AtomDataServer,~N,~A");
Clazz.defineMethod (c$, "getDotsConvexMaps", 
function () {
return this.dotsConvexMaps;
});
Clazz.defineMethod (c$, "getDotsConvexMax", 
function () {
return this.dotsConvexMax;
});
Clazz.defineMethod (c$, "allocDotsConvexMaps", 
function (max) {
if (this.dotsConvexMax >= max) return;
this.dotsConvexMax = max;
this.dotsConvexMaps =  new Array (max);
}, "~N");
Clazz.defineMethod (c$, "getBsSurfaceClone", 
function () {
return org.jmol.util.BitSetUtil.copy (this.bsSurface);
});
Clazz.defineMethod (c$, "setMads", 
function (mads) {
this.mads = mads;
}, "~A");
Clazz.defineMethod (c$, "setFromBits", 
function (index, bs) {
this.geodesicMap.setBits (0, this.geodesicCount);
for (var iDot = this.geodesicCount; --iDot >= 0; ) if (!bs.get (iDot)) this.geodesicMap.clear (iDot);

if (this.dotsConvexMaps == null) this.dotsConvexMaps =  new Array (this.atomCount);
var map;
if (this.geodesicMap.isEmpty ()) map = org.jmol.geodesic.EnvelopeCalculation.EMPTY_SET;
 else map = org.jmol.util.BitSetUtil.copy (this.geodesicMap);
if (index >= this.dotsConvexMaps.length) return;
this.dotsConvexMaps[index] = map;
this.dotsConvexMax = Math.max (this.dotsConvexMax, index);
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "newSet", 
function () {
this.dotsConvexMax = 0;
this.dotsConvexMaps = null;
this.radiusP = this.diameterP = 0;
this.mads = null;
});
Clazz.defineMethod (c$, "reCalculate", 
function (bs, m) {
if (this.atomData.radiusData != null) {
this.calculate (null, this.maxRadius, bs, this.bsIgnore, this.disregardNeighbors, this.onlySelectedDots, this.isSurface, this.multiModel);
return;
}if (this.dotsConvexMaps == null || this.dotsConvexMax == 0) return;
var pt =  new org.jmol.util.Vector3f ();
if (this.bsTemp == null) this.bsTemp = org.jmol.util.Normix.newVertexBitSet ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (i >= this.dotsConvexMax) return;
var map = this.dotsConvexMaps[i];
if (map == null || map.isEmpty ()) continue;
var bsNew =  new org.jmol.util.BitSet ();
for (var j = map.nextSetBit (0); j >= 0; j = map.nextSetBit (j + 1)) {
pt.setT (org.jmol.util.Geodesic.getVertexVector (j));
m.transform (pt);
bsNew.set (org.jmol.util.Normix.getNormixV (pt, this.bsTemp));
}
this.dotsConvexMaps[i] = bsNew;
}
}, "org.jmol.util.BitSet,org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "calculate", 
function (rd, maxRadius, bsSelected, bsIgnore, disregardNeighbors, onlySelectedDots, isSurface, multiModel) {
if (rd == null) {
rd = this.atomData.radiusData;
if (rd == null) return;
} else {
this.atomData.radiusData = rd;
this.bsIgnore = bsIgnore;
this.onlySelectedDots = onlySelectedDots;
this.multiModel = multiModel;
this.isSurface = isSurface;
}if (rd.value == 3.4028235E38) rd.value = 3.0;
this.atomData.modelIndex = (multiModel ? -1 : 0);
this.modelZeroBased = !multiModel;
this.viewer.fillAtomData (this.atomData, 1 | (this.mads == null ? 2 : 0));
this.atomCount = this.atomData.atomCount;
if (this.mads != null) for (var i = 0; i < this.atomCount; i++) this.atomData.atomRadius[i] = this.mads[i] / 1000;

this.bsMySelected = (onlySelectedDots && bsSelected != null ? org.jmol.util.BitSetUtil.copy (bsSelected) : bsIgnore != null ? org.jmol.util.BitSetUtil.setAll (this.atomCount) : null);
org.jmol.util.BitSetUtil.andNot (this.bsMySelected, bsIgnore);
this.disregardNeighbors = disregardNeighbors;
this.maxRadius = maxRadius;
this.bsSurface =  new org.jmol.util.BitSet ();
var isAll = (bsSelected == null);
var iter = this.viewer.getSelectedAtomIterator (this.bsMySelected, false, this.modelZeroBased, false);
var i0 = (isAll ? this.atomCount - 1 : bsSelected.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsSelected.nextSetBit (i + 1))) if (bsIgnore == null || !bsIgnore.get (i)) {
this.setAtomI (i);
this.getNeighbors (iter);
this.calcConvexMap (isSurface);
}
iter.release ();
this.currentPoints = null;
this.setDotsConvexMax ();
}, "org.jmol.atomdata.RadiusData,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~B,~B");
Clazz.defineMethod (c$, "getRadius", 
function (atomIndex) {
return this.atomData.atomRadius[atomIndex];
}, "~N");
Clazz.defineMethod (c$, "getPoints", 
function () {
if (this.dotsConvexMaps == null) {
this.calculate ( new org.jmol.atomdata.RadiusData (null, 3.0, org.jmol.atomdata.RadiusData.EnumType.ABSOLUTE, null), 3.4028235E38, this.bsMySelected, null, false, false, false, false);
}if (this.currentPoints != null) return this.currentPoints;
var nPoints = 0;
var dotCount = 42;
for (var i = this.dotsConvexMax; --i >= 0; ) if (this.dotsConvexMaps[i] != null) nPoints += this.dotsConvexMaps[i].cardinalityN (dotCount);

var points =  new Array (nPoints);
if (nPoints == 0) return points;
nPoints = 0;
for (var i = this.dotsConvexMax; --i >= 0; ) if (this.dotsConvexMaps[i] != null) {
var iDot = this.dotsConvexMaps[i].size ();
if (iDot > dotCount) iDot = dotCount;
while (--iDot >= 0) if (this.dotsConvexMaps[i].get (iDot)) {
var pt =  new org.jmol.util.Point3f ();
pt.scaleAdd2 (this.atomData.atomRadius[i], org.jmol.util.Geodesic.getVertexVector (iDot), this.atomData.atomXyz[i]);
points[nPoints++] = pt;
}
}
this.currentPoints = points;
return points;
});
Clazz.defineMethod (c$, "setDotsConvexMax", 
($fz = function () {
if (this.dotsConvexMaps == null) this.dotsConvexMax = 0;
 else {
var i;
for (i = this.atomCount; --i >= 0 && this.dotsConvexMaps[i] == null; ) {
}
this.dotsConvexMax = i + 1;
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAppropriateRadius", 
function (atomIndex) {
return (this.mads != null ? (atomIndex >= this.mads.length ? 0 : this.mads[atomIndex] / 1000) : this.atomData.atomRadius[atomIndex]);
}, "~N");
Clazz.defineMethod (c$, "setAtomI", 
($fz = function (indexI) {
this.indexI = indexI;
this.centerI = this.atomData.atomXyz[indexI];
this.radiusI = this.atomData.atomRadius[indexI];
this.radiiIP2 = this.radiusI + this.radiusP;
this.radiiIP2 *= this.radiiIP2;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "calcConvexMap", 
($fz = function (isSurface) {
if (this.dotsConvexMaps == null) this.dotsConvexMaps =  new Array (this.atomCount);
this.calcConvexBits ();
var map;
if (this.geodesicMap.isEmpty ()) map = org.jmol.geodesic.EnvelopeCalculation.EMPTY_SET;
 else {
this.bsSurface.set (this.indexI);
if (isSurface) {
this.addIncompleteFaces (this.geodesicMap);
this.addIncompleteFaces (this.geodesicMap);
}map = org.jmol.util.BitSetUtil.copy (this.geodesicMap);
}this.dotsConvexMaps[this.indexI] = map;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "addIncompleteFaces", 
($fz = function (points) {
this.mapT.clearAll ();
var faces = org.jmol.util.Geodesic.getFaceVertexes (3);
var len = faces.length;
var maxPt = -1;
for (var f = 0; f < len; ) {
var p1 = faces[f++];
var p2 = faces[f++];
var p3 = faces[f++];
var ok1 = points.get (p1);
var ok2 = points.get (p2);
var ok3 = points.get (p3);
if (!(ok1 || ok2 || ok3) || ok1 && ok2 && ok3) continue;
if (!ok1) {
this.mapT.set (p1);
if (maxPt < p1) maxPt = p1;
}if (!ok2) {
this.mapT.set (p2);
if (maxPt < p2) maxPt = p2;
}if (!ok3) {
this.mapT.set (p3);
if (maxPt < p3) maxPt = p3;
}}
for (var i = 0; i <= maxPt; i++) {
if (this.mapT.get (i)) points.set (i);
}
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "calcConvexBits", 
($fz = function () {
this.geodesicMap.setBits (0, this.geodesicCount);
var combinedRadii = this.radiusI + this.radiusP;
if (this.neighborCount == 0) return;
var faceTest;
var p1;
var p2;
var p3;
var faces = org.jmol.util.Geodesic.getFaceVertexes (3);
var p4 = org.jmol.geodesic.EnvelopeCalculation.power4[2];
var ok1;
var ok2;
var ok3;
this.mapT.clearAll ();
for (var i = 0; i < 12; i++) {
this.vertexTest[i].setT (org.jmol.util.Geodesic.getVertexVector (i));
this.vertexTest[i].scaleAdd (combinedRadii, this.centerI);
}
for (var f = 0; f < 20; f++) {
faceTest = 0;
p1 = faces[3 * p4 * (4 * f + 0)];
p2 = faces[3 * p4 * (4 * f + 1)];
p3 = faces[3 * p4 * (4 * f + 2)];
for (var j = 0; j < this.neighborCount; j++) {
var maxDist = this.neighborPlusProbeRadii2[j];
this.centerT = this.neighborCenters[j];
ok1 = this.vertexTest[p1].distanceSquared (this.centerT) >= maxDist;
ok2 = this.vertexTest[p2].distanceSquared (this.centerT) >= maxDist;
ok3 = this.vertexTest[p3].distanceSquared (this.centerT) >= maxDist;
if (!ok1) this.geodesicMap.clear (p1);
if (!ok2) this.geodesicMap.clear (p2);
if (!ok3) this.geodesicMap.clear (p3);
if (!ok1 && !ok2 && !ok3) {
faceTest = -1;
break;
}}
var kFirst = f * 12 * p4;
var kLast = kFirst + 12 * p4;
for (var k = kFirst; k < kLast; k++) {
var vect = faces[k];
if (this.mapT.get (vect) || !this.geodesicMap.get (vect)) continue;
switch (faceTest) {
case -1:
this.geodesicMap.clear (vect);
break;
case 0:
for (var j = 0; j < this.neighborCount; j++) {
var maxDist = this.neighborPlusProbeRadii2[j];
this.centerT = this.neighborCenters[j];
this.pointT.setT (org.jmol.util.Geodesic.getVertexVector (vect));
this.pointT.scaleAdd (combinedRadii, this.centerI);
if (this.pointT.distanceSquared (this.centerT) < maxDist) this.geodesicMap.clear (vect);
}
break;
case 1:
}
this.mapT.set (vect);
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getNeighbors", 
($fz = function (iter) {
this.neighborCount = 0;
if (this.disregardNeighbors) return null;
this.viewer.setIteratorForAtom (iter, this.indexI, this.radiusI + this.diameterP + this.maxRadius);
while (iter.hasNext ()) {
var indexN = iter.next ();
var neighborRadius = this.atomData.atomRadius[indexN];
if (this.centerI.distance (this.atomData.atomXyz[indexN]) > this.radiusI + this.radiusP + this.radiusP + neighborRadius) continue;
if (this.neighborCount == this.neighborIndices.length) {
this.neighborIndices = org.jmol.util.ArrayUtil.doubleLengthI (this.neighborIndices);
this.neighborCenters = org.jmol.util.ArrayUtil.doubleLength (this.neighborCenters);
this.neighborPlusProbeRadii2 = org.jmol.util.ArrayUtil.doubleLengthF (this.neighborPlusProbeRadii2);
this.neighborRadii2 = org.jmol.util.ArrayUtil.doubleLengthF (this.neighborRadii2);
}this.neighborCenters[this.neighborCount] = this.atomData.atomXyz[indexN];
this.neighborIndices[this.neighborCount] = indexN;
var r = neighborRadius + this.radiusP;
this.neighborPlusProbeRadii2[this.neighborCount] = r * r;
this.neighborRadii2[this.neighborCount] = neighborRadius * neighborRadius;
++this.neighborCount;
}
return iter;
}, $fz.isPrivate = true, $fz), "org.jmol.api.AtomIndexIterator");
Clazz.defineMethod (c$, "deleteAtoms", 
function (firstAtomDeleted, nAtomsDeleted) {
this.dotsConvexMaps = org.jmol.util.ArrayUtil.deleteElements (this.dotsConvexMaps, firstAtomDeleted, nAtomsDeleted);
this.dotsConvexMax = this.dotsConvexMaps.length;
if (this.mads != null) this.mads = org.jmol.util.ArrayUtil.deleteElements (this.mads, firstAtomDeleted, nAtomsDeleted);
this.atomData.atomRadius = org.jmol.util.ArrayUtil.deleteElements (this.atomData.atomRadius, firstAtomDeleted, nAtomsDeleted);
this.atomData.atomXyz = org.jmol.util.ArrayUtil.deleteElements (this.atomData.atomXyz, firstAtomDeleted, nAtomsDeleted);
this.atomData.atomCount -= nAtomsDeleted;
this.atomCount = this.atomData.atomCount;
}, "~N,~N");
Clazz.defineStatics (c$,
"EMPTY_SET", null,
"SURFACE_DISTANCE_FOR_CALCULATION", 3,
"MAX_LEVEL", 3);
Clazz.defineStatics (c$,
"power4", [1, 4, 16, 64, 256]);
});
