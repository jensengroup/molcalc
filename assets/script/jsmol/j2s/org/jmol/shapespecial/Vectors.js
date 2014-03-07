Clazz.declarePackage ("org.jmol.shapespecial");
Clazz.load (["org.jmol.shape.AtomShape"], "org.jmol.shapespecial.Vectors", null, function () {
c$ = Clazz.declareType (org.jmol.shapespecial, "Vectors", org.jmol.shape.AtomShape);
Clazz.defineMethod (c$, "initModelSet", 
function () {
if (!(this.isActive = this.modelSet.modelSetHasVibrationVectors ())) return;
Clazz.superCall (this, org.jmol.shapespecial.Vectors, "initModelSet", []);
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (!this.isActive) return;
Clazz.superCall (this, org.jmol.shapespecial.Vectors, "setProperty", [propertyName, value, bsSelected]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getProperty", 
function (propertyName, param) {
if (propertyName === "mad") return Integer.$valueOf (this.mads == null || param < 0 || this.mads.length <= param ? 0 : this.mads[param]);
return Clazz.superCall (this, org.jmol.shapespecial.Vectors, "getProperty", [propertyName, param]);
}, "~S,~N");
Clazz.defineMethod (c$, "getShapeState", 
function () {
return (this.isActive ? Clazz.superCall (this, org.jmol.shapespecial.Vectors, "getShapeState", []) : "");
});
});
