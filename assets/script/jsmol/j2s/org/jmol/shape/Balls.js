Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.AtomShape"], "org.jmol.shape.Balls", ["java.util.Hashtable", "org.jmol.constant.EnumPalette", "org.jmol.util.BitSet", "$.Colix"], function () {
c$ = Clazz.declareType (org.jmol.shape, "Balls", org.jmol.shape.AtomShape);
Clazz.overrideMethod (c$, "setSizeRD", 
function (rd, bsSelected) {
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new org.jmol.util.BitSet ();
var bsLength = Math.min (this.atoms.length, bsSelected.length ());
for (var i = bsSelected.nextSetBit (0); i >= 0 && i < bsLength; i = bsSelected.nextSetBit (i + 1)) {
var atom = this.atoms[i];
atom.setMadAtom (this.viewer, rd);
this.bsSizeSet.set (i);
}
}, "org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("color" === propertyName) {
var colix = org.jmol.util.Colix.getColixO (value);
if (colix == 0) colix = 2;
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
var pid = org.jmol.constant.EnumPalette.pidOf (value);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var atom = this.atoms[i];
atom.setColixAtom (this.setColixA (colix, pid, atom));
this.bsColixSet.setBitTo (i, colix != 2 || pid != org.jmol.constant.EnumPalette.NONE.id);
atom.setPaletteID (pid);
}
return;
}if ("colorValues" === propertyName) {
var values = value;
if (values.length == 0) return;
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
var n = 0;
var color = null;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (n >= values.length) return;
color = Integer.$valueOf (values[n++]);
var colix = org.jmol.util.Colix.getColixO (color);
if (colix == 0) colix = 2;
var pid = org.jmol.constant.EnumPalette.pidOf (color);
var atom = this.atoms[i];
atom.setColixAtom (this.setColixA (colix, pid, atom));
this.bsColixSet.setBitTo (i, colix != 2 || pid != org.jmol.constant.EnumPalette.NONE.id);
atom.setPaletteID (pid);
}
return;
}if ("translucency" === propertyName) {
var isTranslucent = ((value).equals ("translucent"));
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
this.atoms[i].setTranslucent (isTranslucent, this.translucentLevel);
if (isTranslucent) this.bsColixSet.set (i);
}
return;
}Clazz.superCall (this, org.jmol.shape.Balls, "setProperty", [propertyName, value, bs]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setModelClickability", 
function () {
var bsDeleted = this.viewer.getDeletedAtoms ();
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
atom.setClickable (0);
if (bsDeleted != null && bsDeleted.get (i) || (atom.getShapeVisibilityFlags () & this.myVisibilityFlag) == 0 || this.modelSet.isAtomHidden (i)) continue;
atom.setClickable (this.myVisibilityFlag);
}
});
Clazz.overrideMethod (c$, "setVisibilityFlags", 
function (bs) {
var showHydrogens = this.viewer.getShowHydrogens ();
var bsDeleted = this.viewer.getDeletedAtoms ();
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
var flag = atom.getShapeVisibilityFlags ();
flag &= (-2 & ~this.myVisibilityFlag);
atom.setShapeVisibilityFlags (flag);
if (bsDeleted != null && bsDeleted.get (i) || !showHydrogens && atom.getElementNumber () == 1) continue;
var modelIndex = atom.getModelIndex ();
if (bs.get (modelIndex)) {
atom.setShapeVisibility (1, true);
if (atom.madAtom != 0 && !this.modelSet.isAtomHidden (i)) atom.setShapeVisibility (this.myVisibilityFlag, true);
}}
}, "org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var temp =  new java.util.Hashtable ();
var r = 0;
for (var i = 0; i < this.atomCount; i++) {
if (this.bsSizeSet != null && this.bsSizeSet.get (i)) {
if ((r = this.atoms[i].madAtom) < 0) org.jmol.shape.Shape.setStateInfo (temp, i, "Spacefill on");
 else org.jmol.shape.Shape.setStateInfo (temp, i, "Spacefill " + (r / 2000));
}if (this.bsColixSet != null && this.bsColixSet.get (i)) {
var pid = this.atoms[i].getPaletteID ();
if (pid != org.jmol.constant.EnumPalette.CPK.id || this.atoms[i].isTranslucent ()) org.jmol.shape.Shape.setStateInfo (temp, i, this.getColorCommand ("atoms", pid, this.atoms[i].getColix ()));
}}
return org.jmol.shape.Shape.getShapeCommands (temp, null);
});
});
