Clazz.declarePackage ("org.jmol.adapter.readers.more");
Clazz.load (["org.jmol.adapter.readers.cifpdb.PdbReader"], "org.jmol.adapter.readers.more.PqrReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$gromacsWideFormat = false;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.more, "PqrReader", org.jmol.adapter.readers.cifpdb.PdbReader);
Clazz.defineMethod (c$, "initializeReader", 
function () {
this.isPQR = true;
Clazz.superCall (this, org.jmol.adapter.readers.more.PqrReader, "initializeReader", []);
});
});
