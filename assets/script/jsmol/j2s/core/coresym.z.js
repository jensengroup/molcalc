// 
//// org\jmol\api\SymmetryInterface.js 
// 
Clazz.declarePackage ("org.jmol.api");
Clazz.declareInterface (org.jmol.api, "SymmetryInterface");
// 
//// org\jmol\symmetry\Symmetry.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.api.SymmetryInterface"], "org.jmol.symmetry.Symmetry", ["org.jmol.symmetry.PointGroup", "$.SpaceGroup", "$.SymmetryInfo", "$.SymmetryOperation", "$.UnitCell", "org.jmol.util.Logger", "$.Point3f", "$.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pointGroup = null;
this.spaceGroup = null;
this.symmetryInfo = null;
this.unitCell = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "Symmetry", null, org.jmol.api.SymmetryInterface);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "setPointGroup", 
function (siLast, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance) {
this.pointGroup = org.jmol.symmetry.PointGroup.getPointGroup (siLast == null ? null : (siLast).pointGroup, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance);
return this;
}, "org.jmol.api.SymmetryInterface,~A,org.jmol.util.BitSet,~B,~N,~N");
Clazz.overrideMethod (c$, "getPointGroupName", 
function () {
return this.pointGroup.getName ();
});
Clazz.overrideMethod (c$, "getPointGroupInfo", 
function (modelIndex, asDraw, asInfo, type, index, scale) {
if (!asDraw && !asInfo && this.pointGroup.textInfo != null) return this.pointGroup.textInfo;
 else if (asDraw && this.pointGroup.isDrawType (type, index, scale)) return this.pointGroup.drawInfo;
 else if (asInfo && this.pointGroup.info != null) return this.pointGroup.info;
return this.pointGroup.getInfo (modelIndex, asDraw, asInfo, type, index, scale);
}, "~N,~B,~B,~S,~N,~N");
Clazz.overrideMethod (c$, "setSpaceGroup", 
function (doNormalize) {
if (this.spaceGroup == null) this.spaceGroup =  new org.jmol.symmetry.SpaceGroup (doNormalize);
}, "~B");
Clazz.overrideMethod (c$, "addSpaceGroupOperation", 
function (xyz, opId) {
return this.spaceGroup.addSymmetry (xyz, opId);
}, "~S,~N");
Clazz.overrideMethod (c$, "addSpaceGroupOperationM", 
function (mat) {
this.spaceGroup.addSymmetry ("=" + org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (mat, false, false, false), 0);
}, "org.jmol.util.Matrix4f");
Clazz.overrideMethod (c$, "setLattice", 
function (latt) {
this.spaceGroup.setLatticeParam (latt);
}, "~N");
Clazz.overrideMethod (c$, "getSpaceGroupName", 
function () {
return (this.symmetryInfo != null ? this.symmetryInfo.spaceGroup : this.spaceGroup != null ? this.spaceGroup.getName () : "");
});
Clazz.defineMethod (c$, "getSpaceGroup", 
function () {
return this.spaceGroup;
});
Clazz.overrideMethod (c$, "setSpaceGroupS", 
function (symmetry) {
this.spaceGroup = (symmetry == null ? null : symmetry.getSpaceGroup ());
}, "org.jmol.api.SymmetryInterface");
Clazz.overrideMethod (c$, "createSpaceGroup", 
function (desiredSpaceGroupIndex, name, notionalUnitCell) {
this.spaceGroup = org.jmol.symmetry.SpaceGroup.createSpaceGroup (desiredSpaceGroupIndex, name, notionalUnitCell);
if (this.spaceGroup != null && org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("using generated space group " + this.spaceGroup.dumpInfo (null));
return this.spaceGroup != null;
}, "~N,~S,~A");
Clazz.overrideMethod (c$, "haveSpaceGroup", 
function () {
return (this.spaceGroup != null);
});
Clazz.overrideMethod (c$, "getSpaceGroupInfo", 
function (name, cellInfo) {
return org.jmol.symmetry.SpaceGroup.getInfo (name, cellInfo);
}, "~S,org.jmol.api.SymmetryInterface");
Clazz.overrideMethod (c$, "getLatticeDesignation", 
function () {
return this.spaceGroup.getLatticeDesignation ();
});
Clazz.overrideMethod (c$, "setFinalOperations", 
function (atoms, iAtomFirst, noSymmetryCount, doNormalize) {
this.spaceGroup.setFinalOperations (atoms, iAtomFirst, noSymmetryCount, doNormalize);
}, "~A,~N,~N,~B");
Clazz.overrideMethod (c$, "getSpaceGroupOperationCount", 
function () {
return this.spaceGroup.finalOperations.length;
});
Clazz.overrideMethod (c$, "getSpaceGroupOperation", 
function (i) {
return this.spaceGroup.finalOperations[i];
}, "~N");
Clazz.overrideMethod (c$, "getSpaceGroupXyz", 
function (i, doNormalize) {
return this.spaceGroup.finalOperations[i].getXyz (doNormalize);
}, "~N,~B");
Clazz.overrideMethod (c$, "newSpaceGroupPoint", 
function (i, atom1, atom2, transX, transY, transZ) {
if (this.spaceGroup.finalOperations == null) {
if (!this.spaceGroup.operations[i].isFinalized) this.spaceGroup.operations[i].doFinalize ();
this.spaceGroup.operations[i].newPoint (atom1, atom2, transX, transY, transZ);
return;
}this.spaceGroup.finalOperations[i].newPoint (atom1, atom2, transX, transY, transZ);
}, "~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,~N");
Clazz.overrideMethod (c$, "rotateEllipsoid", 
function (i, ptTemp, axes, ptTemp1, ptTemp2) {
return this.spaceGroup.finalOperations[i].rotateEllipsoid (ptTemp, axes, this.unitCell, ptTemp1, ptTemp2);
}, "~N,org.jmol.util.Point3f,~A,org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "getSymmetryOperationDescription", 
function (isym, cellInfo, pt1, pt2, id) {
return this.spaceGroup.operations[isym].getDescription (cellInfo, pt1, pt2, id);
}, "~N,org.jmol.api.SymmetryInterface,org.jmol.util.Point3f,org.jmol.util.Point3f,~S");
Clazz.overrideMethod (c$, "fcoord", 
function (p) {
return org.jmol.symmetry.SymmetryOperation.fcoord (p);
}, "org.jmol.util.Tuple3f");
Clazz.overrideMethod (c$, "getMatrixFromString", 
function (xyz, temp, allowScaling) {
return org.jmol.symmetry.SymmetryOperation.getMatrixFromString (xyz, temp, false, allowScaling);
}, "~S,~A,~B");
Clazz.overrideMethod (c$, "ijkToPoint3f", 
function (nnn) {
var cell =  new org.jmol.util.Point3f ();
org.jmol.util.SimpleUnitCell.ijkToPoint3f (nnn, cell, 0);
return cell;
}, "~N");
Clazz.overrideMethod (c$, "getCoordinatesAreFractional", 
function () {
return this.symmetryInfo.coordinatesAreFractional;
});
Clazz.overrideMethod (c$, "getCellRange", 
function () {
return this.symmetryInfo.cellRange;
});
Clazz.overrideMethod (c$, "getSymmetryInfoString", 
function () {
return this.symmetryInfo.symmetryInfoString;
});
Clazz.overrideMethod (c$, "getSymmetryOperations", 
function () {
return this.symmetryInfo.symmetryOperations;
});
Clazz.overrideMethod (c$, "isPeriodic", 
function () {
return (this.symmetryInfo == null || this.symmetryInfo.isPeriodic ());
});
Clazz.overrideMethod (c$, "setSymmetryInfo", 
function (modelIndex, modelAuxiliaryInfo) {
this.symmetryInfo =  new org.jmol.symmetry.SymmetryInfo ();
var notionalUnitcell = this.symmetryInfo.setSymmetryInfo (modelAuxiliaryInfo);
if (notionalUnitcell == null) return;
this.setUnitCell (notionalUnitcell);
modelAuxiliaryInfo.put ("infoUnitCell", this.getUnitCellAsArray (false));
this.setOffsetPt (modelAuxiliaryInfo.get ("unitCellOffset"));
if (modelAuxiliaryInfo.containsKey ("jmolData")) this.setUnitCellAllFractionalRelative (true);
var matUnitCellOrientation = modelAuxiliaryInfo.get ("matUnitCellOrientation");
if (matUnitCellOrientation != null) this.setUnitCellOrientation (matUnitCellOrientation);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("symmetryInfos[" + modelIndex + "]:\n" + this.unitCell.dumpInfo (true));
}, "~N,java.util.Map");
Clazz.overrideMethod (c$, "setUnitCell", 
function (notionalUnitCell) {
this.unitCell = org.jmol.symmetry.UnitCell.newA (notionalUnitCell);
}, "~A");
Clazz.overrideMethod (c$, "haveUnitCell", 
function () {
return (this.unitCell != null);
});
Clazz.defineMethod (c$, "getUnitsymmetryInfo", 
function () {
return this.unitCell.dumpInfo (false);
});
Clazz.overrideMethod (c$, "setUnitCellOrientation", 
function (matUnitCellOrientation) {
this.unitCell.setOrientation (matUnitCellOrientation);
}, "org.jmol.util.Matrix3f");
Clazz.overrideMethod (c$, "toUnitCell", 
function (pt, offset) {
this.unitCell.toUnitCell (pt, offset);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "toCartesian", 
function (fpt, isAbsolute) {
this.unitCell.toCartesian (fpt, isAbsolute);
}, "org.jmol.util.Point3f,~B");
Clazz.overrideMethod (c$, "toSupercell", 
function (fpt) {
return this.unitCell.toSupercell (fpt);
}, "org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "toFractional", 
function (pt, isAbsolute) {
this.unitCell.toFractional (pt, isAbsolute);
}, "org.jmol.util.Point3f,~B");
Clazz.overrideMethod (c$, "getNotionalUnitCell", 
function () {
return this.unitCell.getNotionalUnitCell ();
});
Clazz.overrideMethod (c$, "getUnitCellAsArray", 
function (vectorsOnly) {
return this.unitCell.getUnitCellAsArray (vectorsOnly);
}, "~B");
Clazz.overrideMethod (c$, "getEllipsoid", 
function (parBorU) {
if (this.unitCell == null) this.unitCell = org.jmol.symmetry.UnitCell.newA ([1, 1, 1, 90, 90, 90]);
return this.unitCell.getEllipsoid (parBorU);
}, "~A");
Clazz.overrideMethod (c$, "getUnitCellVertices", 
function () {
return this.unitCell.getVertices ();
});
Clazz.overrideMethod (c$, "getCartesianOffset", 
function () {
return this.unitCell.getCartesianOffset ();
});
Clazz.overrideMethod (c$, "setCartesianOffset", 
function (origin) {
this.unitCell.setCartesianOffset (origin);
}, "org.jmol.util.Tuple3f");
Clazz.overrideMethod (c$, "getFractionalOffset", 
function () {
return this.unitCell.getFractionalOffset ();
});
Clazz.overrideMethod (c$, "setOffsetPt", 
function (pt) {
this.unitCell.setOffset (pt);
}, "org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "setOffset", 
function (nnn) {
this.unitCell.setOffset (this.ijkToPoint3f (nnn));
}, "~N");
Clazz.overrideMethod (c$, "getUnitCellMultiplier", 
function () {
return this.unitCell.getUnitCellMultiplier ();
});
Clazz.overrideMethod (c$, "getCanonicalCopy", 
function (scale) {
return this.unitCell.getCanonicalCopy (scale);
}, "~N");
Clazz.overrideMethod (c$, "getUnitCellInfoType", 
function (infoType) {
return this.unitCell.getInfo (infoType);
}, "~N");
Clazz.overrideMethod (c$, "getUnitCellInfo", 
function () {
return this.unitCell.dumpInfo (false);
});
Clazz.overrideMethod (c$, "isSlab", 
function () {
return this.unitCell.isSlab ();
});
Clazz.overrideMethod (c$, "isPolymer", 
function () {
return this.unitCell.isPolymer ();
});
Clazz.overrideMethod (c$, "setMinMaxLatticeParameters", 
function (minXYZ, maxXYZ) {
this.unitCell.setMinMaxLatticeParameters (minXYZ, maxXYZ);
}, "org.jmol.util.Point3i,org.jmol.util.Point3i");
Clazz.overrideMethod (c$, "setUnitCellAllFractionalRelative", 
function (TF) {
this.unitCell.setAllFractionalRelative (TF);
}, "~B");
Clazz.overrideMethod (c$, "checkDistance", 
function (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset) {
return this.unitCell.checkDistance (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,~N,~N,~N,org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "getUnitCellVectors", 
function () {
return this.unitCell.getUnitCellVectors ();
});
Clazz.overrideMethod (c$, "getUnitCell", 
function (points) {
var sym =  new org.jmol.symmetry.Symmetry ();
sym.unitCell = org.jmol.symmetry.UnitCell.newP (points);
return sym;
}, "~A");
Clazz.overrideMethod (c$, "isSupercell", 
function () {
return this.unitCell.isSupercell ();
});
});
// 
//// org\jmol\symmetry\PointGroup.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.Point3f", "$.Vector3f"], "org.jmol.symmetry.PointGroup", ["java.lang.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.util.BitSetUtil", "$.Escape", "$.Logger", "$.Quaternion", "$.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.drawInfo = null;
this.info = null;
this.textInfo = null;
this.drawType = "";
this.drawIndex = 0;
this.scale = NaN;
this.nAxes = null;
this.axes = null;
this.nAtoms = 0;
this.radius = 0;
this.distanceTolerance = 0.2;
this.linearTolerance = 8;
this.cosTolerance = 0.99;
this.name = "C_1?";
this.principalAxis = null;
this.principalPlane = null;
this.vTemp = null;
this.centerAtomIndex = -1;
this.haveInversionCenter = false;
this.center = null;
this.points = null;
this.atoms = null;
this.elements = null;
this.bsAtoms = null;
this.maxElement = 0;
this.eCounts = null;
this.nOps = 0;
if (!Clazz.isClassDefined ("org.jmol.symmetry.PointGroup.Operation")) {
org.jmol.symmetry.PointGroup.$PointGroup$Operation$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "PointGroup");
Clazz.prepareFields (c$, function () {
this.nAxes =  Clazz.newIntArray (org.jmol.symmetry.PointGroup.maxAxis, 0);
this.axes =  new Array (org.jmol.symmetry.PointGroup.maxAxis);
this.vTemp =  new org.jmol.util.Vector3f ();
this.center =  new org.jmol.util.Point3f ();
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
c$.getPointGroup = Clazz.defineMethod (c$, "getPointGroup", 
function (pgLast, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance) {
var pg =  new org.jmol.symmetry.PointGroup ();
return (pg.set (pgLast, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance) ? pg : pgLast);
}, "org.jmol.symmetry.PointGroup,~A,org.jmol.util.BitSet,~B,~N,~N");
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isEqual", 
($fz = function (pg) {
if (pg == null) return false;
if (this.linearTolerance != pg.linearTolerance || this.distanceTolerance != pg.distanceTolerance || this.nAtoms != pg.nAtoms || !this.bsAtoms.equals (pg.bsAtoms)) return false;
for (var i = 0; i < this.nAtoms; i++) {
if (this.elements[i] != pg.elements[i] || this.points[i].distance (pg.points[i]) != 0) return false;
}
return true;
}, $fz.isPrivate = true, $fz), "org.jmol.symmetry.PointGroup");
Clazz.defineMethod (c$, "set", 
($fz = function (pgLast, atomset, bsAtoms, haveVibration, distanceTolerance, linearTolerance) {
this.distanceTolerance = distanceTolerance;
this.linearTolerance = linearTolerance;
this.bsAtoms = bsAtoms;
this.cosTolerance = (Math.cos (linearTolerance / 180 * 3.141592653589793));
if (!this.getAtomsAndElements (atomset, bsAtoms)) {
org.jmol.util.Logger.error ("Too many atoms for point group calculation");
this.name = "point group not determined -- atomCount > 100 -- select fewer atoms and try again.";
return true;
}this.getElementCounts ();
if (haveVibration) {
var atomVibs =  new Array (this.points.length);
for (var i = this.points.length; --i >= 0; ) {
atomVibs[i] = org.jmol.util.Point3f.newP (this.points[i]);
var v = this.atoms[i].getVibrationVector ();
if (v != null) atomVibs[i].add (v);
}
this.points = atomVibs;
}if (this.isEqual (pgLast)) return false;
this.findInversionCenter ();
if (this.isLinear (this.points)) {
if (this.haveInversionCenter) {
this.name = "D(infinity)h";
} else {
this.name = "C(infinity)v";
}this.vTemp.sub2 (this.points[1], this.points[0]);
this.addAxis (16, this.vTemp);
this.principalAxis = this.axes[16][0];
if (this.haveInversionCenter) {
this.axes[0] =  new Array (1);
this.principalPlane = this.axes[0][this.nAxes[0]++] = Clazz.innerTypeInstance (org.jmol.symmetry.PointGroup.Operation, this, null, this.vTemp);
}return true;
}this.axes[0] =  new Array (15);
var nPlanes = 0;
this.findCAxes ();
nPlanes = this.findPlanes ();
this.findAdditionalAxes (nPlanes);
var n = this.getHighestOrder ();
if (this.nAxes[17] > 1) {
if (this.nAxes[19] > 1) {
if (this.haveInversionCenter) {
this.name = "Ih";
} else {
this.name = "I";
}} else if (this.nAxes[18] > 1) {
if (this.haveInversionCenter) {
this.name = "Oh";
} else {
this.name = "O";
}} else {
if (nPlanes > 0) {
if (this.haveInversionCenter) {
this.name = "Th";
} else {
this.name = "Td";
}} else {
this.name = "T";
}}} else {
if (n < 2) {
if (nPlanes == 1) {
this.name = "Cs";
return true;
}if (this.haveInversionCenter) {
this.name = "Ci";
return true;
}this.name = "C1";
} else if ((n % 2) == 1 && this.nAxes[16] > 0 || (n % 2) == 0 && this.nAxes[16] > 1) {
this.principalAxis = this.setPrincipalAxis (n, nPlanes);
if (nPlanes == 0) {
if (n < 14) {
this.name = "S" + n;
} else {
this.name = "D" + (n - 14);
}} else {
if (n < 14) n = Clazz.doubleToInt (n / 2);
 else n -= 14;
if (nPlanes == n) {
this.name = "D" + n + "d";
} else {
this.name = "D" + n + "h";
}}} else if (nPlanes == 0) {
this.principalAxis = this.axes[n][0];
if (n < 14) {
this.name = "S" + n;
} else {
this.name = "C" + (n - 14);
}} else if (nPlanes == n - 14) {
this.principalAxis = this.axes[n][0];
this.name = "C" + nPlanes + "v";
} else {
this.principalAxis = this.axes[n < 14 ? n + 14 : n][0];
this.principalPlane = this.axes[0][0];
if (n < 14) n /= 2;
 else n -= 14;
this.name = "C" + n + "h";
}}return true;
}, $fz.isPrivate = true, $fz), "org.jmol.symmetry.PointGroup,~A,org.jmol.util.BitSet,~B,~N,~N");
Clazz.defineMethod (c$, "setPrincipalAxis", 
($fz = function (n, nPlanes) {
var principalPlane = this.setPrincipalPlane (n, nPlanes);
if (nPlanes == 0 && n < 14 || this.nAxes[n] == 1) {
if (nPlanes > 0 && n < 14) n = 14 + Clazz.doubleToInt (n / 2);
return this.axes[n][0];
}if (principalPlane == null) return null;
for (var i = 0; i < this.nAxes[16]; i++) if (this.isParallel (principalPlane.normalOrAxis, this.axes[16][i].normalOrAxis)) {
if (i != 0) {
var o = this.axes[16][0];
this.axes[16][0] = this.axes[16][i];
this.axes[16][i] = o;
}return this.axes[16][0];
}
return null;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setPrincipalPlane", 
($fz = function (n, nPlanes) {
if (nPlanes == 1) return this.principalPlane = this.axes[0][0];
if (nPlanes == 0 || nPlanes == n - 14) return null;
for (var i = 0; i < nPlanes; i++) for (var j = 0, nPerp = 0; j < nPlanes; j++) if (this.isPerpendicular (this.axes[0][i].normalOrAxis, this.axes[0][j].normalOrAxis) && ++nPerp > 2) {
if (i != 0) {
var o = this.axes[0][0];
this.axes[0][0] = this.axes[0][i];
this.axes[0][i] = o;
}return this.principalPlane = this.axes[0][0];
}

return null;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getAtomsAndElements", 
($fz = function (atomset, bsAtoms) {
var atomCount = org.jmol.util.BitSetUtil.cardinalityOf (bsAtoms);
if (atomCount > 100) return false;
this.points =  new Array (atomCount);
this.atoms =  new Array (atomCount);
this.elements =  Clazz.newIntArray (atomCount, 0);
if (atomCount == 0) return true;
this.nAtoms = 0;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
this.points[this.nAtoms] = org.jmol.util.Point3f.newP (atomset[i]);
this.atoms[this.nAtoms] = atomset[i];
var bondIndex = 1 + Math.max (3, atomset[i].getCovalentBondCount ());
this.elements[this.nAtoms] = atomset[i].getElementNumber () * bondIndex;
this.center.add (this.points[this.nAtoms++]);
}
this.center.scale (1 / this.nAtoms);
for (var i = this.nAtoms; --i >= 0; ) {
var r = this.center.distance (this.points[i]);
if (r < this.distanceTolerance) this.centerAtomIndex = i;
this.radius = Math.max (this.radius, r);
}
return true;
}, $fz.isPrivate = true, $fz), "~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "findInversionCenter", 
($fz = function () {
this.haveInversionCenter = this.checkOperation (null, this.center, -1);
if (this.haveInversionCenter) {
this.axes[1] =  new Array (1);
this.axes[1][0] = Clazz.innerTypeInstance (org.jmol.symmetry.PointGroup.Operation, this, null);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkOperation", 
($fz = function (q, center, iOrder) {
var pt =  new org.jmol.util.Point3f ();
var nFound = 0;
var isInversion = (iOrder < 14);
out : for (var i = this.points.length; --i >= 0 && nFound < this.points.length; ) if (i == this.centerAtomIndex) {
nFound++;
} else {
var a1 = this.points[i];
var e1 = this.elements[i];
if (q != null) {
pt.setT (a1);
pt.sub (center);
q.transformP2 (pt, pt);
pt.add (center);
} else {
pt.setT (a1);
}if (isInversion) {
this.vTemp.sub2 (center, pt);
pt.scaleAdd2 (2, this.vTemp, pt);
}if ((q != null || isInversion) && pt.distance (a1) < this.distanceTolerance) {
nFound++;
continue;
}for (var j = this.points.length; --j >= 0; ) {
if (j == i || this.elements[j] != e1) continue;
var a2 = this.points[j];
if (pt.distance (a2) < this.distanceTolerance) {
nFound++;
continue out;
}}
}
return nFound == this.points.length;
}, $fz.isPrivate = true, $fz), "org.jmol.util.Quaternion,org.jmol.util.Point3f,~N");
Clazz.defineMethod (c$, "isLinear", 
($fz = function (atoms) {
var v1 = null;
if (atoms.length < 2) return false;
for (var i = atoms.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
if (v1 == null) {
v1 =  new org.jmol.util.Vector3f ();
v1.sub2 (atoms[i], this.center);
v1.normalize ();
this.vTemp.setT (v1);
continue;
}this.vTemp.sub2 (atoms[i], this.center);
this.vTemp.normalize ();
if (!this.isParallel (v1, this.vTemp)) return false;
}
return true;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "isParallel", 
($fz = function (v1, v2) {
return (Math.abs (v1.dot (v2)) >= this.cosTolerance);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Vector3f,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "isPerpendicular", 
($fz = function (v1, v2) {
return (Math.abs (v1.dot (v2)) <= 1 - this.cosTolerance);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Vector3f,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "getElementCounts", 
($fz = function () {
for (var i = this.points.length; --i >= 0; ) {
var e1 = this.elements[i];
if (e1 > this.maxElement) this.maxElement = e1;
}
this.eCounts =  Clazz.newIntArray (++this.maxElement, 0);
for (var i = this.points.length; --i >= 0; ) this.eCounts[this.elements[i]]++;

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "findCAxes", 
($fz = function () {
var v1 =  new org.jmol.util.Vector3f ();
var v2 =  new org.jmol.util.Vector3f ();
var v3 =  new org.jmol.util.Vector3f ();
for (var i = this.points.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
var a1 = this.points[i];
var e1 = this.elements[i];
for (var j = this.points.length; --j > i; ) {
var a2 = this.points[j];
if (this.elements[j] != e1) continue;
v1.sub2 (a1, this.center);
v2.sub2 (a2, this.center);
v1.normalize ();
v2.normalize ();
if (this.isParallel (v1, v2)) {
this.getAllAxes (v1);
continue;
}if (this.nAxes[16] < org.jmol.symmetry.PointGroup.axesMaxN[16]) {
v3.setT (a1);
v3.add (a2);
v3.scale (0.5);
v3.sub (this.center);
this.getAllAxes (v3);
}var order = (6.283185307179586 / v1.angle (v2));
var iOrder = Clazz.doubleToInt (Math.floor (order + 0.01));
var isIntegerOrder = (order - iOrder <= 0.02);
if (!isIntegerOrder || (iOrder = iOrder + 14) >= org.jmol.symmetry.PointGroup.maxAxis) continue;
if (this.nAxes[iOrder] < org.jmol.symmetry.PointGroup.axesMaxN[iOrder]) {
v3.cross (v1, v2);
this.checkAxisOrder (iOrder, v3, this.center);
}}
}
var vs =  new Array (this.nAxes[16] * 2);
for (var i = 0; i < vs.length; i++) vs[i] =  new org.jmol.util.Vector3f ();

var n = 0;
for (var i = 0; i < this.nAxes[16]; i++) {
vs[n++].setT (this.axes[16][i].normalOrAxis);
vs[n].setT (this.axes[16][i].normalOrAxis);
vs[n++].scale (-1);
}
for (var i = vs.length; --i >= 2; ) for (var j = i; --j >= 1; ) for (var k = j; --k >= 0; ) {
v3.setT (vs[i]);
v3.add (vs[j]);
v3.add (vs[k]);
if (v3.length () < 1.0) continue;
this.checkAxisOrder (17, v3, this.center);
}


var nMin = 2147483647;
var iMin = -1;
for (var i = 0; i < this.maxElement; i++) {
if (this.eCounts[i] < nMin && this.eCounts[i] > 2) {
nMin = this.eCounts[i];
iMin = i;
}}
out : for (var i = 0; i < this.points.length - 2; i++) if (this.elements[i] == iMin) for (var j = i + 1; j < this.points.length - 1; j++) if (this.elements[j] == iMin) for (var k = j + 1; k < this.points.length; k++) if (this.elements[k] == iMin) {
v1.sub2 (this.points[i], this.points[j]);
v2.sub2 (this.points[i], this.points[k]);
v1.normalize ();
v2.normalize ();
v3.cross (v1, v2);
this.getAllAxes (v3);
v1.setT (this.points[i]);
v1.add (this.points[j]);
v1.add (this.points[k]);
v1.normalize ();
if (!this.isParallel (v1, v3)) this.getAllAxes (v1);
if (this.nAxes[19] == org.jmol.symmetry.PointGroup.axesMaxN[19]) break out;
}


vs =  new Array (this.maxElement);
for (var i = this.points.length; --i >= 0; ) {
var e1 = this.elements[i];
if (vs[e1] == null) vs[e1] =  new org.jmol.util.Vector3f ();
 else if (this.haveInversionCenter) continue;
vs[e1].add (this.points[i]);
}
if (!this.haveInversionCenter) for (var i = 0; i < this.maxElement; i++) if (vs[i] != null) vs[i].scale (1 / this.eCounts[i]);

for (var i = 0; i < this.maxElement; i++) if (vs[i] != null) for (var j = 0; j < this.maxElement; j++) {
if (i == j || vs[j] == null) continue;
if (this.haveInversionCenter) {
v1.cross (vs[i], vs[j]);
} else {
v1.setT (vs[i]);
v1.sub (vs[j]);
}this.checkAxisOrder (16, v1, this.center);
}

return this.getHighestOrder ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAllAxes", 
($fz = function (v3) {
for (var o = 16; o < org.jmol.symmetry.PointGroup.maxAxis; o++) if (this.nAxes[o] < org.jmol.symmetry.PointGroup.axesMaxN[o]) this.checkAxisOrder (o, v3, this.center);

}, $fz.isPrivate = true, $fz), "org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "getHighestOrder", 
($fz = function () {
var n = 0;
for (n = 14; --n > 1 && this.nAxes[n] == 0; ) {
}
if (n > 1) return (n + 14 < org.jmol.symmetry.PointGroup.maxAxis && this.nAxes[n + 14] > 0 ? n + 14 : n);
for (n = org.jmol.symmetry.PointGroup.maxAxis; --n > 1 && this.nAxes[n] == 0; ) {
}
return n;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkAxisOrder", 
($fz = function (iOrder, v, center) {
switch (iOrder) {
case 22:
if (this.nAxes[17] > 0) return false;
case 20:
case 18:
if (this.nAxes[19] > 0) return false;
break;
case 17:
if (this.nAxes[22] > 0) return false;
break;
case 19:
if (this.nAxes[18] > 0 || this.nAxes[20] > 0 || this.nAxes[22] > 0) return false;
break;
}
v.normalize ();
if (this.haveAxis (iOrder, v)) return false;
var q = org.jmol.util.Quaternion.newVA (v, (iOrder < 14 ? 180 : 0) + Clazz.doubleToInt (360 / (iOrder % 14)));
if (!this.checkOperation (q, center, iOrder)) return false;
this.addAxis (iOrder, v);
switch (iOrder) {
case 16:
this.checkAxisOrder (4, v, center);
break;
case 17:
this.checkAxisOrder (3, v, center);
if (this.haveInversionCenter) this.addAxis (6, v);
break;
case 18:
this.addAxis (16, v);
this.checkAxisOrder (4, v, center);
this.checkAxisOrder (8, v, center);
break;
case 19:
this.checkAxisOrder (5, v, center);
if (this.haveInversionCenter) this.addAxis (10, v);
break;
case 20:
this.addAxis (16, v);
this.addAxis (17, v);
this.checkAxisOrder (3, v, center);
this.checkAxisOrder (6, v, center);
this.checkAxisOrder (12, v, center);
break;
case 22:
this.addAxis (16, v);
this.addAxis (18, v);
break;
}
return true;
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.Vector3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "addAxis", 
($fz = function (iOrder, v) {
if (this.haveAxis (iOrder, v)) return;
if (this.axes[iOrder] == null) this.axes[iOrder] =  new Array (org.jmol.symmetry.PointGroup.axesMaxN[iOrder]);
this.axes[iOrder][this.nAxes[iOrder]++] = Clazz.innerTypeInstance (org.jmol.symmetry.PointGroup.Operation, this, null, v, iOrder);
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "haveAxis", 
($fz = function (iOrder, v) {
if (this.nAxes[iOrder] == org.jmol.symmetry.PointGroup.axesMaxN[iOrder]) {
return true;
}if (this.nAxes[iOrder] > 0) for (var i = this.nAxes[iOrder]; --i >= 0; ) {
if (this.isParallel (v, this.axes[iOrder][i].normalOrAxis)) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "findPlanes", 
($fz = function () {
var pt =  new org.jmol.util.Point3f ();
var v1 =  new org.jmol.util.Vector3f ();
var v2 =  new org.jmol.util.Vector3f ();
var v3 =  new org.jmol.util.Vector3f ();
var nPlanes = 0;
var haveAxes = (this.getHighestOrder () > 1);
for (var i = this.points.length; --i >= 0; ) {
if (i == this.centerAtomIndex) continue;
var a1 = this.points[i];
var e1 = this.elements[i];
for (var j = this.points.length; --j > i; ) {
if (haveAxes && this.elements[j] != e1) continue;
var a2 = this.points[j];
pt.add2 (a1, a2);
pt.scale (0.5);
v1.sub2 (a1, this.center);
v2.sub2 (a2, this.center);
if (!this.isParallel (v1, v2)) {
v3.cross (v1, v2);
v3.normalize ();
nPlanes = this.getPlane (v3);
}v3.setT (a2);
v3.sub (a1);
v3.normalize ();
nPlanes = this.getPlane (v3);
if (nPlanes == org.jmol.symmetry.PointGroup.axesMaxN[0]) return nPlanes;
}
}
if (haveAxes) for (var i = 16; i < org.jmol.symmetry.PointGroup.maxAxis; i++) for (var j = 0; j < this.nAxes[i]; j++) nPlanes = this.getPlane (this.axes[i][j].normalOrAxis);


return nPlanes;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getPlane", 
($fz = function (v3) {
if (!this.haveAxis (0, v3) && this.checkOperation (org.jmol.util.Quaternion.newVA (v3, 180), this.center, -1)) this.axes[0][this.nAxes[0]++] = Clazz.innerTypeInstance (org.jmol.symmetry.PointGroup.Operation, this, null, v3);
return this.nAxes[0];
}, $fz.isPrivate = true, $fz), "org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "findAdditionalAxes", 
($fz = function (nPlanes) {
var planes = this.axes[0];
var Cn = 0;
if (nPlanes > 1 && ((Cn = nPlanes + 14) < org.jmol.symmetry.PointGroup.maxAxis) && this.nAxes[Cn] == 0) {
this.vTemp.cross (planes[0].normalOrAxis, planes[1].normalOrAxis);
if (!this.checkAxisOrder (Cn, this.vTemp, this.center) && nPlanes > 2) {
this.vTemp.cross (planes[1].normalOrAxis, planes[2].normalOrAxis);
this.checkAxisOrder (Cn - 1, this.vTemp, this.center);
}}if (this.nAxes[16] == 0 && nPlanes > 2) {
for (var i = 0; i < nPlanes - 1; i++) {
for (var j = i + 1; j < nPlanes; j++) {
this.vTemp.add2 (planes[1].normalOrAxis, planes[2].normalOrAxis);
this.checkAxisOrder (16, this.vTemp, this.center);
}
}
}}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getInfo", 
function (modelIndex, asDraw, asInfo, type, index, scaleFactor) {
this.info = (asInfo ?  new java.util.Hashtable () : null);
var v =  new org.jmol.util.Vector3f ();
var op;
if (scaleFactor == 0) scaleFactor = 1;
this.scale = scaleFactor;
var nType =  Clazz.newIntArray (4, 2, 0);
for (var i = 1; i < org.jmol.symmetry.PointGroup.maxAxis; i++) for (var j = this.nAxes[i]; --j >= 0; ) nType[this.axes[i][j].type][0]++;


var sb =  new org.jmol.util.StringXBuilder ().append ("# ").appendI (this.nAtoms).append (" atoms\n");
if (asDraw) {
var haveType = (type != null && type.length > 0);
this.drawType = type = (haveType ? type : "");
this.drawIndex = index;
var anyProperAxis = (type.equalsIgnoreCase ("Cn"));
var anyImproperAxis = (type.equalsIgnoreCase ("Sn"));
sb.append ("set perspectivedepth off;\n");
var m = "_" + modelIndex + "_";
if (!haveType) sb.append ("draw pg0").append (m).append ("* delete;draw pgva").append (m).append ("* delete;draw pgvp").append (m).append ("* delete;");
if (!haveType || type.equalsIgnoreCase ("Ci")) sb.append ("draw pg0").append (m).append (this.haveInversionCenter ? "inv " : " ").append (org.jmol.util.Escape.escapePt (this.center)).append (this.haveInversionCenter ? "\"i\";\n" : ";\n");
var offset = 0.1;
for (var i = 2; i < org.jmol.symmetry.PointGroup.maxAxis; i++) {
if (i == 14) offset = 0.1;
if (this.nAxes[i] == 0) continue;
var label = this.axes[i][0].getLabel ();
offset += 0.25;
var scale = scaleFactor * this.radius + offset;
if (!haveType || type.equalsIgnoreCase (label) || anyProperAxis && i >= 14 || anyImproperAxis && i < 14) for (var j = 0; j < this.nAxes[i]; j++) {
if (index > 0 && j + 1 != index) continue;
op = this.axes[i][j];
v.setT (op.normalOrAxis);
v.add (this.center);
if (op.type == 2) scale = -scale;
sb.append ("draw pgva").append (m).append (label).append ("_").appendI (j + 1).append (" width 0.05 scale ").appendF (scale).append (" ").append (org.jmol.util.Escape.escapePt (v));
v.scaleAdd2 (-2, op.normalOrAxis, v);
var isPA = (this.principalAxis != null && op.index == this.principalAxis.index);
sb.append (org.jmol.util.Escape.escapePt (v)).append ("\"").append (label).append (isPA ? "*" : "").append ("\" color ").append (isPA ? "red" : op.type == 2 ? "blue" : "yellow").append (";\n");
}
}
if (!haveType || type.equalsIgnoreCase ("Cs")) for (var j = 0; j < this.nAxes[0]; j++) {
if (index > 0 && j + 1 != index) continue;
op = this.axes[0][j];
sb.append ("draw pgvp").append (m).appendI (j + 1).append ("disk scale ").appendF (scaleFactor * this.radius * 2).append (" CIRCLE PLANE ").append (org.jmol.util.Escape.escapePt (this.center));
v.setT (op.normalOrAxis);
v.add (this.center);
sb.append (org.jmol.util.Escape.escapePt (v)).append (" color translucent yellow;\n");
v.setT (op.normalOrAxis);
v.add (this.center);
sb.append ("draw pgvp").append (m).appendI (j + 1).append ("ring width 0.05 scale ").appendF (scaleFactor * this.radius * 2).append (" arc ").append (org.jmol.util.Escape.escapePt (v));
v.scaleAdd2 (-2, op.normalOrAxis, v);
sb.append (org.jmol.util.Escape.escapePt (v));
v.x += 0.011;
v.y += 0.012;
v.z += 0.013;
sb.append (org.jmol.util.Escape.escapePt (v)).append ("{0 360 0.5} color ").append (this.principalPlane != null && op.index == this.principalPlane.index ? "red" : "blue").append (";\n");
}
sb.append ("# name=").append (this.name);
sb.append (", nCi=").appendI (this.haveInversionCenter ? 1 : 0);
sb.append (", nCs=").appendI (this.nAxes[0]);
sb.append (", nCn=").appendI (nType[1][0]);
sb.append (", nSn=").appendI (nType[2][0]);
sb.append (": ");
for (var i = org.jmol.symmetry.PointGroup.maxAxis; --i >= 2; ) if (this.nAxes[i] > 0) {
sb.append (" n").append (i < 14 ? "S" : "C").appendI (i % 14);
sb.append ("=").appendI (this.nAxes[i]);
}
sb.append (";\n");
this.drawInfo = sb.toString ();
return this.drawInfo;
}var n = 0;
var nTotal = 1;
var ctype = (this.haveInversionCenter ? "Ci" : "center");
if (this.haveInversionCenter) nTotal++;
if (this.info == null) sb.append ("\n\n").append (this.name).append ("\t").append (ctype).append ("\t").append (org.jmol.util.Escape.escapePt (this.center));
 else this.info.put (ctype, this.center);
for (var i = org.jmol.symmetry.PointGroup.maxAxis; --i >= 0; ) {
if (this.nAxes[i] > 0) {
n = org.jmol.symmetry.PointGroup.nUnique[i];
var label = this.axes[i][0].getLabel ();
if (this.info == null) sb.append ("\n\n").append (this.name).append ("\tn").append (label).append ("\t").appendI (this.nAxes[i]).append ("\t").appendI (n);
 else this.info.put ("n" + label, Integer.$valueOf (this.nAxes[i]));
n *= this.nAxes[i];
nTotal += n;
nType[this.axes[i][0].type][1] += n;
var vinfo = (this.info == null ? null :  new java.util.ArrayList ());
for (var j = 0; j < this.nAxes[i]; j++) {
if (vinfo == null) sb.append ("\n").append (this.name).append ("\t").append (label).append ("_").appendI (j + 1).append ("\t").appendO (this.axes[i][j].normalOrAxis);
 else vinfo.add (this.axes[i][j].normalOrAxis);
}
if (this.info != null) this.info.put (label, vinfo);
}}
if (this.info == null) {
sb.append ("\n");
sb.append ("\n").append (this.name).append ("\ttype\tnType\tnUnique");
sb.append ("\n").append (this.name).append ("\tE\t  1\t  1");
n = (this.haveInversionCenter ? 1 : 0);
sb.append ("\n").append (this.name).append ("\tCi\t  ").appendI (n).append ("\t  ").appendI (n);
sb.append ("\n").append (this.name).append ("\tCs\t");
org.jmol.util.TextFormat.rFill (sb, "    ", this.nAxes[0] + "\t");
org.jmol.util.TextFormat.rFill (sb, "    ", this.nAxes[0] + "\n");
sb.append (this.name).append ("\tCn\t");
org.jmol.util.TextFormat.rFill (sb, "    ", nType[1][0] + "\t");
org.jmol.util.TextFormat.rFill (sb, "    ", nType[1][1] + "\n");
sb.append (this.name).append ("\tSn\t");
org.jmol.util.TextFormat.rFill (sb, "    ", nType[2][0] + "\t");
org.jmol.util.TextFormat.rFill (sb, "    ", nType[2][1] + "\n");
sb.append (this.name).append ("\t\tTOTAL\t");
org.jmol.util.TextFormat.rFill (sb, "    ", nTotal + "\n");
this.textInfo = sb.toString ();
return this.textInfo;
}this.info.put ("name", this.name);
this.info.put ("nAtoms",  new Integer (this.nAtoms));
this.info.put ("nTotal",  new Integer (nTotal));
this.info.put ("nCi",  new Integer (this.haveInversionCenter ? 1 : 0));
this.info.put ("nCs",  new Integer (this.nAxes[0]));
this.info.put ("nCn",  new Integer (nType[1][0]));
this.info.put ("nSn",  new Integer (nType[2][0]));
this.info.put ("distanceTolerance",  new Float (this.distanceTolerance));
this.info.put ("linearTolerance",  new Float (this.linearTolerance));
this.info.put ("detail", sb.toString ().$replace ('\n', ';'));
if (this.principalAxis != null && this.principalAxis.index > 0) this.info.put ("principalAxis", this.principalAxis.normalOrAxis);
if (this.principalPlane != null && this.principalPlane.index > 0) this.info.put ("principalPlane", this.principalPlane.normalOrAxis);
return this.info;
}, "~N,~B,~B,~S,~N,~N");
Clazz.defineMethod (c$, "isDrawType", 
function (type, index, scale) {
return (this.drawInfo != null && this.drawType.equals (type == null ? "" : type) && this.drawIndex == index && this.scale == scale);
}, "~S,~N,~N");
c$.$PointGroup$Operation$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.type = 0;
this.order = 0;
this.index = 0;
this.normalOrAxis = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry.PointGroup, "Operation");
Clazz.makeConstructor (c$, 
function () {
this.index = ++this.b$["org.jmol.symmetry.PointGroup"].nOps;
this.type = 3;
this.order = 1;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("new operation -- " + org.jmol.symmetry.PointGroup.typeNames[this.type]);
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.index = ++this.b$["org.jmol.symmetry.PointGroup"].nOps;
this.type = (b < 14 ? 2 : 1);
this.order = b % 14;
this.normalOrAxis = org.jmol.util.Quaternion.newVA (a, 180).getNormal ();
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("new operation -- " + (this.order == b ? "S" : "C") + this.order + " " + this.normalOrAxis);
}, "org.jmol.util.Vector3f,~N");
Clazz.makeConstructor (c$, 
function (a) {
if (a == null) return;
this.index = ++this.b$["org.jmol.symmetry.PointGroup"].nOps;
this.type = 0;
this.normalOrAxis = org.jmol.util.Quaternion.newVA (a, 180).getNormal ();
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("new operation -- plane " + this.normalOrAxis);
}, "org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "getLabel", 
function () {
switch (this.type) {
case 0:
return "Cs";
case 2:
return "S" + this.order;
default:
return "C" + this.order;
}
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"axesMaxN", [15, 0, 0, 1, 3, 1, 10, 0, 1, 0, 6, 0, 1, 0, 0, 0, 15, 10, 6, 6, 10, 0, 1],
"nUnique", [1, 0, 0, 2, 2, 4, 2, 0, 4, 0, 4, 0, 4, 0, 0, 0, 1, 2, 2, 4, 2, 0, 4],
"s3", 3,
"s4", 4,
"s5", 5,
"s6", 6,
"s8", 8,
"s10", 10,
"s12", 12,
"firstProper", 14,
"c2", 16,
"c3", 17,
"c4", 18,
"c5", 19,
"c6", 20,
"c8", 22);
c$.maxAxis = c$.prototype.maxAxis = org.jmol.symmetry.PointGroup.axesMaxN.length;
Clazz.defineStatics (c$,
"ATOM_COUNT_MAX", 100,
"OPERATION_PLANE", 0,
"OPERATION_PROPER_AXIS", 1,
"OPERATION_IMPROPER_AXIS", 2,
"OPERATION_INVERSION_CENTER", 3,
"typeNames", ["plane", "proper axis", "improper axis", "center of inversion"]);
});
// 
//// org\jmol\symmetry\SpaceGroup.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["java.util.Hashtable"], "org.jmol.symmetry.SpaceGroup", ["java.lang.Character", "java.util.Arrays", "org.jmol.symmetry.HallInfo", "$.HallTranslation", "$.SymmetryOperation", "org.jmol.util.ArrayUtil", "$.Logger", "$.Matrix4f", "$.Parser", "$.Point3f", "$.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.index = 0;
this.name = "unknown!";
this.hallSymbol = null;
this.hmSymbol = null;
this.hmSymbolFull = null;
this.hmSymbolExt = null;
this.hmSymbolAbbr = null;
this.hmSymbolAlternative = null;
this.hmSymbolAbbrShort = null;
this.ambiguityType = '\0';
this.uniqueAxis = '\0';
this.axisChoice = '\0';
this.intlTableNumber = null;
this.intlTableNumberFull = null;
this.intlTableNumberExt = null;
this.hallInfo = null;
this.latticeParameter = 0;
this.latticeCode = '\0';
this.operations = null;
this.operationCount = 0;
this.doNormalize = true;
this.finalOperations = null;
this.xyzList = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "SpaceGroup");
Clazz.prepareFields (c$, function () {
this.xyzList =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (doNormalize) {
this.doNormalize = doNormalize;
this.addSymmetry ("x,y,z", 0);
this.index = ($t$ = ++ org.jmol.symmetry.SpaceGroup.sgIndex, org.jmol.symmetry.SpaceGroup.prototype.sgIndex = org.jmol.symmetry.SpaceGroup.sgIndex, $t$);
}, "~B");
Clazz.makeConstructor (c$, 
($fz = function (cifLine) {
this.buildSpaceGroup (cifLine);
}, $fz.isPrivate = true, $fz), "~S");
c$.createSpaceGroup = Clazz.defineMethod (c$, "createSpaceGroup", 
function (desiredSpaceGroupIndex, name, notionalUnitcell) {
var sg = null;
if (desiredSpaceGroupIndex >= 0) {
sg = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[desiredSpaceGroupIndex];
} else {
sg = org.jmol.symmetry.SpaceGroup.determineSpaceGroupNA (name, notionalUnitcell);
if (sg == null) sg = org.jmol.symmetry.SpaceGroup.createSpaceGroupN (name);
}if (sg != null) sg.generateAllOperators (null);
return sg;
}, "~N,~S,~A");
Clazz.defineMethod (c$, "addSymmetry", 
function (xyz, opId) {
xyz = xyz.toLowerCase ();
if (xyz.indexOf ("[[") < 0 && xyz.indexOf ("x4") < 0 && (xyz.indexOf ("x") < 0 || xyz.indexOf ("y") < 0 || xyz.indexOf ("z") < 0)) return -1;
return this.addOperation (xyz, opId);
}, "~S,~N");
Clazz.defineMethod (c$, "setFinalOperations", 
function (atoms, atomIndex, count, doNormalize) {
if (this.hallInfo == null && this.latticeParameter != 0) {
var h =  new org.jmol.symmetry.HallInfo (org.jmol.symmetry.HallTranslation.getHallLatticeEquivalent (this.latticeParameter));
this.generateAllOperators (h);
}if (this.index >= org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length) {
var sg = this.getDerivedSpaceGroup ();
if (sg != null) this.name = sg.getName ();
}this.finalOperations =  new Array (this.operationCount);
if (doNormalize && count > 0 && atoms != null) {
this.finalOperations[0] =  new org.jmol.symmetry.SymmetryOperation (this.operations[0], atoms, atomIndex, count, true);
var atom = atoms[atomIndex];
var c = org.jmol.util.Point3f.newP (atom);
this.finalOperations[0].transform (c);
if (c.distance (atom) > 0.0001) for (var i = 0; i < count; i++) {
atom = atoms[atomIndex + i];
c.setT (atom);
this.finalOperations[0].transform (c);
atom.setT (c);
}
}for (var i = 0; i < this.operationCount; i++) {
this.finalOperations[i] =  new org.jmol.symmetry.SymmetryOperation (this.operations[i], atoms, atomIndex, count, doNormalize);
}
}, "~A,~N,~N,~B");
Clazz.defineMethod (c$, "getOperationCount", 
function () {
return this.finalOperations.length;
});
Clazz.defineMethod (c$, "getOperation", 
function (i) {
return this.finalOperations[i];
}, "~N");
Clazz.defineMethod (c$, "getXyz", 
function (i, doNormalize) {
return this.finalOperations[i].getXyz (doNormalize);
}, "~N,~B");
Clazz.defineMethod (c$, "newPoint", 
function (i, atom1, atom2, transX, transY, transZ) {
this.finalOperations[i].newPoint (atom1, atom2, transX, transY, transZ);
}, "~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,~N");
Clazz.defineMethod (c$, "rotateEllipsoid", 
function (i, ptTemp, axes, unitCell, ptTemp1, ptTemp2) {
return this.finalOperations[i].rotateEllipsoid (ptTemp, axes, unitCell, ptTemp1, ptTemp2);
}, "~N,org.jmol.util.Point3f,~A,org.jmol.symmetry.UnitCell,org.jmol.util.Point3f,org.jmol.util.Point3f");
c$.getInfo = Clazz.defineMethod (c$, "getInfo", 
function (spaceGroup, cellInfo) {
var sg;
if (cellInfo != null) {
if (spaceGroup.indexOf ("[") >= 0) spaceGroup = spaceGroup.substring (0, spaceGroup.indexOf ("[")).trim ();
if (spaceGroup.equals ("unspecified!")) return "no space group identified in file";
sg = org.jmol.symmetry.SpaceGroup.determineSpaceGroupNA (spaceGroup, cellInfo.getNotionalUnitCell ());
} else if (spaceGroup.equalsIgnoreCase ("ALL")) {
return org.jmol.symmetry.SpaceGroup.dumpAll ();
} else if (spaceGroup.equalsIgnoreCase ("ALLSEITZ")) {
return org.jmol.symmetry.SpaceGroup.dumpAllSeitz ();
} else {
sg = org.jmol.symmetry.SpaceGroup.determineSpaceGroupN (spaceGroup);
if (sg == null) {
sg = org.jmol.symmetry.SpaceGroup.createSpaceGroupN (spaceGroup);
} else {
var sb =  new org.jmol.util.StringXBuilder ();
while (sg != null) {
sb.append (sg.dumpInfo (null));
sg = org.jmol.symmetry.SpaceGroup.determineSpaceGroupNS (spaceGroup, sg);
}
return sb.toString ();
}}return sg == null ? "?" : sg.dumpInfo (cellInfo);
}, "~S,org.jmol.api.SymmetryInterface");
Clazz.defineMethod (c$, "dumpInfo", 
function (cellInfo) {
var info = this.dumpCanonicalSeitzList ();
if (Clazz.instanceOf (info, org.jmol.symmetry.SpaceGroup)) return (info).dumpInfo (null);
var sb =  new org.jmol.util.StringXBuilder ().append ("\nHermann-Mauguin symbol: ");
sb.append (this.hmSymbol).append (this.hmSymbolExt.length > 0 ? ":" + this.hmSymbolExt : "").append ("\ninternational table number: ").append (this.intlTableNumber).append (this.intlTableNumberExt.length > 0 ? ":" + this.intlTableNumberExt : "").append ("\n\n").appendI (this.operationCount).append (" operators").append (!this.hallInfo.hallSymbol.equals ("--") ? " from Hall symbol " + this.hallInfo.hallSymbol : "").append (": ");
for (var i = 0; i < this.operationCount; i++) {
sb.append ("\n").append (this.operations[i].xyz);
}
sb.append ("\n\n").append (this.hallInfo == null ? "invalid Hall symbol" : this.hallInfo.dumpInfo ());
sb.append ("\n\ncanonical Seitz: ").append (info).append ("\n----------------------------------------------------\n");
return sb.toString ();
}, "org.jmol.api.SymmetryInterface");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getLatticeDesignation", 
function () {
return this.latticeCode + ": " + org.jmol.symmetry.HallTranslation.getLatticeDesignation (this.latticeParameter);
});
Clazz.defineMethod (c$, "setLatticeParam", 
function (latticeParameter) {
this.latticeParameter = latticeParameter;
this.latticeCode = org.jmol.symmetry.HallTranslation.getLatticeCode (latticeParameter);
if (latticeParameter > 10) {
this.latticeParameter = -org.jmol.symmetry.HallTranslation.getLatticeIndex (this.latticeCode);
}}, "~N");
Clazz.defineMethod (c$, "dumpCanonicalSeitzList", 
($fz = function () {
if (this.hallInfo == null) this.hallInfo =  new org.jmol.symmetry.HallInfo (this.hallSymbol);
this.generateAllOperators (null);
var s = this.getCanonicalSeitzList ();
if (this.index >= org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length) {
var sgDerived = org.jmol.symmetry.SpaceGroup.findSpaceGroup (s);
if (sgDerived != null) return sgDerived;
}return (this.index >= 0 && this.index < org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length ? this.hallSymbol + " = " : "") + s;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getDerivedSpaceGroup", 
function () {
if (this.index >= 0 && this.index < org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length) return this;
if (this.finalOperations != null) this.setFinalOperations (null, 0, 0, false);
var s = this.getCanonicalSeitzList ();
return org.jmol.symmetry.SpaceGroup.findSpaceGroup (s);
});
Clazz.defineMethod (c$, "getCanonicalSeitzList", 
($fz = function () {
var list =  new Array (this.operationCount);
for (var i = 0; i < this.operationCount; i++) list[i] = org.jmol.symmetry.SymmetryOperation.dumpCanonicalSeitz (this.operations[i]);

java.util.Arrays.sort (list, 0, this.operationCount);
var sb =  new org.jmol.util.StringXBuilder ().append ("\n[");
for (var i = 0; i < this.operationCount; i++) sb.append (list[i].$replace ('\t', ' ').$replace ('\n', ' ')).append ("; ");

sb.append ("]");
return sb.toString ();
}, $fz.isPrivate = true, $fz));
c$.findSpaceGroup = Clazz.defineMethod (c$, "findSpaceGroup", 
($fz = function (s) {
if (org.jmol.symmetry.SpaceGroup.canonicalSeitzList == null) ($t$ = org.jmol.symmetry.SpaceGroup.canonicalSeitzList =  new Array (org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length), org.jmol.symmetry.SpaceGroup.prototype.canonicalSeitzList = org.jmol.symmetry.SpaceGroup.canonicalSeitzList, $t$);
for (var i = 0; i < org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length; i++) {
if (org.jmol.symmetry.SpaceGroup.canonicalSeitzList[i] == null) org.jmol.symmetry.SpaceGroup.canonicalSeitzList[i] = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i].dumpCanonicalSeitzList ();
if (org.jmol.symmetry.SpaceGroup.canonicalSeitzList[i].indexOf (s) >= 0) return org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
}
return null;
}, $fz.isPrivate = true, $fz), "~S");
c$.dumpAll = Clazz.defineMethod (c$, "dumpAll", 
($fz = function () {
var sb =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length; i++) sb.append ("\n----------------------\n" + org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i].dumpInfo (null));

return sb.toString ();
}, $fz.isPrivate = true, $fz));
c$.dumpAllSeitz = Clazz.defineMethod (c$, "dumpAllSeitz", 
($fz = function () {
var sb =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length; i++) sb.append ("\n").appendO (org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i].dumpCanonicalSeitzList ());

return sb.toString ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setLattice", 
($fz = function (latticeCode, isCentrosymmetric) {
this.latticeCode = latticeCode;
this.latticeParameter = org.jmol.symmetry.HallTranslation.getLatticeIndex (latticeCode);
if (!isCentrosymmetric) this.latticeParameter = -this.latticeParameter;
}, $fz.isPrivate = true, $fz), "~S,~B");
c$.createSpaceGroupN = Clazz.defineMethod (c$, "createSpaceGroupN", 
($fz = function (name) {
name = name.trim ();
var sg = org.jmol.symmetry.SpaceGroup.determineSpaceGroupN (name);
var hallInfo;
if (sg == null) {
hallInfo =  new org.jmol.symmetry.HallInfo (name);
if (hallInfo.nRotations > 0) {
sg =  new org.jmol.symmetry.SpaceGroup ("0;--;--;" + name);
sg.hallInfo = hallInfo;
} else if (name.indexOf (",") >= 0) {
sg =  new org.jmol.symmetry.SpaceGroup ("0;--;--;--");
sg.doNormalize = false;
sg.generateOperatorsFromXyzInfo (name);
}}if (sg != null) sg.generateAllOperators (null);
return sg;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "addOperation", 
($fz = function (xyz0, opId) {
if (xyz0 == null || xyz0.length < 3) {
this.xyzList =  new java.util.Hashtable ();
return -1;
}var isSpecial = (xyz0.charAt (0) == '=');
if (isSpecial) xyz0 = xyz0.substring (1);
if (this.xyzList.containsKey (xyz0)) return this.xyzList.get (xyz0).intValue ();
var symmetryOperation =  new org.jmol.symmetry.SymmetryOperation (this.doNormalize, opId);
if (!symmetryOperation.setMatrixFromXYZ (xyz0)) {
org.jmol.util.Logger.error ("couldn't interpret symmetry operation: " + xyz0);
return -1;
}var xyz = symmetryOperation.xyz;
if (!isSpecial) {
if (this.xyzList.containsKey (xyz)) return this.xyzList.get (xyz).intValue ();
this.xyzList.put (xyz, Integer.$valueOf (this.operationCount));
}if (!xyz.equals (xyz0)) this.xyzList.put (xyz0, Integer.$valueOf (this.operationCount));
if (this.operations == null) {
this.operations =  new Array (4);
this.operationCount = 0;
}if (this.operationCount == this.operations.length) this.operations = org.jmol.util.ArrayUtil.arrayCopyObject (this.operations, this.operationCount * 2);
this.operations[this.operationCount++] = symmetryOperation;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("\naddOperation " + this.operationCount + symmetryOperation.dumpInfo ());
return this.operationCount - 1;
}, $fz.isPrivate = true, $fz), "~S,~N");
Clazz.defineMethod (c$, "generateOperatorsFromXyzInfo", 
($fz = function (xyzInfo) {
this.addOperation (null, 0);
this.addSymmetry ("x,y,z", 0);
var terms = org.jmol.util.TextFormat.splitChars (xyzInfo.toLowerCase (), ";");
for (var i = 0; i < terms.length; i++) this.addSymmetry (terms[i], 0);

}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "generateAllOperators", 
($fz = function (h) {
if (h == null) {
h = this.hallInfo;
if (this.operationCount > 0) return;
this.operations =  new Array (4);
this.operationCount = 0;
if (this.hallInfo == null || this.hallInfo.nRotations == 0) h = this.hallInfo =  new org.jmol.symmetry.HallInfo (this.hallSymbol);
this.setLattice (this.hallInfo.latticeCode, this.hallInfo.isCentrosymmetric);
this.addOperation (null, 0);
this.addSymmetry ("x,y,z", 0);
}var mat1 =  new org.jmol.util.Matrix4f ();
var operation =  new org.jmol.util.Matrix4f ();
var newOps =  new Array (7);
for (var i = 0; i < 7; i++) newOps[i] =  new org.jmol.util.Matrix4f ();

for (var i = 0; i < h.nRotations; i++) {
mat1.setM (h.rotationTerms[i].seitzMatrix12ths);
var nRot = h.rotationTerms[i].order;
newOps[0].setIdentity ();
var nOps = this.operationCount;
for (var j = 1; j <= nRot; j++) {
newOps[j].mul2 (mat1, newOps[0]);
newOps[0].setM (newOps[j]);
for (var k = 0; k < nOps; k++) {
operation.mul2 (newOps[j], this.operations[k]);
org.jmol.symmetry.SymmetryOperation.normalizeTranslation (operation);
var xyz = org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (operation, true, true, true);
this.addSymmetrySM (xyz, operation);
}
}
}
}, $fz.isPrivate = true, $fz), "org.jmol.symmetry.HallInfo");
Clazz.defineMethod (c$, "addSymmetrySM", 
($fz = function (xyz, operation) {
var iop = this.addOperation (xyz, 0);
if (iop < 0) return;
var symmetryOperation = this.operations[iop];
symmetryOperation.setM (operation);
}, $fz.isPrivate = true, $fz), "~S,org.jmol.util.Matrix4f");
c$.determineSpaceGroupN = Clazz.defineMethod (c$, "determineSpaceGroupN", 
($fz = function (name) {
return org.jmol.symmetry.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, -1);
}, $fz.isPrivate = true, $fz), "~S");
c$.determineSpaceGroupNS = Clazz.defineMethod (c$, "determineSpaceGroupNS", 
($fz = function (name, sg) {
return org.jmol.symmetry.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, sg.index);
}, $fz.isPrivate = true, $fz), "~S,org.jmol.symmetry.SpaceGroup");
c$.determineSpaceGroupNA = Clazz.defineMethod (c$, "determineSpaceGroupNA", 
($fz = function (name, notionalUnitcell) {
if (notionalUnitcell == null) return org.jmol.symmetry.SpaceGroup.determineSpaceGroup (name, 0, 0, 0, 0, 0, 0, -1);
return org.jmol.symmetry.SpaceGroup.determineSpaceGroup (name, notionalUnitcell[0], notionalUnitcell[1], notionalUnitcell[2], notionalUnitcell[3], notionalUnitcell[4], notionalUnitcell[5], -1);
}, $fz.isPrivate = true, $fz), "~S,~A");
c$.determineSpaceGroup = Clazz.defineMethod (c$, "determineSpaceGroup", 
($fz = function (name, a, b, c, alpha, beta, gamma, lastIndex) {
var i = org.jmol.symmetry.SpaceGroup.determineSpaceGroupIndex (name, a, b, c, alpha, beta, gamma, lastIndex);
return (i >= 0 ? org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i] : null);
}, $fz.isPrivate = true, $fz), "~S,~N,~N,~N,~N,~N,~N,~N");
c$.determineSpaceGroupIndex = Clazz.defineMethod (c$, "determineSpaceGroupIndex", 
($fz = function (name, a, b, c, alpha, beta, gamma, lastIndex) {
if (lastIndex < 0) lastIndex = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions.length;
name = name.trim ().toLowerCase ();
var nameType = (name.startsWith ("hall:") ? 5 : name.startsWith ("hm:") ? 3 : 0);
if (nameType > 0) name = name.substring (nameType);
 else if (name.contains ("[")) {
nameType = 5;
name = name.substring (0, name.indexOf ("[")).trim ();
}var nameExt = name;
var i;
var haveExtension = false;
name = name.$replace ('_', ' ');
if (name.length >= 2) {
i = (name.indexOf ("-") == 0 ? 2 : 1);
if (i < name.length && name.charAt (i) != ' ') name = name.substring (0, i) + " " + name.substring (i);
name = name.substring (0, 2).toUpperCase () + name.substring (2);
}var ext = "";
if ((i = name.indexOf (":")) > 0) {
ext = name.substring (i + 1);
name = name.substring (0, i).trim ();
haveExtension = true;
}if (nameType != 5 && !haveExtension && org.jmol.util.Parser.isOneOf (name, org.jmol.symmetry.SpaceGroup.ambiguousNames)) {
ext = "?";
haveExtension = true;
}var abbr = org.jmol.util.TextFormat.replaceAllCharacters (name, " ()", "");
var s;
if (nameType != 3 && !haveExtension) for (i = lastIndex; --i >= 0; ) {
s = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hallSymbol.equals (name)) return i;
}
if (nameType != 5) {
if (nameType != 3) for (i = lastIndex; --i >= 0; ) {
s = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.intlTableNumberFull.equals (nameExt)) return i;
}
for (i = lastIndex; --i >= 0; ) {
s = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolFull.equals (nameExt)) return i;
}
for (i = lastIndex; --i >= 0; ) {
s = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolAlternative != null && s.hmSymbolAlternative.equals (nameExt)) return i;
}
if (haveExtension) for (i = lastIndex; --i >= 0; ) {
s = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolAbbr.equals (abbr) && s.intlTableNumberExt.equals (ext)) return i;
}
if (haveExtension) for (i = lastIndex; --i >= 0; ) {
s = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolAbbrShort.equals (abbr) && s.intlTableNumberExt.equals (ext)) return i;
}
var uniqueAxis = org.jmol.symmetry.SpaceGroup.determineUniqueAxis (a, b, c, alpha, beta, gamma);
if (!haveExtension || ext.charAt (0) == '?') for (i = lastIndex; --i >= 0; ) {
s = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.hmSymbolAbbr.equals (abbr) || s.hmSymbolAbbrShort.equals (abbr)) {
switch (s.ambiguityType) {
case '\0':
return i;
case 'a':
if (s.uniqueAxis == uniqueAxis || uniqueAxis == '\0') return i;
break;
case 'o':
if (ext.length == 0) {
if (s.hmSymbolExt.equals ("2")) return i;
} else if (s.hmSymbolExt.equals (ext)) return i;
break;
case 't':
if (ext.length == 0) {
if (s.axisChoice == 'h') return i;
} else if ((s.axisChoice + "").equals (ext)) return i;
break;
}
}}
}if (ext.length == 0) for (i = lastIndex; --i >= 0; ) {
s = org.jmol.symmetry.SpaceGroup.spaceGroupDefinitions[i];
if (s.intlTableNumber.equals (nameExt)) return i;
}
return -1;
}, $fz.isPrivate = true, $fz), "~S,~N,~N,~N,~N,~N,~N,~N");
c$.determineUniqueAxis = Clazz.defineMethod (c$, "determineUniqueAxis", 
($fz = function (a, b, c, alpha, beta, gamma) {
if (a == b) return (b == c ? '\0' : 'c');
if (b == c) return 'a';
if (c == a) return 'b';
if (alpha == beta) return (beta == gamma ? '\0' : 'c');
if (beta == gamma) return 'a';
if (gamma == alpha) return 'b';
return '\0';
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "buildSpaceGroup", 
($fz = function (cifLine) {
this.index = ($t$ = ++ org.jmol.symmetry.SpaceGroup.sgIndex, org.jmol.symmetry.SpaceGroup.prototype.sgIndex = org.jmol.symmetry.SpaceGroup.sgIndex, $t$);
var terms = org.jmol.util.TextFormat.splitChars (cifLine.toLowerCase (), ";");
var parts;
this.intlTableNumberFull = terms[0].trim ();
parts = org.jmol.util.TextFormat.splitChars (this.intlTableNumberFull, ":");
this.intlTableNumber = parts[0];
this.intlTableNumberExt = (parts.length == 1 ? "" : parts[1]);
this.ambiguityType = '\0';
if (this.intlTableNumberExt.length > 0) {
var term = this.intlTableNumberExt;
if (term.startsWith ("-")) term = term.substring (1);
if (term.equals ("h") || term.equals ("r")) {
this.ambiguityType = 't';
this.axisChoice = this.intlTableNumberExt.charAt (0);
} else if (this.intlTableNumberExt.startsWith ("1") || this.intlTableNumberExt.startsWith ("2")) {
this.ambiguityType = 'o';
} else if (this.intlTableNumberExt.length <= 2) {
this.ambiguityType = 'a';
this.uniqueAxis = this.intlTableNumberExt.charAt (0);
}}this.hmSymbolFull = Character.toUpperCase (terms[2].charAt (0)) + terms[2].substring (1);
parts = org.jmol.util.TextFormat.splitChars (this.hmSymbolFull, ":");
this.hmSymbol = parts[0];
this.hmSymbolExt = (parts.length == 1 ? "" : parts[1]);
var pt = this.hmSymbol.indexOf (" -3");
if (pt >= 1) if ("admn".indexOf (this.hmSymbol.charAt (pt - 1)) >= 0) {
this.hmSymbolAlternative = (this.hmSymbol.substring (0, pt) + " 3" + this.hmSymbol.substring (pt + 3)).toLowerCase ();
}this.hmSymbolAbbr = org.jmol.util.TextFormat.simpleReplace (this.hmSymbol, " ", "");
this.hmSymbolAbbrShort = org.jmol.util.TextFormat.simpleReplace (this.hmSymbol, " 1", "");
this.hmSymbolAbbrShort = org.jmol.util.TextFormat.simpleReplace (this.hmSymbolAbbrShort, " ", "");
this.hallSymbol = terms[3];
if (this.hallSymbol.length > 1) this.hallSymbol = this.hallSymbol.substring (0, 2).toUpperCase () + this.hallSymbol.substring (2);
var info = this.intlTableNumber + this.hallSymbol;
if (this.intlTableNumber.charAt (0) != '0' && org.jmol.symmetry.SpaceGroup.lastInfo.equals (info)) ($t$ = org.jmol.symmetry.SpaceGroup.ambiguousNames += this.hmSymbol + ";", org.jmol.symmetry.SpaceGroup.prototype.ambiguousNames = org.jmol.symmetry.SpaceGroup.ambiguousNames, $t$);
($t$ = org.jmol.symmetry.SpaceGroup.lastInfo = info, org.jmol.symmetry.SpaceGroup.prototype.lastInfo = org.jmol.symmetry.SpaceGroup.lastInfo, $t$);
this.name = this.hallSymbol + " [" + this.hmSymbolFull + "] #" + this.intlTableNumber;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineStatics (c$,
"canonicalSeitzList", null,
"NAME_HALL", 5,
"NAME_HM", 3,
"sgIndex", -1,
"ambiguousNames", "",
"lastInfo", "");
c$.spaceGroupDefinitions = c$.prototype.spaceGroupDefinitions = [ new org.jmol.symmetry.SpaceGroup ("1;c1^1;p 1;p 1"),  new org.jmol.symmetry.SpaceGroup ("2;ci^1;p -1;-p 1"),  new org.jmol.symmetry.SpaceGroup ("3:b;c2^1;p 1 2 1;p 2y"),  new org.jmol.symmetry.SpaceGroup ("3:b;c2^1;p 2;p 2y"),  new org.jmol.symmetry.SpaceGroup ("3:c;c2^1;p 1 1 2;p 2"),  new org.jmol.symmetry.SpaceGroup ("3:a;c2^1;p 2 1 1;p 2x"),  new org.jmol.symmetry.SpaceGroup ("4:b;c2^2;p 1 21 1;p 2yb"),  new org.jmol.symmetry.SpaceGroup ("4:b;c2^2;p 21;p 2yb"),  new org.jmol.symmetry.SpaceGroup ("4:b*;c2^2;p 1 21 1*;p 2y1"),  new org.jmol.symmetry.SpaceGroup ("4:c;c2^2;p 1 1 21;p 2c"),  new org.jmol.symmetry.SpaceGroup ("4:c*;c2^2;p 1 1 21*;p 21"),  new org.jmol.symmetry.SpaceGroup ("4:a;c2^2;p 21 1 1;p 2xa"),  new org.jmol.symmetry.SpaceGroup ("4:a*;c2^2;p 21 1 1*;p 2x1"),  new org.jmol.symmetry.SpaceGroup ("5:b1;c2^3;c 1 2 1;c 2y"),  new org.jmol.symmetry.SpaceGroup ("5:b1;c2^3;c 2;c 2y"),  new org.jmol.symmetry.SpaceGroup ("5:b2;c2^3;a 1 2 1;a 2y"),  new org.jmol.symmetry.SpaceGroup ("5:b3;c2^3;i 1 2 1;i 2y"),  new org.jmol.symmetry.SpaceGroup ("5:c1;c2^3;a 1 1 2;a 2"),  new org.jmol.symmetry.SpaceGroup ("5:c2;c2^3;b 1 1 2;b 2"),  new org.jmol.symmetry.SpaceGroup ("5:c3;c2^3;i 1 1 2;i 2"),  new org.jmol.symmetry.SpaceGroup ("5:a1;c2^3;b 2 1 1;b 2x"),  new org.jmol.symmetry.SpaceGroup ("5:a2;c2^3;c 2 1 1;c 2x"),  new org.jmol.symmetry.SpaceGroup ("5:a3;c2^3;i 2 1 1;i 2x"),  new org.jmol.symmetry.SpaceGroup ("6:b;cs^1;p 1 m 1;p -2y"),  new org.jmol.symmetry.SpaceGroup ("6:b;cs^1;p m;p -2y"),  new org.jmol.symmetry.SpaceGroup ("6:c;cs^1;p 1 1 m;p -2"),  new org.jmol.symmetry.SpaceGroup ("6:a;cs^1;p m 1 1;p -2x"),  new org.jmol.symmetry.SpaceGroup ("7:b1;cs^2;p 1 c 1;p -2yc"),  new org.jmol.symmetry.SpaceGroup ("7:b1;cs^2;p c;p -2yc"),  new org.jmol.symmetry.SpaceGroup ("7:b2;cs^2;p 1 n 1;p -2yac"),  new org.jmol.symmetry.SpaceGroup ("7:b2;cs^2;p n;p -2yac"),  new org.jmol.symmetry.SpaceGroup ("7:b3;cs^2;p 1 a 1;p -2ya"),  new org.jmol.symmetry.SpaceGroup ("7:b3;cs^2;p a;p -2ya"),  new org.jmol.symmetry.SpaceGroup ("7:c1;cs^2;p 1 1 a;p -2a"),  new org.jmol.symmetry.SpaceGroup ("7:c2;cs^2;p 1 1 n;p -2ab"),  new org.jmol.symmetry.SpaceGroup ("7:c3;cs^2;p 1 1 b;p -2b"),  new org.jmol.symmetry.SpaceGroup ("7:a1;cs^2;p b 1 1;p -2xb"),  new org.jmol.symmetry.SpaceGroup ("7:a2;cs^2;p n 1 1;p -2xbc"),  new org.jmol.symmetry.SpaceGroup ("7:a3;cs^2;p c 1 1;p -2xc"),  new org.jmol.symmetry.SpaceGroup ("8:b1;cs^3;c 1 m 1;c -2y"),  new org.jmol.symmetry.SpaceGroup ("8:b1;cs^3;c m;c -2y"),  new org.jmol.symmetry.SpaceGroup ("8:b2;cs^3;a 1 m 1;a -2y"),  new org.jmol.symmetry.SpaceGroup ("8:b3;cs^3;i 1 m 1;i -2y"),  new org.jmol.symmetry.SpaceGroup ("8:b3;cs^3;i m;i -2y"),  new org.jmol.symmetry.SpaceGroup ("8:c1;cs^3;a 1 1 m;a -2"),  new org.jmol.symmetry.SpaceGroup ("8:c2;cs^3;b 1 1 m;b -2"),  new org.jmol.symmetry.SpaceGroup ("8:c3;cs^3;i 1 1 m;i -2"),  new org.jmol.symmetry.SpaceGroup ("8:a1;cs^3;b m 1 1;b -2x"),  new org.jmol.symmetry.SpaceGroup ("8:a2;cs^3;c m 1 1;c -2x"),  new org.jmol.symmetry.SpaceGroup ("8:a3;cs^3;i m 1 1;i -2x"),  new org.jmol.symmetry.SpaceGroup ("9:b1;cs^4;c 1 c 1;c -2yc"),  new org.jmol.symmetry.SpaceGroup ("9:b1;cs^4;c c;c -2yc"),  new org.jmol.symmetry.SpaceGroup ("9:b2;cs^4;a 1 n 1;a -2yab"),  new org.jmol.symmetry.SpaceGroup ("9:b3;cs^4;i 1 a 1;i -2ya"),  new org.jmol.symmetry.SpaceGroup ("9:-b1;cs^4;a 1 a 1;a -2ya"),  new org.jmol.symmetry.SpaceGroup ("9:-b2;cs^4;c 1 n 1;c -2yac"),  new org.jmol.symmetry.SpaceGroup ("9:-b3;cs^4;i 1 c 1;i -2yc"),  new org.jmol.symmetry.SpaceGroup ("9:c1;cs^4;a 1 1 a;a -2a"),  new org.jmol.symmetry.SpaceGroup ("9:c2;cs^4;b 1 1 n;b -2ab"),  new org.jmol.symmetry.SpaceGroup ("9:c3;cs^4;i 1 1 b;i -2b"),  new org.jmol.symmetry.SpaceGroup ("9:-c1;cs^4;b 1 1 b;b -2b"),  new org.jmol.symmetry.SpaceGroup ("9:-c2;cs^4;a 1 1 n;a -2ab"),  new org.jmol.symmetry.SpaceGroup ("9:-c3;cs^4;i 1 1 a;i -2a"),  new org.jmol.symmetry.SpaceGroup ("9:a1;cs^4;b b 1 1;b -2xb"),  new org.jmol.symmetry.SpaceGroup ("9:a2;cs^4;c n 1 1;c -2xac"),  new org.jmol.symmetry.SpaceGroup ("9:a3;cs^4;i c 1 1;i -2xc"),  new org.jmol.symmetry.SpaceGroup ("9:-a1;cs^4;c c 1 1;c -2xc"),  new org.jmol.symmetry.SpaceGroup ("9:-a2;cs^4;b n 1 1;b -2xab"),  new org.jmol.symmetry.SpaceGroup ("9:-a3;cs^4;i b 1 1;i -2xb"),  new org.jmol.symmetry.SpaceGroup ("10:b;c2h^1;p 1 2/m 1;-p 2y"),  new org.jmol.symmetry.SpaceGroup ("10:b;c2h^1;p 2/m;-p 2y"),  new org.jmol.symmetry.SpaceGroup ("10:c;c2h^1;p 1 1 2/m;-p 2"),  new org.jmol.symmetry.SpaceGroup ("10:a;c2h^1;p 2/m 1 1;-p 2x"),  new org.jmol.symmetry.SpaceGroup ("11:b;c2h^2;p 1 21/m 1;-p 2yb"),  new org.jmol.symmetry.SpaceGroup ("11:b;c2h^2;p 21/m;-p 2yb"),  new org.jmol.symmetry.SpaceGroup ("11:b*;c2h^2;p 1 21/m 1*;-p 2y1"),  new org.jmol.symmetry.SpaceGroup ("11:c;c2h^2;p 1 1 21/m;-p 2c"),  new org.jmol.symmetry.SpaceGroup ("11:c*;c2h^2;p 1 1 21/m*;-p 21"),  new org.jmol.symmetry.SpaceGroup ("11:a;c2h^2;p 21/m 1 1;-p 2xa"),  new org.jmol.symmetry.SpaceGroup ("11:a*;c2h^2;p 21/m 1 1*;-p 2x1"),  new org.jmol.symmetry.SpaceGroup ("12:b1;c2h^3;c 1 2/m 1;-c 2y"),  new org.jmol.symmetry.SpaceGroup ("12:b1;c2h^3;c 2/m;-c 2y"),  new org.jmol.symmetry.SpaceGroup ("12:b2;c2h^3;a 1 2/m 1;-a 2y"),  new org.jmol.symmetry.SpaceGroup ("12:b3;c2h^3;i 1 2/m 1;-i 2y"),  new org.jmol.symmetry.SpaceGroup ("12:b3;c2h^3;i 2/m;-i 2y"),  new org.jmol.symmetry.SpaceGroup ("12:c1;c2h^3;a 1 1 2/m;-a 2"),  new org.jmol.symmetry.SpaceGroup ("12:c2;c2h^3;b 1 1 2/m;-b 2"),  new org.jmol.symmetry.SpaceGroup ("12:c3;c2h^3;i 1 1 2/m;-i 2"),  new org.jmol.symmetry.SpaceGroup ("12:a1;c2h^3;b 2/m 1 1;-b 2x"),  new org.jmol.symmetry.SpaceGroup ("12:a2;c2h^3;c 2/m 1 1;-c 2x"),  new org.jmol.symmetry.SpaceGroup ("12:a3;c2h^3;i 2/m 1 1;-i 2x"),  new org.jmol.symmetry.SpaceGroup ("13:b1;c2h^4;p 1 2/c 1;-p 2yc"),  new org.jmol.symmetry.SpaceGroup ("13:b1;c2h^4;p 2/c;-p 2yc"),  new org.jmol.symmetry.SpaceGroup ("13:b2;c2h^4;p 1 2/n 1;-p 2yac"),  new org.jmol.symmetry.SpaceGroup ("13:b2;c2h^4;p 2/n;-p 2yac"),  new org.jmol.symmetry.SpaceGroup ("13:b3;c2h^4;p 1 2/a 1;-p 2ya"),  new org.jmol.symmetry.SpaceGroup ("13:b3;c2h^4;p 2/a;-p 2ya"),  new org.jmol.symmetry.SpaceGroup ("13:c1;c2h^4;p 1 1 2/a;-p 2a"),  new org.jmol.symmetry.SpaceGroup ("13:c2;c2h^4;p 1 1 2/n;-p 2ab"),  new org.jmol.symmetry.SpaceGroup ("13:c3;c2h^4;p 1 1 2/b;-p 2b"),  new org.jmol.symmetry.SpaceGroup ("13:a1;c2h^4;p 2/b 1 1;-p 2xb"),  new org.jmol.symmetry.SpaceGroup ("13:a2;c2h^4;p 2/n 1 1;-p 2xbc"),  new org.jmol.symmetry.SpaceGroup ("13:a3;c2h^4;p 2/c 1 1;-p 2xc"),  new org.jmol.symmetry.SpaceGroup ("14:b1;c2h^5;p 1 21/c 1;-p 2ybc"),  new org.jmol.symmetry.SpaceGroup ("14:b1;c2h^5;p 21/c;-p 2ybc"),  new org.jmol.symmetry.SpaceGroup ("14:b2;c2h^5;p 1 21/n 1;-p 2yn"),  new org.jmol.symmetry.SpaceGroup ("14:b2;c2h^5;p 21/n;-p 2yn"),  new org.jmol.symmetry.SpaceGroup ("14:b3;c2h^5;p 1 21/a 1;-p 2yab"),  new org.jmol.symmetry.SpaceGroup ("14:b3;c2h^5;p 21/a;-p 2yab"),  new org.jmol.symmetry.SpaceGroup ("14:c1;c2h^5;p 1 1 21/a;-p 2ac"),  new org.jmol.symmetry.SpaceGroup ("14:c2;c2h^5;p 1 1 21/n;-p 2n"),  new org.jmol.symmetry.SpaceGroup ("14:c3;c2h^5;p 1 1 21/b;-p 2bc"),  new org.jmol.symmetry.SpaceGroup ("14:a1;c2h^5;p 21/b 1 1;-p 2xab"),  new org.jmol.symmetry.SpaceGroup ("14:a2;c2h^5;p 21/n 1 1;-p 2xn"),  new org.jmol.symmetry.SpaceGroup ("14:a3;c2h^5;p 21/c 1 1;-p 2xac"),  new org.jmol.symmetry.SpaceGroup ("15:b1;c2h^6;c 1 2/c 1;-c 2yc"),  new org.jmol.symmetry.SpaceGroup ("15:b1;c2h^6;c 2/c;-c 2yc"),  new org.jmol.symmetry.SpaceGroup ("15:b2;c2h^6;a 1 2/n 1;-a 2yab"),  new org.jmol.symmetry.SpaceGroup ("15:b3;c2h^6;i 1 2/a 1;-i 2ya"),  new org.jmol.symmetry.SpaceGroup ("15:b3;c2h^6;i 2/a;-i 2ya"),  new org.jmol.symmetry.SpaceGroup ("15:-b1;c2h^6;a 1 2/a 1;-a 2ya"),  new org.jmol.symmetry.SpaceGroup ("15:-b2;c2h^6;c 1 2/n 1;-c 2yac"),  new org.jmol.symmetry.SpaceGroup ("15:-b2;c2h^6;c 2/n;-c 2yac"),  new org.jmol.symmetry.SpaceGroup ("15:-b3;c2h^6;i 1 2/c 1;-i 2yc"),  new org.jmol.symmetry.SpaceGroup ("15:-b3;c2h^6;i 2/c;-i 2yc"),  new org.jmol.symmetry.SpaceGroup ("15:c1;c2h^6;a 1 1 2/a;-a 2a"),  new org.jmol.symmetry.SpaceGroup ("15:c2;c2h^6;b 1 1 2/n;-b 2ab"),  new org.jmol.symmetry.SpaceGroup ("15:c3;c2h^6;i 1 1 2/b;-i 2b"),  new org.jmol.symmetry.SpaceGroup ("15:-c1;c2h^6;b 1 1 2/b;-b 2b"),  new org.jmol.symmetry.SpaceGroup ("15:-c2;c2h^6;a 1 1 2/n;-a 2ab"),  new org.jmol.symmetry.SpaceGroup ("15:-c3;c2h^6;i 1 1 2/a;-i 2a"),  new org.jmol.symmetry.SpaceGroup ("15:a1;c2h^6;b 2/b 1 1;-b 2xb"),  new org.jmol.symmetry.SpaceGroup ("15:a2;c2h^6;c 2/n 1 1;-c 2xac"),  new org.jmol.symmetry.SpaceGroup ("15:a3;c2h^6;i 2/c 1 1;-i 2xc"),  new org.jmol.symmetry.SpaceGroup ("15:-a1;c2h^6;c 2/c 1 1;-c 2xc"),  new org.jmol.symmetry.SpaceGroup ("15:-a2;c2h^6;b 2/n 1 1;-b 2xab"),  new org.jmol.symmetry.SpaceGroup ("15:-a3;c2h^6;i 2/b 1 1;-i 2xb"),  new org.jmol.symmetry.SpaceGroup ("16;d2^1;p 2 2 2;p 2 2"),  new org.jmol.symmetry.SpaceGroup ("17;d2^2;p 2 2 21;p 2c 2"),  new org.jmol.symmetry.SpaceGroup ("17*;d2^2;p 2 2 21*;p 21 2"),  new org.jmol.symmetry.SpaceGroup ("17:cab;d2^2;p 21 2 2;p 2a 2a"),  new org.jmol.symmetry.SpaceGroup ("17:bca;d2^2;p 2 21 2;p 2 2b"),  new org.jmol.symmetry.SpaceGroup ("18;d2^3;p 21 21 2;p 2 2ab"),  new org.jmol.symmetry.SpaceGroup ("18:cab;d2^3;p 2 21 21;p 2bc 2"),  new org.jmol.symmetry.SpaceGroup ("18:bca;d2^3;p 21 2 21;p 2ac 2ac"),  new org.jmol.symmetry.SpaceGroup ("19;d2^4;p 21 21 21;p 2ac 2ab"),  new org.jmol.symmetry.SpaceGroup ("20;d2^5;c 2 2 21;c 2c 2"),  new org.jmol.symmetry.SpaceGroup ("20*;d2^5;c 2 2 21*;c 21 2"),  new org.jmol.symmetry.SpaceGroup ("20:cab;d2^5;a 21 2 2;a 2a 2a"),  new org.jmol.symmetry.SpaceGroup ("20:cab*;d2^5;a 21 2 2*;a 2a 21"),  new org.jmol.symmetry.SpaceGroup ("20:bca;d2^5;b 2 21 2;b 2 2b"),  new org.jmol.symmetry.SpaceGroup ("21;d2^6;c 2 2 2;c 2 2"),  new org.jmol.symmetry.SpaceGroup ("21:cab;d2^6;a 2 2 2;a 2 2"),  new org.jmol.symmetry.SpaceGroup ("21:bca;d2^6;b 2 2 2;b 2 2"),  new org.jmol.symmetry.SpaceGroup ("22;d2^7;f 2 2 2;f 2 2"),  new org.jmol.symmetry.SpaceGroup ("23;d2^8;i 2 2 2;i 2 2"),  new org.jmol.symmetry.SpaceGroup ("24;d2^9;i 21 21 21;i 2b 2c"),  new org.jmol.symmetry.SpaceGroup ("25;c2v^1;p m m 2;p 2 -2"),  new org.jmol.symmetry.SpaceGroup ("25:cab;c2v^1;p 2 m m;p -2 2"),  new org.jmol.symmetry.SpaceGroup ("25:bca;c2v^1;p m 2 m;p -2 -2"),  new org.jmol.symmetry.SpaceGroup ("26;c2v^2;p m c 21;p 2c -2"),  new org.jmol.symmetry.SpaceGroup ("26*;c2v^2;p m c 21*;p 21 -2"),  new org.jmol.symmetry.SpaceGroup ("26:ba-c;c2v^2;p c m 21;p 2c -2c"),  new org.jmol.symmetry.SpaceGroup ("26:ba-c*;c2v^2;p c m 21*;p 21 -2c"),  new org.jmol.symmetry.SpaceGroup ("26:cab;c2v^2;p 21 m a;p -2a 2a"),  new org.jmol.symmetry.SpaceGroup ("26:-cba;c2v^2;p 21 a m;p -2 2a"),  new org.jmol.symmetry.SpaceGroup ("26:bca;c2v^2;p b 21 m;p -2 -2b"),  new org.jmol.symmetry.SpaceGroup ("26:a-cb;c2v^2;p m 21 b;p -2b -2"),  new org.jmol.symmetry.SpaceGroup ("27;c2v^3;p c c 2;p 2 -2c"),  new org.jmol.symmetry.SpaceGroup ("27:cab;c2v^3;p 2 a a;p -2a 2"),  new org.jmol.symmetry.SpaceGroup ("27:bca;c2v^3;p b 2 b;p -2b -2b"),  new org.jmol.symmetry.SpaceGroup ("28;c2v^4;p m a 2;p 2 -2a"),  new org.jmol.symmetry.SpaceGroup ("28*;c2v^4;p m a 2*;p 2 -21"),  new org.jmol.symmetry.SpaceGroup ("28:ba-c;c2v^4;p b m 2;p 2 -2b"),  new org.jmol.symmetry.SpaceGroup ("28:cab;c2v^4;p 2 m b;p -2b 2"),  new org.jmol.symmetry.SpaceGroup ("28:-cba;c2v^4;p 2 c m;p -2c 2"),  new org.jmol.symmetry.SpaceGroup ("28:-cba*;c2v^4;p 2 c m*;p -21 2"),  new org.jmol.symmetry.SpaceGroup ("28:bca;c2v^4;p c 2 m;p -2c -2c"),  new org.jmol.symmetry.SpaceGroup ("28:a-cb;c2v^4;p m 2 a;p -2a -2a"),  new org.jmol.symmetry.SpaceGroup ("29;c2v^5;p c a 21;p 2c -2ac"),  new org.jmol.symmetry.SpaceGroup ("29:ba-c;c2v^5;p b c 21;p 2c -2b"),  new org.jmol.symmetry.SpaceGroup ("29:cab;c2v^5;p 21 a b;p -2b 2a"),  new org.jmol.symmetry.SpaceGroup ("29:-cba;c2v^5;p 21 c a;p -2ac 2a"),  new org.jmol.symmetry.SpaceGroup ("29:bca;c2v^5;p c 21 b;p -2bc -2c"),  new org.jmol.symmetry.SpaceGroup ("29:a-cb;c2v^5;p b 21 a;p -2a -2ab"),  new org.jmol.symmetry.SpaceGroup ("30;c2v^6;p n c 2;p 2 -2bc"),  new org.jmol.symmetry.SpaceGroup ("30:ba-c;c2v^6;p c n 2;p 2 -2ac"),  new org.jmol.symmetry.SpaceGroup ("30:cab;c2v^6;p 2 n a;p -2ac 2"),  new org.jmol.symmetry.SpaceGroup ("30:-cba;c2v^6;p 2 a n;p -2ab 2"),  new org.jmol.symmetry.SpaceGroup ("30:bca;c2v^6;p b 2 n;p -2ab -2ab"),  new org.jmol.symmetry.SpaceGroup ("30:a-cb;c2v^6;p n 2 b;p -2bc -2bc"),  new org.jmol.symmetry.SpaceGroup ("31;c2v^7;p m n 21;p 2ac -2"),  new org.jmol.symmetry.SpaceGroup ("31:ba-c;c2v^7;p n m 21;p 2bc -2bc"),  new org.jmol.symmetry.SpaceGroup ("31:cab;c2v^7;p 21 m n;p -2ab 2ab"),  new org.jmol.symmetry.SpaceGroup ("31:-cba;c2v^7;p 21 n m;p -2 2ac"),  new org.jmol.symmetry.SpaceGroup ("31:bca;c2v^7;p n 21 m;p -2 -2bc"),  new org.jmol.symmetry.SpaceGroup ("31:a-cb;c2v^7;p m 21 n;p -2ab -2"),  new org.jmol.symmetry.SpaceGroup ("32;c2v^8;p b a 2;p 2 -2ab"),  new org.jmol.symmetry.SpaceGroup ("32:cab;c2v^8;p 2 c b;p -2bc 2"),  new org.jmol.symmetry.SpaceGroup ("32:bca;c2v^8;p c 2 a;p -2ac -2ac"),  new org.jmol.symmetry.SpaceGroup ("33;c2v^9;p n a 21;p 2c -2n"),  new org.jmol.symmetry.SpaceGroup ("33*;c2v^9;p n a 21*;p 21 -2n"),  new org.jmol.symmetry.SpaceGroup ("33:ba-c;c2v^9;p b n 21;p 2c -2ab"),  new org.jmol.symmetry.SpaceGroup ("33:ba-c*;c2v^9;p b n 21*;p 21 -2ab"),  new org.jmol.symmetry.SpaceGroup ("33:cab;c2v^9;p 21 n b;p -2bc 2a"),  new org.jmol.symmetry.SpaceGroup ("33:cab*;c2v^9;p 21 n b*;p -2bc 21"),  new org.jmol.symmetry.SpaceGroup ("33:-cba;c2v^9;p 21 c n;p -2n 2a"),  new org.jmol.symmetry.SpaceGroup ("33:-cba*;c2v^9;p 21 c n*;p -2n 21"),  new org.jmol.symmetry.SpaceGroup ("33:bca;c2v^9;p c 21 n;p -2n -2ac"),  new org.jmol.symmetry.SpaceGroup ("33:a-cb;c2v^9;p n 21 a;p -2ac -2n"),  new org.jmol.symmetry.SpaceGroup ("34;c2v^10;p n n 2;p 2 -2n"),  new org.jmol.symmetry.SpaceGroup ("34:cab;c2v^10;p 2 n n;p -2n 2"),  new org.jmol.symmetry.SpaceGroup ("34:bca;c2v^10;p n 2 n;p -2n -2n"),  new org.jmol.symmetry.SpaceGroup ("35;c2v^11;c m m 2;c 2 -2"),  new org.jmol.symmetry.SpaceGroup ("35:cab;c2v^11;a 2 m m;a -2 2"),  new org.jmol.symmetry.SpaceGroup ("35:bca;c2v^11;b m 2 m;b -2 -2"),  new org.jmol.symmetry.SpaceGroup ("36;c2v^12;c m c 21;c 2c -2"),  new org.jmol.symmetry.SpaceGroup ("36*;c2v^12;c m c 21*;c 21 -2"),  new org.jmol.symmetry.SpaceGroup ("36:ba-c;c2v^12;c c m 21;c 2c -2c"),  new org.jmol.symmetry.SpaceGroup ("36:ba-c*;c2v^12;c c m 21*;c 21 -2c"),  new org.jmol.symmetry.SpaceGroup ("36:cab;c2v^12;a 21 m a;a -2a 2a"),  new org.jmol.symmetry.SpaceGroup ("36:cab*;c2v^12;a 21 m a*;a -2a 21"),  new org.jmol.symmetry.SpaceGroup ("36:-cba;c2v^12;a 21 a m;a -2 2a"),  new org.jmol.symmetry.SpaceGroup ("36:-cba*;c2v^12;a 21 a m*;a -2 21"),  new org.jmol.symmetry.SpaceGroup ("36:bca;c2v^12;b b 21 m;b -2 -2b"),  new org.jmol.symmetry.SpaceGroup ("36:a-cb;c2v^12;b m 21 b;b -2b -2"),  new org.jmol.symmetry.SpaceGroup ("37;c2v^13;c c c 2;c 2 -2c"),  new org.jmol.symmetry.SpaceGroup ("37:cab;c2v^13;a 2 a a;a -2a 2"),  new org.jmol.symmetry.SpaceGroup ("37:bca;c2v^13;b b 2 b;b -2b -2b"),  new org.jmol.symmetry.SpaceGroup ("38;c2v^14;a m m 2;a 2 -2"),  new org.jmol.symmetry.SpaceGroup ("38:ba-c;c2v^14;b m m 2;b 2 -2"),  new org.jmol.symmetry.SpaceGroup ("38:cab;c2v^14;b 2 m m;b -2 2"),  new org.jmol.symmetry.SpaceGroup ("38:-cba;c2v^14;c 2 m m;c -2 2"),  new org.jmol.symmetry.SpaceGroup ("38:bca;c2v^14;c m 2 m;c -2 -2"),  new org.jmol.symmetry.SpaceGroup ("38:a-cb;c2v^14;a m 2 m;a -2 -2"),  new org.jmol.symmetry.SpaceGroup ("39;c2v^15;a b m 2;a 2 -2b"),  new org.jmol.symmetry.SpaceGroup ("39:ba-c;c2v^15;b m a 2;b 2 -2a"),  new org.jmol.symmetry.SpaceGroup ("39:cab;c2v^15;b 2 c m;b -2a 2"),  new org.jmol.symmetry.SpaceGroup ("39:-cba;c2v^15;c 2 m b;c -2a 2"),  new org.jmol.symmetry.SpaceGroup ("39:bca;c2v^15;c m 2 a;c -2a -2a"),  new org.jmol.symmetry.SpaceGroup ("39:a-cb;c2v^15;a c 2 m;a -2b -2b"),  new org.jmol.symmetry.SpaceGroup ("40;c2v^16;a m a 2;a 2 -2a"),  new org.jmol.symmetry.SpaceGroup ("40:ba-c;c2v^16;b b m 2;b 2 -2b"),  new org.jmol.symmetry.SpaceGroup ("40:cab;c2v^16;b 2 m b;b -2b 2"),  new org.jmol.symmetry.SpaceGroup ("40:-cba;c2v^16;c 2 c m;c -2c 2"),  new org.jmol.symmetry.SpaceGroup ("40:bca;c2v^16;c c 2 m;c -2c -2c"),  new org.jmol.symmetry.SpaceGroup ("40:a-cb;c2v^16;a m 2 a;a -2a -2a"),  new org.jmol.symmetry.SpaceGroup ("41;c2v^17;a b a 2;a 2 -2ab"),  new org.jmol.symmetry.SpaceGroup ("41:ba-c;c2v^17;b b a 2;b 2 -2ab"),  new org.jmol.symmetry.SpaceGroup ("41:cab;c2v^17;b 2 c b;b -2ab 2"),  new org.jmol.symmetry.SpaceGroup ("41:-cba;c2v^17;c 2 c b;c -2ac 2"),  new org.jmol.symmetry.SpaceGroup ("41:bca;c2v^17;c c 2 a;c -2ac -2ac"),  new org.jmol.symmetry.SpaceGroup ("41:a-cb;c2v^17;a c 2 a;a -2ab -2ab"),  new org.jmol.symmetry.SpaceGroup ("42;c2v^18;f m m 2;f 2 -2"),  new org.jmol.symmetry.SpaceGroup ("42:cab;c2v^18;f 2 m m;f -2 2"),  new org.jmol.symmetry.SpaceGroup ("42:bca;c2v^18;f m 2 m;f -2 -2"),  new org.jmol.symmetry.SpaceGroup ("43;c2v^19;f d d 2;f 2 -2d"),  new org.jmol.symmetry.SpaceGroup ("43:cab;c2v^19;f 2 d d;f -2d 2"),  new org.jmol.symmetry.SpaceGroup ("43:bca;c2v^19;f d 2 d;f -2d -2d"),  new org.jmol.symmetry.SpaceGroup ("44;c2v^20;i m m 2;i 2 -2"),  new org.jmol.symmetry.SpaceGroup ("44:cab;c2v^20;i 2 m m;i -2 2"),  new org.jmol.symmetry.SpaceGroup ("44:bca;c2v^20;i m 2 m;i -2 -2"),  new org.jmol.symmetry.SpaceGroup ("45;c2v^21;i b a 2;i 2 -2c"),  new org.jmol.symmetry.SpaceGroup ("45:cab;c2v^21;i 2 c b;i -2a 2"),  new org.jmol.symmetry.SpaceGroup ("45:bca;c2v^21;i c 2 a;i -2b -2b"),  new org.jmol.symmetry.SpaceGroup ("46;c2v^22;i m a 2;i 2 -2a"),  new org.jmol.symmetry.SpaceGroup ("46:ba-c;c2v^22;i b m 2;i 2 -2b"),  new org.jmol.symmetry.SpaceGroup ("46:cab;c2v^22;i 2 m b;i -2b 2"),  new org.jmol.symmetry.SpaceGroup ("46:-cba;c2v^22;i 2 c m;i -2c 2"),  new org.jmol.symmetry.SpaceGroup ("46:bca;c2v^22;i c 2 m;i -2c -2c"),  new org.jmol.symmetry.SpaceGroup ("46:a-cb;c2v^22;i m 2 a;i -2a -2a"),  new org.jmol.symmetry.SpaceGroup ("47;d2h^1;p m m m;-p 2 2"),  new org.jmol.symmetry.SpaceGroup ("48:1;d2h^2;p n n n:1;p 2 2 -1n"),  new org.jmol.symmetry.SpaceGroup ("48:2;d2h^2;p n n n:2;-p 2ab 2bc"),  new org.jmol.symmetry.SpaceGroup ("49;d2h^3;p c c m;-p 2 2c"),  new org.jmol.symmetry.SpaceGroup ("49:cab;d2h^3;p m a a;-p 2a 2"),  new org.jmol.symmetry.SpaceGroup ("49:bca;d2h^3;p b m b;-p 2b 2b"),  new org.jmol.symmetry.SpaceGroup ("50:1;d2h^4;p b a n:1;p 2 2 -1ab"),  new org.jmol.symmetry.SpaceGroup ("50:2;d2h^4;p b a n:2;-p 2ab 2b"),  new org.jmol.symmetry.SpaceGroup ("50:1cab;d2h^4;p n c b:1;p 2 2 -1bc"),  new org.jmol.symmetry.SpaceGroup ("50:2cab;d2h^4;p n c b:2;-p 2b 2bc"),  new org.jmol.symmetry.SpaceGroup ("50:1bca;d2h^4;p c n a:1;p 2 2 -1ac"),  new org.jmol.symmetry.SpaceGroup ("50:2bca;d2h^4;p c n a:2;-p 2a 2c"),  new org.jmol.symmetry.SpaceGroup ("51;d2h^5;p m m a;-p 2a 2a"),  new org.jmol.symmetry.SpaceGroup ("51:ba-c;d2h^5;p m m b;-p 2b 2"),  new org.jmol.symmetry.SpaceGroup ("51:cab;d2h^5;p b m m;-p 2 2b"),  new org.jmol.symmetry.SpaceGroup ("51:-cba;d2h^5;p c m m;-p 2c 2c"),  new org.jmol.symmetry.SpaceGroup ("51:bca;d2h^5;p m c m;-p 2c 2"),  new org.jmol.symmetry.SpaceGroup ("51:a-cb;d2h^5;p m a m;-p 2 2a"),  new org.jmol.symmetry.SpaceGroup ("52;d2h^6;p n n a;-p 2a 2bc"),  new org.jmol.symmetry.SpaceGroup ("52:ba-c;d2h^6;p n n b;-p 2b 2n"),  new org.jmol.symmetry.SpaceGroup ("52:cab;d2h^6;p b n n;-p 2n 2b"),  new org.jmol.symmetry.SpaceGroup ("52:-cba;d2h^6;p c n n;-p 2ab 2c"),  new org.jmol.symmetry.SpaceGroup ("52:bca;d2h^6;p n c n;-p 2ab 2n"),  new org.jmol.symmetry.SpaceGroup ("52:a-cb;d2h^6;p n a n;-p 2n 2bc"),  new org.jmol.symmetry.SpaceGroup ("53;d2h^7;p m n a;-p 2ac 2"),  new org.jmol.symmetry.SpaceGroup ("53:ba-c;d2h^7;p n m b;-p 2bc 2bc"),  new org.jmol.symmetry.SpaceGroup ("53:cab;d2h^7;p b m n;-p 2ab 2ab"),  new org.jmol.symmetry.SpaceGroup ("53:-cba;d2h^7;p c n m;-p 2 2ac"),  new org.jmol.symmetry.SpaceGroup ("53:bca;d2h^7;p n c m;-p 2 2bc"),  new org.jmol.symmetry.SpaceGroup ("53:a-cb;d2h^7;p m a n;-p 2ab 2"),  new org.jmol.symmetry.SpaceGroup ("54;d2h^8;p c c a;-p 2a 2ac"),  new org.jmol.symmetry.SpaceGroup ("54:ba-c;d2h^8;p c c b;-p 2b 2c"),  new org.jmol.symmetry.SpaceGroup ("54:cab;d2h^8;p b a a;-p 2a 2b"),  new org.jmol.symmetry.SpaceGroup ("54:-cba;d2h^8;p c a a;-p 2ac 2c"),  new org.jmol.symmetry.SpaceGroup ("54:bca;d2h^8;p b c b;-p 2bc 2b"),  new org.jmol.symmetry.SpaceGroup ("54:a-cb;d2h^8;p b a b;-p 2b 2ab"),  new org.jmol.symmetry.SpaceGroup ("55;d2h^9;p b a m;-p 2 2ab"),  new org.jmol.symmetry.SpaceGroup ("55:cab;d2h^9;p m c b;-p 2bc 2"),  new org.jmol.symmetry.SpaceGroup ("55:bca;d2h^9;p c m a;-p 2ac 2ac"),  new org.jmol.symmetry.SpaceGroup ("56;d2h^10;p c c n;-p 2ab 2ac"),  new org.jmol.symmetry.SpaceGroup ("56:cab;d2h^10;p n a a;-p 2ac 2bc"),  new org.jmol.symmetry.SpaceGroup ("56:bca;d2h^10;p b n b;-p 2bc 2ab"),  new org.jmol.symmetry.SpaceGroup ("57;d2h^11;p b c m;-p 2c 2b"),  new org.jmol.symmetry.SpaceGroup ("57:ba-c;d2h^11;p c a m;-p 2c 2ac"),  new org.jmol.symmetry.SpaceGroup ("57:cab;d2h^11;p m c a;-p 2ac 2a"),  new org.jmol.symmetry.SpaceGroup ("57:-cba;d2h^11;p m a b;-p 2b 2a"),  new org.jmol.symmetry.SpaceGroup ("57:bca;d2h^11;p b m a;-p 2a 2ab"),  new org.jmol.symmetry.SpaceGroup ("57:a-cb;d2h^11;p c m b;-p 2bc 2c"),  new org.jmol.symmetry.SpaceGroup ("58;d2h^12;p n n m;-p 2 2n"),  new org.jmol.symmetry.SpaceGroup ("58:cab;d2h^12;p m n n;-p 2n 2"),  new org.jmol.symmetry.SpaceGroup ("58:bca;d2h^12;p n m n;-p 2n 2n"),  new org.jmol.symmetry.SpaceGroup ("59:1;d2h^13;p m m n:1;p 2 2ab -1ab"),  new org.jmol.symmetry.SpaceGroup ("59:2;d2h^13;p m m n:2;-p 2ab 2a"),  new org.jmol.symmetry.SpaceGroup ("59:1cab;d2h^13;p n m m:1;p 2bc 2 -1bc"),  new org.jmol.symmetry.SpaceGroup ("59:2cab;d2h^13;p n m m:2;-p 2c 2bc"),  new org.jmol.symmetry.SpaceGroup ("59:1bca;d2h^13;p m n m:1;p 2ac 2ac -1ac"),  new org.jmol.symmetry.SpaceGroup ("59:2bca;d2h^13;p m n m:2;-p 2c 2a"),  new org.jmol.symmetry.SpaceGroup ("60;d2h^14;p b c n;-p 2n 2ab"),  new org.jmol.symmetry.SpaceGroup ("60:ba-c;d2h^14;p c a n;-p 2n 2c"),  new org.jmol.symmetry.SpaceGroup ("60:cab;d2h^14;p n c a;-p 2a 2n"),  new org.jmol.symmetry.SpaceGroup ("60:-cba;d2h^14;p n a b;-p 2bc 2n"),  new org.jmol.symmetry.SpaceGroup ("60:bca;d2h^14;p b n a;-p 2ac 2b"),  new org.jmol.symmetry.SpaceGroup ("60:a-cb;d2h^14;p c n b;-p 2b 2ac"),  new org.jmol.symmetry.SpaceGroup ("61;d2h^15;p b c a;-p 2ac 2ab"),  new org.jmol.symmetry.SpaceGroup ("61:ba-c;d2h^15;p c a b;-p 2bc 2ac"),  new org.jmol.symmetry.SpaceGroup ("62;d2h^16;p n m a;-p 2ac 2n"),  new org.jmol.symmetry.SpaceGroup ("62:ba-c;d2h^16;p m n b;-p 2bc 2a"),  new org.jmol.symmetry.SpaceGroup ("62:cab;d2h^16;p b n m;-p 2c 2ab"),  new org.jmol.symmetry.SpaceGroup ("62:-cba;d2h^16;p c m n;-p 2n 2ac"),  new org.jmol.symmetry.SpaceGroup ("62:bca;d2h^16;p m c n;-p 2n 2a"),  new org.jmol.symmetry.SpaceGroup ("62:a-cb;d2h^16;p n a m;-p 2c 2n"),  new org.jmol.symmetry.SpaceGroup ("63;d2h^17;c m c m;-c 2c 2"),  new org.jmol.symmetry.SpaceGroup ("63:ba-c;d2h^17;c c m m;-c 2c 2c"),  new org.jmol.symmetry.SpaceGroup ("63:cab;d2h^17;a m m a;-a 2a 2a"),  new org.jmol.symmetry.SpaceGroup ("63:-cba;d2h^17;a m a m;-a 2 2a"),  new org.jmol.symmetry.SpaceGroup ("63:bca;d2h^17;b b m m;-b 2 2b"),  new org.jmol.symmetry.SpaceGroup ("63:a-cb;d2h^17;b m m b;-b 2b 2"),  new org.jmol.symmetry.SpaceGroup ("64;d2h^18;c m c a;-c 2ac 2"),  new org.jmol.symmetry.SpaceGroup ("64:ba-c;d2h^18;c c m b;-c 2ac 2ac"),  new org.jmol.symmetry.SpaceGroup ("64:cab;d2h^18;a b m a;-a 2ab 2ab"),  new org.jmol.symmetry.SpaceGroup ("64:-cba;d2h^18;a c a m;-a 2 2ab"),  new org.jmol.symmetry.SpaceGroup ("64:bca;d2h^18;b b c m;-b 2 2ab"),  new org.jmol.symmetry.SpaceGroup ("64:a-cb;d2h^18;b m a b;-b 2ab 2"),  new org.jmol.symmetry.SpaceGroup ("65;d2h^19;c m m m;-c 2 2"),  new org.jmol.symmetry.SpaceGroup ("65:cab;d2h^19;a m m m;-a 2 2"),  new org.jmol.symmetry.SpaceGroup ("65:bca;d2h^19;b m m m;-b 2 2"),  new org.jmol.symmetry.SpaceGroup ("66;d2h^20;c c c m;-c 2 2c"),  new org.jmol.symmetry.SpaceGroup ("66:cab;d2h^20;a m a a;-a 2a 2"),  new org.jmol.symmetry.SpaceGroup ("66:bca;d2h^20;b b m b;-b 2b 2b"),  new org.jmol.symmetry.SpaceGroup ("67;d2h^21;c m m a;-c 2a 2"),  new org.jmol.symmetry.SpaceGroup ("67:ba-c;d2h^21;c m m b;-c 2a 2a"),  new org.jmol.symmetry.SpaceGroup ("67:cab;d2h^21;a b m m;-a 2b 2b"),  new org.jmol.symmetry.SpaceGroup ("67:-cba;d2h^21;a c m m;-a 2 2b"),  new org.jmol.symmetry.SpaceGroup ("67:bca;d2h^21;b m c m;-b 2 2a"),  new org.jmol.symmetry.SpaceGroup ("67:a-cb;d2h^21;b m a m;-b 2a 2"),  new org.jmol.symmetry.SpaceGroup ("68:1;d2h^22;c c c a:1;c 2 2 -1ac"),  new org.jmol.symmetry.SpaceGroup ("68:2;d2h^22;c c c a:2;-c 2a 2ac"),  new org.jmol.symmetry.SpaceGroup ("68:1ba-c;d2h^22;c c c b:1;c 2 2 -1ac"),  new org.jmol.symmetry.SpaceGroup ("68:2ba-c;d2h^22;c c c b:2;-c 2a 2c"),  new org.jmol.symmetry.SpaceGroup ("68:1cab;d2h^22;a b a a:1;a 2 2 -1ab"),  new org.jmol.symmetry.SpaceGroup ("68:2cab;d2h^22;a b a a:2;-a 2a 2b"),  new org.jmol.symmetry.SpaceGroup ("68:1-cba;d2h^22;a c a a:1;a 2 2 -1ab"),  new org.jmol.symmetry.SpaceGroup ("68:2-cba;d2h^22;a c a a:2;-a 2ab 2b"),  new org.jmol.symmetry.SpaceGroup ("68:1bca;d2h^22;b b c b:1;b 2 2 -1ab"),  new org.jmol.symmetry.SpaceGroup ("68:2bca;d2h^22;b b c b:2;-b 2ab 2b"),  new org.jmol.symmetry.SpaceGroup ("68:1a-cb;d2h^22;b b a b:1;b 2 2 -1ab"),  new org.jmol.symmetry.SpaceGroup ("68:2a-cb;d2h^22;b b a b:2;-b 2b 2ab"),  new org.jmol.symmetry.SpaceGroup ("69;d2h^23;f m m m;-f 2 2"),  new org.jmol.symmetry.SpaceGroup ("70:1;d2h^24;f d d d:1;f 2 2 -1d"),  new org.jmol.symmetry.SpaceGroup ("70:2;d2h^24;f d d d:2;-f 2uv 2vw"),  new org.jmol.symmetry.SpaceGroup ("71;d2h^25;i m m m;-i 2 2"),  new org.jmol.symmetry.SpaceGroup ("72;d2h^26;i b a m;-i 2 2c"),  new org.jmol.symmetry.SpaceGroup ("72:cab;d2h^26;i m c b;-i 2a 2"),  new org.jmol.symmetry.SpaceGroup ("72:bca;d2h^26;i c m a;-i 2b 2b"),  new org.jmol.symmetry.SpaceGroup ("73;d2h^27;i b c a;-i 2b 2c"),  new org.jmol.symmetry.SpaceGroup ("73:ba-c;d2h^27;i c a b;-i 2a 2b"),  new org.jmol.symmetry.SpaceGroup ("74;d2h^28;i m m a;-i 2b 2"),  new org.jmol.symmetry.SpaceGroup ("74:ba-c;d2h^28;i m m b;-i 2a 2a"),  new org.jmol.symmetry.SpaceGroup ("74:cab;d2h^28;i b m m;-i 2c 2c"),  new org.jmol.symmetry.SpaceGroup ("74:-cba;d2h^28;i c m m;-i 2 2b"),  new org.jmol.symmetry.SpaceGroup ("74:bca;d2h^28;i m c m;-i 2 2a"),  new org.jmol.symmetry.SpaceGroup ("74:a-cb;d2h^28;i m a m;-i 2c 2"),  new org.jmol.symmetry.SpaceGroup ("75;c4^1;p 4;p 4"),  new org.jmol.symmetry.SpaceGroup ("76;c4^2;p 41;p 4w"),  new org.jmol.symmetry.SpaceGroup ("76*;c4^2;p 41*;p 41"),  new org.jmol.symmetry.SpaceGroup ("77;c4^3;p 42;p 4c"),  new org.jmol.symmetry.SpaceGroup ("77*;c4^3;p 42*;p 42"),  new org.jmol.symmetry.SpaceGroup ("78;c4^4;p 43;p 4cw"),  new org.jmol.symmetry.SpaceGroup ("78*;c4^4;p 43*;p 43"),  new org.jmol.symmetry.SpaceGroup ("79;c4^5;i 4;i 4"),  new org.jmol.symmetry.SpaceGroup ("80;c4^6;i 41;i 4bw"),  new org.jmol.symmetry.SpaceGroup ("81;s4^1;p -4;p -4"),  new org.jmol.symmetry.SpaceGroup ("82;s4^2;i -4;i -4"),  new org.jmol.symmetry.SpaceGroup ("83;c4h^1;p 4/m;-p 4"),  new org.jmol.symmetry.SpaceGroup ("84;c4h^2;p 42/m;-p 4c"),  new org.jmol.symmetry.SpaceGroup ("84*;c4h^2;p 42/m*;-p 42"),  new org.jmol.symmetry.SpaceGroup ("85:1;c4h^3;p 4/n:1;p 4ab -1ab"),  new org.jmol.symmetry.SpaceGroup ("85:2;c4h^3;p 4/n:2;-p 4a"),  new org.jmol.symmetry.SpaceGroup ("86:1;c4h^4;p 42/n:1;p 4n -1n"),  new org.jmol.symmetry.SpaceGroup ("86:2;c4h^4;p 42/n:2;-p 4bc"),  new org.jmol.symmetry.SpaceGroup ("87;c4h^5;i 4/m;-i 4"),  new org.jmol.symmetry.SpaceGroup ("88:1;c4h^6;i 41/a:1;i 4bw -1bw"),  new org.jmol.symmetry.SpaceGroup ("88:2;c4h^6;i 41/a:2;-i 4ad"),  new org.jmol.symmetry.SpaceGroup ("89;d4^1;p 4 2 2;p 4 2"),  new org.jmol.symmetry.SpaceGroup ("90;d4^2;p 4 21 2;p 4ab 2ab"),  new org.jmol.symmetry.SpaceGroup ("91;d4^3;p 41 2 2;p 4w 2c"),  new org.jmol.symmetry.SpaceGroup ("91*;d4^3;p 41 2 2*;p 41 2c"),  new org.jmol.symmetry.SpaceGroup ("92;d4^4;p 41 21 2;p 4abw 2nw"),  new org.jmol.symmetry.SpaceGroup ("93;d4^5;p 42 2 2;p 4c 2"),  new org.jmol.symmetry.SpaceGroup ("93*;d4^5;p 42 2 2*;p 42 2"),  new org.jmol.symmetry.SpaceGroup ("94;d4^6;p 42 21 2;p 4n 2n"),  new org.jmol.symmetry.SpaceGroup ("95;d4^7;p 43 2 2;p 4cw 2c"),  new org.jmol.symmetry.SpaceGroup ("95*;d4^7;p 43 2 2*;p 43 2c"),  new org.jmol.symmetry.SpaceGroup ("96;d4^8;p 43 21 2;p 4nw 2abw"),  new org.jmol.symmetry.SpaceGroup ("97;d4^9;i 4 2 2;i 4 2"),  new org.jmol.symmetry.SpaceGroup ("98;d4^10;i 41 2 2;i 4bw 2bw"),  new org.jmol.symmetry.SpaceGroup ("99;c4v^1;p 4 m m;p 4 -2"),  new org.jmol.symmetry.SpaceGroup ("100;c4v^2;p 4 b m;p 4 -2ab"),  new org.jmol.symmetry.SpaceGroup ("101;c4v^3;p 42 c m;p 4c -2c"),  new org.jmol.symmetry.SpaceGroup ("101*;c4v^3;p 42 c m*;p 42 -2c"),  new org.jmol.symmetry.SpaceGroup ("102;c4v^4;p 42 n m;p 4n -2n"),  new org.jmol.symmetry.SpaceGroup ("103;c4v^5;p 4 c c;p 4 -2c"),  new org.jmol.symmetry.SpaceGroup ("104;c4v^6;p 4 n c;p 4 -2n"),  new org.jmol.symmetry.SpaceGroup ("105;c4v^7;p 42 m c;p 4c -2"),  new org.jmol.symmetry.SpaceGroup ("105*;c4v^7;p 42 m c*;p 42 -2"),  new org.jmol.symmetry.SpaceGroup ("106;c4v^8;p 42 b c;p 4c -2ab"),  new org.jmol.symmetry.SpaceGroup ("106*;c4v^8;p 42 b c*;p 42 -2ab"),  new org.jmol.symmetry.SpaceGroup ("107;c4v^9;i 4 m m;i 4 -2"),  new org.jmol.symmetry.SpaceGroup ("108;c4v^10;i 4 c m;i 4 -2c"),  new org.jmol.symmetry.SpaceGroup ("109;c4v^11;i 41 m d;i 4bw -2"),  new org.jmol.symmetry.SpaceGroup ("110;c4v^12;i 41 c d;i 4bw -2c"),  new org.jmol.symmetry.SpaceGroup ("111;d2d^1;p -4 2 m;p -4 2"),  new org.jmol.symmetry.SpaceGroup ("112;d2d^2;p -4 2 c;p -4 2c"),  new org.jmol.symmetry.SpaceGroup ("113;d2d^3;p -4 21 m;p -4 2ab"),  new org.jmol.symmetry.SpaceGroup ("114;d2d^4;p -4 21 c;p -4 2n"),  new org.jmol.symmetry.SpaceGroup ("115;d2d^5;p -4 m 2;p -4 -2"),  new org.jmol.symmetry.SpaceGroup ("116;d2d^6;p -4 c 2;p -4 -2c"),  new org.jmol.symmetry.SpaceGroup ("117;d2d^7;p -4 b 2;p -4 -2ab"),  new org.jmol.symmetry.SpaceGroup ("118;d2d^8;p -4 n 2;p -4 -2n"),  new org.jmol.symmetry.SpaceGroup ("119;d2d^9;i -4 m 2;i -4 -2"),  new org.jmol.symmetry.SpaceGroup ("120;d2d^10;i -4 c 2;i -4 -2c"),  new org.jmol.symmetry.SpaceGroup ("121;d2d^11;i -4 2 m;i -4 2"),  new org.jmol.symmetry.SpaceGroup ("122;d2d^12;i -4 2 d;i -4 2bw"),  new org.jmol.symmetry.SpaceGroup ("123;d4h^1;p 4/m m m;-p 4 2"),  new org.jmol.symmetry.SpaceGroup ("124;d4h^2;p 4/m c c;-p 4 2c"),  new org.jmol.symmetry.SpaceGroup ("125:1;d4h^3;p 4/n b m:1;p 4 2 -1ab"),  new org.jmol.symmetry.SpaceGroup ("125:2;d4h^3;p 4/n b m:2;-p 4a 2b"),  new org.jmol.symmetry.SpaceGroup ("126:1;d4h^4;p 4/n n c:1;p 4 2 -1n"),  new org.jmol.symmetry.SpaceGroup ("126:2;d4h^4;p 4/n n c:2;-p 4a 2bc"),  new org.jmol.symmetry.SpaceGroup ("127;d4h^5;p 4/m b m;-p 4 2ab"),  new org.jmol.symmetry.SpaceGroup ("128;d4h^6;p 4/m n c;-p 4 2n"),  new org.jmol.symmetry.SpaceGroup ("129:1;d4h^7;p 4/n m m:1;p 4ab 2ab -1ab"),  new org.jmol.symmetry.SpaceGroup ("129:2;d4h^7;p 4/n m m:2;-p 4a 2a"),  new org.jmol.symmetry.SpaceGroup ("130:1;d4h^8;p 4/n c c:1;p 4ab 2n -1ab"),  new org.jmol.symmetry.SpaceGroup ("130:2;d4h^8;p 4/n c c:2;-p 4a 2ac"),  new org.jmol.symmetry.SpaceGroup ("131;d4h^9;p 42/m m c;-p 4c 2"),  new org.jmol.symmetry.SpaceGroup ("132;d4h^10;p 42/m c m;-p 4c 2c"),  new org.jmol.symmetry.SpaceGroup ("133:1;d4h^11;p 42/n b c:1;p 4n 2c -1n"),  new org.jmol.symmetry.SpaceGroup ("133:2;d4h^11;p 42/n b c:2;-p 4ac 2b"),  new org.jmol.symmetry.SpaceGroup ("134:1;d4h^12;p 42/n n m:1;p 4n 2 -1n"),  new org.jmol.symmetry.SpaceGroup ("134:2;d4h^12;p 42/n n m:2;-p 4ac 2bc"),  new org.jmol.symmetry.SpaceGroup ("135;d4h^13;p 42/m b c;-p 4c 2ab"),  new org.jmol.symmetry.SpaceGroup ("135*;d4h^13;p 42/m b c*;-p 42 2ab"),  new org.jmol.symmetry.SpaceGroup ("136;d4h^14;p 42/m n m;-p 4n 2n"),  new org.jmol.symmetry.SpaceGroup ("137:1;d4h^15;p 42/n m c:1;p 4n 2n -1n"),  new org.jmol.symmetry.SpaceGroup ("137:2;d4h^15;p 42/n m c:2;-p 4ac 2a"),  new org.jmol.symmetry.SpaceGroup ("138:1;d4h^16;p 42/n c m:1;p 4n 2ab -1n"),  new org.jmol.symmetry.SpaceGroup ("138:2;d4h^16;p 42/n c m:2;-p 4ac 2ac"),  new org.jmol.symmetry.SpaceGroup ("139;d4h^17;i 4/m m m;-i 4 2"),  new org.jmol.symmetry.SpaceGroup ("140;d4h^18;i 4/m c m;-i 4 2c"),  new org.jmol.symmetry.SpaceGroup ("141:1;d4h^19;i 41/a m d:1;i 4bw 2bw -1bw"),  new org.jmol.symmetry.SpaceGroup ("141:2;d4h^19;i 41/a m d:2;-i 4bd 2"),  new org.jmol.symmetry.SpaceGroup ("142:1;d4h^20;i 41/a c d:1;i 4bw 2aw -1bw"),  new org.jmol.symmetry.SpaceGroup ("142:2;d4h^20;i 41/a c d:2;-i 4bd 2c"),  new org.jmol.symmetry.SpaceGroup ("143;c3^1;p 3;p 3"),  new org.jmol.symmetry.SpaceGroup ("144;c3^2;p 31;p 31"),  new org.jmol.symmetry.SpaceGroup ("145;c3^3;p 32;p 32"),  new org.jmol.symmetry.SpaceGroup ("146:h;c3^4;r 3:h;r 3"),  new org.jmol.symmetry.SpaceGroup ("146:r;c3^4;r 3:r;p 3*"),  new org.jmol.symmetry.SpaceGroup ("147;c3i^1;p -3;-p 3"),  new org.jmol.symmetry.SpaceGroup ("148:h;c3i^2;r -3:h;-r 3"),  new org.jmol.symmetry.SpaceGroup ("148:r;c3i^2;r -3:r;-p 3*"),  new org.jmol.symmetry.SpaceGroup ("149;d3^1;p 3 1 2;p 3 2"),  new org.jmol.symmetry.SpaceGroup ("150;d3^2;p 3 2 1;p 3 2\""),  new org.jmol.symmetry.SpaceGroup ("151;d3^3;p 31 1 2;p 31 2 (0 0 4)"),  new org.jmol.symmetry.SpaceGroup ("152;d3^4;p 31 2 1;p 31 2\""),  new org.jmol.symmetry.SpaceGroup ("153;d3^5;p 32 1 2;p 32 2 (0 0 2)"),  new org.jmol.symmetry.SpaceGroup ("154;d3^6;p 32 2 1;p 32 2\""),  new org.jmol.symmetry.SpaceGroup ("155:h;d3^7;r 3 2:h;r 3 2\""),  new org.jmol.symmetry.SpaceGroup ("155:r;d3^7;r 3 2:r;p 3* 2"),  new org.jmol.symmetry.SpaceGroup ("156;c3v^1;p 3 m 1;p 3 -2\""),  new org.jmol.symmetry.SpaceGroup ("157;c3v^2;p 3 1 m;p 3 -2"),  new org.jmol.symmetry.SpaceGroup ("158;c3v^3;p 3 c 1;p 3 -2\"c"),  new org.jmol.symmetry.SpaceGroup ("159;c3v^4;p 3 1 c;p 3 -2c"),  new org.jmol.symmetry.SpaceGroup ("160:h;c3v^5;r 3 m:h;r 3 -2\""),  new org.jmol.symmetry.SpaceGroup ("160:r;c3v^5;r 3 m:r;p 3* -2"),  new org.jmol.symmetry.SpaceGroup ("161:h;c3v^6;r 3 c:h;r 3 -2\"c"),  new org.jmol.symmetry.SpaceGroup ("161:r;c3v^6;r 3 c:r;p 3* -2n"),  new org.jmol.symmetry.SpaceGroup ("162;d3d^1;p -3 1 m;-p 3 2"),  new org.jmol.symmetry.SpaceGroup ("163;d3d^2;p -3 1 c;-p 3 2c"),  new org.jmol.symmetry.SpaceGroup ("164;d3d^3;p -3 m 1;-p 3 2\""),  new org.jmol.symmetry.SpaceGroup ("165;d3d^4;p -3 c 1;-p 3 2\"c"),  new org.jmol.symmetry.SpaceGroup ("166:h;d3d^5;r -3 m:h;-r 3 2\""),  new org.jmol.symmetry.SpaceGroup ("166:r;d3d^5;r -3 m:r;-p 3* 2"),  new org.jmol.symmetry.SpaceGroup ("167:h;d3d^6;r -3 c:h;-r 3 2\"c"),  new org.jmol.symmetry.SpaceGroup ("167:r;d3d^6;r -3 c:r;-p 3* 2n"),  new org.jmol.symmetry.SpaceGroup ("168;c6^1;p 6;p 6"),  new org.jmol.symmetry.SpaceGroup ("169;c6^2;p 61;p 61"),  new org.jmol.symmetry.SpaceGroup ("170;c6^3;p 65;p 65"),  new org.jmol.symmetry.SpaceGroup ("171;c6^4;p 62;p 62"),  new org.jmol.symmetry.SpaceGroup ("172;c6^5;p 64;p 64"),  new org.jmol.symmetry.SpaceGroup ("173;c6^6;p 63;p 6c"),  new org.jmol.symmetry.SpaceGroup ("173*;c6^6;p 63*;p 63 "),  new org.jmol.symmetry.SpaceGroup ("174;c3h^1;p -6;p -6"),  new org.jmol.symmetry.SpaceGroup ("175;c6h^1;p 6/m;-p 6"),  new org.jmol.symmetry.SpaceGroup ("176;c6h^2;p 63/m;-p 6c"),  new org.jmol.symmetry.SpaceGroup ("176*;c6h^2;p 63/m*;-p 63"),  new org.jmol.symmetry.SpaceGroup ("177;d6^1;p 6 2 2;p 6 2"),  new org.jmol.symmetry.SpaceGroup ("178;d6^2;p 61 2 2;p 61 2 (0 0 5)"),  new org.jmol.symmetry.SpaceGroup ("179;d6^3;p 65 2 2;p 65 2 (0 0 1)"),  new org.jmol.symmetry.SpaceGroup ("180;d6^4;p 62 2 2;p 62 2 (0 0 4)"),  new org.jmol.symmetry.SpaceGroup ("181;d6^5;p 64 2 2;p 64 2 (0 0 2)"),  new org.jmol.symmetry.SpaceGroup ("182;d6^6;p 63 2 2;p 6c 2c"),  new org.jmol.symmetry.SpaceGroup ("182*;d6^6;p 63 2 2*;p 63 2c"),  new org.jmol.symmetry.SpaceGroup ("183;c6v^1;p 6 m m;p 6 -2"),  new org.jmol.symmetry.SpaceGroup ("184;c6v^2;p 6 c c;p 6 -2c"),  new org.jmol.symmetry.SpaceGroup ("185;c6v^3;p 63 c m;p 6c -2"),  new org.jmol.symmetry.SpaceGroup ("185*;c6v^3;p 63 c m*;p 63 -2"),  new org.jmol.symmetry.SpaceGroup ("186;c6v^4;p 63 m c;p 6c -2c"),  new org.jmol.symmetry.SpaceGroup ("186*;c6v^4;p 63 m c*;p 63 -2c"),  new org.jmol.symmetry.SpaceGroup ("187;d3h^1;p -6 m 2;p -6 2"),  new org.jmol.symmetry.SpaceGroup ("188;d3h^2;p -6 c 2;p -6c 2"),  new org.jmol.symmetry.SpaceGroup ("189;d3h^3;p -6 2 m;p -6 -2"),  new org.jmol.symmetry.SpaceGroup ("190;d3h^4;p -6 2 c;p -6c -2c"),  new org.jmol.symmetry.SpaceGroup ("191;d6h^1;p 6/m m m;-p 6 2"),  new org.jmol.symmetry.SpaceGroup ("192;d6h^2;p 6/m c c;-p 6 2c"),  new org.jmol.symmetry.SpaceGroup ("193;d6h^3;p 63/m c m;-p 6c 2"),  new org.jmol.symmetry.SpaceGroup ("193*;d6h^3;p 63/m c m*;-p 63 2"),  new org.jmol.symmetry.SpaceGroup ("194;d6h^4;p 63/m m c;-p 6c 2c"),  new org.jmol.symmetry.SpaceGroup ("194*;d6h^4;p 63/m m c*;-p 63 2c"),  new org.jmol.symmetry.SpaceGroup ("195;t^1;p 2 3;p 2 2 3"),  new org.jmol.symmetry.SpaceGroup ("196;t^2;f 2 3;f 2 2 3"),  new org.jmol.symmetry.SpaceGroup ("197;t^3;i 2 3;i 2 2 3"),  new org.jmol.symmetry.SpaceGroup ("198;t^4;p 21 3;p 2ac 2ab 3"),  new org.jmol.symmetry.SpaceGroup ("199;t^5;i 21 3;i 2b 2c 3"),  new org.jmol.symmetry.SpaceGroup ("200;th^1;p m -3;-p 2 2 3"),  new org.jmol.symmetry.SpaceGroup ("201:1;th^2;p n -3:1;p 2 2 3 -1n"),  new org.jmol.symmetry.SpaceGroup ("201:2;th^2;p n -3:2;-p 2ab 2bc 3"),  new org.jmol.symmetry.SpaceGroup ("202;th^3;f m -3;-f 2 2 3"),  new org.jmol.symmetry.SpaceGroup ("203:1;th^4;f d -3:1;f 2 2 3 -1d"),  new org.jmol.symmetry.SpaceGroup ("203:2;th^4;f d -3:2;-f 2uv 2vw 3"),  new org.jmol.symmetry.SpaceGroup ("204;th^5;i m -3;-i 2 2 3"),  new org.jmol.symmetry.SpaceGroup ("205;th^6;p a -3;-p 2ac 2ab 3"),  new org.jmol.symmetry.SpaceGroup ("206;th^7;i a -3;-i 2b 2c 3"),  new org.jmol.symmetry.SpaceGroup ("207;o^1;p 4 3 2;p 4 2 3"),  new org.jmol.symmetry.SpaceGroup ("208;o^2;p 42 3 2;p 4n 2 3"),  new org.jmol.symmetry.SpaceGroup ("209;o^3;f 4 3 2;f 4 2 3"),  new org.jmol.symmetry.SpaceGroup ("210;o^4;f 41 3 2;f 4d 2 3"),  new org.jmol.symmetry.SpaceGroup ("211;o^5;i 4 3 2;i 4 2 3"),  new org.jmol.symmetry.SpaceGroup ("212;o^6;p 43 3 2;p 4acd 2ab 3"),  new org.jmol.symmetry.SpaceGroup ("213;o^7;p 41 3 2;p 4bd 2ab 3"),  new org.jmol.symmetry.SpaceGroup ("214;o^8;i 41 3 2;i 4bd 2c 3"),  new org.jmol.symmetry.SpaceGroup ("215;td^1;p -4 3 m;p -4 2 3"),  new org.jmol.symmetry.SpaceGroup ("216;td^2;f -4 3 m;f -4 2 3"),  new org.jmol.symmetry.SpaceGroup ("217;td^3;i -4 3 m;i -4 2 3"),  new org.jmol.symmetry.SpaceGroup ("218;td^4;p -4 3 n;p -4n 2 3"),  new org.jmol.symmetry.SpaceGroup ("219;td^5;f -4 3 c;f -4a 2 3"),  new org.jmol.symmetry.SpaceGroup ("220;td^6;i -4 3 d;i -4bd 2c 3"),  new org.jmol.symmetry.SpaceGroup ("221;oh^1;p m -3 m;-p 4 2 3"),  new org.jmol.symmetry.SpaceGroup ("222:1;oh^2;p n -3 n:1;p 4 2 3 -1n"),  new org.jmol.symmetry.SpaceGroup ("222:2;oh^2;p n -3 n:2;-p 4a 2bc 3"),  new org.jmol.symmetry.SpaceGroup ("223;oh^3;p m -3 n;-p 4n 2 3"),  new org.jmol.symmetry.SpaceGroup ("224:1;oh^4;p n -3 m:1;p 4n 2 3 -1n"),  new org.jmol.symmetry.SpaceGroup ("224:2;oh^4;p n -3 m:2;-p 4bc 2bc 3"),  new org.jmol.symmetry.SpaceGroup ("225;oh^5;f m -3 m;-f 4 2 3"),  new org.jmol.symmetry.SpaceGroup ("226;oh^6;f m -3 c;-f 4a 2 3"),  new org.jmol.symmetry.SpaceGroup ("227:1;oh^7;f d -3 m:1;f 4d 2 3 -1d"),  new org.jmol.symmetry.SpaceGroup ("227:2;oh^7;f d -3 m:2;-f 4vw 2vw 3"),  new org.jmol.symmetry.SpaceGroup ("228:1;oh^8;f d -3 c:1;f 4d 2 3 -1ad"),  new org.jmol.symmetry.SpaceGroup ("228:2;oh^8;f d -3 c:2;-f 4ud 2vw 3"),  new org.jmol.symmetry.SpaceGroup ("229;oh^9;i m -3 m;-i 4 2 3"),  new org.jmol.symmetry.SpaceGroup ("230;oh^10;i a -3 d;-i 4bd 2c 3")];
});
// 
//// org\jmol\symmetry\HallInfo.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.Matrix4f"], "org.jmol.symmetry.HallInfo", ["org.jmol.symmetry.HallRotation", "$.HallTranslation", "$.SymmetryOperation", "org.jmol.util.Logger", "$.Point3i", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hallSymbol = null;
this.primitiveHallSymbol = null;
this.latticeCode = '\0';
this.latticeExtension = null;
this.isCentrosymmetric = false;
this.nRotations = 0;
this.rotationTerms = null;
this.vector12ths = null;
this.vectorCode = null;
if (!Clazz.isClassDefined ("org.jmol.symmetry.HallInfo.RotationTerm")) {
org.jmol.symmetry.HallInfo.$HallInfo$RotationTerm$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "HallInfo");
Clazz.prepareFields (c$, function () {
this.rotationTerms =  new Array (16);
});
Clazz.makeConstructor (c$, 
function (hallSymbol) {
try {
var str = this.hallSymbol = hallSymbol.trim ();
str = this.extractLatticeInfo (str);
if (org.jmol.symmetry.HallTranslation.getLatticeIndex (this.latticeCode) == 0) return;
this.latticeExtension = org.jmol.symmetry.HallTranslation.getLatticeExtension (this.latticeCode, this.isCentrosymmetric);
str = this.extractVectorInfo (str) + this.latticeExtension;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("Hallinfo: " + hallSymbol + " " + str);
var prevOrder = 0;
var prevAxisType = '\u0000';
this.primitiveHallSymbol = "P";
while (str.length > 0 && this.nRotations < 16) {
str = this.extractRotationInfo (str, prevOrder, prevAxisType);
var r = this.rotationTerms[this.nRotations - 1];
prevOrder = r.order;
prevAxisType = r.axisType;
this.primitiveHallSymbol += " " + r.primitiveCode;
}
this.primitiveHallSymbol += this.vectorCode;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("Invalid Hall symbol");
this.nRotations = 0;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "dumpInfo", 
function () {
var sb =  new org.jmol.util.StringXBuilder ();
sb.append ("\nHall symbol: ").append (this.hallSymbol).append ("\nprimitive Hall symbol: ").append (this.primitiveHallSymbol).append ("\nlattice type: ").append (this.getLatticeDesignation ());
for (var i = 0; i < this.nRotations; i++) {
sb.append ("\n\nrotation term ").appendI (i + 1).append (this.rotationTerms[i].dumpInfo ());
}
return sb.toString ();
});
Clazz.defineMethod (c$, "getLatticeDesignation", 
($fz = function () {
return org.jmol.symmetry.HallTranslation.getLatticeDesignation (this.latticeCode, this.isCentrosymmetric);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "extractLatticeInfo", 
($fz = function (name) {
var i = name.indexOf (" ");
if (i < 0) return "";
var term = name.substring (0, i).toUpperCase ();
this.latticeCode = term.charAt (0);
if (this.latticeCode == '-') {
this.isCentrosymmetric = true;
this.latticeCode = term.charAt (1);
}return name.substring (i + 1).trim ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "extractVectorInfo", 
($fz = function (name) {
this.vector12ths =  new org.jmol.util.Point3i ();
this.vectorCode = "";
var i = name.indexOf ("(");
var j = name.indexOf (")", i);
if (i > 0 && j > i) {
var term = name.substring (i + 1, j);
this.vectorCode = " (" + term + ")";
name = name.substring (0, i).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.x = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.y = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
}}this.vector12ths.z = Integer.parseInt (term);
}return name;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "extractRotationInfo", 
($fz = function (name, prevOrder, prevAxisType) {
var i = name.indexOf (" ");
var code;
if (i >= 0) {
code = name.substring (0, i);
name = name.substring (i + 1).trim ();
} else {
code = name;
name = "";
}this.rotationTerms[this.nRotations] = Clazz.innerTypeInstance (org.jmol.symmetry.HallInfo.RotationTerm, this, null, code, prevOrder, prevAxisType);
this.nRotations++;
return name;
}, $fz.isPrivate = true, $fz), "~S,~N,~S");
c$.$HallInfo$RotationTerm$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.inputCode = null;
this.primitiveCode = null;
this.lookupCode = null;
this.translationString = null;
this.rotation = null;
this.translation = null;
this.seitzMatrix12ths = null;
this.isImproper = false;
this.order = 0;
this.axisType = '\0';
this.diagonalReferenceAxis = '\0';
this.allPositive = true;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry.HallInfo, "RotationTerm");
Clazz.prepareFields (c$, function () {
this.seitzMatrix12ths =  new org.jmol.util.Matrix4f ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.getRotationInfo (a, b, c);
}, "~S,~N,~S");
Clazz.defineMethod (c$, "dumpInfo", 
function () {
var a =  new org.jmol.util.StringXBuilder ();
a.append ("\ninput code: ").append (this.inputCode).append ("; primitive code: ").append (this.primitiveCode).append ("\norder: ").appendI (this.order).append (this.isImproper ? " (improper axis)" : "");
if (this.axisType != '_') {
a.append ("; axisType: ").appendC (this.axisType);
if (this.diagonalReferenceAxis != '\0') a.appendC (this.diagonalReferenceAxis);
}if (this.translationString.length > 0) a.append ("; translation: ").append (this.translationString);
if (this.b$["org.jmol.symmetry.HallInfo"].vectorCode.length > 0) a.append ("; vector offset:").append (this.b$["org.jmol.symmetry.HallInfo"].vectorCode);
if (this.rotation != null) a.append ("\noperator: ").append (this.getXYZ (this.allPositive)).append ("\nSeitz matrix:\n").append (org.jmol.symmetry.SymmetryOperation.dumpSeitz (this.seitzMatrix12ths));
return a.toString ();
});
Clazz.defineMethod (c$, "getXYZ", 
function (a) {
return org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (this.seitzMatrix12ths, true, a, true);
}, "~B");
Clazz.defineMethod (c$, "getRotationInfo", 
($fz = function (a, b, c) {
this.inputCode = a;
a += "   ";
if (a.charAt (0) == '-') {
this.isImproper = true;
a = a.substring (1);
}this.primitiveCode = "";
this.order = a.charCodeAt (0) - 48;
this.diagonalReferenceAxis = '\0';
this.axisType = '\0';
var d = 2;
var e;
switch (e = a.charAt (1)) {
case 'x':
case 'y':
case 'z':
switch (a.charAt (2)) {
case '\'':
case '"':
this.diagonalReferenceAxis = e;
e = a.charAt (2);
d++;
}
case '*':
this.axisType = e;
break;
case '\'':
case '"':
this.axisType = e;
switch (a.charAt (2)) {
case 'x':
case 'y':
case 'z':
this.diagonalReferenceAxis = a.charAt (2);
d++;
break;
default:
this.diagonalReferenceAxis = c;
}
break;
default:
this.axisType = (this.order == 1 ? '_' : this.b$["org.jmol.symmetry.HallInfo"].nRotations == 0 ? 'z' : this.b$["org.jmol.symmetry.HallInfo"].nRotations == 2 ? '*' : b == 2 || b == 4 ? 'x' : '\'');
a = a.substring (0, 1) + this.axisType + a.substring (1);
}
this.primitiveCode += (this.axisType == '_' ? "1" : a.substring (0, 2));
if (this.diagonalReferenceAxis != '\0') {
a = a.substring (0, 1) + this.diagonalReferenceAxis + this.axisType + a.substring (d);
this.primitiveCode += this.diagonalReferenceAxis;
d = 3;
}this.lookupCode = a.substring (0, d);
this.rotation = org.jmol.symmetry.HallRotation.lookup (this.lookupCode);
if (this.rotation == null) {
org.jmol.util.Logger.error ("Rotation lookup could not find " + this.inputCode + " ? " + this.lookupCode);
return;
}this.translation =  new org.jmol.symmetry.HallTranslation ();
this.translationString = "";
var f = a.length;
for (var g = d; g < f; g++) {
var h = a.charAt (g);
var i =  new org.jmol.symmetry.HallTranslation (h, this.order);
if (i.translationCode != '\0') {
this.translationString += "" + i.translationCode;
this.translation.rotationShift12ths += i.rotationShift12ths;
this.translation.vectorShift12ths.add (i.vectorShift12ths);
}}
this.primitiveCode = (this.isImproper ? "-" : "") + this.primitiveCode + this.translationString;
if (this.isImproper) {
this.seitzMatrix12ths.setM (this.rotation.seitzMatrixInv);
} else {
this.seitzMatrix12ths.setM (this.rotation.seitzMatrix);
}this.seitzMatrix12ths.m03 = this.translation.vectorShift12ths.x;
this.seitzMatrix12ths.m13 = this.translation.vectorShift12ths.y;
this.seitzMatrix12ths.m23 = this.translation.vectorShift12ths.z;
switch (this.axisType) {
case 'x':
this.seitzMatrix12ths.m03 += this.translation.rotationShift12ths;
break;
case 'y':
this.seitzMatrix12ths.m13 += this.translation.rotationShift12ths;
break;
case 'z':
this.seitzMatrix12ths.m23 += this.translation.rotationShift12ths;
break;
}
if (this.b$["org.jmol.symmetry.HallInfo"].vectorCode.length > 0) {
var h =  new org.jmol.util.Matrix4f ();
var i =  new org.jmol.util.Matrix4f ();
h.setIdentity ();
i.setIdentity ();
h.m03 = this.b$["org.jmol.symmetry.HallInfo"].vector12ths.x;
h.m13 = this.b$["org.jmol.symmetry.HallInfo"].vector12ths.y;
h.m23 = this.b$["org.jmol.symmetry.HallInfo"].vector12ths.z;
i.m03 = -this.b$["org.jmol.symmetry.HallInfo"].vector12ths.x;
i.m13 = -this.b$["org.jmol.symmetry.HallInfo"].vector12ths.y;
i.m23 = -this.b$["org.jmol.symmetry.HallInfo"].vector12ths.z;
this.seitzMatrix12ths.mul2 (h, this.seitzMatrix12ths);
this.seitzMatrix12ths.mul (i);
}if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("code = " + a + "; primitive code =" + this.primitiveCode + "\n Seitz Matrix(12ths):" + this.seitzMatrix12ths);
}}, $fz.isPrivate = true, $fz), "~S,~N,~S");
c$ = Clazz.p0p ();
};
});
// 
//// org\jmol\symmetry\HallRotation.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.Matrix4f"], "org.jmol.symmetry.HallRotation", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.rotCode = null;
this.seitzMatrix = null;
this.seitzMatrixInv = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "HallRotation");
Clazz.prepareFields (c$, function () {
this.seitzMatrix =  new org.jmol.util.Matrix4f ();
this.seitzMatrixInv =  new org.jmol.util.Matrix4f ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
($fz = function (code, matrixData) {
this.rotCode = code;
var data =  Clazz.newFloatArray (16, 0);
var dataInv =  Clazz.newFloatArray (16, 0);
data[15] = dataInv[15] = 1;
for (var i = 0, ipt = 0; ipt < 11; i++) {
var value = 0;
switch (matrixData.charAt (i)) {
case ' ':
ipt++;
continue;
case '+':
case '1':
value = 1;
break;
case '-':
value = -1;
break;
}
data[ipt] = value;
dataInv[ipt] = -value;
ipt++;
}
this.seitzMatrix.setA (data);
this.seitzMatrixInv.setA (dataInv);
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.lookup = Clazz.defineMethod (c$, "lookup", 
function (code) {
for (var i = org.jmol.symmetry.HallRotation.hallRotationTerms.length; --i >= 0; ) if (org.jmol.symmetry.HallRotation.hallRotationTerms[i].rotCode.equals (code)) return org.jmol.symmetry.HallRotation.hallRotationTerms[i];

return null;
}, "~S");
c$.hallRotationTerms = c$.prototype.hallRotationTerms = [ new org.jmol.symmetry.HallRotation ("1_", "+00 0+0 00+"),  new org.jmol.symmetry.HallRotation ("2x", "+00 0-0 00-"),  new org.jmol.symmetry.HallRotation ("2y", "-00 0+0 00-"),  new org.jmol.symmetry.HallRotation ("2z", "-00 0-0 00+"),  new org.jmol.symmetry.HallRotation ("2\'", "0-0 -00 00-"),  new org.jmol.symmetry.HallRotation ("2\"", "0+0 +00 00-"),  new org.jmol.symmetry.HallRotation ("2x\'", "-00 00- 0-0"),  new org.jmol.symmetry.HallRotation ("2x\"", "-00 00+ 0+0"),  new org.jmol.symmetry.HallRotation ("2y\'", "00- 0-0 -00"),  new org.jmol.symmetry.HallRotation ("2y\"", "00+ 0-0 +00"),  new org.jmol.symmetry.HallRotation ("2z\'", "0-0 -00 00-"),  new org.jmol.symmetry.HallRotation ("2z\"", "0+0 +00 00-"),  new org.jmol.symmetry.HallRotation ("3x", "+00 00- 0+-"),  new org.jmol.symmetry.HallRotation ("3y", "-0+ 0+0 -00"),  new org.jmol.symmetry.HallRotation ("3z", "0-0 +-0 00+"),  new org.jmol.symmetry.HallRotation ("3*", "00+ +00 0+0"),  new org.jmol.symmetry.HallRotation ("4x", "+00 00- 0+0"),  new org.jmol.symmetry.HallRotation ("4y", "00+ 0+0 -00"),  new org.jmol.symmetry.HallRotation ("4z", "0-0 +00 00+"),  new org.jmol.symmetry.HallRotation ("6x", "+00 0+- 0+0"),  new org.jmol.symmetry.HallRotation ("6y", "00+ 0+0 -0+"),  new org.jmol.symmetry.HallRotation ("6z", "+-0 +00 00+")];
});
// 
//// org\jmol\symmetry\HallTranslation.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.Point3i"], "org.jmol.symmetry.HallTranslation", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.translationCode = '\0';
this.rotationOrder = 0;
this.rotationShift12ths = 0;
this.vectorShift12ths = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "HallTranslation");
Clazz.prepareFields (c$, function () {
this.vectorShift12ths =  new org.jmol.util.Point3i ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (translationCode, order) {
for (var i = 0; i < org.jmol.symmetry.HallTranslation.hallTranslationTerms.length; i++) {
var h = org.jmol.symmetry.HallTranslation.hallTranslationTerms[i];
if (h.translationCode == translationCode) {
if (h.rotationOrder == 0 || h.rotationOrder == order) {
this.translationCode = translationCode;
this.rotationShift12ths = h.rotationShift12ths;
this.vectorShift12ths = h.vectorShift12ths;
return;
}}}
}, "~S,~N");
Clazz.makeConstructor (c$, 
($fz = function (translationCode, vectorShift12ths) {
this.translationCode = translationCode;
this.rotationOrder = 0;
this.rotationShift12ths = 0;
this.vectorShift12ths = vectorShift12ths;
}, $fz.isPrivate = true, $fz), "~S,org.jmol.util.Point3i");
Clazz.makeConstructor (c$, 
($fz = function (translationCode, order, rotationShift12ths) {
this.translationCode = translationCode;
this.rotationOrder = order;
this.rotationShift12ths = rotationShift12ths;
this.vectorShift12ths =  new org.jmol.util.Point3i ();
}, $fz.isPrivate = true, $fz), "~S,~N,~N");
c$.getHallLatticeEquivalent = Clazz.defineMethod (c$, "getHallLatticeEquivalent", 
function (latticeParameter) {
var latticeCode = org.jmol.symmetry.HallTranslation.getLatticeCode (latticeParameter);
var isCentrosymmetric = (latticeParameter > 0);
return (isCentrosymmetric ? "-" : "") + latticeCode + " 1";
}, "~N");
c$.getLatticeIndex = Clazz.defineMethod (c$, "getLatticeIndex", 
function (latt) {
for (var i = 1, ipt = 3; i <= org.jmol.symmetry.HallTranslation.nLatticeTypes; i++, ipt += 3) if (org.jmol.symmetry.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return i;

return 0;
}, "~S");
c$.getLatticeCode = Clazz.defineMethod (c$, "getLatticeCode", 
function (latt) {
if (latt < 0) latt = -latt;
return (latt == 0 ? '\0' : latt > org.jmol.symmetry.HallTranslation.nLatticeTypes ? org.jmol.symmetry.HallTranslation.getLatticeCode (org.jmol.symmetry.HallTranslation.getLatticeIndex (String.fromCharCode (latt))) : org.jmol.symmetry.HallTranslation.latticeTranslationData[latt * 3].charAt (0));
}, "~N");
c$.getLatticeDesignation = Clazz.defineMethod (c$, "getLatticeDesignation", 
function (latt) {
var isCentrosymmetric = (latt > 0);
var str = (isCentrosymmetric ? "-" : "");
if (latt < 0) latt = -latt;
if (latt == 0 || latt > org.jmol.symmetry.HallTranslation.nLatticeTypes) return "";
return str + org.jmol.symmetry.HallTranslation.getLatticeCode (latt) + ": " + (isCentrosymmetric ? "centrosymmetric " : "") + org.jmol.symmetry.HallTranslation.latticeTranslationData[latt * 3 + 1];
}, "~N");
c$.getLatticeDesignation = Clazz.defineMethod (c$, "getLatticeDesignation", 
function (latticeCode, isCentrosymmetric) {
var latt = org.jmol.symmetry.HallTranslation.getLatticeIndex (latticeCode);
if (!isCentrosymmetric) latt = -latt;
return org.jmol.symmetry.HallTranslation.getLatticeDesignation (latt);
}, "~S,~B");
c$.getLatticeExtension = Clazz.defineMethod (c$, "getLatticeExtension", 
function (latt, isCentrosymmetric) {
for (var i = 1, ipt = 3; i <= org.jmol.symmetry.HallTranslation.nLatticeTypes; i++, ipt += 3) if (org.jmol.symmetry.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return org.jmol.symmetry.HallTranslation.latticeTranslationData[ipt + 2] + (isCentrosymmetric ? " -1" : "");

return "";
}, "~S,~B");
Clazz.defineStatics (c$,
"latticeTranslationData", ["\0", "unknown", "", "P", "primitive", "", "I", "body-centered", " 1n", "R", "rhombohedral", " 1r 1r", "F", "face-centered", " 1ab 1bc 1ac", "A", "A-centered", " 1bc", "B", "B-centered", " 1ac", "C", "C-centered", " 1ab", "S", "rhombohedral(S)", " 1s 1s", "T", "rhombohedral(T)", " 1t 1t"]);
c$.nLatticeTypes = c$.prototype.nLatticeTypes = Clazz.doubleToInt (org.jmol.symmetry.HallTranslation.latticeTranslationData.length / 3) - 1;
c$.hallTranslationTerms = c$.prototype.hallTranslationTerms = [ new org.jmol.symmetry.HallTranslation ('a', org.jmol.util.Point3i.new3 (6, 0, 0)),  new org.jmol.symmetry.HallTranslation ('b', org.jmol.util.Point3i.new3 (0, 6, 0)),  new org.jmol.symmetry.HallTranslation ('c', org.jmol.util.Point3i.new3 (0, 0, 6)),  new org.jmol.symmetry.HallTranslation ('n', org.jmol.util.Point3i.new3 (6, 6, 6)),  new org.jmol.symmetry.HallTranslation ('u', org.jmol.util.Point3i.new3 (3, 0, 0)),  new org.jmol.symmetry.HallTranslation ('v', org.jmol.util.Point3i.new3 (0, 3, 0)),  new org.jmol.symmetry.HallTranslation ('w', org.jmol.util.Point3i.new3 (0, 0, 3)),  new org.jmol.symmetry.HallTranslation ('d', org.jmol.util.Point3i.new3 (3, 3, 3)),  new org.jmol.symmetry.HallTranslation ('1', 2, 6),  new org.jmol.symmetry.HallTranslation ('1', 3, 4),  new org.jmol.symmetry.HallTranslation ('2', 3, 8),  new org.jmol.symmetry.HallTranslation ('1', 4, 3),  new org.jmol.symmetry.HallTranslation ('3', 4, 9),  new org.jmol.symmetry.HallTranslation ('1', 6, 2),  new org.jmol.symmetry.HallTranslation ('2', 6, 4),  new org.jmol.symmetry.HallTranslation ('4', 6, 8),  new org.jmol.symmetry.HallTranslation ('5', 6, 10),  new org.jmol.symmetry.HallTranslation ('r', org.jmol.util.Point3i.new3 (4, 8, 8)),  new org.jmol.symmetry.HallTranslation ('s', org.jmol.util.Point3i.new3 (8, 8, 4)),  new org.jmol.symmetry.HallTranslation ('t', org.jmol.util.Point3i.new3 (8, 4, 8))];
});
// 
//// org\jmol\symmetry\SymmetryOperation.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.Matrix4f", "$.Point3f"], "org.jmol.symmetry.SymmetryOperation", ["java.lang.Float", "java.util.ArrayList", "org.jmol.util.Escape", "$.Logger", "$.Measure", "$.Parser", "$.Point4f", "$.Quaternion", "$.StringXBuilder", "$.TextFormat", "$.TriangleData", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xyzOriginal = null;
this.xyz = null;
this.doNormalize = true;
this.isFinalized = false;
this.opId = 0;
this.temp3 = null;
this.atomTest = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "SymmetryOperation", org.jmol.util.Matrix4f);
Clazz.prepareFields (c$, function () {
this.temp3 =  new org.jmol.util.Point3f ();
this.atomTest =  new org.jmol.util.Point3f ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.symmetry.SymmetryOperation, []);
});
Clazz.makeConstructor (c$, 
function (doNormalize, opId) {
Clazz.superConstructor (this, org.jmol.symmetry.SymmetryOperation, []);
this.doNormalize = doNormalize;
this.opId = opId;
}, "~B,~N");
Clazz.makeConstructor (c$, 
function (op, atoms, atomIndex, count, doNormalize) {
Clazz.superConstructor (this, org.jmol.symmetry.SymmetryOperation, []);
this.doNormalize = doNormalize;
this.xyzOriginal = op.xyzOriginal;
this.xyz = op.xyz;
this.opId = op.opId;
this.setM (op);
this.doFinalize ();
if (doNormalize) this.setOffset (atoms, atomIndex, count);
}, "org.jmol.symmetry.SymmetryOperation,~A,~N,~N,~B");
Clazz.defineMethod (c$, "doFinalize", 
function () {
this.m03 /= 12;
this.m13 /= 12;
this.m23 /= 12;
this.isFinalized = true;
});
Clazz.defineMethod (c$, "getXyz", 
function (normalized) {
return (normalized || this.xyzOriginal == null ? this.xyz : this.xyzOriginal);
}, "~B");
Clazz.defineMethod (c$, "newPoint", 
function (atom1, atom2, transX, transY, transZ) {
this.temp3.setT (atom1);
this.transform2 (this.temp3, this.temp3);
atom2.set (this.temp3.x + transX, this.temp3.y + transY, this.temp3.z + transZ);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,~N");
Clazz.defineMethod (c$, "dumpInfo", 
function () {
return "\n" + this.xyz + "\ninternal matrix representation:\n" + (this).toString ();
});
c$.dumpSeitz = Clazz.defineMethod (c$, "dumpSeitz", 
function (s) {
return  new org.jmol.util.StringXBuilder ().append ("{\t").appendI (Clazz.floatToInt (s.m00)).append ("\t").appendI (Clazz.floatToInt (s.m01)).append ("\t").appendI (Clazz.floatToInt (s.m02)).append ("\t").append (org.jmol.symmetry.SymmetryOperation.twelfthsOf (s.m03)).append ("\t}\n").append ("{\t").appendI (Clazz.floatToInt (s.m10)).append ("\t").appendI (Clazz.floatToInt (s.m11)).append ("\t").appendI (Clazz.floatToInt (s.m12)).append ("\t").append (org.jmol.symmetry.SymmetryOperation.twelfthsOf (s.m13)).append ("\t}\n").append ("{\t").appendI (Clazz.floatToInt (s.m20)).append ("\t").appendI (Clazz.floatToInt (s.m21)).append ("\t").appendI (Clazz.floatToInt (s.m22)).append ("\t").append (org.jmol.symmetry.SymmetryOperation.twelfthsOf (s.m23)).append ("\t}\n").append ("{\t0\t0\t0\t1\t}\n").toString ();
}, "org.jmol.util.Matrix4f");
c$.dumpCanonicalSeitz = Clazz.defineMethod (c$, "dumpCanonicalSeitz", 
function (s) {
return  new org.jmol.util.StringXBuilder ().append ("{\t").appendI (Clazz.floatToInt (s.m00)).append ("\t").appendI (Clazz.floatToInt (s.m01)).append ("\t").appendI (Clazz.floatToInt (s.m02)).append ("\t").append (org.jmol.symmetry.SymmetryOperation.twelfthsOf (s.m03 + 12)).append ("\t}\n").append ("{\t").appendI (Clazz.floatToInt (s.m10)).append ("\t").appendI (Clazz.floatToInt (s.m11)).append ("\t").appendI (Clazz.floatToInt (s.m12)).append ("\t").append (org.jmol.symmetry.SymmetryOperation.twelfthsOf (s.m13 + 12)).append ("\t}\n").append ("{\t").appendI (Clazz.floatToInt (s.m20)).append ("\t").appendI (Clazz.floatToInt (s.m21)).append ("\t").appendI (Clazz.floatToInt (s.m22)).append ("\t").append (org.jmol.symmetry.SymmetryOperation.twelfthsOf (s.m23 + 12)).append ("\t}\n").append ("{\t0\t0\t0\t1\t}\n").toString ();
}, "org.jmol.util.Matrix4f");
Clazz.defineMethod (c$, "setMatrixFromXYZ", 
function (xyz) {
if (xyz == null) return false;
this.xyzOriginal = xyz;
xyz = xyz.toLowerCase ();
var temp =  Clazz.newFloatArray (16, 0);
var isReverse = (xyz.startsWith ("!"));
if (isReverse) xyz = xyz.substring (1);
if (xyz.indexOf ("xyz matrix:") == 0) {
this.xyz = xyz;
org.jmol.util.Parser.parseStringInfestedFloatArray (xyz, null, temp);
for (var i = 0; i < 16; i++) {
if (Float.isNaN (temp[i])) return false;
var v = temp[i];
if (Math.abs (v) < 0.00001) v = 0;
if (i % 4 == 3) v = org.jmol.symmetry.SymmetryOperation.normalizeTwelfths ((v < 0 ? -1 : 1) * Math.round (Math.abs (v * 12)), this.doNormalize);
temp[i] = v;
}
temp[15] = 1;
this.setA (temp);
this.isFinalized = true;
if (isReverse) this.invertM (this);
this.xyz = org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (this, true, false, false);
return true;
}if (xyz.indexOf ("[[") == 0) {
xyz = xyz.$replace ('[', ' ').$replace (']', ' ').$replace (',', ' ');
org.jmol.util.Parser.parseStringInfestedFloatArray (xyz, null, temp);
for (var i = 0; i < 16; i++) {
if (Float.isNaN (temp[i])) return false;
}
this.setA (temp);
this.isFinalized = true;
if (isReverse) this.invertM (this);
this.xyz = org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (this, false, false, false);
return true;
}var strOut = org.jmol.symmetry.SymmetryOperation.getMatrixFromString (xyz, temp, this.doNormalize, false);
if (strOut == null) return false;
this.setA (temp);
if (isReverse) {
this.invertM (this);
this.xyz = org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (this, true, false, false);
} else {
this.xyz = strOut;
}if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("" + this);
return true;
}, "~S");
c$.getMatrixFromString = Clazz.defineMethod (c$, "getMatrixFromString", 
function (xyz, temp, doNormalize, allowScaling) {
var isDenominator = false;
var isDecimal = false;
var isNegative = false;
var ch;
var x = 0;
var y = 0;
var z = 0;
var iValue = 0;
var strOut = "";
var strT;
var rowPt = -1;
var decimalMultiplier = 1;
while (xyz.indexOf ("x4") >= 0) {
org.jmol.util.Logger.info ("ignoring last parameter in " + xyz);
xyz = xyz.substring (0, xyz.lastIndexOf (","));
xyz = org.jmol.util.TextFormat.simpleReplace (xyz, "x1", "x");
xyz = org.jmol.util.TextFormat.simpleReplace (xyz, "x2", "y");
xyz = org.jmol.util.TextFormat.simpleReplace (xyz, "x3", "z");
}
xyz += ",";
for (var i = 0; i < xyz.length; i++) {
ch = xyz.charAt (i);
switch (ch) {
case '\'':
case ' ':
case '{':
case '}':
case '!':
continue;
case '-':
isNegative = true;
continue;
case '+':
isNegative = false;
continue;
case '/':
isDenominator = true;
continue;
case 'X':
case 'x':
x = (isNegative ? -1 : 1);
if (allowScaling && iValue != 0) {
x *= iValue;
iValue = 0;
}break;
case 'Y':
case 'y':
y = (isNegative ? -1 : 1);
if (allowScaling && iValue != 0) {
y *= iValue;
iValue = 0;
}break;
case 'Z':
case 'z':
z = (isNegative ? -1 : 1);
if (allowScaling && iValue != 0) {
z *= iValue;
iValue = 0;
}break;
case ',':
if (++rowPt > 2) {
org.jmol.util.Logger.warn ("Symmetry Operation? " + xyz);
return null;
}var tpt = rowPt * 4;
iValue = org.jmol.symmetry.SymmetryOperation.normalizeTwelfths (iValue, doNormalize);
temp[tpt++] = x;
temp[tpt++] = y;
temp[tpt++] = z;
temp[tpt] = iValue;
strT = "";
strT += (x == 0 ? "" : x < 0 ? "-x" : strT.length == 0 ? "x" : "+x");
strT += (y == 0 ? "" : y < 0 ? "-y" : strT.length == 0 ? "y" : "+y");
strT += (z == 0 ? "" : z < 0 ? "-z" : strT.length == 0 ? "z" : "+z");
strT += org.jmol.symmetry.SymmetryOperation.xyzFraction (iValue, false, true);
strOut += (strOut === "" ? "" : ",") + strT;
if (rowPt == 2) {
temp[15] = 1;
return strOut;
}x = y = z = 0;
iValue = 0;
break;
case '.':
isDecimal = true;
decimalMultiplier = 1;
continue;
case '0':
if (!isDecimal && (isDenominator || !allowScaling)) continue;
default:
var ich = ch.charCodeAt (0) - 48;
if (isDecimal && ich >= 0 && ich <= 9) {
decimalMultiplier /= 10;
if (iValue < 0) isNegative = true;
iValue += decimalMultiplier * ich * (isNegative ? -1 : 1);
continue;
}if (ich >= 0 && ich <= 9) {
if (isDenominator) {
iValue /= ich;
} else {
iValue = iValue * 10 + (isNegative ? -1 : 1) * ich;
isNegative = false;
}} else {
org.jmol.util.Logger.warn ("symmetry character?" + ch);
}}
isDecimal = isDenominator = isNegative = false;
}
return null;
}, "~S,~A,~B,~B");
c$.normalizeTwelfths = Clazz.defineMethod (c$, "normalizeTwelfths", 
($fz = function (iValue, doNormalize) {
iValue *= 12;
if (doNormalize) {
while (iValue > 6) iValue -= 12;

while (iValue <= -6) iValue += 12;

}return iValue;
}, $fz.isPrivate = true, $fz), "~N,~B");
c$.getXYZFromMatrix = Clazz.defineMethod (c$, "getXYZFromMatrix", 
function (mat, is12ths, allPositive, halfOrLess) {
var str = "";
var row =  Clazz.newFloatArray (4, 0);
for (var i = 0; i < 3; i++) {
mat.getRow (i, row);
var term = "";
if (row[0] != 0) term += (row[0] < 0 ? "-" : "+") + "x";
if (row[1] != 0) term += (row[1] < 0 ? "-" : "+") + "y";
if (row[2] != 0) term += (row[2] < 0 ? "-" : "+") + "z";
term += org.jmol.symmetry.SymmetryOperation.xyzFraction ((is12ths ? row[3] : row[3] * 12), allPositive, halfOrLess);
if (term.length > 0 && term.charAt (0) == '+') term = term.substring (1);
str += "," + term;
}
return str.substring (1);
}, "org.jmol.util.Matrix4f,~B,~B,~B");
c$.twelfthsOf = Clazz.defineMethod (c$, "twelfthsOf", 
($fz = function (n12ths) {
var str = "";
var i12ths = Math.round (n12ths);
if (i12ths == 12) return "1";
if (i12ths == -12) return "-1";
if (i12ths < 0) {
i12ths = -i12ths;
if (i12ths % 12 != 0) str = "-";
}var n = Clazz.doubleToInt (i12ths / 12);
if (n < 1) return str + org.jmol.symmetry.SymmetryOperation.twelfths[i12ths % 12];
var m = 0;
switch (i12ths % 12) {
case 0:
return str + n;
case 1:
case 5:
case 7:
case 11:
m = 12;
break;
case 2:
case 10:
m = 6;
break;
case 3:
case 9:
m = 4;
break;
case 4:
case 8:
m = 3;
break;
case 6:
m = 2;
break;
}
return str + (Clazz.doubleToInt (i12ths * m / 12)) + "/" + m;
}, $fz.isPrivate = true, $fz), "~N");
c$.xyzFraction = Clazz.defineMethod (c$, "xyzFraction", 
($fz = function (n12ths, allPositive, halfOrLess) {
n12ths = Math.round (n12ths);
if (allPositive) {
while (n12ths < 0) n12ths += 12;

} else if (halfOrLess && n12ths > 6) {
n12ths -= 12;
}var s = org.jmol.symmetry.SymmetryOperation.twelfthsOf (n12ths);
return (s.charAt (0) == '0' ? "" : n12ths > 0 ? "+" + s : s);
}, $fz.isPrivate = true, $fz), "~N,~B,~B");
Clazz.defineMethod (c$, "setOffset", 
($fz = function (atoms, atomIndex, count) {
var i1 = atomIndex;
var i2 = i1 + count;
var x = 0;
var y = 0;
var z = 0;
for (var i = i1; i < i2; i++) {
this.newPoint (atoms[i], this.atomTest, 0, 0, 0);
x += this.atomTest.x;
y += this.atomTest.y;
z += this.atomTest.z;
}
while (x < -0.001 || x >= count + 0.001) {
this.m03 += (x < 0 ? 1 : -1);
x += (x < 0 ? count : -count);
}
while (y < -0.001 || y >= count + 0.001) {
this.m13 += (y < 0 ? 1 : -1);
y += (y < 0 ? count : -count);
}
while (z < -0.001 || z >= count + 0.001) {
this.m23 += (z < 0 ? 1 : -1);
z += (z < 0 ? count : -count);
}
}, $fz.isPrivate = true, $fz), "~A,~N,~N");
Clazz.defineMethod (c$, "transformCartesian", 
($fz = function (unitcell, pt) {
unitcell.toFractional (pt, false);
this.transform (pt);
unitcell.toCartesian (pt, false);
}, $fz.isPrivate = true, $fz), "org.jmol.symmetry.UnitCell,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "rotateEllipsoid", 
function (cartCenter, vectors, unitcell, ptTemp1, ptTemp2) {
var vRot =  new Array (3);
ptTemp2.setT (cartCenter);
this.transformCartesian (unitcell, ptTemp2);
for (var i = vectors.length; --i >= 0; ) {
ptTemp1.setT (cartCenter);
ptTemp1.add (vectors[i]);
this.transformCartesian (unitcell, ptTemp1);
vRot[i] = org.jmol.util.Vector3f.newV (ptTemp1);
vRot[i].sub (ptTemp2);
}
return vRot;
}, "org.jmol.util.Point3f,~A,org.jmol.symmetry.UnitCell,org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "getDescription", 
function (uc, pt00, ptTarget, id) {
if (!this.isFinalized) this.doFinalize ();
return org.jmol.symmetry.SymmetryOperation.getDescription (this, this.xyzOriginal, uc, pt00, ptTarget, id);
}, "org.jmol.api.SymmetryInterface,org.jmol.util.Point3f,org.jmol.util.Point3f,~S");
c$.getDescription = Clazz.defineMethod (c$, "getDescription", 
($fz = function (m, xyzOriginal, uc, pt00, ptTarget, id) {
var vtemp =  new org.jmol.util.Vector3f ();
var ptemp =  new org.jmol.util.Point3f ();
var pt01 =  new org.jmol.util.Point3f ();
var pt02 =  new org.jmol.util.Point3f ();
var pt03 =  new org.jmol.util.Point3f ();
var ftrans =  new org.jmol.util.Vector3f ();
var vtrans =  new org.jmol.util.Vector3f ();
var xyz = org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (m, false, false, false);
var typeOnly = (id == null);
if (pt00 == null || Float.isNaN (pt00.x)) pt00 =  new org.jmol.util.Point3f ();
if (ptTarget != null) {
pt01.setT (pt00);
pt02.setT (ptTarget);
uc.toUnitCell (pt01, ptemp);
uc.toUnitCell (pt02, ptemp);
uc.toFractional (pt01, false);
m.transform (pt01);
uc.toCartesian (pt01, false);
uc.toUnitCell (pt01, ptemp);
if (pt01.distance (pt02) > 0.1) return null;
pt01.setT (pt00);
pt02.setT (ptTarget);
uc.toFractional (pt01, false);
uc.toFractional (pt02, false);
m.transform (pt01);
vtrans.sub2 (pt02, pt01);
pt01.set (0, 0, 0);
pt02.set (0, 0, 0);
}pt01.x = pt02.y = pt03.z = 1;
pt01.add (pt00);
pt02.add (pt00);
pt03.add (pt00);
var p0 = org.jmol.util.Point3f.newP (pt00);
var p1 = org.jmol.util.Point3f.newP (pt01);
var p2 = org.jmol.util.Point3f.newP (pt02);
var p3 = org.jmol.util.Point3f.newP (pt03);
uc.toFractional (p0, false);
uc.toFractional (p1, false);
uc.toFractional (p2, false);
uc.toFractional (p3, false);
m.transform2 (p0, p0);
m.transform2 (p1, p1);
m.transform2 (p2, p2);
m.transform2 (p3, p3);
p0.add (vtrans);
p1.add (vtrans);
p2.add (vtrans);
p3.add (vtrans);
org.jmol.symmetry.SymmetryOperation.approx (vtrans);
uc.toCartesian (p0, false);
uc.toCartesian (p1, false);
uc.toCartesian (p2, false);
uc.toCartesian (p3, false);
var v01 =  new org.jmol.util.Vector3f ();
v01.sub2 (p1, p0);
var v02 =  new org.jmol.util.Vector3f ();
v02.sub2 (p2, p0);
var v03 =  new org.jmol.util.Vector3f ();
v03.sub2 (p3, p0);
vtemp.cross (v01, v02);
var haveinversion = (vtemp.dot (v03) < 0);
if (haveinversion) {
p1.scaleAdd2 (-2, v01, p1);
p2.scaleAdd2 (-2, v02, p2);
p3.scaleAdd2 (-2, v03, p3);
}var info;
info = org.jmol.util.Measure.computeHelicalAxis (null, 135266306, pt00, p0, org.jmol.util.Quaternion.getQuaternionFrame (p0, p1, p2).div (org.jmol.util.Quaternion.getQuaternionFrame (pt00, pt01, pt02)));
var pa1 = info[0];
var ax1 = info[1];
var ang1 = Clazz.floatToInt (Math.abs (org.jmol.util.Parser.approx ((info[3]).x, 1)));
var pitch1 = org.jmol.symmetry.SymmetryOperation.approx ((info[3]).y);
if (haveinversion) {
p1.scaleAdd2 (2, v01, p1);
p2.scaleAdd2 (2, v02, p2);
p3.scaleAdd2 (2, v03, p3);
}var trans = org.jmol.util.Vector3f.newV (p0);
trans.sub (pt00);
if (trans.length () < 0.1) trans = null;
var ptinv = null;
var ipt = null;
var pt0 = null;
var istranslation = (ang1 == 0);
var isrotation = !istranslation;
var isinversion = false;
var ismirrorplane = false;
if (isrotation || haveinversion) trans = null;
if (haveinversion && istranslation) {
ipt = org.jmol.util.Point3f.newP (pt00);
ipt.add (p0);
ipt.scale (0.5);
ptinv = p0;
isinversion = true;
} else if (haveinversion) {
var d = (pitch1 == 0 ?  new org.jmol.util.Vector3f () : ax1);
var f = 0;
switch (ang1) {
case 60:
f = 0.6666667;
break;
case 120:
f = 2;
break;
case 90:
f = 1;
break;
case 180:
pt0 =  new org.jmol.util.Point3f ();
pt0.setT (pt00);
pt0.add (d);
pa1.scaleAdd2 (0.5, d, pt00);
if (pt0.distance (p0) > 0.1) {
trans = org.jmol.util.Vector3f.newV (p0);
trans.sub (pt0);
ptemp.setT (trans);
uc.toFractional (ptemp, false);
ftrans.setT (ptemp);
} else {
trans = null;
}isrotation = false;
haveinversion = false;
ismirrorplane = true;
}
if (f != 0) {
vtemp.setT (pt00);
vtemp.sub (pa1);
vtemp.add (p0);
vtemp.sub (pa1);
vtemp.sub (d);
vtemp.scale (f);
pa1.add (vtemp);
ipt =  new org.jmol.util.Point3f ();
ipt.scaleAdd2 (0.5, d, pa1);
ptinv =  new org.jmol.util.Point3f ();
ptinv.scaleAdd2 (-2, ipt, pt00);
ptinv.scale (-1);
}} else if (trans != null) {
ptemp.setT (trans);
uc.toFractional (ptemp, false);
if (org.jmol.symmetry.SymmetryOperation.approx (ptemp.x) == 1) {
ptemp.x = 0;
}if (org.jmol.symmetry.SymmetryOperation.approx (ptemp.y) == 1) {
ptemp.y = 0;
}if (org.jmol.symmetry.SymmetryOperation.approx (ptemp.z) == 1) {
ptemp.z = 0;
}ftrans.setT (ptemp);
uc.toCartesian (ptemp, false);
trans.setT (ptemp);
}var ang = ang1;
org.jmol.symmetry.SymmetryOperation.approx0 (ax1);
if (isrotation) {
var pt1 =  new org.jmol.util.Point3f ();
vtemp.setT (ax1);
var ang2 = ang1;
if (haveinversion) {
pt1.setT (pa1);
pt1.add (vtemp);
ang2 = Math.round (org.jmol.util.Measure.computeTorsion (ptinv, pa1, pt1, p0, true));
} else if (pitch1 == 0) {
pt1.setT (pa1);
ptemp.scaleAdd2 (1, pt1, vtemp);
ang2 = Math.round (org.jmol.util.Measure.computeTorsion (pt00, pa1, ptemp, p0, true));
} else {
ptemp.setT (pa1);
ptemp.add (vtemp);
pt1.scaleAdd2 (0.5, vtemp, pa1);
ang2 = Math.round (org.jmol.util.Measure.computeTorsion (pt00, pa1, ptemp, p0, true));
}if (ang2 != 0) ang1 = ang2;
}if (isrotation && !haveinversion && pitch1 == 0) {
if (ax1.z < 0 || ax1.z == 0 && (ax1.y < 0 || ax1.y == 0 && ax1.x < 0)) {
ax1.scale (-1);
ang1 = -ang1;
}}var info1 = "identity";
var draw1 =  new org.jmol.util.StringXBuilder ();
var drawid;
if (isinversion) {
ptemp.setT (ipt);
uc.toFractional (ptemp, false);
info1 = "inversion center|" + org.jmol.symmetry.SymmetryOperation.fcoord (ptemp);
} else if (isrotation) {
if (haveinversion) {
info1 = "" + (Clazz.doubleToInt (360 / ang)) + "-bar axis";
} else if (pitch1 != 0) {
info1 = "" + (Clazz.doubleToInt (360 / ang)) + "-fold screw axis";
ptemp.setT (ax1);
uc.toFractional (ptemp, false);
info1 += "|translation: " + org.jmol.symmetry.SymmetryOperation.fcoord (ptemp);
} else {
info1 = "C" + (Clazz.doubleToInt (360 / ang)) + " axis";
}} else if (trans != null) {
var s = " " + org.jmol.symmetry.SymmetryOperation.fcoord (ftrans);
if (istranslation) {
info1 = "translation:" + s;
} else if (ismirrorplane) {
var fx = org.jmol.symmetry.SymmetryOperation.approx (ftrans.x);
var fy = org.jmol.symmetry.SymmetryOperation.approx (ftrans.y);
var fz = org.jmol.symmetry.SymmetryOperation.approx (ftrans.z);
s = " " + org.jmol.symmetry.SymmetryOperation.fcoord (ftrans);
if (fx != 0 && fy != 0 && fz != 0) info1 = "d-";
 else if (fx != 0 && fy != 0 || fy != 0 && fz != 0 || fz != 0 && fx != 0) info1 = "n-";
 else if (fx != 0) info1 = "a-";
 else if (fy != 0) info1 = "b-";
 else info1 = "c-";
info1 += "glide plane |translation:" + s;
}} else if (ismirrorplane) {
info1 = "mirror plane";
}if (haveinversion && !isinversion) {
ptemp.setT (ipt);
uc.toFractional (ptemp, false);
info1 += "|inversion center at " + org.jmol.symmetry.SymmetryOperation.fcoord (ptemp);
}var cmds = null;
if (!typeOnly) {
drawid = "\ndraw ID " + id + "_";
draw1 =  new org.jmol.util.StringXBuilder ();
draw1.append ("// " + xyzOriginal + "|" + xyz + "|" + info1 + "\n");
draw1.append (drawid).append ("* delete");
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame1X", 0.15, pt00, pt01, "red");
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame1Y", 0.15, pt00, pt02, "green");
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame1Z", 0.15, pt00, pt03, "blue");
ptemp.setT (p1);
ptemp.sub (p0);
ptemp.scaleAdd2 (0.9, ptemp, p0);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame2X", 0.2, p0, ptemp, "red");
ptemp.setT (p2);
ptemp.sub (p0);
ptemp.scaleAdd2 (0.9, ptemp, p0);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame2Y", 0.2, p0, ptemp, "green");
ptemp.setT (p3);
ptemp.sub (p0);
ptemp.scaleAdd2 (0.9, ptemp, p0);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "frame2Z", 0.2, p0, ptemp, "purple");
var color;
if (isrotation) {
var pt1 =  new org.jmol.util.Point3f ();
color = "red";
ang = ang1;
var scale = 1.0;
vtemp.setT (ax1);
if (haveinversion) {
pt1.setT (pa1);
pt1.add (vtemp);
if (pitch1 == 0) {
pt1.setT (ipt);
vtemp.scale (3);
ptemp.scaleAdd2 (-1, vtemp, pa1);
draw1.append (drawid).append ("rotVector2 diameter 0.1 ").append (org.jmol.util.Escape.escapePt (pa1)).append (org.jmol.util.Escape.escapePt (ptemp)).append (" color red");
}scale = p0.distance (pt1);
draw1.append (drawid).append ("rotLine1 ").append (org.jmol.util.Escape.escapePt (pt1)).append (org.jmol.util.Escape.escapePt (ptinv)).append (" color red");
draw1.append (drawid).append ("rotLine2 ").append (org.jmol.util.Escape.escapePt (pt1)).append (org.jmol.util.Escape.escapePt (p0)).append (" color red");
} else if (pitch1 == 0) {
var isSpecial = (pt00.distance (p0) < 0.2);
if (!isSpecial) {
draw1.append (drawid).append ("rotLine1 ").append (org.jmol.util.Escape.escapePt (pt00)).append (org.jmol.util.Escape.escapePt (pa1)).append (" color red");
draw1.append (drawid).append ("rotLine2 ").append (org.jmol.util.Escape.escapePt (p0)).append (org.jmol.util.Escape.escapePt (pa1)).append (" color red");
}vtemp.scale (3);
ptemp.scaleAdd2 (-1, vtemp, pa1);
draw1.append (drawid).append ("rotVector2 diameter 0.1 ").append (org.jmol.util.Escape.escapePt (pa1)).append (org.jmol.util.Escape.escapePt (ptemp)).append (" color red");
pt1.setT (pa1);
if (pitch1 == 0 && pt00.distance (p0) < 0.2) pt1.scaleAdd2 (0.5, pt1, vtemp);
} else {
color = "orange";
draw1.append (drawid).append ("rotLine1 ").append (org.jmol.util.Escape.escapePt (pt00)).append (org.jmol.util.Escape.escapePt (pa1)).append (" color red");
ptemp.setT (pa1);
ptemp.add (vtemp);
draw1.append (drawid).append ("rotLine2 ").append (org.jmol.util.Escape.escapePt (p0)).append (org.jmol.util.Escape.escapePt (ptemp)).append (" color red");
pt1.scaleAdd2 (0.5, vtemp, pa1);
}ptemp.setT (pt1);
ptemp.add (vtemp);
if (haveinversion && pitch1 != 0) {
draw1.append (drawid).append ("rotRotLine1").append (org.jmol.util.Escape.escapePt (pt1)).append (org.jmol.util.Escape.escapePt (ptinv)).append (" color red");
draw1.append (drawid).append ("rotRotLine2").append (org.jmol.util.Escape.escapePt (pt1)).append (org.jmol.util.Escape.escapePt (p0)).append (" color red");
}draw1.append (drawid).append ("rotRotArrow arrow width 0.10 scale " + scale + " arc ").append (org.jmol.util.Escape.escapePt (pt1)).append (org.jmol.util.Escape.escapePt (ptemp));
if (haveinversion) ptemp.setT (ptinv);
 else ptemp.setT (pt00);
if (ptemp.distance (p0) < 0.1) ptemp.set (Math.random (), Math.random (), Math.random ());
draw1.append (org.jmol.util.Escape.escapePt (ptemp));
ptemp.set (0, ang, 0);
draw1.append (org.jmol.util.Escape.escapePt (ptemp)).append (" color red");
draw1.append (drawid).append ("rotVector1 vector diameter 0.1 ").append (org.jmol.util.Escape.escapePt (pa1)).append (org.jmol.util.Escape.escapePt (vtemp)).append ("color ").append (color);
}if (ismirrorplane) {
if (pt00.distance (pt0) > 0.2) draw1.append (drawid).append ("planeVector arrow ").append (org.jmol.util.Escape.escapePt (pt00)).append (org.jmol.util.Escape.escapePt (pt0)).append (" color indigo");
if (trans != null) {
ptemp.scaleAdd2 (-1, p0, p1);
ptemp.add (pt0);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "planeFrameX", 0.15, pt0, ptemp, "translucent red");
ptemp.scaleAdd2 (-1, p0, p2);
ptemp.add (pt0);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "planeFrameY", 0.15, pt0, ptemp, "translucent green");
ptemp.scaleAdd2 (-1, p0, p3);
ptemp.add (pt0);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "planeFrameZ", 0.15, pt0, ptemp, "translucent blue");
}color = (trans == null ? "green" : "blue");
vtemp.setT (ax1);
vtemp.normalize ();
var w = -vtemp.x * pa1.x - vtemp.y * pa1.y - vtemp.z * pa1.z;
var plane = org.jmol.util.Point4f.new4 (vtemp.x, vtemp.y, vtemp.z, w);
var v =  new java.util.ArrayList ();
v.add (uc.getCanonicalCopy (1.05));
org.jmol.util.TriangleData.intersectPlane (plane, v, 3);
for (var i = v.size (); --i >= 0; ) {
var pts = v.get (i);
draw1.append (drawid).append ("planep").appendI (i).append (org.jmol.util.Escape.escapePt (pts[0])).append (org.jmol.util.Escape.escapePt (pts[1]));
if (pts.length == 3) draw1.append (org.jmol.util.Escape.escapePt (pts[2]));
draw1.append (" color translucent ").append (color);
}
if (v.size () == 0) {
ptemp.setT (pa1);
ptemp.add (ax1);
draw1.append (drawid).append ("planeCircle scale 2.0 circle ").append (org.jmol.util.Escape.escapePt (pa1)).append (org.jmol.util.Escape.escapePt (ptemp)).append (" color translucent ").append (color).append (" mesh fill");
}}if (haveinversion) {
draw1.append (drawid).append ("invPoint diameter 0.4 ").append (org.jmol.util.Escape.escapePt (ipt));
draw1.append (drawid).append ("invArrow arrow ").append (org.jmol.util.Escape.escapePt (pt00)).append (org.jmol.util.Escape.escapePt (ptinv)).append (" color indigo");
if (!isinversion) {
ptemp.setT (ptinv);
ptemp.add (pt00);
ptemp.sub (pt01);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "invFrameX", 0.15, ptinv, ptemp, "translucent red");
ptemp.setT (ptinv);
ptemp.add (pt00);
ptemp.sub (pt02);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "invFrameY", 0.15, ptinv, ptemp, "translucent green");
ptemp.setT (ptinv);
ptemp.add (pt00);
ptemp.sub (pt03);
org.jmol.symmetry.SymmetryOperation.drawLine (draw1, drawid + "invFrameZ", 0.15, ptinv, ptemp, "translucent blue");
}}if (trans != null) {
if (pt0 == null) pt0 = org.jmol.util.Point3f.newP (pt00);
draw1.append (drawid).append ("transVector vector ").append (org.jmol.util.Escape.escapePt (pt0)).append (org.jmol.util.Escape.escapePt (trans));
}draw1.append ("\nvar pt00 = " + org.jmol.util.Escape.escapePt (pt00));
draw1.append ("\nvar p0 = " + org.jmol.util.Escape.escapePt (p0));
draw1.append ("\nif (within(0.2,p0).length == 0) {");
draw1.append ("\nvar set2 = within(0.2,p0.uxyz.xyz)");
draw1.append ("\nif (set2) {");
draw1.append (drawid).append ("cellOffsetVector arrow @p0 @set2 color grey");
draw1.append (drawid).append ("offsetFrameX diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (org.jmol.util.Escape.escapePt (v01)).append ("*0.9} color red");
draw1.append (drawid).append ("offsetFrameY diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (org.jmol.util.Escape.escapePt (v02)).append ("*0.9} color green");
draw1.append (drawid).append ("offsetFrameZ diameter 0.20 @{set2.xyz} @{set2.xyz + ").append (org.jmol.util.Escape.escapePt (v03)).append ("*0.9} color purple");
draw1.append ("\n}}\n");
cmds = draw1.toString ();
draw1 = null;
drawid = null;
}if (trans == null) ftrans = null;
if (isrotation) {
if (haveinversion) {
} else if (pitch1 == 0) {
} else {
trans = org.jmol.util.Vector3f.newV (ax1);
ptemp.setT (trans);
uc.toFractional (ptemp, false);
ftrans = org.jmol.util.Vector3f.newV (ptemp);
}if (haveinversion && pitch1 != 0) {
}}if (ismirrorplane) {
if (trans != null) {
}ang1 = 0;
}if (haveinversion) {
if (isinversion) {
pa1 = null;
ax1 = null;
trans = null;
ftrans = null;
}} else if (istranslation) {
pa1 = null;
ax1 = null;
}if (ax1 != null) ax1.normalize ();
var m2 = null;
m2 = org.jmol.util.Matrix4f.newM (m);
if (vtrans.length () != 0) {
m2.m03 += vtrans.x;
m2.m13 += vtrans.y;
m2.m23 += vtrans.z;
}xyz = org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (m2, false, false, false);
return [xyz, xyzOriginal, info1, cmds, org.jmol.symmetry.SymmetryOperation.approx0 (ftrans), org.jmol.symmetry.SymmetryOperation.approx0 (trans), org.jmol.symmetry.SymmetryOperation.approx0 (ipt), org.jmol.symmetry.SymmetryOperation.approx0 (pa1), org.jmol.symmetry.SymmetryOperation.approx0 (ax1), Integer.$valueOf (ang1), m2, vtrans];
}, $fz.isPrivate = true, $fz), "org.jmol.symmetry.SymmetryOperation,~S,org.jmol.api.SymmetryInterface,org.jmol.util.Point3f,org.jmol.util.Point3f,~S");
c$.drawLine = Clazz.defineMethod (c$, "drawLine", 
($fz = function (s, id, diameter, pt0, pt1, color) {
s.append (id).append (" diameter ").appendF (diameter).append (org.jmol.util.Escape.escapePt (pt0)).append (org.jmol.util.Escape.escapePt (pt1)).append (" color ").append (color);
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~S,~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~S");
c$.fcoord = Clazz.defineMethod (c$, "fcoord", 
function (p) {
return org.jmol.symmetry.SymmetryOperation.fc (p.x) + " " + org.jmol.symmetry.SymmetryOperation.fc (p.y) + " " + org.jmol.symmetry.SymmetryOperation.fc (p.z);
}, "org.jmol.util.Tuple3f");
c$.fc = Clazz.defineMethod (c$, "fc", 
($fz = function (x) {
var xabs = Math.abs (x);
var x24 = Clazz.floatToInt (org.jmol.symmetry.SymmetryOperation.approx (xabs * 24));
var m = (x < 0 ? "-" : "");
if (x24 % 8 != 0) return m + org.jmol.symmetry.SymmetryOperation.twelfthsOf (x24 >> 1);
return (x24 == 0 ? "0" : x24 == 24 ? m + "1" : m + (Clazz.doubleToInt (x24 / 8)) + "/3");
}, $fz.isPrivate = true, $fz), "~N");
c$.approx0 = Clazz.defineMethod (c$, "approx0", 
($fz = function (pt) {
if (pt != null) {
if (Math.abs (pt.x) < 0.0001) pt.x = 0;
if (Math.abs (pt.y) < 0.0001) pt.y = 0;
if (Math.abs (pt.z) < 0.0001) pt.z = 0;
}return pt;
}, $fz.isPrivate = true, $fz), "org.jmol.util.Tuple3f");
c$.approx = Clazz.defineMethod (c$, "approx", 
($fz = function (pt) {
if (pt != null) {
pt.x = org.jmol.symmetry.SymmetryOperation.approx (pt.x);
pt.y = org.jmol.symmetry.SymmetryOperation.approx (pt.y);
pt.z = org.jmol.symmetry.SymmetryOperation.approx (pt.z);
}return pt;
}, $fz.isPrivate = true, $fz), "org.jmol.util.Tuple3f");
c$.approx = Clazz.defineMethod (c$, "approx", 
($fz = function (f) {
return org.jmol.util.Parser.approx (f, 100);
}, $fz.isPrivate = true, $fz), "~N");
c$.normalizeTranslation = Clazz.defineMethod (c$, "normalizeTranslation", 
function (operation) {
operation.m03 = (Clazz.floatToInt (operation.m03) + 12) % 12;
operation.m13 = (Clazz.floatToInt (operation.m13) + 12) % 12;
operation.m23 = (Clazz.floatToInt (operation.m23) + 12) % 12;
}, "org.jmol.util.Matrix4f");
Clazz.defineStatics (c$,
"twelfths", ["0", "1/12", "1/6", "1/4", "1/3", "5/12", "1/2", "7/12", "2/3", "3/4", "5/6", "11/12"]);
});
// 
//// org\jmol\symmetry\SymmetryInfo.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (null, "org.jmol.symmetry.SymmetryInfo", ["org.jmol.util.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.coordinatesAreFractional = false;
this.isMultiCell = false;
this.spaceGroup = null;
this.symmetryOperations = null;
this.symmetryInfoString = null;
this.cellRange = null;
this.periodicOriginXyz = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "SymmetryInfo");
Clazz.defineMethod (c$, "isPeriodic", 
function () {
return this.periodicOriginXyz != null;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setSymmetryInfo", 
function (info) {
this.cellRange = info.get ("unitCellRange");
this.periodicOriginXyz = info.get ("periodicOriginXyz");
this.spaceGroup = info.get ("spaceGroup");
if (this.spaceGroup == null || this.spaceGroup === "") this.spaceGroup = "spacegroup unspecified";
var symmetryCount = info.containsKey ("symmetryCount") ? (info.get ("symmetryCount")).intValue () : 0;
this.symmetryOperations = info.get ("symmetryOperations");
this.symmetryInfoString = "Spacegroup: " + this.spaceGroup;
if (this.symmetryOperations == null) {
this.symmetryInfoString += "\nNumber of symmetry operations: ?\nSymmetry Operations: unspecified\n";
} else {
this.symmetryInfoString += "\nNumber of symmetry operations: " + (symmetryCount == 0 ? 1 : symmetryCount) + "\nSymmetry Operations:";
for (var i = 0; i < symmetryCount; i++) this.symmetryInfoString += "\n" + this.symmetryOperations[i];

}this.symmetryInfoString += "\n";
var notionalUnitcell = info.get ("notionalUnitcell");
if (!org.jmol.util.SimpleUnitCell.isValid (notionalUnitcell)) return null;
this.coordinatesAreFractional = info.containsKey ("coordinatesAreFractional") ? (info.get ("coordinatesAreFractional")).booleanValue () : false;
this.isMultiCell = (this.coordinatesAreFractional && this.symmetryOperations != null);
return notionalUnitcell;
}, "java.util.Map");
});
// 
//// org\jmol\symmetry\UnitCell.js 
// 
Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.SimpleUnitCell", "$.Point3f"], "org.jmol.symmetry.UnitCell", ["org.jmol.util.BoxInfo", "$.Matrix4f", "$.Quadric"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vertices = null;
this.cartesianOffset = null;
this.fractionalOffset = null;
this.allFractionalRelative = false;
this.unitCellMultiplier = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "UnitCell", org.jmol.util.SimpleUnitCell);
Clazz.prepareFields (c$, function () {
this.cartesianOffset =  new org.jmol.util.Point3f ();
this.fractionalOffset =  new org.jmol.util.Point3f ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.symmetry.UnitCell, []);
});
c$.newP = Clazz.defineMethod (c$, "newP", 
function (points) {
var c =  new org.jmol.symmetry.UnitCell ();
var parameters = [-1, 0, 0, 0, 0, 0, points[1].x, points[1].y, points[1].z, points[2].x, points[2].y, points[2].z, points[3].x, points[3].y, points[3].z];
c.set (parameters);
c.allFractionalRelative = true;
c.calcUnitcellVertices ();
c.setCartesianOffset (points[0]);
return c;
}, "~A");
c$.newA = Clazz.overrideMethod (c$, "newA", 
function (notionalUnitcell) {
var c =  new org.jmol.symmetry.UnitCell ();
c.set (notionalUnitcell);
c.calcUnitcellVertices ();
return c;
}, "~A");
Clazz.defineMethod (c$, "setOrientation", 
function (mat) {
if (mat == null) return;
var m =  new org.jmol.util.Matrix4f ();
m.setM3 (mat);
this.matrixFractionalToCartesian.mul2 (m, this.matrixFractionalToCartesian);
this.matrixCartesianToFractional.invertM (this.matrixFractionalToCartesian);
this.calcUnitcellVertices ();
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "toUnitCell", 
function (pt, offset) {
if (this.matrixCartesianToFractional == null) return;
if (offset == null) {
this.matrixCartesianToFractional.transform (pt);
switch (this.dimension) {
case 3:
pt.z = org.jmol.symmetry.UnitCell.toFractional (pt.z);
case 2:
pt.y = org.jmol.symmetry.UnitCell.toFractional (pt.y);
case 1:
pt.x = org.jmol.symmetry.UnitCell.toFractional (pt.x);
}
this.matrixFractionalToCartesian.transform (pt);
} else {
this.matrixCtoFAbsolute.transform (pt);
switch (this.dimension) {
case 3:
pt.z = org.jmol.symmetry.UnitCell.toFractional (pt.z);
case 2:
pt.y = org.jmol.symmetry.UnitCell.toFractional (pt.y);
case 1:
pt.x = org.jmol.symmetry.UnitCell.toFractional (pt.x);
}
pt.add (offset);
this.matrixFtoCAbsolute.transform (pt);
}}, "org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setAllFractionalRelative", 
function (TF) {
this.allFractionalRelative = TF;
}, "~B");
Clazz.defineMethod (c$, "setOffset", 
function (pt) {
if (pt == null) return;
if (pt.x >= 100 || pt.y >= 100) {
this.unitCellMultiplier = org.jmol.util.Point3f.newP (pt);
return;
}if (pt.x == 0 && pt.y == 0 && pt.z == 0) this.unitCellMultiplier = null;
this.fractionalOffset.setT (pt);
this.matrixCartesianToFractional.m03 = -pt.x;
this.matrixCartesianToFractional.m13 = -pt.y;
this.matrixCartesianToFractional.m23 = -pt.z;
this.cartesianOffset.setT (pt);
this.matrixFractionalToCartesian.m03 = 0;
this.matrixFractionalToCartesian.m13 = 0;
this.matrixFractionalToCartesian.m23 = 0;
this.matrixFractionalToCartesian.transform (this.cartesianOffset);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFAbsolute.setM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute.setM (this.matrixFractionalToCartesian);
}}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setCartesianOffset", 
function (origin) {
this.cartesianOffset.setT (origin);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
this.fractionalOffset.setT (this.cartesianOffset);
this.matrixCartesianToFractional.m03 = 0;
this.matrixCartesianToFractional.m13 = 0;
this.matrixCartesianToFractional.m23 = 0;
this.matrixCartesianToFractional.transform (this.fractionalOffset);
this.matrixCartesianToFractional.m03 = -this.fractionalOffset.x;
this.matrixCartesianToFractional.m13 = -this.fractionalOffset.y;
this.matrixCartesianToFractional.m23 = -this.fractionalOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFAbsolute.setM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute.setM (this.matrixFractionalToCartesian);
}}, "org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "setMinMaxLatticeParameters", 
function (minXYZ, maxXYZ) {
if (maxXYZ.x <= 555 && maxXYZ.y >= 555) {
var pt =  new org.jmol.util.Point3f ();
org.jmol.util.SimpleUnitCell.ijkToPoint3f (maxXYZ.x, pt, 0);
minXYZ.x = Clazz.floatToInt (pt.x);
minXYZ.y = Clazz.floatToInt (pt.y);
minXYZ.z = Clazz.floatToInt (pt.z);
org.jmol.util.SimpleUnitCell.ijkToPoint3f (maxXYZ.y, pt, 1);
maxXYZ.x = Clazz.floatToInt (pt.x);
maxXYZ.y = Clazz.floatToInt (pt.y);
maxXYZ.z = Clazz.floatToInt (pt.z);
}switch (this.dimension) {
case 1:
minXYZ.y = 0;
maxXYZ.y = 1;
case 2:
minXYZ.z = 0;
maxXYZ.z = 1;
}
}, "org.jmol.util.Point3i,org.jmol.util.Point3i");
Clazz.defineMethod (c$, "dumpInfo", 
function (isFull) {
return "a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", alpha=" + this.alpha + ", beta=" + this.beta + ", gamma=" + this.gamma + (isFull ? "\nfractional to cartesian: " + this.matrixFractionalToCartesian + "\ncartesian to fractional: " + this.matrixCartesianToFractional : "");
}, "~B");
Clazz.defineMethod (c$, "getVertices", 
function () {
return this.vertices;
});
Clazz.defineMethod (c$, "getCartesianOffset", 
function () {
return this.cartesianOffset;
});
Clazz.defineMethod (c$, "getFractionalOffset", 
function () {
return this.fractionalOffset;
});
Clazz.defineMethod (c$, "getEllipsoid", 
function (parBorU) {
if (parBorU == null) return null;
if (parBorU[0] == 0) {
var lengths =  Clazz.newFloatArray (3, 0);
lengths[0] = lengths[1] = lengths[2] = Math.sqrt (parBorU[7]);
return  new org.jmol.util.Quadric (null, lengths, true);
}var Bcart =  Clazz.newDoubleArray (6, 0);
var ortepType = Clazz.floatToInt (parBorU[6]);
if (ortepType == 12) {
Bcart[0] = parBorU[0] * 19.739208802178716;
Bcart[1] = parBorU[1] * 19.739208802178716;
Bcart[2] = parBorU[2] * 19.739208802178716;
Bcart[3] = parBorU[3] * 19.739208802178716 * 2;
Bcart[4] = parBorU[4] * 19.739208802178716 * 2;
Bcart[5] = parBorU[5] * 19.739208802178716 * 2;
parBorU[7] = (parBorU[0] + parBorU[1] + parBorU[3]) / 3;
} else {
var isFractional = (ortepType == 4 || ortepType == 5 || ortepType == 8 || ortepType == 9);
var cc = 2 - (ortepType % 2);
var dd = (ortepType == 8 || ortepType == 9 || ortepType == 10 ? 19.739208802178716 : ortepType == 4 || ortepType == 5 ? 0.25 : ortepType == 2 || ortepType == 3 ? Math.log (2) : 1);
var B11 = parBorU[0] * dd * (isFractional ? this.a_ * this.a_ : 1);
var B22 = parBorU[1] * dd * (isFractional ? this.b_ * this.b_ : 1);
var B33 = parBorU[2] * dd * (isFractional ? this.c_ * this.c_ : 1);
var B12 = parBorU[3] * dd * (isFractional ? this.a_ * this.b_ : 1) * cc;
var B13 = parBorU[4] * dd * (isFractional ? this.a_ * this.c_ : 1) * cc;
var B23 = parBorU[5] * dd * (isFractional ? this.b_ * this.c_ : 1) * cc;
parBorU[7] = Math.pow (B11 / 19.739208802178716 / this.a_ / this.a_ * B22 / 19.739208802178716 / this.b_ / this.b_ * B33 / 19.739208802178716 / this.c_ / this.c_, 0.3333);
Bcart[0] = this.a * this.a * B11 + this.b * this.b * this.cosGamma * this.cosGamma * B22 + this.c * this.c * this.cosBeta * this.cosBeta * B33 + this.a * this.b * this.cosGamma * B12 + this.b * this.c * this.cosGamma * this.cosBeta * B23 + this.a * this.c * this.cosBeta * B13;
Bcart[1] = this.b * this.b * this.sinGamma * this.sinGamma * B22 + this.c * this.c * this.cA_ * this.cA_ * B33 + this.b * this.c * this.cA_ * this.sinGamma * B23;
Bcart[2] = this.c * this.c * this.cB_ * this.cB_ * B33;
Bcart[3] = 2 * this.b * this.b * this.cosGamma * this.sinGamma * B22 + 2 * this.c * this.c * this.cA_ * this.cosBeta * B33 + this.a * this.b * this.sinGamma * B12 + this.b * this.c * (this.cA_ * this.cosGamma + this.sinGamma * this.cosBeta) * B23 + this.a * this.c * this.cA_ * B13;
Bcart[4] = 2 * this.c * this.c * this.cB_ * this.cosBeta * B33 + this.b * this.c * this.cosGamma * B23 + this.a * this.c * this.cB_ * B13;
Bcart[5] = 2 * this.c * this.c * this.cA_ * this.cB_ * B33 + this.b * this.c * this.cB_ * this.sinGamma * B23;
}return  new org.jmol.util.Quadric (Bcart);
}, "~A");
Clazz.defineMethod (c$, "getCanonicalCopy", 
function (scale) {
var pts =  new Array (8);
for (var i = 0; i < 8; i++) {
pts[i] = org.jmol.util.Point3f.newP (org.jmol.util.BoxInfo.unitCubePoints[i]);
this.matrixFractionalToCartesian.transform (pts[i]);
}
return org.jmol.util.BoxInfo.getCanonicalCopy (pts, scale);
}, "~N");
c$.toFractional = Clazz.defineMethod (c$, "toFractional", 
($fz = function (x) {
x = (x - Math.floor (x));
if (x > 0.9999 || x < 0.0001) x = 0;
return x;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "calcUnitcellVertices", 
($fz = function () {
if (this.matrixFractionalToCartesian == null) return;
this.matrixCtoFAbsolute = org.jmol.util.Matrix4f.newM (this.matrixCartesianToFractional);
this.matrixFtoCAbsolute = org.jmol.util.Matrix4f.newM (this.matrixFractionalToCartesian);
this.vertices =  new Array (8);
for (var i = 8; --i >= 0; ) {
this.vertices[i] =  new org.jmol.util.Point3f ();
this.matrixFractionalToCartesian.transform2 (org.jmol.util.BoxInfo.unitCubePoints[i], this.vertices[i]);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkDistance", 
function (f1, f2, distance, dx, iRange, jRange, kRange, ptOffset) {
var p1 = org.jmol.util.Point3f.newP (f1);
this.toCartesian (p1, true);
for (var i = -iRange; i <= iRange; i++) for (var j = -jRange; j <= jRange; j++) for (var k = -kRange; k <= kRange; k++) {
ptOffset.set (f2.x + i, f2.y + j, f2.z + k);
this.toCartesian (ptOffset, true);
var d = p1.distance (ptOffset);
if (dx > 0 ? Math.abs (d - distance) <= dx : d <= distance && d > 0.1) {
ptOffset.set (i, j, k);
return true;
}}


return false;
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,~N,~N,~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "getUnitCellMultiplier", 
function () {
return this.unitCellMultiplier;
});
Clazz.defineMethod (c$, "getUnitCellVectors", 
function () {
var m = this.matrixFractionalToCartesian;
return [org.jmol.util.Point3f.newP (this.cartesianOffset), org.jmol.util.Point3f.new3 (m.m00, m.m10, m.m20), org.jmol.util.Point3f.new3 (m.m01, m.m11, m.m21), org.jmol.util.Point3f.new3 (m.m02, m.m12, m.m22)];
});
Clazz.defineStatics (c$,
"twoP2", 19.739208802178716);
});
