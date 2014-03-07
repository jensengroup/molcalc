Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shapebio.Rockets"], "org.jmol.shapebio.Cartoon", null, function () {
c$ = Clazz.declareType (org.jmol.shapebio, "Cartoon", org.jmol.shapebio.Rockets);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapebio.Cartoon, "initShape", []);
this.madDnaRna = 1000;
});
});
