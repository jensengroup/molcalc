Clazz.declarePackage ("com.jcraft.jzlib");
Clazz.load (["com.jcraft.jzlib.ZStream"], "com.jcraft.jzlib.Deflater", ["com.jcraft.jzlib.Deflate"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$finished = false;
Clazz.instantialize (this, arguments);
}, com.jcraft.jzlib, "Deflater", com.jcraft.jzlib.ZStream);
Clazz.makeConstructor (c$, 
function (level) {
this.construct (level, 15);
}, "~N");
Clazz.makeConstructor (c$, 
function (level, nowrap) {
this.construct (level, 15, nowrap);
}, "~N,~B");
Clazz.makeConstructor (c$, 
function (level, bits) {
this.construct (level, bits, false);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (level, bits, nowrap) {
Clazz.superConstructor (this, com.jcraft.jzlib.Deflater);
this.init3b (level, bits, nowrap);
}, "~N,~N,~B");
Clazz.makeConstructor (c$, 
function (level, bits, memlevel) {
Clazz.superConstructor (this, com.jcraft.jzlib.Deflater);
this.init3 (level, bits, memlevel);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "init", 
function (level) {
return this.init2 (level, 15);
}, "~N");
Clazz.defineMethod (c$, "init2", 
function (level, bits) {
return this.init3b (level, bits, false);
}, "~N,~N");
Clazz.defineMethod (c$, "init2b", 
function (level, nowrap) {
return this.init3b (level, 15, nowrap);
}, "~N,~B");
Clazz.defineMethod (c$, "init3", 
function (level, bits, memlevel) {
this.$finished = false;
this.dstate =  new com.jcraft.jzlib.Deflate (this);
return this.dstate.deflateInit3 (level, bits, memlevel);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "init3b", 
function (level, bits, nowrap) {
this.$finished = false;
this.dstate =  new com.jcraft.jzlib.Deflate (this);
return this.dstate.deflateInit2 (level, nowrap ? -bits : bits);
}, "~N,~N,~B");
Clazz.overrideMethod (c$, "deflate", 
function (flush) {
if (this.dstate == null) {
return -2;
}var ret = this.dstate.deflate (flush);
if (ret == 1) this.$finished = true;
return ret;
}, "~N");
Clazz.overrideMethod (c$, "end", 
function () {
this.$finished = true;
if (this.dstate == null) return -2;
var ret = this.dstate.deflateEnd ();
this.dstate = null;
this.free ();
return ret;
});
Clazz.defineMethod (c$, "params", 
function (level, strategy) {
if (this.dstate == null) return -2;
return this.dstate.deflateParams (level, strategy);
}, "~N,~N");
Clazz.defineMethod (c$, "setDictionary", 
function (dictionary, dictLength) {
if (this.dstate == null) return -2;
return this.dstate.deflateSetDictionary (dictionary, dictLength);
}, "~A,~N");
Clazz.overrideMethod (c$, "finished", 
function () {
return this.$finished;
});
Clazz.defineMethod (c$, "finish", 
function () {
});
Clazz.defineMethod (c$, "getBytesRead", 
function () {
return this.dstate.getBytesRead ();
});
Clazz.defineMethod (c$, "getBytesWritten", 
function () {
return this.dstate.getBytesWritten ();
});
Clazz.defineStatics (c$,
"$MAX_WBITS", 15,
"Z_STREAM_END", 1,
"$Z_STREAM_ERROR", -2);
});
