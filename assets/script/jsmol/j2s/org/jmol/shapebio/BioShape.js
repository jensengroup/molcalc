Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.modelset.Atom", "org.jmol.modelsetbio.NucleicMonomer", "org.jmol.util.BitSet", "org.jmol.viewer.JmolConstants"], "org.jmol.shapebio.BioShape", ["java.lang.Float", "org.jmol.constant.EnumStructure", "org.jmol.shape.Shape", "org.jmol.util.ArrayUtil", "$.Colix", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelIndex = 0;
this.modelVisibilityFlags = 0;
this.shape = null;
this.bioPolymer = null;
this.meshes = null;
this.meshReady = null;
this.mads = null;
this.colixes = null;
this.colixesBack = null;
this.paletteIDs = null;
this.bsColixSet = null;
this.bsSizeSet = null;
this.bsSizeDefault = null;
this.isActive = false;
this.monomerCount = 0;
this.monomers = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.hasBfactorRange = false;
this.bfactorMin = 0;
this.bfactorMax = 0;
this.range = 0;
this.floatRange = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.shapebio, "BioShape");
Clazz.prepareFields (c$, function () {
this.bsSizeDefault =  new org.jmol.util.BitSet ();
});
Clazz.makeConstructor (c$, 
function (shape, modelIndex, bioPolymer) {
this.shape = shape;
this.modelIndex = modelIndex;
this.bioPolymer = bioPolymer;
this.isActive = shape.isActive;
this.monomerCount = bioPolymer.monomerCount;
if (this.monomerCount > 0) {
this.colixes =  Clazz.newShortArray (this.monomerCount, 0);
this.paletteIDs =  Clazz.newByteArray (this.monomerCount, 0);
this.mads =  Clazz.newShortArray (this.monomerCount + 1, 0);
this.monomers = bioPolymer.getGroups ();
this.meshReady =  Clazz.newBooleanArray (this.monomerCount, false);
this.meshes =  new Array (this.monomerCount);
this.wingVectors = bioPolymer.getWingVectors ();
this.leadAtomIndices = bioPolymer.getLeadAtomIndices ();
}}, "org.jmol.shapebio.BioShapeCollection,~N,org.jmol.modelsetbio.BioPolymer");
Clazz.defineMethod (c$, "calcBfactorRange", 
function () {
this.bfactorMin = this.bfactorMax = this.monomers[0].getLeadAtom ().getBfactor100 ();
for (var i = this.monomerCount; --i > 0; ) {
var bfactor = this.monomers[i].getLeadAtom ().getBfactor100 ();
if (bfactor < this.bfactorMin) this.bfactorMin = bfactor;
 else if (bfactor > this.bfactorMax) this.bfactorMax = bfactor;
}
this.range = this.bfactorMax - this.bfactorMin;
this.floatRange = this.range;
this.hasBfactorRange = true;
});
Clazz.defineMethod (c$, "calcMeanPositionalDisplacement", 
function (bFactor100) {
return Clazz.doubleToShort (Math.sqrt (bFactor100 / 7895.6835208714865) * 1000);
}, "~N");
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
this.bioPolymer.findNearestAtomIndex (xMouse, yMouse, closest, this.mads, this.shape.myVisibilityFlag, bsNot);
}, "~N,~N,~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setMad", 
function (mad, bsSelected, values) {
if (this.monomerCount < 2) return;
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new org.jmol.util.BitSet ();
var flag = this.shape.myVisibilityFlag;
for (var i = this.monomerCount; --i >= 0; ) {
var leadAtomIndex = this.leadAtomIndices[i];
if (bsSelected.get (leadAtomIndex)) {
if (values != null) {
if (Float.isNaN (values[leadAtomIndex])) continue;
mad = Clazz.floatToShort (values[leadAtomIndex] * 2000);
}var isVisible = ((this.mads[i] = this.getMad (i, mad)) > 0);
this.bsSizeSet.setBitTo (i, isVisible);
this.monomers[i].setShapeVisibility (flag, isVisible);
this.shape.atoms[leadAtomIndex].setShapeVisibility (flag, isVisible);
this.falsifyNearbyMesh (i);
}}
if (this.monomerCount > 1) this.mads[this.monomerCount] = this.mads[this.monomerCount - 1];
}, "~N,org.jmol.util.BitSet,~A");
Clazz.defineMethod (c$, "getMad", 
($fz = function (groupIndex, mad) {
this.bsSizeDefault.setBitTo (groupIndex, mad == -1 || mad == -2);
if (mad >= 0) return mad;
switch (mad) {
case -1:
case -2:
if (mad == -1 && this.shape.madOn >= 0) return this.shape.madOn;
switch (this.monomers[groupIndex].getProteinStructureType ()) {
case org.jmol.constant.EnumStructure.SHEET:
case org.jmol.constant.EnumStructure.HELIX:
return this.shape.madHelixSheet;
case org.jmol.constant.EnumStructure.DNA:
case org.jmol.constant.EnumStructure.RNA:
return this.shape.madDnaRna;
default:
return this.shape.madTurnRandom;
}
case -3:
{
if (!this.hasBfactorRange) this.calcBfactorRange ();
var atom = this.monomers[groupIndex].getLeadAtom ();
var bfactor100 = atom.getBfactor100 ();
var scaled = bfactor100 - this.bfactorMin;
if (this.range == 0) return 0;
var percentile = scaled / this.floatRange;
if (percentile < 0 || percentile > 1) org.jmol.util.Logger.error ("Que ha ocurrido? " + percentile);
return Clazz.floatToShort ((1750 * percentile) + 250);
}case -4:
{
var atom = this.monomers[groupIndex].getLeadAtom ();
return (2 * this.calcMeanPositionalDisplacement (atom.getBfactor100 ()));
}}
org.jmol.util.Logger.error ("unrecognized setMad(" + mad + ")");
return 0;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "falsifyMesh", 
function () {
if (this.meshReady == null) return;
for (var i = 0; i < this.monomerCount; i++) this.meshReady[i] = false;

});
Clazz.defineMethod (c$, "falsifyNearbyMesh", 
($fz = function (index) {
if (this.meshReady == null) return;
this.meshReady[index] = false;
if (index > 0) this.meshReady[index - 1] = false;
if (index < this.monomerCount - 1) this.meshReady[index + 1] = false;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setColixBS", 
function (colix, pid, bsSelected) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex)) {
this.colixes[i] = this.shape.setColix (colix, pid, atomIndex);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = 0;
this.paletteIDs[i] = pid;
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}}
}, "~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setColixBack", 
function (colix, bsSelected) {
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex)) {
if (this.colixesBack == null) this.colixesBack =  Clazz.newShortArray (this.colixes.length, 0);
if (this.colixesBack.length < this.colixes.length) this.colixesBack = org.jmol.util.ArrayUtil.ensureLengthShort (this.colixesBack, this.colixes.length);
this.colixesBack[i] = colix;
}}
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setTranslucent", 
function (isTranslucent, bsSelected, translucentLevel) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
for (var i = this.monomerCount; --i >= 0; ) if (bsSelected.get (this.leadAtomIndices[i])) {
this.colixes[i] = org.jmol.util.Colix.getColixTranslucent3 (this.colixes[i], isTranslucent, translucentLevel);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = org.jmol.util.Colix.getColixTranslucent3 (this.colixesBack[i], isTranslucent, translucentLevel);
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}
}, "~B,org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "setShapeState", 
function (temp, temp2) {
if (!this.isActive || this.bsSizeSet == null && this.bsColixSet == null) return;
var type = org.jmol.viewer.JmolConstants.shapeClassBases[this.shape.shapeID];
for (var i = 0; i < this.monomerCount; i++) {
var atomIndex1 = this.monomers[i].firstAtomIndex;
var atomIndex2 = this.monomers[i].lastAtomIndex;
if (this.bsSizeSet != null && (this.bsSizeSet.get (i) || this.bsColixSet != null && this.bsColixSet.get (i))) {
if (this.bsSizeDefault.get (i)) org.jmol.shape.Shape.setStateInfo (temp, atomIndex1, atomIndex2, type + (this.bsSizeSet.get (i) ? " on" : " off"));
 else org.jmol.shape.Shape.setStateInfo (temp, atomIndex1, atomIndex2, type + " " + (this.mads[i] / 2000));
}if (this.bsColixSet != null && this.bsColixSet.get (i)) org.jmol.shape.Shape.setStateInfo (temp2, atomIndex1, atomIndex2, this.shape.getColorCommand (type, this.paletteIDs[i], this.colixes[i]));
}
}, "java.util.Map,java.util.Map");
Clazz.defineMethod (c$, "setModelClickability", 
function () {
if (!this.isActive || this.wingVectors == null) return;
var isNucleicPolymer = Clazz.instanceOf (this.bioPolymer, org.jmol.modelsetbio.NucleicPolymer);
for (var i = this.monomerCount; --i >= 0; ) {
if (this.mads[i] <= 0) continue;
var iAtom = this.leadAtomIndices[i];
if (this.monomers[i].chain.model.modelSet.isAtomHidden (iAtom)) continue;
this.shape.atoms[iAtom].setClickable (org.jmol.shapebio.BioShape.ALPHA_CARBON_VISIBILITY_FLAG);
if (isNucleicPolymer) (this.monomers[i]).setModelClickability ();
}
});
c$.ALPHA_CARBON_VISIBILITY_FLAG = c$.prototype.ALPHA_CARBON_VISIBILITY_FLAG = org.jmol.modelsetbio.NucleicMonomer.CARTOON_VISIBILITY_FLAG | org.jmol.modelset.Atom.BACKBONE_VISIBILITY_FLAG | org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (10) | org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (12) | org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (13) | org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (14);
Clazz.defineStatics (c$,
"eightPiSquared100", 7895.6835208714865);
});
