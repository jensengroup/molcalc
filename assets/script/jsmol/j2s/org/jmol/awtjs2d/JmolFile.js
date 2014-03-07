Clazz.declarePackage ("org.jmol.awtjs2d");
Clazz.load (["org.jmol.api.JmolFileInterface"], "org.jmol.awtjs2d.JmolFile", ["org.jmol.util.TextFormat", "org.jmol.viewer.FileManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.fullName = null;
Clazz.instantialize (this, arguments);
}, org.jmol.awtjs2d, "JmolFile", null, org.jmol.api.JmolFileInterface);
Clazz.makeConstructor (c$, 
function (name) {
this.name = name.$replace ('\\', '/');
this.fullName = name;
if (!this.fullName.startsWith ("/") && org.jmol.viewer.FileManager.urlTypeIndex (name) < 0) this.fullName = org.jmol.viewer.Viewer.jsDocumentBase + "/" + this.fullName;
this.fullName = org.jmol.util.TextFormat.simpleReplace (this.fullName, "/./", "/");
name = name.substring (name.lastIndexOf ("/") + 1);
}, "~S");
Clazz.overrideMethod (c$, "getParentAsFile", 
function () {
var pt = this.fullName.lastIndexOf ("/");
return (pt < 0 ? null :  new org.jmol.awtjs2d.JmolFile (this.fullName.substring (0, pt)));
});
Clazz.overrideMethod (c$, "getAbsolutePath", 
function () {
return this.fullName;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "isDirectory", 
function () {
return this.fullName.endsWith ("/");
});
Clazz.overrideMethod (c$, "length", 
function () {
return 0;
});
});
