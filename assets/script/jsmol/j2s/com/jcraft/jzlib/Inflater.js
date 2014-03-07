Clazz.declarePackage ("com.jcraft.jzlib");
Clazz.load (["com.jcraft.jzlib.ZStream"], "com.jcraft.jzlib.Inflater", ["com.jcraft.jzlib.Inflate"], function () {
c$ = Clazz.declareType (com.jcraft.jzlib, "Inflater", com.jcraft.jzlib.ZStream);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, com.jcraft.jzlib.Inflater);
this.init ();
});
Clazz.makeConstructor (c$, 
function (w) {
this.construct (w, false);
}, "~N");
Clazz.makeConstructor (c$, 
function (nowrap) {
Clazz.superConstructor (this, com.jcraft.jzlib.Inflater);
this.init (nowrap);
}, "~B");
Clazz.makeConstructor (c$, 
function (w, nowrap) {
Clazz.superConstructor (this, com.jcraft.jzlib.Inflater);
this.init (w, nowrap);
}, "~N,~B");
Clazz.defineMethod (c$, "init", 
function () {
return this.init (15);
});
Clazz.defineMethod (c$, "init", 
function (nowrap) {
return this.init (15, nowrap);
}, "~B");
Clazz.defineMethod (c$, "init", 
function (w) {
return this.init (w, false);
}, "~N");
Clazz.defineMethod (c$, "init", 
function (w, nowrap) {
this.istate =  new com.jcraft.jzlib.Inflate (this);
return this.istate.inflateInit (nowrap ? -w : w);
}, "~N,~B");
Clazz.overrideMethod (c$, "inflate", 
function (f) {
if (this.istate == null) return -2;
var ret = this.istate.inflate (f);
return ret;
}, "~N");
Clazz.overrideMethod (c$, "end", 
function () {
if (this.istate == null) return -2;
var ret = this.istate.inflateEnd ();
return ret;
});
Clazz.defineMethod (c$, "sync", 
function () {
if (this.istate == null) return -2;
return this.istate.inflateSync ();
});
Clazz.defineMethod (c$, "syncPoint", 
function () {
if (this.istate == null) return -2;
return this.istate.inflateSyncPoint ();
});
Clazz.defineMethod (c$, "setDictionary", 
function (dictionary, dictLength) {
if (this.istate == null) return -2;
return this.istate.inflateSetDictionary (dictionary, dictLength);
}, "~A,~N");
Clazz.overrideMethod (c$, "finished", 
function () {
return this.istate.mode == 12;
});
Clazz.defineMethod (c$, "reset", 
function () {
this.avail_in = 0;
if (this.istate != null) this.istate.reset ();
});
Clazz.defineStatics (c$,
"$MAX_WBITS", 15,
"$DEF_WBITS", 15,
"$Z_STREAM_ERROR", -2);
});
