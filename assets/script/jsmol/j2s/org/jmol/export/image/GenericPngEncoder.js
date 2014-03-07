Clazz.declarePackage ("org.jmol.export.image");
Clazz.load (["org.jmol.export.image.GenericCRCEncoder"], "org.jmol.export.image.GenericPngEncoder", ["java.io.ByteArrayOutputStream", "java.util.zip.Deflater", "$.DeflaterOutputStream", "org.jmol.viewer.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.image = null;
this.width = 0;
this.height = 0;
this.encodeAlpha = false;
this.filter = 0;
this.bytesPerPixel = 0;
this.compressionLevel = 0;
this.type = null;
this.transparentColor = null;
this.apiPlatform = null;
this.scanLines = null;
this.byteWidth = 0;
Clazz.instantialize (this, arguments);
}, org.jmol["export"].image, "GenericPngEncoder", org.jmol["export"].image.GenericCRCEncoder);
c$.getBytesType = Clazz.defineMethod (c$, "getBytesType", 
function (apiPlatform, image, quality, bgcolor, type) {
var pg =  new org.jmol["export"].image.GenericPngEncoder (apiPlatform, image, false, 0, quality);
pg.type = (type + "0000").substring (0, 4);
if (bgcolor != 0) pg.transparentColor = Integer.$valueOf (bgcolor);
return pg.pngEncode ();
}, "org.jmol.api.ApiPlatform,~O,~N,~N,~S");
Clazz.makeConstructor (c$, 
function (apiPlatform, image, encodeAlpha, whichFilter, compLevel) {
Clazz.superConstructor (this, org.jmol["export"].image.GenericPngEncoder);
this.apiPlatform = apiPlatform;
this.image = image;
this.compressionLevel = (compLevel >= 0 && compLevel <= 9 ? compLevel : 0);
}, "org.jmol.api.ApiPlatform,~O,~B,~N,~N");
Clazz.defineMethod (c$, "pngEncode", 
($fz = function () {
var pngIdBytes = [-119, 80, 78, 71, 13, 10, 26, 10];
if (this.image == null) {
return null;
}this.width = this.apiPlatform.getImageWidth (this.image);
this.height = this.apiPlatform.getImageHeight (this.image);
this.writeBytes (pngIdBytes);
this.writeHeader ();
($t$ = org.jmol.export.image.GenericPngEncoder.ptJmolByteText = this.bytePos + 4, org.jmol.export.image.GenericPngEncoder.prototype.ptJmolByteText = org.jmol.export.image.GenericPngEncoder.ptJmolByteText, $t$);
this.writeText (org.jmol["export"].image.GenericPngEncoder.getJmolTypeText (this.type, 0, 0));
this.writeText ("Software\0Jmol " + org.jmol.viewer.Viewer.getJmolVersion ());
this.writeText ("Creation Time\0" + this.apiPlatform.getDateFormat ());
if (!this.encodeAlpha && this.transparentColor != null) this.writeTransparentColor (this.transparentColor.intValue ());
return (!this.writeImageData () ? null : this.getBytes ());
}, $fz.isPrivate = true, $fz));
c$.setJmolTypeText = Clazz.defineMethod (c$, "setJmolTypeText", 
function (b, nPNG, nState, type) {
var s = "iTXt" + org.jmol["export"].image.GenericPngEncoder.getJmolTypeText (type, nPNG, nState);
var encoder =  new org.jmol["export"].image.GenericCRCEncoder ();
encoder.setData (b, org.jmol["export"].image.GenericPngEncoder.ptJmolByteText);
encoder.writeString (s);
encoder.writeCRC ();
}, "~A,~N,~N,~S");
c$.getJmolTypeText = Clazz.defineMethod (c$, "getJmolTypeText", 
($fz = function (type, nPNG, nState) {
var sPNG = "000000000" + nPNG;
sPNG = sPNG.substring (sPNG.length - 9);
var sState = "000000000" + nState;
sState = sState.substring (sState.length - 9);
return "Jmol Type\0" + type + (type.equals ("PNG") ? "0" : "") + sPNG + "+" + sState;
}, $fz.isPrivate = true, $fz), "~S,~N,~N");
Clazz.defineMethod (c$, "writeHeader", 
($fz = function () {
this.writeInt4 (13);
this.startPos = this.bytePos;
this.writeString ("IHDR");
this.writeInt4 (this.width);
this.writeInt4 (this.height);
this.writeByte (8);
this.writeByte ((this.encodeAlpha) ? 6 : 2);
this.writeByte (0);
this.writeByte (0);
this.writeByte (0);
this.writeCRC ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "writeText", 
($fz = function (msg) {
this.writeInt4 (msg.length);
this.startPos = this.bytePos;
this.writeString ("iTXt" + msg);
this.writeCRC ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "writeTransparentColor", 
($fz = function (icolor) {
this.writeInt4 (6);
this.startPos = this.bytePos;
this.writeString ("tRNS");
this.writeInt2 ((icolor >> 16) & 0xFF);
this.writeInt2 ((icolor >> 8) & 0xFF);
this.writeInt2 (icolor & 0xFF);
this.writeCRC ();
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "writeImageData", 
($fz = function () {
this.bytesPerPixel = (this.encodeAlpha ? 4 : 3);
this.byteWidth = this.width * this.bytesPerPixel;
var scanWidth = this.byteWidth + 1;
var rowsLeft = this.height;
var startRow = 0;
var nRows;
var scanPos;
var compressedLines;
var deflater =  new java.util.zip.Deflater (this.compressionLevel);
var outBytes =  new java.io.ByteArrayOutputStream (1024);
var compBytes =  new java.util.zip.DeflaterOutputStream (outBytes, deflater);
try {
while (rowsLeft > 0) {
{
nRows = rowsLeft;
}this.scanLines =  Clazz.newByteArray (scanWidth * nRows, 0);
var pixels;
var nPixels = this.width * nRows;
{
pixels = null;
}pixels = this.apiPlatform.grabPixels (this.image, this.width, this.height, pixels, startRow, nRows);
if (pixels == null) return false;
scanPos = 0;
for (var i = 0; i < nPixels; i++) {
if (i % this.width == 0) {
this.scanLines[scanPos++] = this.filter;
}this.scanLines[scanPos++] = ((pixels[i] >> 16) & 0xff);
this.scanLines[scanPos++] = ((pixels[i] >> 8) & 0xff);
this.scanLines[scanPos++] = ((pixels[i]) & 0xff);
if (this.encodeAlpha) {
this.scanLines[scanPos++] = ((pixels[i] >> 24) & 0xff);
}}
compBytes.write (this.scanLines, 0, scanPos);
startRow += nRows;
rowsLeft -= nRows;
}
compBytes.close ();
compressedLines = outBytes.toByteArray ();
this.writeInt4 (compressedLines.length);
this.startPos = this.bytePos;
this.writeString ("IDAT");
this.writeBytes (compressedLines);
this.writeCRC ();
this.writeEnd ();
deflater.finish ();
return true;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.err.println (e.toString ());
return false;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "writeEnd", 
($fz = function () {
this.writeInt4 (0);
this.startPos = this.bytePos;
this.writeString ("IEND");
this.writeCRC ();
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"FILTER_NONE", 0,
"FILTER_SUB", 1,
"FILTER_UP", 2,
"FILTER_LAST", 2,
"ptJmolByteText", 0);
});
