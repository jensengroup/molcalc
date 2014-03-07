Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.VolumeFileReader", "org.jmol.util.Point3f"], "org.jmol.jvxl.readers.MapFileReader", ["org.jmol.util.Logger", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dmin = 3.4028235E38;
this.dmax = 0;
this.dmean = 0;
this.drange = 0;
this.mapc = 0;
this.mapr = 0;
this.maps = 0;
this.nx = 0;
this.ny = 0;
this.nz = 0;
this.mode = 0;
this.nxyzStart = null;
this.na = 0;
this.nb = 0;
this.nc = 0;
this.a = 0;
this.b = 0;
this.c = 0;
this.alpha = 0;
this.beta = 0;
this.gamma = 0;
this.origin = null;
this.adjustment = null;
this.vectors = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "MapFileReader", org.jmol.jvxl.readers.VolumeFileReader);
Clazz.prepareFields (c$, function () {
this.nxyzStart =  Clazz.newIntArray (3, 0);
this.origin =  new org.jmol.util.Point3f ();
this.adjustment =  new org.jmol.util.Point3f ();
this.vectors =  new Array (3);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.MapFileReader, []);
});
Clazz.defineMethod (c$, "init2", 
function (sg, br) {
Clazz.superCall (this, org.jmol.jvxl.readers.MapFileReader, "init2", [sg, br]);
this.isAngstroms = true;
this.adjustment = sg.getParams ().center;
if (this.adjustment.x == 3.4028235E38) this.adjustment =  new org.jmol.util.Point3f ();
}, "org.jmol.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "getVectorsAndOrigin", 
function () {
org.jmol.util.Logger.info ("grid parameters: nx,ny,nz: " + this.nx + "," + this.ny + "," + this.nz);
org.jmol.util.Logger.info ("grid parameters: nxStart,nyStart,nzStart: " + this.nxyzStart[0] + "," + this.nxyzStart[1] + "," + this.nxyzStart[2]);
org.jmol.util.Logger.info ("grid parameters: mx,my,mz: " + this.na + "," + this.nb + "," + this.nc);
org.jmol.util.Logger.info ("grid parameters: a,b,c,alpha,beta,gamma: " + this.a + "," + this.b + "," + this.c + "," + this.alpha + "," + this.beta + "," + this.gamma);
org.jmol.util.Logger.info ("grid parameters: mapc,mapr,maps: " + this.mapc + "," + this.mapr + "," + this.maps);
org.jmol.util.Logger.info ("grid parameters: originX,Y,Z: " + this.origin);
var unitCell = org.jmol.util.SimpleUnitCell.newA ([this.a / this.na, this.b / this.nb, this.c / this.nc, this.alpha, this.beta, this.gamma]);
this.vectors[0] = org.jmol.util.Point3f.new3 (1, 0, 0);
this.vectors[1] = org.jmol.util.Point3f.new3 (0, 1, 0);
this.vectors[2] = org.jmol.util.Point3f.new3 (0, 0, 1);
unitCell.toCartesian (this.vectors[0], false);
unitCell.toCartesian (this.vectors[1], false);
unitCell.toCartesian (this.vectors[2], false);
org.jmol.util.Logger.info ("Jmol unit cell vectors:");
org.jmol.util.Logger.info ("    a: " + this.vectors[0]);
org.jmol.util.Logger.info ("    b: " + this.vectors[1]);
org.jmol.util.Logger.info ("    c: " + this.vectors[2]);
this.voxelCounts[0] = this.nz;
this.voxelCounts[1] = this.ny;
this.voxelCounts[2] = this.nx;
this.volumetricVectors[0].setT (this.vectors[this.maps - 1]);
this.volumetricVectors[1].setT (this.vectors[this.mapr - 1]);
this.volumetricVectors[2].setT (this.vectors[this.mapc - 1]);
if (this.origin.x == 0 && this.origin.y == 0 && this.origin.z == 0) {
var xyz2crs =  Clazz.newIntArray (3, 0);
xyz2crs[this.mapc - 1] = 0;
xyz2crs[this.mapr - 1] = 1;
xyz2crs[this.maps - 1] = 2;
var xIndex = xyz2crs[0];
var yIndex = xyz2crs[1];
var zIndex = xyz2crs[2];
this.origin.scaleAdd2 (this.nxyzStart[xIndex] + this.adjustment.x, this.vectors[0], this.origin);
this.origin.scaleAdd2 (this.nxyzStart[yIndex] + this.adjustment.y, this.vectors[1], this.origin);
this.origin.scaleAdd2 (this.nxyzStart[zIndex] + this.adjustment.z, this.vectors[2], this.origin);
}this.volumetricOrigin.setT (this.origin);
org.jmol.util.Logger.info ("Jmol grid origin in Cartesian coordinates: " + this.origin);
org.jmol.util.Logger.info ("Use  isosurface OFFSET {x y z}  if you want to shift it.\n");
});
Clazz.defineMethod (c$, "setCutoffAutomatic", 
function () {
if (this.params.thePlane == null && this.params.cutoffAutomatic) {
this.params.cutoff = (this.boundingBox == null ? 3.0 : 1.6);
if (this.dmin != 3.4028235E38) {
if (this.params.cutoff > this.dmax) this.params.cutoff = this.dmax / 4;
}org.jmol.util.Logger.info ("DNS6Reader: setting cutoff to default value of " + this.params.cutoff + (this.boundingBox == null ? " (no BOUNDBOX parameter)\n" : "\n"));
}});
});
