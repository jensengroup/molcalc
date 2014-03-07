Clazz.declarePackage ("org.jmol.jvxl.data");
Clazz.load (null, "org.jmol.jvxl.data.JvxlData", ["java.lang.Float", "org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.wasJvxl = false;
this.wasCubic = false;
this.jvxlFileTitle = null;
this.jvxlFileMessage = null;
this.jvxlSurfaceData = null;
this.jvxlEdgeData = null;
this.jvxlColorData = null;
this.jvxlVolumeDataXml = null;
this.jvxlExcluded = null;
this.jvxlPlane = null;
this.isJvxlPrecisionColor = false;
this.jvxlDataIsColorMapped = false;
this.jvxlDataIs2dContour = false;
this.jvxlDataIsColorDensity = false;
this.isColorReversed = false;
this.thisSet = -1;
this.edgeFractionBase = 35;
this.edgeFractionRange = 90;
this.colorFractionBase = 35;
this.colorFractionRange = 90;
this.dataXYReversed = false;
this.insideOut = false;
this.isXLowToHigh = false;
this.isContoured = false;
this.isBicolorMap = false;
this.isTruncated = false;
this.isCutoffAbsolute = false;
this.vertexDataOnly = false;
this.mappedDataMin = 0;
this.mappedDataMax = 0;
this.valueMappedToRed = 0;
this.valueMappedToBlue = 0;
this.cutoff = 0;
this.pointsPerAngstrom = 0;
this.nPointsX = 0;
this.nPointsY = 0;
this.nPointsZ = 0;
this.nBytes = 0;
this.nContours = 0;
this.nEdges = 0;
this.nSurfaceInts = 0;
this.vertexCount = 0;
this.vContours = null;
this.contourColixes = null;
this.contourColors = null;
this.contourValues = null;
this.contourValuesUsed = null;
this.scale3d = 0;
this.minColorIndex = -1;
this.maxColorIndex = 0;
this.title = null;
this.version = null;
this.boundingBox = null;
this.excludedTriangleCount = 0;
this.excludedVertexCount = 0;
this.colorDensity = false;
this.moleculeXml = null;
this.dataMin = 0;
this.dataMax = 0;
this.saveVertexCount = 0;
this.vertexColorMap = null;
this.nVertexColors = 0;
this.color = null;
this.meshColor = null;
this.translucency = 0;
this.colorScheme = null;
this.rendering = null;
this.slabValue = -2147483648;
this.isSlabbable = false;
this.diameter = 0;
this.slabInfo = null;
this.allowVolumeRender = false;
this.voxelVolume = 0;
this.mapLattice = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.data, "JvxlData");
Clazz.prepareFields (c$, function () {
this.jvxlExcluded =  new Array (4);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "clear", 
function () {
this.allowVolumeRender = true;
this.jvxlSurfaceData = "";
this.jvxlEdgeData = "";
this.jvxlColorData = "";
this.jvxlVolumeDataXml = "";
this.color = null;
this.colorScheme = null;
this.colorDensity = false;
this.contourValues = null;
this.contourValuesUsed = null;
this.contourColixes = null;
this.contourColors = null;
this.isSlabbable = false;
this.mapLattice = null;
this.meshColor = null;
this.nPointsX = 0;
this.nVertexColors = 0;
this.slabInfo = null;
this.slabValue = -2147483648;
this.thisSet = -1;
this.rendering = null;
this.translucency = 0;
this.vContours = null;
this.vertexColorMap = null;
this.voxelVolume = 0;
});
Clazz.defineMethod (c$, "setSurfaceInfo", 
function (thePlane, mapLattice, nSurfaceInts, surfaceData) {
this.jvxlSurfaceData = surfaceData;
if (this.jvxlSurfaceData.indexOf ("--") == 0) this.jvxlSurfaceData = this.jvxlSurfaceData.substring (2);
this.jvxlPlane = thePlane;
this.mapLattice = mapLattice;
this.nSurfaceInts = nSurfaceInts;
}, "org.jmol.util.Point4f,org.jmol.util.Point3f,~N,~S");
Clazz.defineMethod (c$, "setSurfaceInfoFromBitSet", 
function (bs, thePlane) {
this.setSurfaceInfoFromBitSetPts (bs, thePlane, null);
}, "org.jmol.util.BitSet,org.jmol.util.Point4f");
Clazz.defineMethod (c$, "setSurfaceInfoFromBitSetPts", 
function (bs, thePlane, mapLattice) {
var sb =  new org.jmol.util.StringXBuilder ();
var nSurfaceInts = (thePlane != null ? 0 : org.jmol.jvxl.data.JvxlCoder.jvxlEncodeBitSetBuffer (bs, this.nPointsX * this.nPointsY * this.nPointsZ, sb));
this.setSurfaceInfo (thePlane, mapLattice, nSurfaceInts, sb.toString ());
}, "org.jmol.util.BitSet,org.jmol.util.Point4f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "jvxlUpdateInfo", 
function (title, nBytes) {
this.title = title;
this.nBytes = nBytes;
}, "~A,~N");
c$.updateSurfaceData = Clazz.defineMethod (c$, "updateSurfaceData", 
function (edgeData, vertexValues, vertexCount, vertexIncrement, isNaN) {
if (edgeData.length == 0) return "";
var chars = edgeData.toCharArray ();
for (var i = 0, ipt = 0; i < vertexCount; i += vertexIncrement, ipt++) if (Float.isNaN (vertexValues[i])) chars[ipt] = isNaN;

return String.copyValueOf (chars);
}, "~S,~A,~N,~N,~S");
});
