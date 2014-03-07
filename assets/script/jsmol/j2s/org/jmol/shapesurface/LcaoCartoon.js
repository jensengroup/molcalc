Clazz.declarePackage ("org.jmol.shapesurface");
Clazz.load (["org.jmol.shapesurface.Isosurface"], "org.jmol.shapesurface.LcaoCartoon", ["java.lang.Float", "org.jmol.util.Colix", "$.Escape", "$.StringXBuilder", "$.TextFormat", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thisType = null;
this.myColorPt = 0;
this.lcaoID = null;
this.thisSet = null;
this.isMolecular = false;
this.rotationAxis = null;
this.lcaoScale = null;
this.isTranslucent = false;
this.$translucentLevel = 0;
this.lcaoColorPos = null;
this.lcaoColorNeg = null;
this.isLonePair = false;
this.isRadical = false;
this.cappingObject = null;
this.slabbingObject = null;
this.fullCommand = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shapesurface, "LcaoCartoon", org.jmol.shapesurface.Isosurface);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "initShape", []);
this.myType = "lcaoCartoon";
this.allowMesh = false;
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
var setInfo = false;
if ("init" === propertyName) {
this.myColorPt = 0;
this.lcaoID = null;
this.thisSet = bs;
this.isMolecular = this.isLonePair = this.isRadical = false;
this.thisType = null;
this.rotationAxis = null;
this.fullCommand = value;
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["init", null, null]);
return;
}if ("lcaoID" === propertyName) {
this.lcaoID = value;
return;
}if ("thisID" === propertyName) {
this.lcaoID = value;
}if ("selectType" === propertyName) {
this.thisType = value;
return;
}if ("rotationAxis" === propertyName) {
this.rotationAxis = value;
return;
}if ("scale" === propertyName) {
this.lcaoScale = value;
}if ("colorRGB" === propertyName) {
this.lcaoColorPos = value;
if (this.myColorPt++ == 0) this.lcaoColorNeg = this.lcaoColorPos;
}if ("select" === propertyName) {
this.thisSet = value;
}if ("translucentLevel" === propertyName) {
this.$translucentLevel = (value).floatValue ();
}if ("settranslucency" === propertyName) {
this.isTranslucent = ((value).equals ("translucent"));
return;
}if ("translucency" === propertyName) {
this.isTranslucent = ((value).equals ("translucent"));
if (this.lcaoID == null) return;
}if ("molecular" === propertyName) {
this.isMolecular = true;
if (value == null) return;
propertyName = "create";
}if ("create" === propertyName) {
this.myColorPt = 0;
this.thisType = value;
this.createLcaoCartoon ();
return;
}if ("lonePair" === propertyName) {
this.isLonePair = true;
return;
}if ("lp" === propertyName) {
this.isLonePair = setInfo = true;
}if ("radical" === propertyName) {
this.isRadical = true;
return;
}if ("rad" === propertyName) {
this.isRadical = setInfo = true;
}if ("delete" === propertyName) {
this.deleteLcaoCartoon ();
return;
}if ("on" === propertyName) {
this.setLcaoOn (true);
return;
}if ("off" === propertyName) {
this.setLcaoOn (false);
return;
}if ("slab" === propertyName) {
this.slabbingObject = value;
}if ("cap" === propertyName) {
this.cappingObject = value;
}if ("lobe" === propertyName || "sphere" === propertyName) {
this.getCapSlabInfo (this.fullCommand);
}Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", [propertyName, value, bs]);
if (setInfo || "lobe" === propertyName || "sphere" === propertyName) {
this.setScriptInfo (null);
}}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setLcaoOn", 
($fz = function (TF) {
if (org.jmol.util.TextFormat.isWild (this.lcaoID)) {
var key = this.lcaoID.toLowerCase ();
for (var i = this.meshCount; --i >= 0; ) {
if (org.jmol.util.TextFormat.isMatch (this.meshes[i].thisID.toLowerCase (), key, true, true)) this.meshes[i].visible = TF;
}
return;
}var atomCount = this.viewer.getAtomCount ();
for (var i = atomCount; --i >= 0; ) if (this.lcaoID != null || this.thisSet.get (i)) this.setLcaoOn (i, TF);

}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "setLcaoOn", 
($fz = function (iAtom, TF) {
var id = this.getID (this.lcaoID, iAtom);
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].thisID.indexOf (id) == 0) this.meshes[i].visible = TF;

}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "deleteLcaoCartoon", 
($fz = function () {
if (org.jmol.util.TextFormat.isWild (this.lcaoID)) {
this.deleteMeshKey (this.lcaoID);
return;
}var atomCount = this.viewer.getAtomCount ();
for (var i = atomCount; --i >= 0; ) if (this.lcaoID != null || this.thisSet.get (i)) this.deleteLcaoCartoon (i);

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "deleteLcaoCartoon", 
($fz = function (iAtom) {
var id = this.getID (this.lcaoID, iAtom);
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].thisID.indexOf (id) == 0) this.deleteMeshI (i);

}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "createLcaoCartoon", 
($fz = function () {
this.isMolecular = (this.isMolecular && (this.thisType.indexOf ("px") >= 0 || this.thisType.indexOf ("py") >= 0 || this.thisType.indexOf ("pz") >= 0));
var lcaoID0 = this.lcaoID;
for (var i = this.thisSet.nextSetBit (0); i >= 0; i = this.thisSet.nextSetBit (i + 1)) {
this.createLcaoCartoon (i);
this.lcaoID = lcaoID0;
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createLcaoCartoon", 
($fz = function (iAtom) {
var id = this.getID (this.lcaoID, iAtom);
var isCpk = (this.thisType.equals ("cpk"));
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].thisID.indexOf (id) == 0) this.deleteMeshI (i);

Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["init", null, null]);
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["thisID", id, null]);
if (this.lcaoScale != null) Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["scale", this.lcaoScale, null]);
if (isCpk) {
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["colorRGB", Integer.$valueOf (this.viewer.getAtomArgb (iAtom)), null]);
} else if (this.lcaoColorNeg != null) {
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["colorRGB", this.lcaoColorNeg, null]);
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["colorRGB", this.lcaoColorPos, null]);
}if (this.slabbingObject != null) Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["slab", this.slabbingObject, null]);
if (this.cappingObject != null) Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["cap", this.cappingObject, null]);
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["lcaoType", this.thisType, null]);
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["atomIndex", Integer.$valueOf (iAtom), null]);
var axes = [ new org.jmol.util.Vector3f (),  new org.jmol.util.Vector3f (), org.jmol.util.Vector3f.newV (this.modelSet.atoms[iAtom]),  new org.jmol.util.Vector3f ()];
if (this.rotationAxis != null) axes[3].setT (this.rotationAxis);
if (this.isMolecular) {
if (this.thisType.indexOf ("px") >= 0) {
axes[0].set (0, -1, 0);
axes[1].set (1, 0, 0);
} else if (this.thisType.indexOf ("py") >= 0) {
axes[0].set (-1, 0, 0);
axes[1].set (0, 0, 1);
} else if (this.thisType.indexOf ("pz") >= 0) {
axes[0].set (0, 0, 1);
axes[1].set (1, 0, 0);
}if (this.thisType.indexOf ("-") == 0) axes[0].scale (-1);
}if (this.isMolecular || isCpk || this.thisType.equalsIgnoreCase ("s") || this.viewer.getHybridizationAndAxes (iAtom, axes[0], axes[1], this.thisType) != null) {
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", [(this.isRadical ? "radical" : this.isLonePair ? "lonePair" : "lcaoCartoon"), axes, null]);
}if (isCpk) {
var colix = this.viewer.getModelSet ().getAtomColix (iAtom);
if (org.jmol.util.Colix.isColixTranslucent (colix)) {
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["translucentLevel",  new Float (org.jmol.util.Colix.getColixTranslucencyLevel (colix)), null]);
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "setProperty", ["translucency", "translucent", null]);
}} else if (this.isTranslucent) for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].thisID.indexOf (id) == 0) this.meshes[i].setTranslucent (true, this.$translucentLevel);

}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getID", 
($fz = function (id, i) {
return (id != null ? id : (this.isLonePair || this.isRadical ? "lp_" : "lcao_") + (i + 1) + "_") + (this.thisType == null ? "" : org.jmol.util.TextFormat.simpleReplace (this.thisType, "-", (this.thisType.indexOf ("-p") == 0 ? "" : "_")));
}, $fz.isPrivate = true, $fz), "~S,~N");
Clazz.defineMethod (c$, "getShapeState", 
function () {
var sb =  new org.jmol.util.StringXBuilder ();
if (this.lcaoScale != null) org.jmol.shape.Shape.appendCmd (sb, "lcaoCartoon scale " + this.lcaoScale.floatValue ());
if (this.lcaoColorNeg != null) org.jmol.shape.Shape.appendCmd (sb, "lcaoCartoon color " + org.jmol.util.Escape.escapeColor (this.lcaoColorNeg.intValue ()) + " " + org.jmol.util.Escape.escapeColor (this.lcaoColorPos.intValue ()));
if (this.isTranslucent) org.jmol.shape.Shape.appendCmd (sb, "lcaoCartoon translucent " + this.$translucentLevel);
for (var i = this.meshCount; --i >= 0; ) if (!this.meshes[i].visible) org.jmol.shape.Shape.appendCmd (sb, "lcaoCartoon ID " + this.meshes[i].thisID + " off");

return Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "getShapeState", []) + sb.toString ();
});
Clazz.defineMethod (c$, "merge", 
function (shape) {
var lc = shape;
this.lcaoScale = lc.lcaoScale;
this.lcaoColorNeg = lc.lcaoColorNeg;
this.isTranslucent = lc.isTranslucent;
Clazz.superCall (this, org.jmol.shapesurface.LcaoCartoon, "merge", [shape]);
}, "org.jmol.shape.Shape");
});
