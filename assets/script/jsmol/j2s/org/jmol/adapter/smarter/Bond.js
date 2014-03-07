Clazz.declarePackage ("org.jmol.adapter.smarter");
Clazz.load (["org.jmol.adapter.smarter.AtomSetObject"], "org.jmol.adapter.smarter.Bond", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.atomIndex1 = 0;
this.atomIndex2 = 0;
this.order = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.smarter, "Bond", org.jmol.adapter.smarter.AtomSetObject);
Clazz.makeConstructor (c$, 
function (atomIndex1, atomIndex2, order) {
Clazz.superConstructor (this, org.jmol.adapter.smarter.Bond, []);
this.atomIndex1 = atomIndex1;
this.atomIndex2 = atomIndex2;
this.order = order;
}, "~N,~N,~N");
});
