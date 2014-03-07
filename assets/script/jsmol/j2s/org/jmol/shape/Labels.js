Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.AtomShape", "java.util.Hashtable"], "org.jmol.shape.Labels", ["org.jmol.constant.EnumPalette", "org.jmol.modelset.LabelToken", "org.jmol.shape.Object2d", "$.Text", "org.jmol.util.ArrayUtil", "$.BitSet", "$.BitSetUtil", "$.Colix", "$.Escape", "$.JmolFont", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.strings = null;
this.formats = null;
this.bgcolixes = null;
this.fids = null;
this.offsets = null;
this.atomLabels = null;
this.text = null;
this.labelBoxes = null;
this.bsFontSet = null;
this.bsBgColixSet = null;
this.defaultOffset = 0;
this.defaultAlignment = 0;
this.defaultZPos = 0;
this.defaultFontId = 0;
this.defaultColix = 0;
this.defaultBgcolix = 0;
this.defaultPaletteID = 0;
this.defaultPointer = 0;
this.zeroFontId = 0;
this.defaultsOnlyForNone = true;
this.setDefaults = false;
this.isScaled = false;
this.scalePixelsPerMicron = 0;
this.pickedAtom = -1;
this.pickedOffset = 0;
this.pickedX = 0;
this.pickedY = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "Labels", org.jmol.shape.AtomShape);
Clazz.prepareFields (c$, function () {
this.atomLabels =  new java.util.Hashtable ();
});
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shape.Labels, "initShape", []);
this.defaultFontId = this.zeroFontId = this.gdata.getFont3DFSS ("SansSerif", "Plain", 13).fid;
this.defaultColix = 0;
this.defaultBgcolix = 0;
this.defaultOffset = org.jmol.shape.Labels.zeroOffset;
this.defaultZPos = 0;
this.translucentAllowed = false;
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
this.isActive = true;
if ("setDefaults" === propertyName) {
this.setDefaults = (value).booleanValue ();
return;
}if ("color" === propertyName) {
this.isActive = true;
var pid = org.jmol.constant.EnumPalette.pidOf (value);
var colix = org.jmol.util.Colix.getColixO (value);
if (!this.setDefaults) for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setLabelColix (i, colix, pid);

if (this.setDefaults || !this.defaultsOnlyForNone) {
this.defaultColix = colix;
this.defaultPaletteID = pid;
}return;
}if ("scalereference" === propertyName) {
if (this.strings == null) return;
var val = (value).floatValue ();
var scalePixelsPerMicron = (val == 0 ? 0 : 10000 / val);
for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) {
if (this.strings.length <= i) continue;
this.text = this.getLabel (i);
if (this.text == null) {
this.text = org.jmol.shape.Text.newLabel (this.gdata, null, this.strings[i], 0, 0, 0, 0, 0, 0, 0, scalePixelsPerMicron);
this.putLabel (i, this.text);
} else {
this.text.setScalePixelsPerMicron (scalePixelsPerMicron);
}}
return;
}if ("label" === propertyName) {
this.setScaling ();
var strLabel = value;
var tokens = (strLabel == null || strLabel.length == 0 ? org.jmol.shape.Labels.nullToken : [null]);
for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setLabel (tokens, strLabel, i);

return;
}if ("clearBoxes" === propertyName) {
this.labelBoxes = null;
return;
}if ("translucency" === propertyName || "bgtranslucency" === propertyName) {
return;
}if ("bgcolor" === propertyName) {
this.isActive = true;
if (this.bsBgColixSet == null) this.bsBgColixSet =  new org.jmol.util.BitSet ();
var bgcolix = org.jmol.util.Colix.getColixO (value);
if (!this.setDefaults) for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setBgcolix (i, bgcolix);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultBgcolix = bgcolix;
return;
}if (this.bsFontSet == null) this.bsFontSet =  new org.jmol.util.BitSet ();
if ("fontsize" === propertyName) {
var fontsize = (value).intValue ();
if (fontsize < 0) {
this.fids = null;
return;
}var fid = this.gdata.getFontFid (fontsize);
if (!this.setDefaults) for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setFont (i, fid);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultFontId = fid;
return;
}if ("font" === propertyName) {
var fid = (value).fid;
if (!this.setDefaults) for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setFont (i, fid);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultFontId = fid;
return;
}if ("offset" === propertyName || "offsetexact" === propertyName) {
var offset = (value).intValue ();
var isExact = (propertyName === "offsetexact");
if (offset == 0) offset = 32767;
 else if (offset == org.jmol.shape.Labels.zeroOffset) offset = 0;
if (!this.setDefaults) for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setOffsets (i, offset, isExact);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultOffset = offset;
return;
}if ("align" === propertyName) {
var type = value;
var alignment = 1;
if (type.equalsIgnoreCase ("right")) alignment = 3;
 else if (type.equalsIgnoreCase ("center")) alignment = 2;
for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setAlignment (i, alignment);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultAlignment = alignment;
return;
}if ("pointer" === propertyName) {
var pointer = (value).intValue ();
if (!this.setDefaults) for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setPointer (i, pointer);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultPointer = pointer;
return;
}if ("front" === propertyName) {
var TF = (value).booleanValue ();
if (!this.setDefaults) for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setFront (i, TF);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultZPos = (TF ? 32 : 0);
return;
}if ("group" === propertyName) {
var TF = (value).booleanValue ();
if (!this.setDefaults) for (var i = this.atomCount; --i >= 0; ) if (bsSelected.get (i)) this.setGroup (i, TF);

if (this.setDefaults || !this.defaultsOnlyForNone) this.defaultZPos = (TF ? 16 : 0);
return;
}if ("display" === propertyName || "toggleLabel" === propertyName) {
var mode = ("toggleLabel" === propertyName ? 0 : (value).booleanValue () ? 1 : -1);
if (this.mads == null) this.mads =  Clazz.newShortArray (this.atomCount, 0);
var strLabelPDB = null;
var tokensPDB = null;
var strLabelUNK = null;
var tokensUNK = null;
var strLabel;
var tokens;
for (var atomIndex = this.atomCount; --atomIndex >= 0; ) {
if (bsSelected.get (atomIndex)) {
var atom = this.atoms[atomIndex];
if (this.formats == null || atomIndex >= this.formats.length) this.formats = org.jmol.util.ArrayUtil.ensureLengthS (this.formats, atomIndex + 1);
if (this.strings != null && this.strings.length > atomIndex && this.strings[atomIndex] != null) {
this.mads[atomIndex] = (mode == 0 && this.mads[atomIndex] < 0 || mode == 1 ? 1 : -1);
} else {
if (this.bsSizeSet == null) this.bsSizeSet =  new org.jmol.util.BitSet ();
this.strings = org.jmol.util.ArrayUtil.ensureLengthS (this.strings, atomIndex + 1);
if (atom.getGroup3 (false).equals ("UNK")) {
if (strLabelUNK == null) {
strLabelUNK = this.viewer.getStandardLabelFormat (1);
tokensUNK = org.jmol.modelset.LabelToken.compile (this.viewer, strLabelUNK, '\0', null);
}strLabel = strLabelUNK;
tokens = tokensUNK;
} else {
if (strLabelPDB == null) {
strLabelPDB = this.viewer.getStandardLabelFormat (2);
tokensPDB = org.jmol.modelset.LabelToken.compile (this.viewer, strLabelPDB, '\0', null);
}strLabel = strLabelPDB;
tokens = tokensPDB;
}this.strings[atomIndex] = org.jmol.modelset.LabelToken.formatLabelAtomArray (this.viewer, atom, tokens, '\0', null);
this.formats[atomIndex] = strLabel;
this.bsSizeSet.set (atomIndex);
if ((this.bsBgColixSet == null || !this.bsBgColixSet.get (atomIndex)) && this.defaultBgcolix != 0) this.setBgcolix (atomIndex, this.defaultBgcolix);
this.mads[atomIndex] = (mode >= 0 ? 1 : -1);
}atom.setShapeVisibility (this.myVisibilityFlag, this.strings != null && atomIndex < this.strings.length && this.strings[atomIndex] != null && this.mads[atomIndex] >= 0);
}}
return;
}if (propertyName.startsWith ("label:")) {
this.setScaling ();
this.setLabel ( new Array (1), propertyName.substring (6), (value).intValue ());
return;
}if (propertyName === "deleteModelAtoms") {
this.labelBoxes = null;
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
this.fids = org.jmol.util.ArrayUtil.deleteElements (this.fids, firstAtomDeleted, nAtomsDeleted);
this.bgcolixes = org.jmol.util.ArrayUtil.deleteElements (this.bgcolixes, firstAtomDeleted, nAtomsDeleted);
this.offsets = org.jmol.util.ArrayUtil.deleteElements (this.offsets, firstAtomDeleted, nAtomsDeleted);
this.formats = org.jmol.util.ArrayUtil.deleteElements (this.formats, firstAtomDeleted, nAtomsDeleted);
this.strings = org.jmol.util.ArrayUtil.deleteElements (this.strings, firstAtomDeleted, nAtomsDeleted);
org.jmol.util.BitSetUtil.deleteBits (this.bsFontSet, bsSelected);
org.jmol.util.BitSetUtil.deleteBits (this.bsBgColixSet, bsSelected);
}Clazz.superCall (this, org.jmol.shape.Labels, "setProperty", [propertyName, value, bsSelected]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setScaling", 
($fz = function () {
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new org.jmol.util.BitSet ();
this.isScaled = this.viewer.getFontScaling ();
this.scalePixelsPerMicron = (this.isScaled ? this.viewer.getScalePixelsPerAngstrom (false) * 10000 : 0);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setLabel", 
($fz = function (temp, strLabel, i) {
var atom = this.atoms[i];
var tokens = temp[0];
if (tokens == null) tokens = temp[0] = org.jmol.modelset.LabelToken.compile (this.viewer, strLabel, '\0', null);
var label = (tokens == null ? null : org.jmol.modelset.LabelToken.formatLabelAtomArray (this.viewer, atom, tokens, '\0', null));
atom.setShapeVisibility (this.myVisibilityFlag, label != null);
if (this.strings == null || i >= this.strings.length) this.strings = org.jmol.util.ArrayUtil.ensureLengthS (this.strings, i + 1);
if (this.formats == null || i >= this.formats.length) this.formats = org.jmol.util.ArrayUtil.ensureLengthS (this.formats, i + 1);
this.strings[i] = label;
this.formats[i] = (strLabel != null && strLabel.indexOf ("%{") >= 0 ? label : strLabel);
this.bsSizeSet.setBitTo (i, (strLabel != null));
this.text = this.getLabel (i);
if (this.isScaled) {
this.text = org.jmol.shape.Text.newLabel (this.gdata, null, label, 0, 0, 0, 0, 0, 0, 0, this.scalePixelsPerMicron);
this.putLabel (i, this.text);
} else if (this.text != null) {
this.text.setText (label);
}if (this.defaultOffset != org.jmol.shape.Labels.zeroOffset) this.setOffsets (i, this.defaultOffset, false);
if (this.defaultAlignment != 1) this.setAlignment (i, this.defaultAlignment);
if ((this.defaultZPos & 32) != 0) this.setFront (i, true);
 else if ((this.defaultZPos & 16) != 0) this.setGroup (i, true);
if (this.defaultPointer != 0) this.setPointer (i, this.defaultPointer);
if (this.defaultColix != 0 || this.defaultPaletteID != 0) this.setLabelColix (i, this.defaultColix, this.defaultPaletteID);
if (this.defaultBgcolix != 0) this.setBgcolix (i, this.defaultBgcolix);
if (this.defaultFontId != this.zeroFontId) this.setFont (i, this.defaultFontId);
}, $fz.isPrivate = true, $fz), "~A,~S,~N");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if (property.equals ("offsets")) return this.offsets;
if (property.equals ("defaultState")) return this.getDefaultState ();
if (property.equals ("label")) return (this.strings != null && index < this.strings.length && this.strings[index] != null ? this.strings[index] : "");
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "putLabel", 
function (i, text) {
if (text == null) this.atomLabels.remove (Integer.$valueOf (i));
 else this.atomLabels.put (Integer.$valueOf (i), text);
}, "~N,org.jmol.shape.Text");
Clazz.defineMethod (c$, "getLabel", 
function (i) {
return this.atomLabels.get (Integer.$valueOf (i));
}, "~N");
Clazz.defineMethod (c$, "putBox", 
function (i, boxXY) {
if (this.labelBoxes == null) this.labelBoxes =  new java.util.Hashtable ();
this.labelBoxes.put (Integer.$valueOf (i), boxXY);
}, "~N,~A");
Clazz.defineMethod (c$, "getBox", 
function (i) {
if (this.labelBoxes == null) return null;
return this.labelBoxes.get (Integer.$valueOf (i));
}, "~N");
Clazz.defineMethod (c$, "setLabelColix", 
($fz = function (i, colix, pid) {
this.setColixAndPalette (colix, pid, i);
if (this.colixes != null && ((this.text = this.getLabel (i)) != null)) this.text.setColix (this.colixes[i]);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "setBgcolix", 
($fz = function (i, bgcolix) {
if (this.bgcolixes == null || i >= this.bgcolixes.length) {
if (bgcolix == 0) return;
this.bgcolixes = org.jmol.util.ArrayUtil.ensureLengthShort (this.bgcolixes, i + 1);
}this.bgcolixes[i] = bgcolix;
this.bsBgColixSet.setBitTo (i, bgcolix != 0);
this.text = this.getLabel (i);
if (this.text != null) this.text.setBgColix (bgcolix);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setOffsets", 
($fz = function (i, offset, isExact) {
if (this.offsets == null || i >= this.offsets.length) {
if (offset == 0) return;
this.offsets = org.jmol.util.ArrayUtil.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & 255) | (offset << 8);
if (isExact) this.offsets[i] |= 128;
this.text = this.getLabel (i);
if (this.text != null) this.text.setOffset (offset);
}, $fz.isPrivate = true, $fz), "~N,~N,~B");
Clazz.defineMethod (c$, "setAlignment", 
($fz = function (i, alignment) {
if (this.offsets == null || i >= this.offsets.length) {
if (alignment == 1) return;
this.offsets = org.jmol.util.ArrayUtil.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & -13) | (alignment << 2);
this.text = this.getLabel (i);
if (this.text != null) this.text.setAlignment (alignment);
}, $fz.isPrivate = true, $fz), "~N,~N");
c$.getAlignment = Clazz.defineMethod (c$, "getAlignment", 
function (offsetFull) {
return (offsetFull & 12) >> 2;
}, "~N");
Clazz.defineMethod (c$, "setPointer", 
($fz = function (i, pointer) {
if (this.offsets == null || i >= this.offsets.length) {
if (pointer == 0) return;
this.offsets = org.jmol.util.ArrayUtil.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & -4) + pointer;
this.text = this.getLabel (i);
if (this.text != null) this.text.setPointer (pointer);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setFront", 
($fz = function (i, TF) {
if (this.offsets == null || i >= this.offsets.length) {
if (!TF) return;
this.offsets = org.jmol.util.ArrayUtil.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & -49) + (TF ? 32 : 0);
}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "setGroup", 
($fz = function (i, TF) {
if (this.offsets == null || i >= this.offsets.length) {
if (!TF) return;
this.offsets = org.jmol.util.ArrayUtil.ensureLengthI (this.offsets, i + 1);
}this.offsets[i] = (this.offsets[i] & -49) + (TF ? 16 : 0);
}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "setFont", 
($fz = function (i, fid) {
if (this.fids == null || i >= this.fids.length) {
if (fid == this.zeroFontId) return;
this.fids = org.jmol.util.ArrayUtil.ensureLengthByte (this.fids, i + 1);
}this.fids[i] = fid;
this.bsFontSet.set (i);
this.text = this.getLabel (i);
if (this.text != null) {
this.text.setFontFromFid (fid);
}}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.overrideMethod (c$, "setModelClickability", 
function () {
if (this.strings == null) return;
for (var i = this.strings.length; --i >= 0; ) {
var label = this.strings[i];
if (label != null && this.modelSet.atoms.length > i && !this.modelSet.isAtomHidden (i)) this.modelSet.atoms[i].setClickable (this.myVisibilityFlag);
}
});
Clazz.defineMethod (c$, "getDefaultState", 
($fz = function () {
var s =  new org.jmol.util.StringXBuilder ().append ("\n# label defaults;\n");
org.jmol.shape.Shape.appendCmd (s, "select none");
org.jmol.shape.Shape.appendCmd (s, this.getColorCommand ("label", this.defaultPaletteID, this.defaultColix));
org.jmol.shape.Shape.appendCmd (s, "background label " + org.jmol.shape.Shape.encodeColor (this.defaultBgcolix));
org.jmol.shape.Shape.appendCmd (s, "set labelOffset " + org.jmol.shape.Object2d.getXOffset (this.defaultOffset) + " " + (-org.jmol.shape.Object2d.getYOffset (this.defaultOffset)));
var align = org.jmol.shape.Object2d.getAlignmentName (this.defaultAlignment);
org.jmol.shape.Shape.appendCmd (s, "set labelAlignment " + (align.length < 5 ? "left" : align));
var pointer = org.jmol.shape.Object2d.getPointer (this.defaultPointer);
org.jmol.shape.Shape.appendCmd (s, "set labelPointer " + (pointer.length == 0 ? "off" : pointer));
if ((this.defaultZPos & 32) != 0) org.jmol.shape.Shape.appendCmd (s, "set labelFront");
 else if ((this.defaultZPos & 16) != 0) org.jmol.shape.Shape.appendCmd (s, "set labelGroup");
org.jmol.shape.Shape.appendCmd (s, org.jmol.shape.Shape.getFontCommand ("label", org.jmol.util.JmolFont.getFont3D (this.defaultFontId)));
return s.toString ();
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getShapeState", 
function () {
if (!this.isActive || this.bsSizeSet == null) return "";
var temp =  new java.util.Hashtable ();
var temp2 =  new java.util.Hashtable ();
var temp3 =  new java.util.Hashtable ();
for (var i = this.bsSizeSet.nextSetBit (0); i >= 0; i = this.bsSizeSet.nextSetBit (i + 1)) {
org.jmol.shape.Shape.setStateInfo (temp, i, "label " + org.jmol.util.Escape.escapeStr (this.formats[i]));
if (this.bsColixSet != null && this.bsColixSet.get (i)) org.jmol.shape.Shape.setStateInfo (temp2, i, this.getColorCommand ("label", this.paletteIDs[i], this.colixes[i]));
if (this.bsBgColixSet != null && this.bsBgColixSet.get (i)) org.jmol.shape.Shape.setStateInfo (temp2, i, "background label " + org.jmol.shape.Shape.encodeColor (this.bgcolixes[i]));
var text = this.getLabel (i);
var sppm = (text != null ? text.getScalePixelsPerMicron () : 0);
if (sppm > 0) org.jmol.shape.Shape.setStateInfo (temp2, i, "set labelScaleReference " + (10000 / sppm));
if (this.offsets != null && this.offsets.length > i) {
var offsetFull = this.offsets[i];
org.jmol.shape.Shape.setStateInfo (temp2, i, "set " + ((offsetFull & 128) == 128 ? "labelOffsetExact " : "labelOffset ") + org.jmol.shape.Object2d.getXOffset (offsetFull >> 8) + " " + (-org.jmol.shape.Object2d.getYOffset (offsetFull >> 8)));
var align = org.jmol.shape.Object2d.getAlignmentName (offsetFull >> 2);
var pointer = org.jmol.shape.Object2d.getPointer (offsetFull);
if (pointer.length > 0) org.jmol.shape.Shape.setStateInfo (temp2, i, "set labelPointer " + pointer);
if ((offsetFull & 32) != 0) org.jmol.shape.Shape.setStateInfo (temp2, i, "set labelFront");
 else if ((offsetFull & 16) != 0) org.jmol.shape.Shape.setStateInfo (temp2, i, "set labelGroup");
if (align.length > 0) org.jmol.shape.Shape.setStateInfo (temp3, i, "set labelAlignment " + align);
}if (this.mads != null && this.mads[i] < 0) org.jmol.shape.Shape.setStateInfo (temp2, i, "set toggleLabel");
if (this.bsFontSet != null && this.bsFontSet.get (i)) org.jmol.shape.Shape.setStateInfo (temp2, i, org.jmol.shape.Shape.getFontCommand ("label", org.jmol.util.JmolFont.getFont3D (this.fids[i])));
}
return org.jmol.shape.Shape.getShapeCommands (temp, temp2) + org.jmol.shape.Shape.getShapeCommands (null, temp3);
});
Clazz.overrideMethod (c$, "checkObjectDragged", 
function (prevX, prevY, x, y, modifiers, bsVisible) {
if (this.viewer.getPickingMode () != 2 || this.labelBoxes == null) return false;
if (prevX == -2147483648) {
var iAtom = this.findNearestLabel (x, y);
if (iAtom >= 0) {
this.pickedAtom = iAtom;
this.pickedX = x;
this.pickedY = y;
this.pickedOffset = (this.offsets == null || this.pickedAtom >= this.offsets.length ? 0 : this.offsets[this.pickedAtom]) >> 8;
return true;
}return false;
}if (prevX == 2147483647) {
this.pickedAtom = -1;
return false;
}if (this.pickedAtom < 0) return false;
this.move2D (this.pickedAtom, x, y);
return true;
}, "~N,~N,~N,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "findNearestLabel", 
($fz = function (x, y) {
if (this.labelBoxes == null) return -1;
var dmin = 3.4028235E38;
var imin = -1;
var zmin = 3.4028235E38;
for (var entry, $entry = this.labelBoxes.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
if (!this.atoms[entry.getKey ().intValue ()].isVisible (this.myVisibilityFlag)) continue;
var boxXY = entry.getValue ();
var dx = x - boxXY[0];
var dy = y - boxXY[1];
if (dx <= 0 || dy <= 0 || dx >= boxXY[2] || dy >= boxXY[3] || boxXY[4] > zmin) continue;
zmin = boxXY[4];
var d = Math.min (Math.abs (dx - boxXY[2] / 2), Math.abs (dy - boxXY[3] / 2));
if (d <= dmin) {
dmin = d;
imin = entry.getKey ().intValue ();
}}
return imin;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "move2D", 
($fz = function (pickedAtom, x, y) {
var xOffset = org.jmol.shape.Object2d.getXOffset (this.pickedOffset);
var yOffset = -org.jmol.shape.Object2d.getYOffset (this.pickedOffset);
xOffset += x - this.pickedX;
yOffset += this.pickedY - y;
var offset = org.jmol.shape.Object2d.getOffset (xOffset, yOffset);
if (offset == 0) offset = 32767;
 else if (offset == org.jmol.shape.Labels.zeroOffset) offset = 0;
this.setOffsets (pickedAtom, offset, true);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineStatics (c$,
"zeroOffset", 1028);
c$.nullToken = c$.prototype.nullToken = [null];
Clazz.defineStatics (c$,
"POINTER_FLAGS", 0x03,
"ALIGN_FLAGS", 0x0C,
"ZPOS_FLAGS", 0x30,
"GROUP_FLAG", 0x10,
"FRONT_FLAG", 0x20,
"SCALE_FLAG", 0x40,
"EXACT_OFFSET_FLAG", 0x80,
"FLAGS", 0xFF,
"FLAG_OFFSET", 8);
});
