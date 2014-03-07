Clazz.declarePackage ("org.jmol.render");
Clazz.load (["org.jmol.api.JmolRepaintInterface", "org.jmol.util.BitSet"], "org.jmol.render.RepaintManager", ["org.jmol.util.Logger", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.shapeManager = null;
this.renderers = null;
this.bsTranslucent = null;
this.holdRepaint = 0;
this.repaintPending = false;
Clazz.instantialize (this, arguments);
}, org.jmol.render, "RepaintManager", null, org.jmol.api.JmolRepaintInterface);
Clazz.prepareFields (c$, function () {
this.bsTranslucent = org.jmol.util.BitSet.newN (35);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (viewer, shapeManager) {
this.viewer = viewer;
this.shapeManager = shapeManager;
}, "org.jmol.viewer.Viewer,org.jmol.viewer.ShapeManager");
Clazz.overrideMethod (c$, "isRepaintPending", 
function () {
return this.repaintPending;
});
Clazz.overrideMethod (c$, "pushHoldRepaint", 
function () {
++this.holdRepaint;
});
Clazz.overrideMethod (c$, "popHoldRepaint", 
function (andRepaint) {
--this.holdRepaint;
if (this.holdRepaint <= 0) {
this.holdRepaint = 0;
if (andRepaint) {
this.repaintPending = true;
this.repaintNow ();
}}}, "~B");
Clazz.overrideMethod (c$, "requestRepaintAndWait", 
function () {
{
if (typeof Jmol != "undefined" && Jmol._repaint)
Jmol._repaint(this.viewer.applet, false);
this.repaintDone();
}});
Clazz.overrideMethod (c$, "repaintIfReady", 
function () {
if (this.repaintPending) return false;
this.repaintPending = true;
if (this.holdRepaint == 0) {
this.repaintNow ();
}return true;
});
Clazz.defineMethod (c$, "repaintNow", 
($fz = function () {
if (!this.viewer.haveDisplay) return;
{
if (typeof Jmol != "undefined" && Jmol._repaint)
Jmol._repaint(this.viewer.applet,true);
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "repaintDone", 
function () {
this.repaintPending = false;
{
}});
Clazz.overrideMethod (c$, "clear", 
function (iShape) {
if (this.renderers == null) return;
if (iShape >= 0) this.renderers[iShape] = null;
 else for (var i = 0; i < 35; ++i) this.renderers[i] = null;

}, "~N");
Clazz.defineMethod (c$, "getRenderer", 
($fz = function (shapeID) {
if (this.renderers[shapeID] != null) return this.renderers[shapeID];
var className = org.jmol.viewer.JmolConstants.getShapeClassName (shapeID, true) + "Renderer";
try {
var shapeClass = Class.forName (className);
var renderer = shapeClass.newInstance ();
renderer.setViewerG3dShapeID (this.viewer, shapeID);
return this.renderers[shapeID] = renderer;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.errorEx ("Could not instantiate renderer:" + className, e);
return null;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.overrideMethod (c$, "render", 
function (gdata, modelSet, isFirstPass, minMax) {
var logTime = this.viewer.getShowTiming ();
try {
var g3d = gdata;
g3d.renderBackground (null);
if (isFirstPass) {
this.bsTranslucent.clearAll ();
if (minMax != null) g3d.renderCrossHairs (minMax, this.viewer.getScreenWidth (), this.viewer.getScreenHeight (), this.viewer.getNavigationOffset (), this.viewer.getNavigationDepthPercent ());
var band = this.viewer.getRubberBandSelection ();
if (band != null && g3d.setColix (this.viewer.getColixRubberband ())) g3d.drawRect (band.x, band.y, 0, 0, band.width, band.height);
}if (this.renderers == null) this.renderers =  new Array (35);
var msg = null;
for (var i = 0; i < 35 && g3d.currentlyRendering (); ++i) {
var shape = this.shapeManager.getShape (i);
if (shape == null) continue;
if (logTime) {
msg = "rendering " + org.jmol.viewer.JmolConstants.getShapeClassName (i, false);
org.jmol.util.Logger.startTimer (msg);
}if ((isFirstPass || this.bsTranslucent.get (i)) && this.getRenderer (i).render (g3d, modelSet, shape)) this.bsTranslucent.set (i);
if (logTime) org.jmol.util.Logger.checkTimer (msg, false);
}
g3d.renderAllStrings (null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
org.jmol.util.Logger.error ("rendering error? ");
} else {
throw e;
}
}
}, "org.jmol.util.GData,org.jmol.modelset.ModelSet,~B,~A");
Clazz.overrideMethod (c$, "renderExport", 
function (type, gdata, modelSet, fileName) {
var isOK;
var logTime = this.viewer.getShowTiming ();
this.viewer.finalizeTransformParameters ();
this.shapeManager.finalizeAtoms (null, null);
this.shapeManager.transformAtoms ();
var g3dExport = this.viewer.initializeExporter (type, fileName);
isOK = (g3dExport != null);
if (!isOK) {
org.jmol.util.Logger.error ("Cannot export " + type);
return null;
}g3dExport.renderBackground (g3dExport);
if (this.renderers == null) this.renderers =  new Array (35);
var msg = null;
for (var i = 0; i < 35; ++i) {
var shape = this.shapeManager.getShape (i);
if (shape == null) continue;
if (logTime) {
msg = "rendering " + org.jmol.viewer.JmolConstants.getShapeClassName (i, false);
org.jmol.util.Logger.startTimer (msg);
}this.getRenderer (i).render (g3dExport, modelSet, shape);
if (logTime) org.jmol.util.Logger.checkTimer (msg, false);
}
g3dExport.renderAllStrings (g3dExport);
return g3dExport.finalizeOutput ();
}, "~S,org.jmol.util.GData,org.jmol.modelset.ModelSet,~S");
});
