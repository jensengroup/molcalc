Clazz.declarePackage ("com.jcraft.jzlib");
Clazz.load (["java.io.FilterInputStream"], "com.jcraft.jzlib.ZInputStream", ["com.jcraft.jzlib.Deflater", "$.InflaterInputStream", "$.ZStreamException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flush = 0;
this.compress = false;
this.$$in = null;
this.deflater = null;
this.iis = null;
this.buf1 = null;
this.buf = null;
Clazz.instantialize (this, arguments);
}, com.jcraft.jzlib, "ZInputStream", java.io.FilterInputStream);
Clazz.prepareFields (c$, function () {
this.buf1 =  Clazz.newByteArray (1, 0);
this.buf =  Clazz.newByteArray (512, 0);
});
Clazz.makeConstructor (c$, 
function ($in) {
this.construct ($in, false);
}, "java.io.InputStream");
Clazz.makeConstructor (c$, 
function ($in, nowrap) {
Clazz.superConstructor (this, com.jcraft.jzlib.ZInputStream, [$in]);
this.iis =  new com.jcraft.jzlib.InflaterInputStream ($in);
this.compress = false;
}, "java.io.InputStream,~B");
Clazz.makeConstructor (c$, 
function ($in, level) {
Clazz.superConstructor (this, com.jcraft.jzlib.ZInputStream, [$in]);
this.$$in = $in;
this.deflater =  new com.jcraft.jzlib.Deflater ();
this.deflater.init (level);
this.compress = true;
}, "java.io.InputStream,~N");
Clazz.overrideMethod (c$, "readByteAsInt", 
function () {
if (this.read (this.buf1, 0, 1) == -1) return -1;
return (this.buf1[0] & 0xFF);
});
Clazz.overrideMethod (c$, "read", 
function (b, off, len) {
if (this.compress) {
this.deflater.setOutput (b, off, len);
while (true) {
var datalen = this.$$in.read (this.buf, 0, this.buf.length);
if (datalen == -1) return -1;
this.deflater.setInput (this.buf, 0, datalen, true);
var err = this.deflater.deflate (this.flush);
if (this.deflater.next_out_index > 0) return this.deflater.next_out_index;
if (err == 1) return 0;
if (err == -2 || err == -3) {
throw  new com.jcraft.jzlib.ZStreamException ("deflating: " + this.deflater.msg);
}}
}return this.iis.read (b, off, len);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skip", 
function (n) {
var len = 512;
if (n < len) len = n;
var tmp =  Clazz.newByteArray (len, 0);
return this.read (tmp, 0, len);
}, "~N");
Clazz.defineMethod (c$, "getFlushMode", 
function () {
return this.flush;
});
Clazz.defineMethod (c$, "setFlushMode", 
function (flush) {
this.flush = flush;
}, "~N");
Clazz.defineMethod (c$, "getTotalIn", 
function () {
if (this.compress) return this.deflater.total_in;
return this.iis.getTotalIn ();
});
Clazz.defineMethod (c$, "getTotalOut", 
function () {
if (this.compress) return this.deflater.total_out;
return this.iis.getTotalOut ();
});
Clazz.overrideMethod (c$, "close", 
function () {
if (this.compress) this.deflater.end ();
 else this.iis.close ();
});
});
