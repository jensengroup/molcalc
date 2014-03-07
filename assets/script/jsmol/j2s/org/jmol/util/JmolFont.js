Clazz.declarePackage ("org.jmol.util");
Clazz.load (null, "org.jmol.util.JmolFont", ["org.jmol.util.ArrayUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fid = 0;
this.fontFace = null;
this.fontStyle = null;
this.fontSizeNominal = 0;
this.idFontFace = 0;
this.idFontStyle = 0;
this.fontSize = 0;
this.font = null;
this.fontMetrics = null;
this.apiPlatform = null;
this.ascent = 0;
this.descent = 0;
this.isBold = false;
this.isItalic = false;
Clazz.instantialize (this, arguments);
}, org.jmol.util, "JmolFont");
Clazz.makeConstructor (c$, 
($fz = function (apiPlatform, fid, idFontFace, idFontStyle, fontSize, fontSizeNominal, graphics) {
this.apiPlatform = apiPlatform;
this.fid = fid;
this.fontFace = org.jmol.util.JmolFont.fontFaces[idFontFace];
this.fontStyle = org.jmol.util.JmolFont.fontStyles[idFontStyle];
this.idFontFace = idFontFace;
this.idFontStyle = idFontStyle;
this.fontSize = fontSize;
this.isBold = (idFontStyle & 1) == 1;
this.isItalic = (idFontStyle & 2) == 2;
this.fontSizeNominal = fontSizeNominal;
this.font = apiPlatform.newFont (org.jmol.util.JmolFont.fontFaces[idFontFace], this.isBold, this.isItalic, fontSize);
this.fontMetrics = apiPlatform.getFontMetrics (this, graphics);
this.descent = apiPlatform.getFontDescent (this.fontMetrics);
this.ascent = apiPlatform.getFontAscent (this.fontMetrics);
}, $fz.isPrivate = true, $fz), "org.jmol.api.ApiPlatform,~N,~N,~N,~N,~N,~O");
c$.getFont3D = Clazz.defineMethod (c$, "getFont3D", 
function (fontID) {
return org.jmol.util.JmolFont.font3ds[fontID & 0xFF];
}, "~N");
c$.createFont3D = Clazz.defineMethod (c$, "createFont3D", 
function (fontface, fontstyle, fontsize, fontsizeNominal, apiPlatform, graphicsForMetrics) {
if (fontsize > 0xFF) fontsize = 0xFF;
var fontsizeX16 = (Clazz.floatToInt (fontsize)) << 4;
var fontkey = ((fontface & 3) | ((fontstyle & 3) << 2) | (fontsizeX16 << 4));
for (var i = org.jmol.util.JmolFont.fontkeyCount; --i > 0; ) if (fontkey == org.jmol.util.JmolFont.fontkeys[i] && org.jmol.util.JmolFont.font3ds[i].fontSizeNominal == fontsizeNominal) return org.jmol.util.JmolFont.font3ds[i];

var fontIndexNext = ($t$ = org.jmol.util.JmolFont.fontkeyCount ++, org.jmol.util.JmolFont.prototype.fontkeyCount = org.jmol.util.JmolFont.fontkeyCount, $t$);
if (fontIndexNext == org.jmol.util.JmolFont.fontkeys.length) ($t$ = org.jmol.util.JmolFont.fontkeys = org.jmol.util.ArrayUtil.arrayCopyI (org.jmol.util.JmolFont.fontkeys, fontIndexNext + 8), org.jmol.util.JmolFont.prototype.fontkeys = org.jmol.util.JmolFont.fontkeys, $t$);
($t$ = org.jmol.util.JmolFont.font3ds = org.jmol.util.ArrayUtil.arrayCopyObject (org.jmol.util.JmolFont.font3ds, fontIndexNext + 8), org.jmol.util.JmolFont.prototype.font3ds = org.jmol.util.JmolFont.font3ds, $t$);
var font3d =  new org.jmol.util.JmolFont (apiPlatform, fontIndexNext, fontface, fontstyle, fontsize, fontsizeNominal, graphicsForMetrics);
org.jmol.util.JmolFont.font3ds[fontIndexNext] = font3d;
org.jmol.util.JmolFont.fontkeys[fontIndexNext] = fontkey;
return font3d;
}, "~N,~N,~N,~N,org.jmol.api.ApiPlatform,~O");
c$.getFontFaceID = Clazz.defineMethod (c$, "getFontFaceID", 
function (fontface) {
if ("Monospaced".equalsIgnoreCase (fontface)) return 2;
if ("Serif".equalsIgnoreCase (fontface)) return 1;
return 0;
}, "~S");
c$.getFontStyleID = Clazz.defineMethod (c$, "getFontStyleID", 
function (fontstyle) {
for (var i = 4; --i >= 0; ) if (org.jmol.util.JmolFont.fontStyles[i].equalsIgnoreCase (fontstyle)) return i;

return -1;
}, "~S");
Clazz.defineMethod (c$, "getAscent", 
function () {
return this.ascent;
});
Clazz.defineMethod (c$, "getDescent", 
function () {
return this.descent;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.getAscent () + this.getDescent ();
});
Clazz.defineMethod (c$, "stringWidth", 
function (text) {
return this.apiPlatform.fontStringWidth (this, this.fontMetrics, text);
}, "~S");
Clazz.defineStatics (c$,
"FONT_ALLOCATION_UNIT", 8,
"fontkeyCount", 1,
"fontkeys",  Clazz.newIntArray (8, 0));
c$.font3ds = c$.prototype.font3ds =  new Array (8);
Clazz.defineStatics (c$,
"FONT_FACE_SANS", 0,
"FONT_FACE_SERIF", 1,
"FONT_FACE_MONO", 2,
"fontFaces", ["SansSerif", "Serif", "Monospaced", ""],
"FONT_STYLE_PLAIN", 0,
"FONT_STYLE_BOLD", 1,
"FONT_STYLE_ITALIC", 2,
"FONT_STYLE_BOLDITALIC", 3,
"fontStyles", ["Plain", "Bold", "Italic", "BoldItalic"]);
});
