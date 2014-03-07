Clazz.declarePackage ("org.jmol.awtjs2d");
Clazz.load (["org.jmol.awtjs2d.JSPopup"], "org.jmol.awtjs2d.JSModelKitPopup", ["org.jmol.i18n.GT", "org.jmol.modelkit.ModelKitPopupResourceBundle", "org.jmol.util.Elements"], function () {
c$ = Clazz.declareType (org.jmol.awtjs2d, "JSModelKitPopup", org.jmol.awtjs2d.JSPopup);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.awtjs2d.JSModelKitPopup, []);
});
Clazz.overrideMethod (c$, "jpiInitialize", 
function (viewer, menu) {
this.updateMode = -1;
var doTranslate = org.jmol.i18n.GT.getDoTranslate ();
org.jmol.i18n.GT.setDoTranslate (true);
var bundle =  new org.jmol.modelkit.ModelKitPopupResourceBundle ();
this.initialize (viewer, bundle, bundle.getMenuName ());
org.jmol.i18n.GT.setDoTranslate (doTranslate);
}, "org.jmol.viewer.Viewer,~S");
Clazz.defineMethod (c$, "checkMenuClick", 
function (source, script) {
if (script.equals ("clearQ")) {
for (var o, $o = this.htCheckbox.values ().iterator (); $o.hasNext () && ((o = $o.next ()) || true);) {
{
script = o.getActionCommand();
if (script.indexOf(":??") < 0)
continue;
this.updateButton(o, "??", "_??P!:");
o.setSelected(false);
this.thisPopup.tainted = true;
}}
this.viewer.evalStringQuiet ("set picking assignAtom_C");
return;
}Clazz.superCall (this, org.jmol.awtjs2d.JSModelKitPopup, "checkMenuClick", [source, script]);
}, "~O,~S");
Clazz.overrideMethod (c$, "menuSetCheckBoxOption", 
function (item, name, what) {
var element = org.jmol.i18n.GT._ ("Element?");
if (element == null || org.jmol.util.Elements.elementNumberFromSymbol (element, true) == 0) return null;
this.updateButton (item, element, "assignAtom_" + element + "P!:??");
return "set picking assignAtom_" + element;
}, "~O,~S,~S");
Clazz.overrideMethod (c$, "getEntryIcon", 
function (ret) {
var entry = ret[0];
if (!entry.startsWith ("<")) return null;
var pt = entry.indexOf (">");
ret[0] = entry.substring (pt + 1);
return "org/jmol/modelkit/images/" + entry.substring (1, pt);
}, "~A");
});
