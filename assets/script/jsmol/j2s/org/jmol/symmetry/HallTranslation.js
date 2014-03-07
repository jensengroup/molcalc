Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (["org.jmol.util.Point3i"], "org.jmol.symmetry.HallTranslation", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.translationCode = '\0';
this.rotationOrder = 0;
this.rotationShift12ths = 0;
this.vectorShift12ths = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "HallTranslation");
Clazz.prepareFields (c$, function () {
this.vectorShift12ths =  new org.jmol.util.Point3i ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (translationCode, order) {
for (var i = 0; i < org.jmol.symmetry.HallTranslation.hallTranslationTerms.length; i++) {
var h = org.jmol.symmetry.HallTranslation.hallTranslationTerms[i];
if (h.translationCode == translationCode) {
if (h.rotationOrder == 0 || h.rotationOrder == order) {
this.translationCode = translationCode;
this.rotationShift12ths = h.rotationShift12ths;
this.vectorShift12ths = h.vectorShift12ths;
return;
}}}
}, "~S,~N");
Clazz.makeConstructor (c$, 
($fz = function (translationCode, vectorShift12ths) {
this.translationCode = translationCode;
this.rotationOrder = 0;
this.rotationShift12ths = 0;
this.vectorShift12ths = vectorShift12ths;
}, $fz.isPrivate = true, $fz), "~S,org.jmol.util.Point3i");
Clazz.makeConstructor (c$, 
($fz = function (translationCode, order, rotationShift12ths) {
this.translationCode = translationCode;
this.rotationOrder = order;
this.rotationShift12ths = rotationShift12ths;
this.vectorShift12ths =  new org.jmol.util.Point3i ();
}, $fz.isPrivate = true, $fz), "~S,~N,~N");
c$.getHallLatticeEquivalent = Clazz.defineMethod (c$, "getHallLatticeEquivalent", 
function (latticeParameter) {
var latticeCode = org.jmol.symmetry.HallTranslation.getLatticeCode (latticeParameter);
var isCentrosymmetric = (latticeParameter > 0);
return (isCentrosymmetric ? "-" : "") + latticeCode + " 1";
}, "~N");
c$.getLatticeIndex = Clazz.defineMethod (c$, "getLatticeIndex", 
function (latt) {
for (var i = 1, ipt = 3; i <= org.jmol.symmetry.HallTranslation.nLatticeTypes; i++, ipt += 3) if (org.jmol.symmetry.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return i;

return 0;
}, "~S");
c$.getLatticeCode = Clazz.defineMethod (c$, "getLatticeCode", 
function (latt) {
if (latt < 0) latt = -latt;
return (latt == 0 ? '\0' : latt > org.jmol.symmetry.HallTranslation.nLatticeTypes ? org.jmol.symmetry.HallTranslation.getLatticeCode (org.jmol.symmetry.HallTranslation.getLatticeIndex (String.fromCharCode (latt))) : org.jmol.symmetry.HallTranslation.latticeTranslationData[latt * 3].charAt (0));
}, "~N");
c$.getLatticeDesignation = Clazz.defineMethod (c$, "getLatticeDesignation", 
function (latt) {
var isCentrosymmetric = (latt > 0);
var str = (isCentrosymmetric ? "-" : "");
if (latt < 0) latt = -latt;
if (latt == 0 || latt > org.jmol.symmetry.HallTranslation.nLatticeTypes) return "";
return str + org.jmol.symmetry.HallTranslation.getLatticeCode (latt) + ": " + (isCentrosymmetric ? "centrosymmetric " : "") + org.jmol.symmetry.HallTranslation.latticeTranslationData[latt * 3 + 1];
}, "~N");
c$.getLatticeDesignation = Clazz.defineMethod (c$, "getLatticeDesignation", 
function (latticeCode, isCentrosymmetric) {
var latt = org.jmol.symmetry.HallTranslation.getLatticeIndex (latticeCode);
if (!isCentrosymmetric) latt = -latt;
return org.jmol.symmetry.HallTranslation.getLatticeDesignation (latt);
}, "~S,~B");
c$.getLatticeExtension = Clazz.defineMethod (c$, "getLatticeExtension", 
function (latt, isCentrosymmetric) {
for (var i = 1, ipt = 3; i <= org.jmol.symmetry.HallTranslation.nLatticeTypes; i++, ipt += 3) if (org.jmol.symmetry.HallTranslation.latticeTranslationData[ipt].charAt (0) == latt) return org.jmol.symmetry.HallTranslation.latticeTranslationData[ipt + 2] + (isCentrosymmetric ? " -1" : "");

return "";
}, "~S,~B");
Clazz.defineStatics (c$,
"latticeTranslationData", ["\0", "unknown", "", "P", "primitive", "", "I", "body-centered", " 1n", "R", "rhombohedral", " 1r 1r", "F", "face-centered", " 1ab 1bc 1ac", "A", "A-centered", " 1bc", "B", "B-centered", " 1ac", "C", "C-centered", " 1ab", "S", "rhombohedral(S)", " 1s 1s", "T", "rhombohedral(T)", " 1t 1t"]);
c$.nLatticeTypes = c$.prototype.nLatticeTypes = Clazz.doubleToInt (org.jmol.symmetry.HallTranslation.latticeTranslationData.length / 3) - 1;
c$.hallTranslationTerms = c$.prototype.hallTranslationTerms = [ new org.jmol.symmetry.HallTranslation ('a', org.jmol.util.Point3i.new3 (6, 0, 0)),  new org.jmol.symmetry.HallTranslation ('b', org.jmol.util.Point3i.new3 (0, 6, 0)),  new org.jmol.symmetry.HallTranslation ('c', org.jmol.util.Point3i.new3 (0, 0, 6)),  new org.jmol.symmetry.HallTranslation ('n', org.jmol.util.Point3i.new3 (6, 6, 6)),  new org.jmol.symmetry.HallTranslation ('u', org.jmol.util.Point3i.new3 (3, 0, 0)),  new org.jmol.symmetry.HallTranslation ('v', org.jmol.util.Point3i.new3 (0, 3, 0)),  new org.jmol.symmetry.HallTranslation ('w', org.jmol.util.Point3i.new3 (0, 0, 3)),  new org.jmol.symmetry.HallTranslation ('d', org.jmol.util.Point3i.new3 (3, 3, 3)),  new org.jmol.symmetry.HallTranslation ('1', 2, 6),  new org.jmol.symmetry.HallTranslation ('1', 3, 4),  new org.jmol.symmetry.HallTranslation ('2', 3, 8),  new org.jmol.symmetry.HallTranslation ('1', 4, 3),  new org.jmol.symmetry.HallTranslation ('3', 4, 9),  new org.jmol.symmetry.HallTranslation ('1', 6, 2),  new org.jmol.symmetry.HallTranslation ('2', 6, 4),  new org.jmol.symmetry.HallTranslation ('4', 6, 8),  new org.jmol.symmetry.HallTranslation ('5', 6, 10),  new org.jmol.symmetry.HallTranslation ('r', org.jmol.util.Point3i.new3 (4, 8, 8)),  new org.jmol.symmetry.HallTranslation ('s', org.jmol.util.Point3i.new3 (8, 8, 4)),  new org.jmol.symmetry.HallTranslation ('t', org.jmol.util.Point3i.new3 (8, 4, 8))];
});
