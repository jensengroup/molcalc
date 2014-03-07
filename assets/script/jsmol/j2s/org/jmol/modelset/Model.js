Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (["org.jmol.util.BitSet", "$.StringXBuilder"], "org.jmol.modelset.Model", ["java.util.Hashtable", "org.jmol.util.ArrayUtil", "$.BitSetUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelSet = null;
this.modelIndex = 0;
this.fileIndex = 0;
this.hydrogenCount = 0;
this.isBioModel = false;
this.isPdbWithMultipleBonds = false;
this.trajectoryBaseIndex = 0;
this.hasRasmolHBonds = false;
this.loadState = "";
this.loadScript = null;
this.isModelKit = false;
this.isTrajectory = false;
this.selectedTrajectory = -1;
this.dataFrames = null;
this.dataSourceFrame = -1;
this.jmolData = null;
this.jmolFrameType = null;
this.firstAtomIndex = 0;
this.atomCount = 0;
this.bsAtoms = null;
this.bsAtomsDeleted = null;
this.bondCount = -1;
this.firstMoleculeIndex = 0;
this.moleculeCount = 0;
this.nAltLocs = 0;
this.nInsertions = 0;
this.groupCount = -1;
this.chainCount = 0;
this.chains = null;
this.biosymmetryCount = 0;
this.auxiliaryInfo = null;
this.properties = null;
this.defaultRotationRadius = 0;
this.defaultStructure = null;
this.orientation = null;
this.structureTainted = false;
this.isJmolDataFrame = false;
this.frameDelay = 0;
this.unitCell = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "Model");
Clazz.prepareFields (c$, function () {
this.loadScript =  new org.jmol.util.StringXBuilder ();
this.bsAtoms =  new org.jmol.util.BitSet ();
this.bsAtomsDeleted =  new org.jmol.util.BitSet ();
this.chains =  new Array (8);
});
Clazz.defineMethod (c$, "getModelSet", 
function () {
return this.modelSet;
});
Clazz.defineMethod (c$, "isModelkit", 
function () {
return this.isModelKit;
});
Clazz.defineMethod (c$, "getTrueAtomCount", 
function () {
return this.bsAtoms.cardinality () - this.bsAtomsDeleted.cardinality ();
});
Clazz.defineMethod (c$, "resetBoundCount", 
function () {
this.bondCount = -1;
});
Clazz.defineMethod (c$, "getBondCount", 
function () {
if (this.bondCount >= 0) return this.bondCount;
var bonds = this.modelSet.getBonds ();
this.bondCount = 0;
for (var i = this.modelSet.getBondCount (); --i >= 0; ) if (bonds[i].atom1.modelIndex == this.modelIndex) this.bondCount++;

return this.bondCount;
});
Clazz.makeConstructor (c$, 
function (modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo) {
this.modelSet = modelSet;
this.dataSourceFrame = this.modelIndex = modelIndex;
this.isTrajectory = (trajectoryBaseIndex >= 0);
this.trajectoryBaseIndex = (this.isTrajectory ? trajectoryBaseIndex : modelIndex);
if (auxiliaryInfo == null) {
auxiliaryInfo =  new java.util.Hashtable ();
}this.auxiliaryInfo = auxiliaryInfo;
if (auxiliaryInfo.containsKey ("biosymmetryCount")) this.biosymmetryCount = (auxiliaryInfo.get ("biosymmetryCount")).intValue ();
this.properties = properties;
if (jmolData == null) {
this.jmolFrameType = "modelSet";
} else {
this.jmolData = jmolData;
this.isJmolDataFrame = true;
auxiliaryInfo.put ("jmolData", jmolData);
auxiliaryInfo.put ("title", jmolData);
this.jmolFrameType = (jmolData.indexOf ("ramachandran") >= 0 ? "ramachandran" : jmolData.indexOf ("quaternion") >= 0 ? "quaternion" : "data");
}}, "org.jmol.modelset.ModelSet,~N,~N,~S,java.util.Properties,java.util.Map");
Clazz.defineMethod (c$, "setNAltLocs", 
function (nAltLocs) {
this.nAltLocs = nAltLocs;
}, "~N");
Clazz.defineMethod (c$, "setNInsertions", 
function (nInsertions) {
this.nInsertions = nInsertions;
}, "~N");
Clazz.defineMethod (c$, "getModelNumberDotted", 
function () {
return this.modelSet.getModelNumberDotted (this.modelIndex);
});
Clazz.defineMethod (c$, "getModelTitle", 
function () {
return this.modelSet.getModelTitle (this.modelIndex);
});
Clazz.defineMethod (c$, "isStructureTainted", 
function () {
return this.structureTainted;
});
Clazz.defineMethod (c$, "getChains", 
function () {
return this.chains;
});
Clazz.defineMethod (c$, "getChainCount", 
function (countWater) {
if (this.chainCount > 1 && !countWater) for (var i = 0; i < this.chainCount; i++) if (this.chains[i].chainID == '\0') return this.chainCount - 1;

return this.chainCount;
}, "~B");
Clazz.defineMethod (c$, "getGroupCountHetero", 
function (isHetero) {
var n = 0;
for (var i = this.chainCount; --i >= 0; ) for (var j = this.chains[i].groupCount; --j >= 0; ) if (this.chains[i].groups[j].isHetero () == isHetero) n++;


return n;
}, "~B");
Clazz.defineMethod (c$, "calcSelectedGroupsCount", 
function (bsSelected) {
for (var i = this.chainCount; --i >= 0; ) this.chains[i].calcSelectedGroupsCount (bsSelected);

}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getGroupCount", 
function () {
if (this.groupCount < 0) {
this.groupCount = 0;
for (var i = this.chainCount; --i >= 0; ) this.groupCount += this.chains[i].getGroupCount ();

}return this.groupCount;
});
Clazz.defineMethod (c$, "getChainAt", 
function (i) {
return (i < this.chainCount ? this.chains[i] : null);
}, "~N");
Clazz.defineMethod (c$, "getChain", 
function (chainID) {
for (var i = this.chainCount; --i >= 0; ) {
var chain = this.chains[i];
if (chain.chainID == chainID) return chain;
}
return null;
}, "~S");
Clazz.defineMethod (c$, "fixIndices", 
function (modelIndex, nAtomsDeleted, bsDeleted) {
if (this.dataSourceFrame > modelIndex) this.dataSourceFrame--;
if (this.trajectoryBaseIndex > modelIndex) this.trajectoryBaseIndex--;
this.firstAtomIndex -= nAtomsDeleted;
for (var i = 0; i < this.chainCount; i++) this.chains[i].fixIndices (nAtomsDeleted, bsDeleted);

org.jmol.util.BitSetUtil.deleteBits (this.bsAtoms, bsDeleted);
org.jmol.util.BitSetUtil.deleteBits (this.bsAtomsDeleted, bsDeleted);
}, "~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "freeze", 
function () {
this.chains = org.jmol.util.ArrayUtil.arrayCopyObject (this.chains, this.chainCount);
this.groupCount = -1;
this.getGroupCount ();
for (var i = 0; i < this.chainCount; ++i) this.chains[i].groups = org.jmol.util.ArrayUtil.arrayCopyObject (this.chains[i].groups, this.chains[i].groupCount);

});
Clazz.defineMethod (c$, "getPdbData", 
function (viewer, type, ctype, isDraw, bsSelected, sb, tokens, pdbCONECT, bsWritten) {
}, "org.jmol.viewer.Viewer,~S,~S,~B,org.jmol.util.BitSet,org.jmol.io.OutputStringBuilder,~A,org.jmol.util.StringXBuilder,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getDefaultLargePDBRendering", 
function (sb, maxAtoms) {
}, "org.jmol.util.StringXBuilder,~N");
Clazz.defineMethod (c$, "getBioBranches", 
function (bioBranches) {
return bioBranches;
}, "java.util.List");
Clazz.defineMethod (c$, "getGroupsWithin", 
function (nResidues, bs, bsResult) {
}, "~N,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getSequenceBits", 
function (specInfo, bs, bsResult) {
}, "~S,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getRasmolHydrogenBonds", 
function (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds) {
}, "org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~B,~N,~B,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "clearRasmolHydrogenBonds", 
function (bsAtoms) {
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "clearBioPolymers", 
function () {
});
Clazz.defineMethod (c$, "calcSelectedMonomersCount", 
function (bsSelected) {
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "calculatePolymers", 
function (groups, groupCount, baseGroupIndex, modelsExcluded) {
}, "~A,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAllPolymerInfo", 
function (bs, finalInfo, modelVector) {
}, "org.jmol.util.BitSet,java.util.Map,java.util.List");
Clazz.defineMethod (c$, "getBioPolymerCount", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getPolymerPointsAndVectors", 
function (bs, vList, isTraceAlpha, sheetSmoothing) {
}, "org.jmol.util.BitSet,java.util.List,~B,~N");
Clazz.defineMethod (c$, "getPolymerLeadMidPoints", 
function (iPolymer) {
return null;
}, "~N");
Clazz.defineMethod (c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
});
Clazz.defineMethod (c$, "addSecondaryStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode) {
}, "org.jmol.constant.EnumStructure,~S,~N,~N,~S,~N,~S,~N");
Clazz.defineMethod (c$, "calculateStructures", 
function (asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha) {
return "";
}, "~B,~B,~B,~B,~B");
Clazz.defineMethod (c$, "setStructureList", 
function (structureList) {
}, "java.util.Map");
Clazz.defineMethod (c$, "getChimeInfo", 
function (sb, nHetero) {
sb.append ("\nNumber of Atoms ..... " + (this.modelSet.atomCount - nHetero));
if (nHetero > 0) sb.append (" (" + nHetero + ")");
sb.append ("\nNumber of Bonds ..... " + this.modelSet.bondCount);
sb.append ("\nNumber of Models ...... " + this.modelSet.modelCount);
}, "org.jmol.util.StringXBuilder,~N");
Clazz.defineMethod (c$, "calculateStruts", 
function (modelSet, bs1, bs2) {
return 0;
}, "org.jmol.modelset.ModelSet,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "calculateStraightness", 
function (viewer, ctype, qtype, mStep) {
}, "org.jmol.viewer.Viewer,~S,~S,~N");
Clazz.defineMethod (c$, "selectSeqcodeRange", 
function (seqcodeA, seqcodeB, chainID, bs, caseSensitive) {
}, "~N,~N,~S,org.jmol.util.BitSet,~B");
Clazz.defineMethod (c$, "setConformation", 
function (bsConformation) {
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getPdbConformation", 
function (bsConformation, conformationIndex) {
return false;
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "getProteinStructureState", 
function (bsAtoms, taintedOnly, needPhiPsi, mode) {
return null;
}, "org.jmol.util.BitSet,~B,~B,~N");
Clazz.defineMethod (c$, "getFullPDBHeader", 
function () {
return null;
});
});
