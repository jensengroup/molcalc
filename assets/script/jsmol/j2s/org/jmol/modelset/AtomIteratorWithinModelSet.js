Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (["org.jmol.modelset.AtomIteratorWithinModel"], "org.jmol.modelset.AtomIteratorWithinModelSet", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bsModels = null;
this.center = null;
this.distance = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "AtomIteratorWithinModelSet", org.jmol.modelset.AtomIteratorWithinModel);
Clazz.makeConstructor (c$, 
function (bsModels) {
Clazz.superConstructor (this, org.jmol.modelset.AtomIteratorWithinModelSet, []);
this.bsModels = bsModels;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setCenter", 
function (center, distance) {
this.center = center;
this.distance = distance;
this.set (0);
}, "org.jmol.util.Point3f,~N");
Clazz.defineMethod (c$, "set", 
($fz = function (iModel) {
if ((this.modelIndex = this.bsModels.nextSetBit (iModel)) < 0 || (this.cubeIterator = this.bspf.getCubeIterator (this.modelIndex)) == null) return false;
Clazz.superCall (this, org.jmol.modelset.AtomIteratorWithinModelSet, "setCenter", [this.center, this.distance]);
return true;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "hasNext", 
function () {
if (Clazz.superCall (this, org.jmol.modelset.AtomIteratorWithinModelSet, "hasNext", [])) return true;
if (!this.set (this.modelIndex + 1)) return false;
return this.hasNext ();
});
});
