Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.PolygonFileReader", "java.util.Hashtable", "org.jmol.util.Point3f"], "org.jmol.jvxl.readers.NffFileReader", ["java.lang.Float", "org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.ColorUtil", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nPolygons = 0;
this.vertexMap = null;
this.pt = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "NffFileReader", org.jmol.jvxl.readers.PolygonFileReader);
Clazz.prepareFields (c$, function () {
this.vertexMap =  new java.util.Hashtable ();
this.pt =  new org.jmol.util.Point3f ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.NffFileReader, []);
});
Clazz.defineMethod (c$, "setHeader", 
function () {
this.jvxlFileHeaderBuffer.append ("NFF file format\nvertices and triangles only\n");
org.jmol.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
});
Clazz.overrideMethod (c$, "getSurfaceData", 
function () {
if (this.readVerticesAndPolygons ()) org.jmol.util.Logger.info ("NFF file contains " + this.nVertices + " vertices and " + this.nTriangles + " triangles");
 else org.jmol.util.Logger.error (this.params.fileName + ": Error reading Nff data ");
});
Clazz.defineMethod (c$, "readVerticesAndPolygons", 
function () {
var color = 0xFF0000;
try {
while (this.readLine () != null) {
if (this.line.length == 0) continue;
var tokens = this.getTokens ();
switch (this.line.charAt (0)) {
case '#':
this.vertexMap.clear ();
continue;
case 'f':
color = org.jmol.util.ColorUtil.colorTriadToInt (this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]));
continue;
case 'p':
if (this.line.equals ("pp 3")) {
var i1 = this.getVertex ();
var i2 = this.getVertex ();
var i3 = this.getVertex ();
this.nTriangles++;
this.addTriangleCheck (i1, i2, i3, 7, 0, false, color);
}continue;
}
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return true;
});
Clazz.defineMethod (c$, "getVertex", 
($fz = function () {
var i = this.vertexMap.get (this.readLine ());
if (i == null) {
var tokens = this.getTokens ();
this.pt.set (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]));
if (!Float.isNaN (this.params.scale)) this.pt.scale (this.params.scale);
if (this.isAnisotropic) this.setVertexAnisotropy (this.pt);
i = Integer.$valueOf (this.addVertexCopy (this.pt, 0, this.nVertices++));
this.vertexMap.put (this.line, i);
}return i.intValue ();
}, $fz.isPrivate = true, $fz));
});
