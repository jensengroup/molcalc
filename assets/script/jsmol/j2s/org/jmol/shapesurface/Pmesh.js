Clazz.declarePackage ("org.jmol.shapesurface");
Clazz.load (["org.jmol.shapesurface.Isosurface"], "org.jmol.shapesurface.Pmesh", null, function () {
c$ = Clazz.declareType (org.jmol.shapesurface, "Pmesh", org.jmol.shapesurface.Isosurface);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapesurface.Pmesh, "initShape", []);
this.myType = "pmesh";
});
});
