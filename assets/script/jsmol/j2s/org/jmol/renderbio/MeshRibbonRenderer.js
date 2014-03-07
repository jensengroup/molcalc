Clazz.declarePackage ("org.jmol.renderbio");
Clazz.load (["org.jmol.renderbio.StrandsRenderer"], "org.jmol.renderbio.MeshRibbonRenderer", null, function () {
c$ = Clazz.declareType (org.jmol.renderbio, "MeshRibbonRenderer", org.jmol.renderbio.StrandsRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (!this.setStrandCount ()) return;
var offset = ((this.strandCount >> 1) * this.strandSeparation) + this.baseOffset;
this.render2Strand (false, offset, offset);
this.render1 ();
}, "org.jmol.shapebio.BioShape");
Clazz.defineMethod (c$, "render2Strand", 
function (doFill, offsetTop, offsetBottom) {
this.getScreenControlPoints ();
this.ribbonTopScreens = this.calcScreens (offsetTop);
this.ribbonBottomScreens = this.calcScreens (-offsetBottom);
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteRibbon (doFill, i, false);

this.viewer.freeTempScreens (this.ribbonTopScreens);
this.viewer.freeTempScreens (this.ribbonBottomScreens);
}, "~B,~N,~N");
});
