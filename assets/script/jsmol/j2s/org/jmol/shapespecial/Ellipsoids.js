Clazz.declarePackage ("org.jmol.shapespecial");
Clazz.load (["org.jmol.shape.AtomShape", "java.util.Hashtable", "org.jmol.util.Point3f"], "org.jmol.shapespecial.Ellipsoids", ["org.jmol.util.ArrayUtil", "$.Colix", "$.Escape", "$.Matrix3f", "$.Quadric", "$.StringXBuilder", "$.Vector3f", "org.jmol.viewer.StateManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.htEllipsoids = null;
this.haveEllipsoids = false;
this.colixset = null;
this.paletteIDset = null;
this.madset = null;
this.ellipsoid = null;
this.iSelect = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.shapespecial, "Ellipsoids", org.jmol.shape.AtomShape);
Clazz.prepareFields (c$, function () {
this.htEllipsoids =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "getIndexFromName", 
function (thisID) {
return ((this.ellipsoid = this.htEllipsoids.get (thisID)) == null ? -1 : 1);
}, "~S");
Clazz.defineMethod (c$, "setSize", 
function (size, bsSelected) {
Clazz.superCall (this, org.jmol.shapespecial.Ellipsoids, "setSize", [size, bsSelected]);
this.checkSets ();
this.madset[this.iSelect] = this.mads;
for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) {
if (size != 0) this.atoms[i].scaleEllipsoid (size, this.iSelect);
var isVisible = (this.madset[0] != null && this.madset[0].length > i && this.madset[0][i] > 0 || this.madset[1] != null && this.madset[1].length > i && this.madset[1][i] > 0 || this.madset[2] != null && this.madset[2].length > i && this.madset[2][i] > 0);
this.bsSizeSet.setBitTo (i, isVisible);
this.atoms[i].setShapeVisibility (this.myVisibilityFlag, isVisible);
}
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if (propertyName === "thisID") {
this.ellipsoid = (value == null ? null : this.htEllipsoids.get (value));
if (value == null) return;
if (this.ellipsoid == null) {
var id = value;
this.ellipsoid =  new org.jmol.shapespecial.Ellipsoids.Ellipsoid (id, this.viewer.getCurrentModelIndex ());
this.htEllipsoids.put (id, this.ellipsoid);
this.haveEllipsoids = true;
}return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var e = this.htEllipsoids.values ().iterator ();
while (e.hasNext ()) {
var ellipsoid = e.next ();
if (ellipsoid.modelIndex > modelIndex) ellipsoid.modelIndex--;
 else if (ellipsoid.modelIndex == modelIndex) e.remove ();
}
this.haveEllipsoids = !this.htEllipsoids.isEmpty ();
this.ellipsoid = null;
return;
}if (this.ellipsoid != null) {
if ("delete" === propertyName) {
this.htEllipsoids.remove (this.ellipsoid.id);
this.haveEllipsoids = !this.htEllipsoids.isEmpty ();
return;
}if ("modelindex" === propertyName) {
this.ellipsoid.modelIndex = (value).intValue ();
return;
}if ("on" === propertyName) {
this.ellipsoid.isOn = (value).booleanValue ();
return;
}if ("axes" === propertyName) {
this.ellipsoid.isValid = false;
this.ellipsoid.axes = value;
this.ellipsoid.lengths =  Clazz.newFloatArray (3, 0);
this.ellipsoid.scale = 1;
for (var i = 0; i < 2; i++) {
if (this.ellipsoid.axes[i].length () > this.ellipsoid.axes[i + 1].length ()) {
var v = this.ellipsoid.axes[i];
this.ellipsoid.axes[i] = this.ellipsoid.axes[i + 1];
this.ellipsoid.axes[i + 1] = v;
if (i == 1) i = -1;
}}
for (var i = 0; i < 3; i++) {
this.ellipsoid.lengths[i] = this.ellipsoid.axes[i].length ();
if (this.ellipsoid.lengths[i] == 0) return;
this.ellipsoid.axes[i].normalize ();
}
if (Math.abs (this.ellipsoid.axes[0].dot (this.ellipsoid.axes[1])) > 0.0001 || Math.abs (this.ellipsoid.axes[0].dot (this.ellipsoid.axes[1])) > 0.0001 || Math.abs (this.ellipsoid.axes[0].dot (this.ellipsoid.axes[1])) > 0.0001) return;
this.updateEquation (this.ellipsoid);
return;
}if ("equation" === propertyName) {
this.ellipsoid.coef = value;
this.ellipsoid.axes =  new Array (3);
this.ellipsoid.lengths =  Clazz.newFloatArray (3, 0);
org.jmol.util.Quadric.getAxesForEllipsoid (this.ellipsoid.coef, this.ellipsoid.axes, this.ellipsoid.lengths);
return;
}if ("center" === propertyName) {
this.ellipsoid.center = value;
this.updateEquation (this.ellipsoid);
return;
}if ("scale" === propertyName) {
var scale = (value).floatValue ();
if (scale <= 0 || this.ellipsoid.lengths == null) {
this.ellipsoid.isValid = false;
} else {
for (var i = 0; i < 3; i++) this.ellipsoid.lengths[i] *= scale / this.ellipsoid.scale;

this.ellipsoid.scale = scale;
this.updateEquation (this.ellipsoid);
}return;
}if ("color" === propertyName) {
this.ellipsoid.colix = org.jmol.util.Colix.getColixO (value);
return;
}if ("translucentLevel" === propertyName) {
Clazz.superCall (this, org.jmol.shapespecial.Ellipsoids, "setProperty", [propertyName, value, bs]);
return;
}if ("translucency" === propertyName) {
var isTranslucent = (value.equals ("translucent"));
this.ellipsoid.colix = org.jmol.util.Colix.getColixTranslucent3 (this.ellipsoid.colix, isTranslucent, this.translucentLevel);
return;
}}if ("select" === propertyName) {
this.iSelect = (value).intValue () - 1;
this.checkSets ();
this.colixes = this.colixset[this.iSelect];
this.paletteIDs = this.paletteIDset[this.iSelect];
this.mads = this.madset[this.iSelect];
return;
}Clazz.superCall (this, org.jmol.shapespecial.Ellipsoids, "setProperty", [propertyName, value, bs]);
if (this.colixset != null) {
if ("color" === propertyName || "translucency" === propertyName || "deleteModelAtoms" === propertyName) {
this.colixset[this.iSelect] = this.colixes;
this.paletteIDset[this.iSelect] = this.paletteIDs;
this.madset[this.iSelect] = this.mads;
}}}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "checkSets", 
($fz = function () {
if (this.colixset == null) {
this.colixset = org.jmol.util.ArrayUtil.newShort2 (3);
this.paletteIDset = org.jmol.util.ArrayUtil.newByte2 (3);
this.madset = org.jmol.util.ArrayUtil.newShort2 (3);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "updateEquation", 
($fz = function (ellipsoid) {
if (ellipsoid.axes == null || ellipsoid.lengths == null) return;
var mat =  new org.jmol.util.Matrix3f ();
var mTemp =  new org.jmol.util.Matrix3f ();
var v1 =  new org.jmol.util.Vector3f ();
ellipsoid.coef =  Clazz.newDoubleArray (10, 0);
org.jmol.util.Quadric.getEquationForQuadricWithCenter (ellipsoid.center.x, ellipsoid.center.y, ellipsoid.center.z, mat, v1, mTemp, ellipsoid.coef, null);
ellipsoid.isValid = true;
}, $fz.isPrivate = true, $fz), "org.jmol.shapespecial.Ellipsoids.Ellipsoid");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var sb =  new org.jmol.util.StringXBuilder ();
this.getStateID (sb);
this.getStateAtoms (sb);
return sb.toString ();
});
Clazz.defineMethod (c$, "getStateID", 
($fz = function (sb) {
if (!this.haveEllipsoids) return;
var e = this.htEllipsoids.values ().iterator ();
var v1 =  new org.jmol.util.Vector3f ();
while (e.hasNext ()) {
var ellipsoid = e.next ();
if (ellipsoid.axes == null || ellipsoid.lengths == null) continue;
sb.append ("  Ellipsoid ID ").append (ellipsoid.id).append (" modelIndex ").appendI (ellipsoid.modelIndex).append (" center ").append (org.jmol.util.Escape.escapePt (ellipsoid.center)).append (" axes");
for (var i = 0; i < 3; i++) {
v1.setT (ellipsoid.axes[i]);
v1.scale (ellipsoid.lengths[i]);
sb.append (" ").append (org.jmol.util.Escape.escapePt (v1));
}
sb.append (" " + this.getColorCommandUnk ("", ellipsoid.colix));
if (!ellipsoid.isOn) sb.append (" off");
sb.append (";\n");
}
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder");
Clazz.defineMethod (c$, "getStateAtoms", 
($fz = function (sb) {
if (this.madset == null) return;
for (var ii = 0; ii < 3; ii++) {
if (this.madset[ii] == null) continue;
org.jmol.viewer.StateManager.appendCmd (sb, "Ellipsoids set " + (ii + 1) + "\n");
var temp =  new java.util.Hashtable ();
var temp2 =  new java.util.Hashtable ();
if (this.bsSizeSet != null) for (var i = this.bsSizeSet.nextSetBit (0); i >= 0; i = this.bsSizeSet.nextSetBit (i + 1)) org.jmol.shape.Shape.setStateInfo (temp, i, "Ellipsoids " + this.madset[ii][i]);

if (this.bsColixSet != null && this.colixset[ii] != null) for (var i = this.bsColixSet.nextSetBit (0); i >= 0; i = this.bsColixSet.nextSetBit (i + 1)) org.jmol.shape.Shape.setStateInfo (temp2, i, this.getColorCommand ("Ellipsoids", this.paletteIDset[ii][i], this.colixset[ii][i]));

sb.append (org.jmol.shape.Shape.getShapeCommands (temp, temp2));
}
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder");
Clazz.overrideMethod (c$, "setVisibilityFlags", 
function (bs) {
if (!this.haveEllipsoids) return;
var e = this.htEllipsoids.values ().iterator ();
while (e.hasNext ()) {
var ellipsoid = e.next ();
ellipsoid.visible = ellipsoid.isOn && (ellipsoid.modelIndex < 0 || bs.get (ellipsoid.modelIndex));
}
}, "org.jmol.util.BitSet");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.id = null;
this.axes = null;
this.lengths = null;
this.center = null;
this.coef = null;
this.colix = 23;
this.modelIndex = 0;
this.scale = 1;
this.visible = false;
this.isValid = false;
this.isOn = true;
Clazz.instantialize (this, arguments);
}, org.jmol.shapespecial.Ellipsoids, "Ellipsoid");
Clazz.prepareFields (c$, function () {
this.center = org.jmol.util.Point3f.new3 (0, 0, 0);
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.id = a;
this.modelIndex = b;
}, "~S,~N");
c$ = Clazz.p0p ();
});
