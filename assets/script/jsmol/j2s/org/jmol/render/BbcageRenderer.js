Clazz.declarePackage ("org.jmol.render");
Clazz.load (["org.jmol.render.CageRenderer"], "org.jmol.render.BbcageRenderer", ["org.jmol.util.BoxInfo"], function () {
c$ = Clazz.declareType (org.jmol.render, "BbcageRenderer", org.jmol.render.CageRenderer);
Clazz.overrideMethod (c$, "setEdges", 
function () {
this.tickEdges = org.jmol.util.BoxInfo.bbcageTickEdges;
});
Clazz.defineMethod (c$, "render", 
function () {
var bbox = this.shape;
if (bbox.isVisible && (this.isExport || this.g3d.checkTranslucent (false)) && !this.viewer.isJmolDataFrame ()) {
this.colix = this.viewer.getObjectColix (4);
this.render (bbox.mad, this.modelSet.getBboxVertices (), null, 0, 0xFF, 0xFF, 1);
}return false;
});
});
