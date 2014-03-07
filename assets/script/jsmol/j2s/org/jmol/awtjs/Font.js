Clazz.declarePackage ("org.jmol.awtjs");
c$ = Clazz.declareType (org.jmol.awtjs, "Font");
c$.newFont = Clazz.defineMethod (c$, "newFont", 
function (fontFace, isBold, isItalic, fontSize) {
return null;
}, "~S,~B,~B,~N");
c$.getFontMetrics = Clazz.defineMethod (c$, "getFontMetrics", 
function (graphics, font) {
return null;
}, "~O,~O");
c$.getAscent = Clazz.defineMethod (c$, "getAscent", 
function (fontMetrics) {
return 0;
}, "~O");
c$.getDescent = Clazz.defineMethod (c$, "getDescent", 
function (fontMetrics) {
return 0;
}, "~O");
c$.stringWidth = Clazz.defineMethod (c$, "stringWidth", 
function (font, fontMetrics, text) {
return 0;
}, "org.jmol.util.JmolFont,~O,~S");
