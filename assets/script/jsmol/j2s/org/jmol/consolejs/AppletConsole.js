Clazz.declarePackage ("org.jmol.consolejs");
Clazz.load (["org.jmol.console.GenericConsole"], "org.jmol.consolejs.AppletConsole", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.jsConsole = null;
Clazz.instantialize (this, arguments);
}, org.jmol.consolejs, "AppletConsole", org.jmol.console.GenericConsole);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.consolejs.AppletConsole, []);
});
Clazz.overrideMethod (c$, "start", 
function (viewer) {
this.viewer = viewer;
this.setLabels ();
this.displayConsole ();
}, "org.jmol.api.JmolViewer");
Clazz.overrideMethod (c$, "layoutWindow", 
function (enabledButtons) {
{
this.jsConsole = new Jmol.Console.JSConsole(this);
}this.setTitle ();
}, "~S");
Clazz.overrideMethod (c$, "setTitle", 
function () {
});
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
{
this.jsConsole.setVisible(visible);
}}, "~B");
Clazz.overrideMethod (c$, "setButton", 
function (text) {
{
return new Jmol.Console.Button(text);
}}, "~S");
Clazz.overrideMethod (c$, "dispose", 
function () {
this.setVisible (false);
});
Clazz.overrideMethod (c$, "isMenuItem", 
function (source) {
return false;
}, "~O");
Clazz.overrideMethod (c$, "getScriptEditor", 
function () {
return null;
});
Clazz.overrideMethod (c$, "nextFileName", 
function (stub, nTab) {
return null;
}, "~S,~N");
});
