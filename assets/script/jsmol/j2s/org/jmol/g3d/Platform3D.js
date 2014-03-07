Clazz.declarePackage ("org.jmol.g3d");
Clazz.load (["java.lang.Thread"], "org.jmol.g3d.Platform3D", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.windowWidth = 0;
this.windowHeight = 0;
this.windowSize = 0;
this.bufferWidth = 0;
this.bufferHeight = 0;
this.bufferSize = 0;
this.bufferSizeT = 0;
this.bufferedImage = null;
this.pBuffer = null;
this.pBufferT = null;
this.zBuffer = null;
this.zBufferT = null;
this.widthOffscreen = 0;
this.heightOffscreen = 0;
this.offscreenImage = null;
this.graphicsForTextOrImage = null;
this.useClearingThread = false;
this.clearingThread = null;
this.apiPlatform = null;
if (!Clazz.isClassDefined ("org.jmol.g3d.Platform3D.ClearingThread")) {
org.jmol.g3d.Platform3D.$Platform3D$ClearingThread$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.g3d, "Platform3D");
Clazz.makeConstructor (c$, 
function (apiPlatform) {
this.initialize (false);
this.apiPlatform = apiPlatform;
}, "org.jmol.api.ApiPlatform");
Clazz.defineMethod (c$, "getGraphicsForMetrics", 
function () {
return this.apiPlatform.getGraphics (this.allocateOffscreenImage (1, 1));
});
Clazz.defineMethod (c$, "initialize", 
function (useClearingThread) {
this.useClearingThread = useClearingThread;
if (useClearingThread) {
this.clearingThread = Clazz.innerTypeInstance (org.jmol.g3d.Platform3D.ClearingThread, this, null);
this.clearingThread.start ();
}}, "~B");
Clazz.defineMethod (c$, "allocateTBuffers", 
function (antialiasTranslucent) {
this.bufferSizeT = (antialiasTranslucent ? this.bufferSize : this.windowSize);
this.zBufferT =  Clazz.newIntArray (this.bufferSizeT, 0);
this.pBufferT =  Clazz.newIntArray (this.bufferSizeT, 0);
}, "~B");
Clazz.defineMethod (c$, "allocateBuffers", 
function (width, height, antialias) {
this.windowWidth = width;
this.windowHeight = height;
this.windowSize = width * height;
if (antialias) {
this.bufferWidth = width * 2;
this.bufferHeight = height * 2;
} else {
this.bufferWidth = width;
this.bufferHeight = height;
}this.bufferSize = this.bufferWidth * this.bufferHeight;
this.zBuffer =  Clazz.newIntArray (this.bufferSize, 0);
this.pBuffer =  Clazz.newIntArray (this.bufferSize, 0);
this.bufferedImage = this.apiPlatform.allocateRgbImage (this.windowWidth, this.windowHeight, this.pBuffer, this.windowSize, org.jmol.g3d.Platform3D.backgroundTransparent);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "releaseBuffers", 
function () {
this.windowWidth = this.windowHeight = this.bufferWidth = this.bufferHeight = this.bufferSize = -1;
if (this.bufferedImage != null) {
this.apiPlatform.flushImage (this.bufferedImage);
this.bufferedImage = null;
}this.pBuffer = null;
this.zBuffer = null;
this.pBufferT = null;
this.zBufferT = null;
});
Clazz.defineMethod (c$, "hasContent", 
function () {
for (var i = this.bufferSize; --i >= 0; ) if (this.zBuffer[i] != 2147483647) return true;

return false;
});
Clazz.defineMethod (c$, "clearScreenBuffer", 
function () {
for (var i = this.bufferSize; --i >= 0; ) {
this.zBuffer[i] = 2147483647;
this.pBuffer[i] = 0;
}
});
Clazz.defineMethod (c$, "setBackgroundColor", 
function (bgColor) {
if (this.pBuffer == null) return;
for (var i = this.bufferSize; --i >= 0; ) if (this.pBuffer[i] == 0) this.pBuffer[i] = bgColor;

}, "~N");
Clazz.defineMethod (c$, "clearTBuffer", 
function () {
for (var i = this.bufferSizeT; --i >= 0; ) {
this.zBufferT[i] = 2147483647;
this.pBufferT[i] = 0;
}
});
Clazz.defineMethod (c$, "obtainScreenBuffer", 
function () {
if (this.useClearingThread) {
this.clearingThread.obtainBufferForClient ();
} else {
this.clearScreenBuffer ();
}});
Clazz.defineMethod (c$, "clearScreenBufferThreaded", 
function () {
if (this.useClearingThread) this.clearingThread.releaseBufferForClearing ();
});
Clazz.defineMethod (c$, "notifyEndOfRendering", 
function () {
this.apiPlatform.notifyEndOfRendering ();
});
Clazz.defineMethod (c$, "getGraphicsForTextOrImage", 
function (width, height) {
if (width > this.widthOffscreen || height > this.heightOffscreen) {
if (this.offscreenImage != null) {
this.apiPlatform.disposeGraphics (this.graphicsForTextOrImage);
this.apiPlatform.flushImage (this.offscreenImage);
}if (width > this.widthOffscreen) this.widthOffscreen = width;
if (height > this.heightOffscreen) this.heightOffscreen = height;
this.offscreenImage = this.allocateOffscreenImage (this.widthOffscreen, this.heightOffscreen);
this.graphicsForTextOrImage = this.apiPlatform.getStaticGraphics (this.offscreenImage, org.jmol.g3d.Platform3D.backgroundTransparent);
}return this.graphicsForTextOrImage;
}, "~N,~N");
Clazz.defineMethod (c$, "allocateOffscreenImage", 
($fz = function (width, height) {
return this.apiPlatform.newOffScreenImage (width, height);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setBackgroundTransparent", 
function (tf) {
($t$ = org.jmol.g3d.Platform3D.backgroundTransparent = tf, org.jmol.g3d.Platform3D.prototype.backgroundTransparent = org.jmol.g3d.Platform3D.backgroundTransparent, $t$);
}, "~B");
c$.$Platform3D$ClearingThread$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.bufferHasBeenCleared = false;
this.clientHasBuffer = false;
Clazz.instantialize (this, arguments);
}, org.jmol.g3d.Platform3D, "ClearingThread", Thread);
Clazz.defineMethod (c$, "notifyBackgroundChange", 
function (a) {
this.bufferHasBeenCleared = false;
this.notify ();
}, "~N");
Clazz.defineMethod (c$, "obtainBufferForClient", 
function () {
while (!this.bufferHasBeenCleared) try {
this.wait ();
} catch (ie) {
if (Clazz.exceptionOf (ie, InterruptedException)) {
} else {
throw ie;
}
}

this.clientHasBuffer = true;
});
Clazz.defineMethod (c$, "releaseBufferForClearing", 
function () {
this.clientHasBuffer = false;
this.bufferHasBeenCleared = false;
this.notify ();
});
Clazz.defineMethod (c$, "waitForClientRelease", 
function () {
while (this.clientHasBuffer || this.bufferHasBeenCleared) try {
this.wait ();
} catch (ie) {
if (Clazz.exceptionOf (ie, InterruptedException)) {
} else {
throw ie;
}
}

});
Clazz.defineMethod (c$, "notifyBufferReady", 
function () {
this.bufferHasBeenCleared = true;
this.notify ();
});
Clazz.overrideMethod (c$, "run", 
function () {
while (true) {
this.waitForClientRelease ();
this.b$["org.jmol.g3d.Platform3D"].clearScreenBuffer ();
this.notifyBufferReady ();
}
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"desireClearingThread", false,
"backgroundTransparent", false);
});
