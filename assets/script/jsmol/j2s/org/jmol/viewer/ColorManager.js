Clazz.declarePackage ("org.jmol.viewer");
Clazz.load (["org.jmol.util.ColorEncoder"], "org.jmol.viewer.ColorManager", ["java.lang.Float", "org.jmol.constant.EnumPalette", "org.jmol.util.ArrayUtil", "$.Colix", "$.ColorUtil", "$.Elements", "$.Logger", "$.StringXBuilder", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.propertyColorEncoder = null;
this.viewer = null;
this.g3d = null;
this.argbsCpk = null;
this.altArgbsCpk = null;
this.colorData = null;
this.isDefaultColorRasmol = false;
this.colixRubberband = 22;
this.colixBackgroundContrast = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.viewer, "ColorManager");
Clazz.prepareFields (c$, function () {
this.propertyColorEncoder =  new org.jmol.util.ColorEncoder (null);
});
Clazz.makeConstructor (c$, 
function (viewer, gdata) {
this.viewer = viewer;
this.g3d = gdata;
this.argbsCpk = org.jmol.constant.EnumPalette.argbsCpk;
this.altArgbsCpk = org.jmol.util.ArrayUtil.arrayCopyRangeI (org.jmol.viewer.JmolConstants.altArgbsCpk, 0, -1);
}, "org.jmol.viewer.Viewer,org.jmol.util.GData");
Clazz.defineMethod (c$, "clear", 
function () {
});
Clazz.defineMethod (c$, "getDefaultColorRasmol", 
function () {
return this.isDefaultColorRasmol;
});
Clazz.defineMethod (c$, "resetElementColors", 
function () {
this.setDefaultColors (false);
});
Clazz.defineMethod (c$, "setDefaultColors", 
function (isRasmol) {
if (isRasmol) {
this.isDefaultColorRasmol = true;
this.argbsCpk = org.jmol.util.ArrayUtil.arrayCopyI (org.jmol.util.ColorEncoder.getRasmolScale (), -1);
} else {
this.isDefaultColorRasmol = false;
this.argbsCpk = org.jmol.constant.EnumPalette.argbsCpk;
}this.altArgbsCpk = org.jmol.util.ArrayUtil.arrayCopyRangeI (org.jmol.viewer.JmolConstants.altArgbsCpk, 0, -1);
this.propertyColorEncoder.createColorScheme ((isRasmol ? "Rasmol=" : "Jmol="), true, true);
for (var i = org.jmol.constant.EnumPalette.argbsCpk.length; --i >= 0; ) this.g3d.changeColixArgb (i, this.argbsCpk[i]);

for (var i = org.jmol.viewer.JmolConstants.altArgbsCpk.length; --i >= 0; ) this.g3d.changeColixArgb ((org.jmol.util.Elements.elementNumberMax + i), this.altArgbsCpk[i]);

}, "~B");
Clazz.defineMethod (c$, "setRubberbandArgb", 
function (argb) {
this.colixRubberband = (argb == 0 ? 0 : org.jmol.util.Colix.getColix (argb));
}, "~N");
Clazz.defineMethod (c$, "setColixBackgroundContrast", 
function (argb) {
this.colixBackgroundContrast = ((org.jmol.util.ColorUtil.calcGreyscaleRgbFromRgb (argb) & 0xFF) < 128 ? 8 : 4);
}, "~N");
Clazz.defineMethod (c$, "getColixBondPalette", 
function (bond, pid) {
var argb = 0;
switch (pid) {
case 19:
return this.propertyColorEncoder.getColorIndexFromPalette (bond.getEnergy (), -2.5, -0.5, 7, false);
}
return (argb == 0 ? 10 : org.jmol.util.Colix.getColix (argb));
}, "org.jmol.modelset.Bond,~N");
Clazz.defineMethod (c$, "getColixAtomPalette", 
function (atom, pid) {
var argb = 0;
var index;
var id;
var modelSet;
var modelIndex;
var lo;
var hi;
switch (pid) {
case 84:
return (this.colorData == null || atom.index >= this.colorData.length ? 12 : this.getColixForPropertyValue (this.colorData[atom.index]));
case 0:
case 1:
id = atom.getAtomicAndIsotopeNumber ();
if (id < org.jmol.util.Elements.elementNumberMax) return this.g3d.getChangeableColix (id, this.argbsCpk[id]);
id = org.jmol.util.Elements.altElementIndexFromNumber (id);
return this.g3d.getChangeableColix ((org.jmol.util.Elements.elementNumberMax + id), this.altArgbsCpk[id]);
case 2:
index = org.jmol.util.ColorEncoder.quantize (atom.getPartialCharge (), -1, 1, 31);
return this.g3d.getChangeableColix ((org.jmol.viewer.JmolConstants.PARTIAL_CHARGE_COLIX_RED + index), org.jmol.viewer.JmolConstants.argbsRwbScale[index]);
case 3:
index = atom.getFormalCharge () - -4;
return this.g3d.getChangeableColix ((org.jmol.viewer.JmolConstants.FORMAL_CHARGE_COLIX_RED + index), org.jmol.viewer.JmolConstants.argbsFormalCharge[index]);
case 68:
case 5:
if (pid == 68) {
modelSet = this.viewer.getModelSet ();
lo = modelSet.getBfactor100Lo ();
hi = modelSet.getBfactor100Hi ();
} else {
lo = 0;
hi = 10000;
}return this.propertyColorEncoder.getColorIndexFromPalette (atom.getBfactor100 (), lo, hi, 7, false);
case 86:
return this.propertyColorEncoder.getColorIndexFromPalette (atom.getGroupParameter (1112539148), -1, 1, 7, false);
case 70:
hi = this.viewer.getSurfaceDistanceMax ();
return this.propertyColorEncoder.getColorIndexFromPalette (atom.getSurfaceDistance100 (), 0, hi, 7, false);
case 8:
return this.propertyColorEncoder.getColorIndexFromPalette (atom.getGroupID (), 0, 0, 5, false);
case 9:
return this.propertyColorEncoder.getColorIndexFromPalette (atom.getGroupID (), 0, 0, 4, false);
case 75:
return this.propertyColorEncoder.getColorIndexFromPalette (atom.getSelectedGroupIndexWithinChain (), 0, atom.getSelectedGroupCountWithinChain () - 1, 1, false);
case 87:
var m = this.viewer.getModelSet ().getModels ()[atom.modelIndex];
return this.propertyColorEncoder.getColorIndexFromPalette (atom.getPolymerIndexInModel (), 0, m.getBioPolymerCount () - 1, 1, false);
case 76:
return this.propertyColorEncoder.getColorIndexFromPalette (atom.getSelectedMonomerIndexWithinPolymer (), 0, atom.getSelectedMonomerCountWithinPolymer () - 1, 1, false);
case 77:
modelSet = this.viewer.getModelSet ();
return this.propertyColorEncoder.getColorIndexFromPalette (modelSet.getMoleculeIndex (atom.getIndex (), true), 0, modelSet.getMoleculeCountInModel (atom.getModelIndex ()) - 1, 0, false);
case 14:
modelSet = this.viewer.getModelSet ();
modelIndex = atom.getModelIndex ();
return this.propertyColorEncoder.getColorIndexFromPalette (modelSet.getAltLocIndexInModel (modelIndex, atom.getAlternateLocationID ()), 0, modelSet.getAltLocCountInModel (modelIndex), 0, false);
case 15:
modelSet = this.viewer.getModelSet ();
modelIndex = atom.getModelIndex ();
return this.propertyColorEncoder.getColorIndexFromPalette (modelSet.getInsertionCodeIndexInModel (modelIndex, atom.getInsertionCode ()), 0, modelSet.getInsertionCountInModel (modelIndex), 0, false);
case 16:
id = atom.getAtomicAndIsotopeNumber ();
argb = this.getJmolOrRasmolArgb (id, 1073741992);
break;
case 17:
id = atom.getAtomicAndIsotopeNumber ();
argb = this.getJmolOrRasmolArgb (id, 1073742116);
break;
case 7:
argb = atom.getProteinStructureSubType ().getColor ();
break;
case 10:
var chain = (atom.getChainID ()).charCodeAt (0) & 0x1F;
if (chain < 0) chain = 0;
if (chain >= org.jmol.viewer.JmolConstants.argbsChainAtom.length) chain = chain % org.jmol.viewer.JmolConstants.argbsChainAtom.length;
argb = (atom.isHetero () ? org.jmol.viewer.JmolConstants.argbsChainHetero : org.jmol.viewer.JmolConstants.argbsChainAtom)[chain];
break;
}
return (argb == 0 ? 22 : org.jmol.util.Colix.getColix (argb));
}, "org.jmol.modelset.Atom,~N");
Clazz.defineMethod (c$, "getJmolOrRasmolArgb", 
($fz = function (id, argb) {
switch (argb) {
case 1073741992:
if (id >= org.jmol.util.Elements.elementNumberMax) break;
return this.propertyColorEncoder.getArgbFromPalette (id, 0, 0, 2);
case 1073742116:
if (id >= org.jmol.util.Elements.elementNumberMax) break;
return this.propertyColorEncoder.getArgbFromPalette (id, 0, 0, 3);
default:
return argb;
}
return org.jmol.viewer.JmolConstants.altArgbsCpk[org.jmol.util.Elements.altElementIndexFromNumber (id)];
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setElementArgb", 
function (id, argb) {
if (argb == 1073741992 && this.argbsCpk === org.jmol.constant.EnumPalette.argbsCpk) return;
argb = this.getJmolOrRasmolArgb (id, argb);
if (this.argbsCpk === org.jmol.constant.EnumPalette.argbsCpk) {
this.argbsCpk = org.jmol.util.ArrayUtil.arrayCopyRangeI (org.jmol.constant.EnumPalette.argbsCpk, 0, -1);
this.altArgbsCpk = org.jmol.util.ArrayUtil.arrayCopyRangeI (org.jmol.viewer.JmolConstants.altArgbsCpk, 0, -1);
}if (id < org.jmol.util.Elements.elementNumberMax) {
this.argbsCpk[id] = argb;
this.g3d.changeColixArgb (id, argb);
return;
}id = org.jmol.util.Elements.altElementIndexFromNumber (id);
this.altArgbsCpk[id] = argb;
this.g3d.changeColixArgb ((org.jmol.util.Elements.elementNumberMax + id), argb);
}, "~N,~N");
Clazz.defineMethod (c$, "getPropertyColorRange", 
function () {
if (this.propertyColorEncoder.isReversed) return [this.propertyColorEncoder.hi, this.propertyColorEncoder.lo];
return [this.propertyColorEncoder.lo, this.propertyColorEncoder.hi];
});
Clazz.defineMethod (c$, "setPropertyColorRangeData", 
function (data, bs, colorScheme) {
this.colorData = data;
this.propertyColorEncoder.currentPalette = this.propertyColorEncoder.createColorScheme (colorScheme, true, false);
this.propertyColorEncoder.hi = 1.4E-45;
this.propertyColorEncoder.lo = 3.4028235E38;
if (data == null) return;
var isAll = (bs == null);
var d;
var i0 = (isAll ? data.length - 1 : bs.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bs.nextSetBit (i + 1))) {
if (Float.isNaN (d = data[i])) continue;
this.propertyColorEncoder.hi = Math.max (this.propertyColorEncoder.hi, d);
this.propertyColorEncoder.lo = Math.min (this.propertyColorEncoder.lo, d);
}
this.setPropertyColorRange (this.propertyColorEncoder.lo, this.propertyColorEncoder.hi);
}, "~A,org.jmol.util.BitSet,~S");
Clazz.defineMethod (c$, "setPropertyColorRange", 
function (min, max) {
this.propertyColorEncoder.setRange (min, max, min > max);
org.jmol.util.Logger.info ("ColorManager: color \"" + this.propertyColorEncoder.getCurrentColorSchemeName () + "\" range " + min + " " + max);
}, "~N,~N");
Clazz.defineMethod (c$, "setPropertyColorScheme", 
function (colorScheme, isTranslucent, isOverloaded) {
var isReset = (colorScheme.length == 0);
if (isReset) colorScheme = "=";
var range = this.getPropertyColorRange ();
this.propertyColorEncoder.currentPalette = this.propertyColorEncoder.createColorScheme (colorScheme, true, isOverloaded);
if (!isReset) this.setPropertyColorRange (range[0], range[1]);
this.propertyColorEncoder.isTranslucent = isTranslucent;
}, "~S,~B,~B");
Clazz.defineMethod (c$, "getState", 
function (sfunc) {
var s =  new org.jmol.util.StringXBuilder ();
var n = this.propertyColorEncoder.getState (s);
if (n > 0 && sfunc != null) sfunc.append ("\n  _setColorState\n");
return (n > 0 && sfunc != null ? "function _setColorState() {\n" + s.append ("}\n\n").toString () : s.toString ());
}, "org.jmol.util.StringXBuilder");
Clazz.defineMethod (c$, "setUserScale", 
function (scale) {
this.propertyColorEncoder.setUserScale (scale);
}, "~A");
Clazz.defineMethod (c$, "getColorSchemeList", 
function (colorScheme) {
var iPt = (colorScheme == null || colorScheme.length == 0) ? this.propertyColorEncoder.currentPalette : this.propertyColorEncoder.createColorScheme (colorScheme, true, false);
return org.jmol.util.ColorEncoder.getColorSchemeList (this.propertyColorEncoder.getColorSchemeArray (iPt));
}, "~S");
Clazz.defineMethod (c$, "getColixForPropertyValue", 
function (val) {
return this.propertyColorEncoder.getColorIndex (val);
}, "~N");
Clazz.defineMethod (c$, "getColorEncoder", 
function (colorScheme) {
if (colorScheme == null || colorScheme.length == 0) return this.propertyColorEncoder;
var ce =  new org.jmol.util.ColorEncoder (this.propertyColorEncoder);
ce.currentPalette = ce.createColorScheme (colorScheme, false, true);
return (ce.currentPalette == 2147483647 ? null : ce);
}, "~S");
});
