Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.Tuple3f"], "org.jmol.util.Vector3f", null, function () {
c$ = Clazz.declareType (org.jmol.util, "Vector3f", org.jmol.util.Tuple3f);
c$.newV = Clazz.defineMethod (c$, "newV", 
function (t) {
var v =  new org.jmol.util.Vector3f ();
v.x = t.x;
v.y = t.y;
v.z = t.z;
return v;
}, "org.jmol.util.Tuple3f");
c$.new3 = Clazz.defineMethod (c$, "new3", 
function (x, y, z) {
var v =  new org.jmol.util.Vector3f ();
v.x = x;
v.y = y;
v.z = z;
return v;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "lengthSquared", 
function () {
return this.x * this.x + this.y * this.y + this.z * this.z;
});
Clazz.defineMethod (c$, "length", 
function () {
return Math.sqrt (this.lengthSquared ());
});
Clazz.defineMethod (c$, "cross", 
function (v1, v2) {
this.set (v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}, "org.jmol.util.Vector3f,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "dot", 
function (v) {
return this.x * v.x + this.y * v.y + this.z * v.z;
}, "org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "normalize", 
function () {
var d = this.length ();
this.x /= d;
this.y /= d;
this.z /= d;
});
Clazz.defineMethod (c$, "angle", 
function (v1) {
var xx = this.y * v1.z - this.z * v1.y;
var yy = this.z * v1.x - this.x * v1.z;
var zz = this.x * v1.y - this.y * v1.x;
var cross = Math.sqrt (xx * xx + yy * yy + zz * zz);
return Math.abs (Math.atan2 (cross, this.dot (v1)));
}, "org.jmol.util.Vector3f");
});
