Clazz.declarePackage ("org.jmol.shapespecial");
Clazz.load (["org.jmol.shapespecial.Dots"], "org.jmol.shapespecial.GeoSurface", null, function () {
c$ = Clazz.declareType (org.jmol.shapespecial, "GeoSurface", org.jmol.shapespecial.Dots);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapespecial.GeoSurface, "initShape", []);
this.isSurface = true;
this.translucentAllowed = true;
});
});
