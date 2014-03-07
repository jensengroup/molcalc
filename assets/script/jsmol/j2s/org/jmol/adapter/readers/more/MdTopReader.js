Clazz.declarePackage ("org.jmol.adapter.readers.more");
Clazz.load (["org.jmol.adapter.readers.more.ForceFieldReader"], "org.jmol.adapter.readers.more.MdTopReader", ["java.lang.Boolean", "java.util.ArrayList", "org.jmol.adapter.smarter.Atom", "org.jmol.api.JmolAdapter", "org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nAtoms = 0;
this.atomCount = 0;
this.$atomTypes = null;
this.group3s = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.more, "MdTopReader", org.jmol.adapter.readers.more.ForceFieldReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.setUserAtomTypes ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.indexOf ("%FLAG ") != 0) return true;
this.line = this.line.substring (6).trim ();
if (this.line.equals ("POINTERS")) this.getPointers ();
 else if (this.line.equals ("ATOM_NAME")) this.getAtomNames ();
 else if (this.line.equals ("CHARGE")) this.getCharges ();
 else if (this.line.equals ("RESIDUE_LABEL")) this.getResidueLabels ();
 else if (this.line.equals ("RESIDUE_POINTER")) this.getResiduePointers ();
 else if (this.line.equals ("AMBER_ATOM_TYPE")) this.getAtomTypes ();
 else if (this.line.equals ("MASS")) this.getMasses ();
return false;
});
Clazz.defineMethod (c$, "finalizeReader", 
function () {
Clazz.superCall (this, org.jmol.adapter.readers.more.MdTopReader, "finalizeReader", []);
var atoms = this.atomSetCollection.getAtoms ();
var atom;
for (var i = 0; i < this.atomCount; i++) {
atom = atoms[i];
atom.isHetero = org.jmol.api.JmolAdapter.isHetero (atom.group3);
var atomType = this.$atomTypes[i];
if (!this.getElementSymbol (atom, atomType)) atom.elementSymbol = org.jmol.adapter.readers.more.ForceFieldReader.deducePdbElementSymbol (atom.isHetero, atom.atomName, atom.group3);
}
var atoms2 = null;
if (this.filter == null) {
this.nAtoms = this.atomCount;
} else {
atoms2 =  new Array (atoms.length);
this.nAtoms = 0;
for (var i = 0; i < this.atomCount; i++) if (this.filterAtom (atoms[i], i)) atoms2[this.nAtoms++] = atoms[i];

}for (var i = 0, j = 0, k = 0; i < this.atomCount; i++) {
if (this.filter == null || this.bsFilter.get (i)) {
if (k % 100 == 0) j++;
this.setAtomCoordXYZ (atoms[i], (i % 100) * 2, j * 2, 0);
}}
if (atoms2 != null) {
this.atomSetCollection.discardPreviousAtoms ();
for (var i = 0; i < this.nAtoms; i++) this.atomSetCollection.addAtom (atoms2[i]);

}org.jmol.util.Logger.info ("Total number of atoms used=" + this.nAtoms);
this.setIsPDB ();
this.htParams.put ("defaultType", "mdcrd");
});
Clazz.defineMethod (c$, "getDataBlock", 
($fz = function () {
var vdata =  new java.util.ArrayList ();
this.discardLinesUntilContains ("FORMAT");
var n = org.jmol.adapter.smarter.AtomSetCollectionReader.getFortranFormatLengths (this.line.substring (this.line.indexOf ("("))).get (0).intValue ();
var i = 0;
var len = 0;
while (true) {
if (i >= len) {
if (this.readLine () == null) break;
i = 0;
len = this.line.length;
if (len == 0 || this.line.indexOf ("FLAG") >= 0) break;
}vdata.add (this.line.substring (i, i + n).trim ());
i += n;
}
return vdata.toArray ( new Array (vdata.size ()));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getPointers", 
($fz = function () {
var tokens = this.getDataBlock ();
this.atomCount = this.parseIntStr (tokens[0]);
var isPeriodic = (tokens[27].charAt (0) != '0');
if (isPeriodic) {
org.jmol.util.Logger.info ("Periodic type: " + tokens[27]);
this.htParams.put ("isPeriodic", Boolean.TRUE);
}org.jmol.util.Logger.info ("Total number of atoms read=" + this.atomCount);
this.htParams.put ("templateAtomCount", Integer.$valueOf (this.atomCount));
for (var i = 0; i < this.atomCount; i++) this.atomSetCollection.addAtom ( new org.jmol.adapter.smarter.Atom ());

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAtomTypes", 
($fz = function () {
this.$atomTypes = this.getDataBlock ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getCharges", 
($fz = function () {
var data = this.getDataBlock ();
if (data.length != this.atomCount) return;
var atoms = this.atomSetCollection.getAtoms ();
for (var i = this.atomCount; --i >= 0; ) atoms[i].partialCharge = this.parseFloatStr (data[i]);

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getResiduePointers", 
($fz = function () {
var resPtrs = this.getDataBlock ();
org.jmol.util.Logger.info ("Total number of residues=" + resPtrs.length);
var pt1 = this.atomCount;
var pt2;
var atoms = this.atomSetCollection.getAtoms ();
for (var i = resPtrs.length; --i >= 0; ) {
var ptr = pt2 = this.parseIntStr (resPtrs[i]) - 1;
while (ptr < pt1) {
if (this.group3s != null) atoms[ptr].group3 = this.group3s[i];
atoms[ptr++].sequenceNumber = i + 1;
}
pt1 = pt2;
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getResidueLabels", 
($fz = function () {
this.group3s = this.getDataBlock ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAtomNames", 
($fz = function () {
var names = this.getDataBlock ();
var atoms = this.atomSetCollection.getAtoms ();
for (var i = 0; i < this.atomCount; i++) atoms[i].atomName = names[i];

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getMasses", 
($fz = function () {
}, $fz.isPrivate = true, $fz));
});
