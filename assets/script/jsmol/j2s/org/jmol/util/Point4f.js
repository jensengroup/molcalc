Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.Tuple4f"], "org.jmol.util.Point4f", null, function () {
c$ = Clazz.declareType (org.jmol.util, "Point4f", org.jmol.util.Tuple4f);
c$.new4 = Clazz.defineMethod (c$, "new4", 
function (x, y, z, w) {
var pt =  new org.jmol.util.Point4f ();
pt.set (x, y, z, w);
return pt;
}, "~N,~N,~N,~N");
c$.newPt = Clazz.defineMethod (c$, "newPt", 
function (value) {
var pt =  new org.jmol.util.Point4f ();
pt.set (value.x, value.y, value.z, value.w);
return pt;
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "distance", 
function (p1) {
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
var dw = this.w - p1.w;
return Math.sqrt (dx * dx + dy * dy + dz * dz + dw * dw);
}, "org.jmol.util.Point4f");
});
