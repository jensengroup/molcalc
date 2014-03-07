Clazz.declarePackage ("org.jmol.util");
Clazz.load (null, "org.jmol.util.Geodesic", ["java.lang.NullPointerException", "$.Short", "java.util.Hashtable", "org.jmol.util.ArrayUtil", "$.Vector3f"], function () {
c$ = Clazz.declareType (org.jmol.util, "Geodesic");
c$.getNeighborVertexesArrays = Clazz.defineMethod (c$, "getNeighborVertexesArrays", 
function () {
if (org.jmol.util.Geodesic.vertexCounts == null) org.jmol.util.Geodesic.createGeodesic ();
return org.jmol.util.Geodesic.neighborVertexesArrays;
});
c$.getVertexCount = Clazz.defineMethod (c$, "getVertexCount", 
function (level) {
if (org.jmol.util.Geodesic.vertexCounts == null) org.jmol.util.Geodesic.createGeodesic ();
return org.jmol.util.Geodesic.vertexCounts[level];
}, "~N");
c$.getVertexVectors = Clazz.defineMethod (c$, "getVertexVectors", 
function () {
if (org.jmol.util.Geodesic.vertexCounts == null) org.jmol.util.Geodesic.createGeodesic ();
return org.jmol.util.Geodesic.vertexVectors;
});
c$.getVertexVector = Clazz.defineMethod (c$, "getVertexVector", 
function (i) {
return org.jmol.util.Geodesic.vertexVectors[i];
}, "~N");
c$.getFaceVertexes = Clazz.defineMethod (c$, "getFaceVertexes", 
function (level) {
return org.jmol.util.Geodesic.faceVertexesArrays[level];
}, "~N");
c$.createGeodesic = Clazz.defineMethod (c$, "createGeodesic", 
($fz = function () {
if (org.jmol.util.Geodesic.vertexCounts != null) return;
var v =  Clazz.newShortArray (4, 0);
($t$ = org.jmol.util.Geodesic.neighborVertexesArrays = org.jmol.util.ArrayUtil.newShort2 (4), org.jmol.util.Geodesic.prototype.neighborVertexesArrays = org.jmol.util.Geodesic.neighborVertexesArrays, $t$);
($t$ = org.jmol.util.Geodesic.faceVertexesArrays = org.jmol.util.ArrayUtil.newShort2 (4), org.jmol.util.Geodesic.prototype.faceVertexesArrays = org.jmol.util.Geodesic.faceVertexesArrays, $t$);
($t$ = org.jmol.util.Geodesic.vertexVectors =  new Array (12), org.jmol.util.Geodesic.prototype.vertexVectors = org.jmol.util.Geodesic.vertexVectors, $t$);
org.jmol.util.Geodesic.vertexVectors[0] = org.jmol.util.Vector3f.new3 (0, 0, org.jmol.util.Geodesic.halfRoot5);
for (var i = 0; i < 5; ++i) {
org.jmol.util.Geodesic.vertexVectors[i + 1] = org.jmol.util.Vector3f.new3 (Math.cos (i * 1.2566371), Math.sin (i * 1.2566371), 0.5);
org.jmol.util.Geodesic.vertexVectors[i + 6] = org.jmol.util.Vector3f.new3 (Math.cos (i * 1.2566371 + 0.62831855), Math.sin (i * 1.2566371 + 0.62831855), -0.5);
}
org.jmol.util.Geodesic.vertexVectors[11] = org.jmol.util.Vector3f.new3 (0, 0, ($t$ = - org.jmol.util.Geodesic.halfRoot5, org.jmol.util.Geodesic.prototype.halfRoot5 = org.jmol.util.Geodesic.halfRoot5, $t$));
for (var i = 12; --i >= 0; ) org.jmol.util.Geodesic.vertexVectors[i].normalize ();

org.jmol.util.Geodesic.faceVertexesArrays[0] = org.jmol.util.Geodesic.faceVertexesIcosahedron;
org.jmol.util.Geodesic.neighborVertexesArrays[0] = org.jmol.util.Geodesic.neighborVertexesIcosahedron;
v[0] = 12;
for (var i = 0; i < 3; ++i) org.jmol.util.Geodesic.quadruple (i, v);

($t$ = org.jmol.util.Geodesic.vertexCounts = v, org.jmol.util.Geodesic.prototype.vertexCounts = org.jmol.util.Geodesic.vertexCounts, $t$);
}, $fz.isPrivate = true, $fz));
c$.quadruple = Clazz.defineMethod (c$, "quadruple", 
($fz = function (level, counts) {
($t$ = org.jmol.util.Geodesic.htVertex =  new java.util.Hashtable (), org.jmol.util.Geodesic.prototype.htVertex = org.jmol.util.Geodesic.htVertex, $t$);
var oldVertexCount = org.jmol.util.Geodesic.vertexVectors.length;
var oldFaceVertexes = org.jmol.util.Geodesic.faceVertexesArrays[level];
var oldFaceVertexesLength = oldFaceVertexes.length;
var oldFaceCount = Clazz.doubleToInt (oldFaceVertexesLength / 3);
var oldEdgesCount = oldVertexCount + oldFaceCount - 2;
var newVertexCount = oldVertexCount + oldEdgesCount;
var newFaceCount = 4 * oldFaceCount;
($t$ = org.jmol.util.Geodesic.vertexVectors = org.jmol.util.ArrayUtil.arrayCopyObject (org.jmol.util.Geodesic.vertexVectors, newVertexCount), org.jmol.util.Geodesic.prototype.vertexVectors = org.jmol.util.Geodesic.vertexVectors, $t$);
var newFacesVertexes =  Clazz.newShortArray (3 * newFaceCount, 0);
org.jmol.util.Geodesic.faceVertexesArrays[level + 1] = newFacesVertexes;
var neighborVertexes =  Clazz.newShortArray (6 * newVertexCount, 0);
org.jmol.util.Geodesic.neighborVertexesArrays[level + 1] = neighborVertexes;
for (var i = neighborVertexes.length; --i >= 0; ) neighborVertexes[i] = -1;

counts[level + 1] = newVertexCount;
($t$ = org.jmol.util.Geodesic.vertexNext = oldVertexCount, org.jmol.util.Geodesic.prototype.vertexNext = org.jmol.util.Geodesic.vertexNext, $t$);
var iFaceNew = 0;
for (var i = 0; i < oldFaceVertexesLength; ) {
var iA = oldFaceVertexes[i++];
var iB = oldFaceVertexes[i++];
var iC = oldFaceVertexes[i++];
var iAB = org.jmol.util.Geodesic.getVertex (iA, iB);
var iBC = org.jmol.util.Geodesic.getVertex (iB, iC);
var iCA = org.jmol.util.Geodesic.getVertex (iC, iA);
newFacesVertexes[iFaceNew++] = iA;
newFacesVertexes[iFaceNew++] = iAB;
newFacesVertexes[iFaceNew++] = iCA;
newFacesVertexes[iFaceNew++] = iB;
newFacesVertexes[iFaceNew++] = iBC;
newFacesVertexes[iFaceNew++] = iAB;
newFacesVertexes[iFaceNew++] = iC;
newFacesVertexes[iFaceNew++] = iCA;
newFacesVertexes[iFaceNew++] = iBC;
newFacesVertexes[iFaceNew++] = iCA;
newFacesVertexes[iFaceNew++] = iAB;
newFacesVertexes[iFaceNew++] = iBC;
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iAB, iA);
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iAB, iCA);
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iAB, iBC);
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iAB, iB);
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iBC, iB);
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iBC, iCA);
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iBC, iC);
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iCA, iC);
org.jmol.util.Geodesic.addNeighboringVertexes (neighborVertexes, iCA, iA);
}
if (true) {
var vertexCount = org.jmol.util.Geodesic.vertexVectors.length;
if (iFaceNew != newFacesVertexes.length) throw  new NullPointerException ();
if (org.jmol.util.Geodesic.vertexNext != newVertexCount) throw  new NullPointerException ();
for (var i = 0; i < 12; ++i) {
for (var j = 0; j < 5; ++j) {
var neighbor = neighborVertexes[i * 6 + j];
if (neighbor < 0) throw  new NullPointerException ();
if (neighbor >= vertexCount) throw  new NullPointerException ();
if (neighborVertexes[i * 6 + 5] != -1) throw  new NullPointerException ();
}
}
for (var i = 72; i < neighborVertexes.length; ++i) {
var neighbor = neighborVertexes[i];
if (neighbor < 0) throw  new NullPointerException ();
if (neighbor >= vertexCount) throw  new NullPointerException ();
}
for (var i = 0; i < newVertexCount; ++i) {
var neighborCount = 0;
for (var j = neighborVertexes.length; --j >= 0; ) if (neighborVertexes[j] == i) ++neighborCount;

if ((i < 12 && neighborCount != 5) || (i >= 12 && neighborCount != 6)) throw  new NullPointerException ();
var faceCount = 0;
for (var j = newFacesVertexes.length; --j >= 0; ) if (newFacesVertexes[j] == i) ++faceCount;

if ((i < 12 && faceCount != 5) || (i >= 12 && faceCount != 6)) throw  new NullPointerException ();
}
}($t$ = org.jmol.util.Geodesic.htVertex = null, org.jmol.util.Geodesic.prototype.htVertex = org.jmol.util.Geodesic.htVertex, $t$);
}, $fz.isPrivate = true, $fz), "~N,~A");
c$.addNeighboringVertexes = Clazz.defineMethod (c$, "addNeighboringVertexes", 
($fz = function (neighborVertexes, v1, v2) {
for (var i = v1 * 6, iMax = i + 6; i < iMax; ++i) {
if (neighborVertexes[i] == v2) return;
if (neighborVertexes[i] < 0) {
neighborVertexes[i] = v2;
for (var j = v2 * 6, jMax = j + 6; j < jMax; ++j) {
if (neighborVertexes[j] == v1) return;
if (neighborVertexes[j] < 0) {
neighborVertexes[j] = v1;
return;
}}
}}
throw  new NullPointerException ();
}, $fz.isPrivate = true, $fz), "~A,~N,~N");
c$.getVertex = Clazz.defineMethod (c$, "getVertex", 
($fz = function (v1, v2) {
if (v1 > v2) {
var t = v1;
v1 = v2;
v2 = t;
}var hashKey = Integer.$valueOf ((v1 << 16) + v2);
var iv = org.jmol.util.Geodesic.htVertex.get (hashKey);
if (iv != null) {
return iv.shortValue ();
}var newVertexVector = org.jmol.util.Vector3f.newV (org.jmol.util.Geodesic.vertexVectors[v1]);
org.jmol.util.Geodesic.vertexVectors[org.jmol.util.Geodesic.vertexNext] = newVertexVector;
newVertexVector.add (org.jmol.util.Geodesic.vertexVectors[v2]);
newVertexVector.scale (0.5);
newVertexVector.normalize ();
org.jmol.util.Geodesic.htVertex.put (hashKey, Short.$valueOf (org.jmol.util.Geodesic.vertexNext));
return ($t$ = org.jmol.util.Geodesic.vertexNext ++, org.jmol.util.Geodesic.prototype.vertexNext = org.jmol.util.Geodesic.vertexNext, $t$);
}, $fz.isPrivate = true, $fz), "~N,~N");
c$.halfRoot5 = c$.prototype.halfRoot5 = (0.5 * Math.sqrt (5));
Clazz.defineStatics (c$,
"oneFifth", 1.2566371,
"oneTenth", 0.62831855,
"faceVertexesIcosahedron", [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 1, 1, 6, 2, 2, 7, 3, 3, 8, 4, 4, 9, 5, 5, 10, 1, 6, 1, 10, 7, 2, 6, 8, 3, 7, 9, 4, 8, 10, 5, 9, 11, 6, 10, 11, 7, 6, 11, 8, 7, 11, 9, 8, 11, 10, 9],
"neighborVertexesIcosahedron", [1, 2, 3, 4, 5, -1, 0, 5, 10, 6, 2, -1, 0, 1, 6, 7, 3, -1, 0, 2, 7, 8, 4, -1, 0, 3, 8, 9, 5, -1, 0, 4, 9, 10, 1, -1, 1, 10, 11, 7, 2, -1, 2, 6, 11, 8, 3, -1, 3, 7, 11, 9, 4, -1, 4, 8, 11, 10, 5, -1, 5, 9, 11, 6, 1, -1, 6, 7, 8, 9, 10, -1],
"standardLevel", 3,
"maxLevel", 3,
"vertexCounts", null,
"vertexVectors", null,
"faceVertexesArrays", null,
"neighborVertexesArrays", null,
"vertexNext", 0,
"htVertex", null,
"VALIDATE", true);
});
