Clazz.declarePackage ("org.jmol.viewer");
Clazz.load (["org.jmol.util.BitSet"], "org.jmol.viewer.ShapeManager", ["java.lang.Boolean", "java.util.Hashtable", "org.jmol.constant.EnumPalette", "$.EnumVdw", "org.jmol.util.Logger", "$.Point3f", "$.StringXBuilder", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.gdata = null;
this.modelSet = null;
this.shapes = null;
this.viewer = null;
this.bsRenderableAtoms = null;
this.navigationCrossHairMinMax = null;
Clazz.instantialize (this, arguments);
}, org.jmol.viewer, "ShapeManager");
Clazz.prepareFields (c$, function () {
this.bsRenderableAtoms =  new org.jmol.util.BitSet ();
this.navigationCrossHairMinMax =  Clazz.newIntArray (4, 0);
});
Clazz.makeConstructor (c$, 
function (viewer, modelSet) {
this.construct (viewer);
this.resetShapes ();
this.loadDefaultShapes (modelSet);
}, "org.jmol.viewer.Viewer,org.jmol.modelset.ModelSet");
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
this.gdata = viewer.getGraphicsData ();
}, "org.jmol.viewer.Viewer");
Clazz.defineMethod (c$, "findNearestShapeAtomIndex", 
function (x, y, closest, bsNot) {
if (this.shapes != null) for (var i = 0; i < this.shapes.length && closest[0] == null; ++i) if (this.shapes[i] != null) this.shapes[i].findNearestAtomIndex (x, y, closest, bsNot);

}, "~N,~N,~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getShapes", 
function () {
return this.shapes;
});
Clazz.defineMethod (c$, "getShapePropertyIndex", 
function (shapeID, propertyName, index) {
if (this.shapes == null || this.shapes[shapeID] == null) return null;
this.viewer.setShapeErrorState (shapeID, "get " + propertyName);
var result = this.shapes[shapeID].getProperty (propertyName, index);
this.viewer.setShapeErrorState (-1, null);
return result;
}, "~N,~S,~N");
Clazz.defineMethod (c$, "getShapePropertyData", 
function (shapeID, propertyName, data) {
if (this.shapes == null || this.shapes[shapeID] == null) return false;
this.viewer.setShapeErrorState (shapeID, "get " + propertyName);
var result = this.shapes[shapeID].getPropertyData (propertyName, data);
this.viewer.setShapeErrorState (-1, null);
return result;
}, "~N,~S,~A");
Clazz.defineMethod (c$, "getShapeIdFromObjectName", 
function (objectName) {
if (this.shapes != null) for (var i = 16; i < 29; ++i) if (this.shapes[i] != null && this.shapes[i].getIndexFromName (objectName) >= 0) return i;

return -1;
}, "~S");
Clazz.defineMethod (c$, "loadDefaultShapes", 
function (newModelSet) {
this.modelSet = newModelSet;
if (this.shapes != null) for (var i = 0; i < this.shapes.length; ++i) if (this.shapes[i] != null) this.shapes[i].setModelSet (newModelSet);

this.loadShape (0);
this.loadShape (1);
this.loadShape (6);
this.loadShape (31);
this.loadShape (32);
}, "org.jmol.modelset.ModelSet");
Clazz.defineMethod (c$, "loadShape", 
function (shapeID) {
if (this.shapes == null) return null;
if (this.shapes[shapeID] != null) return this.shapes[shapeID];
if (shapeID == 2 || shapeID == 3 || shapeID == 4) return null;
var className = org.jmol.viewer.JmolConstants.getShapeClassName (shapeID, false);
try {
var shapeClass = Class.forName (className);
var shape = shapeClass.newInstance ();
this.viewer.setShapeErrorState (shapeID, "allocate");
shape.initializeShape (this.viewer, this.gdata, this.modelSet, shapeID);
this.viewer.setShapeErrorState (-1, null);
return this.shapes[shapeID] = shape;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.errorEx ("Could not instantiate shape:" + className, e);
return null;
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "refreshShapeTrajectories", 
function (baseModel, bs, mat) {
var Imodel = Integer.$valueOf (baseModel);
var bsModelAtoms = this.viewer.getModelUndeletedAtomsBitSet (baseModel);
for (var i = 0; i < 35; i++) if (this.shapes[i] != null) this.setShapePropertyBs (i, "refreshTrajectories", [Imodel, bs, mat], bsModelAtoms);

}, "~N,org.jmol.util.BitSet,org.jmol.util.Matrix4f");
Clazz.defineMethod (c$, "releaseShape", 
function (shapeID) {
if (this.shapes != null) this.shapes[shapeID] = null;
}, "~N");
Clazz.defineMethod (c$, "resetShapes", 
function () {
if (!this.viewer.noGraphicsAllowed ()) this.shapes =  new Array (35);
});
Clazz.defineMethod (c$, "setShapeSizeBs", 
function (shapeID, size, rd, bsSelected) {
if (this.shapes == null) return;
if (bsSelected == null && (shapeID != 1 || size != 2147483647)) bsSelected = this.viewer.getSelectionSet (false);
if (rd != null && rd.value != 0 && rd.vdwType === org.jmol.constant.EnumVdw.TEMP) this.modelSet.getBfactor100Lo ();
this.viewer.setShapeErrorState (shapeID, "set size");
if (rd != null && rd.value != 0 || rd == null && size != 0) this.loadShape (shapeID);
if (this.shapes[shapeID] != null) {
this.shapes[shapeID].setShapeSizeRD (size, rd, bsSelected);
}this.viewer.setShapeErrorState (-1, null);
}, "~N,~N,org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setLabel", 
function (strLabel, bsSelection) {
if (strLabel != null) {
this.loadShape (5);
this.setShapeSizeBs (5, 0, null, bsSelection);
}this.setShapePropertyBs (5, "label", strLabel, bsSelection);
}, "~S,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setShapePropertyBs", 
function (shapeID, propertyName, value, bsSelected) {
if (this.shapes == null || this.shapes[shapeID] == null) return;
this.viewer.setShapeErrorState (shapeID, "set " + propertyName);
this.shapes[shapeID].setShapeProperty (propertyName.intern (), value, bsSelected);
this.viewer.setShapeErrorState (-1, null);
}, "~N,~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "checkFrankclicked", 
function (x, y) {
var frankShape = this.shapes[34];
return (frankShape != null && frankShape.wasClicked (x, y));
}, "~N,~N");
Clazz.defineMethod (c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible) {
var shape;
var map = null;
if (modifiers != 0 && this.viewer.getBondPicking () && (map = this.shapes[1].checkObjectClicked (x, y, modifiers, bsVisible)) != null) return map;
for (var i = 0; i < org.jmol.viewer.ShapeManager.clickableMax; i++) if ((shape = this.shapes[org.jmol.viewer.ShapeManager.hoverable[i]]) != null && (map = shape.checkObjectClicked (x, y, modifiers, bsVisible)) != null) return map;

return null;
}, "~N,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "checkObjectDragged", 
function (prevX, prevY, x, y, modifiers, bsVisible, iShape) {
var found = false;
var n = (iShape > 0 ? iShape + 1 : 35);
for (var i = iShape; !found && i < n; ++i) if (this.shapes[i] != null) found = this.shapes[i].checkObjectDragged (prevX, prevY, x, y, modifiers, bsVisible);

return found;
}, "~N,~N,~N,~N,~N,org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible, checkBonds) {
var shape = this.shapes[1];
if (checkBonds && shape != null && shape.checkObjectHovered (x, y, bsVisible)) return true;
for (var i = 0; i < org.jmol.viewer.ShapeManager.hoverable.length; i++) {
shape = this.shapes[org.jmol.viewer.ShapeManager.hoverable[i]];
if (shape != null && shape.checkObjectHovered (x, y, bsVisible)) return true;
}
return false;
}, "~N,~N,org.jmol.util.BitSet,~B");
Clazz.defineMethod (c$, "deleteShapeAtoms", 
function (value, bs) {
if (this.shapes != null) for (var j = 0; j < 35; j++) if (this.shapes[j] != null) this.setShapePropertyBs (j, "deleteModelAtoms", value, bs);

}, "~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "deleteVdwDependentShapes", 
function (bs) {
if (this.shapes[23] != null) this.shapes[23].setShapeProperty ("deleteVdw", null, bs);
if (this.shapes[24] != null) this.shapes[24].setShapeProperty ("deleteVdw", null, bs);
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getAtomShapeValue", 
function (tok, group, atomIndex) {
var iShape = org.jmol.viewer.JmolConstants.shapeTokenIndex (tok);
if (iShape < 0 || this.shapes[iShape] == null) return 0;
var mad = this.shapes[iShape].getSize (atomIndex);
if (mad == 0) {
if ((group.shapeVisibilityFlags & this.shapes[iShape].myVisibilityFlag) == 0) return 0;
mad = this.shapes[iShape].getSize (group);
}return mad / 2000;
}, "~N,org.jmol.modelset.Group,~N");
Clazz.defineMethod (c$, "getObjectMap", 
function (map, withDollar) {
if (this.shapes == null) return;
var bDollar = Boolean.$valueOf (withDollar);
for (var i = 16; i < 29; ++i) this.getShapePropertyData (i, "getNames", [map, bDollar]);

}, "java.util.Map,~B");
Clazz.defineMethod (c$, "getProperty", 
function (paramInfo) {
if (paramInfo.equals ("getShapes")) return this.shapes;
return null;
}, "~O");
Clazz.defineMethod (c$, "getRenderableBitSet", 
function () {
return this.bsRenderableAtoms;
});
Clazz.defineMethod (c$, "getShape", 
function (i) {
return (this.shapes == null ? null : this.shapes[i]);
}, "~N");
Clazz.defineMethod (c$, "getShapeInfo", 
function () {
var info =  new java.util.Hashtable ();
var commands =  new org.jmol.util.StringXBuilder ();
if (this.shapes != null) for (var i = 0; i < 35; ++i) {
var shape = this.shapes[i];
if (shape != null) {
var shapeType = org.jmol.viewer.JmolConstants.shapeClassBases[i];
var shapeDetail = shape.getShapeDetail ();
if (shapeDetail != null) info.put (shapeType, shapeDetail);
}}
if (commands.length () > 0) info.put ("shapeCommands", commands.toString ());
return info;
});
Clazz.defineMethod (c$, "getShapeState", 
function (commands, isAll, iShape) {
if (this.shapes == null) return;
var cmd;
for (var i = 0; i < 35; ++i) {
if (iShape != 2147483647 && i != iShape) continue;
var shape = this.shapes[i];
if (shape != null && (isAll || org.jmol.viewer.JmolConstants.isShapeSecondary (i)) && (cmd = shape.getShapeState ()) != null && cmd.length > 1) commands.append (cmd);
}
commands.append ("  select *;\n");
}, "org.jmol.util.StringXBuilder,~B,~N");
Clazz.defineMethod (c$, "mergeShapes", 
function (newShapes) {
if (newShapes == null) return;
if (this.shapes == null) this.shapes = newShapes;
 else for (var i = 0; i < newShapes.length; ++i) if (newShapes[i] != null) {
if (this.shapes[i] == null) this.loadShape (i);
this.shapes[i].merge (newShapes[i]);
}
}, "~A");
Clazz.defineMethod (c$, "resetBioshapes", 
function (bsAllAtoms) {
if (this.shapes == null) return;
for (var i = 0; i < this.shapes.length; ++i) if (this.shapes[i] != null && this.shapes[i].isBioShape) {
this.shapes[i].setModelSet (this.modelSet);
this.shapes[i].setShapeSizeRD (0, null, bsAllAtoms);
this.shapes[i].setShapeProperty ("color", org.jmol.constant.EnumPalette.NONE, bsAllAtoms);
}
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setAtomLabel", 
function (strLabel, i) {
if (this.shapes == null) return;
this.loadShape (5);
this.shapes[5].setProperty ("label:" + strLabel, Integer.$valueOf (i), null);
}, "~S,~N");
Clazz.defineMethod (c$, "setModelVisibility", 
function () {
if (this.shapes == null || this.shapes[0] == null) return;
var bs = this.viewer.getVisibleFramesBitSet ();
for (var i = 1; i < 35; i++) if (this.shapes[i] != null) this.shapes[i].setVisibilityFlags (bs);

this.shapes[0].setVisibilityFlags (bs);
for (var i = 0; i < 35; ++i) {
var shape = this.shapes[i];
if (shape != null) shape.setModelClickability ();
}
});
Clazz.defineMethod (c$, "finalizeAtoms", 
function (bsAtoms, ptOffset) {
if (bsAtoms != null) {
var ptCenter = this.viewer.getAtomSetCenter (bsAtoms);
var pt =  new org.jmol.util.Point3f ();
this.viewer.transformPt3f (ptCenter, pt);
pt.add (ptOffset);
this.viewer.unTransformPoint (pt, pt);
pt.sub (ptCenter);
this.viewer.setAtomCoordRelative (pt, bsAtoms);
ptOffset.set (0, 0, 0);
}this.bsRenderableAtoms.clearAll ();
var atoms = this.modelSet.atoms;
for (var i = this.modelSet.getAtomCount (); --i >= 0; ) {
var atom = atoms[i];
if ((atom.getShapeVisibilityFlags () & 1) == 0) continue;
this.bsRenderableAtoms.set (i);
}
}, "org.jmol.util.BitSet,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "transformAtoms", 
function () {
var vibrationVectors = this.modelSet.vibrationVectors;
var atoms = this.modelSet.atoms;
for (var i = this.bsRenderableAtoms.nextSetBit (0); i >= 0; i = this.bsRenderableAtoms.nextSetBit (i + 1)) {
var atom = atoms[i];
var screen = (vibrationVectors != null && atom.hasVibration () ? this.viewer.transformPtVib (atom, vibrationVectors[i]) : this.viewer.transformPt (atom));
atom.screenX = screen.x;
atom.screenY = screen.y;
atom.screenZ = screen.z;
atom.screenDiameter = this.viewer.scaleToScreen (screen.z, Math.abs (atom.madAtom));
}
if (this.viewer.getSlabEnabled ()) {
var slabByMolecule = this.viewer.getSlabByMolecule ();
var slabByAtom = this.viewer.getSlabByAtom ();
var minZ = this.gdata.getSlab ();
var maxZ = this.gdata.getDepth ();
if (slabByMolecule) {
var molecules = this.modelSet.getMolecules ();
var moleculeCount = this.modelSet.getMoleculeCountInModel (-1);
for (var i = 0; i < moleculeCount; i++) {
var m = molecules[i];
var j = 0;
var pt = m.firstAtomIndex;
if (!this.bsRenderableAtoms.get (pt)) continue;
for (; j < m.atomCount; j++, pt++) if (this.gdata.isClippedZ (atoms[pt].screenZ - (atoms[pt].screenDiameter >> 1))) break;

if (j != m.atomCount) {
pt = m.firstAtomIndex;
for (var k = 0; k < m.atomCount; k++) {
this.bsRenderableAtoms.clear (pt);
atoms[pt++].screenZ = 0;
}
}}
}for (var i = this.bsRenderableAtoms.nextSetBit (0); i >= 0; i = this.bsRenderableAtoms.nextSetBit (i + 1)) {
var atom = atoms[i];
if (this.gdata.isClippedZ (atom.screenZ - (slabByAtom ? atoms[i].screenDiameter >> 1 : 0))) {
atom.setClickable (0);
var r = Clazz.doubleToInt ((slabByAtom ? -1 : 1) * atom.screenDiameter / 2);
if (atom.screenZ + r < minZ || atom.screenZ - r > maxZ || !this.gdata.isInDisplayRange (atom.screenX, atom.screenY)) {
this.bsRenderableAtoms.clear (i);
}}}
}if (this.modelSet.getAtomCount () == 0 || !this.viewer.getShowNavigationPoint ()) return null;
var minX = 2147483647;
var maxX = -2147483648;
var minY = 2147483647;
var maxY = -2147483648;
for (var i = this.bsRenderableAtoms.nextSetBit (0); i >= 0; i = this.bsRenderableAtoms.nextSetBit (i + 1)) {
var atom = atoms[i];
if (atom.screenX < minX) minX = atom.screenX;
if (atom.screenX > maxX) maxX = atom.screenX;
if (atom.screenY < minY) minY = atom.screenY;
if (atom.screenY > maxY) maxY = atom.screenY;
}
this.navigationCrossHairMinMax[0] = minX;
this.navigationCrossHairMinMax[1] = maxX;
this.navigationCrossHairMinMax[2] = minY;
this.navigationCrossHairMinMax[3] = maxY;
return this.navigationCrossHairMinMax;
});
Clazz.defineStatics (c$,
"hoverable", [29, 24, 23, 22, 34]);
c$.clickableMax = c$.prototype.clickableMax = org.jmol.viewer.ShapeManager.hoverable.length - 1;
});
