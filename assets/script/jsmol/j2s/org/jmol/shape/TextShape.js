Clazz.declarePackage ("org.jmol.shape");
Clazz.load (["org.jmol.shape.Object2dShape"], "org.jmol.shape.TextShape", null, function () {
c$ = Clazz.declareType (org.jmol.shape, "TextShape", org.jmol.shape.Object2dShape);
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if ("text" === propertyName) {
var text = value;
if (this.currentObject == null) {
if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().setText (text);
}
}return;
}(this.currentObject).setText (text);
return;
}if ("font" === propertyName) {
this.currentFont = value;
if (this.currentObject == null) {
if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().setFont (this.currentFont, true);
}
}return;
}(this.currentObject).setFont (this.currentFont, true);
(this.currentObject).setFontScale (0);
return;
}Clazz.superCall (this, org.jmol.shape.TextShape, "setProperty", [propertyName, value, bsSelected]);
}, "~S,~O,org.jmol.util.BitSet");
});
