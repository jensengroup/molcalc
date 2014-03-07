Clazz.declarePackage ("com.jcraft.jzlib");
Clazz.load (["java.io.FilterOutputStream"], "com.jcraft.jzlib.ZOutputStream", ["com.jcraft.jzlib.Deflater", "$.DeflaterOutputStream", "$.Inflater", "$.ZStreamException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bufsize = 512;
this.$flush = 0;
this.buf = null;
this.compress = false;
this.$out = null;
this.$end = false;
this.dos = null;
this.inflater = null;
this.buf1 = null;
Clazz.instantialize (this, arguments);
}, com.jcraft.jzlib, "ZOutputStream", java.io.FilterOutputStream);
Clazz.prepareFields (c$, function () {
this.buf =  Clazz.newByteArray (this.bufsize, 0);
this.buf1 =  Clazz.newByteArray (1, 0);
});
Clazz.makeConstructor (c$, 
function (out) {
Clazz.superConstructor (this, com.jcraft.jzlib.ZOutputStream, [out]);
this.$out = out;
this.inflater =  new com.jcraft.jzlib.Inflater ();
this.inflater.init ();
this.compress = false;
}, "java.io.OutputStream");
Clazz.makeConstructor (c$, 
function (out, level) {
this.construct (out, level, false);
}, "java.io.OutputStream,~N");
Clazz.makeConstructor (c$, 
function (out, level, nowrap) {
Clazz.superConstructor (this, com.jcraft.jzlib.ZOutputStream, [out]);
this.$out = out;
var deflater =  new com.jcraft.jzlib.Deflater (level, nowrap);
this.dos =  new com.jcraft.jzlib.DeflaterOutputStream (out, deflater);
this.compress = true;
}, "java.io.OutputStream,~N,~B");
Clazz.defineMethod (c$, "write", 
function (b) {
this.buf1[0] = b;
this.write (this.buf1, 0, 1);
}, "~N");
Clazz.defineMethod (c$, "write", 
function (b, off, len) {
if (len == 0) return;
if (this.compress) {
this.dos.write (b, off, len);
} else {
this.inflater.setInput (b, off, len, true);
var err = 0;
while (this.inflater.avail_in > 0) {
this.inflater.setOutput (this.buf, 0, this.buf.length);
err = this.inflater.inflate (this.$flush);
if (this.inflater.next_out_index > 0) this.$out.write (this.buf, 0, this.inflater.next_out_index);
if (err != 0) break;
}
if (err != 0) throw  new com.jcraft.jzlib.ZStreamException ("inflating: " + this.inflater.msg);
return;
}}, "~A,~N,~N");
Clazz.defineMethod (c$, "getFlushMode", 
function () {
return this.$flush;
});
Clazz.defineMethod (c$, "setFlushMode", 
function (flush) {
this.$flush = flush;
}, "~N");
Clazz.defineMethod (c$, "finish", 
function () {
var err;
if (this.compress) {
var tmp = this.$flush;
var flush = 4;
try {
this.write ("".getBytes (), 0, 0);
} finally {
flush = tmp;
}
} else {
this.dos.finish ();
}this.flush ();
});
Clazz.defineMethod (c$, "end", 
function () {
if (this.$end) return;
if (this.compress) {
try {
this.dos.finish ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
} else {
this.inflater.end ();
}this.$end = true;
});
Clazz.overrideMethod (c$, "close", 
function () {
try {
try {
this.finish ();
} catch (ignored) {
if (Clazz.exceptionOf (ignored, java.io.IOException)) {
} else {
throw ignored;
}
}
} finally {
this.end ();
this.$out.close ();
this.$out = null;
}
});
Clazz.defineMethod (c$, "getTotalIn", 
function () {
if (this.compress) return this.dos.getTotalIn ();
 else return this.inflater.total_in;
});
Clazz.defineMethod (c$, "getTotalOut", 
function () {
if (this.compress) return this.dos.getTotalOut ();
 else return this.inflater.total_out;
});
Clazz.overrideMethod (c$, "flush", 
function () {
this.$out.flush ();
});
});
