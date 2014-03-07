Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.Monomer"], "org.jmol.modelsetbio.PhosphorusMonomer", ["org.jmol.constant.EnumStructure", "org.jmol.util.Quaternion", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$isPurine = false;
this.$isPyrimidine = false;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "PhosphorusMonomer", org.jmol.modelsetbio.Monomer);
Clazz.overrideMethod (c$, "isNucleic", 
function () {
return true;
});
c$.validateAndAllocateP = Clazz.defineMethod (c$, "validateAndAllocateP", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
if (firstIndex != lastIndex || specialAtomIndexes[13] != firstIndex) return null;
return  new org.jmol.modelsetbio.PhosphorusMonomer (chain, group3, seqcode, firstIndex, lastIndex, org.jmol.modelsetbio.PhosphorusMonomer.phosphorusOffsets);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.makeConstructor (c$, 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets) {
Clazz.superConstructor (this, org.jmol.modelsetbio.PhosphorusMonomer, [chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets]);
if (group3.indexOf ('T') >= 0) chain.isDna = true;
if (group3.indexOf ('U') + group3.indexOf ('I') > -2) chain.isRna = true;
this.$isPurine = (group3.indexOf ('A') + group3.indexOf ('G') + group3.indexOf ('I') > -3);
this.$isPyrimidine = (group3.indexOf ('T') + group3.indexOf ('C') + group3.indexOf ('U') > -3);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getP", 
function () {
return this.getAtomFromOffsetIndex (0);
});
Clazz.defineMethod (c$, "isPhosphorusMonomer", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isDna", 
function () {
return this.chain.isDna;
});
Clazz.overrideMethod (c$, "isRna", 
function () {
return this.chain.isRna;
});
Clazz.overrideMethod (c$, "isPurine", 
function () {
return this.$isPurine;
});
Clazz.overrideMethod (c$, "isPyrimidine", 
function () {
return this.$isPyrimidine;
});
Clazz.overrideMethod (c$, "getStructure", 
function () {
return this.chain;
});
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return org.jmol.constant.EnumStructure.NONE;
});
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var distance = this.getLeadAtom ().distance (possiblyPreviousMonomer.getLeadAtom ());
return distance <= org.jmol.modelsetbio.PhosphorusMonomer.MAX_ADJACENT_PHOSPHORUS_DISTANCE;
}, "org.jmol.modelsetbio.Monomer");
Clazz.overrideMethod (c$, "getQuaternion", 
function (qType) {
var i = this.monomerIndex;
if (i == 0 || i >= this.bioPolymer.monomerCount - 1) return null;
var ptP = this.bioPolymer.monomers[i].getAtomFromOffsetIndex (0);
var ptA;
var ptB;
ptA = this.bioPolymer.monomers[i + 1].getAtomFromOffsetIndex (0);
ptB = this.bioPolymer.monomers[i - 1].getAtomFromOffsetIndex (0);
if (ptP == null || ptA == null || ptB == null) return null;
var vA =  new org.jmol.util.Vector3f ();
var vB =  new org.jmol.util.Vector3f ();
vA.sub2 (ptA, ptP);
vB.sub2 (ptB, ptP);
return org.jmol.util.Quaternion.getQuaternionFrameV (vA, vB, null, false);
}, "~S");
Clazz.overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
return this.getAtomFromOffsetIndex (0);
}, "~S");
Clazz.overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz.defineStatics (c$,
"P", 0,
"phosphorusOffsets", [0],
"MAX_ADJACENT_PHOSPHORUS_DISTANCE", 8.0);
});
