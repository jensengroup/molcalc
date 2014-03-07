Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.Point3f"], "org.jmol.util.Point3fi", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.index = 0;
this.screenX = 0;
this.screenY = 0;
this.screenZ = 0;
this.screenDiameter = -1;
this.modelIndex = -1;
Clazz.instantialize (this, arguments);
}, org.jmol.util, "Point3fi", org.jmol.util.Point3f);
c$.set2 = Clazz.defineMethod (c$, "set2", 
function (p3f, p3i) {
p3f.x = p3i.x;
p3f.y = p3i.y;
p3f.z = p3i.z;
}, "org.jmol.util.Point3f,org.jmol.util.Point3i");
});
