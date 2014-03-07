Clazz.declarePackage ("org.jmol.g3d");
c$ = Clazz.declareType (org.jmol.g3d, "ImageRenderer");
c$.plotImage = Clazz.defineMethod (c$, "plotImage", 
function (x, y, z, image, g3d, jmolRenderer, antialias, argbBackground, width, height) {
var isBackground = (x == -2147483648);
var bgcolor = (isBackground ? g3d.bgcolor : argbBackground);
if (isBackground) {
x = 0;
z = 2147483646;
width = g3d.width;
height = g3d.height;
}if (x + width <= 0 || x >= g3d.width || y + height <= 0 || y >= g3d.height) return;
var buffer = g3d.apiPlatform.drawImageToBuffer (g3d.platform.getGraphicsForTextOrImage (width, height), g3d.platform.offscreenImage, image, width, height, isBackground ? bgcolor : 0);
xxbu = buffer;
if (buffer == null) return;
if (jmolRenderer != null || (x < 0 || x + width > g3d.width || y < 0 || y + height > g3d.height)) org.jmol.g3d.ImageRenderer.plotImageClipped (x, y, z, g3d, jmolRenderer, width, height, buffer, bgcolor);
 else org.jmol.g3d.ImageRenderer.plotImageUnClipped (x, y, z, g3d, width, height, buffer, bgcolor);
return;
}, "~N,~N,~N,~O,org.jmol.g3d.Graphics3D,org.jmol.api.JmolRendererInterface,~B,~N,~N,~N");
c$.plotImageClipped = Clazz.defineMethod (c$, "plotImageClipped", 
($fz = function (x, y, z, g3d, jmolRenderer, width, height, buffer, bgargb) {
if (jmolRenderer == null) jmolRenderer = g3d;
for (var i = 0, offset = 0; i < height; i++) {
for (var j = 0; j < width; j++) {
var argb = buffer[offset++];
jmolRenderer.plotImagePixel (argb, x + j, y + i, z, 8, bgargb);
}
}
}, $fz.isPrivate = true, $fz), "~N,~N,~N,org.jmol.g3d.Graphics3D,org.jmol.api.JmolRendererInterface,~N,~N,~A,~N");
c$.plotImageUnClipped = Clazz.defineMethod (c$, "plotImageUnClipped", 
($fz = function (x, y, z, g3d, textWidth, textHeight, buffer, bgargb) {
var zbuf = g3d.zbuf;
var renderWidth = g3d.width;
var pbufOffset = y * renderWidth + x;
var i = 0;
var j = 0;
var offset = 0;                                           

while (i < textHeight) {
while (j < textWidth) {

if (z < zbuf[pbufOffset]) {
var argb = buffer[offset];
g3d.addPixel (pbufOffset, z, argb);
}++offset;
++j;
++pbufOffset;
}
++i;
j -= textWidth;
pbufOffset += (renderWidth - textWidth);
}
}, $fz.isPrivate = true, $fz), "~N,~N,~N,org.jmol.g3d.Graphics3D,~N,~N,~A,~N");
