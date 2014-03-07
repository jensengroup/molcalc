Clazz.declarePackage ("java.util.zip");
Clazz.load (["java.util.zip.InflaterInputStream", "$.ZipConstants", "$.CRC32"], "java.util.zip.ZipInputStream", ["java.io.EOFException", "$.IOException", "$.PushbackInputStream", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.Long", "$.NullPointerException", "java.util.zip.Inflater", "$.ZipEntry", "$.ZipException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.entry = null;
this.flag = 0;
this.crc = null;
this.remaining = 0;
this.tmpbuf = null;
this.$closed = false;
this.entryEOF = false;
this.zc = null;
this.byteTest = null;
this.$b = null;
Clazz.instantialize (this, arguments);
}, java.util.zip, "ZipInputStream", java.util.zip.InflaterInputStream, java.util.zip.ZipConstants);
Clazz.prepareFields (c$, function () {
this.crc =  new java.util.zip.CRC32 ();
this.tmpbuf =  Clazz.newByteArray (512, 0);
this.byteTest = [0x20];
this.$b =  Clazz.newByteArray (256, 0);
});
Clazz.defineMethod (c$, "ensureOpen", 
($fz = function () {
if (this.$closed) {
throw  new java.io.IOException ("Stream closed");
}}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function ($in) {
Clazz.superConstructor (this, java.util.zip.ZipInputStream, [ new java.io.PushbackInputStream ($in, 1024), java.util.zip.ZipInputStream.newInflater (), 512]);
var charset = "UTF-8";
try {
 String.instantialize (this.byteTest, charset);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
throw  new NullPointerException ("charset is invalid");
} else {
throw e;
}
}
this.zc = charset;
}, "java.io.InputStream");
c$.newInflater = Clazz.defineMethod (c$, "newInflater", 
($fz = function () {
return  new java.util.zip.Inflater (true);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getNextEntry", 
function () {
this.ensureOpen ();
if (this.entry != null) {
this.closeEntry ();
}this.crc.reset ();
this.inflater = this.inf = java.util.zip.ZipInputStream.newInflater ();
if ((this.entry = this.readLOC ()) == null) {
return null;
}if (this.entry.method == 0) {
this.remaining = this.entry.size;
}this.entryEOF = false;
return this.entry;
});
Clazz.defineMethod (c$, "closeEntry", 
function () {
this.ensureOpen ();
while (this.read (this.tmpbuf, 0, this.tmpbuf.length) != -1) {
}
this.entryEOF = true;
});
Clazz.overrideMethod (c$, "available", 
function () {
this.ensureOpen ();
return (this.entryEOF ? 0 : 1);
});
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
this.ensureOpen ();
if (off < 0 || len < 0 || off > b.length - len) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}if (this.entry == null) {
return -1;
}switch (this.entry.method) {
case 8:
len = Clazz.superCall (this, java.util.zip.ZipInputStream, "read", [b, off, len]);
if (len == -1) {
this.readEnd (this.entry);
this.entryEOF = true;
this.entry = null;
} else {
this.crc.update (b, off, len);
}return len;
case 0:
if (this.remaining <= 0) {
this.entryEOF = true;
this.entry = null;
return -1;
}if (len > this.remaining) {
len = this.remaining;
}len = this.$in.read (b, off, len);
if (len == -1) {
throw  new java.util.zip.ZipException ("unexpected EOF");
}this.crc.update (b, off, len);
this.remaining -= len;
if (this.remaining == 0 && this.entry.crc != this.crc.getValue ()) {
throw  new java.util.zip.ZipException ("invalid entry CRC (expected 0x" + Long.toHexString (this.entry.crc) + " but got 0x" + Long.toHexString (this.crc.getValue ()) + ")");
}return len;
default:
throw  new java.util.zip.ZipException ("invalid compression method");
}
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skip", 
function (n) {
if (n < 0) {
throw  new IllegalArgumentException ("negative skip length");
}this.ensureOpen ();
var max = Math.min (n, 2147483647);
var total = 0;
while (total < max) {
var len = max - total;
if (len > this.tmpbuf.length) {
len = this.tmpbuf.length;
}len = this.read (this.tmpbuf, 0, len);
if (len == -1) {
this.entryEOF = true;
break;
}total += len;
}
return total;
}, "~N");
Clazz.defineMethod (c$, "close", 
function () {
if (!this.$closed) {
Clazz.superCall (this, java.util.zip.ZipInputStream, "close", []);
this.$closed = true;
}});
Clazz.defineMethod (c$, "readLOC", 
($fz = function () {
try {
this.readFully (this.tmpbuf, 0, 30);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.EOFException)) {
return null;
} else {
throw e;
}
}
if (java.util.zip.ZipInputStream.get32 (this.tmpbuf, 0) != 67324752) {
return null;
}this.flag = java.util.zip.ZipInputStream.get16 (this.tmpbuf, 6);
var len = java.util.zip.ZipInputStream.get16 (this.tmpbuf, 26);
var blen = this.$b.length;
if (len > blen) {
do blen = blen * 2;
 while (len > blen);
this.$b =  Clazz.newByteArray (blen, 0);
}this.readFully (this.$b, 0, len);
var e = this.createZipEntry (((this.flag & 2048) != 0) ? this.toStringUTF8 (this.$b, len) : this.toString (this.$b, len));
if ((this.flag & 1) == 1) {
throw  new java.util.zip.ZipException ("encrypted ZIP entry not supported");
}e.method = java.util.zip.ZipInputStream.get16 (this.tmpbuf, 8);
e.time = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 10);
if ((this.flag & 8) == 8) {
if (e.method != 8) {
throw  new java.util.zip.ZipException ("only DEFLATED entries can have EXT descriptor");
}} else {
e.crc = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 14);
e.csize = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 18);
e.size = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 22);
}len = java.util.zip.ZipInputStream.get16 (this.tmpbuf, 28);
if (len > 0) {
var bb =  Clazz.newByteArray (len, 0);
this.readFully (bb, 0, len);
e.setExtra (bb);
if (e.csize == 4294967295 || e.size == 4294967295) {
var off = 0;
while (off + 4 < len) {
var sz = java.util.zip.ZipInputStream.get16 (bb, off + 2);
if (java.util.zip.ZipInputStream.get16 (bb, off) == 1) {
off += 4;
if (sz < 16 || (off + sz) > len) {
return e;
}e.size = java.util.zip.ZipInputStream.get64 (bb, off);
e.csize = java.util.zip.ZipInputStream.get64 (bb, off + 8);
break;
}off += (sz + 4);
}
}}return e;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "toString", 
($fz = function (b2, len) {
return  String.instantialize (b2, 0, len);
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "toStringUTF8", 
($fz = function (b2, len) {
try {
return  String.instantialize (b2, 0, len, this.zc);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
return this.toString (b2, len);
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "createZipEntry", 
function (name) {
return  new java.util.zip.ZipEntry (name);
}, "~S");
Clazz.defineMethod (c$, "readEnd", 
($fz = function (e) {
var n = this.inf.getRemaining ();
if (n > 0) {
(this.$in).unread (this.buf, this.len - n, n);
this.eof = false;
}if ((this.flag & 8) == 8) {
if (this.inf.getBytesWritten () > 4294967295 || this.inf.getBytesRead () > 4294967295) {
this.readFully (this.tmpbuf, 0, 24);
var sig = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 0);
if (sig != 134695760) {
e.crc = sig;
e.csize = java.util.zip.ZipInputStream.get64 (this.tmpbuf, 4);
e.size = java.util.zip.ZipInputStream.get64 (this.tmpbuf, 12);
(this.$in).unread (this.tmpbuf, 19, 4);
} else {
e.crc = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 4);
e.csize = java.util.zip.ZipInputStream.get64 (this.tmpbuf, 8);
e.size = java.util.zip.ZipInputStream.get64 (this.tmpbuf, 16);
}} else {
this.readFully (this.tmpbuf, 0, 16);
var sig = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 0);
if (sig != 134695760) {
e.crc = sig;
e.csize = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 4);
e.size = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 8);
(this.$in).unread (this.tmpbuf, 11, 4);
} else {
e.crc = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 4);
e.csize = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 8);
e.size = java.util.zip.ZipInputStream.get32 (this.tmpbuf, 12);
}}}if (e.size != this.inf.getBytesWritten ()) {
throw  new java.util.zip.ZipException ("invalid entry size (expected " + e.size + " but got " + this.inf.getBytesWritten () + " bytes)");
}if (e.csize != this.inf.getBytesRead ()) {
throw  new java.util.zip.ZipException ("invalid entry compressed size (expected " + e.csize + " but got " + this.inf.getBytesRead () + " bytes)");
}if (e.crc != this.crc.getValue ()) {
throw  new java.util.zip.ZipException ("invalid entry CRC (expected 0x" + Long.toHexString (e.crc) + " but got 0x" + Long.toHexString (this.crc.getValue ()) + ")");
}}, $fz.isPrivate = true, $fz), "java.util.zip.ZipEntry");
Clazz.defineMethod (c$, "readFully", 
($fz = function (b, off, len) {
while (len > 0) {
var n = this.$in.read (b, off, len);
if (n == -1) {
throw  new java.io.EOFException ();
}off += n;
len -= n;
}
}, $fz.isPrivate = true, $fz), "~A,~N,~N");
c$.get16 = Clazz.defineMethod (c$, "get16", 
($fz = function (b, off) {
return (b[off] & 0xff) | ((b[off + 1] & 0xff) << 8);
}, $fz.isPrivate = true, $fz), "~A,~N");
c$.get32 = Clazz.defineMethod (c$, "get32", 
($fz = function (b, off) {
return (java.util.zip.ZipInputStream.get16 (b, off) | (java.util.zip.ZipInputStream.get16 (b, off + 2) << 16)) & 0xffffffff;
}, $fz.isPrivate = true, $fz), "~A,~N");
c$.get64 = Clazz.defineMethod (c$, "get64", 
($fz = function (b, off) {
return java.util.zip.ZipInputStream.get32 (b, off) | (java.util.zip.ZipInputStream.get32 (b, off + 4) << 32);
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineStatics (c$,
"STORED", 0,
"DEFLATED", 8);
});
