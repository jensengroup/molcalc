Clazz.declarePackage ("org.jmol.adapter.readers.more");
Clazz.load (["org.jmol.adapter.readers.cifpdb.PdbReader", "java.util.ArrayList"], "org.jmol.adapter.readers.more.P2nReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.altNames = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.more, "P2nReader", org.jmol.adapter.readers.cifpdb.PdbReader);
Clazz.prepareFields (c$, function () {
this.altNames =  new java.util.ArrayList ();
});
Clazz.overrideMethod (c$, "setAdditionalAtomParameters", 
function (atom) {
var altName = this.line.substring (69, 72).trim ();
if (altName.length == 0) altName = atom.atomName;
if (this.useAltNames) atom.atomName = altName;
 else this.altNames.add (altName);
}, "org.jmol.adapter.smarter.Atom");
Clazz.defineMethod (c$, "finalizeReader", 
function () {
Clazz.superCall (this, org.jmol.adapter.readers.more.P2nReader, "finalizeReader", []);
if (!this.useAltNames) this.atomSetCollection.setAtomSetAuxiliaryInfo ("altName", this.altNames.toArray ( new Array (this.altNames.size ())));
});
});
