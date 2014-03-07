Clazz.declarePackage ("org.jmol.shapespecial");
Clazz.load (["org.jmol.shape.AtomShape", "org.jmol.atomdata.RadiusData", "org.jmol.util.BitSet"], "org.jmol.shapespecial.Dots", ["java.util.Hashtable", "org.jmol.constant.EnumVdw", "org.jmol.geodesic.EnvelopeCalculation", "org.jmol.util.BitSetUtil", "$.Colix", "$.Escape", "$.Logger", "$.Matrix3f", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ec = null;
this.isSurface = false;
this.bsOn = null;
this.bsSelected = null;
this.bsIgnore = null;
this.thisAtom = 0;
this.thisRadius = 0;
this.thisArgb = 0;
this.rdLast = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shapespecial, "Dots", org.jmol.shape.AtomShape);
Clazz.prepareFields (c$, function () {
this.bsOn =  new org.jmol.util.BitSet ();
this.rdLast =  new org.jmol.atomdata.RadiusData (null, 0, null, null);
});
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapespecial.Dots, "initShape", []);
this.translucentAllowed = false;
this.ec =  new org.jmol.geodesic.EnvelopeCalculation (this.viewer, this.atomCount, this.mads);
});
Clazz.defineMethod (c$, "getSize", 
function (atomIndex) {
return (this.mads == null ? Clazz.doubleToInt (Math.floor (this.ec.getRadius (atomIndex) * 2000)) : this.mads[atomIndex] * 2);
}, "~N");
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.initialize ();
return;
}if ("translucency" === propertyName) {
if (!this.translucentAllowed) return;
}if ("ignore" === propertyName) {
this.bsIgnore = value;
return;
}if ("select" === propertyName) {
this.bsSelected = value;
return;
}if ("radius" === propertyName) {
this.thisRadius = (value).floatValue ();
if (this.thisRadius > 16) this.thisRadius = 16;
return;
}if ("colorRGB" === propertyName) {
this.thisArgb = (value).intValue ();
return;
}if ("atom" === propertyName) {
this.thisAtom = (value).intValue ();
if (this.thisAtom >= this.atoms.length) return;
this.atoms[this.thisAtom].setShapeVisibility (this.myVisibilityFlag, true);
this.ec.allocDotsConvexMaps (this.atomCount);
return;
}if ("dots" === propertyName) {
if (this.thisAtom >= this.atoms.length) return;
this.isActive = true;
this.ec.setFromBits (this.thisAtom, value);
this.atoms[this.thisAtom].setShapeVisibility (this.myVisibilityFlag, true);
if (this.mads == null) {
this.ec.setMads (null);
this.mads =  Clazz.newShortArray (this.atomCount, 0);
for (var i = 0; i < this.atomCount; i++) if (this.atoms[i].isInFrame () && this.atoms[i].isShapeVisible (this.myVisibilityFlag)) try {
this.mads[i] = Clazz.floatToShort (this.ec.getAppropriateRadius (i) * 1000);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}

this.ec.setMads (this.mads);
}this.mads[this.thisAtom] = Clazz.floatToShort (this.thisRadius * 1000);
if (this.colixes == null) {
this.colixes =  Clazz.newShortArray (this.atomCount, 0);
this.paletteIDs =  Clazz.newByteArray (this.atomCount, 0);
}this.colixes[this.thisAtom] = org.jmol.util.Colix.getColix (this.thisArgb);
this.bsOn.set (this.thisAtom);
return;
}if ("refreshTrajectories" === propertyName) {
bs = (value)[1];
var m4 = (value)[2];
if (m4 == null) return;
var m =  new org.jmol.util.Matrix3f ();
m4.getRotationScale (m);
this.ec.reCalculate (bs, m);
return;
}if (propertyName === "deleteModelAtoms") {
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
org.jmol.util.BitSetUtil.deleteBits (this.bsOn, bs);
this.ec.deleteAtoms (firstAtomDeleted, nAtomsDeleted);
}Clazz.superCall (this, org.jmol.shapespecial.Dots, "setProperty", [propertyName, value, bs]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "initialize", 
function () {
this.bsSelected = null;
this.bsIgnore = null;
this.isActive = false;
if (this.ec == null) this.ec =  new org.jmol.geodesic.EnvelopeCalculation (this.viewer, this.atomCount, this.mads);
});
Clazz.overrideMethod (c$, "setSizeRD", 
function (rd, bsSelected) {
if (rd == null) rd =  new org.jmol.atomdata.RadiusData (null, 0, org.jmol.atomdata.RadiusData.EnumType.ABSOLUTE, null);
if (this.bsSelected != null) bsSelected = this.bsSelected;
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("Dots.setSize " + rd.value);
}var isVisible = true;
var setRadius = 3.4028235E38;
this.isActive = true;
switch (rd.factorType) {
case org.jmol.atomdata.RadiusData.EnumType.OFFSET:
break;
case org.jmol.atomdata.RadiusData.EnumType.ABSOLUTE:
if (rd.value == 0) isVisible = false;
setRadius = rd.value;
default:
rd.valueExtended = this.viewer.getCurrentSolventProbeRadius ();
}
var maxRadius;
switch (rd.vdwType) {
case org.jmol.constant.EnumVdw.ADPMIN:
case org.jmol.constant.EnumVdw.ADPMAX:
case org.jmol.constant.EnumVdw.HYDRO:
case org.jmol.constant.EnumVdw.TEMP:
maxRadius = setRadius;
break;
case org.jmol.constant.EnumVdw.IONIC:
maxRadius = this.modelSet.getMaxVanderwaalsRadius () * 2;
break;
default:
maxRadius = this.modelSet.getMaxVanderwaalsRadius ();
}
var newSet = (this.rdLast.value != rd.value || this.rdLast.valueExtended != rd.valueExtended || this.rdLast.factorType !== rd.factorType || this.rdLast.vdwType !== rd.vdwType || this.ec.getDotsConvexMax () == 0);
if (isVisible) {
for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) if (!this.bsOn.get (i)) {
this.bsOn.set (i);
newSet = true;
}
} else {
var isAll = (bsSelected == null);
var i0 = (isAll ? this.atomCount - 1 : bsSelected.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsSelected.nextSetBit (i + 1))) this.bsOn.setBitTo (i, false);

}for (var i = this.atomCount; --i >= 0; ) {
this.atoms[i].setShapeVisibility (this.myVisibilityFlag, this.bsOn.get (i));
}
if (!isVisible) return;
if (newSet) {
this.mads = null;
this.ec.newSet ();
}var dotsConvexMaps = this.ec.getDotsConvexMaps ();
if (dotsConvexMaps != null) {
for (var i = this.atomCount; --i >= 0; ) if (this.bsOn.get (i)) {
dotsConvexMaps[i] = null;
}
}if (dotsConvexMaps == null) {
this.colixes =  Clazz.newShortArray (this.atomCount, 0);
this.paletteIDs =  Clazz.newByteArray (this.atomCount, 0);
}this.ec.calculate (rd, maxRadius, this.bsOn, this.bsIgnore, !this.viewer.getDotSurfaceFlag (), this.viewer.getDotsSelectedOnlyFlag (), this.isSurface, true);
this.rdLast = rd;
}, "org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setModelClickability", 
function () {
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
if ((atom.getShapeVisibilityFlags () & this.myVisibilityFlag) == 0 || this.modelSet.isAtomHidden (i)) continue;
atom.setClickable (this.myVisibilityFlag);
}
});
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var dotsConvexMaps = this.ec.getDotsConvexMaps ();
if (dotsConvexMaps == null || this.ec.getDotsConvexMax () == 0) return "";
var s =  new org.jmol.util.StringXBuilder ();
var temp =  new java.util.Hashtable ();
var atomCount = this.viewer.getAtomCount ();
var type = (this.isSurface ? "geoSurface " : "dots ");
for (var i = 0; i < atomCount; i++) {
if (!this.bsOn.get (i) || dotsConvexMaps[i] == null) continue;
if (this.bsColixSet != null && this.bsColixSet.get (i)) org.jmol.shape.Shape.setStateInfo (temp, i, this.getColorCommand (type, this.paletteIDs[i], this.colixes[i]));
var bs = dotsConvexMaps[i];
if (!bs.isEmpty ()) {
var r = this.ec.getAppropriateRadius (i);
org.jmol.shape.Shape.appendCmd (s, type + i + " radius " + r + " " + org.jmol.util.Escape.escape (bs));
}}
s.append (org.jmol.shape.Shape.getShapeCommands (temp, null));
return s.toString ();
});
Clazz.defineStatics (c$,
"SURFACE_DISTANCE_FOR_CALCULATION", 10,
"MAX_LEVEL", 3);
});
