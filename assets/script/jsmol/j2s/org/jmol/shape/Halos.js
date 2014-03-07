Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.AtomShape"], "org.jmol.shape.Halos", ["org.jmol.util.BitSetUtil", "$.Colix", "$.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.colixSelection = 2;
this.bsHighlight = null;
this.colixHighlight = 10;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "Halos", org.jmol.shape.AtomShape);
Clazz.defineMethod (c$, "initState", 
function () {
org.jmol.util.Logger.debug ("init halos");
this.translucentAllowed = false;
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("translucency" === propertyName) return;
if ("argbSelection" === propertyName) {
this.colixSelection = org.jmol.util.Colix.getColix ((value).intValue ());
return;
}if ("argbHighlight" === propertyName) {
this.colixHighlight = org.jmol.util.Colix.getColix ((value).intValue ());
return;
}if ("highlight" === propertyName) {
this.bsHighlight = value;
return;
}if (propertyName === "deleteModelAtoms") {
org.jmol.util.BitSetUtil.deleteBits (this.bsHighlight, bs);
}Clazz.superCall (this, org.jmol.shape.Halos, "setProperty", [propertyName, value, bs]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setVisibilityFlags", 
function (bs) {
var bsSelected = (this.viewer.getSelectionHaloEnabled (false) ? this.viewer.getSelectionSet (false) : null);
for (var i = this.atomCount; --i >= 0; ) {
var isVisible = bsSelected != null && bsSelected.get (i) || (this.mads != null && this.mads[i] != 0);
this.atoms[i].setShapeVisibility (this.myVisibilityFlag, isVisible);
}
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getShapeState", 
function () {
var state = Clazz.superCall (this, org.jmol.shape.Halos, "getShapeState", []) + (this.colixSelection == 2 ? "" : this.colixSelection == 0 ? "  color SelectionHalos NONE;\n" : this.getColorCommandUnk ("selectionHalos", this.colixSelection) + ";\n");
if (this.bsHighlight != null) state += "  set highlight " + org.jmol.util.Escape.escape (this.bsHighlight) + "; " + this.getColorCommandUnk ("highlight", this.colixHighlight) + ";\n";
return state;
});
});
