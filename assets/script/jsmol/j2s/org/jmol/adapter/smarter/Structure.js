Clazz.declarePackage ("org.jmol.adapter.smarter");
Clazz.load (["org.jmol.adapter.smarter.AtomSetObject"], "org.jmol.adapter.smarter.Structure", ["org.jmol.constant.EnumStructure"], function () {
c$ = Clazz.decorateAsClass (function () {
this.structureType = null;
this.substructureType = null;
this.structureID = null;
this.serialID = 0;
this.strandCount = 0;
this.startChainID = ' ';
this.startSequenceNumber = 0;
this.startInsertionCode = ' ';
this.endChainID = ' ';
this.endSequenceNumber = 0;
this.endInsertionCode = ' ';
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.smarter, "Structure", org.jmol.adapter.smarter.AtomSetObject);
c$.getHelixType = Clazz.defineMethod (c$, "getHelixType", 
function (type) {
switch (type) {
case 1:
return org.jmol.constant.EnumStructure.HELIXALPHA;
case 3:
return org.jmol.constant.EnumStructure.HELIXPI;
case 5:
return org.jmol.constant.EnumStructure.HELIX310;
}
return org.jmol.constant.EnumStructure.HELIX;
}, "~N");
Clazz.makeConstructor (c$, 
function (modelIndex, structureType, substructureType, structureID, serialID, strandCount, startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode) {
Clazz.superConstructor (this, org.jmol.adapter.smarter.Structure, []);
this.structureType = structureType;
this.substructureType = substructureType;
if (structureID == null) return;
this.atomSetIndex = modelIndex;
this.structureID = structureID;
this.strandCount = strandCount;
this.serialID = serialID;
this.startChainID = startChainID;
this.startSequenceNumber = startSequenceNumber;
this.startInsertionCode = startInsertionCode;
this.endChainID = endChainID;
this.endSequenceNumber = endSequenceNumber;
this.endInsertionCode = endInsertionCode;
}, "~N,org.jmol.constant.EnumStructure,org.jmol.constant.EnumStructure,~S,~N,~N,~S,~N,~S,~S,~N,~S");
});
