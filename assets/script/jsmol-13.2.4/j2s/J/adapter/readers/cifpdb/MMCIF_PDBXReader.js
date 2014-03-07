Clazz.declarePackage ("J.adapter.readers.cifpdb");
Clazz.load (["J.adapter.readers.cifpdb.CifReader"], "J.adapter.readers.cifpdb.MMCIF_PDBXReader", null, function () {
c$ = Clazz.declareType (J.adapter.readers.cifpdb, "MMCIF_PDBXReader", J.adapter.readers.cifpdb.CifReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.isPDBX = true;
this.initializeReaderCif ();
});
});
