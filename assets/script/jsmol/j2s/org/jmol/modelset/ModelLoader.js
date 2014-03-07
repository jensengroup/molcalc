Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (["java.util.Hashtable", "org.jmol.util.BitSet", "org.jmol.viewer.JmolConstants"], "org.jmol.modelset.ModelLoader", ["java.lang.Boolean", "$.Float", "$.NullPointerException", "java.util.ArrayList", "$.Arrays", "org.jmol.api.Interface", "org.jmol.constant.EnumStructure", "org.jmol.modelset.Chain", "$.Group", "$.Model", "$.ModelSet", "org.jmol.util.ArrayUtil", "$.BitSetUtil", "$.Elements", "$.JmolMolecule", "$.Logger", "$.Point3f", "$.StringXBuilder", "$.TextFormat", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.modelSet = null;
this.mergeModelSet = null;
this.merging = false;
this.jmolData = null;
this.group3Lists = null;
this.group3Counts = null;
this.specialAtomIndexes = null;
this.someModelsHaveUnitcells = false;
this.isTrajectory = false;
this.doMinimize = false;
this.doAddHydrogens = false;
this.doRemoveAddedHydrogens = false;
this.fileHeader = null;
this.jbr = null;
this.isPDB = false;
this.groups = null;
this.groupCount = 0;
this.htAtomMap = null;
this.chainOf = null;
this.group3Of = null;
this.seqcodes = null;
this.firstAtomIndexes = null;
this.currentModelIndex = 0;
this.currentModel = null;
this.currentChainID = '\0';
this.currentChain = null;
this.currentGroupSequenceNumber = 0;
this.currentGroupInsertionCode = '\0';
this.currentGroup3 = null;
this.nullGroup = null;
this.baseModelIndex = 0;
this.baseModelCount = 0;
this.baseAtomIndex = 0;
this.baseGroupIndex = 0;
this.baseTrajectoryCount = 0;
this.appendNew = false;
this.adapterModelCount = 0;
this.adapterTrajectoryCount = 0;
this.noAutoBond = false;
this.is2D = false;
this.$mergeGroups = null;
this.vStereo = null;
this.structuresDefinedInFile = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "ModelLoader");
Clazz.prepareFields (c$, function () {
this.specialAtomIndexes =  Clazz.newIntArray (org.jmol.viewer.JmolConstants.ATOMID_MAX, 0);
this.htAtomMap =  new java.util.Hashtable ();
this.structuresDefinedInFile =  new org.jmol.util.BitSet ();
});
Clazz.makeConstructor (c$, 
function (viewer, modelSetName, loadScript, atomSetCollection, mergeModelSet, bsNew) {
this.viewer = viewer;
this.modelSet =  new org.jmol.modelset.ModelSet (viewer, modelSetName);
this.mergeModelSet = mergeModelSet;
this.merging = (mergeModelSet != null && mergeModelSet.atomCount > 0);
if (this.merging) {
this.modelSet.canSkipLoad = false;
} else {
viewer.resetShapes (false);
}this.modelSet.preserveState = viewer.getPreserveState ();
this.modelSet.showRebondTimes = viewer.getShowTiming ();
if (bsNew == null) {
this.initializeInfo (modelSetName, null);
this.createModelSet (null, null, null);
viewer.setStringProperty ("_fileType", "");
return;
}if (!this.modelSet.preserveState) this.modelSet.canSkipLoad = false;
var adapter = viewer.getModelAdapter ();
var info = adapter.getAtomSetCollectionAuxiliaryInfo (atomSetCollection);
info.put ("loadScript", loadScript);
this.initializeInfo (adapter.getFileTypeName (atomSetCollection).toLowerCase ().intern (), info);
this.createModelSet (adapter, atomSetCollection, bsNew);
}, "org.jmol.viewer.Viewer,~S,org.jmol.util.StringXBuilder,~O,org.jmol.modelset.ModelSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "initializeInfo", 
($fz = function (name, info) {
this.modelSet.g3d = this.viewer.getGraphicsData ();
this.modelSet.modelSetTypeName = name;
this.modelSet.isXYZ = (name === "xyz");
this.modelSet.modelSetAuxiliaryInfo = info;
this.modelSet.modelSetProperties = this.modelSet.getModelSetAuxiliaryInfoValue ("properties");
this.isPDB = this.modelSet.isPDB = this.modelSet.getModelSetAuxiliaryInfoBoolean ("isPDB");
if (this.isPDB) {
try {
var shapeClass = Class.forName ("org.jmol.modelsetbio.Resolver");
this.jbr = shapeClass.newInstance ();
this.jbr.initialize (this.modelSet);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("developer error: org.jmol.modelsetbio.Resolver could not be found");
} else {
throw e;
}
}
}this.jmolData = this.modelSet.getModelSetAuxiliaryInfoValue ("jmolData");
this.fileHeader = this.modelSet.getModelSetAuxiliaryInfoValue ("fileHeader");
this.modelSet.trajectorySteps = this.modelSet.getModelSetAuxiliaryInfoValue ("trajectorySteps");
this.isTrajectory = (this.modelSet.trajectorySteps != null);
if (this.isTrajectory) {
info.remove ("trajectorySteps");
this.modelSet.vibrationSteps = info.get ("vibrationSteps");
info.remove ("vibrationSteps");
}this.doAddHydrogens = (this.jbr != null && !this.isTrajectory && this.modelSet.getModelSetAuxiliaryInfoValue ("pdbNoHydrogens") == null && this.viewer.getBooleanProperty ("pdbAddHydrogens"));
if (info != null) info.remove ("pdbNoHydrogens");
this.noAutoBond = this.modelSet.getModelSetAuxiliaryInfoBoolean ("noAutoBond");
this.is2D = this.modelSet.getModelSetAuxiliaryInfoBoolean ("is2D");
this.doMinimize = this.is2D && this.modelSet.getModelSetAuxiliaryInfoBoolean ("doMinimize");
this.adapterTrajectoryCount = (this.modelSet.trajectorySteps == null ? 0 : this.modelSet.trajectorySteps.size ());
this.modelSet.someModelsHaveSymmetry = this.modelSet.getModelSetAuxiliaryInfoBoolean ("someModelsHaveSymmetry");
this.someModelsHaveUnitcells = this.modelSet.getModelSetAuxiliaryInfoBoolean ("someModelsHaveUnitcells");
this.modelSet.someModelsHaveFractionalCoordinates = this.modelSet.getModelSetAuxiliaryInfoBoolean ("someModelsHaveFractionalCoordinates");
if (this.merging) {
this.modelSet.isPDB = new Boolean (this.modelSet.isPDB | this.mergeModelSet.isPDB).valueOf ();
this.modelSet.someModelsHaveSymmetry = new Boolean (this.modelSet.someModelsHaveSymmetry | this.mergeModelSet.getModelSetAuxiliaryInfoBoolean ("someModelsHaveSymmetry")).valueOf ();
this.someModelsHaveUnitcells = new Boolean (this.someModelsHaveUnitcells | this.mergeModelSet.getModelSetAuxiliaryInfoBoolean ("someModelsHaveUnitcells")).valueOf ();
this.modelSet.someModelsHaveFractionalCoordinates = new Boolean (this.modelSet.someModelsHaveFractionalCoordinates | this.mergeModelSet.getModelSetAuxiliaryInfoBoolean ("someModelsHaveFractionalCoordinates")).valueOf ();
this.modelSet.someModelsHaveAromaticBonds = new Boolean (this.modelSet.someModelsHaveAromaticBonds | this.mergeModelSet.someModelsHaveAromaticBonds).valueOf ();
this.modelSet.modelSetAuxiliaryInfo.put ("someModelsHaveSymmetry", Boolean.$valueOf (this.modelSet.someModelsHaveSymmetry));
this.modelSet.modelSetAuxiliaryInfo.put ("someModelsHaveUnitcells", Boolean.$valueOf (this.someModelsHaveUnitcells));
this.modelSet.modelSetAuxiliaryInfo.put ("someModelsHaveFractionalCoordinates", Boolean.$valueOf (this.modelSet.someModelsHaveFractionalCoordinates));
this.modelSet.modelSetAuxiliaryInfo.put ("someModelsHaveAromaticBonds", Boolean.$valueOf (this.modelSet.someModelsHaveAromaticBonds));
}}, $fz.isPrivate = true, $fz), "~S,java.util.Map");
Clazz.defineMethod (c$, "getGroup3", 
function (iGroup) {
return (iGroup >= this.group3Of.length ? null : this.group3Of[iGroup]);
}, "~N");
Clazz.defineMethod (c$, "getFirstAtomIndex", 
function (iGroup) {
return this.firstAtomIndexes[iGroup];
}, "~N");
Clazz.defineMethod (c$, "getModelSet", 
function () {
return this.modelSet;
});
Clazz.defineMethod (c$, "getAtomCount", 
function () {
return this.modelSet.atomCount;
});
Clazz.defineMethod (c$, "createModelSet", 
($fz = function (adapter, atomSetCollection, bsNew) {
var nAtoms = (adapter == null ? 0 : adapter.getAtomCount (atomSetCollection));
if (nAtoms > 0) org.jmol.util.Logger.info ("reading " + nAtoms + " atoms");
this.adapterModelCount = (adapter == null ? 1 : adapter.getAtomSetCount (atomSetCollection));
this.appendNew = (!this.merging || adapter == null || this.adapterModelCount > 1 || this.isTrajectory || this.viewer.getAppendNew ());
this.htAtomMap.clear ();
this.chainOf =  new Array (32);
this.group3Of =  new Array (32);
this.seqcodes =  Clazz.newIntArray (32, 0);
this.firstAtomIndexes =  Clazz.newIntArray (32, 0);
this.currentChainID = '\uFFFF';
this.currentChain = null;
this.currentGroupInsertionCode = '\uFFFF';
this.currentGroup3 = "xxxxx";
this.currentModelIndex = -1;
this.currentModel = null;
if (this.merging) {
this.baseModelCount = this.mergeModelSet.modelCount;
this.baseTrajectoryCount = this.mergeModelSet.getMergeTrajectoryCount (this.isTrajectory);
if (this.baseTrajectoryCount > 0) {
if (this.isTrajectory) {
if (this.mergeModelSet.vibrationSteps == null) {
this.mergeModelSet.vibrationSteps =  new java.util.ArrayList ();
for (var i = this.mergeModelSet.trajectorySteps.size (); --i >= 0; ) this.mergeModelSet.vibrationSteps.add (null);

}for (var i = 0; i < this.modelSet.trajectorySteps.size (); i++) {
this.mergeModelSet.trajectorySteps.add (this.modelSet.trajectorySteps.get (i));
this.mergeModelSet.vibrationSteps.add (this.modelSet.vibrationSteps == null ? null : this.modelSet.vibrationSteps.get (i));
}
}this.modelSet.trajectorySteps = this.mergeModelSet.trajectorySteps;
this.modelSet.vibrationSteps = this.mergeModelSet.vibrationSteps;
}}this.initializeAtomBondModelCounts (nAtoms);
if (bsNew != null && (this.doMinimize || this.is2D)) {
bsNew.setBits (this.baseAtomIndex, this.baseAtomIndex + nAtoms);
}if (adapter == null) {
this.setModelNameNumberProperties (0, -1, "", 1, null, null, null);
} else {
if (this.adapterModelCount > 0) {
org.jmol.util.Logger.info ("ModelSet: haveSymmetry:" + this.modelSet.someModelsHaveSymmetry + " haveUnitcells:" + this.someModelsHaveUnitcells + " haveFractionalCoord:" + this.modelSet.someModelsHaveFractionalCoordinates);
org.jmol.util.Logger.info (this.adapterModelCount + " model" + (this.modelSet.modelCount == 1 ? "" : "s") + " in this collection. Use getProperty \"modelInfo\" or" + " getProperty \"auxiliaryInfo\" to inspect them.");
}var q = this.modelSet.getModelSetAuxiliaryInfoValue ("defaultOrientationQuaternion");
if (q != null) {
org.jmol.util.Logger.info ("defaultOrientationQuaternion = " + q);
org.jmol.util.Logger.info ("Use \"set autoLoadOrientation TRUE\" before loading or \"restore orientation DEFAULT\" after loading to view this orientation.");
}this.iterateOverAllNewModels (adapter, atomSetCollection);
this.iterateOverAllNewAtoms (adapter, atomSetCollection);
this.iterateOverAllNewBonds (adapter, atomSetCollection);
if (this.merging && !this.appendNew) {
var info = adapter.getAtomSetAuxiliaryInfo (atomSetCollection, 0);
this.modelSet.setModelAuxiliaryInfo (this.baseModelIndex, "initialAtomCount", info.get ("initialAtomCount"));
this.modelSet.setModelAuxiliaryInfo (this.baseModelIndex, "initialBondCount", info.get ("initialBondCount"));
}this.initializeUnitCellAndSymmetry ();
this.initializeBonding ();
}this.finalizeGroupBuild ();
if (this.is2D) {
this.applyStereochemistry ();
}if (this.doAddHydrogens) this.jbr.finalizeHydrogens ();
if (adapter != null) {
this.modelSet.calculatePolymers (this.groups, this.groupCount, this.baseGroupIndex, null);
this.iterateOverAllNewStructures (adapter, atomSetCollection);
adapter.finish (atomSetCollection);
}this.setDefaultRendering (this.viewer.getSmallMoleculeMaxAtoms ());
var rd = this.viewer.getDefaultRadiusData ();
var atomCount = this.modelSet.atomCount;
var atoms = this.modelSet.atoms;
for (var i = this.baseAtomIndex; i < atomCount; i++) atoms[i].setMadAtom (this.viewer, rd);

var models = this.modelSet.models;
for (var i = models[this.baseModelIndex].firstAtomIndex; i < atomCount; i++) models[atoms[i].modelIndex].bsAtoms.set (i);

this.setAtomProperties ();
this.freeze ();
this.finalizeShapes ();
if (this.mergeModelSet != null) {
this.mergeModelSet.releaseModelSet ();
}this.mergeModelSet = null;
}, $fz.isPrivate = true, $fz), "org.jmol.api.JmolAdapter,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setDefaultRendering", 
($fz = function (maxAtoms) {
var sb =  new org.jmol.util.StringXBuilder ();
var modelCount = this.modelSet.modelCount;
var models = this.modelSet.models;
for (var i = this.baseModelIndex; i < modelCount; i++) if (models[i].isBioModel) models[i].getDefaultLargePDBRendering (sb, maxAtoms);

if (sb.length () == 0) return;
sb.append ("select *;");
var script = this.modelSet.getModelSetAuxiliaryInfoValue ("jmolscript");
if (script == null) script = "";
sb.append (script);
this.modelSet.modelSetAuxiliaryInfo.put ("jmolscript", sb.toString ());
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setAtomProperties", 
($fz = function () {
var atomIndex = this.baseAtomIndex;
var modelAtomCount = 0;
var modelCount = this.modelSet.modelCount;
var models = this.modelSet.models;
for (var i = this.baseModelIndex; i < modelCount; atomIndex += modelAtomCount, i++) {
modelAtomCount = models[i].bsAtoms.cardinality ();
var atomProperties = this.modelSet.getModelAuxiliaryInfoValue (i, "atomProperties");
if (atomProperties == null) continue;
for (var entry, $entry = atomProperties.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var value = entry.getValue ();
var bs = this.modelSet.getModelAtomBitSetIncludingDeleted (i, true);
if (this.doAddHydrogens) value = this.jbr.fixPropertyValue (bs, value);
key = "property_" + key.toLowerCase ();
org.jmol.util.Logger.info ("creating " + key + " for model " + this.modelSet.getModelName (i));
this.viewer.setData (key, [key, value, bs,  new Integer (0)], this.modelSet.atomCount, 0, 0, 2147483647, 0);
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeAtomBondModelCounts", 
($fz = function (nAtoms) {
var trajectoryCount = this.adapterTrajectoryCount;
if (this.merging) {
if (this.appendNew) {
this.baseModelIndex = this.baseModelCount;
this.modelSet.modelCount = this.baseModelCount + this.adapterModelCount;
} else {
this.baseModelIndex = this.viewer.getCurrentModelIndex ();
if (this.baseModelIndex < 0) this.baseModelIndex = this.baseModelCount - 1;
this.modelSet.modelCount = this.baseModelCount;
}this.modelSet.atomCount = this.baseAtomIndex = this.mergeModelSet.atomCount;
this.modelSet.bondCount = this.mergeModelSet.bondCount;
this.$mergeGroups = this.mergeModelSet.getGroups ();
this.groupCount = this.baseGroupIndex = this.$mergeGroups.length;
this.modelSet.mergeModelArrays (this.mergeModelSet);
this.modelSet.growAtomArrays (this.modelSet.atomCount + nAtoms);
} else {
this.modelSet.modelCount = this.adapterModelCount;
this.modelSet.atomCount = 0;
this.modelSet.bondCount = 0;
this.modelSet.atoms =  new Array (nAtoms);
this.modelSet.bonds =  new Array (250 + nAtoms);
}if (this.doAddHydrogens) this.jbr.initializeHydrogenAddition (this, this.modelSet.bondCount);
if (trajectoryCount > 1) this.modelSet.modelCount += trajectoryCount - 1;
this.modelSet.models = org.jmol.util.ArrayUtil.arrayCopyObject (this.modelSet.models, this.modelSet.modelCount);
this.modelSet.modelFileNumbers = org.jmol.util.ArrayUtil.arrayCopyI (this.modelSet.modelFileNumbers, this.modelSet.modelCount);
this.modelSet.modelNumbers = org.jmol.util.ArrayUtil.arrayCopyI (this.modelSet.modelNumbers, this.modelSet.modelCount);
this.modelSet.modelNumbersForAtomLabel = org.jmol.util.ArrayUtil.arrayCopyS (this.modelSet.modelNumbersForAtomLabel, this.modelSet.modelCount);
this.modelSet.modelNames = org.jmol.util.ArrayUtil.arrayCopyS (this.modelSet.modelNames, this.modelSet.modelCount);
this.modelSet.frameTitles = org.jmol.util.ArrayUtil.arrayCopyS (this.modelSet.frameTitles, this.modelSet.modelCount);
if (this.merging) for (var i = 0; i < this.mergeModelSet.modelCount; i++) (this.modelSet.models[i] = this.mergeModelSet.models[i]).modelSet = this.modelSet;

}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "mergeGroups", 
($fz = function () {
var info = this.mergeModelSet.getAuxiliaryInfo (null);
var mergeGroup3Lists = info.get ("group3Lists");
var mergeGroup3Counts = info.get ("group3Counts");
if (mergeGroup3Lists != null) {
for (var i = 0; i < this.baseModelCount; i++) {
this.group3Lists[i + 1] = mergeGroup3Lists[i + 1];
this.group3Counts[i + 1] = mergeGroup3Counts[i + 1];
this.structuresDefinedInFile.set (i);
}
this.group3Lists[0] = mergeGroup3Lists[0];
this.group3Counts[0] = mergeGroup3Counts[0];
}if (!this.appendNew && this.isPDB) this.structuresDefinedInFile.clear (this.baseModelIndex);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "iterateOverAllNewModels", 
($fz = function (adapter, atomSetCollection) {
this.group3Lists =  new Array (this.modelSet.modelCount + 1);
this.group3Counts = org.jmol.util.ArrayUtil.newInt2 (this.modelSet.modelCount + 1);
this.structuresDefinedInFile =  new org.jmol.util.BitSet ();
if (this.merging) this.mergeGroups ();
var iTrajectory = (this.isTrajectory ? this.baseTrajectoryCount : -1);
var ipt = this.baseModelIndex;
for (var i = 0; i < this.adapterModelCount; ++i, ++ipt) {
var modelNumber = adapter.getAtomSetNumber (atomSetCollection, i);
var modelName = adapter.getAtomSetName (atomSetCollection, i);
var modelAuxiliaryInfo = adapter.getAtomSetAuxiliaryInfo (atomSetCollection, i);
if (modelAuxiliaryInfo.containsKey ("modelID")) modelAuxiliaryInfo.put ("modelID0", modelAuxiliaryInfo.get ("modelID"));
var modelProperties = modelAuxiliaryInfo.get ("modelProperties");
this.viewer.setStringProperty ("_fileType", modelAuxiliaryInfo.get ("fileType"));
if (modelName == null) modelName = (this.jmolData != null && this.jmolData.indexOf (";") > 2 ? this.jmolData.substring (this.jmolData.indexOf (":") + 2, this.jmolData.indexOf (";")) : this.appendNew ? "" + (modelNumber % 1000000) : "");
var isPDBModel = this.setModelNameNumberProperties (ipt, iTrajectory, modelName, modelNumber, modelProperties, modelAuxiliaryInfo, this.jmolData);
if (isPDBModel) {
this.group3Lists[ipt + 1] = org.jmol.viewer.JmolConstants.getGroup3List ();
this.group3Counts[ipt + 1] =  Clazz.newIntArray (org.jmol.viewer.JmolConstants.getGroup3Count () + 10, 0);
if (this.group3Lists[0] == null) {
this.group3Lists[0] = org.jmol.viewer.JmolConstants.getGroup3List ();
this.group3Counts[0] =  Clazz.newIntArray (org.jmol.viewer.JmolConstants.getGroup3Count () + 10, 0);
}}if (this.modelSet.getModelAuxiliaryInfoValue (ipt, "periodicOriginXyz") != null) this.modelSet.someModelsHaveSymmetry = true;
}
var m = this.modelSet.models[this.baseModelIndex];
this.viewer.setSmilesString (this.modelSet.modelSetAuxiliaryInfo.get ("smilesString"));
var loadState = this.modelSet.modelSetAuxiliaryInfo.remove ("loadState");
var loadScript = this.modelSet.modelSetAuxiliaryInfo.remove ("loadScript");
if (loadScript.indexOf ("Viewer.AddHydrogens") < 0 || !m.isModelKit) {
var lines = org.jmol.util.TextFormat.split (loadState, '\n');
var sb =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < lines.length; i++) {
var pt = m.loadState.indexOf (lines[i]);
if (pt < 0 || pt != m.loadState.lastIndexOf (lines[i])) sb.append (lines[i]).appendC ('\n');
}
m.loadState += m.loadScript.toString () + sb.toString ();
m.loadScript =  new org.jmol.util.StringXBuilder ();
m.loadScript.append ("  ").appendSB (loadScript).append (";\n");
}if (this.isTrajectory) {
var n = (this.modelSet.modelCount - ipt + 1);
org.jmol.util.Logger.info (n + " trajectory steps read");
this.modelSet.setModelAuxiliaryInfo (this.baseModelCount, "trajectoryStepCount", Integer.$valueOf (n));
for (var ia = this.adapterModelCount, i = ipt; i < this.modelSet.modelCount; i++, ia++) {
this.modelSet.models[i] = this.modelSet.models[this.baseModelCount];
this.modelSet.modelNumbers[i] = adapter.getAtomSetNumber (atomSetCollection, ia);
this.modelSet.modelNames[i] = adapter.getAtomSetName (atomSetCollection, ia);
this.structuresDefinedInFile.set (i);
}
}this.finalizeModels (this.baseModelCount);
}, $fz.isPrivate = true, $fz), "org.jmol.api.JmolAdapter,~O");
Clazz.defineMethod (c$, "setModelNameNumberProperties", 
($fz = function (modelIndex, trajectoryBaseIndex, modelName, modelNumber, modelProperties, modelAuxiliaryInfo, jmolData) {
var modelIsPDB = (modelAuxiliaryInfo != null && Boolean.TRUE === modelAuxiliaryInfo.get ("isPDB"));
if (this.appendNew) {
this.modelSet.models[modelIndex] = (modelIsPDB ? this.jbr.getBioModel (this.modelSet, modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo) :  new org.jmol.modelset.Model (this.modelSet, modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo));
this.modelSet.modelNumbers[modelIndex] = modelNumber;
this.modelSet.modelNames[modelIndex] = modelName;
} else {
var atomInfo = modelAuxiliaryInfo.get ("PDB_CONECT_firstAtom_count_max");
if (atomInfo != null) this.modelSet.setModelAuxiliaryInfo (modelIndex, "PDB_CONECT_firstAtom_count_max", atomInfo);
}var models = this.modelSet.models;
var atoms = this.modelSet.atoms;
models[modelIndex].bsAtoms.set (atoms.length + 1);
models[modelIndex].bsAtoms.clear (atoms.length + 1);
var codes = this.modelSet.getModelAuxiliaryInfoValue (modelIndex, "altLocs");
models[modelIndex].setNAltLocs (codes == null ? 0 : codes.length);
if (codes != null) {
var altlocs = codes.toCharArray ();
java.util.Arrays.sort (altlocs);
codes = String.valueOf (altlocs);
this.modelSet.setModelAuxiliaryInfo (modelIndex, "altLocs", codes);
}codes = this.modelSet.getModelAuxiliaryInfoValue (modelIndex, "insertionCodes");
models[modelIndex].setNInsertions (codes == null ? 0 : codes.length);
var isModelKit = (this.modelSet.modelSetName != null && this.modelSet.modelSetName.startsWith ("Jmol Model Kit") || modelName.startsWith ("Jmol Model Kit") || "Jme".equals (this.modelSet.getModelAuxiliaryInfoValue (modelIndex, "fileType")));
models[modelIndex].isModelKit = isModelKit;
return modelIsPDB;
}, $fz.isPrivate = true, $fz), "~N,~N,~S,~N,java.util.Properties,java.util.Map,~S");
Clazz.defineMethod (c$, "finalizeModels", 
($fz = function (baseModelCount) {
var modelCount = this.modelSet.modelCount;
if (modelCount == baseModelCount) return;
var sNum;
var modelnumber = 0;
var lastfilenumber = -1;
var modelNumbers = this.modelSet.modelNumbers;
var modelNames = this.modelSet.modelNames;
if (this.isTrajectory) for (var i = baseModelCount; ++i < this.modelSet.modelCount; ) modelNumbers[i] = modelNumbers[i - 1] + 1;

if (baseModelCount > 0) {
if (modelNumbers[0] < 1000000) {
for (var i = 0; i < baseModelCount; i++) {
if (modelNames[i].length == 0) modelNames[i] = "" + modelNumbers[i];
modelNumbers[i] += 1000000;
this.modelSet.modelNumbersForAtomLabel[i] = "1." + (i + 1);
}
}var filenumber = modelNumbers[baseModelCount - 1];
filenumber -= filenumber % 1000000;
if (modelNumbers[baseModelCount] < 1000000) filenumber += 1000000;
for (var i = baseModelCount; i < modelCount; i++) modelNumbers[i] += filenumber;

}var models = this.modelSet.models;
for (var i = baseModelCount; i < modelCount; ++i) {
if (this.fileHeader != null) this.modelSet.setModelAuxiliaryInfo (i, "fileHeader", this.fileHeader);
var filenumber = Clazz.doubleToInt (modelNumbers[i] / 1000000);
if (filenumber != lastfilenumber) {
modelnumber = 0;
lastfilenumber = filenumber;
}modelnumber++;
if (filenumber == 0) {
sNum = "" + this.modelSet.getModelNumber (i);
filenumber = 1;
} else {
sNum = filenumber + "." + modelnumber;
}this.modelSet.modelNumbersForAtomLabel[i] = sNum;
models[i].fileIndex = filenumber - 1;
this.modelSet.modelFileNumbers[i] = filenumber * 1000000 + modelnumber;
if (modelNames[i] == null || modelNames[i].length == 0) modelNames[i] = sNum;
}
if (this.merging) for (var i = 0; i < baseModelCount; i++) models[i].modelSet = this.modelSet;

for (var i = 0; i < modelCount; i++) {
this.modelSet.setModelAuxiliaryInfo (i, "modelName", modelNames[i]);
this.modelSet.setModelAuxiliaryInfo (i, "modelNumber", Integer.$valueOf (modelNumbers[i] % 1000000));
this.modelSet.setModelAuxiliaryInfo (i, "modelFileNumber", Integer.$valueOf (this.modelSet.modelFileNumbers[i]));
this.modelSet.setModelAuxiliaryInfo (i, "modelNumberDotted", this.modelSet.getModelNumberDotted (i));
var codes = this.modelSet.getModelAuxiliaryInfoValue (i, "altLocs");
if (codes != null) {
org.jmol.util.Logger.info ("model " + this.modelSet.getModelNumberDotted (i) + " alternative locations: " + codes);
}}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "iterateOverAllNewAtoms", 
($fz = function (adapter, atomSetCollection) {
var iLast = -1;
var isPdbThisModel = false;
var addH = false;
var iterAtom = adapter.getAtomIterator (atomSetCollection);
var nRead = 0;
var models = this.modelSet.models;
if (this.modelSet.modelCount > 0) this.nullGroup =  new org.jmol.modelset.Group ( new org.jmol.modelset.Chain (this.modelSet.models[this.baseModelIndex], ' '), "", 0, -1, -1);
while (iterAtom.hasNext ()) {
nRead++;
var modelIndex = iterAtom.getAtomSetIndex () + this.baseModelIndex;
if (modelIndex != iLast) {
this.currentModelIndex = modelIndex;
this.currentModel = models[modelIndex];
this.currentChainID = '\uFFFF';
models[modelIndex].bsAtoms.clearAll ();
isPdbThisModel = models[modelIndex].isBioModel;
iLast = modelIndex;
addH = isPdbThisModel && this.doAddHydrogens;
if (this.jbr != null) this.jbr.setHaveHsAlready (false);
}var group3 = iterAtom.getGroup3 ();
this.checkNewGroup (adapter, iterAtom.getChainID (), group3, iterAtom.getSequenceNumber (), iterAtom.getInsertionCode (), addH);
var isotope = iterAtom.getElementNumber ();
if (addH && org.jmol.util.Elements.getElementNumber (isotope) == 1) this.jbr.setHaveHsAlready (true);
var name = iterAtom.getAtomName ();
var charge = (addH ? this.getPdbCharge (group3, name) : iterAtom.getFormalCharge ());
this.addAtom (isPdbThisModel, iterAtom.getAtomSymmetry (), iterAtom.getAtomSite (), iterAtom.getUniqueID (), isotope, name, charge, iterAtom.getPartialCharge (), iterAtom.getEllipsoid (), iterAtom.getOccupancy (), iterAtom.getBfactor (), iterAtom.getX (), iterAtom.getY (), iterAtom.getZ (), iterAtom.getIsHetero (), iterAtom.getAtomSerial (), group3, iterAtom.getVectorX (), iterAtom.getVectorY (), iterAtom.getVectorZ (), iterAtom.getAlternateLocationID (), iterAtom.getRadius ());
}
if (this.groupCount > 0 && addH) this.jbr.addImplicitHydrogenAtoms (adapter, this.groupCount - 1);
iLast = -1;
var vdwtypeLast = null;
var atoms = this.modelSet.atoms;
for (var i = 0; i < this.modelSet.atomCount; i++) {
if (atoms[i].modelIndex != iLast) {
iLast = atoms[i].modelIndex;
models[iLast].firstAtomIndex = i;
var vdwtype = this.modelSet.getDefaultVdwType (iLast);
if (vdwtype !== vdwtypeLast) {
org.jmol.util.Logger.info ("Default Van der Waals type for model" + " set to " + vdwtype.getVdwLabel ());
vdwtypeLast = vdwtype;
}}}
org.jmol.util.Logger.info (nRead + " atoms created");
}, $fz.isPrivate = true, $fz), "org.jmol.api.JmolAdapter,~O");
Clazz.defineMethod (c$, "getPdbCharge", 
($fz = function (group3, name) {
if (group3.equals ("ARG") && name.equals ("NH1") || group3.equals ("LYS") && name.equals ("NZ") || group3.equals ("HIS") && name.equals ("ND1")) return 1;
return 0;
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "addAtom", 
($fz = function (isPDB, atomSymmetry, atomSite, atomUid, atomicAndIsotopeNumber, atomName, formalCharge, partialCharge, ellipsoid, occupancy, bfactor, x, y, z, isHetero, atomSerial, group3, vectorX, vectorY, vectorZ, alternateLocationID, radius) {
var specialAtomID = 0;
if (atomName != null) {
if (isPDB && atomName.indexOf ('*') >= 0) atomName = atomName.$replace ('*', '\'');
specialAtomID = org.jmol.viewer.JmolConstants.lookupSpecialAtomID (atomName);
if (isPDB && specialAtomID == 2 && "CA".equalsIgnoreCase (group3)) specialAtomID = 0;
}var atom = this.modelSet.addAtom (this.currentModelIndex, this.nullGroup, atomicAndIsotopeNumber, atomName, atomSerial, atomSite, x, y, z, radius, vectorX, vectorY, vectorZ, formalCharge, partialCharge, occupancy, bfactor, ellipsoid, isHetero, specialAtomID, atomSymmetry);
atom.setAltLoc (alternateLocationID);
this.htAtomMap.put (atomUid, atom);
}, $fz.isPrivate = true, $fz), "~B,org.jmol.util.BitSet,~N,~O,~N,~S,~N,~N,~A,~N,~N,~N,~N,~N,~B,~N,~S,~N,~N,~N,~S,~N");
Clazz.defineMethod (c$, "checkNewGroup", 
($fz = function (adapter, chainID, group3, groupSequenceNumber, groupInsertionCode, addH) {
var group3i = (group3 == null ? null : group3.intern ());
if (chainID != this.currentChainID) {
this.currentChainID = chainID;
this.currentChain = this.getOrAllocateChain (this.currentModel, chainID);
this.currentGroupInsertionCode = '\uFFFF';
this.currentGroupSequenceNumber = -1;
this.currentGroup3 = "xxxx";
}if (groupSequenceNumber != this.currentGroupSequenceNumber || groupInsertionCode != this.currentGroupInsertionCode || group3i !== this.currentGroup3) {
if (this.groupCount > 0 && addH) {
this.jbr.addImplicitHydrogenAtoms (adapter, this.groupCount - 1);
this.jbr.setHaveHsAlready (false);
}this.currentGroupSequenceNumber = groupSequenceNumber;
this.currentGroupInsertionCode = groupInsertionCode;
this.currentGroup3 = group3i;
while (this.groupCount >= this.group3Of.length) {
this.chainOf = org.jmol.util.ArrayUtil.doubleLength (this.chainOf);
this.group3Of = org.jmol.util.ArrayUtil.doubleLengthS (this.group3Of);
this.seqcodes = org.jmol.util.ArrayUtil.doubleLengthI (this.seqcodes);
this.firstAtomIndexes = org.jmol.util.ArrayUtil.doubleLengthI (this.firstAtomIndexes);
}
this.firstAtomIndexes[this.groupCount] = this.modelSet.atomCount;
this.chainOf[this.groupCount] = this.currentChain;
this.group3Of[this.groupCount] = group3;
this.seqcodes[this.groupCount] = org.jmol.modelset.Group.getSeqcode (groupSequenceNumber, groupInsertionCode);
++this.groupCount;
}}, $fz.isPrivate = true, $fz), "org.jmol.api.JmolAdapter,~S,~S,~N,~S,~B");
Clazz.defineMethod (c$, "getOrAllocateChain", 
($fz = function (model, chainID) {
var chain = model.getChain (chainID);
if (chain != null) return chain;
if (model.chainCount == model.chains.length) model.chains = org.jmol.util.ArrayUtil.doubleLength (model.chains);
return model.chains[model.chainCount++] =  new org.jmol.modelset.Chain (model, chainID);
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Model,~S");
Clazz.defineMethod (c$, "iterateOverAllNewBonds", 
($fz = function (adapter, atomSetCollection) {
var iterBond = adapter.getBondIterator (atomSetCollection);
if (iterBond == null) return;
var mad = this.viewer.getMadBond ();
var order;
this.modelSet.defaultCovalentMad = (this.jmolData == null ? mad : 0);
var haveMultipleBonds = false;
while (iterBond.hasNext ()) {
order = iterBond.getEncodedOrder ();
this.bondAtoms (iterBond.getAtomUniqueID1 (), iterBond.getAtomUniqueID2 (), order);
if (order > 1 && order != 1025 && order != 1041) haveMultipleBonds = true;
}
if (haveMultipleBonds && this.modelSet.someModelsHaveSymmetry && !this.viewer.getApplySymmetryToBonds ()) org.jmol.util.Logger.info ("ModelSet: use \"set appletSymmetryToBonds TRUE \" to apply the file-based multiple bonds to symmetry-generated atoms.");
this.modelSet.defaultCovalentMad = mad;
}, $fz.isPrivate = true, $fz), "org.jmol.api.JmolAdapter,~O");
Clazz.defineMethod (c$, "bondAtoms", 
($fz = function (atomUid1, atomUid2, order) {
var atom1 = this.htAtomMap.get (atomUid1);
if (atom1 == null) {
org.jmol.util.Logger.error ("bondAtoms cannot find atomUid1?:" + atomUid1);
return;
}var atom2 = this.htAtomMap.get (atomUid2);
if (atom2 == null) {
org.jmol.util.Logger.error ("bondAtoms cannot find atomUid2?:" + atomUid2);
return;
}if (atom1.isBonded (atom2)) return;
var isNear = (order == 1025);
var isFar = (order == 1041);
var bond;
if (isNear || isFar) {
bond = this.modelSet.bondMutually (atom1, atom2, (this.is2D ? order : 1), this.modelSet.getDefaultMadFromOrder (1), 0);
if (this.vStereo == null) {
this.vStereo =  new java.util.ArrayList ();
}this.vStereo.add (bond);
} else {
bond = this.modelSet.bondMutually (atom1, atom2, order, this.modelSet.getDefaultMadFromOrder (order), 0);
if (bond.isAromatic ()) {
this.modelSet.someModelsHaveAromaticBonds = true;
}}if (this.modelSet.bondCount == this.modelSet.bonds.length) {
this.modelSet.bonds = org.jmol.util.ArrayUtil.arrayCopyObject (this.modelSet.bonds, this.modelSet.bondCount + 250);
}this.modelSet.setBond (this.modelSet.bondCount++, bond);
}, $fz.isPrivate = true, $fz), "~O,~O,~N");
Clazz.defineMethod (c$, "iterateOverAllNewStructures", 
($fz = function (adapter, atomSetCollection) {
var iterStructure = adapter.getStructureIterator (atomSetCollection);
if (iterStructure != null) while (iterStructure.hasNext ()) {
if (iterStructure.getStructureType () !== org.jmol.constant.EnumStructure.TURN) {
this.defineStructure (iterStructure.getModelIndex (), iterStructure.getSubstructureType (), iterStructure.getStructureID (), iterStructure.getSerialID (), iterStructure.getStrandCount (), iterStructure.getStartChainID (), iterStructure.getStartSequenceNumber (), iterStructure.getStartInsertionCode (), iterStructure.getEndChainID (), iterStructure.getEndSequenceNumber (), iterStructure.getEndInsertionCode ());
}}
iterStructure = adapter.getStructureIterator (atomSetCollection);
if (iterStructure != null) while (iterStructure.hasNext ()) {
if (iterStructure.getStructureType () === org.jmol.constant.EnumStructure.TURN) this.defineStructure (iterStructure.getModelIndex (), iterStructure.getSubstructureType (), iterStructure.getStructureID (), 1, 1, iterStructure.getStartChainID (), iterStructure.getStartSequenceNumber (), iterStructure.getStartInsertionCode (), iterStructure.getEndChainID (), iterStructure.getEndSequenceNumber (), iterStructure.getEndInsertionCode ());
}
}, $fz.isPrivate = true, $fz), "org.jmol.api.JmolAdapter,~O");
Clazz.defineMethod (c$, "defineStructure", 
($fz = function (modelIndex, subType, structureID, serialID, strandCount, startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode) {
var type = (subType === org.jmol.constant.EnumStructure.NOT ? org.jmol.constant.EnumStructure.NONE : subType);
var startSeqCode = org.jmol.modelset.Group.getSeqcode (startSequenceNumber, startInsertionCode);
var endSeqCode = org.jmol.modelset.Group.getSeqcode (endSequenceNumber, endInsertionCode);
var models = this.modelSet.models;
if (modelIndex >= 0 || this.isTrajectory) {
if (this.isTrajectory) modelIndex = 0;
modelIndex += this.baseModelIndex;
this.structuresDefinedInFile.set (modelIndex);
models[modelIndex].addSecondaryStructure (type, structureID, serialID, strandCount, startChainID, startSeqCode, endChainID, endSeqCode);
return;
}for (var i = this.baseModelIndex; i < this.modelSet.modelCount; i++) {
this.structuresDefinedInFile.set (i);
models[i].addSecondaryStructure (type, structureID, serialID, strandCount, startChainID, startSeqCode, endChainID, endSeqCode);
}
}, $fz.isPrivate = true, $fz), "~N,org.jmol.constant.EnumStructure,~S,~N,~N,~S,~N,~S,~S,~N,~S");
Clazz.defineMethod (c$, "initializeUnitCellAndSymmetry", 
($fz = function () {
if (this.someModelsHaveUnitcells) {
this.modelSet.unitCells =  new Array (this.modelSet.modelCount);
var haveMergeCells = (this.mergeModelSet != null && this.mergeModelSet.unitCells != null);
for (var i = 0; i < this.modelSet.modelCount; i++) {
if (haveMergeCells && i < this.baseModelCount) {
this.modelSet.unitCells[i] = this.mergeModelSet.unitCells[i];
} else {
this.modelSet.unitCells[i] = org.jmol.api.Interface.getOptionInterface ("symmetry.Symmetry");
this.modelSet.unitCells[i].setSymmetryInfo (i, this.modelSet.getModelAuxiliaryInfo (i));
}}
}if (this.appendNew && this.modelSet.someModelsHaveSymmetry) {
this.modelSet.getAtomBits (1089470478, null);
var atoms = this.modelSet.atoms;
for (var iAtom = this.baseAtomIndex, iModel = -1, i0 = 0; iAtom < this.modelSet.atomCount; iAtom++) {
if (atoms[iAtom].modelIndex != iModel) {
iModel = atoms[iAtom].modelIndex;
i0 = this.baseAtomIndex + this.modelSet.getModelAuxiliaryInfoInt (iModel, "presymmetryAtomIndex") + this.modelSet.getModelAuxiliaryInfoInt (iModel, "presymmetryAtomCount");
}if (iAtom >= i0) this.modelSet.bsSymmetry.set (iAtom);
}
}if (this.appendNew && this.modelSet.someModelsHaveFractionalCoordinates) {
var atoms = this.modelSet.atoms;
var modelIndex = -1;
var c = null;
for (var i = this.baseAtomIndex; i < this.modelSet.atomCount; i++) {
if (atoms[i].modelIndex != modelIndex) {
modelIndex = atoms[i].modelIndex;
c = this.modelSet.getUnitCell (modelIndex);
}if (c != null && c.getCoordinatesAreFractional ()) c.toCartesian (c.toSupercell (atoms[i]), false);
}
for (var imodel = this.baseModelIndex; imodel < this.modelSet.modelCount; imodel++) {
if (this.modelSet.isTrajectory (imodel)) {
c = this.modelSet.getUnitCell (imodel);
if (c != null && c.getCoordinatesAreFractional () && c.isSupercell ()) {
var list = this.modelSet.trajectorySteps.get (imodel);
for (var i = list.length; --i >= 0; ) if (list[i] != null) c.toSupercell (list[i]);

}}}
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeBonding", 
($fz = function () {
var bsExclude = (this.modelSet.getModelSetAuxiliaryInfoValue ("someModelsHaveCONECT") == null ? null :  new org.jmol.util.BitSet ());
if (bsExclude != null) this.modelSet.setPdbConectBonding (this.baseAtomIndex, this.baseModelIndex, bsExclude);
var atomIndex = this.baseAtomIndex;
var modelAtomCount = 0;
var symmetryAlreadyAppliedToBonds = this.viewer.getApplySymmetryToBonds ();
var doAutoBond = this.viewer.getAutoBond ();
var forceAutoBond = this.viewer.getForceAutoBond ();
var bs = null;
var autoBonding = false;
var modelCount = this.modelSet.modelCount;
var models = this.modelSet.models;
if (!this.noAutoBond) for (var i = this.baseModelIndex; i < modelCount; atomIndex += modelAtomCount, i++) {
modelAtomCount = models[i].bsAtoms.cardinality ();
var modelBondCount = this.modelSet.getModelAuxiliaryInfoInt (i, "initialBondCount");
var modelIsPDB = models[i].isBioModel;
if (modelBondCount < 0) {
modelBondCount = this.modelSet.bondCount;
}var modelHasSymmetry = this.modelSet.getModelAuxiliaryInfoBoolean (i, "hasSymmetry");
var doBond = (forceAutoBond || doAutoBond && (modelBondCount == 0 || modelIsPDB && this.jmolData == null && modelBondCount < Clazz.doubleToInt (modelAtomCount / 2) || modelHasSymmetry && !symmetryAlreadyAppliedToBonds && !this.modelSet.getModelAuxiliaryInfoBoolean (i, "hasBonds")));
if (!doBond) continue;
autoBonding = true;
if (this.merging || modelCount > 1) {
if (bs == null) bs = org.jmol.util.BitSetUtil.newBitSet (this.modelSet.atomCount);
if (i == this.baseModelIndex || !this.isTrajectory) bs.or (models[i].bsAtoms);
}}
if (autoBonding) {
this.modelSet.autoBondBs4 (bs, bs, bsExclude, null, this.modelSet.defaultCovalentMad, this.viewer.checkAutoBondLegacy ());
org.jmol.util.Logger.info ("ModelSet: autobonding; use  autobond=false  to not generate bonds automatically");
} else {
org.jmol.util.Logger.info ("ModelSet: not autobonding; use  forceAutobond=true  to force automatic bond creation");
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "finalizeGroupBuild", 
($fz = function () {
this.groups =  new Array (this.groupCount);
if (this.merging) for (var i = 0; i < this.$mergeGroups.length; i++) {
this.groups[i] = this.$mergeGroups[i];
this.groups[i].setModelSet (this.modelSet);
}
for (var i = this.baseGroupIndex; i < this.groupCount; ++i) this.distinguishAndPropagateGroup (i, this.chainOf[i], this.group3Of[i], this.seqcodes[i], this.firstAtomIndexes[i], (i == this.groupCount - 1 ? this.modelSet.atomCount : this.firstAtomIndexes[i + 1]));

if (this.group3Lists != null) if (this.modelSet.modelSetAuxiliaryInfo != null) {
this.modelSet.modelSetAuxiliaryInfo.put ("group3Lists", this.group3Lists);
this.modelSet.modelSetAuxiliaryInfo.put ("group3Counts", this.group3Counts);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "distinguishAndPropagateGroup", 
($fz = function (groupIndex, chain, group3, seqcode, firstAtomIndex, maxAtomIndex) {
var lastAtomIndex = maxAtomIndex - 1;
if (lastAtomIndex < firstAtomIndex) throw  new NullPointerException ();
var modelIndex = this.modelSet.atoms[firstAtomIndex].modelIndex;
var group = null;
if (group3 != null && this.jbr != null) {
group = this.jbr.distinguishAndPropagateGroup (chain, group3, seqcode, firstAtomIndex, maxAtomIndex, modelIndex, this.specialAtomIndexes, this.modelSet.atoms);
}var key;
if (group == null) {
group =  new org.jmol.modelset.Group (chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
key = "o>";
} else {
key = (group.isProtein () ? "p>" : group.isNucleic () ? "n>" : group.isCarbohydrate () ? "c>" : "o>");
}if (group3 != null) this.countGroup (modelIndex, key, group3);
this.addGroup (chain, group);
this.groups[groupIndex] = group;
group.setGroupIndex (groupIndex);
for (var i = maxAtomIndex; --i >= firstAtomIndex; ) this.modelSet.atoms[i].setGroup (group);

}, $fz.isPrivate = true, $fz), "~N,org.jmol.modelset.Chain,~S,~N,~N,~N");
Clazz.defineMethod (c$, "addGroup", 
($fz = function (chain, group) {
if (chain.groupCount == chain.groups.length) chain.groups = org.jmol.util.ArrayUtil.doubleLength (chain.groups);
chain.groups[chain.groupCount++] = group;
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Chain,org.jmol.modelset.Group");
Clazz.defineMethod (c$, "countGroup", 
($fz = function (modelIndex, code, group3) {
var ptm = modelIndex + 1;
if (this.group3Lists == null || this.group3Lists[ptm] == null) return;
var g3code = (group3 + "   ").substring (0, 3);
var pt = this.group3Lists[ptm].indexOf (g3code);
if (pt < 0) {
this.group3Lists[ptm] += ",[" + g3code + "]";
pt = this.group3Lists[ptm].indexOf (g3code);
this.group3Counts[ptm] = org.jmol.util.ArrayUtil.arrayCopyI (this.group3Counts[ptm], this.group3Counts[ptm].length + 10);
}this.group3Counts[ptm][Clazz.doubleToInt (pt / 6)]++;
pt = this.group3Lists[ptm].indexOf (",[" + g3code);
if (pt >= 0) this.group3Lists[ptm] = this.group3Lists[ptm].substring (0, pt) + code + this.group3Lists[ptm].substring (pt + 2);
if (modelIndex >= 0) this.countGroup (-1, code, group3);
}, $fz.isPrivate = true, $fz), "~N,~S,~S");
Clazz.defineMethod (c$, "freeze", 
($fz = function () {
this.htAtomMap.clear ();
if (this.modelSet.atomCount < this.modelSet.atoms.length) this.modelSet.growAtomArrays (this.modelSet.atomCount);
if (this.modelSet.bondCount < this.modelSet.bonds.length) this.modelSet.bonds = org.jmol.util.ArrayUtil.arrayCopyObject (this.modelSet.bonds, this.modelSet.bondCount);
for (var i = 5; --i > 0; ) {
this.modelSet.numCached[i] = 0;
var bondsCache = this.modelSet.freeBonds[i];
for (var j = bondsCache.length; --j >= 0; ) bondsCache[j] = null;

}
this.modelSet.setAtomNamesAndNumbers (0, this.baseAtomIndex, this.mergeModelSet);
this.findElementsPresent ();
this.modelSet.resetMolecules ();
this.currentModel = null;
this.currentChain = null;
if (!this.isPDB) {
this.modelSet.freezeModels ();
return;
}var asDSSP = this.viewer.getDefaultStructureDSSP ();
var ret = this.modelSet.calculateStructuresAllExcept (this.structuresDefinedInFile, asDSSP, false, true, true, asDSSP);
if (ret.length > 0) org.jmol.util.Logger.info (ret);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "findElementsPresent", 
($fz = function () {
this.modelSet.elementsPresent =  new Array (this.modelSet.modelCount);
for (var i = 0; i < this.modelSet.modelCount; i++) this.modelSet.elementsPresent[i] = org.jmol.util.BitSetUtil.newBitSet (64);

for (var i = this.modelSet.atomCount; --i >= 0; ) {
var n = this.modelSet.atoms[i].getAtomicAndIsotopeNumber ();
if (n >= org.jmol.util.Elements.elementNumberMax) n = org.jmol.util.Elements.elementNumberMax + org.jmol.util.Elements.altElementIndexFromNumber (n);
this.modelSet.elementsPresent[this.modelSet.atoms[i].modelIndex].set (n);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "applyStereochemistry", 
($fz = function () {
this.set2dZ (this.baseAtomIndex, this.modelSet.atomCount);
if (this.vStereo != null) {
var bsToTest =  new org.jmol.util.BitSet ();
bsToTest.setBits (this.baseAtomIndex, this.modelSet.atomCount);
for (var i = this.vStereo.size (); --i >= 0; ) {
var b = this.vStereo.get (i);
var dz2 = (b.order == 1025 ? 3 : -3);
b.order = 1;
if (b.atom2.z != b.atom1.z && (dz2 < 0) == (b.atom2.z < b.atom1.z)) dz2 /= 3;
var bs = org.jmol.util.JmolMolecule.getBranchBitSet (this.modelSet.atoms, b.atom2.index, bsToTest, null, b.atom1.index, false, true);
bs.set (b.atom2.index);
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) this.modelSet.atoms[j].z += dz2;

b.atom2.x = (b.atom1.x + b.atom2.x) / 2;
b.atom2.y = (b.atom1.y + b.atom2.y) / 2;
}
this.vStereo = null;
}this.is2D = false;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "set2dZ", 
($fz = function (iatom1, iatom2) {
var atomlist = org.jmol.util.BitSetUtil.newBitSet (iatom2);
var bsBranch =  new org.jmol.util.BitSet ();
var v =  new org.jmol.util.Vector3f ();
var v0 = org.jmol.util.Vector3f.new3 (0, 1, 0);
var v1 =  new org.jmol.util.Vector3f ();
var bs0 =  new org.jmol.util.BitSet ();
bs0.setBits (iatom1, iatom2);
for (var i = iatom1; i < iatom2; i++) if (!atomlist.get (i) && !bsBranch.get (i)) {
bsBranch = this.getBranch2dZ (i, -1, bs0, bsBranch, v, v0, v1);
atomlist.or (bsBranch);
}
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getBranch2dZ", 
($fz = function (atomIndex, atomIndexNot, bs0, bsBranch, v, v0, v1) {
var bs = org.jmol.util.BitSetUtil.newBitSet (this.modelSet.atomCount);
if (atomIndex < 0) return bs;
var bsToTest =  new org.jmol.util.BitSet ();
bsToTest.or (bs0);
if (atomIndexNot >= 0) bsToTest.clear (atomIndexNot);
org.jmol.modelset.ModelLoader.setBranch2dZ (this.modelSet.atoms[atomIndex], bs, bsToTest, v, v0, v1);
return bs;
}, $fz.isPrivate = true, $fz), "~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
c$.setBranch2dZ = Clazz.defineMethod (c$, "setBranch2dZ", 
($fz = function (atom, bs, bsToTest, v, v0, v1) {
var atomIndex = atom.index;
if (!bsToTest.get (atomIndex)) return;
bsToTest.clear (atomIndex);
bs.set (atomIndex);
if (atom.bonds == null) return;
for (var i = atom.bonds.length; --i >= 0; ) {
var bond = atom.bonds[i];
if (bond.isHydrogen ()) continue;
var atom2 = bond.getOtherAtom (atom);
org.jmol.modelset.ModelLoader.setAtom2dZ (atom, atom2, v, v0, v1);
org.jmol.modelset.ModelLoader.setBranch2dZ (atom2, bs, bsToTest, v, v0, v1);
}
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
c$.setAtom2dZ = Clazz.defineMethod (c$, "setAtom2dZ", 
($fz = function (atomRef, atom2, v, v0, v1) {
v.setT (atom2);
v.sub (atomRef);
v.z = 0;
v.normalize ();
v1.cross (v0, v);
var theta = Math.acos (v.dot (v0));
atom2.z = atomRef.z + (0.8 * Math.sin (4 * theta));
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,org.jmol.modelset.Atom,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "finalizeShapes", 
($fz = function () {
this.modelSet.shapeManager = this.viewer.getShapeManager ();
if (!this.merging) this.modelSet.shapeManager.resetShapes ();
this.modelSet.shapeManager.loadDefaultShapes (this.modelSet);
if (this.modelSet.someModelsHaveAromaticBonds && this.viewer.getSmartAromatic ()) this.modelSet.assignAromaticBonds (false);
if (this.merging && this.baseModelCount == 1) this.modelSet.shapeManager.setShapePropertyBs (6, "clearModelIndex", null, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "undeleteAtom", 
function (iAtom) {
this.modelSet.atoms[iAtom].valence = 0;
}, "~N");
Clazz.defineMethod (c$, "deleteAtoms", 
function (bsDeletedAtoms) {
this.doRemoveAddedHydrogens = true;
if (this.doRemoveAddedHydrogens) {
var mapOldToNew =  Clazz.newIntArray (this.modelSet.atomCount, 0);
var mapNewToOld =  Clazz.newIntArray (this.modelSet.atomCount - bsDeletedAtoms.cardinality (), 0);
var n = this.baseAtomIndex;
var models = this.modelSet.models;
var atoms = this.modelSet.atoms;
for (var i = this.baseAtomIndex; i < this.modelSet.atomCount; i++) {
models[atoms[i].modelIndex].bsAtoms.clear (i);
models[atoms[i].modelIndex].bsAtomsDeleted.clear (i);
if (bsDeletedAtoms.get (i)) {
mapOldToNew[i] = n - 1;
models[atoms[i].modelIndex].atomCount--;
} else {
mapNewToOld[n] = i;
mapOldToNew[i] = n++;
}}
this.modelSet.modelSetAuxiliaryInfo.put ("bsDeletedAtoms", bsDeletedAtoms);
for (var i = this.baseGroupIndex; i < this.groups.length; i++) {
var g = this.groups[i];
if (g.firstAtomIndex >= this.baseAtomIndex) {
g.firstAtomIndex = mapOldToNew[g.firstAtomIndex];
g.lastAtomIndex = mapOldToNew[g.lastAtomIndex];
if (g.leadAtomIndex >= 0) g.leadAtomIndex = mapOldToNew[g.leadAtomIndex];
}}
this.modelSet.adjustAtomArrays (mapNewToOld, this.baseAtomIndex, n);
} else {
this.modelSet.viewer.deleteAtoms (bsDeletedAtoms, false);
}this.modelSet.calcBoundBoxDimensions (null, 1);
this.modelSet.resetMolecules ();
this.modelSet.validateBspf (false);
}, "org.jmol.util.BitSet");
c$.createAtomDataSet = Clazz.defineMethod (c$, "createAtomDataSet", 
function (viewer, modelSet, tokType, atomSetCollection, bsSelected) {
if (atomSetCollection == null) return;
var adapter = viewer.getModelAdapter ();
var pt =  new org.jmol.util.Point3f ();
var v =  new org.jmol.util.Point3f ();
var atoms = modelSet.atoms;
var tolerance = viewer.getLoadAtomDataTolerance ();
if (modelSet.unitCells != null) for (var i = bsSelected.nextSetBit (0); i >= 0; i = bsSelected.nextSetBit (i + 1)) if (atoms[i].getAtomSymmetry () != null) {
tolerance = -tolerance;
break;
}
var i = -1;
var n = 0;
var loadAllData = (org.jmol.util.BitSetUtil.cardinalityOf (bsSelected) == viewer.getAtomCount ());
for (var iterAtom = adapter.getAtomIterator (atomSetCollection); iterAtom.hasNext (); ) {
var x = iterAtom.getX ();
var y = iterAtom.getY ();
var z = iterAtom.getZ ();
if (Float.isNaN (x + y + z)) continue;
if (tokType == 1146095626) {
i = bsSelected.nextSetBit (i + 1);
if (i < 0) break;
n++;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("atomIndex = " + i + ": " + atoms[i] + " --> (" + x + "," + y + "," + z);
modelSet.setAtomCoord (i, x, y, z);
continue;
}pt.set (x, y, z);
var bs = org.jmol.util.BitSetUtil.newBitSet (modelSet.atomCount);
modelSet.getAtomsWithin (tolerance, pt, bs, -1);
bs.and (bsSelected);
if (loadAllData) {
n = org.jmol.util.BitSetUtil.cardinalityOf (bs);
if (n == 0) {
org.jmol.util.Logger.warn ("createAtomDataSet: no atom found at position " + pt);
continue;
} else if (n > 1 && org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("createAtomDataSet: " + n + " atoms found at position " + pt);
}}switch (tokType) {
case 1146095631:
var vx = iterAtom.getVectorX ();
var vy = iterAtom.getVectorY ();
var vz = iterAtom.getVectorZ ();
if (Float.isNaN (vx + vy + vz)) continue;
v.set (vx, vy, vz);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("xyz: " + pt + " vib: " + v);
modelSet.setAtomCoord (bs, 1146095631, v);
break;
case 1129318401:
modelSet.setAtomProperty (bs, tokType, iterAtom.getOccupancy (), 0, null, null, null);
break;
case 1112541196:
modelSet.setAtomProperty (bs, tokType, 0, iterAtom.getPartialCharge (), null, null, null);
break;
case 1112541199:
modelSet.setAtomProperty (bs, tokType, 0, iterAtom.getBfactor (), null, null, null);
break;
}
}
switch (tokType) {
case 1146095631:
var vibName = adapter.getAtomSetName (atomSetCollection, 0);
org.jmol.util.Logger.info ("_vibrationName = " + vibName);
viewer.setStringProperty ("_vibrationName", vibName);
break;
case 1146095626:
org.jmol.util.Logger.info (n + " atom positions read");
modelSet.recalculateLeadMidpointsAndWingVectors (-1);
break;
}
}, "org.jmol.viewer.Viewer,org.jmol.modelset.ModelSet,~N,~O,org.jmol.util.BitSet");
Clazz.defineStatics (c$,
"defaultGroupCount", 32);
});
