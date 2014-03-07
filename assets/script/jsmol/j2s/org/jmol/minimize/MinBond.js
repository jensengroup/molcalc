Clazz.declarePackage ("org.jmol.minimize");
Clazz.load (["org.jmol.minimize.MinObject"], "org.jmol.minimize.MinBond", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.rawIndex = 0;
this.index = 0;
this.order = 0;
this.isAromatic = false;
this.isAmide = false;
Clazz.instantialize (this, arguments);
}, org.jmol.minimize, "MinBond", org.jmol.minimize.MinObject);
Clazz.makeConstructor (c$, 
function (rawIndex, index, atomIndex1, atomIndex2, order, type, key) {
Clazz.superConstructor (this, org.jmol.minimize.MinBond, []);
this.rawIndex = rawIndex;
this.index = index;
this.type = type;
this.data = [atomIndex1, atomIndex2];
this.order = order;
this.key = key;
}, "~N,~N,~N,~N,~N,~N,Integer");
Clazz.defineMethod (c$, "getOtherAtom", 
function (index) {
return this.data[this.data[0] == index ? 1 : 0];
}, "~N");
});
