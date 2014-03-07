Clazz.declarePackage ("org.jmol.api");
Clazz.load (null, "org.jmol.api.JmolViewer", ["java.util.Hashtable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.menuStructure = null;
this.apiPlatform = null;
this.fileAdapter = null;
Clazz.instantialize (this, arguments);
}, org.jmol.api, "JmolViewer");
c$.allocateViewer = Clazz.defineMethod (c$, "allocateViewer", 
function (display, modelAdapter, fullName, documentBase, codeBase, commandOptions, statusListener, implementedPlatform) {
var info =  new java.util.Hashtable ();
if (display != null) info.put ("display", display);
if (modelAdapter != null) info.put ("adapter", modelAdapter);
if (statusListener != null) info.put ("statusListener", statusListener);
if (implementedPlatform != null) info.put ("platform", implementedPlatform);
if (commandOptions != null) info.put ("options", commandOptions);
if (fullName != null) info.put ("fullName", fullName);
if (documentBase != null) info.put ("documentBase", documentBase);
if (codeBase != null) info.put ("codeBase", codeBase);
return  new org.jmol.viewer.Viewer (info);
}, "~O,org.jmol.api.JmolAdapter,~S,java.net.URL,java.net.URL,~S,org.jmol.api.JmolStatusListener,org.jmol.api.ApiPlatform");
c$.allocateViewer = Clazz.defineMethod (c$, "allocateViewer", 
function (container, jmolAdapter) {
return org.jmol.api.JmolViewer.allocateViewer (container, jmolAdapter, null, null, null, null, null, null);
}, "~O,org.jmol.api.JmolAdapter");
c$.allocateViewer = Clazz.defineMethod (c$, "allocateViewer", 
function (display, modelAdapter, fullName, documentBase, codeBase, commandOptions, statusListener) {
return org.jmol.api.JmolViewer.allocateViewer (display, modelAdapter, fullName, documentBase, codeBase, commandOptions, statusListener, null);
}, "~O,org.jmol.api.JmolAdapter,~S,java.net.URL,java.net.URL,~S,org.jmol.api.JmolStatusListener");
Clazz.defineMethod (c$, "setConsole", 
function (console) {
this.getProperty ("DATA_API", "getAppConsole", console);
}, "org.jmol.api.JmolAppConsoleInterface");
c$.getJmolVersion = Clazz.defineMethod (c$, "getJmolVersion", 
function () {
return org.jmol.viewer.Viewer.getJmolVersion ();
});
c$.checkOption = Clazz.defineMethod (c$, "checkOption", 
function (viewer, option) {
var testFlag = viewer.getParameter (option);
return (Clazz.instanceOf (testFlag, Boolean) && (testFlag).booleanValue () || Clazz.instanceOf (testFlag, Integer) && (testFlag).intValue () != 0);
}, "org.jmol.api.JmolViewer,~S");
Clazz.defineMethod (c$, "openFileAsync", 
function (fileName) {
this.openFileAsyncPDB (fileName, false);
}, "~S");
Clazz.defineMethod (c$, "mouseEvent", 
function (id, x, y, modifiers, when) {
this.handleOldJvm10Event (id, x, y, modifiers, when);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getFileAdapter", 
function () {
return (this.fileAdapter == null ? this.fileAdapter = this.apiPlatform.getFileAdapter () : this.fileAdapter);
});
Clazz.defineMethod (c$, "renderScreenImage", 
function (g, currentSize, rectClip) {
this.apiPlatform.renderScreenImage (this, g, currentSize);
}, "~O,~O,~O");
Clazz.defineMethod (c$, "getJsObjectInfo", 
function (jsObject, method, args) {
return this.apiPlatform.getJsObjectInfo (jsObject, method, args);
}, "~A,~S,~A");
c$.getJmolValueAsString = Clazz.defineMethod (c$, "getJmolValueAsString", 
function (jmolViewer, $var) {
return (jmolViewer == null ? "" : "" + jmolViewer.getParameter ($var));
}, "org.jmol.api.JmolViewer,~S");
});
