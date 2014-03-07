Clazz.declarePackage ("org.jmol.shapespecial");
Clazz.load (["org.jmol.shape.AtomShape", "org.jmol.util.Point3f", "$.Vector3f"], "org.jmol.shapespecial.Polyhedra", ["org.jmol.constant.EnumPalette", "org.jmol.util.ArrayUtil", "$.BitSet", "$.BitSetUtil", "$.Escape", "$.Logger", "$.Measure", "$.Normix", "$.Point3i", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.otherAtoms = null;
this.polyhedronCount = 0;
this.polyhedrons = null;
this.drawEdges = 0;
this.radius = 0;
this.nVertices = 0;
this.faceCenterOffset = 0;
this.distanceFactor = 0;
this.isCollapsed = false;
this.iHaveCenterBitSet = false;
this.bondedOnly = false;
this.haveBitSetVertices = false;
this.centers = null;
this.bsVertices = null;
this.bsVertexCount = null;
this.normixesT = null;
this.planesT = null;
this.bsTemp = null;
this.align1 = null;
this.align2 = null;
this.vAB = null;
this.vAC = null;
if (!Clazz.isClassDefined ("org.jmol.shapespecial.Polyhedra.Polyhedron")) {
org.jmol.shapespecial.Polyhedra.$Polyhedra$Polyhedron$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.shapespecial, "Polyhedra", org.jmol.shape.AtomShape);
Clazz.prepareFields (c$, function () {
this.otherAtoms =  new Array (151);
this.polyhedrons =  new Array (32);
this.normixesT =  Clazz.newShortArray (150, 0);
this.planesT =  Clazz.newByteArray (450, 0);
this.align1 =  new org.jmol.util.Vector3f ();
this.align2 =  new org.jmol.util.Vector3f ();
this.vAB =  new org.jmol.util.Vector3f ();
this.vAC =  new org.jmol.util.Vector3f ();
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.faceCenterOffset = 0.25;
this.distanceFactor = 1.85;
this.radius = 0.0;
this.nVertices = 0;
this.bsVertices = null;
this.centers = null;
this.bsVertexCount =  new org.jmol.util.BitSet ();
this.bondedOnly = this.isCollapsed = this.iHaveCenterBitSet = false;
this.drawEdges = 0;
this.haveBitSetVertices = false;
return;
}if ("generate" === propertyName) {
if (!this.iHaveCenterBitSet) {
this.centers = bs;
this.iHaveCenterBitSet = true;
}this.deletePolyhedra ();
this.buildPolyhedra ();
return;
}if ("collapsed" === propertyName) {
this.isCollapsed = (value).booleanValue ();
return;
}if ("nVertices" === propertyName) {
this.nVertices = (value).intValue ();
this.bsVertexCount.set (this.nVertices);
return;
}if ("centers" === propertyName) {
this.centers = value;
this.iHaveCenterBitSet = true;
return;
}if ("to" === propertyName) {
this.bsVertices = value;
return;
}if ("toBitSet" === propertyName) {
this.bsVertices = value;
this.haveBitSetVertices = true;
return;
}if ("faceCenterOffset" === propertyName) {
this.faceCenterOffset = (value).floatValue ();
return;
}if ("distanceFactor" === propertyName) {
this.distanceFactor = (value).floatValue ();
return;
}if ("bonds" === propertyName) {
this.bondedOnly = true;
return;
}if ("delete" === propertyName) {
if (!this.iHaveCenterBitSet) this.centers = bs;
this.deletePolyhedra ();
return;
}if ("on" === propertyName) {
if (!this.iHaveCenterBitSet) this.centers = bs;
this.setVisible (true);
return;
}if ("off" === propertyName) {
if (!this.iHaveCenterBitSet) this.centers = bs;
this.setVisible (false);
return;
}if ("noedges" === propertyName) {
this.drawEdges = 0;
return;
}if ("edges" === propertyName) {
this.drawEdges = 1;
return;
}if ("frontedges" === propertyName) {
this.drawEdges = 2;
return;
}if (propertyName.indexOf ("color") == 0) {
bs = ("colorThis" === propertyName && this.iHaveCenterBitSet ? this.centers : this.andBitSet (bs));
propertyName = "color";
}if (propertyName.indexOf ("translucency") == 0) {
bs = ("translucentThis".equals (value) && this.iHaveCenterBitSet ? this.centers : this.andBitSet (bs));
if (value.equals ("translucentThis")) value = "translucent";
}if ("token" === propertyName) {
this.setLighting ((value).intValue () == 1073741964, bs);
return;
}if ("radius" === propertyName) {
this.radius = (value).floatValue ();
return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
for (var i = this.polyhedronCount; --i >= 0; ) {
if (this.polyhedrons[i].modelIndex == modelIndex) {
this.polyhedronCount--;
this.polyhedrons = org.jmol.util.ArrayUtil.deleteElements (this.polyhedrons, i, 1);
} else if (this.polyhedrons[i].modelIndex > modelIndex) {
this.polyhedrons[i].modelIndex--;
}}
}Clazz.superCall (this, org.jmol.shapespecial.Polyhedra, "setProperty", [propertyName, value, bs]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setLighting", 
($fz = function (isFullyLit, bs) {
for (var i = this.polyhedronCount; --i >= 0; ) if (bs.get (this.polyhedrons[i].centralAtom.getIndex ())) {
var normixes = this.polyhedrons[i].normixes;
this.polyhedrons[i].isFullyLit = isFullyLit;
for (var j = normixes.length; --j >= 0; ) {
if (normixes[j] < 0 != isFullyLit) normixes[j] = ~normixes[j];
}
}
}, $fz.isPrivate = true, $fz), "~B,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "andBitSet", 
($fz = function (bs) {
var bsCenters =  new org.jmol.util.BitSet ();
for (var i = this.polyhedronCount; --i >= 0; ) bsCenters.set (this.polyhedrons[i].centralAtom.getIndex ());

bsCenters.and (bs);
return bsCenters;
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "deletePolyhedra", 
($fz = function () {
var newCount = 0;
var pid = org.jmol.constant.EnumPalette.pidOf (null);
for (var i = 0; i < this.polyhedronCount; ++i) {
var p = this.polyhedrons[i];
var iAtom = p.centralAtom.getIndex ();
if (this.centers.get (iAtom)) this.setColixAndPalette (0, pid, iAtom);
 else this.polyhedrons[newCount++] = p;
}
for (var i = newCount; i < this.polyhedronCount; ++i) this.polyhedrons[i] = null;

this.polyhedronCount = newCount;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setVisible", 
($fz = function (visible) {
for (var i = this.polyhedronCount; --i >= 0; ) {
var p = this.polyhedrons[i];
if (p != null && this.centers.get (p.centralAtom.getIndex ())) p.visible = visible;
}
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "buildPolyhedra", 
($fz = function () {
var useBondAlgorithm = this.radius == 0 || this.bondedOnly;
var iter = this.modelSet.getSelectedAtomIterator (null, false, false, false, false);
for (var i = this.centers.nextSetBit (0); i >= 0; i = this.centers.nextSetBit (i + 1)) {
var p = (this.haveBitSetVertices ? this.constructBitSetPolyhedron (i) : useBondAlgorithm ? this.constructBondsPolyhedron (i) : this.constructRadiusPolyhedron (i, iter));
if (p != null) {
if (this.polyhedronCount == this.polyhedrons.length) this.polyhedrons = org.jmol.util.ArrayUtil.doubleLength (this.polyhedrons);
this.polyhedrons[this.polyhedronCount++] = p;
}if (this.haveBitSetVertices) break;
}
iter.release ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "constructBondsPolyhedron", 
($fz = function (atomIndex) {
var atom = this.atoms[atomIndex];
var bonds = atom.getBonds ();
if (bonds == null) return null;
var bondCount = 0;
for (var i = bonds.length; --i >= 0; ) {
var bond = bonds[i];
var otherAtom = bond.getAtom1 () === atom ? bond.getAtom2 () : bond.getAtom1 ();
if (this.bsVertices != null && !this.bsVertices.get (otherAtom.getIndex ())) continue;
if (this.radius > 0 && bond.getAtom1 ().distance (bond.getAtom2 ()) > this.radius) continue;
this.otherAtoms[bondCount++] = otherAtom;
if (bondCount == 150) break;
}
if (bondCount < 3 || this.nVertices > 0 && !this.bsVertexCount.get (bondCount)) return null;
return this.validatePolyhedronNew (atom, bondCount, this.otherAtoms);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "constructBitSetPolyhedron", 
($fz = function (atomIndex) {
var otherAtomCount = 0;
for (var i = this.bsVertices.nextSetBit (0); i >= 0; i = this.bsVertices.nextSetBit (i + 1)) this.otherAtoms[otherAtomCount++] = this.atoms[i];

return this.validatePolyhedronNew (this.atoms[atomIndex], otherAtomCount, this.otherAtoms);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "constructRadiusPolyhedron", 
($fz = function (atomIndex, iter) {
var atom = this.atoms[atomIndex];
var otherAtomCount = 0;
this.viewer.setIteratorForAtom (iter, atomIndex, this.radius);
while (iter.hasNext ()) {
var other = this.atoms[iter.next ()];
if (this.bsVertices != null && !this.bsVertices.get (other.getIndex ()) || atom.distance (other) > this.radius) continue;
if (other.getAlternateLocationID () != atom.getAlternateLocationID () && (other.getAlternateLocationID ()).charCodeAt (0) != 0 && (atom.getAlternateLocationID ()).charCodeAt (0) != 0) continue;
if (otherAtomCount == 150) break;
this.otherAtoms[otherAtomCount++] = other;
}
if (otherAtomCount < 3 || this.nVertices > 0 && !this.bsVertexCount.get (otherAtomCount)) return null;
return this.validatePolyhedronNew (atom, otherAtomCount, this.otherAtoms);
}, $fz.isPrivate = true, $fz), "~N,org.jmol.api.AtomIndexIterator");
Clazz.defineMethod (c$, "validatePolyhedronNew", 
($fz = function (centralAtom, vertexCount, otherAtoms) {
var normal =  new org.jmol.util.Vector3f ();
var planeCount = 0;
var ipt = 0;
var ptCenter = vertexCount;
var nPoints = ptCenter + 1;
var distMax = 0;
var dAverage = 0;
var points =  new Array (450);
points[ptCenter] = otherAtoms[ptCenter] = centralAtom;
for (var i = 0; i < ptCenter; i++) {
points[i] = otherAtoms[i];
dAverage += points[ptCenter].distance (points[i]);
}
dAverage = dAverage / ptCenter;
var factor = this.distanceFactor;
var bs = org.jmol.util.BitSetUtil.newBitSet (ptCenter);
var isOK = (dAverage == 0);
while (!isOK && factor < 10.0) {
distMax = dAverage * factor;
for (var i = 0; i < ptCenter; i++) bs.set (i);

for (var i = 0; i < ptCenter - 2; i++) for (var j = i + 1; j < ptCenter - 1; j++) {
if (points[i].distance (points[j]) > distMax) continue;
for (var k = j + 1; k < ptCenter; k++) {
if (points[i].distance (points[k]) > distMax || points[j].distance (points[k]) > distMax) continue;
bs.clear (i);
bs.clear (j);
bs.clear (k);
}
}

isOK = true;
for (var i = 0; i < ptCenter; i++) if (bs.get (i)) {
isOK = false;
factor *= 1.05;
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("Polyhedra distanceFactor for " + ptCenter + " atoms increased to " + factor + " in order to include " + (otherAtoms[i]).getInfo ());
}break;
}
}
var faceCatalog = "";
var facetCatalog = "";
for (var i = 0; i < ptCenter - 2; i++) for (var j = i + 1; j < ptCenter - 1; j++) for (var k = j + 1; k < ptCenter; k++) if (this.isPlanar (points[i], points[j], points[k], points[ptCenter])) faceCatalog += this.faceId (i, j, k);



for (var j = 0; j < ptCenter - 1; j++) for (var k = j + 1; k < ptCenter; k++) {
if (this.isAligned (points[j], points[k], points[ptCenter])) facetCatalog += this.faceId (j, k, -1);
}

var ptRef =  new org.jmol.util.Point3f ();
if (this.bsTemp == null) this.bsTemp = org.jmol.util.Normix.newVertexBitSet ();
for (var i = 0; i < ptCenter - 2; i++) for (var j = i + 1; j < ptCenter - 1; j++) {
if (points[i].distance (points[j]) > distMax) continue;
for (var k = j + 1; k < ptCenter; k++) {
if (points[i].distance (points[k]) > distMax || points[j].distance (points[k]) > distMax) continue;
if (planeCount >= 147) {
org.jmol.util.Logger.error ("Polyhedron error: maximum face(147) -- reduce RADIUS or DISTANCEFACTOR");
return null;
}if (nPoints >= 150) {
org.jmol.util.Logger.error ("Polyhedron error: maximum vertex count(150) -- reduce RADIUS");
return null;
}var isFlat = (faceCatalog.indexOf (this.faceId (i, j, k)) >= 0);
var isWindingOK = (isFlat ? org.jmol.util.Measure.getNormalFromCenter (org.jmol.shapespecial.Polyhedra.randomPoint, points[i], points[j], points[k], false, normal) : org.jmol.util.Measure.getNormalFromCenter (points[ptCenter], points[i], points[j], points[k], true, normal));
normal.scale (this.isCollapsed && !isFlat ? this.faceCenterOffset : 0.001);
var nRef = nPoints;
ptRef.setT (points[ptCenter]);
if (this.isCollapsed && !isFlat) {
points[nPoints] = org.jmol.util.Point3f.newP (points[ptCenter]);
points[nPoints].add (normal);
otherAtoms[nPoints] = points[nPoints];
} else if (isFlat) {
ptRef.sub (normal);
nRef = ptCenter;
}var facet;
facet = this.faceId (i, j, -1);
if (this.isCollapsed || isFlat && facetCatalog.indexOf (facet) < 0) {
facetCatalog += facet;
this.planesT[ipt++] = (isWindingOK ? i : j);
this.planesT[ipt++] = (isWindingOK ? j : i);
this.planesT[ipt++] = nRef;
org.jmol.util.Measure.getNormalFromCenter (points[k], points[i], points[j], ptRef, false, normal);
this.normixesT[planeCount++] = (isFlat ? org.jmol.util.Normix.get2SidedNormix (normal, this.bsTemp) : org.jmol.util.Normix.getNormixV (normal, this.bsTemp));
}facet = this.faceId (i, k, -1);
if (this.isCollapsed || isFlat && facetCatalog.indexOf (facet) < 0) {
facetCatalog += facet;
this.planesT[ipt++] = (isWindingOK ? i : k);
this.planesT[ipt++] = nRef;
this.planesT[ipt++] = (isWindingOK ? k : i);
org.jmol.util.Measure.getNormalFromCenter (points[j], points[i], ptRef, points[k], false, normal);
this.normixesT[planeCount++] = (isFlat ? org.jmol.util.Normix.get2SidedNormix (normal, this.bsTemp) : org.jmol.util.Normix.getNormixV (normal, this.bsTemp));
}facet = this.faceId (j, k, -1);
if (this.isCollapsed || isFlat && facetCatalog.indexOf (facet) < 0) {
facetCatalog += facet;
this.planesT[ipt++] = nRef;
this.planesT[ipt++] = (isWindingOK ? j : k);
this.planesT[ipt++] = (isWindingOK ? k : j);
org.jmol.util.Measure.getNormalFromCenter (points[i], ptRef, points[j], points[k], false, normal);
this.normixesT[planeCount++] = (isFlat ? org.jmol.util.Normix.get2SidedNormix (normal, this.bsTemp) : org.jmol.util.Normix.getNormixV (normal, this.bsTemp));
}if (!isFlat) {
if (this.isCollapsed) {
nPoints++;
} else {
this.planesT[ipt++] = (isWindingOK ? i : j);
this.planesT[ipt++] = (isWindingOK ? j : i);
this.planesT[ipt++] = k;
this.normixesT[planeCount++] = org.jmol.util.Normix.getNormixV (normal, this.bsTemp);
}}}
}

return Clazz.innerTypeInstance (org.jmol.shapespecial.Polyhedra.Polyhedron, this, null, centralAtom, ptCenter, nPoints, planeCount, otherAtoms, this.normixesT, this.planesT);
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,~N,~A");
Clazz.defineMethod (c$, "faceId", 
($fz = function (i, j, k) {
return (org.jmol.util.Point3i.new3 (i, j, k)).toString ();
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "isAligned", 
($fz = function (pt1, pt2, pt3) {
this.align1.sub2 (pt1, pt3);
this.align2.sub2 (pt2, pt3);
var angle = this.align1.angle (this.align2);
return (angle < 0.01 || angle > 3.13);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "isPlanar", 
($fz = function (pt1, pt2, pt3, ptX) {
var norm =  new org.jmol.util.Vector3f ();
var w = org.jmol.util.Measure.getNormalThroughPoints (pt1, pt2, pt3, norm, this.vAB, this.vAC);
var d = org.jmol.util.Measure.distanceToPlane (norm, w, ptX);
return (Math.abs (d) < org.jmol.shapespecial.Polyhedra.minDistanceForPlanarity);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "setVisibilityFlags", 
function (bs) {
for (var i = this.polyhedronCount; --i >= 0; ) {
var p = this.polyhedrons[i];
p.visibilityFlags = (p.visible && bs.get (p.modelIndex) && !this.modelSet.isAtomHidden (p.centralAtom.getIndex ()) ? this.myVisibilityFlag : 0);
}
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getShapeState", 
function () {
var s =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < this.polyhedronCount; i++) s.append (this.polyhedrons[i].getState ());

if (this.drawEdges == 2) org.jmol.shape.Shape.appendCmd (s, "polyhedra frontedges");
 else if (this.drawEdges == 1) org.jmol.shape.Shape.appendCmd (s, "polyhedra edges");
s.append (Clazz.superCall (this, org.jmol.shapespecial.Polyhedra, "getShapeState", []));
return s.toString ();
});
c$.$Polyhedra$Polyhedron$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.modelIndex = 0;
this.centralAtom = null;
this.vertices = null;
this.ptCenter = 0;
this.visible = false;
this.normixes = null;
this.planes = null;
this.visibilityFlags = 0;
this.collapsed = false;
this.myFaceCenterOffset = 0;
this.myDistanceFactor = 0;
this.isFullyLit = false;
Clazz.instantialize (this, arguments);
}, org.jmol.shapespecial.Polyhedra, "Polyhedron");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f, g) {
this.collapsed = this.b$["org.jmol.shapespecial.Polyhedra"].isCollapsed;
this.centralAtom = a;
this.modelIndex = a.getModelIndex ();
this.ptCenter = b;
this.vertices =  new Array (c);
this.visible = true;
this.normixes =  Clazz.newShortArray (d, 0);
this.planes =  Clazz.newByteArray (d * 3, 0);
this.myFaceCenterOffset = this.b$["org.jmol.shapespecial.Polyhedra"].faceCenterOffset;
this.myDistanceFactor = this.b$["org.jmol.shapespecial.Polyhedra"].distanceFactor;
for (var h = c; --h >= 0; ) this.vertices[h] = e[h];

for (var i = d; --i >= 0; ) this.normixes[i] = f[i];

for (var j = d * 3; --j >= 0; ) this.planes[j] = g[j];

}, "org.jmol.modelset.Atom,~N,~N,~N,~A,~A,~A");
Clazz.defineMethod (c$, "getState", 
function () {
var a =  new org.jmol.util.BitSet ();
for (var b = 0; b < this.ptCenter; b++) a.set ((this.vertices[b]).getIndex ());

return "  polyhedra ({" + this.centralAtom.getIndex () + "}) " + (this.myDistanceFactor == 1.85 ? "" : " distanceFactor " + this.myDistanceFactor) + (this.myFaceCenterOffset == 0.25 ? "" : " faceCenterOffset " + this.myFaceCenterOffset) + " to " + org.jmol.util.Escape.escape (a) + (this.collapsed ? " collapsed" : "") + (this.isFullyLit ? " fullyLit" : "") + ";" + (this.visible ? "" : "polyhedra off;") + "\n";
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"DEFAULT_DISTANCE_FACTOR", 1.85,
"DEFAULT_FACECENTEROFFSET", 0.25,
"EDGES_NONE", 0,
"EDGES_ALL", 1,
"EDGES_FRONT", 2,
"MAX_VERTICES", 150,
"FACE_COUNT_MAX", 147);
c$.randomPoint = c$.prototype.randomPoint = org.jmol.util.Point3f.new3 (3141, 2718, 1414);
Clazz.defineStatics (c$,
"minDistanceForPlanarity", 0.1);
});
