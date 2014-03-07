Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (["org.jmol.modelset.BondCollection", "java.util.ArrayList", "org.jmol.util.BitSet", "$.BoxInfo", "$.Point3f"], "org.jmol.modelset.ModelCollection", ["java.lang.Boolean", "$.Character", "$.Float", "java.util.Date", "$.Hashtable", "org.jmol.api.Interface", "org.jmol.bspt.Bspf", "org.jmol.constant.EnumPalette", "$.EnumVdw", "org.jmol.io.OutputStringBuilder", "$.XmlUtil", "org.jmol.modelset.Atom", "$.AtomIteratorWithinModel", "$.AtomIteratorWithinModelSet", "$.Bond", "$.HBond", "$.LabelToken", "org.jmol.util.ArrayUtil", "$.BitSetUtil", "$.Elements", "$.Escape", "$.JmolEdge", "$.JmolMolecule", "$.Logger", "$.Parser", "$.StringXBuilder", "$.TextFormat", "$.TriangleData", "$.Vector3f", "org.jmol.viewer.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsSymmetry = null;
this.modelSetName = null;
this.models = null;
this.modelCount = 0;
this.unitCells = null;
this.modelNumbers = null;
this.modelFileNumbers = null;
this.modelNumbersForAtomLabel = null;
this.modelNames = null;
this.frameTitles = null;
this.elementsPresent = null;
this.isXYZ = false;
this.isPDB = false;
this.modelSetProperties = null;
this.modelSetAuxiliaryInfo = null;
this.someModelsHaveSymmetry = false;
this.someModelsHaveAromaticBonds = false;
this.someModelsHaveFractionalCoordinates = false;
this.ptTemp = null;
this.averageAtomPoint = null;
this.isBbcageDefault = false;
this.bboxModels = null;
this.bboxAtoms = null;
this.boxInfo = null;
this.stateScripts = null;
this.thisStateModel = 0;
this.trajectorySteps = null;
this.vibrationSteps = null;
this.selectedMolecules = null;
this.selectedMoleculeCount = 0;
this.showRebondTimes = true;
this.bsAll = null;
this.shapeManager = null;
this.proteinStructureTainted = false;
this.symTemp = null;
this.htPeaks = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "ModelCollection", org.jmol.modelset.BondCollection);
Clazz.prepareFields (c$, function () {
this.models =  new Array (1);
this.modelNumbers =  Clazz.newIntArray (1, 0);
this.modelFileNumbers =  Clazz.newIntArray (1, 0);
this.modelNumbersForAtomLabel =  new Array (1);
this.modelNames =  new Array (1);
this.frameTitles =  new Array (1);
this.ptTemp =  new org.jmol.util.Point3f ();
this.averageAtomPoint =  new org.jmol.util.Point3f ();
this.boxInfo =  new org.jmol.util.BoxInfo ();
{
this.boxInfo.addBoundBoxPoint (org.jmol.util.Point3f.new3 (-10, -10, -10));
this.boxInfo.addBoundBoxPoint (org.jmol.util.Point3f.new3 (10, 10, 10));
}this.stateScripts =  new java.util.ArrayList ();
this.selectedMolecules =  new org.jmol.util.BitSet ();
});
Clazz.defineMethod (c$, "mergeModelArrays", 
function (mergeModelSet) {
this.atoms = mergeModelSet.atoms;
this.bonds = mergeModelSet.bonds;
this.stateScripts = mergeModelSet.stateScripts;
this.proteinStructureTainted = mergeModelSet.proteinStructureTainted;
this.thisStateModel = -1;
this.bsSymmetry = mergeModelSet.bsSymmetry;
this.modelFileNumbers = mergeModelSet.modelFileNumbers;
this.modelNumbersForAtomLabel = mergeModelSet.modelNumbersForAtomLabel;
this.modelNames = mergeModelSet.modelNames;
this.modelNumbers = mergeModelSet.modelNumbers;
this.frameTitles = mergeModelSet.frameTitles;
this.mergeAtomArrays (mergeModelSet);
}, "org.jmol.modelset.ModelSet");
Clazz.defineMethod (c$, "releaseModelSet", 
function () {
this.models = null;
this.bsSymmetry = null;
this.bsAll = null;
this.unitCells = null;
Clazz.superCall (this, org.jmol.modelset.ModelCollection, "releaseModelSet", []);
});
Clazz.defineMethod (c$, "getModelSetName", 
function () {
return this.modelSetName;
});
Clazz.defineMethod (c$, "getModels", 
function () {
return this.models;
});
Clazz.defineMethod (c$, "getModelCount", 
function () {
return this.modelCount;
});
Clazz.defineMethod (c$, "getCellInfos", 
function () {
return this.unitCells;
});
Clazz.defineMethod (c$, "haveUnitCells", 
function () {
if (this.unitCells != null) return true;
for (var i = this.modelCount; --i >= 0; ) if (this.models[i].unitCell != null) return true;

return false;
});
Clazz.defineMethod (c$, "getUnitCell", 
function (modelIndex) {
if (modelIndex < 0 || modelIndex >= this.modelCount) return null;
if (this.models[modelIndex].unitCell != null) return this.models[modelIndex].unitCell;
return (this.unitCells == null || modelIndex >= this.unitCells.length || !this.unitCells[modelIndex].haveUnitCell () ? null : this.unitCells[modelIndex]);
}, "~N");
Clazz.defineMethod (c$, "setUnitCell", 
function (modelIndex, unitCell) {
if (modelIndex < 0 || modelIndex >= this.modelCount) return;
this.models[modelIndex].unitCell = unitCell;
}, "~N,org.jmol.api.SymmetryInterface");
Clazz.defineMethod (c$, "getPlaneIntersection", 
function (type, plane, scale, flags, modelIndex) {
var pts = null;
switch (type) {
case 1614417948:
var uc = this.getUnitCell (modelIndex);
if (uc == null) return null;
pts = uc.getCanonicalCopy (scale);
break;
case 1679429641:
pts = this.boxInfo.getCanonicalCopy (scale);
break;
}
var v =  new java.util.ArrayList ();
v.add (pts);
return org.jmol.util.TriangleData.intersectPlane (plane, v, flags);
}, "~N,org.jmol.util.Point4f,~N,~N,~N");
Clazz.defineMethod (c$, "getModelName", 
function (modelIndex) {
return this.modelCount < 1 ? "" : modelIndex >= 0 ? this.modelNames[modelIndex] : this.modelNumbersForAtomLabel[-1 - modelIndex];
}, "~N");
Clazz.defineMethod (c$, "getModelTitle", 
function (modelIndex) {
return this.getModelAuxiliaryInfoValue (modelIndex, "title");
}, "~N");
Clazz.defineMethod (c$, "getModelFileName", 
function (modelIndex) {
return this.getModelAuxiliaryInfoValue (modelIndex, "fileName");
}, "~N");
Clazz.defineMethod (c$, "setFrameTitle", 
function (bsFrames, title) {
if (Clazz.instanceOf (title, String)) {
for (var i = bsFrames.nextSetBit (0); i >= 0; i = bsFrames.nextSetBit (i + 1)) this.frameTitles[i] = title;

} else {
var list = title;
for (var i = bsFrames.nextSetBit (0), n = 0; i >= 0; i = bsFrames.nextSetBit (i + 1)) if (n < list.length) this.frameTitles[i] = list[n++];

}}, "org.jmol.util.BitSet,~O");
Clazz.defineMethod (c$, "getFrameTitle", 
function (modelIndex) {
return (modelIndex >= 0 && modelIndex < this.modelCount ? this.frameTitles[modelIndex] : "");
}, "~N");
Clazz.defineMethod (c$, "getModelNumberForAtomLabel", 
function (modelIndex) {
return this.modelNumbersForAtomLabel[modelIndex];
}, "~N");
Clazz.defineMethod (c$, "calculatePolymers", 
function (groups, groupCount, baseGroupIndex, modelsExcluded) {
if (!this.isPDB) return;
for (var i = 0; i < this.modelCount; i++) if ((modelsExcluded == null || !modelsExcluded.get (i)) && this.models[i].isBioModel) {
this.models[i].calculatePolymers (groups, groupCount, baseGroupIndex, modelsExcluded);
return;
}
}, "~A,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getGroups", 
function () {
var n = 0;
for (var i = 0; i < this.modelCount; i++) n += this.models[i].getGroupCount ();

var groups =  new Array (n);
for (var i = 0, iGroup = 0; i < this.modelCount; i++) for (var j = 0; j < this.models[i].chainCount; j++) for (var k = 0; k < this.models[i].chains[j].groupCount; k++) {
groups[iGroup] = this.models[i].chains[j].groups[k];
groups[iGroup].groupIndex = iGroup;
iGroup++;
}


return groups;
});
Clazz.defineMethod (c$, "getNotionalUnitcell", 
function () {
var c = this.getUnitCell (0);
return (c == null ? null : c.getNotionalUnitCell ());
});
Clazz.defineMethod (c$, "setCrystallographicDefaults", 
function () {
return !this.isPDB && this.someModelsHaveSymmetry && this.someModelsHaveFractionalCoordinates;
});
Clazz.defineMethod (c$, "getAverageAtomPoint", 
function () {
return this.averageAtomPoint;
});
Clazz.defineMethod (c$, "getBoundBoxCenter", 
function (modelIndex) {
if (this.isJmolDataFrameForModel (modelIndex)) return  new org.jmol.util.Point3f ();
return this.boxInfo.getBoundBoxCenter ();
}, "~N");
Clazz.defineMethod (c$, "getBoundBoxCornerVector", 
function () {
return this.boxInfo.getBoundBoxCornerVector ();
});
Clazz.defineMethod (c$, "getBboxVertices", 
function () {
return this.boxInfo.getBboxVertices ();
});
Clazz.defineMethod (c$, "getBoundBoxInfo", 
function () {
return this.boxInfo.getBoundBoxInfo ();
});
Clazz.defineMethod (c$, "getBoundBoxModels", 
function () {
return this.bboxModels;
});
Clazz.defineMethod (c$, "setBoundBox", 
function (pt1, pt2, byCorner, scale) {
this.isBbcageDefault = false;
this.bboxModels = null;
this.bboxAtoms = null;
this.boxInfo.setBoundBox (pt1, pt2, byCorner, scale);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,~B,~N");
Clazz.defineMethod (c$, "getBoundBoxCommand", 
function (withOptions) {
if (!withOptions && this.bboxAtoms != null) return "boundbox " + org.jmol.util.Escape.escape (this.bboxAtoms);
this.ptTemp.setT (this.boxInfo.getBoundBoxCenter ());
var bbVector = this.boxInfo.getBoundBoxCornerVector ();
var s = (withOptions ? "boundbox " + org.jmol.util.Escape.escapePt (this.ptTemp) + " " + org.jmol.util.Escape.escapePt (bbVector) + "\n#or\n" : "");
this.ptTemp.sub (bbVector);
s += "boundbox corners " + org.jmol.util.Escape.escapePt (this.ptTemp) + " ";
this.ptTemp.scaleAdd2 (2, bbVector, this.ptTemp);
var v = Math.abs (8 * bbVector.x * bbVector.y * bbVector.z);
s += org.jmol.util.Escape.escapePt (this.ptTemp) + " # volume = " + v;
return s;
}, "~B");
Clazz.defineMethod (c$, "getDefaultVdwType", 
function (modelIndex) {
return (!this.models[modelIndex].isBioModel ? org.jmol.constant.EnumVdw.AUTO_BABEL : this.models[modelIndex].hydrogenCount == 0 ? org.jmol.constant.EnumVdw.AUTO_JMOL : org.jmol.constant.EnumVdw.AUTO_BABEL);
}, "~N");
Clazz.defineMethod (c$, "setRotationRadius", 
function (modelIndex, angstroms) {
if (this.isJmolDataFrameForModel (modelIndex)) {
this.models[modelIndex].defaultRotationRadius = angstroms;
return false;
}return true;
}, "~N,~N");
Clazz.defineMethod (c$, "calcRotationRadius", 
function (modelIndex, center) {
if (this.isJmolDataFrameForModel (modelIndex)) {
var r = this.models[modelIndex].defaultRotationRadius;
return (r == 0 ? 10 : r);
}var maxRadius = 0;
for (var i = this.atomCount; --i >= 0; ) {
if (this.isJmolDataFrameForAtom (this.atoms[i])) {
modelIndex = this.atoms[i].modelIndex;
while (i >= 0 && this.atoms[i].modelIndex == modelIndex) i--;

continue;
}var atom = this.atoms[i];
var distAtom = center.distance (atom);
var outerVdw = distAtom + this.getRadiusVdwJmol (atom);
if (outerVdw > maxRadius) maxRadius = outerVdw;
}
return (maxRadius == 0 ? 10 : maxRadius);
}, "~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "calcBoundBoxDimensions", 
function (bs, scale) {
if (bs != null && bs.nextSetBit (0) < 0) bs = null;
if (bs == null && this.isBbcageDefault || this.atomCount < 2) return;
this.bboxModels = this.getModelBitSet (this.bboxAtoms = org.jmol.util.BitSetUtil.copy (bs), false);
if (this.calcAtomsMinMax (bs, this.boxInfo) == this.atomCount) this.isBbcageDefault = true;
if (bs == null) {
this.averageAtomPoint.setT (this.getAtomSetCenter (null));
if (this.unitCells != null) this.calcUnitCellMinMax ();
}this.boxInfo.setBbcage (scale);
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "getBoxInfo", 
function (bs, scale) {
if (bs == null) return this.boxInfo;
var bi =  new org.jmol.util.BoxInfo ();
this.calcAtomsMinMax (bs, bi);
bi.setBbcage (scale);
return bi;
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "calcAtomsMinMax", 
function (bs, boxInfo) {
boxInfo.reset ();
var nAtoms = 0;
var isAll = (bs == null);
var i0 = (isAll ? this.atomCount - 1 : bs.nextSetBit (0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bs.nextSetBit (i + 1))) {
nAtoms++;
if (!this.isJmolDataFrameForAtom (this.atoms[i])) boxInfo.addBoundBoxPoint (this.atoms[i]);
}
return nAtoms;
}, "org.jmol.util.BitSet,org.jmol.util.BoxInfo");
Clazz.defineMethod (c$, "calcUnitCellMinMax", 
($fz = function () {
for (var i = 0; i < this.modelCount; i++) {
if (!this.unitCells[i].getCoordinatesAreFractional ()) continue;
var vertices = this.unitCells[i].getUnitCellVertices ();
for (var j = 0; j < 8; j++) this.boxInfo.addBoundBoxPoint (vertices[j]);

}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "calcRotationRadiusBs", 
function (bs) {
var center = this.getAtomSetCenter (bs);
var maxRadius = 0;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var atom = this.atoms[i];
var distAtom = center.distance (atom);
var outerVdw = distAtom + this.getRadiusVdwJmol (atom);
if (outerVdw > maxRadius) maxRadius = outerVdw;
}
return (maxRadius == 0 ? 10 : maxRadius);
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getCenterAndPoints", 
function (vAtomSets, addCenters) {
var bsAtoms1;
var bsAtoms2;
var n = (addCenters ? 1 : 0);
for (var ii = vAtomSets.size (); --ii >= 0; ) {
var bss = vAtomSets.get (ii);
bsAtoms1 = bss[0];
bsAtoms2 = bss[1];
n += Math.min (bsAtoms1.cardinality (), bsAtoms2.cardinality ());
}
var points =  Clazz.newArray (2, n, null);
if (addCenters) {
points[0][0] =  new org.jmol.util.Point3f ();
points[1][0] =  new org.jmol.util.Point3f ();
}for (var ii = vAtomSets.size (); --ii >= 0; ) {
var bss = vAtomSets.get (ii);
bsAtoms1 = bss[0];
bsAtoms2 = bss[1];
for (var i = bsAtoms1.nextSetBit (0), j = bsAtoms2.nextSetBit (0); i >= 0 && j >= 0; i = bsAtoms1.nextSetBit (i + 1), j = bsAtoms2.nextSetBit (j + 1)) {
points[0][--n] = this.atoms[i];
points[1][n] = this.atoms[j];
if (addCenters) {
points[0][0].add (this.atoms[i]);
points[1][0].add (this.atoms[j]);
}}
}
if (addCenters) {
points[0][0].scale (1 / (points[0].length - 1));
points[1][0].scale (1 / (points[1].length - 1));
}return points;
}, "java.util.List,~B");
Clazz.defineMethod (c$, "getAtomSetCenter", 
function (bs) {
var ptCenter = org.jmol.util.Point3f.new3 (0, 0, 0);
var nPoints = 0;
if (bs != null) for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (!this.isJmolDataFrameForAtom (this.atoms[i])) {
nPoints++;
ptCenter.add (this.atoms[i]);
}}
if (nPoints > 0) ptCenter.scale (1.0 / nPoints);
return ptCenter;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setAtomProperty", 
function (bs, tok, iValue, fValue, sValue, values, list) {
Clazz.superCall (this, org.jmol.modelset.ModelCollection, "setAtomProperty", [bs, tok, iValue, fValue, sValue, values, list]);
if ((tok == 1095763988 || tok == 1632634889) && this.viewer.getSmartAromatic ()) this.assignAromaticBonds ();
}, "org.jmol.util.BitSet,~N,~N,~N,~S,~A,~A");
Clazz.defineMethod (c$, "addStateScript", 
function (script1, bsBonds, bsAtoms1, bsAtoms2, script2, addFrameNumber, postDefinitions) {
var iModel = this.viewer.getCurrentModelIndex ();
if (addFrameNumber) {
if (this.thisStateModel != iModel) script1 = "frame " + (iModel < 0 ? "all #" + iModel : this.getModelNumberDotted (iModel)) + ";\n  " + script1;
this.thisStateModel = iModel;
} else {
this.thisStateModel = -1;
}var stateScript =  new org.jmol.modelset.ModelCollection.StateScript (this.thisStateModel, script1, bsBonds, bsAtoms1, bsAtoms2, script2, postDefinitions);
if (stateScript.isValid ()) {
this.stateScripts.add (stateScript);
}return stateScript;
}, "~S,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,~S,~B,~B");
Clazz.defineMethod (c$, "calculateStructuresAllExcept", 
function (alreadyDefined, asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha) {
this.freezeModels ();
var ret = "";
var bsModels = org.jmol.util.BitSetUtil.copyInvert (alreadyDefined, this.modelCount);
if (setStructure) this.setDefaultStructure (bsModels);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
ret += this.models[i].calculateStructures (asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha);
}
if (setStructure) {
this.setStructureIndexes ();
}return ret;
}, "org.jmol.util.BitSet,~B,~B,~B,~B,~B");
Clazz.defineMethod (c$, "setDefaultStructure", 
function (bsModels) {
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) if (this.models[i].isBioModel && this.models[i].defaultStructure == null) this.models[i].defaultStructure = this.getProteinStructureState (this.models[i].bsAtoms, false, false, 0);

}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setProteinType", 
function (bs, type) {
var monomerIndexCurrent = -1;
var iLast = -1;
var bsModels = this.getModelBitSet (bs, false);
this.setDefaultStructure (bsModels);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (iLast != i - 1) monomerIndexCurrent = -1;
monomerIndexCurrent = this.atoms[i].group.setProteinStructureType (type, monomerIndexCurrent);
var modelIndex = this.atoms[i].modelIndex;
this.proteinStructureTainted = this.models[modelIndex].structureTainted = true;
iLast = i = this.atoms[i].group.lastAtomIndex;
}
var lastStrucNo =  Clazz.newIntArray (this.modelCount, 0);
for (var i = 0; i < this.atomCount; ) {
var modelIndex = this.atoms[i].modelIndex;
if (!bsModels.get (modelIndex)) {
i = this.models[modelIndex].firstAtomIndex + this.models[modelIndex].atomCount;
continue;
}iLast = this.atoms[i].getStrucNo ();
if (iLast < 1000 && iLast > lastStrucNo[modelIndex]) lastStrucNo[modelIndex] = iLast;
i = this.atoms[i].group.lastAtomIndex + 1;
}
for (var i = 0; i < this.atomCount; ) {
var modelIndex = this.atoms[i].modelIndex;
if (!bsModels.get (modelIndex)) {
i = this.models[modelIndex].firstAtomIndex + this.models[modelIndex].atomCount;
continue;
}if (this.atoms[i].getStrucNo () > 1000) this.atoms[i].group.setStrucNo (++lastStrucNo[modelIndex]);
i = this.atoms[i].group.lastAtomIndex + 1;
}
}, "org.jmol.util.BitSet,org.jmol.constant.EnumStructure");
Clazz.defineMethod (c$, "freezeModels", 
function () {
for (var iModel = this.modelCount; --iModel >= 0; ) this.models[iModel].freeze ();

});
Clazz.defineMethod (c$, "getStructureList", 
function () {
return this.viewer.getStructureList ();
});
Clazz.defineMethod (c$, "setStructureList", 
function (structureList) {
for (var iModel = this.modelCount; --iModel >= 0; ) this.models[iModel].setStructureList (structureList);

}, "java.util.Map");
Clazz.defineMethod (c$, "setConformation", 
function (bsAtoms) {
var bsModels = this.getModelBitSet (bsAtoms, false);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) this.models[i].setConformation (bsAtoms);

return bsAtoms;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getConformation", 
function (modelIndex, conformationIndex, doSet) {
var bs =  new org.jmol.util.BitSet ();
for (var i = this.modelCount; --i >= 0; ) if (i == modelIndex || modelIndex < 0) {
var altLocs = this.getAltLocListInModel (i);
var nAltLocs = this.getAltLocCountInModel (i);
if (conformationIndex > 0 && conformationIndex >= nAltLocs) continue;
var bsConformation = this.viewer.getModelUndeletedAtomsBitSet (i);
if (conformationIndex >= 0) {
if (!this.models[i].getPdbConformation (bsConformation, conformationIndex)) for (var c = nAltLocs; --c >= 0; ) if (c != conformationIndex) bsConformation.andNot (this.getAtomBitsMaybeDeleted (1048607, altLocs.substring (c, c + 1)));

}if (bsConformation.nextSetBit (0) >= 0) {
bs.or (bsConformation);
if (doSet) this.models[i].setConformation (bsConformation);
}}
return bs;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getHeteroList", 
function (modelIndex) {
var htFull =  new java.util.Hashtable ();
var ok = false;
for (var i = this.modelCount; --i >= 0; ) if (modelIndex < 0 || i == modelIndex) {
var ht = this.getModelAuxiliaryInfoValue (i, "hetNames");
if (ht == null) continue;
ok = true;
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
htFull.put (key, entry.getValue ());
}
}
return (ok ? htFull : this.getModelSetAuxiliaryInfoValue ("hetNames"));
}, "~N");
Clazz.defineMethod (c$, "getModelSetProperties", 
function () {
return this.modelSetProperties;
});
Clazz.defineMethod (c$, "getModelSetAuxiliaryInfo", 
function () {
return this.modelSetAuxiliaryInfo;
});
Clazz.defineMethod (c$, "getModelSetProperty", 
function (propertyName) {
return (this.modelSetProperties == null ? null : this.modelSetProperties.getProperty (propertyName));
}, "~S");
Clazz.defineMethod (c$, "getModelSetAuxiliaryInfoValue", 
function (keyName) {
return (this.modelSetAuxiliaryInfo == null ? null : this.modelSetAuxiliaryInfo.get (keyName));
}, "~S");
Clazz.defineMethod (c$, "getModelSetAuxiliaryInfoBoolean", 
function (keyName) {
var info = this.modelSetAuxiliaryInfo;
return (info != null && info.containsKey (keyName) && (info.get (keyName)).booleanValue ());
}, "~S");
Clazz.defineMethod (c$, "getMergeTrajectoryCount", 
function (isTrajectory) {
if (this.trajectorySteps == null) {
if (!isTrajectory) return 0;
this.trajectorySteps =  new java.util.ArrayList ();
}for (var i = this.trajectorySteps.size (); i < this.modelCount; i++) this.trajectorySteps.add (null);

return this.modelCount;
}, "~B");
Clazz.defineMethod (c$, "getTrajectoryIndex", 
function (modelIndex) {
return this.models[modelIndex].trajectoryBaseIndex;
}, "~N");
Clazz.defineMethod (c$, "isTrajectory", 
function (modelIndex) {
return this.models[modelIndex].isTrajectory;
}, "~N");
Clazz.defineMethod (c$, "isTrajectoryMeasurement", 
function (countPlusIndices) {
if (countPlusIndices == null) return false;
var count = countPlusIndices[0];
var atomIndex;
for (var i = 1; i <= count; i++) if ((atomIndex = countPlusIndices[i]) >= 0 && this.models[this.atoms[atomIndex].modelIndex].isTrajectory) return true;

return false;
}, "~A");
Clazz.defineMethod (c$, "getModelBitSet", 
function (atomList, allTrajectories) {
var bs =  new org.jmol.util.BitSet ();
var modelIndex = 0;
var isAll = (atomList == null);
var i0 = (isAll ? 0 : atomList.nextSetBit (0));
for (var i = i0; i >= 0 && i < this.atomCount; i = (isAll ? i + 1 : atomList.nextSetBit (i + 1))) {
bs.set (modelIndex = this.atoms[i].modelIndex);
if (allTrajectories) {
var iBase = this.models[modelIndex].trajectoryBaseIndex;
for (var j = 0; j < this.modelCount; j++) if (this.models[j].trajectoryBaseIndex == iBase) bs.set (j);

}i = this.models[modelIndex].firstAtomIndex + this.models[modelIndex].atomCount - 1;
}
return bs;
}, "org.jmol.util.BitSet,~B");
Clazz.defineMethod (c$, "getIterativeModels", 
function (allowJmolData) {
var bs =  new org.jmol.util.BitSet ();
for (var i = 0; i < this.modelCount; i++) {
if (!allowJmolData && this.isJmolDataFrameForModel (i)) continue;
if (this.models[i].trajectoryBaseIndex == i) bs.set (i);
}
return bs;
}, "~B");
Clazz.defineMethod (c$, "isTrajectorySubFrame", 
function (i) {
return (this.models[i].isTrajectory && this.models[i].trajectoryBaseIndex != i);
}, "~N");
Clazz.defineMethod (c$, "selectDisplayedTrajectories", 
function (bs) {
for (var i = 0; i < this.modelCount; i++) {
if (this.models[i].isTrajectory && this.atoms[this.models[i].firstAtomIndex].modelIndex != i) bs.clear (i);
}
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "fillAtomData", 
function (atomData, mode) {
if ((mode & 4) != 0) {
this.getMolecules ();
atomData.bsMolecules =  new Array (this.molecules.length);
atomData.atomMolecule =  Clazz.newIntArray (this.atomCount, 0);
var bs;
for (var i = 0; i < this.molecules.length; i++) {
bs = atomData.bsMolecules[i] = this.molecules[i].atomList;
for (var iAtom = bs.nextSetBit (0); iAtom >= 0; iAtom = bs.nextSetBit (iAtom + 1)) atomData.atomMolecule[iAtom] = i;

}
}if ((mode & 8) != 0) {
var nH =  Clazz.newIntArray (1, 0);
atomData.hAtomRadius = this.viewer.getVanderwaalsMar (1) / 1000;
atomData.hAtoms = this.calculateHydrogens (atomData.bsSelected, nH, false, true, null);
atomData.hydrogenAtomCount = nH[0];
return;
}if (atomData.modelIndex < 0) atomData.firstAtomIndex = (atomData.bsSelected == null ? 0 : Math.max (0, atomData.bsSelected.nextSetBit (0)));
 else atomData.firstAtomIndex = this.models[atomData.modelIndex].firstAtomIndex;
atomData.lastModelIndex = atomData.firstModelIndex = (this.atomCount == 0 ? 0 : this.atoms[atomData.firstAtomIndex].modelIndex);
atomData.modelName = this.getModelNumberDotted (atomData.firstModelIndex);
Clazz.superCall (this, org.jmol.modelset.ModelCollection, "fillAtomData", [atomData, mode]);
}, "org.jmol.atomdata.AtomData,~N");
Clazz.defineMethod (c$, "getModelNumberDotted", 
function (modelIndex) {
return (this.modelCount < 1 || modelIndex >= this.modelCount || modelIndex < 0 ? "" : org.jmol.util.Escape.escapeModelFileNumber (this.modelFileNumbers[modelIndex]));
}, "~N");
Clazz.defineMethod (c$, "getModelNumber", 
function (modelIndex) {
if (modelIndex == 2147483647) modelIndex = this.modelCount - 1;
return this.modelNumbers[modelIndex];
}, "~N");
Clazz.defineMethod (c$, "getModelFileNumber", 
function (modelIndex) {
return this.modelFileNumbers[modelIndex];
}, "~N");
Clazz.defineMethod (c$, "getModelProperties", 
function (modelIndex) {
return this.models[modelIndex].properties;
}, "~N");
Clazz.defineMethod (c$, "getModelProperty", 
function (modelIndex, property) {
var props = this.models[modelIndex].properties;
return props == null ? null : props.getProperty (property);
}, "~N,~S");
Clazz.defineMethod (c$, "getModelAuxiliaryInfo", 
function (modelIndex) {
return (modelIndex < 0 ? null : this.models[modelIndex].auxiliaryInfo);
}, "~N");
Clazz.defineMethod (c$, "setModelAuxiliaryInfo", 
function (modelIndex, key, value) {
this.models[modelIndex].auxiliaryInfo.put (key, value);
}, "~N,~O,~O");
Clazz.defineMethod (c$, "getModelAuxiliaryInfoValue", 
function (modelIndex, key) {
if (modelIndex < 0) {
return null;
}return this.models[modelIndex].auxiliaryInfo.get (key);
}, "~N,~S");
Clazz.defineMethod (c$, "getModelAuxiliaryInfoBoolean", 
function (modelIndex, keyName) {
var info = this.models[modelIndex].auxiliaryInfo;
return (info != null && info.containsKey (keyName) && (info.get (keyName)).booleanValue ());
}, "~N,~S");
Clazz.defineMethod (c$, "getModelAuxiliaryInfoInt", 
function (modelIndex, keyName) {
var info = this.models[modelIndex].auxiliaryInfo;
if (info != null && info.containsKey (keyName)) {
return (info.get (keyName)).intValue ();
}return -2147483648;
}, "~N,~S");
Clazz.defineMethod (c$, "getModelAtomProperty", 
function (atom, text) {
var data = this.getModelAuxiliaryInfoValue (atom.modelIndex, text);
if (!(Clazz.instanceOf (data, Array))) return "";
var sdata = data;
var iatom = atom.index - this.models[atom.modelIndex].firstAtomIndex;
return (iatom < sdata.length ? sdata[iatom].toString () : "");
}, "org.jmol.modelset.Atom,~S");
Clazz.defineMethod (c$, "getInsertionCountInModel", 
function (modelIndex) {
return this.models[modelIndex].nInsertions;
}, "~N");
Clazz.defineMethod (c$, "getModelFileType", 
function (modelIndex) {
return this.getModelAuxiliaryInfoValue (modelIndex, "fileType");
}, "~N");
c$.modelFileNumberFromFloat = Clazz.defineMethod (c$, "modelFileNumberFromFloat", 
function (fDotM) {
var file = Clazz.doubleToInt (Math.floor (fDotM));
var model = Clazz.doubleToInt (Math.floor ((fDotM - file + 0.00001) * 10000));
while (model != 0 && model % 10 == 0) model /= 10;

return file * 1000000 + model;
}, "~N");
Clazz.defineMethod (c$, "getAltLocCountInModel", 
function (modelIndex) {
return this.models[modelIndex].nAltLocs;
}, "~N");
Clazz.defineMethod (c$, "getChainCount", 
function (addWater) {
var chainCount = 0;
for (var i = this.modelCount; --i >= 0; ) chainCount += this.models[i].getChainCount (addWater);

return chainCount;
}, "~B");
Clazz.defineMethod (c$, "getBioPolymerCount", 
function () {
var polymerCount = 0;
for (var i = this.modelCount; --i >= 0; ) if (!this.isTrajectorySubFrame (i)) polymerCount += this.models[i].getBioPolymerCount ();

return polymerCount;
});
Clazz.defineMethod (c$, "getBioPolymerCountInModel", 
function (modelIndex) {
return (modelIndex < 0 ? this.getBioPolymerCount () : this.isTrajectorySubFrame (modelIndex) ? 0 : this.models[modelIndex].getBioPolymerCount ());
}, "~N");
Clazz.defineMethod (c$, "getPolymerPointsAndVectors", 
function (bs, vList) {
var isTraceAlpha = this.viewer.getTraceAlpha ();
var sheetSmoothing = this.viewer.getSheetSmoothing ();
for (var i = 0; i < this.modelCount; ++i) this.models[i].getPolymerPointsAndVectors (bs, vList, isTraceAlpha, sheetSmoothing);

}, "org.jmol.util.BitSet,java.util.List");
Clazz.defineMethod (c$, "recalculateLeadMidpointsAndWingVectors", 
function (modelIndex) {
if (modelIndex < 0) {
for (var i = 0; i < this.modelCount; i++) this.recalculateLeadMidpointsAndWingVectors (i);

return;
}this.models[modelIndex].recalculateLeadMidpointsAndWingVectors ();
}, "~N");
Clazz.defineMethod (c$, "getPolymerLeadMidPoints", 
function (iModel, iPolymer) {
return this.models[iModel].getPolymerLeadMidPoints (iPolymer);
}, "~N,~N");
Clazz.defineMethod (c$, "getChainCountInModel", 
function (modelIndex, countWater) {
if (modelIndex < 0) return this.getChainCount (countWater);
return this.models[modelIndex].getChainCount (countWater);
}, "~N,~B");
Clazz.defineMethod (c$, "getGroupCount", 
function () {
var groupCount = 0;
for (var i = this.modelCount; --i >= 0; ) groupCount += this.models[i].getGroupCount ();

return groupCount;
});
Clazz.defineMethod (c$, "getGroupCountInModel", 
function (modelIndex) {
if (modelIndex < 0) return this.getGroupCount ();
return this.models[modelIndex].getGroupCount ();
}, "~N");
Clazz.defineMethod (c$, "calcSelectedGroupsCount", 
function (bsSelected) {
for (var i = this.modelCount; --i >= 0; ) this.models[i].calcSelectedGroupsCount (bsSelected);

}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "calcSelectedMonomersCount", 
function (bsSelected) {
for (var i = this.modelCount; --i >= 0; ) this.models[i].calcSelectedMonomersCount (bsSelected);

}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "calcRasmolHydrogenBonds", 
function (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds) {
var isSame = (bsB == null || bsA.equals (bsB));
for (var i = this.modelCount; --i >= 0; ) if (this.models[i].isBioModel && this.models[i].trajectoryBaseIndex == i) {
if (vHBonds == null) {
this.models[i].clearRasmolHydrogenBonds (bsA);
if (!isSame) this.models[i].clearRasmolHydrogenBonds (bsB);
}this.models[i].getRasmolHydrogenBonds (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds);
}
}, "org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~B,~N,~B,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "calculateStraightness", 
function () {
if (this.getHaveStraightness ()) return;
var ctype = 'S';
var qtype = this.viewer.getQuaternionFrame ();
var mStep = this.viewer.getHelixStep ();
for (var i = this.modelCount; --i >= 0; ) this.models[i].calculateStraightness (this.viewer, ctype, qtype, mStep);

this.setHaveStraightness (true);
});
Clazz.defineMethod (c$, "getAtomGroupQuaternions", 
function (bsAtoms, nMax, qtype) {
var n = 0;
var v =  new java.util.ArrayList ();
for (var i = bsAtoms.nextSetBit (0); i >= 0 && n < nMax; i = bsAtoms.nextSetBit (i + 1)) {
var g = this.atoms[i].group;
var q = g.getQuaternion (qtype);
if (q == null) {
if (g.seqcode == -2147483648) q = g.getQuaternionFrame (this.atoms);
if (q == null) continue;
}n++;
v.add (q);
i = g.lastAtomIndex;
}
return v.toArray ( new Array (v.size ()));
}, "org.jmol.util.BitSet,~N,~S");
Clazz.defineMethod (c$, "getPdbAtomData", 
function (bs, sb) {
if (this.atomCount == 0 || bs.nextSetBit (0) < 0) return "";
if (sb == null) sb =  new org.jmol.io.OutputStringBuilder (null);
var iModel = this.atoms[bs.nextSetBit (0)].modelIndex;
var iModelLast = -1;
var isPQR = "PQR".equals (sb.type);
var occTemp = "%6.2Q%6.2b          ";
if (isPQR) {
occTemp = "%8.4P%7.4V       ";
var charge = 0;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) charge += this.atoms[i].getPartialCharge ();

sb.append ("REMARK   1 PQR file generated by Jmol " + org.jmol.viewer.Viewer.getJmolVersion ()).append ("\nREMARK   1 " + "created " + ( new java.util.Date ())).append ("\nREMARK   1 Forcefield Used: unknown\nREMARK   1").append ("\nREMARK   5").append ("\nREMARK   6 Total charge on this protein: " + charge + " e\nREMARK   6\n");
}var lastAtomIndex = bs.length () - 1;
var showModels = (iModel != this.atoms[lastAtomIndex].modelIndex);
var sbCONECT = (showModels ? null :  new org.jmol.util.StringXBuilder ());
var isMultipleBondPDB = this.models[iModel].isPdbWithMultipleBonds;
var tokens;
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var a = this.atoms[i];
if (showModels && a.modelIndex != iModelLast) {
if (iModelLast != -1) sb.append ("ENDMDL\n");
iModelLast = a.modelIndex;
sb.append ("MODEL     " + (iModelLast + 1) + "\n");
}var sa = a.getAtomName ();
var leftJustify = (a.getElementSymbol ().length == 2 || sa.length >= 4 || Character.isDigit (sa.charAt (0)));
var isBiomodel = this.models[a.modelIndex].isBioModel;
var isHetero = a.isHetero ();
if (!isBiomodel) tokens = (leftJustify ? org.jmol.modelset.LabelToken.compile (this.viewer, "HETATM%5.-5i %-4.4a%1AUNK %1c   1%1E   %8.3x%8.3y%8.3z" + occTemp, '\0', null) : org.jmol.modelset.LabelToken.compile (this.viewer, "HETATM%5.-5i  %-3.3a%1AUNK %1c   1%1E   %8.3x%8.3y%8.3z" + occTemp, '\0', null));
 else if (isHetero) tokens = (leftJustify ? org.jmol.modelset.LabelToken.compile (this.viewer, "HETATM%5.-5i %-4.4a%1A%3.-3n %1c%4.-4R%1E   %8.3x%8.3y%8.3z" + occTemp, '\0', null) : org.jmol.modelset.LabelToken.compile (this.viewer, "HETATM%5.-5i  %-3.3a%1A%3.-3n %1c%4.-4R%1E   %8.3x%8.3y%8.3z" + occTemp, '\0', null));
 else tokens = (leftJustify ? org.jmol.modelset.LabelToken.compile (this.viewer, "ATOM  %5.-5i %-4.4a%1A%3.-3n %1c%4.-4R%1E   %8.3x%8.3y%8.3z" + occTemp, '\0', null) : org.jmol.modelset.LabelToken.compile (this.viewer, "ATOM  %5.-5i  %-3.3a%1A%3.-3n %1c%4.-4R%1E   %8.3x%8.3y%8.3z" + occTemp, '\0', null));
var XX = a.getElementSymbolIso (false).toUpperCase ();
sb.append (org.jmol.modelset.LabelToken.formatLabelAtomArray (this.viewer, a, tokens, '\0', null)).append (XX.length == 1 ? " " + XX : XX.substring (0, 2)).append ("  \n");
if (!showModels && (!isBiomodel || isHetero || isMultipleBondPDB)) {
var bonds = a.getBonds ();
if (bonds != null) for (var j = 0; j < bonds.length; j++) {
var iThis = a.getAtomNumber ();
var a2 = bonds[j].getOtherAtom (a);
if (!bs.get (a2.index)) continue;
var n = bonds[j].getCovalentOrder ();
if (n == 1 && isMultipleBondPDB && !isHetero) continue;
var iOther = a2.getAtomNumber ();
switch (n) {
case 2:
case 3:
if (iOther < iThis) continue;
case 1:
sbCONECT.append ("CONECT").append (org.jmol.util.TextFormat.formatStringI ("%5i", "i", iThis));
for (var k = 0; k < n; k++) sbCONECT.append (org.jmol.util.TextFormat.formatStringI ("%5i", "i", iOther));

sbCONECT.appendC ('\n');
break;
}
}
}}
if (showModels) sb.append ("ENDMDL\n");
 else sb.append (sbCONECT.toString ());
return sb.toString ();
}, "org.jmol.util.BitSet,org.jmol.io.OutputStringBuilder");
Clazz.defineMethod (c$, "getPdbData", 
function (modelIndex, type, bsSelected, parameters, sb) {
if (this.isJmolDataFrameForModel (modelIndex)) modelIndex = this.getJmolDataSourceFrame (modelIndex);
if (modelIndex < 0) return "";
var isPDB = this.models[modelIndex].isBioModel;
if (parameters == null && !isPDB) return null;
var model = this.models[modelIndex];
if (sb == null) sb =  new org.jmol.io.OutputStringBuilder (null);
var pdbCONECT =  new org.jmol.util.StringXBuilder ();
var isDraw = (type.indexOf ("draw") >= 0);
var bsAtoms = null;
var bsWritten =  new org.jmol.util.BitSet ();
var ctype = '\u0000';
var tokens = org.jmol.modelset.LabelToken.compile (this.viewer, "ATOM  %-6i%4a%1A%3n %1c%4R%1E   ", '\0', null);
if (parameters == null) {
ctype = (type.length > 11 && type.indexOf ("quaternion ") >= 0 ? type.charAt (11) : 'R');
model.getPdbData (this.viewer, type, ctype, isDraw, bsSelected, sb, tokens, pdbCONECT, bsWritten);
bsAtoms = this.viewer.getModelUndeletedAtomsBitSet (modelIndex);
} else {
bsAtoms = parameters[0];
var dataX = parameters[1];
var dataY = parameters[2];
var dataZ = parameters[3];
var haveZ = (dataZ != null);
var minXYZ = parameters[4];
var maxXYZ = parameters[5];
var factors = parameters[6];
var center = parameters[7];
sb.append ("REMARK   6 Jmol PDB-encoded data: ").append (type).append (";\n");
sb.append ("REMARK   6 Jmol data").append (" min = ").append (org.jmol.util.Escape.escapePt (minXYZ)).append (" max = ").append (org.jmol.util.Escape.escapePt (maxXYZ)).append (" unScaledXyz = xyz * ").append (org.jmol.util.Escape.escapePt (factors)).append (" + ").append (org.jmol.util.Escape.escapePt (center)).append (";\n");
var strExtra = "";
var atomLast = null;
for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1), n++) {
var x = dataX[n];
var y = dataY[n];
var z = (haveZ ? dataZ[n] : 0);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) continue;
var a = this.atoms[i];
sb.append (org.jmol.modelset.LabelToken.formatLabelAtomArray (this.viewer, a, tokens, '\0', null));
if (isPDB) bsWritten.set (i);
sb.append (org.jmol.util.TextFormat.sprintf ("%-8.2f%-8.2f%-10.2f    %6.3f          %2s    %s\n", "ssF", [a.getElementSymbolIso (false).toUpperCase (), strExtra, [x, y, z, 0]]));
if (atomLast != null && atomLast.getPolymerIndexInModel () == a.getPolymerIndexInModel ()) pdbCONECT.append ("CONECT").append (org.jmol.util.TextFormat.formatStringI ("%5i", "i", atomLast.getAtomNumber ())).append (org.jmol.util.TextFormat.formatStringI ("%5i", "i", a.getAtomNumber ())).appendC ('\n');
atomLast = a;
}
}sb.append (pdbCONECT.toString ());
if (isDraw) return sb.toString ();
bsSelected.and (bsAtoms);
if (isPDB) sb.append ("\n\n" + this.getProteinStructureState (bsWritten, false, ctype == 'R', 1));
return sb.toString ();
}, "~N,~S,org.jmol.util.BitSet,~A,org.jmol.io.OutputStringBuilder");
Clazz.defineMethod (c$, "isJmolDataFrameForModel", 
function (modelIndex) {
return (modelIndex >= 0 && modelIndex < this.modelCount && this.models[modelIndex].isJmolDataFrame);
}, "~N");
Clazz.defineMethod (c$, "isJmolDataFrameForAtom", 
($fz = function (atom) {
return (this.models[atom.modelIndex].isJmolDataFrame);
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "setJmolDataFrame", 
function (type, modelIndex, modelDataIndex) {
var model = this.models[type == null ? this.models[modelDataIndex].dataSourceFrame : modelIndex];
if (type == null) {
type = this.models[modelDataIndex].jmolFrameType;
}if (modelIndex >= 0) {
if (model.dataFrames == null) {
model.dataFrames =  new java.util.Hashtable ();
}this.models[modelDataIndex].dataSourceFrame = modelIndex;
this.models[modelDataIndex].jmolFrameType = type;
model.dataFrames.put (type, Integer.$valueOf (modelDataIndex));
}if (type.startsWith ("quaternion") && type.indexOf ("deriv") < 0) {
type = type.substring (0, type.indexOf (" "));
model.dataFrames.put (type, Integer.$valueOf (modelDataIndex));
}}, "~S,~N,~N");
Clazz.defineMethod (c$, "getJmolDataFrameIndex", 
function (modelIndex, type) {
if (this.models[modelIndex].dataFrames == null) {
return -1;
}var index = this.models[modelIndex].dataFrames.get (type);
return (index == null ? -1 : index.intValue ());
}, "~N,~S");
Clazz.defineMethod (c$, "clearDataFrameReference", 
function (modelIndex) {
for (var i = 0; i < this.modelCount; i++) {
var df = this.models[i].dataFrames;
if (df == null) {
continue;
}var e = df.values ().iterator ();
while (e.hasNext ()) {
if ((e.next ()).intValue () == modelIndex) {
e.remove ();
}}
}
}, "~N");
Clazz.defineMethod (c$, "getJmolFrameType", 
function (modelIndex) {
return (modelIndex >= 0 && modelIndex < this.modelCount ? this.models[modelIndex].jmolFrameType : "modelSet");
}, "~N");
Clazz.defineMethod (c$, "getJmolDataSourceFrame", 
function (modelIndex) {
return (modelIndex >= 0 && modelIndex < this.modelCount ? this.models[modelIndex].dataSourceFrame : -1);
}, "~N");
Clazz.defineMethod (c$, "saveModelOrientation", 
function (modelIndex, orientation) {
this.models[modelIndex].orientation = orientation;
}, "~N,org.jmol.viewer.StateManager.Orientation");
Clazz.defineMethod (c$, "getModelOrientation", 
function (modelIndex) {
return this.models[modelIndex].orientation;
}, "~N");
Clazz.defineMethod (c$, "getPDBHeader", 
function (modelIndex) {
return (this.models[modelIndex].isBioModel ? this.models[modelIndex].getFullPDBHeader () : this.getFileHeader (modelIndex));
}, "~N");
Clazz.defineMethod (c$, "getFileHeader", 
function (modelIndex) {
if (modelIndex < 0) return "";
if (this.models[modelIndex].isBioModel) return this.models[modelIndex].getFullPDBHeader ();
var info = this.getModelAuxiliaryInfoValue (modelIndex, "fileHeader");
if (info == null) info = this.modelSetName;
if (info != null) return info;
return "no header information found";
}, "~N");
Clazz.defineMethod (c$, "getLigandInfo", 
function (bsAtoms) {
var info =  new java.util.Hashtable ();
var ligands =  new java.util.ArrayList ();
info.put ("ligands", ligands);
var bsExclude = org.jmol.util.BitSetUtil.copyInvert (bsAtoms, this.atomCount);
bsExclude.or (this.viewer.getAtomBitSet ("solvent"));
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) if (this.atoms[i].isProtein () || this.atoms[i].isNucleic ()) bsExclude.set (i);

var bsModelAtoms =  new Array (this.modelCount);
for (var i = 0; i < this.modelCount; i++) {
bsModelAtoms[i] = this.viewer.getModelUndeletedAtomsBitSet (i);
bsModelAtoms[i].andNot (bsExclude);
}
var molList = org.jmol.util.JmolMolecule.getMolecules (this.atoms, bsModelAtoms, null, bsExclude);
for (var i = 0; i < molList.length; i++) {
var bs = molList[i].atomList;
var ligand =  new java.util.Hashtable ();
ligands.add (ligand);
ligand.put ("atoms", org.jmol.util.Escape.escape (bs));
var names = "";
var sep = "";
var lastGroup = null;
var chainlast = '\u0000';
var reslist = "";
var model = "";
var resnolast = 2147483647;
var resnofirst = 2147483647;
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
var atom = this.atoms[j];
if (lastGroup === atom.group) continue;
lastGroup = atom.group;
var resno = atom.getResno ();
var chain = atom.getChainID ();
if (resnolast != resno - 1) {
if (reslist.length != 0 && resnolast != resnofirst) reslist += "-" + resnolast;
chain = '\1';
resnofirst = resno;
}model = "/" + this.getModelNumberDotted (atom.modelIndex);
if (chainlast != '\0' && chain != chainlast) reslist += ":" + chainlast + model;
if (chain == '\1') reslist += " " + resno;
resnolast = resno;
chainlast = atom.getChainID ();
names += sep + atom.getGroup3 (false);
sep = "-";
}
reslist += (resnofirst == resnolast ? "" : "-" + resnolast) + (chainlast == '\0' ? "" : ":" + chainlast) + model;
ligand.put ("groupNames", names);
ligand.put ("residueList", reslist.substring (1));
}
return info;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getModelInfo", 
function (bsModels) {
var info =  new java.util.Hashtable ();
info.put ("modelSetName", this.modelSetName);
info.put ("modelCount", Integer.$valueOf (this.modelCount));
info.put ("isTainted", Boolean.$valueOf (this.tainted != null));
info.put ("canSkipLoad", Boolean.$valueOf (this.canSkipLoad));
info.put ("modelSetHasVibrationVectors", Boolean.$valueOf (this.modelSetHasVibrationVectors ()));
if (this.modelSetProperties != null) {
info.put ("modelSetProperties", this.modelSetProperties);
}info.put ("modelCountSelected", Integer.$valueOf (org.jmol.util.BitSetUtil.cardinalityOf (bsModels)));
info.put ("modelsSelected", bsModels);
var vModels =  new java.util.ArrayList ();
this.getMolecules ();
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
var model =  new java.util.Hashtable ();
model.put ("_ipt", Integer.$valueOf (i));
model.put ("num", Integer.$valueOf (this.getModelNumber (i)));
model.put ("file_model", this.getModelNumberDotted (i));
model.put ("name", this.getModelName (i));
var s = this.getModelTitle (i);
if (s != null) model.put ("title", s);
s = this.getModelFileName (i);
if (s != null) model.put ("file", s);
s = this.getModelAuxiliaryInfoValue (i, "modelID");
if (s != null) model.put ("id", s);
model.put ("vibrationVectors", Boolean.$valueOf (this.modelHasVibrationVectors (i)));
model.put ("atomCount", Integer.$valueOf (this.models[i].atomCount));
model.put ("bondCount", Integer.$valueOf (this.models[i].getBondCount ()));
model.put ("groupCount", Integer.$valueOf (this.models[i].getGroupCount ()));
model.put ("moleculeCount", Integer.$valueOf (this.models[i].moleculeCount));
model.put ("polymerCount", Integer.$valueOf (this.models[i].getBioPolymerCount ()));
model.put ("chainCount", Integer.$valueOf (this.getChainCountInModel (i, true)));
if (this.models[i].properties != null) {
model.put ("modelProperties", this.models[i].properties);
}var energy = this.getModelAuxiliaryInfoValue (i, "Energy");
if (energy != null) {
model.put ("energy", energy);
}model.put ("atomCount", Integer.$valueOf (this.models[i].atomCount));
vModels.add (model);
}
info.put ("models", vModels);
return info;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAltLocIndexInModel", 
function (modelIndex, alternateLocationID) {
if (alternateLocationID == '\0') {
return 0;
}var altLocList = this.getAltLocListInModel (modelIndex);
if (altLocList.length == 0) {
return 0;
}return altLocList.indexOf (alternateLocationID) + 1;
}, "~N,~S");
Clazz.defineMethod (c$, "getInsertionCodeIndexInModel", 
function (modelIndex, insertionCode) {
if (insertionCode == '\0') return 0;
var codeList = this.getInsertionListInModel (modelIndex);
if (codeList.length == 0) return 0;
return codeList.indexOf (insertionCode) + 1;
}, "~N,~S");
Clazz.defineMethod (c$, "getAltLocListInModel", 
function (modelIndex) {
if (modelIndex < 0) return "";
var str = this.getModelAuxiliaryInfoValue (modelIndex, "altLocs");
return (str == null ? "" : str);
}, "~N");
Clazz.defineMethod (c$, "getInsertionListInModel", 
($fz = function (modelIndex) {
var str = this.getModelAuxiliaryInfoValue (modelIndex, "insertionCodes");
return (str == null ? "" : str);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getModelSymmetryCount", 
function (modelIndex) {
var operations;
return (this.models[modelIndex].biosymmetryCount > 0 || this.unitCells == null || this.unitCells[modelIndex] == null || (operations = this.unitCells[modelIndex].getSymmetryOperations ()) == null ? this.models[modelIndex].biosymmetryCount : operations.length);
}, "~N");
Clazz.defineMethod (c$, "getSymmetryOperation", 
function (modelIndex, spaceGroup, symOp, pt1, pt2, drawID, labelOnly) {
var sginfo = this.getSpaceGroupInfo (modelIndex, spaceGroup, symOp, pt1, pt2, drawID);
if (sginfo == null) return "";
var infolist = sginfo.get ("operations");
if (infolist == null) return "";
var sb =  new org.jmol.util.StringXBuilder ();
symOp--;
for (var i = 0; i < infolist.length; i++) {
if (infolist[i] == null || symOp >= 0 && symOp != i) continue;
if (drawID != null) return infolist[i][3];
if (sb.length () > 0) sb.appendC ('\n');
if (!labelOnly) {
if (symOp < 0) sb.appendI (i + 1).append ("\t");
sb.append (infolist[i][0]).append ("\t");
}sb.append (infolist[i][2]);
}
if (sb.length () == 0 && drawID != null) sb.append ("draw " + drawID + "* delete");
return sb.toString ();
}, "~N,~S,~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~S,~B");
Clazz.defineMethod (c$, "getModelCellRange", 
function (modelIndex) {
if (this.unitCells == null) return null;
return this.unitCells[modelIndex].getCellRange ();
}, "~N");
Clazz.defineMethod (c$, "modelHasVibrationVectors", 
function (modelIndex) {
if (this.vibrationVectors != null) for (var i = this.atomCount; --i >= 0; ) if ((modelIndex < 0 || this.atoms[i].modelIndex == modelIndex) && this.vibrationVectors[i] != null && this.vibrationVectors[i].length () > 0) return true;

return false;
}, "~N");
Clazz.defineMethod (c$, "getElementsPresentBitSet", 
function (modelIndex) {
if (modelIndex >= 0) return this.elementsPresent[modelIndex];
var bs =  new org.jmol.util.BitSet ();
for (var i = 0; i < this.modelCount; i++) bs.or (this.elementsPresent[i]);

return bs;
}, "~N");
Clazz.defineMethod (c$, "getSymmetryInfoAsStringForModel", 
($fz = function (modelIndex) {
var unitCell = this.getUnitCell (modelIndex);
return (unitCell == null ? "no symmetry information" : unitCell.getSymmetryInfoString ());
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getMoleculeInfo", 
function (bsAtoms) {
if (this.moleculeCount == 0) {
this.getMolecules ();
}var V =  new java.util.ArrayList ();
var bsTemp =  new org.jmol.util.BitSet ();
for (var i = 0; i < this.moleculeCount; i++) {
bsTemp = org.jmol.util.BitSetUtil.copy (bsAtoms);
var m = this.molecules[i];
bsTemp.and (m.atomList);
if (bsTemp.length () > 0) {
var info =  new java.util.Hashtable ();
info.put ("mf", m.getMolecularFormula (false));
info.put ("number", Integer.$valueOf (m.moleculeIndex + 1));
info.put ("modelNumber", this.getModelNumberDotted (m.modelIndex));
info.put ("numberInModel", Integer.$valueOf (m.indexInModel + 1));
info.put ("nAtoms", Integer.$valueOf (m.atomCount));
info.put ("nElements", Integer.$valueOf (m.nElements));
V.add (info);
}}
return V;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getMoleculeIndex", 
function (atomIndex, inModel) {
if (this.moleculeCount == 0) this.getMolecules ();
for (var i = 0; i < this.moleculeCount; i++) {
if (this.molecules[i].atomList.get (atomIndex)) return (inModel ? this.molecules[i].indexInModel : i);
}
return 0;
}, "~N,~B");
Clazz.defineMethod (c$, "getMoleculeBitSet", 
function (bs) {
if (this.moleculeCount == 0) this.getMolecules ();
var bsResult = org.jmol.util.BitSetUtil.copy (bs);
var bsInitial = org.jmol.util.BitSetUtil.copy (bs);
var i = 0;
var bsTemp =  new org.jmol.util.BitSet ();
while ((i = bsInitial.length () - 1) >= 0) {
bsTemp = this.getMoleculeBitSetForAtom (i);
if (bsTemp == null) {
bsInitial.clear (i);
bsResult.clear (i);
continue;
}bsInitial.andNot (bsTemp);
bsResult.or (bsTemp);
}
return bsResult;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getMoleculeBitSetForAtom", 
function (atomIndex) {
if (this.moleculeCount == 0) this.getMolecules ();
for (var i = 0; i < this.moleculeCount; i++) if (this.molecules[i].atomList.get (atomIndex)) return this.molecules[i].atomList;

return null;
}, "~N");
Clazz.defineMethod (c$, "getModelDipole", 
function (modelIndex) {
if (modelIndex < 0) return null;
var dipole = this.getModelAuxiliaryInfoValue (modelIndex, "dipole");
if (dipole == null) dipole = this.getModelAuxiliaryInfoValue (modelIndex, "DIPOLE_VEC");
return dipole;
}, "~N");
Clazz.defineMethod (c$, "calculateMolecularDipole", 
function (modelIndex) {
if (this.partialCharges == null || modelIndex < 0) return null;
var nPos = 0;
var nNeg = 0;
var cPos = 0;
var cNeg = 0;
var pos =  new org.jmol.util.Vector3f ();
var neg =  new org.jmol.util.Vector3f ();
for (var i = 0; i < this.atomCount; i++) {
if (this.atoms[i].modelIndex != modelIndex) continue;
var c = this.partialCharges[i];
if (c < 0) {
nNeg++;
cNeg += c;
neg.scaleAdd2 (c, this.atoms[i], neg);
} else if (c > 0) {
nPos++;
cPos += c;
pos.scaleAdd2 (c, this.atoms[i], pos);
}}
if (nNeg == 0 || nPos == 0) return null;
pos.scale (1 / cPos);
neg.scale (1 / cNeg);
pos.sub (neg);
org.jmol.util.Logger.warn ("CalculateMolecularDipole: this is an approximate result -- needs checking");
pos.scale (cPos * 4.8);
return pos;
}, "~N");
Clazz.defineMethod (c$, "getMoleculeCountInModel", 
function (modelIndex) {
var n = 0;
if (this.moleculeCount == 0) this.getMolecules ();
if (modelIndex < 0) return this.moleculeCount;
for (var i = 0; i < this.modelCount; i++) {
if (modelIndex == i) n += this.models[i].moleculeCount;
}
return n;
}, "~N");
Clazz.defineMethod (c$, "calcSelectedMoleculesCount", 
function (bsSelected) {
if (this.moleculeCount == 0) this.getMolecules ();
this.selectedMolecules.xor (this.selectedMolecules);
this.selectedMoleculeCount = 0;
var bsTemp =  new org.jmol.util.BitSet ();
for (var i = 0; i < this.moleculeCount; i++) {
org.jmol.util.BitSetUtil.copy2 (bsSelected, bsTemp);
bsTemp.and (this.molecules[i].atomList);
if (bsTemp.length () > 0) {
this.selectedMolecules.set (i);
this.selectedMoleculeCount++;
}}
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setCentroid", 
function (iAtom0, iAtom1, minmax) {
try {
var uc = this.getUnitCell (this.atoms[iAtom0].modelIndex);
if (uc == null) return;
var bsDelete =  new org.jmol.util.BitSet ();
this.getMolecules ();
var isOneMolecule = (this.molecules[this.moleculeCount - 1].firstAtomIndex == this.models[this.atoms[iAtom1].modelIndex].firstAtomIndex);
var center =  new org.jmol.util.Point3f ();
var centroidPacked = (minmax[6] == 1);
nextMol : for (var i = this.moleculeCount; --i >= 0 && this.molecules[i].firstAtomIndex >= iAtom0 && this.molecules[i].firstAtomIndex < iAtom1; ) {
var bs = this.molecules[i].atomList;
center.set (0, 0, 0);
var n = 0;
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
if (isOneMolecule || centroidPacked) {
center.setT (this.atoms[j]);
if (org.jmol.modelset.ModelCollection.isNotCentroid (center, 1, uc, minmax, centroidPacked)) {
if (isOneMolecule) bsDelete.set (j);
} else if (!isOneMolecule) {
continue nextMol;
}} else {
center.add (this.atoms[j]);
n++;
}}
if (centroidPacked || n > 0 && org.jmol.modelset.ModelCollection.isNotCentroid (center, n, uc, minmax, false)) bsDelete.or (bs);
}
if (bsDelete.nextSetBit (0) >= 0) this.viewer.deleteAtoms (bsDelete, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~N,~N,~A");
c$.isNotCentroid = Clazz.defineMethod (c$, "isNotCentroid", 
($fz = function (center, n, uc, minmax, centroidPacked) {
center.scale (1 / n);
uc.toFractional (center, false);
if (centroidPacked) return (center.x + 0.000005 <= minmax[0] || center.x - 0.000005 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y - 0.000005 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z - 0.000005 > minmax[5]);
return (center.x + 0.000005 <= minmax[0] || center.x + 0.00001 > minmax[3] || center.y + 0.000005 <= minmax[1] || center.y + 0.00001 > minmax[4] || center.z + 0.000005 <= minmax[2] || center.z + 0.00001 > minmax[5]);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f,~N,org.jmol.api.SymmetryInterface,~A,~B");
Clazz.defineMethod (c$, "getMolecules", 
function () {
if (this.moleculeCount > 0) return this.molecules;
if (this.molecules == null) this.molecules =  new Array (4);
this.moleculeCount = 0;
var m = null;
var bsModelAtoms =  new Array (this.modelCount);
var biobranches = null;
for (var i = 0; i < this.modelCount; i++) {
bsModelAtoms[i] = this.viewer.getModelUndeletedAtomsBitSet (i);
m = this.models[i];
m.moleculeCount = 0;
biobranches = m.getBioBranches (biobranches);
}
this.molecules = org.jmol.util.JmolMolecule.getMolecules (this.atoms, bsModelAtoms, biobranches, null);
this.moleculeCount = this.molecules.length;
for (var i = this.moleculeCount; --i >= 0; ) {
m = this.models[this.molecules[i].modelIndex];
m.firstMoleculeIndex = i;
m.moleculeCount++;
}
return this.molecules;
});
Clazz.defineMethod (c$, "initializeBspf", 
function () {
if (this.bspf != null && this.bspf.isInitialized ()) return;
if (this.showRebondTimes) org.jmol.util.Logger.startTimer ("build bspf");
var bspf =  new org.jmol.bspt.Bspf (3);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("sequential bspt order");
var bsNew = org.jmol.util.BitSetUtil.newBitSet (this.modelCount);
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
if (!atom.isDeleted ()) {
bspf.addTuple (this.models[atom.modelIndex].trajectoryBaseIndex, atom);
bsNew.set (atom.modelIndex);
}}
if (this.showRebondTimes) {
org.jmol.util.Logger.checkTimer ("build bspf", false);
bspf.stats ();
}for (var i = bsNew.nextSetBit (0); i >= 0; i = bsNew.nextSetBit (i + 1)) bspf.validateModel (i, true);

bspf.validate (true);
this.bspf = bspf;
});
Clazz.defineMethod (c$, "initializeBspt", 
function (modelIndex) {
this.initializeBspf ();
if (this.bspf.isInitializedIndex (modelIndex)) return;
this.bspf.initialize (modelIndex, this.atoms, this.viewer.getModelUndeletedAtomsBitSet (modelIndex));
}, "~N");
Clazz.defineMethod (c$, "setIteratorForPoint", 
function (iterator, modelIndex, pt, distance) {
if (modelIndex < 0) {
iterator.setCenter (pt, distance);
return;
}this.initializeBspt (modelIndex);
iterator.setModel (this, modelIndex, this.models[modelIndex].firstAtomIndex, 2147483647, pt, distance, null);
}, "org.jmol.api.AtomIndexIterator,~N,org.jmol.util.Point3f,~N");
Clazz.defineMethod (c$, "setIteratorForAtom", 
function (iterator, modelIndex, atomIndex, distance, rd) {
if (modelIndex < 0) modelIndex = this.atoms[atomIndex].modelIndex;
modelIndex = this.models[modelIndex].trajectoryBaseIndex;
this.initializeBspt (modelIndex);
iterator.setModel (this, modelIndex, this.models[modelIndex].firstAtomIndex, atomIndex, this.atoms[atomIndex], distance, rd);
}, "org.jmol.api.AtomIndexIterator,~N,~N,~N,org.jmol.atomdata.RadiusData");
Clazz.defineMethod (c$, "getSelectedAtomIterator", 
function (bsSelected, isGreaterOnly, modelZeroBased, hemisphereOnly, isMultiModel) {
this.initializeBspf ();
var iter;
if (isMultiModel) {
var bsModels = this.getModelBitSet (bsSelected, false);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) this.initializeBspt (i);

iter =  new org.jmol.modelset.AtomIteratorWithinModelSet (bsModels);
} else {
iter =  new org.jmol.modelset.AtomIteratorWithinModel ();
}iter.initialize (this.bspf, bsSelected, isGreaterOnly, modelZeroBased, hemisphereOnly, this.viewer.isParallel ());
return iter;
}, "org.jmol.util.BitSet,~B,~B,~B,~B");
Clazz.overrideMethod (c$, "getBondCountInModel", 
function (modelIndex) {
return (modelIndex < 0 ? this.bondCount : this.models[modelIndex].getBondCount ());
}, "~N");
Clazz.defineMethod (c$, "calculateStruts", 
function (bs1, bs2) {
this.makeConnections (0, 3.4028235E38, 32768, 12291, bs1, bs2, null, false, false, 0);
var iAtom = bs1.nextSetBit (0);
if (iAtom < 0) return 0;
var model = this.models[this.atoms[iAtom].modelIndex];
return (model.isBioModel ? model.calculateStruts (this, bs1, bs2) : 0);
}, "org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomCountInModel", 
function (modelIndex) {
return (modelIndex < 0 ? this.atomCount : this.models[modelIndex].atomCount);
}, "~N");
Clazz.defineMethod (c$, "getModelAtomBitSetIncludingDeletedBs", 
function (bsModels) {
var bs =  new org.jmol.util.BitSet ();
if (bsModels == null && this.bsAll == null) this.bsAll = org.jmol.util.BitSetUtil.setAll (this.atomCount);
if (bsModels == null) bs.or (this.bsAll);
 else for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) bs.or (this.getModelAtomBitSetIncludingDeleted (i, false));

return bs;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getModelAtomBitSetIncludingDeleted", 
function (modelIndex, asCopy) {
var bs = (modelIndex < 0 ? this.bsAll : this.models[modelIndex].bsAtoms);
if (bs == null) bs = this.bsAll = org.jmol.util.BitSetUtil.setAll (this.atomCount);
return (asCopy ? org.jmol.util.BitSetUtil.copy (bs) : bs);
}, "~N,~B");
Clazz.defineMethod (c$, "getAtomBits", 
function (tokType, specInfo) {
return org.jmol.util.BitSetUtil.andNot (this.getAtomBitsMaybeDeleted (tokType, specInfo), this.viewer.getDeletedAtoms ());
}, "~N,~O");
Clazz.defineMethod (c$, "getAtomBitsMaybeDeleted", 
function (tokType, specInfo) {
var info;
var bs;
var pt;
switch (tokType) {
default:
return Clazz.superCall (this, org.jmol.modelset.ModelCollection, "getAtomBitsMaybeDeleted", [tokType, specInfo]);
case 1073741864:
return this.getBasePairBits (specInfo);
case 1679429641:
var boxInfo = this.getBoxInfo (specInfo, 1);
bs = this.getAtomsWithin (boxInfo.getBoundBoxCornerVector ().length () + 0.0001, boxInfo.getBoundBoxCenter (), null, -1);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) if (!boxInfo.isWithin (this.atoms[i])) bs.clear (i);

return bs;
case 1095761934:
return this.getMoleculeBitSet (specInfo);
case 1087373320:
return this.getSequenceBits (specInfo, null);
case 1048615:
info = specInfo;
var seqcodeA = info[0];
var seqcodeB = info[1];
var chainID = String.fromCharCode (info[2]);
bs =  new org.jmol.util.BitSet ();
var caseSensitive = this.viewer.getChainCaseSensitive ();
if (!caseSensitive) chainID = Character.toUpperCase (chainID);
for (var i = this.modelCount; --i >= 0; ) if (this.models[i].isBioModel) this.models[i].selectSeqcodeRange (seqcodeA, seqcodeB, chainID, bs, caseSensitive);

return bs;
case 3145772:
bs = org.jmol.util.BitSetUtil.newBitSet (this.atomCount);
var modelIndex = -1;
var nOps = 0;
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
var bsSym = atom.getAtomSymmetry ();
if (bsSym != null) {
if (atom.modelIndex != modelIndex) {
modelIndex = atom.modelIndex;
if (this.getModelCellRange (modelIndex) == null) continue;
nOps = this.getModelSymmetryCount (modelIndex);
}var n = 0;
for (var j = nOps; --j >= 0; ) if (bsSym.get (j)) if (++n > 1) {
bs.set (i);
break;
}
}}
return bs;
case 1089470478:
return org.jmol.util.BitSetUtil.copy (this.bsSymmetry == null ? this.bsSymmetry = org.jmol.util.BitSetUtil.newBitSet (this.atomCount) : this.bsSymmetry);
case 1614417948:
bs =  new org.jmol.util.BitSet ();
var unitcell = this.viewer.getCurrentUnitCell ();
if (unitcell == null) return bs;
var cell = org.jmol.util.Point3f.new3 (1, 1, 1);
pt =  new org.jmol.util.Point3f ();
for (var i = this.atomCount; --i >= 0; ) if (this.isInLatticeCell (i, cell, pt, false)) bs.set (i);

return bs;
case 1095761925:
bs =  new org.jmol.util.BitSet ();
info = specInfo;
var ptcell = org.jmol.util.Point3f.new3 (info[0] / 1000, info[1] / 1000, info[2] / 1000);
pt =  new org.jmol.util.Point3f ();
var isAbsolute = !this.viewer.getFractionalRelative ();
for (var i = this.atomCount; --i >= 0; ) if (this.isInLatticeCell (i, ptcell, pt, isAbsolute)) bs.set (i);

return bs;
}
}, "~N,~O");
Clazz.defineMethod (c$, "isInLatticeCell", 
($fz = function (i, cell, pt, isAbsolute) {
var iModel = this.atoms[i].modelIndex;
var uc = this.getUnitCell (iModel);
if (uc == null) return false;
pt.setT (this.atoms[i]);
uc.toFractional (pt, isAbsolute);
var slop = 0.02;
if (pt.x < cell.x - 1 - slop || pt.x > cell.x + slop) return false;
if (pt.y < cell.y - 1 - slop || pt.y > cell.y + slop) return false;
if (pt.z < cell.z - 1 - slop || pt.z > cell.z + slop) return false;
return true;
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~B");
Clazz.defineMethod (c$, "getAtomsWithinBs", 
function (distance, bs, withinAllModels, rd) {
var bsResult =  new org.jmol.util.BitSet ();
var bsCheck = this.getIterativeModels (false);
bs = org.jmol.util.BitSetUtil.andNot (bs, this.viewer.getDeletedAtoms ());
var iter = this.getSelectedAtomIterator (null, false, false, false, false);
if (withinAllModels) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) for (var iModel = this.modelCount; --iModel >= 0; ) {
if (!bsCheck.get (iModel)) continue;
if (distance < 0) {
this.getAtomsWithin (distance, this.atoms[i].getFractionalUnitCoordPt (true), bsResult, -1);
continue;
}this.setIteratorForAtom (iter, iModel, i, distance, rd);
iter.addAtoms (bsResult);
}

} else {
bsResult.or (bs);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (distance < 0) {
this.getAtomsWithin (distance, this.atoms[i], bsResult, this.atoms[i].modelIndex);
continue;
}this.setIteratorForAtom (iter, -1, i, distance, rd);
iter.addAtoms (bsResult);
}
}iter.release ();
return bsResult;
}, "~N,org.jmol.util.BitSet,~B,org.jmol.atomdata.RadiusData");
Clazz.defineMethod (c$, "getGroupsWithin", 
function (nResidues, bs) {
var bsCheck = this.getIterativeModels (false);
var bsResult =  new org.jmol.util.BitSet ();
for (var iModel = this.modelCount; --iModel >= 0; ) {
if (!bsCheck.get (iModel) || !this.models[iModel].isBioModel) continue;
this.models[iModel].getGroupsWithin (nResidues, bs, bsResult);
}
return bsResult;
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomsWithin", 
function (distance, coord, bsResult, modelIndex) {
if (bsResult == null) bsResult =  new org.jmol.util.BitSet ();
if (distance < 0) {
distance = -distance;
var ptTemp1 =  new org.jmol.util.Point3f ();
var ptTemp2 =  new org.jmol.util.Point3f ();
for (var i = this.atomCount; --i >= 0; ) {
var atom = this.atoms[i];
if (modelIndex >= 0 && this.atoms[i].modelIndex != modelIndex) continue;
if (!bsResult.get (i) && atom.getFractionalUnitDistance (coord, ptTemp1, ptTemp2) <= distance) bsResult.set (atom.index);
}
return bsResult;
}var bsCheck = this.getIterativeModels (true);
var iter = this.getSelectedAtomIterator (null, false, false, false, false);
for (var iModel = this.modelCount; --iModel >= 0; ) {
if (!bsCheck.get (iModel)) continue;
this.setIteratorForAtom (iter, -1, this.models[iModel].firstAtomIndex, -1, null);
iter.setCenter (coord, distance);
iter.addAtoms (bsResult);
}
iter.release ();
return bsResult;
}, "~N,org.jmol.util.Point3f,org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "getBasePairInfo", 
($fz = function (bs) {
var info =  new org.jmol.util.StringXBuilder ();
var vHBonds =  new java.util.ArrayList ();
this.calcRasmolHydrogenBonds (bs, bs, vHBonds, true, 1, false, null);
for (var i = vHBonds.size (); --i >= 0; ) {
var b = vHBonds.get (i);
org.jmol.modelset.ModelCollection.getAtomResidueInfo (info, b.atom1);
info.append (" - ");
org.jmol.modelset.ModelCollection.getAtomResidueInfo (info, b.atom2);
info.append ("\n");
}
return info.toString ();
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet");
c$.getAtomResidueInfo = Clazz.defineMethod (c$, "getAtomResidueInfo", 
($fz = function (info, atom) {
info.append ("[").append (atom.getGroup3 (false)).append ("]").append (atom.getSeqcodeString ()).append (":");
var id = atom.getChainID ();
info.append (id == '\0' ? " " : "" + id);
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "getBasePairBits", 
($fz = function (specInfo) {
var bs =  new org.jmol.util.BitSet ();
if (specInfo.length % 2 != 0) return bs;
var bsA = null;
var bsB = null;
var vHBonds =  new java.util.ArrayList ();
if (specInfo.length == 0) {
bsA = bsB = this.viewer.getModelUndeletedAtomsBitSet (-1);
this.calcRasmolHydrogenBonds (bsA, bsB, vHBonds, true, 1, false, null);
} else {
for (var i = 0; i < specInfo.length; ) {
bsA = this.getSequenceBits (specInfo.substring (i, ++i), null);
if (bsA.cardinality () == 0) continue;
bsB = this.getSequenceBits (specInfo.substring (i, ++i), null);
if (bsB.cardinality () == 0) continue;
this.calcRasmolHydrogenBonds (bsA, bsB, vHBonds, true, 1, false, null);
}
}var bsAtoms =  new org.jmol.util.BitSet ();
for (var i = vHBonds.size (); --i >= 0; ) {
var b = vHBonds.get (i);
bsAtoms.set (b.atom1.index);
bsAtoms.set (b.atom2.index);
}
return Clazz.superCall (this, org.jmol.modelset.ModelCollection, "getAtomBitsMaybeDeleted", [1087373318, bsAtoms]);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getSequenceBits", 
function (specInfo, bs) {
if (bs == null) bs = this.viewer.getModelUndeletedAtomsBitSet (-1);
var bsResult =  new org.jmol.util.BitSet ();
if (specInfo.length > 0) for (var i = 0; i < this.modelCount; ++i) if (this.models[i].isBioModel) this.models[i].getSequenceBits (specInfo, bs, bsResult);

return bsResult;
}, "~S,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "deleteBonds", 
function (bsBonds, isFullModel) {
if (!isFullModel) {
var bsA =  new org.jmol.util.BitSet ();
var bsB =  new org.jmol.util.BitSet ();
for (var i = bsBonds.nextSetBit (0); i >= 0; i = bsBonds.nextSetBit (i + 1)) {
var atom1 = this.bonds[i].atom1;
if (this.models[atom1.modelIndex].isModelKit) continue;
bsA.clearAll ();
bsB.clearAll ();
bsA.set (atom1.index);
bsB.set (this.bonds[i].getAtomIndex2 ());
this.addStateScript ("connect ", null, bsA, bsB, "delete", false, true);
}
}Clazz.superCall (this, org.jmol.modelset.ModelCollection, "deleteBonds", [bsBonds, isFullModel]);
}, "org.jmol.util.BitSet,~B");
Clazz.defineMethod (c$, "makeConnections", 
function (minDistance, maxDistance, order, connectOperation, bsA, bsB, bsBonds, isBonds, addGroup, energy) {
if (bsBonds == null) bsBonds =  new org.jmol.util.BitSet ();
var matchAny = (order == 65535);
var matchNull = (order == 131071);
if (matchNull) order = 1;
var matchHbond = org.jmol.modelset.Bond.isHydrogen (order);
var identifyOnly = false;
var modifyOnly = false;
var createOnly = false;
var autoAromatize = false;
var minDistanceSquared = minDistance * minDistance;
var maxDistanceSquared = maxDistance * maxDistance;
switch (connectOperation) {
case 12291:
return this.deleteConnections (minDistance, maxDistance, order, bsA, bsB, isBonds, matchNull, minDistanceSquared, maxDistanceSquared);
case 603979874:
case 1073741852:
if (order != 515) return this.autoBond (bsA, bsB, bsBonds, isBonds, matchHbond, connectOperation == 603979874);
modifyOnly = true;
autoAromatize = true;
break;
case 1087373321:
identifyOnly = true;
break;
case 1073742025:
modifyOnly = true;
break;
case 1073741904:
createOnly = true;
break;
}
this.defaultCovalentMad = this.viewer.getMadBond ();
var minDistanceIsFractionRadius = (minDistance < 0);
var maxDistanceIsFractionRadius = (maxDistance < 0);
if (minDistanceIsFractionRadius) minDistance = -minDistance;
if (maxDistanceIsFractionRadius) maxDistance = -maxDistance;
var mad = this.getDefaultMadFromOrder (order);
var nNew = 0;
var nModified = 0;
var bondAB = null;
var m = (isBonds ? 1 : this.atomCount);
var atomA = null;
var atomB = null;
var dAB = 0;
var dABcalc = 0;
var newOrder = (order | 131072);
for (var iA = bsA.nextSetBit (0); iA >= 0; iA = bsA.nextSetBit (iA + 1)) {
if (isBonds) {
bondAB = this.bonds[iA];
atomA = bondAB.atom1;
atomB = bondAB.atom2;
} else {
atomA = this.atoms[iA];
if (atomA.isDeleted ()) continue;
}for (var iB = (isBonds ? m : bsB.nextSetBit (0)); iB >= 0; iB = (isBonds ? iB - 1 : bsB.nextSetBit (iB + 1))) {
if (!isBonds) {
if (iB == iA) continue;
atomB = this.atoms[iB];
if (atomA.modelIndex != atomB.modelIndex || atomB.isDeleted ()) continue;
if (atomA.alternateLocationID != atomB.alternateLocationID && atomA.alternateLocationID != '\0' && atomB.alternateLocationID != '\0') continue;
bondAB = atomA.getBond (atomB);
}if (bondAB == null && (identifyOnly || modifyOnly) || bondAB != null && createOnly) continue;
var distanceSquared = atomA.distanceSquared (atomB);
if (minDistanceIsFractionRadius || maxDistanceIsFractionRadius) {
dAB = atomA.distance (atomB);
dABcalc = atomA.getBondingRadiusFloat () + atomB.getBondingRadiusFloat ();
}if ((minDistanceIsFractionRadius ? dAB < dABcalc * minDistance : distanceSquared < minDistanceSquared) || (maxDistanceIsFractionRadius ? dAB > dABcalc * maxDistance : distanceSquared > maxDistanceSquared)) continue;
if (bondAB != null) {
if (!identifyOnly && !matchAny) {
bondAB.setOrder (order);
this.bsAromatic.clear (bondAB.index);
}if (!identifyOnly || matchAny || order == bondAB.order || newOrder == bondAB.order || matchHbond && bondAB.isHydrogen ()) {
bsBonds.set (bondAB.index);
nModified++;
}} else {
bsBonds.set (this.bondAtoms (atomA, atomB, order, mad, bsBonds, energy, addGroup, true).index);
nNew++;
}}
}
if (autoAromatize) this.assignAromaticBondsBs (true, bsBonds);
if (!identifyOnly) this.shapeManager.setShapeSizeBs (1, -2147483648, null, bsBonds);
return [nNew, nModified];
}, "~N,~N,~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~N");
Clazz.defineMethod (c$, "autoBondBs4", 
function (bsA, bsB, bsExclude, bsBonds, mad, preJmol11_9_24) {
if (preJmol11_9_24) return this.autoBond_Pre_11_9_24 (bsA, bsB, bsExclude, bsBonds, mad);
if (this.atomCount == 0) return 0;
if (mad == 0) mad = 1;
if (this.maxBondingRadius == 1.4E-45) this.findMaxRadii ();
var bondTolerance = this.viewer.getBondTolerance ();
var minBondDistance = this.viewer.getMinBondDistance ();
var minBondDistance2 = minBondDistance * minBondDistance;
var nNew = 0;
if (this.showRebondTimes) org.jmol.util.Logger.startTimer ("autobond");
var lastModelIndex = -1;
var isAll = (bsA == null);
var bsCheck;
var i0;
if (isAll) {
i0 = 0;
bsCheck = null;
} else {
if (bsA.equals (bsB)) {
bsCheck = bsA;
} else {
bsCheck = org.jmol.util.BitSetUtil.copy (bsA);
bsCheck.or (bsB);
}i0 = bsCheck.nextSetBit (0);
}var iter = this.getSelectedAtomIterator (null, false, false, true, false);
for (var i = i0; i >= 0 && i < this.atomCount; i = (isAll ? i + 1 : bsCheck.nextSetBit (i + 1))) {
var isAtomInSetA = (isAll || bsA.get (i));
var isAtomInSetB = (isAll || bsB.get (i));
var atom = this.atoms[i];
if (atom.isDeleted ()) continue;
var modelIndex = atom.modelIndex;
if (modelIndex != lastModelIndex) {
lastModelIndex = modelIndex;
if (this.isJmolDataFrameForModel (modelIndex)) {
i = this.models[modelIndex].firstAtomIndex + this.models[modelIndex].atomCount - 1;
continue;
}}var myBondingRadius = atom.getBondingRadiusFloat ();
if (myBondingRadius == 0) continue;
var isFirstExcluded = (bsExclude != null && bsExclude.get (i));
var searchRadius = myBondingRadius + this.maxBondingRadius + bondTolerance;
this.setIteratorForAtom (iter, -1, i, searchRadius, null);
while (iter.hasNext ()) {
var atomNear = this.atoms[iter.next ()];
if (atomNear.isDeleted ()) continue;
var atomIndexNear = atomNear.index;
var isNearInSetA = (isAll || bsA.get (atomIndexNear));
var isNearInSetB = (isAll || bsB.get (atomIndexNear));
if (!isNearInSetA && !isNearInSetB || !(isAtomInSetA && isNearInSetB || isAtomInSetB && isNearInSetA) || isFirstExcluded && bsExclude.get (atomIndexNear)) continue;
var order = org.jmol.modelset.BondCollection.getBondOrder (myBondingRadius, atomNear.getBondingRadiusFloat (), iter.foundDistance2 (), minBondDistance2, bondTolerance);
if (order > 0 && this.checkValencesAndBond (atom, atomNear, order, mad, bsBonds)) nNew++;
}
iter.release ();
}
if (this.showRebondTimes) org.jmol.util.Logger.checkTimer ("autoBond", false);
return nNew;
}, "org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,~N,~B");
Clazz.defineMethod (c$, "autoBond_Pre_11_9_24", 
($fz = function (bsA, bsB, bsExclude, bsBonds, mad) {
if (this.atomCount == 0) return 0;
if (mad == 0) mad = 1;
if (this.maxBondingRadius == 1.4E-45) this.findMaxRadii ();
var bondTolerance = this.viewer.getBondTolerance ();
var minBondDistance = this.viewer.getMinBondDistance ();
var minBondDistance2 = minBondDistance * minBondDistance;
var nNew = 0;
this.initializeBspf ();
var lastModelIndex = -1;
for (var i = this.atomCount; --i >= 0; ) {
var isAtomInSetA = (bsA == null || bsA.get (i));
var isAtomInSetB = (bsB == null || bsB.get (i));
if (!isAtomInSetA && !isAtomInSetB) continue;
var atom = this.atoms[i];
if (atom.isDeleted ()) continue;
var modelIndex = atom.modelIndex;
if (modelIndex != lastModelIndex) {
lastModelIndex = modelIndex;
if (this.isJmolDataFrameForModel (modelIndex)) {
for (; --i >= 0; ) if (this.atoms[i].modelIndex != modelIndex) break;

i++;
continue;
}}var myBondingRadius = atom.getBondingRadiusFloat ();
if (myBondingRadius == 0) continue;
var searchRadius = myBondingRadius + this.maxBondingRadius + bondTolerance;
this.initializeBspt (modelIndex);
var iter = this.bspf.getCubeIterator (modelIndex);
iter.initialize (atom, searchRadius, true);
while (iter.hasMoreElements ()) {
var atomNear = iter.nextElement ();
if (atomNear === atom || atomNear.isDeleted ()) continue;
var atomIndexNear = atomNear.index;
var isNearInSetA = (bsA == null || bsA.get (atomIndexNear));
var isNearInSetB = (bsB == null || bsB.get (atomIndexNear));
if (!isNearInSetA && !isNearInSetB || bsExclude != null && bsExclude.get (atomIndexNear) && bsExclude.get (i)) continue;
if (!(isAtomInSetA && isNearInSetB || isAtomInSetB && isNearInSetA)) continue;
var order = org.jmol.modelset.BondCollection.getBondOrder (myBondingRadius, atomNear.getBondingRadiusFloat (), iter.foundDistance2 (), minBondDistance2, bondTolerance);
if (order > 0) {
if (this.checkValencesAndBond (atom, atomNear, order, mad, bsBonds)) nNew++;
}}
iter.release ();
}
return nNew;
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "autoBond", 
($fz = function (bsA, bsB, bsBonds, isBonds, matchHbond, legacyAutoBond) {
if (isBonds) {
var bs = bsA;
bsA =  new org.jmol.util.BitSet ();
bsB =  new org.jmol.util.BitSet ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
bsA.set (this.bonds[i].atom1.index);
bsB.set (this.bonds[i].atom2.index);
}
}return [matchHbond ? this.autoHbond (bsA, bsB, false) : this.autoBondBs4 (bsA, bsB, null, bsBonds, this.viewer.getMadBond (), legacyAutoBond), 0];
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~B");
Clazz.defineMethod (c$, "autoHbond", 
function (bsA, bsB, onlyIfHaveCalculated) {
if (onlyIfHaveCalculated) {
var bsModels = this.getModelBitSet (bsA, false);
for (var i = bsModels.nextSetBit (0); i >= 0 && onlyIfHaveCalculated; i = bsModels.nextSetBit (i + 1)) onlyIfHaveCalculated = !this.models[i].hasRasmolHBonds;

if (onlyIfHaveCalculated) return 0;
}var haveHAtoms = false;
for (var i = bsA.nextSetBit (0); i >= 0; i = bsA.nextSetBit (i + 1)) if (this.atoms[i].getElementNumber () == 1) {
haveHAtoms = true;
break;
}
var bsHBonds =  new org.jmol.util.BitSet ();
var useRasMol = this.viewer.getHbondsRasmol ();
if (bsB == null || useRasMol && !haveHAtoms) {
org.jmol.util.Logger.info ((bsB == null ? "DSSP " : "RasMol") + " pseudo-hbond calculation");
this.calcRasmolHydrogenBonds (bsA, bsB, null, false, 2147483647, false, bsHBonds);
return -org.jmol.util.BitSetUtil.cardinalityOf (bsHBonds);
}org.jmol.util.Logger.info (haveHAtoms ? "Standard Hbond calculation" : "Jmol pseudo-hbond calculation");
var bsCO = null;
if (!haveHAtoms) {
bsCO =  new org.jmol.util.BitSet ();
for (var i = bsA.nextSetBit (0); i >= 0; i = bsA.nextSetBit (i + 1)) {
var atomID = this.atoms[i].atomID;
switch (atomID) {
case 64:
case 4:
case 14:
case 15:
case 16:
case 17:
bsCO.set (i);
break;
}
}
}var maxXYDistance = this.viewer.getHbondsDistanceMax ();
var minAttachedAngle = (this.viewer.getHbondsAngleMin () * 3.141592653589793 / 180);
var hbondMax2 = maxXYDistance * maxXYDistance;
var hbondMin2 = org.jmol.modelset.ModelCollection.hbondMin * org.jmol.modelset.ModelCollection.hbondMin;
var hxbondMin2 = 1;
var hxbondMax2 = (maxXYDistance > org.jmol.modelset.ModelCollection.hbondMin ? hbondMin2 : hbondMax2);
var hxbondMax = (maxXYDistance > org.jmol.modelset.ModelCollection.hbondMin ? org.jmol.modelset.ModelCollection.hbondMin : maxXYDistance);
var nNew = 0;
var d2 = 0;
var v1 =  new org.jmol.util.Vector3f ();
var v2 =  new org.jmol.util.Vector3f ();
if (this.showRebondTimes && org.jmol.util.Logger.debugging) org.jmol.util.Logger.startTimer ("hbond");
var C = null;
var D = null;
var iter = this.getSelectedAtomIterator (bsB, false, false, false, false);
for (var i = bsA.nextSetBit (0); i >= 0; i = bsA.nextSetBit (i + 1)) {
var atom = this.atoms[i];
var elementNumber = atom.getElementNumber ();
var isH = (elementNumber == 1);
if (!isH && (haveHAtoms || elementNumber != 7 && elementNumber != 8) || isH && !haveHAtoms) continue;
var min2;
var max2;
var dmax;
var firstIsCO;
if (isH) {
var b = atom.bonds;
if (b == null) continue;
var isOK = false;
for (var j = 0; j < b.length && !isOK; j++) {
var a2 = b[j].getOtherAtom (atom);
var element = a2.getElementNumber ();
isOK = (element == 7 || element == 8);
}
if (!isOK) continue;
dmax = hxbondMax;
min2 = hxbondMin2;
max2 = hxbondMax2;
firstIsCO = false;
} else {
dmax = maxXYDistance;
min2 = hbondMin2;
max2 = hbondMax2;
firstIsCO = bsCO.get (i);
}this.setIteratorForAtom (iter, -1, atom.index, dmax, null);
while (iter.hasNext ()) {
var atomNear = this.atoms[iter.next ()];
var elementNumberNear = atomNear.getElementNumber ();
if (atomNear === atom || !isH && elementNumberNear != 7 && elementNumberNear != 8 || isH && elementNumberNear == 1 || (d2 = iter.foundDistance2 ()) < min2 || d2 > max2 || firstIsCO && bsCO.get (atomNear.index) || atom.isBonded (atomNear)) {
continue;
}if (minAttachedAngle > 0) {
v1.sub2 (atom, atomNear);
if ((D = org.jmol.modelset.ModelCollection.checkMinAttachedAngle (atom, minAttachedAngle, v1, v2, haveHAtoms)) == null) continue;
v1.scale (-1);
if ((C = org.jmol.modelset.ModelCollection.checkMinAttachedAngle (atomNear, minAttachedAngle, v1, v2, haveHAtoms)) == null) continue;
}var energy = 0;
var bo;
if (isH && !Float.isNaN (C.x) && !Float.isNaN (D.x)) {
bo = 4096;
energy = org.jmol.modelset.HBond.getEnergy (Math.sqrt (d2), C.distance (atom), C.distance (D), atomNear.distance (D)) / 1000;
} else {
bo = 2048;
}bsHBonds.set (this.addHBond (atom, atomNear, bo, energy));
nNew++;
}
}
iter.release ();
this.shapeManager.setShapeSizeBs (1, -2147483648, null, bsHBonds);
if (this.showRebondTimes) org.jmol.util.Logger.checkTimer ("hbond", false);
return (haveHAtoms ? nNew : -nNew);
}, "org.jmol.util.BitSet,org.jmol.util.BitSet,~B");
c$.checkMinAttachedAngle = Clazz.defineMethod (c$, "checkMinAttachedAngle", 
($fz = function (atom1, minAngle, v1, v2, haveHAtoms) {
var bonds = atom1.bonds;
if (bonds == null || bonds.length == 0) return org.jmol.util.Point3f.new3 (NaN, 0, 0);
var X = null;
var dMin = 3.4028235E38;
for (var i = bonds.length; --i >= 0; ) if (bonds[i].isCovalent ()) {
var atomA = bonds[i].getOtherAtom (atom1);
if (!haveHAtoms && atomA.getElementNumber () == 1) continue;
v2.sub2 (atom1, atomA);
var d = v2.angle (v1);
if (d < minAngle) return null;
if (d < dMin) {
X = atomA;
dMin = d;
}}
return X;
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,~N,org.jmol.util.Vector3f,org.jmol.util.Vector3f,~B");
Clazz.defineMethod (c$, "setStructureIndexes", 
function () {
var id;
var idnew = 0;
var lastid = -1;
var imodel = -1;
var lastmodel = -1;
for (var i = 0; i < this.atomCount; i++) {
if ((imodel = this.atoms[i].modelIndex) != lastmodel) {
idnew = 0;
lastmodel = imodel;
lastid = -1;
}if ((id = this.atoms[i].getStrucNo ()) != lastid && id != 0) {
this.atoms[i].getGroup ().setStrucNo (++idnew);
lastid = idnew;
}}
});
Clazz.defineMethod (c$, "getProteinStructureState", 
function (bsAtoms, taintedOnly, needPhiPsi, mode) {
if (!this.isPDB) return "";
for (var i = 0; i < this.modelCount; i++) if (this.models[i].isBioModel) return this.models[i].getProteinStructureState (bsAtoms, taintedOnly, needPhiPsi, mode);

return "";
}, "org.jmol.util.BitSet,~B,~B,~N");
Clazz.defineMethod (c$, "getModelInfoAsString", 
function () {
var sb =  new org.jmol.util.StringXBuilder ().append ("<models count=\"");
sb.appendI (this.modelCount).append ("\" modelSetHasVibrationVectors=\"").append (this.modelSetHasVibrationVectors () + "\">\n<properties>");
if (this.modelSetProperties != null) {
var e = this.modelSetProperties.propertyNames ();
while (e.hasMoreElements ()) {
var propertyName = e.nextElement ();
sb.append ("\n <property name=\"").append (propertyName).append ("\" value=").append (org.jmol.util.Escape.escapeStr (this.modelSetProperties.getProperty (propertyName))).append (" />");
}
sb.append ("\n</properties>");
}for (var i = 0; i < this.modelCount; ++i) {
sb.append ("\n<model index=\"").appendI (i).append ("\" n=\"").append (this.getModelNumberDotted (i)).append ("\" id=").append (org.jmol.util.Escape.escapeStr ("" + this.getModelAuxiliaryInfoValue (i, "modelID")));
var ib = this.getBaseModelIndex (i);
if (ib != i) sb.append (" baseModelId=").append (org.jmol.util.Escape.escape (this.getModelAuxiliaryInfoValue (ib, "jdxModelID")));
sb.append (" name=").append (org.jmol.util.Escape.escapeStr (this.getModelName (i))).append (" title=").append (org.jmol.util.Escape.escapeStr (this.getModelTitle (i))).append (" hasVibrationVectors=\"").appendB (this.modelHasVibrationVectors (i)).append ("\" />");
}
sb.append ("\n</models>");
return sb.toString ();
});
Clazz.defineMethod (c$, "getSymmetryInfoAsString", 
function () {
var sb =  new org.jmol.util.StringXBuilder ().append ("Symmetry Information:");
for (var i = 0; i < this.modelCount; ++i) sb.append ("\nmodel #").append (this.getModelNumberDotted (i)).append ("; name=").append (this.getModelName (i)).append ("\n").append (this.getSymmetryInfoAsStringForModel (i));

return sb.toString ();
});
Clazz.defineMethod (c$, "getAtomsConnected", 
function (min, max, intType, bs) {
var bsResult =  new org.jmol.util.BitSet ();
var nBonded =  Clazz.newIntArray (this.atomCount, 0);
var i;
var ishbond = (intType == 30720);
var isall = (intType == 65535);
for (var ibond = 0; ibond < this.bondCount; ibond++) {
var bond = this.bonds[ibond];
if (isall || bond.is (intType) || ishbond && bond.isHydrogen ()) {
if (bs.get (bond.atom1.index)) {
nBonded[i = bond.atom2.index]++;
bsResult.set (i);
}if (bs.get (bond.atom2.index)) {
nBonded[i = bond.atom1.index]++;
bsResult.set (i);
}}}
var nonbonded = (min == 0);
for (i = this.atomCount; --i >= 0; ) {
var n = nBonded[i];
if (n < min || n > max) bsResult.clear (i);
 else if (nonbonded && n == 0) bsResult.set (i);
}
return bsResult;
}, "~N,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getModelExtract", 
function (bs, doTransform, isModelKit, type) {
var asV3000 = type.equalsIgnoreCase ("V3000");
var asSDF = type.equalsIgnoreCase ("SDF");
var asXYZVIB = type.equalsIgnoreCase ("XYZVIB");
var asChemDoodle = type.equalsIgnoreCase ("CD");
var mol =  new org.jmol.util.StringXBuilder ();
if (!asXYZVIB && !asChemDoodle) {
mol.append (isModelKit ? "Jmol Model Kit" : this.viewer.getFullPathName ().$replace ('\\', '/'));
var version = org.jmol.viewer.Viewer.getJmolVersion ();
mol.append ("\n__Jmol-").append (version.substring (0, 2));
var cMM;
var cDD;
var cYYYY;
var cHH;
var cmm;
{
var c = new Date();
cMM = c.getMonth();
cDD = c.getDate();
cYYYY = c.getFullYear();
cHH = c.getHours();
cmm = c.getMinutes();
}org.jmol.util.TextFormat.rFill (mol, "_00", "" + (1 + cMM));
org.jmol.util.TextFormat.rFill (mol, "00", "" + cDD);
mol.append (("" + cYYYY).substring (2, 4));
org.jmol.util.TextFormat.rFill (mol, "00", "" + cHH);
org.jmol.util.TextFormat.rFill (mol, "00", "" + cmm);
mol.append ("3D 1   1.00000     0.00000     0");
mol.append ("\nJmol version ").append (org.jmol.viewer.Viewer.getJmolVersion ()).append (" EXTRACT: ").append (org.jmol.util.Escape.escape (bs)).append ("\n");
}var bsAtoms = org.jmol.util.BitSetUtil.copy (bs);
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) if (doTransform && this.atoms[i].isDeleted ()) bsAtoms.clear (i);

var bsBonds = this.getCovalentBondsForAtoms (bsAtoms);
if (!asXYZVIB && bsAtoms.cardinality () == 0) return "";
var isOK = true;
var q = (doTransform ? this.viewer.getRotationQuaternion () : null);
if (asSDF) {
var header = mol.toString ();
mol =  new org.jmol.util.StringXBuilder ();
var bsModels = this.getModelBitSet (bsAtoms, true);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
mol.append (header);
var bsTemp = org.jmol.util.BitSetUtil.copy (bsAtoms);
bsTemp.and (this.getModelAtomBitSetIncludingDeleted (i, false));
bsBonds = this.getCovalentBondsForAtoms (bsTemp);
if (!(isOK = this.addMolFile (mol, bsTemp, bsBonds, false, false, q))) break;
mol.append ("$$$$\n");
}
} else if (asXYZVIB) {
var tokens1 = org.jmol.modelset.LabelToken.compile (this.viewer, "%-2e %10.5x %10.5y %10.5z %10.5vx %10.5vy %10.5vz\n", '\0', null);
var tokens2 = org.jmol.modelset.LabelToken.compile (this.viewer, "%-2e %10.5x %10.5y %10.5z\n", '\0', null);
var bsModels = this.getModelBitSet (bsAtoms, true);
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) {
var bsTemp = org.jmol.util.BitSetUtil.copy (bsAtoms);
bsTemp.and (this.getModelAtomBitSetIncludingDeleted (i, false));
if (bsTemp.cardinality () == 0) continue;
mol.appendI (bsTemp.cardinality ()).appendC ('\n');
var props = this.models[i].properties;
mol.append ("Model[" + (i + 1) + "]: ");
if (this.frameTitles[i] != null && this.frameTitles[i].length > 0) {
mol.append (this.frameTitles[i].$replace ('\n', ' '));
} else if (props == null) {
mol.append ("Jmol " + org.jmol.viewer.Viewer.getJmolVersion ());
} else {
var sb =  new org.jmol.util.StringXBuilder ();
var e = props.propertyNames ();
var path = null;
while (e.hasMoreElements ()) {
var propertyName = e.nextElement ();
if (propertyName.equals (".PATH")) path = props.getProperty (propertyName);
 else sb.append (";").append (propertyName).append ("=").append (props.getProperty (propertyName));
}
if (path != null) sb.append (";PATH=").append (path);
path = sb.substring (sb.length () > 0 ? 1 : 0);
mol.append (path.$replace ('\n', ' '));
}mol.appendC ('\n');
for (var j = bsTemp.nextSetBit (0); j >= 0; j = bsTemp.nextSetBit (j + 1)) mol.append (org.jmol.modelset.LabelToken.formatLabelAtomArray (this.viewer, this.atoms[j], (this.getVibrationVector (j, false) == null ? tokens2 : tokens1), '\0', null));

}
} else {
isOK = this.addMolFile (mol, bsAtoms, bsBonds, asV3000, asChemDoodle, q);
}return (isOK ? mol.toString () : "ERROR: Too many atoms or bonds -- use V3000 format.");
}, "org.jmol.util.BitSet,~B,~B,~S");
Clazz.defineMethod (c$, "addMolFile", 
($fz = function (mol, bsAtoms, bsBonds, asV3000, asChemDoodle, q) {
var nAtoms = bsAtoms.cardinality ();
var nBonds = bsBonds.cardinality ();
if (!asV3000 && !asChemDoodle && (nAtoms > 999 || nBonds > 999)) return false;
var atomMap =  Clazz.newIntArray (this.atomCount, 0);
var pTemp =  new org.jmol.util.Point3f ();
if (asV3000) {
mol.append ("  0  0  0  0  0  0            999 V3000");
} else if (asChemDoodle) {
mol.append ("{\"mol\":{\"scaling\":[20,-20,20],\"a\":[");
} else {
org.jmol.util.TextFormat.rFill (mol, "   ", "" + nAtoms);
org.jmol.util.TextFormat.rFill (mol, "   ", "" + nBonds);
mol.append ("  0  0  0  0              1 V2000");
}if (!asChemDoodle) mol.append ("\n");
if (asV3000) {
mol.append ("M  V30 BEGIN CTAB\nM  V30 COUNTS ").appendI (nAtoms).append (" ").appendI (nBonds).append (" 0 0 0\n").append ("M  V30 BEGIN ATOM\n");
}for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1)) this.getAtomRecordMOL (mol, atomMap[i] = ++n, this.atoms[i], q, pTemp, asV3000, asChemDoodle);

if (asV3000) {
mol.append ("M  V30 END ATOM\nM  V30 BEGIN BOND\n");
} else if (asChemDoodle) {
mol.append ("],\"b\":[");
}for (var i = bsBonds.nextSetBit (0), n = 0; i >= 0; i = bsBonds.nextSetBit (i + 1)) this.getBondRecordMOL (mol, ++n, this.bonds[i], atomMap, asV3000, asChemDoodle);

if (asV3000) {
mol.append ("M  V30 END BOND\nM  V30 END CTAB\n");
}if (asChemDoodle) mol.append ("]}}");
 else {
mol.append ("M  END\n");
}if (!asChemDoodle && !asV3000) {
var pc = this.getPartialCharges ();
if (pc != null) {
mol.append ("> <JMOL_PARTIAL_CHARGES>\n").appendI (nAtoms).appendC ('\n');
for (var i = bsAtoms.nextSetBit (0), n = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1)) mol.appendI (++n).append (" ").appendF (pc[i]).appendC ('\n');

}}return true;
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,org.jmol.util.Quaternion");
Clazz.defineMethod (c$, "getCovalentBondsForAtoms", 
($fz = function (bsAtoms) {
var bsBonds =  new org.jmol.util.BitSet ();
for (var i = 0; i < this.bondCount; i++) {
var bond = this.bonds[i];
if (bsAtoms.get (bond.atom1.index) && bsAtoms.get (bond.atom2.index) && bond.isCovalent ()) bsBonds.set (i);
}
return bsBonds;
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomRecordMOL", 
($fz = function (mol, n, a, q, pTemp, asV3000, asChemDoodle) {
if (this.models[a.modelIndex].isTrajectory) a.setFractionalCoordPt (this.ptTemp, this.trajectorySteps.get (a.modelIndex)[a.index - this.models[a.modelIndex].firstAtomIndex], true);
 else pTemp.setT (a);
if (q != null) q.transformP2 (pTemp, pTemp);
var elemNo = a.getElementNumber ();
var sym = (a.isDeleted () ? "Xx" : org.jmol.util.Elements.elementSymbolFromNumber (elemNo));
var iso = a.getIsotopeNumber ();
var charge = a.getFormalCharge ();
if (asV3000) {
mol.append ("M  V30 ").appendI (n).append (" ").append (sym).append (" ").appendF (pTemp.x).append (" ").appendF (pTemp.y).append (" ").appendF (pTemp.z).append (" 0");
if (charge != 0) mol.append (" CHG=").appendI (charge);
if (iso != 0) mol.append (" MASS=").appendI (iso);
mol.append ("\n");
} else if (asChemDoodle) {
if (n != 1) mol.append (",");
mol.append ("{");
if (a.getElementNumber () != 6) mol.append ("\"l\":\"").append (a.getElementSymbol ()).append ("\",");
if (charge != 0) mol.append ("\"c\":").appendI (charge).append (",");
if (iso != 0 && iso != org.jmol.util.Elements.getNaturalIsotope (elemNo)) mol.append ("\"m\":").appendI (iso).append (",");
mol.append ("\"x\":").appendF (a.x * 20).append (",\"y\":").appendF (-a.y * 20).append (",\"z\":").appendF (a.z * 20).append ("}");
} else {
mol.append (org.jmol.util.TextFormat.sprintf ("%10.5p%10.5p%10.5p", "p", [pTemp]));
mol.append (" ").append (sym);
if (sym.length == 1) mol.append (" ");
if (iso > 0) iso -= org.jmol.util.Elements.getNaturalIsotope (a.getElementNumber ());
mol.append (" ");
org.jmol.util.TextFormat.rFill (mol, "  ", "" + iso);
org.jmol.util.TextFormat.rFill (mol, "   ", "" + (charge == 0 ? 0 : 4 - charge));
mol.append ("  0  0  0  0\n");
}}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~N,org.jmol.modelset.Atom,org.jmol.util.Quaternion,org.jmol.util.Point3f,~B,~B");
Clazz.defineMethod (c$, "getBondRecordMOL", 
($fz = function (mol, n, b, atomMap, asV3000, asChemDoodle) {
var a1 = atomMap[b.atom1.index];
var a2 = atomMap[b.atom2.index];
var order = b.getValence ();
if (order > 3) order = 1;
switch (b.order & -131073) {
case 515:
order = (asChemDoodle ? 2 : 4);
break;
case 66:
order = (asChemDoodle ? 1 : 5);
break;
case 513:
order = (asChemDoodle ? 1 : 6);
break;
case 514:
order = (asChemDoodle ? 2 : 7);
break;
case 33:
order = (asChemDoodle ? 1 : 8);
break;
}
if (asV3000) {
mol.append ("M  V30 ").appendI (n).append (" ").appendI (order).append (" ").appendI (a1).append (" ").appendI (a2).appendC ('\n');
} else if (asChemDoodle) {
if (n != 1) mol.append (",");
mol.append ("{\"b\":").appendI (a1 - 1).append (",\"e\":").appendI (a2 - 1);
if (order != 1) mol.append (",\"o\":").appendI (order);
mol.append ("}");
} else {
org.jmol.util.TextFormat.rFill (mol, "   ", "" + a1);
org.jmol.util.TextFormat.rFill (mol, "   ", "" + a2);
mol.append ("  ").appendI (order).append ("  0  0  0\n");
}}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~N,org.jmol.modelset.Bond,~A,~B,~B");
Clazz.defineMethod (c$, "getChimeInfo", 
function (tok, bs) {
switch (tok) {
case 1073741982:
break;
case 1073741864:
return this.getBasePairInfo (bs);
default:
return Clazz.superCall (this, org.jmol.modelset.ModelCollection, "getChimeInfo", [tok, bs]);
}
var sb =  new org.jmol.util.StringXBuilder ();
this.models[0].getChimeInfo (sb, 0);
return sb.appendC ('\n').toString ().substring (1);
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getModelFileInfo", 
function (frames) {
var sb =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < this.modelCount; ++i) {
if (frames != null && !frames.get (i)) continue;
var s = "[\"" + this.getModelNumberDotted (i) + "\"] = ";
sb.append ("\n\nfile").append (s).append (org.jmol.util.Escape.escapeStr (this.getModelFileName (i)));
var id = this.getModelAuxiliaryInfoValue (i, "modelID");
if (id != null) sb.append ("\nid").append (s).append (org.jmol.util.Escape.escapeStr (id));
sb.append ("\ntitle").append (s).append (org.jmol.util.Escape.escapeStr (this.getModelTitle (i)));
sb.append ("\nname").append (s).append (org.jmol.util.Escape.escapeStr (this.getModelName (i)));
}
return sb.toString ();
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAuxiliaryInfo", 
function (bsModels) {
var info = this.modelSetAuxiliaryInfo;
if (info == null) return null;
var models =  new java.util.ArrayList ();
for (var i = 0; i < this.modelCount; ++i) {
if (bsModels != null && !bsModels.get (i)) {
continue;
}var modelinfo = this.getModelAuxiliaryInfo (i);
models.add (modelinfo);
}
info.put ("models", models);
return info;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAllAtomInfo", 
function (bs) {
var V =  new java.util.ArrayList ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
V.add (this.getAtomInfoLong (i));
}
return V;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomIdentityInfo", 
function (i, info) {
info.put ("_ipt", Integer.$valueOf (i));
info.put ("atomIndex", Integer.$valueOf (i));
info.put ("atomno", Integer.$valueOf (this.getAtomNumber (i)));
info.put ("info", this.getAtomInfo (i, null));
info.put ("sym", this.getElementSymbol (i));
}, "~N,java.util.Map");
Clazz.defineMethod (c$, "getAtomInfoLong", 
($fz = function (i) {
var atom = this.atoms[i];
var info =  new java.util.Hashtable ();
this.getAtomIdentityInfo (i, info);
info.put ("element", this.getElementName (i));
info.put ("elemno", Integer.$valueOf (this.getElementNumber (i)));
info.put ("x", Float.$valueOf (atom.x));
info.put ("y", Float.$valueOf (atom.y));
info.put ("z", Float.$valueOf (atom.z));
info.put ("coord", org.jmol.util.Point3f.newP (atom));
if (this.vibrationVectors != null && this.vibrationVectors[i] != null) {
info.put ("vibVector", org.jmol.util.Vector3f.newV (this.vibrationVectors[i]));
}info.put ("bondCount", Integer.$valueOf (atom.getCovalentBondCount ()));
info.put ("radius", Float.$valueOf ((atom.getRasMolRadius () / 120.0)));
info.put ("model", atom.getModelNumberForLabel ());
info.put ("shape", org.jmol.modelset.Atom.atomPropertyString (this.viewer, atom, 1087373323));
info.put ("visible", Boolean.$valueOf (atom.isVisible (0)));
info.put ("clickabilityFlags", Integer.$valueOf (atom.clickabilityFlags));
info.put ("visibilityFlags", Integer.$valueOf (atom.shapeVisibilityFlags));
info.put ("spacefill", Float.$valueOf (atom.getRadius ()));
var strColor = org.jmol.util.Escape.escapeColor (this.viewer.getColorArgbOrGray (atom.colixAtom));
if (strColor != null) info.put ("color", strColor);
info.put ("colix", Integer.$valueOf (atom.colixAtom));
var isTranslucent = atom.isTranslucent ();
if (isTranslucent) info.put ("translucent", Boolean.$valueOf (isTranslucent));
info.put ("formalCharge", Integer.$valueOf (atom.getFormalCharge ()));
info.put ("partialCharge", Float.$valueOf (atom.getPartialCharge ()));
var d = atom.getSurfaceDistance100 () / 100;
if (d >= 0) info.put ("surfaceDistance", Float.$valueOf (d));
if (this.models[atom.modelIndex].isBioModel) {
info.put ("resname", atom.getGroup3 (false));
var seqNum = atom.getSeqNumber ();
var insCode = atom.getInsertionCode ();
if (seqNum > 0) info.put ("resno", Integer.$valueOf (seqNum));
if (insCode.charCodeAt (0) != 0) info.put ("insertionCode", "" + insCode);
var chainID = atom.getChainID ();
info.put ("name", this.getAtomName (i));
info.put ("chain", (chainID == '\0' ? "" : "" + chainID));
info.put ("atomID", Integer.$valueOf (atom.atomID));
info.put ("groupID", Integer.$valueOf (atom.getGroupID ()));
if (atom.alternateLocationID != '\0') info.put ("altLocation", "" + atom.alternateLocationID);
info.put ("structure", Integer.$valueOf (atom.getProteinStructureType ().getId ()));
info.put ("polymerLength", Integer.$valueOf (atom.getPolymerLength ()));
info.put ("occupancy", Integer.$valueOf (atom.getOccupancy100 ()));
var temp = atom.getBfactor100 ();
info.put ("temp", Integer.$valueOf (Clazz.doubleToInt (temp / 100)));
}return info;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getAllBondInfo", 
function (bs) {
var v =  new java.util.ArrayList ();
if (Clazz.instanceOf (bs, org.jmol.modelset.Bond.BondSet)) {
for (var i = bs.nextSetBit (0); i >= 0 && i < this.bondCount; i = bs.nextSetBit (i + 1)) v.add (this.getBondInfo (i));

return v;
}var thisAtom = (bs.cardinality () == 1 ? bs.nextSetBit (0) : -1);
for (var i = 0; i < this.bondCount; i++) {
if (thisAtom >= 0 ? (this.bonds[i].atom1.index == thisAtom || this.bonds[i].atom2.index == thisAtom) : bs.get (this.bonds[i].atom1.index) && bs.get (this.bonds[i].atom2.index)) {
v.add (this.getBondInfo (i));
}}
return v;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getBondInfo", 
($fz = function (i) {
var bond = this.bonds[i];
var atom1 = bond.atom1;
var atom2 = bond.atom2;
var info =  new java.util.Hashtable ();
info.put ("_bpt", Integer.$valueOf (i));
var infoA =  new java.util.Hashtable ();
this.getAtomIdentityInfo (atom1.index, infoA);
var infoB =  new java.util.Hashtable ();
this.getAtomIdentityInfo (atom2.index, infoB);
info.put ("atom1", infoA);
info.put ("atom2", infoB);
info.put ("order", Float.$valueOf (org.jmol.util.JmolEdge.getBondOrderNumberFromOrder (this.bonds[i].order)));
info.put ("radius", Float.$valueOf ((bond.mad / 2000.)));
info.put ("length_Ang", Float.$valueOf (atom1.distance (atom2)));
info.put ("visible", Boolean.$valueOf (bond.shapeVisibilityFlags != 0));
var strColor = org.jmol.util.Escape.escapeColor (this.viewer.getColorArgbOrGray (bond.colix));
if (strColor != null) info.put ("color", strColor);
info.put ("colix", Integer.$valueOf (bond.colix));
var isTranslucent = bond.isTranslucent ();
if (isTranslucent) info.put ("translucent", Boolean.$valueOf (isTranslucent));
return info;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getAllChainInfo", 
function (bs) {
var finalInfo =  new java.util.Hashtable ();
var modelVector =  new java.util.ArrayList ();
for (var i = 0; i < this.modelCount; ++i) {
var modelInfo =  new java.util.Hashtable ();
var info = this.getChainInfo (i, bs);
if (info.size () > 0) {
modelInfo.put ("modelIndex", Integer.$valueOf (i));
modelInfo.put ("chains", info);
modelVector.add (modelInfo);
}}
finalInfo.put ("models", modelVector);
return finalInfo;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getChainInfo", 
($fz = function (modelIndex, bs) {
var model = this.models[modelIndex];
var nChains = model.getChainCount (true);
var infoChains =  new java.util.ArrayList ();
for (var i = 0; i < nChains; i++) {
var chain = model.getChainAt (i);
var infoChain =  new java.util.ArrayList ();
var nGroups = chain.getGroupCount ();
var arrayName =  new java.util.Hashtable ();
for (var igroup = 0; igroup < nGroups; igroup++) {
var group = chain.getGroup (igroup);
if (bs.get (group.firstAtomIndex)) infoChain.add (group.getGroupInfo (igroup));
}
if (!infoChain.isEmpty ()) {
arrayName.put ("residues", infoChain);
infoChains.add (arrayName);
}}
return infoChains;
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAllPolymerInfo", 
function (bs) {
var finalInfo =  new java.util.Hashtable ();
var modelVector =  new java.util.ArrayList ();
for (var i = 0; i < this.modelCount; ++i) if (this.models[i].isBioModel) this.models[i].getAllPolymerInfo (bs, finalInfo, modelVector);

finalInfo.put ("models", modelVector);
return finalInfo;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getUnitCellInfoText", 
function () {
var modelIndex = this.viewer.getCurrentModelIndex ();
if (modelIndex < 0) return "no single current model";
var c = this.getUnitCell (modelIndex);
return (c == null ? "not applicable" : c.getUnitCellInfo ());
});
Clazz.defineMethod (c$, "getSpaceGroupInfo", 
function (modelIndex, spaceGroup, symOp, pt1, pt2, drawID) {
var strOperations = null;
var info = null;
var cellInfo = null;
var infolist = null;
if (spaceGroup == null) {
if (modelIndex <= 0) modelIndex = (Clazz.instanceOf (pt1, org.jmol.modelset.Atom) ? (pt1).modelIndex : this.viewer.getCurrentModelIndex ());
if (modelIndex < 0) strOperations = "no single current model";
 else if ((cellInfo = this.getUnitCell (modelIndex)) == null) strOperations = "not applicable";
if (strOperations != null) {
info =  new java.util.Hashtable ();
info.put ("spaceGroupInfo", strOperations);
info.put ("symmetryInfo", "");
} else if (pt1 == null && drawID == null && symOp != 0) {
info = this.getModelAuxiliaryInfoValue (modelIndex, "spaceGroupInfo");
}if (info != null) return info;
info =  new java.util.Hashtable ();
if (pt1 == null && drawID == null && symOp == 0) this.setModelAuxiliaryInfo (modelIndex, "spaceGroupInfo", info);
spaceGroup = cellInfo.getSpaceGroupName ();
var list = cellInfo.getSymmetryOperations ();
if (list == null) {
strOperations = "\n no symmetry operations employed";
} else {
this.getSymTemp (true);
this.symTemp.setSpaceGroup (false);
strOperations = "\n" + list.length + " symmetry operations employed:";
infolist =  new Array (list.length);
for (var i = 0; i < list.length; i++) {
var iSym = this.symTemp.addSpaceGroupOperation ("=" + list[i], i + 1);
if (iSym < 0) continue;
infolist[i] = (symOp > 0 && symOp - 1 != iSym ? null : this.symTemp.getSymmetryOperationDescription (iSym, cellInfo, pt1, pt2, drawID));
if (infolist[i] != null) strOperations += "\n" + (i + 1) + "\t" + infolist[i][0] + "\t" + infolist[i][2];
}
}} else {
info =  new java.util.Hashtable ();
}info.put ("spaceGroupName", spaceGroup);
this.getSymTemp (true);
var data = this.symTemp.getSpaceGroupInfo (spaceGroup, cellInfo);
if (infolist != null) {
info.put ("operations", infolist);
info.put ("symmetryInfo", strOperations);
}if (data == null) data = "could not identify space group from name: " + spaceGroup + "\nformat: show spacegroup \"2\" or \"P 2c\" " + "or \"C m m m\" or \"x, y, z;-x ,-y, -z\"";
info.put ("spaceGroupInfo", data);
return info;
}, "~N,~S,~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~S");
Clazz.defineMethod (c$, "getSymmetryInfo", 
function (bsAtoms, xyz, op, pt, pt2, id, type) {
var iModel = -1;
if (bsAtoms == null) {
iModel = this.viewer.getCurrentModelIndex ();
if (iModel < 0) return "";
bsAtoms = this.viewer.getModelUndeletedAtomsBitSet (iModel);
}var iAtom = bsAtoms.nextSetBit (0);
if (iAtom < 0) return "";
iModel = this.atoms[iAtom].modelIndex;
var uc = this.getUnitCell (iModel);
if (uc == null) return "";
if (pt2 != null) return this.getSymmetryOperation (iModel, null, op, pt, pt2, (id == null ? "sym" : id), type == 1826248715);
if (xyz == null) {
var ops = uc.getSymmetryOperations ();
if (ops == null || op == 0 || Math.abs (op) > ops.length) return "";
if (op > 0) {
xyz = ops[op - 1];
} else {
xyz = ops[-1 - op];
}} else {
op = 0;
}this.getSymTemp (false);
this.symTemp.setSpaceGroup (false);
var iSym = this.symTemp.addSpaceGroupOperation ((op < 0 ? "!" : "=") + xyz, Math.abs (op));
if (iSym < 0) return "";
this.symTemp.setUnitCell (uc.getNotionalUnitCell ());
var info;
pt = org.jmol.util.Point3f.newP (pt == null ? this.atoms[iAtom] : pt);
if (type == 135266320) {
uc.toFractional (pt, false);
if (Float.isNaN (pt.x)) return "";
var sympt =  new org.jmol.util.Point3f ();
this.symTemp.newSpaceGroupPoint (iSym, pt, sympt, 0, 0, 0);
this.symTemp.toCartesian (sympt, false);
return sympt;
}info = this.symTemp.getSymmetryOperationDescription (iSym, uc, pt, pt2, (id == null ? "sym" : id));
var ang = (info[9]).intValue ();
switch (type) {
case 135266306:
return info;
case 1073742001:
var sinfo = [info[0], info[1], info[2], org.jmol.util.Escape.escapePt (info[4]), org.jmol.util.Escape.escapePt (info[5]), org.jmol.util.Escape.escapePt (info[6]), org.jmol.util.Escape.escapePt (info[7]), org.jmol.util.Escape.escapePt (info[8]), "" + info[9], "" + org.jmol.util.Escape.escape (info[10])];
return sinfo;
case 1073741982:
return info[0];
default:
case 1826248715:
return info[2];
case 135176:
return info[3];
case 1073742178:
return info[5];
case 12289:
return info[6];
case 135266320:
return info[7];
case 1073741854:
case 135266319:
return ((ang == 0) == (type == 135266319) ? info[8] : null);
case 135266305:
return info[9];
case 12:
return info[10];
}
}, "org.jmol.util.BitSet,~S,~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~S,~N");
Clazz.defineMethod (c$, "getSymTemp", 
($fz = function (forceNew) {
if (this.symTemp == null || forceNew) this.symTemp = org.jmol.api.Interface.getOptionInterface ("symmetry.Symmetry");
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "deleteModel", 
function (modelIndex, firstAtomIndex, nAtoms, bsAtoms, bsBonds) {
if (modelIndex < 0) {
this.validateBspf (false);
this.bsAll = null;
this.resetMolecules ();
this.isBbcageDefault = false;
this.calcBoundBoxDimensions (null, 1);
return;
}this.modelNumbers = org.jmol.util.ArrayUtil.deleteElements (this.modelNumbers, modelIndex, 1);
this.modelFileNumbers = org.jmol.util.ArrayUtil.deleteElements (this.modelFileNumbers, modelIndex, 1);
this.modelNumbersForAtomLabel = org.jmol.util.ArrayUtil.deleteElements (this.modelNumbersForAtomLabel, modelIndex, 1);
this.modelNames = org.jmol.util.ArrayUtil.deleteElements (this.modelNames, modelIndex, 1);
this.frameTitles = org.jmol.util.ArrayUtil.deleteElements (this.frameTitles, modelIndex, 1);
this.thisStateModel = -1;
var group3Lists = this.getModelSetAuxiliaryInfoValue ("group3Lists");
var group3Counts = this.getModelSetAuxiliaryInfoValue ("group3Counts");
var ptm = modelIndex + 1;
if (group3Lists != null && group3Lists[ptm] != null) {
for (var i = Clazz.doubleToInt (group3Lists[ptm].length / 6); --i >= 0; ) if (group3Counts[ptm][i] > 0) {
group3Counts[0][i] -= group3Counts[ptm][i];
if (group3Counts[0][i] == 0) group3Lists[0] = group3Lists[0].substring (0, i * 6) + ",[" + group3Lists[0].substring (i * 6 + 2);
}
}if (group3Lists != null) {
this.modelSetAuxiliaryInfo.put ("group3Lists", org.jmol.util.ArrayUtil.deleteElements (group3Lists, modelIndex, 1));
this.modelSetAuxiliaryInfo.put ("group3Counts", org.jmol.util.ArrayUtil.deleteElements (group3Counts, modelIndex, 1));
}if (this.unitCells != null) {
this.unitCells = org.jmol.util.ArrayUtil.deleteElements (this.unitCells, modelIndex, 1);
}for (var i = this.stateScripts.size (); --i >= 0; ) {
if (!this.stateScripts.get (i).deleteAtoms (modelIndex, bsBonds, bsAtoms)) {
this.stateScripts.remove (i);
}}
this.deleteModelAtoms (firstAtomIndex, nAtoms, bsAtoms);
this.viewer.deleteModelAtoms (firstAtomIndex, nAtoms, bsAtoms);
}, "~N,~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getMoInfo", 
function (modelIndex) {
var sb =  new org.jmol.util.StringXBuilder ();
for (var m = 0; m < this.modelCount; m++) {
if (modelIndex >= 0 && m != modelIndex) {
continue;
}var moData = this.viewer.getModelAuxiliaryInfoValue (m, "moData");
if (moData == null) {
continue;
}var mos = (moData.get ("mos"));
var nOrb = (mos == null ? 0 : mos.size ());
if (nOrb == 0) {
continue;
}for (var i = nOrb; --i >= 0; ) {
var mo = mos.get (i);
var type = mo.get ("type");
if (type == null) {
type = "";
}var units = mo.get ("energyUnits");
if (units == null) {
units = "";
}var occ = mo.get ("occupancy");
if (occ != null) {
type = "occupancy " + occ.floatValue () + " " + type;
}var sym = mo.get ("symmetry");
if (sym != null) {
type += sym;
}var energy = "" + mo.get ("energy");
if (Float.isNaN (org.jmol.util.Parser.parseFloatStr (energy))) sb.append (org.jmol.util.TextFormat.sprintf ("model %-2s;  mo %-2i # %s\n", "sis", [this.getModelNumberDotted (m), Integer.$valueOf (i + 1), type]));
 else sb.append (org.jmol.util.TextFormat.sprintf ("model %-2s;  mo %-2i # energy %-8.3f %s %s\n", "sifss", [this.getModelNumberDotted (m), Integer.$valueOf (i + 1), mo.get ("energy"), units, type]));
}
}
return sb.toString ();
}, "~N");
Clazz.defineMethod (c$, "assignAtom", 
function (atomIndex, type, autoBond) {
if (type == null) type = "C";
var atom = this.atoms[atomIndex];
var bs =  new org.jmol.util.BitSet ();
var wasH = (atom.getElementNumber () == 1);
var atomicNumber = org.jmol.util.Elements.elementNumberFromSymbol (type, true);
var isDelete = false;
if (atomicNumber > 0) {
this.setElement (atom, atomicNumber);
this.viewer.setShapeSize (0, this.viewer.getDefaultRadiusData (), org.jmol.util.BitSetUtil.newAndSetBit (atomIndex));
this.setAtomName (atomIndex, type + atom.getAtomNumber ());
if (!this.models[atom.modelIndex].isModelKit) this.taintAtom (atomIndex, 0);
} else if (type.equals ("Pl")) {
atom.setFormalCharge (atom.getFormalCharge () + 1);
} else if (type.equals ("Mi")) {
atom.setFormalCharge (atom.getFormalCharge () - 1);
} else if (type.equals ("X")) {
isDelete = true;
} else if (!type.equals (".")) {
return;
}this.removeUnnecessaryBonds (atom, isDelete);
var dx = 0;
if (atom.getCovalentBondCount () == 1) if (wasH) {
dx = 1.50;
} else if (!wasH && atomicNumber == 1) {
dx = 1.0;
}if (dx != 0) {
var v = org.jmol.util.Vector3f.newV (atom);
v.sub (this.atoms[atom.getBondedAtomIndex (0)]);
var d = v.length ();
v.normalize ();
v.scale (dx - d);
this.setAtomCoordRelative (atomIndex, v.x, v.y, v.z);
}var bsA = org.jmol.util.BitSetUtil.newAndSetBit (atomIndex);
if (atomicNumber != 1 && autoBond) {
this.validateBspf (false);
bs = this.getAtomsWithinBs (1.0, bsA, false, null);
bs.andNot (bsA);
if (bs.nextSetBit (0) >= 0) this.viewer.deleteAtoms (bs, false);
bs = this.viewer.getModelUndeletedAtomsBitSet (atom.modelIndex);
bs.andNot (this.getAtomBitsMaybeDeleted (1613758476, null));
this.makeConnections (0.1, 1.8, 1, 1073741904, bsA, bs, null, false, false, 0);
}this.viewer.addHydrogens (bsA, false, true);
}, "~N,~S,~B");
Clazz.defineMethod (c$, "deleteAtoms", 
function (bs) {
if (bs == null) return;
var bsBonds =  new org.jmol.util.BitSet ();
for (var i = bs.nextSetBit (0); i >= 0 && i < this.atomCount; i = bs.nextSetBit (i + 1)) this.atoms[i].$delete (bsBonds);

for (var i = 0; i < this.modelCount; i++) {
this.models[i].bsAtomsDeleted.or (bs);
this.models[i].bsAtomsDeleted.and (this.models[i].bsAtoms);
}
this.deleteBonds (bsBonds, false);
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "appendLoadStates", 
function (cmds) {
var commands =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < this.modelCount; i++) {
if (this.isJmolDataFrameForModel (i) || this.isTrajectorySubFrame (i)) continue;
var pt = commands.indexOf (this.models[i].loadState);
if (pt < 0 || pt != commands.lastIndexOf (this.models[i].loadState)) commands.append (this.models[i].loadState);
if (this.models[i].isModelKit) {
var bs = this.getModelAtomBitSetIncludingDeleted (i, false);
if (this.tainted != null) {
if (this.tainted[2] != null) this.tainted[2].andNot (bs);
if (this.tainted[3] != null) this.tainted[3].andNot (bs);
}this.models[i].loadScript =  new org.jmol.util.StringXBuilder ();
org.jmol.viewer.Viewer.getInlineData (commands, this.getModelExtract (bs, false, true, "MOL"), i > 0);
} else {
commands.appendSB (this.models[i].loadScript);
}}
var s = commands.toString ();
var i = s.indexOf ("load /*data*/");
var j = s.indexOf ("load /*file*/");
if (j >= 0 && j < i) i = j;
if ((j = s.indexOf ("load \"@")) >= 0 && j < i) i = j;
if (i >= 0) s = s.substring (0, i) + "zap;" + s.substring (i);
cmds.append (s);
}, "org.jmol.util.StringXBuilder");
Clazz.defineMethod (c$, "getModelCml", 
function (bs, atomsMax, addBonds) {
var sb =  new org.jmol.util.StringXBuilder ();
var nAtoms = org.jmol.util.BitSetUtil.cardinalityOf (bs);
if (nAtoms == 0) return "";
org.jmol.io.XmlUtil.openTag (sb, "molecule");
org.jmol.io.XmlUtil.openTag (sb, "atomArray");
var bsAtoms =  new org.jmol.util.BitSet ();
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
if (--atomsMax < 0) break;
var atom = this.atoms[i];
var name = atom.getAtomName ();
org.jmol.util.TextFormat.simpleReplace (name, "\"", "''");
bsAtoms.set (atom.index);
org.jmol.io.XmlUtil.appendTag (sb, "atom/", ["id", "a" + (atom.index + 1), "title", atom.getAtomName (), "elementType", atom.getElementSymbol (), "x3", "" + atom.x, "y3", "" + atom.y, "z3", "" + atom.z]);
}
org.jmol.io.XmlUtil.closeTag (sb, "atomArray");
if (addBonds) {
org.jmol.io.XmlUtil.openTag (sb, "bondArray");
for (var i = 0; i < this.bondCount; i++) {
var bond = this.bonds[i];
var a1 = bond.atom1;
var a2 = bond.atom2;
if (!bsAtoms.get (a1.index) || !bsAtoms.get (a2.index)) continue;
var order = org.jmol.util.JmolEdge.getCmlBondOrder (bond.order);
if (order == null) continue;
org.jmol.io.XmlUtil.appendTag (sb, "bond/", ["atomRefs2", "a" + (bond.atom1.index + 1) + " a" + (bond.atom2.index + 1), "order", order]);
}
org.jmol.io.XmlUtil.closeTag (sb, "bondArray");
}org.jmol.io.XmlUtil.closeTag (sb, "molecule");
return sb.toString ();
}, "org.jmol.util.BitSet,~N,~B");
Clazz.defineMethod (c$, "adjustAtomArrays", 
function (map, i0, atomCount) {
this.atomCount = atomCount;
for (var i = i0; i < atomCount; i++) {
this.atoms[i] = this.atoms[map[i]];
this.atoms[i].index = i;
var m = this.models[this.atoms[i].modelIndex];
if (m.firstAtomIndex == map[i]) m.firstAtomIndex = i;
m.bsAtoms.set (i);
}
if (this.vibrationVectors != null) for (var i = i0; i < atomCount; i++) this.vibrationVectors[i] = this.vibrationVectors[map[i]];

if (this.occupancies != null) for (var i = i0; i < atomCount; i++) this.occupancies[i] = this.occupancies[map[i]];

if (this.bfactor100s != null) for (var i = i0; i < atomCount; i++) this.bfactor100s[i] = this.bfactor100s[map[i]];

if (this.partialCharges != null) for (var i = i0; i < atomCount; i++) this.partialCharges[i] = this.partialCharges[map[i]];

if (this.ellipsoids != null) for (var i = i0; i < atomCount; i++) this.ellipsoids[i] = this.ellipsoids[map[i]];

if (this.atomNames != null) for (var i = i0; i < atomCount; i++) this.atomNames[i] = this.atomNames[map[i]];

if (this.atomTypes != null) for (var i = i0; i < atomCount; i++) this.atomTypes[i] = this.atomTypes[map[i]];

if (this.atomSerials != null) for (var i = i0; i < atomCount; i++) this.atomSerials[i] = this.atomSerials[map[i]];

}, "~A,~N,~N");
Clazz.defineMethod (c$, "growAtomArrays", 
function (newLength) {
this.atoms = org.jmol.util.ArrayUtil.arrayCopyObject (this.atoms, newLength);
if (this.vibrationVectors != null) this.vibrationVectors = org.jmol.util.ArrayUtil.arrayCopyObject (this.vibrationVectors, newLength);
if (this.occupancies != null) this.occupancies = org.jmol.util.ArrayUtil.arrayCopyByte (this.occupancies, newLength);
if (this.bfactor100s != null) this.bfactor100s = org.jmol.util.ArrayUtil.arrayCopyShort (this.bfactor100s, newLength);
if (this.partialCharges != null) this.partialCharges = org.jmol.util.ArrayUtil.arrayCopyF (this.partialCharges, newLength);
if (this.ellipsoids != null) this.ellipsoids = org.jmol.util.ArrayUtil.arrayCopyObject (this.ellipsoids, newLength);
if (this.atomNames != null) this.atomNames = org.jmol.util.ArrayUtil.arrayCopyS (this.atomNames, newLength);
if (this.atomTypes != null) this.atomTypes = org.jmol.util.ArrayUtil.arrayCopyS (this.atomTypes, newLength);
if (this.atomSerials != null) this.atomSerials = org.jmol.util.ArrayUtil.arrayCopyI (this.atomSerials, newLength);
}, "~N");
Clazz.defineMethod (c$, "addAtom", 
function (modelIndex, group, atomicAndIsotopeNumber, atomName, atomSerial, atomSite, x, y, z, radius, vectorX, vectorY, vectorZ, formalCharge, partialCharge, occupancy, bfactor, ellipsoid, isHetero, specialAtomID, atomSymmetry) {
var atom =  new org.jmol.modelset.Atom (modelIndex, this.atomCount, x, y, z, radius, atomSymmetry, atomSite, atomicAndIsotopeNumber, formalCharge, isHetero);
this.models[modelIndex].atomCount++;
this.models[modelIndex].bsAtoms.set (this.atomCount);
if (atomicAndIsotopeNumber % 128 == 1) this.models[modelIndex].hydrogenCount++;
if (this.atomCount >= this.atoms.length) this.growAtomArrays (this.atomCount + 100);
this.atoms[this.atomCount] = atom;
this.setBFactor (this.atomCount, bfactor);
this.setOccupancy (this.atomCount, occupancy);
this.setPartialCharge (this.atomCount, partialCharge);
if (ellipsoid != null) this.setEllipsoid (this.atomCount, ellipsoid);
atom.group = group;
atom.colixAtom = this.viewer.getColixAtomPalette (atom, org.jmol.constant.EnumPalette.CPK.id);
if (atomName != null) {
var i;
if ((i = atomName.indexOf ('\0')) >= 0) {
if (this.atomTypes == null) this.atomTypes =  new Array (this.atoms.length);
this.atomTypes[this.atomCount] = atomName.substring (i + 1);
atomName = atomName.substring (0, i);
}atom.atomID = specialAtomID;
if (specialAtomID == 0) {
if (this.atomNames == null) this.atomNames =  new Array (this.atoms.length);
this.atomNames[this.atomCount] = atomName.intern ();
}}if (atomSerial != -2147483648) {
if (this.atomSerials == null) this.atomSerials =  Clazz.newIntArray (this.atoms.length, 0);
this.atomSerials[this.atomCount] = atomSerial;
}if (!Float.isNaN (vectorX)) this.setVibrationVector (this.atomCount, vectorX, vectorY, vectorZ);
this.atomCount++;
return atom;
}, "~N,org.jmol.modelset.Group,~N,~S,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~A,~B,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getInlineData", 
function (modelIndex) {
var data = null;
if (modelIndex >= 0) data = this.models[modelIndex].loadScript;
 else for (modelIndex = this.modelCount; --modelIndex >= 0; ) if ((data = this.models[modelIndex].loadScript).length () > 0) break;

var pt = data.lastIndexOf ("data \"");
if (pt < 0) return null;
pt = data.indexOf2 ("\"", pt + 7);
var pt2 = data.lastIndexOf ("end \"");
if (pt2 < pt || pt < 0) return null;
return data.substring2 (pt + 2, pt2);
}, "~N");
Clazz.defineMethod (c$, "isAtomPDB", 
function (i) {
return i >= 0 && this.models[this.atoms[i].modelIndex].isBioModel;
}, "~N");
Clazz.defineMethod (c$, "isAtomAssignable", 
function (i) {
return i >= 0 && this.atoms[i].modelIndex == this.modelCount - 1;
}, "~N");
Clazz.defineMethod (c$, "getGroupAtom", 
function (atom, offset, name) {
var g = atom.group;
var monomerIndex = g.getMonomerIndex ();
if (monomerIndex < 0) return -1;
var groups = g.getGroups ();
var ipt = monomerIndex + offset;
if (ipt >= 0 && ipt < groups.length) {
var m = groups[ipt];
if (offset == 1 && !m.isConnectedPrevious ()) return -1;
if ("0".equals (name)) return m.leadAtomIndex;
for (var i = m.firstAtomIndex; i <= m.lastAtomIndex; i++) if (name == null || name.equalsIgnoreCase (this.atoms[i].getAtomName ())) return i;

}return -1;
}, "org.jmol.modelset.Atom,~N,~S");
Clazz.defineMethod (c$, "haveModelKit", 
function () {
for (var i = 0; i < this.modelCount; i++) if (this.models[i].isModelKit) return true;

return false;
});
Clazz.defineMethod (c$, "getModelKitStateBitset", 
function (bs, bsDeleted) {
var bs1 = org.jmol.util.BitSetUtil.copy (bsDeleted);
for (var i = 0; i < this.modelCount; i++) if (!this.models[i].isModelKit) bs1.andNot (this.models[i].bsAtoms);

return org.jmol.util.BitSetUtil.deleteBits (bs, bs1);
}, "org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setAtomNamesAndNumbers", 
function (iFirst, baseAtomIndex, mergeSet) {
if (baseAtomIndex < 0) iFirst = this.models[this.atoms[iFirst].modelIndex].firstAtomIndex;
if (this.atomSerials == null) this.atomSerials =  Clazz.newIntArray (this.atomCount, 0);
if (this.atomNames == null) this.atomNames =  new Array (this.atomCount);
var isZeroBased = this.isXYZ && this.viewer.getZeroBasedXyzRasmol ();
var lastModelIndex = 2147483647;
var atomNo = 1;
for (var i = iFirst; i < this.atomCount; ++i) {
var atom = this.atoms[i];
if (atom.modelIndex != lastModelIndex) {
lastModelIndex = atom.modelIndex;
atomNo = (isZeroBased ? 0 : 1);
}if (this.atomSerials[i] == 0 || baseAtomIndex < 0) this.atomSerials[i] = (i < baseAtomIndex ? mergeSet.atomSerials[i] : atomNo);
if (this.atomNames[i] == null || baseAtomIndex < 0) this.atomNames[i] = (atom.getElementSymbol () + this.atomSerials[i]).intern ();
if (!this.models[lastModelIndex].isModelKit || atom.getElementNumber () > 0 && !atom.isDeleted ()) atomNo++;
}
}, "~N,~N,org.jmol.modelset.AtomCollection");
Clazz.defineMethod (c$, "setUnitCellOffset", 
function (modelIndex, pt, ijk) {
for (var i = modelIndex; i < this.modelCount; i++) {
if (i < 0 || modelIndex >= 0 && i != modelIndex && this.models[i].trajectoryBaseIndex != modelIndex) continue;
var unitCell = this.getUnitCell (i);
if (unitCell == null) continue;
if (pt == null) unitCell.setOffset (ijk);
 else unitCell.setOffsetPt (pt);
}
}, "~N,org.jmol.util.Point3f,~N");
Clazz.defineMethod (c$, "connect", 
function (connections) {
this.resetMolecules ();
var bsDelete =  new org.jmol.util.BitSet ();
for (var i = 0; i < connections.length; i++) {
var f = connections[i];
if (f == null || f.length < 2) continue;
var index1 = Clazz.floatToInt (f[0]);
var addGroup = (index1 < 0);
if (addGroup) index1 = -1 - index1;
var index2 = Clazz.floatToInt (f[1]);
if (index2 < 0 || index1 >= this.atomCount || index2 >= this.atomCount) continue;
var order = (f.length > 2 ? Clazz.floatToInt (f[2]) : 1);
if (order < 0) order &= 0xFFFF;
var mad = (f.length > 3 ? Clazz.floatToShort (1000 * connections[i][3]) : this.getDefaultMadFromOrder (order));
if (order == 0 || mad == 0 && order != 32768 && !org.jmol.modelset.Bond.isHydrogen (order)) {
var b = this.atoms[index1].getBond (this.atoms[index2]);
if (b != null) bsDelete.set (b.index);
continue;
}var energy = (f.length > 4 ? f[4] : 0);
this.bondAtoms (this.atoms[index1], this.atoms[index2], order, mad, null, energy, addGroup, true);
}
if (bsDelete.nextSetBit (0) >= 0) this.deleteBonds (bsDelete, false);
}, "~A");
Clazz.defineMethod (c$, "allowSpecAtom", 
function () {
return this.modelCount != 1 || this.models[0].isBioModel;
});
Clazz.defineMethod (c$, "setFrameDelayMs", 
function (millis, bsModels) {
for (var i = bsModels.nextSetBit (0); i >= 0; i = bsModels.nextSetBit (i + 1)) this.models[this.models[i].trajectoryBaseIndex].frameDelay = millis;

}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getFrameDelayMs", 
function (i) {
return (i < this.models.length && i >= 0 ? this.models[this.models[i].trajectoryBaseIndex].frameDelay : 0);
}, "~N");
Clazz.defineMethod (c$, "getModelIndexFromId", 
function (id) {
var haveFile = (id.indexOf ("#") >= 0);
var isBaseModel = id.toLowerCase ().endsWith (".basemodel");
if (isBaseModel) id = id.substring (0, id.length - 10);
var errCode = -1;
var fname = null;
for (var i = 0; i < this.modelCount; i++) {
var mid = this.getModelAuxiliaryInfoValue (i, "modelID");
if (mid == null && (mid = this.getModelTitle (i)) == null) continue;
if (haveFile) {
fname = this.getModelFileName (i) + "#";
mid = fname + mid;
}if (id.equalsIgnoreCase (mid)) return (isBaseModel ? this.getBaseModelIndex (i) : i);
if (fname != null && id.startsWith (fname)) errCode = -2;
}
return (fname == null && !haveFile ? -2 : errCode);
}, "~S");
Clazz.defineMethod (c$, "getPeakAtomRecord", 
function (atomIndex) {
var iModel = this.atoms[atomIndex].modelIndex;
var type = null;
switch (this.atoms[atomIndex].getElementNumber ()) {
case 1:
type = "1HNMR";
break;
case 6:
type = "13CNMR";
break;
default:
return null;
}
var peaks = this.getModelAuxiliaryInfoValue (iModel, "jdxAtomSelect_" + type);
if (peaks == null) return null;
this.htPeaks = null;
if (this.htPeaks == null) this.htPeaks =  new java.util.Hashtable ();
for (var i = 0; i < peaks.size (); i++) {
var peak = peaks.get (i);
var bsPeak = this.htPeaks.get (peak);
if (bsPeak == null) {
this.htPeaks.put (peak, bsPeak =  new org.jmol.util.BitSet ());
var atoms = org.jmol.util.Parser.getQuotedAttribute (peak, "atoms");
var select = org.jmol.util.Parser.getQuotedAttribute (peak, "select");
var script = "";
if (atoms != null) script += "visible & (atomno=" + org.jmol.util.TextFormat.simpleReplace (atoms, ",", " or atomno=") + ")";
 else if (select != null) script += "visible & (" + select + ")";
bsPeak.or (this.viewer.getAtomBitSet (script));
}if (bsPeak.get (atomIndex)) return peak;
}
return null;
}, "~N");
Clazz.defineMethod (c$, "getBaseModelBitSet", 
function (modelIndex) {
return this.getModelAtomBitSetIncludingDeleted (this.getBaseModelIndex (modelIndex), true);
}, "~N");
Clazz.defineMethod (c$, "getBaseModelIndex", 
($fz = function (modelIndex) {
var baseModel = this.getModelAuxiliaryInfoValue (modelIndex, "jdxBaseModel");
if (baseModel != null) for (var i = this.models.length; --i >= 0; ) if (baseModel.equals (this.getModelAuxiliaryInfoValue (i, "jdxModelID"))) return i;

return modelIndex;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.modelIndex = 0;
this.bsBonds = null;
this.bsAtoms1 = null;
this.bsAtoms2 = null;
this.script1 = null;
this.script2 = null;
this.inDefinedStateBlock = false;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset.ModelCollection, "StateScript");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f, g) {
this.modelIndex = a;
this.script1 = b;
this.bsBonds = org.jmol.util.BitSetUtil.copy (c);
this.bsAtoms1 = org.jmol.util.BitSetUtil.copy (d);
this.bsAtoms2 = org.jmol.util.BitSetUtil.copy (e);
this.script2 = f;
this.inDefinedStateBlock = g;
}, "~N,~S,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,~S,~B");
Clazz.defineMethod (c$, "isValid", 
function () {
return this.script1 != null && this.script1.length > 0 && (this.bsBonds == null || this.bsBonds.nextSetBit (0) >= 0) && (this.bsAtoms1 == null || this.bsAtoms1.nextSetBit (0) >= 0) && (this.bsAtoms2 == null || this.bsAtoms2.nextSetBit (0) >= 0);
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (!this.isValid ()) return "";
var a = org.jmol.util.StringXBuilder.newS (this.script1);
if (this.bsBonds != null) a.append (" ").append (org.jmol.util.Escape.escapeBs (this.bsBonds, false));
if (this.bsAtoms1 != null) a.append (" ").append (org.jmol.util.Escape.escape (this.bsAtoms1));
if (this.bsAtoms2 != null) a.append (" ").append (org.jmol.util.Escape.escape (this.bsAtoms2));
if (this.script2 != null) a.append (" ").append (this.script2);
var b = a.toString ();
if (!b.endsWith (";")) b += ";";
return b;
});
Clazz.defineMethod (c$, "isConnect", 
function () {
return (this.script1.indexOf ("connect") >= 0);
});
Clazz.defineMethod (c$, "deleteAtoms", 
function (a, b, c) {
if (a == this.modelIndex) return false;
if (a > this.modelIndex) {
return true;
}org.jmol.util.BitSetUtil.deleteBits (this.bsBonds, b);
org.jmol.util.BitSetUtil.deleteBits (this.bsAtoms1, c);
org.jmol.util.BitSetUtil.deleteBits (this.bsAtoms2, c);
return this.isValid ();
}, "~N,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setModelIndex", 
function (a) {
this.modelIndex = a;
}, "~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"hbondMin", 2.5);
});
