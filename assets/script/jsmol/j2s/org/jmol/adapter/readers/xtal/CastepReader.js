Clazz.declarePackage ("org.jmol.adapter.readers.xtal");
Clazz.load (["org.jmol.adapter.smarter.AtomSetCollectionReader"], "org.jmol.adapter.readers.xtal.CastepReader", ["java.lang.Float", "java.util.ArrayList", "org.jmol.adapter.smarter.Atom", "org.jmol.util.Eigen", "$.Escape", "$.Logger", "$.Point3f", "$.TextFormat", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tokens = null;
this.isPhonon = false;
this.isOutput = false;
this.isCell = false;
this.a = 0;
this.b = 0;
this.c = 0;
this.alpha = 0;
this.beta = 0;
this.gamma = 0;
this.abc = null;
this.atomCount = 0;
this.atomPts = null;
this.havePhonons = false;
this.lastQPt = null;
this.qpt2 = 0;
this.desiredQpt = null;
this.desiredQ = null;
this.chargeType = "MULL";
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.xtal, "CastepReader", org.jmol.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.abc =  new Array (3);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
if (this.filter != null) {
if (this.checkFilterKey ("CHARGE=")) {
this.chargeType = this.filter.substring (this.filter.indexOf ("CHARGE=") + 7);
if (this.chargeType.length > 4) this.chargeType = this.chargeType.substring (0, 4);
}this.filter = this.filter.$replace ('(', '{').$replace (')', '}');
this.filter = org.jmol.util.TextFormat.simpleReplace (this.filter, "  ", " ");
if (this.filter.indexOf ("{") >= 0) this.setDesiredQpt (this.filter.substring (this.filter.indexOf ("{")));
this.filter = org.jmol.util.TextFormat.simpleReplace (this.filter, "-PT", "");
}this.continuing = this.readFileData ();
});
Clazz.defineMethod (c$, "setDesiredQpt", 
($fz = function (s) {
this.desiredQpt =  new org.jmol.util.Vector3f ();
this.desiredQ = "";
var num = 1;
var denom = 1;
var ipt = 0;
var xyz = 0;
var useSpace = (s.indexOf (',') < 0);
for (var i = 0; i < s.length; i++) {
var c = s.charAt (i);
switch (c) {
case '{':
ipt = i + 1;
num = 1;
denom = 1;
break;
case '/':
num = this.parseFloatStr (s.substring (ipt, i));
ipt = i + 1;
denom = 0;
break;
case ',':
case ' ':
case '}':
if (c == '}') this.desiredQ = s.substring (0, i + 1);
 else if ((c == ' ') != useSpace) break;
if (denom == 0) {
denom = this.parseFloatStr (s.substring (ipt, i));
} else {
num = this.parseFloatStr (s.substring (ipt, i));
}num /= denom;
switch (xyz++) {
case 0:
this.desiredQpt.x = num;
break;
case 1:
this.desiredQpt.y = num;
break;
case 2:
this.desiredQpt.z = num;
break;
}
denom = 1;
if (c == '}') i = s.length;
ipt = i + 1;
break;
}
}
org.jmol.util.Logger.info ("Looking for q-pt=" + this.desiredQpt);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "readFileData", 
($fz = function () {
while (this.tokenizeCastepCell () > 0) if (this.tokens.length >= 2 && this.tokens[0].equalsIgnoreCase ("%BLOCK")) {
org.jmol.util.Logger.info (this.line);
if (this.tokens[1].equalsIgnoreCase ("LATTICE_ABC")) {
this.readLatticeAbc ();
continue;
}if (this.tokens[1].equalsIgnoreCase ("LATTICE_CART")) {
this.readLatticeCart ();
continue;
}if (this.tokens[1].equalsIgnoreCase ("POSITIONS_FRAC")) {
this.setFractionalCoordinates (true);
this.readPositionsFrac ();
continue;
}if (this.tokens[1].equalsIgnoreCase ("POSITIONS_ABS")) {
this.setFractionalCoordinates (false);
this.readPositionsAbs ();
continue;
}}
if (this.isPhonon || this.isOutput) {
if (this.isPhonon) {
this.isTrajectory = (this.desiredVibrationNumber <= 0);
this.atomSetCollection.allowMultiple = false;
}return true;
}return false;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (this.isOutput) {
if (this.line.contains ("Real Lattice(A)")) {
this.readOutputUnitCell ();
} else if (this.line.contains ("Fractional coordinates of atoms")) {
if (this.doGetModel (++this.modelNumber, null)) {
this.readOutputAtoms ();
}} else if (this.doProcessLines && (this.line.contains ("Atomic Populations (Mulliken)") || this.line.contains ("Hirshfield Charge (e)"))) {
this.readOutputCharges ();
} else if (this.doProcessLines && this.line.contains ("Born Effective Charges")) {
this.readOutputBornChargeTensors ();
}return true;
}if (this.line.contains ("<-- E")) {
this.readPhononTrajectories ();
return true;
}if (this.line.indexOf ("Unit cell vectors") == 1) {
this.readPhononUnitCell ();
return true;
}if (this.line.indexOf ("Fractional Co-ordinates") >= 0) {
this.readPhononFractionalCoord ();
return true;
}if (this.line.indexOf ("q-pt") >= 0) {
this.readPhononFrequencies ();
return true;
}return true;
});
Clazz.defineMethod (c$, "readOutputUnitCell", 
($fz = function () {
this.applySymmetryAndSetTrajectory ();
this.atomSetCollection.newAtomSet ();
this.setFractionalCoordinates (true);
this.abc = this.read3Vectors (false);
this.setLatticeVectors ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readOutputAtoms", 
($fz = function () {
this.readLines (2);
while (this.readLine ().indexOf ("xxx") < 0) {
var atom =  new org.jmol.adapter.smarter.Atom ();
this.tokens = this.getTokens ();
atom.elementSymbol = this.tokens[1];
atom.atomName = this.tokens[1] + this.tokens[2];
this.atomSetCollection.addAtomWithMappedName (atom);
this.setAtomCoordXYZ (atom, this.parseFloatStr (this.tokens[3]), this.parseFloatStr (this.tokens[4]), this.parseFloatStr (this.tokens[5]));
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readPhononTrajectories", 
($fz = function () {
this.isTrajectory = (this.desiredVibrationNumber <= 0);
this.doApplySymmetry = true;
while (this.line != null && this.line.contains ("<-- E")) {
this.atomSetCollection.newAtomSet ();
this.discardLinesUntilContains ("<-- h");
this.setSpaceGroupName ("P1");
this.abc = this.read3Vectors (true);
this.setLatticeVectors ();
this.setFractionalCoordinates (false);
this.discardLinesUntilContains ("<-- R");
while (this.line != null && this.line.contains ("<-- R")) {
this.tokens = this.getTokens ();
var atom = this.atomSetCollection.addNewAtom ();
atom.elementSymbol = this.tokens[0];
this.setAtomCoordXYZ (atom, this.parseFloatStr (this.tokens[2]) * 0.5291772, this.parseFloatStr (this.tokens[3]) * 0.5291772, this.parseFloatStr (this.tokens[4]) * 0.5291772);
this.readLine ();
}
this.applySymmetryAndSetTrajectory ();
this.discardLinesUntilContains ("<-- E");
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "finalizeReader", 
function () {
if (this.isPhonon || this.isOutput) {
this.isTrajectory = false;
Clazz.superCall (this, org.jmol.adapter.readers.xtal.CastepReader, "finalizeReader", []);
return;
}this.doApplySymmetry = true;
this.setLatticeVectors ();
var nAtoms = this.atomSetCollection.getAtomCount ();
for (var i = 0; i < nAtoms; i++) this.setAtomCoord (this.atomSetCollection.getAtom (i));

Clazz.superCall (this, org.jmol.adapter.readers.xtal.CastepReader, "finalizeReader", []);
});
Clazz.defineMethod (c$, "setLatticeVectors", 
($fz = function () {
if (this.abc[0] == null) {
this.setUnitCell (this.a, this.b, this.c, this.alpha, this.beta, this.gamma);
return;
}var lv =  Clazz.newFloatArray (3, 0);
for (var i = 0; i < 3; i++) {
lv[0] = this.abc[i].x;
lv[1] = this.abc[i].y;
lv[2] = this.abc[i].z;
this.addPrimitiveLatticeVector (i, lv, 0);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readLatticeAbc", 
($fz = function () {
if (this.tokenizeCastepCell () == 0) return;
var factor = this.readLengthUnit (this.tokens[0]);
if (this.tokens.length >= 3) {
this.a = this.parseFloatStr (this.tokens[0]) * factor;
this.b = this.parseFloatStr (this.tokens[1]) * factor;
this.c = this.parseFloatStr (this.tokens[2]) * factor;
} else {
org.jmol.util.Logger.warn ("error reading a,b,c in %BLOCK LATTICE_ABC in CASTEP .cell file");
return;
}if (this.tokenizeCastepCell () == 0) return;
if (this.tokens.length >= 3) {
this.alpha = this.parseFloatStr (this.tokens[0]);
this.beta = this.parseFloatStr (this.tokens[1]);
this.gamma = this.parseFloatStr (this.tokens[2]);
} else {
org.jmol.util.Logger.warn ("error reading alpha,beta,gamma in %BLOCK LATTICE_ABC in CASTEP .cell file");
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readLatticeCart", 
($fz = function () {
if (this.tokenizeCastepCell () == 0) return;
var factor = this.readLengthUnit (this.tokens[0]);
var x;
var y;
var z;
for (var i = 0; i < 3; i++) {
if (this.tokens.length >= 3) {
x = this.parseFloatStr (this.tokens[0]) * factor;
y = this.parseFloatStr (this.tokens[1]) * factor;
z = this.parseFloatStr (this.tokens[2]) * factor;
this.abc[i] = org.jmol.util.Vector3f.new3 (x, y, z);
} else {
org.jmol.util.Logger.warn ("error reading coordinates of lattice vector " + Integer.toString (i + 1) + " in %BLOCK LATTICE_CART in CASTEP .cell file");
return;
}if (this.tokenizeCastepCell () == 0) return;
}
this.a = this.abc[0].length ();
this.b = this.abc[1].length ();
this.c = this.abc[2].length ();
this.alpha = Math.toDegrees (this.abc[1].angle (this.abc[2]));
this.beta = Math.toDegrees (this.abc[2].angle (this.abc[0]));
this.gamma = Math.toDegrees (this.abc[0].angle (this.abc[1]));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readPositionsFrac", 
($fz = function () {
if (this.tokenizeCastepCell () == 0) return;
this.readAtomData (1.0);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readPositionsAbs", 
($fz = function () {
if (this.tokenizeCastepCell () == 0) return;
var factor = this.readLengthUnit (this.tokens[0]);
this.readAtomData (factor);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readLengthUnit", 
($fz = function (units) {
var factor = 1.0;
for (var i = 0; i < org.jmol.adapter.readers.xtal.CastepReader.lengthUnitIds.length; i++) if (units.equalsIgnoreCase (org.jmol.adapter.readers.xtal.CastepReader.lengthUnitIds[i])) {
factor = org.jmol.adapter.readers.xtal.CastepReader.lengthUnitFactors[i];
this.tokenizeCastepCell ();
break;
}
return factor;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "readAtomData", 
($fz = function (factor) {
do {
if (this.tokens.length >= 4) {
var atom = this.atomSetCollection.addNewAtom ();
var pt = this.tokens[0].indexOf (":");
if (pt >= 0) {
atom.elementSymbol = this.tokens[0].substring (0, pt);
atom.atomName = this.tokens[0];
} else {
atom.elementSymbol = this.tokens[0];
}atom.set (this.parseFloatStr (this.tokens[1]), this.parseFloatStr (this.tokens[2]), this.parseFloatStr (this.tokens[3]));
atom.scale (factor);
} else {
org.jmol.util.Logger.warn ("cannot read line with CASTEP atom data: " + this.line);
}} while (this.tokenizeCastepCell () > 0 && !this.tokens[0].equalsIgnoreCase ("%ENDBLOCK"));
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "tokenizeCastepCell", 
($fz = function () {
while (this.readLine () != null) {
if ((this.line = this.line.trim ()).length == 0 || this.line.startsWith ("#") || this.line.startsWith ("!")) continue;
if (!this.isCell) {
if (this.line.startsWith ("%")) {
this.isCell = true;
break;
}if (this.line.startsWith ("BEGIN header")) {
this.isPhonon = true;
org.jmol.util.Logger.info ("reading CASTEP .phonon file");
return -1;
}if (this.line.contains ("CASTEP")) {
this.isOutput = true;
org.jmol.util.Logger.info ("reading CASTEP .castep file");
return -1;
}}break;
}
return (this.line == null ? 0 : (this.tokens = this.getTokens ()).length);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readOutputBornChargeTensors", 
($fz = function () {
if (this.readLine ().indexOf ("--------") < 0) return;
var atoms = this.atomSetCollection.getAtoms ();
while (this.readLine ().indexOf ('=') < 0) this.getOutputEllipsoid (atoms[this.readOutputAtomIndex ()], this.line.substring (12));

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readOutputAtomIndex", 
($fz = function () {
this.tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line);
return this.atomSetCollection.getAtomIndexFromName (this.tokens[0] + this.tokens[1]);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getOutputEllipsoid", 
($fz = function (atom, line0) {
var data =  Clazz.newFloatArray (9, 0);
var a =  Clazz.newDoubleArray (3, 3, 0);
this.fillFloatArray (line0, 0, data);
org.jmol.util.Logger.info ("tensor " + atom.atomName + "\t" + org.jmol.util.Escape.escape (data));
for (var p = 0, i = 0; i < 3; i++) for (var j = 0; j < 3; j++) a[i][j] = data[p++];


var x = 0;
var y = 0;
var z = 0;
if (a[0][1] != a[1][0]) {
z = (a[0][1] - a[1][0]) / 2;
a[0][1] = a[1][0] = (a[0][1] + a[1][0]) / 2;
}if (a[1][2] != a[2][1]) {
x = (a[1][2] - a[2][1]) / 2;
a[1][2] = a[2][1] = (a[1][2] + a[2][1]) / 2;
}if (a[0][2] != a[2][0]) {
y = -(a[0][2] - a[2][0]) / 2;
a[0][2] = a[2][0] = (a[0][2] + a[2][0]) / 2;
}atom.setEllipsoid (org.jmol.util.Eigen.getEllipsoidDD (a));
this.atomSetCollection.addVibrationVector (atom.atomIndex, x, y, z);
}, $fz.isPrivate = true, $fz), "org.jmol.adapter.smarter.Atom,~S");
Clazz.defineMethod (c$, "readOutputCharges", 
($fz = function () {
if (this.line.toUpperCase ().indexOf (this.chargeType) < 0) return;
org.jmol.util.Logger.info ("reading charges: " + this.line);
this.readLines (2);
var haveSpin = (this.line.indexOf ("Spin") >= 0);
this.readLine ();
var atoms = this.atomSetCollection.getAtoms ();
var spins = (haveSpin ?  new Array (atoms.length) : null);
if (spins != null) for (var i = 0; i < spins.length; i++) spins[i] = "0";

while (this.readLine () != null && this.line.indexOf ('=') < 0) {
var index = this.readOutputAtomIndex ();
var charge = this.parseFloatStr (this.tokens[haveSpin ? this.tokens.length - 2 : this.tokens.length - 1]);
atoms[index].partialCharge = charge;
if (haveSpin) spins[index] = this.tokens[this.tokens.length - 1];
}
if (haveSpin) {
var data = org.jmol.util.TextFormat.join (spins, '\n', 0);
this.atomSetCollection.setAtomSetAtomProperty ("spin", data, -1);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readPhononUnitCell", 
($fz = function () {
this.abc = this.read3Vectors (this.line.indexOf ("bohr") >= 0);
this.setSpaceGroupName ("P1");
this.setLatticeVectors ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readPhononFractionalCoord", 
($fz = function () {
this.setFractionalCoordinates (true);
while (this.readLine () != null && this.line.indexOf ("END") < 0) {
this.tokens = this.getTokens ();
var atom = this.atomSetCollection.addNewAtom ();
this.setAtomCoordXYZ (atom, this.parseFloatStr (this.tokens[1]), this.parseFloatStr (this.tokens[2]), this.parseFloatStr (this.tokens[3]));
atom.elementSymbol = this.tokens[4];
atom.bfactor = this.parseFloatStr (this.tokens[5]);
}
this.atomCount = this.atomSetCollection.getAtomCount ();
this.atomPts =  new Array (this.atomCount);
var atoms = this.atomSetCollection.getAtoms ();
for (var i = 0; i < this.atomCount; i++) this.atomPts[i] = org.jmol.util.Point3f.newP (atoms[i]);

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readPhononFrequencies", 
($fz = function () {
this.tokens = this.getTokens ();
var v =  new org.jmol.util.Vector3f ();
var qvec = org.jmol.util.Vector3f.new3 (this.parseFloatStr (this.tokens[2]), this.parseFloatStr (this.tokens[3]), this.parseFloatStr (this.tokens[4]));
var fcoord = this.getFractionalCoord (qvec);
var qtoks = "{" + this.tokens[2] + " " + this.tokens[3] + " " + this.tokens[4] + "}";
if (fcoord == null) fcoord = qtoks;
 else fcoord = "{" + fcoord + "}";
var isOK = false;
var isSecond = (this.tokens[1].equals (this.lastQPt));
this.qpt2 = (isSecond ? this.qpt2 + 1 : 1);
this.lastQPt = this.tokens[1];
if (this.filter != null && this.checkFilterKey ("Q=")) {
if (this.desiredQpt != null) {
v.sub2 (this.desiredQpt, qvec);
if (v.length () < 0.001) fcoord = this.desiredQ;
}isOK = (this.checkFilterKey ("Q=" + fcoord + "." + this.qpt2 + ";") || this.checkFilterKey ("Q=" + this.lastQPt + "." + this.qpt2 + ";") || !isSecond && this.checkFilterKey ("Q=" + fcoord + ";") || !isSecond && this.checkFilterKey ("Q=" + this.lastQPt + ";"));
if (!isOK) return;
}var isGammaPoint = (qvec.length () == 0);
var nx = 1;
var ny = 1;
var nz = 1;
if (this.ptSupercell != null && !isOK && !isSecond) {
this.atomSetCollection.setSupercellFromPoint (this.ptSupercell);
nx = this.ptSupercell.x;
ny = this.ptSupercell.y;
nz = this.ptSupercell.z;
var dx = (qvec.x == 0 ? 1 : qvec.x) * nx;
var dy = (qvec.y == 0 ? 1 : qvec.y) * ny;
var dz = (qvec.z == 0 ? 1 : qvec.z) * nz;
if (!org.jmol.adapter.readers.xtal.CastepReader.isInt (dx) || !org.jmol.adapter.readers.xtal.CastepReader.isInt (dy) || !org.jmol.adapter.readers.xtal.CastepReader.isInt (dz)) return;
isOK = true;
}if (this.ptSupercell == null || !this.havePhonons) this.appendLoadNote (this.line);
if (!isOK && isSecond) return;
if (!isOK && (this.ptSupercell == null) == !isGammaPoint) return;
if (this.havePhonons) return;
this.havePhonons = true;
var qname = "q=" + this.lastQPt + " " + fcoord;
this.applySymmetryAndSetTrajectory ();
if (isGammaPoint) qvec = null;
var freqs =  new java.util.ArrayList ();
while (this.readLine () != null && this.line.indexOf ("Phonon") < 0) {
this.tokens = this.getTokens ();
freqs.add (Float.$valueOf (this.parseFloatStr (this.tokens[1])));
}
this.readLine ();
var frequencyCount = freqs.size ();
var data =  Clazz.newFloatArray (8, 0);
var t =  new org.jmol.util.Vector3f ();
this.atomSetCollection.setCollectionName (qname);
for (var i = 0; i < frequencyCount; i++) {
if (!this.doGetVibration (++this.vibrationNumber)) {
for (var j = 0; j < this.atomCount; j++) this.readLine ();

continue;
}if (this.desiredVibrationNumber <= 0) {
if (!this.isTrajectory) {
this.cloneLastAtomSet (this.atomCount, this.atomPts);
this.applySymmetryAndSetTrajectory ();
}}this.symmetry = this.atomSetCollection.getSymmetry ();
var iatom = this.atomSetCollection.getLastAtomSetAtomIndex ();
var freq = freqs.get (i).floatValue ();
var atoms = this.atomSetCollection.getAtoms ();
var aCount = this.atomSetCollection.getAtomCount ();
for (var j = 0; j < this.atomCount; j++) {
this.fillFloatArray (null, 0, data);
for (var k = iatom++; k < aCount; k++) if (atoms[k].atomSite == j) {
t.sub2 (atoms[k], atoms[atoms[k].atomSite]);
t.x *= nx;
t.y *= ny;
t.z *= nz;
this.setPhononVector (data, atoms[k], t, qvec, v);
this.atomSetCollection.addVibrationVectorWithSymmetry (k, v.x, v.y, v.z, true);
}
}
if (this.isTrajectory) this.atomSetCollection.setTrajectory ();
this.atomSetCollection.setAtomSetFrequency (null, null, "" + freq, null);
this.atomSetCollection.setAtomSetName (org.jmol.util.TextFormat.formatDecimal (freq, 2) + " cm-1 " + qname);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getFractionalCoord", 
($fz = function (qvec) {
return (org.jmol.adapter.readers.xtal.CastepReader.isInt (qvec.x * 12) && org.jmol.adapter.readers.xtal.CastepReader.isInt (qvec.y * 12) && org.jmol.adapter.readers.xtal.CastepReader.isInt (qvec.z * 12) ? this.getSymmetry ().fcoord (qvec) : null);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Vector3f");
c$.isInt = Clazz.defineMethod (c$, "isInt", 
($fz = function (f) {
return (Math.abs (f - Math.round (f)) < 0.001);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setPhononVector", 
($fz = function (data, atom, rTrans, qvec, v) {
if (qvec == null) {
v.set (data[2], data[4], data[6]);
} else {
var phase = qvec.dot (rTrans);
var cosph = Math.cos (6.283185307179586 * phase);
var sinph = Math.sin (6.283185307179586 * phase);
v.x = (cosph * data[2] - sinph * data[3]);
v.y = (cosph * data[4] - sinph * data[5]);
v.z = (cosph * data[6] - sinph * data[7]);
}v.scale (Math.sqrt (1 / atom.bfactor));
}, $fz.isPrivate = true, $fz), "~A,org.jmol.adapter.smarter.Atom,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
Clazz.defineStatics (c$,
"lengthUnitIds", ["bohr", "m", "cm", "nm", "ang", "a0"],
"lengthUnitFactors", [0.5291772, 1E10, 1E8, 1E1, 1.0, 0.5291772],
"TWOPI", 6.283185307179586);
});
