Clazz.declarePackage ("org.jmol.io2");
Clazz.load (["org.jmol.io.DataReader"], "org.jmol.io2.StringDataReader", ["java.io.StringReader"], function () {
c$ = Clazz.declareType (org.jmol.io2, "StringDataReader", org.jmol.io.DataReader);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, org.jmol.io2.StringDataReader, [ new java.io.StringReader (data)]);
}, "~S");
Clazz.overrideMethod (c$, "setData", 
function (data) {
return  new org.jmol.io2.StringDataReader (data);
}, "~O");
});
