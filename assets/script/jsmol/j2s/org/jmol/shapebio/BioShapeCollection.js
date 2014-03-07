Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shape.Shape"], "org.jmol.shapebio.BioShapeCollection", ["java.util.Hashtable", "org.jmol.constant.EnumPalette", "org.jmol.shapebio.BioShape", "org.jmol.util.ArrayUtil", "$.BitSetUtil", "$.Colix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atoms = null;
this.madOn = -2;
this.madHelixSheet = 3000;
this.madTurnRandom = 800;
this.madDnaRna = 5000;
this.isActive = false;
this.bioShapes = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shapebio, "BioShapeCollection", org.jmol.shape.Shape);
Clazz.overrideMethod (c$, "initModelSet", 
function () {
this.isBioShape = true;
this.atoms = this.modelSet.atoms;
this.initialize ();
});
Clazz.defineMethod (c$, "getSize", 
function (group) {
var m = group;
var groupIndex = m.getGroupIndex ();
var leadAtomIndex = m.getLeadAtom ().getIndex ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
for (var j = 0; j < bioShape.monomerCount; j++) {
if (bioShape.monomers[j].getGroupIndex () == groupIndex && bioShape.monomers[j].getLeadAtom ().getIndex () == leadAtomIndex) return bioShape.mads[j];
}
}
return 0;
}, "org.jmol.modelset.Group");
Clazz.overrideMethod (c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
var mad = size;
this.initialize ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setMad (mad, bsSelected, (rd == null ? null : rd.values));
}
}, "~N,org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (propertyName === "refreshTrajectories") {
var modelIndex = ((value)[0]).intValue ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex == modelIndex) b.falsifyMesh ();
}
return;
}if (propertyName === "deleteModelAtoms") {
this.atoms = (value)[1];
var modelIndex = ((value)[2])[0];
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex > modelIndex) {
b.modelIndex--;
b.leadAtomIndices = b.bioPolymer.getLeadAtomIndices ();
} else if (b.modelIndex == modelIndex) {
this.bioShapes = org.jmol.util.ArrayUtil.deleteElements (this.bioShapes, i, 1);
}}
return;
}this.initialize ();
if ("color" === propertyName) {
var pid = org.jmol.constant.EnumPalette.pidOf (value);
var colix = org.jmol.util.Colix.getColixO (value);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setColixBS (colix, pid, bsSelected);
}
return;
}if ("colorPhase" === propertyName) {
var twoColors = value;
var colixBack = org.jmol.util.Colix.getColixO (twoColors[0]);
var colix = org.jmol.util.Colix.getColixO (twoColors[1]);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) {
bioShape.setColixBS (colix, 0, bsSelected);
bioShape.setColixBack (colixBack, bsSelected);
}}
return;
}if ("translucency" === propertyName) {
var isTranslucent = ("translucent".equals (value));
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setTranslucent (isTranslucent, bsSelected, this.translucentLevel);
}
return;
}Clazz.superCall (this, org.jmol.shapebio.BioShapeCollection, "setProperty", [propertyName, value, bsSelected]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var temp =  new java.util.Hashtable ();
var temp2 =  new java.util.Hashtable ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setShapeState (temp, temp2);
}
return "\n" + org.jmol.shape.Shape.getShapeCommandsSel (temp, temp2, this.shapeID == 9 ? "Backbone" : "select");
});
Clazz.defineMethod (c$, "initialize", 
function () {
var modelCount = this.modelSet.getModelCount ();
var models = this.modelSet.getModels ();
var n = this.modelSet.getBioPolymerCount ();
var shapes =  new Array (n--);
for (var i = modelCount; --i >= 0; ) for (var j = this.modelSet.getBioPolymerCountInModel (i); --j >= 0; n--) {
var bp = (models[i]).getBioPolymer (j);
shapes[n] = (this.bioShapes == null || this.bioShapes.length <= n || this.bioShapes[n] == null || this.bioShapes[n].bioPolymer !== bp ?  new org.jmol.shapebio.BioShape (this, i, bp) : this.bioShapes[n]);
}

this.bioShapes = shapes;
});
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].findNearestAtomIndex (xMouse, yMouse, closest, bsNot);

}, "~N,~N,~A,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setVisibilityFlags", 
function (bs) {
if (this.bioShapes == null) return;
bs = org.jmol.util.BitSetUtil.copy (bs);
for (var i = this.modelSet.getModelCount (); --i >= 0; ) if (bs.get (i) && this.modelSet.isTrajectory (i)) bs.set (this.modelSet.getTrajectoryIndex (i));

for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
b.modelVisibilityFlags = (bs.get (b.modelIndex) ? this.myVisibilityFlag : 0);
}
}, "org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setModelClickability", 
function () {
if (this.bioShapes == null) return;
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].setModelClickability ();

});
Clazz.defineMethod (c$, "getMpsShapeCount", 
function () {
return this.bioShapes.length;
});
Clazz.defineMethod (c$, "getBioShape", 
function (i) {
return this.bioShapes[i];
}, "~N");
});
