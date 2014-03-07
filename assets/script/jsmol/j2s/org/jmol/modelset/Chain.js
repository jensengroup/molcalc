Clazz.declarePackage ("org.jmol.modelset");
c$ = Clazz.decorateAsClass (function () {
this.model = null;
this.chainID = '\0';
this.isDna = false;
this.isRna = false;
this.groupCount = 0;
this.groups = null;
this.selectedGroupCount = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "Chain");
Clazz.prepareFields (c$, function () {
this.groups =  new Array (16);
});
Clazz.defineMethod (c$, "getAtom", 
function (index) {
return this.model.modelSet.atoms[index];
}, "~N");
Clazz.makeConstructor (c$, 
function (model, chainID) {
this.model = model;
this.chainID = chainID;
}, "org.jmol.modelset.Model,~S");
Clazz.defineMethod (c$, "getGroup", 
function (groupIndex) {
return this.groups[groupIndex];
}, "~N");
Clazz.defineMethod (c$, "getGroupCount", 
function () {
return this.groupCount;
});
Clazz.defineMethod (c$, "calcSelectedGroupsCount", 
function (bsSelected) {
this.selectedGroupCount = 0;
for (var i = 0; i < this.groupCount; i++) this.groups[i].selectedIndex = (this.groups[i].isSelected (bsSelected) ? this.selectedGroupCount++ : -1);

}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "selectSeqcodeRange", 
function (index0, seqcodeA, seqcodeB, bs) {
var seqcode;
var indexA;
var indexB;
var minDiff;
var isInexact = false;
for (indexA = index0; indexA < this.groupCount && this.groups[indexA].seqcode != seqcodeA; indexA++) {
}
if (indexA == this.groupCount) {
if (index0 > 0) return -1;
isInexact = true;
minDiff = 2147483647;
for (var i = this.groupCount; --i >= 0; ) if ((seqcode = this.groups[i].seqcode) > seqcodeA && (seqcode - seqcodeA) < minDiff) {
indexA = i;
minDiff = seqcode - seqcodeA;
}
if (minDiff == 2147483647) return -1;
}if (seqcodeB == 2147483647) {
indexB = this.groupCount - 1;
isInexact = true;
} else {
for (indexB = indexA; indexB < this.groupCount && this.groups[indexB].seqcode != seqcodeB; indexB++) {
}
if (indexB == this.groupCount) {
if (index0 > 0) return -1;
isInexact = true;
minDiff = 2147483647;
for (var i = indexA; i < this.groupCount; i++) if ((seqcode = this.groups[i].seqcode) < seqcodeB && (seqcodeB - seqcode) < minDiff) {
indexB = i;
minDiff = seqcodeB - seqcode;
}
if (minDiff == 2147483647) return -1;
}}for (var i = indexA; i <= indexB; ++i) this.groups[i].selectAtoms (bs);

return (isInexact ? -1 : indexB + 1);
}, "~N,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "fixIndices", 
function (atomsDeleted, bsDeleted) {
for (var i = 0; i < this.groupCount; i++) this.groups[i].fixIndices (atomsDeleted, bsDeleted);

}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setAtomBitSet", 
function (bs) {
for (var i = 0; i < this.groupCount; i++) this.groups[i].selectAtoms (bs);

}, "org.jmol.util.BitSet");
