Clazz.declarePackage ("org.jmol.awtjs2d");
c$ = Clazz.declareType (org.jmol.awtjs2d, "Image");
c$.getWidth = Clazz.defineMethod (c$, "getWidth", 
function (canvas) {
{
return canvas.width;
}}, "~O");
c$.getHeight = Clazz.defineMethod (c$, "getHeight", 
function (canvas) {
{
return canvas.height;
}}, "~O");
c$.getJpgImage = Clazz.defineMethod (c$, "getJpgImage", 
function (apiPlatform, viewer, quality, comment) {
return null;
}, "org.jmol.api.ApiPlatform,org.jmol.viewer.Viewer,~N,~S");
c$.grabPixels = Clazz.defineMethod (c$, "grabPixels", 
function (context, width, height) {
{
var data = context.getImageData(0, 0, width, height).data;
return this.toIntARGB(data);
}}, "~O,~N,~N");
c$.toIntARGB = Clazz.defineMethod (c$, "toIntARGB", 
function (imgData) {
var n = Clazz.doubleToInt (imgData.length / 4);
var iData =  Clazz.newIntArray (n, 0);
xxi=imgData;

for (var i = 0, j = 0; i < n; j++) {
iData[i++] = (imgData[j++] << 16) | (imgData[j++] << 8) | imgData[j++] | 0xFF000000;
}
return iData;
}, "~A");
c$.fromIntARGB = Clazz.defineMethod (c$, "fromIntARGB", 
function (buf32, buf8) {
var n = buf8.length >> 2;
for (var i = 0, j = 0; i < n; i++) {
buf8[j++] = (buf32[i] >> 16) & 0xFF;
buf8[j++] = (buf32[i] >> 8) & 0xFF;
buf8[j++] = buf32[i] & 0xFF;
buf8[j++] = 0xFF;
}
}, "~A,~A");
c$.drawImageToBuffer = Clazz.defineMethod (c$, "drawImageToBuffer", 
function (gOffscreen, imageOffscreen, imageobj, width, height, bgcolor) {
return null;
}, "~O,~O,~O,~N,~N,~N");
c$.getTextPixels = Clazz.defineMethod (c$, "getTextPixels", 
function (text, font3d, context, width, height, ascent) {
{
context.fillStyle = "#000000";
context.fillRect(0, 0, width, height);
context.fillStyle = "#FFFFFF";
context.font = font3d.font;
context.fillText(text, 0, ascent);
return this.grabPixels(context, width, height);
}}, "~S,org.jmol.util.JmolFont,~O,~N,~N,~N");
c$.allocateRgbImage = Clazz.defineMethod (c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, canvas) {
{
canvas.buf32 = pBuffer;
return canvas;
}}, "~N,~N,~A,~N,~B,~O");
c$.getStaticGraphics = Clazz.defineMethod (c$, "getStaticGraphics", 
function (canvas, backgroundTransparent) {
{
return this.getGraphics(canvas);
}}, "~O,~B");
c$.getGraphics = Clazz.defineMethod (c$, "getGraphics", 
function (canvas) {
{
return canvas.getContext("2d");
}}, "~O");
c$.drawImage = Clazz.defineMethod (c$, "drawImage", 
function (context, canvas, x, y, width, height) {
{
this.fromIntARGB(canvas.buf32, canvas.buf8);
context.putImageData(canvas.imgdata,x,y);
}}, "~O,~O,~N,~N,~N,~N");
c$.flush = Clazz.defineMethod (c$, "flush", 
function (image) {
}, "~O");
c$.disposeGraphics = Clazz.defineMethod (c$, "disposeGraphics", 
function (graphicForText) {
}, "~O");
