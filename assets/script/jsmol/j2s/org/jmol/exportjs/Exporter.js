Clazz.declarePackage ("org.jmol.exportjs");
Clazz.load (["org.jmol.util.AxisAngle4f", "$.GData", "$.Point3f", "$.Vector3f"], "org.jmol.exportjs.Exporter", ["java.io.BufferedWriter", "$.File", "$.FileOutputStream", "$.OutputStreamWriter", "java.lang.Float", "org.jmol.util.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.privateKey = 0;
this.jmolRenderer = null;
this.$output = null;
this.bw = null;
this.os = null;
this.fileName = null;
this.commandLineOptions = null;
this.isToFile = false;
this.g3d = null;
this.backgroundColix = 0;
this.screenWidth = 0;
this.screenHeight = 0;
this.slabZ = 0;
this.depthZ = 0;
this.lightSource = null;
this.fixedRotationCenter = null;
this.referenceCenter = null;
this.cameraPosition = null;
this.cameraDistance = 0;
this.aperatureAngle = 0;
this.scalePixelsPerAngstrom = 0;
this.exportType = 0;
this.tempP1 = null;
this.tempP2 = null;
this.tempP3 = null;
this.center = null;
this.tempV1 = null;
this.tempV2 = null;
this.tempV3 = null;
this.tempA = null;
this.appletName = null;
this.nBytes = 0;
this.lineWidthMad = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.exportjs, "Exporter");
Clazz.prepareFields (c$, function () {
this.lightSource = org.jmol.util.GData.getLightSource ();
this.tempP1 =  new org.jmol.util.Point3f ();
this.tempP2 =  new org.jmol.util.Point3f ();
this.tempP3 =  new org.jmol.util.Point3f ();
this.center =  new org.jmol.util.Point3f ();
this.tempV1 =  new org.jmol.util.Vector3f ();
this.tempV2 =  new org.jmol.util.Vector3f ();
this.tempV3 =  new org.jmol.util.Vector3f ();
this.tempA =  new org.jmol.util.AxisAngle4f ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setRenderer", 
function (jmolRenderer) {
this.jmolRenderer = jmolRenderer;
}, "org.jmol.api.JmolRendererInterface");
Clazz.defineMethod (c$, "initializeOutput", 
function (viewer, privateKey, g3d, output) {
this.viewer = viewer;
this.appletName = org.jmol.util.TextFormat.split (viewer.getHtmlName (), '_')[0];
this.g3d = g3d;
this.privateKey = privateKey;
this.backgroundColix = viewer.getObjectColix (0);
this.center.setT (viewer.getRotationCenter ());
if ((this.screenWidth <= 0) || (this.screenHeight <= 0)) {
this.screenWidth = viewer.getScreenWidth ();
this.screenHeight = viewer.getScreenHeight ();
}this.slabZ = g3d.getSlab ();
this.depthZ = g3d.getDepth ();
var cameraFactors = viewer.getCameraFactors ();
this.referenceCenter = cameraFactors[0];
this.cameraPosition = cameraFactors[1];
this.fixedRotationCenter = cameraFactors[2];
this.cameraDistance = cameraFactors[3].x;
this.aperatureAngle = cameraFactors[3].y;
this.scalePixelsPerAngstrom = cameraFactors[3].z;
this.isToFile = (Clazz.instanceOf (output, String));
if (this.isToFile) {
this.fileName = output;
var pt = this.fileName.indexOf (":::");
if (pt > 0) {
this.commandLineOptions = this.fileName.substring (pt + 3);
this.fileName = this.fileName.substring (0, pt);
}try {
var f =  new java.io.File (this.fileName);
System.out.println ("__Exporter writing to " + f.getAbsolutePath ());
this.os =  new java.io.FileOutputStream (this.fileName);
this.bw =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (this.os));
} catch (e) {
if (Clazz.exceptionOf (e, java.io.FileNotFoundException)) {
return false;
} else {
throw e;
}
}
} else {
this.$output = output;
}this.outputHeader ();
return true;
}, "org.jmol.viewer.Viewer,~N,org.jmol.util.GData,~O");
Clazz.defineMethod (c$, "output", 
function (data) {
this.nBytes += data.length;
try {
if (this.bw == null) this.$output.append (data);
 else this.bw.write (data);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}, "~S");
c$.setTempVertex = Clazz.defineMethod (c$, "setTempVertex", 
function (pt, offset, ptTemp) {
ptTemp.setT (pt);
if (offset != null) ptTemp.add (offset);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "outputVertices", 
function (vertices, nVertices, offset) {
for (var i = 0; i < nVertices; i++) {
if (Float.isNaN (vertices[i].x)) continue;
this.outputVertex (vertices[i], offset);
this.output ("\n");
}
}, "~A,~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "outputVertex", 
function (pt, offset) {
org.jmol.exportjs.Exporter.setTempVertex (pt, offset, this.tempP1);
this.output (this.tempP1);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "outputFooter", 
function () {
});
Clazz.defineMethod (c$, "finalizeOutput", 
function () {
this.outputFooter ();
if (!this.isToFile) return (this.$output == null ? "" : this.$output.toString ());
try {
this.bw.flush ();
this.bw.close ();
this.os = null;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.out.println (e.toString ());
return "ERROR EXPORTING FILE";
} else {
throw e;
}
}
return "OK " + this.nBytes + " " + this.jmolRenderer.getExportName () + " " + this.fileName;
});
Clazz.defineMethod (c$, "getTriad", 
function (t) {
return org.jmol.exportjs.Exporter.round (t.x) + " " + org.jmol.exportjs.Exporter.round (t.y) + " " + org.jmol.exportjs.Exporter.round (t.z);
}, "org.jmol.util.Tuple3f");
c$.round = Clazz.defineMethod (c$, "round", 
function (number) {
var s;
return (number == 0 ? "0" : number == 1 ? "1" : (s = "" + (Math.round (number * 1000) / 1000)).startsWith ("0.") ? s.substring (1) : s.startsWith ("-0.") ? "-" + s.substring (2) : s.endsWith (".0") ? s.substring (0, s.length - 2) : s);
}, "~N");
c$.round = Clazz.defineMethod (c$, "round", 
function (pt) {
return org.jmol.exportjs.Exporter.round (pt.x) + " " + org.jmol.exportjs.Exporter.round (pt.y) + " " + org.jmol.exportjs.Exporter.round (pt.z);
}, "org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "drawSurface", 
function (meshSurface, colix) {
var nVertices = meshSurface.vertexCount;
if (nVertices == 0) return;
var nFaces = 0;
var nPolygons = meshSurface.polygonCount;
var bsPolygons = meshSurface.bsPolygons;
var faceVertexMax = (meshSurface.haveQuads ? 4 : 3);
var indices = meshSurface.polygonIndexes;
var isAll = (bsPolygons == null);
if (isAll) {
for (var i = nPolygons; --i >= 0; ) nFaces += (faceVertexMax == 4 && indices[i].length == 4 ? 2 : 1);

} else {
for (var i = bsPolygons.nextSetBit (0); i >= 0; i = bsPolygons.nextSetBit (i + 1)) nFaces += (faceVertexMax == 4 && indices[i].length == 4 ? 2 : 1);

}if (nFaces == 0) return;
var vertices = meshSurface.getVertices ();
var normals = meshSurface.normals;
var colorSolid = (colix != 0);
var colixes = (colorSolid ? null : meshSurface.vertexColixes);
var polygonColixes = (colorSolid ? meshSurface.polygonColixes : null);
this.outputSurface (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, nFaces, bsPolygons, faceVertexMax, colix, meshSurface.offset);
}, "org.jmol.util.MeshSurface,~N");
Clazz.defineMethod (c$, "outputSurface", 
function (vertices, normals, colixes, indices, polygonColixes, nVertices, nPolygons, nFaces, bsPolygons, faceVertexMax, colix, offset) {
}, "~A,~A,~A,~A,~A,~N,~N,~N,org.jmol.util.BitSet,~N,~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "drawFilledCircle", 
function (colixRing, colixFill, diameter, x, y, z) {
if (colixRing != 0) this.drawCircle (x, y, z, diameter, colixRing, false);
if (colixFill != 0) this.drawCircle (x, y, z, diameter, colixFill, true);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "plotImage", 
function (x, y, z, image, bgcolix, width, height) {
}, "~N,~N,~N,java.awt.Image,~N,~N,~N");
Clazz.defineMethod (c$, "plotText", 
function (x, y, z, colix, text, font3d) {
}, "~N,~N,~N,~N,~S,org.jmol.util.JmolFont");
Clazz.defineStatics (c$,
"degreesPerRadian", (57.29577951308232));
});
