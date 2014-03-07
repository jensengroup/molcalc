Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.SurfaceReader"], "org.jmol.jvxl.readers.VolumeDataReader", ["org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.ArrayUtil", "$.Logger", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataType = 0;
this.precalculateVoxelData = false;
this.allowMapData = false;
this.point = null;
this.ptsPerAngstrom = 0;
this.maxGrid = 0;
this.atomDataServer = null;
this.useOriginStepsPoints = false;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "VolumeDataReader", org.jmol.jvxl.readers.SurfaceReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.VolumeDataReader, []);
});
Clazz.defineMethod (c$, "init", 
function (sg) {
Clazz.superCall (this, org.jmol.jvxl.readers.VolumeDataReader, "init", [sg]);
this.useOriginStepsPoints = (this.params.origin != null && this.params.points != null && this.params.steps != null);
this.dataType = this.params.dataType;
this.precalculateVoxelData = true;
this.allowMapData = true;
}, "org.jmol.jvxl.readers.SurfaceGenerator");
Clazz.defineMethod (c$, "setup", 
function (isMapData) {
this.jvxlFileHeaderBuffer =  new org.jmol.util.StringXBuilder ().append ("volume data read from file\n\n");
org.jmol.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
}, "~B");
Clazz.overrideMethod (c$, "readVolumeParameters", 
function (isMapData) {
this.setup (isMapData);
this.initializeVolumetricData ();
return true;
}, "~B");
Clazz.overrideMethod (c$, "readVolumeData", 
function (isMapData) {
try {
this.readSurfaceData (isMapData);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
return false;
} else {
throw e;
}
}
return true;
}, "~B");
Clazz.defineMethod (c$, "readVoxelDataIndividually", 
function (isMapData) {
if (isMapData && !this.allowMapData) return;
if (!isMapData || this.volumeData.sr != null) {
this.volumeData.setVoxelDataAsArray (this.voxelData = null);
return;
}this.newVoxelDataCube ();
for (var x = 0; x < this.nPointsX; ++x) {
var plane = org.jmol.util.ArrayUtil.newFloat2 (this.nPointsY);
this.voxelData[x] = plane;
var ptyz = 0;
for (var y = 0; y < this.nPointsY; ++y) {
var strip = plane[y] =  Clazz.newFloatArray (this.nPointsZ, 0);
for (var z = 0; z < this.nPointsZ; ++z, ++ptyz) {
strip[z] = this.getValue (x, y, z, ptyz);
}
}
}
}, "~B");
Clazz.defineMethod (c$, "setVolumeData", 
function () {
});
Clazz.defineMethod (c$, "setVolumeDataParams", 
function () {
if (this.params.volumeData != null) {
this.setVolumeData (this.params.volumeData);
return true;
}if (!this.useOriginStepsPoints) {
return false;
}this.volumetricOrigin.setT (this.params.origin);
this.volumetricVectors[0].set (this.params.steps.x, 0, 0);
this.volumetricVectors[1].set (0, this.params.steps.y, 0);
this.volumetricVectors[2].set (0, 0, this.params.steps.z);
this.voxelCounts[0] = Clazz.floatToInt (this.params.points.x);
this.voxelCounts[1] = Clazz.floatToInt (this.params.points.y);
this.voxelCounts[2] = Clazz.floatToInt (this.params.points.z);
if (this.voxelCounts[0] < 1 || this.voxelCounts[1] < 1 || this.voxelCounts[2] < 1) return false;
this.showGridInfo ();
return true;
});
Clazz.defineMethod (c$, "showGridInfo", 
function () {
org.jmol.util.Logger.info ("grid origin  = " + this.params.origin);
org.jmol.util.Logger.info ("grid steps   = " + this.params.steps);
org.jmol.util.Logger.info ("grid points  = " + this.params.points);
this.ptTemp.x = this.params.steps.x * this.params.points.x;
this.ptTemp.y = this.params.steps.y * this.params.points.y;
this.ptTemp.z = this.params.steps.z * this.params.points.z;
org.jmol.util.Logger.info ("grid lengths = " + this.ptTemp);
this.ptTemp.add (this.params.origin);
org.jmol.util.Logger.info ("grid max xyz = " + this.ptTemp);
});
Clazz.defineMethod (c$, "setVoxelRange", 
function (index, min, max, ptsPerAngstrom, gridMax, minPointsPerAngstrom) {
var nGrid;
var d;
if (min >= max) {
min = -10;
max = 10;
}var range = max - min;
var resolution = this.params.resolution;
if (resolution != 3.4028235E38) ptsPerAngstrom = resolution;
nGrid = Clazz.doubleToInt (Math.floor (range * ptsPerAngstrom)) + 1;
if (nGrid > gridMax) {
if ((this.dataType & 256) > 0) {
if (resolution == 3.4028235E38) {
if (!this.isQuiet) org.jmol.util.Logger.info ("Maximum number of voxels for index=" + index + " exceeded (" + nGrid + ") -- set to " + gridMax);
nGrid = gridMax;
} else {
if (!this.isQuiet) org.jmol.util.Logger.info ("Warning -- high number of grid points: " + nGrid);
}} else if (resolution == 3.4028235E38) {
nGrid = gridMax;
}}ptsPerAngstrom = (nGrid - 1) / range;
if (ptsPerAngstrom < minPointsPerAngstrom) {
ptsPerAngstrom = minPointsPerAngstrom;
nGrid = Clazz.doubleToInt (Math.floor (ptsPerAngstrom * range + 1));
ptsPerAngstrom = (nGrid - 1) / range;
}d = this.volumeData.volumetricVectorLengths[index] = 1 / ptsPerAngstrom;
this.voxelCounts[index] = nGrid;
if (!this.isQuiet) org.jmol.util.Logger.info ("isosurface resolution for axis " + (index + 1) + " set to " + ptsPerAngstrom + " points/Angstrom; " + this.voxelCounts[index] + " voxels");
switch (index) {
case 0:
this.volumetricVectors[0].set (d, 0, 0);
this.volumetricOrigin.x = min;
break;
case 1:
this.volumetricVectors[1].set (0, d, 0);
this.volumetricOrigin.y = min;
break;
case 2:
this.volumetricVectors[2].set (0, 0, d);
this.volumetricOrigin.z = min;
if (this.isEccentric) this.eccentricityMatrix.transform (this.volumetricOrigin);
if (this.center.x != 3.4028235E38) this.volumetricOrigin.add (this.center);
}
if (this.isEccentric) this.eccentricityMatrix.transform (this.volumetricVectors[index]);
return this.voxelCounts[index];
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "readSurfaceData", 
function (isMapData) {
if (this.isProgressive && !isMapData) {
this.nDataPoints = this.volumeData.setVoxelCounts (this.nPointsX, this.nPointsY, this.nPointsZ);
this.voxelData = null;
return;
}if (this.precalculateVoxelData) this.generateCube ();
 else this.readVoxelDataIndividually (isMapData);
}, "~B");
Clazz.defineMethod (c$, "generateCube", 
function () {
org.jmol.util.Logger.info ("data type: user volumeData");
org.jmol.util.Logger.info ("voxel grid origin:" + this.volumetricOrigin);
for (var i = 0; i < 3; ++i) org.jmol.util.Logger.info ("voxel grid vector:" + this.volumetricVectors[i]);

org.jmol.util.Logger.info ("Read " + this.nPointsX + " x " + this.nPointsY + " x " + this.nPointsZ + " data points");
});
Clazz.overrideMethod (c$, "closeReader", 
function () {
});
});
