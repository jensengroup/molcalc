Clazz.declarePackage ("org.jmol.renderspecial");
Clazz.load (["org.jmol.renderspecial.DotsRenderer", "org.jmol.util.Point3i"], "org.jmol.renderspecial.GeoSurfaceRenderer", ["org.jmol.util.Geodesic"], function () {
c$ = Clazz.decorateAsClass (function () {
this.facePt1 = null;
this.facePt2 = null;
this.facePt3 = null;
Clazz.instantialize (this, arguments);
}, org.jmol.renderspecial, "GeoSurfaceRenderer", org.jmol.renderspecial.DotsRenderer);
Clazz.prepareFields (c$, function () {
this.facePt1 =  new org.jmol.util.Point3i ();
this.facePt2 =  new org.jmol.util.Point3i ();
this.facePt3 =  new org.jmol.util.Point3i ();
});
Clazz.defineMethod (c$, "render", 
function () {
var gs = this.shape;
this.iShowSolid = !(this.viewer.getInMotion () && gs.ec.getDotsConvexMax () > 100);
if (!this.iShowSolid) return false;
if (!this.g3d.setColix (4)) return true;
if (this.iShowSolid && this.faceMap == null) this.faceMap =  Clazz.newIntArray (this.screenDotCount, 0);
this.render1 (gs);
return false;
});
Clazz.overrideMethod (c$, "renderConvex", 
function (colix, visibilityMap, nPoints) {
this.colix = colix;
if (this.iShowSolid) {
if (this.g3d.setColix (colix)) this.renderSurface (visibilityMap);
return;
}this.renderDots (nPoints);
}, "~N,org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "renderSurface", 
($fz = function (points) {
if (this.faceMap == null) return;
var faces = org.jmol.util.Geodesic.getFaceVertexes (this.screenLevel);
var coords = this.screenCoordinates;
var p1;
var p2;
var p3;
var mapMax = points.size ();
if (this.screenDotCount < mapMax) mapMax = this.screenDotCount;
for (var f = 0; f < faces.length; ) {
p1 = faces[f++];
p2 = faces[f++];
p3 = faces[f++];
if (p1 >= mapMax || p2 >= mapMax || p3 >= mapMax) continue;
if (!points.get (p1) || !points.get (p2) || !points.get (p3)) continue;
this.facePt1.set (coords[this.faceMap[p1]], coords[this.faceMap[p1] + 1], coords[this.faceMap[p1] + 2]);
this.facePt2.set (coords[this.faceMap[p2]], coords[this.faceMap[p2] + 1], coords[this.faceMap[p2] + 2]);
this.facePt3.set (coords[this.faceMap[p3]], coords[this.faceMap[p3] + 1], coords[this.faceMap[p3] + 2]);
this.g3d.fillTriangle3CN (this.facePt1, this.colix, p1, this.facePt2, this.colix, p2, this.facePt3, this.colix, p3);
}
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet");
});
