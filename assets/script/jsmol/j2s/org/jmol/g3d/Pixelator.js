Clazz.declarePackage ("org.jmol.g3d");
Clazz.load (null, "org.jmol.g3d.Pixelator", ["org.jmol.g3d.Graphics3D"], function () {
c$ = Clazz.decorateAsClass (function () {
this.g = null;
Clazz.instantialize (this, arguments);
}, org.jmol.g3d, "Pixelator");
Clazz.makeConstructor (c$, 
function (graphics3d) {
this.g = graphics3d;
}, "org.jmol.g3d.Graphics3D");
Clazz.defineMethod (c$, "addPixel", 
function (offset, z, p) {
if (!this.g.$isPass2) {
this.g.zbuf[offset] = z;
this.g.pbuf[offset] = p;
return;
}var zT = this.g.zbufT[offset];
if (z < zT) {
var argb = this.g.pbufT[offset];
if (!this.g.translucentCoverOnly && argb != 0 && zT - z > this.g.zMargin) org.jmol.g3d.Graphics3D.mergeBufferPixel (this.g.pbuf, offset, argb, this.g.bgcolor);
this.g.zbufT[offset] = z;
this.g.pbufT[offset] = p & this.g.translucencyMask;
} else if (z == zT) {
} else if (!this.g.translucentCoverOnly && z - zT > this.g.zMargin) {
org.jmol.g3d.Graphics3D.mergeBufferPixel (this.g.pbuf, offset, p & this.g.translucencyMask, this.g.bgcolor);
}}, "~N,~N,~N");
});
