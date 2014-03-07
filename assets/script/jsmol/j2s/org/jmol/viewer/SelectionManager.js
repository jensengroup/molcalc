Clazz.declarePackage ("org.jmol.viewer");
Clazz.load (["org.jmol.util.BitSet"], "org.jmol.viewer.SelectionManager", ["java.util.Hashtable", "org.jmol.i18n.GT", "org.jmol.util.ArrayUtil", "$.BitSetUtil", "$.Escape", "$.StringXBuilder", "org.jmol.viewer.StateManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.listeners = null;
this.bsHidden = null;
this.bsSelection = null;
this.bsFixed = null;
this.bsSubset = null;
this.bsDeleted = null;
this.empty = 1;
this.hideNotSelected = false;
this.bsTemp = null;
Clazz.instantialize (this, arguments);
}, org.jmol.viewer, "SelectionManager");
Clazz.prepareFields (c$, function () {
this.listeners =  new Array (0);
this.bsHidden =  new org.jmol.util.BitSet ();
this.bsSelection =  new org.jmol.util.BitSet ();
this.bsFixed =  new org.jmol.util.BitSet ();
this.bsTemp =  new org.jmol.util.BitSet ();
});
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
}, "org.jmol.viewer.Viewer");
Clazz.defineMethod (c$, "deleteModelAtoms", 
function (bsDeleted) {
org.jmol.util.BitSetUtil.deleteBits (this.bsHidden, bsDeleted);
org.jmol.util.BitSetUtil.deleteBits (this.bsSelection, bsDeleted);
org.jmol.util.BitSetUtil.deleteBits (this.bsSubset, bsDeleted);
org.jmol.util.BitSetUtil.deleteBits (this.bsFixed, bsDeleted);
org.jmol.util.BitSetUtil.deleteBits (this.bsDeleted, bsDeleted);
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "clear", 
function () {
this.clearSelection (true);
this.hide (null, null, null, true);
this.setSelectionSubset (null);
this.bsDeleted = null;
this.setMotionFixedAtoms (null);
});
Clazz.defineMethod (c$, "hide", 
function (modelSet, bs, addRemove, isQuiet) {
if (bs == null) {
this.bsHidden.clearAll ();
} else if (addRemove == null) {
this.bsHidden.clearAll ();
this.bsHidden.or (bs);
} else if (addRemove.booleanValue ()) {
this.bsHidden.or (bs);
} else {
this.bsHidden.andNot (bs);
}if (modelSet != null) modelSet.setBsHidden (this.bsHidden);
if (!isQuiet) this.viewer.reportSelection (org.jmol.i18n.GT._ ("{0} atoms hidden", "" + this.bsHidden.cardinality ()));
}, "org.jmol.modelset.ModelSet,org.jmol.util.BitSet,Boolean,~B");
Clazz.defineMethod (c$, "display", 
function (modelSet, bs, addRemove, isQuiet) {
var bsAll = modelSet.getModelAtomBitSetIncludingDeleted (-1, false);
if (bs == null) {
this.bsHidden.clearAll ();
} else if (addRemove == null) {
this.bsHidden.or (bsAll);
this.bsHidden.andNot (bs);
} else if (addRemove.booleanValue ()) {
this.bsHidden.andNot (bs);
} else {
this.bsHidden.or (bs);
}org.jmol.util.BitSetUtil.andNot (this.bsHidden, this.bsDeleted);
modelSet.setBsHidden (this.bsHidden);
if (!isQuiet) this.viewer.reportSelection (org.jmol.i18n.GT._ ("{0} atoms hidden", "" + this.bsHidden.cardinality ()));
}, "org.jmol.modelset.ModelSet,org.jmol.util.BitSet,Boolean,~B");
Clazz.defineMethod (c$, "getHiddenSet", 
function () {
return this.bsHidden;
});
Clazz.defineMethod (c$, "getHideNotSelected", 
function () {
return this.hideNotSelected;
});
Clazz.defineMethod (c$, "setHideNotSelected", 
function (TF) {
this.hideNotSelected = TF;
if (TF) this.selectionChanged (false);
}, "~B");
Clazz.defineMethod (c$, "isSelected", 
function (atomIndex) {
return (atomIndex >= 0 && this.bsSelection.get (atomIndex));
}, "~N");
Clazz.defineMethod (c$, "select", 
function (bs, addRemove, isQuiet) {
if (bs == null) {
this.selectAll (true);
if (!this.viewer.getRasmolSetting (1613758476)) this.excludeSelectionSet (this.viewer.getAtomBits (1613758476, null));
if (!this.viewer.getRasmolSetting (1613758470)) this.excludeSelectionSet (this.viewer.getAtomBits (1613758470, null));
this.selectionChanged (false);
} else {
this.setSelectionSet (bs, addRemove);
}var reportChime = this.viewer.getMessageStyleChime ();
if (!reportChime && isQuiet) return;
var n = this.getSelectionCount ();
if (reportChime) this.viewer.reportSelection ((n == 0 ? "No atoms" : n == 1 ? "1 atom" : n + " atoms") + " selected!");
 else if (!isQuiet) this.viewer.reportSelection (org.jmol.i18n.GT._ ("{0} atoms selected", n));
}, "org.jmol.util.BitSet,Boolean,~B");
Clazz.defineMethod (c$, "selectAll", 
function (isQuiet) {
var count = this.viewer.getAtomCount ();
this.empty = (count == 0) ? 1 : 0;
for (var i = count; --i >= 0; ) this.bsSelection.set (i);

org.jmol.util.BitSetUtil.andNot (this.bsSelection, this.bsDeleted);
this.selectionChanged (isQuiet);
}, "~B");
Clazz.defineMethod (c$, "clearSelection", 
function (isQuiet) {
this.setHideNotSelected (false);
this.bsSelection.clearAll ();
this.empty = 1;
this.selectionChanged (isQuiet);
}, "~B");
Clazz.defineMethod (c$, "isAtomSelected", 
function (atomIndex) {
return ((this.bsSubset == null || this.bsSubset.get (atomIndex)) && this.bsDeleted == null || !this.bsDeleted.get (atomIndex)) && this.bsSelection.get (atomIndex);
}, "~N");
Clazz.defineMethod (c$, "setSelectedAtom", 
function (atomIndex, TF) {
if (atomIndex < 0) {
this.selectionChanged (true);
return;
}if (this.bsSubset != null && !this.bsSubset.get (atomIndex) || this.bsDeleted != null && this.bsDeleted.get (atomIndex)) return;
this.bsSelection.setBitTo (atomIndex, TF);
if (TF) this.empty = 0;
 else this.empty = -1;
}, "~N,~B");
Clazz.defineMethod (c$, "setSelectionSet", 
function (set, addRemove) {
if (set == null) {
this.bsSelection.clearAll ();
} else if (addRemove == null) {
this.bsSelection.clearAll ();
this.bsSelection.or (set);
} else if (addRemove.booleanValue ()) {
this.bsSelection.or (set);
} else {
this.bsSelection.andNot (set);
}this.empty = -1;
this.selectionChanged (false);
}, "org.jmol.util.BitSet,Boolean");
Clazz.defineMethod (c$, "setSelectionSubset", 
function (bs) {
this.bsSubset = bs;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "isInSelectionSubset", 
function (atomIndex) {
return (atomIndex < 0 || this.bsSubset == null || this.bsSubset.get (atomIndex));
}, "~N");
Clazz.defineMethod (c$, "invertSelection", 
function () {
org.jmol.util.BitSetUtil.invertInPlace (this.bsSelection, this.viewer.getAtomCount ());
this.empty = (this.bsSelection.length () > 0 ? 0 : 1);
this.selectionChanged (false);
});
Clazz.defineMethod (c$, "excludeSelectionSet", 
($fz = function (setExclude) {
if (setExclude == null || this.empty == 1) return;
this.bsSelection.andNot (setExclude);
this.empty = -1;
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getSelectionCount", 
function () {
if (this.empty == 1) return 0;
this.empty = 1;
var bs;
if (this.bsSubset != null) {
this.bsTemp.clearAll ();
this.bsTemp.or (this.bsSubset);
this.bsTemp.and (this.bsSelection);
bs = this.bsTemp;
} else {
bs = this.bsSelection;
}var count = bs.cardinality ();
if (count > 0) this.empty = 0;
return count;
});
Clazz.defineMethod (c$, "addListener", 
function (listener) {
for (var i = this.listeners.length; --i >= 0; ) if (this.listeners[i] === listener) {
this.listeners[i] = null;
break;
}
var len = this.listeners.length;
for (var i = len; --i >= 0; ) if (this.listeners[i] == null) {
this.listeners[i] = listener;
return;
}
if (this.listeners.length == 0) this.listeners =  new Array (1);
 else this.listeners = org.jmol.util.ArrayUtil.doubleLength (this.listeners);
this.listeners[len] = listener;
}, "org.jmol.api.JmolSelectionListener");
Clazz.defineMethod (c$, "selectionChanged", 
($fz = function (isQuiet) {
if (this.hideNotSelected) this.hide (this.viewer.getModelSet (), org.jmol.util.BitSetUtil.copyInvert (this.bsSelection, this.viewer.getAtomCount ()), null, isQuiet);
if (isQuiet || this.listeners.length == 0) return;
for (var i = this.listeners.length; --i >= 0; ) if (this.listeners[i] != null) this.listeners[i].selectionChanged (this.bsSelection);

}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "getState", 
function (sfunc) {
var commands =  new org.jmol.util.StringXBuilder ();
if (sfunc != null) {
sfunc.append ("  _setSelectionState;\n");
commands.append ("function _setSelectionState() {\n");
}org.jmol.viewer.StateManager.appendCmd (commands, this.viewer.getTrajectoryInfo ());
var temp =  new java.util.Hashtable ();
var cmd = null;
org.jmol.viewer.SelectionManager.addBs (commands, "hide ", this.bsHidden);
org.jmol.viewer.SelectionManager.addBs (commands, "subset ", this.bsSubset);
org.jmol.viewer.SelectionManager.addBs (commands, "delete ", this.bsDeleted);
org.jmol.viewer.SelectionManager.addBs (commands, "fix ", this.bsFixed);
temp.put ("-", this.bsSelection);
cmd = org.jmol.viewer.StateManager.getCommands (temp, null, "select");
if (cmd == null) org.jmol.viewer.StateManager.appendCmd (commands, "select none");
 else commands.append (cmd);
org.jmol.viewer.StateManager.appendCmd (commands, "set hideNotSelected " + this.hideNotSelected);
commands.append (this.viewer.getShapeProperty (1, "selectionState"));
if (this.viewer.getSelectionHaloEnabled (false)) org.jmol.viewer.StateManager.appendCmd (commands, "SelectionHalos ON");
if (sfunc != null) commands.append ("}\n\n");
return commands.toString ();
}, "org.jmol.util.StringXBuilder");
c$.addBs = Clazz.defineMethod (c$, "addBs", 
($fz = function (sb, key, bs) {
if (bs == null || bs.length () == 0) return;
org.jmol.viewer.StateManager.appendCmd (sb, key + org.jmol.util.Escape.escape (bs));
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~S,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "deleteAtoms", 
function (bs) {
var bsNew = org.jmol.util.BitSetUtil.copy (bs);
if (this.bsDeleted == null) {
this.bsDeleted = bsNew;
} else {
bsNew.andNot (this.bsDeleted);
this.bsDeleted.or (bs);
}this.bsHidden.andNot (this.bsDeleted);
this.bsSelection.andNot (this.bsDeleted);
return bsNew.cardinality ();
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getDeletedAtoms", 
function () {
return this.bsDeleted;
});
Clazz.defineMethod (c$, "getSelectionSet", 
function (includeDeleted) {
if (includeDeleted || this.bsDeleted == null && this.bsSubset == null) return this.bsSelection;
var bs =  new org.jmol.util.BitSet ();
bs.or (this.bsSelection);
this.excludeAtoms (bs, false);
return bs;
}, "~B");
Clazz.defineMethod (c$, "getSelectionSubset", 
function () {
return this.bsSubset;
});
Clazz.defineMethod (c$, "excludeAtoms", 
function (bs, ignoreSubset) {
if (this.bsDeleted != null) bs.andNot (this.bsDeleted);
if (!ignoreSubset && this.bsSubset != null) bs.and (this.bsSubset);
}, "org.jmol.util.BitSet,~B");
Clazz.defineMethod (c$, "processDeletedModelAtoms", 
function (bsAtoms) {
if (this.bsDeleted != null) org.jmol.util.BitSetUtil.deleteBits (this.bsDeleted, bsAtoms);
if (this.bsSubset != null) org.jmol.util.BitSetUtil.deleteBits (this.bsSubset, bsAtoms);
org.jmol.util.BitSetUtil.deleteBits (this.bsFixed, bsAtoms);
org.jmol.util.BitSetUtil.deleteBits (this.bsHidden, bsAtoms);
var bs = org.jmol.util.BitSetUtil.copy (this.bsSelection);
org.jmol.util.BitSetUtil.deleteBits (bs, bsAtoms);
this.setSelectionSet (bs, null);
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setMotionFixedAtoms", 
function (bs) {
this.bsFixed.clearAll ();
if (bs != null) this.bsFixed.or (bs);
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getMotionFixedAtoms", 
function () {
return this.bsFixed;
});
Clazz.defineStatics (c$,
"TRUE", 1,
"FALSE", 0,
"UNKNOWN", -1);
});
