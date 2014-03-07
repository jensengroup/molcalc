Clazz.declarePackage ("org.jmol.minimize");
Clazz.load (["org.jmol.minimize.MinObject"], "org.jmol.minimize.MinTorsion", null, function () {
c$ = Clazz.declareType (org.jmol.minimize, "MinTorsion", org.jmol.minimize.MinObject);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, org.jmol.minimize.MinTorsion, []);
this.data = data;
}, "~A");
});
