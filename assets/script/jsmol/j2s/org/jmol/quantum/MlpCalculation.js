Clazz.declarePackage ("org.jmol.quantum");
Clazz.load (["org.jmol.quantum.MepCalculation"], "org.jmol.quantum.MlpCalculation", ["java.lang.Float", "org.jmol.util.Logger"], function () {
c$ = Clazz.declareType (org.jmol.quantum, "MlpCalculation", org.jmol.quantum.MepCalculation);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.quantum.MlpCalculation);
this.distanceMode = 3;
});
Clazz.overrideMethod (c$, "assignPotentials", 
function (atoms, potentials, bsAromatic, bsCarbonyl, bsIgnore, data) {
this.getAtomicPotentials (data, "atomicLipophilicity.txt");
for (var i = 0; i < atoms.length; i++) {
var f = Math.abs (atoms[i].getFormalCharge ());
if (f == 0) {
if (bsIgnore != null && bsIgnore.get (i)) {
f = NaN;
} else {
f = this.getTabulatedPotential (atoms[i]);
if (Float.isNaN (f)) switch (atoms[i].getElementNumber ()) {
case 6:
f = (bsAromatic.get (i) ? 0.31 : bsCarbonyl.get (i) ? -0.54 : 0.45);
break;
case 7:
f = (bsAromatic.get (i) ? -0.6 : bsCarbonyl.get (i) ? -0.44 : -1.0);
break;
case 8:
f = (bsCarbonyl.get (i) ? -0.9 : -0.17);
break;
default:
f = NaN;
}
}}if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info (atoms[i].getInfo () + " " + f);
potentials[i] = f;
}
}, "~A,~A,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,~S");
});
