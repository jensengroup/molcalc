Clazz.declarePackage ("org.jmol.io2");
Clazz.load (null, "org.jmol.io2.ZipData", ["org.jmol.io.JmolBinary", "org.jmol.io2.ZipUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isEnabled = true;
this.buf = null;
this.pt = 0;
this.nBytes = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.io2, "ZipData");
Clazz.makeConstructor (c$, 
function (nBytes) {
this.nBytes = nBytes;
}, "~N");
Clazz.defineMethod (c$, "addBytes", 
function (byteBuf, nSectorBytes, nBytesRemaining) {
if (this.pt == 0) {
if (!org.jmol.io.JmolBinary.isGzipB (byteBuf)) {
this.isEnabled = false;
return -1;
}this.buf =  Clazz.newByteArray (nBytesRemaining, 0);
}var nToAdd = Math.min (nSectorBytes, nBytesRemaining);
System.arraycopy (byteBuf, 0, this.buf, this.pt, nToAdd);
this.pt += nToAdd;
return nBytesRemaining - nToAdd;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "addTo", 
function (data) {
data.append (org.jmol.io2.ZipUtil.staticGetGzippedBytesAsString (this.buf));
}, "org.jmol.util.StringXBuilder");
});
