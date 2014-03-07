Clazz.declarePackage ("org.jmol.adapter.readers.molxyz");
Clazz.load (["org.jmol.adapter.readers.molxyz.MolReader"], "org.jmol.adapter.readers.molxyz.Mol3DReader", null, function () {
c$ = Clazz.declareType (org.jmol.adapter.readers.molxyz, "Mol3DReader", org.jmol.adapter.readers.molxyz.MolReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.allow2D = false;
});
});
