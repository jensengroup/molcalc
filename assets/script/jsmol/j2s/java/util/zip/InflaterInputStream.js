Clazz.declarePackage ("java.util.zip");
Clazz.load (["com.jcraft.jzlib.InflaterInputStream"], "java.util.zip.InflaterInputStream", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.inf = null;
Clazz.instantialize (this, arguments);
}, java.util.zip, "InflaterInputStream", com.jcraft.jzlib.InflaterInputStream);
Clazz.makeConstructor (c$, 
function ($in, inflater, size) {
Clazz.superConstructor (this, java.util.zip.InflaterInputStream, [$in, inflater, size]);
this.inf = inflater;
}, "java.io.InputStream,java.util.zip.Inflater,~N");
Clazz.defineMethod (c$, "getRemaining", 
function () {
return this.inf.getRemaining ();
});
Clazz.defineMethod (c$, "needsInput", 
function () {
return this.len <= 0;
});
});
