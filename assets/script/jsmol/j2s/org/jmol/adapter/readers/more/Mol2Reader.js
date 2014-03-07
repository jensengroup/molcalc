Clazz.declarePackage ("org.jmol.adapter.readers.more");
Clazz.load (["org.jmol.adapter.readers.more.ForceFieldReader"], "org.jmol.adapter.readers.more.Mol2Reader", ["org.jmol.adapter.smarter.Bond", "org.jmol.api.JmolAdapter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nAtoms = 0;
this.atomCount = 0;
this.isPDB = false;
this.lastSequenceNumber = 2147483647;
this.chainID = 64;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.more, "Mol2Reader", org.jmol.adapter.readers.more.ForceFieldReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.setUserAtomTypes ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.equals ("@<TRIPOS>MOLECULE")) {
if (!this.processMolecule ()) {
return true;
}this.continuing = !this.isLastModel (this.modelNumber);
return false;
}if (this.line.length != 0 && this.line.charAt (0) == '#') {
this.checkCurrentLineForScript ();
}return true;
});
Clazz.defineMethod (c$, "processMolecule", 
($fz = function () {
this.isPDB = false;
var thisDataSetName = this.readLine ().trim ();
if (!this.doGetModel (++this.modelNumber, thisDataSetName)) {
return false;
}this.lastSequenceNumber = 2147483647;
this.chainID = String.fromCharCode ( 64);
this.readLine ();
this.line += " 0 0 0 0 0 0";
this.atomCount = this.parseIntStr (this.line);
var bondCount = this.parseInt ();
var resCount = this.parseInt ();
this.readLine ();
this.readLine ();
if (this.readLine () != null && (this.line.length == 0 || this.line.charAt (0) != '@')) {
if (this.readLine () != null && this.line.length != 0 && this.line.charAt (0) != '@') {
if (this.line.indexOf ("jmolscript:") >= 0) {
this.checkCurrentLineForScript ();
if (this.line.equals ("#")) {
this.line = "";
}}if (this.line.length != 0) {
thisDataSetName += ": " + this.line.trim ();
}}}this.newAtomSet (thisDataSetName);
while (this.line != null && !this.line.equals ("@<TRIPOS>MOLECULE")) {
if (this.line.equals ("@<TRIPOS>ATOM")) {
this.readAtoms (this.atomCount);
this.atomSetCollection.setAtomSetName (thisDataSetName);
} else if (this.line.equals ("@<TRIPOS>BOND")) {
this.readBonds (bondCount);
} else if (this.line.equals ("@<TRIPOS>SUBSTRUCTURE")) {
this.readResInfo (resCount);
} else if (this.line.equals ("@<TRIPOS>CRYSIN")) {
this.readCrystalInfo ();
}this.readLine ();
}
this.nAtoms += this.atomCount;
if (this.isPDB) this.setIsPDB ();
this.applySymmetryAndSetTrajectory ();
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readAtoms", 
($fz = function (atomCount) {
if (atomCount == 0) return;
var i0 = this.atomSetCollection.getAtomCount ();
for (var i = 0; i < atomCount; ++i) {
var atom = this.atomSetCollection.addNewAtom ();
var tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLine ());
var atomType = tokens[5];
atom.atomName = tokens[1] + '\0' + atomType;
atom.set (this.parseFloatStr (tokens[2]), this.parseFloatStr (tokens[3]), this.parseFloatStr (tokens[4]));
if (tokens.length > 6) {
atom.sequenceNumber = this.parseIntStr (tokens[6]);
if (atom.sequenceNumber < this.lastSequenceNumber) {
if (this.chainID == 'Z') this.chainID = String.fromCharCode ( 96);
(this.chainID = String.fromCharCode (($c$ = this.chainID).charCodeAt (0) + 1), $c$);
}this.lastSequenceNumber = atom.sequenceNumber;
atom.chainID = this.chainID;
}if (tokens.length > 7) atom.group3 = tokens[7];
if (tokens.length > 8) {
atom.partialCharge = this.parseFloatStr (tokens[8]);
if (atom.partialCharge == Clazz.floatToInt (atom.partialCharge)) atom.formalCharge = Clazz.floatToInt (atom.partialCharge);
}}
var atoms = this.atomSetCollection.getAtoms ();
var g3 = atoms[i0].group3;
if (g3 == null) return;
this.isPDB = false;
for (var i = this.atomSetCollection.getAtomCount (); --i >= i0; ) if (!g3.equals (atoms[this.atomSetCollection.getAtomCount () - 1].group3)) {
this.isPDB = true;
break;
}
if (this.isPDB) {
this.isPDB = false;
for (var i = this.atomSetCollection.getAtomCount (); --i >= i0; ) {
var atom = atoms[i];
if (atom.group3.length <= 3 && org.jmol.api.JmolAdapter.lookupGroupID (atom.group3) >= 0) {
this.isPDB = true;
break;
}}
if (this.isPDB) {
for (var i = this.atomSetCollection.getAtomCount (); --i >= i0; ) {
var atom = atoms[i];
atom.isHetero = org.jmol.api.JmolAdapter.isHetero (atom.group3);
var atomType = atom.atomName.substring (atom.atomName.indexOf ('\0') + 1);
var deduceSymbol = !this.getElementSymbol (atom, atomType);
if (deduceSymbol) atom.elementSymbol = org.jmol.adapter.readers.more.ForceFieldReader.deducePdbElementSymbol (atom.isHetero, atomType, atom.group3);
}
return;
}}if (!this.isPDB) {
for (var i = this.atomSetCollection.getAtomCount (); --i >= i0; ) atoms[i].group3 = null;

}}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "readBonds", 
($fz = function (bondCount) {
for (var i = 0; i < bondCount; ++i) {
var tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.readLine ());
var atomIndex1 = this.parseIntStr (tokens[1]);
var atomIndex2 = this.parseIntStr (tokens[2]);
var order = this.parseIntStr (tokens[3]);
if (order == -2147483648) order = (tokens[3].equals ("ar") ? 515 : tokens[3].equals ("am") ? 1 : 17);
this.atomSetCollection.addBond ( new org.jmol.adapter.smarter.Bond (this.nAtoms + atomIndex1 - 1, this.nAtoms + atomIndex2 - 1, order));
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "readResInfo", 
($fz = function (resCount) {
for (var i = 0; i < resCount; ++i) {
this.readLine ();
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "readCrystalInfo", 
($fz = function () {
this.readLine ();
var tokens = this.getTokens ();
if (tokens.length < 6) return;
var name = "";
for (var i = 6; i < tokens.length; i++) name += " " + tokens[i];

if (name === "") name = " P1";
 else name += " *";
name = name.substring (1);
this.setSpaceGroupName (name);
if (this.ignoreFileUnitCell) return;
for (var i = 0; i < 6; i++) this.setUnitCellItem (i, this.parseFloatStr (tokens[i]));

var atoms = this.atomSetCollection.getAtoms ();
for (var i = 0; i < this.atomCount; ++i) this.setAtomCoord (atoms[this.nAtoms + i]);

}, $fz.isPrivate = true, $fz));
});
