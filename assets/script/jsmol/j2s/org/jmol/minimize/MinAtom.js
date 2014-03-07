Clazz.declarePackage ("org.jmol.minimize");
Clazz.load (["java.util.ArrayList", "org.jmol.util.BitSet"], "org.jmol.minimize.MinAtom", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.index = 0;
this.sType = null;
this.atom = null;
this.ffAtomType = null;
this.ffType = 0;
this.vdwKey = null;
this.coord = null;
this.force = null;
this.bonds = null;
this.nBonds = 0;
this.hCount = 0;
this.partialCharge = 0;
this.bsVdw = null;
this.bs14 = null;
this.bondedAtoms = null;
Clazz.instantialize (this, arguments);
}, org.jmol.minimize, "MinAtom");
Clazz.prepareFields (c$, function () {
this.coord =  Clazz.newDoubleArray (3, 0);
this.force =  Clazz.newDoubleArray (3, 0);
this.bonds =  new java.util.ArrayList ();
this.bsVdw =  new org.jmol.util.BitSet ();
this.bs14 =  new org.jmol.util.BitSet ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "#" + this.index + " " + this.sType;
});
Clazz.makeConstructor (c$, 
function (index, atom, coord, atomCount) {
this.index = index;
this.atom = atom;
this.coord = coord;
this.bsVdw.setBits (index + 1, atomCount);
this.bsVdw.clear (index);
this.hCount = atom.getCovalentHydrogenCount ();
}, "~N,org.jmol.modelset.Atom,~A,~N");
Clazz.defineMethod (c$, "set", 
function () {
this.coord[0] = this.atom.x;
this.coord[1] = this.atom.y;
this.coord[2] = this.atom.z;
});
Clazz.defineMethod (c$, "getBondTo", 
function (iAtom) {
this.getBondedAtomIndexes ();
for (var i = 0; i < this.nBonds; i++) if (this.bondedAtoms[i] == iAtom) return this.bonds.get (i);

return null;
}, "~N");
Clazz.defineMethod (c$, "getBondedAtomIndexes", 
function () {
if (this.bondedAtoms == null) {
this.bondedAtoms =  Clazz.newIntArray (this.nBonds, 0);
for (var i = this.nBonds; --i >= 0; ) this.bondedAtoms[i] = this.bonds.get (i).getOtherAtom (this.index);

}return this.bondedAtoms;
});
Clazz.defineMethod (c$, "getIdentity", 
function () {
return this.atom.getInfo ();
});
Clazz.defineMethod (c$, "addBond", 
function (bond, i) {
this.bonds.add (bond);
this.nBonds++;
this.bsVdw.clear (i);
}, "org.jmol.minimize.MinBond,~N");
Clazz.defineMethod (c$, "getBondIndex", 
function (j) {
return this.bonds.get (j).index;
}, "~N");
c$.isLinear = Clazz.defineMethod (c$, "isLinear", 
function (minAtom) {
switch (minAtom.ffType) {
case 4:
case 53:
case 61:
return true;
}
return false;
}, "org.jmol.minimize.MinAtom");
});
