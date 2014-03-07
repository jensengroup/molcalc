Clazz.declarePackage ("org.jmol.util");
Clazz.load (null, "org.jmol.util.Measure", ["java.lang.Float", "java.util.ArrayList", "org.jmol.util.Eigen", "$.Escape", "$.Logger", "$.Point3f", "$.Point4f", "$.Quaternion", "$.Vector3f", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.declareType (org.jmol.util, "Measure");
c$.computeAngle = Clazz.defineMethod (c$, "computeAngle", 
function (pointA, pointB, pointC, vectorBA, vectorBC, asDegrees) {
vectorBA.sub2 (pointA, pointB);
vectorBC.sub2 (pointC, pointB);
var angle = vectorBA.angle (vectorBC);
return (asDegrees ? angle / 0.017453292 : angle);
}, "org.jmol.util.Tuple3f,org.jmol.util.Tuple3f,org.jmol.util.Tuple3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,~B");
c$.computeAngleABC = Clazz.defineMethod (c$, "computeAngleABC", 
function (pointA, pointB, pointC, asDegrees) {
var vectorBA =  new org.jmol.util.Vector3f ();
var vectorBC =  new org.jmol.util.Vector3f ();
return org.jmol.util.Measure.computeAngle (pointA, pointB, pointC, vectorBA, vectorBC, asDegrees);
}, "org.jmol.util.Tuple3f,org.jmol.util.Tuple3f,org.jmol.util.Tuple3f,~B");
c$.computeTorsion = Clazz.defineMethod (c$, "computeTorsion", 
function (p1, p2, p3, p4, asDegrees) {
var ijx = p1.x - p2.x;
var ijy = p1.y - p2.y;
var ijz = p1.z - p2.z;
var kjx = p3.x - p2.x;
var kjy = p3.y - p2.y;
var kjz = p3.z - p2.z;
var klx = p3.x - p4.x;
var kly = p3.y - p4.y;
var klz = p3.z - p4.z;
var ax = ijy * kjz - ijz * kjy;
var ay = ijz * kjx - ijx * kjz;
var az = ijx * kjy - ijy * kjx;
var cx = kjy * klz - kjz * kly;
var cy = kjz * klx - kjx * klz;
var cz = kjx * kly - kjy * klx;
var ai2 = 1 / (ax * ax + ay * ay + az * az);
var ci2 = 1 / (cx * cx + cy * cy + cz * cz);
var ai = Math.sqrt (ai2);
var ci = Math.sqrt (ci2);
var denom = ai * ci;
var cross = ax * cx + ay * cy + az * cz;
var cosang = cross * denom;
if (cosang > 1) {
cosang = 1;
}if (cosang < -1) {
cosang = -1;
}var torsion = Math.acos (cosang);
var dot = ijx * cx + ijy * cy + ijz * cz;
var absDot = Math.abs (dot);
torsion = (dot / absDot > 0) ? torsion : -torsion;
return (asDegrees ? torsion / 0.017453292 : torsion);
}, "org.jmol.util.Tuple3f,org.jmol.util.Tuple3f,org.jmol.util.Tuple3f,org.jmol.util.Tuple3f,~B");
c$.computeHelicalAxis = Clazz.defineMethod (c$, "computeHelicalAxis", 
function (id, tokType, a, b, dq) {
var vab =  new org.jmol.util.Vector3f ();
vab.sub2 (b, a);
var theta = dq.getTheta ();
var n = dq.getNormal ();
var v_dot_n = vab.dot (n);
if (Math.abs (v_dot_n) < 0.0001) v_dot_n = 0;
if (tokType == 1073741854) {
if (v_dot_n != 0) n.scale (v_dot_n);
return n;
}var va_prime_d =  new org.jmol.util.Vector3f ();
va_prime_d.cross (vab, n);
if (va_prime_d.dot (va_prime_d) != 0) va_prime_d.normalize ();
var vda =  new org.jmol.util.Vector3f ();
var vcb = org.jmol.util.Vector3f.newV (n);
if (v_dot_n == 0) v_dot_n = 1.4E-45;
vcb.scale (v_dot_n);
vda.sub2 (vcb, vab);
vda.scale (0.5);
va_prime_d.scale (theta == 0 ? 0 : (vda.length () / Math.tan (theta / 2 / 180 * 3.141592653589793)));
var r = org.jmol.util.Vector3f.newV (va_prime_d);
if (theta != 0) r.add (vda);
if (tokType == 1666189314) return r;
var pt_a_prime = org.jmol.util.Point3f.newP (a);
pt_a_prime.sub (r);
if (tokType == 135266320) {
return pt_a_prime;
}if (v_dot_n != 1.4E-45) n.scale (v_dot_n);
var pt_b_prime = org.jmol.util.Point3f.newP (pt_a_prime);
pt_b_prime.add (n);
theta = org.jmol.util.Measure.computeTorsion (a, pt_a_prime, pt_b_prime, b, true);
if (Float.isNaN (theta) || r.length () < 0.0001) theta = dq.getThetaDirectedV (n);
if (tokType == 135266305) return  new Float (theta);
if (tokType == 135176) return "draw ID \"" + id + "\" VECTOR " + org.jmol.util.Escape.escapePt (pt_a_prime) + " " + org.jmol.util.Escape.escapePt (n) + " color " + (theta < 0 ? "{255.0 200.0 0.0}" : "{255.0 0.0 128.0}");
if (tokType == 1746538509) return "measure " + org.jmol.util.Escape.escapePt (a) + org.jmol.util.Escape.escapePt (pt_a_prime) + org.jmol.util.Escape.escapePt (pt_b_prime) + org.jmol.util.Escape.escapePt (b);
var residuesPerTurn = Math.abs (theta == 0 ? 0 : 360 / theta);
var pitch = Math.abs (v_dot_n == 1.4E-45 ? 0 : n.length () * (theta == 0 ? 1 : 360 / theta));
switch (tokType) {
case 135266306:
return [pt_a_prime, n, r, org.jmol.util.Point3f.new3 (theta, pitch, residuesPerTurn)];
case 1073742001:
return [org.jmol.util.Escape.escapePt (pt_a_prime), org.jmol.util.Escape.escapePt (n), org.jmol.util.Escape.escapePt (r), org.jmol.util.Escape.escapePt (org.jmol.util.Point3f.new3 (theta, pitch, residuesPerTurn))];
default:
return null;
}
}, "~S,~N,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Quaternion");
c$.getPlaneThroughPoints = Clazz.defineMethod (c$, "getPlaneThroughPoints", 
function (pointA, pointB, pointC, vNorm, vAB, vAC, plane) {
var w = org.jmol.util.Measure.getNormalThroughPoints (pointA, pointB, pointC, vNorm, vAB, vAC);
plane.set (vNorm.x, vNorm.y, vNorm.z, w);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Point4f");
c$.getPlaneThroughPoint = Clazz.defineMethod (c$, "getPlaneThroughPoint", 
function (pt, normal, plane) {
plane.set (normal.x, normal.y, normal.z, -normal.dot (org.jmol.util.Vector3f.newV (pt)));
}, "org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Point4f");
c$.distanceToPlane = Clazz.defineMethod (c$, "distanceToPlane", 
function (plane, pt) {
return (plane == null ? NaN : (plane.x * pt.x + plane.y * pt.y + plane.z * pt.z + plane.w) / Math.sqrt (plane.x * plane.x + plane.y * plane.y + plane.z * plane.z));
}, "org.jmol.util.Point4f,org.jmol.util.Point3f");
c$.distanceToPlaneD = Clazz.defineMethod (c$, "distanceToPlaneD", 
function (plane, d, pt) {
return (plane == null ? NaN : (plane.x * pt.x + plane.y * pt.y + plane.z * pt.z + plane.w) / d);
}, "org.jmol.util.Point4f,~N,org.jmol.util.Point3f");
c$.distanceToPlane = Clazz.defineMethod (c$, "distanceToPlane", 
function (norm, w, pt) {
return (norm == null ? NaN : (norm.x * pt.x + norm.y * pt.y + norm.z * pt.z + w) / Math.sqrt (norm.x * norm.x + norm.y * norm.y + norm.z * norm.z));
}, "org.jmol.util.Vector3f,~N,org.jmol.util.Point3f");
c$.calcNormalizedNormal = Clazz.defineMethod (c$, "calcNormalizedNormal", 
function (pointA, pointB, pointC, vNormNorm, vAB, vAC) {
vAB.sub2 (pointB, pointA);
vAC.sub2 (pointC, pointA);
vNormNorm.cross (vAB, vAC);
vNormNorm.normalize ();
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
c$.getDirectedNormalThroughPoints = Clazz.defineMethod (c$, "getDirectedNormalThroughPoints", 
function (pointA, pointB, pointC, ptRef, vNorm, vAB, vAC) {
var nd = org.jmol.util.Measure.getNormalThroughPoints (pointA, pointB, pointC, vNorm, vAB, vAC);
if (ptRef != null) {
var pt0 = org.jmol.util.Point3f.newP (pointA);
pt0.add (vNorm);
var d = pt0.distance (ptRef);
pt0.setT (pointA);
pt0.sub (vNorm);
if (d > pt0.distance (ptRef)) {
vNorm.scale (-1);
nd = -nd;
}}return nd;
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
c$.getNormalThroughPoints = Clazz.defineMethod (c$, "getNormalThroughPoints", 
function (pointA, pointB, pointC, vNorm, vAB, vAC) {
org.jmol.util.Measure.calcNormalizedNormal (pointA, pointB, pointC, vNorm, vAB, vAC);
vAB.setT (pointA);
return -vAB.dot (vNorm);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
c$.getPlaneProjection = Clazz.defineMethod (c$, "getPlaneProjection", 
function (pt, plane, ptProj, vNorm) {
var dist = org.jmol.util.Measure.distanceToPlane (plane, pt);
vNorm.set (plane.x, plane.y, plane.z);
vNorm.normalize ();
vNorm.scale (-dist);
ptProj.setT (pt);
ptProj.add (vNorm);
}, "org.jmol.util.Point3f,org.jmol.util.Point4f,org.jmol.util.Point3f,org.jmol.util.Vector3f");
c$.getNormalFromCenter = Clazz.defineMethod (c$, "getNormalFromCenter", 
function (ptCenter, ptA, ptB, ptC, isOutward, normal) {
var vAB =  new org.jmol.util.Vector3f ();
var vAC =  new org.jmol.util.Vector3f ();
var d = org.jmol.util.Measure.getNormalThroughPoints (ptA, ptB, ptC, normal, vAB, vAC);
var isReversed = (org.jmol.util.Measure.distanceToPlane (normal, d, ptCenter) > 0);
if (isReversed == isOutward) normal.scale (-1.0);
return !isReversed;
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,~B,org.jmol.util.Vector3f");
c$.getNormalToLine = Clazz.defineMethod (c$, "getNormalToLine", 
function (pointA, pointB, vNormNorm) {
vNormNorm.sub2 (pointA, pointB);
vNormNorm.cross (vNormNorm, org.jmol.viewer.JmolConstants.axisY);
vNormNorm.normalize ();
if (Float.isNaN (vNormNorm.x)) vNormNorm.set (1, 0, 0);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Vector3f");
c$.getBisectingPlane = Clazz.defineMethod (c$, "getBisectingPlane", 
function (pointA, vAB, ptTemp, vTemp, plane) {
ptTemp.scaleAdd2 (0.5, vAB, pointA);
vTemp.setT (vAB);
vTemp.normalize ();
org.jmol.util.Measure.getPlaneThroughPoint (ptTemp, vTemp, plane);
}, "org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Point4f");
c$.projectOntoAxis = Clazz.defineMethod (c$, "projectOntoAxis", 
function (point, axisA, axisUnitVector, vectorProjection) {
vectorProjection.sub2 (point, axisA);
var projectedLength = vectorProjection.dot (axisUnitVector);
point.setT (axisUnitVector);
point.scaleAdd (projectedLength, axisA);
vectorProjection.sub2 (point, axisA);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
c$.calcBestAxisThroughPoints = Clazz.defineMethod (c$, "calcBestAxisThroughPoints", 
function (points, axisA, axisUnitVector, vectorProjection, nTriesMax) {
var nPoints = points.length;
axisA.setT (points[0]);
axisUnitVector.sub2 (points[nPoints - 1], axisA);
axisUnitVector.normalize ();
org.jmol.util.Measure.calcAveragePointN (points, nPoints, axisA);
var nTries = 0;
while (nTries++ < nTriesMax && org.jmol.util.Measure.findAxis (points, nPoints, axisA, axisUnitVector, vectorProjection) > 0.001) {
}
var tempA = org.jmol.util.Point3f.newP (points[0]);
org.jmol.util.Measure.projectOntoAxis (tempA, axisA, axisUnitVector, vectorProjection);
axisA.setT (tempA);
}, "~A,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,~N");
c$.findAxis = Clazz.defineMethod (c$, "findAxis", 
function (points, nPoints, axisA, axisUnitVector, vectorProjection) {
var sumXiYi =  new org.jmol.util.Vector3f ();
var vTemp =  new org.jmol.util.Vector3f ();
var pt =  new org.jmol.util.Point3f ();
var ptProj =  new org.jmol.util.Point3f ();
var a = org.jmol.util.Vector3f.newV (axisUnitVector);
var sum_Xi2 = 0;
var sum_Yi2 = 0;
for (var i = nPoints; --i >= 0; ) {
pt.setT (points[i]);
ptProj.setT (pt);
org.jmol.util.Measure.projectOntoAxis (ptProj, axisA, axisUnitVector, vectorProjection);
vTemp.sub2 (pt, ptProj);
sum_Yi2 += vTemp.lengthSquared ();
vTemp.cross (vectorProjection, vTemp);
sumXiYi.add (vTemp);
sum_Xi2 += vectorProjection.lengthSquared ();
}
var m = org.jmol.util.Vector3f.newV (sumXiYi);
m.scale (1 / sum_Xi2);
vTemp.cross (m, axisUnitVector);
axisUnitVector.add (vTemp);
axisUnitVector.normalize ();
vTemp.setT (axisUnitVector);
vTemp.sub (a);
return vTemp.length ();
}, "~A,~N,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
c$.calcAveragePoint = Clazz.defineMethod (c$, "calcAveragePoint", 
function (pointA, pointB, pointC) {
pointC.set ((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2, (pointA.z + pointB.z) / 2);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f");
c$.calcAveragePointN = Clazz.defineMethod (c$, "calcAveragePointN", 
function (points, nPoints, averagePoint) {
averagePoint.setT (points[0]);
for (var i = 1; i < nPoints; i++) averagePoint.add (points[i]);

averagePoint.scale (1 / nPoints);
}, "~A,~N,org.jmol.util.Point3f");
c$.getCenterAndPoints = Clazz.defineMethod (c$, "getCenterAndPoints", 
function (vPts) {
var n = vPts.size ();
var pts =  new Array (n + 1);
pts[0] =  new org.jmol.util.Point3f ();
if (n > 0) {
for (var i = 0; i < n; i++) {
pts[0].add (pts[i + 1] = vPts.get (i));
}
pts[0].scale (1 / n);
}return pts;
}, "java.util.List");
c$.getTransformMatrix4 = Clazz.defineMethod (c$, "getTransformMatrix4", 
function (ptsA, ptsB, m, centerA) {
var cptsA = org.jmol.util.Measure.getCenterAndPoints (ptsA);
var cptsB = org.jmol.util.Measure.getCenterAndPoints (ptsB);
var retStddev =  Clazz.newFloatArray (2, 0);
var q = org.jmol.util.Measure.calculateQuaternionRotation ([cptsA, cptsB], retStddev, false);
var v = org.jmol.util.Vector3f.newV (cptsB[0]);
v.sub (cptsA[0]);
m.setMV (q.getMatrix (), v);
if (centerA != null) centerA.setT (cptsA[0]);
return retStddev[1];
}, "java.util.List,java.util.List,org.jmol.util.Matrix4f,org.jmol.util.Point3f");
c$.calculateQuaternionRotation = Clazz.defineMethod (c$, "calculateQuaternionRotation", 
function (centerAndPoints, retStddev, doReport) {
retStddev[1] = NaN;
var q =  new org.jmol.util.Quaternion ();
if (centerAndPoints[0].length == 1 || centerAndPoints[0].length != centerAndPoints[1].length) return q;
var n = centerAndPoints[0].length - 1;
if (doReport) for (var i = 1; i <= n; i++) {
var aij = centerAndPoints[0][i];
var bij = centerAndPoints[1][i];
if (Clazz.instanceOf (aij, org.jmol.modelset.Atom)) org.jmol.util.Logger.info (" atom 1 " + (aij).getInfo () + "\tatom 2 " + (bij).getInfo ());
 else break;
}
if (n < 2) return q;
var Sxx = 0;
var Sxy = 0;
var Sxz = 0;
var Syx = 0;
var Syy = 0;
var Syz = 0;
var Szx = 0;
var Szy = 0;
var Szz = 0;
for (var i = n + 1; --i >= 1; ) {
var aij = centerAndPoints[0][i];
var bij = centerAndPoints[1][i];
var ptA = org.jmol.util.Point3f.newP (aij);
ptA.sub (centerAndPoints[0][0]);
var ptB = org.jmol.util.Point3f.newP (bij);
ptB.sub (centerAndPoints[0][1]);
Sxx += ptA.x * ptB.x;
Sxy += ptA.x * ptB.y;
Sxz += ptA.x * ptB.z;
Syx += ptA.y * ptB.x;
Syy += ptA.y * ptB.y;
Syz += ptA.y * ptB.z;
Szx += ptA.z * ptB.x;
Szy += ptA.z * ptB.y;
Szz += ptA.z * ptB.z;
}
retStddev[0] = org.jmol.util.Measure.getRmsd (centerAndPoints, q);
var N =  Clazz.newDoubleArray (4, 4, 0);
N[0][0] = Sxx + Syy + Szz;
N[0][1] = N[1][0] = Syz - Szy;
N[0][2] = N[2][0] = Szx - Sxz;
N[0][3] = N[3][0] = Sxy - Syx;
N[1][1] = Sxx - Syy - Szz;
N[1][2] = N[2][1] = Sxy + Syx;
N[1][3] = N[3][1] = Szx + Sxz;
N[2][2] = -Sxx + Syy - Szz;
N[2][3] = N[3][2] = Syz + Szy;
N[3][3] = -Sxx - Syy + Szz;
var eigen = org.jmol.util.Eigen.newM (N);
var v = eigen.getEigenvectorsFloatTransposed ()[3];
q = org.jmol.util.Quaternion.newP4 (org.jmol.util.Point4f.new4 (v[1], v[2], v[3], v[0]));
retStddev[1] = org.jmol.util.Measure.getRmsd (centerAndPoints, q);
return q;
}, "~A,~A,~B");
c$.getRmsd = Clazz.defineMethod (c$, "getRmsd", 
function (centerAndPoints, q) {
var sum = 0;
var sum2 = 0;
var n = centerAndPoints[0].length - 1;
var ptAnew =  new org.jmol.util.Point3f ();
for (var i = n + 1; --i >= 1; ) {
ptAnew.setT (centerAndPoints[0][i]);
ptAnew.sub (centerAndPoints[0][0]);
q.transformP2 (ptAnew, ptAnew);
ptAnew.add (centerAndPoints[1][0]);
var d = ptAnew.distance (centerAndPoints[1][i]);
sum += d;
sum2 += d * d;
}
return Math.sqrt ((sum2 - sum * sum / n) / (n - 1));
}, "~A,org.jmol.util.Quaternion");
c$.transformPoints = Clazz.defineMethod (c$, "transformPoints", 
function (vPts, m4, center) {
var v =  new java.util.ArrayList ();
for (var i = 0; i < vPts.size (); i++) {
var pt = org.jmol.util.Point3f.newP (vPts.get (i));
pt.sub (center);
m4.transform2 (pt, pt);
pt.add (center);
v.add (pt);
}
return v;
}, "java.util.List,org.jmol.util.Matrix4f,org.jmol.util.Point3f");
c$.isInTetrahedron = Clazz.defineMethod (c$, "isInTetrahedron", 
function (pt, ptA, ptB, ptC, ptD, plane, vTemp, vTemp2, vTemp3, fullyEnclosed) {
org.jmol.util.Measure.getPlaneThroughPoints (ptC, ptD, ptA, vTemp, vTemp2, vTemp3, plane);
var b = (org.jmol.util.Measure.distanceToPlane (plane, pt) >= 0);
org.jmol.util.Measure.getPlaneThroughPoints (ptA, ptD, ptB, vTemp, vTemp2, vTemp3, plane);
if (b != (org.jmol.util.Measure.distanceToPlane (plane, pt) >= 0)) return false;
org.jmol.util.Measure.getPlaneThroughPoints (ptB, ptD, ptC, vTemp, vTemp2, vTemp3, plane);
if (b != (org.jmol.util.Measure.distanceToPlane (plane, pt) >= 0)) return false;
org.jmol.util.Measure.getPlaneThroughPoints (ptA, ptB, ptC, vTemp, vTemp2, vTemp3, plane);
var d = org.jmol.util.Measure.distanceToPlane (plane, pt);
if (fullyEnclosed) return (b == (d >= 0));
var d1 = org.jmol.util.Measure.distanceToPlane (plane, ptD);
return d1 * d <= 0 || Math.abs (d1) > Math.abs (d);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point4f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,~B");
c$.getIntersectionPP = Clazz.defineMethod (c$, "getIntersectionPP", 
function (plane1, plane2) {
var a1 = plane1.x;
var b1 = plane1.y;
var c1 = plane1.z;
var d1 = plane1.w;
var a2 = plane2.x;
var b2 = plane2.y;
var c2 = plane2.z;
var d2 = plane2.w;
var norm1 = org.jmol.util.Vector3f.new3 (a1, b1, c1);
var norm2 = org.jmol.util.Vector3f.new3 (a2, b2, c2);
var nxn =  new org.jmol.util.Vector3f ();
nxn.cross (norm1, norm2);
var ax = Math.abs (nxn.x);
var ay = Math.abs (nxn.y);
var az = Math.abs (nxn.z);
var x;
var y;
var z;
var diff;
var type = (ax > ay ? (ax > az ? 1 : 3) : ay > az ? 2 : 3);
switch (type) {
case 1:
x = 0;
diff = (b1 * c2 - b2 * c1);
if (Math.abs (diff) < 0.01) return null;
y = (c1 * d2 - c2 * d1) / diff;
z = (b2 * d1 - d2 * b1) / diff;
break;
case 2:
diff = (a1 * c2 - a2 * c1);
if (Math.abs (diff) < 0.01) return null;
x = (c1 * d2 - c2 * d1) / diff;
y = 0;
z = (a2 * d1 - d2 * a1) / diff;
break;
case 3:
default:
diff = (a1 * b2 - a2 * b1);
if (Math.abs (diff) < 0.01) return null;
x = (b1 * d2 - b2 * d1) / diff;
y = (a2 * d1 - d2 * a1) / diff;
z = 0;
}
var list =  new java.util.ArrayList ();
list.add (org.jmol.util.Point3f.new3 (x, y, z));
nxn.normalize ();
list.add (nxn);
return list;
}, "org.jmol.util.Point4f,org.jmol.util.Point4f");
c$.getIntersection = Clazz.defineMethod (c$, "getIntersection", 
function (pt1, v, plane, ptRet, tempNorm, vTemp) {
org.jmol.util.Measure.getPlaneProjection (pt1, plane, ptRet, tempNorm);
tempNorm.set (plane.x, plane.y, plane.z);
tempNorm.normalize ();
if (v == null) v = org.jmol.util.Vector3f.newV (tempNorm);
var l_dot_n = v.dot (tempNorm);
if (Math.abs (l_dot_n) < 0.01) return null;
vTemp.setT (ptRet);
vTemp.sub (pt1);
ptRet.scaleAdd2 (vTemp.dot (tempNorm) / l_dot_n, v, pt1);
return ptRet;
}, "org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Point4f,org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
Clazz.defineStatics (c$,
"radiansPerDegree", (0.017453292519943295));
});
