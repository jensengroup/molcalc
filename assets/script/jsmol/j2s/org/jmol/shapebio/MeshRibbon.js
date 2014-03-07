Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shapebio.Strands"], "org.jmol.shapebio.MeshRibbon", null, function () {
c$ = Clazz.declareType (org.jmol.shapebio, "MeshRibbon", org.jmol.shapebio.Strands);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapebio.MeshRibbon, "initShape", []);
this.isMesh = true;
});
});
