Clazz.declarePackage ("org.jmol.io2");
Clazz.load (["org.jmol.api.JmolDocument"], "org.jmol.io2.BinaryDocument", ["java.io.DataInputStream", "java.lang.Float", "org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stream = null;
this.isRandom = false;
this.isBigEndian = true;
this.nBytes = 0;
this.os = null;
Clazz.instantialize (this, arguments);
}, org.jmol.io2, "BinaryDocument", null, org.jmol.api.JmolDocument);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "close", 
function () {
if (this.stream != null) try {
this.stream.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (this.os != null) {
try {
this.os.flush ();
this.os.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}});
Clazz.overrideMethod (c$, "setStream", 
function (bis, isBigEndian) {
if (bis != null) this.stream =  new java.io.DataInputStream (bis);
this.isBigEndian = isBigEndian;
}, "java.io.BufferedInputStream,~B");
Clazz.overrideMethod (c$, "setStreamData", 
function (stream, isBigEndian) {
if (stream != null) this.stream = stream;
this.isBigEndian = isBigEndian;
}, "java.io.DataInputStream,~B");
Clazz.defineMethod (c$, "setRandom", 
function (TF) {
this.isRandom = TF;
}, "~B");
Clazz.overrideMethod (c$, "readByte", 
function () {
this.nBytes++;
return this.ioReadByte ();
});
Clazz.defineMethod (c$, "ioReadByte", 
($fz = function () {
var b = this.stream.readByte ();
if (this.os != null) {
{
this.os.writeByteAsInt(b);
}}return b;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "readByteArray", 
function (b, off, len) {
var n = this.ioRead (b, off, len);
if (n > 0) this.nBytes += n;
var nBytesRead = n;
if (n > 0 && n < len) {
while (nBytesRead < len && n > 0) {
n = this.ioRead (b, nBytesRead, len - nBytesRead);
if (n > 0) {
this.nBytes += n;
nBytesRead += n;
}}
}return nBytesRead;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "ioRead", 
($fz = function (b, off, len) {
var n = this.stream.read (b, off, len);
if (n > 0 && this.os != null) this.writeBytes (b, off, n);
return n;
}, $fz.isPrivate = true, $fz), "~A,~N,~N");
Clazz.defineMethod (c$, "writeBytes", 
function (b, off, n) {
this.os.write (b, off, n);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "readString", 
function (nChar) {
var temp =  Clazz.newByteArray (nChar, 0);
var n = this.readByteArray (temp, 0, nChar);
return  String.instantialize (temp, 0, n, "UTF-8");
}, "~N");
Clazz.overrideMethod (c$, "readShort", 
function () {
this.nBytes += 2;
return (this.isBigEndian ? this.ioReadShort () : ((this.ioReadByte () & 0xff) | (this.ioReadByte () & 0xff) << 8));
});
Clazz.defineMethod (c$, "ioReadShort", 
($fz = function () {
var b = this.stream.readShort ();
if (this.os != null) this.writeShort (b);
return b;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "writeShort", 
function (i) {
{
this.os.writeByteAsInt(i >> 8);
this.os.writeByteAsInt(i);
}}, "~N");
Clazz.overrideMethod (c$, "readInt", 
function () {
this.nBytes += 4;
return (this.isBigEndian ? this.ioReadInt () : this.readLEInt ());
});
Clazz.defineMethod (c$, "ioReadInt", 
($fz = function () {
var i = this.stream.readInt ();
if (this.os != null) this.writeInt (i);
return i;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "writeInt", 
function (i) {
{
this.os.writeByteAsInt(i >> 24);
this.os.writeByteAsInt(i >> 16);
this.os.writeByteAsInt(i >> 8);
this.os.writeByteAsInt(i);
}}, "~N");
Clazz.overrideMethod (c$, "swapBytesI", 
function (n) {
return (((n >> 24) & 0xff) | ((n >> 16) & 0xff) << 8 | ((n >> 8) & 0xff) << 16 | (n & 0xff) << 24);
}, "~N");
Clazz.overrideMethod (c$, "swapBytesS", 
function (n) {
return ((((n >> 8) & 0xff) | (n & 0xff) << 8));
}, "~N");
Clazz.overrideMethod (c$, "readUnsignedShort", 
function () {
this.nBytes += 2;
var a = (this.ioReadByte () & 0xff);
var b = (this.ioReadByte () & 0xff);
return (this.isBigEndian ? (a << 8) + b : (b << 8) + a);
});
Clazz.defineMethod (c$, "writeLong", 
function (b) {
this.writeInt (((b >> 32) & 0xFFFFFFFF));
this.writeInt ((b & 0xFFFFFFFF));
}, "~N");
Clazz.overrideMethod (c$, "readFloat", 
function () {
{
var x = this.readInt();
var m = ((x & 0x3FA00000) >> 24) - 90
return  (x & 0x80000000 == 0 ? 1 : -1) * ((x & 0x7FFFFF) | 0x800000)*Math.pow(2, m);
}});
Clazz.defineMethod (c$, "readLEInt", 
($fz = function () {
return ((this.ioReadByte () & 0xff) | (this.ioReadByte () & 0xff) << 8 | (this.ioReadByte () & 0xff) << 16 | (this.ioReadByte () & 0xff) << 24);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "ioReadFloat", 
($fz = function () {
var f = this.stream.readFloat ();
if (this.os != null) this.writeInt (Float.floatToIntBits (f));
return f;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "seek", 
function (offset) {
try {
if (offset == this.nBytes) return;
if (offset < this.nBytes) {
this.stream.reset ();
this.nBytes = 0;
} else {
offset -= this.nBytes;
}this.stream.skipBytes (offset);
this.nBytes += offset;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.errorEx (null, e);
} else {
throw e;
}
}
}, "~N");
Clazz.overrideMethod (c$, "getPosition", 
function () {
return this.nBytes;
});
Clazz.overrideMethod (c$, "setOutputStream", 
function (os, viewer, privateKey) {
if (viewer.checkPrivateKey (privateKey)) this.os = os;
}, "java.io.OutputStream,org.jmol.viewer.Viewer,~N");
Clazz.overrideMethod (c$, "getAllDataFiles", 
function (binaryFileList, firstFile) {
return null;
}, "~S,~S");
Clazz.overrideMethod (c$, "getAllDataMapped", 
function (replace, string, fileData) {
}, "~S,~S,java.util.Map");
});
