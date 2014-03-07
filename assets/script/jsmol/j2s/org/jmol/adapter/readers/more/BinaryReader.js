Clazz.declarePackage ("org.jmol.adapter.readers.more");
Clazz.load (["org.jmol.adapter.smarter.AtomSetCollectionReader"], "org.jmol.adapter.readers.more.BinaryReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.binaryDoc = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.more, "BinaryReader", org.jmol.adapter.smarter.AtomSetCollectionReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.adapter.readers.more.BinaryReader, []);
this.isBinary = true;
});
Clazz.overrideMethod (c$, "processBinaryDocument", 
function (doc) {
this.binaryDoc = doc;
this.readDocument ();
}, "org.jmol.api.JmolDocument");
});
