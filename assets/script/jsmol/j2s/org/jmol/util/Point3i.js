Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.Tuple3i"], "org.jmol.util.Point3i", null, function () {
c$ = Clazz.declareType (org.jmol.util, "Point3i", org.jmol.util.Tuple3i);
c$.new3 = Clazz.defineMethod (c$, "new3", 
function (x, y, z) {
var pt =  new org.jmol.util.Point3i ();
pt.x = x;
pt.y = y;
pt.z = z;
return pt;
}, "~N,~N,~N");
});
