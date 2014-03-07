Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shapebio.BioShapeCollection"], "org.jmol.shapebio.Rockets", null, function () {
c$ = Clazz.declareType (org.jmol.shapebio, "Rockets", org.jmol.shapebio.BioShapeCollection);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapebio.Rockets, "initShape", []);
this.madTurnRandom = 500;
});
});
