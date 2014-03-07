Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (["java.lang.Float", "org.jmol.util.BitSet", "$.Vector3f"], "org.jmol.modelset.AtomCollection", ["java.lang.Character", "java.util.ArrayList", "$.Arrays", "org.jmol.atomdata.RadiusData", "org.jmol.constant.EnumPalette", "$.EnumStructure", "$.EnumVdw", "org.jmol.geodesic.EnvelopeCalculation", "org.jmol.modelset.Group", "$.LabelToken", "org.jmol.script.Token", "org.jmol.util.ArrayUtil", "$.AxisAngle4f", "$.BitSetUtil", "$.Elements", "$.Escape", "$.Logger", "$.Matrix3f", "$.Measure", "$.Parser", "$.Point3f", "$.StringXBuilder", "$.TextFormat", "org.jmol.viewer.JmolConstants", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.g3d = null;
this.atoms = null;
this.atomCount = 0;
this.atomNames = null;
this.atomTypes = null;
this.atomSerials = null;
this.vibrationVectors = null;
this.occupancies = null;
this.bfactor100s = null;
this.partialCharges = null;
this.ionicRadii = null;
this.hydrophobicities = null;
this.ellipsoids = null;
this.surfaceDistance100s = null;
this.haveStraightness = false;
this.bsHidden = null;
this.maxBondingRadius = 1.4E-45;
this.maxVanderwaalsRadius = 1.4E-45;
this.hasBfactorRange = false;
this.bfactor100Lo = 0;
this.bfactor100Hi = 0;
this.surfaceDistanceMax = 0;
this.bsSurface = null;
this.nSurfaceAtoms = 0;
this.bspf = null;
this.preserveState = true;
this.tainted = null;
this.canSkipLoad = true;
this.bsEmpty = null;
this.bsFoundRectangle = null;
this.aaRet = null;
if (!Clazz.isClassDefined ("org.jmol.modelset.AtomCollection.AtomSorter")) {
org.jmol.modelset.AtomCollection.$AtomCollection$AtomSorter$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "AtomCollection");
Clazz.prepareFields (c$, function () {
this.bsHidden =  new org.jmol.util.BitSet ();
this.bsEmpty =  new org.jmol.util.BitSet ();
this.bsFoundRectangle =  new org.jmol.util.BitSet ();
});
Clazz.defineMethod (c$, "releaseModelSet", 
function () {
this.atoms = null;
this.viewer = null;
this.g3d = null;
this.bspf = null;
this.surfaceDistance100s = null;
this.bsSurface = null;
this.tainted = null;
this.atomNames = null;
this.atomTypes = null;
this.atomSerials = null;
this.vibrationVectors = null;
this.occupancies = null;
this.bfactor100s = null;
this.partialCharges = null;
this.ionicRadii = null;
this.ellipsoids = null;
});
Clazz.defineMethod (c$, "mergeAtomArrays", 
function (mergeModelSet) {
this.tainted = mergeModelSet.tainted;
this.atomNames = mergeModelSet.atomNames;
this.atomTypes = mergeModelSet.atomTypes;
this.atomSerials = mergeModelSet.atomSerials;
this.vibrationVectors = mergeModelSet.vibrationVectors;
this.occupancies = mergeModelSet.occupancies;
this.bfactor100s = mergeModelSet.bfactor100s;
this.ionicRadii = mergeModelSet.ionicRadii;
this.partialCharges = mergeModelSet.partialCharges;
this.ellipsoids = mergeModelSet.ellipsoids;
this.setHaveStraightness (false);
this.surfaceDistance100s = null;
}, "org.jmol.modelset.AtomCollection");
Clazz.defineMethod (c$, "setHaveStraightness", 
function (TF) {
this.haveStraightness = TF;
}, "~B");
Clazz.defineMethod (c$, "getHaveStraightness", 
function () {
return this.haveStraightness;
});
Clazz.defineMethod (c$, "getAtomPointVector", 
function (bs) {
var v =  new java.util.ArrayList ();
if (bs != null) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
v.add (this.atoms[i]);
}
}return v;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomCount", 
function () {
return this.atomCount;
});
Clazz.defineMethod (c$, "modelSetHasVibrationVectors", 
function () {
return (this.vibrationVectors != null);
});
Clazz.defineMethod (c$, "getAtomTypes", 
function () {
return this.atomTypes;
});
Clazz.defineMethod (c$, "getPartialCharges", 
function () {
return this.partialCharges;
});
Clazz.defineMethod (c$, "getIonicRadii", 
function () {
return this.ionicRadii;
});
Clazz.defineMethod (c$, "getBFactors", 
function () {
return this.bfactor100s;
});
Clazz.defineMethod (c$, "getHydrophobicity", 
function () {
return this.hydrophobicities;
});
Clazz.defineMethod (c$, "setBsHidden", 
function (bs) {
this.bsHidden = bs;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "isAtomHidden", 
function (iAtom) {
return this.bsHidden.get (iAtom);
}, "~N");
Clazz.defineMethod (c$, "getAtomInfo", 
function (i, format) {
return (format == null ? this.atoms[i].getInfo () : org.jmol.modelset.LabelToken.formatLabel (this.viewer, this.atoms[i], format));
}, "~N,~S");
Clazz.defineMethod (c$, "getAtomInfoXYZ", 
function (i, useChimeFormat) {
return this.atoms[i].getInfoXYZ (useChimeFormat);
}, "~N,~B");
Clazz.defineMethod (c$, "getElementSymbol", 
function (i) {
return this.atoms[i].getElementSymbol ();
}, "~N");
Clazz.defineMethod (c$, "getElementNumber", 
function (i) {
return this.atoms[i].getElementNumber ();
}, "~N");
Clazz.defineMethod (c$, "getElementName", 
function (i) {
return org.jmol.util.Elements.elementNameFromNumber (this.atoms[i].getAtomicAndIsotopeNumber ());
}, "~N");
Clazz.defineMethod (c$, "getAtomName", 
function (i) {
return this.atoms[i].getAtomName ();
}, "~N");
Clazz.defineMethod (c$, "getAtomNumber", 
function (i) {
return this.atoms[i].getAtomNumber ();
}, "~N");
Clazz.defineMethod (c$, "getAtomPoint3f", 
function (i) {
return this.atoms[i];
}, "~N");
Clazz.defineMethod (c$, "getAtomRadius", 
function (i) {
return this.atoms[i].getRadius ();
}, "~N");
Clazz.defineMethod (c$, "getAtomVdwRadius", 
function (i, type) {
return this.atoms[i].getVanderwaalsRadiusFloat (this.viewer, type);
}, "~N,org.jmol.constant.EnumVdw");
Clazz.defineMethod (c$, "getAtomColix", 
function (i) {
return this.atoms[i].getColix ();
}, "~N");
Clazz.defineMethod (c$, "getAtomChain", 
function (i) {
return "" + this.atoms[i].getChainID ();
}, "~N");
Clazz.defineMethod (c$, "getEllipsoid", 
function (i) {
return (i < 0 || this.ellipsoids == null || i >= this.ellipsoids.length ? null : this.ellipsoids[i]);
}, "~N");
Clazz.defineMethod (c$, "getQuaternion", 
function (i, qtype) {
return (i < 0 ? null : this.atoms[i].group.getQuaternion (qtype));
}, "~N,~S");
Clazz.defineMethod (c$, "getHelixData", 
function (bs, tokType) {
var iAtom = bs.nextSetBit (0);
return (iAtom < 0 ? "null" : this.atoms[iAtom].group.getHelixData (tokType, this.viewer.getQuaternionFrame (), this.viewer.getHelixStep ()));
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "getAtomIndexFromAtomNumber", 
function (atomNumber, bsVisibleFrames) {
for (var i = 0; i < this.atomCount; i++) {
var atom = this.atoms[i];
if (atom.getAtomNumber () == atomNumber && bsVisibleFrames.get (atom.modelIndex)) return i;
}
return -1;
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setFormalCharges", 
function (bs, formalCharge) {
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
this.atoms[i].setFormalCharge (formalCharge);
this.taintAtom (i, 4);
}
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "getAtomicCharges", 
function () {
var charges =  Clazz.newFloatArray (this.atomCount, 0);
for (var i = this.atomCount; --i >= 0; ) charges[i] = this.atoms[i].getElementNumber ();

return charges;
});
Clazz.defineMethod (c$, "getRadiusVdwJmol", 
function (atom) {
return org.jmol.util.Elements.getVanderwaalsMar (atom.getElementNumber (), org.jmol.constant.EnumVdw.JMOL) / 1000;
}, "org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "getMaxVanderwaalsRadius", 
function () {
if (this.maxVanderwaalsRadius == 1.4E-45) this.findMaxRadii ();
return this.maxVanderwaalsRadius;
});
Clazz.defineMethod (c$, "findMaxRadii", 
function () {
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
var bondingRadius = atom.getBondingRadiusFloat ();
if (bondingRadius > this.maxBondingRadius) this.maxBondingRadius = bondingRadius;
var vdwRadius = atom.getVanderwaalsRadiusFloat (this.viewer, org.jmol.constant.EnumVdw.AUTO);
if (vdwRadius > this.maxVanderwaalsRadius) this.maxVanderwaalsRadius = vdwRadius;
}
});
Clazz.defineMethod (c$, "clearBfactorRange", 
function () {
this.hasBfactorRange = false;
});
Clazz.defineMethod (c$, "calcBfactorRange", 
($fz = function (bs) {
if (this.hasBfactorRange) return;
this.bfactor100Lo = 2147483647;
this.bfactor100Hi = -2147483648;
if (bs == null) {
for (var i = 0; i < this.atomCount; i++) this.setBf (i);

} else {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.setBf (i);

}this.hasBfactorRange = true;
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setBf", 
($fz = function (i) {
var bf = this.atoms[i].getBfactor100 ();
if (bf < this.bfactor100Lo) this.bfactor100Lo = bf;
 else if (bf > this.bfactor100Hi) this.bfactor100Hi = bf;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getBfactor100Lo", 
function () {
if (!this.hasBfactorRange) {
if (this.viewer.isRangeSelected ()) {
this.calcBfactorRange (this.viewer.getSelectionSet (false));
} else {
this.calcBfactorRange (null);
}}return this.bfactor100Lo;
});
Clazz.defineMethod (c$, "getBfactor100Hi", 
function () {
this.getBfactor100Lo ();
return this.bfactor100Hi;
});
Clazz.defineMethod (c$, "getSurfaceDistanceMax", 
function () {
if (this.surfaceDistance100s == null) this.calcSurfaceDistances ();
return this.surfaceDistanceMax;
});
Clazz.defineMethod (c$, "calculateVolume", 
function (bs, vType) {
var volume = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) volume += this.atoms[i].getVolume (this.viewer, vType);

return volume;
}, "org.jmol.util.BitSet,org.jmol.constant.EnumVdw");
Clazz.defineMethod (c$, "getSurfaceDistance100", 
function (atomIndex) {
if (this.nSurfaceAtoms == 0) return -1;
if (this.surfaceDistance100s == null) this.calcSurfaceDistances ();
return this.surfaceDistance100s[atomIndex];
}, "~N");
Clazz.defineMethod (c$, "calcSurfaceDistances", 
($fz = function () {
this.calculateSurface (null, -1);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "calculateSurface", 
function (bsSelected, envelopeRadius) {
if (envelopeRadius < 0) envelopeRadius = 3.0;
var ec =  new org.jmol.geodesic.EnvelopeCalculation (this.viewer, this.atomCount, null);
ec.calculate ( new org.jmol.atomdata.RadiusData (null, envelopeRadius, org.jmol.atomdata.RadiusData.EnumType.ABSOLUTE, null), 3.4028235E38, bsSelected, org.jmol.util.BitSetUtil.copyInvert (bsSelected, this.atomCount), false, false, false, true);
var points = ec.getPoints ();
this.surfaceDistanceMax = 0;
this.bsSurface = ec.getBsSurfaceClone ();
this.surfaceDistance100s =  Clazz.newIntArray (this.atomCount, 0);
this.nSurfaceAtoms = org.jmol.util.BitSetUtil.cardinalityOf (this.bsSurface);
if (this.nSurfaceAtoms == 0 || points == null || points.length == 0) return points;
var radiusAdjust = (envelopeRadius == 3.4028235E38 ? 0 : envelopeRadius);
for (var i = 0; i < this.atomCount; i++) {
if (this.bsSurface.get (i)) {
this.surfaceDistance100s[i] = 0;
} else {
var dMin = 3.4028235E38;
var atom = this.atoms[i];
for (var j = points.length; --j >= 0; ) {
var d = Math.abs (points[j].distance (atom) - radiusAdjust);
if (d < 0 && org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("draw d" + j + " " + org.jmol.util.Escape.escapePt (points[j]) + " \"" + d + " ? " + atom.getInfo () + "\"");
dMin = Math.min (d, dMin);
}
var d = this.surfaceDistance100s[i] = Clazz.doubleToInt (Math.floor (dMin * 100));
this.surfaceDistanceMax = Math.max (this.surfaceDistanceMax, d);
}}
return points;
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "setAtomCoord", 
function (bs, tokType, xyzValues) {
var xyz = null;
var values = null;
var v = null;
var type = 0;
var nValues = 1;
if (Clazz.instanceOf (xyzValues, org.jmol.util.Point3f)) {
xyz = xyzValues;
} else if (Clazz.instanceOf (xyzValues, java.util.List)) {
v = xyzValues;
if ((nValues = v.size ()) == 0) return;
type = 1;
} else if (org.jmol.util.Escape.isAP (xyzValues)) {
values = xyzValues;
if ((nValues = values.length) == 0) return;
type = 2;
} else {
return;
}var n = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
switch (type) {
case 1:
if (n >= nValues) return;
xyz = v.get (n++);
break;
case 2:
if (n >= nValues) return;
xyz = values[n++];
break;
}
switch (tokType) {
case 1146095626:
this.setAtomCoord (i, xyz.x, xyz.y, xyz.z);
break;
case 1146095627:
this.atoms[i].setFractionalCoordTo (xyz, true);
this.taintAtom (i, 2);
break;
case 1146095629:
this.atoms[i].setFractionalCoordTo (xyz, false);
this.taintAtom (i, 2);
break;
case 1146095631:
this.setAtomVibrationVector (i, xyz.x, xyz.y, xyz.z);
break;
}
}
}, "org.jmol.util.BitSet,~N,~O");
Clazz.defineMethod (c$, "setAtomVibrationVector", 
($fz = function (atomIndex, x, y, z) {
this.setVibrationVector (atomIndex, x, y, z);
this.taintAtom (atomIndex, 12);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomCoord", 
function (atomIndex, x, y, z) {
if (atomIndex < 0 || atomIndex >= this.atomCount) return;
this.atoms[atomIndex].x = x;
this.atoms[atomIndex].y = y;
this.atoms[atomIndex].z = z;
this.taintAtom (atomIndex, 2);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomCoordRelative", 
function (atomIndex, x, y, z) {
if (atomIndex < 0 || atomIndex >= this.atomCount) return;
this.atoms[atomIndex].x += x;
this.atoms[atomIndex].y += y;
this.atoms[atomIndex].z += z;
this.taintAtom (atomIndex, 2);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomsCoordRelative", 
function (bs, x, y, z) {
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.setAtomCoordRelative (i, x, y, z);

}, "org.jmol.util.BitSet,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomProperty", 
function (bs, tok, iValue, fValue, sValue, values, list) {
var n = 0;
if (values != null && values.length == 0 || bs == null) return;
var isAll = (values != null && values.length == this.atomCount || list != null && list.length == this.atomCount);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (isAll) n = i;
if (values != null) {
if (n >= values.length) return;
fValue = values[n++];
iValue = Clazz.floatToInt (fValue);
} else if (list != null) {
if (n >= list.length) return;
sValue = list[n++];
}var atom = this.atoms[i];
switch (tok) {
case 1087375362:
this.taintAtom (i, 0);
this.setAtomName (i, sValue);
break;
case 1095763969:
this.taintAtom (i, 13);
this.setAtomNumber (i, iValue);
break;
case 1087375361:
this.taintAtom (i, 1);
this.setAtomType (i, sValue);
break;
case 1112541185:
case 1112541205:
this.setAtomCoord (i, fValue, atom.y, atom.z);
break;
case 1112541186:
case 1112541206:
this.setAtomCoord (i, atom.x, fValue, atom.z);
break;
case 1112541187:
case 1112541207:
this.setAtomCoord (i, atom.x, atom.y, fValue);
break;
case 1112541202:
case 1112541203:
case 1112541204:
this.setVibrationVector (i, tok, fValue);
break;
case 1112541188:
case 1112541189:
case 1112541190:
atom.setFractionalCoord (tok, fValue, true);
this.taintAtom (i, 2);
break;
case 1112541191:
case 1112541192:
case 1112541193:
atom.setFractionalCoord (tok, fValue, false);
this.taintAtom (i, 2);
break;
case 1095763976:
case 1087375365:
this.setElement (atom, iValue);
break;
case 1632634889:
atom.setFormalCharge (iValue);
this.taintAtom (i, 4);
break;
case 1114638346:
if (this.setHydrophobicity (i, fValue)) this.taintAtom (i, 5);
break;
case 1826248715:
case 1288701960:
this.viewer.setAtomLabel (sValue, i);
break;
case 1129318401:
if (iValue < 2) iValue = Clazz.doubleToInt (Math.floor (100 * fValue));
if (this.setOccupancy (i, iValue)) this.taintAtom (i, 7);
break;
case 1112541196:
if (this.setPartialCharge (i, fValue)) this.taintAtom (i, 8);
break;
case 1112541195:
if (this.setIonicRadius (i, fValue)) this.taintAtom (i, 6);
break;
case 1666189314:
case 1113200651:
if (fValue < 0) fValue = 0;
 else if (fValue > 16) fValue = 16;
atom.madAtom = (Clazz.floatToShort (fValue * 2000));
break;
case 1114638350:
this.viewer.setSelectedAtom (atom.index, (fValue != 0));
break;
case 1112541199:
if (this.setBFactor (i, fValue)) this.taintAtom (i, 9);
break;
case 1095763988:
atom.setValence (iValue);
this.taintAtom (i, 10);
break;
case 1649412112:
if (atom.setRadius (fValue)) this.taintAtom (i, 11);
 else this.untaint (i, 11);
break;
default:
org.jmol.util.Logger.error ("unsettable atom property: " + org.jmol.script.Token.nameOf (tok));
break;
}
}
if (tok == 1114638350) this.viewer.setSelectedAtom (-1, false);
}, "org.jmol.util.BitSet,~N,~N,~N,~S,~A,~A");
Clazz.defineMethod (c$, "setElement", 
function (atom, atomicNumber) {
this.taintAtom (atom.index, 3);
atom.setAtomicAndIsotopeNumber (atomicNumber);
atom.setPaletteID (org.jmol.constant.EnumPalette.CPK.id);
atom.setColixAtom (this.viewer.getColixAtomPalette (atom, org.jmol.constant.EnumPalette.CPK.id));
}, "org.jmol.modelset.Atom,~N");
Clazz.defineMethod (c$, "getVibrationCoord", 
function (atomIndex, c) {
if (this.vibrationVectors == null || this.vibrationVectors[atomIndex] == null) return 0;
switch (c) {
case 'X':
return this.vibrationVectors[atomIndex].x;
case 'Y':
return this.vibrationVectors[atomIndex].y;
default:
return this.vibrationVectors[atomIndex].z;
}
}, "~N,~S");
Clazz.defineMethod (c$, "getVibrationVector", 
function (atomIndex, forceNew) {
var v = (this.vibrationVectors == null ? null : this.vibrationVectors[atomIndex]);
return (v == null && forceNew ?  new org.jmol.util.Vector3f () : v);
}, "~N,~B");
Clazz.defineMethod (c$, "setVibrationVector", 
function (atomIndex, x, y, z) {
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) return;
if (this.vibrationVectors == null || this.vibrationVectors.length < atomIndex) this.vibrationVectors =  new Array (this.atoms.length);
if (this.vibrationVectors[atomIndex] == null) this.vibrationVectors[atomIndex] = org.jmol.util.Vector3f.new3 (x, y, z);
 else this.vibrationVectors[atomIndex].set (x, y, z);
this.atoms[atomIndex].setVibrationVector ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setVibrationVector", 
($fz = function (atomIndex, tok, fValue) {
var v = this.getVibrationVector (atomIndex, true);
if (v == null) v =  new org.jmol.util.Vector3f ();
switch (tok) {
case 1112541202:
v.x = fValue;
break;
case 1112541203:
v.y = fValue;
break;
case 1112541204:
v.z = fValue;
break;
}
this.setAtomVibrationVector (atomIndex, v.x, v.y, v.z);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "setAtomName", 
function (atomIndex, name) {
var id = org.jmol.viewer.JmolConstants.lookupSpecialAtomID (name);
this.atoms[atomIndex].atomID = id;
if (id > 0 && (this).models[this.atoms[atomIndex].modelIndex].isBioModel) return;
if (this.atomNames == null) this.atomNames =  new Array (this.atoms.length);
this.atomNames[atomIndex] = name;
}, "~N,~S");
Clazz.defineMethod (c$, "setAtomType", 
function (atomIndex, type) {
if (this.atomTypes == null) this.atomTypes =  new Array (this.atoms.length);
this.atomTypes[atomIndex] = type;
}, "~N,~S");
Clazz.defineMethod (c$, "setAtomNumber", 
function (atomIndex, atomno) {
if (this.atomSerials == null) {
this.atomSerials =  Clazz.newIntArray (this.atoms.length, 0);
}this.atomSerials[atomIndex] = atomno;
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "setOccupancy", 
function (atomIndex, occupancy) {
if (this.occupancies == null) {
if (occupancy == 100) return false;
this.occupancies =  Clazz.newByteArray (this.atoms.length, 0);
for (var i = this.atoms.length; --i >= 0; ) this.occupancies[i] = 100;

}this.occupancies[atomIndex] = (occupancy > 255 ? 255 : occupancy < 0 ? 0 : occupancy);
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "setPartialCharge", 
function (atomIndex, partialCharge) {
if (Float.isNaN (partialCharge)) return false;
if (this.partialCharges == null) {
if (partialCharge == 0 && !Float.$valueOf (partialCharge).equals (org.jmol.modelset.AtomCollection.MINUSZERO)) return false;
this.partialCharges =  Clazz.newFloatArray (this.atoms.length, 0);
}this.partialCharges[atomIndex] = partialCharge;
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "setIonicRadius", 
function (atomIndex, radius) {
if (Float.isNaN (radius)) return false;
if (this.ionicRadii == null) {
this.ionicRadii =  Clazz.newFloatArray (this.atoms.length, 0);
}this.ionicRadii[atomIndex] = radius;
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "setBFactor", 
function (atomIndex, bfactor) {
if (Float.isNaN (bfactor)) return false;
if (this.bfactor100s == null) {
if (bfactor == 0 && this.bfactor100s == null) return false;
this.bfactor100s =  Clazz.newShortArray (this.atoms.length, 0);
}this.bfactor100s[atomIndex] = Clazz.doubleToShort ((bfactor < -327.68 ? -327.68 : bfactor > 327.67 ? 327.67 : bfactor) * 100 + (bfactor < 0 ? -0.5 : 0.5));
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "setHydrophobicity", 
function (atomIndex, value) {
if (Float.isNaN (value)) return false;
if (this.hydrophobicities == null) {
this.hydrophobicities =  Clazz.newFloatArray (this.atoms.length, 0);
for (var i = 0; i < this.atoms.length; i++) this.hydrophobicities[i] = org.jmol.util.Elements.getHydrophobicity (this.atoms[i].getGroupID ());

}this.hydrophobicities[atomIndex] = value;
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "setEllipsoid", 
function (atomIndex, ellipsoid) {
if (ellipsoid == null) return;
if (this.ellipsoids == null) this.ellipsoids =  new Array (this.atoms.length);
this.ellipsoids[atomIndex] = ellipsoid;
}, "~N,~A");
Clazz.defineMethod (c$, "setAtomData", 
function (type, name, dataString, isDefault) {
var fData = null;
var bs = null;
switch (type) {
case 2:
this.loadCoordinates (dataString, false, !isDefault);
return;
case 12:
this.loadCoordinates (dataString, true, true);
return;
case 14:
fData =  Clazz.newFloatArray (this.atomCount, 0);
bs = org.jmol.util.BitSetUtil.newBitSet (this.atomCount);
break;
}
var lines = org.jmol.util.Parser.markLines (dataString, ';');
var n = 0;
try {
var nData = org.jmol.util.Parser.parseInt (dataString.substring (0, lines[0] - 1));
for (var i = 1; i <= nData; i++) {
var tokens = org.jmol.util.Parser.getTokens (org.jmol.util.Parser.parseTrimmed (dataString.substring (lines[i], lines[i + 1] - 1)));
var atomIndex = org.jmol.util.Parser.parseInt (tokens[0]) - 1;
if (atomIndex < 0 || atomIndex >= this.atomCount) continue;
var atom = this.atoms[atomIndex];
n++;
var pt = tokens.length - 1;
var x = org.jmol.util.Parser.parseFloatStr (tokens[pt]);
switch (type) {
case 14:
fData[atomIndex] = x;
bs.set (atomIndex);
continue;
case 13:
this.setAtomNumber (atomIndex, Clazz.floatToInt (x));
break;
case 0:
this.setAtomName (atomIndex, tokens[pt]);
break;
case 1:
this.setAtomType (atomIndex, tokens[pt]);
break;
case 3:
atom.setAtomicAndIsotopeNumber (Clazz.floatToInt (x));
atom.setPaletteID (org.jmol.constant.EnumPalette.CPK.id);
atom.setColixAtom (this.viewer.getColixAtomPalette (atom, org.jmol.constant.EnumPalette.CPK.id));
break;
case 4:
atom.setFormalCharge (Clazz.floatToInt (x));
break;
case 5:
this.setHydrophobicity (atomIndex, x);
break;
case 6:
this.setIonicRadius (atomIndex, x);
break;
case 8:
this.setPartialCharge (atomIndex, x);
break;
case 9:
this.setBFactor (atomIndex, x);
break;
case 10:
atom.setValence (Clazz.floatToInt (x));
break;
case 11:
atom.setRadius (x);
break;
}
this.taintAtom (atomIndex, type);
}
if (type == 14 && n > 0) this.viewer.setData (name, [name, fData, bs,  new Integer (1)], 0, 0, 0, 0, 0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("AtomCollection.loadData error: " + e);
} else {
throw e;
}
}
}, "~N,~S,~S,~B");
Clazz.defineMethod (c$, "loadCoordinates", 
($fz = function (data, isVibrationVectors, doTaint) {
var lines = org.jmol.util.Parser.markLines (data, ';');
try {
var nData = org.jmol.util.Parser.parseInt (data.substring (0, lines[0] - 1));
for (var i = 1; i <= nData; i++) {
var tokens = org.jmol.util.Parser.getTokens (org.jmol.util.Parser.parseTrimmed (data.substring (lines[i], lines[i + 1])));
var atomIndex = org.jmol.util.Parser.parseInt (tokens[0]) - 1;
var x = org.jmol.util.Parser.parseFloatStr (tokens[3]);
var y = org.jmol.util.Parser.parseFloatStr (tokens[4]);
var z = org.jmol.util.Parser.parseFloatStr (tokens[5]);
if (isVibrationVectors) {
this.setAtomVibrationVector (atomIndex, x, y, z);
} else {
this.setAtomCoord (atomIndex, x, y, z);
if (!doTaint) this.untaint (atomIndex, 2);
}}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("Frame.loadCoordinate error: " + e);
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S,~B,~B");
Clazz.defineMethod (c$, "validateBspf", 
function (isValid) {
if (this.bspf != null) this.bspf.validate (isValid);
}, "~B");
Clazz.defineMethod (c$, "validateBspfForModel", 
function (modelIndex, isValid) {
if (this.bspf != null) this.bspf.validateModel (modelIndex, isValid);
}, "~N,~B");
Clazz.defineMethod (c$, "setPreserveState", 
function (TF) {
this.preserveState = TF;
}, "~B");
c$.getUserSettableType = Clazz.defineMethod (c$, "getUserSettableType", 
function (dataType) {
var isExplicit = (dataType.indexOf ("property_") == 0);
var check = (isExplicit ? dataType.substring (9) : dataType);
for (var i = 0; i < 14; i++) if (org.jmol.modelset.AtomCollection.userSettableValues[i].equalsIgnoreCase (check)) return i;

return (isExplicit ? 14 : -1);
}, "~S");
Clazz.defineMethod (c$, "isTainted", 
($fz = function (atomIndex, type) {
return (this.tainted != null && this.tainted[type] != null && this.tainted[type].get (atomIndex));
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getTaintedAtoms", 
function (type) {
return this.tainted == null ? null : this.tainted[type];
}, "~N");
Clazz.defineMethod (c$, "taintAtoms", 
function (bsAtoms, type) {
this.canSkipLoad = false;
if (!this.preserveState) return;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) this.taintAtom (i, type);

}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "taintAtom", 
function (atomIndex, type) {
if (!this.preserveState) return;
if (this.tainted == null) this.tainted =  new Array (14);
if (this.tainted[type] == null) this.tainted[type] = org.jmol.util.BitSetUtil.newBitSet (this.atomCount);
this.tainted[type].set (atomIndex);
if (type == 2) this.validateBspfForModel (this.atoms[atomIndex].modelIndex, false);
}, "~N,~N");
Clazz.defineMethod (c$, "untaint", 
($fz = function (atomIndex, type) {
if (!this.preserveState) return;
if (this.tainted == null || this.tainted[type] == null) return;
this.tainted[type].clear (atomIndex);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setTaintedAtoms", 
function (bs, type) {
if (!this.preserveState) return;
if (bs == null) {
if (this.tainted == null) return;
this.tainted[type] = null;
return;
}if (this.tainted == null) this.tainted =  new Array (14);
if (this.tainted[type] == null) this.tainted[type] = org.jmol.util.BitSetUtil.newBitSet (this.atomCount);
org.jmol.util.BitSetUtil.copy2 (bs, this.tainted[type]);
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "unTaintAtoms", 
function (bs, type) {
if (this.tainted == null || this.tainted[type] == null) return;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) this.tainted[type].clear (i);

if (this.tainted[type].nextSetBit (0) < 0) this.tainted[type] = null;
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "getAtomicPropertyState", 
function (taintWhat, bsSelected) {
if (!this.preserveState) return "";
var bs;
var commands =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < 14; i++) if (taintWhat < 0 || i == taintWhat) if ((bs = (bsSelected != null ? bsSelected : this.getTaintedAtoms (i))) != null) this.getAtomicPropertyStateBuffer (commands, i, bs, null, null);

return commands.toString ();
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomicPropertyStateBuffer", 
function (commands, type, bs, label, fData) {
if (!this.viewer.getPreserveState ()) return;
var s =  new org.jmol.util.StringXBuilder ();
var dataLabel = (label == null ? org.jmol.modelset.AtomCollection.userSettableValues[type] : label) + " set";
var n = 0;
var isDefault = (type == 2);
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
s.appendI (i + 1).append (" ").append (this.atoms[i].getElementSymbol ()).append (" ").append (this.atoms[i].getInfo ().$replace (' ', '_')).append (" ");
switch (type) {
case 14:
if (i < fData.length) s.appendF (fData[i]);
break;
case 13:
s.appendI (this.atoms[i].getAtomNumber ());
break;
case 0:
s.append (this.atoms[i].getAtomName ());
break;
case 1:
s.append (this.atoms[i].getAtomType ());
break;
case 2:
if (this.isTainted (i, 2)) isDefault = false;
s.appendF (this.atoms[i].x).append (" ").appendF (this.atoms[i].y).append (" ").appendF (this.atoms[i].z);
break;
case 12:
var v = this.atoms[i].getVibrationVector ();
if (v == null) v =  new org.jmol.util.Vector3f ();
s.appendF (v.x).append (" ").appendF (v.y).append (" ").appendF (v.z);
break;
case 3:
s.appendI (this.atoms[i].getAtomicAndIsotopeNumber ());
break;
case 4:
s.appendI (this.atoms[i].getFormalCharge ());
break;
case 6:
s.appendF (this.atoms[i].getBondingRadiusFloat ());
break;
case 7:
s.appendI (this.atoms[i].getOccupancy100 ());
break;
case 8:
s.appendF (this.atoms[i].getPartialCharge ());
break;
case 9:
s.appendF (this.atoms[i].getBfactor100 () / 100);
break;
case 10:
s.appendI (this.atoms[i].getValence ());
break;
case 11:
s.appendF (this.atoms[i].getVanderwaalsRadiusFloat (this.viewer, org.jmol.constant.EnumVdw.AUTO));
break;
}
s.append (" ;\n");
++n;
}
if (n == 0) return;
if (isDefault) dataLabel += "(default)";
commands.append ("\n  DATA \"" + dataLabel + "\"\n").appendI (n).append (" ;\nJmol Property Data Format 1 -- Jmol ").append (org.jmol.viewer.Viewer.getJmolVersion ()).append (";\n");
commands.appendSB (s);
commands.append ("  end \"" + dataLabel + "\";\n");
}, "org.jmol.util.StringXBuilder,~N,org.jmol.util.BitSet,~S,~A");
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, bsNot) {
var champion = null;
var min = this.viewer.getMinPixelSelRadius ();
for (var i = this.atomCount; --i >= 0; ) {
if (bsNot != null && bsNot.get (i)) continue;
var contender = this.atoms[i];
if (contender.isClickable () && this.isCursorOnTopOf (contender, x, y, min, champion)) champion = contender;
}
closest[0] = champion;
}, "~N,~N,~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "isCursorOnTopOf", 
function (contender, x, y, radius, champion) {
return contender.screenZ > 1 && !this.g3d.isClippedZ (contender.screenZ) && this.g3d.isInDisplayRange (contender.screenX, contender.screenY) && contender.isCursorOnTopOf (x, y, radius, champion);
}, "org.jmol.modelset.Atom,~N,~N,~N,org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "findAtomsInRectangle", 
function (rect, bsModels) {
this.bsFoundRectangle.and (this.bsEmpty);
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
if (bsModels.get (atom.modelIndex) && atom.isVisible (0) && rect.contains (atom.screenX, atom.screenY)) this.bsFoundRectangle.set (i);
}
return this.bsFoundRectangle;
}, "org.jmol.util.Rectangle,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "fillAtomData", 
function (atomData, mode) {
atomData.atomXyz = this.atoms;
atomData.atomCount = this.atomCount;
atomData.atomicNumber =  Clazz.newIntArray (this.atomCount, 0);
var includeRadii = ((mode & 2) != 0);
if (includeRadii) atomData.atomRadius =  Clazz.newFloatArray (this.atomCount, 0);
var isMultiModel = ((mode & 16) != 0);
for (var i = 0; i < this.atomCount; i++) {
var atom = this.atoms[i];
if (atom.isDeleted () || !isMultiModel && atomData.modelIndex >= 0 && atom.modelIndex != atomData.firstModelIndex) {
if (atomData.bsIgnored == null) atomData.bsIgnored =  new org.jmol.util.BitSet ();
atomData.bsIgnored.set (i);
continue;
}atomData.atomicNumber[i] = atom.getElementNumber ();
atomData.lastModelIndex = atom.modelIndex;
if (includeRadii) atomData.atomRadius[i] = this.getWorkingRadius (atom, atomData);
}
}, "org.jmol.atomdata.AtomData,~N");
Clazz.defineMethod (c$, "getWorkingRadius", 
($fz = function (atom, atomData) {
var r = 0;
var rd = atomData.radiusData;
switch (rd.factorType) {
case org.jmol.atomdata.RadiusData.EnumType.ABSOLUTE:
r = rd.value;
break;
case org.jmol.atomdata.RadiusData.EnumType.FACTOR:
case org.jmol.atomdata.RadiusData.EnumType.OFFSET:
switch (rd.vdwType) {
case org.jmol.constant.EnumVdw.IONIC:
r = atom.getBondingRadiusFloat ();
break;
case org.jmol.constant.EnumVdw.ADPMAX:
r = atom.getADPMinMax (true);
break;
case org.jmol.constant.EnumVdw.ADPMIN:
r = atom.getADPMinMax (false);
break;
default:
r = atom.getVanderwaalsRadiusFloat (this.viewer, atomData.radiusData.vdwType);
}
if (rd.factorType === org.jmol.atomdata.RadiusData.EnumType.FACTOR) r *= rd.value;
 else r += rd.value;
}
return r + rd.valueExtended;
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,org.jmol.atomdata.AtomData");
Clazz.defineMethod (c$, "calculateHydrogens", 
function (bs, nTotal, doAll, justCarbon, vConnect) {
var z =  new org.jmol.util.Vector3f ();
var x =  new org.jmol.util.Vector3f ();
var hAtoms =  new Array (this.atomCount);
var bsDeleted = this.viewer.getDeletedAtoms ();
var pt;
var nH = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (bsDeleted != null && bsDeleted.get (i)) continue;
var atom = this.atoms[i];
var atomicNumber = atom.getElementNumber ();
if (justCarbon && atomicNumber != 6) continue;
var dHX = (atomicNumber <= 6 ? 1.1 : atomicNumber <= 10 ? 1.0 : 1.3);
switch (atomicNumber) {
case 7:
case 8:
dHX = 1.0;
break;
case 6:
}
if (doAll && atom.getCovalentHydrogenCount () > 0) continue;
var n = this.getImplicitHydrogenCount (atom);
if (n == 0) continue;
var targetValence = this.aaRet[0];
var hybridization = this.aaRet[2];
var nBonds = this.aaRet[3];
hAtoms[i] =  new Array (n);
var hPt = 0;
if (nBonds == 0) {
switch (n) {
case 4:
z.set (0.635, 0.635, 0.635);
pt = org.jmol.util.Point3f.newP (z);
pt.add (atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
case 3:
z.set (-0.635, -0.635, 0.635);
pt = org.jmol.util.Point3f.newP (z);
pt.add (atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
case 2:
z.set (-0.635, 0.635, -0.635);
pt = org.jmol.util.Point3f.newP (z);
pt.add (atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
case 1:
z.set (0.635, -0.635, -0.635);
pt = org.jmol.util.Point3f.newP (z);
pt.add (atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
}
} else {
switch (n) {
default:
break;
case 3:
this.getHybridizationAndAxes (i, atomicNumber, z, x, "sp3b", false, true);
pt =  new org.jmol.util.Point3f ();
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
this.getHybridizationAndAxes (i, atomicNumber, z, x, "sp3c", false, true);
pt =  new org.jmol.util.Point3f ();
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
this.getHybridizationAndAxes (i, atomicNumber, z, x, "sp3d", false, true);
pt =  new org.jmol.util.Point3f ();
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
break;
case 2:
var isEne = (hybridization == 2 || atomicNumber == 5 || nBonds == 1 && targetValence == 4 || atomicNumber == 7 && this.isAdjacentSp2 (atom));
this.getHybridizationAndAxes (i, atomicNumber, z, x, (isEne ? "sp2b" : targetValence == 3 ? "sp3c" : "lpa"), false, true);
pt = org.jmol.util.Point3f.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
this.getHybridizationAndAxes (i, atomicNumber, z, x, (isEne ? "sp2c" : targetValence == 3 ? "sp3d" : "lpb"), false, true);
pt = org.jmol.util.Point3f.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
break;
case 1:
switch (targetValence - nBonds) {
case 1:
if (atomicNumber == 8 && atom === atom.getGroup ().getCarbonylOxygenAtom ()) {
hAtoms[i] = null;
continue;
}if (this.getHybridizationAndAxes (i, atomicNumber, z, x, (hybridization == 2 || atomicNumber == 5 || atomicNumber == 7 && this.isAdjacentSp2 (atom) ? "sp2c" : "sp3d"), true, false) != null) {
pt = org.jmol.util.Point3f.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
} else {
hAtoms[i] =  new Array (0);
}break;
case 2:
this.getHybridizationAndAxes (i, atomicNumber, z, x, (targetValence == 4 ? "sp2c" : "sp2b"), false, false);
pt = org.jmol.util.Point3f.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
break;
case 3:
this.getHybridizationAndAxes (i, atomicNumber, z, x, "spb", false, true);
pt = org.jmol.util.Point3f.newP (z);
pt.scaleAdd2 (dHX, z, atom);
hAtoms[i][hPt++] = pt;
if (vConnect != null) vConnect.add (atom);
break;
}
}
}nH += hPt;
}
nTotal[0] = nH;
return hAtoms;
}, "org.jmol.util.BitSet,~A,~B,~B,java.util.List");
Clazz.defineMethod (c$, "isAdjacentSp2", 
($fz = function (atom) {
var bonds = atom.bonds;
for (var i = 0; i < bonds.length; i++) {
var b2 = bonds[i].getOtherAtom (atom).bonds;
for (var j = 0; j < b2.length; j++) switch (b2[j].order) {
case 515:
case 514:
case 2:
case 3:
return true;
}

}
return false;
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "getImplicitHydrogenCount", 
function (atom) {
var targetValence = atom.getTargetValence ();
var charge = atom.getFormalCharge ();
if (this.aaRet == null) this.aaRet =  Clazz.newIntArray (4, 0);
this.aaRet[0] = targetValence;
this.aaRet[1] = charge;
this.aaRet[2] = 0;
this.aaRet[3] = atom.getCovalentBondCount ();
var model = (this).models[atom.modelIndex];
var s = (model.isBioModel && !model.isPdbWithMultipleBonds ? atom.group.getGroup3 () : null);
if (s != null && charge == 0) {
if (org.jmol.viewer.JmolConstants.getAminoAcidValenceAndCharge (s, atom.getAtomName (), this.aaRet)) {
targetValence = this.aaRet[0];
charge = this.aaRet[1];
}}if (charge != 0) {
targetValence += (targetValence == 4 ? -Math.abs (charge) : charge);
this.aaRet[0] = targetValence;
}var n = targetValence - atom.getValence ();
return (n < 0 ? 0 : n);
}, "org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "getHybridizationAndAxes", 
function (atomIndex, atomicNumber, z, x, lcaoTypeRaw, hybridizationCompatible, doAlignZ) {
var lcaoType = (lcaoTypeRaw.length > 0 && lcaoTypeRaw.charAt (0) == '-' ? lcaoTypeRaw.substring (1) : lcaoTypeRaw);
if (lcaoTypeRaw.indexOf ("d") >= 0 && !lcaoTypeRaw.equals ("sp3d")) return this.getHybridizationAndAxesD (atomIndex, z, x, lcaoType);
var atom = this.atoms[atomIndex];
if (atomicNumber == 0) atomicNumber = atom.getElementNumber ();
var attached = this.getAttached (atom, 4, hybridizationCompatible);
var nAttached = attached.length;
var pt = lcaoType.charCodeAt (lcaoType.length - 1) - 97;
if (pt < 0 || pt > 6) pt = 0;
var vTemp =  new org.jmol.util.Vector3f ();
z.set (0, 0, 0);
x.set (0, 0, 0);
var v =  new Array (4);
for (var i = 0; i < nAttached; i++) {
v[i] = org.jmol.util.Vector3f.newV (atom);
v[i].sub (attached[i]);
v[i].normalize ();
z.add (v[i]);
}
if (nAttached > 0) x.setT (v[0]);
var isPlanar = false;
if (nAttached >= 3) {
if (x.angle (v[1]) < 2.984513) vTemp.cross (x, v[1]);
 else vTemp.cross (x, v[2]);
vTemp.normalize ();
var vTemp2 =  new org.jmol.util.Vector3f ();
if (v[1].angle (v[2]) < 2.984513) vTemp2.cross (v[1], v[2]);
 else vTemp2.cross (x, v[2]);
vTemp2.normalize ();
isPlanar = (Math.abs (vTemp2.dot (vTemp)) >= 0.95);
}var isSp3 = (lcaoType.indexOf ("sp3") == 0);
var isSp2 = (!isSp3 && lcaoType.indexOf ("sp2") == 0);
var isSp = (!isSp3 && !isSp2 && lcaoType.indexOf ("sp") == 0);
var isP = (lcaoType.indexOf ("p") == 0);
var isLp = (lcaoType.indexOf ("lp") == 0);
var hybridization = null;
if (hybridizationCompatible) {
if (nAttached == 0) return null;
if (isSp3) {
if (pt > 3 || nAttached > 4) return null;
} else if (isSp2) {
if (pt > 2 || nAttached > 3) return null;
} else if (isSp) {
if (pt > 1 || nAttached > 2) return null;
}switch (nAttached) {
case 1:
if (atomicNumber == 1 && !isSp3) return null;
if (isSp3) {
hybridization = "sp3";
break;
}switch (attached[0].getCovalentBondCount ()) {
case 1:
if (attached[0].getValence () != 2) {
hybridization = "sp";
break;
}case 2:
hybridization = (isSp ? "sp" : "sp2");
break;
case 3:
if (!isSp2 && !isP) return null;
hybridization = "sp2";
break;
}
break;
case 2:
if (z.length () < 0.1) {
if (lcaoType.indexOf ("2") >= 0 || lcaoType.indexOf ("3") >= 0) return null;
hybridization = "sp";
break;
}hybridization = (isSp3 ? "sp3" : "sp2");
if (lcaoType.indexOf ("sp") == 0) {
break;
}if (isLp) {
hybridization = "lp";
break;
}hybridization = lcaoType;
break;
default:
if (isPlanar) {
hybridization = "sp2";
} else {
if (isLp && nAttached == 3) {
hybridization = "lp";
break;
}hybridization = "sp3";
}}
if (hybridization == null) return null;
if (lcaoType.indexOf ("p") == 0) {
if (hybridization === "sp3") return null;
} else if (lcaoType.indexOf (hybridization) < 0) {
return null;
}}if (pt < nAttached && !lcaoType.startsWith ("p") && !lcaoType.startsWith ("l")) {
z.sub2 (attached[pt], atom);
z.normalize ();
return hybridization;
}switch (nAttached) {
case 0:
if (lcaoType.equals ("sp3c") || lcaoType.equals ("sp2d") || lcaoType.equals ("lpa")) {
z.set (-0.5, -0.7, 1);
x.set (1, 0, 0);
} else if (lcaoType.equals ("sp3b") || lcaoType.equals ("lpb")) {
z.set (0.5, -0.7, -1.0);
x.set (1, 0, 0);
} else if (lcaoType.equals ("sp3a")) {
z.set (0, 1, 0);
x.set (1, 0, 0);
} else {
z.set (0, 0, 1);
x.set (1, 0, 0);
}break;
case 1:
vTemp.setT (org.jmol.modelset.AtomCollection.vRef);
x.cross (vTemp, z);
if (isSp3) {
for (var i = 0; i < attached[0].bonds.length; i++) {
if (attached[0].bonds[i].isCovalent () && attached[0].getBondedAtomIndex (i) != atom.index) {
x.sub2 (attached[0], attached[0].bonds[i].getOtherAtom (attached[0]));
x.cross (z, x);
if (x.length () == 0) continue;
x.cross (x, z);
break;
}}
x.normalize ();
if (Float.isNaN (x.x)) {
x.setT (org.jmol.modelset.AtomCollection.vRef);
x.cross (x, z);
}vTemp.cross (z, x);
vTemp.normalize ();
z.normalize ();
x.scaleAdd2 (2.828, x, z);
if (pt != 3) {
x.normalize ();
var a = org.jmol.util.AxisAngle4f.new4 (z.x, z.y, z.z, (pt == 2 ? 1 : -1) * 2.09439507);
var m =  new org.jmol.util.Matrix3f ();
m.setIdentity ();
m.setAA (a);
m.transform (x);
}z.setT (x);
x.cross (vTemp, z);
break;
}vTemp.cross (x, z);
switch (attached[0].getCovalentBondCount ()) {
case 1:
if (attached[0].getValence () != 2) {
break;
}case 2:
var isCumulated = false;
var a0 = attached[0];
x.setT (z);
vTemp.setT (org.jmol.modelset.AtomCollection.vRef);
while (a0 != null && a0.getCovalentBondCount () == 2) {
var bonds = a0.bonds;
var a = null;
isCumulated = !isCumulated;
for (var i = 0; i < bonds.length; i++) if (bonds[i].isCovalent ()) {
a = bonds[i].getOtherAtom (a0);
if (a !== atom) {
vTemp.sub2 (a, a0);
break;
}}
vTemp.cross (vTemp, x);
if (vTemp.length () > 0.1 || a.getCovalentBondCount () != 2) break;
atom = a0;
a0 = a;
}
if (vTemp.length () > 0.1) {
z.cross (vTemp, x);
z.normalize ();
if (pt == 1) z.scale (-1);
z.scale (org.jmol.modelset.AtomCollection.sqrt3_2);
z.scaleAdd2 (0.5, x, z);
if (isP) {
vTemp.cross (z, x);
z.setT (vTemp);
vTemp.setT (x);
}x.cross (vTemp, z);
} else {
z.setT (x);
x.cross (org.jmol.modelset.AtomCollection.vRef, x);
}break;
case 3:
this.getHybridizationAndAxes (attached[0].index, 0, x, vTemp, "pz", false, doAlignZ);
vTemp.setT (x);
if (isSp2) {
x.cross (x, z);
if (pt == 1) x.scale (-1);
x.scale (org.jmol.modelset.AtomCollection.sqrt3_2);
z.scaleAdd2 (0.5, z, x);
} else {
vTemp.setT (z);
z.setT (x);
}x.cross (vTemp, z);
break;
}
break;
case 2:
if (z.length () < 0.1) {
if (!lcaoType.equals ("pz")) {
var a = attached[0];
var ok = (a.getCovalentBondCount () == 3);
if (!ok) ok = ((a = attached[1]).getCovalentBondCount () == 3);
if (ok) {
this.getHybridizationAndAxes (a.index, 0, x, z, "pz", false, doAlignZ);
if (lcaoType.equals ("px")) x.scale (-1);
z.setT (v[0]);
break;
}vTemp.setT (org.jmol.modelset.AtomCollection.vRef);
z.cross (vTemp, x);
vTemp.cross (z, x);
}z.setT (x);
x.cross (vTemp, z);
break;
}vTemp.cross (z, x);
if (isSp2) {
x.cross (z, vTemp);
break;
}if (isSp3 || isLp) {
vTemp.normalize ();
z.normalize ();
if (!lcaoType.equals ("lp")) {
if (pt == 0 || pt == 2) z.scaleAdd2 (-1.2, vTemp, z);
 else z.scaleAdd2 (1.2, vTemp, z);
}x.cross (z, vTemp);
break;
}x.cross (z, vTemp);
z.setT (vTemp);
if (z.z < 0) {
z.scale (-1);
x.scale (-1);
}break;
default:
if (isSp3) break;
if (!isPlanar) {
x.cross (z, x);
break;
}z.setT (vTemp);
if (z.z < 0 && doAlignZ) {
z.scale (-1);
x.scale (-1);
}}
x.normalize ();
z.normalize ();
return hybridization;
}, "~N,~N,org.jmol.util.Vector3f,org.jmol.util.Vector3f,~S,~B,~B");
Clazz.defineMethod (c$, "getHybridizationAndAxesD", 
($fz = function (atomIndex, z, x, lcaoType) {
if (lcaoType.startsWith ("sp3d2")) lcaoType = "d2sp3" + (lcaoType.length == 5 ? "a" : lcaoType.substring (5));
if (lcaoType.startsWith ("sp3d")) lcaoType = "dsp3" + (lcaoType.length == 4 ? "a" : lcaoType.substring (4));
if (lcaoType.equals ("d2sp3") || lcaoType.equals ("dsp3")) lcaoType += "a";
var isTrigonal = lcaoType.startsWith ("dsp3");
var pt = lcaoType.charCodeAt (lcaoType.length - 1) - 97;
if (z != null && (!isTrigonal && (pt > 5 || !lcaoType.startsWith ("d2sp3")) || isTrigonal && pt > 4)) return null;
var atom = this.atoms[atomIndex];
var attached = this.getAttached (atom, 6, true);
if (attached == null) return (z == null ? null : "?");
var nAttached = attached.length;
if (nAttached < 3 && z != null) return null;
var isLP = (pt >= nAttached);
var nAngles = Clazz.doubleToInt (nAttached * (nAttached - 1) / 2);
var angles = org.jmol.util.ArrayUtil.newInt2 (nAngles);
var ntypes =  Clazz.newIntArray (3, 0);
var typePtrs =  Clazz.newIntArray (3, nAngles, 0);
var n = 0;
var _90 = 0;
var _120 = 1;
var _180 = 2;
var n120_atom0 = 0;
for (var i = 0; i < nAttached - 1; i++) for (var j = i + 1; j < nAttached; j++) {
var angle = org.jmol.util.Measure.computeAngleABC (attached[i], atom, attached[j], true);
var itype = (angle < 105 ? _90 : angle >= 150 ? _180 : _120);
typePtrs[itype][ntypes[itype]] = n;
ntypes[itype]++;
angles[n++] = [i, j];
if (i == 0 && itype == _120) n120_atom0++;
}

n = ntypes[_90] * 100 + ntypes[_120] * 10 + ntypes[_180];
if (z == null) {
switch (n) {
default:
return "";
case 0:
return "";
case 1:
return "linear";
case 100:
case 10:
return "bent";
case 111:
case 201:
return "T-shaped";
case 30:
case 120:
case 210:
case 300:
if (Math.abs (org.jmol.util.Measure.computeTorsion (attached[0], atom, attached[1], attached[2], true)) > 162) return "trigonal planar";
return "trigonal pyramidal";
case 330:
return (n120_atom0 % 2 == 1 ? "tetrahedral" : "uncapped trigonal pyramid");
case 60:
case 150:
case 240:
return "tetrahedral";
case 402:
return "square planar";
case 411:
case 501:
return "see-saw";
case 631:
return "trigonal bipyramidal";
case 802:
return "uncapped square pyramid";
case 1203:
return "octahedral";
}
}switch (n) {
default:
return null;
case 201:
break;
case 210:
case 330:
case 411:
case 631:
if (!isTrigonal) return null;
break;
case 300:
case 402:
case 501:
case 802:
case 1203:
if (isTrigonal) return null;
break;
}
if (isLP) {
var a;
var bs;
if (isTrigonal) {
switch (ntypes[_120]) {
case 0:
z.sub2 (attached[angles[typePtrs[_90][0]][0]], atom);
x.sub2 (attached[angles[typePtrs[_90][0]][1]], atom);
z.cross (z, x);
z.normalize ();
if (pt == 4) z.scale (-1);
bs = this.findNotAttached (nAttached, angles, typePtrs[_180], ntypes[_180]);
var i = bs.nextSetBit (0);
x.sub2 (attached[i], atom);
x.normalize ();
x.scale (0.5);
z.scaleAdd2 (org.jmol.modelset.AtomCollection.sqrt3_2, z, x);
pt = -1;
break;
case 1:
if (pt == 4) {
a = angles[typePtrs[_120][0]];
z.add2 (attached[a[0]], attached[a[1]]);
z.scaleAdd2 (-2, atom, z);
pt = -1;
} else {
bs = this.findNotAttached (nAttached, angles, typePtrs[_120], ntypes[_120]);
pt = bs.nextSetBit (0);
}break;
default:
bs = this.findNotAttached (nAttached, angles, typePtrs[_120], ntypes[_120]);
pt = bs.nextSetBit (0);
}
} else {
var isPlanar = false;
if (nAttached == 4) {
switch (ntypes[_180]) {
case 1:
bs = this.findNotAttached (nAttached, angles, typePtrs[_180], ntypes[_180]);
var i = bs.nextSetBit (0);
if (pt == 4) pt = i;
 else pt = bs.nextSetBit (i + 1);
break;
default:
isPlanar = true;
}
} else {
bs = this.findNotAttached (nAttached, angles, typePtrs[_180], ntypes[_180]);
var i = bs.nextSetBit (0);
for (var j = nAttached; j < pt && i >= 0; j++) i = bs.nextSetBit (i + 1);

if (i == -1) isPlanar = true;
 else pt = i;
}if (isPlanar) {
z.sub2 (attached[angles[typePtrs[_90][0]][0]], atom);
x.sub2 (attached[angles[typePtrs[_90][0]][1]], atom);
z.cross (z, x);
if (pt == 4) z.scale (-1);
pt = -1;
}}}if (pt >= 0) z.sub2 (attached[pt], atom);
if (isLP) z.scale (-1);
z.normalize ();
return (isTrigonal ? "dsp3" : "d2sp3");
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.Vector3f,org.jmol.util.Vector3f,~S");
Clazz.defineMethod (c$, "getAttached", 
($fz = function (atom, nMax, doSort) {
var nAttached = atom.getCovalentBondCount ();
if (nAttached > nMax) return null;
var attached =  new Array (nAttached);
if (nAttached > 0) {
var bonds = atom.bonds;
var n = 0;
for (var i = 0; i < bonds.length; i++) if (bonds[i].isCovalent ()) attached[n++] = bonds[i].getOtherAtom (atom);

if (doSort) java.util.Arrays.sort (attached, Clazz.innerTypeInstance (org.jmol.modelset.AtomCollection.AtomSorter, this, null));
}return attached;
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,~N,~B");
Clazz.defineMethod (c$, "findNotAttached", 
($fz = function (nAttached, angles, ptrs, nPtrs) {
var bs = org.jmol.util.BitSetUtil.newBitSet (nAttached);
bs.setBits (0, nAttached);
for (var i = 0; i < nAttached; i++) for (var j = 0; j < nPtrs; j++) {
var a = angles[ptrs[j]];
if (a[0] == i || a[1] == i) bs.clear (i);
}

return bs;
}, $fz.isPrivate = true, $fz), "~N,~A,~A,~N");
Clazz.defineMethod (c$, "getChimeInfo", 
function (tok, bs) {
var info =  new org.jmol.util.StringXBuilder ();
info.append ("\n");
var id;
var s = "";
var clast = null;
var glast = null;
var modelLast = -1;
var n = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
id = this.atoms[i].getChainID ();
s = (id == '\0' ? " " : "" + id);
switch (tok) {
case 1087373316:
break;
case 1114638350:
s = this.atoms[i].getInfo ();
break;
case 1141899265:
s = "" + this.atoms[i].getAtomNumber ();
break;
case 1087373318:
s = this.atoms[i].getGroup3 (false);
break;
case 1073742120:
s = "[" + this.atoms[i].getGroup3 (false) + "]" + this.atoms[i].getSeqcodeString () + ":" + s;
break;
case 1087373320:
if (this.atoms[i].getModelIndex () != modelLast) {
info.appendC ('\n');
n = 0;
modelLast = this.atoms[i].getModelIndex ();
info.append ("Model " + this.atoms[i].getModelNumber ());
glast = null;
clast = null;
}if (this.atoms[i].getChain () !== clast) {
info.appendC ('\n');
n = 0;
clast = this.atoms[i].getChain ();
info.append ("Chain " + s + ":\n");
glast = null;
}var g = this.atoms[i].getGroup ();
if (g !== glast) {
if ((n++) % 5 == 0 && n > 1) info.appendC ('\n');
org.jmol.util.TextFormat.lFill (info, "          ", "[" + this.atoms[i].getGroup3 (false) + "]" + this.atoms[i].getResno () + " ");
glast = g;
}continue;
default:
return "";
}
if (info.indexOf ("\n" + s + "\n") < 0) info.append (s).appendC ('\n');
}
if (tok == 1087373320) info.appendC ('\n');
return info.toString ().substring (1);
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomBitsMaybeDeleted", 
function (tokType, specInfo) {
var bs =  new org.jmol.util.BitSet ();
var bsInfo;
var bsTemp;
var iSpec;
var i = 0;
switch (tokType) {
case 1095763969:
iSpec = (specInfo).intValue ();
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].getAtomNumber () == iSpec) bs.set (i);

break;
case 1087375362:
var names = "," + specInfo + ",";
for (i = this.atomCount; --i >= 0; ) {
var name = this.atoms[i].getAtomName ();
if (names.indexOf (name) >= 0) if (names.indexOf ("," + name + ",") >= 0) bs.set (i);
}
break;
case 1087375361:
var types = "," + specInfo + ",";
for (i = this.atomCount; --i >= 0; ) {
var type = this.atoms[i].getAtomType ();
if (types.indexOf (type) >= 0) if (types.indexOf ("," + type + ",") >= 0) bs.set (i);
}
break;
case 1048613:
iSpec = (specInfo).intValue ();
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].getGroupID () == iSpec) bs.set (i);

break;
case 1048609:
return org.jmol.util.BitSetUtil.copy (this.getChainBits (String.fromCharCode ((specInfo).intValue ())));
case 1048614:
return org.jmol.util.BitSetUtil.copy (this.getSeqcodeBits ((specInfo).intValue (), true));
case 1613758470:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isHetero ()) bs.set (i);

break;
case 1613758476:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].getElementNumber () == 1) bs.set (i);

break;
case 3145744:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isProtein ()) bs.set (i);

break;
case 3145764:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isCarbohydrate ()) bs.set (i);

break;
case 137363468:
case 3145760:
var type = (tokType == 137363468 ? org.jmol.constant.EnumStructure.HELIX : org.jmol.constant.EnumStructure.SHEET);
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isWithinStructure (type)) bs.set (i);

break;
case 3145742:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isNucleic ()) bs.set (i);

break;
case 3145732:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isDna ()) bs.set (i);

break;
case 3145750:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isRna ()) bs.set (i);

break;
case 3145746:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isPurine ()) bs.set (i);

break;
case 3145748:
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isPyrimidine ()) bs.set (i);

break;
case 1087375365:
bsInfo = specInfo;
bsTemp =  new org.jmol.util.BitSet ();
for (i = bsInfo.nextSetBit (0); i >= 0; i = bsInfo.nextSetBit (i + 1)) bsTemp.set (this.getElementNumber (i));

for (i = this.atomCount; --i >= 0; ) if (bsTemp.get (this.getElementNumber (i))) bs.set (i);

break;
case 1095761938:
bsInfo = specInfo;
bsTemp =  new org.jmol.util.BitSet ();
for (i = bsInfo.nextSetBit (0); i >= 0; i = bsInfo.nextSetBit (i + 1)) bsTemp.set (this.atoms[i].atomSite);

for (i = this.atomCount; --i >= 0; ) if (bsTemp.get (this.atoms[i].atomSite)) bs.set (i);

break;
case 1073741824:
return this.getIdentifierOrNull (specInfo);
case 1048608:
var atomSpec = (specInfo).toUpperCase ();
if (atomSpec.indexOf ("\\?") >= 0) atomSpec = org.jmol.util.TextFormat.simpleReplace (atomSpec, "\\?", "\1");
for (i = this.atomCount; --i >= 0; ) if (this.isAtomNameMatch (this.atoms[i], atomSpec, false)) bs.set (i);

break;
case 1048607:
var spec = specInfo;
for (i = this.atomCount; --i >= 0; ) if (this.atoms[i].isAlternateLocationMatch (spec)) bs.set (i);

break;
case 1048612:
return this.getSpecName (specInfo);
}
if (i < 0) return bs;
bsInfo = specInfo;
var iModel;
var iPolymer;
var i0 = bsInfo.nextSetBit (0);
if (i0 < 0) return bs;
i = 0;
switch (tokType) {
case 1087373318:
for (i = i0; i >= 0; i = bsInfo.nextSetBit (i + 1)) {
var j = this.atoms[i].getGroup ().selectAtoms (bs);
if (j > i) i = j;
}
break;
case 1095766028:
for (i = i0; i >= 0; i = bsInfo.nextSetBit (i + 1)) {
if (bs.get (i)) continue;
iModel = this.atoms[i].modelIndex;
bs.set (i);
for (var j = i; --j >= 0; ) if (this.atoms[j].modelIndex == iModel) bs.set (j);
 else break;

for (; ++i < this.atomCount; ) if (this.atoms[i].modelIndex == iModel) bs.set (i);
 else break;

}
break;
case 1087373316:
bsInfo = org.jmol.util.BitSetUtil.copy (specInfo);
for (i = bsInfo.nextSetBit (0); i >= 0; i = bsInfo.nextSetBit (i + 1)) {
var chain = this.atoms[i].getChain ();
chain.setAtomBitSet (bs);
bsInfo.andNot (bs);
}
break;
case 1095761935:
for (i = i0; i >= 0; i = bsInfo.nextSetBit (i + 1)) {
if (bs.get (i)) continue;
iPolymer = this.atoms[i].getPolymerIndexInModel ();
bs.set (i);
for (var j = i; --j >= 0; ) if (this.atoms[j].getPolymerIndexInModel () == iPolymer) bs.set (j);
 else break;

for (; ++i < this.atomCount; ) if (this.atoms[i].getPolymerIndexInModel () == iPolymer) bs.set (i);
 else break;

}
break;
case 1641025539:
for (i = i0; i >= 0; i = bsInfo.nextSetBit (i + 1)) {
if (bs.get (i)) continue;
var structure = this.atoms[i].getGroup ().getStructure ();
bs.set (i);
for (var j = i; --j >= 0; ) if (this.atoms[j].getGroup ().getStructure () === structure) bs.set (j);
 else break;

for (; ++i < this.atomCount; ) if (this.atoms[i].getGroup ().getStructure () === structure) bs.set (i);
 else break;

}
break;
}
if (i == 0) org.jmol.util.Logger.error ("MISSING getAtomBits entry for " + org.jmol.script.Token.nameOf (tokType));
return bs;
}, "~N,~O");
Clazz.defineMethod (c$, "getIdentifierOrNull", 
($fz = function (identifier) {
var bs = this.getSpecNameOrNull (identifier, false);
if (identifier.indexOf ("\\?") >= 0) identifier = org.jmol.util.TextFormat.simpleReplace (identifier, "\\?", "\1");
if (bs != null || identifier.indexOf ("?") > 0) return bs;
if (identifier.indexOf ("*") > 0) return this.getSpecNameOrNull (identifier, true);
var len = identifier.length;
var pt = 0;
while (pt < len && Character.isLetter (identifier.charAt (pt))) ++pt;

bs = this.getSpecNameOrNull (identifier.substring (0, pt), false);
if (pt == len) return bs;
if (bs == null) bs =  new org.jmol.util.BitSet ();
var pt0 = pt;
while (pt < len && Character.isDigit (identifier.charAt (pt))) ++pt;

var seqNumber = 0;
try {
seqNumber = Integer.parseInt (identifier.substring (pt0, pt));
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
return null;
} else {
throw nfe;
}
}
var insertionCode = ' ';
if (pt < len && identifier.charAt (pt) == '^') if (++pt < len) insertionCode = identifier.charAt (pt);
var seqcode = org.jmol.modelset.Group.getSeqcode (seqNumber, insertionCode);
var bsInsert = this.getSeqcodeBits (seqcode, false);
if (bsInsert == null) {
if (insertionCode != ' ') bsInsert = this.getSeqcodeBits (Character.toUpperCase (identifier.charAt (pt)).charCodeAt (0), false);
if (bsInsert == null) return null;
pt++;
}bs.and (bsInsert);
if (pt >= len) return bs;
var chainID = identifier.charAt (pt++);
bs.and (this.getChainBits (chainID));
if (pt == len) return bs;
return null;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getSpecName", 
($fz = function (name) {
var bs = this.getSpecNameOrNull (name, false);
if (bs != null) return bs;
if (name.indexOf ("*") > 0) bs = this.getSpecNameOrNull (name, true);
return (bs == null ?  new org.jmol.util.BitSet () : bs);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getSpecNameOrNull", 
($fz = function (name, checkStar) {
var bs = null;
name = name.toUpperCase ();
if (name.indexOf ("\\?") >= 0) name = org.jmol.util.TextFormat.simpleReplace (name, "\\?", "\1");
for (var i = this.atomCount; --i >= 0; ) {
var g3 = this.atoms[i].getGroup3 (true);
if (g3 != null && g3.length > 0) {
if (org.jmol.util.TextFormat.isMatch (g3, name, checkStar, true)) {
if (bs == null) bs = org.jmol.util.BitSetUtil.newBitSet (i + 1);
bs.set (i);
while (--i >= 0 && this.atoms[i].getGroup3 (true).equals (g3)) bs.set (i);

i++;
}} else if (this.isAtomNameMatch (this.atoms[i], name, checkStar)) {
if (bs == null) bs = org.jmol.util.BitSetUtil.newBitSet (i + 1);
bs.set (i);
}}
return bs;
}, $fz.isPrivate = true, $fz), "~S,~B");
Clazz.defineMethod (c$, "isAtomNameMatch", 
($fz = function (atom, strPattern, checkStar) {
return org.jmol.util.TextFormat.isMatch (atom.getAtomName ().toUpperCase (), strPattern, checkStar, false);
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,~S,~B");
Clazz.defineMethod (c$, "getSeqcodeBits", 
function (seqcode, returnEmpty) {
var bs =  new org.jmol.util.BitSet ();
var seqNum = org.jmol.modelset.Group.getSequenceNumber (seqcode);
var haveSeqNumber = (seqNum != 2147483647);
var isEmpty = true;
var insCode = org.jmol.modelset.Group.getInsertionCode (seqcode);
switch (insCode) {
case '?':
for (var i = this.atomCount; --i >= 0; ) {
var atomSeqcode = this.atoms[i].getSeqcode ();
if (!haveSeqNumber || seqNum == org.jmol.modelset.Group.getSequenceNumber (atomSeqcode) && org.jmol.modelset.Group.getInsertionCodeValue (atomSeqcode) != 0) {
bs.set (i);
isEmpty = false;
}}
break;
default:
for (var i = this.atomCount; --i >= 0; ) {
var atomSeqcode = this.atoms[i].getSeqcode ();
if (seqcode == atomSeqcode || !haveSeqNumber && seqcode == org.jmol.modelset.Group.getInsertionCodeValue (atomSeqcode) || insCode == '*' && seqNum == org.jmol.modelset.Group.getSequenceNumber (atomSeqcode)) {
bs.set (i);
isEmpty = false;
}}
}
return (!isEmpty || returnEmpty ? bs : null);
}, "~N,~B");
Clazz.defineMethod (c$, "getChainBits", 
function (chainId) {
var caseSensitive = this.viewer.getChainCaseSensitive ();
if (!caseSensitive) chainId = Character.toUpperCase (chainId);
var bs =  new org.jmol.util.BitSet ();
var bsDone = org.jmol.util.BitSetUtil.newBitSet (this.atomCount);
for (var i = bsDone.nextClearBit (0); i < this.atomCount; i = bsDone.nextClearBit (i + 1)) {
var chain = this.atoms[i].getChain ();
if (chainId == (caseSensitive ? chain.chainID : Character.toUpperCase (chain.chainID))) {
chain.setAtomBitSet (bs);
bsDone.or (bs);
} else {
chain.setAtomBitSet (bsDone);
}}
return bs;
}, "~S");
Clazz.defineMethod (c$, "getAtomIndices", 
function (bs) {
var n = 0;
var indices =  Clazz.newIntArray (this.atomCount, 0);
for (var j = bs.nextSetBit (0); j >= 0 && j < this.atomCount; j = bs.nextSetBit (j + 1)) indices[j] = ++n;

return indices;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomsWithin", 
function (distance, plane) {
var bsResult =  new org.jmol.util.BitSet ();
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
var d = org.jmol.util.Measure.distanceToPlane (plane, atom);
if (distance > 0 && d >= -0.1 && d <= distance || distance < 0 && d <= 0.1 && d >= distance || distance == 0 && Math.abs (d) < 0.01) bsResult.set (atom.index);
}
return bsResult;
}, "~N,org.jmol.util.Point4f");
Clazz.defineMethod (c$, "getAtomsWithinBs", 
function (distance, points, bsInclude) {
var bsResult =  new org.jmol.util.BitSet ();
if (points.length == 0 || bsInclude != null && bsInclude.cardinality () == 0) return bsResult;
if (bsInclude == null) bsInclude = org.jmol.util.BitSetUtil.setAll (points.length);
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
for (var j = bsInclude.nextSetBit (0); j >= 0; j = bsInclude.nextSetBit (j + 1)) if (atom.distance (points[j]) < distance) {
bsResult.set (i);
break;
}
}
return bsResult;
}, "~N,~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getVisibleSet", 
function () {
var bs =  new org.jmol.util.BitSet ();
for (var i = this.atomCount; --i >= 0; ) if (this.atoms[i].isVisible (0)) bs.set (i);

return bs;
});
Clazz.defineMethod (c$, "getClickableSet", 
function () {
var bs =  new org.jmol.util.BitSet ();
for (var i = this.atomCount; --i >= 0; ) if (this.atoms[i].isClickable ()) bs.set (i);

return bs;
});
Clazz.defineMethod (c$, "deleteModelAtoms", 
function (firstAtomIndex, nAtoms, bs) {
this.atoms = org.jmol.util.ArrayUtil.deleteElements (this.atoms, firstAtomIndex, nAtoms);
this.atomCount = this.atoms.length;
for (var j = firstAtomIndex; j < this.atomCount; j++) {
this.atoms[j].index = j;
this.atoms[j].modelIndex--;
}
this.atomNames = org.jmol.util.ArrayUtil.deleteElements (this.atomNames, firstAtomIndex, nAtoms);
this.atomTypes = org.jmol.util.ArrayUtil.deleteElements (this.atomTypes, firstAtomIndex, nAtoms);
this.atomSerials = org.jmol.util.ArrayUtil.deleteElements (this.atomSerials, firstAtomIndex, nAtoms);
this.bfactor100s = org.jmol.util.ArrayUtil.deleteElements (this.bfactor100s, firstAtomIndex, nAtoms);
this.hasBfactorRange = false;
this.occupancies = org.jmol.util.ArrayUtil.deleteElements (this.occupancies, firstAtomIndex, nAtoms);
this.partialCharges = org.jmol.util.ArrayUtil.deleteElements (this.partialCharges, firstAtomIndex, nAtoms);
this.ellipsoids = org.jmol.util.ArrayUtil.deleteElements (this.ellipsoids, firstAtomIndex, nAtoms);
this.vibrationVectors = org.jmol.util.ArrayUtil.deleteElements (this.vibrationVectors, firstAtomIndex, nAtoms);
this.nSurfaceAtoms = 0;
this.bsSurface = null;
this.surfaceDistance100s = null;
if (this.tainted != null) for (var i = 0; i < 14; i++) org.jmol.util.BitSetUtil.deleteBits (this.tainted[i], bs);

}, "~N,~N,org.jmol.util.BitSet");
c$.$AtomCollection$AtomSorter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.jmol.modelset.AtomCollection, "AtomSorter", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (a.index > b.index ? 1 : a.index < b.index ? -1 : 0);
}, "org.jmol.modelset.Atom,org.jmol.modelset.Atom");
c$ = Clazz.p0p ();
};
c$.MINUSZERO = c$.prototype.MINUSZERO = Float.$valueOf (-0.0);
Clazz.defineStatics (c$,
"TAINT_ATOMNAME", 0,
"TAINT_ATOMTYPE", 1,
"TAINT_COORD", 2,
"TAINT_ELEMENT", 3,
"TAINT_FORMALCHARGE", 4,
"TAINT_HYDROPHOBICITY", 5,
"TAINT_IONICRADIUS", 6,
"TAINT_OCCUPANCY", 7,
"TAINT_PARTIALCHARGE", 8,
"TAINT_TEMPERATURE", 9,
"TAINT_VALENCE", 10,
"TAINT_VANDERWAALS", 11,
"TAINT_VIBRATION", 12,
"TAINT_ATOMNO", 13,
"TAINT_MAX", 14,
"userSettableValues", ["atomName", "atomType", "coord", "element", "formalCharge", "hydrophobicity", "ionic", "occupany", "partialCharge", "temperature", "valence", "vanderWaals", "vibrationVector", "atomNo"]);
{
if (org.jmol.modelset.AtomCollection.userSettableValues.length != 14) org.jmol.util.Logger.error ("AtomCollection.java userSettableValues is not length TAINT_MAX!");
}c$.sqrt3_2 = c$.prototype.sqrt3_2 = (Math.sqrt (3) / 2);
c$.vRef = c$.prototype.vRef = org.jmol.util.Vector3f.new3 (3.14159, 2.71828, 1.41421);
Clazz.defineStatics (c$,
"almost180", 2.984513);
});
