Clazz.declarePackage ("org.jmol.io2");
Clazz.load (["org.jmol.io.DataReader"], "org.jmol.io2.ArrayDataReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.pt = 0;
this.len = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.io2, "ArrayDataReader", org.jmol.io.DataReader);
Clazz.overrideMethod (c$, "setData", 
function (data) {
this.data = data;
this.len = this.data.length;
return this;
}, "~O");
Clazz.overrideMethod (c$, "read", 
function (buf, off, len) {
return this.readBuf (buf, off, len);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "readLine", 
function () {
return (this.pt < this.len ? this.data[this.pt++] : null);
});
Clazz.defineMethod (c$, "mark", 
function (ptr) {
this.ptMark = this.pt;
}, "~N");
Clazz.overrideMethod (c$, "reset", 
function () {
this.pt = this.ptMark;
});
});
