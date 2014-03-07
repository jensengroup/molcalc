Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.AtomDataReader"], "org.jmol.jvxl.readers.IsoFxyReader", ["org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.isPlanarMapping = false;
this.func = null;
this.values = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "IsoFxyReader", org.jmol.jvxl.readers.AtomDataReader);
Clazz.prepareFields (c$, function () {
this.values =  Clazz.newFloatArray (3, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.IsoFxyReader, []);
});
Clazz.defineMethod (c$, "init", 
function (sg) {
Clazz.superCall (this, org.jmol.jvxl.readers.IsoFxyReader, "init", [sg]);
this.isXLowToHigh = true;
this.precalculateVoxelData = false;
this.atomDataServer = sg.getAtomDataServer ();
this.params.fullyLit = true;
this.isPlanarMapping = (this.params.thePlane != null || this.params.state == 3);
if (this.params.func != null) this.volumeData.sr = this;
}, "org.jmol.jvxl.readers.SurfaceGenerator");
Clazz.defineMethod (c$, "setup", 
function (isMapData) {
if (this.params.functionInfo.size () > 5) this.data = this.params.functionInfo.get (5);
this.setup ("functionXY");
}, "~B");
Clazz.defineMethod (c$, "setup", 
function (type) {
this.func = this.params.func;
var functionName = this.params.functionInfo.get (0);
this.jvxlFileHeaderBuffer =  new org.jmol.util.StringXBuilder ();
this.jvxlFileHeaderBuffer.append (type).append ("\n").append (functionName).append ("\n");
if (this.params.thePlane != null || this.data == null && !this.useOriginStepsPoints) this.setVolumeForPlane ();
 else if (this.data == null) this.setVolumeDataParams ();
 else this.setVolumeData ();
org.jmol.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
}, "~S");
Clazz.defineMethod (c$, "setVolumeData", 
function () {
if (this.data == null) {
Clazz.superCall (this, org.jmol.jvxl.readers.IsoFxyReader, "setVolumeData", []);
return;
}this.volumetricOrigin.setT (this.params.functionInfo.get (1));
for (var i = 0; i < 3; i++) {
var info = this.params.functionInfo.get (i + 2);
this.voxelCounts[i] = Math.abs (Clazz.floatToInt (info.x));
this.volumetricVectors[i].set (info.y, info.z, info.w);
}
if (this.isAnisotropic) this.setVolumetricAnisotropy ();
});
Clazz.defineMethod (c$, "readSurfaceData", 
function (isMapData) {
if (this.volumeData.sr != null) return;
Clazz.superCall (this, org.jmol.jvxl.readers.IsoFxyReader, "readSurfaceData", [isMapData]);
}, "~B");
Clazz.defineMethod (c$, "getPlane", 
function (x) {
var plane = Clazz.superCall (this, org.jmol.jvxl.readers.IsoFxyReader, "getPlane", [x]);
this.getPlane (x, plane);
return plane;
}, "~N");
Clazz.defineMethod (c$, "getPlane", 
($fz = function (x, plane) {
for (var y = 0, ptyz = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) plane[ptyz++] = this.getValue (x, y, z);


}, $fz.isPrivate = true, $fz), "~N,~A");
Clazz.defineMethod (c$, "getValue", 
function (x, y, z) {
var value;
if (this.data == null) {
value = this.evaluateValue (x, y, z);
} else {
this.volumeData.voxelPtToXYZ (x, y, z, this.ptTemp);
value = this.data[x][y];
}return (this.isPlanarMapping ? value : value - this.ptTemp.z);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "getValueAtPoint", 
function (pt) {
if (this.params.func == null) return 0;
this.values[0] = pt.x;
this.values[1] = pt.y;
this.values[2] = pt.z;
return this.atomDataServer.evalFunctionFloat (this.func[0], this.func[1], this.values);
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "evaluateValue", 
function (x, y, z) {
this.volumeData.voxelPtToXYZ (x, y, z, this.ptTemp);
return this.getValueAtPoint (this.ptTemp);
}, "~N,~N,~N");
});
