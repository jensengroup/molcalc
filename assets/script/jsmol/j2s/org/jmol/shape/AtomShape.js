Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.Shape"], "org.jmol.shape.AtomShape", ["java.util.Hashtable", "org.jmol.atomdata.RadiusData", "org.jmol.constant.EnumPalette", "org.jmol.util.ArrayUtil", "$.BitSet", "$.BitSetUtil", "$.Colix", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mads = null;
this.colixes = null;
this.paletteIDs = null;
this.bsSizeSet = null;
this.bsColixSet = null;
this.atomCount = 0;
this.atoms = null;
this.isActive = false;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "AtomShape", org.jmol.shape.Shape);
Clazz.overrideMethod (c$, "initModelSet", 
function () {
this.atoms = this.modelSet.atoms;
this.atomCount = this.modelSet.getAtomCount ();
if (this.mads != null) this.mads = org.jmol.util.ArrayUtil.arrayCopyShort (this.mads, this.atomCount);
if (this.colixes != null) this.colixes = org.jmol.util.ArrayUtil.arrayCopyShort (this.colixes, this.atomCount);
if (this.paletteIDs != null) this.paletteIDs = org.jmol.util.ArrayUtil.arrayCopyByte (this.paletteIDs, this.atomCount);
});
Clazz.defineMethod (c$, "getSize", 
function (atomIndex) {
return (this.mads == null ? 0 : this.mads[atomIndex]);
}, "~N");
Clazz.overrideMethod (c$, "setSize", 
function (size, bsSelected) {
if (size == 0) this.setSizeRD (null, bsSelected);
 else this.setSizeRD ( new org.jmol.atomdata.RadiusData (null, size, org.jmol.atomdata.RadiusData.EnumType.SCREEN, null), bsSelected);
}, "~N,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setSizeRD", 
function (rd, bsSelected) {
if (this.atoms == null) return;
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new org.jmol.util.BitSet ();
var isVisible = (rd != null && rd.value != 0);
var isAll = (bsSelected == null);
var i0 = (isAll ? this.atomCount - 1 : bsSelected.nextSetBit (0));
if (this.mads == null && i0 >= 0) this.mads =  Clazz.newShortArray (this.atomCount, 0);
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsSelected.nextSetBit (i + 1))) {
var atom = this.atoms[i];
this.mads[i] = atom.calculateMad (this.viewer, rd);
this.bsSizeSet.setBitTo (i, isVisible);
atom.setShapeVisibility (this.myVisibilityFlag, isVisible);
}
}, "org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("color" === propertyName) {
this.isActive = true;
var colix = org.jmol.util.Colix.getColixO (value);
var pid = org.jmol.constant.EnumPalette.pidOf (value);
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.setColixAndPalette (colix, pid, i);

return;
}if ("translucency" === propertyName) {
this.isActive = true;
var isTranslucent = (value.equals ("translucent"));
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (this.colixes == null) {
this.colixes =  Clazz.newShortArray (this.atomCount, 0);
this.paletteIDs =  Clazz.newByteArray (this.atomCount, 0);
}this.colixes[i] = org.jmol.util.Colix.getColixTranslucent3 (this.colixes[i], isTranslucent, this.translucentLevel);
if (isTranslucent) this.bsColixSet.set (i);
}
return;
}if (propertyName === "deleteModelAtoms") {
this.atoms = (value)[1];
var info = (value)[2];
this.atomCount = this.modelSet.getAtomCount ();
var firstAtomDeleted = info[1];
var nAtomsDeleted = info[2];
this.mads = org.jmol.util.ArrayUtil.deleteElements (this.mads, firstAtomDeleted, nAtomsDeleted);
this.colixes = org.jmol.util.ArrayUtil.deleteElements (this.colixes, firstAtomDeleted, nAtomsDeleted);
this.paletteIDs = org.jmol.util.ArrayUtil.deleteElements (this.paletteIDs, firstAtomDeleted, nAtomsDeleted);
org.jmol.util.BitSetUtil.deleteBits (this.bsSizeSet, bs);
org.jmol.util.BitSetUtil.deleteBits (this.bsColixSet, bs);
return;
}Clazz.superCall (this, org.jmol.shape.AtomShape, "setProperty", [propertyName, value, bs]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setColixAndPalette", 
function (colix, paletteID, atomIndex) {
if (this.colixes == null || atomIndex >= this.colixes.length) {
if (colix == 0) return;
this.colixes = org.jmol.util.ArrayUtil.ensureLengthShort (this.colixes, atomIndex + 1);
this.paletteIDs = org.jmol.util.ArrayUtil.ensureLengthByte (this.paletteIDs, atomIndex + 1);
}if (this.bsColixSet == null) this.bsColixSet = org.jmol.util.BitSet.newN (this.atomCount);
this.colixes[atomIndex] = colix = this.setColix (colix, paletteID, atomIndex);
this.bsColixSet.setBitTo (atomIndex, colix != 0);
this.paletteIDs[atomIndex] = paletteID;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "setModelClickability", 
function () {
if (!this.isActive) return;
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
if ((atom.getShapeVisibilityFlags () & this.myVisibilityFlag) == 0 || this.modelSet.isAtomHidden (i)) continue;
atom.setClickable (this.myVisibilityFlag);
}
});
Clazz.overrideMethod (c$, "getShapeState", 
function () {
if (!this.isActive) return "";
var temp =  new java.util.Hashtable ();
var temp2 =  new java.util.Hashtable ();
var type = org.jmol.viewer.JmolConstants.shapeClassBases[this.shapeID];
if (this.bsSizeSet != null) for (var i = this.bsSizeSet.nextSetBit (0); i >= 0; i = this.bsSizeSet.nextSetBit (i + 1)) org.jmol.shape.Shape.setStateInfo (temp, i, type + (this.mads[i] < 0 ? " on" : " " + this.mads[i] / 2000));

if (this.bsColixSet != null) for (var i = this.bsColixSet.nextSetBit (0); i >= 0; i = this.bsColixSet.nextSetBit (i + 1)) org.jmol.shape.Shape.setStateInfo (temp2, i, this.getColorCommand (type, this.paletteIDs[i], this.colixes[i]));

return org.jmol.shape.Shape.getShapeCommands (temp, temp2);
});
});
