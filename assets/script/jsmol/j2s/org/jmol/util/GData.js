Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.api.JmolGraphicsInterface"], "org.jmol.util.GData", ["org.jmol.util.ArrayUtil", "$.Colix", "$.JmolFont", "$.Point3f", "$.Shader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.apiPlatform = null;
this.windowWidth = 0;
this.windowHeight = 0;
this.displayMinX = 0;
this.displayMaxX = 0;
this.displayMinY = 0;
this.displayMaxY = 0;
this.antialiasThisFrame = false;
this.antialiasEnabled = false;
this.inGreyscaleMode = false;
this.changeableColixMap = null;
this.backgroundImage = null;
this.newWindowWidth = 0;
this.newWindowHeight = 0;
this.newAntialiasing = false;
this.bgcolor = 0;
this.xLast = 0;
this.yLast = 0;
this.slab = 0;
this.depth = 0;
this.width = 0;
this.height = 0;
this.zSlab = 0;
this.zDepth = 0;
this.zShadePower = 3;
this.colixCurrent = 0;
this.argbCurrent = 0;
this.bufferSize = 0;
this.zShadeR = 0;
this.zShadeG = 0;
this.zShadeB = 0;
this.graphicsForMetrics = null;
this.$isPass2 = false;
Clazz.instantialize (this, arguments);
}, org.jmol.util, "GData", null, org.jmol.api.JmolGraphicsInterface);
Clazz.prepareFields (c$, function () {
this.changeableColixMap =  Clazz.newShortArray (16, 0);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "initialize", 
function (apiPlatform) {
this.apiPlatform = apiPlatform;
}, "org.jmol.api.ApiPlatform");
Clazz.overrideMethod (c$, "setDepth", 
function (depthValue) {
this.depth = depthValue < 0 ? 0 : depthValue;
}, "~N");
Clazz.overrideMethod (c$, "setSlab", 
function (slabValue) {
this.slab = slabValue < 0 ? 0 : slabValue;
}, "~N");
Clazz.defineMethod (c$, "setZShade", 
function (zShade, zSlab, zDepth, zPower) {
if (zShade) {
this.zShadeR = this.bgcolor & 0xFF;
this.zShadeG = (this.bgcolor & 0xFF00) >> 8;
this.zShadeB = (this.bgcolor & 0xFF0000) >> 16;
this.zSlab = zSlab < 0 ? 0 : zSlab;
this.zDepth = zDepth < 0 ? 0 : zDepth;
this.zShadePower = zPower;
}}, "~B,~N,~N,~N");
Clazz.overrideMethod (c$, "getRenderWidth", 
function () {
return this.width;
});
Clazz.overrideMethod (c$, "getRenderHeight", 
function () {
return this.height;
});
Clazz.overrideMethod (c$, "getSlab", 
function () {
return this.slab;
});
Clazz.overrideMethod (c$, "getDepth", 
function () {
return this.depth;
});
Clazz.defineMethod (c$, "isDisplayAntialiased", 
function () {
return this.antialiasEnabled;
});
Clazz.overrideMethod (c$, "isAntialiased", 
function () {
return this.antialiasThisFrame;
});
Clazz.defineMethod (c$, "getChangeableColix", 
function (id, argb) {
if (id >= this.changeableColixMap.length) this.changeableColixMap = org.jmol.util.ArrayUtil.arrayCopyShort (this.changeableColixMap, id + 16);
if (this.changeableColixMap[id] == 0) this.changeableColixMap[id] = org.jmol.util.Colix.getColix (argb);
return (id | -32768);
}, "~N,~N");
Clazz.defineMethod (c$, "changeColixArgb", 
function (id, argb) {
if (id < this.changeableColixMap.length && this.changeableColixMap[id] != 0) this.changeableColixMap[id] = org.jmol.util.Colix.getColix (argb);
}, "~N,~N");
Clazz.defineMethod (c$, "getBgColixes", 
function (bgcolixes) {
return bgcolixes;
}, "~A");
Clazz.overrideMethod (c$, "getColorArgbOrGray", 
function (colix) {
if (colix < 0) colix = this.changeableColixMap[colix & 2047];
return (this.inGreyscaleMode ? org.jmol.util.Colix.getArgbGreyscale (colix) : org.jmol.util.Colix.getArgb (colix));
}, "~N");
Clazz.defineMethod (c$, "getShades", 
function (colix) {
if (colix < 0) colix = this.changeableColixMap[colix & 2047];
return (this.inGreyscaleMode ? org.jmol.util.Colix.getShadesGreyscale (colix) : org.jmol.util.Colix.getShades (colix));
}, "~N");
Clazz.defineMethod (c$, "setGreyscaleMode", 
function (greyscaleMode) {
this.inGreyscaleMode = greyscaleMode;
}, "~B");
c$.getSpecularPower = Clazz.defineMethod (c$, "getSpecularPower", 
function () {
return org.jmol.util.Shader.specularPower;
});
c$.setSpecularPower = Clazz.defineMethod (c$, "setSpecularPower", 
function (val) {
if (val < 0) {
org.jmol.util.GData.setSpecularExponent (-val);
return;
}if (org.jmol.util.Shader.specularPower == val) return;
($t$ = org.jmol.util.Shader.specularPower = val, org.jmol.util.Shader.prototype.specularPower = org.jmol.util.Shader.specularPower, $t$);
($t$ = org.jmol.util.Shader.intenseFraction = val / 100, org.jmol.util.Shader.prototype.intenseFraction = org.jmol.util.Shader.intenseFraction, $t$);
org.jmol.util.GData.flushCaches ();
}, "~N");
c$.getSpecularPercent = Clazz.defineMethod (c$, "getSpecularPercent", 
function () {
return org.jmol.util.Shader.specularPercent;
});
c$.setSpecularPercent = Clazz.defineMethod (c$, "setSpecularPercent", 
function (val) {
if (org.jmol.util.Shader.specularPercent == val) return;
($t$ = org.jmol.util.Shader.specularPercent = val, org.jmol.util.Shader.prototype.specularPercent = org.jmol.util.Shader.specularPercent, $t$);
($t$ = org.jmol.util.Shader.specularFactor = val / 100, org.jmol.util.Shader.prototype.specularFactor = org.jmol.util.Shader.specularFactor, $t$);
org.jmol.util.GData.flushCaches ();
}, "~N");
c$.getSpecularExponent = Clazz.defineMethod (c$, "getSpecularExponent", 
function () {
return org.jmol.util.Shader.specularExponent;
});
c$.setSpecularExponent = Clazz.defineMethod (c$, "setSpecularExponent", 
function (val) {
if (org.jmol.util.Shader.specularExponent == val) return;
($t$ = org.jmol.util.Shader.specularExponent = val, org.jmol.util.Shader.prototype.specularExponent = org.jmol.util.Shader.specularExponent, $t$);
($t$ = org.jmol.util.Shader.phongExponent = Clazz.doubleToInt (Math.pow (2, val)), org.jmol.util.Shader.prototype.phongExponent = org.jmol.util.Shader.phongExponent, $t$);
($t$ = org.jmol.util.Shader.usePhongExponent = false, org.jmol.util.Shader.prototype.usePhongExponent = org.jmol.util.Shader.usePhongExponent, $t$);
org.jmol.util.GData.flushCaches ();
}, "~N");
c$.getPhongExponent = Clazz.defineMethod (c$, "getPhongExponent", 
function () {
return org.jmol.util.Shader.phongExponent;
});
c$.setPhongExponent = Clazz.defineMethod (c$, "setPhongExponent", 
function (val) {
if (org.jmol.util.Shader.phongExponent == val && org.jmol.util.Shader.usePhongExponent) return;
($t$ = org.jmol.util.Shader.phongExponent = val, org.jmol.util.Shader.prototype.phongExponent = org.jmol.util.Shader.phongExponent, $t$);
var x = (Math.log (val) / Math.log (2));
($t$ = org.jmol.util.Shader.usePhongExponent = (x != Clazz.floatToInt (x)), org.jmol.util.Shader.prototype.usePhongExponent = org.jmol.util.Shader.usePhongExponent, $t$);
if (!org.jmol.util.Shader.usePhongExponent) ($t$ = org.jmol.util.Shader.specularExponent = Clazz.floatToInt (x), org.jmol.util.Shader.prototype.specularExponent = org.jmol.util.Shader.specularExponent, $t$);
org.jmol.util.GData.flushCaches ();
}, "~N");
c$.getDiffusePercent = Clazz.defineMethod (c$, "getDiffusePercent", 
function () {
return org.jmol.util.Shader.diffusePercent;
});
c$.setDiffusePercent = Clazz.defineMethod (c$, "setDiffusePercent", 
function (val) {
if (org.jmol.util.Shader.diffusePercent == val) return;
($t$ = org.jmol.util.Shader.diffusePercent = val, org.jmol.util.Shader.prototype.diffusePercent = org.jmol.util.Shader.diffusePercent, $t$);
($t$ = org.jmol.util.Shader.diffuseFactor = val / 100, org.jmol.util.Shader.prototype.diffuseFactor = org.jmol.util.Shader.diffuseFactor, $t$);
org.jmol.util.GData.flushCaches ();
}, "~N");
c$.getAmbientPercent = Clazz.defineMethod (c$, "getAmbientPercent", 
function () {
return org.jmol.util.Shader.ambientPercent;
});
c$.setAmbientPercent = Clazz.defineMethod (c$, "setAmbientPercent", 
function (val) {
if (org.jmol.util.Shader.ambientPercent == val) return;
($t$ = org.jmol.util.Shader.ambientPercent = val, org.jmol.util.Shader.prototype.ambientPercent = org.jmol.util.Shader.ambientPercent, $t$);
($t$ = org.jmol.util.Shader.ambientFraction = val / 100, org.jmol.util.Shader.prototype.ambientFraction = org.jmol.util.Shader.ambientFraction, $t$);
org.jmol.util.GData.flushCaches ();
}, "~N");
c$.getSpecular = Clazz.defineMethod (c$, "getSpecular", 
function () {
return org.jmol.util.Shader.specularOn;
});
c$.setSpecular = Clazz.defineMethod (c$, "setSpecular", 
function (val) {
if (org.jmol.util.Shader.specularOn == val) return;
($t$ = org.jmol.util.Shader.specularOn = val, org.jmol.util.Shader.prototype.specularOn = org.jmol.util.Shader.specularOn, $t$);
org.jmol.util.GData.flushCaches ();
}, "~B");
c$.flushCaches = Clazz.defineMethod (c$, "flushCaches", 
($fz = function () {
org.jmol.util.Colix.flushShades ();
org.jmol.util.Shader.flushSphereCache ();
}, $fz.isPrivate = true, $fz));
c$.getLightSource = Clazz.defineMethod (c$, "getLightSource", 
function () {
return org.jmol.util.Point3f.new3 (org.jmol.util.Shader.xLight, org.jmol.util.Shader.yLight, org.jmol.util.Shader.zLight);
});
Clazz.defineMethod (c$, "isClipped3", 
function (x, y, z) {
return (x < 0 || x >= this.width || y < 0 || y >= this.height || z < this.slab || z > this.depth);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "isClipped", 
function (x, y) {
return (x < 0 || x >= this.width || y < 0 || y >= this.height);
}, "~N,~N");
Clazz.overrideMethod (c$, "isInDisplayRange", 
function (x, y) {
return (x >= this.displayMinX && x < this.displayMaxX && y >= this.displayMinY && y < this.displayMaxY);
}, "~N,~N");
Clazz.overrideMethod (c$, "isClippedXY", 
function (diameter, x, y) {
var r = (diameter + 1) >> 1;
return (x < -r || x >= this.width + r || y < -r || y >= this.height + r);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "isClippedZ", 
function (z) {
return (z != -2147483648 && (z < this.slab || z > this.depth));
}, "~N");
Clazz.defineMethod (c$, "clipCode3", 
function (x, y, z) {
var code = 0;
if (x < 0) code |= 8;
 else if (x >= this.width) code |= 4;
if (y < 0) code |= 2;
 else if (y >= this.height) code |= 1;
if (z < this.slab) code |= 32;
 else if (z > this.depth) code |= 16;
return code;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "clipCode", 
function (z) {
var code = 0;
if (z < this.slab) code |= 32;
 else if (z > this.depth) code |= 16;
return code;
}, "~N");
Clazz.defineMethod (c$, "getFont3D", 
function (fontSize) {
return org.jmol.util.JmolFont.createFont3D (0, 0, fontSize, fontSize, this.apiPlatform, this.graphicsForMetrics);
}, "~N");
Clazz.defineMethod (c$, "getFont3DFS", 
function (fontFace, fontSize) {
return org.jmol.util.JmolFont.createFont3D (org.jmol.util.JmolFont.getFontFaceID (fontFace), 0, fontSize, fontSize, this.apiPlatform, this.graphicsForMetrics);
}, "~S,~N");
Clazz.defineMethod (c$, "getFontFidFS", 
function (fontFace, fontSize) {
return this.getFont3DFSS (fontFace, "Bold", fontSize).fid;
}, "~S,~N");
Clazz.defineMethod (c$, "getFont3DFSS", 
function (fontFace, fontStyle, fontSize) {
var iStyle = org.jmol.util.JmolFont.getFontStyleID (fontStyle);
if (iStyle < 0) iStyle = 0;
return org.jmol.util.JmolFont.createFont3D (org.jmol.util.JmolFont.getFontFaceID (fontFace), iStyle, fontSize, fontSize, this.apiPlatform, this.graphicsForMetrics);
}, "~S,~S,~N");
Clazz.overrideMethod (c$, "getFont3DScaled", 
function (font, scale) {
var newScale = font.fontSizeNominal * scale;
return (newScale == font.fontSize ? font : org.jmol.util.JmolFont.createFont3D (font.idFontFace, font.idFontStyle, newScale, font.fontSizeNominal, this.apiPlatform, this.graphicsForMetrics));
}, "org.jmol.util.JmolFont,~N");
Clazz.overrideMethod (c$, "getFontFid", 
function (fontSize) {
return this.getFont3D (fontSize).fid;
}, "~N");
c$.getFontStyleID = Clazz.defineMethod (c$, "getFontStyleID", 
function (fontStyle) {
return org.jmol.util.JmolFont.getFontStyleID (fontStyle);
}, "~S");
Clazz.defineMethod (c$, "setBackgroundTransparent", 
function (TF) {
}, "~B");
Clazz.defineMethod (c$, "setBackgroundArgb", 
function (argb) {
this.bgcolor = argb;
}, "~N");
Clazz.defineMethod (c$, "setBackgroundImage", 
function (image) {
this.backgroundImage = image;
}, "~O");
Clazz.defineMethod (c$, "setWindowParameters", 
function (width, height, antialias) {
this.newWindowWidth = width;
this.newWindowHeight = height;
this.newAntialiasing = antialias;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setNewWindowParametersForExport", 
function () {
this.windowWidth = this.newWindowWidth;
this.windowHeight = this.newWindowHeight;
this.setWidthHeight (false);
});
Clazz.defineMethod (c$, "setWidthHeight", 
function (isAntialiased) {
this.width = this.windowWidth;
this.height = this.windowHeight;
if (isAntialiased) {
this.width <<= 1;
this.height <<= 1;
}this.xLast = this.width - 1;
this.yLast = this.height - 1;
this.displayMinX = -(this.width >> 1);
this.displayMaxX = this.width - this.displayMinX;
this.displayMinY = -(this.height >> 1);
this.displayMaxY = this.height - this.displayMinY;
this.bufferSize = this.width * this.height;
}, "~B");
Clazz.defineMethod (c$, "beginRendering", 
function (stereoRotationMatrix) {
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "endRendering", 
function () {
});
Clazz.defineMethod (c$, "snapshotAnaglyphChannelBytes", 
function () {
});
Clazz.defineMethod (c$, "getScreenImage", 
function () {
return null;
});
Clazz.defineMethod (c$, "releaseScreenImage", 
function () {
});
Clazz.defineMethod (c$, "applyAnaglygh", 
function (stereoMode, stereoColors) {
}, "org.jmol.constant.EnumStereoMode,~A");
Clazz.defineMethod (c$, "setPass2", 
function (antialias) {
return false;
}, "~B");
Clazz.defineMethod (c$, "destroy", 
function () {
});
Clazz.defineMethod (c$, "clearFontCache", 
function () {
});
Clazz.defineMethod (c$, "plotImage", 
function (x, y, z, image, jmolRenderer, bgcolix, width, height) {
}, "~N,~N,~N,java.awt.Image,org.jmol.api.JmolRendererInterface,~N,~N,~N");
Clazz.defineMethod (c$, "plotText", 
function (x, y, z, colorArgbOrGray, bgColor, text, font3d, jmolRenderer) {
}, "~N,~N,~N,~N,~N,~S,org.jmol.util.JmolFont,org.jmol.api.JmolRendererInterface");
Clazz.defineMethod (c$, "renderBackground", 
function (jmolRenderer) {
}, "org.jmol.api.JmolRendererInterface");
Clazz.defineMethod (c$, "getFont3DCurrent", 
function () {
return null;
});
Clazz.defineMethod (c$, "setFont", 
function (font3d) {
}, "org.jmol.util.JmolFont");
Clazz.defineMethod (c$, "setFontFid", 
function (fid) {
}, "~N");
Clazz.defineMethod (c$, "setColor", 
function (color) {
this.argbCurrent = color;
}, "~N");
Clazz.defineMethod (c$, "isPass2", 
function () {
return this.$isPass2;
});
Clazz.defineMethod (c$, "setColix", 
function (colix) {
return true;
}, "~N");
Clazz.defineMethod (c$, "isDirectedTowardsCamera", 
function (normix) {
return true;
}, "~N");
Clazz.defineMethod (c$, "getTransformedVertexVectors", 
function () {
return null;
});
Clazz.defineMethod (c$, "setNoisySurfaceShade", 
function (pointA, pointB, pointC) {
}, "org.jmol.util.Point3i,org.jmol.util.Point3i,org.jmol.util.Point3i");
c$.roundInt = Clazz.defineMethod (c$, "roundInt", 
function (a) {
{
return a;
}}, "~N");
Clazz.defineMethod (c$, "clear", 
function () {
});
Clazz.overrideMethod (c$, "renderAllStrings", 
function (jmolRenderer) {
}, "~O");
Clazz.defineStatics (c$,
"ENDCAPS_NONE", 0,
"ENDCAPS_OPEN", 1,
"ENDCAPS_FLAT", 2,
"ENDCAPS_SPHERICAL", 3,
"ENDCAPS_OPENEND", 4,
"EXPORT_RAYTRACER", 2,
"EXPORT_CARTESIAN", 1,
"EXPORT_NOT", 0,
"yGT", 1,
"yLT", 2,
"xGT", 4,
"xLT", 8,
"zGT", 16,
"zLT", 32);
});
