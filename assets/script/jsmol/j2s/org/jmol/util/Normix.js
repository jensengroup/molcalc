Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.Geodesic"], "org.jmol.util.Normix", ["org.jmol.util.BitSet"], function () {
c$ = Clazz.declareType (org.jmol.util, "Normix");
c$.getNormixCount = Clazz.defineMethod (c$, "getNormixCount", 
function () {
if (org.jmol.util.Normix.normixCount == 0) ($t$ = org.jmol.util.Normix.normixCount = org.jmol.util.Geodesic.getVertexCount (3), org.jmol.util.Normix.prototype.normixCount = org.jmol.util.Normix.normixCount, $t$);
return org.jmol.util.Normix.normixCount;
});
c$.newVertexBitSet = Clazz.defineMethod (c$, "newVertexBitSet", 
function () {
return org.jmol.util.BitSet.newN (org.jmol.util.Normix.getNormixCount ());
});
c$.getVertexVectors = Clazz.defineMethod (c$, "getVertexVectors", 
function () {
if (org.jmol.util.Normix.vertexVectors == null) ($t$ = org.jmol.util.Normix.vertexVectors = org.jmol.util.Geodesic.getVertexVectors (), org.jmol.util.Normix.prototype.vertexVectors = org.jmol.util.Normix.vertexVectors, $t$);
return org.jmol.util.Normix.vertexVectors;
});
c$.setInverseNormixes = Clazz.defineMethod (c$, "setInverseNormixes", 
function () {
if (org.jmol.util.Normix.inverseNormixes != null) return;
org.jmol.util.Normix.getNormixCount ();
org.jmol.util.Normix.getVertexVectors ();
($t$ = org.jmol.util.Normix.inverseNormixes =  Clazz.newShortArray (org.jmol.util.Normix.normixCount, 0), org.jmol.util.Normix.prototype.inverseNormixes = org.jmol.util.Normix.inverseNormixes, $t$);
var bsTemp =  new org.jmol.util.BitSet ();
for (var n = org.jmol.util.Normix.normixCount; --n >= 0; ) {
var v = org.jmol.util.Normix.vertexVectors[n];
org.jmol.util.Normix.inverseNormixes[n] = org.jmol.util.Normix.getNormix (-v.x, -v.y, -v.z, 3, bsTemp);
}
});
c$.getInverseNormix = Clazz.defineMethod (c$, "getInverseNormix", 
function (normix) {
return org.jmol.util.Normix.inverseNormixes[normix];
}, "~N");
c$.getNeighborVertexArrays = Clazz.defineMethod (c$, "getNeighborVertexArrays", 
($fz = function () {
if (org.jmol.util.Normix.neighborVertexesArrays == null) {
($t$ = org.jmol.util.Normix.neighborVertexesArrays = org.jmol.util.Geodesic.getNeighborVertexesArrays (), org.jmol.util.Normix.prototype.neighborVertexesArrays = org.jmol.util.Normix.neighborVertexesArrays, $t$);
}return org.jmol.util.Normix.neighborVertexesArrays;
}, $fz.isPrivate = true, $fz));
c$.getNormixV = Clazz.defineMethod (c$, "getNormixV", 
function (v, bsTemp) {
return org.jmol.util.Normix.getNormix (v.x, v.y, v.z, 3, bsTemp);
}, "org.jmol.util.Vector3f,org.jmol.util.BitSet");
c$.get2SidedNormix = Clazz.defineMethod (c$, "get2SidedNormix", 
function (v, bsTemp) {
return ~org.jmol.util.Normix.getNormix (v.x, v.y, v.z, 3, bsTemp);
}, "org.jmol.util.Vector3f,org.jmol.util.BitSet");
c$.getNormix = Clazz.defineMethod (c$, "getNormix", 
($fz = function (x, y, z, geodesicLevel, bsConsidered) {
var champion;
var t;
if (z >= 0) {
champion = 0;
t = z - 1;
} else {
champion = 11;
t = z - (-1);
}bsConsidered.clearAll ();
bsConsidered.set (champion);
org.jmol.util.Normix.getVertexVectors ();
org.jmol.util.Normix.getNeighborVertexArrays ();
var championDist2 = x * x + y * y + t * t;
for (var lvl = 0; lvl <= geodesicLevel; ++lvl) {
var neighborVertexes = org.jmol.util.Normix.neighborVertexesArrays[lvl];
for (var offsetNeighbors = 6 * champion, i = offsetNeighbors + (champion < 12 ? 5 : 6); --i >= offsetNeighbors; ) {
var challenger = neighborVertexes[i];
if (bsConsidered.get (challenger)) continue;
bsConsidered.set (challenger);
var v = org.jmol.util.Normix.vertexVectors[challenger];
var d;
d = v.x - x;
var d2 = d * d;
if (d2 >= championDist2) continue;
d = v.y - y;
d2 += d * d;
if (d2 >= championDist2) continue;
d = v.z - z;
d2 += d * d;
if (d2 >= championDist2) continue;
champion = challenger;
championDist2 = d2;
}
}
return champion;
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,org.jmol.util.BitSet");
Clazz.defineStatics (c$,
"NORMIX_GEODESIC_LEVEL", 3,
"normixCount", 0,
"vertexVectors", null,
"inverseNormixes", null,
"neighborVertexesArrays", null,
"NORMIX_NULL", 9999);
});
