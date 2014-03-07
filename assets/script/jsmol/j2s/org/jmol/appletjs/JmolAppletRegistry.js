Clazz.declarePackage ("org.jmol.appletjs");
Clazz.load (["java.util.Hashtable"], "org.jmol.appletjs.JmolAppletRegistry", ["org.jmol.util.Logger", "$.TextFormat"], function () {
c$ = Clazz.declareType (org.jmol.appletjs, "JmolAppletRegistry");
c$.checkIn = Clazz.defineMethod (c$, "checkIn", 
function (name, applet) {
org.jmol.appletjs.JmolAppletRegistry.cleanRegistry ();
if (name != null) {
org.jmol.util.Logger.info ("AppletRegistry.checkIn(" + name + ")");
org.jmol.appletjs.JmolAppletRegistry.htRegistry.put (name, applet);
}if (org.jmol.util.Logger.debugging) {
for (var entry, $entry = org.jmol.appletjs.JmolAppletRegistry.htRegistry.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var theApplet = entry.getKey ();
org.jmol.util.Logger.debug (theApplet + " " + entry.getValue ());
}
}}, "~S,org.jmol.api.JmolSyncInterface");
c$.checkOut = Clazz.defineMethod (c$, "checkOut", 
function (name) {
org.jmol.appletjs.JmolAppletRegistry.htRegistry.remove (name);
}, "~S");
c$.findApplets = Clazz.defineMethod (c$, "findApplets", 
function (appletName, mySyncId, excludeName, apps) {
if (appletName != null && appletName.indexOf (",") >= 0) {
var names = org.jmol.util.TextFormat.split (appletName, ',');
for (var i = 0; i < names.length; i++) org.jmol.appletjs.JmolAppletRegistry.findApplets (names[i], mySyncId, excludeName, apps);

return;
}var ext = "__" + mySyncId + "__";
if (appletName == null || appletName.equals ("*") || appletName.equals (">")) {
for (var appletName2, $appletName2 = org.jmol.appletjs.JmolAppletRegistry.htRegistry.keySet ().iterator (); $appletName2.hasNext () && ((appletName2 = $appletName2.next ()) || true);) {
if (!appletName2.equals (excludeName) && appletName2.indexOf (ext) > 0) {
apps.add (appletName2);
}}
return;
}if (appletName.indexOf ("__") < 0) appletName += ext;
if (!org.jmol.appletjs.JmolAppletRegistry.htRegistry.containsKey (appletName)) appletName = "jmolApplet" + appletName;
if (!appletName.equals (excludeName) && org.jmol.appletjs.JmolAppletRegistry.htRegistry.containsKey (appletName)) {
apps.add (appletName);
}}, "~S,~S,~S,java.util.List");
c$.cleanRegistry = Clazz.defineMethod (c$, "cleanRegistry", 
($fz = function () {
}, $fz.isPrivate = true, $fz));
c$.htRegistry = c$.prototype.htRegistry =  new java.util.Hashtable ();
});
