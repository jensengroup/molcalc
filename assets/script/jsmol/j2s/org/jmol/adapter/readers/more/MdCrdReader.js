Clazz.declarePackage ("org.jmol.adapter.readers.more");
Clazz.load (["org.jmol.adapter.smarter.AtomSetCollectionReader"], "org.jmol.adapter.readers.more.MdCrdReader", ["java.lang.Float", "org.jmol.util.Logger", "$.Point3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ptFloat = 0;
this.lenLine = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.more, "MdCrdReader", org.jmol.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.initializeTrajectoryFile ();
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
this.readCoordinates ();
org.jmol.util.Logger.info ("Total number of trajectory steps=" + this.trajectorySteps.size ());
this.continuing = false;
return false;
});
Clazz.defineMethod (c$, "readCoordinates", 
($fz = function () {
this.line = null;
var atomCount = (this.bsFilter == null ? this.templateAtomCount : (this.htParams.get ("filteredAtomCount")).intValue ());
var isPeriodic = this.htParams.containsKey ("isPeriodic");
var floatCount = this.templateAtomCount * 3 + (isPeriodic ? 3 : 0);
while (true) if (this.doGetModel (++this.modelNumber, null)) {
var trajectoryStep =  new Array (atomCount);
if (!this.getTrajectoryStep (trajectoryStep, isPeriodic)) return;
this.trajectorySteps.add (trajectoryStep);
if (this.isLastModel (this.modelNumber)) return;
} else {
if (!this.skipFloats (floatCount)) return;
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getFloat", 
($fz = function () {
while (this.line == null || this.ptFloat >= this.lenLine) {
if (this.readLine () == null) return NaN;
this.ptFloat = 0;
this.lenLine = this.line.length;
}
this.ptFloat += 8;
return this.parseFloatRange (this.line, this.ptFloat - 8, this.ptFloat);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getPoint", 
($fz = function () {
var x = this.getFloat ();
var y = this.getFloat ();
var z = this.getFloat ();
return (Float.isNaN (z) ? null : org.jmol.util.Point3f.new3 (x, y, z));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getTrajectoryStep", 
($fz = function (trajectoryStep, isPeriodic) {
var atomCount = trajectoryStep.length;
var n = -1;
for (var i = 0; i < this.templateAtomCount; i++) {
var pt = this.getPoint ();
if (pt == null) return false;
if (this.bsFilter == null || this.bsFilter.get (i)) {
if (++n == atomCount) return false;
trajectoryStep[n] = pt;
}}
if (isPeriodic) this.getPoint ();
return (this.line != null);
}, $fz.isPrivate = true, $fz), "~A,~B");
Clazz.defineMethod (c$, "skipFloats", 
($fz = function (n) {
var i = 0;
while (i < n && this.readLine () != null) i += this.getTokens ().length;

return (this.line != null);
}, $fz.isPrivate = true, $fz), "~N");
});
