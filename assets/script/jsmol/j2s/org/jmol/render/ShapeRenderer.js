Clazz.declarePackage ("org.jmol.render");
Clazz.load (null, "org.jmol.render.ShapeRenderer", ["org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.g3d = null;
this.modelSet = null;
this.shape = null;
this.myVisibilityFlag = 0;
this.shapeID = 0;
this.colix = 0;
this.mad = 0;
this.madBeg = 0;
this.madMid = 0;
this.madEnd = 0;
this.exportType = 0;
this.isExport = false;
Clazz.instantialize (this, arguments);
}, org.jmol.render, "ShapeRenderer");
Clazz.defineMethod (c$, "setViewerG3dShapeID", 
function (viewer, shapeID) {
this.viewer = viewer;
this.shapeID = shapeID;
this.myVisibilityFlag = org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (shapeID);
this.initRenderer ();
}, "org.jmol.viewer.Viewer,~N");
Clazz.defineMethod (c$, "initRenderer", 
function () {
});
Clazz.defineMethod (c$, "render", 
function (g3d, modelSet, shape) {
this.g3d = g3d;
this.modelSet = modelSet;
this.shape = shape;
this.exportType = g3d.getExportType ();
this.isExport = (this.exportType != 0);
var needsTranslucent = this.render ();
this.exportType = 0;
this.isExport = false;
return needsTranslucent;
}, "org.jmol.api.JmolRendererInterface,org.jmol.modelset.ModelSet,org.jmol.shape.Shape");
});
