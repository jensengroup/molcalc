Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.ProteinStructure"], "org.jmol.modelsetbio.Turn", ["org.jmol.constant.EnumStructure"], function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "Turn", org.jmol.modelsetbio.ProteinStructure);
Clazz.makeConstructor (c$, 
function (apolymer, monomerIndex, monomerCount) {
Clazz.superConstructor (this, org.jmol.modelsetbio.Turn, [apolymer, org.jmol.constant.EnumStructure.TURN, monomerIndex, monomerCount]);
this.subtype = org.jmol.constant.EnumStructure.TURN;
}, "org.jmol.modelsetbio.AlphaPolymer,~N,~N");
});
