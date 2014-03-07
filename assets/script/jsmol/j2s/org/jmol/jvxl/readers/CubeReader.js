Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.VolumeFileReader"], "org.jmol.jvxl.readers.CubeReader", ["org.jmol.util.Logger", "$.Parser", "$.StringXBuilder"], function () {
c$ = Clazz.declareType (org.jmol.jvxl.readers, "CubeReader", org.jmol.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.CubeReader, []);
});
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.jvxlFileHeaderBuffer =  new org.jmol.util.StringXBuilder ();
this.jvxlFileHeaderBuffer.append (this.readLine ()).appendC ('\n');
this.jvxlFileHeaderBuffer.append (this.readLine ()).appendC ('\n');
var atomLine = this.readLine ();
var tokens = org.jmol.util.Parser.getTokensAt (atomLine, 0);
this.atomCount = this.parseIntStr (tokens[0]);
this.negativeAtomCount = (this.atomCount < 0);
if (this.negativeAtomCount) this.atomCount = -this.atomCount;
this.volumetricOrigin.set (this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]));
org.jmol.jvxl.readers.VolumeFileReader.checkAtomLine (this.isXLowToHigh, this.isAngstroms, tokens[0], atomLine, this.jvxlFileHeaderBuffer);
if (!this.isAngstroms) this.volumetricOrigin.scale (0.5291772);
for (var i = 0; i < 3; ++i) this.readVoxelVector (i);

for (var i = 0; i < this.atomCount; ++i) this.jvxlFileHeaderBuffer.append (this.readLine () + "\n");

if (!this.negativeAtomCount) {
this.nSurfaces = 1;
} else {
this.readLine ();
org.jmol.util.Logger.info ("Reading extra CUBE information line: " + this.line);
this.nSurfaces = this.parseIntStr (this.line);
}});
});
