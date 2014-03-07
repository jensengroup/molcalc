Clazz.declarePackage ("org.jmol.shapesurface");
Clazz.load (["org.jmol.shapesurface.Pmesh"], "org.jmol.shapesurface.Plot3D", null, function () {
c$ = Clazz.declareType (org.jmol.shapesurface, "Plot3D", org.jmol.shapesurface.Pmesh);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapesurface.Plot3D, "initShape", []);
this.myType = "plot3d";
});
});
