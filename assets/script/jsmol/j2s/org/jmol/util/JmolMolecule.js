Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.Elements"], "org.jmol.util.JmolMolecule", ["org.jmol.util.ArrayUtil", "$.BitSet", "$.BitSetUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nodes = null;
this.moleculeIndex = 0;
this.modelIndex = 0;
this.indexInModel = 0;
this.firstAtomIndex = 0;
this.atomCount = 0;
this.nElements = 0;
this.elementCounts = null;
this.altElementCounts = null;
this.elementNumberMax = 0;
this.altElementMax = 0;
this.mf = null;
this.atomList = null;
Clazz.instantialize (this, arguments);
}, org.jmol.util, "JmolMolecule");
Clazz.prepareFields (c$, function () {
this.elementCounts =  Clazz.newIntArray (org.jmol.util.Elements.elementNumberMax, 0);
this.altElementCounts =  Clazz.newIntArray (org.jmol.util.Elements.altElementMax, 0);
});
Clazz.makeConstructor (c$, 
function () {
});
c$.getMolecules = Clazz.defineMethod (c$, "getMolecules", 
function (atoms, bsModelAtoms, biobranches, bsExclude) {
var bsToTest = null;
var bsBranch =  new org.jmol.util.BitSet ();
var thisModelIndex = -1;
var indexInModel = 0;
var moleculeCount = 0;
var molecules =  new Array (4);
if (bsExclude == null) bsExclude =  new org.jmol.util.BitSet ();
for (var i = 0; i < atoms.length; i++) if (!bsExclude.get (i) && !bsBranch.get (i)) {
if (atoms[i].isDeleted ()) {
bsExclude.set (i);
continue;
}var modelIndex = atoms[i].getModelIndex ();
if (modelIndex != thisModelIndex) {
thisModelIndex = modelIndex;
indexInModel = 0;
bsToTest = bsModelAtoms[modelIndex];
}bsBranch = org.jmol.util.JmolMolecule.getBranchBitSet (atoms, i, bsToTest, biobranches, -1, true, true);
if (bsBranch.nextSetBit (0) >= 0) {
molecules = org.jmol.util.JmolMolecule.addMolecule (molecules, moleculeCount++, atoms, i, bsBranch, modelIndex, indexInModel++, bsExclude);
}}
return org.jmol.util.JmolMolecule.allocateArray (molecules, moleculeCount);
}, "~A,~A,java.util.List,org.jmol.util.BitSet");
c$.getBranchBitSet = Clazz.defineMethod (c$, "getBranchBitSet", 
function (atoms, atomIndex, bsToTest, biobranches, atomIndexNot, allowCyclic, allowBioResidue) {
var bs = org.jmol.util.BitSetUtil.newBitSet (atoms.length);
if (atomIndex < 0) return bs;
if (atomIndexNot >= 0) bsToTest.clear (atomIndexNot);
return (org.jmol.util.JmolMolecule.getCovalentlyConnectedBitSet (atoms, atoms[atomIndex], bsToTest, allowCyclic, allowBioResidue, biobranches, bs) ? bs :  new org.jmol.util.BitSet ());
}, "~A,~N,org.jmol.util.BitSet,java.util.List,~N,~B,~B");
c$.addMolecule = Clazz.defineMethod (c$, "addMolecule", 
function (molecules, iMolecule, atoms, iAtom, bsBranch, modelIndex, indexInModel, bsExclude) {
bsExclude.or (bsBranch);
if (iMolecule == molecules.length) molecules = org.jmol.util.JmolMolecule.allocateArray (molecules, iMolecule * 2 + 1);
molecules[iMolecule] = org.jmol.util.JmolMolecule.initialize (atoms, iMolecule, iAtom, bsBranch, modelIndex, indexInModel);
return molecules;
}, "~A,~N,~A,~N,org.jmol.util.BitSet,~N,~N,org.jmol.util.BitSet");
c$.getMolecularFormula = Clazz.defineMethod (c$, "getMolecularFormula", 
function (atoms, bsSelected, includeMissingHydrogens) {
var m =  new org.jmol.util.JmolMolecule ();
m.nodes = atoms;
m.atomList = bsSelected;
return m.getMolecularFormula (includeMissingHydrogens);
}, "~A,org.jmol.util.BitSet,~B");
Clazz.defineMethod (c$, "getMolecularFormula", 
function (includeMissingHydrogens) {
if (this.mf != null) return this.mf;
this.getElementAndAtomCount (includeMissingHydrogens);
var mf = "";
var sep = "";
var nX;
for (var i = 1; i <= this.elementNumberMax; i++) {
nX = this.elementCounts[i];
if (nX != 0) {
mf += sep + org.jmol.util.Elements.elementSymbolFromNumber (i) + " " + nX;
sep = " ";
}}
for (var i = 1; i <= this.altElementMax; i++) {
nX = this.altElementCounts[i];
if (nX != 0) {
mf += sep + org.jmol.util.Elements.elementSymbolFromNumber (org.jmol.util.Elements.altElementNumberFromIndex (i)) + " " + nX;
sep = " ";
}}
return mf;
}, "~B");
c$.initialize = Clazz.defineMethod (c$, "initialize", 
($fz = function (nodes, moleculeIndex, firstAtomIndex, atomList, modelIndex, indexInModel) {
var jm =  new org.jmol.util.JmolMolecule ();
jm.nodes = nodes;
jm.firstAtomIndex = firstAtomIndex;
jm.atomList = atomList;
jm.moleculeIndex = moleculeIndex;
jm.modelIndex = modelIndex;
jm.indexInModel = indexInModel;
return jm;
}, $fz.isPrivate = true, $fz), "~A,~N,~N,org.jmol.util.BitSet,~N,~N");
Clazz.defineMethod (c$, "getElementAndAtomCount", 
($fz = function (includeMissingHydrogens) {
if (this.atomList == null) {
this.atomList =  new org.jmol.util.BitSet ();
this.atomList.setBits (0, this.nodes.length);
}this.elementCounts =  Clazz.newIntArray (org.jmol.util.Elements.elementNumberMax, 0);
this.altElementCounts =  Clazz.newIntArray (org.jmol.util.Elements.altElementMax, 0);
var count = 0;
for (var i = this.atomList.nextSetBit (0); i >= 0; i = this.atomList.nextSetBit (i + 1)) {
count++;
var n = this.nodes[i].getAtomicAndIsotopeNumber ();
if (n < org.jmol.util.Elements.elementNumberMax) {
this.elementCounts[n]++;
if (this.elementCounts[n] == 1) this.nElements++;
this.elementNumberMax = Math.max (this.elementNumberMax, n);
if (includeMissingHydrogens) {
var nH = this.nodes[i].getImplicitHydrogenCount ();
if (nH > 0) {
if (this.elementCounts[1] == 0) this.nElements++;
this.elementCounts[1] += nH;
}}} else {
n = org.jmol.util.Elements.altElementIndexFromNumber (n);
this.altElementCounts[n]++;
if (this.altElementCounts[n] == 1) this.nElements++;
this.altElementMax = Math.max (this.altElementMax, n);
}}
this.atomCount = count;
}, $fz.isPrivate = true, $fz), "~B");
c$.getCovalentlyConnectedBitSet = Clazz.defineMethod (c$, "getCovalentlyConnectedBitSet", 
($fz = function (atoms, atom, bsToTest, allowCyclic, allowBioResidue, biobranches, bsResult) {
var atomIndex = atom.getIndex ();
if (!bsToTest.get (atomIndex)) return allowCyclic;
if (!allowBioResidue && atom.getBioStructureTypeName ().length > 0) return allowCyclic;
bsToTest.clear (atomIndex);
if (biobranches != null && !bsResult.get (atomIndex)) {
for (var i = biobranches.size (); --i >= 0; ) {
var b = biobranches.get (i);
if (b.get (atomIndex)) {
bsResult.or (b);
bsToTest.andNot (b);
for (var j = b.nextSetBit (0); j >= 0; j = b.nextSetBit (j + 1)) {
var atom1 = atoms[j];
bsToTest.set (j);
org.jmol.util.JmolMolecule.getCovalentlyConnectedBitSet (atoms, atom1, bsToTest, allowCyclic, allowBioResidue, biobranches, bsResult);
bsToTest.clear (j);
}
break;
}}
}bsResult.set (atomIndex);
var bonds = atom.getEdges ();
if (bonds == null) return true;
for (var i = bonds.length; --i >= 0; ) {
var bond = bonds[i];
if (bond.isCovalent () && !org.jmol.util.JmolMolecule.getCovalentlyConnectedBitSet (atoms, bond.getOtherAtomNode (atom), bsToTest, allowCyclic, allowBioResidue, biobranches, bsResult)) return false;
}
return true;
}, $fz.isPrivate = true, $fz), "~A,org.jmol.util.JmolNode,org.jmol.util.BitSet,~B,~B,java.util.List,org.jmol.util.BitSet");
c$.allocateArray = Clazz.defineMethod (c$, "allocateArray", 
($fz = function (molecules, len) {
return (len == molecules.length ? molecules : org.jmol.util.ArrayUtil.arrayCopyObject (molecules, len));
}, $fz.isPrivate = true, $fz), "~A,~N");
});
