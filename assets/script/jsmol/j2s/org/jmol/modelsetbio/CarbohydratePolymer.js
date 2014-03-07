Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.BioPolymer"], "org.jmol.modelsetbio.CarbohydratePolymer", null, function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "CarbohydratePolymer", org.jmol.modelsetbio.BioPolymer);
Clazz.makeConstructor (c$, 
function (monomers) {
Clazz.superConstructor (this, org.jmol.modelsetbio.CarbohydratePolymer, [monomers]);
this.type = 3;
}, "~A");
});
