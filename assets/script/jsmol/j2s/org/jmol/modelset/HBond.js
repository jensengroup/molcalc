Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (["org.jmol.modelset.Bond"], "org.jmol.modelset.HBond", ["org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.energy = 0;
this.paletteID = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "HBond", org.jmol.modelset.Bond);
Clazz.makeConstructor (c$, 
function (atom1, atom2, order, mad, colix, energy) {
Clazz.superConstructor (this, org.jmol.modelset.HBond, [atom1, atom2, order, mad, colix]);
this.energy = energy;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("HBond energy = " + energy + " #" + this.getIdentity ());
}, "org.jmol.modelset.Atom,org.jmol.modelset.Atom,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getEnergy", 
function () {
return this.energy;
});
Clazz.defineMethod (c$, "getPaletteId", 
function () {
return this.paletteID;
});
Clazz.overrideMethod (c$, "setPaletteID", 
function (paletteID) {
this.paletteID = paletteID;
}, "~N");
c$.getEnergy = Clazz.defineMethod (c$, "getEnergy", 
function (distAH, distCH, distCD, distAD) {
var energy = Math.round (-27888.0 / distAH - -27888.0 / distAD + -27888.0 / distCD - -27888.0 / distCH);
return energy;
}, "~N,~N,~N,~N");
Clazz.defineStatics (c$,
"QConst", -27888.0);
});
