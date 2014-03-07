Clazz.declarePackage ("org.jmol.adapter.readers.quantum");
Clazz.load (["org.jmol.adapter.readers.quantum.SpartanInputReader"], "org.jmol.adapter.readers.quantum.OdysseyReader", null, function () {
c$ = Clazz.declareType (org.jmol.adapter.readers.quantum, "OdysseyReader", org.jmol.adapter.readers.quantum.SpartanInputReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.modelName = "Odyssey file";
this.readInputRecords ();
this.continuing = false;
});
});
