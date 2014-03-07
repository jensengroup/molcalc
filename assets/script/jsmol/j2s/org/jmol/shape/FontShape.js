Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.Shape"], "org.jmol.shape.FontShape", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.font3d = null;
this.myType = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "FontShape", org.jmol.shape.Shape);
Clazz.overrideMethod (c$, "initShape", 
function () {
this.translucentAllowed = false;
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("font" === propertyName) {
this.font3d = value;
return;
}}, "~S,~O,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var s = this.viewer.getObjectState (this.myType);
var fcmd = org.jmol.shape.Shape.getFontCommand (this.myType, this.font3d);
if (fcmd.length > 0) fcmd = "  " + fcmd + ";\n";
return (s.length < 3 ? "" : s + fcmd);
});
});
