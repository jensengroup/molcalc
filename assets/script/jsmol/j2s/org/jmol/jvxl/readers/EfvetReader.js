Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.PolygonFileReader"], "org.jmol.jvxl.readers.EfvetReader", ["org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.Logger", "$.Point3f"], function () {
c$ = Clazz.declareType (org.jmol.jvxl.readers, "EfvetReader", org.jmol.jvxl.readers.PolygonFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.EfvetReader, []);
});
Clazz.defineMethod (c$, "init2", 
function (sg, br) {
Clazz.superCall (this, org.jmol.jvxl.readers.EfvetReader, "init2", [sg, br]);
this.jvxlFileHeaderBuffer.append ("efvet file format\nvertices and triangles only\n");
org.jmol.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
this.hasColorData = true;
}, "org.jmol.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "getSurfaceData", 
function () {
this.getHeader ();
this.getVertices ();
this.getTriangles ();
org.jmol.util.Logger.info ("efvet file contains " + this.nVertices + " vertices and " + this.nTriangles + " triangles");
});
Clazz.defineMethod (c$, "getHeader", 
($fz = function () {
this.skipTo ("<efvet", null);
while (this.readLine ().length > 0 && this.line.indexOf (">") < 0) this.jvxlFileHeaderBuffer.append ("# " + this.line + "\n");

org.jmol.util.Logger.info (this.jvxlFileHeaderBuffer.toString ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getVertices", 
($fz = function () {
var pt =  new org.jmol.util.Point3f ();
var value = 0;
this.skipTo ("<vertices", "count");
this.jvxlData.vertexCount = this.nVertices = this.parseInt ();
this.skipTo ("property=", null);
this.line = this.line.$replace ('"', ' ');
var tokens = this.getTokens ();
var dataIndex = this.params.fileIndex;
if (dataIndex > 0 && dataIndex < tokens.length) org.jmol.util.Logger.info ("property " + tokens[dataIndex]);
 else org.jmol.util.Logger.info (this.line);
for (var i = 0; i < this.nVertices; i++) {
this.skipTo ("<vertex", "image");
pt.set (this.parseFloat (), this.parseFloat (), this.parseFloat ());
this.skipTo (null, "property");
for (var j = 0; j < dataIndex; j++) value = this.parseFloat ();

if (this.isAnisotropic) this.setVertexAnisotropy (pt);
this.addVertexCopy (pt, value, i);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getTriangles", 
($fz = function () {
this.skipTo ("<triangle_array", "count");
this.nTriangles = this.parseInt ();
for (var i = 0; i < this.nTriangles; i++) {
this.skipTo ("<triangle", "vertex");
this.addTriangleCheck (this.parseInt () - 1, this.parseInt () - 1, this.parseInt () - 1, 7, 0, false, 0);
}
}, $fz.isPrivate = true, $fz));
});
