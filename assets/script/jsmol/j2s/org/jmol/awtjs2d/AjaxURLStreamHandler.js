Clazz.declarePackage ("org.jmol.awtjs2d");
Clazz.load (["java.net.URLStreamHandler"], "org.jmol.awtjs2d.AjaxURLStreamHandler", ["org.jmol.awtjs2d.JmolURLConnection"], function () {
c$ = Clazz.decorateAsClass (function () {
this.protocol = null;
Clazz.instantialize (this, arguments);
}, org.jmol.awtjs2d, "AjaxURLStreamHandler", java.net.URLStreamHandler);
Clazz.makeConstructor (c$, 
function (protocol) {
Clazz.superConstructor (this, org.jmol.awtjs2d.AjaxURLStreamHandler, []);
this.protocol = protocol;
}, "~S");
Clazz.overrideMethod (c$, "openConnection", 
function (url) {
return  new org.jmol.awtjs2d.JmolURLConnection (url);
}, "java.net.URL");
});
