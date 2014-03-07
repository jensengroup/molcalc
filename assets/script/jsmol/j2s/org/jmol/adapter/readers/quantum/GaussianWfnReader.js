Clazz.declarePackage ("org.jmol.adapter.readers.quantum");
Clazz.load (["org.jmol.adapter.smarter.AtomSetCollectionReader"], "org.jmol.adapter.readers.quantum.GaussianWfnReader", null, function () {
c$ = Clazz.declareType (org.jmol.adapter.readers.quantum, "GaussianWfnReader", org.jmol.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.continuing = false;
});
});
