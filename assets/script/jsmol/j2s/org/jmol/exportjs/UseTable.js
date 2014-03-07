Clazz.declarePackage ("org.jmol.exportjs");
Clazz.load (["java.util.Hashtable"], "org.jmol.exportjs.UseTable", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.iObj = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.exportjs, "UseTable", java.util.Hashtable);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.exportjs.UseTable, []);
});
Clazz.defineMethod (c$, "getDef", 
function (key, ret) {
if (this.containsKey (key)) {
ret[0] = this.get (key);
return true;
}var id = "_" + key.charAt (0) + (this.iObj++);
this.put (key, id);
ret[0] = id;
return false;
}, "~S,~A");
});
