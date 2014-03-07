Clazz.declarePackage ("org.jmol.adapter.readers.quantum");
Clazz.load (["org.jmol.adapter.readers.quantum.GamessReader"], "org.jmol.adapter.readers.quantum.GamessUKReader", ["java.lang.Float", "java.util.ArrayList", "org.jmol.adapter.smarter.AtomSetCollectionReader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.symmetries = null;
this.occupancies = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.quantum, "GamessUKReader", org.jmol.adapter.readers.quantum.GamessReader);
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.line.indexOf ("BASIS OPTIONS") >= 0) {
this.readBasisInfo ();
return true;
}if (this.line.indexOf ("$CONTRL OPTIONS") >= 0) {
this.readControlInfo ();
return true;
}if (this.line.indexOf ("contracted primitive functions") >= 0) {
this.readGaussianBasis ("======================================================", "======");
return false;
}if (this.line.indexOf ("molecular geometry") >= 0) {
if (!this.doGetModel (++this.modelNumber, null)) return this.checkLastModel ();
this.atomNames =  new java.util.ArrayList ();
this.readAtomsInBohrCoordinates ();
return true;
}if (!this.doProcessLines) return true;
if (this.line.indexOf ("FREQUENCY_INFO_WOULD_BE_HERE") >= 0) {
return true;
}if (this.line.indexOf ("SYMMETRY ASSIGNMENT") >= 0) {
this.readOrbitalSymmetryAndOccupancy ();
return false;
}if (this.line.indexOf ("- ALPHA SET -") >= 0) this.alphaBeta = "alpha";
 else if (this.line.indexOf ("- BETA SET -") >= 0) this.alphaBeta = "beta";
 else if (this.line.indexOf ("eigenvectors") >= 0) {
this.readMolecularOrbitals (3);
this.setOrbitalSymmetryAndOccupancy ();
return false;
}return this.checkNboLine ();
});
Clazz.overrideMethod (c$, "readAtomsInBohrCoordinates", 
function () {
this.discardLinesUntilContains ("*****");
this.discardLinesUntilContains ("atom");
this.discardLinesUntilContains ("*****");
this.atomSetCollection.newAtomSet ();
while (this.readLine () != null && this.line.indexOf ("*****") < 0) {
if (this.line.charAt (14) == ' ') continue;
var tokens = this.getTokens ();
var atomName = tokens[1];
var atomicNumber = Clazz.floatToInt (this.parseFloatStr (tokens[2]));
var x = this.parseFloatStr (tokens[3]);
var y = this.parseFloatStr (tokens[4]);
var z = this.parseFloatStr (tokens[5]);
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) break;
var atom = this.atomSetCollection.addNewAtom ();
atom.atomName = atomName;
this.setAtomCoordXYZ (atom, x * 0.5291772, y * 0.5291772, z * 0.5291772);
atom.elementSymbol = org.jmol.adapter.smarter.AtomSetCollectionReader.getElementSymbol (atomicNumber);
this.atomNames.add (atomName);
}
});
Clazz.overrideMethod (c$, "fixShellTag", 
function (tag) {
return tag.substring (1).toUpperCase ();
}, "~S");
Clazz.defineMethod (c$, "readOrbitalSymmetryAndOccupancy", 
($fz = function () {
this.readLines (4);
this.symmetries =  new java.util.ArrayList ();
this.occupancies =  new java.util.ArrayList ();
while (this.readLine () != null && this.line.indexOf ("====") < 0) {
var tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line.substring (20));
this.symmetries.add (tokens[0] + " " + tokens[1]);
this.occupancies.add ( new Float (this.parseFloatStr (tokens[5])));
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setOrbitalSymmetryAndOccupancy", 
($fz = function () {
if (this.symmetries.size () < this.orbitals.size ()) return;
for (var i = this.orbitals.size (); --i >= 0; ) {
var mo = this.orbitals.get (i);
mo.put ("symmetry", this.symmetries.get (i));
mo.put ("occupancy", this.occupancies.get (i));
}
}, $fz.isPrivate = true, $fz));
});
