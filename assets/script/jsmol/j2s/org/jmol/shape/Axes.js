Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.FontLineShape", "org.jmol.util.Point3f", "$.Vector3f"], "org.jmol.shape.Axes", ["java.lang.Boolean", "org.jmol.constant.EnumAxesMode", "org.jmol.util.Escape", "$.StringXBuilder", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.axisXY = null;
this.scale = 0;
this.fixedOrigin = null;
this.originPoint = null;
this.axisPoints = null;
this.labels = null;
this.ptTemp = null;
this.corner = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "Axes", org.jmol.shape.FontLineShape);
Clazz.prepareFields (c$, function () {
this.axisXY =  new org.jmol.util.Point3f ();
this.originPoint =  new org.jmol.util.Point3f ();
this.axisPoints =  new Array (6);
{
for (var i = 6; --i >= 0; ) this.axisPoints[i] =  new org.jmol.util.Point3f ();

}this.ptTemp =  new org.jmol.util.Point3f ();
this.corner =  new org.jmol.util.Vector3f ();
});
Clazz.defineMethod (c$, "getOriginPoint", 
function (isDataFrame) {
return (isDataFrame ? org.jmol.shape.Axes.pt0 : this.originPoint);
}, "~B");
Clazz.defineMethod (c$, "getAxisPoint", 
function (i, isDataFrame) {
if (!isDataFrame && this.axisXY.z == 0) return this.axisPoints[i];
this.ptTemp.setT (this.axisPoints[i]);
this.ptTemp.sub (this.originPoint);
this.ptTemp.scale (0.5);
return this.ptTemp;
}, "~N,~B");
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("position" === propertyName) {
this.axisXY = value;
return;
}if ("origin" === propertyName) {
if (value == null) {
this.fixedOrigin = null;
} else {
if (this.fixedOrigin == null) this.fixedOrigin =  new org.jmol.util.Point3f ();
this.fixedOrigin.setT (value);
}this.initShape ();
return;
}if ("labels" === propertyName) {
this.labels = value;
return;
}if ("labelsOn" === propertyName) {
this.labels = null;
return;
}if ("labelsOff" === propertyName) {
this.labels = ["", "", ""];
return;
}Clazz.superCall (this, org.jmol.shape.Axes, "setProperty", [propertyName, value, bs]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shape.Axes, "initShape", []);
this.myType = "axes";
this.font3d = this.gdata.getFont3D (14);
var axesMode = this.viewer.getAxesMode ();
if (this.fixedOrigin == null) this.originPoint.set (0, 0, 0);
 else this.originPoint.setT (this.fixedOrigin);
if (axesMode === org.jmol.constant.EnumAxesMode.UNITCELL && this.modelSet.getCellInfos () != null) {
var unitcell = this.viewer.getCurrentUnitCell ();
if (unitcell != null) {
var vectors = unitcell.getUnitCellVertices ();
var offset = unitcell.getCartesianOffset ();
if (this.fixedOrigin == null) {
this.originPoint.setT (offset);
} else {
offset = this.fixedOrigin;
}this.scale = this.viewer.getAxesScale () / 2;
this.axisPoints[0].scaleAdd2 (this.scale, vectors[4], offset);
this.axisPoints[1].scaleAdd2 (this.scale, vectors[2], offset);
this.axisPoints[2].scaleAdd2 (this.scale, vectors[1], offset);
return;
}} else if (axesMode === org.jmol.constant.EnumAxesMode.BOUNDBOX) {
if (this.fixedOrigin == null) this.originPoint.setT (this.viewer.getBoundBoxCenter ());
}this.setScale (this.viewer.getAxesScale () / 2);
});
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if (property === "axisPoints") return this.axisPoints;
if (property === "origin") return this.fixedOrigin;
if (property === "axesTypeXY") return (this.axisXY.z == 0 ? Boolean.FALSE : Boolean.TRUE);
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "setScale", 
function (scale) {
this.scale = scale;
this.corner.setT (this.viewer.getBoundBoxCornerVector ());
for (var i = 6; --i >= 0; ) {
var axisPoint = this.axisPoints[i];
axisPoint.setT (org.jmol.viewer.JmolConstants.unitAxisVectors[i]);
if (this.corner.x < 1.5) this.corner.x = 1.5;
if (this.corner.y < 1.5) this.corner.y = 1.5;
if (this.corner.z < 1.5) this.corner.z = 1.5;
if (this.axisXY.z == 0) {
axisPoint.x *= this.corner.x * scale;
axisPoint.y *= this.corner.y * scale;
axisPoint.z *= this.corner.z * scale;
}axisPoint.add (this.originPoint);
}
}, "~N");
Clazz.defineMethod (c$, "getShapeState", 
function () {
var sb =  new org.jmol.util.StringXBuilder ();
sb.append ("  axes scale ").appendF (this.viewer.getAxesScale ()).append (";\n");
if (this.fixedOrigin != null) sb.append ("  axes center ").append (org.jmol.util.Escape.escapePt (this.fixedOrigin)).append (";\n");
if (this.axisXY.z != 0) sb.append ("  axes position [").appendI (Clazz.floatToInt (this.axisXY.x)).append (" ").appendI (Clazz.floatToInt (this.axisXY.y)).append (" ").append (this.axisXY.z < 0 ? " %" : "").append ("];\n");
if (this.labels != null) {
sb.append ("  axes labels ");
for (var i = 0; i < this.labels.length; i++) if (this.labels[i] != null) sb.append (org.jmol.util.Escape.escapeStr (this.labels[i])).append (" ");

sb.append (";\n");
}return Clazz.superCall (this, org.jmol.shape.Axes, "getShapeState", []) + sb;
});
c$.pt0 = c$.prototype.pt0 =  new org.jmol.util.Point3f ();
Clazz.defineStatics (c$,
"MIN_AXIS_LEN", 1.5);
});
