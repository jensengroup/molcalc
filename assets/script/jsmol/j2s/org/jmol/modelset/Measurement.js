Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (null, "org.jmol.modelset.Measurement", ["java.lang.Float", "java.util.ArrayList", "org.jmol.atomdata.RadiusData", "org.jmol.constant.EnumVdw", "org.jmol.modelset.LabelToken", "org.jmol.util.AxisAngle4f", "$.Escape", "$.Measure", "$.Point3f", "$.StringXBuilder", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.modelSet = null;
this.traceX = -2147483648;
this.traceY = 0;
this.count = 0;
this.countPlusIndices = null;
this.pts = null;
this.strMeasurement = null;
this.strFormat = null;
this.value = 0;
this.$isVisible = true;
this.$isHidden = false;
this.$isDynamic = false;
this.$isTrajectory = false;
this.colix = 0;
this.index = 0;
this.aa = null;
this.pointArc = null;
this.tickInfo = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "Measurement");
Clazz.prepareFields (c$, function () {
this.countPlusIndices =  Clazz.newIntArray (5, 0);
});
Clazz.defineMethod (c$, "getCount", 
function () {
return this.count;
});
Clazz.defineMethod (c$, "setCount", 
function (count) {
this.count = this.countPlusIndices[0] = count;
}, "~N");
Clazz.defineMethod (c$, "getCountPlusIndices", 
function () {
return this.countPlusIndices;
});
Clazz.defineMethod (c$, "getPoints", 
function () {
return this.pts;
});
Clazz.defineMethod (c$, "getAtomIndex", 
function (n) {
return (n > 0 && n <= this.count ? this.countPlusIndices[n] : -1);
}, "~N");
Clazz.defineMethod (c$, "getAtom", 
function (i) {
var pt = this.countPlusIndices[i];
return (pt < -1 ? this.pts[-2 - pt] : this.modelSet.atoms[pt]);
}, "~N");
Clazz.defineMethod (c$, "getLastIndex", 
function () {
return (this.count > 0 ? this.countPlusIndices[this.count] : -1);
});
Clazz.defineMethod (c$, "getString", 
function () {
return this.strMeasurement;
});
Clazz.defineMethod (c$, "getStringUsing", 
function (viewer, strFormat, units) {
this.viewer = viewer;
this.value = this.getMeasurement ();
this.formatMeasurementAs (strFormat, units, true);
if (strFormat == null) return this.getInfoAsString (units);
return this.strMeasurement;
}, "org.jmol.viewer.Viewer,~S,~S");
Clazz.defineMethod (c$, "getStringDetail", 
function () {
return (this.count == 2 ? "Distance" : this.count == 3 ? "Angle" : "Torsion") + this.getMeasurementScript (" - ", false) + " : " + this.value;
});
Clazz.defineMethod (c$, "getStrFormat", 
function () {
return this.strFormat;
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.$isVisible;
});
Clazz.defineMethod (c$, "isHidden", 
function () {
return this.$isHidden;
});
Clazz.defineMethod (c$, "isDynamic", 
function () {
return this.$isDynamic;
});
Clazz.defineMethod (c$, "isTrajectory", 
function () {
return this.$isTrajectory;
});
Clazz.defineMethod (c$, "setVisible", 
function (TF) {
this.$isVisible = TF;
}, "~B");
Clazz.defineMethod (c$, "setHidden", 
function (TF) {
this.$isHidden = TF;
}, "~B");
Clazz.defineMethod (c$, "setDynamic", 
function (TF) {
this.$isDynamic = TF;
}, "~B");
Clazz.defineMethod (c$, "getColix", 
function () {
return this.colix;
});
Clazz.defineMethod (c$, "setColix", 
function (colix) {
this.colix = colix;
}, "~N");
Clazz.defineMethod (c$, "setIndex", 
function (index) {
this.index = index;
}, "~N");
Clazz.defineMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz.defineMethod (c$, "getAxisAngle", 
function () {
return this.aa;
});
Clazz.defineMethod (c$, "getPointArc", 
function () {
return this.pointArc;
});
Clazz.defineMethod (c$, "getTickInfo", 
function () {
return this.tickInfo;
});
Clazz.makeConstructor (c$, 
function (modelSet, m, value, colix, strFormat, index) {
this.index = index;
this.modelSet = modelSet;
this.viewer = modelSet.viewer;
this.colix = colix;
this.strFormat = strFormat;
if (m != null) {
this.tickInfo = m.tickInfo;
this.pts = m.pts;
}if (this.pts == null) this.pts =  new Array (4);
var indices = (m == null ? null : m.countPlusIndices);
this.count = (indices == null ? 0 : indices[0]);
if (this.count > 0) {
System.arraycopy (indices, 0, this.countPlusIndices, 0, this.count + 1);
this.$isTrajectory = modelSet.isTrajectoryMeasurement (this.countPlusIndices);
}this.value = (Float.isNaN (value) || this.$isTrajectory ? this.getMeasurement () : value);
this.formatMeasurement (null);
}, "org.jmol.modelset.ModelSet,org.jmol.modelset.Measurement,~N,~N,~S,~N");
Clazz.makeConstructor (c$, 
function (modelSet, indices, points, tickInfo) {
this.countPlusIndices = indices;
this.count = indices[0];
this.pts = (points == null ?  new Array (4) : points);
this.modelSet = modelSet;
this.viewer = modelSet.viewer;
this.tickInfo = tickInfo;
}, "org.jmol.modelset.ModelSet,~A,~A,org.jmol.modelset.TickInfo");
Clazz.defineMethod (c$, "refresh", 
function () {
this.value = this.getMeasurement ();
this.$isTrajectory = this.modelSet.isTrajectoryMeasurement (this.countPlusIndices);
this.formatMeasurement (null);
});
Clazz.defineMethod (c$, "getMeasurementScript", 
function (sep, withModelIndex) {
var str = "";
var asScript = (sep.equals (" "));
for (var i = 1; i <= this.count; i++) str += (i > 1 ? sep : " ") + this.getLabel (i, asScript, withModelIndex);

return str;
}, "~S,~B");
Clazz.defineMethod (c$, "formatMeasurementAs", 
function (strFormat, units, useDefault) {
if (strFormat != null && strFormat.length == 0) strFormat = null;
if (!useDefault && strFormat != null && strFormat.indexOf (this.countPlusIndices[0] + ":") != 0) return;
this.strFormat = strFormat;
this.formatMeasurement (units);
}, "~S,~S,~B");
Clazz.defineMethod (c$, "formatMeasurement", 
function (units) {
this.strMeasurement = null;
if (Float.isNaN (this.value) || this.count == 0) return;
switch (this.count) {
case 2:
this.strMeasurement = this.formatDistance (units);
return;
case 3:
if (this.value == 180) {
this.aa = null;
this.pointArc = null;
} else {
var vectorBA =  new org.jmol.util.Vector3f ();
var vectorBC =  new org.jmol.util.Vector3f ();
var radians = org.jmol.util.Measure.computeAngle (this.getAtom (1), this.getAtom (2), this.getAtom (3), vectorBA, vectorBC, false);
var vectorAxis =  new org.jmol.util.Vector3f ();
vectorAxis.cross (vectorBA, vectorBC);
this.aa = org.jmol.util.AxisAngle4f.new4 (vectorAxis.x, vectorAxis.y, vectorAxis.z, radians);
vectorBA.normalize ();
vectorBA.scale (0.5);
this.pointArc = org.jmol.util.Point3f.newP (vectorBA);
}case 4:
this.strMeasurement = this.formatAngle (this.value);
return;
}
}, "~S");
Clazz.defineMethod (c$, "reformatDistanceIfSelected", 
function () {
if (this.count != 2) return;
if (this.viewer.isSelected (this.countPlusIndices[1]) && this.viewer.isSelected (this.countPlusIndices[2])) this.formatMeasurement (null);
});
Clazz.defineMethod (c$, "formatDistance", 
($fz = function (units) {
var label = this.getLabelString ();
if (units == null) {
var pt = this.strFormat.indexOf ("//");
if (pt >= 0) {
units = this.strFormat.substring (pt + 2);
} else {
units = this.viewer.getMeasureDistanceUnits ();
this.strFormat += "//" + units;
}}units = org.jmol.modelset.Measurement.fixUnits (units);
var pt = label.indexOf ("//");
if (pt >= 0) label = label.substring (0, pt);
var f = this.fixValue (units, (label.indexOf ("%V") >= 0));
return this.formatString (f, units, label);
}, $fz.isPrivate = true, $fz), "~S");
c$.fixUnits = Clazz.defineMethod (c$, "fixUnits", 
($fz = function (units) {
if (units.equals ("nanometers")) return "nm";
 else if (units.equals ("picometers")) return "pm";
 else if (units.equals ("angstroms")) return "\u00C5";
 else if (units.equals ("vanderwaals") || units.equals ("vdw")) return "%";
return units;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "fixValue", 
function (units, andRound) {
if (this.count != 2) return this.value;
var dist = this.value;
if (units != null) {
if (units.equals ("%")) {
var i1 = this.getAtomIndex (1);
var i2 = this.getAtomIndex (2);
if (i1 >= 0 && i2 >= 0) {
var vdw = (this.getAtom (1)).getVanderwaalsRadiusFloat (this.viewer, org.jmol.constant.EnumVdw.AUTO) + (this.getAtom (2)).getVanderwaalsRadiusFloat (this.viewer, org.jmol.constant.EnumVdw.AUTO);
dist /= vdw;
return (andRound ? Math.round (dist * 1000) / 10 : dist * 100);
}units = "ang";
}if (units.equals ("nm")) return (andRound ? Math.round (dist * 100) / 1000 : dist / 10);
if (units.equals ("pm")) return (andRound ? Math.round (dist * 1000) / 10 : dist * 100);
if (units.equals ("au")) return (andRound ? Math.round (dist / 0.5291772 * 1000) / 1000 : dist / 0.5291772);
}return (andRound ? Math.round (dist * 100) / 100 : dist);
}, "~S,~B");
Clazz.defineMethod (c$, "formatAngle", 
($fz = function (angle) {
var label = this.getLabelString ();
if (label.indexOf ("%V") >= 0) angle = Math.round (angle * 10) / 10;
return this.formatString (angle, "\u00B0", label);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getLabelString", 
($fz = function () {
var s = this.countPlusIndices[0] + ":";
var label = (this.strFormat != null && this.strFormat.length > 2 && this.strFormat.indexOf (s) == 0 ? this.strFormat : null);
if (label == null) {
this.strFormat = null;
label = this.viewer.getDefaultMeasurementLabel (this.countPlusIndices[0]);
}if (label.indexOf (s) == 0) label = label.substring (2);
if (this.strFormat == null) this.strFormat = s + label;
return label;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "formatString", 
($fz = function (value, units, label) {
return org.jmol.modelset.LabelToken.formatLabelMeasure (this.viewer, this, label, value, units);
}, $fz.isPrivate = true, $fz), "~N,~S,~S");
Clazz.defineMethod (c$, "sameAsPoints", 
function (indices, points) {
if (this.count != indices[0]) return false;
var isSame = true;
for (var i = 1; i <= this.count && isSame; i++) isSame = (this.countPlusIndices[i] == indices[i]);

if (isSame) for (var i = 0; i < this.count && isSame; i++) {
if (points[i] != null) isSame = (this.pts[i].distance (points[i]) < 0.01);
}
if (isSame) return true;
switch (this.count) {
default:
return true;
case 2:
return this.sameAsIJ (indices, points, 1, 2) && this.sameAsIJ (indices, points, 2, 1);
case 3:
return this.sameAsIJ (indices, points, 1, 3) && this.sameAsIJ (indices, points, 2, 2) && this.sameAsIJ (indices, points, 3, 1);
case 4:
return this.sameAsIJ (indices, points, 1, 4) && this.sameAsIJ (indices, points, 2, 3) && this.sameAsIJ (indices, points, 3, 2) && this.sameAsIJ (indices, points, 4, 1);
}
}, "~A,~A");
Clazz.defineMethod (c$, "sameAsIJ", 
($fz = function (atoms, points, i, j) {
var ipt = this.countPlusIndices[i];
var jpt = atoms[j];
return (ipt >= 0 || jpt >= 0 ? ipt == jpt : this.pts[-2 - ipt].distance (points[-2 - jpt]) < 0.01);
}, $fz.isPrivate = true, $fz), "~A,~A,~N,~N");
Clazz.defineMethod (c$, "sameAs", 
function (i, j) {
return this.sameAsIJ (this.countPlusIndices, this.pts, i, j);
}, "~N,~N");
Clazz.defineMethod (c$, "toVector", 
function (asBitSet) {
var V =  new java.util.ArrayList ();
for (var i = 1; i <= this.count; i++) V.add (this.getLabel (i, asBitSet, false));

V.add (this.strMeasurement);
return V;
}, "~B");
Clazz.defineMethod (c$, "getMeasurement", 
function () {
if (this.countPlusIndices == null) return NaN;
if (this.count < 2) return NaN;
for (var i = this.count; --i >= 0; ) if (this.countPlusIndices[i + 1] == -1) {
return NaN;
}
var ptA = this.getAtom (1);
var ptB = this.getAtom (2);
var ptC;
var ptD;
switch (this.count) {
case 2:
return ptA.distance (ptB);
case 3:
ptC = this.getAtom (3);
return org.jmol.util.Measure.computeAngleABC (ptA, ptB, ptC, true);
case 4:
ptC = this.getAtom (3);
ptD = this.getAtom (4);
return org.jmol.util.Measure.computeTorsion (ptA, ptB, ptC, ptD, true);
default:
return NaN;
}
});
Clazz.defineMethod (c$, "getLabel", 
function (i, asBitSet, withModelIndex) {
var atomIndex = this.countPlusIndices[i];
return (atomIndex < 0 ? (withModelIndex ? "modelIndex " + this.getAtom (i).modelIndex + " " : "") + org.jmol.util.Escape.escapePt (this.getAtom (i)) : asBitSet ? "(({" + atomIndex + "}))" : this.viewer.getAtomInfo (atomIndex));
}, "~N,~B,~B");
Clazz.defineMethod (c$, "setModelIndex", 
function (modelIndex) {
if (this.pts == null) return;
for (var i = 0; i < this.count; i++) {
if (this.pts[i] != null) this.pts[i].modelIndex = modelIndex;
}
}, "~N");
Clazz.defineMethod (c$, "isValid", 
function () {
return !(this.sameAs (1, 2) || this.count > 2 && this.sameAs (1, 3) || this.count == 4 && this.sameAs (2, 4));
});
c$.find = Clazz.defineMethod (c$, "find", 
function (measurements, m) {
var indices = m.getCountPlusIndices ();
var points = m.getPoints ();
for (var i = measurements.size (); --i >= 0; ) if (measurements.get (i).sameAsPoints (indices, points)) return i;

return -1;
}, "java.util.List,org.jmol.modelset.Measurement");
Clazz.defineMethod (c$, "isConnected", 
function (atoms, count) {
var atomIndexLast = -1;
for (var i = 1; i <= count; i++) {
var atomIndex = this.getAtomIndex (i);
if (atomIndex < 0) continue;
if (atomIndexLast >= 0 && !atoms[atomIndex].isBonded (atoms[atomIndexLast])) return false;
atomIndexLast = atomIndex;
}
return true;
}, "~A,~N");
Clazz.defineMethod (c$, "getInfoAsString", 
function (units) {
var f = this.fixValue (units, true);
var sb =  new org.jmol.util.StringXBuilder ();
sb.append (this.count == 2 ? "distance" : this.count == 3 ? "angle" : "dihedral");
sb.append (" \t").appendF (f);
sb.append (" \t").append (this.getString ());
for (var i = 1; i <= this.count; i++) sb.append (" \t").append (this.getLabel (i, false, false));

return sb.toString ();
}, "~S");
Clazz.defineMethod (c$, "isInRange", 
function (radiusData, value) {
if (radiusData.factorType === org.jmol.atomdata.RadiusData.EnumType.FACTOR) {
var atom1 = this.getAtom (1);
var atom2 = this.getAtom (2);
var d = (atom1.getVanderwaalsRadiusFloat (this.viewer, radiusData.vdwType) + atom2.getVanderwaalsRadiusFloat (this.viewer, radiusData.vdwType)) * radiusData.value;
return (value <= d);
}return (radiusData.values[0] == 3.4028235E38 || value >= radiusData.values[0] && value <= radiusData.values[1]);
}, "org.jmol.atomdata.RadiusData,~N");
Clazz.defineMethod (c$, "isIntramolecular", 
function (atoms, count) {
var molecule = -1;
for (var i = 1; i <= count; i++) {
var atomIndex = this.getAtomIndex (i);
if (atomIndex < 0) continue;
var m = atoms[atomIndex].getMoleculeNumber (false);
if (molecule < 0) molecule = m;
 else if (m != molecule) return false;
}
return true;
}, "~A,~N");
});
