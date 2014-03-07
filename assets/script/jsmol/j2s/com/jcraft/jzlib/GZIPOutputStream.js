Clazz.declarePackage ("com.jcraft.jzlib");
Clazz.load (["com.jcraft.jzlib.DeflaterOutputStream"], "com.jcraft.jzlib.GZIPOutputStream", ["com.jcraft.jzlib.Deflater", "$.GZIPException"], function () {
c$ = Clazz.declareType (com.jcraft.jzlib, "GZIPOutputStream", com.jcraft.jzlib.DeflaterOutputStream);
Clazz.makeConstructor (c$, 
function (out) {
this.construct (out, 512);
}, "java.io.OutputStream");
Clazz.makeConstructor (c$, 
function (out, size) {
this.construct (out, size, true);
}, "java.io.OutputStream,~N");
Clazz.makeConstructor (c$, 
function (out, size, close_out) {
this.construct (out,  new com.jcraft.jzlib.Deflater (-1, 31), size, close_out);
this.mydeflater = true;
}, "java.io.OutputStream,~N,~B");
Clazz.defineMethod (c$, "check", 
($fz = function () {
if (this.deflater.dstate.status != 42) throw  new com.jcraft.jzlib.GZIPException ("header is already written.");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setModifiedTime", 
function (mtime) {
this.check ();
this.deflater.dstate.getGZIPHeader ().setModifiedTime (mtime);
}, "~N");
Clazz.defineMethod (c$, "setOS", 
function (os) {
this.check ();
this.deflater.dstate.getGZIPHeader ().setOS (os);
}, "~N");
Clazz.defineMethod (c$, "setName", 
function (name) {
this.check ();
this.deflater.dstate.getGZIPHeader ().setName (name);
}, "~S");
Clazz.defineMethod (c$, "setComment", 
function (comment) {
this.check ();
this.deflater.dstate.getGZIPHeader ().setComment (comment);
}, "~S");
Clazz.defineMethod (c$, "getCRC", 
function () {
if (this.deflater.dstate.status != 666) throw  new com.jcraft.jzlib.GZIPException ("checksum is not calculated yet.");
return this.deflater.dstate.getGZIPHeader ().getCRC ();
});
});
