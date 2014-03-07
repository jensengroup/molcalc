Clazz.declarePackage ("org.jmol.adapter.smarter");
Clazz.load (["org.jmol.util.Point3f"], "org.jmol.adapter.smarter.Atom", ["java.lang.Float"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atomSetIndex = 0;
this.atomIndex = 0;
this.bsSymmetry = null;
this.atomSite = 0;
this.elementSymbol = null;
this.elementNumber = -1;
this.atomName = null;
this.formalCharge = -2147483648;
this.partialCharge = NaN;
this.vectorX = NaN;
this.vectorY = NaN;
this.vectorZ = NaN;
this.bfactor = NaN;
this.occupancy = 100;
this.radius = NaN;
this.isHetero = false;
this.atomSerial = -2147483648;
this.chainID = '\0';
this.alternateLocationID = '\0';
this.group3 = null;
this.sequenceNumber = -2147483648;
this.insertionCode = '\0';
this.anisoBorU = null;
this.ellipsoid = null;
this.ignoreSymmetry = false;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.smarter, "Atom", org.jmol.util.Point3f, Cloneable);
Clazz.defineMethod (c$, "setEllipsoid", 
function (e) {
if (e == null) return;
if (this.ellipsoid != null && this.ellipsoid.length == 3) this.ellipsoid[0] = e;
 else this.ellipsoid = [e];
}, "org.jmol.util.Quadric");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.adapter.smarter.Atom, []);
this.set (NaN, NaN, NaN);
});
Clazz.defineMethod (c$, "clone", 
function () {
var a = Clazz.superCall (this, org.jmol.adapter.smarter.Atom, "clone", []);
return a;
});
Clazz.defineMethod (c$, "getElementSymbol", 
function () {
if (this.elementSymbol == null) if (this.atomName != null) {
var len = this.atomName.length;
var ichFirst = 0;
var chFirst = String.fromCharCode (0);
while (ichFirst < len && !org.jmol.adapter.smarter.Atom.isValidFirstSymbolChar (chFirst = this.atomName.charAt (ichFirst))) ++ichFirst;

switch (len - ichFirst) {
case 0:
break;
default:
var chSecond = this.atomName.charAt (ichFirst + 1);
if (org.jmol.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (chFirst, chSecond)) {
this.elementSymbol = "" + chFirst + chSecond;
break;
}case 1:
if (org.jmol.adapter.smarter.Atom.isValidElementSymbol (chFirst)) this.elementSymbol = "" + chFirst;
break;
}
}return this.elementSymbol;
});
c$.isValidElementSymbol = Clazz.defineMethod (c$, "isValidElementSymbol", 
function (ch) {
return ch >= 'A' && ch <= 'Z' && org.jmol.adapter.smarter.Atom.elementCharMasks[ch.charCodeAt (0) - 65] < 0;
}, "~S");
c$.isValidElementSymbol2 = Clazz.defineMethod (c$, "isValidElementSymbol2", 
function (chFirst, chSecond) {
if (chFirst < 'A' || chFirst > 'Z' || chSecond < 'a' || chSecond > 'z') return false;
return ((org.jmol.adapter.smarter.Atom.elementCharMasks[chFirst.charCodeAt (0) - 65] >> (chSecond.charCodeAt (0) - 97)) & 1) != 0;
}, "~S,~S");
c$.isValidElementSymbolNoCaseSecondChar2 = Clazz.defineMethod (c$, "isValidElementSymbolNoCaseSecondChar2", 
function (chFirst, chSecond) {
if (chSecond >= 'A' && chSecond <= 'Z') chSecond = String.fromCharCode (chSecond.charCodeAt (0) + 32);
if (chFirst < 'A' || chFirst > 'Z' || chSecond < 'a' || chSecond > 'z') return false;
return ((org.jmol.adapter.smarter.Atom.elementCharMasks[chFirst.charCodeAt (0) - 65] >> (chSecond.charCodeAt (0) - 97)) & 1) != 0;
}, "~S,~S");
c$.isValidFirstSymbolChar = Clazz.defineMethod (c$, "isValidFirstSymbolChar", 
function (ch) {
return ch >= 'A' && ch <= 'Z' && org.jmol.adapter.smarter.Atom.elementCharMasks[ch.charCodeAt (0) - 65] != 0;
}, "~S");
c$.isValidElementSymbolNoCaseSecondChar = Clazz.defineMethod (c$, "isValidElementSymbolNoCaseSecondChar", 
function (str) {
if (str == null) return false;
var length = str.length;
if (length == 0) return false;
var chFirst = str.charAt (0);
if (length == 1) return org.jmol.adapter.smarter.Atom.isValidElementSymbol (chFirst);
if (length > 2) return false;
var chSecond = str.charAt (1);
return org.jmol.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (chFirst, chSecond);
}, "~S");
Clazz.defineMethod (c$, "scaleVector", 
function (vibScale) {
if (Float.isNaN (this.vectorX)) return;
this.vectorX *= vibScale;
this.vectorY *= vibScale;
this.vectorZ *= vibScale;
}, "~N");
Clazz.defineStatics (c$,
"elementCharMasks", [1972292, -2147351151, -2146019271, -2130706430, 1441792, -2147348464, 25, -2147205008, -2147344384, 0, -2147352576, 1179905, 548936, -2147434213, -2147221504, -2145759221, 0, 1056947, -2147339946, -2147477097, -2147483648, -2147483648, -2147483648, 8388624, -2147483646, 139264]);
});
