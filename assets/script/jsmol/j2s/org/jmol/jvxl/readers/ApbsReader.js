Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.VolumeFileReader"], "org.jmol.jvxl.readers.ApbsReader", ["org.jmol.util.Parser", "$.StringXBuilder"], function () {
c$ = Clazz.declareType (org.jmol.jvxl.readers, "ApbsReader", org.jmol.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.ApbsReader, []);
});
Clazz.defineMethod (c$, "init2", 
function (sg, br) {
Clazz.superCall (this, org.jmol.jvxl.readers.ApbsReader, "init2", [sg, br]);
if (this.params.thePlane == null) this.params.insideOut = !this.params.insideOut;
this.isAngstroms = true;
this.nSurfaces = 1;
}, "org.jmol.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readParameters", 
function () {
this.jvxlFileHeaderBuffer = org.jmol.util.StringXBuilder.newS (this.skipComments (false));
while (this.line != null && this.line.length == 0) this.readLine ();

this.jvxlFileHeaderBuffer.append ("APBS OpenDx DATA ").append (this.line).append ("\n");
this.jvxlFileHeaderBuffer.append ("see http://apbs.sourceforge.net\n");
var atomLine = this.readLine ();
var tokens = org.jmol.util.Parser.getTokens (atomLine);
if (tokens.length >= 4) {
this.volumetricOrigin.set (this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]));
}org.jmol.jvxl.readers.VolumeFileReader.checkAtomLine (this.isXLowToHigh, this.isAngstroms, tokens[0], atomLine, this.jvxlFileHeaderBuffer);
this.readVoxelVector (0);
this.readVoxelVector (1);
this.readVoxelVector (2);
this.readLine ();
tokens = this.getTokens ();
for (var i = 0; i < 3; i++) this.voxelCounts[i] = this.parseIntStr (tokens[i + 5]);

this.readLine ();
});
});
