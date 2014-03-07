Clazz.declarePackage ("java.util.zip");
Clazz.load (["com.jcraft.jzlib.Inflater"], "java.util.zip.Inflater", null, function () {
c$ = Clazz.declareType (java.util.zip, "Inflater", com.jcraft.jzlib.Inflater);
Clazz.makeConstructor (c$, 
function (nowrap) {
Clazz.superConstructor (this, java.util.zip.Inflater, [15, nowrap]);
}, "~B");
Clazz.defineMethod (c$, "getRemaining", 
function () {
return this.avail_in;
});
Clazz.defineMethod (c$, "getBytesWritten", 
function () {
return this.total_out;
});
Clazz.defineMethod (c$, "getBytesRead", 
function () {
return this.total_in;
});
});
