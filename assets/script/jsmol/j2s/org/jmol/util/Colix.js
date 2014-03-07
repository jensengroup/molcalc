Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.ArrayUtil", "$.Int2IntHash"], "org.jmol.util.Colix", ["java.lang.Float", "$.IndexOutOfBoundsException", "org.jmol.constant.EnumPalette", "org.jmol.util.ColorUtil", "$.Escape", "$.Logger", "$.Parser", "$.Shader", "$.StringXBuilder"], function () {
c$ = Clazz.declareType (org.jmol.util, "Colix");
Clazz.makeConstructor (c$, 
function () {
});
c$.getColix = Clazz.defineMethod (c$, "getColix", 
function (argb) {
if (argb == 0) return 0;
var translucentFlag = 0;
if ((argb & 0xFF000000) != (-16777216)) {
argb |= 0xFF000000;
translucentFlag = 8192;
}var c = org.jmol.util.Colix.colixHash.get (argb);
if ((c & 3) == 3) translucentFlag = 0;
return (c > 0 ? (c | translucentFlag) : (org.jmol.util.Colix.allocateColix (argb) | translucentFlag));
}, "~N");
c$.allocateColix = Clazz.defineMethod (c$, "allocateColix", 
function (argb) {
if ((argb & 0xFF000000) != (-16777216)) throw  new IndexOutOfBoundsException ();
for (var i = org.jmol.util.Colix.colixMax; --i >= 4; ) if (argb == org.jmol.util.Colix.argbs[i]) return i;

if (org.jmol.util.Colix.colixMax == org.jmol.util.Colix.argbs.length) {
var oldSize = org.jmol.util.Colix.colixMax;
var newSize = oldSize * 2;
if (newSize > 2048) newSize = 2048;
($t$ = org.jmol.util.Colix.argbs = org.jmol.util.ArrayUtil.arrayCopyI (org.jmol.util.Colix.argbs, newSize), org.jmol.util.Colix.prototype.argbs = org.jmol.util.Colix.argbs, $t$);
if (org.jmol.util.Colix.argbsGreyscale != null) ($t$ = org.jmol.util.Colix.argbsGreyscale = org.jmol.util.ArrayUtil.arrayCopyI (org.jmol.util.Colix.argbsGreyscale, newSize), org.jmol.util.Colix.prototype.argbsGreyscale = org.jmol.util.Colix.argbsGreyscale, $t$);
($t$ = org.jmol.util.Colix.ashades = org.jmol.util.ArrayUtil.arrayCopyII (org.jmol.util.Colix.ashades, newSize), org.jmol.util.Colix.prototype.ashades = org.jmol.util.Colix.ashades, $t$);
if (org.jmol.util.Colix.ashadesGreyscale != null) ($t$ = org.jmol.util.Colix.ashadesGreyscale = org.jmol.util.ArrayUtil.arrayCopyII (org.jmol.util.Colix.ashadesGreyscale, newSize), org.jmol.util.Colix.prototype.ashadesGreyscale = org.jmol.util.Colix.ashadesGreyscale, $t$);
}org.jmol.util.Colix.argbs[org.jmol.util.Colix.colixMax] = argb;
if (org.jmol.util.Colix.argbsGreyscale != null) org.jmol.util.Colix.argbsGreyscale[org.jmol.util.Colix.colixMax] = org.jmol.util.ColorUtil.calcGreyscaleRgbFromRgb (argb);
org.jmol.util.Colix.colixHash.put (argb, org.jmol.util.Colix.colixMax);
return (org.jmol.util.Colix.colixMax < 2047 ? ($t$ = org.jmol.util.Colix.colixMax ++, org.jmol.util.Colix.prototype.colixMax = org.jmol.util.Colix.colixMax, $t$) : org.jmol.util.Colix.colixMax);
}, "~N");
c$.calcArgbsGreyscale = Clazz.defineMethod (c$, "calcArgbsGreyscale", 
($fz = function () {
if (org.jmol.util.Colix.argbsGreyscale != null) return;
var a =  Clazz.newIntArray (org.jmol.util.Colix.argbs.length, 0);
for (var i = org.jmol.util.Colix.argbs.length; --i >= 4; ) a[i] = org.jmol.util.ColorUtil.calcGreyscaleRgbFromRgb (org.jmol.util.Colix.argbs[i]);

($t$ = org.jmol.util.Colix.argbsGreyscale = a, org.jmol.util.Colix.prototype.argbsGreyscale = org.jmol.util.Colix.argbsGreyscale, $t$);
}, $fz.isPrivate = true, $fz));
c$.getArgbGreyscale = Clazz.defineMethod (c$, "getArgbGreyscale", 
function (colix) {
if (org.jmol.util.Colix.argbsGreyscale == null) org.jmol.util.Colix.calcArgbsGreyscale ();
return org.jmol.util.Colix.argbsGreyscale[colix & -30721];
}, "~N");
c$.getShadesArgb = Clazz.defineMethod (c$, "getShadesArgb", 
function (argb, asGrey) {
if (asGrey) {
if (org.jmol.util.Colix.argbsGreyscale == null) org.jmol.util.Colix.calcArgbsGreyscale ();
org.jmol.util.Colix.argbsGreyscale[2047] = org.jmol.util.ColorUtil.calcGreyscaleRgbFromRgb (argb);
}return org.jmol.util.Colix.ashades[2047] = org.jmol.util.Shader.getShades (argb, false);
}, "~N,~B");
c$.getShades = Clazz.defineMethod (c$, "getShades", 
function (colix) {
colix &= -30721;
var shades = org.jmol.util.Colix.ashades[colix];
if (shades == null) shades = org.jmol.util.Colix.ashades[colix] = org.jmol.util.Shader.getShades (org.jmol.util.Colix.argbs[colix], false);
return shades;
}, "~N");
c$.getShadesGreyscale = Clazz.defineMethod (c$, "getShadesGreyscale", 
function (colix) {
colix &= -30721;
if (org.jmol.util.Colix.ashadesGreyscale == null) ($t$ = org.jmol.util.Colix.ashadesGreyscale = org.jmol.util.ArrayUtil.newInt2 (org.jmol.util.Colix.ashades.length), org.jmol.util.Colix.prototype.ashadesGreyscale = org.jmol.util.Colix.ashadesGreyscale, $t$);
var shadesGreyscale = org.jmol.util.Colix.ashadesGreyscale[colix];
if (shadesGreyscale == null) shadesGreyscale = org.jmol.util.Colix.ashadesGreyscale[colix] = org.jmol.util.Shader.getShades (org.jmol.util.Colix.argbs[colix], true);
return shadesGreyscale;
}, "~N");
c$.flushShades = Clazz.defineMethod (c$, "flushShades", 
function () {
for (var i = org.jmol.util.Colix.colixMax; --i >= 0; ) org.jmol.util.Colix.ashades[i] = null;

($t$ = org.jmol.util.Shader.sphereShadingCalculated = false, org.jmol.util.Shader.prototype.sphereShadingCalculated = org.jmol.util.Shader.sphereShadingCalculated, $t$);
});
c$.getColixO = Clazz.defineMethod (c$, "getColixO", 
function (obj) {
if (obj == null) return 0;
if (Clazz.instanceOf (obj, org.jmol.constant.EnumPalette)) return ((obj) === org.jmol.constant.EnumPalette.NONE ? 0 : 2);
if (Clazz.instanceOf (obj, Integer)) return org.jmol.util.Colix.getColix ((obj).intValue ());
if (Clazz.instanceOf (obj, String)) return org.jmol.util.Colix.getColixS (obj);
if (Clazz.instanceOf (obj, Byte)) return ((obj).byteValue () == 0 ? 0 : 2);
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("?? getColix(" + obj + ")");
}return 22;
}, "~O");
c$.applyColorTranslucencyLevel = Clazz.defineMethod (c$, "applyColorTranslucencyLevel", 
function (colix, translucentLevel) {
if (translucentLevel == 0) return (colix & -30721);
if (translucentLevel < 0) return (colix & -30721 | 30720);
if (Float.isNaN (translucentLevel) || translucentLevel >= 255 || translucentLevel == 1.0) return ((colix & -30721) | 16384);
var iLevel = Clazz.doubleToInt (Math.floor (translucentLevel < 1 ? translucentLevel * 256 : translucentLevel <= 9 ? (Clazz.doubleToInt (Math.floor (translucentLevel - 1))) << 5 : translucentLevel < 15 ? 256 : translucentLevel));
iLevel = (iLevel >> 5) % 16;
return (colix & -30721 | (iLevel << 11));
}, "~N,~N");
c$.isColixLastAvailable = Clazz.defineMethod (c$, "isColixLastAvailable", 
function (colix) {
return (colix > 0 && (colix & 2047) == 2047);
}, "~N");
c$.getArgb = Clazz.defineMethod (c$, "getArgb", 
function (colix) {
return org.jmol.util.Colix.argbs[colix & -30721];
}, "~N");
c$.isColixColorInherited = Clazz.defineMethod (c$, "isColixColorInherited", 
function (colix) {
switch (colix) {
case 0:
case 1:
return true;
default:
return (colix & -30721) == 1;
}
}, "~N");
c$.getColixInherited = Clazz.defineMethod (c$, "getColixInherited", 
function (myColix, parentColix) {
switch (myColix) {
case 0:
return parentColix;
case 1:
return (parentColix & -30721);
default:
return ((myColix & -30721) == 1 ? (parentColix & -30721 | myColix & 30720) : myColix);
}
}, "~N,~N");
c$.isColixTranslucent = Clazz.defineMethod (c$, "isColixTranslucent", 
function (colix) {
return ((colix & 30720) != 0);
}, "~N");
c$.getChangeableColixIndex = Clazz.defineMethod (c$, "getChangeableColixIndex", 
function (colix) {
return (colix >= 0 ? -1 : (colix & 2047));
}, "~N");
c$.getColixTranslucent3 = Clazz.defineMethod (c$, "getColixTranslucent3", 
function (colix, isTranslucent, translucentLevel) {
if (colix == 0) colix = 1;
colix &= -30721;
return (isTranslucent ? org.jmol.util.Colix.applyColorTranslucencyLevel (colix, translucentLevel) : colix);
}, "~N,~B,~N");
c$.copyColixTranslucency = Clazz.defineMethod (c$, "copyColixTranslucency", 
function (colixFrom, colixTo) {
return org.jmol.util.Colix.getColixTranslucent3 (colixTo, org.jmol.util.Colix.isColixTranslucent (colixFrom), org.jmol.util.Colix.getColixTranslucencyLevel (colixFrom));
}, "~N,~N");
c$.getColixTranslucencyFractional = Clazz.defineMethod (c$, "getColixTranslucencyFractional", 
function (colix) {
var translevel = org.jmol.util.Colix.getColixTranslucencyLevel (colix);
return (translevel == -1 ? 0.5 : translevel == 0 ? 0 : translevel == 255 ? 1 : translevel / 256);
}, "~N");
c$.getColixTranslucencyLevel = Clazz.defineMethod (c$, "getColixTranslucencyLevel", 
function (colix) {
var logAlpha = (colix >> 11) & 0xF;
switch (logAlpha) {
case 0:
return 0;
case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
case 7:
return logAlpha << 5;
case 15:
return -1;
default:
return 255;
}
}, "~N");
c$.getColixS = Clazz.defineMethod (c$, "getColixS", 
function (colorName) {
var argb = org.jmol.util.ColorUtil.getArgbFromString (colorName);
if (argb != 0) return org.jmol.util.Colix.getColix (argb);
if ("none".equalsIgnoreCase (colorName)) return 0;
if ("opaque".equalsIgnoreCase (colorName)) return 1;
return 2;
}, "~S");
c$.getColixArray = Clazz.defineMethod (c$, "getColixArray", 
function (colorNames) {
if (colorNames == null || colorNames.length == 0) return null;
var colors = org.jmol.util.Parser.getTokens (colorNames);
var colixes =  Clazz.newShortArray (colors.length, 0);
for (var j = 0; j < colors.length; j++) {
colixes[j] = org.jmol.util.Colix.getColix (org.jmol.util.ColorUtil.getArgbFromString (colors[j]));
if (colixes[j] == 0) return null;
}
return colixes;
}, "~S");
c$.getHexCode = Clazz.defineMethod (c$, "getHexCode", 
function (colix) {
return org.jmol.util.Escape.escapeColor (org.jmol.util.Colix.getArgb (colix));
}, "~N");
c$.getHexCodes = Clazz.defineMethod (c$, "getHexCodes", 
function (colixes) {
if (colixes == null) return null;
var s =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < colixes.length; i++) s.append (i == 0 ? "" : " ").append (org.jmol.util.Colix.getHexCode (colixes[i]));

return s.toString ();
}, "~A");
c$.getColixTranslucent = Clazz.defineMethod (c$, "getColixTranslucent", 
function (argb) {
var a = (argb >> 24) & 0xFF;
if (a == 0xFF) return org.jmol.util.Colix.getColix (argb);
return org.jmol.util.Colix.getColixTranslucent3 (org.jmol.util.Colix.getColix (argb), true, a / 255);
}, "~N");
Clazz.defineStatics (c$,
"INHERIT_ALL", 0,
"INHERIT_COLOR", 1,
"USE_PALETTE", 2,
"RAW_RGB", 3,
"SPECIAL_COLIX_MAX", 4,
"colixMax", 4,
"argbs",  Clazz.newIntArray (128, 0),
"argbsGreyscale", null);
c$.ashades = c$.prototype.ashades = org.jmol.util.ArrayUtil.newInt2 (128);
Clazz.defineStatics (c$,
"ashadesGreyscale", null);
c$.colixHash = c$.prototype.colixHash =  new org.jmol.util.Int2IntHash (256);
Clazz.defineStatics (c$,
"RAW_RGB_INT", 3,
"UNMASK_CHANGEABLE_TRANSLUCENT", 0x07FF,
"CHANGEABLE_MASK", 0x8000,
"LAST_AVAILABLE_COLIX", 2047,
"TRANSLUCENT_SHIFT", 11,
"ALPHA_SHIFT", 13,
"TRANSLUCENT_MASK", 30720,
"TRANSLUCENT_SCREENED", 30720,
"TRANSPARENT", 16384,
"TRANSLUCENT_50", 8192,
"OPAQUE_MASK", -30721,
"BLACK", 4,
"ORANGE", 5,
"PINK", 6,
"BLUE", 7,
"WHITE", 8,
"CYAN", 9,
"RED", 10,
"GREEN", 11,
"GRAY", 12,
"SILVER", 13,
"LIME", 14,
"MAROON", 15,
"NAVY", 16,
"OLIVE", 17,
"PURPLE", 18,
"TEAL", 19,
"MAGENTA", 20,
"YELLOW", 21,
"HOTPINK", 22,
"GOLD", 23,
"predefinedArgbs", [0xFF000000, 0xFFFFA500, 0xFFFFC0CB, 0xFF0000FF, 0xFFFFFFFF, 0xFF00FFFF, 0xFFFF0000, 0xFF008000, 0xFF808080, 0xFFC0C0C0, 0xFF00FF00, 0xFF800000, 0xFF000080, 0xFF808000, 0xFF800080, 0xFF008080, 0xFFFF00FF, 0xFFFFFF00, 0xFFFF69B4, 0xFFFFD700]);
{
for (var i = 0; i < org.jmol.util.Colix.predefinedArgbs.length; ++i) org.jmol.util.Colix.getColix (org.jmol.util.Colix.predefinedArgbs[i]);

}});
