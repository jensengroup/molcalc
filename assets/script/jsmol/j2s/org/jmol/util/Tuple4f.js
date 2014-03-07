Clazz.declarePackage ("org.jmol.util");
Clazz.load (null, "org.jmol.util.Tuple4f", ["org.jmol.util.Tuple3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
this.w = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.util, "Tuple4f", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (x, y, z, w) {
this.x = x;
this.y = y;
this.z = z;
this.w = w;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "scale", 
function (s) {
this.x *= s;
this.y *= s;
this.z *= s;
this.w *= s;
}, "~N");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return org.jmol.util.Tuple3f.floatToIntBits0 (this.x) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.y) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.z) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.w);
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, org.jmol.util.Tuple4f))) return false;
var t = o;
return (this.x == t.x && this.y == t.y && this.z == t.z && this.w == t.w);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
});
});
