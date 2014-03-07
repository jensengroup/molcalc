Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.FontLineShape"], "org.jmol.shape.Uccage", null, function () {
c$ = Clazz.declareType (org.jmol.shape, "Uccage", org.jmol.shape.FontLineShape);
Clazz.defineMethod (c$, "getShapeState", 
function () {
return (this.modelSet.haveUnitCells () ? Clazz.superCall (this, org.jmol.shape.Uccage, "getShapeState", []) : "");
});
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shape.Uccage, "initShape", []);
this.font3d = this.gdata.getFont3D (14);
this.myType = "unitcell";
});
});
