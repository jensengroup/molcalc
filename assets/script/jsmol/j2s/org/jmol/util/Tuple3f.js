Clazz.declarePackage ("org.jmol.util");
Clazz.load (null, "org.jmol.util.Tuple3f", ["java.lang.Float"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.util, "Tuple3f", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "set", 
function (x, y, z) {
this.x = x;
this.y = y;
this.z = z;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setA", 
function (t) {
this.x = t[0];
this.y = t[1];
this.z = t[2];
}, "~A");
Clazz.defineMethod (c$, "setT", 
function (t1) {
this.x = t1.x;
this.y = t1.y;
this.z = t1.z;
}, "org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "add2", 
function (t1, t2) {
this.x = t1.x + t2.x;
this.y = t1.y + t2.y;
this.z = t1.z + t2.z;
}, "org.jmol.util.Tuple3f,org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "add", 
function (t1) {
this.x += t1.x;
this.y += t1.y;
this.z += t1.z;
}, "org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "sub2", 
function (t1, t2) {
this.x = t1.x - t2.x;
this.y = t1.y - t2.y;
this.z = t1.z - t2.z;
}, "org.jmol.util.Tuple3f,org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "sub", 
function (t1) {
this.x -= t1.x;
this.y -= t1.y;
this.z -= t1.z;
}, "org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "scale", 
function (s) {
this.x *= s;
this.y *= s;
this.z *= s;
}, "~N");
Clazz.defineMethod (c$, "scaleAdd2", 
function (s, t1, t2) {
this.x = s * t1.x + t2.x;
this.y = s * t1.y + t2.y;
this.z = s * t1.z + t2.z;
}, "~N,org.jmol.util.Tuple3f,org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "scaleAdd", 
function (s, t1) {
this.x = s * this.x + t1.x;
this.y = s * this.y + t1.y;
this.z = s * this.z + t1.z;
}, "~N,org.jmol.util.Tuple3f");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var bits = 1;
bits = 31 * bits + org.jmol.util.Tuple3f.floatToIntBits0 (this.x);
bits = 31 * bits + org.jmol.util.Tuple3f.floatToIntBits0 (this.y);
bits = 31 * bits + org.jmol.util.Tuple3f.floatToIntBits0 (this.z);
return (bits ^ (bits >> 32));
});
c$.floatToIntBits0 = Clazz.defineMethod (c$, "floatToIntBits0", 
function (f) {
return (f == 0 ? 0 : Float.floatToIntBits (f));
}, "~N");
Clazz.overrideMethod (c$, "equals", 
function (t1) {
if (!(Clazz.instanceOf (t1, org.jmol.util.Tuple3f))) return false;
var t2 = t1;
return (this.x == t2.x && this.y == t2.y && this.z == t2.z);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ")";
});
});
