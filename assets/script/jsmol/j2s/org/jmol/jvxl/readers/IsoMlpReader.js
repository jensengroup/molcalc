Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.IsoMepReader"], "org.jmol.jvxl.readers.IsoMlpReader", null, function () {
c$ = Clazz.declareType (org.jmol.jvxl.readers, "IsoMlpReader", org.jmol.jvxl.readers.IsoMepReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.IsoMlpReader, []);
});
Clazz.defineMethod (c$, "init", 
function (sg) {
Clazz.superCall (this, org.jmol.jvxl.readers.IsoMlpReader, "init", [sg]);
this.type = "Mlp";
}, "org.jmol.jvxl.readers.SurfaceGenerator");
});
