Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.IsoFxyReader"], "org.jmol.jvxl.readers.IsoFxyzReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$data = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "IsoFxyzReader", org.jmol.jvxl.readers.IsoFxyReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.IsoFxyzReader, []);
});
Clazz.defineMethod (c$, "setup", 
function (isMapData) {
if (this.params.functionInfo.size () > 5) this.$data = this.params.functionInfo.get (5);
this.setup ("functionXYZ");
}, "~B");
Clazz.defineMethod (c$, "getValue", 
function (x, y, z) {
return (this.$data == null ? this.evaluateValue (x, y, z) : this.$data[x][y][z]);
}, "~N,~N,~N");
});
