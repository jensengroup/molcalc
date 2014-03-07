Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (["java.lang.Short", "java.util.Hashtable", "org.jmol.viewer.JmolConstants"], "org.jmol.modelset.Group", ["java.lang.Float", "org.jmol.constant.EnumStructure", "org.jmol.util.ArrayUtil", "$.BitSet", "$.BitSetUtil", "$.Logger", "$.Point3f", "$.Quaternion", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.groupIndex = 0;
this.chain = null;
this.firstAtomIndex = -1;
this.leadAtomIndex = -1;
this.lastAtomIndex = 0;
this.seqcode = 0;
this.groupID = 0;
this.$isProtein = false;
this.selectedIndex = 0;
this.shapeVisibilityFlags = 0;
this.phi = NaN;
this.psi = NaN;
this.omega = NaN;
this.straightness = NaN;
this.mu = NaN;
this.theta = NaN;
this.bsAdded = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "Group");
Clazz.defineMethod (c$, "getGroupIndex", 
function () {
return this.groupIndex;
});
Clazz.defineMethod (c$, "setGroupIndex", 
function (groupIndex) {
this.groupIndex = groupIndex;
}, "~N");
Clazz.defineMethod (c$, "calcBioParameters", 
function () {
return false;
});
Clazz.defineMethod (c$, "haveParameters", 
function () {
return true;
});
Clazz.defineMethod (c$, "setGroupParameter", 
function (tok, f) {
switch (tok) {
case 1112539143:
this.phi = f;
break;
case 1112539144:
this.psi = f;
break;
case 1112539142:
this.omega = f;
break;
case 1112539140:
this.mu = f;
break;
case 1112539150:
this.theta = f;
break;
case 1112539148:
this.straightness = f;
break;
}
}, "~N,~N");
Clazz.defineMethod (c$, "getGroupParameter", 
function (tok) {
if (!this.haveParameters ()) this.calcBioParameters ();
switch (tok) {
case 1112539142:
return this.omega;
case 1112539143:
return this.phi;
case 1112539144:
return this.psi;
case 1112539140:
return this.mu;
case 1112539150:
return this.theta;
case 1112539148:
return this.straightness;
}
return NaN;
}, "~N");
Clazz.makeConstructor (c$, 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex) {
this.chain = chain;
this.seqcode = seqcode;
if (group3 == null) group3 = "";
this.groupID = org.jmol.modelset.Group.getGroupID (group3);
this.$isProtein = (this.groupID >= 1 && this.groupID < 24);
this.firstAtomIndex = firstAtomIndex;
this.lastAtomIndex = lastAtomIndex;
}, "org.jmol.modelset.Chain,~S,~N,~N,~N");
Clazz.defineMethod (c$, "setModelSet", 
function (modelSet) {
this.chain.model.modelSet = modelSet;
}, "org.jmol.modelset.ModelSet");
Clazz.defineMethod (c$, "setShapeVisibility", 
function (visFlag, isVisible) {
if (isVisible) {
this.shapeVisibilityFlags |= visFlag;
} else {
this.shapeVisibilityFlags &= ~visFlag;
}}, "~N,~B");
Clazz.defineMethod (c$, "getGroup3", 
function () {
return org.jmol.modelset.Group.group3Names[this.groupID];
});
c$.getGroup3 = Clazz.defineMethod (c$, "getGroup3", 
function (groupID) {
return org.jmol.modelset.Group.group3Names[groupID];
}, "~N");
Clazz.defineMethod (c$, "getGroup1", 
function () {
if (this.groupID >= org.jmol.viewer.JmolConstants.predefinedGroup1Names.length) return '?';
return org.jmol.viewer.JmolConstants.predefinedGroup1Names[this.groupID];
});
Clazz.defineMethod (c$, "getGroupID", 
function () {
return this.groupID;
});
Clazz.defineMethod (c$, "getChainID", 
function () {
return this.chain.chainID;
});
Clazz.defineMethod (c$, "getBioPolymerLength", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getMonomerIndex", 
function () {
return -1;
});
Clazz.defineMethod (c$, "getGroups", 
function () {
return null;
});
Clazz.defineMethod (c$, "getStructure", 
function () {
return null;
});
Clazz.defineMethod (c$, "getStrucNo", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getProteinStructureType", 
function () {
return org.jmol.constant.EnumStructure.NOT;
});
Clazz.defineMethod (c$, "getProteinStructureSubType", 
function () {
return this.getProteinStructureType ();
});
Clazz.defineMethod (c$, "setProteinStructureType", 
function (type, monomerIndexCurrent) {
return -1;
}, "org.jmol.constant.EnumStructure,~N");
Clazz.defineMethod (c$, "isProtein", 
function () {
return this.$isProtein;
});
Clazz.defineMethod (c$, "isNucleic", 
function () {
return (this.groupID >= 24 && this.groupID < 42);
});
Clazz.defineMethod (c$, "isDna", 
function () {
return false;
});
Clazz.defineMethod (c$, "isRna", 
function () {
return false;
});
Clazz.defineMethod (c$, "isPurine", 
function () {
return false;
});
Clazz.defineMethod (c$, "isPyrimidine", 
function () {
return false;
});
Clazz.defineMethod (c$, "isCarbohydrate", 
function () {
return false;
});
c$.addGroup3Name = Clazz.defineMethod (c$, "addGroup3Name", 
function (group3) {
if (org.jmol.modelset.Group.group3NameCount == org.jmol.modelset.Group.group3Names.length) ($t$ = org.jmol.modelset.Group.group3Names = org.jmol.util.ArrayUtil.doubleLengthS (org.jmol.modelset.Group.group3Names), org.jmol.modelset.Group.prototype.group3Names = org.jmol.modelset.Group.group3Names, $t$);
var groupID = ($t$ = org.jmol.modelset.Group.group3NameCount ++, org.jmol.modelset.Group.prototype.group3NameCount = org.jmol.modelset.Group.group3NameCount, $t$);
org.jmol.modelset.Group.group3Names[groupID] = group3;
org.jmol.modelset.Group.htGroup.put (group3, Short.$valueOf (groupID));
return groupID;
}, "~S");
c$.getGroupID = Clazz.defineMethod (c$, "getGroupID", 
function (group3) {
if (group3 == null) return -1;
var groupID = org.jmol.modelset.Group.lookupGroupID (group3);
return (groupID != -1) ? groupID : org.jmol.modelset.Group.addGroup3Name (group3);
}, "~S");
c$.lookupGroupID = Clazz.defineMethod (c$, "lookupGroupID", 
function (group3) {
if (group3 != null) {
var boxedGroupID = org.jmol.modelset.Group.htGroup.get (group3);
if (boxedGroupID != null) return boxedGroupID.shortValue ();
}return -1;
}, "~S");
Clazz.defineMethod (c$, "getResno", 
function () {
return (this.seqcode == -2147483648 ? 0 : this.seqcode >> 8);
});
Clazz.defineMethod (c$, "getSeqcode", 
function () {
return this.seqcode;
});
Clazz.defineMethod (c$, "getSeqNumber", 
function () {
return this.seqcode >> 8;
});
c$.getSequenceNumber = Clazz.defineMethod (c$, "getSequenceNumber", 
function (seqcode) {
return (org.jmol.modelset.Group.haveSequenceNumber (seqcode) ? seqcode >> 8 : 2147483647);
}, "~N");
c$.getInsertionCodeValue = Clazz.defineMethod (c$, "getInsertionCodeValue", 
function (seqcode) {
return (seqcode & 127);
}, "~N");
c$.haveSequenceNumber = Clazz.defineMethod (c$, "haveSequenceNumber", 
function (seqcode) {
return ((seqcode & 128) != 0);
}, "~N");
Clazz.defineMethod (c$, "getSeqcodeString", 
function () {
return org.jmol.modelset.Group.getSeqcodeString (this.seqcode);
});
c$.getSeqcode = Clazz.defineMethod (c$, "getSeqcode", 
function (sequenceNumber, insertionCode) {
return org.jmol.modelset.Group.getSeqcode2 (sequenceNumber, insertionCode);
}, "~N,~S");
c$.getSeqcode2 = Clazz.defineMethod (c$, "getSeqcode2", 
function (sequenceNumber, insertionCode) {
if (sequenceNumber == -2147483648) return sequenceNumber;
if (!((insertionCode >= 'A' && insertionCode <= 'Z') || (insertionCode >= 'a' && insertionCode <= 'z') || (insertionCode >= '0' && insertionCode <= '9') || insertionCode == '?' || insertionCode == '*')) {
if (insertionCode != ' ' && insertionCode != '\0') org.jmol.util.Logger.warn ("unrecognized insertionCode:" + insertionCode);
insertionCode = '\0';
}return ((sequenceNumber == 2147483647 ? 0 : (sequenceNumber << 8) | 128)) + insertionCode.charCodeAt (0);
}, "~N,~S");
c$.getSeqcodeString = Clazz.defineMethod (c$, "getSeqcodeString", 
function (seqcode) {
if (seqcode == -2147483648) return null;
return (seqcode & 127) == 0 ? "" + (seqcode >> 8) : "" + (seqcode >> 8) + '^' + String.fromCharCode (seqcode & 127);
}, "~N");
Clazz.defineMethod (c$, "getInsertionCode", 
function () {
if (this.seqcode == -2147483648) return '\0';
return String.fromCharCode (this.seqcode & 127);
});
c$.getInsertionCode = Clazz.defineMethod (c$, "getInsertionCode", 
function (seqcode) {
if (seqcode == -2147483648) return '\0';
return String.fromCharCode (seqcode & 127);
}, "~N");
Clazz.defineMethod (c$, "isAdded", 
function (atomIndex) {
return this.bsAdded != null && this.bsAdded.get (atomIndex);
}, "~N");
Clazz.defineMethod (c$, "addAtoms", 
function (atomIndex) {
if (this.bsAdded == null) this.bsAdded =  new org.jmol.util.BitSet ();
this.bsAdded.set (atomIndex);
}, "~N");
Clazz.defineMethod (c$, "selectAtoms", 
function (bs) {
bs.setBits (this.firstAtomIndex, this.lastAtomIndex + 1);
if (this.bsAdded != null) bs.or (this.bsAdded);
return this.lastAtomIndex;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "isSelected", 
function (bs) {
var pt = bs.nextSetBit (this.firstAtomIndex);
return (pt >= 0 && pt <= this.lastAtomIndex || this.bsAdded != null && this.bsAdded.intersects (bs));
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "isHetero", 
function () {
return this.chain.getAtom (this.firstAtomIndex).isHetero ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "[" + this.getGroup3 () + "-" + this.getSeqcodeString () + "]";
});
Clazz.defineMethod (c$, "scaleToScreen", 
function (Z, mar) {
return this.chain.model.modelSet.viewer.scaleToScreen (Z, mar);
}, "~N,~N");
Clazz.defineMethod (c$, "isCursorOnTopOf", 
function (atom, x, y, radius, champ) {
return this.chain.model.modelSet.isCursorOnTopOf (atom, x, y, radius, champ);
}, "org.jmol.modelset.Atom,~N,~N,~N,org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "isAtomHidden", 
function (atomIndex) {
return this.chain.model.modelSet.isAtomHidden (atomIndex);
}, "~N");
Clazz.defineMethod (c$, "getModel", 
function () {
return this.chain.model;
});
Clazz.defineMethod (c$, "getModelIndex", 
function () {
return this.chain.model.modelIndex;
});
Clazz.defineMethod (c$, "getSelectedMonomerCount", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getSelectedMonomerIndex", 
function () {
return -1;
});
Clazz.defineMethod (c$, "getSelectedGroupIndex", 
function () {
return this.selectedIndex;
});
Clazz.defineMethod (c$, "isLeadAtom", 
function (atomIndex) {
return false;
}, "~N");
Clazz.defineMethod (c$, "getLeadAtomOr", 
function (atom) {
var a = this.getLeadAtom ();
return (a == null ? atom : a);
}, "org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "getLeadAtom", 
function () {
return null;
});
Clazz.defineMethod (c$, "getQuaternion", 
function (qType) {
return null;
}, "~S");
Clazz.defineMethod (c$, "getQuaternionFrame", 
function (atoms) {
if (this.lastAtomIndex - this.firstAtomIndex < 3) return null;
var pt = this.firstAtomIndex;
return org.jmol.util.Quaternion.getQuaternionFrame (atoms[pt], atoms[++pt], atoms[++pt]);
}, "~A");
Clazz.defineMethod (c$, "setStrucNo", 
function (i) {
}, "~N");
Clazz.defineMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
switch (tokType) {
case 135266320:
return  new org.jmol.util.Point3f ();
case 1073741854:
case 1666189314:
return  new org.jmol.util.Vector3f ();
case 135266305:
return  new Float (NaN);
case 135266306:
case 1073742001:
return [];
}
return "";
}, "~N,~S,~N");
Clazz.defineMethod (c$, "isWithinStructure", 
function (type) {
return false;
}, "org.jmol.constant.EnumStructure");
Clazz.defineMethod (c$, "getProteinStructureTag", 
function () {
return null;
});
Clazz.defineMethod (c$, "getStructureId", 
function () {
return "";
});
Clazz.defineMethod (c$, "getBioPolymerIndexInModel", 
function () {
return -1;
});
Clazz.defineMethod (c$, "isCrossLinked", 
function (g) {
return false;
}, "org.jmol.modelset.Group");
Clazz.defineMethod (c$, "getCrossLinkLead", 
function (vReturn) {
return false;
}, "java.util.List");
Clazz.defineMethod (c$, "isConnectedPrevious", 
function () {
return false;
});
Clazz.defineMethod (c$, "getNitrogenAtom", 
function () {
return null;
});
Clazz.defineMethod (c$, "getCarbonylOxygenAtom", 
function () {
return null;
});
Clazz.defineMethod (c$, "fixIndices", 
function (atomsDeleted, bsDeleted) {
this.firstAtomIndex -= atomsDeleted;
this.leadAtomIndex -= atomsDeleted;
this.lastAtomIndex -= atomsDeleted;
if (this.bsAdded != null) org.jmol.util.BitSetUtil.deleteBits (this.bsAdded, bsDeleted);
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getGroupInfo", 
function (igroup) {
var infoGroup =  new java.util.Hashtable ();
infoGroup.put ("groupIndex", Integer.$valueOf (igroup));
infoGroup.put ("groupID", Short.$valueOf (this.groupID));
var s = this.getSeqcodeString ();
if (s != null) infoGroup.put ("seqCode", s);
infoGroup.put ("_apt1", Integer.$valueOf (this.firstAtomIndex));
infoGroup.put ("_apt2", Integer.$valueOf (this.lastAtomIndex));
if (this.bsAdded != null) infoGroup.put ("addedAtoms", this.bsAdded);
infoGroup.put ("atomInfo1", this.chain.model.modelSet.getAtomInfo (this.firstAtomIndex, null));
infoGroup.put ("atomInfo2", this.chain.model.modelSet.getAtomInfo (this.lastAtomIndex, null));
infoGroup.put ("visibilityFlags", Integer.$valueOf (this.shapeVisibilityFlags));
return infoGroup;
}, "~N");
Clazz.defineMethod (c$, "getMinZ", 
function (atoms, minZ) {
minZ[0] = 2147483647;
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) this.checkMinZ (atoms[i], minZ);

if (this.bsAdded != null) for (var i = this.bsAdded.nextSetBit (0); i >= 0; i = this.bsAdded.nextSetBit (i + 1)) this.checkMinZ (atoms[i], minZ);

}, "~A,~A");
Clazz.defineMethod (c$, "checkMinZ", 
($fz = function (atom, minZ) {
var z = atom.screenZ - Clazz.doubleToInt (atom.screenDiameter / 2) - 2;
if (z < minZ[0]) minZ[0] = Math.max (1, z);
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,~A");
Clazz.defineStatics (c$,
"SEQUENCE_NUMBER_FLAG", 0x80,
"INSERTION_CODE_MASK", 0x7F,
"SEQUENCE_NUMBER_SHIFT", 8);
c$.htGroup = c$.prototype.htGroup =  new java.util.Hashtable ();
c$.group3Names = c$.prototype.group3Names =  new Array (128);
Clazz.defineStatics (c$,
"group3NameCount", 0);
{
for (var i = 0; i < org.jmol.viewer.JmolConstants.predefinedGroup3Names.length; ++i) {
org.jmol.modelset.Group.addGroup3Name (org.jmol.viewer.JmolConstants.predefinedGroup3Names[i]);
}
}});
