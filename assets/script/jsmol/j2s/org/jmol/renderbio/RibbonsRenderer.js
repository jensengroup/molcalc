Clazz.declarePackage ("org.jmol.renderbio");
Clazz.load (["org.jmol.renderbio.MeshRibbonRenderer"], "org.jmol.renderbio.RibbonsRenderer", null, function () {
c$ = Clazz.declareType (org.jmol.renderbio, "RibbonsRenderer", org.jmol.renderbio.MeshRibbonRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (this.wingVectors == null) return;
this.render2Strand (true, this.isNucleic ? 1 : 0.5, this.isNucleic ? 0 : 0.5);
}, "org.jmol.shapebio.BioShape");
});
