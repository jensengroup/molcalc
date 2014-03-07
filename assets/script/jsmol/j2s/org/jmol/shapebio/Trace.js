Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shapebio.BioShapeCollection"], "org.jmol.shapebio.Trace", null, function () {
c$ = Clazz.declareType (org.jmol.shapebio, "Trace", org.jmol.shapebio.BioShapeCollection);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapebio.Trace, "initShape", []);
this.madOn = 600;
this.madHelixSheet = 1500;
this.madTurnRandom = 500;
this.madDnaRna = 1500;
});
});
