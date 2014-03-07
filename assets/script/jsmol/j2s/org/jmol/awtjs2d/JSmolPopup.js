Clazz.declarePackage ("org.jmol.awtjs2d");
Clazz.load (["org.jmol.awtjs2d.JSPopup"], "org.jmol.awtjs2d.JSmolPopup", ["org.jmol.i18n.GT", "org.jmol.popup.MainPopupResourceBundle"], function () {
c$ = Clazz.declareType (org.jmol.awtjs2d, "JSmolPopup", org.jmol.awtjs2d.JSPopup);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.awtjs2d.JSmolPopup, []);
});
Clazz.overrideMethod (c$, "jpiInitialize", 
function (viewer, menu) {
var doTranslate = org.jmol.i18n.GT.getDoTranslate ();
org.jmol.i18n.GT.setDoTranslate (true);
var bundle =  new org.jmol.popup.MainPopupResourceBundle (this.strMenuStructure = menu, this.menuText);
this.initialize (viewer, bundle, bundle.getMenuName ());
org.jmol.i18n.GT.setDoTranslate (doTranslate);
}, "org.jmol.viewer.Viewer,~S");
});
