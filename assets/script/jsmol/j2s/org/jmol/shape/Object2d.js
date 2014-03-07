Clazz.declarePackage ("org.jmol.shape");
Clazz.load (null, "org.jmol.shape.Object2d", ["java.lang.Float", "org.jmol.util.Colix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isLabelOrHover = false;
this.viewer = null;
this.gdata = null;
this.xyz = null;
this.target = null;
this.script = null;
this.colix = 0;
this.bgcolix = 0;
this.pointer = 0;
this.align = 0;
this.valign = 0;
this.movableX = 0;
this.movableY = 0;
this.movableZ = 0;
this.movableXPercent = 2147483647;
this.movableYPercent = 2147483647;
this.movableZPercent = 2147483647;
this.offsetX = 0;
this.offsetY = 0;
this.z = 0;
this.zSlab = 0;
this.windowWidth = 0;
this.windowHeight = 0;
this.adjustForWindow = false;
this.boxWidth = 0;
this.boxHeight = 0;
this.boxX = 0;
this.boxY = 0;
this.modelIndex = -1;
this.visible = true;
this.hidden = false;
this.boxXY = null;
this.scalePixelsPerMicron = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.shape, "Object2d");
Clazz.prepareFields (c$, function () {
this.boxXY =  Clazz.newFloatArray (5, 0);
});
Clazz.defineMethod (c$, "getScalePixelsPerMicron", 
function () {
return this.scalePixelsPerMicron;
});
Clazz.defineMethod (c$, "setScalePixelsPerMicron", 
function (scalePixelsPerMicron) {
this.scalePixelsPerMicron = scalePixelsPerMicron;
}, "~N");
Clazz.defineMethod (c$, "setModel", 
function (modelIndex) {
this.modelIndex = modelIndex;
}, "~N");
Clazz.defineMethod (c$, "setVisibility", 
function (TF) {
this.visible = TF;
}, "~B");
Clazz.defineMethod (c$, "setXYZ", 
function (xyz) {
this.valign = (xyz == null ? 0 : 4);
this.xyz = xyz;
this.setAdjustForWindow (xyz == null);
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setAdjustForWindow", 
function (TF) {
this.adjustForWindow = TF;
}, "~B");
Clazz.defineMethod (c$, "setColix", 
function (colix) {
this.colix = colix;
}, "~N");
Clazz.defineMethod (c$, "setColixO", 
function (value) {
this.colix = org.jmol.util.Colix.getColixO (value);
}, "~O");
Clazz.defineMethod (c$, "setTranslucent", 
function (level, isBackground) {
if (isBackground) {
if (this.bgcolix != 0) this.bgcolix = org.jmol.util.Colix.getColixTranslucent3 (this.bgcolix, !Float.isNaN (level), level);
} else {
this.colix = org.jmol.util.Colix.getColixTranslucent3 (this.colix, !Float.isNaN (level), level);
}}, "~N,~B");
Clazz.defineMethod (c$, "setBgColix", 
function (colix) {
this.bgcolix = colix;
}, "~N");
Clazz.defineMethod (c$, "setBgColixO", 
function (value) {
this.bgcolix = (value == null ? 0 : org.jmol.util.Colix.getColixO (value));
}, "~O");
Clazz.defineMethod (c$, "setMovableX", 
function (x) {
this.valign = (this.valign == 4 ? 4 : 0);
this.movableX = x;
this.movableXPercent = 2147483647;
}, "~N");
Clazz.defineMethod (c$, "setMovableY", 
function (y) {
this.valign = (this.valign == 4 ? 4 : 0);
this.movableY = y;
this.movableYPercent = 2147483647;
}, "~N");
Clazz.defineMethod (c$, "setMovableZ", 
function (z) {
if (this.valign != 4) this.valign = 0;
this.movableZ = z;
this.movableZPercent = 2147483647;
}, "~N");
Clazz.defineMethod (c$, "setMovableXPercent", 
function (x) {
this.valign = (this.valign == 4 ? 4 : 0);
this.movableX = 2147483647;
this.movableXPercent = x;
}, "~N");
Clazz.defineMethod (c$, "setMovableYPercent", 
function (y) {
this.valign = (this.valign == 4 ? 4 : 0);
this.movableY = 2147483647;
this.movableYPercent = y;
}, "~N");
Clazz.defineMethod (c$, "setMovableZPercent", 
function (z) {
if (this.valign != 4) this.valign = 0;
this.movableZ = 2147483647;
this.movableZPercent = z;
}, "~N");
Clazz.defineMethod (c$, "setZs", 
function (z, zSlab) {
this.z = z;
this.zSlab = zSlab;
}, "~N,~N");
Clazz.defineMethod (c$, "setXYZs", 
function (x, y, z, zSlab) {
this.setMovableX (x);
this.setMovableY (y);
this.setZs (z, zSlab);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setScript", 
function (script) {
this.script = (script == null || script.length == 0 ? null : script);
}, "~S");
Clazz.defineMethod (c$, "getScript", 
function () {
return this.script;
});
Clazz.defineMethod (c$, "setOffset", 
function (offset) {
this.offsetX = org.jmol.shape.Object2d.getXOffset (offset);
this.offsetY = org.jmol.shape.Object2d.getYOffset (offset);
this.valign = 0;
}, "~N");
c$.getXOffset = Clazz.defineMethod (c$, "getXOffset", 
function (offset) {
switch (offset) {
case 0:
return 4;
case 32767:
return 0;
default:
return ((offset << 48) >> 56);
}
}, "~N");
c$.getYOffset = Clazz.defineMethod (c$, "getYOffset", 
function (offset) {
switch (offset) {
case 0:
return -4;
case 32767:
return 0;
default:
return -((offset << 56) >> 56);
}
}, "~N");
Clazz.defineMethod (c$, "setAlignmentLCR", 
function (align) {
if ("left".equals (align)) return this.setAlignment (1);
if ("center".equals (align)) return this.setAlignment (2);
if ("right".equals (align)) return this.setAlignment (3);
return false;
}, "~S");
Clazz.defineMethod (c$, "setAlignment", 
function (align) {
if (this.align != align) {
this.align = align;
this.recalc ();
}return true;
}, "~N");
c$.getAlignmentName = Clazz.defineMethod (c$, "getAlignmentName", 
function (align) {
return org.jmol.shape.Object2d.hAlignNames[align & 3];
}, "~N");
Clazz.defineMethod (c$, "setPointer", 
function (pointer) {
this.pointer = pointer;
}, "~N");
c$.getPointer = Clazz.defineMethod (c$, "getPointer", 
function (pointer) {
return ((pointer & 1) == 0 ? "" : (pointer & 2) > 0 ? "background" : "on");
}, "~N");
Clazz.defineMethod (c$, "setBoxOffsetsInWindow", 
function (margin, vMargin, vTop) {
var bw = this.boxWidth + margin;
var x = this.boxX;
if (x + bw > this.windowWidth) x = this.windowWidth - bw;
if (x < margin) x = margin;
this.boxX = x;
var bh = this.boxHeight;
var y = vTop;
if (y + bh > this.windowHeight) y = this.windowHeight - bh;
if (y < vMargin) y = vMargin;
this.boxY = y;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setWindow", 
function (width, height, scalePixelsPerMicron) {
this.windowWidth = width;
this.windowHeight = height;
if (this.scalePixelsPerMicron < 0 && scalePixelsPerMicron != 0) this.scalePixelsPerMicron = scalePixelsPerMicron;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "checkObjectClicked", 
function (x, y, bsVisible) {
if (this.modelIndex >= 0 && !bsVisible.get (this.modelIndex) || this.hidden) return false;
if (this.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
}return (this.script != null && x >= this.boxX && x <= this.boxX + this.boxWidth && y >= this.boxY && y <= this.boxY + this.boxHeight);
}, "~N,~N,org.jmol.util.BitSet");
c$.setProperty = Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, currentObject) {
if ("script" === propertyName) {
if (currentObject != null) currentObject.setScript (value);
return true;
}if ("xpos" === propertyName) {
if (currentObject != null) currentObject.setMovableX ((value).intValue ());
return true;
}if ("ypos" === propertyName) {
if (currentObject != null) currentObject.setMovableY ((value).intValue ());
return true;
}if ("%xpos" === propertyName) {
if (currentObject != null) currentObject.setMovableXPercent ((value).intValue ());
return true;
}if ("%ypos" === propertyName) {
if (currentObject != null) currentObject.setMovableYPercent ((value).intValue ());
return true;
}if ("%zpos" === propertyName) {
if (currentObject != null) currentObject.setMovableZPercent ((value).intValue ());
return true;
}if ("xypos" === propertyName) {
if (currentObject == null) return true;
var pt = value;
currentObject.setXYZ (null);
if (pt.z == 3.4028235E38) {
currentObject.setMovableX (Clazz.floatToInt (pt.x));
currentObject.setMovableY (Clazz.floatToInt (pt.y));
} else {
currentObject.setMovableXPercent (Clazz.floatToInt (pt.x));
currentObject.setMovableYPercent (Clazz.floatToInt (pt.y));
}return true;
}if ("xyz" === propertyName) {
if (currentObject != null) {
currentObject.setXYZ (value);
}return true;
}return false;
}, "~S,~O,org.jmol.shape.Object2d");
c$.getOffset = Clazz.defineMethod (c$, "getOffset", 
function (xOffset, yOffset) {
xOffset = Math.min (Math.max (xOffset, -127), 127);
yOffset = Math.min (Math.max (yOffset, -127), 127);
return ((xOffset & 0xFF) << 8) | (yOffset & 0xFF);
}, "~N,~N");
Clazz.defineStatics (c$,
"POINTER_NONE", 0,
"POINTER_ON", 1,
"POINTER_BACKGROUND", 2,
"hAlignNames", ["", "left", "center", "right", ""],
"ALIGN_NONE", 0,
"ALIGN_LEFT", 1,
"ALIGN_CENTER", 2,
"ALIGN_RIGHT", 3,
"vAlignNames", ["xy", "top", "bottom", "middle"],
"VALIGN_XY", 0,
"VALIGN_TOP", 1,
"VALIGN_BOTTOM", 2,
"VALIGN_MIDDLE", 3,
"VALIGN_XYZ", 4);
});
