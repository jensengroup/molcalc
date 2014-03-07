Clazz.declarePackage ("org.jmol.awtjs");
Clazz.load (["org.jmol.awtjs2d.Platform"], "org.jmol.awtjs.Platform", ["org.jmol.awtjs.Font", "$.Image"], function () {
c$ = Clazz.declareType (org.jmol.awtjs, "Platform", org.jmol.awtjs2d.Platform);
Clazz.overrideMethod (c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent) {
return org.jmol.awtjs.Image.allocateRgbImage (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent);
}, "~N,~N,~A,~N,~B");
Clazz.overrideMethod (c$, "disposeGraphics", 
function (gOffscreen) {
org.jmol.awtjs.Image.disposeGraphics (gOffscreen);
}, "~O");
Clazz.overrideMethod (c$, "drawImage", 
function (g, img, x, y, width, height) {
org.jmol.awtjs.Image.drawImage (g, img, x, y, width, height);
}, "~O,~O,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "grabPixels", 
function (imageobj, width, height, pixels, startRow, nRows) {
return null;
}, "~O,~N,~N,~A,~N,~N");
Clazz.overrideMethod (c$, "drawImageToBuffer", 
function (gOffscreen, imageOffscreen, imageobj, width, height, bgcolor) {
return org.jmol.awtjs.Image.drawImageToBuffer (gOffscreen, imageOffscreen, imageobj, width, height, bgcolor);
}, "~O,~O,~O,~N,~N,~N");
Clazz.overrideMethod (c$, "getTextPixels", 
function (text, font3d, gObj, image, width, height, ascent) {
return org.jmol.awtjs.Image.getTextPixels (text, font3d, gObj, image, width, height, ascent);
}, "~S,org.jmol.util.JmolFont,~O,~O,~N,~N,~N");
Clazz.overrideMethod (c$, "flushImage", 
function (imagePixelBuffer) {
org.jmol.awtjs.Image.flush (imagePixelBuffer);
}, "~O");
Clazz.overrideMethod (c$, "getGraphics", 
function (image) {
return org.jmol.awtjs.Image.getGraphics (image);
}, "~O");
Clazz.overrideMethod (c$, "getStaticGraphics", 
function (image, backgroundTransparent) {
return org.jmol.awtjs.Image.getStaticGraphics (image, backgroundTransparent);
}, "~O,~B");
Clazz.overrideMethod (c$, "newBufferedImage", 
function (image, w, h) {
return org.jmol.awtjs.Image.newBufferedImage (image, w, h);
}, "~O,~N,~N");
Clazz.overrideMethod (c$, "newOffScreenImage", 
function (w, h) {
return org.jmol.awtjs.Image.newBufferedImage (w, h);
}, "~N,~N");
Clazz.overrideMethod (c$, "fontStringWidth", 
function (font, fontMetrics, text) {
return org.jmol.awtjs.Font.stringWidth (font, fontMetrics, text);
}, "org.jmol.util.JmolFont,~O,~S");
Clazz.overrideMethod (c$, "getFontAscent", 
function (fontMetrics) {
return org.jmol.awtjs.Font.getAscent (fontMetrics);
}, "~O");
Clazz.overrideMethod (c$, "getFontDescent", 
function (fontMetrics) {
return org.jmol.awtjs.Font.getDescent (fontMetrics);
}, "~O");
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font, graphics) {
return org.jmol.awtjs.Font.getFontMetrics (graphics, font);
}, "org.jmol.util.JmolFont,~O");
Clazz.overrideMethod (c$, "newFont", 
function (fontFace, isBold, isItalic, fontSize) {
return org.jmol.awtjs.Font.newFont (fontFace, isBold, isItalic, fontSize);
}, "~S,~B,~B,~N");
});
