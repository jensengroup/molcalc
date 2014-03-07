Clazz.declarePackage ("org.jmol.shape");
Clazz.load (null, "org.jmol.shape.Shape", ["org.jmol.constant.EnumPalette", "org.jmol.util.Colix", "$.Logger", "org.jmol.viewer.JmolConstants", "$.StateManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.modelSet = null;
this.gdata = null;
this.shapeID = 0;
this.myVisibilityFlag = 0;
this.translucentLevel = 0;
this.translucentAllowed = true;
this.isBioShape = false;
this.xmlProperties = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "Shape");
Clazz.defineMethod (c$, "getViewer", 
function () {
return this.viewer;
});
Clazz.defineMethod (c$, "initializeShape", 
function (viewer, g3d, modelSet, shapeID) {
this.viewer = viewer;
this.gdata = g3d;
this.shapeID = shapeID;
this.myVisibilityFlag = org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (shapeID);
this.setModelSet (modelSet);
this.initShape ();
}, "org.jmol.viewer.Viewer,org.jmol.util.GData,org.jmol.modelset.ModelSet,~N");
Clazz.defineMethod (c$, "setModelSet", 
function (modelSet) {
this.modelSet = modelSet;
this.initModelSet ();
}, "org.jmol.modelset.ModelSet");
Clazz.defineMethod (c$, "initModelSet", 
function () {
});
Clazz.defineMethod (c$, "initShape", 
function () {
});
Clazz.defineMethod (c$, "merge", 
function (shape) {
}, "org.jmol.shape.Shape");
Clazz.defineMethod (c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
this.setXmlProperty ("size", (rd == null ? Integer.$valueOf (size) : rd), bsSelected);
if (rd == null) this.setSize (size, bsSelected);
 else this.setSizeRD (rd, bsSelected);
}, "~N,org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setSize", 
function (size, bsSelected) {
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setSizeRD", 
function (rd, bsSelected) {
}, "org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setShapeProperty", 
function (propertyName, value, bsSelected) {
if (!this.setXmlProperty (propertyName, value, bsSelected)) this.setProperty (propertyName, value, bsSelected == null ? this.viewer.getSelectionSet (false) : bsSelected);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setXmlProperty", 
($fz = function (propertyName, value, bs) {
var myType = org.jmol.viewer.JmolConstants.shapeClassBases[this.shapeID];
if (org.jmol.util.Logger.debuggingHigh && this.shapeID != 33) org.jmol.util.Logger.info (myType + " setProperty: " + propertyName + " = " + value);
return false;
}, $fz.isPrivate = true, $fz), "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (propertyName === "setProperties") {
var propertyList = value;
while (propertyList.size () > 0) {
var data = propertyList.remove (0);
this.setShapeProperty ((data[0]).intern (), data[1], null);
}
return;
}if (propertyName === "translucentLevel") {
this.translucentLevel = (value).floatValue ();
return;
}if (propertyName === "refreshTrajectories") {
return;
}org.jmol.util.Logger.warn ("unassigned " + org.jmol.viewer.JmolConstants.shapeClassBases[this.shapeID] + " + shape setProperty:" + propertyName + ":" + value);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getPropertyData", 
function (property, data) {
return false;
}, "~S,~A");
Clazz.defineMethod (c$, "getProperty", 
function (property, index) {
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "getIndexFromName", 
function (thisID) {
return -1;
}, "~S");
Clazz.defineMethod (c$, "wasClicked", 
function (x, y) {
return false;
}, "~N,~N");
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
}, "~N,~N,~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "checkBoundsMinMax", 
function (pointMin, pointMax) {
}, "org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setModelClickability", 
function () {
});
Clazz.defineMethod (c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible) {
return null;
}, "~N,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible) {
return false;
}, "~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "checkObjectDragged", 
function (prevX, prevY, x, y, modifiers, bsVisible) {
return false;
}, "~N,~N,~N,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "coordinateInRange", 
function (x, y, vertex, dmin2, ptXY) {
this.viewer.transformPtScr (vertex, ptXY);
var d2 = (x - ptXY.x) * (x - ptXY.x) + (y - ptXY.y) * (y - ptXY.y);
return (d2 < dmin2 ? d2 : -1);
}, "~N,~N,org.jmol.util.Point3f,~N,org.jmol.util.Point3i");
Clazz.defineMethod (c$, "setColix", 
function (colix, paletteID, atomIndex) {
return this.setColixA (colix, paletteID, this.modelSet.atoms[atomIndex]);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setColixA", 
function (colix, paletteID, atom) {
return (colix == 2 ? this.viewer.getColixAtomPalette (atom, paletteID) : colix);
}, "~N,~N,org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "setColixB", 
function (colix, pid, bond) {
return (colix == 2 ? this.viewer.getColixBondPalette (bond, pid) : colix);
}, "~N,~N,org.jmol.modelset.Bond");
Clazz.defineMethod (c$, "getShapeDetail", 
function () {
return null;
});
Clazz.defineMethod (c$, "getShapeState", 
function () {
return null;
});
Clazz.defineMethod (c$, "setVisibilityFlags", 
function (bs) {
}, "org.jmol.util.BitSet");
c$.setStateInfo = Clazz.defineMethod (c$, "setStateInfo", 
function (ht, i, key) {
org.jmol.shape.Shape.setStateInfo (ht, i, i, key);
}, "java.util.Map,~N,~S");
c$.setStateInfo = Clazz.defineMethod (c$, "setStateInfo", 
function (ht, i1, i2, key) {
org.jmol.viewer.StateManager.setStateInfo (ht, i1, i2, key);
}, "java.util.Map,~N,~N,~S");
c$.getShapeCommands = Clazz.defineMethod (c$, "getShapeCommands", 
function (htDefine, htMore) {
return org.jmol.viewer.StateManager.getCommands (htDefine, htMore, "select");
}, "java.util.Map,java.util.Map");
c$.getShapeCommandsSel = Clazz.defineMethod (c$, "getShapeCommandsSel", 
function (htDefine, htMore, selectCmd) {
return org.jmol.viewer.StateManager.getCommands (htDefine, htMore, selectCmd);
}, "java.util.Map,java.util.Map,~S");
c$.appendCmd = Clazz.defineMethod (c$, "appendCmd", 
function (s, cmd) {
org.jmol.viewer.StateManager.appendCmd (s, cmd);
}, "org.jmol.util.StringXBuilder,~S");
c$.getFontCommand = Clazz.defineMethod (c$, "getFontCommand", 
function (type, font) {
if (font == null) return "";
return "font " + type + " " + font.fontSizeNominal + " " + font.fontFace + " " + font.fontStyle;
}, "~S,org.jmol.util.JmolFont");
Clazz.defineMethod (c$, "getColorCommandUnk", 
function (type, colix) {
return this.getColorCommand (type, org.jmol.constant.EnumPalette.UNKNOWN.id, colix);
}, "~S,~N");
Clazz.defineMethod (c$, "getColorCommand", 
function (type, pid, colix) {
if (pid == org.jmol.constant.EnumPalette.UNKNOWN.id && colix == 0) return "";
return "color " + type + " " + org.jmol.shape.Shape.encodeTransColor (pid, colix, this.translucentAllowed);
}, "~S,~N,~N");
c$.encodeTransColor = Clazz.defineMethod (c$, "encodeTransColor", 
($fz = function (pid, colix, translucentAllowed) {
if (pid == org.jmol.constant.EnumPalette.UNKNOWN.id && colix == 0) return "";
return (translucentAllowed ? org.jmol.shape.Shape.getTranslucentLabel (colix) + " " : "") + (pid != org.jmol.constant.EnumPalette.UNKNOWN.id && !org.jmol.constant.EnumPalette.isPaletteVariable (pid) ? org.jmol.constant.EnumPalette.getPaletteName (pid) : org.jmol.shape.Shape.encodeColor (colix));
}, $fz.isPrivate = true, $fz), "~N,~N,~B");
c$.encodeColor = Clazz.defineMethod (c$, "encodeColor", 
function (colix) {
return (org.jmol.util.Colix.isColixColorInherited (colix) ? "none" : org.jmol.util.Colix.getHexCode (colix));
}, "~N");
c$.getTranslucentLabel = Clazz.defineMethod (c$, "getTranslucentLabel", 
function (colix) {
return (org.jmol.util.Colix.isColixTranslucent (colix) ? "translucent " + org.jmol.util.Colix.getColixTranslucencyFractional (colix) : "opaque");
}, "~N");
c$.getColix = Clazz.defineMethod (c$, "getColix", 
function (colixes, i, atom) {
return org.jmol.util.Colix.getColixInherited ((colixes == null || i >= colixes.length ? 0 : colixes[i]), atom.getColix ());
}, "~A,~N,org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "getSize", 
function (atomIndex) {
return 0;
}, "~N");
Clazz.defineMethod (c$, "getSize", 
function (group) {
return 0;
}, "org.jmol.modelset.Group");
Clazz.defineStatics (c$,
"RADIUS_MAX", 4);
});
