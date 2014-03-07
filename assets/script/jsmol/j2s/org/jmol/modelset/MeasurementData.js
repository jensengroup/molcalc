Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (["org.jmol.api.JmolMeasurementClient"], "org.jmol.modelset.MeasurementData", ["java.util.ArrayList", "org.jmol.modelset.Measurement", "org.jmol.util.BitSetUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.client = null;
this.measurementStrings = null;
this.atoms = null;
this.mustBeConnected = false;
this.mustNotBeConnected = false;
this.tickInfo = null;
this.tokAction = 0;
this.points = null;
this.radiusData = null;
this.strFormat = null;
this.isAll = false;
this.units = null;
this.intramolecular = null;
this.minArray = null;
this.viewer = null;
this.iFirstAtom = 0;
this.justOneModel = true;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "MeasurementData", null, org.jmol.api.JmolMeasurementClient);
Clazz.makeConstructor (c$, 
function (viewer, points, tokAction, radiusData, strFormat, units, tickInfo, mustBeConnected, mustNotBeConnected, intramolecular, isAll) {
this.viewer = viewer;
this.tokAction = tokAction;
this.points = points;
if (points.size () >= 2 && Clazz.instanceOf (points.get (0), org.jmol.util.BitSet) && Clazz.instanceOf (points.get (1), org.jmol.util.BitSet)) {
this.justOneModel = org.jmol.util.BitSetUtil.haveCommon (viewer.getModelBitSet (points.get (0), false), viewer.getModelBitSet (points.get (1), false));
}this.radiusData = radiusData;
this.strFormat = strFormat;
this.units = units;
this.tickInfo = tickInfo;
this.mustBeConnected = mustBeConnected;
this.mustNotBeConnected = mustNotBeConnected;
this.intramolecular = intramolecular;
this.isAll = isAll;
}, "org.jmol.viewer.Viewer,java.util.List,~N,org.jmol.atomdata.RadiusData,~S,~S,org.jmol.modelset.TickInfo,~B,~B,Boolean,~B");
Clazz.defineMethod (c$, "processNextMeasure", 
function (m) {
var value = m.getMeasurement ();
if (this.radiusData != null && !m.isInRange (this.radiusData, value)) return;
if (this.measurementStrings == null) {
var f = this.minArray[this.iFirstAtom];
m.value = value;
value = m.fixValue (this.units, false);
this.minArray[this.iFirstAtom] = (1 / f == -Infinity ? value : Math.min (f, value));
return;
}this.measurementStrings.add (m.getStringUsing (this.viewer, this.strFormat, this.units));
}, "org.jmol.modelset.Measurement");
Clazz.defineMethod (c$, "getMeasurements", 
function (asMinArray) {
if (asMinArray) {
this.minArray =  Clazz.newFloatArray ((this.points.get (0)).cardinality (), 0);
for (var i = 0; i < this.minArray.length; i++) this.minArray[i] = -0.0;

this.define (null, this.viewer.getModelSet ());
return this.minArray;
}this.measurementStrings =  new java.util.ArrayList ();
this.define (null, this.viewer.getModelSet ());
return this.measurementStrings;
}, "~B");
Clazz.defineMethod (c$, "define", 
function (client, modelSet) {
this.client = (client == null ? this : client);
this.atoms = modelSet.atoms;
var nPoints = this.points.size ();
if (nPoints < 2) return;
var modelIndex = -1;
var pts =  new Array (4);
var indices =  Clazz.newIntArray (5, 0);
var m =  new org.jmol.modelset.Measurement (modelSet, indices, pts, null);
m.setCount (nPoints);
var ptLastAtom = -1;
for (var i = 0; i < nPoints; i++) {
var obj = this.points.get (i);
if (Clazz.instanceOf (obj, org.jmol.util.BitSet)) {
var bs = obj;
var nAtoms = bs.cardinality ();
if (nAtoms == 0) return;
if (nAtoms > 1) modelIndex = 0;
ptLastAtom = i;
if (i == 0) this.iFirstAtom = 0;
indices[i + 1] = bs.nextSetBit (0);
} else {
pts[i] = obj;
indices[i + 1] = -2 - i;
}}
this.nextMeasure (0, ptLastAtom, m, modelIndex);
}, "org.jmol.api.JmolMeasurementClient,org.jmol.modelset.ModelSet");
Clazz.defineMethod (c$, "nextMeasure", 
($fz = function (thispt, ptLastAtom, m, thisModel) {
if (thispt > ptLastAtom) {
if (m.isValid () && (!this.mustBeConnected || m.isConnected (this.atoms, thispt)) && (!this.mustNotBeConnected || !m.isConnected (this.atoms, thispt)) && (this.intramolecular == null || m.isIntramolecular (this.atoms, thispt) == this.intramolecular.booleanValue ())) this.client.processNextMeasure (m);
return;
}var bs = this.points.get (thispt);
var indices = m.getCountPlusIndices ();
var thisAtomIndex = (thispt == 0 ? 2147483647 : indices[thispt]);
if (thisAtomIndex < 0) {
this.nextMeasure (thispt + 1, ptLastAtom, m, thisModel);
return;
}var haveNext = false;
for (var i = bs.nextSetBit (0), pt = 0; i >= 0; i = bs.nextSetBit (i + 1), pt++) {
if (i == thisAtomIndex) continue;
var modelIndex = this.atoms[i].getModelIndex ();
if (thisModel >= 0 && this.justOneModel) {
if (thispt == 0) thisModel = modelIndex;
 else if (thisModel != modelIndex) continue;
}indices[thispt + 1] = i;
if (thispt == 0) this.iFirstAtom = pt;
haveNext = true;
this.nextMeasure (thispt + 1, ptLastAtom, m, thisModel);
}
if (!haveNext) this.nextMeasure (thispt + 1, ptLastAtom, m, thisModel);
}, $fz.isPrivate = true, $fz), "~N,~N,org.jmol.modelset.Measurement,~N");
});
