Clazz.declarePackage ("org.jmol.minimize");
Clazz.load (["org.jmol.minimize.MinObject"], "org.jmol.minimize.MinAngle", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.sbType = 0;
this.sbKey = null;
this.ka = 0;
this.theta0 = NaN;
Clazz.instantialize (this, arguments);
}, org.jmol.minimize, "MinAngle", org.jmol.minimize.MinObject);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, org.jmol.minimize.MinAngle, []);
this.data = data;
}, "~A");
});
