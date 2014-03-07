Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.SurfaceFileReader"], "org.jmol.jvxl.readers.PolygonFileReader", ["java.util.Date", "org.jmol.util.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nVertices = 0;
this.nTriangles = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "PolygonFileReader", org.jmol.jvxl.readers.SurfaceFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.PolygonFileReader, []);
});
Clazz.defineMethod (c$, "init2", 
function (sg, br) {
Clazz.superCall (this, org.jmol.jvxl.readers.PolygonFileReader, "init2", [sg, br]);
this.jvxlFileHeaderBuffer =  new org.jmol.util.StringXBuilder ();
this.jvxlFileHeaderBuffer.append ("#created ").append ("" +  new java.util.Date ()).append ("\n");
this.vertexDataOnly = true;
}, "org.jmol.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readVolumeParameters", 
function (isMapData) {
return true;
}, "~B");
Clazz.overrideMethod (c$, "readVolumeData", 
function (isMapData) {
return true;
}, "~B");
Clazz.overrideMethod (c$, "readSurfaceData", 
function (isMapData) {
this.getSurfaceData ();
}, "~B");
});
