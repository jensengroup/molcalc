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
