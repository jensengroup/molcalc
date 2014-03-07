Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.SurfaceReader"], "org.jmol.jvxl.readers.SurfaceFileReader", ["org.jmol.api.Interface", "org.jmol.util.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.br = null;
this.binarydoc = null;
this.os = null;
this.line = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "SurfaceFileReader", org.jmol.jvxl.readers.SurfaceReader);
Clazz.prepareFields (c$, function () {
this.next =  Clazz.newIntArray (1, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.SurfaceFileReader, []);
});
Clazz.overrideMethod (c$, "init2", 
function (sg, br) {
this.init (sg);
this.br = br;
}, "org.jmol.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "newBinaryDocument", 
function () {
return org.jmol.api.Interface.getOptionInterface ("io2.BinaryDocument");
});
Clazz.overrideMethod (c$, "setOutputStream", 
function (os) {
if (this.binarydoc == null) this.os = os;
 else this.sg.setOutputStream (this.binarydoc, os);
}, "java.io.OutputStream");
Clazz.overrideMethod (c$, "closeReader", 
function () {
if (this.br != null) try {
this.br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.os != null) try {
this.os.flush ();
this.os.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.binarydoc != null) this.binarydoc.close ();
});
Clazz.defineMethod (c$, "discardTempData", 
function (discardAll) {
this.closeReader ();
Clazz.superCall (this, org.jmol.jvxl.readers.SurfaceFileReader, "discardTempData", [discardAll]);
}, "~B");
Clazz.defineMethod (c$, "getTokens", 
function () {
return org.jmol.util.Parser.getTokensAt (this.line, 0);
});
Clazz.defineMethod (c$, "parseFloat", 
function () {
return org.jmol.util.Parser.parseFloatNext (this.line, this.next);
});
Clazz.defineMethod (c$, "parseFloatStr", 
function (s) {
this.next[0] = 0;
return org.jmol.util.Parser.parseFloatNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseFloatRange", 
function (s, iStart, iEnd) {
this.next[0] = iStart;
return org.jmol.util.Parser.parseFloatRange (s, iEnd, this.next);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "parseInt", 
function () {
return org.jmol.util.Parser.parseIntNext (this.line, this.next);
});
Clazz.defineMethod (c$, "parseIntStr", 
function (s) {
this.next[0] = 0;
return org.jmol.util.Parser.parseIntNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseIntNext", 
function (s) {
return org.jmol.util.Parser.parseIntNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseFloatArrayStr", 
function (s) {
this.next[0] = 0;
return org.jmol.util.Parser.parseFloatArrayNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseFloatArray", 
function () {
return org.jmol.util.Parser.parseFloatArrayNext (this.line, this.next);
});
Clazz.defineMethod (c$, "getQuotedStringNext", 
function () {
return org.jmol.util.Parser.getQuotedStringNext (this.line, this.next);
});
Clazz.defineMethod (c$, "skipTo", 
function (info, what) {
if (info != null) while (this.readLine ().indexOf (info) < 0) {
}
if (what != null) this.next[0] = this.line.indexOf (what) + what.length + 2;
}, "~S,~S");
Clazz.defineMethod (c$, "readLine", 
function () {
this.line = this.br.readLine ();
if (this.line != null) {
this.nBytes += this.line.length;
if (this.os != null) {
var b = this.line.getBytes ();
this.os.write (b, 0, b.length);
{
this.os.writeByteAsInt(0x0A);
}}}return this.line;
});
});
