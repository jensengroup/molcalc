Clazz.declarePackage ("org.jmol.exportjs");
Clazz.load (["org.jmol.exportjs.CartesianExporter", "java.util.Hashtable", "org.jmol.exportjs.Export3D", "$.Exporter"], "org.jmol.exportjs.JSExporter", ["java.lang.Boolean", "$.Float", "org.jmol.exportjs.UseTable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.useTable = null;
this.htSpheresRendered = null;
this.htObjects = null;
this.applet = null;
this.ret = null;
Clazz.instantialize (this, arguments);
}, org.jmol.exportjs, "JSExporter", org.jmol.exportjs.CartesianExporter);
Clazz.prepareFields (c$, function () {
this.htSpheresRendered =  new java.util.Hashtable ();
this.htObjects =  new java.util.Hashtable ();
this.ret =  new Array (1);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.exportjs.JSExporter, []);
});
Clazz.overrideMethod (c$, "outputHeader", 
function () {
{
this.applet = this.viewer.applet
}this.useTable =  new org.jmol.exportjs.UseTable ();
this.htSpheresRendered.clear ();
this.htObjects.clear ();
{
this.jsInitExport(this.applet);
}});
Clazz.overrideMethod (c$, "outputFooter", 
function () {
{
this.jsEndExport(this.applet);
}this.htSpheresRendered.clear ();
this.htObjects.clear ();
this.useTable = null;
});
Clazz.defineMethod (c$, "jsSphere", 
($fz = function (applet, id, isNew, pt, o) {
System.out.println (applet + " " + id + " " + isNew + " " + pt + " " + o);
}, $fz.isPrivate = true, $fz), "~O,~S,~B,org.jmol.util.Point3f,~A");
Clazz.defineMethod (c$, "jsCylinder", 
($fz = function (applet, id, isNew, pt1, pt2, o) {
System.out.println (applet + " " + id + " " + isNew + " " + pt1 + " " + pt2 + " " + o);
}, $fz.isPrivate = true, $fz), "~O,~S,~B,org.jmol.util.Point3f,org.jmol.util.Point3f,~A");
Clazz.defineMethod (c$, "jsTriangle", 
function (applet, color, pt1, pt2, pt3) {
System.out.println ("jsTriangle ");
}, "~O,~N,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "outputSphere", 
function (ptCenter, radius, colix, checkRadius) {
var iRad = Math.round (radius * 100);
var check = org.jmol.exportjs.Exporter.round (ptCenter) + (checkRadius ? " " + iRad : "");
if (this.htSpheresRendered.get (check) != null) return;
this.htSpheresRendered.put (check, Boolean.TRUE);
var found = this.useTable.getDef ("S" + colix + "_" + iRad, this.ret);
var o;
if (found) o = this.htObjects.get (this.ret[0]);
 else this.htObjects.put (this.ret[0], o = [this.getColor (colix), Float.$valueOf (radius)]);
this.jsSphere (this.applet, this.ret[0], !found, ptCenter, o);
}, "org.jmol.util.Point3f,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCylinder", 
function (ptCenter, pt1, pt2, colix, endcaps, radius, ptX, ptY, checkRadius) {
if (ptX != null) return false;
var length = pt1.distance (pt2);
var found = this.useTable.getDef ("C" + colix + "_" + Math.round (length * 100) + "_" + radius + "_" + endcaps, this.ret);
var o;
if (found) o = this.htObjects.get (this.ret[0]);
 else this.htObjects.put (this.ret[0], o = [this.getColor (colix),  new Float (length),  new Float (radius)]);
this.jsCylinder (this.applet, this.ret[0], !found, pt1, pt2, o);
return true;
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~B");
Clazz.overrideMethod (c$, "outputCircle", 
function (pt1, pt2, radius, colix, doFill) {
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,~B");
Clazz.overrideMethod (c$, "outputCone", 
function (ptBase, ptTip, radius, colix) {
this.outputCylinder (null, ptBase, ptTip, colix, 0, radius, null, null, false);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N");
Clazz.overrideMethod (c$, "outputEllipsoid", 
function (center, points, colix) {
}, "org.jmol.util.Point3f,~A,~N");
Clazz.defineMethod (c$, "getColor", 
($fz = function (colix) {
return Integer.$valueOf (this.g3d.getColorArgbOrGray (colix));
}, $fz.isPrivate = true, $fz), "~N");
Clazz.overrideMethod (c$, "outputSurface", 
function (vertices, normals, vertexColixes, indices, polygonColixes, nVertices, nPolygons, nFaces, bsPolygons, faceVertexMax, colix, offset) {
var vertexColors = this.getColors (vertexColixes);
var polygonColors = this.getColors (polygonColixes);
this.jsSurface (this.applet, vertices, normals, indices, nVertices, nPolygons, nFaces, bsPolygons, faceVertexMax, this.g3d.getColorArgbOrGray (colix), vertexColors, polygonColors);
}, "~A,~A,~A,~A,~A,~N,~N,~N,org.jmol.util.BitSet,~N,~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "jsSurface", 
function (applet, vertices, normals, indices, nVertices, nPolygons, nFaces, bsPolygons, faceVertexMax, color, vertexColors, polygonColors) {
System.out.println ("jsSurface -- nV=" + nVertices + " nPoly=" + nPolygons + " nFaces=" + nFaces + " faceVertexMax=" + faceVertexMax);
}, "~O,~A,~A,~A,~N,~N,~N,org.jmol.util.BitSet,~N,~N,~A,~A");
Clazz.defineMethod (c$, "getColors", 
($fz = function (colixes) {
if (colixes == null) return null;
var colors =  Clazz.newIntArray (colixes.length, 0);
for (var i = colors.length; --i >= 0; ) {
colors[i] = this.g3d.getColorArgbOrGray (colixes[i]);
}
return colors;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.overrideMethod (c$, "outputTriangle", 
function (pt1, pt2, pt3, colix) {
this.jsTriangle (this.applet, this.g3d.getColorArgbOrGray (colix), pt1, pt2, pt3);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,~N");
Clazz.defineMethod (c$, "output", 
function (pt) {
}, "org.jmol.util.Tuple3f");
Clazz.overrideMethod (c$, "plotText", 
function (x, y, z, colix, text, font3d) {
}, "~N,~N,~N,~N,~S,org.jmol.util.JmolFont");
});
