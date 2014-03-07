Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.TextShape"], "org.jmol.shape.Echo", ["org.jmol.shape.Object2d", "$.Text", "org.jmol.util.Escape", "$.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.declareType (org.jmol.shape, "Echo", org.jmol.shape.TextShape);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shape.Echo, "initShape", []);
this.setProperty ("target", "top", null);
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("scalereference" === propertyName) {
if (this.currentObject != null) {
var val = (value).floatValue ();
this.currentObject.setScalePixelsPerMicron (val == 0 ? 0 : 10000 / val);
}return;
}if ("xyz" === propertyName) {
if (this.currentObject != null && this.viewer.getFontScaling ()) this.currentObject.setScalePixelsPerMicron (this.viewer.getScalePixelsPerAngstrom (false) * 10000);
}if ("scale" === propertyName) {
if (this.currentObject == null) {
if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().setScale ((value).floatValue ());
}
}return;
}(this.currentObject).setScale ((value).floatValue ());
return;
}if ("image" === propertyName) {
if (this.currentObject == null) {
if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().setImage (value);
}
}return;
}(this.currentObject).setImage (value);
return;
}if ("thisID" === propertyName) {
var target = value;
this.currentObject = this.objects.get (target);
if (this.currentObject == null && org.jmol.util.TextFormat.isWild (target)) this.thisID = target.toUpperCase ();
return;
}if ("hidden" === propertyName) {
var isHidden = (value).booleanValue ();
if (this.currentObject == null) {
if (this.isAll || this.thisID != null) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (this.isAll || org.jmol.util.TextFormat.isMatch (text.target.toUpperCase (), this.thisID, true, true)) text.hidden = isHidden;
}
}return;
}(this.currentObject).hidden = isHidden;
return;
}if (org.jmol.shape.Object2d.setProperty (propertyName, value, this.currentObject)) return;
if ("target" === propertyName) {
this.thisID = null;
var target = (value).intern ().toLowerCase ();
if (target === "none" || target === "all") {
} else {
this.isAll = false;
var text = this.objects.get (target);
if (text == null) {
var valign = 0;
var halign = 1;
if ("top" === target) {
valign = 1;
halign = 2;
} else if ("middle" === target) {
valign = 3;
halign = 2;
} else if ("bottom" === target) {
valign = 2;
}text = org.jmol.shape.Text.newEcho (this.viewer, this.gdata, this.gdata.getFont3DFS ("Serif", 20), target, 10, valign, halign, 0);
text.setAdjustForWindow (true);
this.objects.put (target, text);
if (this.currentFont != null) text.setFont (this.currentFont, true);
if (this.currentColor != null) text.setColixO (this.currentColor);
if (this.currentBgColor != null) text.setBgColixO (this.currentBgColor);
if (this.currentTranslucentLevel != 0) text.setTranslucent (this.currentTranslucentLevel, false);
if (this.currentBgTranslucentLevel != 0) text.setTranslucent (this.currentBgTranslucentLevel, true);
}this.currentObject = text;
return;
}}Clazz.superCall (this, org.jmol.shape.Echo, "setProperty", [propertyName, value, null]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getPropertyData", 
function (property, data) {
if ("currentTarget" === property) {
return (this.currentObject != null && (data[0] = this.currentObject.target) != null);
}if (property === "checkID") {
var key = (data[0]).toUpperCase ();
var isWild = org.jmol.util.TextFormat.isWild (key);
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var id = e.next ().target;
if (id.equalsIgnoreCase (key) || isWild && org.jmol.util.TextFormat.isMatch (id.toUpperCase (), key, true, true)) {
data[1] = id;
return true;
}}
return false;
}return Clazz.superCall (this, org.jmol.shape.Echo, "getPropertyData", [property, data]);
}, "~S,~A");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var s =  new org.jmol.util.StringXBuilder ();
s.append ("\n  set echo off;\n");
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var t = e.next ();
s.append (t.getState ());
if (t.hidden) s.append ("  set echo ID ").append (org.jmol.util.Escape.escapeStr (t.target)).append (" hidden;\n");
}
return s.toString ();
});
Clazz.defineStatics (c$,
"FONTFACE", "Serif",
"FONTSIZE", 20,
"COLOR", 10);
});
