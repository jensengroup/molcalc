Clazz.declarePackage ("org.jmol.adapter.readers.simple");
Clazz.load (["org.jmol.adapter.smarter.AtomSetCollectionReader"], "org.jmol.adapter.readers.simple.CubeReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.atomCount = 0;
this.isAngstroms = false;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.simple, "CubeReader", org.jmol.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.atomSetCollection.newAtomSet ();
this.readTitleLines ();
this.readAtomCountAndOrigin ();
this.readLines (3);
this.readAtoms ();
this.applySymmetryAndSetTrajectory ();
this.continuing = false;
});
Clazz.defineMethod (c$, "readTitleLines", 
($fz = function () {
if (this.readLine ().indexOf ("#JVXL") == 0) while (this.readLine ().indexOf ("#") == 0) {
}
this.checkCurrentLineForScript ();
var name = this.line.trim ();
this.readLine ();
this.checkCurrentLineForScript ();
this.atomSetCollection.setAtomSetName (name + " - " + this.line.trim ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readAtomCountAndOrigin", 
($fz = function () {
this.readLine ();
this.isAngstroms = (this.line.indexOf ("ANGSTROMS") >= 0);
var tokens = this.getTokens ();
if (tokens[0].charAt (0) == '+') tokens[0] = tokens[0].substring (1);
this.atomCount = Math.abs (this.parseIntStr (tokens[0]));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readAtoms", 
($fz = function () {
var f = (this.isAngstroms ? 1 : 0.5291772);
for (var i = 0; i < this.atomCount; ++i) {
this.readLine ();
var atom = this.atomSetCollection.addNewAtom ();
atom.elementNumber = this.parseIntStr (this.line);
this.parseFloat ();
this.setAtomCoordXYZ (atom, this.parseFloat () * f, this.parseFloat () * f, this.parseFloat () * f);
}
}, $fz.isPrivate = true, $fz));
});
