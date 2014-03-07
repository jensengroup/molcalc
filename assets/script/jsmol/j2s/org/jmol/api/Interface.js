Clazz.declarePackage ("org.jmol.api");
Clazz.load (null, "org.jmol.api.Interface", ["org.jmol.util.Logger"], function () {
c$ = Clazz.declareType (org.jmol.api, "Interface");
c$.getOptionInterface = Clazz.defineMethod (c$, "getOptionInterface", 
function (name) {
return org.jmol.api.Interface.getInterface ("org.jmol." + name);
}, "~S");
c$.getApplicationInterface = Clazz.defineMethod (c$, "getApplicationInterface", 
function (name) {
return org.jmol.api.Interface.getInterface ("org.openscience.jmol.app." + name);
}, "~S");
c$.getInterface = Clazz.defineMethod (c$, "getInterface", 
function (name) {
try {
var x = Class.forName (name);
return (x == null ? null : x.newInstance ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("Interface.java Error creating instance for " + name + ": \n" + e);
return null;
} else {
throw e;
}
}
}, "~S");
});
