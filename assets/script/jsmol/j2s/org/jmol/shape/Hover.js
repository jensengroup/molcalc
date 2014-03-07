Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.TextShape"], "org.jmol.shape.Hover", ["java.util.Hashtable", "org.jmol.shape.Text", "org.jmol.util.ArrayUtil", "$.Colix", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hoverText = null;
this.atomIndex = -1;
this.xy = null;
this.text = null;
this.labelFormat = "%U";
this.atomFormats = null;
this.specialLabel = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "Hover", org.jmol.shape.TextShape);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shape.Hover, "initShape", []);
this.isHover = true;
var font3d = this.gdata.getFont3DFSS ("SansSerif", "Plain", 12);
var bgcolix = org.jmol.util.Colix.getColixS ("#FFFFC3");
var colix = 4;
this.currentObject = this.hoverText = org.jmol.shape.Text.newLabel (this.gdata, font3d, null, colix, bgcolix, 0, 0, 1, -2147483648, 1, 0);
this.hoverText.setAdjustForWindow (true);
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if ("target" === propertyName) {
if (value == null) this.atomIndex = -1;
 else {
this.atomIndex = (value).intValue ();
}return;
}if ("text" === propertyName) {
this.text = value;
if (this.text != null && this.text.length == 0) this.text = null;
return;
}if ("specialLabel" === propertyName) {
this.specialLabel = value;
return;
}if ("atomLabel" === propertyName) {
var text = value;
if (text != null && text.length == 0) text = null;
var count = this.viewer.getAtomCount ();
if (this.atomFormats == null || this.atomFormats.length < count) this.atomFormats =  new Array (count);
for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) this.atomFormats[i] = text;

return;
}if ("xy" === propertyName) {
this.xy = value;
return;
}if ("label" === propertyName) {
this.labelFormat = value;
if (this.labelFormat != null && this.labelFormat.length == 0) this.labelFormat = null;
return;
}if (propertyName === "deleteModelAtoms") {
if (this.atomFormats != null) {
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
this.atomFormats = org.jmol.util.ArrayUtil.deleteElements (this.atomFormats, firstAtomDeleted, nAtomsDeleted);
}this.atomIndex = -1;
return;
}Clazz.superCall (this, org.jmol.shape.Hover, "setProperty", [propertyName, value, null]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var temp =  new java.util.Hashtable ();
if (this.atomFormats != null) for (var i = this.viewer.getAtomCount (); --i >= 0; ) if (this.atomFormats[i] != null) org.jmol.shape.Shape.setStateInfo (temp, i, "set hoverLabel " + org.jmol.util.Escape.escapeStr (this.atomFormats[i]));

return "\n  hover " + org.jmol.util.Escape.escapeStr ((this.labelFormat == null ? "" : this.labelFormat)) + ";\n" + org.jmol.shape.Shape.getShapeCommands (temp, null);
});
Clazz.defineStatics (c$,
"FONTFACE", "SansSerif",
"FONTSTYLE", "Plain",
"FONTSIZE", 12);
});
