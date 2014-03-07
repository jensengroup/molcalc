Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.SimpleUnitCell", "$.Point3f"], "org.jmol.symmetry.UnitCell", ["org.jmol.util.BoxInfo", "$.Matrix4f", "$.Quadric"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vertices = null;
this.cartesianOffset = null;
this.fractionalOffset = null;
this.allFractionalRelative = false;
this.unitCellMultiplier = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "UnitCell", org.jmol.util.SimpleUnitCell);
Clazz.prepareFields (c$, function () {
this.cartesianOffset =  new org.jmol.util.Point3f ();
this.fractionalOffset =  new org.jmol.util.Point3f ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.symmetry.UnitCell, []);
});
c$.newP = Clazz.defineMethod (c$, "newP", 
function (points) {
var c =  new org.jmol.symmetry.UnitCell ();
var parameters = [-1, 0, 0, 0, 0, 0, points[1].x, points[1].y, points[1].z, points[2].x, points[2].y, points[2].z, points[3].x, points[3].y, points[3].z];
c.set (parameters);
c.allFractionalRelative = true;
c.calcUnitcellVertices ();
c.setCartesianOffset (points[0]);
return c;
}, "~A");
c$.newA = Clazz.overrideMethod (c$, "newA", 
function (notionalUnitcell) {
var c =  new org.jmol.symmetry.UnitCell ();
c.set (notionalUnitcell);
c.calcUnitcellVertices ();
return c;
}, "~A");
Clazz.defineMethod (c$, "setOrientation", 
function (mat) {
if (mat == null) return;
var m =  new org.jmol.util.Matrix4f ();
m.setM3 (mat);
this.matrixFractionalToCartesian.mul2 (m, this.matrixFractionalToCartesian);
this.matrixCartesianToFractional.invertM (this.matrixFractionalToCartesian);
this.calcUnitcellVertices ();
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "toUnitCell", 
function (pt, offset) {
if (this.matrixCartesianToFractional == null) return;
if (offset == null) {
this.matrixCartesianToFractional.transform (pt);
switch (this.dimension) {
case 3:
pt.z = org.jmol.symmetry.UnitCell.toFractional (pt.z);
case 2:
pt.y = org.jmol.symmetry.UnitCell.toFractional (pt.y);
case 1:
pt.x = org.jmol.symmetry.UnitCell.toFractional (pt.x);
}
this.matrixFractionalToCartesian.transform (pt);
} else {
this.matrixCtoFAbsolute.transform (pt);
switch (this.dimension) {
case 3:
pt.z = org.jmol.symmetry.UnitCell.toFractional (pt.z);
case 2:
pt.y = org.jmol.symmetry.UnitCell.toFractional (pt.y);
case 1:
pt.x = org.jmol.symmetry.UnitCell.toFractional (pt.x);
}
pt.add (offset);
this.matrixFtoCAbsolute.transform (pt);
}}, "org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setAllFractionalRelative", 
function (TF) {
this.allFractionalRelative = TF;
}, "~B");
Clazz.defineMethod (c$, "setOffset", 
function (pt) {
if (pt == null) return;
if (pt.x >= 100 || pt.y >= 100) {
this.unitCellMultiplier = org.jmol.util.Point3f.newP (pt);
return;
}if (pt.x == 0 && pt.y == 0 && pt.z == 0) this.unitCellMultiplier = null;
this.fractionalOffset.setT (pt);
this.matrixCartesianToFractional.m03 = -pt.x;
this.matrixCartesianToFractional.m13 = -pt.y;
this.matrixCartesianToFractional.m23 = -pt.z;
this.cartesianOffset.setT (pt);
this.matrixFractionalToCartesian.m03 = 0;
this.matrixFractionalToCartesian.m13 = 0;
this.matrixFractionalToCartesian.m23 = 0;
this.matrixFractionalToCartesian.transform (this.cartesianOffset);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFAbsolute.setM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute.setM (this.matrixFractionalToCartesian);
}}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setCartesianOffset", 
function (origin) {
this.cartesianOffset.setT (origin);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
this.fractionalOffset.setT (this.cartesianOffset);
this.matrixCartesianToFractional.m03 = 0;
this.matrixCartesianToFractional.m13 = 0;
this.matrixCartesianToFractional.m23 = 0;
this.matrixCartesianToFractional.transform (this.fractionalOffset);
this.matrixCartesianToFractional.m03 = -this.fractionalOffset.x;
this.matrixCartesianToFractional.m13 = -this.fractionalOffset.y;
this.matrixCartesianToFractional.m23 = -this.fractionalOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFAbsolute.setM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute.setM (this.matrixFractionalToCartesian);
}}, "org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "setMinMaxLatticeParameters", 
function (minXYZ, maxXYZ) {
if (maxXYZ.x <= 555 && maxXYZ.y >= 555) {
var pt =  new org.jmol.util.Point3f ();
org.jmol.util.SimpleUnitCell.ijkToPoint3f (maxXYZ.x, pt, 0);
minXYZ.x = Clazz.floatToInt (pt.x);
minXYZ.y = Clazz.floatToInt (pt.y);
minXYZ.z = Clazz.floatToInt (pt.z);
org.jmol.util.SimpleUnitCell.ijkToPoint3f (maxXYZ.y, pt, 1);
maxXYZ.x = Clazz.floatToInt (pt.x);
maxXYZ.y = Clazz.floatToInt (pt.y);
maxXYZ.z = Clazz.floatToInt (pt.z);
}switch (this.dimension) {
case 1:
minXYZ.y = 0;
maxXYZ.y = 1;
case 2:
minXYZ.z = 0;
maxXYZ.z = 1;
}
}, "org.jmol.util.Point3i,org.jmol.util.Point3i");
Clazz.defineMethod (c$, "dumpInfo", 
function (isFull) {
return "a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", alpha=" + this.alpha + ", beta=" + this.beta + ", gamma=" + this.gamma + (isFull ? "\nfractional to cartesian: " + this.matrixFractionalToCartesian + "\ncartesian to fractional: " + this.matrixCartesianToFractional : "");
}, "~B");
Clazz.defineMethod (c$, "getVertices", 
function () {
return this.vertices;
});
Clazz.defineMethod (c$, "getCartesianOffset", 
function () {
return this.cartesianOffset;
});
Clazz.defineMethod (c$, "getFractionalOffset", 
function () {
return this.fractionalOffset;
});
Clazz.defineMethod (c$, "getEllipsoid", 
function (parBorU) {
if (parBorU == null) return null;
if (parBorU[0] == 0) {
var lengths =  Clazz.newFloatArray (3, 0);
lengths[0] = lengths[1] = lengths[2] = Math.sqrt (parBorU[7]);
return  new org.jmol.util.Quadric (null, lengths, true);
}var Bcart =  Clazz.newDoubleArray (6, 0);
var ortepType = Clazz.floatToInt (parBorU[6]);
if (ortepType == 12) {
Bcart[0] = parBorU[0] * 19.739208802178716;
Bcart[1] = parBorU[1] * 19.739208802178716;
Bcart[2] = parBorU[2] * 19.739208802178716;
Bcart[3] = parBorU[3] * 19.739208802178716 * 2;
Bcart[4] = parBorU[4] * 19.739208802178716 * 2;
Bcart[5] = parBorU[5] * 19.739208802178716 * 2;
parBorU[7] = (parBorU[0] + parBorU[1] + parBorU[3]) / 3;
} else {
var isFractional = (ortepType == 4 || ortepType == 5 || ortepType == 8 || ortepType == 9);
var cc = 2 - (ortepType % 2);
var dd = (ortepType == 8 || ortepType == 9 || ortepType == 10 ? 19.739208802178716 : ortepType == 4 || ortepType == 5 ? 0.25 : ortepType == 2 || ortepType == 3 ? Math.log (2) : 1);
var B11 = parBorU[0] * dd * (isFractional ? this.a_ * this.a_ : 1);
var B22 = parBorU[1] * dd * (isFractional ? this.b_ * this.b_ : 1);
var B33 = parBorU[2] * dd * (isFractional ? this.c_ * this.c_ : 1);
var B12 = parBorU[3] * dd * (isFractional ? this.a_ * this.b_ : 1) * cc;
var B13 = parBorU[4] * dd * (isFractional ? this.a_ * this.c_ : 1) * cc;
var B23 = parBorU[5] * dd * (isFractional ? this.b_ * this.c_ : 1) * cc;
parBorU[7] = Math.pow (B11 / 19.739208802178716 / this.a_ / this.a_ * B22 / 19.739208802178716 / this.b_ / this.b_ * B33 / 19.739208802178716 / this.c_ / this.c_, 0.3333);
Bcart[0] = this.a * this.a * B11 + this.b * this.b * this.cosGamma * this.cosGamma * B22 + this.c * this.c * this.cosBeta * this.cosBeta * B33 + this.a * this.b * this.cosGamma * B12 + this.b * this.c * this.cosGamma * this.cosBeta * B23 + this.a * this.c * this.cosBeta * B13;
Bcart[1] = this.b * this.b * this.sinGamma * this.sinGamma * B22 + this.c * this.c * this.cA_ * this.cA_ * B33 + this.b * this.c * this.cA_ * this.sinGamma * B23;
Bcart[2] = this.c * this.c * this.cB_ * this.cB_ * B33;
Bcart[3] = 2 * this.b * this.b * this.cosGamma * this.sinGamma * B22 + 2 * this.c * this.c * this.cA_ * this.cosBeta * B33 + this.a * this.b * this.sinGamma * B12 + this.b * this.c * (this.cA_ * this.cosGamma + this.sinGamma * this.cosBeta) * B23 + this.a * this.c * this.cA_ * B13;
Bcart[4] = 2 * this.c * this.c * this.cB_ * this.cosBeta * B33 + this.b * this.c * this.cosGamma * B23 + this.a * this.c * this.cB_ * B13;
Bcart[5] = 2 * this.c * this.c * this.cA_ * this.cB_ * B33 + this.b * this.c * this.cB_ * this.sinGamma * B23;
}return  new org.jmol.util.Quadric (Bcart);
}, "~A");
Clazz.defineMethod (c$, "getCanonicalCopy", 
function (scale) {
var pts =  new Array (8);
for (var i = 0; i < 8; i++) {
pts[i] = org.jmol.util.Point3f.newP (org.jmol.util.BoxInfo.unitCubePoints[i]);
this.matrixFractionalToCartesian.transform (pts[i]);
}
return org.jmol.util.BoxInfo.getCanonicalCopy (pts, scale);
}, "~N");
c$.toFractional = Clazz.defineMethod (c$, "toFractional", 
($fz = function (x) {
x = (x - Math.floor (x));
if (x > 0.9999 || x < 0.0001) x = 0;
return x;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "calcUnitcellVertices", 
($fz = function () {
if (this.matrixFractionalToCartesian == null) return;
this.matrixCtoFAbsolute = org.jmol.util.Matrix4f.newM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute = org.jmol.util.Matrix4f.newM (this.matrixFractionalToCartesian);
this.vertices =  new Array (8);
for (var i = 8; --i >= 0; ) {
this.vertices[i] =  new org.jmol.util.Point3f ();
this.matrixFractionalToCartesian.transform2 (org.jmol.util.BoxInfo.unitCubePoints[i], this.vertices[i]);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkDistance", 
function (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset) {
var p1 = org.jmol.util.Point3f.newP (f1);
this.toCartesian (p1, true);
for (var i = -iRange; i <= iRange; i++) for (var j = -jRange; j <= jRange; j++) for (var k = -kRange; k <= kRange; k++) {
ptOffset.set (f2.x + i, f2.y + j, f2.z + k);
this.toCartesian (ptOffset, true);
var d = p1.distance (ptOffset);
if (dx > 0 ? Math.abs (d - distance) <= dx : d <= distance && d > 0.1) {
ptOffset.set (i, j, k);
return true;
}}


return false;
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,~N,~N,~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "getUnitCellMultiplier", 
function () {
return this.unitCellMultiplier;
});
Clazz.defineMethod (c$, "getUnitCellVectors", 
function () {
var m = this.matrixFractionalToCartesian;
return [org.jmol.util.Point3f.newP (this.cartesianOffset), org.jmol.util.Point3f.new3 (m.m00, m.m10, m.m20), org.jmol.util.Point3f.new3 (m.m01, m.m11, m.m21), org.jmol.util.Point3f.new3 (m.m02, m.m12, m.m22)];
});
Clazz.defineStatics (c$,
"twoP2", 19.739208802178716);
});
