Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.Matrix4f"], "org.jmol.symmetry.HallInfo", ["org.jmol.symmetry.HallRotation", "$.HallTranslation", "$.SymmetryOperation", "org.jmol.util.Logger", "$.Point3i", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hallSymbol = null;
this.primitiveHallSymbol = null;
this.latticeCode = '\0';
this.latticeExtension = null;
this.isCentrosymmetric = false;
this.nRotations = 0;
this.rotationTerms = null;
this.vector12ths = null;
this.vectorCode = null;
if (!Clazz.isClassDefined ("org.jmol.symmetry.HallInfo.RotationTerm")) {
org.jmol.symmetry.HallInfo.$HallInfo$RotationTerm$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "HallInfo");
Clazz.prepareFields (c$, function () {
this.rotationTerms =  new Array (16);
});
Clazz.makeConstructor (c$, 
function (hallSymbol) {
try {
var str = this.hallSymbol = hallSymbol.trim ();
str = this.extractLatticeInfo (str);
if (org.jmol.symmetry.HallTranslation.getLatticeIndex (this.latticeCode) == 0) return;
this.latticeExtension = org.jmol.symmetry.HallTranslation.getLatticeExtension (this.latticeCode, this.isCentrosymmetric);
str = this.extractVectorInfo (str) + this.latticeExtension;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("Hallinfo: " + hallSymbol + " " + str);
var prevOrder = 0;
var prevAxisType = '\u0000';
this.primitiveHallSymbol = "P";
while (str.length > 0 && this.nRotations < 16) {
str = this.extractRotationInfo (str, prevOrder, prevAxisType);
var r = this.rotationTerms[this.nRotations - 1];
prevOrder = r.order;
prevAxisType = r.axisType;
this.primitiveHallSymbol += " " + r.primitiveCode;
}
this.primitiveHallSymbol += this.vectorCode;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("Invalid Hall symbol");
this.nRotations = 0;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "dumpInfo", 
function () {
var sb =  new org.jmol.util.StringXBuilder ();
sb.append ("\nHall symbol: ").append (this.hallSymbol).append ("\nprimitive Hall symbol: ").append (this.primitiveHallSymbol).append ("\nlattice type: ").append (this.getLatticeDesignation ());
for (var i = 0; i < this.nRotations; i++) {
sb.append ("\n\nrotation term ").appendI (i + 1).append (this.rotationTerms[i].dumpInfo ());
}
return sb.toString ();
});
Clazz.defineMethod (c$, "getLatticeDesignation", 
($fz = function () {
return org.jmol.symmetry.HallTranslation.getLatticeDesignation (this.latticeCode, this.isCentrosymmetric);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "extractLatticeInfo", 
($fz = function (name) {
var i = name.indexOf (" ");
if (i < 0) return "";
var term = name.substring (0, i).toUpperCase ();
this.latticeCode = term.charAt (0);
if (this.latticeCode == '-') {
this.isCentrosymmetric = true;
this.latticeCode = term.charAt (1);
}return name.substring (i + 1).trim ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "extractVectorInfo", 
($fz = function (name) {
this.vector12ths =  new org.jmol.util.Point3i ();
this.vectorCode = "";
var i = name.indexOf ("(");
var j = name.indexOf (")", i);
if (i > 0 && j > i) {
var term = name.substring (i + 1, j);
this.vectorCode = " (" + term + ")";
name = name.substring (0, i).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.x = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
i = term.indexOf (" ");
if (i >= 0) {
this.vector12ths.y = Integer.parseInt (term.substring (0, i));
term = term.substring (i + 1).trim ();
}}this.vector12ths.z = Integer.parseInt (term);
}return name;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "extractRotationInfo", 
($fz = function (name, prevOrder, prevAxisType) {
var i = name.indexOf (" ");
var code;
if (i >= 0) {
code = name.substring (0, i);
name = name.substring (i + 1).trim ();
} else {
code = name;
name = "";
}this.rotationTerms[this.nRotations] = Clazz.innerTypeInstance (org.jmol.symmetry.HallInfo.RotationTerm, this, null, code, prevOrder, prevAxisType);
this.nRotations++;
return name;
}, $fz.isPrivate = true, $fz), "~S,~N,~S");
c$.$HallInfo$RotationTerm$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.inputCode = null;
this.primitiveCode = null;
this.lookupCode = null;
this.translationString = null;
this.rotation = null;
this.translation = null;
this.seitzMatrix12ths = null;
this.isImproper = false;
this.order = 0;
this.axisType = '\0';
this.diagonalReferenceAxis = '\0';
this.allPositive = true;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry.HallInfo, "RotationTerm");
Clazz.prepareFields (c$, function () {
this.seitzMatrix12ths =  new org.jmol.util.Matrix4f ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.getRotationInfo (a, b, c);
}, "~S,~N,~S");
Clazz.defineMethod (c$, "dumpInfo", 
function () {
var a =  new org.jmol.util.StringXBuilder ();
a.append ("\ninput code: ").append (this.inputCode).append ("; primitive code: ").append (this.primitiveCode).append ("\norder: ").appendI (this.order).append (this.isImproper ? " (improper axis)" : "");
if (this.axisType != '_') {
a.append ("; axisType: ").appendC (this.axisType);
if (this.diagonalReferenceAxis != '\0') a.appendC (this.diagonalReferenceAxis);
}if (this.translationString.length > 0) a.append ("; translation: ").append (this.translationString);
if (this.b$["org.jmol.symmetry.HallInfo"].vectorCode.length > 0) a.append ("; vector offset:").append (this.b$["org.jmol.symmetry.HallInfo"].vectorCode);
if (this.rotation != null) a.append ("\noperator: ").append (this.getXYZ (this.allPositive)).append ("\nSeitz matrix:\n").append (org.jmol.symmetry.SymmetryOperation.dumpSeitz (this.seitzMatrix12ths));
return a.toString ();
});
Clazz.defineMethod (c$, "getXYZ", 
function (a) {
return org.jmol.symmetry.SymmetryOperation.getXYZFromMatrix (this.seitzMatrix12ths, true, a, true);
}, "~B");
Clazz.defineMethod (c$, "getRotationInfo", 
($fz = function (a, b, c) {
this.inputCode = a;
a += "   ";
if (a.charAt (0) == '-') {
this.isImproper = true;
a = a.substring (1);
}this.primitiveCode = "";
this.order = a.charCodeAt (0) - 48;
this.diagonalReferenceAxis = '\0';
this.axisType = '\0';
var d = 2;
var e;
switch (e = a.charAt (1)) {
case 'x':
case 'y':
case 'z':
switch (a.charAt (2)) {
case '\'':
case '"':
this.diagonalReferenceAxis = e;
e = a.charAt (2);
d++;
}
case '*':
this.axisType = e;
break;
case '\'':
case '"':
this.axisType = e;
switch (a.charAt (2)) {
case 'x':
case 'y':
case 'z':
this.diagonalReferenceAxis = a.charAt (2);
d++;
break;
default:
this.diagonalReferenceAxis = c;
}
break;
default:
this.axisType = (this.order == 1 ? '_' : this.b$["org.jmol.symmetry.HallInfo"].nRotations == 0 ? 'z' : this.b$["org.jmol.symmetry.HallInfo"].nRotations == 2 ? '*' : b == 2 || b == 4 ? 'x' : '\'');
a = a.substring (0, 1) + this.axisType + a.substring (1);
}
this.primitiveCode += (this.axisType == '_' ? "1" : a.substring (0, 2));
if (this.diagonalReferenceAxis != '\0') {
a = a.substring (0, 1) + this.diagonalReferenceAxis + this.axisType + a.substring (d);
this.primitiveCode += this.diagonalReferenceAxis;
d = 3;
}this.lookupCode = a.substring (0, d);
this.rotation = org.jmol.symmetry.HallRotation.lookup (this.lookupCode);
if (this.rotation == null) {
org.jmol.util.Logger.error ("Rotation lookup could not find " + this.inputCode + " ? " + this.lookupCode);
return;
}this.translation =  new org.jmol.symmetry.HallTranslation ();
this.translationString = "";
var f = a.length;
for (var g = d; g < f; g++) {
var h = a.charAt (g);
var i =  new org.jmol.symmetry.HallTranslation (h, this.order);
if (i.translationCode != '\0') {
this.translationString += "" + i.translationCode;
this.translation.rotationShift12ths += i.rotationShift12ths;
this.translation.vectorShift12ths.add (i.vectorShift12ths);
}}
this.primitiveCode = (this.isImproper ? "-" : "") + this.primitiveCode + this.translationString;
if (this.isImproper) {
this.seitzMatrix12ths.setM (this.rotation.seitzMatrixInv);
} else {
this.seitzMatrix12ths.setM (this.rotation.seitzMatrix);
}this.seitzMatrix12ths.m03 = this.translation.vectorShift12ths.x;
this.seitzMatrix12ths.m13 = this.translation.vectorShift12ths.y;
this.seitzMatrix12ths.m23 = this.translation.vectorShift12ths.z;
switch (this.axisType) {
case 'x':
this.seitzMatrix12ths.m03 += this.translation.rotationShift12ths;
break;
case 'y':
this.seitzMatrix12ths.m13 += this.translation.rotationShift12ths;
break;
case 'z':
this.seitzMatrix12ths.m23 += this.translation.rotationShift12ths;
break;
}
if (this.b$["org.jmol.symmetry.HallInfo"].vectorCode.length > 0) {
var h =  new org.jmol.util.Matrix4f ();
var i =  new org.jmol.util.Matrix4f ();
h.setIdentity ();
i.setIdentity ();
h.m03 = this.b$["org.jmol.symmetry.HallInfo"].vector12ths.x;
h.m13 = this.b$["org.jmol.symmetry.HallInfo"].vector12ths.y;
h.m23 = this.b$["org.jmol.symmetry.HallInfo"].vector12ths.z;
i.m03 = -this.b$["org.jmol.symmetry.HallInfo"].vector12ths.x;
i.m13 = -this.b$["org.jmol.symmetry.HallInfo"].vector12ths.y;
i.m23 = -this.b$["org.jmol.symmetry.HallInfo"].vector12ths.z;
this.seitzMatrix12ths.mul2 (h, this.seitzMatrix12ths);
this.seitzMatrix12ths.mul (i);
}if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("code = " + a + "; primitive code =" + this.primitiveCode + "\n Seitz Matrix(12ths):" + this.seitzMatrix12ths);
}}, $fz.isPrivate = true, $fz), "~S,~N,~S");
c$ = Clazz.p0p ();
};
});
