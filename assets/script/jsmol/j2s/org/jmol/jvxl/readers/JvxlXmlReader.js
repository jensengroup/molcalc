Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.VolumeFileReader"], "org.jmol.jvxl.readers.JvxlXmlReader", ["java.lang.Float", "$.NullPointerException", "java.util.ArrayList", "$.Hashtable", "org.jmol.io.XmlReader", "org.jmol.jvxl.data.JvxlCoder", "$.MeshData", "org.jmol.shapesurface.IsosurfaceMesh", "org.jmol.util.ArrayUtil", "$.BitSet", "$.Colix", "$.ColorEncoder", "$.ColorUtil", "$.Escape", "$.Logger", "$.Parser", "$.Point3f", "$.Point4f", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.JVXL_VERSION = "2.2";
this.surfaceDataCount = 0;
this.edgeDataCount = 0;
this.colorDataCount = 0;
this.excludedTriangleCount = 0;
this.excludedVertexCount = 0;
this.invalidatedVertexCount = 0;
this.haveContourData = false;
this.xr = null;
this.isXmlFile = true;
this.thisInside = false;
this.tempDataXml = null;
this.bsVoxelBitSet = null;
this.includeValueNaN = true;
this.valueCount = 0;
this.valueMin = NaN;
this.valueRange = NaN;
this.fractionPtr = 0;
this.colorPtr = 0;
this.strFractionTemp = "";
this.haveReadColorData = false;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "JvxlXmlReader", org.jmol.jvxl.readers.VolumeFileReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.JvxlXmlReader, []);
});
Clazz.defineMethod (c$, "init2", 
function (sg, br) {
Clazz.superCall (this, org.jmol.jvxl.readers.JvxlXmlReader, "init2", [sg, br]);
this.jvxlData.wasJvxl = this.isJvxl = true;
this.isXLowToHigh = false;
this.xr =  new org.jmol.io.XmlReader (br);
}, "org.jmol.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "readVolumeData", 
function (isMapData) {
if (!Clazz.superCall (this, org.jmol.jvxl.readers.JvxlXmlReader, "readVolumeData", [isMapData])) return false;
this.strFractionTemp = this.jvxlEdgeDataRead;
this.fractionPtr = 0;
return true;
}, "~B");
Clazz.overrideMethod (c$, "gotoAndReadVoxelData", 
function (isMapData) {
this.initializeVolumetricData ();
if (this.nPointsX < 0 || this.nPointsY < 0 || this.nPointsZ < 0) return true;
try {
this.gotoData (this.params.fileIndex - 1, this.nPointsX * this.nPointsY * this.nPointsZ);
if (this.vertexDataOnly) return true;
this.volumeData.setMappingPlane (this.params.thePlane);
this.readSurfaceData (isMapData);
this.volumeData.setMappingPlane (null);
if (this.edgeDataCount > 0) this.jvxlEdgeDataRead = this.jvxlReadData ("edge", this.edgeDataCount);
this.params.bsExcluded = this.jvxlData.jvxlExcluded =  new Array (4);
this.hasColorData = (this.colorDataCount > 0);
if (this.hasColorData) this.jvxlColorDataRead = this.jvxlReadData ("color", this.colorDataCount);
if (this.excludedVertexCount > 0) {
this.jvxlData.jvxlExcluded[0] = org.jmol.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlExcludedVertexData", null, false, false));
if (this.xr.isNext ("jvxlExcludedPlaneData")) this.jvxlData.jvxlExcluded[2] = org.jmol.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlExcludedPlaneData", null, false, false));
}if (this.excludedTriangleCount > 0) this.jvxlData.jvxlExcluded[3] = org.jmol.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlExcludedTriangleData", null, false, false));
if (this.invalidatedVertexCount > 0) this.jvxlData.jvxlExcluded[1] = org.jmol.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlInvalidatedVertexData", null, false, false));
if (this.haveContourData) this.jvxlDecodeContourData (this.jvxlData, this.xr.getXmlData ("jvxlContourData", null, false, false));
if (this.jvxlData.nVertexColors > 0) {
this.jvxlData.vertexColorMap =  new java.util.Hashtable ();
for (var i = 0; i < this.jvxlData.nVertexColors; i++) {
var s = this.xr.getXmlData ("jvxlColorMap", null, true, false);
var color = org.jmol.io.XmlReader.getXmlAttrib (s, "color");
var bs = org.jmol.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlColorMap", s, false, false));
this.jvxlData.vertexColorMap.put (color, bs);
}
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error (e.toString ());
return false;
} else {
throw e;
}
}
return true;
}, "~B");
Clazz.overrideMethod (c$, "readParameters", 
function () {
var s = this.xr.getXmlData ("jvxlFileTitle", null, false, false);
this.jvxlFileHeaderBuffer = org.jmol.util.StringXBuilder.newS (s);
this.xr.toTag ("jvxlVolumeData");
var data = this.tempDataXml = this.xr.getXmlData ("jvxlVolumeData", null, true, false);
this.volumetricOrigin.setT (this.xr.getXmlPoint (data, "origin"));
this.isAngstroms = true;
this.readVector (0);
this.readVector (1);
this.readVector (2);
this.line = this.xr.toTag ("jvxlSurfaceSet");
this.nSurfaces = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (this.line, "count"));
org.jmol.util.Logger.info ("jvxl file surfaces: " + this.nSurfaces);
org.jmol.util.Logger.info ("using default edge fraction base and range");
org.jmol.util.Logger.info ("using default color fraction base and range");
this.cJvxlEdgeNaN = String.fromCharCode (this.edgeFractionBase + this.edgeFractionRange);
});
Clazz.defineMethod (c$, "readVector", 
function (voxelVectorIndex) {
var data = this.xr.getXmlData ("jvxlVolumeVector", this.tempDataXml, true, true);
this.tempDataXml = this.tempDataXml.substring (this.tempDataXml.indexOf (data) + data.length);
var n = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "count"));
if (n == -2147483648) this.vertexDataOnly = true;
this.voxelCounts[voxelVectorIndex] = (n < 0 ? 0 : n);
this.volumetricVectors[voxelVectorIndex].setT (this.xr.getXmlPoint (data, "vector"));
if (this.isAnisotropic) this.setVectorAnisotropy (this.volumetricVectors[voxelVectorIndex]);
}, "~N");
Clazz.overrideMethod (c$, "gotoData", 
function (n, nPoints) {
if (n > 0) org.jmol.util.Logger.info ("skipping " + n + " data sets, " + nPoints + " points each");
this.vertexDataOnly = this.jvxlData.vertexDataOnly = (nPoints == 0);
for (var i = 0; i < n; i++) {
this.jvxlSkipData (nPoints, true);
}
this.xr.toTag ("jvxlSurface");
this.jvxlReadSurfaceInfo ();
}, "~N,~N");
Clazz.defineMethod (c$, "jvxlSkipData", 
function (nPoints, doSkipColorData) {
this.readLine ();
this.xr.skipTag ("jvxlSurface");
}, "~N,~B");
Clazz.defineMethod (c$, "jvxlReadSurfaceInfo", 
function () {
var s;
var data = this.xr.getXmlData ("jvxlSurfaceInfo", null, true, true);
this.isXLowToHigh = org.jmol.io.XmlReader.getXmlAttrib (data, "isXLowToHigh").equals ("true");
this.jvxlCutoff = this.parseFloatStr (org.jmol.io.XmlReader.getXmlAttrib (data, "cutoff"));
if (!Float.isNaN (this.jvxlCutoff)) org.jmol.util.Logger.info ("JVXL read: cutoff " + this.jvxlCutoff);
var nContourData = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nContourData"));
this.haveContourData = (nContourData > 0);
this.params.isContoured = org.jmol.io.XmlReader.getXmlAttrib (data, "contoured").equals ("true");
if (this.params.isContoured) {
var nContoursRead = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nContours"));
if (nContoursRead <= 0) {
nContoursRead = 0;
} else {
s = org.jmol.io.XmlReader.getXmlAttrib (data, "contourValues");
if (s.length > 0) {
this.jvxlData.contourValues = this.params.contoursDiscrete = this.parseFloatArrayStr (s);
org.jmol.util.Logger.info ("JVXL read: contourValues " + org.jmol.util.Escape.escapeAF (this.jvxlData.contourValues));
}s = org.jmol.io.XmlReader.getXmlAttrib (data, "contourColors");
if (s.length > 0) {
this.jvxlData.contourColixes = this.params.contourColixes = org.jmol.util.Colix.getColixArray (s);
this.jvxlData.contourColors = org.jmol.util.Colix.getHexCodes (this.jvxlData.contourColixes);
org.jmol.util.Logger.info ("JVXL read: contourColixes " + org.jmol.util.Colix.getHexCodes (this.jvxlData.contourColixes));
}this.params.contourFromZero = org.jmol.io.XmlReader.getXmlAttrib (data, "contourFromZero").equals ("true");
}this.params.nContours = (this.haveContourData ? nContourData : nContoursRead);
}this.jvxlData.nVertexColors = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nVertexColors"));
this.params.isBicolorMap = org.jmol.io.XmlReader.getXmlAttrib (data, "bicolorMap").equals ("true");
if (this.params.isBicolorMap) {
s = org.jmol.io.XmlReader.getXmlAttrib (data, "colorPositive");
if (s.length > 0 && this.params.colorRgb == -2147483648 && this.params.colorPos == -16776961) this.params.colorPos = org.jmol.util.ColorUtil.getArgbFromString (s);
s = org.jmol.io.XmlReader.getXmlAttrib (data, "colorNegative");
if (s.length > 0 && this.params.colorRgb == -2147483648 && this.params.colorNeg == -65536) this.params.colorNeg = org.jmol.util.ColorUtil.getArgbFromString (s);
}if (this.params.isBicolorMap || this.params.colorBySign) this.jvxlCutoff = 0;
this.jvxlDataIsColorMapped = ((this.params.colorRgb == -2147483648 || this.params.colorRgb == 2147483647) && (this.params.isBicolorMap || org.jmol.io.XmlReader.getXmlAttrib (data, "colorMapped").equals ("true")));
this.jvxlData.isJvxlPrecisionColor = org.jmol.io.XmlReader.getXmlAttrib (data, "precisionColor").equals ("true");
this.jvxlData.jvxlDataIsColorDensity = this.params.colorDensity = (this.params.colorRgb == -2147483648 && org.jmol.io.XmlReader.getXmlAttrib (data, "colorDensity").equals ("true"));
s = org.jmol.io.XmlReader.getXmlAttrib (data, "allowVolumeRender");
this.jvxlData.allowVolumeRender = this.params.allowVolumeRender = (s.length == 0 || s.equalsIgnoreCase ("true"));
s = org.jmol.io.XmlReader.getXmlAttrib (data, "plane");
if (s.indexOf ("{") >= 0) {
this.params.thePlane = null;
this.params.mapLattice = null;
try {
this.params.thePlane = org.jmol.util.Escape.unescapePoint (s);
s = org.jmol.io.XmlReader.getXmlAttrib (data, "maplattice");
org.jmol.util.Logger.info ("JVXL read: plane " + this.params.thePlane);
if (s.indexOf ("{") >= 0) {
this.params.mapLattice = org.jmol.util.Escape.unescapePoint (s);
org.jmol.util.Logger.info ("JVXL read: mapLattice " + this.params.mapLattice);
}if (this.params.scale3d == 0) this.params.scale3d = this.parseFloatStr (org.jmol.io.XmlReader.getXmlAttrib (data, "scale3d"));
if (Float.isNaN (this.params.scale3d)) this.params.scale3d = 0;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (this.params.thePlane == null) {
org.jmol.util.Logger.error ("JVXL Error reading plane definition -- setting to 0 0 1 0  (z=0)");
this.params.thePlane = org.jmol.util.Point4f.new4 (0, 0, 1, 0);
} else {
org.jmol.util.Logger.error ("JVXL Error reading mapLattice definition -- ignored");
}} else {
throw e;
}
}
this.surfaceDataCount = 0;
this.edgeDataCount = 0;
} else {
this.params.thePlane = null;
this.surfaceDataCount = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nSurfaceInts"));
this.edgeDataCount = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nBytesUncompressedEdgeData"));
}this.excludedVertexCount = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nExcludedVertexes"));
this.excludedTriangleCount = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nExcludedTriangles"));
this.invalidatedVertexCount = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nInvalidatedVertexes"));
s = org.jmol.io.XmlReader.getXmlAttrib (data, "slabInfo");
if (s.length > 0) this.jvxlData.slabInfo = s;
this.colorDataCount = Math.max (0, this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "nBytesUncompressedColorData")));
this.jvxlDataIs2dContour = (this.params.thePlane != null && this.jvxlDataIsColorMapped);
this.jvxlData.color = org.jmol.io.XmlReader.getXmlAttrib (data, "color");
if (this.jvxlData.color.length == 0 || this.jvxlData.color.indexOf ("null") >= 0) this.jvxlData.color = "orange";
this.jvxlData.translucency = this.parseFloatStr (org.jmol.io.XmlReader.getXmlAttrib (data, "translucency"));
if (Float.isNaN (this.jvxlData.translucency)) this.jvxlData.translucency = 0;
s = org.jmol.io.XmlReader.getXmlAttrib (data, "meshColor");
if (s.length > 0) this.jvxlData.meshColor = s;
s = org.jmol.io.XmlReader.getXmlAttrib (data, "rendering");
if (s.length > 0) this.jvxlData.rendering = s;
this.jvxlData.colorScheme = org.jmol.io.XmlReader.getXmlAttrib (data, "colorScheme");
if (this.jvxlData.colorScheme.length == 0) this.jvxlData.colorScheme = null;
if (this.jvxlData.thisSet < 0) {
var n = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "set"));
if (n > 0) this.jvxlData.thisSet = n - 1;
}this.jvxlData.slabValue = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "slabValue"));
this.jvxlData.isSlabbable = (org.jmol.io.XmlReader.getXmlAttrib (data, "slabbable").equalsIgnoreCase ("true"));
this.jvxlData.diameter = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "diameter"));
if (this.jvxlData.diameter == -2147483648) this.jvxlData.diameter = 0;
if (this.jvxlDataIs2dContour) this.params.isContoured = true;
if (this.params.colorBySign) this.params.isBicolorMap = true;
var insideOut = org.jmol.io.XmlReader.getXmlAttrib (data, "insideOut").equals ("true");
var dataMin = NaN;
var dataMax = NaN;
var red = NaN;
var blue = NaN;
if (this.jvxlDataIsColorMapped) {
dataMin = this.parseFloatStr (org.jmol.io.XmlReader.getXmlAttrib (data, "dataMinimum"));
dataMax = this.parseFloatStr (org.jmol.io.XmlReader.getXmlAttrib (data, "dataMaximum"));
red = this.parseFloatStr (org.jmol.io.XmlReader.getXmlAttrib (data, "valueMappedToRed"));
blue = this.parseFloatStr (org.jmol.io.XmlReader.getXmlAttrib (data, "valueMappedToBlue"));
if (Float.isNaN (dataMin)) {
dataMin = red = -1.0;
dataMax = blue = 1;
}}this.jvxlSetColorRanges (dataMin, dataMax, red, blue, insideOut);
});
Clazz.defineMethod (c$, "jvxlSetColorRanges", 
function (dataMin, dataMax, red, blue, insideOut) {
if (this.jvxlDataIsColorMapped) {
if (!Float.isNaN (dataMin) && !Float.isNaN (dataMax)) {
if (dataMax == 0 && dataMin == 0) {
dataMin = -1;
dataMax = 1;
}this.params.mappedDataMin = dataMin;
this.params.mappedDataMax = dataMax;
org.jmol.util.Logger.info ("JVXL read: data_min/max " + this.params.mappedDataMin + "/" + this.params.mappedDataMax);
}if (!this.params.rangeDefined) if (!Float.isNaN (red) && !Float.isNaN (blue)) {
if (red == 0 && blue == 0) {
red = -1;
blue = 1;
}this.params.valueMappedToRed = Math.min (red, blue);
this.params.valueMappedToBlue = Math.max (red, blue);
this.params.isColorReversed = (red > blue);
this.params.rangeDefined = true;
} else {
this.params.valueMappedToRed = 0;
this.params.valueMappedToBlue = 1;
this.params.rangeDefined = true;
}org.jmol.util.Logger.info ("JVXL read: color red/blue: " + this.params.valueMappedToRed + "/" + this.params.valueMappedToBlue);
}this.jvxlData.valueMappedToRed = this.params.valueMappedToRed;
this.jvxlData.valueMappedToBlue = this.params.valueMappedToBlue;
this.jvxlData.mappedDataMin = this.params.mappedDataMin;
this.jvxlData.mappedDataMax = this.params.mappedDataMax;
this.jvxlData.isColorReversed = this.params.isColorReversed;
this.jvxlData.insideOut = insideOut;
if (this.params.insideOut) this.jvxlData.insideOut = !this.jvxlData.insideOut;
this.params.insideOut = this.jvxlData.insideOut;
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "readSurfaceData", 
function (isMapDataIgnored) {
this.thisInside = !this.params.isContoured;
if (this.readSurfaceData ()) return;
this.tempDataXml = this.xr.getXmlData ("jvxlEdgeData", null, true, false);
this.bsVoxelBitSet = org.jmol.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlEdgeData", this.tempDataXml, false, false));
this.readVolumeFileSurfaceData ();
}, "~B");
Clazz.defineMethod (c$, "readSurfaceData", 
function () {
if (this.vertexDataOnly) {
this.getEncodedVertexData ();
return true;
}if (this.params.thePlane != null) {
this.volumeData.setDataDistanceToPlane (this.params.thePlane);
this.setVolumeData (this.volumeData);
this.params.cutoff = 0;
this.jvxlData.setSurfaceInfo (this.params.thePlane, this.params.mapLattice, 0, "");
this.jvxlData.scale3d = this.params.scale3d;
return true;
}return false;
});
Clazz.defineMethod (c$, "readVolumeFileSurfaceData", 
function () {
Clazz.superCall (this, org.jmol.jvxl.readers.JvxlXmlReader, "readSurfaceData", [false]);
this.volumeData.setMappingPlane (null);
});
Clazz.defineMethod (c$, "jvxlReadData", 
function (type, nPoints) {
var str;
try {
if (type.equals ("edge")) {
str = org.jmol.jvxl.data.JvxlCoder.jvxlUncompressString (org.jmol.io.XmlReader.getXmlAttrib (this.tempDataXml, "data"));
} else {
var data = this.xr.getXmlData ("jvxlColorData", null, true, false);
this.jvxlData.isJvxlPrecisionColor = org.jmol.io.XmlReader.getXmlAttrib (data, "encoding").endsWith ("2");
str = org.jmol.jvxl.data.JvxlCoder.jvxlUncompressString (org.jmol.io.XmlReader.getXmlAttrib (data, "data"));
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("Error reading " + type + " data " + e);
throw  new NullPointerException ();
} else {
throw e;
}
}
return str;
}, "~S,~N");
Clazz.overrideMethod (c$, "getVoxelBitSet", 
function (nPoints) {
if (this.bsVoxelBitSet != null) return this.bsVoxelBitSet;
var bs =  new org.jmol.util.BitSet ();
var bsVoxelPtr = 0;
if (this.surfaceDataCount <= 0) return bs;
var nThisValue = 0;
while (bsVoxelPtr < nPoints) {
nThisValue = this.parseInt ();
if (nThisValue == -2147483648) {
this.readLine ();
if (this.line == null || (nThisValue = this.parseIntStr (this.line)) == -2147483648) {
if (!this.endOfData) org.jmol.util.Logger.error ("end of file in JvxlReader?" + " line=" + this.line);
this.endOfData = true;
nThisValue = 10000;
}}this.thisInside = !this.thisInside;
++this.jvxlNSurfaceInts;
if (this.thisInside) bs.setBits (bsVoxelPtr, bsVoxelPtr + nThisValue);
bsVoxelPtr += nThisValue;
}
return bs;
}, "~N");
Clazz.defineMethod (c$, "getSurfacePointAndFraction", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn) {
if (this.edgeDataCount <= 0) return Clazz.superCall (this, org.jmol.jvxl.readers.JvxlXmlReader, "getSurfacePointAndFraction", [cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn]);
ptReturn.scaleAdd2 (fReturn[0] = this.jvxlGetNextFraction (this.edgeFractionBase, this.edgeFractionRange, 0.5), edgeVector, pointA);
if (Float.isNaN (this.valueMin)) this.setValueMinMax ();
return (this.valueCount == 0 || this.includeValueNaN && Float.isNaN (fReturn[0]) ? fReturn[0] : this.getNextValue ());
}, "~N,~B,~N,~N,org.jmol.util.Point3f,org.jmol.util.Vector3f,~N,~N,~N,~N,~N,~A,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "getNextValue", 
($fz = function () {
var fraction = NaN;
while (this.colorPtr < this.valueCount && Float.isNaN (fraction)) {
if (this.jvxlData.isJvxlPrecisionColor) {
fraction = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (this.jvxlColorDataRead.charCodeAt (this.colorPtr), this.jvxlColorDataRead.charCodeAt ((this.colorPtr++) + this.valueCount), this.colorFractionBase, this.colorFractionRange);
} else {
fraction = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (this.jvxlColorDataRead.charCodeAt (this.colorPtr++), this.colorFractionBase, this.colorFractionRange, 0.5);
}break;
}
return this.valueMin + fraction * this.valueRange;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setValueMinMax", 
($fz = function () {
this.valueCount = this.jvxlColorDataRead.length;
if (this.jvxlData.isJvxlPrecisionColor) this.valueCount /= 2;
this.includeValueNaN = (this.valueCount != this.jvxlEdgeDataRead.length);
this.valueMin = (!this.jvxlData.isJvxlPrecisionColor ? this.params.valueMappedToRed : this.params.mappedDataMin == 3.4028235E38 ? 0.0 : this.params.mappedDataMin);
this.valueRange = (!this.jvxlData.isJvxlPrecisionColor ? this.params.valueMappedToBlue : this.params.mappedDataMin == 3.4028235E38 ? 1.0 : this.params.mappedDataMax) - this.valueMin;
this.haveReadColorData = true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "jvxlGetNextFraction", 
($fz = function (base, range, fracOffset) {
if (this.fractionPtr >= this.strFractionTemp.length) {
if (!this.endOfData) org.jmol.util.Logger.error ("end of file reading compressed fraction data");
this.endOfData = true;
this.strFractionTemp = "" + String.fromCharCode (base);
this.fractionPtr = 0;
}return org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (this.strFractionTemp.charCodeAt (this.fractionPtr++), base, range, fracOffset);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.overrideMethod (c$, "readColorData", 
function () {
var vertexCount = this.jvxlData.vertexCount = this.meshData.vertexCount;
var colixes = this.meshData.vertexColixes;
var vertexValues = this.meshData.vertexValues;
if (this.params.colorEncoder == null) this.params.colorEncoder =  new org.jmol.util.ColorEncoder (null);
this.params.colorEncoder.setColorScheme (null, false);
this.params.colorEncoder.setRange (this.params.valueMappedToRed, this.params.valueMappedToBlue, this.params.isColorReversed);
org.jmol.util.Logger.info ("JVXL reading color data mapped min/max: " + this.params.mappedDataMin + "/" + this.params.mappedDataMax + " for " + vertexCount + " vertices." + " using encoding keys " + this.colorFractionBase + " " + this.colorFractionRange);
org.jmol.util.Logger.info ("mapping red-->blue for " + this.params.valueMappedToRed + " to " + this.params.valueMappedToBlue + " colorPrecision:" + this.jvxlData.isJvxlPrecisionColor);
var getValues = (Float.isNaN (this.valueMin));
if (getValues) this.setValueMinMax ();
var contourPlaneMinimumValue = 3.4028235E38;
var contourPlaneMaximumValue = -3.4028235E38;
if (colixes == null || colixes.length < vertexCount) this.meshData.vertexColixes = colixes =  Clazz.newShortArray (vertexCount, 0);
var colixNeg = 0;
var colixPos = 0;
if (this.params.colorBySign) {
colixPos = org.jmol.util.Colix.getColix (this.params.isColorReversed ? this.params.colorNeg : this.params.colorPos);
colixNeg = org.jmol.util.Colix.getColix (this.params.isColorReversed ? this.params.colorPos : this.params.colorNeg);
}var vertexIncrement = this.meshData.vertexIncrement;
var needContourMinMax = (this.params.mappedDataMin == 3.4028235E38);
for (var i = 0; i < vertexCount; i += vertexIncrement) {
var value;
if (getValues) value = vertexValues[i] = this.getNextValue ();
 else value = vertexValues[i];
if (needContourMinMax) {
if (value < contourPlaneMinimumValue) contourPlaneMinimumValue = value;
if (value > contourPlaneMaximumValue) contourPlaneMaximumValue = value;
}}
if (needContourMinMax) {
this.params.mappedDataMin = contourPlaneMinimumValue;
this.params.mappedDataMax = contourPlaneMaximumValue;
}if (this.jvxlData.colorScheme != null) for (var i = 0; i < vertexCount; i += vertexIncrement) {
var value = vertexValues[i];
if (this.marchingSquares != null && this.params.isContoured) {
this.marchingSquares.setContourData (i, value);
continue;
}var colix = (!this.params.colorBySign ? this.params.colorEncoder.getColorIndex (value) : (this.params.isColorReversed ? value > 0 : value <= 0) ? colixNeg : colixPos);
colixes[i] = org.jmol.util.Colix.getColixTranslucent3 (colix, true, this.jvxlData.translucency);
}
return this.jvxlColorDataRead + "\n";
});
Clazz.defineMethod (c$, "getEncodedVertexData", 
function () {
var data = this.xr.getXmlData ("jvxlSurfaceData", null, true, false);
var tData = this.xr.getXmlData ("jvxlTriangleData", data, true, false);
var edgeData = this.xr.getXmlData ("jvxlTriangleEdgeData", data, true, false);
this.jvxlDecodeVertexData (this.xr.getXmlData ("jvxlVertexData", data, true, false), false);
var polygonColorData = this.xr.getXmlData ("jvxlPolygonColorData", data, false, false);
this.jvxlDecodeTriangleData (tData, edgeData, polygonColorData);
org.jmol.util.Logger.info ("Checking for vertex values");
data = this.xr.getXmlData ("jvxlColorData", data, true, false);
this.jvxlData.isJvxlPrecisionColor = org.jmol.io.XmlReader.getXmlAttrib (data, "encoding").endsWith ("2");
this.jvxlColorDataRead = org.jmol.jvxl.data.JvxlCoder.jvxlUncompressString (org.jmol.io.XmlReader.getXmlAttrib (data, "data"));
if (this.jvxlColorDataRead.length == 0) this.jvxlColorDataRead = this.xr.getXmlData ("jvxlColorData", data, false, false);
this.jvxlDataIsColorMapped = ((this.params.colorRgb == -2147483648 || this.params.colorRgb == 2147483647) && this.jvxlColorDataRead.length > 0);
if (this.haveContourData) this.jvxlDecodeContourData (this.jvxlData, this.xr.getXmlData ("jvxlContourData", null, false, false));
});
Clazz.defineMethod (c$, "jvxlDecodeVertexData", 
function (data, asArray) {
var vertexCount = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "count"));
if (!asArray) org.jmol.util.Logger.info ("Reading " + vertexCount + " vertices");
var min = this.xr.getXmlPoint (data, "min");
var range = this.xr.getXmlPoint (data, "max");
range.sub (min);
var colorFractionBase = this.jvxlData.colorFractionBase;
var colorFractionRange = this.jvxlData.colorFractionRange;
var ptCount = vertexCount * 3;
var vertices = (asArray ?  new Array (vertexCount) : null);
var p = (asArray ? null :  new org.jmol.util.Point3f ());
var fraction;
var s = org.jmol.jvxl.data.JvxlCoder.jvxlUncompressString (org.jmol.io.XmlReader.getXmlAttrib (data, "data"));
if (s.length == 0) s = this.xr.getXmlData ("jvxlVertexData", data, false, false);
for (var i = 0, pt = -1; i < vertexCount; i++) {
if (asArray) p = vertices[i] =  new org.jmol.util.Point3f ();
fraction = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (s.charCodeAt (++pt), s.charCodeAt (pt + ptCount), colorFractionBase, colorFractionRange);
p.x = min.x + fraction * range.x;
fraction = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (s.charCodeAt (++pt), s.charCodeAt (pt + ptCount), colorFractionBase, colorFractionRange);
p.y = min.y + fraction * range.y;
fraction = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (s.charCodeAt (++pt), s.charCodeAt (pt + ptCount), colorFractionBase, colorFractionRange);
p.z = min.z + fraction * range.z;
if (!asArray) this.addVertexCopy (p, 0, i);
}
return vertices;
}, "~S,~B");
Clazz.defineMethod (c$, "jvxlDecodeTriangleData", 
function (data, edgeData, colorData) {
var nColors = (colorData == null ? -1 : 0);
var color = 0;
var nData = this.parseIntStr (org.jmol.io.XmlReader.getXmlAttrib (data, "count"));
if (nData < 0) return null;
org.jmol.util.Logger.info ("Reading " + nData + " triangles");
var triangles = null;
var triangle =  Clazz.newIntArray (3, 0);
var s = org.jmol.jvxl.data.JvxlCoder.jvxlUncompressString (org.jmol.io.XmlReader.getXmlAttrib (data, "data"));
if (s.length == 0) s = this.xr.getXmlData ("jvxlTriangleData", data, false, false);
var sEdge = org.jmol.jvxl.data.JvxlCoder.jvxlUncompressString (org.jmol.io.XmlReader.getXmlAttrib (edgeData, "data")).trim ();
var nextp =  Clazz.newIntArray (1, 0);
var nextc =  Clazz.newIntArray (1, 0);
var edgeMask = 7;
var haveEdgeInfo = (sEdge.length == nData);
var ilast = 0;
var p = 0;
var b0 = 92;
for (var i = 0, pt = -1; i < nData; ) {
var ch = s.charAt (++pt);
var idiff;
switch (ch) {
case '!':
idiff = 0;
break;
case '+':
case '.':
case ' ':
case '\n':
case '\r':
case '\t':
case ',':
continue;
case '-':
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
nextp[0] = pt;
idiff = org.jmol.util.Parser.parseIntNext (s, nextp);
pt = nextp[0] - 1;
break;
default:
idiff = ch.charCodeAt (0) - b0;
}
ilast += idiff;
triangle[p] = ilast;
if (++p % 3 == 0) {
if (haveEdgeInfo) {
edgeMask = sEdge.charCodeAt (i) - 48;
if (edgeMask < 0 || edgeMask > 7) edgeMask = 7;
}if (nColors >= 0) {
if (nColors == 0) {
nColors = org.jmol.util.Parser.parseIntNext (colorData, nextc);
color = org.jmol.util.Parser.parseIntNext (colorData, nextc);
if (color == -2147483648) color = nColors = 0;
}nColors--;
}this.addTriangleCheck (triangle[0], triangle[1], triangle[2], edgeMask, 0, false, color);
i++;
p = 0;
}}
return triangles;
}, "~S,~S,~S");
Clazz.defineMethod (c$, "jvxlDecodeContourData", 
function (jvxlData, data) {
var vs =  new java.util.ArrayList ();
var values =  new org.jmol.util.StringXBuilder ();
var colors =  new org.jmol.util.StringXBuilder ();
var pt = -1;
jvxlData.vContours = null;
if (data == null) return;
while ((pt = data.indexOf ("<jvxlContour", pt + 1)) >= 0) {
var v =  new java.util.ArrayList ();
var s = this.xr.getXmlData ("jvxlContour", data.substring (pt), true, false);
var value = this.parseFloatStr (org.jmol.io.XmlReader.getXmlAttrib (s, "value"));
values.append (" ").appendF (value);
var colix = org.jmol.util.Colix.getColix (org.jmol.util.ColorUtil.getArgbFromString (org.jmol.io.XmlReader.getXmlAttrib (s, "color")));
var color = org.jmol.util.Colix.getArgb (colix);
colors.append (" ").append (org.jmol.util.Escape.escapeColor (color));
var fData = org.jmol.jvxl.data.JvxlCoder.jvxlUncompressString (org.jmol.io.XmlReader.getXmlAttrib (s, "data"));
var bs = org.jmol.jvxl.data.JvxlCoder.jvxlDecodeBitSet (this.xr.getXmlData ("jvxlContour", s, false, false));
var n = bs.length ();
org.jmol.shapesurface.IsosurfaceMesh.setContourVector (v, n, bs, value, colix, color, org.jmol.util.StringXBuilder.newS (fData));
vs.add (v);
}
var n = vs.size ();
if (n > 0) {
jvxlData.vContours = org.jmol.util.ArrayUtil.createArrayOfArrayList (n);
jvxlData.contourColixes = this.params.contourColixes =  Clazz.newShortArray (n, 0);
jvxlData.contourValues = this.params.contoursDiscrete =  Clazz.newFloatArray (n, 0);
for (var i = 0; i < n; i++) {
jvxlData.vContours[i] = vs.get (i);
jvxlData.contourValues[i] = (jvxlData.vContours[i].get (2)).floatValue ();
jvxlData.contourColixes[i] = (jvxlData.vContours[i].get (3))[0];
}
jvxlData.contourColors = org.jmol.util.Colix.getHexCodes (jvxlData.contourColixes);
org.jmol.util.Logger.info ("JVXL read: " + n + " discrete contours");
org.jmol.util.Logger.info ("JVXL read: contour values: " + values);
org.jmol.util.Logger.info ("JVXL read: contour colors: " + colors);
}}, "org.jmol.jvxl.data.JvxlData,~S");
Clazz.overrideMethod (c$, "postProcessVertices", 
function () {
var bsInvalid = this.params.bsExcluded[1];
if (bsInvalid != null) {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.invalidateVertices (bsInvalid);
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 4, null);
this.meshData =  new org.jmol.jvxl.data.MeshData ();
}this.updateTriangles ();
}});
});
