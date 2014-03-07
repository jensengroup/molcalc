Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.Monomer"], "org.jmol.modelsetbio.AlphaMonomer", ["org.jmol.constant.EnumStructure", "org.jmol.modelsetbio.Helix", "$.Sheet", "$.Turn", "org.jmol.util.Quaternion", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.proteinStructure = null;
this.nitrogenHydrogenPoint = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "AlphaMonomer", org.jmol.modelsetbio.Monomer);
Clazz.overrideMethod (c$, "isProtein", 
function () {
return true;
});
c$.validateAndAllocateA = Clazz.defineMethod (c$, "validateAndAllocateA", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
if (firstIndex != lastIndex || specialAtomIndexes[2] != firstIndex) return null;
return  new org.jmol.modelsetbio.AlphaMonomer (chain, group3, seqcode, firstIndex, lastIndex, org.jmol.modelsetbio.AlphaMonomer.alphaOffsets);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.defineMethod (c$, "isAlphaMonomer", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getProteinStructure", 
function () {
return this.proteinStructure;
});
Clazz.overrideMethod (c$, "getStructure", 
function () {
return this.getProteinStructure ();
});
Clazz.overrideMethod (c$, "setStructure", 
function (proteinStructure) {
this.proteinStructure = proteinStructure;
if (proteinStructure == null) this.nitrogenHydrogenPoint = null;
}, "org.jmol.modelsetbio.ProteinStructure");
Clazz.overrideMethod (c$, "setStrucNo", 
function (n) {
if (this.proteinStructure != null) this.proteinStructure.strucNo = n;
}, "~N");
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return this.proteinStructure == null ? org.jmol.constant.EnumStructure.NONE : this.proteinStructure.type;
});
Clazz.overrideMethod (c$, "getProteinStructureSubType", 
function () {
return this.proteinStructure == null ? org.jmol.constant.EnumStructure.NONE : this.proteinStructure.subtype;
});
Clazz.overrideMethod (c$, "getStrucNo", 
function () {
return this.proteinStructure != null ? this.proteinStructure.strucNo : 0;
});
Clazz.overrideMethod (c$, "isHelix", 
function () {
return this.proteinStructure != null && this.proteinStructure.type === org.jmol.constant.EnumStructure.HELIX;
});
Clazz.overrideMethod (c$, "isSheet", 
function () {
return this.proteinStructure != null && this.proteinStructure.type === org.jmol.constant.EnumStructure.SHEET;
});
Clazz.overrideMethod (c$, "setProteinStructureType", 
function (type, monomerIndexCurrent) {
if (monomerIndexCurrent < 0 || monomerIndexCurrent > 0 && this.monomerIndex == 0) {
if (this.proteinStructure != null) {
var nAbandoned = this.proteinStructure.removeMonomer (this.monomerIndex);
if (nAbandoned > 0) this.getBioPolymer ().removeProteinStructure (this.monomerIndex + 1, nAbandoned);
}switch (type) {
case org.jmol.constant.EnumStructure.HELIX:
case org.jmol.constant.EnumStructure.HELIXALPHA:
case org.jmol.constant.EnumStructure.HELIX310:
case org.jmol.constant.EnumStructure.HELIXPI:
this.setStructure ( new org.jmol.modelsetbio.Helix (this.bioPolymer, this.monomerIndex, 1, type));
break;
case org.jmol.constant.EnumStructure.SHEET:
this.setStructure ( new org.jmol.modelsetbio.Sheet (this.bioPolymer, this.monomerIndex, 1, type));
break;
case org.jmol.constant.EnumStructure.TURN:
this.setStructure ( new org.jmol.modelsetbio.Turn (this.bioPolymer, this.monomerIndex, 1));
break;
case org.jmol.constant.EnumStructure.NONE:
this.setStructure (null);
}
} else {
this.setStructure (this.getBioPolymer ().getProteinStructure (monomerIndexCurrent));
if (this.proteinStructure != null) this.proteinStructure.addMonomer (this.monomerIndex);
}return this.monomerIndex;
}, "org.jmol.constant.EnumStructure,~N");
Clazz.defineMethod (c$, "getAtom", 
function (specialAtomID) {
return (specialAtomID == 2 ? this.getLeadAtom () : null);
}, "~N");
Clazz.defineMethod (c$, "getAtomPoint", 
function (specialAtomID) {
return (specialAtomID == 2 ? this.getLeadAtom () : null);
}, "~N");
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var atom1 = this.getLeadAtom ();
var atom2 = possiblyPreviousMonomer.getLeadAtom ();
return atom1.isBonded (atom2) || atom1.distance (atom2) <= 4.2;
}, "org.jmol.modelsetbio.Monomer");
Clazz.overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
switch (qType) {
case 'b':
case 'c':
case 'C':
case 'x':
return this.getLeadAtom ();
default:
case 'a':
case 'n':
case 'p':
case 'P':
case 'q':
return null;
}
}, "~S");
Clazz.overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz.overrideMethod (c$, "getQuaternion", 
function (qType) {
var vA =  new org.jmol.util.Vector3f ();
var vB =  new org.jmol.util.Vector3f ();
var vC = null;
switch (qType) {
default:
case 'a':
case 'n':
case 'p':
case 'q':
return null;
case 'b':
case 'c':
case 'x':
if (this.monomerIndex == 0 || this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var ptCa = this.getLeadAtom ();
var ptCaNext = this.bioPolymer.getLeadPoint (this.monomerIndex + 1);
var ptCaPrev = this.bioPolymer.getLeadPoint (this.monomerIndex - 1);
vA.sub2 (ptCaNext, ptCa);
vB.sub2 (ptCaPrev, ptCa);
break;
}
return org.jmol.util.Quaternion.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
Clazz.defineStatics (c$,
"alphaOffsets", [0]);
});
