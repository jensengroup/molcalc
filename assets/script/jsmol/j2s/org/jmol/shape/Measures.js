Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.api.JmolMeasurementClient", "org.jmol.shape.Shape", "java.util.ArrayList"], "org.jmol.shape.Measures", ["java.lang.Float", "java.util.Hashtable", "org.jmol.modelset.Measurement", "$.MeasurementData", "org.jmol.shape.FontLineShape", "org.jmol.util.BitSet", "$.BitSetUtil", "$.Colix", "$.Escape", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsColixSet = null;
this.bsSelected = null;
this.strFormat = null;
this.mustBeConnected = false;
this.mustNotBeConnected = false;
this.radiusData = null;
this.intramolecular = null;
this.atoms = null;
this.measurementCount = 0;
this.measurements = null;
this.measurementPending = null;
this.mad = -1;
this.colix = 0;
this.font3d = null;
this.tickInfo = null;
this.defaultTickInfo = null;
this.tokAction = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "Measures", org.jmol.shape.Shape, org.jmol.api.JmolMeasurementClient);
Clazz.prepareFields (c$, function () {
this.measurements =  new java.util.ArrayList ();
});
Clazz.overrideMethod (c$, "initModelSet", 
function () {
for (var i = this.measurements.size (); --i >= 0; ) {
var m = this.measurements.get (i);
if (m != null) m.modelSet = this.modelSet;
}
this.atoms = this.modelSet.atoms;
});
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shape.Measures, "initShape", []);
this.font3d = this.gdata.getFont3D (15);
});
Clazz.overrideMethod (c$, "setSize", 
function (size, bsSelected) {
this.mad = size;
}, "~N,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bsIgnored) {
var mt;
if ("clearModelIndex" === propertyName) {
for (var i = 0; i < this.measurementCount; i++) this.measurements.get (i).setModelIndex (0);

return;
}if ("color" === propertyName) {
this.setColor (value == null ? 0 : org.jmol.util.Colix.getColixO (value));
return;
}if ("delete" === propertyName) {
this.deleteO (value);
this.setIndices ();
return;
}if ("font" === propertyName) {
this.font3d = value;
return;
}if ("hideAll" === propertyName) {
this.showHide ((value).booleanValue ());
return;
}if ("pending" === propertyName) {
this.pending (value);
return;
}var isRefresh;
if ((isRefresh = ("refresh" === propertyName)) || "refreshTrajectories" === propertyName) {
for (var i = this.measurements.size (); --i >= 0; ) if ((mt = this.measurements.get (i)) != null && (isRefresh || mt.isTrajectory ())) mt.refresh ();

return;
}if ("select" === propertyName) {
var bs = value;
if (bs == null || org.jmol.util.BitSetUtil.cardinalityOf (bs) == 0) {
this.bsSelected = null;
} else {
this.bsSelected =  new org.jmol.util.BitSet ();
this.bsSelected.or (bs);
}return;
}if ("setFormats" === propertyName) {
this.setFormats (value);
return;
}this.bsSelected = null;
if ("maps" === propertyName) {
var maps = value;
for (var i = 0; i < maps.length; i++) {
var len = maps[i].length;
if (len < 2 || len > 4) continue;
var v =  Clazz.newIntArray (len + 1, 0);
v[0] = len;
System.arraycopy (maps[i], 0, v, 1, len);
this.toggleOn (v);
}
} else if ("measure" === propertyName) {
var md = value;
this.tickInfo = md.tickInfo;
if (md.tickInfo != null && md.tickInfo.id.equals ("default")) {
this.defaultTickInfo = md.tickInfo;
return;
}this.radiusData = md.radiusData;
this.mustBeConnected = md.mustBeConnected;
this.mustNotBeConnected = md.mustNotBeConnected;
this.intramolecular = md.intramolecular;
this.strFormat = md.strFormat;
if (md.isAll) {
if (this.tickInfo != null) this.define (md, 12291);
this.define (md, md.tokAction);
this.setIndices ();
return;
}var pt = this.setSingleItem (md.points);
switch (md.tokAction) {
case 12291:
this.defineAll (-2147483648, pt, true, false, false);
this.setIndices ();
break;
case 1048589:
this.showHideM (pt, false);
break;
case 1048588:
this.showHideM (pt, true);
break;
case 1060866:
this.deleteM (pt);
this.toggle (pt);
break;
case 269484114:
this.toggle (pt);
}
return;
}if ("clear" === propertyName) {
this.clear ();
return;
}if ("deleteModelAtoms" === propertyName) {
this.atoms = (value)[1];
var modelIndex = ((value)[2])[0];
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
var atomMax = firstAtomDeleted + nAtomsDeleted;
for (var i = this.measurementCount; --i >= 0; ) {
mt = this.measurements.get (i);
var indices = mt.getCountPlusIndices ();
for (var j = 1; j <= indices[0]; j++) {
var iAtom = indices[j];
if (iAtom >= firstAtomDeleted) {
if (iAtom < atomMax) {
this.deleteI (i);
break;
}indices[j] -= nAtomsDeleted;
} else if (iAtom < 0) {
var pt = mt.getAtom (j);
if (pt.modelIndex > modelIndex) {
pt.modelIndex--;
} else if (pt.modelIndex == modelIndex) {
this.deleteI (i);
break;
}}}
}
return;
}if ("hide" === propertyName) {
this.showHideM ( new org.jmol.modelset.Measurement (this.modelSet, value, null, null), true);
return;
}if ("reformatDistances" === propertyName) {
this.reformatDistances ();
return;
}if ("show" === propertyName) {
this.showHideM ( new org.jmol.modelset.Measurement (this.modelSet, value, null, null), false);
return;
}if ("toggle" === propertyName) {
this.toggle ( new org.jmol.modelset.Measurement (this.modelSet, value, null, null));
return;
}if ("toggleOn" === propertyName) {
this.toggleOn (value);
return;
}}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setSingleItem", 
($fz = function (vector) {
var points =  new Array (4);
var indices =  Clazz.newIntArray (5, 0);
indices[0] = vector.size ();
for (var i = vector.size (); --i >= 0; ) {
var value = vector.get (i);
if (Clazz.instanceOf (value, org.jmol.util.BitSet)) {
var atomIndex = (value).nextSetBit (0);
if (atomIndex < 0) return null;
indices[i + 1] = atomIndex;
} else {
points[i] = value;
indices[i + 1] = -2 - i;
}}
return  new org.jmol.modelset.Measurement (this.modelSet, indices, points, this.tickInfo == null ? this.defaultTickInfo : this.tickInfo);
}, $fz.isPrivate = true, $fz), "java.util.List");
Clazz.overrideMethod (c$, "getProperty", 
function (property, index) {
if ("pending".equals (property)) return this.measurementPending;
if ("count".equals (property)) return Integer.$valueOf (this.measurementCount);
if ("countPlusIndices".equals (property)) return (index < this.measurementCount ? this.measurements.get (index).getCountPlusIndices () : null);
if ("stringValue".equals (property)) return (index < this.measurementCount ? this.measurements.get (index).getString () : null);
if ("pointInfo".equals (property)) return this.measurements.get (Clazz.doubleToInt (index / 10)).getLabel (index % 10, false, false);
if ("info".equals (property)) return this.getAllInfo ();
if ("infostring".equals (property)) return this.getAllInfoAsString ();
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "clear", 
($fz = function () {
if (this.measurementCount == 0) return;
this.measurementCount = 0;
this.measurements.clear ();
this.viewer.setStatusMeasuring ("measureDeleted", -1, "all", 0);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setColor", 
($fz = function (colix) {
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
if (this.bsSelected == null) this.colix = colix;
var mt;
for (var i = this.measurements.size (); --i >= 0; ) if ((mt = this.measurements.get (i)) != null && (this.bsSelected != null && this.bsSelected.get (i) || this.bsSelected == null && (colix == 0 || mt.getColix () == 0))) {
mt.setColix (colix);
this.bsColixSet.set (i);
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setFormats", 
($fz = function (format) {
if (format != null && format.length == 0) format = null;
for (var i = this.measurements.size (); --i >= 0; ) if (this.bsSelected == null || this.bsSelected.get (i)) this.measurements.get (i).formatMeasurementAs (format, null, false);

}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "showHide", 
($fz = function (isHide) {
for (var i = this.measurements.size (); --i >= 0; ) if (this.bsSelected == null || this.bsSelected.get (i)) this.measurements.get (i).setHidden (isHide);

}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "showHideM", 
($fz = function (m, isHide) {
var i = this.find (m);
if (i >= 0) this.measurements.get (i).setHidden (isHide);
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Measurement,~B");
Clazz.defineMethod (c$, "toggle", 
($fz = function (m) {
this.radiusData = null;
var i = this.find (m);
var mt;
if (i >= 0 && !(mt = this.measurements.get (i)).isHidden ()) this.defineAll (i, mt, true, false, false);
 else this.defineAll (-1, m, false, true, false);
this.setIndices ();
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Measurement");
Clazz.defineMethod (c$, "toggleOn", 
($fz = function (indices) {
this.radiusData = null;
this.bsSelected =  new org.jmol.util.BitSet ();
this.defineAll (-2147483648,  new org.jmol.modelset.Measurement (this.modelSet, indices, null, this.defaultTickInfo), false, true, true);
this.setIndices ();
this.reformatDistances ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "deleteM", 
($fz = function (m) {
this.radiusData = null;
var i = this.find (m);
if (i >= 0) this.defineAll (i, this.measurements.get (i), true, false, false);
this.setIndices ();
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Measurement");
Clazz.defineMethod (c$, "deleteO", 
($fz = function (value) {
if ((Clazz.instanceOf (value, Integer))) {
this.deleteI ((value).intValue ());
} else if (org.jmol.util.Escape.isAI (value)) {
this.defineAll (-2147483648,  new org.jmol.modelset.Measurement (this.modelSet, value, null, null), true, false, false);
}}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "defineAll", 
($fz = function (iPt, m, isDelete, isShow, doSelect) {
if (!this.viewer.getMeasureAllModelsFlag ()) {
if (isDelete) {
if (iPt == -2147483648) iPt = this.find (m);
if (iPt >= 0) this.deleteI (iPt);
return;
}this.defineMeasurement (iPt, m, doSelect);
return;
}if (isShow) {
this.defineAll (iPt, m, true, false, false);
if (isDelete) return;
}var points =  new java.util.ArrayList ();
var nPoints = m.getCount ();
for (var i = 1; i <= nPoints; i++) {
var atomIndex = m.getAtomIndex (i);
points.add (atomIndex >= 0 ? this.viewer.getAtomBits (1095763969, Integer.$valueOf (this.atoms[atomIndex].getAtomNumber ())) : m.getAtom (i));
}
var md =  new org.jmol.modelset.MeasurementData (this.viewer, points, this.tokAction, this.radiusData, this.strFormat, null, this.tickInfo, this.mustBeConnected, this.mustNotBeConnected, this.intramolecular, true);
this.define (md, (isDelete ? 12291 : 1060866));
}, $fz.isPrivate = true, $fz), "~N,org.jmol.modelset.Measurement,~B,~B,~B");
Clazz.defineMethod (c$, "find", 
($fz = function (m) {
return org.jmol.modelset.Measurement.find (this.measurements, m);
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Measurement");
Clazz.defineMethod (c$, "setIndices", 
($fz = function () {
for (var i = 0; i < this.measurementCount; i++) this.measurements.get (i).setIndex (i);

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "define", 
($fz = function (md, tokAction) {
this.tokAction = tokAction;
md.define (this, this.modelSet);
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.MeasurementData,~N");
Clazz.overrideMethod (c$, "processNextMeasure", 
function (m) {
var iThis = this.find (m);
if (iThis >= 0) {
if (this.tokAction == 12291) {
this.deleteI (iThis);
} else if (this.strFormat != null) {
this.measurements.get (iThis).formatMeasurementAs (this.strFormat, null, true);
} else {
this.measurements.get (iThis).setHidden (this.tokAction == 1048588);
}} else if (this.tokAction == 1060866 || this.tokAction == 269484114) {
m.tickInfo = (this.tickInfo == null ? this.defaultTickInfo : this.tickInfo);
this.defineMeasurement (-1, m, true);
}}, "org.jmol.modelset.Measurement");
Clazz.defineMethod (c$, "defineMeasurement", 
($fz = function (i, m, doSelect) {
var value = m.getMeasurement ();
if (this.radiusData != null && !m.isInRange (this.radiusData, value)) return;
if (i == -2147483648) i = this.find (m);
if (i >= 0) {
this.measurements.get (i).setHidden (false);
if (doSelect) this.bsSelected.set (i);
return;
}var measureNew =  new org.jmol.modelset.Measurement (this.modelSet, m, value, this.colix, this.strFormat, this.measurementCount);
this.measurements.add (measureNew);
this.viewer.setStatusMeasuring ("measureCompleted", this.measurementCount++, measureNew.toVector (false).toString (), measureNew.getValue ());
}, $fz.isPrivate = true, $fz), "~N,org.jmol.modelset.Measurement,~B");
Clazz.defineMethod (c$, "deleteI", 
($fz = function (i) {
var msg = this.measurements.get (i).toVector (true).toString ();
this.measurements.remove (i);
this.measurementCount--;
this.viewer.setStatusMeasuring ("measureDeleted", i, msg, 0);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "pending", 
($fz = function (measurementPending) {
this.measurementPending = measurementPending;
if (measurementPending == null) return;
if (measurementPending.getCount () > 1) this.viewer.setStatusMeasuring ("measurePending", measurementPending.getCount (), measurementPending.toVector (false).toString (), measurementPending.getValue ());
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.MeasurementPending");
Clazz.defineMethod (c$, "reformatDistances", 
($fz = function () {
for (var i = this.measurementCount; --i >= 0; ) this.measurements.get (i).reformatDistanceIfSelected ();

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAllInfo", 
($fz = function () {
var info =  new java.util.ArrayList ();
for (var i = 0; i < this.measurementCount; i++) {
info.add (this.getInfo (i));
}
return info;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAllInfoAsString", 
($fz = function () {
var info = "Measurement Information";
for (var i = 0; i < this.measurementCount; i++) {
info += "\n" + this.getInfoAsString (i);
}
return info;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getInfo", 
($fz = function (index) {
var m = this.measurements.get (index);
var count = m.getCount ();
var info =  new java.util.Hashtable ();
info.put ("index", Integer.$valueOf (index));
info.put ("type", (count == 2 ? "distance" : count == 3 ? "angle" : "dihedral"));
info.put ("strMeasurement", m.getString ());
info.put ("count", Integer.$valueOf (count));
info.put ("value",  new Float (m.getValue ()));
var tickInfo = m.getTickInfo ();
if (tickInfo != null) {
info.put ("ticks", tickInfo.ticks);
if (tickInfo.scale != null) info.put ("tickScale", tickInfo.scale);
if (tickInfo.tickLabelFormats != null) info.put ("tickLabelFormats", tickInfo.tickLabelFormats);
if (!Float.isNaN (tickInfo.first)) info.put ("tickStart",  new Float (tickInfo.first));
}var atomsInfo =  new java.util.ArrayList ();
for (var i = 1; i <= count; i++) {
var atomInfo =  new java.util.Hashtable ();
var atomIndex = m.getAtomIndex (i);
atomInfo.put ("_ipt", Integer.$valueOf (atomIndex));
atomInfo.put ("coord", org.jmol.util.Escape.escapePt (m.getAtom (i)));
atomInfo.put ("atomno", Integer.$valueOf (atomIndex < 0 ? -1 : this.atoms[atomIndex].getAtomNumber ()));
atomInfo.put ("info", (atomIndex < 0 ? "<point>" : this.atoms[atomIndex].getInfo ()));
atomsInfo.add (atomInfo);
}
info.put ("atoms", atomsInfo);
return info;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getInfoAsString", 
($fz = function (index) {
return this.measurements.get (index).getInfoAsString (null);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setVisibilityInfo", 
function () {
var bsModels = this.viewer.getVisibleFramesBitSet ();
out : for (var i = this.measurementCount; --i >= 0; ) {
var m = this.measurements.get (i);
m.setVisible (false);
if (this.mad == 0 || m.isHidden ()) continue;
for (var iAtom = m.getCount (); iAtom > 0; iAtom--) {
var atomIndex = m.getAtomIndex (iAtom);
if (atomIndex >= 0) {
if (!this.modelSet.atoms[atomIndex].isClickable ()) continue out;
} else {
var modelIndex = m.getAtom (iAtom).modelIndex;
if (modelIndex >= 0 && !bsModels.get (modelIndex)) continue out;
}}
m.setVisible (true);
}
});
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var commands =  new org.jmol.util.StringXBuilder ();
org.jmol.shape.Shape.appendCmd (commands, "measures delete");
for (var i = 0; i < this.measurementCount; i++) org.jmol.shape.Shape.appendCmd (commands, this.getState (i));

org.jmol.shape.Shape.appendCmd (commands, "select *; set measures " + this.viewer.getMeasureDistanceUnits ());
org.jmol.shape.Shape.appendCmd (commands, org.jmol.shape.Shape.getFontCommand ("measures", this.font3d));
var nHidden = 0;
var temp =  new java.util.Hashtable ();
var bs = org.jmol.util.BitSetUtil.newBitSet (this.measurementCount);
for (var i = 0; i < this.measurementCount; i++) {
var m = this.measurements.get (i);
if (m.isHidden ()) {
nHidden++;
bs.set (i);
}if (this.bsColixSet != null && this.bsColixSet.get (i)) org.jmol.shape.Shape.setStateInfo (temp, i, this.getColorCommandUnk ("measure", m.getColix ()));
if (m.getStrFormat () != null) org.jmol.shape.Shape.setStateInfo (temp, i, "measure " + org.jmol.util.Escape.escapeStr (m.getStrFormat ()));
}
if (nHidden > 0) if (nHidden == this.measurementCount) org.jmol.shape.Shape.appendCmd (commands, "measures off; # lines and numbers off");
 else for (var i = 0; i < this.measurementCount; i++) if (bs.get (i)) org.jmol.shape.Shape.setStateInfo (temp, i, "measure off");

if (this.defaultTickInfo != null) {
commands.append (" measure ");
org.jmol.shape.FontLineShape.addTickInfo (commands, this.defaultTickInfo, true);
commands.append (";\n");
}if (this.mad >= 0) commands.append (" set measurements " + (this.mad / 2000)).append (";\n");
var s = org.jmol.shape.Shape.getShapeCommandsSel (temp, null, "select measures");
if (s != null && s.length != 0) {
commands.append (s);
org.jmol.shape.Shape.appendCmd (commands, "select measures ({null})");
}return commands.toString ();
});
Clazz.defineMethod (c$, "getState", 
($fz = function (index) {
var m = this.measurements.get (index);
var count = m.getCount ();
var sb =  new org.jmol.util.StringXBuilder ().append ("measure");
var tickInfo = m.getTickInfo ();
if (tickInfo != null) org.jmol.shape.FontLineShape.addTickInfo (sb, tickInfo, true);
for (var i = 1; i <= count; i++) sb.append (" ").append (m.getLabel (i, true, true));

sb.append ("; # " + this.getInfoAsString (index));
return sb.toString ();
}, $fz.isPrivate = true, $fz), "~N");
});
