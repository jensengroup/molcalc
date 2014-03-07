Clazz.declarePackage ("org.jmol.constant");
Clazz.load (["java.lang.Enum"], "org.jmol.constant.EnumAxesMode", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.code = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.constant, "EnumAxesMode", Enum);
Clazz.makeConstructor (c$, 
($fz = function (code) {
this.code = code;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getCode", 
function () {
return this.code;
});
c$.getAxesMode = Clazz.defineMethod (c$, "getAxesMode", 
function (code) {
for (var mode, $mode = 0, $$mode = org.jmol.constant.EnumAxesMode.values (); $mode < $$mode.length && ((mode = $$mode[$mode]) || true); $mode++) {
if (mode.getCode () == code) {
return mode;
}}
return null;
}, "~N");
Clazz.defineEnumConstant (c$, "BOUNDBOX", 0, [0]);
Clazz.defineEnumConstant (c$, "MOLECULAR", 1, [1]);
Clazz.defineEnumConstant (c$, "UNITCELL", 2, [2]);
});
