Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.Tuple3d"], "org.jmol.util.Vector3d", null, function () {
c$ = Clazz.declareType (org.jmol.util, "Vector3d", org.jmol.util.Tuple3d);
Clazz.defineMethod (c$, "cross", 
function (v1, v2) {
this.set (v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}, "org.jmol.util.Vector3d,org.jmol.util.Vector3d");
Clazz.defineMethod (c$, "normalize", 
function () {
var d = this.length ();
this.x /= d;
this.y /= d;
this.z /= d;
});
Clazz.defineMethod (c$, "dot", 
function (v) {
return this.x * v.x + this.y * v.y + this.z * v.z;
}, "org.jmol.util.Vector3d");
Clazz.defineMethod (c$, "lengthSquared", 
function () {
return this.x * this.x + this.y * this.y + this.z * this.z;
});
Clazz.defineMethod (c$, "length", 
function () {
return Math.sqrt (this.lengthSquared ());
});
});
