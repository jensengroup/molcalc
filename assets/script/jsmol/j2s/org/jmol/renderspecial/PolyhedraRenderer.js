Clazz.declarePackage ("org.jmol.renderspecial");
Clazz.load (["org.jmol.render.ShapeRenderer"], "org.jmol.renderspecial.PolyhedraRenderer", ["org.jmol.util.Colix", "$.Point3i"], function () {
c$ = Clazz.decorateAsClass (function () {
this.drawEdges = 0;
this.isAll = false;
this.frontOnly = false;
this.screens = null;
Clazz.instantialize (this, arguments);
}, org.jmol.renderspecial, "PolyhedraRenderer", org.jmol.render.ShapeRenderer);
Clazz.defineMethod (c$, "render", 
function () {
var polyhedra = this.shape;
var polyhedrons = polyhedra.polyhedrons;
this.drawEdges = polyhedra.drawEdges;
var colixes = polyhedra.colixes;
var needTranslucent = false;
for (var i = polyhedra.polyhedronCount; --i >= 0; ) {
var iAtom = polyhedrons[i].centralAtom.getIndex ();
var colix = (colixes == null || iAtom >= colixes.length ? 0 : polyhedra.colixes[iAtom]);
if (this.render1 (polyhedrons[i], colix)) needTranslucent = true;
}
return needTranslucent;
});
Clazz.defineMethod (c$, "render1", 
($fz = function (p, colix) {
if (p.visibilityFlags == 0) return false;
colix = org.jmol.util.Colix.getColixInherited (colix, p.centralAtom.getColix ());
var needTranslucent = false;
if (org.jmol.util.Colix.isColixTranslucent (colix)) {
needTranslucent = true;
} else if (!this.g3d.setColix (colix)) {
return false;
}var vertices = p.vertices;
var planes;
if (this.screens == null || this.screens.length < vertices.length) {
this.screens =  new Array (vertices.length);
for (var i = vertices.length; --i >= 0; ) this.screens[i] =  new org.jmol.util.Point3i ();

}planes = p.planes;
for (var i = vertices.length; --i >= 0; ) {
var atom = (Clazz.instanceOf (vertices[i], org.jmol.modelset.Atom) ? vertices[i] : null);
if (atom == null) this.viewer.transformPtScr (vertices[i], this.screens[i]);
 else this.screens[i].set (atom.screenX, atom.screenY, atom.screenZ);
}
this.isAll = (this.drawEdges == 1);
this.frontOnly = (this.drawEdges == 2);
if (!needTranslucent || this.g3d.setColix (colix)) for (var i = 0, j = 0; j < planes.length; ) this.fillFace (p.normixes[i++], this.screens[planes[j++]], this.screens[planes[j++]], this.screens[planes[j++]]);

if (this.g3d.setColix (org.jmol.util.Colix.getColixTranslucent3 (colix, false, 0))) for (var i = 0, j = 0; j < planes.length; ) this.drawFace (p.normixes[i++], this.screens[planes[j++]], this.screens[planes[j++]], this.screens[planes[j++]]);

return needTranslucent;
}, $fz.isPrivate = true, $fz), "org.jmol.shapespecial.Polyhedra.Polyhedron,~N");
Clazz.defineMethod (c$, "drawFace", 
($fz = function (normix, A, B, C) {
if (this.isAll || this.frontOnly && this.g3d.isDirectedTowardsCamera (normix)) {
this.drawCylinderTriangle (A.x, A.y, A.z, B.x, B.y, B.z, C.x, C.y, C.z);
}}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.Point3i,org.jmol.util.Point3i,org.jmol.util.Point3i");
Clazz.defineMethod (c$, "drawCylinderTriangle", 
($fz = function (xA, yA, zA, xB, yB, zB, xC, yC, zC) {
this.g3d.fillCylinderScreen (3, 3, xA, yA, zA, xB, yB, zB);
this.g3d.fillCylinderScreen (3, 3, xB, yB, zB, xC, yC, zC);
this.g3d.fillCylinderScreen (3, 3, xA, yA, zA, xC, yC, zC);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "fillFace", 
($fz = function (normix, A, B, C) {
this.g3d.fillTriangleTwoSided (normix, A.x, A.y, A.z, B.x, B.y, B.z, C.x, C.y, C.z);
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.Point3i,org.jmol.util.Point3i,org.jmol.util.Point3i");
});
