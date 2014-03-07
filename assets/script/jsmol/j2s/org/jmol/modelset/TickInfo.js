Clazz.declarePackage ("org.jmol.modelset");
c$ = Clazz.decorateAsClass (function () {
this.id = "";
this.type = " ";
this.ticks = null;
this.tickLabelFormats = null;
this.scale = null;
this.first = 0;
this.signFactor = 1;
this.reference = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "TickInfo");
Clazz.makeConstructor (c$, 
function (ticks) {
this.ticks = ticks;
}, "org.jmol.util.Point3f");
