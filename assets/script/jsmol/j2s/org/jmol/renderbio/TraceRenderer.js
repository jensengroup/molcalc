Clazz.declarePackage ("org.jmol.renderbio");
Clazz.load (["org.jmol.renderbio.BioShapeRenderer"], "org.jmol.renderbio.TraceRenderer", null, function () {
c$ = Clazz.declareType (org.jmol.renderbio, "TraceRenderer", org.jmol.renderbio.BioShapeRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
this.getScreenControlPoints ();
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteConic (i, false);

}, "org.jmol.shapebio.BioShape");
});
