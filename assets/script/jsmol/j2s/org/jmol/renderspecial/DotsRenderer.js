Clazz.declarePackage ("org.jmol.renderspecial");
Clazz.load (["org.jmol.render.ShapeRenderer"], "org.jmol.renderspecial.DotsRenderer", ["org.jmol.shapespecial.Dots", "org.jmol.util.Colix", "$.Geodesic", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.iShowSolid = false;
this.verticesTransformed = null;
this.screenLevel = 0;
this.screenDotCount = 0;
this.screenCoordinates = null;
this.faceMap = null;
this.dotScale = 0;
this.testRadiusAdjust = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.renderspecial, "DotsRenderer", org.jmol.render.ShapeRenderer);
Clazz.overrideMethod (c$, "initRenderer", 
function () {
this.screenLevel = org.jmol.shapespecial.Dots.MAX_LEVEL;
this.screenDotCount = org.jmol.util.Geodesic.getVertexCount (org.jmol.shapespecial.Dots.MAX_LEVEL);
this.verticesTransformed =  new Array (this.screenDotCount);
for (var i = this.screenDotCount; --i >= 0; ) this.verticesTransformed[i] =  new org.jmol.util.Vector3f ();

this.screenCoordinates =  Clazz.newIntArray (3 * this.screenDotCount, 0);
});
Clazz.defineMethod (c$, "render", 
function () {
var dots = this.shape;
this.render1 (dots);
return false;
});
Clazz.defineMethod (c$, "render1", 
function (dots) {
if (!this.iShowSolid && !this.g3d.setColix (4)) return;
var sppa = Clazz.floatToInt (this.viewer.getScalePixelsPerAngstrom (true));
this.screenLevel = (this.iShowSolid || sppa > 20 ? 3 : sppa > 10 ? 2 : sppa > 5 ? 1 : 0);
if (!this.iShowSolid) this.screenLevel += this.viewer.getDotDensity () - 3;
this.screenLevel = Math.max (Math.min (this.screenLevel, org.jmol.shapespecial.Dots.MAX_LEVEL), 0);
this.screenDotCount = org.jmol.util.Geodesic.getVertexCount (this.screenLevel);
this.dotScale = this.viewer.getDotScale ();
for (var i = this.screenDotCount; --i >= 0; ) this.viewer.transformVector (org.jmol.util.Geodesic.getVertexVector (i), this.verticesTransformed[i]);

var maps = dots.ec.getDotsConvexMaps ();
for (var i = dots.ec.getDotsConvexMax (); --i >= 0; ) {
var atom = this.modelSet.atoms[i];
var map = maps[i];
if (map == null || !atom.isVisible (this.myVisibilityFlag) || !this.g3d.isInDisplayRange (atom.screenX, atom.screenY)) continue;
try {
var nPoints = this.calcScreenPoints (map, dots.ec.getAppropriateRadius (i) + this.testRadiusAdjust, atom.screenX, atom.screenY, atom.screenZ);
if (nPoints != 0) this.renderConvex (org.jmol.util.Colix.getColixInherited (dots.colixes[i], atom.getColix ()), map, nPoints);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("Dots rendering error");
System.out.println (e.toString ());
} else {
throw e;
}
}
}
}, "org.jmol.shapespecial.Dots");
Clazz.defineMethod (c$, "calcScreenPoints", 
($fz = function (visibilityMap, radius, x, y, z) {
var nPoints = 0;
var i = 0;
var scaledRadius = this.viewer.scaleToPerspective (z, radius);
var iDot = Math.min (visibilityMap.size (), this.screenDotCount);
while (--iDot >= 0) {
if (!visibilityMap.get (iDot)) continue;
var vertex = this.verticesTransformed[iDot];
if (this.faceMap != null) this.faceMap[iDot] = i;
this.screenCoordinates[i++] = x + Math.round (scaledRadius * vertex.x);
this.screenCoordinates[i++] = y + Math.round (scaledRadius * vertex.y);
this.screenCoordinates[i++] = z + Math.round (scaledRadius * vertex.z);
++nPoints;
}
return nPoints;
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet,~N,~N,~N,~N");
Clazz.defineMethod (c$, "renderConvex", 
function (colix, map, nPoints) {
this.colix = org.jmol.util.Colix.getColixTranslucent3 (colix, false, 0);
this.renderDots (nPoints);
}, "~N,org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "renderDots", 
function (nPoints) {
this.g3d.setColix (this.colix);
this.g3d.drawPoints (nPoints, this.screenCoordinates, this.dotScale);
}, "~N");
});
