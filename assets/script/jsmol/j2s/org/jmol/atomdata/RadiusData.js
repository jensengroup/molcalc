Clazz.declarePackage ("org.jmol.atomdata");
Clazz.load (["java.lang.Enum", "org.jmol.constant.EnumVdw"], "org.jmol.atomdata.RadiusData", ["java.lang.Float", "org.jmol.util.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.info = null;
this.factorType = null;
this.vdwType = null;
this.value = NaN;
this.valueExtended = 0;
this.values = null;
Clazz.instantialize (this, arguments);
}, org.jmol.atomdata, "RadiusData");
Clazz.prepareFields (c$, function () {
this.factorType = org.jmol.atomdata.RadiusData.EnumType.ABSOLUTE;
this.vdwType = org.jmol.constant.EnumVdw.AUTO;
});
Clazz.makeConstructor (c$, 
function (values, value, factorType, vdwType) {
if (values != null) {
this.values = values;
this.value = 2147483647;
return;
}if (factorType == null) return;
this.factorType = factorType;
this.value = value;
if (vdwType != null) this.vdwType = vdwType;
}, "~A,~N,org.jmol.atomdata.RadiusData.EnumType,org.jmol.constant.EnumVdw");
Clazz.overrideMethod (c$, "toString", 
function () {
if (Float.isNaN (this.value)) return "";
var sb =  new org.jmol.util.StringXBuilder ();
switch (this.factorType) {
case org.jmol.atomdata.RadiusData.EnumType.ABSOLUTE:
sb.appendF (this.value);
break;
case org.jmol.atomdata.RadiusData.EnumType.OFFSET:
sb.append (this.value > 0 ? "+" : "").appendF (this.value);
break;
case org.jmol.atomdata.RadiusData.EnumType.FACTOR:
sb.appendI (Clazz.floatToInt (this.value * 100)).append ("%");
if (this.vdwType !== org.jmol.constant.EnumVdw.AUTO) sb.append (this.vdwType.getVdwLabel ());
break;
case org.jmol.atomdata.RadiusData.EnumType.SCREEN:
sb.appendI (Clazz.floatToInt (this.value));
}
return sb.toString ();
});
Clazz.pu$h ();
c$ = Clazz.declareType (org.jmol.atomdata.RadiusData, "EnumType", Enum);
Clazz.defineEnumConstant (c$, "ABSOLUTE", 0, []);
Clazz.defineEnumConstant (c$, "OFFSET", 1, []);
Clazz.defineEnumConstant (c$, "FACTOR", 2, []);
Clazz.defineEnumConstant (c$, "SCREEN", 3, []);
c$ = Clazz.p0p ();
});
