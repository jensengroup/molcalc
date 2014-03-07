Clazz.declarePackage ("com.jcraft.jzlib");
Clazz.load (["com.jcraft.jzlib.InflaterInputStream"], "com.jcraft.jzlib.GZIPInputStream", ["com.jcraft.jzlib.GZIPException", "$.Inflater", "java.io.IOException"], function () {
c$ = Clazz.declareType (com.jcraft.jzlib, "GZIPInputStream", com.jcraft.jzlib.InflaterInputStream);
Clazz.makeConstructor (c$, 
function ($in) {
this.construct ($in, 512, true);
}, "java.io.InputStream");
Clazz.makeConstructor (c$, 
function ($in, size, close_in) {
this.construct ($in,  new com.jcraft.jzlib.Inflater (31), size, close_in);
this.myinflater = true;
}, "java.io.InputStream,~N,~B");
Clazz.defineMethod (c$, "getModifiedtime", 
function () {
return this.inflater.istate.getGZIPHeader ().getModifiedTime ();
});
Clazz.defineMethod (c$, "getOS", 
function () {
return this.inflater.istate.getGZIPHeader ().getOS ();
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.inflater.istate.getGZIPHeader ().getName ();
});
Clazz.defineMethod (c$, "getComment", 
function () {
return this.inflater.istate.getGZIPHeader ().getComment ();
});
Clazz.defineMethod (c$, "getCRC", 
function () {
if (this.inflater.istate.mode != 12) throw  new com.jcraft.jzlib.GZIPException ("checksum is not calculated yet.");
return this.inflater.istate.getGZIPHeader ().getCRC ();
});
Clazz.overrideMethod (c$, "readHeader", 
function () {
var empty =  Clazz.newByteArray (0, 0);
this.inflater.setOutput (empty, 0, 0);
this.inflater.setInput (empty, 0, 0, false);
var b =  Clazz.newByteArray (10, 0);
var n = this.fill (b);
if (n != 10) {
if (n > 0) {
this.inflater.setInput (b, 0, n, false);
this.inflater.next_in_index = 0;
this.inflater.avail_in = n;
}throw  new java.io.IOException ("no input");
}this.inflater.setInput (b, 0, n, false);
var b1 =  Clazz.newByteArray (1, 0);
do {
if (this.inflater.avail_in <= 0) {
var i = this.$in.read (b1, 0, 1);
if (i <= 0) throw  new java.io.IOException ("no input");
this.inflater.setInput (b1, 0, 1, true);
}var err = this.inflater.inflate (0);
if (err != 0) {
var len = 2048 - this.inflater.next_in.length;
if (len > 0) {
var tmp =  Clazz.newByteArray (len, 0);
n = this.fill (tmp);
if (n > 0) {
this.inflater.avail_in += this.inflater.next_in_index;
this.inflater.next_in_index = 0;
this.inflater.setInput (tmp, 0, n, true);
}}this.inflater.avail_in += this.inflater.next_in_index;
this.inflater.next_in_index = 0;
throw  new java.io.IOException (this.inflater.msg);
}} while (this.inflater.istate.inParsingHeader ());
});
Clazz.defineMethod (c$, "fill", 
($fz = function (buf) {
var len = buf.length;
var n = 0;
do {
var i = -1;
try {
i = this.$in.read (buf, n, buf.length - n);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (i == -1) {
break;
}n += i;
} while (n < len);
return n;
}, $fz.isPrivate = true, $fz), "~A");
});
