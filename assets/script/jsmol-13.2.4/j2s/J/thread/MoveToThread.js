Clazz.declarePackage ("J.thread");
Clazz.load (["J.thread.JmolThread", "J.util.AxisAngle4f", "$.Matrix3f", "$.V3"], "J.thread.MoveToThread", ["java.lang.Float", "J.util.P3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.transformManager = null;
this.aaStepCenter = null;
this.aaStepNavCenter = null;
this.aaStep = null;
this.aaTotal = null;
this.matrixStart = null;
this.matrixStartInv = null;
this.matrixStep = null;
this.matrixEnd = null;
this.center = null;
this.navCenter = null;
this.ptMoveToCenter = null;
this.zoom = null;
this.xTrans = null;
this.yTrans = null;
this.xNav = null;
this.yNav = null;
this.navDepth = null;
this.cameraDepth = null;
this.cameraX = null;
this.cameraY = null;
this.rotationRadius = null;
this.pixelScale = null;
this.totalSteps = 0;
this.fps = 0;
this.frameTimeMillis = 0;
this.iStep = 0;
this.doEndMove = false;
this.floatSecondsTotal = 0;
if (!Clazz.isClassDefined ("J.thread.MoveToThread.Slider")) {
J.thread.MoveToThread.$MoveToThread$Slider$ ();
}
Clazz.instantialize (this, arguments);
}, J.thread, "MoveToThread", J.thread.JmolThread);
Clazz.prepareFields (c$, function () {
this.aaStepCenter =  new J.util.V3 ();
this.aaStepNavCenter =  new J.util.V3 ();
this.aaStep =  new J.util.AxisAngle4f ();
this.aaTotal =  new J.util.AxisAngle4f ();
this.matrixStart =  new J.util.Matrix3f ();
this.matrixStartInv =  new J.util.Matrix3f ();
this.matrixStep =  new J.util.Matrix3f ();
this.matrixEnd =  new J.util.Matrix3f ();
});
Clazz.makeConstructor (c$, 
function (transformManager, viewer) {
Clazz.superConstructor (this, J.thread.MoveToThread);
this.setViewer (viewer, "MoveToThread");
this.transformManager = transformManager;
}, "J.viewer.TransformManager,J.viewer.Viewer");
$_M(c$, "set", 
function (floatSecondsTotal, center, end, zoom, xTrans, yTrans, newRotationRadius, navCenter, xNav, yNav, navDepth, cameraDepth, cameraX, cameraY) {
this.center = center;
this.ptMoveToCenter = (center == null ? this.transformManager.fixedRotationCenter : center);
this.rotationRadius = this.newSlider (this.transformManager.modelRadius, (center == null || Float.isNaN (newRotationRadius) ? this.transformManager.modelRadius : newRotationRadius <= 0 ? this.viewer.calcRotationRadius (center) : newRotationRadius));
this.pixelScale = this.newSlider (this.transformManager.scaleDefaultPixelsPerAngstrom, (center == null ? this.transformManager.scaleDefaultPixelsPerAngstrom : this.transformManager.defaultScaleToScreen (this.rotationRadius.value)));
this.zoom = this.newSlider (this.transformManager.zoomPercent, zoom);
this.xTrans = this.newSlider (this.transformManager.getTranslationXPercent (), xTrans);
this.yTrans = this.newSlider (this.transformManager.getTranslationYPercent (), yTrans);
if (navDepth != 0) {
this.navCenter = navCenter;
this.xNav = this.newSlider (this.transformManager.getNavigationOffsetPercent ('X'), xNav);
this.yNav = this.newSlider (this.transformManager.getNavigationOffsetPercent ('Y'), yNav);
this.navDepth = this.newSlider (this.transformManager.getNavigationDepthPercent (), navDepth);
}this.cameraDepth = this.newSlider (this.transformManager.getCameraDepth (), cameraDepth);
this.cameraX = this.newSlider (this.transformManager.camera.x, cameraX);
this.cameraY = this.newSlider (this.transformManager.camera.y, cameraY);
this.matrixEnd.setM (end);
this.transformManager.getRotation (this.matrixStart);
this.matrixStartInv.invertM (this.matrixStart);
this.matrixStep.mul2 (this.matrixEnd, this.matrixStartInv);
this.aaTotal.setM (this.matrixStep);
this.fps = 30;
this.floatSecondsTotal = floatSecondsTotal;
this.totalSteps = Clazz.floatToInt (floatSecondsTotal * this.fps);
if (this.totalSteps == 0) return 0;
this.frameTimeMillis = Clazz.doubleToInt (1000 / this.fps);
this.targetTime = System.currentTimeMillis ();
this.aaStepCenter.setT (this.ptMoveToCenter);
this.aaStepCenter.sub (this.transformManager.fixedRotationCenter);
this.aaStepCenter.scale (1 / this.totalSteps);
if (navCenter != null && this.transformManager.mode == 1) {
this.aaStepNavCenter.setT (navCenter);
this.aaStepNavCenter.sub (this.transformManager.navigationCenter);
this.aaStepNavCenter.scale (1 / this.totalSteps);
}return this.totalSteps;
}, "~N,J.util.P3,J.util.Matrix3f,~N,~N,~N,~N,J.util.P3,~N,~N,~N,~N,~N,~N");
$_M(c$, "newSlider", 
($fz = function (start, value) {
return (Float.isNaN (value) ? null : Clazz.innerTypeInstance (J.thread.MoveToThread.Slider, this, null, start, value));
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
if (this.totalSteps > 0) this.viewer.setInMotion (true);
mode = 0;
break;
case 0:
if (this.stopped || ++this.iStep >= this.totalSteps) {
mode = -2;
break;
}this.doStepTransform ();
this.doEndMove = true;
this.targetTime += this.frameTimeMillis;
this.currentTime = System.currentTimeMillis ();
var doRender = (this.currentTime < this.targetTime);
if (!doRender && this.isJS) {
this.targetTime = this.currentTime;
doRender = true;
}if (doRender) this.viewer.requestRepaintAndWait ("moveto thread");
if (this.transformManager.motion == null || !this.isJS && this.eval != null && !this.viewer.isScriptExecuting ()) {
this.stopped = true;
break;
}this.currentTime = System.currentTimeMillis ();
var sleepTime = (this.targetTime - this.currentTime);
if (!this.runSleep (sleepTime, 0)) return;
mode = 0;
break;
case -2:
if (this.totalSteps <= 0 || this.doEndMove && !this.stopped) this.doFinalTransform ();
if (this.totalSteps > 0) this.viewer.setInMotion (false);
this.viewer.moveUpdate (this.floatSecondsTotal);
if (this.transformManager.motion != null && !this.stopped) {
this.transformManager.motion = null;
this.viewer.finalizeTransformParameters ();
}this.resumeEval ();
return;
}

}, "~N");
$_M(c$, "doStepTransform", 
($fz = function () {
if (!Float.isNaN (this.matrixEnd.m00)) {
this.transformManager.getRotation (this.matrixStart);
this.matrixStartInv.invertM (this.matrixStart);
this.matrixStep.mul2 (this.matrixEnd, this.matrixStartInv);
this.aaTotal.setM (this.matrixStep);
this.aaStep.setAA (this.aaTotal);
this.aaStep.angle /= (this.totalSteps - this.iStep);
if (this.aaStep.angle == 0) this.matrixStep.setIdentity ();
 else this.matrixStep.setAA (this.aaStep);
this.matrixStep.mul (this.matrixStart);
}this.transformManager.setRotation (this.matrixStep);
var fStep = this.iStep / (this.totalSteps - 1);
if (this.center != null) this.transformManager.fixedRotationCenter.add (this.aaStepCenter);
if (this.navCenter != null && this.transformManager.mode == 1) {
var pt = J.util.P3.newP (this.transformManager.navigationCenter);
pt.add (this.aaStepNavCenter);
this.transformManager.setNavigatePt (pt);
}this.setValues (fStep);
}, $fz.isPrivate = true, $fz));
$_M(c$, "doFinalTransform", 
($fz = function () {
this.transformManager.setRotation (this.matrixEnd);
if (this.center != null) this.transformManager.moveRotationCenter (this.center, !this.transformManager.windowCentered);
if (this.navCenter != null && this.transformManager.mode == 1) this.transformManager.navigationCenter.setT (this.navCenter);
this.setValues (-1);
}, $fz.isPrivate = true, $fz));
$_M(c$, "setValues", 
($fz = function (fStep) {
if (this.cameraDepth != null) this.transformManager.setCameraDepthPercent (this.cameraDepth.getVal (fStep), false);
if (this.cameraX != null && this.cameraY != null) this.transformManager.setCamera (this.cameraX.getVal (fStep), this.cameraY.getVal (fStep));
if (this.zoom != null) this.transformManager.zoomToPercent (this.zoom.getVal (fStep));
this.transformManager.modelRadius = this.rotationRadius.getVal (fStep);
this.transformManager.scaleDefaultPixelsPerAngstrom = this.pixelScale.getVal (fStep);
if (this.xTrans != null && this.yTrans != null) {
this.transformManager.translateToPercent ('x', this.xTrans.getVal (fStep));
this.transformManager.translateToPercent ('y', this.yTrans.getVal (fStep));
}if (this.xNav != null && this.yNav != null) this.transformManager.navTranslatePercentOrTo (0, this.xNav.getVal (fStep), this.yNav.getVal (fStep));
if (this.navDepth != null) this.transformManager.setNavigationDepthPercent (this.navDepth.getVal (fStep));
}, $fz.isPrivate = true, $fz), "~N");
$_M(c$, "interrupt", 
function () {
this.doEndMove = false;
Clazz.superCall (this, J.thread.MoveToThread, "interrupt", []);
});
c$.$MoveToThread$Slider$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.start = 0;
this.delta = 0;
this.value = 0;
Clazz.instantialize (this, arguments);
}, J.thread.MoveToThread, "Slider");
Clazz.makeConstructor (c$, 
function (a, b) {
this.start = a;
this.value = b;
this.delta = b - a;
}, "~N,~N");
$_M(c$, "getVal", 
function (a) {
return (a < 0 ? this.value : this.start + a * this.delta);
}, "~N");
c$ = Clazz.p0p ();
};
});
