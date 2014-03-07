// 
//// org\jmol\jvxl\api\VertexDataServer.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.api");
Clazz.declareInterface (org.jmol.jvxl.api, "VertexDataServer");
// 
//// org\jmol\jvxl\api\MeshDataServer.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.api");
Clazz.load (["org.jmol.jvxl.api.VertexDataServer"], "org.jmol.jvxl.api.MeshDataServer", null, function () {
Clazz.declareInterface (org.jmol.jvxl.api, "MeshDataServer", org.jmol.jvxl.api.VertexDataServer);
});
// 
//// org\jmol\shapesurface\Isosurface.js 
// 
Clazz.declarePackage ("org.jmol.shapesurface");
Clazz.load (["org.jmol.jvxl.api.MeshDataServer", "org.jmol.shape.MeshCollection", "org.jmol.util.Point3i", "$.Point4f"], "org.jmol.shapesurface.Isosurface", ["java.lang.Boolean", "$.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.io.JmolBinary", "org.jmol.jvxl.data.JvxlCoder", "$.JvxlData", "$.MeshData", "org.jmol.jvxl.readers.SurfaceGenerator", "org.jmol.shape.Mesh", "org.jmol.shapesurface.IsosurfaceMesh", "org.jmol.util.ArrayUtil", "$.AxisAngle4f", "$.BitSet", "$.Colix", "$.ColorUtil", "$.Escape", "$.Logger", "$.Matrix3f", "$.MeshSurface", "$.Parser", "$.Point3f", "$.Quaternion", "$.StringXBuilder", "$.TextFormat", "$.Vector3f", "org.jmol.viewer.JmolConstants", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isomeshes = null;
this.thisMesh = null;
this.actualID = null;
this.iHaveBitSets = false;
this.explicitContours = false;
this.atomIndex = 0;
this.moNumber = 0;
this.moLinearCombination = null;
this.defaultColix = 0;
this.meshColix = 0;
this.center = null;
this.scale3d = 0;
this.isPhaseColored = false;
this.isColorExplicit = false;
this.scriptAppendix = "";
this.sg = null;
this.jvxlData = null;
this.withinDistance2 = 0;
this.isWithinNot = false;
this.withinPoints = null;
this.cutoffRange = null;
this.allowMesh = true;
this.script = null;
this.iHaveModelIndex = false;
this.nLCAO = 0;
this.lcaoDir = null;
this.privateKey = 0;
this.associateNormals = false;
this.ptXY = null;
this.keyXy = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shapesurface, "Isosurface", org.jmol.shape.MeshCollection, org.jmol.jvxl.api.MeshDataServer);
Clazz.prepareFields (c$, function () {
this.isomeshes =  new Array (4);
this.lcaoDir =  new org.jmol.util.Point4f ();
this.ptXY =  new org.jmol.util.Point3i ();
});
Clazz.overrideMethod (c$, "allocMesh", 
function (thisID, m) {
var index = this.meshCount++;
this.meshes = this.isomeshes = org.jmol.util.ArrayUtil.ensureLength (this.isomeshes, this.meshCount * 2);
this.currentMesh = this.thisMesh = this.isomeshes[index] = (m == null ?  new org.jmol.shapesurface.IsosurfaceMesh (thisID, this.colix, index) : m);
this.currentMesh.index = index;
this.sg.setJvxlData (this.jvxlData = this.thisMesh.jvxlData);
}, "~S,org.jmol.shape.Mesh");
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapesurface.Isosurface, "initShape", []);
this.myType = "isosurface";
this.newSg ();
});
Clazz.defineMethod (c$, "newSg", 
function () {
this.sg =  new org.jmol.jvxl.readers.SurfaceGenerator (this.viewer, this, null, this.jvxlData =  new org.jmol.jvxl.data.JvxlData ());
this.sg.getParams ().showTiming = this.viewer.getShowTiming ();
this.sg.setVersion ("Jmol " + org.jmol.viewer.Viewer.getJmolVersion ());
});
Clazz.defineMethod (c$, "clearSg", 
function () {
this.sg = null;
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("delete" === propertyName) {
this.setPropertySuper (propertyName, value, bs);
if (!this.explicitID) this.nLCAO = this.nUnnamed = 0;
this.currentMesh = this.thisMesh = null;
return;
}if ("remapColor" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.remapColors (value, this.translucentLevel);
}return;
}if ("thisID" === propertyName) {
if (this.actualID != null) value = this.actualID;
this.setPropertySuper ("thisID", value, null);
return;
}if ("atomcolor" === propertyName) {
if (this.thisMesh != null) {
if (this.thisMesh.vertexSource == null) {
var colix = (!this.thisMesh.isColorSolid ? 0 : this.thisMesh.colix);
this.setProperty ("init", null, null);
this.setProperty ("map", Boolean.FALSE, null);
this.setProperty ("property",  Clazz.newFloatArray (this.viewer.getAtomCount (), 0), null);
if (colix != 0) {
this.thisMesh.colorCommand = "color isosurface " + org.jmol.util.Colix.getHexCode (colix);
this.setProperty ("color",  new Integer (org.jmol.util.Colix.getArgb (colix)), null);
}}this.thisMesh.colorAtoms (org.jmol.util.Colix.getColixO (value), bs);
}return;
}if ("pointSize" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.volumeRenderPointSize = (value).floatValue ();
}return;
}if ("vertexcolor" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.colorVertices (org.jmol.util.Colix.getColixO (value), bs);
}return;
}if ("colorPhase" === propertyName) {
var colors = value;
if (this.thisMesh != null) {
this.thisMesh.colorPhased = true;
this.thisMesh.colix = this.thisMesh.jvxlData.minColorIndex = org.jmol.util.Colix.getColix ((colors[0]).intValue ());
this.thisMesh.jvxlData.maxColorIndex = org.jmol.util.Colix.getColix ((colors[1]).intValue ());
this.thisMesh.jvxlData.isBicolorMap = true;
this.thisMesh.jvxlData.colorDensity = false;
this.thisMesh.isColorSolid = false;
this.thisMesh.remapColors (null, this.translucentLevel);
}return;
}if ("color" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.isColorSolid = true;
this.thisMesh.polygonColixes = null;
this.thisMesh.colorEncoder = null;
this.thisMesh.vertexColorMap = null;
} else if (!org.jmol.util.TextFormat.isWild (this.previousMeshID)) {
for (var i = this.meshCount; --i >= 0; ) {
this.isomeshes[i].isColorSolid = true;
this.isomeshes[i].polygonColixes = null;
this.isomeshes[i].colorEncoder = null;
this.isomeshes[i].vertexColorMap = null;
}
}this.setPropertySuper (propertyName, value, bs);
return;
}if ("nocontour" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.deleteContours ();
}return;
}if ("fixed" === propertyName) {
this.isFixed = (value).booleanValue ();
this.setMesh ();
return;
}if ("newObject" === propertyName) {
if (this.thisMesh != null) this.thisMesh.clear (this.thisMesh.meshType, false);
return;
}if ("moveIsosurface" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.updateCoordinates (value, null);
this.thisMesh.altVertices = null;
}return;
}if ("refreshTrajectories" === propertyName) {
for (var i = this.meshCount; --i >= 0; ) if (this.meshes[i].connections != null && this.meshes[i].modelIndex == ((value)[0]).intValue ()) (this.meshes[i]).updateCoordinates ((value)[2], (value)[1]);

return;
}if ("modelIndex" === propertyName) {
if (!this.iHaveModelIndex) {
this.modelIndex = (value).intValue ();
this.isFixed = (this.modelIndex < 0);
this.sg.setModelIndex (Math.abs (this.modelIndex));
}return;
}if ("lcaoCartoon" === propertyName || "lonePair" === propertyName || "radical" === propertyName) {
var info = value;
if (!this.explicitID) {
this.setPropertySuper ("thisID", null, null);
}if (!this.sg.setParameter ("lcaoCartoonCenter", info[2])) this.drawLcaoCartoon (info[0], info[1], info[3], ("lonePair" === propertyName ? 2 : "radical" === propertyName ? 1 : 0));
return;
}if ("select" === propertyName) {
if (this.iHaveBitSets) return;
}if ("ignore" === propertyName) {
if (this.iHaveBitSets) return;
}if ("meshcolor" === propertyName) {
var rgb = (value).intValue ();
this.meshColix = org.jmol.util.Colix.getColix (rgb);
if (this.thisMesh != null) this.thisMesh.meshColix = this.meshColix;
return;
}if ("offset" === propertyName) {
var offset = org.jmol.util.Point3f.newP (value);
if (offset.equals (org.jmol.viewer.JmolConstants.center)) offset = null;
if (this.thisMesh != null) {
this.thisMesh.rotateTranslate (null, offset, true);
this.thisMesh.altVertices = null;
}return;
}if ("rotate" === propertyName) {
var pt4 = value;
if (this.thisMesh != null) {
this.thisMesh.rotateTranslate (org.jmol.util.Quaternion.newP4 (pt4), null, true);
this.thisMesh.altVertices = null;
}return;
}if ("bsDisplay" === propertyName) {
this.bsDisplay = value;
return;
}if ("displayWithin" === propertyName) {
var o = value;
this.displayWithinDistance2 = (o[0]).floatValue ();
this.isDisplayWithinNot = (this.displayWithinDistance2 < 0);
this.displayWithinDistance2 *= this.displayWithinDistance2;
this.displayWithinPoints = o[3];
if (this.displayWithinPoints.size () == 0) this.displayWithinPoints = this.viewer.getAtomPointVector (o[2]);
return;
}if ("finalize" === propertyName) {
if (this.thisMesh != null) {
var cmd = value;
if (cmd != null && !cmd.startsWith ("; isosurface map")) {
this.thisMesh.setDiscreteColixes (this.sg.getParams ().contoursDiscrete, this.sg.getParams ().contourColixes);
this.setJvxlInfo ();
}this.setScriptInfo (cmd);
}this.clearSg ();
return;
}if ("privateKey" === propertyName) {
this.privateKey = (value).doubleValue ();
return;
}if ("connections" === propertyName) {
if (this.currentMesh != null) {
this.connections = value;
if (this.connections[0] >= 0 && this.connections[0] < this.viewer.getAtomCount ()) this.currentMesh.connections = this.connections;
 else this.connections = this.currentMesh.connections = null;
}return;
}if ("cutoffRange" === propertyName) {
this.cutoffRange = value;
return;
}if ("slab" === propertyName) {
if (Clazz.instanceOf (value, Integer)) {
if (this.thisMesh != null) this.thisMesh.jvxlData.slabValue = (value).intValue ();
return;
}if (this.thisMesh != null) {
var slabInfo = value;
var tok = (slabInfo[0]).intValue ();
switch (tok) {
case 1073742018:
var data = slabInfo[1];
var m = this.getMesh (data[1]);
if (m == null) return;
data[1] = m;
break;
}
this.slabPolygons (slabInfo);
return;
}}if ("cap" === propertyName) {
if (this.thisMesh != null && this.thisMesh.polygonCount != 0) {
this.thisMesh.slabPolygons (value, true);
this.thisMesh.initialize (this.thisMesh.lighting, null, null);
return;
}}if ("map" === propertyName) {
if (this.sg != null) this.sg.getParams ().isMapped = true;
this.setProperty ("squareData", Boolean.FALSE, null);
if (this.thisMesh == null || this.thisMesh.vertexCount == 0) return;
}if ("deleteVdw" === propertyName) {
for (var i = this.meshCount; --i >= 0; ) if (this.isomeshes[i].bsVdw != null && (bs == null || bs.intersects (this.isomeshes[i].bsVdw))) this.deleteMeshI (i);

this.currentMesh = this.thisMesh = null;
return;
}if ("mapColor" === propertyName || "readFile" === propertyName) {
if (value == null) {
value = this.viewer.getBufferedReaderOrErrorMessageFromName (this.sg.getFileName (), null, true);
if (Clazz.instanceOf (value, String)) {
org.jmol.util.Logger.error ("Isosurface: could not open file " + this.sg.getFileName () + " -- " + value);
return;
}if (!(Clazz.instanceOf (value, java.io.BufferedReader))) try {
value = org.jmol.io.JmolBinary.getBufferedReader (value);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}} else if ("atomIndex" === propertyName) {
this.atomIndex = (value).intValue ();
} else if ("center" === propertyName) {
this.center.setT (value);
} else if ("colorRGB" === propertyName) {
var rgb = (value).intValue ();
this.defaultColix = org.jmol.util.Colix.getColix (rgb);
} else if ("contour" === propertyName) {
this.explicitContours = true;
} else if ("functionXY" === propertyName) {
if (this.sg.isStateDataRead ()) this.setScriptInfo (null);
} else if ("init" === propertyName) {
this.newSg ();
} else if ("getSurfaceSets" === propertyName) {
if (this.thisMesh != null) {
this.thisMesh.jvxlData.thisSet = (value).intValue ();
this.thisMesh.calculatedVolume = null;
this.thisMesh.calculatedArea = null;
}} else if ("localName" === propertyName) {
value = this.viewer.getOutputStream (value, null);
propertyName = "outputStream";
} else if ("molecularOrbital" === propertyName) {
if (Clazz.instanceOf (value, Integer)) {
this.moNumber = (value).intValue ();
this.moLinearCombination = null;
} else {
this.moLinearCombination = value;
this.moNumber = 0;
}if (!this.isColorExplicit) this.isPhaseColored = true;
} else if ("phase" === propertyName) {
this.isPhaseColored = true;
} else if ("plane" === propertyName) {
} else if ("pocket" === propertyName) {
} else if ("scale3d" === propertyName) {
this.scale3d = (value).floatValue ();
if (this.thisMesh != null) {
this.thisMesh.scale3d = this.thisMesh.jvxlData.scale3d = this.scale3d;
this.thisMesh.altVertices = null;
}} else if ("title" === propertyName) {
if (Clazz.instanceOf (value, String) && "-".equals (value)) value = null;
this.setPropertySuper (propertyName, value, bs);
value = this.title;
} else if ("withinPoints" === propertyName) {
var o = value;
this.withinDistance2 = (o[0]).floatValue ();
this.isWithinNot = (this.withinDistance2 < 0);
this.withinDistance2 *= this.withinDistance2;
this.withinPoints = o[3];
if (this.withinPoints.size () == 0) this.withinPoints = this.viewer.getAtomPointVector (o[2]);
} else if (("nci" === propertyName || "orbital" === propertyName) && this.sg != null) {
this.sg.getParams ().testFlags = (this.viewer.getTestFlag (2) ? 2 : 0);
}if (this.sg != null && this.sg.setParameter (propertyName, value, bs)) {
if (this.sg.isValid ()) return;
propertyName = "delete";
}if ("init" === propertyName) {
this.explicitID = false;
this.scriptAppendix = "";
var script = (Clazz.instanceOf (value, String) ? value : null);
var pt = (script == null ? -1 : script.indexOf ("# ID="));
this.actualID = (pt >= 0 ? org.jmol.util.Parser.getQuotedStringAt (script, pt) : null);
this.setPropertySuper ("thisID", "+PREVIOUS_MESH+", null);
if (script != null && !(this.iHaveBitSets = this.getScriptBitSets (script, null))) this.sg.setParameter ("select", bs);
this.initializeIsosurface ();
this.sg.setModelIndex (this.isFixed ? -1 : this.modelIndex);
return;
}if ("clear" === propertyName) {
this.discardTempData (true);
return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var firstAtomDeleted = ((value)[2])[1];
var nAtomsDeleted = ((value)[2])[2];
for (var i = this.meshCount; --i >= 0; ) {
var m = this.meshes[i];
if (m == null) continue;
if (m.connections != null) {
var iAtom = m.connections[0];
if (iAtom >= firstAtomDeleted + nAtomsDeleted) m.connections[0] = iAtom - nAtomsDeleted;
 else if (iAtom >= firstAtomDeleted) m.connections = null;
}m.connections = null;
if (m.modelIndex == modelIndex) {
this.meshCount--;
if (m === this.currentMesh) this.currentMesh = this.thisMesh = null;
this.meshes = this.isomeshes = org.jmol.util.ArrayUtil.deleteElements (this.meshes, i, 1);
} else if (m.modelIndex > modelIndex) {
m.modelIndex--;
if (m.atomIndex >= firstAtomDeleted) m.atomIndex -= nAtomsDeleted;
}}
return;
}this.setPropertySuper (propertyName, value, bs);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "slabPolygons", 
function (slabInfo) {
this.thisMesh.slabPolygons (slabInfo, false);
this.thisMesh.reinitializeLightingAndColor ();
}, "~A");
Clazz.defineMethod (c$, "setPropertySuper", 
($fz = function (propertyName, value, bs) {
if (propertyName === "thisID" && this.currentMesh != null && this.currentMesh.thisID.equals (value)) {
this.checkExplicit (value);
return;
}this.currentMesh = this.thisMesh;
Clazz.superCall (this, org.jmol.shapesurface.Isosurface, "setProperty", [propertyName, value, bs]);
this.thisMesh = this.currentMesh;
this.jvxlData = (this.thisMesh == null ? null : this.thisMesh.jvxlData);
if (this.sg != null) this.sg.setJvxlData (this.jvxlData);
}, $fz.isPrivate = true, $fz), "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getPropertyData", 
function (property, data) {
if (property === "colorEncoder") {
var mesh = this.getMesh (data[0]);
if (mesh == null || (data[1] = mesh.colorEncoder) == null) return false;
return true;
}if (property === "intersectPlane") {
var mesh = this.getMesh (data[0]);
if (mesh == null) return false;
data[3] = Integer.$valueOf (mesh.modelIndex);
mesh.getIntersection (0, data[1], null, data[2], null, null, null, false, false, 135266319, false);
return true;
}if (property === "getBoundingBox") {
var id = data[0];
var m = this.getMesh (id);
if (m == null || m.vertices == null) return false;
data[2] = m.jvxlData.boundingBox;
if (m.mat4 != null) {
var d =  new Array (2);
d[0] = org.jmol.util.Point3f.newP (m.jvxlData.boundingBox[0]);
d[1] = org.jmol.util.Point3f.newP (m.jvxlData.boundingBox[1]);
var v =  new org.jmol.util.Vector3f ();
m.mat4.get (v);
d[0].add (v);
d[1].add (v);
data[2] = d;
}return true;
}if (property === "unitCell") {
var m = this.getMesh (data[0]);
return (m != null && (data[1] = m.getUnitCell ()) != null);
}if (property === "getCenter") {
var index = (data[1]).intValue ();
if (index == -2147483648) {
var id = data[0];
var m = this.getMesh (id);
if (m == null || m.vertices == null) return false;
var p = org.jmol.util.Point3f.newP (m.jvxlData.boundingBox[0]);
p.add (m.jvxlData.boundingBox[1]);
p.scale (0.5);
if (m.mat4 != null) {
var v =  new org.jmol.util.Vector3f ();
m.mat4.get (v);
p.add (v);
}data[2] = p;
return true;
}}return Clazz.superCall (this, org.jmol.shapesurface.Isosurface, "getPropertyData", [property, data]);
}, "~S,~A");
Clazz.defineMethod (c$, "getProperty", 
function (property, index) {
var ret = Clazz.superCall (this, org.jmol.shapesurface.Isosurface, "getProperty", [property, index]);
if (ret != null) return ret;
if (property === "dataRange") return (this.thisMesh == null || this.jvxlData.jvxlPlane != null && this.thisMesh.colorEncoder == null ? null : [this.jvxlData.mappedDataMin, this.jvxlData.mappedDataMax, (this.jvxlData.isColorReversed ? this.jvxlData.valueMappedToBlue : this.jvxlData.valueMappedToRed), (this.jvxlData.isColorReversed ? this.jvxlData.valueMappedToRed : this.jvxlData.valueMappedToBlue)]);
if (property === "moNumber") return Integer.$valueOf (this.moNumber);
if (property === "moLinearCombination") return this.moLinearCombination;
if (property === "nSets") return Integer.$valueOf (this.thisMesh == null ? 0 : this.thisMesh.nSets);
if (property === "area") return (this.thisMesh == null ?  new Float (NaN) : this.calculateVolumeOrArea (true));
if (property === "volume") return (this.thisMesh == null ?  new Float (NaN) : this.calculateVolumeOrArea (false));
if (this.thisMesh == null) return null;
if (property === "cutoff") return  new Float (this.jvxlData.cutoff);
if (property === "minMaxInfo") return [this.jvxlData.dataMin, this.jvxlData.dataMax];
if (property === "plane") return this.jvxlData.jvxlPlane;
if (property === "contours") return this.thisMesh.getContours ();
if (property === "jvxlDataXml" || property === "jvxlMeshXml") {
var meshData = null;
this.jvxlData.slabInfo = null;
if (property === "jvxlMeshXml" || this.jvxlData.vertexDataOnly || this.thisMesh.bsSlabDisplay != null && this.thisMesh.bsSlabGhost == null) {
meshData =  new org.jmol.jvxl.data.MeshData ();
this.fillMeshData (meshData, 1, null);
meshData.polygonColorData = org.jmol.shapesurface.Isosurface.getPolygonColorData (meshData.polygonCount, meshData.polygonColixes, meshData.bsSlabDisplay);
} else if (this.thisMesh.bsSlabGhost != null) {
this.jvxlData.slabInfo = this.thisMesh.slabOptions.toString ();
}var sb =  new org.jmol.util.StringXBuilder ();
this.getMeshCommand (sb, this.thisMesh.index);
this.thisMesh.setJvxlColorMap (true);
return org.jmol.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, meshData, this.title, "", true, 1, sb.toString (), null);
}if (property === "jvxlFileInfo") {
this.thisMesh.setJvxlColorMap (false);
return org.jmol.jvxl.data.JvxlCoder.jvxlGetInfo (this.jvxlData);
}if (property === "command") {
var key = this.previousMeshID.toUpperCase ();
var isWild = org.jmol.util.TextFormat.isWild (key);
var sb =  new org.jmol.util.StringXBuilder ();
for (var i = this.meshCount; --i >= 0; ) {
var id = this.meshes[i].thisID.toUpperCase ();
if (id.equals (key) || isWild && org.jmol.util.TextFormat.isMatch (id, key, true, true)) this.getMeshCommand (sb, i);
}
return sb.toString ();
}return null;
}, "~S,~N");
Clazz.defineMethod (c$, "calculateVolumeOrArea", 
($fz = function (isArea) {
if (isArea) {
if (this.thisMesh.calculatedArea != null) return this.thisMesh.calculatedArea;
} else {
if (this.thisMesh.calculatedVolume != null) return this.thisMesh.calculatedVolume;
}var meshData =  new org.jmol.jvxl.data.MeshData ();
this.fillMeshData (meshData, 1, null);
meshData.nSets = this.thisMesh.nSets;
meshData.vertexSets = this.thisMesh.vertexSets;
if (!isArea && this.thisMesh.jvxlData.colorDensity) {
var f = this.thisMesh.jvxlData.voxelVolume;
f *= (this.thisMesh.bsSlabDisplay == null ? this.thisMesh.vertexCount : this.thisMesh.bsSlabDisplay.cardinality ());
return this.thisMesh.calculatedVolume = Float.$valueOf (f);
}var ret = meshData.calculateVolumeOrArea (this.thisMesh.jvxlData.thisSet, isArea, false);
if (isArea) this.thisMesh.calculatedArea = ret;
 else this.thisMesh.calculatedVolume = ret;
return ret;
}, $fz.isPrivate = true, $fz), "~B");
c$.getPolygonColorData = Clazz.defineMethod (c$, "getPolygonColorData", 
function (ccount, colixes, bsSlabDisplay) {
if (colixes == null) return null;
var list1 =  new org.jmol.util.StringXBuilder ();
var count = 0;
var colix = 0;
var done = false;
for (var i = 0; i < ccount || (done = true) == true; i++) {
if (!done && bsSlabDisplay != null && !bsSlabDisplay.get (i)) continue;
if (done || colixes[i] != colix) {
if (count != 0) list1.append (" ").appendI (count).append (" ").appendI ((colix == 0 ? 0 : org.jmol.util.Colix.getArgb (colix)));
if (done) break;
colix = colixes[i];
count = 1;
} else {
count++;
}}
list1.append ("\n");
return list1.toString ();
}, "~N,~A,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
this.clean ();
var sb =  new org.jmol.util.StringXBuilder ();
sb.append ("\n");
for (var i = 0; i < this.meshCount; i++) this.getMeshCommand (sb, i);

return sb.toString ();
});
Clazz.defineMethod (c$, "getMeshCommand", 
($fz = function (sb, i) {
var imesh = this.meshes[i];
if (imesh == null || imesh.scriptCommand == null) return;
var cmd = imesh.scriptCommand;
var modelCount = this.viewer.getModelCount ();
if (modelCount > 1) org.jmol.shape.Shape.appendCmd (sb, "frame " + this.viewer.getModelNumberDotted (imesh.modelIndex));
cmd = org.jmol.util.TextFormat.simpleReplace (cmd, ";; isosurface map", " map");
cmd = org.jmol.util.TextFormat.simpleReplace (cmd, "; isosurface map", " map");
cmd = cmd.$replace ('\t', ' ');
cmd = org.jmol.util.TextFormat.simpleReplace (cmd, ";#", "; #");
var pt = cmd.indexOf ("; #");
if (pt >= 0) cmd = cmd.substring (0, pt);
if (imesh.connections != null) cmd += " connect " + org.jmol.util.Escape.escape (imesh.connections);
cmd = org.jmol.util.TextFormat.trim (cmd, ";");
if (imesh.linkedMesh != null) cmd += " LINK";
org.jmol.shape.Shape.appendCmd (sb, cmd);
var id = this.myType + " ID " + org.jmol.util.Escape.escapeStr (imesh.thisID);
if (imesh.jvxlData.thisSet >= 0) org.jmol.shape.Shape.appendCmd (sb, id + " set " + (imesh.jvxlData.thisSet + 1));
if (imesh.mat4 != null) org.jmol.shape.Shape.appendCmd (sb, id + " move " + org.jmol.util.Escape.matrixToScript (imesh.mat4));
if (imesh.scale3d != 0) org.jmol.shape.Shape.appendCmd (sb, id + " scale3d " + imesh.scale3d);
if (imesh.jvxlData.slabValue != -2147483648) org.jmol.shape.Shape.appendCmd (sb, id + " slab " + imesh.jvxlData.slabValue);
if (imesh.slabOptions != null) org.jmol.shape.Shape.appendCmd (sb, imesh.slabOptions.toString ());
if (cmd.charAt (0) != '#') {
if (this.allowMesh) org.jmol.shape.Shape.appendCmd (sb, imesh.getState (this.myType));
if (!imesh.isColorSolid && org.jmol.util.Colix.isColixTranslucent (imesh.colix)) org.jmol.shape.Shape.appendCmd (sb, "color " + this.myType + " " + org.jmol.shape.Shape.getTranslucentLabel (imesh.colix));
if (imesh.colorCommand != null) {
org.jmol.shape.Shape.appendCmd (sb, imesh.colorCommand);
}var colorArrayed = (imesh.isColorSolid && imesh.polygonColixes != null);
if (imesh.isColorSolid && !colorArrayed) {
org.jmol.shape.Shape.appendCmd (sb, this.getColorCommandUnk (this.myType, imesh.colix));
} else if (imesh.jvxlData.isBicolorMap && imesh.colorPhased) {
org.jmol.shape.Shape.appendCmd (sb, "color isosurface phase " + org.jmol.shape.Shape.encodeColor (imesh.jvxlData.minColorIndex) + " " + org.jmol.shape.Shape.encodeColor (imesh.jvxlData.maxColorIndex));
}if (imesh.vertexColorMap != null) for (var entry, $entry = imesh.vertexColorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var bs = entry.getValue ();
if (!bs.isEmpty ()) org.jmol.shape.Shape.appendCmd (sb, "color " + this.myType + " " + org.jmol.util.Escape.escapeBs (bs, true) + " " + entry.getKey ());
}
}}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~N");
Clazz.defineMethod (c$, "getScriptBitSets", 
($fz = function (script, bsCmd) {
this.script = script;
var i;
this.iHaveModelIndex = false;
this.modelIndex = -1;
if (script != null && (i = script.indexOf ("MODEL({")) >= 0) {
var j = script.indexOf ("})", i);
if (j > 0) {
var bs = org.jmol.util.Escape.unescapeBitset (script.substring (i + 3, j + 1));
this.modelIndex = (bs == null ? -1 : bs.nextSetBit (0));
this.iHaveModelIndex = (this.modelIndex >= 0);
}}if (script == null) return false;
this.getCapSlabInfo (script);
i = script.indexOf ("# ({");
if (i < 0) return false;
var j = script.indexOf ("})", i);
if (j < 0) return false;
var bs = org.jmol.util.Escape.unescapeBitset (script.substring (i + 2, j + 2));
if (bsCmd == null) this.sg.setParameter ("select", bs);
 else bsCmd[0] = bs;
if ((i = script.indexOf ("({", j)) < 0) return true;
j = script.indexOf ("})", i);
if (j < 0) return false;
bs = org.jmol.util.Escape.unescapeBitset (script.substring (i + 1, j + 1));
if (bsCmd == null) this.sg.setParameter ("ignore", bs);
 else bsCmd[1] = bs;
if ((i = script.indexOf ("/({", j)) == j + 2) {
if ((j = script.indexOf ("})", i)) < 0) return false;
bs = org.jmol.util.Escape.unescapeBitset (script.substring (i + 3, j + 1));
if (bsCmd == null) this.viewer.setTrajectoryBs (bs);
 else bsCmd[2] = bs;
}return true;
}, $fz.isPrivate = true, $fz), "~S,~A");
Clazz.defineMethod (c$, "getCapSlabInfo", 
function (script) {
var i = script.indexOf ("# SLAB=");
if (i >= 0) this.sg.setParameter ("slab", org.jmol.util.MeshSurface.getCapSlabObject (org.jmol.util.Parser.getQuotedStringAt (script, i), false));
i = script.indexOf ("# CAP=");
if (i >= 0) this.sg.setParameter ("slab", org.jmol.util.MeshSurface.getCapSlabObject (org.jmol.util.Parser.getQuotedStringAt (script, i), true));
}, "~S");
Clazz.defineMethod (c$, "initializeIsosurface", 
($fz = function () {
if (!this.iHaveModelIndex) this.modelIndex = this.viewer.getCurrentModelIndex ();
this.isFixed = (this.modelIndex < 0);
if (this.modelIndex < 0) this.modelIndex = 0;
this.title = null;
this.explicitContours = false;
this.atomIndex = -1;
this.colix = 5;
this.defaultColix = this.meshColix = 0;
this.isPhaseColored = this.isColorExplicit = false;
this.center = org.jmol.util.Point3f.new3 (3.4028235E38, 3.4028235E38, 3.4028235E38);
this.scale3d = 0;
this.withinPoints = null;
this.cutoffRange = null;
this.displayWithinPoints = null;
this.bsDisplay = null;
this.linkedMesh = null;
this.connections = null;
this.initState ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initState", 
($fz = function () {
this.associateNormals = true;
this.sg.initState ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setMesh", 
($fz = function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.thisMesh.visible = true;
if ((this.thisMesh.atomIndex = this.atomIndex) >= 0) this.thisMesh.modelIndex = this.viewer.getAtomModelIndex (this.atomIndex);
 else if (this.isFixed) this.thisMesh.modelIndex = -1;
 else if (this.modelIndex >= 0) this.thisMesh.modelIndex = this.modelIndex;
 else this.thisMesh.modelIndex = this.viewer.getCurrentModelIndex ();
this.thisMesh.scriptCommand = this.script;
this.thisMesh.ptCenter.setT (this.center);
this.thisMesh.scale3d = (this.thisMesh.jvxlData.jvxlPlane == null ? 0 : this.scale3d);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "discardTempData", 
function (discardAll) {
if (!discardAll) return;
this.title = null;
if (this.thisMesh == null) return;
this.thisMesh.surfaceSet = null;
}, "~B");
Clazz.defineMethod (c$, "getDefaultColix", 
($fz = function () {
if (this.defaultColix != 0) return this.defaultColix;
if (!this.sg.isCubeData ()) return this.colix;
var argb = (this.sg.getCutoff () >= 0 ? -11525984 : -6283184);
return org.jmol.util.Colix.getColix (argb);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "drawLcaoCartoon", 
($fz = function (z, x, rotAxis, nElectrons) {
var lcaoCartoon = this.sg.setLcao ();
var rotRadians = rotAxis.x + rotAxis.y + rotAxis.z;
this.defaultColix = org.jmol.util.Colix.getColix (this.sg.getColor (1));
var colixNeg = org.jmol.util.Colix.getColix (this.sg.getColor (-1));
var y =  new org.jmol.util.Vector3f ();
var isReverse = (lcaoCartoon.length > 0 && lcaoCartoon.charAt (0) == '-');
if (isReverse) lcaoCartoon = lcaoCartoon.substring (1);
var sense = (isReverse ? -1 : 1);
y.cross (z, x);
if (rotRadians != 0) {
var a =  new org.jmol.util.AxisAngle4f ();
if (rotAxis.x != 0) a.setVA (x, rotRadians);
 else if (rotAxis.y != 0) a.setVA (y, rotRadians);
 else a.setVA (z, rotRadians);
var m =  new org.jmol.util.Matrix3f ();
m.setAA (a);
m.transform (x);
m.transform (y);
m.transform (z);
}if (this.thisMesh == null && this.nLCAO == 0) this.nLCAO = this.meshCount;
var id = (this.thisMesh == null ? (nElectrons > 0 ? "lp" : "lcao") + (++this.nLCAO) + "_" + lcaoCartoon : this.thisMesh.thisID);
if (this.thisMesh == null) this.allocMesh (id, null);
if (lcaoCartoon.equals ("px")) {
this.thisMesh.thisID += "a";
var meshA = this.thisMesh;
this.createLcaoLobe (x, sense, nElectrons);
if (nElectrons > 0) return;
this.setProperty ("thisID", id + "b", null);
this.createLcaoLobe (x, -sense, nElectrons);
this.thisMesh.colix = colixNeg;
this.linkedMesh = this.thisMesh.linkedMesh = meshA;
return;
}if (lcaoCartoon.equals ("py")) {
this.thisMesh.thisID += "a";
var meshA = this.thisMesh;
this.createLcaoLobe (y, sense, nElectrons);
if (nElectrons > 0) return;
this.setProperty ("thisID", id + "b", null);
this.createLcaoLobe (y, -sense, nElectrons);
this.thisMesh.colix = colixNeg;
this.linkedMesh = this.thisMesh.linkedMesh = meshA;
return;
}if (lcaoCartoon.equals ("pz")) {
this.thisMesh.thisID += "a";
var meshA = this.thisMesh;
this.createLcaoLobe (z, sense, nElectrons);
if (nElectrons > 0) return;
this.setProperty ("thisID", id + "b", null);
this.createLcaoLobe (z, -sense, nElectrons);
this.thisMesh.colix = colixNeg;
this.linkedMesh = this.thisMesh.linkedMesh = meshA;
return;
}if (lcaoCartoon.equals ("pza") || lcaoCartoon.indexOf ("sp") == 0 || lcaoCartoon.indexOf ("d") == 0 || lcaoCartoon.indexOf ("lp") == 0) {
this.createLcaoLobe (z, sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pzb")) {
this.createLcaoLobe (z, -sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pxa")) {
this.createLcaoLobe (x, sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pxb")) {
this.createLcaoLobe (x, -sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pya")) {
this.createLcaoLobe (y, sense, nElectrons);
return;
}if (lcaoCartoon.equals ("pyb")) {
this.createLcaoLobe (y, -sense, nElectrons);
return;
}if (lcaoCartoon.equals ("spacefill") || lcaoCartoon.equals ("cpk")) {
this.createLcaoLobe (null, 2 * this.viewer.getAtomRadius (this.atomIndex), nElectrons);
return;
}this.createLcaoLobe (null, 1, nElectrons);
return;
}, $fz.isPrivate = true, $fz), "org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,~N");
Clazz.defineMethod (c$, "createLcaoLobe", 
($fz = function (lobeAxis, factor, nElectrons) {
this.initState ();
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("creating isosurface ID " + this.thisMesh.thisID);
}if (lobeAxis == null) {
this.setProperty ("sphere",  new Float (factor / 2), null);
} else {
this.lcaoDir.x = lobeAxis.x * factor;
this.lcaoDir.y = lobeAxis.y * factor;
this.lcaoDir.z = lobeAxis.z * factor;
this.lcaoDir.w = 0.7;
this.setProperty (nElectrons == 2 ? "lp" : nElectrons == 1 ? "rad" : "lobe", this.lcaoDir, null);
}this.thisMesh.colix = this.defaultColix;
this.setScriptInfo (null);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Vector3f,~N,~N");
Clazz.overrideMethod (c$, "invalidateTriangles", 
function () {
this.thisMesh.invalidatePolygons ();
});
Clazz.overrideMethod (c$, "setOutputStream", 
function (binaryDoc, os) {
binaryDoc.setOutputStream (os, this.viewer, this.privateKey);
}, "org.jmol.api.JmolDocument,java.io.OutputStream");
Clazz.overrideMethod (c$, "fillMeshData", 
function (meshData, mode, mesh) {
if (meshData == null) {
if (this.thisMesh == null) this.allocMesh (null, null);
if (!this.thisMesh.isMerged) this.thisMesh.clear (this.myType, this.sg.getIAddGridPoints ());
this.thisMesh.connections = this.connections;
this.thisMesh.colix = this.getDefaultColix ();
this.thisMesh.meshColix = this.meshColix;
if (this.isPhaseColored || this.thisMesh.jvxlData.isBicolorMap) this.thisMesh.isColorSolid = false;
return;
}if (mesh == null) mesh = this.thisMesh;
if (mesh == null) return;
switch (mode) {
case 1:
meshData.mergeVertexCount0 = mesh.mergeVertexCount0;
meshData.vertices = mesh.vertices;
meshData.vertexSource = mesh.vertexSource;
meshData.vertexValues = mesh.vertexValues;
meshData.vertexCount = mesh.vertexCount;
meshData.vertexIncrement = mesh.vertexIncrement;
meshData.polygonCount = mesh.polygonCount;
meshData.polygonIndexes = mesh.polygonIndexes;
meshData.polygonColixes = mesh.polygonColixes;
meshData.bsSlabDisplay = mesh.bsSlabDisplay;
meshData.bsSlabGhost = mesh.bsSlabGhost;
meshData.slabColix = mesh.slabColix;
meshData.slabMeshType = mesh.slabMeshType;
meshData.polygonCount0 = mesh.polygonCount0;
meshData.vertexCount0 = mesh.vertexCount0;
meshData.slabOptions = mesh.slabOptions;
return;
case 2:
if (mesh.vertexColixes == null || mesh.vertexCount > mesh.vertexColixes.length) mesh.vertexColixes =  Clazz.newShortArray (mesh.vertexCount, 0);
meshData.vertexColixes = mesh.vertexColixes;
return;
case 3:
mesh.surfaceSet = meshData.surfaceSet;
mesh.vertexSets = meshData.vertexSets;
mesh.nSets = meshData.nSets;
return;
case 4:
mesh.vertices = meshData.vertices;
mesh.vertexValues = meshData.vertexValues;
mesh.vertexCount = meshData.vertexCount;
mesh.vertexIncrement = meshData.vertexIncrement;
mesh.vertexSource = meshData.vertexSource;
mesh.polygonCount = meshData.polygonCount;
mesh.polygonIndexes = meshData.polygonIndexes;
mesh.polygonColixes = meshData.polygonColixes;
mesh.bsSlabDisplay = meshData.bsSlabDisplay;
mesh.bsSlabGhost = meshData.bsSlabGhost;
mesh.slabColix = meshData.slabColix;
mesh.slabMeshType = meshData.slabMeshType;
mesh.polygonCount0 = meshData.polygonCount0;
mesh.vertexCount0 = meshData.vertexCount0;
mesh.mergeVertexCount0 = meshData.mergeVertexCount0;
mesh.slabOptions = meshData.slabOptions;
return;
}
}, "org.jmol.jvxl.data.MeshData,~N,org.jmol.shapesurface.IsosurfaceMesh");
Clazz.overrideMethod (c$, "notifySurfaceGenerationCompleted", 
function () {
this.setMesh ();
this.setBsVdw ();
this.thisMesh.insideOut = this.sg.isInsideOut ();
this.thisMesh.vertexSource = this.sg.getVertexSource ();
this.thisMesh.spanningVectors = this.sg.getSpanningVectors ();
this.thisMesh.calculatedArea = null;
this.thisMesh.calculatedVolume = null;
var params = this.sg.getParams ();
if (!this.thisMesh.isMerged) this.thisMesh.initialize (this.sg.isFullyLit () ? 1073741964 : 1073741958, null, this.sg.getPlane ());
if (!params.allowVolumeRender) this.thisMesh.jvxlData.allowVolumeRender = false;
this.thisMesh.setColorsFromJvxlData (this.sg.getParams ().colorRgb);
if (this.thisMesh.jvxlData.slabInfo != null) this.viewer.runScriptImmediately ("isosurface " + this.thisMesh.jvxlData.slabInfo);
if (this.sg.getParams ().psi_monteCarloCount > 0) this.thisMesh.diameter = -1;
});
Clazz.overrideMethod (c$, "notifySurfaceMappingCompleted", 
function () {
if (!this.thisMesh.isMerged) {
this.thisMesh.initialize (this.sg.isFullyLit () ? 1073741964 : 1073741958, null, this.sg.getPlane ());
this.thisMesh.setJvxlDataRendering ();
}this.setBsVdw ();
this.thisMesh.isColorSolid = false;
this.thisMesh.colorDensity = this.jvxlData.colorDensity;
this.thisMesh.colorEncoder = this.sg.getColorEncoder ();
this.thisMesh.getContours ();
if (this.thisMesh.jvxlData.nContours != 0 && this.thisMesh.jvxlData.nContours != -1) this.explicitContours = true;
if (this.explicitContours && this.thisMesh.jvxlData.jvxlPlane != null) this.thisMesh.havePlanarContours = true;
this.setPropertySuper ("token", Integer.$valueOf (this.explicitContours ? 1073742046 : 1073741938), null);
this.setPropertySuper ("token", Integer.$valueOf (this.explicitContours ? 1073741898 : 1073742039), null);
var slabInfo = this.sg.getSlabInfo ();
if (slabInfo != null) {
this.thisMesh.slabPolygonsList (slabInfo, false);
this.thisMesh.reinitializeLightingAndColor ();
}this.thisMesh.setColorCommand ();
});
Clazz.defineMethod (c$, "setBsVdw", 
($fz = function () {
var bs = this.sg.geVdwBitSet ();
if (bs == null) return;
if (this.thisMesh.bsVdw == null) this.thisMesh.bsVdw =  new org.jmol.util.BitSet ();
this.thisMesh.bsVdw.or (bs);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "calculateGeodesicSurface", 
function (bsSelected, envelopeRadius) {
return this.viewer.calculateSurface (bsSelected, envelopeRadius);
}, "org.jmol.util.BitSet,~N");
Clazz.overrideMethod (c$, "getSurfacePointIndexAndFraction", 
function (cutoff, isCutoffAbsolute, x, y, z, offset, vA, vB, valueA, valueB, pointA, edgeVector, isContourType, fReturn) {
return 0;
}, "~N,~B,~N,~N,~N,org.jmol.util.Point3i,~N,~N,~N,~N,org.jmol.util.Point3f,org.jmol.util.Vector3f,~B,~A");
Clazz.overrideMethod (c$, "addVertexCopy", 
function (vertexXYZ, value, assocVertex) {
if (this.cutoffRange != null && (value < this.cutoffRange[0] || value > this.cutoffRange[1])) return -1;
return (this.withinPoints != null && !org.jmol.shape.Mesh.checkWithin (vertexXYZ, this.withinPoints, this.withinDistance2, this.isWithinNot) ? -1 : this.thisMesh.addVertexCopy (vertexXYZ, value, assocVertex, this.associateNormals));
}, "org.jmol.util.Point3f,~N,~N");
Clazz.overrideMethod (c$, "addTriangleCheck", 
function (iA, iB, iC, check, check2, isAbsolute, color) {
return (iA < 0 || iB < 0 || iC < 0 || isAbsolute && !org.jmol.jvxl.data.MeshData.checkCutoff (iA, iB, iC, this.thisMesh.vertexValues) ? -1 : this.thisMesh.addTriangleCheck (iA, iB, iC, check, check2, color));
}, "~N,~N,~N,~N,~N,~B,~N");
Clazz.defineMethod (c$, "setScriptInfo", 
function (strCommand) {
var script = (strCommand == null ? this.sg.getScript () : strCommand);
var pt = (script == null ? -1 : script.indexOf ("; isosurface map"));
if (pt == 0) {
if (this.thisMesh.scriptCommand == null) return;
pt = this.thisMesh.scriptCommand.indexOf ("; isosurface map");
if (pt >= 0) this.thisMesh.scriptCommand = this.thisMesh.scriptCommand.substring (0, pt);
this.thisMesh.scriptCommand += script;
return;
}this.thisMesh.title = this.sg.getTitle ();
this.thisMesh.dataType = this.sg.getParams ().dataType;
this.thisMesh.scale3d = this.sg.getParams ().scale3d;
if (script != null) {
if (script.charAt (0) == ' ') {
script = this.myType + " ID " + org.jmol.util.Escape.escapeStr (this.thisMesh.thisID) + script;
pt = script.indexOf ("; isosurface map");
}}if (pt > 0 && this.scriptAppendix.length > 0) this.thisMesh.scriptCommand = script.substring (0, pt) + this.scriptAppendix + script.substring (pt);
 else this.thisMesh.scriptCommand = script + this.scriptAppendix;
if (!this.explicitID && script != null && (pt = script.indexOf ("# ID=")) >= 0) this.thisMesh.thisID = org.jmol.util.Parser.getQuotedStringAt (script, pt);
}, "~S");
Clazz.overrideMethod (c$, "addRequiredFile", 
function (fileName) {
fileName = " # /*file*/\"" + fileName + "\"";
if (this.scriptAppendix.indexOf (fileName) < 0) this.scriptAppendix += fileName;
}, "~S");
Clazz.defineMethod (c$, "setJvxlInfo", 
($fz = function () {
if (this.sg.getJvxlData () !== this.jvxlData || this.sg.getJvxlData () !== this.thisMesh.jvxlData) this.jvxlData = this.thisMesh.jvxlData = this.sg.getJvxlData ();
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getShapeDetail", 
function () {
var V =  new java.util.ArrayList ();
for (var i = 0; i < this.meshCount; i++) {
var info =  new java.util.Hashtable ();
var mesh = this.isomeshes[i];
if (mesh == null || mesh.vertices == null || mesh.vertexCount == 0 && mesh.polygonCount == 0) continue;
this.addMeshInfo (mesh, info);
V.add (info);
}
return V;
});
Clazz.defineMethod (c$, "addMeshInfo", 
function (mesh, info) {
info.put ("ID", (mesh.thisID == null ? "<noid>" : mesh.thisID));
info.put ("vertexCount", Integer.$valueOf (mesh.vertexCount));
if (mesh.calculatedVolume != null) info.put ("volume", mesh.calculatedVolume);
if (mesh.calculatedArea != null) info.put ("area", mesh.calculatedArea);
if (mesh.ptCenter.x != 3.4028235E38) info.put ("center", mesh.ptCenter);
if (mesh.mat4 != null) info.put ("mat4", mesh.mat4);
if (mesh.scale3d != 0) info.put ("scale3d",  new Float (mesh.scale3d));
info.put ("xyzMin", mesh.jvxlData.boundingBox[0]);
info.put ("xyzMax", mesh.jvxlData.boundingBox[1]);
var s = org.jmol.jvxl.data.JvxlCoder.jvxlGetInfo (mesh.jvxlData);
if (s != null) info.put ("jvxlInfo", s.$replace ('\n', ' '));
info.put ("modelIndex", Integer.$valueOf (mesh.modelIndex));
info.put ("color", org.jmol.util.ColorUtil.colorPointFromInt2 (org.jmol.util.Colix.getArgb (mesh.colix)));
if (mesh.colorEncoder != null) info.put ("colorKey", mesh.colorEncoder.getColorKey ());
if (mesh.title != null) info.put ("title", mesh.title);
if (mesh.jvxlData.contourValues != null || mesh.jvxlData.contourValuesUsed != null) info.put ("contours", mesh.getContourList (this.viewer));
}, "org.jmol.shapesurface.IsosurfaceMesh,java.util.Map");
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
return null;
}, "~N");
Clazz.overrideMethod (c$, "getValue", 
function (x, y, z, ptyz) {
return 0;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible) {
if (this.keyXy != null && x >= this.keyXy[0] && y >= this.keyXy[1] && x < this.keyXy[2] && y < this.keyXy[3]) {
this.hoverKey (x, y);
return true;
}if (!this.viewer.getDrawHover ()) return false;
var s = this.findValue (x, y, false, bsVisible);
if (s == null) return false;
if (this.gdata.isDisplayAntialiased ()) {
x <<= 1;
y <<= 1;
}this.viewer.hoverOnPt (x, y, s, this.pickedMesh.thisID, this.pickedPt);
return true;
}, "~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "hoverKey", 
($fz = function (x, y) {
try {
var s;
var f = 1 - 1.0 * (y - this.keyXy[1]) / (this.keyXy[3] - this.keyXy[1]);
if (this.thisMesh.showContourLines) {
var vContours = this.thisMesh.getContours ();
if (vContours == null) {
if (this.thisMesh.jvxlData.contourValues == null) return;
var i = Clazz.doubleToInt (Math.floor (f * this.thisMesh.jvxlData.contourValues.length));
if (i < 0 || i > this.thisMesh.jvxlData.contourValues.length) return;
s = "" + this.thisMesh.jvxlData.contourValues[i];
} else {
var i = Clazz.doubleToInt (Math.floor (f * vContours.length));
if (i < 0 || i > vContours.length) return;
s = "" + (vContours[i].get (2)).floatValue ();
}} else {
var g = this.thisMesh.colorEncoder.quantize (f, true);
f = this.thisMesh.colorEncoder.quantize (f, false);
s = "" + g + " - " + f;
}if (this.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
}this.viewer.hoverOnPt (x, y, s, null, null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.overrideMethod (c$, "checkObjectClicked", 
function (x, y, action, bsVisible) {
if (!(this.viewer.getDrawPicking ())) return null;
if (!this.viewer.isBound (action, 38)) return null;
var dmin2 = 100;
if (this.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
dmin2 <<= 1;
}var imesh = -1;
var jmaxz = -1;
var jminz = -1;
var maxz = -2147483648;
var minz = 2147483647;
var pickFront = this.viewer.getDrawPicking ();
for (var i = 0; i < this.meshCount; i++) {
var m = this.isomeshes[i];
if (!this.isPickable (m, bsVisible)) continue;
var centers = (pickFront ? m.vertices : m.getCenters ());
if (centers == null) continue;
for (var j = centers.length; --j >= 0; ) {
var v = centers[j];
if (v == null) continue;
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
if (this.ptXY.z < minz) {
if (pickFront) imesh = i;
minz = this.ptXY.z;
jminz = j;
}if (this.ptXY.z > maxz) {
if (!pickFront) imesh = i;
maxz = this.ptXY.z;
jmaxz = j;
}}}
}
if (imesh < 0) return null;
this.pickedMesh = this.isomeshes[imesh];
this.setPropertySuper ("thisID", this.pickedMesh.thisID, null);
var iFace = this.pickedVertex = (pickFront ? jminz : jmaxz);
var ptRet =  new org.jmol.util.Point3f ();
ptRet.setT ((pickFront ? this.pickedMesh.vertices[this.pickedVertex] : (this.pickedMesh).centers[iFace]));
this.pickedModel = this.pickedMesh.modelIndex;
this.setStatusPicked (-4, ptRet);
return this.getPickedPoint (ptRet, this.pickedModel);
}, "~N,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "isPickable", 
($fz = function (m, bsVisible) {
return m.visibilityFlags != 0 && (m.modelIndex < 0 || bsVisible.get (m.modelIndex)) && !org.jmol.util.Colix.isColixTranslucent (m.colix);
}, $fz.isPrivate = true, $fz), "org.jmol.shapesurface.IsosurfaceMesh,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "findValue", 
($fz = function (x, y, isPicking, bsVisible) {
var dmin2 = 100;
if (this.gdata.isAntialiased ()) {
x <<= 1;
y <<= 1;
dmin2 <<= 1;
}var pickedVertex = -1;
var pickedContour = null;
var m = null;
for (var i = 0; i < this.meshCount; i++) {
m = this.isomeshes[i];
if (!this.isPickable (m, bsVisible)) continue;
var vs = m.jvxlData.vContours;
var ilast = (m.firstRealVertex < 0 ? 0 : m.firstRealVertex);
var pickedJ = 0;
if (vs != null && vs.length > 0) {
for (var j = 0; j < vs.length; j++) {
var vc = vs[j];
var n = vc.size () - 1;
for (var k = 6; k < n; k++) {
var v = vc.get (k);
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
dmin2 = d2;
pickedContour = vc;
pickedJ = j;
this.pickedMesh = m;
this.pickedPt = v;
}}
}
if (pickedContour != null) return pickedContour.get (2).toString () + (org.jmol.util.Logger.debugging ? " " + pickedJ : "");
} else if (m.jvxlData.jvxlPlane != null && m.vertexValues != null) {
var vertices = (m.mat4 == null && m.scale3d == 0 ? m.vertices : m.getOffsetVertices (m.jvxlData.jvxlPlane));
for (var k = m.vertexCount; --k >= ilast; ) {
var v = vertices[k];
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
dmin2 = d2;
pickedVertex = k;
this.pickedMesh = m;
this.pickedPt = v;
}}
if (pickedVertex != -1) break;
} else if (m.vertexValues != null) {
for (var k = m.vertexCount; --k >= ilast; ) {
var v = m.vertices[k];
var d2 = this.coordinateInRange (x, y, v, dmin2, this.ptXY);
if (d2 >= 0) {
dmin2 = d2;
pickedVertex = k;
this.pickedMesh = m;
this.pickedPt = v;
}}
if (pickedVertex != -1) break;
}}
return (pickedVertex == -1 ? null : (org.jmol.util.Logger.debugging ? "$" + m.thisID + "[" + (pickedVertex + 1) + "] " + m.vertices[pickedVertex] + ": " : m.thisID + ": ") + m.vertexValues[pickedVertex]);
}, $fz.isPrivate = true, $fz), "~N,~N,~B,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getCmd", 
function (index) {
var sb =  new org.jmol.util.StringXBuilder ().append ("\n");
this.getMeshCommand (sb, index);
return (sb.toString ());
}, "~N");
Clazz.defineStatics (c$,
"MAX_OBJECT_CLICK_DISTANCE_SQUARED", 100);
});
// 
//// org\jmol\jvxl\data\JvxlCoder.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.data");
Clazz.load (null, "org.jmol.jvxl.data.JvxlCoder", ["java.lang.Character", "$.Float", "java.util.ArrayList", "org.jmol.io.XmlUtil", "org.jmol.jvxl.data.VolumeData", "org.jmol.util.BitSet", "$.BitSetUtil", "$.Colix", "$.Escape", "$.Logger", "$.Parser", "$.Point3f", "$.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.declareType (org.jmol.jvxl.data, "JvxlCoder");
c$.jvxlGetFile = Clazz.defineMethod (c$, "jvxlGetFile", 
function (volumeData, jvxlData, title) {
var counts = volumeData.getVoxelCounts ();
jvxlData.nPointsX = counts[0];
jvxlData.nPointsY = counts[1];
jvxlData.nPointsZ = counts[2];
jvxlData.jvxlVolumeDataXml = volumeData.setVolumetricXml ();
return org.jmol.jvxl.data.JvxlCoder.jvxlGetFile (jvxlData, null, title, null, true, 1, null, null);
}, "org.jmol.jvxl.data.VolumeData,org.jmol.jvxl.data.JvxlData,~A");
c$.jvxlGetFile = Clazz.defineMethod (c$, "jvxlGetFile", 
function (jvxlData, meshData, title, msg, includeHeader, nSurfaces, state, comment) {
return org.jmol.jvxl.data.JvxlCoder.jvxlGetFileXml (jvxlData, meshData, title, msg, includeHeader, nSurfaces, state, comment);
}, "org.jmol.jvxl.data.JvxlData,org.jmol.jvxl.data.MeshData,~A,~S,~B,~N,~S,~S");
c$.jvxlGetFileXml = Clazz.defineMethod (c$, "jvxlGetFileXml", 
($fz = function (jvxlData, meshData, title, msg, includeHeader, nSurfaces, state, comment) {
var data =  new org.jmol.util.StringXBuilder ();
if ("TRAILERONLY".equals (msg)) {
org.jmol.io.XmlUtil.closeTag (data, "jvxlSurfaceSet");
org.jmol.io.XmlUtil.closeTag (data, "jvxl");
return data.toString ();
}var vertexDataOnly = (meshData != null);
var isHeaderOnly = ("HEADERONLY".equals (msg));
if (includeHeader) {
org.jmol.io.XmlUtil.openDocument (data);
org.jmol.io.XmlUtil.openTagAttr (data, "jvxl", ["version", "2.2", "jmolVersion", jvxlData.version, "xmlns", "http://jmol.org/jvxl_schema", "xmlns:cml", "http://www.xml-cml.org/schema"]);
if (jvxlData.jvxlFileTitle != null) org.jmol.io.XmlUtil.appendCdata (data, "jvxlFileTitle", null, "\n" + jvxlData.jvxlFileTitle);
if (jvxlData.moleculeXml != null) data.append (jvxlData.moleculeXml);
var volumeDataXml = (vertexDataOnly ? null : jvxlData.jvxlVolumeDataXml);
if (volumeDataXml == null) volumeDataXml = ( new org.jmol.jvxl.data.VolumeData ()).setVolumetricXml ();
data.append (volumeDataXml);
org.jmol.io.XmlUtil.openTagAttr (data, "jvxlSurfaceSet", ["count", "" + (nSurfaces > 0 ? nSurfaces : 1)]);
if (isHeaderOnly) return data.toString ();
}var sb;
var type = (vertexDataOnly ? "pmesh" : jvxlData.jvxlPlane == null ? "isosurface" : "plane");
if (jvxlData.jvxlColorData != null && jvxlData.jvxlColorData.length > 0) type = "mapped " + type;
org.jmol.io.XmlUtil.openTagAttr (data, "jvxlSurface", ["type", type]);
data.append (org.jmol.jvxl.data.JvxlCoder.jvxlGetInfoData (jvxlData, vertexDataOnly));
org.jmol.jvxl.data.JvxlCoder.jvxlAppendCommandState (data, comment, state);
if (title != null || msg != null && msg.length > 0) {
sb =  new org.jmol.util.StringXBuilder ();
if (msg != null && msg.length > 0) sb.append (msg).append ("\n");
if (title != null) for (var i = 0; i < title.length; i++) sb.append (title[i]).appendC ('\n');

org.jmol.io.XmlUtil.appendCdata (data, "jvxlSurfaceTitle", null, sb.toString ());
}sb =  new org.jmol.util.StringXBuilder ();
org.jmol.io.XmlUtil.openTagAttr (sb, "jvxlSurfaceData", (vertexDataOnly || jvxlData.jvxlPlane == null ? null : jvxlData.mapLattice == null ? ["plane", org.jmol.util.Escape.escape (jvxlData.jvxlPlane)] : ["plane", org.jmol.util.Escape.escape (jvxlData.jvxlPlane), "maplattice", org.jmol.util.Escape.escapePt (jvxlData.mapLattice)]));
if (vertexDataOnly) {
org.jmol.jvxl.data.JvxlCoder.appendXmlVertexOnlyData (sb, jvxlData, meshData, true);
} else if (jvxlData.jvxlPlane == null) {
if (jvxlData.jvxlEdgeData == null) return "";
org.jmol.jvxl.data.JvxlCoder.appendXmlEdgeData (sb, jvxlData);
org.jmol.jvxl.data.JvxlCoder.appendXmlColorData (sb, "jvxlColorData", jvxlData.jvxlColorData, jvxlData.isJvxlPrecisionColor, jvxlData.valueMappedToRed, jvxlData.valueMappedToBlue);
} else {
org.jmol.jvxl.data.JvxlCoder.appendXmlColorData (sb, "jvxlColorData", jvxlData.jvxlColorData, jvxlData.isJvxlPrecisionColor, jvxlData.valueMappedToRed, jvxlData.valueMappedToBlue);
}org.jmol.jvxl.data.JvxlCoder.appendEncodedBitSetTag (sb, "jvxlInvalidatedVertexData", jvxlData.jvxlExcluded[1], -1, null);
if (jvxlData.excludedVertexCount > 0) {
org.jmol.jvxl.data.JvxlCoder.appendEncodedBitSetTag (sb, "jvxlExcludedVertexData", jvxlData.jvxlExcluded[0], jvxlData.excludedVertexCount, null);
org.jmol.jvxl.data.JvxlCoder.appendEncodedBitSetTag (sb, "jvxlExcludedPlaneData", jvxlData.jvxlExcluded[2], -1, null);
}org.jmol.jvxl.data.JvxlCoder.appendEncodedBitSetTag (sb, "jvxlExcludedTriangleData", jvxlData.jvxlExcluded[3], jvxlData.excludedTriangleCount, null);
org.jmol.io.XmlUtil.closeTag (sb, "jvxlSurfaceData");
var len = sb.length ();
data.appendSB (sb);
if (jvxlData.vContours != null && jvxlData.vContours.length > 0) {
org.jmol.jvxl.data.JvxlCoder.jvxlEncodeContourData (jvxlData.vContours, data);
}if (jvxlData.vertexColorMap != null) {
org.jmol.io.XmlUtil.openTag (data, "jvxlVertexColorData");
for (var entry, $entry = jvxlData.vertexColorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) org.jmol.jvxl.data.JvxlCoder.appendEncodedBitSetTag (data, "jvxlColorMap", entry.getValue (), -1, ["color", entry.getKey ()]);

jvxlData.vertexColorMap = null;
org.jmol.io.XmlUtil.closeTag (data, "jvxlVertexColorData");
}org.jmol.io.XmlUtil.closeTag (data, "jvxlSurface");
if (includeHeader) {
org.jmol.io.XmlUtil.closeTag (data, "jvxlSurfaceSet");
org.jmol.io.XmlUtil.closeTag (data, "jvxl");
}return org.jmol.jvxl.data.JvxlCoder.jvxlSetCompressionRatio (data, jvxlData, len);
}, $fz.isPrivate = true, $fz), "org.jmol.jvxl.data.JvxlData,org.jmol.jvxl.data.MeshData,~A,~S,~B,~N,~S,~S");
c$.appendEncodedBitSetTag = Clazz.defineMethod (c$, "appendEncodedBitSetTag", 
($fz = function (sb, name, bs, count, attribs) {
if (count < 0) count = org.jmol.util.BitSetUtil.cardinalityOf (bs);
if (count == 0) return;
var sb1 =  new org.jmol.util.StringXBuilder ();
sb1.append ("\n ");
org.jmol.jvxl.data.JvxlCoder.jvxlEncodeBitSetBuffer (bs, -1, sb1);
org.jmol.io.XmlUtil.appendTagObj (sb, name, [attribs, "bsEncoding", "base90+35", "count", "" + count, "len", "" + bs.length ()], org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (sb1.toString (), true));
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~S,org.jmol.util.BitSet,~N,~A");
c$.jvxlSetCompressionRatio = Clazz.defineMethod (c$, "jvxlSetCompressionRatio", 
($fz = function (data, jvxlData, len) {
var s = data.toString ();
var r = Clazz.floatToInt (jvxlData.nBytes > 0 ? (jvxlData.nBytes) / len : ((jvxlData.nPointsX * jvxlData.nPointsY * jvxlData.nPointsZ * 13)) / len);
return org.jmol.util.TextFormat.simpleReplace (s, "\"not calculated\"", (r > 0 ? "\"" + r + ":1\"" : "\"?\""));
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,org.jmol.jvxl.data.JvxlData,~N");
c$.appendXmlEdgeData = Clazz.defineMethod (c$, "appendXmlEdgeData", 
($fz = function (sb, jvxlData) {
org.jmol.io.XmlUtil.appendTagObj (sb, "jvxlEdgeData", ["count", "" + (jvxlData.jvxlEdgeData.length - 1), "encoding", "base90f1", "bsEncoding", "base90+35c", "isXLowToHigh", "" + jvxlData.isXLowToHigh, "data", org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (jvxlData.jvxlEdgeData, true)], "\n" + org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (jvxlData.jvxlSurfaceData, true));
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,org.jmol.jvxl.data.JvxlData");
c$.jvxlAppendCommandState = Clazz.defineMethod (c$, "jvxlAppendCommandState", 
($fz = function (data, cmd, state) {
if (cmd != null) org.jmol.io.XmlUtil.appendCdata (data, "jvxlIsosurfaceCommand", null, "\n" + (cmd.indexOf ("#") < 0 ? cmd : cmd.substring (0, cmd.indexOf ("#"))) + "\n");
if (state != null) {
if (state.indexOf ("** XML ** ") >= 0) {
state = org.jmol.util.TextFormat.splitChars (state, "** XML **")[1].trim ();
org.jmol.io.XmlUtil.appendTag (data, "jvxlIsosurfaceState", "\n" + state + "\n");
} else {
org.jmol.io.XmlUtil.appendCdata (data, "jvxlIsosurfaceState", null, "\n" + state);
}}}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~S,~S");
c$.appendXmlColorData = Clazz.defineMethod (c$, "appendXmlColorData", 
($fz = function (sb, key, data, isPrecisionColor, value1, value2) {
var n;
if (data == null || (n = data.length - 1) < 0) return;
if (isPrecisionColor) n /= 2;
org.jmol.io.XmlUtil.appendTagObj (sb, key, ["count", "" + n, "encoding", "base90f" + (isPrecisionColor ? "2" : "1"), "min", "" + value1, "max", "" + value2, "data", org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (data, true)], null);
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~S,~S,~B,~N,~N");
c$.jvxlGetInfo = Clazz.defineMethod (c$, "jvxlGetInfo", 
function (jvxlData) {
return org.jmol.jvxl.data.JvxlCoder.jvxlGetInfoData (jvxlData, jvxlData.vertexDataOnly);
}, "org.jmol.jvxl.data.JvxlData");
c$.jvxlGetInfoData = Clazz.defineMethod (c$, "jvxlGetInfoData", 
function (jvxlData, vertexDataOnly) {
if (jvxlData.jvxlSurfaceData == null) return "";
var attribs =  new java.util.ArrayList ();
var nSurfaceInts = jvxlData.nSurfaceInts;
var bytesUncompressedEdgeData = (vertexDataOnly ? 0 : jvxlData.jvxlEdgeData.length - 1);
var nColorData = (jvxlData.jvxlColorData == null ? -1 : (jvxlData.jvxlColorData.length - 1));
if (!vertexDataOnly) {
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  cutoff", "" + jvxlData.cutoff);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  isCutoffAbsolute", "" + jvxlData.isCutoffAbsolute);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  pointsPerAngstrom", "" + jvxlData.pointsPerAngstrom);
var n = jvxlData.jvxlSurfaceData.length + bytesUncompressedEdgeData + nColorData + 1;
if (n > 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nBytesData", "" + n);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  isXLowToHigh", "" + jvxlData.isXLowToHigh);
if (jvxlData.jvxlPlane == null) {
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nSurfaceInts", "" + nSurfaceInts);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nBytesUncompressedEdgeData", "" + bytesUncompressedEdgeData);
}if (nColorData > 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nBytesUncompressedColorData", "" + nColorData);
}jvxlData.excludedVertexCount = org.jmol.util.BitSetUtil.cardinalityOf (jvxlData.jvxlExcluded[0]);
jvxlData.excludedTriangleCount = org.jmol.util.BitSetUtil.cardinalityOf (jvxlData.jvxlExcluded[3]);
if (jvxlData.excludedVertexCount > 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nExcludedVertexes", "" + jvxlData.excludedVertexCount);
if (jvxlData.excludedTriangleCount > 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nExcludedTriangles", "" + jvxlData.excludedTriangleCount);
var n = org.jmol.util.BitSetUtil.cardinalityOf (jvxlData.jvxlExcluded[1]);
if (n > 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nInvalidatedVertexes", "" + n);
if (jvxlData.slabInfo != null) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  slabInfo", jvxlData.slabInfo);
if (jvxlData.isJvxlPrecisionColor) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  precisionColor", "true");
if (jvxlData.colorDensity) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  colorDensity", "true");
 else if (jvxlData.diameter != 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  diameter", "" + jvxlData.diameter);
if (!jvxlData.allowVolumeRender) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  allowVolumeRender", "false");
if (jvxlData.jvxlPlane == null || vertexDataOnly) {
if (jvxlData.isContoured) {
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  contoured", "true");
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  colorMapped", "true");
} else if (jvxlData.isBicolorMap) {
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  bicolorMap", "true");
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  colorNegative", org.jmol.util.Colix.getHexCode (jvxlData.minColorIndex));
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  colorPositive", org.jmol.util.Colix.getHexCode (jvxlData.maxColorIndex));
} else if (nColorData > 0) {
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  colorMapped", "true");
}if (jvxlData.vContours != null && jvxlData.vContours.length > 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nContourData", "" + jvxlData.vContours.length);
} else {
if (jvxlData.mapLattice != null) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  mapLattice", "" + jvxlData.mapLattice);
if (jvxlData.scale3d != 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  scale3d", "" + jvxlData.scale3d);
if (nColorData > 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  colorMapped", "true");
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  plane", org.jmol.util.Escape.escape (jvxlData.jvxlPlane));
}if (jvxlData.color != null && jvxlData.color.indexOf ("null") < 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  color", jvxlData.color);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  translucency", "" + jvxlData.translucency);
if (jvxlData.meshColor != null) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  meshColor", jvxlData.meshColor);
if (jvxlData.colorScheme != null) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  colorScheme", jvxlData.colorScheme);
if (jvxlData.rendering != null) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  rendering", jvxlData.rendering);
if (jvxlData.thisSet >= 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  set", "" + (jvxlData.thisSet + 1));
if (jvxlData.slabValue != -2147483648) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  slabValue", "" + jvxlData.slabValue);
if (jvxlData.isSlabbable) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  slabbable", "true");
if (jvxlData.nVertexColors > 0) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nVertexColors", "" + jvxlData.nVertexColors);
var min = (jvxlData.mappedDataMin == 3.4028235E38 ? 0 : jvxlData.mappedDataMin);
var blue = (jvxlData.isColorReversed ? jvxlData.valueMappedToRed : jvxlData.valueMappedToBlue);
var red = (jvxlData.isColorReversed ? jvxlData.valueMappedToBlue : jvxlData.valueMappedToRed);
if (jvxlData.jvxlColorData != null && jvxlData.jvxlColorData.length > 0 && !jvxlData.isBicolorMap) {
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  dataMinimum", "" + min);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  dataMaximum", "" + jvxlData.mappedDataMax);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  valueMappedToRed", "" + red);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  valueMappedToBlue", "" + blue);
}if (jvxlData.isContoured) {
if (jvxlData.contourValues == null || jvxlData.contourColixes == null) {
if (jvxlData.vContours == null) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nContours", "" + Math.abs (jvxlData.nContours));
} else {
if (jvxlData.jvxlPlane != null) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  contoured", "true");
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  nContours", "" + jvxlData.contourValues.length);
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  contourValues", org.jmol.util.Escape.escapeAF (jvxlData.contourValuesUsed == null ? jvxlData.contourValues : jvxlData.contourValuesUsed));
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  contourColors", jvxlData.contourColors);
}}if (jvxlData.insideOut) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  insideOut", "true");
if (jvxlData.vertexDataOnly) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  note", "vertex/face data only");
 else if (jvxlData.isXLowToHigh) org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  note", "progressive JVXL+ -- X values read from low(0) to high(" + (jvxlData.nPointsX - 1) + ")");
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  xyzMin", org.jmol.util.Escape.escapePt (jvxlData.boundingBox[0]));
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  xyzMax", org.jmol.util.Escape.escapePt (jvxlData.boundingBox[1]));
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  approximateCompressionRatio", "not calculated");
org.jmol.jvxl.data.JvxlCoder.addAttrib (attribs, "\n  jmolVersion", jvxlData.version);
var info =  new org.jmol.util.StringXBuilder ();
org.jmol.io.XmlUtil.openTagAttr (info, "jvxlSurfaceInfo", attribs.toArray ());
org.jmol.io.XmlUtil.closeTag (info, "jvxlSurfaceInfo");
return info.toString ();
}, "org.jmol.jvxl.data.JvxlData,~B");
c$.addAttrib = Clazz.defineMethod (c$, "addAttrib", 
($fz = function (attribs, name, value) {
attribs.add ([name, value]);
}, $fz.isPrivate = true, $fz), "java.util.List,~S,~S");
c$.jvxlEncodeContourData = Clazz.defineMethod (c$, "jvxlEncodeContourData", 
($fz = function (contours, sb) {
org.jmol.io.XmlUtil.openTagAttr (sb, "jvxlContourData", ["count", "" + contours.length]);
for (var i = 0; i < contours.length; i++) {
if (contours[i].size () < 6) {
continue;
}var nPolygons = (contours[i].get (0)).intValue ();
var sb1 =  new org.jmol.util.StringXBuilder ();
sb1.append ("\n");
var bs = contours[i].get (1);
org.jmol.jvxl.data.JvxlCoder.jvxlEncodeBitSetBuffer (bs, nPolygons, sb1);
org.jmol.io.XmlUtil.appendTagObj (sb, "jvxlContour", ["index", "" + i, "value", "" + contours[i].get (2), "color", org.jmol.util.Escape.escapeColor ((contours[i].get (4))[0]), "count", "" + bs.length (), "encoding", "base90iff1", "bsEncoding", "base90+35c", "data", org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (contours[i].get (5).toString (), true)], org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (sb1.toString (), true));
}
org.jmol.io.XmlUtil.closeTag (sb, "jvxlContourData");
}, $fz.isPrivate = true, $fz), "~A,org.jmol.util.StringXBuilder");
c$.set3dContourVector = Clazz.defineMethod (c$, "set3dContourVector", 
function (v, polygonIndexes, vertices) {
if (v.size () < 6) return;
var fData = v.get (5);
var bs = v.get (1);
var pt = 0;
var nBuf = fData.length ();
var type = 0;
var c1 = ' ';
var c2 = ' ';
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var vertexIndexes = polygonIndexes[i];
while (pt < nBuf && !Character.isDigit (c1 = fData.charAt (pt++))) {
}
type = c1.charCodeAt (0) - 48;
while (pt < nBuf && Character.isWhitespace (c1 = fData.charAt (pt++))) {
}
while (pt < nBuf && Character.isWhitespace (c2 = fData.charAt (pt++))) {
}
var f1 = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (c1.charCodeAt (0), 35, 90, 0);
var f2 = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (c2.charCodeAt (0), 35, 90, 0);
var i1;
var i2;
var i3;
var i4;
if ((type & 1) == 0) {
i1 = vertexIndexes[1];
i2 = i3 = vertexIndexes[2];
i4 = vertexIndexes[0];
} else {
i1 = vertexIndexes[0];
i2 = vertexIndexes[1];
if ((type & 2) != 0) {
i3 = i2;
i4 = vertexIndexes[2];
} else {
i3 = vertexIndexes[2];
i4 = i1;
}}v.add (org.jmol.jvxl.data.JvxlCoder.getContourPoint (vertices, i1, i2, f1));
v.add (org.jmol.jvxl.data.JvxlCoder.getContourPoint (vertices, i3, i4, f2));
}
}, "java.util.List,~A,~A");
c$.getContourPoint = Clazz.defineMethod (c$, "getContourPoint", 
($fz = function (vertices, i, j, f) {
var pt =  new org.jmol.util.Point3f ();
pt.setT (vertices[j]);
pt.sub (vertices[i]);
pt.scale (f);
pt.add (vertices[i]);
return pt;
}, $fz.isPrivate = true, $fz), "~A,~N,~N,~N");
c$.appendContourTriangleIntersection = Clazz.defineMethod (c$, "appendContourTriangleIntersection", 
function (type, f1, f2, fData) {
fData.appendI (type);
fData.appendC (org.jmol.jvxl.data.JvxlCoder.jvxlFractionAsCharacter (f1));
fData.appendC (org.jmol.jvxl.data.JvxlCoder.jvxlFractionAsCharacter (f2));
}, "~N,~N,~N,org.jmol.util.StringXBuilder");
c$.jvxlCreateColorData = Clazz.defineMethod (c$, "jvxlCreateColorData", 
function (jvxlData, vertexValues) {
if (vertexValues == null) {
jvxlData.jvxlColorData = "";
return;
}var writePrecisionColor = jvxlData.isJvxlPrecisionColor;
var doTruncate = jvxlData.isTruncated;
var colorFractionBase = jvxlData.colorFractionBase;
var colorFractionRange = jvxlData.colorFractionRange;
var valueBlue = jvxlData.valueMappedToBlue;
var valueRed = jvxlData.valueMappedToRed;
var vertexCount = (jvxlData.saveVertexCount > 0 ? jvxlData.saveVertexCount : jvxlData.vertexCount);
if (vertexCount > vertexValues.length) System.out.println ("JVXLCODER ERROR");
var min = jvxlData.mappedDataMin;
var max = jvxlData.mappedDataMax;
var list1 =  new org.jmol.util.StringXBuilder ();
var list2 =  new org.jmol.util.StringXBuilder ();
if (vertexValues.length < vertexCount) System.out.println ("JVXLCOLOR OHOHO");
for (var i = 0; i < vertexCount; i++) {
var value = vertexValues[i];
if (Float.isNaN (value)) value = min;
if (doTruncate) value = (value > 0 ? 0.999 : -0.999);
if (writePrecisionColor) org.jmol.jvxl.data.JvxlCoder.jvxlAppendCharacter2 (value, min, max, colorFractionBase, colorFractionRange, list1, list2);
 else list1.appendC (org.jmol.jvxl.data.JvxlCoder.jvxlValueAsCharacter (value, valueRed, valueBlue, colorFractionBase, colorFractionRange));
}
jvxlData.jvxlColorData = list1.appendSB (list2).appendC ('\n').toString ();
}, "org.jmol.jvxl.data.JvxlData,~A");
c$.appendXmlVertexOnlyData = Clazz.defineMethod (c$, "appendXmlVertexOnlyData", 
($fz = function (sb, jvxlData, meshData, escapeXml) {
var vertexIdNew =  Clazz.newIntArray (meshData.vertexCount, 0);
if (org.jmol.jvxl.data.JvxlCoder.appendXmlTriangleData (sb, meshData.polygonIndexes, meshData.polygonCount, meshData.bsSlabDisplay, vertexIdNew, escapeXml)) org.jmol.jvxl.data.JvxlCoder.appendXmlVertexData (sb, jvxlData, vertexIdNew, meshData.vertices, meshData.vertexValues, meshData.vertexCount, meshData.polygonColorData, meshData.polygonCount, meshData.bsSlabDisplay, jvxlData.jvxlColorData.length > 0, escapeXml);
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,org.jmol.jvxl.data.JvxlData,org.jmol.jvxl.data.MeshData,~B");
c$.appendXmlTriangleData = Clazz.defineMethod (c$, "appendXmlTriangleData", 
($fz = function (sb, triangles, nData, bsSlabDisplay, vertexIdNew, escapeXml) {
var list1 =  new org.jmol.util.StringXBuilder ();
var list2 =  new org.jmol.util.StringXBuilder ();
var ilast = 1;
var p = 0;
var inew = 0;
var addPlus = false;
var nTri = 0;
var removeSlabbed = (bsSlabDisplay != null);
for (var i = 0; i < nData; ) {
if (triangles[i] == null || (removeSlabbed && !bsSlabDisplay.get (i))) {
i++;
continue;
}var idata = triangles[i][p];
if (vertexIdNew[idata] > 0) {
idata = vertexIdNew[idata];
} else {
idata = vertexIdNew[idata] = ++inew;
}var diff = idata - ilast;
ilast = idata;
if (diff == 0) {
list1.appendC ('!');
addPlus = false;
} else if (diff > 32) {
if (addPlus) list1.appendC ('+');
list1.appendI (diff);
addPlus = true;
} else if (diff < -32) {
list1.appendI (diff);
addPlus = true;
} else {
list1.appendC (String.fromCharCode (92 + diff));
addPlus = false;
}if (++p % 3 == 0) {
list2.appendI (triangles[i][3]);
p = 0;
i++;
nTri++;
}}
if (list1.length () == 0) return true;
org.jmol.io.XmlUtil.appendTagObj (sb, "jvxlTriangleData", ["count", "" + nTri, "encoding", "jvxltdiff", "data", org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (list1.toString (), escapeXml)], null);
org.jmol.io.XmlUtil.appendTagObj (sb, "jvxlTriangleEdgeData", ["count", "" + nTri, "encoding", "jvxlsc", "data", org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (list2.toString (), escapeXml)], null);
return true;
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,~A,~N,org.jmol.util.BitSet,~A,~B");
c$.appendXmlVertexData = Clazz.defineMethod (c$, "appendXmlVertexData", 
($fz = function (sb, jvxlData, vertexIdNew, vertices, vertexValues, vertexCount, polygonColorData, polygonCount, bsSlabDisplay, addColorData, escapeXml) {
var colorFractionBase = jvxlData.colorFractionBase;
var colorFractionRange = jvxlData.colorFractionRange;
var p;
var min = jvxlData.boundingBox[0];
var max = jvxlData.boundingBox[1];
var list1 =  new org.jmol.util.StringXBuilder ();
var list2 =  new org.jmol.util.StringXBuilder ();
var vertexIdOld = null;
var removeSlabbed = (bsSlabDisplay != null);
if (polygonCount > 0) {
if (removeSlabbed) polygonCount = bsSlabDisplay.cardinality ();
removeSlabbed = false;
vertexIdOld =  Clazz.newIntArray (vertexCount, 0);
for (var i = 0; i < vertexCount; i++) if (vertexIdNew[i] > 0) vertexIdOld[vertexIdNew[i] - 1] = i;

}var n = 0;
for (var i = 0; i < vertexCount; i++) if (!removeSlabbed || bsSlabDisplay.get (i)) {
n++;
p = vertices[(polygonCount == 0 ? i : vertexIdOld[i])];
org.jmol.jvxl.data.JvxlCoder.jvxlAppendCharacter2 (p.x, min.x, max.x, colorFractionBase, colorFractionRange, list1, list2);
org.jmol.jvxl.data.JvxlCoder.jvxlAppendCharacter2 (p.y, min.y, max.y, colorFractionBase, colorFractionRange, list1, list2);
org.jmol.jvxl.data.JvxlCoder.jvxlAppendCharacter2 (p.z, min.z, max.z, colorFractionBase, colorFractionRange, list1, list2);
}
list1.appendSB (list2);
org.jmol.io.XmlUtil.appendTagObj (sb, "jvxlVertexData", ["count", "" + n, "min", org.jmol.util.Escape.escapePt (min), "max", org.jmol.util.Escape.escapePt (max), "encoding", "base90xyz2", "data", org.jmol.jvxl.data.JvxlCoder.jvxlCompressString (list1.toString (), escapeXml)], null);
if (polygonColorData != null) org.jmol.io.XmlUtil.appendTagObj (sb, "jvxlPolygonColorData", ["encoding", "jvxlnc", "count", "" + polygonCount], "\n" + polygonColorData);
if (!addColorData) return;
list1 =  new org.jmol.util.StringXBuilder ();
list2 =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < vertexCount; i++) {
var value = vertexValues[polygonCount == 0 ? i : vertexIdOld[i]];
org.jmol.jvxl.data.JvxlCoder.jvxlAppendCharacter2 (value, jvxlData.mappedDataMin, jvxlData.mappedDataMax, colorFractionBase, colorFractionRange, list1, list2);
}
org.jmol.jvxl.data.JvxlCoder.appendXmlColorData (sb, "jvxlColorData", list1.appendSB (list2).append ("\n").toString (), true, jvxlData.valueMappedToRed, jvxlData.valueMappedToBlue);
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,org.jmol.jvxl.data.JvxlData,~A,~A,~A,~N,~S,~N,org.jmol.util.BitSet,~B,~B");
c$.jvxlFractionAsCharacter = Clazz.defineMethod (c$, "jvxlFractionAsCharacter", 
function (fraction) {
return org.jmol.jvxl.data.JvxlCoder.jvxlFractionAsCharacterRange (fraction, 35, 90);
}, "~N");
c$.jvxlFractionAsCharacterRange = Clazz.defineMethod (c$, "jvxlFractionAsCharacterRange", 
function (fraction, base, range) {
if (fraction > 0.9999) fraction = 0.9999;
 else if (Float.isNaN (fraction)) fraction = 1.0001;
var ich = Clazz.doubleToInt (Math.floor (fraction * range + base));
if (ich < base) return String.fromCharCode (base);
if (ich == 92) return '!';
return String.fromCharCode (ich);
}, "~N,~N,~N");
c$.jvxlAppendCharacter2 = Clazz.defineMethod (c$, "jvxlAppendCharacter2", 
($fz = function (value, min, max, base, range, list1, list2) {
var fraction = (min == max ? value : (value - min) / (max - min));
var ch1 = org.jmol.jvxl.data.JvxlCoder.jvxlFractionAsCharacterRange (fraction, base, range);
list1.appendC (ch1);
fraction -= org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (ch1.charCodeAt (0), base, range, 0);
list2.appendC (org.jmol.jvxl.data.JvxlCoder.jvxlFractionAsCharacterRange (fraction * range, base, range));
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N,org.jmol.util.StringXBuilder,org.jmol.util.StringXBuilder");
c$.jvxlFractionFromCharacter = Clazz.defineMethod (c$, "jvxlFractionFromCharacter", 
function (ich, base, range, fracOffset) {
if (ich == base + range) return NaN;
if (ich < base) ich = 92;
var fraction = (ich - base + fracOffset) / range;
if (fraction < 0) return 0;
if (fraction > 1) return 0.999999;
return fraction;
}, "~N,~N,~N,~N");
c$.jvxlFractionFromCharacter2 = Clazz.defineMethod (c$, "jvxlFractionFromCharacter2", 
function (ich1, ich2, base, range) {
var fraction = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (ich1, base, range, 0);
var remains = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter (ich2, base, range, 0.5);
return fraction + remains / range;
}, "~N,~N,~N,~N");
c$.jvxlValueAsCharacter = Clazz.defineMethod (c$, "jvxlValueAsCharacter", 
function (value, min, max, base, range) {
var fraction = (min == max ? value : (value - min) / (max - min));
return org.jmol.jvxl.data.JvxlCoder.jvxlFractionAsCharacterRange (fraction, base, range);
}, "~N,~N,~N,~N,~N");
c$.jvxlValueFromCharacter2 = Clazz.defineMethod (c$, "jvxlValueFromCharacter2", 
function (ich, ich2, min, max, base, range) {
var fraction = org.jmol.jvxl.data.JvxlCoder.jvxlFractionFromCharacter2 (ich, ich2, base, range);
return (max == min ? fraction : min + fraction * (max - min));
}, "~N,~N,~N,~N,~N,~N");
c$.jvxlEncodeBitSet0 = Clazz.defineMethod (c$, "jvxlEncodeBitSet0", 
function (bs, nPoints, sb) {
var dataCount = 0;
var prevCount = -1;
var nPrev = 0;
if (nPoints < 0) nPoints = bs.length ();
var n = 0;
var isset = false;
var lastPoint = nPoints - 1;
for (var i = 0; i < nPoints; ++i) {
if (isset == bs.get (i)) {
dataCount++;
} else {
if (dataCount == prevCount && i != lastPoint) {
nPrev++;
} else {
if (nPrev > 0) {
sb.appendC (' ').appendI (-nPrev);
nPrev = 0;
n++;
}sb.appendC (' ').appendI (dataCount);
n++;
prevCount = dataCount;
}dataCount = 1;
isset = !isset;
}}
sb.appendC (' ').appendI (dataCount).appendC ('\n');
return n;
}, "org.jmol.util.BitSet,~N,org.jmol.util.StringXBuilder");
c$.jvxlEncodeBitSet = Clazz.defineMethod (c$, "jvxlEncodeBitSet", 
function (bs) {
var sb =  new org.jmol.util.StringXBuilder ();
org.jmol.jvxl.data.JvxlCoder.jvxlEncodeBitSetBuffer (bs, -1, sb);
return sb.toString ();
}, "org.jmol.util.BitSet");
c$.jvxlEncodeBitSetBuffer = Clazz.defineMethod (c$, "jvxlEncodeBitSetBuffer", 
function (bs, nPoints, sb) {
var dataCount = 0;
var n = 0;
var isset = false;
if (nPoints < 0) nPoints = bs.length ();
if (nPoints == 0) return 0;
sb.append ("-");
for (var i = 0; i < nPoints; ++i) {
if (isset == bs.get (i)) {
dataCount++;
} else {
org.jmol.jvxl.data.JvxlCoder.jvxlAppendEncodedNumber (sb, dataCount, 35, 90);
n++;
dataCount = 1;
isset = !isset;
}}
org.jmol.jvxl.data.JvxlCoder.jvxlAppendEncodedNumber (sb, dataCount, 35, 90);
sb.appendC ('\n');
return n;
}, "org.jmol.util.BitSet,~N,org.jmol.util.StringXBuilder");
c$.jvxlAppendEncodedNumber = Clazz.defineMethod (c$, "jvxlAppendEncodedNumber", 
function (sb, n, base, range) {
var isInRange = (n < range);
if (n == 0) sb.appendC (String.fromCharCode (base));
 else if (!isInRange) sb.appendC (String.fromCharCode (base + range));
while (n > 0) {
var n1 = Clazz.doubleToInt (n / range);
var x = base + n - n1 * range;
if (x == 92) x = 33;
sb.appendC (String.fromCharCode (x));
n = n1;
}
if (!isInRange) sb.append (" ");
}, "org.jmol.util.StringXBuilder,~N,~N,~N");
c$.jvxlDecodeBitSetRange = Clazz.defineMethod (c$, "jvxlDecodeBitSetRange", 
function (data, base, range) {
var bs =  new org.jmol.util.BitSet ();
var dataCount = 0;
var ptr = 0;
var isset = false;
var next =  Clazz.newIntArray (1, 0);
while ((dataCount = org.jmol.jvxl.data.JvxlCoder.jvxlParseEncodedInt (data, base, range, next)) != -2147483648) {
if (isset) bs.setBits (ptr, ptr + dataCount);
ptr += dataCount;
isset = !isset;
}
return bs;
}, "~S,~N,~N");
c$.jvxlParseEncodedInt = Clazz.defineMethod (c$, "jvxlParseEncodedInt", 
function (str, offset, base, next) {
var digitSeen = false;
var value = 0;
var ich = next[0];
var ichMax = str.length;
if (ich < 0) return -2147483648;
while (ich < ichMax && Character.isWhitespace (str.charAt (ich))) ++ich;

if (ich >= ichMax) return -2147483648;
var factor = 1;
var isLong = (str.charCodeAt (ich) == (offset + base));
if (isLong) ich++;
while (ich < ichMax && !Character.isWhitespace (str.charAt (ich))) {
var i = str.charCodeAt (ich);
if (i < offset) i = 92;
value += (i - offset) * factor;
digitSeen = true;
++ich;
if (!isLong) break;
factor *= base;
}
if (!digitSeen) value = -2147483648;
next[0] = ich;
return value;
}, "~S,~N,~N,~A");
c$.jvxlDecodeBitSet = Clazz.defineMethod (c$, "jvxlDecodeBitSet", 
function (data) {
if (data.startsWith ("-")) return org.jmol.jvxl.data.JvxlCoder.jvxlDecodeBitSetRange (org.jmol.jvxl.data.JvxlCoder.jvxlUncompressString (data.substring (1)), 35, 90);
var bs =  new org.jmol.util.BitSet ();
var dataCount = 0;
var lastCount = 0;
var nPrev = 0;
var ptr = 0;
var isset = false;
var next =  Clazz.newIntArray (1, 0);
while (true) {
dataCount = (nPrev++ < 0 ? dataCount : org.jmol.util.Parser.parseIntNext (data, next));
if (dataCount == -2147483648) break;
if (dataCount < 0) {
nPrev = dataCount;
dataCount = lastCount;
continue;
}if (isset) bs.setBits (ptr, ptr + dataCount);
ptr += dataCount;
lastCount = dataCount;
isset = !isset;
}
return bs;
}, "~S");
c$.jvxlCompressString = Clazz.defineMethod (c$, "jvxlCompressString", 
function (data, escapeXml) {
if (data.indexOf ("~") >= 0) return data;
var dataOut =  new org.jmol.util.StringXBuilder ();
var chLast = '\u0000';
var escaped = false;
var lastEscaped = false;
var nLast = 0;
var n = data.length;
for (var i = 0; i <= n; i++) {
var ch = (i == n ? '\0' : data.charAt (i));
switch (ch) {
case '\n':
case '\r':
continue;
case '&':
case '<':
escaped = escapeXml;
break;
default:
escaped = false;
}
if (ch == chLast) {
++nLast;
ch = '\0';
} else if (nLast > 0 || lastEscaped) {
if (nLast < 4 && !lastEscaped || chLast == ' ' || chLast == '\t') {
while (--nLast >= 0) dataOut.appendC (chLast);

} else {
if (lastEscaped) lastEscaped = false;
 else dataOut.appendC ('~');
dataOut.appendI (nLast);
dataOut.appendC (' ');
}nLast = 0;
}if (ch != '\0') {
if (escaped) {
lastEscaped = true;
escaped = false;
dataOut.appendC ('~');
chLast = ch;
(ch = String.fromCharCode (ch.charCodeAt (0) - 1));
} else {
chLast = ch;
}dataOut.appendC (ch);
}}
return dataOut.toString ();
}, "~S,~B");
c$.jvxlUncompressString = Clazz.defineMethod (c$, "jvxlUncompressString", 
function (data) {
if (data.indexOf ("~") < 0) return data;
var dataOut =  new org.jmol.util.StringXBuilder ();
var chLast = '\u0000';
var next =  Clazz.newIntArray (1, 0);
for (var i = 0; i < data.length; i++) {
var ch = data.charAt (i);
if (ch == '~') {
next[0] = ++i;
switch (ch = data.charAt (i)) {
case ';':
case '%':
next[0]++;
dataOut.appendC (chLast = (ch = String.fromCharCode (ch.charCodeAt (0) + 1)));
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
var nChar = org.jmol.util.Parser.parseIntNext (data, next);
for (var c = 0; c < nChar; c++) dataOut.appendC (chLast);

i = next[0];
continue;
case '~':
--i;
break;
default:
org.jmol.util.Logger.error ("Error uncompressing string " + data.substring (0, i) + "?");
}
}dataOut.appendC (ch);
chLast = ch;
}
return dataOut.toString ();
}, "~S");
c$.jvxlCreateHeaderWithoutTitleOrAtoms = Clazz.defineMethod (c$, "jvxlCreateHeaderWithoutTitleOrAtoms", 
function (v, bs) {
org.jmol.jvxl.data.JvxlCoder.jvxlCreateHeader (v, bs);
}, "org.jmol.jvxl.data.VolumeData,org.jmol.util.StringXBuilder");
c$.jvxlCreateHeader = Clazz.defineMethod (c$, "jvxlCreateHeader", 
function (v, sb) {
v.setVolumetricXml ();
if (sb.length () == 0) sb.append ("Line 1\nLine 2\n");
}, "org.jmol.jvxl.data.VolumeData,org.jmol.util.StringXBuilder");
Clazz.defineStatics (c$,
"JVXL_VERSION1", "2.0",
"JVXL_VERSION_XML", "2.2",
"CONTOUR_NPOLYGONS", 0,
"CONTOUR_BITSET", 1,
"CONTOUR_VALUE", 2,
"CONTOUR_COLIX", 3,
"CONTOUR_COLOR", 4,
"CONTOUR_FDATA", 5,
"CONTOUR_POINTS", 6,
"defaultEdgeFractionBase", 35,
"defaultEdgeFractionRange", 90,
"defaultColorFractionBase", 35,
"defaultColorFractionRange", 90);
});
// 
//// org\jmol\api\VolumeDataInterface.js 
// 
Clazz.declarePackage ("org.jmol.api");
Clazz.declareInterface (org.jmol.api, "VolumeDataInterface");
// 
//// org\jmol\jvxl\data\VolumeData.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.data");
Clazz.load (["org.jmol.api.VolumeDataInterface", "org.jmol.util.Matrix3f", "$.Point3f", "$.Vector3f"], "org.jmol.jvxl.data.VolumeData", ["java.lang.Float", "java.util.Hashtable", "org.jmol.io.XmlUtil", "org.jmol.util.Escape", "$.Logger", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sr = null;
this.doIterate = true;
this.volumetricOrigin = null;
this.origin = null;
this.volumetricVectors = null;
this.voxelCounts = null;
this.nPoints = 0;
this.voxelData = null;
this.voxelMap = null;
this.volumetricVectorLengths = null;
this.maxVectorLength = 0;
this.minToPlaneDistance = 0;
this.yzCount = 0;
this.unitVolumetricVectors = null;
this.volumetricMatrix = null;
this.inverseMatrix = null;
this.thePlane = null;
this.thePlaneNormalMag = 0;
this.ptXyzTemp = null;
this.xmlData = null;
this.mappingPlane = null;
this.mappingPlaneNormalMag = 0;
this.minGrid = 0;
this.maxGrid = 0;
this.voxelVolume = 0;
this.spanningVectors = null;
this.isPeriodic = false;
this.isSquared = false;
this.edgeVector = null;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.data, "VolumeData", null, org.jmol.api.VolumeDataInterface);
Clazz.prepareFields (c$, function () {
this.volumetricOrigin =  new org.jmol.util.Point3f ();
this.origin =  Clazz.newFloatArray (3, 0);
this.volumetricVectors =  new Array (3);
this.voxelCounts =  Clazz.newIntArray (3, 0);
this.volumetricVectorLengths =  Clazz.newFloatArray (3, 0);
this.unitVolumetricVectors =  new Array (3);
this.volumetricMatrix =  new org.jmol.util.Matrix3f ();
this.inverseMatrix =  new org.jmol.util.Matrix3f ();
this.ptXyzTemp =  new org.jmol.util.Point3f ();
this.edgeVector =  new org.jmol.util.Vector3f ();
this.ptTemp =  new org.jmol.util.Point3f ();
});
Clazz.overrideMethod (c$, "getVoxelData", 
function () {
return this.voxelData;
});
Clazz.overrideMethod (c$, "setVoxelDataAsArray", 
function (voxelData) {
this.voxelData = voxelData;
}, "~A");
Clazz.defineMethod (c$, "hasPlane", 
function () {
return (this.thePlane != null);
});
Clazz.makeConstructor (c$, 
function () {
this.volumetricVectors[0] =  new org.jmol.util.Vector3f ();
this.volumetricVectors[1] =  new org.jmol.util.Vector3f ();
this.volumetricVectors[2] =  new org.jmol.util.Vector3f ();
this.unitVolumetricVectors[0] =  new org.jmol.util.Vector3f ();
this.unitVolumetricVectors[1] =  new org.jmol.util.Vector3f ();
this.unitVolumetricVectors[2] =  new org.jmol.util.Vector3f ();
});
Clazz.defineMethod (c$, "setMappingPlane", 
function (plane) {
this.mappingPlane = plane;
if (plane == null) return;
this.mappingPlaneNormalMag = Math.sqrt (plane.x * plane.x + plane.y * plane.y + plane.z * plane.z);
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "distanceToMappingPlane", 
function (pt) {
return (this.mappingPlane.x * pt.x + this.mappingPlane.y * pt.y + this.mappingPlane.z * pt.z + this.mappingPlane.w) / this.mappingPlaneNormalMag;
}, "org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "setVolumetricOrigin", 
function (x, y, z) {
this.volumetricOrigin.set (x, y, z);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "getOriginFloat", 
function () {
return this.origin;
});
Clazz.defineMethod (c$, "getSpanningVectors", 
function () {
return this.spanningVectors;
});
Clazz.defineMethod (c$, "getYzCount", 
function () {
this.minGrid = this.volumetricVectors[0].length ();
this.minGrid = Math.min (this.minGrid, this.volumetricVectors[1].length ());
this.minGrid = Math.min (this.minGrid, this.volumetricVectors[2].length ());
this.maxGrid = this.volumetricVectors[0].length ();
this.maxGrid = Math.max (this.maxGrid, this.volumetricVectors[1].length ());
this.maxGrid = Math.max (this.maxGrid, this.volumetricVectors[2].length ());
this.nPoints = this.voxelCounts[0] * this.voxelCounts[1] * this.voxelCounts[2];
return this.yzCount = this.voxelCounts[1] * this.voxelCounts[2];
});
Clazz.overrideMethod (c$, "getVolumetricVectorLengths", 
function () {
return this.volumetricVectorLengths;
});
Clazz.overrideMethod (c$, "setVolumetricVector", 
function (i, x, y, z) {
this.volumetricVectors[i].x = x;
this.volumetricVectors[i].y = y;
this.volumetricVectors[i].z = z;
this.setUnitVectors ();
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getVoxelCounts", 
function () {
return this.voxelCounts;
});
Clazz.overrideMethod (c$, "setVoxelCounts", 
function (nPointsX, nPointsY, nPointsZ) {
this.voxelCounts[0] = nPointsX;
this.voxelCounts[1] = nPointsY;
this.voxelCounts[2] = nPointsZ;
return nPointsX * nPointsY * nPointsZ;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getVoxelDataAt", 
function (pt) {
var ix = Clazz.doubleToInt (pt / this.yzCount);
pt -= ix * this.yzCount;
var iy = Clazz.doubleToInt (pt / this.voxelCounts[2]);
var iz = pt - iy * this.voxelCounts[2];
return this.voxelData[ix][iy][iz];
}, "~N");
Clazz.defineMethod (c$, "getPointIndex", 
function (x, y, z) {
return x * this.yzCount + y * this.voxelCounts[2] + z;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getPoint", 
function (ipt, pt) {
var ix = Clazz.doubleToInt (ipt / this.yzCount);
ipt -= ix * this.yzCount;
var iy = Clazz.doubleToInt (ipt / this.voxelCounts[2]);
var iz = ipt - iy * this.voxelCounts[2];
this.voxelPtToXYZ (ix, iy, iz, pt);
}, "~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setVoxelData", 
function (pt, value) {
var ix = Clazz.doubleToInt (pt / this.yzCount);
pt -= ix * this.yzCount;
var iy = Clazz.doubleToInt (pt / this.voxelCounts[2]);
var iz = pt - iy * this.voxelCounts[2];
this.voxelData[ix][iy][iz] = value;
}, "~N,~N");
Clazz.defineMethod (c$, "setVoxelMap", 
function () {
this.voxelMap =  new java.util.Hashtable ();
this.getYzCount ();
});
Clazz.defineMethod (c$, "setMatrix", 
($fz = function () {
for (var i = 0; i < 3; i++) this.volumetricMatrix.setColumnV (i, this.volumetricVectors[i]);

try {
this.inverseMatrix.invertM (this.volumetricMatrix);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("VolumeData error setting matrix -- bad unit vectors? ");
return false;
} else {
throw e;
}
}
return true;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "transform", 
function (v1, v2) {
this.volumetricMatrix.transform2 (v1, v2);
}, "org.jmol.util.Vector3f,org.jmol.util.Vector3f");
Clazz.overrideMethod (c$, "setPlaneParameters", 
function (plane) {
this.thePlane = plane;
this.thePlaneNormalMag = Math.sqrt (plane.x * plane.x + plane.y * plane.y + plane.z * plane.z);
}, "org.jmol.util.Point4f");
Clazz.overrideMethod (c$, "calcVoxelPlaneDistance", 
function (x, y, z) {
this.voxelPtToXYZ (x, y, z, this.ptXyzTemp);
return this.distancePointToPlane (this.ptXyzTemp);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getToPlaneParameter", 
function () {
return (Math.sqrt (this.thePlane.x * this.thePlane.x + this.thePlane.y * this.thePlane.y + this.thePlane.z * this.thePlane.z) * this.minToPlaneDistance);
});
Clazz.defineMethod (c$, "isNearPlane", 
function (x, y, z, toPlaneParameter) {
this.voxelPtToXYZ (x, y, z, this.ptXyzTemp);
return ((this.thePlane.x * this.ptXyzTemp.x + this.thePlane.y * this.ptXyzTemp.y + this.thePlane.z * this.ptXyzTemp.z + this.thePlane.w) < toPlaneParameter);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "distancePointToPlane", 
function (pt) {
return (this.thePlane.x * pt.x + this.thePlane.y * pt.y + this.thePlane.z * pt.z + this.thePlane.w) / this.thePlaneNormalMag;
}, "org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "voxelPtToXYZ", 
function (x, y, z, pt) {
pt.scaleAdd2 (x, this.volumetricVectors[0], this.volumetricOrigin);
pt.scaleAdd2 (y, this.volumetricVectors[1], pt);
pt.scaleAdd2 (z, this.volumetricVectors[2], pt);
}, "~N,~N,~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setUnitVectors", 
function () {
this.maxVectorLength = 0;
this.voxelVolume = 1;
for (var i = 0; i < 3; i++) {
var d = this.volumetricVectorLengths[i] = this.volumetricVectors[i].length ();
if (d == 0) return false;
if (d > this.maxVectorLength) this.maxVectorLength = d;
this.voxelVolume *= d;
this.unitVolumetricVectors[i].setT (this.volumetricVectors[i]);
this.unitVolumetricVectors[i].normalize ();
}
this.minToPlaneDistance = this.maxVectorLength * 2;
this.origin[0] = this.volumetricOrigin.x;
this.origin[1] = this.volumetricOrigin.y;
this.origin[2] = this.volumetricOrigin.z;
this.spanningVectors =  new Array (4);
this.spanningVectors[0] = org.jmol.util.Vector3f.newV (this.volumetricOrigin);
for (var i = 0; i < 3; i++) {
var v = this.spanningVectors[i + 1] =  new org.jmol.util.Vector3f ();
v.scaleAdd2 (this.voxelCounts[i] - 1, this.volumetricVectors[i], v);
}
return this.setMatrix ();
});
Clazz.overrideMethod (c$, "xyzToVoxelPt", 
function (x, y, z, pt3i) {
this.ptXyzTemp.set (x, y, z);
this.ptXyzTemp.sub (this.volumetricOrigin);
this.inverseMatrix.transform (this.ptXyzTemp);
pt3i.set (Math.round (this.ptXyzTemp.x), Math.round (this.ptXyzTemp.y), Math.round (this.ptXyzTemp.z));
}, "~N,~N,~N,org.jmol.util.Point3i");
Clazz.overrideMethod (c$, "lookupInterpolatedVoxelValue", 
function (point) {
if (this.mappingPlane != null) return this.distanceToMappingPlane (point);
if (this.sr != null) {
var v = this.sr.getValueAtPoint (point);
return (this.isSquared ? v * v : v);
}this.ptXyzTemp.sub2 (point, this.volumetricOrigin);
this.inverseMatrix.transform (this.ptXyzTemp);
var iMax;
var xLower = this.indexLower (this.ptXyzTemp.x, iMax = this.voxelCounts[0] - 1);
var xUpper = this.indexUpper (this.ptXyzTemp.x, xLower, iMax);
var yLower = this.indexLower (this.ptXyzTemp.y, iMax = this.voxelCounts[1] - 1);
var yUpper = this.indexUpper (this.ptXyzTemp.y, yLower, iMax);
var zLower = this.indexLower (this.ptXyzTemp.z, iMax = this.voxelCounts[2] - 1);
var zUpper = this.indexUpper (this.ptXyzTemp.z, zLower, iMax);
var v1 = org.jmol.jvxl.data.VolumeData.getFractional2DValue (this.mantissa (this.ptXyzTemp.x - xLower), this.mantissa (this.ptXyzTemp.y - yLower), this.getVoxelValue (xLower, yLower, zLower), this.getVoxelValue (xUpper, yLower, zLower), this.getVoxelValue (xLower, yUpper, zLower), this.getVoxelValue (xUpper, yUpper, zLower));
var v2 = org.jmol.jvxl.data.VolumeData.getFractional2DValue (this.mantissa (this.ptXyzTemp.x - xLower), this.mantissa (this.ptXyzTemp.y - yLower), this.getVoxelValue (xLower, yLower, zUpper), this.getVoxelValue (xUpper, yLower, zUpper), this.getVoxelValue (xLower, yUpper, zUpper), this.getVoxelValue (xUpper, yUpper, zUpper));
return v1 + this.mantissa (this.ptXyzTemp.z - zLower) * (v2 - v1);
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "mantissa", 
($fz = function (f) {
return (this.isPeriodic ? f - Math.floor (f) : f);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getVoxelValue", 
function (x, y, z) {
if (this.voxelMap == null) return this.voxelData[x][y][z];
var f = this.voxelMap.get ( new Integer (this.getPointIndex (x, y, z)));
return (f == null ? NaN : f.floatValue ());
}, "~N,~N,~N");
c$.getFractional2DValue = Clazz.defineMethod (c$, "getFractional2DValue", 
function (fx, fy, x11, x12, x21, x22) {
var v1 = x11 + fx * (x12 - x11);
var v2 = x21 + fx * (x22 - x21);
return v1 + fy * (v2 - v1);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "indexLower", 
($fz = function (x, xMax) {
if (this.isPeriodic && xMax > 0) {
while (x < 0) x += xMax;

while (x >= xMax) x -= xMax;

return Clazz.doubleToInt (Math.floor (x));
}if (x < 0) return 0;
var floor = Clazz.doubleToInt (Math.floor (x));
return (floor > xMax ? xMax : floor);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "indexUpper", 
($fz = function (x, xLower, xMax) {
return (!this.isPeriodic && x < 0 || xLower == xMax ? xLower : xLower + 1);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "offsetCenter", 
function (center) {
var pt =  new org.jmol.util.Point3f ();
pt.scaleAdd2 ((this.voxelCounts[0] - 1) / 2, this.volumetricVectors[0], pt);
pt.scaleAdd2 ((this.voxelCounts[1] - 1) / 2, this.volumetricVectors[1], pt);
pt.scaleAdd2 ((this.voxelCounts[2] - 1) / 2, this.volumetricVectors[2], pt);
this.volumetricOrigin.sub2 (center, pt);
}, "org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "setDataDistanceToPlane", 
function (plane) {
this.setPlaneParameters (plane);
var nx = this.voxelCounts[0];
var ny = this.voxelCounts[1];
var nz = this.voxelCounts[2];
this.voxelData =  Clazz.newFloatArray (nx, ny, nz, 0);
for (var x = 0; x < nx; x++) for (var y = 0; y < ny; y++) for (var z = 0; z < nz; z++) this.voxelData[x][y][z] = this.calcVoxelPlaneDistance (x, y, z);



}, "org.jmol.util.Point4f");
Clazz.overrideMethod (c$, "filterData", 
function (isSquared, invertCutoff) {
var doInvert = (!Float.isNaN (invertCutoff));
if (this.sr != null) {
this.isSquared = isSquared;
return;
}var nx = this.voxelCounts[0];
var ny = this.voxelCounts[1];
var nz = this.voxelCounts[2];
if (isSquared) for (var x = 0; x < nx; x++) for (var y = 0; y < ny; y++) for (var z = 0; z < nz; z++) this.voxelData[x][y][z] *= this.voxelData[x][y][z];



if (doInvert) for (var x = 0; x < nx; x++) for (var y = 0; y < ny; y++) for (var z = 0; z < nz; z++) this.voxelData[x][y][z] = invertCutoff - this.voxelData[x][y][z];



}, "~B,~N");
Clazz.overrideMethod (c$, "capData", 
function (plane, cutoff) {
if (this.voxelData == null) return;
var nx = this.voxelCounts[0];
var ny = this.voxelCounts[1];
var nz = this.voxelCounts[2];
var normal = org.jmol.util.Vector3f.new3 (plane.x, plane.y, plane.z);
normal.normalize ();
var f = 1;
for (var x = 0; x < nx; x++) for (var y = 0; y < ny; y++) for (var z = 0; z < nz; z++) {
var value = this.voxelData[x][y][z] - cutoff;
this.voxelPtToXYZ (x, y, z, this.ptXyzTemp);
var d = (this.ptXyzTemp.x * normal.x + this.ptXyzTemp.y * normal.y + this.ptXyzTemp.z * normal.z + plane.w - cutoff) / f;
if (d >= 0 || d > value) this.voxelData[x][y][z] = d;
}


}, "org.jmol.util.Point4f,~N");
Clazz.defineMethod (c$, "setVolumetricXml", 
function () {
var sb =  new org.jmol.util.StringXBuilder ();
if (this.voxelCounts[0] == 0) {
org.jmol.io.XmlUtil.appendTag (sb, "jvxlVolumeData", null);
} else {
org.jmol.io.XmlUtil.openTagAttr (sb, "jvxlVolumeData", ["origin", org.jmol.util.Escape.escapePt (this.volumetricOrigin)]);
for (var i = 0; i < 3; i++) org.jmol.io.XmlUtil.appendTag (sb, "jvxlVolumeVector", ["type", "" + i, "count", "" + this.voxelCounts[i], "vector", org.jmol.util.Escape.escapePt (this.volumetricVectors[i])]);

org.jmol.io.XmlUtil.closeTag (sb, "jvxlVolumeData");
}return this.xmlData = sb.toString ();
});
Clazz.defineMethod (c$, "setVoxelMapValue", 
function (x, y, z, v) {
if (this.voxelMap == null) return;
this.voxelMap.put ( new Integer (this.getPointIndex (x, y, z)), Float.$valueOf (v));
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "calculateFractionalPoint", 
function (cutoff, pointA, pointB, valueA, valueB, pt) {
var d = (valueB - valueA);
var fraction = (cutoff - valueA) / d;
this.edgeVector.sub2 (pointB, pointA);
pt.scaleAdd2 (fraction, this.edgeVector, pointA);
if (this.sr == null || !this.doIterate || valueB == valueA || fraction < 0.01 || fraction > 0.99 || (this.edgeVector.length ()) < 0.01) return cutoff;
var n = 0;
this.ptTemp.setT (pt);
var v = this.lookupInterpolatedVoxelValue (this.ptTemp);
var v0 = NaN;
while (++n < 10) {
var fnew = (v - valueA) / d;
if (fnew < 0 || fnew > 1) break;
var diff = (cutoff - v) / d / 2;
fraction += diff;
if (fraction < 0 || fraction > 1) break;
pt.setT (this.ptTemp);
v0 = v;
if (Math.abs (diff) < 0.005) break;
this.ptTemp.scaleAdd2 (diff, this.edgeVector, pt);
v = this.lookupInterpolatedVoxelValue (this.ptTemp);
}
return v0;
}, "~N,org.jmol.util.Point3f,org.jmol.util.Point3f,~N,~N,org.jmol.util.Point3f");
});
// 
//// org\jmol\jvxl\data\JvxlData.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.data");
Clazz.load (null, "org.jmol.jvxl.data.JvxlData", ["java.lang.Float", "org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.wasJvxl = false;
this.wasCubic = false;
this.jvxlFileTitle = null;
this.jvxlFileMessage = null;
this.jvxlSurfaceData = null;
this.jvxlEdgeData = null;
this.jvxlColorData = null;
this.jvxlVolumeDataXml = null;
this.jvxlExcluded = null;
this.jvxlPlane = null;
this.isJvxlPrecisionColor = false;
this.jvxlDataIsColorMapped = false;
this.jvxlDataIs2dContour = false;
this.jvxlDataIsColorDensity = false;
this.isColorReversed = false;
this.thisSet = -1;
this.edgeFractionBase = 35;
this.edgeFractionRange = 90;
this.colorFractionBase = 35;
this.colorFractionRange = 90;
this.dataXYReversed = false;
this.insideOut = false;
this.isXLowToHigh = false;
this.isContoured = false;
this.isBicolorMap = false;
this.isTruncated = false;
this.isCutoffAbsolute = false;
this.vertexDataOnly = false;
this.mappedDataMin = 0;
this.mappedDataMax = 0;
this.valueMappedToRed = 0;
this.valueMappedToBlue = 0;
this.cutoff = 0;
this.pointsPerAngstrom = 0;
this.nPointsX = 0;
this.nPointsY = 0;
this.nPointsZ = 0;
this.nBytes = 0;
this.nContours = 0;
this.nEdges = 0;
this.nSurfaceInts = 0;
this.vertexCount = 0;
this.vContours = null;
this.contourColixes = null;
this.contourColors = null;
this.contourValues = null;
this.contourValuesUsed = null;
this.scale3d = 0;
this.minColorIndex = -1;
this.maxColorIndex = 0;
this.title = null;
this.version = null;
this.boundingBox = null;
this.excludedTriangleCount = 0;
this.excludedVertexCount = 0;
this.colorDensity = false;
this.moleculeXml = null;
this.dataMin = 0;
this.dataMax = 0;
this.saveVertexCount = 0;
this.vertexColorMap = null;
this.nVertexColors = 0;
this.color = null;
this.meshColor = null;
this.translucency = 0;
this.colorScheme = null;
this.rendering = null;
this.slabValue = -2147483648;
this.isSlabbable = false;
this.diameter = 0;
this.slabInfo = null;
this.allowVolumeRender = false;
this.voxelVolume = 0;
this.mapLattice = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.data, "JvxlData");
Clazz.prepareFields (c$, function () {
this.jvxlExcluded =  new Array (4);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "clear", 
function () {
this.allowVolumeRender = true;
this.jvxlSurfaceData = "";
this.jvxlEdgeData = "";
this.jvxlColorData = "";
this.jvxlVolumeDataXml = "";
this.color = null;
this.colorScheme = null;
this.colorDensity = false;
this.contourValues = null;
this.contourValuesUsed = null;
this.contourColixes = null;
this.contourColors = null;
this.isSlabbable = false;
this.mapLattice = null;
this.meshColor = null;
this.nPointsX = 0;
this.nVertexColors = 0;
this.slabInfo = null;
this.slabValue = -2147483648;
this.thisSet = -1;
this.rendering = null;
this.translucency = 0;
this.vContours = null;
this.vertexColorMap = null;
this.voxelVolume = 0;
});
Clazz.defineMethod (c$, "setSurfaceInfo", 
function (thePlane, mapLattice, nSurfaceInts, surfaceData) {
this.jvxlSurfaceData = surfaceData;
if (this.jvxlSurfaceData.indexOf ("--") == 0) this.jvxlSurfaceData = this.jvxlSurfaceData.substring (2);
this.jvxlPlane = thePlane;
this.mapLattice = mapLattice;
this.nSurfaceInts = nSurfaceInts;
}, "org.jmol.util.Point4f,org.jmol.util.Point3f,~N,~S");
Clazz.defineMethod (c$, "setSurfaceInfoFromBitSet", 
function (bs, thePlane) {
this.setSurfaceInfoFromBitSetPts (bs, thePlane, null);
}, "org.jmol.util.BitSet,org.jmol.util.Point4f");
Clazz.defineMethod (c$, "setSurfaceInfoFromBitSetPts", 
function (bs, thePlane, mapLattice) {
var sb =  new org.jmol.util.StringXBuilder ();
var nSurfaceInts = (thePlane != null ? 0 : org.jmol.jvxl.data.JvxlCoder.jvxlEncodeBitSetBuffer (bs, this.nPointsX * this.nPointsY * this.nPointsZ, sb));
this.setSurfaceInfo (thePlane, mapLattice, nSurfaceInts, sb.toString ());
}, "org.jmol.util.BitSet,org.jmol.util.Point4f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "jvxlUpdateInfo", 
function (title, nBytes) {
this.title = title;
this.nBytes = nBytes;
}, "~A,~N");
c$.updateSurfaceData = Clazz.defineMethod (c$, "updateSurfaceData", 
function (edgeData, vertexValues, vertexCount, vertexIncrement, isNaN) {
if (edgeData.length == 0) return "";
var chars = edgeData.toCharArray ();
for (var i = 0, ipt = 0; i < vertexCount; i += vertexIncrement, ipt++) if (Float.isNaN (vertexValues[i])) chars[ipt] = isNaN;

return String.copyValueOf (chars);
}, "~S,~A,~N,~N,~S");
});
// 
//// org\jmol\jvxl\data\MeshData.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.data");
Clazz.load (["org.jmol.util.MeshSurface"], "org.jmol.jvxl.data.MeshData", ["java.lang.Float", "java.util.Arrays", "org.jmol.util.ArrayUtil", "$.BitSet", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.setsSuccessful = false;
this.vertexIncrement = 1;
this.polygonColorData = null;
if (!Clazz.isClassDefined ("org.jmol.jvxl.data.MeshData.SSet")) {
org.jmol.jvxl.data.MeshData.$MeshData$SSet$ ();
}
if (!Clazz.isClassDefined ("org.jmol.jvxl.data.MeshData.SortSet")) {
org.jmol.jvxl.data.MeshData.$MeshData$SortSet$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.data, "MeshData", org.jmol.util.MeshSurface);
Clazz.defineMethod (c$, "addVertexCopy", 
function (vertex, value, assocVertex) {
if (assocVertex < 0) this.vertexIncrement = -assocVertex;
return this.addVertexCopyVal (vertex, value);
}, "org.jmol.util.Point3f,~N,~N");
Clazz.defineMethod (c$, "getSurfaceSet", 
function () {
return (this.surfaceSet == null ? this.getSurfaceSetForLevel (0) : this.surfaceSet);
});
Clazz.defineMethod (c$, "getSurfaceSetForLevel", 
function (level) {
if (level == 0) {
this.surfaceSet =  new Array (100);
this.nSets = 0;
}this.setsSuccessful = true;
for (var i = 0; i < this.polygonCount; i++) if (this.polygonIndexes[i] != null) {
if (this.bsSlabDisplay != null && !this.bsSlabDisplay.get (i)) continue;
var p = this.polygonIndexes[i];
var pt0 = this.findSet (p[0]);
var pt1 = this.findSet (p[1]);
var pt2 = this.findSet (p[2]);
if (pt0 < 0 && pt1 < 0 && pt2 < 0) {
this.createSet (p[0], p[1], p[2]);
continue;
}if (pt0 == pt1 && pt1 == pt2) continue;
if (pt0 >= 0) {
this.surfaceSet[pt0].set (p[1]);
this.surfaceSet[pt0].set (p[2]);
if (pt1 >= 0 && pt1 != pt0) this.mergeSets (pt0, pt1);
if (pt2 >= 0 && pt2 != pt0 && pt2 != pt1) this.mergeSets (pt0, pt2);
continue;
}if (pt1 >= 0) {
this.surfaceSet[pt1].set (p[0]);
this.surfaceSet[pt1].set (p[2]);
if (pt2 >= 0 && pt2 != pt1) this.mergeSets (pt1, pt2);
continue;
}this.surfaceSet[pt2].set (p[0]);
this.surfaceSet[pt2].set (p[1]);
}
var n = 0;
for (var i = 0; i < this.nSets; i++) if (this.surfaceSet[i] != null) n++;

var temp =  new Array (this.surfaceSet.length);
n = 0;
for (var i = 0; i < this.nSets; i++) if (this.surfaceSet[i] != null) temp[n++] = this.surfaceSet[i];

this.nSets = n;
this.surfaceSet = temp;
if (!this.setsSuccessful && level < 2) this.getSurfaceSetForLevel (level + 1);
if (level == 0) {
this.sortSurfaceSets ();
this.setVertexSets (false);
}return this.surfaceSet;
}, "~N");
Clazz.defineMethod (c$, "sortSurfaceSets", 
($fz = function () {
var sets =  new Array (this.nSets);
for (var i = 0; i < this.nSets; i++) sets[i] = Clazz.innerTypeInstance (org.jmol.jvxl.data.MeshData.SSet, this, null, this.surfaceSet[i]);

java.util.Arrays.sort (sets, Clazz.innerTypeInstance (org.jmol.jvxl.data.MeshData.SortSet, this, null));
for (var i = 0; i < this.nSets; i++) this.surfaceSet[i] = sets[i].bs;

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setVertexSets", 
function (onlyIfNull) {
if (this.surfaceSet == null) return;
var nNull = 0;
for (var i = 0; i < this.nSets; i++) {
if (this.surfaceSet[i] != null && this.surfaceSet[i].cardinality () == 0) this.surfaceSet[i] = null;
if (this.surfaceSet[i] == null) nNull++;
}
if (nNull > 0) {
var bsNew =  new Array (this.nSets - nNull);
for (var i = 0, n = 0; i < this.nSets; i++) if (this.surfaceSet[i] != null) bsNew[n++] = this.surfaceSet[i];

this.surfaceSet = bsNew;
this.nSets -= nNull;
} else if (onlyIfNull) {
return;
}this.vertexSets =  Clazz.newIntArray (this.vertexCount, 0);
for (var i = 0; i < this.nSets; i++) for (var j = this.surfaceSet[i].nextSetBit (0); j >= 0; j = this.surfaceSet[i].nextSetBit (j + 1)) this.vertexSets[j] = i;


}, "~B");
Clazz.defineMethod (c$, "findSet", 
($fz = function (vertex) {
for (var i = 0; i < this.nSets; i++) if (this.surfaceSet[i] != null && this.surfaceSet[i].get (vertex)) return i;

return -1;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "createSet", 
($fz = function (v1, v2, v3) {
var i;
for (i = 0; i < this.nSets; i++) if (this.surfaceSet[i] == null) break;

if (i == this.surfaceSet.length) this.surfaceSet = org.jmol.util.ArrayUtil.ensureLength (this.surfaceSet, this.surfaceSet.length + 100);
this.surfaceSet[i] =  new org.jmol.util.BitSet ();
this.surfaceSet[i].set (v1);
this.surfaceSet[i].set (v2);
this.surfaceSet[i].set (v3);
if (i == this.nSets) this.nSets++;
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "mergeSets", 
($fz = function (a, b) {
this.surfaceSet[a].or (this.surfaceSet[b]);
this.surfaceSet[b] = null;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "invalidateSurfaceSet", 
function (i) {
for (var j = this.surfaceSet[i].nextSetBit (0); j >= 0; j = this.surfaceSet[i].nextSetBit (j + 1)) this.vertexValues[j] = NaN;

this.surfaceSet[i] = null;
}, "~N");
c$.checkCutoff = Clazz.defineMethod (c$, "checkCutoff", 
function (iA, iB, iC, vertexValues) {
if (iA < 0 || iB < 0 || iC < 0) return false;
var val1 = vertexValues[iA];
var val2 = vertexValues[iB];
var val3 = vertexValues[iC];
return (val1 >= 0 && val2 >= 0 && val3 >= 0 || val1 <= 0 && val2 <= 0 && val3 <= 0);
}, "~N,~N,~N,~A");
Clazz.defineMethod (c$, "calculateVolumeOrArea", 
function (thisSet, isArea, getSets) {
if (getSets) this.getSurfaceSet ();
var justOne = (this.nSets == 0 || thisSet >= 0);
var n = (justOne ? 1 : this.nSets);
var v =  Clazz.newDoubleArray (n, 0);
var vAB =  new org.jmol.util.Vector3f ();
var vAC =  new org.jmol.util.Vector3f ();
var vTemp =  new org.jmol.util.Vector3f ();
for (var i = this.polygonCount; --i >= 0; ) {
if (!this.setABC (i)) continue;
var iSet = (this.nSets == 0 ? 0 : this.vertexSets[this.iA]);
if (thisSet >= 0 && iSet != thisSet) continue;
if (isArea) {
vAB.sub2 (this.vertices[this.iB], this.vertices[this.iA]);
vAC.sub2 (this.vertices[this.iC], this.vertices[this.iA]);
vTemp.cross (vAB, vAC);
v[justOne ? 0 : iSet] += vTemp.length ();
} else {
vAB.setT (this.vertices[this.iB]);
vAC.setT (this.vertices[this.iC]);
vTemp.cross (vAB, vAC);
vAC.setT (this.vertices[this.iA]);
v[justOne ? 0 : iSet] += vAC.dot (vTemp);
}}
var factor = (isArea ? 2 : 6);
for (var i = 0; i < n; i++) v[i] /= factor;

if (justOne && thisSet != -2147483648) return Float.$valueOf (v[0]);
return v;
}, "~N,~B,~B");
Clazz.defineMethod (c$, "updateInvalidatedVertices", 
function (bs) {
bs.clearAll ();
for (var i = 0, ipt = 0; i < this.vertexCount; i += this.vertexIncrement, ipt++) if (Float.isNaN (this.vertexValues[i])) bs.set (i);

}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "invalidateVertices", 
function (bsInvalid) {
for (var i = bsInvalid.nextSetBit (0); i >= 0; i = bsInvalid.nextSetBit (i + 1)) this.vertexValues[i] = NaN;

}, "org.jmol.util.BitSet");
c$.$MeshData$SSet$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.bs = null;
this.n = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.data.MeshData, "SSet");
Clazz.makeConstructor (c$, 
function (a) {
this.bs = a;
this.n = a.cardinality ();
}, "org.jmol.util.BitSet");
c$ = Clazz.p0p ();
};
c$.$MeshData$SortSet$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.data.MeshData, "SortSet", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (a.n > b.n ? -1 : a.n < b.n ? 1 : 0);
}, "org.jmol.jvxl.data.MeshData.SSet,org.jmol.jvxl.data.MeshData.SSet");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"MODE_GET_VERTICES", 1,
"MODE_GET_COLOR_INDEXES", 2,
"MODE_PUT_SETS", 3,
"MODE_PUT_VERTICES", 4);
});
// 
//// org\jmol\jvxl\readers\SurfaceGenerator.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.util.Point3f", "$.Vector3f"], "org.jmol.jvxl.readers.SurfaceGenerator", ["java.io.BufferedReader", "$.StringReader", "java.lang.Float", "org.jmol.io.JmolBinary", "org.jmol.jvxl.data.JvxlCoder", "$.JvxlData", "$.MeshData", "$.VolumeData", "org.jmol.jvxl.readers.Parameters", "$.SurfaceReader", "org.jmol.util.ArrayUtil", "$.BitSet", "$.Escape", "$.Logger", "$.Measure", "$.Parser", "$.Point4f", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.jvxlData = null;
this.meshData = null;
this.params = null;
this.volumeData = null;
this.meshDataServer = null;
this.atomDataServer = null;
this.marchingSquares = null;
this.version = null;
this.$isValid = true;
this.fileType = null;
this.os = null;
this.surfaceReader = null;
this.colorPtr = 0;
this.vAC = null;
this.vAB = null;
this.vNorm = null;
this.ptRef = null;
this.bsVdw = null;
this.readerData = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "SurfaceGenerator");
Clazz.prepareFields (c$, function () {
this.vAC =  new org.jmol.util.Vector3f ();
this.vAB =  new org.jmol.util.Vector3f ();
this.vNorm =  new org.jmol.util.Vector3f ();
this.ptRef = org.jmol.util.Point3f.new3 (0, 0, 1e15);
});
Clazz.defineMethod (c$, "isValid", 
function () {
return this.$isValid;
});
Clazz.defineMethod (c$, "getFileType", 
function () {
return this.fileType;
});
Clazz.defineMethod (c$, "setVersion", 
function (version) {
this.version = version;
}, "~S");
Clazz.makeConstructor (c$, 
function (atomDataServer, meshDataServer, meshData, jvxlData) {
this.atomDataServer = atomDataServer;
this.meshDataServer = meshDataServer;
this.params =  new org.jmol.jvxl.readers.Parameters ();
this.meshData = (meshData == null ?  new org.jmol.jvxl.data.MeshData () : meshData);
this.jvxlData = (jvxlData == null ?  new org.jmol.jvxl.data.JvxlData () : jvxlData);
this.volumeData =  new org.jmol.jvxl.data.VolumeData ();
this.initializeIsosurface ();
}, "org.jmol.atomdata.AtomDataServer,org.jmol.jvxl.api.MeshDataServer,org.jmol.jvxl.data.MeshData,org.jmol.jvxl.data.JvxlData");
Clazz.defineMethod (c$, "isStateDataRead", 
function () {
return this.params.state == 2;
});
Clazz.defineMethod (c$, "getFileName", 
function () {
return this.params.fileName;
});
Clazz.defineMethod (c$, "getMeshDataServer", 
function () {
return this.meshDataServer;
});
Clazz.defineMethod (c$, "getAtomDataServer", 
function () {
return this.atomDataServer;
});
Clazz.defineMethod (c$, "getColorEncoder", 
function () {
return this.params.colorEncoder;
});
Clazz.defineMethod (c$, "getVertexSource", 
function () {
return this.params.vertexSource;
});
Clazz.defineMethod (c$, "setJvxlData", 
function (jvxlData) {
this.jvxlData = jvxlData;
if (jvxlData != null) jvxlData.version = this.version;
}, "org.jmol.jvxl.data.JvxlData");
Clazz.defineMethod (c$, "getJvxlData", 
function () {
return this.jvxlData;
});
Clazz.defineMethod (c$, "getMeshData", 
function () {
return this.meshData;
});
Clazz.defineMethod (c$, "setMarchingSquares", 
function (marchingSquares) {
this.marchingSquares = marchingSquares;
}, "org.jmol.jvxl.calc.MarchingSquares");
Clazz.defineMethod (c$, "getMarchingSquares", 
function () {
return this.marchingSquares;
});
Clazz.defineMethod (c$, "getParams", 
function () {
return this.params;
});
Clazz.defineMethod (c$, "getScript", 
function () {
return this.params.script;
});
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.params.title;
});
Clazz.defineMethod (c$, "getBsSelected", 
function () {
return this.params.bsSelected;
});
Clazz.defineMethod (c$, "getBsIgnore", 
function () {
return this.params.bsIgnore;
});
Clazz.defineMethod (c$, "getVolumeData", 
function () {
return this.volumeData;
});
Clazz.defineMethod (c$, "getPlane", 
function () {
return this.params.thePlane;
});
Clazz.defineMethod (c$, "getColor", 
function (which) {
switch (which) {
case -1:
return this.params.colorNeg;
case 1:
return this.params.colorPos;
}
return 0;
}, "~N");
Clazz.defineMethod (c$, "setModelIndex", 
function (modelIndex) {
this.params.modelIndex = modelIndex;
}, "~N");
Clazz.defineMethod (c$, "getIAddGridPoints", 
function () {
return this.params.iAddGridPoints;
});
Clazz.defineMethod (c$, "getIsPositiveOnly", 
function () {
return this.params.isPositiveOnly;
});
Clazz.defineMethod (c$, "isInsideOut", 
function () {
return this.params.insideOut != this.params.dataXYReversed;
});
Clazz.defineMethod (c$, "getCutoff", 
function () {
return this.params.cutoff;
});
Clazz.defineMethod (c$, "getMoData", 
function () {
return this.params.moData;
});
Clazz.defineMethod (c$, "isCubeData", 
function () {
return this.jvxlData.wasCubic;
});
Clazz.defineMethod (c$, "setParameter", 
function (propertyName, value) {
return this.setParameter (propertyName, value, null);
}, "~S,~O");
Clazz.defineMethod (c$, "setParameter", 
function (propertyName, value, bs) {
if ("debug" === propertyName) {
var TF = (value).booleanValue ();
this.params.logMessages = TF;
this.params.logCube = TF;
return true;
}if ("init" === propertyName) {
this.initializeIsosurface ();
if (Clazz.instanceOf (value, org.jmol.jvxl.readers.Parameters)) {
this.params = value;
} else {
this.params.script = value;
if (this.params.script != null && this.params.script.indexOf (";#") >= 0) {
this.params.script = org.jmol.util.TextFormat.simpleReplace (this.params.script, ";#", "; #");
}}return false;
}if ("map" === propertyName) {
this.params.resetForMapping ((value).booleanValue ());
if (this.surfaceReader != null) this.surfaceReader.minMax = null;
return true;
}if ("finalize" === propertyName) {
this.initializeIsosurface ();
return true;
}if ("clear" === propertyName) {
if (this.surfaceReader != null) this.surfaceReader.discardTempData (true);
return false;
}if ("fileIndex" === propertyName) {
this.params.fileIndex = (value).intValue ();
if (this.params.fileIndex < 1) this.params.fileIndex = 1;
this.params.readAllData = false;
return true;
}if ("blockData" === propertyName) {
this.params.blockCubeData = (value).booleanValue ();
return true;
}if ("withinPoints" === propertyName) {
this.params.boundingBox = (value)[1];
return true;
}if ("boundingBox" === propertyName) {
var pts = value;
this.params.boundingBox = [org.jmol.util.Point3f.newP (pts[0]), org.jmol.util.Point3f.newP (pts[pts.length - 1])];
return true;
}if ("func" === propertyName) {
this.params.func = value;
return true;
}if ("intersection" === propertyName) {
this.params.intersection = value;
return true;
}if ("bsSolvent" === propertyName) {
this.params.bsSolvent = value;
return true;
}if ("select" === propertyName) {
this.params.bsSelected = value;
return true;
}if ("ignore" === propertyName) {
this.params.bsIgnore = value;
return true;
}if ("propertySmoothing" === propertyName) {
this.params.propertySmoothing = (value).booleanValue ();
return true;
}if ("propertyDistanceMax" === propertyName) {
this.params.propertyDistanceMax = (value).floatValue ();
return true;
}if ("propertySmoothingPower" === propertyName) {
this.params.propertySmoothingPower = (value).intValue ();
return true;
}if ("title" === propertyName) {
if (value == null) {
this.params.title = null;
return true;
} else if (org.jmol.util.Escape.isAS (value)) {
this.params.title = value;
for (var i = 0; i < this.params.title.length; i++) if (this.params.title[i].length > 0) org.jmol.util.Logger.info (this.params.title[i]);

}return true;
}if ("sigma" === propertyName) {
this.params.cutoff = this.params.sigma = (value).floatValue ();
this.params.isPositiveOnly = false;
this.params.cutoffAutomatic = false;
return true;
}if ("cutoff" === propertyName) {
this.params.cutoff = (value).floatValue ();
this.params.isPositiveOnly = false;
this.params.cutoffAutomatic = false;
return true;
}if ("parameters" === propertyName) {
this.params.parameters = org.jmol.util.ArrayUtil.ensureLengthA (value, 2);
if (this.params.parameters.length > 0 && this.params.parameters[0] != 0) this.params.cutoff = this.params.parameters[0];
return true;
}if ("cutoffPositive" === propertyName) {
this.params.cutoff = (value).floatValue ();
this.params.isPositiveOnly = true;
return true;
}if ("cap" === propertyName || "slab" === propertyName) {
if (value != null) this.params.addSlabInfo (value);
return true;
}if ("scale" === propertyName) {
this.params.scale = (value).floatValue ();
return true;
}if ("scale3d" === propertyName) {
this.params.scale3d = (value).floatValue ();
return true;
}if ("angstroms" === propertyName) {
this.params.isAngstroms = true;
return true;
}if ("resolution" === propertyName) {
var resolution = (value).floatValue ();
this.params.resolution = (resolution > 0 ? resolution : 3.4028235E38);
return true;
}if ("downsample" === propertyName) {
var rate = (value).intValue ();
this.params.downsampleFactor = (rate >= 0 ? rate : 0);
return true;
}if ("anisotropy" === propertyName) {
if ((this.params.dataType & 32) == 0) this.params.setAnisotropy (value);
return true;
}if ("eccentricity" === propertyName) {
this.params.setEccentricity (value);
return true;
}if ("addHydrogens" === propertyName) {
this.params.addHydrogens = (value).booleanValue ();
return true;
}if ("squareData" === propertyName) {
this.params.isSquared = (value == null ? false : (value).booleanValue ());
return true;
}if ("squareLinear" === propertyName) {
this.params.isSquaredLinear = (value == null ? false : (value).booleanValue ());
return true;
}if ("gridPoints" === propertyName) {
this.params.iAddGridPoints = true;
return true;
}if ("atomIndex" === propertyName) {
this.params.atomIndex = (value).intValue ();
return true;
}if ("insideOut" === propertyName) {
this.params.insideOut = true;
return true;
}if ("sign" === propertyName) {
this.params.isCutoffAbsolute = true;
this.params.colorBySign = true;
this.colorPtr = 0;
return true;
}if ("colorRGB" === propertyName) {
var rgb = (value).intValue ();
this.params.colorRgb = this.params.colorPos = this.params.colorPosLCAO = rgb;
if (this.colorPtr++ == 0) {
this.params.colorNeg = this.params.colorNegLCAO = rgb;
} else {
this.params.colorRgb = 2147483647;
}return true;
}if ("monteCarloCount" === propertyName) {
this.params.psi_monteCarloCount = (value).intValue ();
return true;
}if ("rangeAll" === propertyName) {
this.params.rangeAll = true;
return true;
}if ("rangeSelected" === propertyName) {
this.params.rangeSelected = true;
return true;
}if ("red" === propertyName) {
this.params.valueMappedToRed = (value).floatValue ();
return true;
}if ("blue" === propertyName) {
this.params.valueMappedToBlue = (value).floatValue ();
if (this.params.valueMappedToRed > this.params.valueMappedToBlue) {
var f = this.params.valueMappedToRed;
this.params.valueMappedToRed = this.params.valueMappedToBlue;
this.params.valueMappedToBlue = f;
this.params.isColorReversed = !this.params.isColorReversed;
}this.params.rangeDefined = true;
this.params.rangeAll = false;
return true;
}if ("reverseColor" === propertyName) {
this.params.isColorReversed = true;
return true;
}if ("setColorScheme" === propertyName) {
this.getSurfaceSets ();
this.params.colorBySets = true;
this.mapSurface ();
return true;
}if ("center" === propertyName) {
this.params.center.setT (value);
return true;
}if ("volumeData" === propertyName) {
this.params.volumeData = value;
return true;
}if ("origin" === propertyName) {
this.params.origin = value;
return true;
}if ("step" === propertyName) {
this.params.steps = value;
return true;
}if ("point" === propertyName) {
this.params.points = value;
return true;
}if ("withinDistance" === propertyName) {
this.params.distance = (value).floatValue ();
return true;
}if ("withinPoint" === propertyName) {
this.params.point = value;
return true;
}if ("progressive" === propertyName) {
this.params.isXLowToHigh = true;
return true;
}if ("phase" === propertyName) {
var color = value;
this.params.isCutoffAbsolute = true;
this.params.colorBySign = true;
this.params.colorByPhase = true;
this.params.colorPhase = org.jmol.jvxl.readers.SurfaceReader.getColorPhaseIndex (color);
if (this.params.colorPhase < 0) {
org.jmol.util.Logger.warn (" invalid color phase: " + color);
this.params.colorPhase = 0;
}this.params.colorByPhase = this.params.colorPhase != 0;
if (this.params.state >= 2) {
this.params.dataType = this.params.surfaceType;
this.params.state = 3;
this.params.isBicolorMap = true;
this.surfaceReader.applyColorScale ();
}return true;
}if ("radius" === propertyName) {
org.jmol.util.Logger.info ("solvent probe radius set to " + value);
this.params.atomRadiusData = value;
return true;
}if ("envelopeRadius" === propertyName) {
this.params.envelopeRadius = (value).floatValue ();
return true;
}if ("cavityRadius" === propertyName) {
this.params.cavityRadius = (value).floatValue ();
return true;
}if ("cavity" === propertyName) {
this.params.isCavity = true;
return true;
}if ("doFullMolecular" === propertyName) {
this.params.doFullMolecular = true;
return true;
}if ("pocket" === propertyName) {
this.params.pocket = value;
this.params.fullyLit = this.params.pocket.booleanValue ();
return true;
}if ("minset" === propertyName) {
this.params.minSet = (value).intValue ();
return true;
}if ("maxset" === propertyName) {
this.params.maxSet = (value).intValue ();
return true;
}if ("plane" === propertyName) {
this.params.setPlane (value);
return true;
}if ("contour" === propertyName) {
this.params.isContoured = true;
var n;
if (org.jmol.util.Escape.isAF (value)) {
this.params.contoursDiscrete = value;
this.params.nContours = this.params.contoursDiscrete.length;
} else if (Clazz.instanceOf (value, org.jmol.util.Point3f)) {
var pt = this.params.contourIncrements = value;
var from = pt.x;
var to = pt.y;
var step = pt.z;
if (step <= 0) step = 1;
n = 0;
for (var p = from; p <= to + step / 10; p += step, n++) {
}
this.params.contoursDiscrete =  Clazz.newFloatArray (n, 0);
var p = from;
for (var i = 0; i < n; i++, p += step) {
this.params.contoursDiscrete[i] = p;
}
this.params.nContours = n;
} else {
n = (value).intValue ();
if (n == 0) this.params.nContours = 9;
 else if (n > 0) this.params.nContours = n;
 else this.params.thisContour = -n;
}return true;
}if ("colorDiscrete" === propertyName) {
this.params.contourColixes = value;
return true;
}if ("colorDensity" === propertyName) {
this.params.colorDensity = true;
return true;
}if ("fullPlane" === propertyName) {
this.params.contourFromZero = !(value).booleanValue ();
return true;
}if ("mapLattice" === propertyName) {
this.params.mapLattice = value;
return true;
}if ("property" === propertyName) {
this.params.dataType = 1206;
this.params.theProperty = value;
this.mapSurface ();
return true;
}if ("sphere" === propertyName) {
this.params.setSphere ((value).floatValue ());
this.readerData =  new Float (this.params.distance);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("ellipsoid" === propertyName) {
if (Clazz.instanceOf (value, org.jmol.util.Point4f)) this.params.setEllipsoid (value);
 else if (org.jmol.util.Escape.isAF (value)) this.params.setEllipsoid (value);
 else return true;
this.readerData =  new Float (this.params.distance);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("ellipsoid3" === propertyName) {
this.params.setEllipsoid (value);
this.readerData =  new Float (this.params.distance);
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("lp" === propertyName) {
this.params.setLp (value);
this.readerData = [3, 2, 0, 15, 0];
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("rad" === propertyName) {
this.params.setRadical (value);
this.readerData = [3, 2, 0, 15, 0];
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("lobe" === propertyName) {
this.params.setLobe (value);
this.readerData = [3, 2, 0, 15, 0];
this.surfaceReader = this.newReader ("IsoShapeReader");
this.generateSurface ();
return true;
}if ("hydrogenOrbital" === propertyName) {
if (!this.params.setAtomicOrbital (value)) {
this.$isValid = false;
return true;
}this.readerData = [this.params.psi_n, this.params.psi_l, this.params.psi_m, this.params.psi_Znuc, this.params.psi_monteCarloCount];
this.surfaceReader = this.newReader ("IsoShapeReader");
this.processState ();
return true;
}if ("functionXY" === propertyName) {
this.params.setFunctionXY (value);
if (this.params.isContoured) this.volumeData.setPlaneParameters (org.jmol.util.Point4f.new4 (0, 0, 1, 0));
if ((this.params.functionInfo.get (0)).indexOf ("_xyz") >= 0) this.getFunctionZfromXY ();
this.processState ();
return true;
}if ("functionXYZ" === propertyName) {
this.params.setFunctionXYZ (value);
this.processState ();
return true;
}if ("lcaoType" === propertyName) {
this.params.setLcao (value, this.colorPtr);
return true;
}if ("lcaoCartoonCenter" === propertyName) {
if (++this.params.state != 2) return true;
if (this.params.center.x == 3.4028235E38) this.params.center.setT (value);
return false;
}if ("molecular" === propertyName || "solvent" === propertyName || "sasurface" === propertyName || "nomap" === propertyName) {
this.params.setSolvent (propertyName, (value).floatValue ());
org.jmol.util.Logger.info (this.params.calculationType);
this.processState ();
return true;
}if ("moData" === propertyName) {
this.params.moData = value;
return true;
}if ("mepCalcType" === propertyName) {
this.params.mep_calcType = (value).intValue ();
return true;
}if ("mep" === propertyName) {
this.params.setMep (value, false);
this.processState ();
return true;
}if ("mlp" === propertyName) {
this.params.setMep (value, true);
this.processState ();
return true;
}if ("nci" === propertyName) {
var isPromolecular = (value).booleanValue ();
this.params.setNci (isPromolecular);
if (isPromolecular) this.processState ();
return true;
}if ("calculationType" === propertyName) {
this.params.calculationType = value;
return true;
}if ("charges" === propertyName) {
this.params.theProperty = value;
return true;
}if ("randomSeed" === propertyName) {
this.params.randomSeed = (value).intValue ();
return true;
}if ("molecularOrbital" === propertyName) {
var iMo = 0;
var linearCombination = null;
if (Clazz.instanceOf (value, Integer)) {
iMo = (value).intValue ();
} else {
linearCombination = value;
}this.params.setMO (iMo, linearCombination);
org.jmol.util.Logger.info (this.params.calculationType);
this.processState ();
return true;
}if ("fileType" === propertyName) {
this.fileType = value;
return true;
}if ("fileName" === propertyName) {
this.params.fileName = value;
return true;
}if ("outputStream" === propertyName) {
this.os = value;
return true;
}if ("readFile" === propertyName) {
if ((this.surfaceReader = this.setFileData (value)) == null) {
org.jmol.util.Logger.error ("Could not set the surface data");
return true;
}this.surfaceReader.setOutputStream (this.os);
this.generateSurface ();
return true;
}if ("getSurfaceSets" === propertyName) {
this.getSurfaceSets ();
return true;
}if ("mapColor" === propertyName) {
if ((this.surfaceReader = this.setFileData (value)) == null) {
org.jmol.util.Logger.error ("Could not set the mapping data");
return true;
}this.surfaceReader.setOutputStream (this.os);
this.mapSurface ();
return true;
}if ("periodic" === propertyName) {
this.params.isPeriodic = true;
}return false;
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "newReader", 
($fz = function (name) {
var sr = org.jmol.jvxl.readers.SurfaceGenerator.getInterface (name);
if (sr != null) sr.init (this);
return sr;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "newReaderBr", 
($fz = function (name, br) {
var sr = org.jmol.jvxl.readers.SurfaceGenerator.getInterface (name);
if (sr != null) sr.init2 (this, br);
return sr;
}, $fz.isPrivate = true, $fz), "~S,java.io.BufferedReader");
c$.getInterface = Clazz.defineMethod (c$, "getInterface", 
($fz = function (name) {
try {
var x = Class.forName ("org.jmol.jvxl.readers." + name);
return (x == null ? null : x.newInstance ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error ("Interface.java Error creating instance for " + name + ": \n" + e.toString ());
return null;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getSurfaceSets", 
($fz = function () {
if (this.meshDataServer == null) {
this.meshData.getSurfaceSet ();
} else {
this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.getSurfaceSet ();
this.meshDataServer.fillMeshData (this.meshData, 3, null);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "processState", 
($fz = function () {
if (this.params.state == 1 && this.params.thePlane != null) this.params.state++;
if (this.params.state >= 2) {
this.mapSurface ();
} else {
this.generateSurface ();
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setReader", 
($fz = function () {
this.readerData = null;
if (this.surfaceReader != null) return !this.surfaceReader.vertexDataOnly;
switch (this.params.dataType) {
case 1205:
this.surfaceReader = this.newReader ("IsoPlaneReader");
break;
case 1206:
this.surfaceReader = this.newReader ("AtomPropertyMapper");
break;
case 1328:
case 1329:
this.readerData = (this.params.dataType == 1328 ? "Mep" : "Mlp");
if (this.params.state == 3) {
this.surfaceReader = this.newReader ("AtomPropertyMapper");
} else {
this.surfaceReader = this.newReader ("Iso" + this.readerData + "Reader");
}break;
case 1333:
this.surfaceReader = this.newReader ("IsoIntersectReader");
break;
case 1195:
case 1203:
case 1196:
this.surfaceReader = this.newReader ("IsoSolventReader");
break;
case 1844:
case 1837:
this.surfaceReader = this.newReader ("IsoMOReader");
break;
case 8:
this.surfaceReader = this.newReader ("IsoFxyReader");
break;
case 9:
this.surfaceReader = this.newReader ("IsoFxyzReader");
break;
}
org.jmol.util.Logger.info ("Using surface reader " + this.surfaceReader);
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateSurface", 
($fz = function () {
if (++this.params.state != 2) return;
this.setReader ();
var haveMeshDataServer = (this.meshDataServer != null);
if (this.params.colorBySign) this.params.isBicolorMap = true;
if (this.surfaceReader == null) {
org.jmol.util.Logger.error ("surfaceReader is null for " + this.params.dataType);
return;
}if (!this.surfaceReader.createIsosurface (false)) {
org.jmol.util.Logger.error ("Could not create isosurface");
this.params.cutoff = NaN;
this.surfaceReader.closeReader ();
return;
}if (this.params.pocket != null && haveMeshDataServer) this.surfaceReader.selectPocket (!this.params.pocket.booleanValue ());
if (this.params.minSet > 0) this.surfaceReader.excludeMinimumSet ();
if (this.params.maxSet > 0) this.surfaceReader.excludeMaximumSet ();
if (this.params.slabInfo != null) this.surfaceReader.slabIsosurface (this.params.slabInfo);
if (haveMeshDataServer) this.meshDataServer.notifySurfaceGenerationCompleted ();
if (this.jvxlData.thisSet >= 0) this.getSurfaceSets ();
if (this.jvxlData.jvxlDataIs2dContour) {
this.surfaceReader.colorIsosurface ();
this.params.state = 3;
}if (this.jvxlData.jvxlDataIsColorDensity) {
this.params.state = 3;
}if (this.params.colorBySign || this.params.isBicolorMap) {
this.params.state = 3;
this.surfaceReader.applyColorScale ();
}this.surfaceReader.jvxlUpdateInfo ();
this.setMarchingSquares (this.surfaceReader.marchingSquares);
this.surfaceReader.discardTempData (false);
this.params.mappedDataMin = 3.4028235E38;
this.surfaceReader.closeReader ();
if (this.params.state != 3 && (this.surfaceReader.hasColorData || this.params.colorDensity)) {
this.params.state = 3;
this.colorIsosurface ();
}this.surfaceReader = null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "mapSurface", 
($fz = function () {
if (this.params.state == 1 && this.params.thePlane != null) this.params.state++;
if (++this.params.state < 3) return;
if (!this.setReader ()) return;
if (this.params.isPeriodic) this.volumeData.isPeriodic = true;
if (this.params.thePlane != null) {
var isSquared = this.params.isSquared;
this.params.isSquared = false;
this.params.cutoff = 0;
this.volumeData.setMappingPlane (this.params.thePlane);
this.surfaceReader.createIsosurface (!this.params.isPeriodic);
this.volumeData.setMappingPlane (null);
if (this.meshDataServer != null) this.meshDataServer.notifySurfaceGenerationCompleted ();
if (this.params.dataType == 1205) {
this.surfaceReader.discardTempData (true);
return;
}this.params.isSquared = isSquared;
this.params.mappedDataMin = 3.4028235E38;
this.surfaceReader.readVolumeData (true);
if (this.params.mapLattice != null) this.volumeData.isPeriodic = true;
} else if (!this.params.colorBySets && !this.params.colorDensity) {
this.surfaceReader.readAndSetVolumeParameters (true);
this.params.mappedDataMin = 3.4028235E38;
this.surfaceReader.readVolumeData (true);
}this.colorIsosurface ();
this.surfaceReader.closeReader ();
this.surfaceReader = null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSlabInfo", 
function () {
return this.params.slabInfo;
});
Clazz.defineMethod (c$, "colorIsosurface", 
function () {
this.surfaceReader.colorIsosurface ();
this.surfaceReader.jvxlUpdateInfo ();
this.surfaceReader.updateTriangles ();
this.surfaceReader.discardTempData (true);
if (this.meshDataServer != null) this.meshDataServer.notifySurfaceMappingCompleted ();
});
Clazz.defineMethod (c$, "getProperty", 
function (property, index) {
if (property === "jvxlFileData") return org.jmol.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, null, this.params.title, "", true, index, null, null);
if (property === "jvxlFileInfo") return org.jmol.jvxl.data.JvxlCoder.jvxlGetInfo (this.jvxlData);
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "setFileData", 
($fz = function (value) {
var fileType = this.fileType;
this.fileType = null;
if (Clazz.instanceOf (value, org.jmol.jvxl.data.VolumeData)) {
this.volumeData = value;
return this.newReader ("VolumeDataReader");
}if (Clazz.instanceOf (value, java.util.Map)) {
this.volumeData = (value).get ("volumeData");
return this.newReader ("VolumeDataReader");
}var data = null;
if (Clazz.instanceOf (value, String)) {
data = value;
value =  new java.io.BufferedReader ( new java.io.StringReader (value));
}var br = value;
if (fileType == null) fileType = org.jmol.io.JmolBinary.determineSurfaceFileType (br);
if (fileType != null && fileType.startsWith ("UPPSALA")) {
var fname = this.params.fileName;
fname = fname.substring (0, fname.indexOf ("/", 10));
fname += org.jmol.util.Parser.getQuotedStringAt (fileType, fileType.indexOf ("A HREF") + 1);
this.params.fileName = fname;
value = this.atomDataServer.getBufferedInputStream (fname);
if (value == null) {
org.jmol.util.Logger.error ("Isosurface: could not open file " + fname);
return null;
}try {
br = org.jmol.io.JmolBinary.getBufferedReader (value);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
fileType = org.jmol.io.JmolBinary.determineSurfaceFileType (br);
}if (fileType == null) fileType = "UNKNOWN";
org.jmol.util.Logger.info ("data file type was determined to be " + fileType);
if (fileType.equals ("Jvxl+")) return this.newReaderBr ("JvxlReader", br);
if (fileType.equals ("Jvxl")) return this.newReaderBr ("JvxlReader", br);
if (fileType.equals ("JvxlXML")) return this.newReaderBr ("JvxlXmlReader", br);
if (fileType.equals ("Apbs")) return this.newReaderBr ("ApbsReader", br);
if (fileType.equals ("Cube")) return this.newReaderBr ("CubeReader", br);
if (fileType.equals ("Jaguar")) return this.newReaderBr ("JaguarReader", br);
if (fileType.equals ("Xplor")) return this.newReaderBr ("XplorReader", br);
if (fileType.equals ("Xsf")) return this.newReaderBr ("XsfReader", br);
if (fileType.equals ("PltFormatted")) return this.newReaderBr ("PltFormattedReader", br);
if (fileType.equals ("MRC")) {
try {
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
br = null;
this.readerData = this.params.fileName;
return this.newReaderBr ("MrcBinaryReader", br);
}this.readerData = [this.params.fileName, data];
if (fileType.equals ("DSN6")) {
try {
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
br = null;
return this.newReaderBr ("Dsn6BinaryReader", br);
}if (fileType.equals ("Efvet")) {
return this.newReaderBr ("EfvetReader", br);
}if (fileType.equals ("Pmesh")) {
return this.newReaderBr ("PmeshReader", br);
}if (fileType.equals ("Obj")) {
return this.newReaderBr ("ObjReader", br);
}if (fileType.equals ("Msms")) {
return this.newReaderBr ("MsmsReader", br);
}if (fileType.equals ("Kinemage")) {
return this.newReaderBr ("KinemageReader", br);
}if (fileType.equals ("CastepDensity")) {
return this.newReaderBr ("CastepDensityReader", br);
}if (fileType.equals ("Nff")) {
return this.newReaderBr ("NffFileReader", br);
}return null;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "initializeIsosurface", 
function () {
this.params.initialize ();
this.colorPtr = 0;
this.surfaceReader = null;
this.marchingSquares = null;
this.initState ();
});
Clazz.defineMethod (c$, "initState", 
function () {
this.params.state = 1;
this.params.dataType = this.params.surfaceType = 0;
});
Clazz.defineMethod (c$, "setLcao", 
function () {
this.params.colorPos = this.params.colorPosLCAO;
this.params.colorNeg = this.params.colorNegLCAO;
return this.params.lcaoType;
});
Clazz.defineMethod (c$, "getFunctionZfromXY", 
($fz = function () {
var origin = this.params.functionInfo.get (1);
var counts =  Clazz.newIntArray (3, 0);
var nearest =  Clazz.newIntArray (3, 0);
var vectors =  new Array (3);
for (var i = 0; i < 3; i++) {
var info = this.params.functionInfo.get (i + 2);
counts[i] = Math.abs (Clazz.floatToInt (info.x));
vectors[i] = org.jmol.util.Vector3f.new3 (info.y, info.z, info.w);
}
var nx = counts[0];
var ny = counts[1];
var pt =  new org.jmol.util.Point3f ();
var pta =  new org.jmol.util.Point3f ();
var ptb =  new org.jmol.util.Point3f ();
var ptc =  new org.jmol.util.Point3f ();
var data = this.params.functionInfo.get (5);
var data2 =  Clazz.newFloatArray (nx, ny, 0);
var d;
for (var i = 0; i < nx; i++) for (var j = 0; j < ny; j++) {
pt.scaleAdd2 (i, vectors[0], origin);
pt.scaleAdd2 (j, vectors[1], pt);
var dist = org.jmol.jvxl.readers.SurfaceGenerator.findNearestThreePoints (pt.x, pt.y, data, nearest);
pta.set ((d = data[nearest[0]])[0], d[1], d[2]);
if (dist < 0.00001) {
pt.z = d[2];
} else {
ptb.set ((d = data[nearest[1]])[0], d[1], d[2]);
ptc.set ((d = data[nearest[2]])[0], d[1], d[2]);
pt.z = this.distanceVerticalToPlane (pt.x, pt.y, pta, ptb, ptc);
}data2[i][j] = pt.z;
}

this.params.functionInfo.set (5, data2);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "distanceVerticalToPlane", 
($fz = function (x, y, pta, ptb, ptc) {
var d = org.jmol.util.Measure.getDirectedNormalThroughPoints (pta, ptb, ptc, this.ptRef, this.vNorm, this.vAB, this.vAC);
return (this.vNorm.x * x + this.vNorm.y * y + d) / -this.vNorm.z;
}, $fz.isPrivate = true, $fz), "~N,~N,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f");
c$.findNearestThreePoints = Clazz.defineMethod (c$, "findNearestThreePoints", 
($fz = function (x, y, xyz, result) {
var d;
var dist1;
var dist2;
var dist3;
var i1;
var i2;
var i3;
i1 = i2 = i3 = -1;
dist1 = dist2 = dist3 = 3.4028235E38;
for (var i = xyz.length; --i >= 0; ) {
d = (d = xyz[i][0] - x) * d + (d = xyz[i][1] - y) * d;
if (d < dist1) {
dist3 = dist2;
dist2 = dist1;
dist1 = d;
i3 = i2;
i2 = i1;
i1 = i;
} else if (d < dist2) {
dist3 = dist2;
dist2 = d;
i3 = i2;
i2 = i;
} else if (d < dist3) {
dist3 = d;
i3 = i;
}}
result[0] = i1;
result[1] = i2;
result[2] = i3;
return dist1;
}, $fz.isPrivate = true, $fz), "~N,~N,~A,~A");
Clazz.defineMethod (c$, "addRequiredFile", 
function (fileName) {
if (this.meshDataServer == null) return;
this.meshDataServer.addRequiredFile (fileName);
}, "~S");
Clazz.defineMethod (c$, "log", 
function (msg) {
if (this.atomDataServer == null) System.out.println (msg);
 else this.atomDataServer.log (msg);
}, "~S");
Clazz.defineMethod (c$, "setOutputStream", 
function (binaryDoc, os) {
if (this.meshDataServer == null) return;
this.meshDataServer.setOutputStream (binaryDoc, os);
}, "org.jmol.api.JmolDocument,java.io.OutputStream");
Clazz.defineMethod (c$, "isFullyLit", 
function () {
return (this.params.thePlane != null || this.params.fullyLit);
});
Clazz.defineMethod (c$, "geVdwBitSet", 
function () {
return this.bsVdw;
});
Clazz.defineMethod (c$, "fillAtomData", 
function (atomData, mode) {
if ((mode & 2) != 0 && atomData.bsSelected != null) {
if (this.bsVdw == null) this.bsVdw =  new org.jmol.util.BitSet ();
this.bsVdw.or (atomData.bsSelected);
}this.atomDataServer.fillAtomData (atomData, mode);
}, "org.jmol.atomdata.AtomData,~N");
Clazz.defineMethod (c$, "getSpanningVectors", 
function () {
return this.surfaceReader.getSpanningVectors ();
});
Clazz.defineMethod (c$, "getReaderData", 
function () {
var o = this.readerData;
this.readerData = null;
return o;
});
});
// 
//// org\jmol\jvxl\readers\Parameters.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (null, "org.jmol.jvxl.readers.Parameters", ["java.lang.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.util.AxisAngle4f", "$.Escape", "$.Logger", "$.Matrix3f", "$.Point3f", "$.Point4f", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.state = 0;
this.testFlags = 0;
this.logMessages = false;
this.logCompression = false;
this.logCube = false;
this.isSilent = false;
this.assocCutoff = 0.3;
this.dataType = 0;
this.surfaceType = 0;
this.calculationType = "";
this.atomRadiusData = null;
this.addHydrogens = false;
this.solventRadius = 0;
this.solventExtendedAtomRadius = 0;
this.propertySmoothing = false;
this.propertySmoothingPower = 4;
this.envelopeRadius = 0;
this.cavityRadius = 0;
this.isCavity = false;
this.pocket = null;
this.minSet = 0;
this.slabInfo = null;
this.slabPlaneOffset = NaN;
this.theProperty = null;
this.solvent_ptsPerAngstrom = 4;
this.solvent_gridMax = 60;
this.plane_ptsPerAngstrom = 4;
this.plane_gridMax = 81;
this.colorBySign = false;
this.colorByPhase = false;
this.colorBySets = false;
this.colorRgb = 0;
this.colorNeg = 0;
this.colorPos = 0;
this.colorPosLCAO = 0;
this.colorNegLCAO = 0;
this.colorPhase = 0;
this.colorDensity = false;
this.iAddGridPoints = false;
this.atomIndex = 0;
this.isAngstroms = false;
this.scale = 0;
this.scale3d = 0;
this.anisotropy = null;
this.isAnisotropic = false;
this.eccentricityMatrix = null;
this.eccentricityMatrixInverse = null;
this.isEccentric = false;
this.eccentricityScale = 0;
this.eccentricityRatio = 0;
this.aniosU = null;
this.anisoB = null;
this.lcaoType = null;
this.functionInfo = null;
this.psi_n = 2;
this.psi_l = 1;
this.psi_m = 1;
this.psi_Znuc = 1;
this.psi_ptsPerAngstrom = 5;
this.psi_monteCarloCount = 0;
this.mep_gridMax = 40;
this.mep_ptsPerAngstrom = 3;
this.mep_marginAngstroms = 1;
this.mep_calcType = -1;
this.qmOrbitalType = 0;
this.qmOrbitalCount = 0;
this.moData = null;
this.qm_gridMax = 80;
this.qm_ptsPerAngstrom = 10;
this.qm_marginAngstroms = 1;
this.qm_nAtoms = 0;
this.qm_moNumber = 2147483647;
this.qm_moLinearCombination = null;
this.center = null;
this.point = null;
this.distance = 0;
this.allowVolumeRender = false;
this.script = null;
this.bsSelected = null;
this.bsIgnore = null;
this.bsSolvent = null;
this.func = null;
this.title = null;
this.blockCubeData = false;
this.readAllData = false;
this.fileIndex = 0;
this.fileName = null;
this.modelIndex = -1;
this.isXLowToHigh = false;
this.insideOut = false;
this.dataXYReversed = false;
this.cutoff = 3.4028235E38;
this.sigma = 3.4028235E38;
this.cutoffAutomatic = true;
this.isCutoffAbsolute = false;
this.isPositiveOnly = false;
this.rangeAll = false;
this.rangeSelected = false;
this.rangeDefined = false;
this.valueMappedToRed = 0;
this.valueMappedToBlue = 0;
this.mappedDataMin = 0;
this.mappedDataMax = 0;
this.isColorReversed = false;
this.isBicolorMap = false;
this.isSquared = false;
this.isSquaredLinear = false;
this.thePlane = null;
this.isContoured = false;
this.nContours = 0;
this.thisContour = 0;
this.contourFromZero = false;
this.parameters = null;
this.resolution = 0;
this.downsampleFactor = 0;
this.maxSet = 0;
this.contoursDiscrete = null;
this.contourColixes = null;
this.contourIncrements = null;
this.boundingBox = null;
this.bsExcluded = null;
this.contourType = 0;
this.colorSchemeTranslucent = false;
this.colorEncoder = null;
this.usePropertyForColorRange = true;
this.isPeriodic = false;
this.doFullMolecular = false;
this.propertyDistanceMax = 2147483647;
this.randomSeed = 0;
this.fullyLit = false;
this.vertexSource = null;
this.intersection = null;
this.origin = null;
this.steps = null;
this.points = null;
this.volumeData = null;
this.contactPair = null;
this.mapLattice = null;
this.isMapped = false;
this.showTiming = false;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "Parameters");
Clazz.prepareFields (c$, function () {
this.anisotropy =  Clazz.newFloatArray (3, 0);
});
Clazz.defineMethod (c$, "initialize", 
function () {
this.addHydrogens = false;
this.allowVolumeRender = true;
this.atomRadiusData = null;
this.atomIndex = -1;
this.blockCubeData = false;
this.boundingBox = null;
this.bsExcluded =  new Array (4);
this.bsIgnore = null;
this.bsSelected = null;
this.bsSolvent = null;
this.calculationType = "";
this.center = org.jmol.util.Point3f.new3 (3.4028235E38, 3.4028235E38, 3.4028235E38);
this.colorBySign = this.colorByPhase = this.colorBySets = false;
this.colorDensity = false;
this.colorEncoder = null;
this.colorNeg = -65536;
this.colorNegLCAO = -8388480;
this.colorPos = -16776961;
this.colorPosLCAO = -23296;
this.colorRgb = -2147483648;
this.colorSchemeTranslucent = false;
this.contactPair = null;
this.contourIncrements = null;
this.contoursDiscrete = null;
this.contourColixes = null;
this.contourFromZero = true;
this.cutoff = 3.4028235E38;
this.cutoffAutomatic = true;
this.dataXYReversed = false;
this.distance = 3.4028235E38;
this.doFullMolecular = false;
this.envelopeRadius = 10;
this.fileIndex = 1;
this.readAllData = true;
this.fileName = "";
this.fullyLit = false;
this.func = null;
this.functionInfo = null;
this.iAddGridPoints = false;
this.insideOut = false;
this.intersection = null;
this.isAngstroms = false;
this.isBicolorMap = this.isCutoffAbsolute = this.isPositiveOnly = false;
this.isCavity = false;
this.isColorReversed = false;
this.isSquared = false;
this.isSquaredLinear = false;
this.isContoured = false;
this.isEccentric = this.isAnisotropic = false;
this.isMapped = false;
this.isPeriodic = false;
this.isSilent = false;
this.mapLattice = null;
this.logCube = this.logCompression = false;
this.logMessages = org.jmol.util.Logger.debugging;
this.mappedDataMin = 3.4028235E38;
this.mep_calcType = -1;
this.minSet = 0;
this.modelIndex = -1;
this.nContours = 0;
this.pocket = null;
this.propertyDistanceMax = 2147483647;
this.propertySmoothing = false;
this.propertySmoothingPower = 4;
this.rangeDefined = false;
this.rangeAll = false;
this.rangeSelected = false;
this.resolution = 3.4028235E38;
this.scale = NaN;
this.scale3d = 0;
this.sigma = NaN;
this.slabInfo = null;
this.solventExtendedAtomRadius = 0;
this.state = 1;
this.testFlags = 0;
this.thePlane = null;
this.theProperty = null;
this.thisContour = -1;
this.title = null;
this.usePropertyForColorRange = true;
this.vertexSource = null;
this.volumeData = null;
});
Clazz.defineMethod (c$, "setAnisotropy", 
function (pt) {
this.anisotropy[0] = pt.x;
this.anisotropy[1] = pt.y;
this.anisotropy[2] = pt.z;
this.isAnisotropic = true;
if (this.center.x == 3.4028235E38) this.center.set (0, 0, 0);
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setEccentricity", 
function (info) {
var ecc = org.jmol.util.Vector3f.new3 (info.x, info.y, info.z);
var c = (this.scale > 0 ? this.scale : info.w < 0 ? 1 : ecc.length ());
var fab_c = Math.abs (info.w);
ecc.normalize ();
var z = org.jmol.util.Vector3f.new3 (0, 0, 1);
ecc.add (z);
ecc.normalize ();
if (Float.isNaN (ecc.x)) ecc.set (1, 0, 0);
this.eccentricityMatrix =  new org.jmol.util.Matrix3f ();
this.eccentricityMatrix.setIdentity ();
this.eccentricityMatrix.setAA (org.jmol.util.AxisAngle4f.newVA (ecc, 3.141592653589793));
this.eccentricityMatrixInverse =  new org.jmol.util.Matrix3f ();
this.eccentricityMatrixInverse.invertM (this.eccentricityMatrix);
this.isEccentric = this.isAnisotropic = true;
this.eccentricityScale = c;
this.eccentricityRatio = fab_c;
if (fab_c > 1) this.eccentricityScale *= fab_c;
this.anisotropy[0] = fab_c * c;
this.anisotropy[1] = fab_c * c;
this.anisotropy[2] = c;
if (this.center.x == 3.4028235E38) this.center.set (0, 0, 0);
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "setPlane", 
function (plane) {
this.thePlane = plane;
if (this.thePlane.x == 0 && this.thePlane.y == 0 && this.thePlane.z == 0) this.thePlane.z = 1;
this.isContoured = true;
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "setSphere", 
function (radius) {
this.dataType = 65;
this.distance = radius;
this.setEccentricity (org.jmol.util.Point4f.new4 (0, 0, 1, 1));
this.cutoff = 1.4E-45;
this.isCutoffAbsolute = false;
this.isSilent = !this.logMessages;
this.script = this.getScriptParams () + " SPHERE " + radius + ";";
}, "~N");
Clazz.defineMethod (c$, "setEllipsoid", 
function (v) {
this.dataType = 66;
this.distance = 1;
this.setEccentricity (v);
this.cutoff = 1.4E-45;
this.isCutoffAbsolute = false;
this.isSilent = !this.logMessages;
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "setEllipsoid", 
function (bList) {
this.anisoB = bList;
this.dataType = 67;
this.distance = 0.3 * (Float.isNaN (this.scale) ? 1 : this.scale);
this.cutoff = 1.4E-45;
this.isCutoffAbsolute = false;
this.isSilent = !this.logMessages;
if (this.center.x == 3.4028235E38) this.center.set (0, 0, 0);
if (this.resolution == 3.4028235E38) this.resolution = 6;
}, "~A");
Clazz.defineMethod (c$, "setLobe", 
function (v) {
this.dataType = 68;
this.setEccentricity (v);
if (this.cutoff == 3.4028235E38) {
this.cutoff = 0.14;
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isSilent = !this.logMessages;
this.script = this.getScriptParams () + " LOBE {" + v.x + " " + v.y + " " + v.z + " " + v.w + "};";
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "getScriptParams", 
($fz = function () {
return " center " + org.jmol.util.Escape.escapePt (this.center) + (Float.isNaN (this.scale) ? "" : " scale " + this.scale);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setLp", 
function (v) {
this.dataType = 70;
this.setEccentricity (v);
if (this.cutoff == 3.4028235E38) {
this.cutoff = 0.14;
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isSilent = !this.logMessages;
this.script = " center " + org.jmol.util.Escape.escapePt (this.center) + (Float.isNaN (this.scale) ? "" : " scale " + this.scale) + " LP {" + v.x + " " + v.y + " " + v.z + " " + v.w + "};";
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "setRadical", 
function (v) {
this.dataType = 71;
this.setEccentricity (v);
if (this.cutoff == 3.4028235E38) {
this.cutoff = 0.14;
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isSilent = !this.logMessages;
this.script = " center " + org.jmol.util.Escape.escapePt (this.center) + (Float.isNaN (this.scale) ? "" : " scale " + this.scale) + " RAD {" + v.x + " " + v.y + " " + v.z + " " + v.w + "};";
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "setLcao", 
function (type, colorPtr) {
this.lcaoType = type;
if (colorPtr == 1) this.colorPosLCAO = this.colorNegLCAO;
this.isSilent = !this.logMessages;
}, "~S,~N");
Clazz.defineMethod (c$, "setSolvent", 
function (propertyName, radius) {
this.isEccentric = this.isAnisotropic = false;
this.solventRadius = Math.abs (radius);
this.dataType = (this.intersection != null ? 1333 : "nomap" === propertyName ? 1205 : "molecular" === propertyName ? 1203 : "sasurface" === propertyName || this.solventRadius == 0 ? 1196 : 1195);
if (this.state < 2 && (this.cutoffAutomatic || !this.colorDensity) && (this.intersection == null || this.cutoff == 3.4028235E38)) this.cutoff = 0.0;
switch (this.dataType) {
case 1333:
this.calculationType = "VDW intersection";
break;
case 1205:
this.calculationType = "unmapped plane";
break;
case 1203:
this.calculationType = "molecular surface with radius " + this.solventRadius;
break;
case 1195:
this.calculationType = "solvent-excluded surface with radius " + this.solventRadius;
break;
case 1196:
this.calculationType = "solvent-accessible surface with radius " + this.solventRadius;
break;
}
switch (this.dataType) {
case 1205:
this.solventExtendedAtomRadius = this.solventRadius;
this.solventRadius = 0;
this.isContoured = false;
break;
case 1203:
this.solventExtendedAtomRadius = 0;
break;
case 1195:
this.solventExtendedAtomRadius = 0;
if (this.bsIgnore == null) this.bsIgnore = this.bsSolvent;
break;
case 1196:
this.solventExtendedAtomRadius = this.solventRadius;
this.solventRadius = 0;
if (this.bsIgnore == null) this.bsIgnore = this.bsSolvent;
break;
}
}, "~S,~N");
Clazz.defineMethod (c$, "setFunctionXY", 
function (value) {
this.dataType = 8;
this.functionInfo = value;
this.cutoff = 1.4E-45;
this.isEccentric = this.isAnisotropic = false;
}, "java.util.List");
Clazz.defineMethod (c$, "setFunctionXYZ", 
function (value) {
this.dataType = 9;
this.functionInfo = value;
if (this.cutoff == 3.4028235E38) this.cutoff = 1.4E-45;
this.isEccentric = this.isAnisotropic = false;
}, "java.util.List");
Clazz.defineMethod (c$, "setAtomicOrbital", 
function (nlmZprs) {
this.dataType = 1294;
this.setEccentricity (org.jmol.util.Point4f.new4 (0, 0, 1, 1));
this.psi_n = Clazz.floatToInt (nlmZprs[0]);
this.psi_l = Clazz.floatToInt (nlmZprs[1]);
this.psi_m = Clazz.floatToInt (nlmZprs[2]);
this.psi_Znuc = nlmZprs[3];
this.psi_monteCarloCount = Clazz.floatToInt (nlmZprs[4]);
this.distance = nlmZprs[5];
if (this.distance != 0 || this.thePlane != null) this.allowVolumeRender = false;
this.randomSeed = Clazz.floatToInt (nlmZprs[6]);
this.psi_ptsPerAngstrom = 10;
if (this.cutoff == 3.4028235E38 || this.cutoff == 0.14) {
this.cutoff = (this.psi_monteCarloCount > 0 ? 0 : 0.04);
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isCutoffAbsolute = true;
if (this.state < 2 && this.thePlane == null && this.colorBySign) this.isBicolorMap = true;
return (this.psi_Znuc > 0 && Math.abs (this.psi_m) <= this.psi_l && this.psi_l < this.psi_n);
}, "~A");
Clazz.defineMethod (c$, "setMep", 
function (charges, isMLP) {
this.dataType = (isMLP ? 1329 : 1328);
this.theProperty = charges;
this.usePropertyForColorRange = false;
this.isEccentric = this.isAnisotropic = false;
if (this.cutoff == 3.4028235E38) {
this.cutoff = 0.1;
if (this.isSquared) this.cutoff = this.cutoff * this.cutoff;
}this.isCutoffAbsolute = (this.cutoff > 0 && !this.isPositiveOnly);
this.contourFromZero = false;
if (this.state >= 2 || this.thePlane != null) {
if (!this.rangeDefined && !this.rangeAll) {
this.valueMappedToRed = -0.1;
this.valueMappedToBlue = 0.1;
this.rangeDefined = true;
}} else {
this.colorBySign = true;
this.isBicolorMap = true;
}}, "~A,~B");
Clazz.defineMethod (c$, "setNci", 
function (isPromolecular) {
this.fullyLit = true;
this.qm_gridMax = 200;
if (isPromolecular) this.dataType = 1844;
this.qm_marginAngstroms = 2;
this.qmOrbitalType = (isPromolecular ? 3 : 4);
if (isPromolecular) {
if (this.parameters == null || this.parameters.length < 2) this.parameters = [this.cutoff, 2];
}if (this.cutoff == 3.4028235E38 || this.cutoff == 0) this.cutoff = 0.3;
if (this.isSquared) this.cutoff *= this.cutoff;
if (this.title == null) this.title =  new Array (0);
this.moData =  new java.util.Hashtable ();
}, "~B");
Clazz.defineMethod (c$, "setMO", 
function (iMo, linearCombination) {
this.qm_moLinearCombination = linearCombination;
this.qm_moNumber = (linearCombination == null ? Math.abs (iMo) : Clazz.floatToInt (linearCombination[1]));
this.qmOrbitalType = (this.moData.containsKey ("haveVolumeData") ? 5 : this.moData.containsKey ("gaussians") ? 1 : this.moData.containsKey ("slaters") ? 2 : 0);
var isElectronDensity = (iMo <= 0 && linearCombination == null);
if (this.qmOrbitalType == 0) {
org.jmol.util.Logger.error ("MO ERROR: No basis functions found in file for MO calculation. (GAUSSIAN 'gfprint' keyword may be missing?)");
this.title = ["no basis functions found in file"];
} else {
var mos = this.moData.get ("mos");
this.qmOrbitalCount = mos.size ();
this.calculationType = this.moData.get ("calculationType");
this.calculationType = "Molecular orbital #" + this.qm_moNumber + "/" + this.qmOrbitalCount + " " + (this.calculationType == null ? "" : this.calculationType);
if (!isElectronDensity) {
if (this.title == null) {
this.title =  new Array (5);
this.title[0] = "%F";
this.title[1] = "Model %M  MO %I/%N %T";
this.title[2] = "?Energy = %E %U";
this.title[3] = "?Symmetry = %S";
this.title[4] = "?Occupancy = %O";
}}}this.dataType = 1837;
if (this.cutoff == 3.4028235E38) {
this.cutoff = (isElectronDensity ? 0.01 : 0.05);
}if (this.isSquared || this.isSquaredLinear) this.cutoff = this.cutoff * this.cutoff;
this.isEccentric = this.isAnisotropic = false;
this.isCutoffAbsolute = (this.cutoff > 0 && !this.isPositiveOnly);
if (this.state >= 2 || this.thePlane != null) return;
this.colorBySign = true;
if (this.colorByPhase && this.colorPhase == 0) this.colorByPhase = false;
this.isBicolorMap = true;
}, "~N,~A");
Clazz.defineMethod (c$, "setMapRanges", 
function (surfaceReader, haveData) {
if (!this.colorDensity) if (this.colorByPhase || this.colorBySign || (this.thePlane != null || this.isBicolorMap) && !this.isContoured) {
this.mappedDataMin = -1;
this.mappedDataMax = 1;
}if (this.mappedDataMin == 3.4028235E38 || this.mappedDataMin == this.mappedDataMax) {
var minMax = surfaceReader.getMinMaxMappedValues (haveData);
this.mappedDataMin = minMax[0];
this.mappedDataMax = minMax[1];
}if (this.mappedDataMin == 0 && this.mappedDataMax == 0) {
this.mappedDataMin = -1;
this.mappedDataMax = 1;
}if (!this.rangeDefined) {
this.valueMappedToRed = this.mappedDataMin;
this.valueMappedToBlue = this.mappedDataMax;
}}, "org.jmol.jvxl.readers.SurfaceReader,~B");
Clazz.defineMethod (c$, "resetForMapping", 
function (haveSurface) {
if (!haveSurface) this.state = 2;
this.isMapped = true;
this.qmOrbitalType = 0;
this.parameters = null;
this.colorDensity = false;
this.mappedDataMin = 3.4028235E38;
this.intersection = null;
this.func = null;
this.points = null;
this.origin = null;
this.steps = null;
this.volumeData = null;
}, "~B");
Clazz.defineMethod (c$, "addSlabInfo", 
function (slabObject) {
if (this.slabInfo == null) this.slabInfo =  new java.util.ArrayList ();
this.slabInfo.add (slabObject);
}, "~A");
Clazz.defineStatics (c$,
"STATE_UNINITIALIZED", 0,
"STATE_INITIALIZED", 1,
"STATE_DATA_READ", 2,
"STATE_DATA_COLORED", 3,
"NO_ANISOTROPY", 32,
"IS_SILENT", 64,
"IS_SOLVENTTYPE", 128,
"HAS_MAXGRID", 256,
"IS_POINTMAPPABLE", 512,
"IS_SLABBABLE", 1024,
"SURFACE_NONE", 0,
"SURFACE_SPHERE", 65,
"SURFACE_ELLIPSOID2", 66,
"SURFACE_ELLIPSOID3", 67,
"SURFACE_LOBE", 68,
"SURFACE_LCAOCARTOON", 69,
"SURFACE_LONEPAIR", 70,
"SURFACE_RADICAL", 71,
"SURFACE_FUNCTIONXY", 8,
"SURFACE_FUNCTIONXYZ", 9,
"SURFACE_SOLVENT", 1195,
"SURFACE_SASURFACE", 1196,
"SURFACE_MOLECULARORBITAL", 1837,
"SURFACE_ATOMICORBITAL", 1294,
"SURFACE_MEP", 1328,
"SURFACE_MLP", 1329,
"SURFACE_MOLECULAR", 1203,
"SURFACE_NCI", 1844,
"SURFACE_INTERSECT", 1333,
"SURFACE_NOMAP", 1205,
"SURFACE_PROPERTY", 1206,
"ANGSTROMS_PER_BOHR", 0.5291772,
"defaultEdgeFractionBase", 35,
"defaultEdgeFractionRange", 90,
"defaultColorFractionBase", 35,
"defaultColorFractionRange", 90,
"defaultMappedDataMin", 0,
"defaultMappedDataMax", 1.0,
"defaultCutoff", 0.02,
"defaultOrbitalCutoff", 0.04,
"defaultLobeCutoff", 0.14,
"defaultOrbitalCutoffOld", 0.14,
"defaultQMOrbitalCutoff", 0.050,
"defaultQMElectronDensityCutoff", 0.010,
"defaultContourCount", 11,
"nContourMax", 100,
"defaultColorNegative", 0xFFFF0000,
"defaultColorPositive", 0xFF0000FF,
"defaultColorNegativeLCAO", 0xFF800080,
"defaultColorPositiveLCAO", 0xFFFFA500,
"defaultSolventRadius", 1.2,
"defaultMepCutoff", 0.1,
"defaultMepMin", -0.1,
"defaultMepMax", 0.1,
"MEP_MAX_GRID", 40,
"QM_TYPE_UNKNOWN", 0,
"QM_TYPE_GAUSSIAN", 1,
"QM_TYPE_SLATER", 2,
"QM_TYPE_NCI_PRO", 3,
"QM_TYPE_NCI_SCF", 4,
"QM_TYPE_VOLUME_DATA", 5,
"MO_MAX_GRID", 80);
});
// 
//// org\jmol\jvxl\readers\SurfaceReader.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.api.VertexDataServer", "org.jmol.util.Point3f"], "org.jmol.jvxl.readers.SurfaceReader", ["java.lang.Float", "org.jmol.jvxl.calc.MarchingCubes", "$.MarchingSquares", "org.jmol.jvxl.data.JvxlCoder", "$.MeshData", "org.jmol.util.ArrayUtil", "$.BitSet", "$.BoxInfo", "$.Colix", "$.ColorEncoder", "$.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sg = null;
this.meshDataServer = null;
this.params = null;
this.meshData = null;
this.jvxlData = null;
this.volumeData = null;
this.edgeData = null;
this.haveSurfaceAtoms = false;
this.allowSigma = false;
this.isProgressive = false;
this.isXLowToHigh = false;
this.assocCutoff = 0.3;
this.isQuiet = false;
this.vertexDataOnly = false;
this.hasColorData = false;
this.dataMin = 3.4028235E38;
this.dataMax = -3.4028235E38;
this.dataMean = 0;
this.xyzMin = null;
this.xyzMax = null;
this.center = null;
this.anisotropy = null;
this.isAnisotropic = false;
this.eccentricityMatrix = null;
this.eccentricityMatrixInverse = null;
this.isEccentric = false;
this.eccentricityScale = 0;
this.eccentricityRatio = 0;
this.edgeCount = 0;
this.volumetricOrigin = null;
this.volumetricVectors = null;
this.voxelCounts = null;
this.voxelData = null;
this.nBytes = 0;
this.nDataPoints = 0;
this.nPointsX = 0;
this.nPointsY = 0;
this.nPointsZ = 0;
this.isJvxl = false;
this.edgeFractionBase = 0;
this.edgeFractionRange = 0;
this.colorFractionBase = 0;
this.colorFractionRange = 0;
this.jvxlFileHeaderBuffer = null;
this.fractionData = null;
this.jvxlEdgeDataRead = "";
this.jvxlColorDataRead = "";
this.jvxlVoxelBitSet = null;
this.jvxlDataIsColorMapped = false;
this.jvxlDataIsPrecisionColor = false;
this.jvxlDataIs2dContour = false;
this.jvxlDataIsColorDensity = false;
this.jvxlCutoff = 0;
this.jvxlNSurfaceInts = 0;
this.cJvxlEdgeNaN = '\0';
this.contourVertexCount = 0;
this.marchingSquares = null;
this.marchingCubes = null;
this.yzPlanes = null;
this.yzCount = 0;
this.qpc = null;
this.ptTemp = null;
this.minMax = null;
this.haveSetAnisotropy = false;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "SurfaceReader", null, org.jmol.jvxl.api.VertexDataServer);
Clazz.prepareFields (c$, function () {
this.ptTemp =  new org.jmol.util.Point3f ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "init2", 
function (surfaceGenerator, br) {
}, "org.jmol.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.defineMethod (c$, "init", 
function (sg) {
this.sg = sg;
this.params = sg.getParams ();
this.marchingSquares = sg.getMarchingSquares ();
this.assocCutoff = this.params.assocCutoff;
this.isXLowToHigh = this.params.isXLowToHigh;
this.center = this.params.center;
this.anisotropy = this.params.anisotropy;
this.isAnisotropic = this.params.isAnisotropic;
this.eccentricityMatrix = this.params.eccentricityMatrix;
this.eccentricityMatrixInverse = this.params.eccentricityMatrixInverse;
this.isEccentric = this.params.isEccentric;
this.eccentricityScale = this.params.eccentricityScale;
this.eccentricityRatio = this.params.eccentricityRatio;
this.meshData = sg.getMeshData ();
this.jvxlData = sg.getJvxlData ();
this.setVolumeData (sg.getVolumeData ());
this.meshDataServer = sg.getMeshDataServer ();
this.cJvxlEdgeNaN = String.fromCharCode (125);
}, "org.jmol.jvxl.readers.SurfaceGenerator");
Clazz.defineMethod (c$, "setOutputStream", 
function (os) {
}, "java.io.OutputStream");
Clazz.defineMethod (c$, "newVoxelDataCube", 
function () {
this.volumeData.setVoxelDataAsArray (this.voxelData =  Clazz.newFloatArray (this.nPointsX, this.nPointsY, this.nPointsZ, 0));
});
Clazz.defineMethod (c$, "setVolumeData", 
function (v) {
this.nBytes = 0;
this.volumetricOrigin = v.volumetricOrigin;
this.volumetricVectors = v.volumetricVectors;
this.voxelCounts = v.voxelCounts;
this.voxelData = v.getVoxelData ();
this.volumeData = v;
}, "org.jmol.jvxl.data.VolumeData");
Clazz.defineMethod (c$, "jvxlUpdateInfo", 
function () {
this.jvxlData.jvxlUpdateInfo (this.params.title, this.nBytes);
});
Clazz.defineMethod (c$, "readAndSetVolumeParameters", 
function (isMapData) {
if (!this.readVolumeParameters (isMapData)) return false;
if (this.vertexDataOnly) return true;
return (this.volumeData.setUnitVectors ());
}, "~B");
Clazz.defineMethod (c$, "createIsosurface", 
function (justForPlane) {
this.resetIsosurface ();
if (this.params.showTiming) org.jmol.util.Logger.startTimer ("isosurface creation");
this.jvxlData.cutoff = NaN;
if (!this.readAndSetVolumeParameters (justForPlane)) return false;
if (!justForPlane && !Float.isNaN (this.params.sigma) && !this.allowSigma) {
if (this.params.sigma > 0) org.jmol.util.Logger.error ("Reader does not support SIGMA option -- using cutoff 1.6");
this.params.cutoff = 1.6;
}if (this.params.sigma < 0) this.params.sigma = -this.params.sigma;
this.nPointsX = this.voxelCounts[0];
this.nPointsY = this.voxelCounts[1];
this.nPointsZ = this.voxelCounts[2];
this.jvxlData.isSlabbable = ((this.params.dataType & 1024) != 0);
this.jvxlData.insideOut = this.params.insideOut;
this.jvxlData.dataXYReversed = this.params.dataXYReversed;
this.jvxlData.isBicolorMap = this.params.isBicolorMap;
this.jvxlData.nPointsX = this.nPointsX;
this.jvxlData.nPointsY = this.nPointsY;
this.jvxlData.nPointsZ = this.nPointsZ;
this.jvxlData.jvxlVolumeDataXml = this.volumeData.xmlData;
this.jvxlData.voxelVolume = this.volumeData.voxelVolume;
if (justForPlane) {
this.volumeData.setMappingPlane (this.params.thePlane);
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.params.setMapRanges (this, false);
this.generateSurfaceData ();
this.volumeData.setMappingPlane (null);
} else {
if (!this.readVolumeData (false)) return false;
this.generateSurfaceData ();
}if (this.jvxlFileHeaderBuffer != null) {
var s = this.jvxlFileHeaderBuffer.toString ();
var i = s.indexOf ('\n', s.indexOf ('\n', s.indexOf ('\n') + 1) + 1) + 1;
this.jvxlData.jvxlFileTitle = s.substring (0, i);
}if (this.params.contactPair == null) this.setBoundingBox ();
if (!this.params.isSilent) org.jmol.util.Logger.info ("boundbox corners " + org.jmol.util.Escape.escapePt (this.xyzMin) + " " + org.jmol.util.Escape.escapePt (this.xyzMax));
this.jvxlData.boundingBox = [this.xyzMin, this.xyzMax];
this.jvxlData.dataMin = this.dataMin;
this.jvxlData.dataMax = this.dataMax;
this.jvxlData.cutoff = (this.isJvxl ? this.jvxlCutoff : this.params.cutoff);
this.jvxlData.isCutoffAbsolute = this.params.isCutoffAbsolute;
this.jvxlData.pointsPerAngstrom = 1 / this.volumeData.volumetricVectorLengths[0];
this.jvxlData.jvxlColorData = "";
this.jvxlData.jvxlPlane = this.params.thePlane;
this.jvxlData.jvxlEdgeData = this.edgeData;
this.jvxlData.isBicolorMap = this.params.isBicolorMap;
this.jvxlData.isContoured = this.params.isContoured;
this.jvxlData.colorDensity = this.params.colorDensity;
if (this.jvxlData.vContours != null) this.params.nContours = this.jvxlData.vContours.length;
this.jvxlData.nContours = (this.params.contourFromZero ? this.params.nContours : -1 - this.params.nContours);
this.jvxlData.nEdges = this.edgeCount;
this.jvxlData.edgeFractionBase = this.edgeFractionBase;
this.jvxlData.edgeFractionRange = this.edgeFractionRange;
this.jvxlData.colorFractionBase = this.colorFractionBase;
this.jvxlData.colorFractionRange = this.colorFractionRange;
this.jvxlData.jvxlDataIs2dContour = this.jvxlDataIs2dContour;
this.jvxlData.jvxlDataIsColorMapped = this.jvxlDataIsColorMapped;
this.jvxlData.jvxlDataIsColorDensity = this.jvxlDataIsColorDensity;
this.jvxlData.isXLowToHigh = this.isXLowToHigh;
this.jvxlData.vertexDataOnly = this.vertexDataOnly;
this.jvxlData.saveVertexCount = 0;
if (this.jvxlDataIsColorMapped || this.jvxlData.nVertexColors > 0) {
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshDataServer.fillMeshData (this.meshData, 2, null);
}this.jvxlData.jvxlColorData = this.readColorData ();
this.updateSurfaceData ();
if (this.meshDataServer != null) this.meshDataServer.notifySurfaceMappingCompleted ();
}if (this.params.showTiming) org.jmol.util.Logger.checkTimer ("isosurface creation", false);
return true;
}, "~B");
Clazz.defineMethod (c$, "resetIsosurface", 
function () {
this.meshData =  new org.jmol.jvxl.data.MeshData ();
this.xyzMin = this.xyzMax = null;
this.jvxlData.isBicolorMap = this.params.isBicolorMap;
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (null, 0, null);
this.contourVertexCount = 0;
if (this.params.cutoff == 3.4028235E38) this.params.cutoff = 0.02;
this.jvxlData.jvxlSurfaceData = "";
this.jvxlData.jvxlEdgeData = "";
this.jvxlData.jvxlColorData = "";
this.edgeCount = 0;
this.edgeFractionBase = 35;
this.edgeFractionRange = 90;
this.colorFractionBase = 35;
this.colorFractionRange = 90;
this.params.mappedDataMin = 3.4028235E38;
});
Clazz.defineMethod (c$, "discardTempData", 
function (discardAll) {
if (!discardAll) return;
this.voxelData = null;
this.sg.setMarchingSquares (this.marchingSquares = null);
this.marchingCubes = null;
}, "~B");
Clazz.defineMethod (c$, "initializeVolumetricData", 
function () {
this.nPointsX = this.voxelCounts[0];
this.nPointsY = this.voxelCounts[1];
this.nPointsZ = this.voxelCounts[2];
this.setVolumeData (this.volumeData);
});
Clazz.defineMethod (c$, "gotoAndReadVoxelData", 
function (isMapData) {
this.initializeVolumetricData ();
if (this.nPointsX > 0 && this.nPointsY > 0 && this.nPointsZ > 0) try {
this.gotoData (this.params.fileIndex - 1, this.nPointsX * this.nPointsY * this.nPointsZ);
this.readSurfaceData (isMapData);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error (e.toString ());
return false;
} else {
throw e;
}
}
return true;
}, "~B");
Clazz.defineMethod (c$, "gotoData", 
function (n, nPoints) {
}, "~N,~N");
Clazz.defineMethod (c$, "readColorData", 
function () {
return "";
});
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
if (this.yzCount == 0) this.initPlanes ();
if (this.qpc != null) this.qpc.getPlane (x, this.yzPlanes[x % 2]);
return this.yzPlanes[x % 2];
}, "~N");
Clazz.defineMethod (c$, "initPlanes", 
function () {
this.yzCount = this.nPointsY * this.nPointsZ;
if (!this.isQuiet) org.jmol.util.Logger.info ("reading data progressively -- yzCount = " + this.yzCount);
this.yzPlanes = org.jmol.util.ArrayUtil.newFloat2 (2);
this.yzPlanes[0] =  Clazz.newFloatArray (this.yzCount, 0);
this.yzPlanes[1] =  Clazz.newFloatArray (this.yzCount, 0);
});
Clazz.overrideMethod (c$, "getValue", 
function (x, y, z, ptyz) {
if (this.yzPlanes == null) return this.voxelData[x][y][z];
return this.yzPlanes[x % 2][ptyz];
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "generateSurfaceData", 
($fz = function () {
this.edgeData = "";
if (this.vertexDataOnly) {
try {
this.readSurfaceData (false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
org.jmol.util.Logger.error ("Exception in SurfaceReader::readSurfaceData: " + e.toString ());
} else {
throw e;
}
}
return;
}this.contourVertexCount = 0;
var contourType = -1;
this.marchingSquares = null;
if (this.params.thePlane != null || this.params.isContoured) {
this.marchingSquares =  new org.jmol.jvxl.calc.MarchingSquares (this, this.volumeData, this.params.thePlane, this.params.contoursDiscrete, this.params.nContours, this.params.thisContour, this.params.contourFromZero);
contourType = this.marchingSquares.getContourType ();
this.marchingSquares.setMinMax (this.params.valueMappedToRed, this.params.valueMappedToBlue);
}this.params.contourType = contourType;
this.params.isXLowToHigh = this.isXLowToHigh;
this.marchingCubes =  new org.jmol.jvxl.calc.MarchingCubes (this, this.volumeData, this.params, this.jvxlVoxelBitSet);
var data = this.marchingCubes.getEdgeData ();
if (this.params.thePlane == null) this.edgeData = data;
this.jvxlData.setSurfaceInfoFromBitSetPts (this.marchingCubes.getBsVoxels (), this.params.thePlane, this.params.mapLattice);
this.jvxlData.jvxlExcluded = this.params.bsExcluded;
if (this.isJvxl) this.edgeData = this.jvxlEdgeDataRead;
this.postProcessVertices ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "postProcessVertices", 
function () {
});
Clazz.overrideMethod (c$, "getSurfacePointIndexAndFraction", 
function (cutoff, isCutoffAbsolute, x, y, z, offset, vA, vB, valueA, valueB, pointA, edgeVector, isContourType, fReturn) {
var thisValue = this.getSurfacePointAndFraction (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, this.ptTemp);
if (this.marchingSquares != null && this.params.isContoured) return this.marchingSquares.addContourVertex (this.ptTemp, cutoff);
var assocVertex = (this.assocCutoff > 0 ? (fReturn[0] < this.assocCutoff ? vA : fReturn[0] > 1 - this.assocCutoff ? vB : -1) : -1);
if (assocVertex >= 0) assocVertex = this.marchingCubes.getLinearOffset (x, y, z, assocVertex);
var n = this.addVertexCopy (this.ptTemp, thisValue, assocVertex);
if (n >= 0 && this.params.iAddGridPoints) {
this.marchingCubes.calcVertexPoint (x, y, z, vB, this.ptTemp);
this.addVertexCopy (valueA < valueB ? pointA : this.ptTemp, Math.min (valueA, valueB), -3);
this.addVertexCopy (valueA < valueB ? this.ptTemp : pointA, Math.max (valueA, valueB), -3);
}return n;
}, "~N,~B,~N,~N,~N,org.jmol.util.Point3i,~N,~N,~N,~N,org.jmol.util.Point3f,org.jmol.util.Vector3f,~B,~A");
Clazz.defineMethod (c$, "getSurfacePointAndFraction", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn) {
var diff = valueB - valueA;
var fraction = (cutoff - valueA) / diff;
if (isCutoffAbsolute && (fraction < 0 || fraction > 1)) fraction = (-cutoff - valueA) / diff;
if (fraction < 0 || fraction > 1) {
fraction = NaN;
}fReturn[0] = fraction;
ptReturn.scaleAdd2 (fraction, edgeVector, pointA);
return valueA + fraction * diff;
}, "~N,~B,~N,~N,org.jmol.util.Point3f,org.jmol.util.Vector3f,~N,~N,~N,~N,~N,~A,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "addVertexCopy", 
function (vertexXYZ, value, assocVertex) {
if (Float.isNaN (value) && assocVertex != -3) return -1;
if (this.meshDataServer == null) return this.meshData.addVertexCopy (vertexXYZ, value, assocVertex);
return this.meshDataServer.addVertexCopy (vertexXYZ, value, assocVertex);
}, "org.jmol.util.Point3f,~N,~N");
Clazz.defineMethod (c$, "addTriangleCheck", 
function (iA, iB, iC, check, check2, isAbsolute, color) {
if (this.marchingSquares != null && this.params.isContoured) {
if (color == 0) return this.marchingSquares.addTriangle (iA, iB, iC, check, check2);
color = 0;
}return (this.meshDataServer != null ? this.meshDataServer.addTriangleCheck (iA, iB, iC, check, check2, isAbsolute, color) : isAbsolute && !org.jmol.jvxl.data.MeshData.checkCutoff (iA, iB, iC, this.meshData.vertexValues) ? -1 : this.meshData.addTriangleCheck (iA, iB, iC, check, check2, color));
}, "~N,~N,~N,~N,~N,~B,~N");
Clazz.defineMethod (c$, "colorIsosurface", 
function () {
if (this.params.isSquared && this.volumeData != null) this.volumeData.filterData (true, NaN);
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 1, null);
}this.jvxlData.saveVertexCount = 0;
if (this.params.isContoured && this.marchingSquares != null) {
this.initializeMapping ();
this.params.setMapRanges (this, false);
this.marchingSquares.setMinMax (this.params.valueMappedToRed, this.params.valueMappedToBlue);
this.jvxlData.saveVertexCount = this.marchingSquares.contourVertexCount;
this.contourVertexCount = this.marchingSquares.generateContourData (this.jvxlDataIs2dContour, (this.params.isSquared ? 1e-8 : 1e-4));
this.jvxlData.contourValuesUsed = this.marchingSquares.getContourValues ();
this.minMax = this.marchingSquares.getMinMax ();
if (this.meshDataServer != null) this.meshDataServer.notifySurfaceGenerationCompleted ();
this.finalizeMapping ();
}this.applyColorScale ();
this.jvxlData.nContours = (this.params.contourFromZero ? this.params.nContours : -1 - this.params.nContours);
this.jvxlData.jvxlFileMessage = "mapped: min = " + this.params.valueMappedToRed + "; max = " + this.params.valueMappedToBlue;
});
Clazz.defineMethod (c$, "applyColorScale", 
function () {
this.colorFractionBase = this.jvxlData.colorFractionBase = 35;
this.colorFractionRange = this.jvxlData.colorFractionRange = 90;
if (this.params.colorPhase == 0) this.params.colorPhase = 1;
if (this.meshDataServer == null) {
this.meshData.vertexColixes =  Clazz.newShortArray (this.meshData.vertexCount, 0);
} else {
this.meshDataServer.fillMeshData (this.meshData, 1, null);
if (this.params.contactPair == null) this.meshDataServer.fillMeshData (this.meshData, 2, null);
}var saveColorData = (this.params.colorDensity || this.params.isBicolorMap || this.params.colorBySign || !this.params.colorByPhase);
if (this.params.contactPair != null) saveColorData = false;
this.jvxlData.isJvxlPrecisionColor = true;
this.jvxlData.vertexCount = (this.contourVertexCount > 0 ? this.contourVertexCount : this.meshData.vertexCount);
this.jvxlData.minColorIndex = -1;
this.jvxlData.maxColorIndex = 0;
this.jvxlData.contourValues = this.params.contoursDiscrete;
this.jvxlData.isColorReversed = this.params.isColorReversed;
if (!this.params.colorDensity) if (this.params.isBicolorMap && !this.params.isContoured || this.params.colorBySign) {
this.jvxlData.minColorIndex = org.jmol.util.Colix.getColixTranslucent3 (org.jmol.util.Colix.getColix (this.params.isColorReversed ? this.params.colorPos : this.params.colorNeg), this.jvxlData.translucency != 0, this.jvxlData.translucency);
this.jvxlData.maxColorIndex = org.jmol.util.Colix.getColixTranslucent3 (org.jmol.util.Colix.getColix (this.params.isColorReversed ? this.params.colorNeg : this.params.colorPos), this.jvxlData.translucency != 0, this.jvxlData.translucency);
}this.jvxlData.isTruncated = (this.jvxlData.minColorIndex >= 0 && !this.params.isContoured);
var useMeshDataValues = this.jvxlDataIs2dContour || this.hasColorData || this.vertexDataOnly || this.params.colorDensity || this.params.isBicolorMap && !this.params.isContoured;
if (!useMeshDataValues) {
if (this.haveSurfaceAtoms && this.meshData.vertexSource == null) this.meshData.vertexSource =  Clazz.newIntArray (this.meshData.vertexCount, 0);
var min = 3.4028235E38;
var max = -3.4028235E38;
var value;
this.initializeMapping ();
for (var i = this.meshData.vertexCount; --i >= this.meshData.mergeVertexCount0; ) {
if (this.params.colorBySets) {
value = this.meshData.vertexSets[i];
} else if (this.params.colorByPhase) {
value = this.getPhase (this.meshData.vertices[i]);
} else {
value = this.volumeData.lookupInterpolatedVoxelValue (this.meshData.vertices[i]);
if (this.haveSurfaceAtoms) this.meshData.vertexSource[i] = this.getSurfaceAtomIndex ();
}if (value < min) min = value;
if (value > max && value != 3.4028235E38) max = value;
this.meshData.vertexValues[i] = value;
}
if (this.params.rangeSelected && this.minMax == null) this.minMax = [min, max];
this.finalizeMapping ();
}this.params.setMapRanges (this, true);
this.jvxlData.mappedDataMin = this.params.mappedDataMin;
this.jvxlData.mappedDataMax = this.params.mappedDataMax;
this.jvxlData.valueMappedToRed = this.params.valueMappedToRed;
this.jvxlData.valueMappedToBlue = this.params.valueMappedToBlue;
if (this.params.contactPair == null) this.colorData ();
org.jmol.jvxl.data.JvxlCoder.jvxlCreateColorData (this.jvxlData, (saveColorData ? this.meshData.vertexValues : null));
if (this.haveSurfaceAtoms && this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 4, null);
if (this.meshDataServer != null && this.params.colorBySets) this.meshDataServer.fillMeshData (this.meshData, 3, null);
});
Clazz.defineMethod (c$, "colorData", 
($fz = function () {
var vertexValues = this.meshData.vertexValues;
var vertexColixes = this.meshData.vertexColixes;
this.meshData.polygonColixes = null;
var valueBlue = this.jvxlData.valueMappedToBlue;
var valueRed = this.jvxlData.valueMappedToRed;
var minColorIndex = this.jvxlData.minColorIndex;
var maxColorIndex = this.jvxlData.maxColorIndex;
if (this.params.colorEncoder == null) this.params.colorEncoder =  new org.jmol.util.ColorEncoder (null);
this.params.colorEncoder.setRange (this.params.valueMappedToRed, this.params.valueMappedToBlue, this.params.isColorReversed);
for (var i = this.meshData.vertexCount; --i >= 0; ) {
var value = vertexValues[i];
if (minColorIndex >= 0) {
if (value <= 0) vertexColixes[i] = minColorIndex;
 else if (value > 0) vertexColixes[i] = maxColorIndex;
} else {
if (value <= valueRed) value = valueRed;
if (value >= valueBlue) value = valueBlue;
vertexColixes[i] = this.params.colorEncoder.getColorIndex (value);
}}
if ((this.params.nContours > 0 || this.jvxlData.contourValues != null) && this.jvxlData.contourColixes == null) {
var n = (this.jvxlData.contourValues == null ? this.params.nContours : this.jvxlData.contourValues.length);
var colors = this.jvxlData.contourColixes =  Clazz.newShortArray (n, 0);
var values = this.jvxlData.contourValues;
if (values == null) values = this.jvxlData.contourValuesUsed;
if (this.jvxlData.contourValuesUsed == null) this.jvxlData.contourValuesUsed = (values == null ?  Clazz.newFloatArray (n, 0) : values);
var dv = (valueBlue - valueRed) / (n + 1);
this.params.colorEncoder.setRange (this.params.valueMappedToRed, this.params.valueMappedToBlue, this.params.isColorReversed);
for (var i = 0; i < n; i++) {
var v = (values == null ? valueRed + (i + 1) * dv : values[i]);
this.jvxlData.contourValuesUsed[i] = v;
colors[i] = org.jmol.util.Colix.getColixTranslucent (this.params.colorEncoder.getArgb (v));
}
this.jvxlData.contourColors = org.jmol.util.Colix.getHexCodes (colors);
}}, $fz.isPrivate = true, $fz));
c$.getColorPhaseIndex = Clazz.defineMethod (c$, "getColorPhaseIndex", 
function (color) {
var colorPhase = -1;
for (var i = 0; i < org.jmol.jvxl.readers.SurfaceReader.colorPhases.length; i++) if (color.equalsIgnoreCase (org.jmol.jvxl.readers.SurfaceReader.colorPhases[i])) {
colorPhase = i;
break;
}
return colorPhase;
}, "~S");
Clazz.defineMethod (c$, "getPhase", 
($fz = function (pt) {
switch (this.params.colorPhase) {
case 0:
case -1:
case 1:
return (pt.x > 0 ? 1 : -1);
case 2:
return (pt.y > 0 ? 1 : -1);
case 3:
return (pt.z > 0 ? 1 : -1);
case 4:
return (pt.x * pt.y > 0 ? 1 : -1);
case 5:
return (pt.y * pt.z > 0 ? 1 : -1);
case 6:
return (pt.x * pt.z > 0 ? 1 : -1);
case 7:
return (pt.x * pt.x - pt.y * pt.y > 0 ? 1 : -1);
case 8:
return (pt.z * pt.z * 2 - pt.x * pt.x - pt.y * pt.y > 0 ? 1 : -1);
}
return 1;
}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "getMinMaxMappedValues", 
function (haveData) {
if (this.minMax != null && this.minMax[0] != 3.4028235E38) return this.minMax;
if (this.params.colorBySets) return (this.minMax = [0, Math.max (this.meshData.nSets - 1, 0)]);
var min = 3.4028235E38;
var max = -3.4028235E38;
if (this.params.usePropertyForColorRange && this.params.theProperty != null) {
for (var i = 0; i < this.params.theProperty.length; i++) {
if (this.params.rangeSelected && !this.params.bsSelected.get (i)) continue;
var p = this.params.theProperty[i];
if (Float.isNaN (p)) continue;
if (p < min) min = p;
if (p > max) max = p;
}
return (this.minMax = [min, max]);
}var vertexCount = (this.contourVertexCount > 0 ? this.contourVertexCount : this.meshData.vertexCount);
var vertexes = this.meshData.vertices;
var useVertexValue = (haveData || this.jvxlDataIs2dContour || this.vertexDataOnly || this.params.colorDensity);
for (var i = this.meshData.mergeVertexCount0; i < vertexCount; i++) {
var v;
if (useVertexValue) v = this.meshData.vertexValues[i];
 else v = this.volumeData.lookupInterpolatedVoxelValue (vertexes[i]);
if (v < min) min = v;
if (v > max && v != 3.4028235E38) max = v;
}
return (this.minMax = [min, max]);
}, "~B");
Clazz.defineMethod (c$, "updateTriangles", 
function () {
if (this.meshDataServer == null) {
this.meshData.invalidatePolygons ();
} else {
this.meshDataServer.invalidateTriangles ();
}});
Clazz.defineMethod (c$, "updateSurfaceData", 
function () {
this.meshData.setVertexSets (true);
this.updateTriangles ();
if (this.params.bsExcluded[1] == null) this.params.bsExcluded[1] =  new org.jmol.util.BitSet ();
this.meshData.updateInvalidatedVertices (this.params.bsExcluded[1]);
});
Clazz.defineMethod (c$, "selectPocket", 
function (doExclude) {
}, "~B");
Clazz.defineMethod (c$, "excludeMinimumSet", 
function () {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.getSurfaceSet ();
var bs;
for (var i = this.meshData.nSets; --i >= 0; ) if ((bs = this.meshData.surfaceSet[i]) != null && bs.cardinality () < this.params.minSet) this.meshData.invalidateSurfaceSet (i);

this.updateSurfaceData ();
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 3, null);
});
Clazz.defineMethod (c$, "excludeMaximumSet", 
function () {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.getSurfaceSet ();
var bs;
for (var i = this.meshData.nSets; --i >= 0; ) if ((bs = this.meshData.surfaceSet[i]) != null && bs.cardinality () > this.params.maxSet) this.meshData.invalidateSurfaceSet (i);

this.updateSurfaceData ();
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 3, null);
});
Clazz.defineMethod (c$, "slabIsosurface", 
function (slabInfo) {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.meshData.slabPolygonsList (slabInfo, true);
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 4, null);
}, "java.util.List");
Clazz.defineMethod (c$, "setVertexAnisotropy", 
function (pt) {
pt.x *= this.anisotropy[0];
pt.y *= this.anisotropy[1];
pt.z *= this.anisotropy[2];
pt.add (this.center);
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setVectorAnisotropy", 
function (v) {
this.haveSetAnisotropy = true;
v.x *= this.anisotropy[0];
v.y *= this.anisotropy[1];
v.z *= this.anisotropy[2];
}, "org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "setVolumetricAnisotropy", 
function () {
if (this.haveSetAnisotropy) return;
this.setVolumetricOriginAnisotropy ();
this.setVectorAnisotropy (this.volumetricVectors[0]);
this.setVectorAnisotropy (this.volumetricVectors[1]);
this.setVectorAnisotropy (this.volumetricVectors[2]);
});
Clazz.defineMethod (c$, "setVolumetricOriginAnisotropy", 
function () {
this.volumetricOrigin.setT (this.center);
});
Clazz.defineMethod (c$, "setBoundingBox", 
($fz = function () {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
this.xyzMin = null;
for (var i = 0; i < this.meshData.vertexCount; i++) {
var p = this.meshData.vertices[i];
if (!Float.isNaN (p.x)) this.setBoundingBox (p, 0);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setBoundingBox", 
function (pt, margin) {
if (this.xyzMin == null) {
this.xyzMin = org.jmol.util.Point3f.new3 (3.4028235E38, 3.4028235E38, 3.4028235E38);
this.xyzMax = org.jmol.util.Point3f.new3 (-3.4028235E38, -3.4028235E38, -3.4028235E38);
}org.jmol.util.BoxInfo.addPoint (pt, this.xyzMin, this.xyzMax, margin);
}, "org.jmol.util.Point3f,~N");
Clazz.defineMethod (c$, "getValueAtPoint", 
function (pt) {
return 0;
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "initializeMapping", 
function () {
});
Clazz.defineMethod (c$, "finalizeMapping", 
function () {
});
Clazz.defineMethod (c$, "getSurfaceAtomIndex", 
function () {
return -1;
});
Clazz.defineMethod (c$, "getSpanningVectors", 
function () {
return (this.volumeData == null ? null : this.volumeData.getSpanningVectors ());
});
Clazz.defineStatics (c$,
"ANGSTROMS_PER_BOHR", 0.5291772,
"defaultMappedDataMin", 0,
"defaultMappedDataMax", 1.0,
"defaultCutoff", 0.02,
"colorPhases", ["_orb", "x", "y", "z", "xy", "yz", "xz", "x2-y2", "z2"]);
});
// 
//// org\jmol\jvxl\calc\MarchingCubes.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.calc");
Clazz.load (["org.jmol.util.TriangleData", "$.BitSet", "$.Point3f", "$.StringXBuilder", "$.Vector3f"], "org.jmol.jvxl.calc.MarchingCubes", ["java.lang.Float", "org.jmol.jvxl.data.JvxlCoder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.surfaceReader = null;
this.volumeData = null;
this.contourType = 0;
this.isContoured = false;
this.cutoff = 0;
this.isCutoffAbsolute = false;
this.isSquared = false;
this.isXLowToHigh = false;
this.cubeCountX = 0;
this.cubeCountY = 0;
this.cubeCountZ = 0;
this.nY = 0;
this.nZ = 0;
this.yzCount = 0;
this.colorDensity = false;
this.integrateSquared = true;
this.bsVoxels = null;
this.bsExcludedVertices = null;
this.bsExcludedTriangles = null;
this.bsExcludedPlanes = null;
this.edgeData = null;
this.excludePartialCubes = true;
this.mode = 0;
this.vertexValues = null;
this.edgeCount = 0;
this.voxelVertexVectors = null;
this.edgeVectors = null;
this.edgePointIndexes = null;
this.isoPointIndexPlanes = null;
this.yzPlanes = null;
this.mappingPlane = null;
this.allInside = false;
this.$isInside = false;
this.offset = null;
this.voxelData = null;
this.nTriangles = 0;
this.bsValues = null;
this.pt0 = null;
this.pointA = null;
this.edgeVertexPointers = null;
this.edgeVertexPlanes = null;
this.fReturn = null;
this.linearOffsets = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.calc, "MarchingCubes", org.jmol.util.TriangleData);
Clazz.prepareFields (c$, function () {
this.edgeData =  new org.jmol.util.StringXBuilder ();
this.vertexValues =  Clazz.newFloatArray (8, 0);
this.voxelVertexVectors =  new Array (8);
this.edgeVectors =  new Array (12);
{
for (var i = 12; --i >= 0; ) this.edgeVectors[i] =  new org.jmol.util.Vector3f ();

}this.edgePointIndexes =  Clazz.newIntArray (12, 0);
this.bsValues =  new org.jmol.util.BitSet ();
this.pt0 =  new org.jmol.util.Point3f ();
this.pointA =  new org.jmol.util.Point3f ();
this.fReturn =  Clazz.newFloatArray (1, 0);
this.linearOffsets =  Clazz.newIntArray (8, 0);
});
Clazz.defineMethod (c$, "getBsVoxels", 
function () {
return this.bsVoxels;
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.calc.MarchingCubes, []);
});
Clazz.makeConstructor (c$, 
function (surfaceReader, volumeData, params, bsVoxels) {
Clazz.superConstructor (this, org.jmol.jvxl.calc.MarchingCubes, []);
this.excludePartialCubes = true;
this.surfaceReader = surfaceReader;
this.bsVoxels = bsVoxels;
var bsExcluded = params.bsExcluded;
this.bsExcludedVertices = (bsExcluded[0] == null ? bsExcluded[0] =  new org.jmol.util.BitSet () : bsExcluded[0]);
this.bsExcludedPlanes = (bsExcluded[2] == null ? bsExcluded[2] =  new org.jmol.util.BitSet () : bsExcluded[2]);
this.bsExcludedTriangles = (bsExcluded[3] == null ? bsExcluded[3] =  new org.jmol.util.BitSet () : bsExcluded[3]);
this.mode = (volumeData.getVoxelData () != null || volumeData.mappingPlane != null ? 1 : bsVoxels != null ? 2 : 3);
this.setParameters (volumeData, params);
}, "org.jmol.jvxl.api.VertexDataServer,org.jmol.jvxl.data.VolumeData,org.jmol.jvxl.readers.Parameters,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setParameters", 
function (volumeData, params) {
this.volumeData = volumeData;
this.colorDensity = params.colorDensity;
this.isContoured = params.thePlane == null && params.isContoured && !this.colorDensity;
this.cutoff = params.cutoff;
this.isCutoffAbsolute = params.isCutoffAbsolute;
this.contourType = params.contourType;
this.isSquared = params.isSquared;
this.isXLowToHigh = params.isXLowToHigh;
this.cubeCountX = volumeData.voxelCounts[0] - 1;
this.cubeCountY = volumeData.voxelCounts[1] - 1;
this.cubeCountZ = volumeData.voxelCounts[2] - 1;
volumeData.getYzCount ();
if (params.mapLattice != null) {
this.cubeCountX *= Math.abs (params.mapLattice.x);
this.cubeCountY *= Math.abs (params.mapLattice.y);
this.cubeCountZ *= Math.abs (params.mapLattice.z);
}this.nY = this.cubeCountY + 1;
this.nZ = this.cubeCountZ + 1;
this.yzCount = this.nY * this.nZ;
if (this.bsVoxels == null) this.bsVoxels =  new org.jmol.util.BitSet ();
this.edgeVertexPointers = (this.isXLowToHigh ? org.jmol.jvxl.calc.MarchingCubes.edgeVertexPointersLowToHigh : org.jmol.jvxl.calc.MarchingCubes.edgeVertexPointersHighToLow);
this.edgeVertexPlanes = (this.isXLowToHigh ? org.jmol.jvxl.calc.MarchingCubes.edgeVertexPlanesLowToHigh : org.jmol.jvxl.calc.MarchingCubes.edgeVertexPlanesHighToLow);
this.isoPointIndexPlanes =  Clazz.newIntArray (2, this.yzCount, 3, 0);
this.yzPlanes = (this.mode == 3 ?  Clazz.newFloatArray (2, this.yzCount, 0) : null);
this.setLinearOffsets ();
this.calcVoxelVertexVectors ();
}, "org.jmol.jvxl.data.VolumeData,org.jmol.jvxl.readers.Parameters");
Clazz.defineMethod (c$, "calcVoxelVertexVectors", 
function () {
for (var i = 8; --i >= 0; ) this.volumeData.transform (org.jmol.jvxl.calc.MarchingCubes.cubeVertexVectors[i], this.voxelVertexVectors[i] =  new org.jmol.util.Vector3f ());

for (var i = 12; --i >= 0; ) this.edgeVectors[i].sub2 (this.voxelVertexVectors[org.jmol.util.TriangleData.edgeVertexes[i + i + 1]], this.voxelVertexVectors[org.jmol.util.TriangleData.edgeVertexes[i + i]]);

});
Clazz.defineMethod (c$, "resetIndexPlane", 
function (plane) {
for (var i = 0; i < this.yzCount; i++) for (var j = 0; j < 3; j++) plane[i][j] = -2147483648;


return plane;
}, "~A");
Clazz.defineMethod (c$, "getEdgeData", 
function () {
if (this.cubeCountX < 0 || this.cubeCountY < 0 || this.cubeCountZ < 0) return "";
this.mappingPlane = this.volumeData.mappingPlane;
var insideCount = 0;
var outsideCount = 0;
var surfaceCount = 0;
this.edgeCount = 0;
var x0;
var x1;
var xStep;
var ptStep;
var pt;
var ptX;
if (this.isXLowToHigh) {
x0 = 0;
x1 = this.cubeCountX + (this.colorDensity ? 1 : 0);
if (this.colorDensity) {
x1 = this.cubeCountX + 1;
ptX = this.yzCount - 1;
} else {
x1 = this.cubeCountX;
ptX = (this.yzCount - 1) - this.nZ - 1;
}xStep = 1;
ptStep = this.yzCount;
} else {
if (this.colorDensity) {
x0 = this.cubeCountX;
ptX = (this.cubeCountX + 1) * this.yzCount - 1;
} else {
x0 = this.cubeCountX - 1;
ptX = (this.cubeCountX * this.yzCount - 1) - this.nZ - 1;
}x1 = -1;
xStep = -1;
ptStep = -this.yzCount;
}pt = ptX;
this.resetIndexPlane (this.isoPointIndexPlanes[1]);
this.voxelData = null;
var y1 = this.cubeCountY + (this.colorDensity ? 1 : 0);
var z1 = this.cubeCountZ + (this.colorDensity ? 1 : 0);
switch (this.mode) {
case 3:
this.getPlane (x0, false);
break;
case 1:
this.voxelData = this.volumeData.getVoxelData ();
break;
}
this.allInside = (this.colorDensity && (this.cutoff == 0 || this.mode == 2 && this.bsVoxels.cardinality () == 0));
var colorDensityAll = (this.colorDensity && this.cutoff == 0);
var v = 0;
for (var x = x0; x != x1; x += xStep, ptX += ptStep, pt = ptX) {
if (this.mode == 3) {
if (x + xStep <= x1) this.getPlane (x + xStep, true);
}if (this.bsExcludedPlanes.get (x) && this.bsExcludedPlanes.get (x + xStep)) continue;
if (this.colorDensity) {
for (var y = y1; --y >= 0; ) for (var z = z1; --z >= 0; pt--) {
v = this.getValue (x, y, z, pt, 0);
if (colorDensityAll || this.$isInside) {
this.addVertex (x, y, z, pt, v);
}}

continue;
}var indexPlane = this.isoPointIndexPlanes[0];
this.isoPointIndexPlanes[0] = this.isoPointIndexPlanes[1];
this.isoPointIndexPlanes[1] = this.resetIndexPlane (indexPlane);
var noValues = true;
for (var y = y1; --y >= 0; pt--) {
for (var z = z1; --z >= 0; pt--) {
var insideMask = 0;
for (var i = 8; --i >= 0; ) {
v = this.getValue (x, y, z, pt, i);
if (this.$isInside) insideMask |= org.jmol.util.TriangleData.Pwr2[i];
}
if (noValues && !Float.isNaN (v)) noValues = false;
if (insideMask == 0) {
++outsideCount;
continue;
}if (insideMask == 0xFF) {
++insideCount;
continue;
}++surfaceCount;
if (this.processOneCubical (insideMask, x, y, z, pt) && !this.isContoured && !this.colorDensity) {
this.processTriangles (insideMask);
}}
}
if (noValues) {
this.bsExcludedPlanes.set (x);
}}
return this.edgeData.toString ();
});
Clazz.defineMethod (c$, "getValue", 
($fz = function (x, y, z, pt, i) {
var v;
this.offset = org.jmol.util.TriangleData.cubeVertexOffsets[i];
var pti = pt + this.linearOffsets[i];
switch (this.mode) {
case 3:
v = this.vertexValues[i] = this.getValueArray (x + this.offset.x, y + this.offset.y, z + this.offset.z, pti, this.yzPlanes[org.jmol.jvxl.calc.MarchingCubes.yzPlanePts[i]]);
this.$isInside = (this.allInside || this.bsVoxels.get (pti));
break;
case 2:
this.$isInside = (this.allInside || this.bsVoxels.get (pti));
v = this.vertexValues[i] = (this.bsExcludedVertices.get (pti) ? NaN : this.$isInside ? 1 : 0);
break;
default:
case 1:
if (this.mappingPlane == null) {
v = this.vertexValues[i] = this.voxelData[x + this.offset.x][y + this.offset.y][z + this.offset.z];
} else {
this.volumeData.voxelPtToXYZ (x + this.offset.x, y + this.offset.y, z + this.offset.z, this.pt0);
v = this.vertexValues[i] = this.volumeData.distanceToMappingPlane (this.pt0);
}if (this.isSquared) this.vertexValues[i] *= this.vertexValues[i];
this.$isInside = (this.allInside ? true : org.jmol.jvxl.calc.MarchingCubes.isInside (this.vertexValues[i], this.cutoff, this.isCutoffAbsolute));
if (this.$isInside) this.bsVoxels.set (pti);
}
return v;
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getPlane", 
($fz = function (i, andSwap) {
if (i < 0 || i > this.cubeCountX) return;
this.surfaceReader.getPlane (i);
if (andSwap) {
var plane = this.yzPlanes[0];
this.yzPlanes[0] = this.yzPlanes[1];
this.yzPlanes[1] = plane;
}}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "processTriangles", 
function (insideMask) {
var triangles = org.jmol.util.TriangleData.triangleTable2[insideMask];
for (var i = triangles.length; (i -= 4) >= 0; ) this.addTriangle (triangles[i], triangles[i + 1], triangles[i + 2], triangles[i + 3]);

}, "~N");
Clazz.defineMethod (c$, "addVertex", 
function (x, y, z, pti, value) {
this.volumeData.voxelPtToXYZ (x, y, z, this.pt0);
if (this.surfaceReader.addVertexCopy (this.pt0, value, -4) < 0) this.bsExcludedVertices.set (pti);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addTriangle", 
function (ia, ib, ic, edgeType) {
if (!this.bsExcludedTriangles.get (this.nTriangles) && this.surfaceReader.addTriangleCheck (this.edgePointIndexes[ia], this.edgePointIndexes[ib], this.edgePointIndexes[ic], edgeType, 0, this.isCutoffAbsolute, 0) < 0) {
this.bsExcludedTriangles.set (this.nTriangles);
}this.nTriangles++;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getValueArray", 
function (x, y, z, pt, tempValues) {
var ptyz = pt % this.yzCount;
this.bsValues.set (pt);
var value = this.surfaceReader.getValue (x, y, z, ptyz);
if (this.isSquared) value *= value;
tempValues[ptyz] = value;
if (org.jmol.jvxl.calc.MarchingCubes.isInside (value, this.cutoff, this.isCutoffAbsolute)) this.bsVoxels.set (pt);
return value;
}, "~N,~N,~N,~N,~A");
c$.isInside = Clazz.defineMethod (c$, "isInside", 
function (voxelValue, max, isAbsolute) {
return ((max > 0 && (isAbsolute ? Math.abs (voxelValue) : voxelValue) >= max) || (max <= 0 && voxelValue <= max));
}, "~N,~N,~B");
Clazz.defineMethod (c$, "processOneCubical", 
function (insideMask, x, y, z, pt) {
var edgeMask = org.jmol.jvxl.calc.MarchingCubes.insideMaskTable[insideMask];
var isNaN = false;
for (var iEdge = 12; --iEdge >= 0; ) {
var xEdge = org.jmol.util.TriangleData.Pwr2[iEdge];
if ((edgeMask & xEdge) == 0) continue;
var iPlane = this.edgeVertexPlanes[iEdge];
var iPt = (pt + this.linearOffsets[this.edgeVertexPointers[iEdge]]) % this.yzCount;
var iType = org.jmol.jvxl.calc.MarchingCubes.edgeTypeTable[iEdge];
var index = this.edgePointIndexes[iEdge] = this.isoPointIndexPlanes[iPlane][iPt][iType];
if (index != -2147483648) {
if (index == -1) isNaN = this.excludePartialCubes;
continue;
}var vertexA = org.jmol.util.TriangleData.edgeVertexes[iEdge << 1];
var vertexB = org.jmol.util.TriangleData.edgeVertexes[(iEdge << 1) + 1];
var valueA = this.vertexValues[vertexA];
var valueB = this.vertexValues[vertexB];
this.calcVertexPoint (x, y, z, vertexA, this.pointA);
this.edgeCount++;
var i = this.edgePointIndexes[iEdge] = this.isoPointIndexPlanes[iPlane][iPt][iType] = this.surfaceReader.getSurfacePointIndexAndFraction (this.cutoff, this.isCutoffAbsolute, x, y, z, org.jmol.util.TriangleData.cubeVertexOffsets[vertexA], vertexA, vertexB, valueA, valueB, this.pointA, this.edgeVectors[iEdge], iType == this.contourType, this.fReturn);
this.addEdgeData (i < 0 ? NaN : this.fReturn[0]);
if (Float.isNaN (this.fReturn[0]) || i < 0) isNaN = this.excludePartialCubes;
}
return !isNaN;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addEdgeData", 
function (f) {
var ch = org.jmol.jvxl.data.JvxlCoder.jvxlFractionAsCharacter (f);
this.edgeData.appendC (ch);
}, "~N");
Clazz.defineMethod (c$, "calcVertexPoint", 
function (x, y, z, vertex, pt) {
this.volumeData.voxelPtToXYZ (x, y, z, this.pt0);
pt.add2 (this.pt0, this.voxelVertexVectors[vertex]);
}, "~N,~N,~N,~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setLinearOffsets", 
function () {
this.linearOffsets[0] = 0;
this.linearOffsets[1] = this.yzCount;
this.linearOffsets[2] = this.yzCount + 1;
this.linearOffsets[3] = 1;
this.linearOffsets[4] = this.nZ;
this.linearOffsets[5] = this.yzCount + this.nZ;
this.linearOffsets[6] = this.yzCount + this.nZ + 1;
this.linearOffsets[7] = this.nZ + 1;
});
Clazz.defineMethod (c$, "getLinearOffset", 
function (x, y, z, offset) {
return x * this.yzCount + y * this.nZ + z + this.linearOffsets[offset];
}, "~N,~N,~N,~N");
Clazz.defineStatics (c$,
"MODE_CUBE", 1,
"MODE_JVXL", 2,
"MODE_PLANES", 3);
Clazz.defineStatics (c$,
"yzPlanePts", [0, 1, 1, 0, 0, 1, 1, 0],
"edgeVertexPointersLowToHigh", [1, 1, 2, 0, 5, 5, 6, 4, 0, 1, 2, 3],
"edgeVertexPointersHighToLow", [0, 1, 3, 0, 4, 5, 7, 4, 0, 1, 2, 3],
"edgeVertexPlanesLowToHigh", [1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
"edgeVertexPlanesHighToLow", [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1]);
c$.cubeVertexVectors = c$.prototype.cubeVertexVectors = [org.jmol.util.Vector3f.new3 (0, 0, 0), org.jmol.util.Vector3f.new3 (1, 0, 0), org.jmol.util.Vector3f.new3 (1, 0, 1), org.jmol.util.Vector3f.new3 (0, 0, 1), org.jmol.util.Vector3f.new3 (0, 1, 0), org.jmol.util.Vector3f.new3 (1, 1, 0), org.jmol.util.Vector3f.new3 (1, 1, 1), org.jmol.util.Vector3f.new3 (0, 1, 1)];
Clazz.defineStatics (c$,
"edgeTypeTable", [0, 2, 0, 2, 0, 2, 0, 2, 1, 1, 1, 1],
"insideMaskTable", [0x0000, 0x0109, 0x0203, 0x030A, 0x0406, 0x050F, 0x0605, 0x070C, 0x080C, 0x0905, 0x0A0F, 0x0B06, 0x0C0A, 0x0D03, 0x0E09, 0x0F00, 0x0190, 0x0099, 0x0393, 0x029A, 0x0596, 0x049F, 0x0795, 0x069C, 0x099C, 0x0895, 0x0B9F, 0x0A96, 0x0D9A, 0x0C93, 0x0F99, 0x0E90, 0x0230, 0x0339, 0x0033, 0x013A, 0x0636, 0x073F, 0x0435, 0x053C, 0x0A3C, 0x0B35, 0x083F, 0x0936, 0x0E3A, 0x0F33, 0x0C39, 0x0D30, 0x03A0, 0x02A9, 0x01A3, 0x00AA, 0x07A6, 0x06AF, 0x05A5, 0x04AC, 0x0BAC, 0x0AA5, 0x09AF, 0x08A6, 0x0FAA, 0x0EA3, 0x0DA9, 0x0CA0, 0x0460, 0x0569, 0x0663, 0x076A, 0x0066, 0x016F, 0x0265, 0x036C, 0x0C6C, 0x0D65, 0x0E6F, 0x0F66, 0x086A, 0x0963, 0x0A69, 0x0B60, 0x05F0, 0x04F9, 0x07F3, 0x06FA, 0x01F6, 0x00FF, 0x03F5, 0x02FC, 0x0DFC, 0x0CF5, 0x0FFF, 0x0EF6, 0x09FA, 0x08F3, 0x0BF9, 0x0AF0, 0x0650, 0x0759, 0x0453, 0x055A, 0x0256, 0x035F, 0x0055, 0x015C, 0x0E5C, 0x0F55, 0x0C5F, 0x0D56, 0x0A5A, 0x0B53, 0x0859, 0x0950, 0x07C0, 0x06C9, 0x05C3, 0x04CA, 0x03C6, 0x02CF, 0x01C5, 0x00CC, 0x0FCC, 0x0EC5, 0x0DCF, 0x0CC6, 0x0BCA, 0x0AC3, 0x09C9, 0x08C0, 0x08C0, 0x09C9, 0x0AC3, 0x0BCA, 0x0CC6, 0x0DCF, 0x0EC5, 0x0FCC, 0x00CC, 0x01C5, 0x02CF, 0x03C6, 0x04CA, 0x05C3, 0x06C9, 0x07C0, 0x0950, 0x0859, 0x0B53, 0x0A5A, 0x0D56, 0x0C5F, 0x0F55, 0x0E5C, 0x015C, 0x0055, 0x035F, 0x0256, 0x055A, 0x0453, 0x0759, 0x0650, 0x0AF0, 0x0BF9, 0x08F3, 0x09FA, 0x0EF6, 0x0FFF, 0x0CF5, 0x0DFC, 0x02FC, 0x03F5, 0x00FF, 0x01F6, 0x06FA, 0x07F3, 0x04F9, 0x05F0, 0x0B60, 0x0A69, 0x0963, 0x086A, 0x0F66, 0x0E6F, 0x0D65, 0x0C6C, 0x036C, 0x0265, 0x016F, 0x0066, 0x076A, 0x0663, 0x0569, 0x0460, 0x0CA0, 0x0DA9, 0x0EA3, 0x0FAA, 0x08A6, 0x09AF, 0x0AA5, 0x0BAC, 0x04AC, 0x05A5, 0x06AF, 0x07A6, 0x00AA, 0x01A3, 0x02A9, 0x03A0, 0x0D30, 0x0C39, 0x0F33, 0x0E3A, 0x0936, 0x083F, 0x0B35, 0x0A3C, 0x053C, 0x0435, 0x073F, 0x0636, 0x013A, 0x0033, 0x0339, 0x0230, 0x0E90, 0x0F99, 0x0C93, 0x0D9A, 0x0A96, 0x0B9F, 0x0895, 0x099C, 0x069C, 0x0795, 0x049F, 0x0596, 0x029A, 0x0393, 0x0099, 0x0190, 0x0F00, 0x0E09, 0x0D03, 0x0C0A, 0x0B06, 0x0A0F, 0x0905, 0x080C, 0x070C, 0x0605, 0x050F, 0x0406, 0x030A, 0x0203, 0x0109, 0x0000]);
});
// 
//// org\jmol\jvxl\calc\MarchingSquares.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.calc");
Clazz.load (["org.jmol.util.Point3f", "java.util.Hashtable"], "org.jmol.jvxl.calc.MarchingSquares", ["java.lang.Float", "org.jmol.util.ArrayUtil", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.surfaceReader = null;
this.volumeData = null;
this.nContourSegments = 0;
this.contourType = 0;
this.thisContour = 0;
this.valueMin = 0;
this.valueMax = 0;
this.pointA = null;
this.pointB = null;
this.contourFromZero = true;
this.contoursDiscrete = null;
this.contourVertexCount = 0;
this.contourVertexes = null;
this.contourPlaneMinimumValue = 0;
this.contourPlaneMaximumValue = 0;
this.contourValuesUsed = null;
this.ptTemp = null;
this.triangleCount = 0;
this.triangles = null;
this.htPts = null;
if (!Clazz.isClassDefined ("org.jmol.jvxl.calc.MarchingSquares.Triangle")) {
org.jmol.jvxl.calc.MarchingSquares.$MarchingSquares$Triangle$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.calc, "MarchingSquares");
Clazz.prepareFields (c$, function () {
this.pointA =  new org.jmol.util.Point3f ();
this.pointB =  new org.jmol.util.Point3f ();
this.contourVertexes =  new Array (1000);
this.ptTemp =  new org.jmol.util.Point3f ();
this.triangles =  new Array (1000);
this.htPts =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (surfaceReader, volumeData, thePlane, contoursDiscrete, nContours, thisContour, contourFromZero) {
this.surfaceReader = surfaceReader;
this.volumeData = volumeData;
this.thisContour = thisContour;
this.contoursDiscrete = contoursDiscrete;
this.contourFromZero = contourFromZero;
if (contoursDiscrete == null) {
var i = 0;
this.nContourSegments = (nContours == 0 ? 9 : nContours) + i;
if (this.nContourSegments > 100) this.nContourSegments = 100;
} else {
nContours = contoursDiscrete.length;
this.nContourSegments = nContours;
this.contourFromZero = false;
}}, "org.jmol.jvxl.api.VertexDataServer,org.jmol.jvxl.data.VolumeData,org.jmol.util.Point4f,~A,~N,~N,~B");
Clazz.defineMethod (c$, "getContourType", 
function () {
return this.contourType;
});
Clazz.defineMethod (c$, "setMinMax", 
function (valueMin, valueMax) {
this.valueMin = valueMin;
this.valueMax = valueMax;
}, "~N,~N");
Clazz.defineMethod (c$, "addContourVertex", 
function (vertexXYZ, value) {
if (this.contourVertexCount == this.contourVertexes.length) this.contourVertexes = org.jmol.util.ArrayUtil.doubleLength (this.contourVertexes);
var vPt = this.surfaceReader.addVertexCopy (vertexXYZ, value, -2);
this.contourVertexes[this.contourVertexCount++] =  new org.jmol.jvxl.calc.MarchingSquares.ContourVertex (vertexXYZ);
return vPt;
}, "org.jmol.util.Point3f,~N");
Clazz.defineMethod (c$, "setContourData", 
function (i, value) {
this.contourVertexes[i].setValue (value);
}, "~N,~N");
Clazz.defineMethod (c$, "getContourValues", 
function () {
return this.contourValuesUsed;
});
Clazz.defineMethod (c$, "calcContourPoint", 
function (cutoff, valueA, valueB, pt) {
return this.volumeData.calculateFractionalPoint (cutoff, this.pointA, this.pointB, valueA, valueB, pt);
}, "~N,~N,~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "addTriangle", 
function (iA, iB, iC, check, check2) {
if (this.triangleCount == this.triangles.length) this.triangles = org.jmol.util.ArrayUtil.doubleLength (this.triangles);
this.triangles[this.triangleCount++] = Clazz.innerTypeInstance (org.jmol.jvxl.calc.MarchingSquares.Triangle, this, null, iA, iB, iC, check, check2);
return 0;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "generateContourData", 
function (haveData, zeroOffset) {
org.jmol.util.Logger.info ("generateContours: " + this.nContourSegments + " segments");
this.getVertexValues (haveData);
this.createContours (this.valueMin, this.valueMax, zeroOffset);
this.addAllTriangles ();
return this.contourVertexCount;
}, "~B,~N");
Clazz.defineMethod (c$, "getVertexValues", 
($fz = function (haveData) {
this.contourPlaneMinimumValue = 3.4028235E38;
this.contourPlaneMaximumValue = -3.4028235E38;
for (var i = 0; i < this.contourVertexCount; i++) {
var c = this.contourVertexes[i];
var value;
if (haveData) {
value = c.value;
} else {
value = this.volumeData.lookupInterpolatedVoxelValue (c);
c.setValue (value);
}if (value < this.contourPlaneMinimumValue) this.contourPlaneMinimumValue = value;
if (value > this.contourPlaneMaximumValue) this.contourPlaneMaximumValue = value;
}
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "createContours", 
($fz = function (min, max, zeroOffset) {
var diff = max - min;
this.contourValuesUsed =  Clazz.newFloatArray (this.nContourSegments, 0);
for (var i = this.triangleCount; --i >= 0; ) this.triangles[i].check = 0;

var minCutoff = -3.4028235E38;
var cutoff = minCutoff;
for (var i = 0; i < this.nContourSegments; i++) {
cutoff = (this.contoursDiscrete != null ? this.contoursDiscrete[i] : this.contourFromZero ? min + (i * 1 / this.nContourSegments) * diff : i == 0 ? -3.4028235E38 : i == this.nContourSegments - 1 ? 3.4028235E38 : min + ((i - 1) * 1 / (this.nContourSegments - 1)) * diff);
if (this.contoursDiscrete == null && Math.abs (cutoff) < zeroOffset) cutoff = (cutoff < 0 ? -zeroOffset : zeroOffset);
this.contourValuesUsed[i] = cutoff;
org.jmol.util.Logger.info ("#contour " + (i + 1) + " " + cutoff);
var n = 0;
this.htPts.clear ();
for (var ii = this.triangleCount; --ii >= 0; ) {
if (this.triangles[ii].isValid) this.triangles[ii].checkContour (i, cutoff);
 else n++;
}
if (this.thisContour > 0) {
if (i + 1 == this.thisContour) minCutoff = cutoff;
} else {
}}
if (this.contoursDiscrete != null) {
minCutoff = this.contoursDiscrete[0];
}this.valueMin = this.contourValuesUsed[0];
this.valueMax = (this.contourValuesUsed.length == 0 ? this.valueMin : this.contourValuesUsed[this.contourValuesUsed.length - 1]);
return true;
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "getMinMax", 
function () {
return [this.valueMin, this.valueMax];
});
Clazz.defineMethod (c$, "addAllTriangles", 
($fz = function () {
for (var i = 0; i < this.triangleCount; i++) if (this.triangles[i].isValid) {
var t = this.triangles[i];
this.surfaceReader.addTriangleCheck (t.pts[0], t.pts[1], t.pts[2], t.check, t.contourIndex, false, -1);
}
}, $fz.isPrivate = true, $fz));
c$.$MarchingSquares$Triangle$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pts = null;
this.check = 0;
this.isValid = true;
this.contourIndex = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.calc.MarchingSquares, "Triangle");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
this.pts = [a, b, c];
this.check = d;
this.contourIndex = e;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "intercept", 
($fz = function (a, b) {
var c = this.pts[a];
var d = this.pts[(a + 1) % 3];
if (c == 2147483647 || d == 2147483647) return -1;
var e = (c < d ? c + "_" + d : d + "_" + c);
if (this.b$["org.jmol.jvxl.calc.MarchingSquares"].htPts.containsKey (e)) return this.b$["org.jmol.jvxl.calc.MarchingSquares"].htPts.get (e).intValue ();
var f = this.b$["org.jmol.jvxl.calc.MarchingSquares"].contourVertexes[c].value;
var g = this.b$["org.jmol.jvxl.calc.MarchingSquares"].contourVertexes[d].value;
var h = -1;
if (f != g) {
var i = (b - f) / (g - f);
if (i >= 0 && i <= 1) {
this.b$["org.jmol.jvxl.calc.MarchingSquares"].pointA.setT (this.b$["org.jmol.jvxl.calc.MarchingSquares"].contourVertexes[c]);
this.b$["org.jmol.jvxl.calc.MarchingSquares"].pointB.setT (this.b$["org.jmol.jvxl.calc.MarchingSquares"].contourVertexes[d]);
b = this.b$["org.jmol.jvxl.calc.MarchingSquares"].calcContourPoint (b, f, g, this.b$["org.jmol.jvxl.calc.MarchingSquares"].ptTemp);
if (!Float.isNaN (b)) {
h = this.b$["org.jmol.jvxl.calc.MarchingSquares"].addContourVertex (this.b$["org.jmol.jvxl.calc.MarchingSquares"].ptTemp, b);
if (h < 0) return -1;
this.b$["org.jmol.jvxl.calc.MarchingSquares"].contourVertexes[h].setValue (b);
} else {
}}}this.b$["org.jmol.jvxl.calc.MarchingSquares"].htPts.put (e, Integer.$valueOf (h));
return h;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "checkContour", 
function (a, b) {
var c = this.intercept (0, b);
var d = this.intercept (1, b);
var e = this.intercept (2, b);
var f = 0;
if (c >= 0) {
f += 1;
}if (d >= 0) {
f += 2;
}if (e >= 0) {
f += 4;
}switch (f) {
case 3:
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (this.pts[0], c, d, 2 | (this.check & 1), a);
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (c, this.pts[1], d, 4 | (this.check & 3), a);
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (this.pts[0], d, this.pts[2], (this.check & 6), a);
break;
case 5:
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (this.pts[0], c, e, 2 | (this.check & 5), a);
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (c, this.pts[1], e, 4 | (this.check & 1), a);
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (e, this.pts[1], this.pts[2], (this.check & 6), a);
break;
case 6:
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (this.pts[0], this.pts[1], e, (this.check & 5), a);
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (e, this.pts[1], d, 4 | (this.check & 2), a);
this.b$["org.jmol.jvxl.calc.MarchingSquares"].addTriangle (e, d, this.pts[2], 1 | (this.check & 6), a);
break;
default:
return;
}
this.isValid = false;
}, "~N,~N");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.value = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.calc.MarchingSquares, "ContourVertex", org.jmol.util.Point3f);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, org.jmol.jvxl.calc.MarchingSquares.ContourVertex, []);
this.setT (a);
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setValue", 
function (a) {
this.value = a;
}, "~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"CONTOUR_POINT", -1,
"VERTEX_POINT", -2,
"EDGE_POINT", -3,
"nContourMax", 100,
"defaultContourCount", 9);
});
// 
//// org\jmol\shapesurface\IsosurfaceMesh.js 
// 
Clazz.declarePackage ("org.jmol.shapesurface");
Clazz.load (["org.jmol.shape.Mesh", "org.jmol.jvxl.data.JvxlData"], "org.jmol.shapesurface.IsosurfaceMesh", ["java.lang.Character", "$.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.api.Interface", "org.jmol.jvxl.data.JvxlCoder", "org.jmol.script.Token", "org.jmol.util.ArrayUtil", "$.BitSet", "$.BitSetUtil", "$.BoxInfo", "$.Colix", "$.ColorEncoder", "$.ColorUtil", "$.Escape", "$.Logger", "$.Matrix4f", "$.Measure", "$.Parser", "$.Point3f", "$.Point4f", "$.StringXBuilder", "$.Vector3f", "org.jmol.viewer.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.jvxlData = null;
this.vertexIncrement = 1;
this.firstRealVertex = -1;
this.dataType = 0;
this.hasGridPoints = false;
this.calculatedArea = null;
this.calculatedVolume = null;
this.info = null;
this.assocGridPointMap = null;
this.assocGridPointNormals = null;
this.mergeAssociatedNormalCount = 0;
this.centers = null;
this.contourValues = null;
this.contourColixes = null;
this.colorEncoder = null;
this.volumeRenderPointSize = 0.15;
this.bsVdw = null;
this.colorPhased = false;
Clazz.instantialize (this, arguments);
}, org.jmol.shapesurface, "IsosurfaceMesh", org.jmol.shape.Mesh);
Clazz.prepareFields (c$, function () {
this.jvxlData =  new org.jmol.jvxl.data.JvxlData ();
});
Clazz.makeConstructor (c$, 
function (thisID, colix, index) {
Clazz.superConstructor (this, org.jmol.shapesurface.IsosurfaceMesh, [thisID, colix, index]);
this.checkByteCount = 2;
this.jvxlData.version = org.jmol.viewer.Viewer.getJmolVersion ();
}, "~S,~N,~N");
Clazz.defineMethod (c$, "clear", 
function (meshType, iAddGridPoints) {
Clazz.superCall (this, org.jmol.shapesurface.IsosurfaceMesh, "clear", [meshType]);
this.jvxlData.clear ();
this.assocGridPointMap = null;
this.assocGridPointNormals = null;
this.bsVdw = null;
this.calculatedVolume = null;
this.calculatedArea = null;
this.centers = null;
this.colorEncoder = null;
this.colorPhased = false;
this.firstRealVertex = -1;
this.hasGridPoints = iAddGridPoints;
this.isColorSolid = true;
this.mergeAssociatedNormalCount = 0;
this.nSets = 0;
this.polygonColixes = null;
this.showPoints = iAddGridPoints;
this.surfaceSet = null;
this.vertexColixes = null;
this.vertexColorMap = null;
this.vertexIncrement = 1;
this.vertexSets = null;
this.vertexValues = null;
this.volumeRenderPointSize = 0.15;
}, "~S,~B");
Clazz.defineMethod (c$, "allocVertexColixes", 
function () {
if (this.vertexColixes == null) {
this.vertexColixes =  Clazz.newShortArray (this.vertexCount, 0);
for (var i = this.vertexCount; --i >= 0; ) this.vertexColixes[i] = this.colix;

}this.isColorSolid = false;
});
Clazz.defineMethod (c$, "addVertexCopy", 
function (vertex, value, assocVertex, associateNormals) {
var vPt = this.addVertexCopyVal (vertex, value);
switch (assocVertex) {
case -1:
if (this.firstRealVertex < 0) this.firstRealVertex = vPt;
break;
case -2:
this.hasGridPoints = true;
break;
case -3:
this.vertexIncrement = 3;
break;
default:
if (this.firstRealVertex < 0) this.firstRealVertex = vPt;
if (associateNormals) {
if (this.assocGridPointMap == null) this.assocGridPointMap =  new java.util.Hashtable ();
this.assocGridPointMap.put (Integer.$valueOf (vPt), Integer.$valueOf (assocVertex + this.mergeAssociatedNormalCount));
}}
return vPt;
}, "org.jmol.util.Point3f,~N,~N,~B");
Clazz.defineMethod (c$, "setTranslucent", 
function (isTranslucent, iLevel) {
Clazz.superCall (this, org.jmol.shapesurface.IsosurfaceMesh, "setTranslucent", [isTranslucent, iLevel]);
if (this.vertexColixes != null) for (var i = this.vertexCount; --i >= 0; ) this.vertexColixes[i] = org.jmol.util.Colix.getColixTranslucent3 (this.vertexColixes[i], isTranslucent, iLevel);

}, "~B,~N");
Clazz.defineMethod (c$, "setMerged", 
function (TF) {
this.isMerged = TF;
this.mergePolygonCount0 = (TF ? this.polygonCount : 0);
this.mergeVertexCount0 = (TF ? this.vertexCount : 0);
if (TF) {
this.mergeAssociatedNormalCount += this.jvxlData.nPointsX * this.jvxlData.nPointsY * this.jvxlData.nPointsZ;
this.assocGridPointNormals = null;
}}, "~B");
Clazz.defineMethod (c$, "sumVertexNormals", 
function (vertices, vectorSums) {
Clazz.superCall (this, org.jmol.shapesurface.IsosurfaceMesh, "sumVertexNormals", [vertices, vectorSums]);
if (this.assocGridPointMap != null && vectorSums.length > 0 && !this.isMerged) {
if (this.assocGridPointNormals == null) this.assocGridPointNormals =  new java.util.Hashtable ();
for (var entry, $entry = this.assocGridPointMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var gridPoint = entry.getValue ();
if (!this.assocGridPointNormals.containsKey (gridPoint)) this.assocGridPointNormals.put (gridPoint, org.jmol.util.Vector3f.new3 (0, 0, 0));
this.assocGridPointNormals.get (gridPoint).add (vectorSums[entry.getKey ().intValue ()]);
}
for (var entry, $entry = this.assocGridPointMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) vectorSums[entry.getKey ().intValue ()] = this.assocGridPointNormals.get (entry.getValue ());

}}, "~A,~A");
Clazz.defineMethod (c$, "getCenters", 
function () {
if (this.centers != null) return this.centers;
this.centers =  new Array (this.polygonCount);
for (var i = 0; i < this.polygonCount; i++) {
var pi = this.polygonIndexes[i];
if (pi == null) continue;
var pt = this.centers[i] =  new org.jmol.util.Point3f ();
pt.add (this.vertices[pi[0]]);
pt.add (this.vertices[pi[1]]);
pt.add (this.vertices[pi[2]]);
pt.scale (0.33333334);
}
return this.centers;
});
Clazz.defineMethod (c$, "getFacePlane", 
function (i, vNorm) {
var plane =  new org.jmol.util.Point4f ();
org.jmol.util.Measure.getPlaneThroughPoints (this.vertices[this.polygonIndexes[i][0]], this.vertices[this.polygonIndexes[i][1]], this.vertices[this.polygonIndexes[i][2]], vNorm, this.vAB, this.vAC, plane);
return plane;
}, "~N,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "getContours", 
function () {
var n = this.jvxlData.nContours;
if (n == 0 || this.polygonIndexes == null) return null;
this.havePlanarContours = (this.jvxlData.jvxlPlane != null);
if (this.havePlanarContours) return null;
if (n < 0) n = -1 - n;
var vContours = this.jvxlData.vContours;
if (vContours != null) {
for (var i = 0; i < n; i++) {
if (vContours[i].size () > 6) return this.jvxlData.vContours;
org.jmol.jvxl.data.JvxlCoder.set3dContourVector (vContours[i], this.polygonIndexes, this.vertices);
}
return this.jvxlData.vContours;
}vContours =  new Array (n);
for (var i = 0; i < n; i++) {
vContours[i] =  new java.util.ArrayList ();
}
if (this.jvxlData.contourValuesUsed == null) {
var dv = (this.jvxlData.valueMappedToBlue - this.jvxlData.valueMappedToRed) / (n + 1);
for (var i = 0; i < n; i++) {
var value = this.jvxlData.valueMappedToRed + (i + 1) * dv;
this.get3dContour (vContours[i], value, this.jvxlData.contourColixes[i]);
}
org.jmol.util.Logger.info (n + " contour lines; separation = " + dv);
} else {
for (var i = 0; i < n; i++) {
var value = this.jvxlData.contourValuesUsed[i];
this.get3dContour (vContours[i], value, this.jvxlData.contourColixes[i]);
}
}this.jvxlData.contourColixes =  Clazz.newShortArray (n, 0);
this.jvxlData.contourValues =  Clazz.newFloatArray (n, 0);
for (var i = 0; i < n; i++) {
this.jvxlData.contourValues[i] = (vContours[i].get (2)).floatValue ();
this.jvxlData.contourColixes[i] = (vContours[i].get (3))[0];
}
return this.jvxlData.vContours = vContours;
});
Clazz.defineMethod (c$, "get3dContour", 
($fz = function (v, value, colix) {
var bsContour = org.jmol.util.BitSetUtil.newBitSet (this.polygonCount);
var fData =  new org.jmol.util.StringXBuilder ();
var color = org.jmol.util.Colix.getArgb (colix);
org.jmol.shapesurface.IsosurfaceMesh.setContourVector (v, this.polygonCount, bsContour, value, colix, color, fData);
for (var i = 0; i < this.polygonCount; i++) if (this.setABC (i)) org.jmol.shapesurface.IsosurfaceMesh.addContourPoints (v, bsContour, i, fData, this.vertices, this.vertexValues, this.iA, this.iB, this.iC, value);

}, $fz.isPrivate = true, $fz), "java.util.List,~N,~N");
c$.setContourVector = Clazz.defineMethod (c$, "setContourVector", 
function (v, nPolygons, bsContour, value, colix, color, fData) {
v.add (0, Integer.$valueOf (nPolygons));
v.add (1, bsContour);
v.add (2,  new Float (value));
v.add (3, [colix]);
v.add (4, [color]);
v.add (5, fData);
}, "java.util.List,~N,org.jmol.util.BitSet,~N,~N,~N,org.jmol.util.StringXBuilder");
c$.addContourPoints = Clazz.defineMethod (c$, "addContourPoints", 
function (v, bsContour, i, fData, vertices, vertexValues, iA, iB, iC, value) {
var pt1 = null;
var pt2 = null;
var type = 0;
var f1 = org.jmol.shapesurface.IsosurfaceMesh.checkPt (vertexValues, iA, iB, value);
if (!Float.isNaN (f1)) {
pt1 = org.jmol.shapesurface.IsosurfaceMesh.getContourPoint (vertices, iA, iB, f1);
type |= 1;
}var f2 = (f1 == 1 ? NaN : org.jmol.shapesurface.IsosurfaceMesh.checkPt (vertexValues, iB, iC, value));
if (!Float.isNaN (f2)) {
pt2 = org.jmol.shapesurface.IsosurfaceMesh.getContourPoint (vertices, iB, iC, f2);
if (type == 0) {
pt1 = pt2;
f1 = f2;
}type |= 2;
}switch (type) {
case 0:
return;
case 1:
if (f1 == 0) return;
case 2:
f2 = (f2 == 1 ? NaN : org.jmol.shapesurface.IsosurfaceMesh.checkPt (vertexValues, iC, iA, value));
if (!Float.isNaN (f2)) {
pt2 = org.jmol.shapesurface.IsosurfaceMesh.getContourPoint (vertices, iC, iA, f2);
type |= 4;
}break;
}
switch (type) {
case 3:
case 5:
case 6:
break;
default:
return;
}
bsContour.set (i);
org.jmol.jvxl.data.JvxlCoder.appendContourTriangleIntersection (type, f1, f2, fData);
v.add (pt1);
v.add (pt2);
}, "java.util.List,org.jmol.util.BitSet,~N,org.jmol.util.StringXBuilder,~A,~A,~N,~N,~N,~N");
c$.checkPt = Clazz.defineMethod (c$, "checkPt", 
($fz = function (vertexValues, i, j, v) {
var v1;
var v2;
return (v == (v1 = vertexValues[i]) ? 0 : v == (v2 = vertexValues[j]) ? 1 : (v1 < v) == (v < v2) ? (v - v1) / (v2 - v1) : NaN);
}, $fz.isPrivate = true, $fz), "~A,~N,~N,~N");
c$.getContourPoint = Clazz.defineMethod (c$, "getContourPoint", 
($fz = function (vertices, i, j, f) {
var pt =  new org.jmol.util.Point3f ();
pt.setT (vertices[j]);
pt.sub (vertices[i]);
pt.scale (f);
pt.add (vertices[i]);
return pt;
}, $fz.isPrivate = true, $fz), "~A,~N,~N,~N");
Clazz.defineMethod (c$, "setDiscreteColixes", 
function (values, colixes) {
if (values != null) this.jvxlData.contourValues = values;
if (values == null || values.length == 0) values = this.jvxlData.contourValues = this.jvxlData.contourValuesUsed;
if (colixes == null && this.jvxlData.contourColixes != null) {
colixes = this.jvxlData.contourColixes;
} else {
this.jvxlData.contourColixes = colixes;
this.jvxlData.contourColors = org.jmol.util.Colix.getHexCodes (colixes);
}if (this.vertices == null || this.vertexValues == null || values == null) return;
var n = values.length;
var vMax = values[n - 1];
this.colorCommand = null;
var haveColixes = (colixes != null && colixes.length > 0);
this.isColorSolid = (haveColixes && this.jvxlData.jvxlPlane != null);
if (this.jvxlData.vContours != null) {
if (haveColixes) for (var i = 0; i < this.jvxlData.vContours.length; i++) {
var colix = colixes[i % colixes.length];
(this.jvxlData.vContours[i].get (3))[0] = colix;
(this.jvxlData.vContours[i].get (4))[0] = org.jmol.util.Colix.getArgb (colix);
}
return;
}var defaultColix = 0;
this.polygonColixes =  Clazz.newShortArray (this.polygonCount, 0);
for (var i = 0; i < this.polygonCount; i++) {
var pi = this.polygonIndexes[i];
if (pi == null) continue;
this.polygonColixes[i] = defaultColix;
var v = (this.vertexValues[pi[0]] + this.vertexValues[pi[1]] + this.vertexValues[pi[2]]) / 3;
for (var j = n; --j >= 0; ) {
if (v >= values[j] && v < vMax) {
this.polygonColixes[i] = (haveColixes ? colixes[j % colixes.length] : 0);
break;
}}
}
}, "~A,~A");
Clazz.defineMethod (c$, "getContourList", 
function (viewer) {
var ht =  new java.util.Hashtable ();
ht.put ("values", (this.jvxlData.contourValuesUsed == null ? this.jvxlData.contourValues : this.jvxlData.contourValuesUsed));
var colors =  new java.util.ArrayList ();
if (this.jvxlData.contourColixes != null) {
for (var i = 0; i < this.jvxlData.contourColixes.length; i++) {
colors.add (org.jmol.util.ColorUtil.colorPointFromInt2 (org.jmol.util.Colix.getArgb (this.jvxlData.contourColixes[i])));
}
ht.put ("colors", colors);
}return ht;
}, "org.jmol.viewer.Viewer");
Clazz.defineMethod (c$, "deleteContours", 
function () {
this.jvxlData.contourValuesUsed = null;
this.jvxlData.contourValues = null;
this.jvxlData.contourColixes = null;
this.jvxlData.vContours = null;
});
Clazz.defineMethod (c$, "colorAtoms", 
function (colix, bs) {
this.colorVertices (colix, bs, true);
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "colorVertices", 
function (colix, bs) {
this.colorVertices (colix, bs, false);
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "colorVertices", 
($fz = function (colix, bs, isAtoms) {
if (this.vertexSource == null) return;
colix = org.jmol.util.Colix.copyColixTranslucency (this.colix, colix);
var bsVertices = (isAtoms ?  new org.jmol.util.BitSet () : bs);
if (this.vertexColixes == null || this.vertexColorMap == null && this.isColorSolid) {
this.vertexColixes =  Clazz.newShortArray (this.vertexCount, 0);
for (var i = 0; i < this.vertexCount; i++) this.vertexColixes[i] = this.colix;

}this.isColorSolid = false;
if (isAtoms) for (var i = 0; i < this.vertexCount; i++) {
if (bs.get (this.vertexSource[i])) {
this.vertexColixes[i] = colix;
bsVertices.set (i);
}}
 else for (var i = 0; i < this.vertexCount; i++) if (bsVertices.get (i)) this.vertexColixes[i] = colix;

if (!isAtoms) {
return;
}var color = org.jmol.util.Colix.getHexCode (colix);
if (this.vertexColorMap == null) this.vertexColorMap =  new java.util.Hashtable ();
org.jmol.shapesurface.IsosurfaceMesh.addColorToMap (this.vertexColorMap, color, bs);
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.BitSet,~B");
c$.addColorToMap = Clazz.defineMethod (c$, "addColorToMap", 
($fz = function (colorMap, color, bs) {
var bsMap = null;
for (var entry, $entry = colorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) if (entry.getKey () === color) {
bsMap = entry.getValue ();
bsMap.or (bs);
} else {
entry.getValue ().andNot (bs);
}
if (bsMap == null) colorMap.put (color, bs);
}, $fz.isPrivate = true, $fz), "java.util.Map,~S,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setJvxlColorMap", 
function (isAll) {
this.jvxlData.diameter = this.diameter;
this.jvxlData.color = org.jmol.util.Colix.getHexCode (this.colix);
this.jvxlData.meshColor = (this.meshColix == 0 ? null : org.jmol.util.Colix.getHexCode (this.meshColix));
this.jvxlData.translucency = org.jmol.util.Colix.getColixTranslucencyFractional (this.colix);
this.jvxlData.rendering = this.getRendering ().substring (1);
this.jvxlData.colorScheme = (this.colorEncoder == null ? null : this.colorEncoder.getColorScheme ());
this.jvxlData.nVertexColors = (this.vertexColorMap == null ? 0 : this.vertexColorMap.size ());
if (this.vertexColorMap == null || this.vertexSource == null || !isAll) return;
if (this.jvxlData.vertexColorMap == null) this.jvxlData.vertexColorMap =  new java.util.Hashtable ();
for (var entry, $entry = this.vertexColorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var bsMap = entry.getValue ();
if (bsMap.isEmpty ()) continue;
var color = entry.getKey ();
var bs =  new org.jmol.util.BitSet ();
for (var i = 0; i < this.vertexCount; i++) if (bsMap.get (this.vertexSource[i])) bs.set (i);

org.jmol.shapesurface.IsosurfaceMesh.addColorToMap (this.jvxlData.vertexColorMap, color, bs);
}
this.jvxlData.nVertexColors = this.jvxlData.vertexColorMap.size ();
if (this.jvxlData.vertexColorMap.size () == 0) this.jvxlData.vertexColorMap = null;
}, "~B");
Clazz.defineMethod (c$, "setColorCommand", 
function () {
if (this.colorEncoder == null) return;
this.colorCommand = this.colorEncoder.getColorScheme ();
if (this.colorCommand == null) return;
this.colorCommand = "color $" + (Character.isLetter (this.thisID.charAt (0)) && this.thisID.indexOf (" ") < 0 ? this.thisID : "\"" + this.thisID + "\"") + " \"" + this.colorCommand + "\" range " + (this.jvxlData.isColorReversed ? this.jvxlData.valueMappedToBlue + " " + this.jvxlData.valueMappedToRed : this.jvxlData.valueMappedToRed + " " + this.jvxlData.valueMappedToBlue);
});
Clazz.defineMethod (c$, "setColorsFromJvxlData", 
function (colorRgb) {
this.diameter = this.jvxlData.diameter;
if (colorRgb == -1) {
} else if (colorRgb != -2147483648) {
this.colix = org.jmol.util.Colix.getColix (colorRgb);
} else if (this.jvxlData.color != null) {
this.colix = org.jmol.util.Colix.getColixS (this.jvxlData.color);
}if (this.colix == 0) this.colix = 5;
this.colix = org.jmol.util.Colix.getColixTranslucent3 (this.colix, this.jvxlData.translucency != 0, this.jvxlData.translucency);
if (this.jvxlData.meshColor != null) this.meshColix = org.jmol.util.Colix.getColixS (this.jvxlData.meshColor);
this.setJvxlDataRendering ();
this.isColorSolid = !this.jvxlData.isBicolorMap;
if (this.colorEncoder != null) {
if (this.jvxlData.colorScheme != null) {
var colorScheme = this.jvxlData.colorScheme;
var isTranslucent = colorScheme.startsWith ("translucent ");
if (isTranslucent) colorScheme = colorScheme.substring (12);
this.colorEncoder.setColorScheme (colorScheme, isTranslucent);
this.remapColors (null, NaN);
}if (this.jvxlData.vertexColorMap != null) for (var entry, $entry = this.jvxlData.vertexColorMap.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var bsMap = entry.getValue ();
var colix = org.jmol.util.Colix.copyColixTranslucency (this.colix, org.jmol.util.Colix.getColixS (entry.getKey ()));
for (var i = bsMap.nextSetBit (0); i >= 0; i = bsMap.nextSetBit (i + 1)) this.vertexColixes[i] = colix;

}
}}, "~N");
Clazz.defineMethod (c$, "setJvxlDataRendering", 
function () {
if (this.jvxlData.rendering != null) {
var tokens = org.jmol.util.Parser.getTokens (this.jvxlData.rendering);
for (var i = 0; i < tokens.length; i++) this.setTokenProperty (org.jmol.script.Token.getTokFromName (tokens[i]), true);

}});
Clazz.defineMethod (c$, "remapColors", 
function (ce, translucentLevel) {
if (ce == null) ce = this.colorEncoder;
if (ce == null) ce = this.colorEncoder =  new org.jmol.util.ColorEncoder (null);
if (Float.isNaN (translucentLevel)) {
translucentLevel = org.jmol.util.Colix.getColixTranslucencyLevel (this.colix);
} else {
this.colix = org.jmol.util.Colix.getColixTranslucent3 (this.colix, true, translucentLevel);
}var min = ce.lo;
var max = ce.hi;
this.vertexColorMap = null;
this.polygonColixes = null;
this.jvxlData.vertexCount = this.vertexCount;
if (this.vertexValues == null || this.jvxlData.vertexCount == 0) return;
if (this.vertexColixes == null || this.vertexColixes.length != this.vertexCount) this.vertexColixes =  Clazz.newShortArray (this.vertexCount, 0);
if (this.jvxlData.isBicolorMap) {
for (var i = this.mergeVertexCount0; i < this.vertexCount; i++) this.vertexColixes[i] = org.jmol.util.Colix.copyColixTranslucency (this.colix, this.vertexValues[i] < 0 ? this.jvxlData.minColorIndex : this.jvxlData.maxColorIndex);

return;
}this.jvxlData.isColorReversed = ce.isReversed;
if (max != 3.4028235E38) {
this.jvxlData.valueMappedToRed = min;
this.jvxlData.valueMappedToBlue = max;
}ce.setRange (this.jvxlData.valueMappedToRed, this.jvxlData.valueMappedToBlue, this.jvxlData.isColorReversed);
var isTranslucent = org.jmol.util.Colix.isColixTranslucent (this.colix);
if (ce.isTranslucent) {
if (!isTranslucent) this.colix = org.jmol.util.Colix.getColixTranslucent3 (this.colix, true, 0.5);
isTranslucent = false;
}for (var i = this.vertexCount; --i >= this.mergeVertexCount0; ) this.vertexColixes[i] = ce.getColorIndex (this.vertexValues[i]);

this.setTranslucent (isTranslucent, translucentLevel);
this.colorEncoder = ce;
var contours = this.getContours ();
if (contours != null) {
for (var i = contours.length; --i >= 0; ) {
var value = (contours[i].get (2)).floatValue ();
var colix = (contours[i].get (3));
colix[0] = ce.getColorIndex (value);
var color = (contours[i].get (4));
color[0] = org.jmol.util.Colix.getArgb (colix[0]);
}
}if (this.contourValues != null) {
this.contourColixes =  Clazz.newShortArray (this.contourValues.length, 0);
for (var i = 0; i < this.contourValues.length; i++) this.contourColixes[i] = ce.getColorIndex (this.contourValues[i]);

this.setDiscreteColixes (null, null);
}this.jvxlData.isJvxlPrecisionColor = true;
org.jmol.jvxl.data.JvxlCoder.jvxlCreateColorData (this.jvxlData, this.vertexValues);
this.setColorCommand ();
this.isColorSolid = false;
}, "org.jmol.util.ColorEncoder,~N");
Clazz.defineMethod (c$, "reinitializeLightingAndColor", 
function () {
this.initialize (this.lighting, null, null);
if (this.colorEncoder != null || this.jvxlData.isBicolorMap) {
this.vertexColixes = null;
this.remapColors (null, NaN);
}});
Clazz.overrideMethod (c$, "getBoundingBox", 
function () {
return this.jvxlData.boundingBox;
});
Clazz.defineMethod (c$, "resetBoundingBox", 
($fz = function () {
var bi =  new org.jmol.util.BoxInfo ();
if (this.polygonCount == 0) for (var i = this.vertexCount; --i >= 0; ) {
bi.addBoundBoxPoint (this.vertices[i]);
}
 else {
var bsDone =  new org.jmol.util.BitSet ();
for (var i = this.polygonCount; --i >= 0; ) {
if (!this.setABC (i)) continue;
if (!bsDone.get (this.iA)) {
bi.addBoundBoxPoint (this.vertices[this.iA]);
bsDone.set (this.iA);
}if (!bsDone.get (this.iB)) {
bi.addBoundBoxPoint (this.vertices[this.iB]);
bsDone.set (this.iB);
}if (!bsDone.get (this.iC)) {
bi.addBoundBoxPoint (this.vertices[this.iC]);
bsDone.set (this.iC);
}}
}this.jvxlData.boundingBox = bi.getBoundBoxPoints (false);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "merge", 
function (m) {
var nV = this.vertexCount + (m == null ? 0 : m.vertexCount);
if (this.polygonIndexes == null) this.polygonIndexes =  Clazz.newIntArray (0, 0, 0);
if (m != null && m.polygonIndexes == null) m.polygonIndexes =  Clazz.newIntArray (0, 0, 0);
var nP = (this.bsSlabDisplay == null || this.polygonCount == 0 ? this.polygonCount : this.bsSlabDisplay.cardinality ()) + (m == null || m.polygonCount == 0 ? 0 : m.bsSlabDisplay == null ? m.polygonCount : m.bsSlabDisplay.cardinality ());
if (this.vertices == null) this.vertices =  new Array (0);
this.vertices = org.jmol.util.ArrayUtil.ensureLength (this.vertices, nV);
this.vertexValues = org.jmol.util.ArrayUtil.ensureLengthA (this.vertexValues, nV);
var haveSources = (this.vertexSource != null && (m == null || m.vertexSource != null));
this.vertexSource = org.jmol.util.ArrayUtil.ensureLengthI (this.vertexSource, nV);
var newPolygons = org.jmol.util.ArrayUtil.newInt2 (nP);
var ipt = org.jmol.shapesurface.IsosurfaceMesh.mergePolygons (this, 0, 0, newPolygons);
if (m != null) {
ipt = org.jmol.shapesurface.IsosurfaceMesh.mergePolygons (m, ipt, this.vertexCount, newPolygons);
for (var i = 0; i < m.vertexCount; i++, this.vertexCount++) {
this.vertices[this.vertexCount] = m.vertices[i];
this.vertexValues[this.vertexCount] = m.vertexValues[i];
if (haveSources) this.vertexSource[this.vertexCount] = m.vertexSource[i];
}
}this.polygonCount = this.polygonCount0 = nP;
this.vertexCount = this.vertexCount0 = nV;
if (nP > 0) this.resetSlab ();
this.polygonIndexes = newPolygons;
}, "org.jmol.jvxl.data.MeshData");
c$.mergePolygons = Clazz.defineMethod (c$, "mergePolygons", 
($fz = function (m, ipt, vertexCount, newPolygons) {
var p;
for (var i = 0; i < m.polygonCount; i++) {
if ((p = m.polygonIndexes[i]) == null || m.bsSlabDisplay != null && !m.bsSlabDisplay.get (i)) continue;
newPolygons[ipt++] = m.polygonIndexes[i];
if (vertexCount > 0) for (var j = 0; j < 3; j++) p[j] += vertexCount;

}
return ipt;
}, $fz.isPrivate = true, $fz), "org.jmol.util.MeshSurface,~N,~N,~A");
Clazz.overrideMethod (c$, "getUnitCell", 
function () {
return (this.spanningVectors == null ? null : (org.jmol.api.Interface.getOptionInterface ("symmetry.Symmetry")).getUnitCell (this.spanningVectors));
});
Clazz.overrideMethod (c$, "slabBrillouin", 
function (unitCellPoints) {
var vectors = (unitCellPoints == null ? this.spanningVectors : unitCellPoints);
if (vectors == null) return;
var pts =  new Array (27);
pts[0] = org.jmol.util.Point3f.newP (vectors[0]);
var pt = 0;
for (var i = -1; i <= 1; i++) for (var j = -1; j <= 1; j++) for (var k = -1; k <= 1; k++) if (i != 0 || j != 0 || k != 0) {
pts[++pt] = org.jmol.util.Point3f.newP (pts[0]);
pts[pt].scaleAdd2 (i, vectors[1], pts[pt]);
pts[pt].scaleAdd2 (j, vectors[2], pts[pt]);
pts[pt].scaleAdd2 (k, vectors[3], pts[pt]);
}


System.out.println ("draw line1 {0 0 0} color red" + org.jmol.util.Escape.escapePt (this.spanningVectors[1]));
System.out.println ("draw line2 {0 0 0} color green" + org.jmol.util.Escape.escapePt (this.spanningVectors[2]));
System.out.println ("draw line3 {0 0 0} color blue" + org.jmol.util.Escape.escapePt (this.spanningVectors[3]));
var ptTemp =  new org.jmol.util.Point3f ();
var planeGammaK =  new org.jmol.util.Point4f ();
var vGammaToKPoint =  new org.jmol.util.Vector3f ();
var vTemp =  new org.jmol.util.Vector3f ();
var bsMoved =  new org.jmol.util.BitSet ();
var mapEdge =  new java.util.Hashtable ();
this.bsSlabGhost =  new org.jmol.util.BitSet ();
for (var i = 1; i < 27; i++) {
vGammaToKPoint.setT (pts[i]);
org.jmol.util.Measure.getBisectingPlane (pts[0], vGammaToKPoint, ptTemp, vTemp, planeGammaK);
this.getIntersection (1, planeGammaK, null, null, null, null, null, false, false, 135266319, true);
bsMoved.clearAll ();
mapEdge.clear ();
for (var j = this.bsSlabGhost.nextSetBit (0); j >= 0; j = this.bsSlabGhost.nextSetBit (j + 1)) {
if (!this.setABC (j)) continue;
var p = org.jmol.util.ArrayUtil.arrayCopyRangeI (this.polygonIndexes[j], 0, -1);
for (var k = 0; k < 3; k++) {
var pk = p[k];
p[k] = this.addIntersectionVertex (this.vertices[pk], this.vertexValues[pk], this.vertexSource == null ? 0 : this.vertexSource[pk], this.vertexSets == null ? 0 : this.vertexSets[pk], mapEdge, 0, pk);
if (pk != p[k] && bsMoved.get (pk)) bsMoved.set (p[k]);
}
this.addPolygonC (p, 0, this.bsSlabDisplay);
for (var k = 0; k < 3; k++) if (!bsMoved.get (p[k])) {
bsMoved.set (p[k]);
this.vertices[p[k]].sub (vGammaToKPoint);
}
}
if (this.bsSlabGhost.nextSetBit (0) >= 0) {
this.bsSlabGhost.clearAll ();
i = 0;
}}
this.bsSlabGhost = null;
this.resetBoundingBox ();
}, "~A");
Clazz.overrideMethod (c$, "getMinDistance2ForVertexGrouping", 
function () {
if (this.jvxlData.boundingBox != null && this.jvxlData.boundingBox[0] != null) {
var d2 = this.jvxlData.boundingBox[1].distanceSquared (this.jvxlData.boundingBox[0]);
if (d2 < 5) return 1e-10;
}return 1e-8;
});
Clazz.defineMethod (c$, "getVisibleVertexBitSet", 
function () {
var bs = Clazz.superCall (this, org.jmol.shapesurface.IsosurfaceMesh, "getVisibleVertexBitSet", []);
if (this.jvxlData.thisSet >= 0) for (var i = 0; i < this.vertexCount; i++) if (this.vertexSets[i] != this.jvxlData.thisSet) bs.clear (i);

return bs;
});
Clazz.defineMethod (c$, "updateCoordinates", 
function (m, bs) {
var doUpdate = (bs == null);
if (!doUpdate) for (var i = 0; i < this.connections.length; i++) if (this.connections[i] >= 0 && bs.get (this.connections[i])) {
doUpdate = true;
break;
}
if (!doUpdate) return;
if (this.mat4 == null) {
this.mat4 =  new org.jmol.util.Matrix4f ();
this.mat4.setIdentity ();
}this.mat4.mul2 (m, this.mat4);
this.recalcAltVertices = true;
}, "org.jmol.util.Matrix4f,org.jmol.util.BitSet");
});
// 
//// org\jmol\jvxl\readers\VolumeDataReader.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.SurfaceReader"], "org.jmol.jvxl.readers.VolumeDataReader", ["org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.ArrayUtil", "$.Logger", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataType = 0;
this.precalculateVoxelData = false;
this.allowMapData = false;
this.point = null;
this.ptsPerAngstrom = 0;
this.maxGrid = 0;
this.atomDataServer = null;
this.useOriginStepsPoints = false;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "VolumeDataReader", org.jmol.jvxl.readers.SurfaceReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.VolumeDataReader, []);
});
Clazz.defineMethod (c$, "init", 
function (sg) {
Clazz.superCall (this, org.jmol.jvxl.readers.VolumeDataReader, "init", [sg]);
this.useOriginStepsPoints = (this.params.origin != null && this.params.points != null && this.params.steps != null);
this.dataType = this.params.dataType;
this.precalculateVoxelData = true;
this.allowMapData = true;
}, "org.jmol.jvxl.readers.SurfaceGenerator");
Clazz.defineMethod (c$, "setup", 
function (isMapData) {
this.jvxlFileHeaderBuffer =  new org.jmol.util.StringXBuilder ().append ("volume data read from file\n\n");
org.jmol.jvxl.data.JvxlCoder.jvxlCreateHeaderWithoutTitleOrAtoms (this.volumeData, this.jvxlFileHeaderBuffer);
}, "~B");
Clazz.overrideMethod (c$, "readVolumeParameters", 
function (isMapData) {
this.setup (isMapData);
this.initializeVolumetricData ();
return true;
}, "~B");
Clazz.overrideMethod (c$, "readVolumeData", 
function (isMapData) {
try {
this.readSurfaceData (isMapData);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
return false;
} else {
throw e;
}
}
return true;
}, "~B");
Clazz.defineMethod (c$, "readVoxelDataIndividually", 
function (isMapData) {
if (isMapData && !this.allowMapData) return;
if (!isMapData || this.volumeData.sr != null) {
this.volumeData.setVoxelDataAsArray (this.voxelData = null);
return;
}this.newVoxelDataCube ();
for (var x = 0; x < this.nPointsX; ++x) {
var plane = org.jmol.util.ArrayUtil.newFloat2 (this.nPointsY);
this.voxelData[x] = plane;
var ptyz = 0;
for (var y = 0; y < this.nPointsY; ++y) {
var strip = plane[y] =  Clazz.newFloatArray (this.nPointsZ, 0);
for (var z = 0; z < this.nPointsZ; ++z, ++ptyz) {
strip[z] = this.getValue (x, y, z, ptyz);
}
}
}
}, "~B");
Clazz.defineMethod (c$, "setVolumeData", 
function () {
});
Clazz.defineMethod (c$, "setVolumeDataParams", 
function () {
if (this.params.volumeData != null) {
this.setVolumeData (this.params.volumeData);
return true;
}if (!this.useOriginStepsPoints) {
return false;
}this.volumetricOrigin.setT (this.params.origin);
this.volumetricVectors[0].set (this.params.steps.x, 0, 0);
this.volumetricVectors[1].set (0, this.params.steps.y, 0);
this.volumetricVectors[2].set (0, 0, this.params.steps.z);
this.voxelCounts[0] = Clazz.floatToInt (this.params.points.x);
this.voxelCounts[1] = Clazz.floatToInt (this.params.points.y);
this.voxelCounts[2] = Clazz.floatToInt (this.params.points.z);
if (this.voxelCounts[0] < 1 || this.voxelCounts[1] < 1 || this.voxelCounts[2] < 1) return false;
this.showGridInfo ();
return true;
});
Clazz.defineMethod (c$, "showGridInfo", 
function () {
org.jmol.util.Logger.info ("grid origin  = " + this.params.origin);
org.jmol.util.Logger.info ("grid steps   = " + this.params.steps);
org.jmol.util.Logger.info ("grid points  = " + this.params.points);
this.ptTemp.x = this.params.steps.x * this.params.points.x;
this.ptTemp.y = this.params.steps.y * this.params.points.y;
this.ptTemp.z = this.params.steps.z * this.params.points.z;
org.jmol.util.Logger.info ("grid lengths = " + this.ptTemp);
this.ptTemp.add (this.params.origin);
org.jmol.util.Logger.info ("grid max xyz = " + this.ptTemp);
});
Clazz.defineMethod (c$, "setVoxelRange", 
function (index, min, max, ptsPerAngstrom, gridMax, minPointsPerAngstrom) {
var nGrid;
var d;
if (min >= max) {
min = -10;
max = 10;
}var range = max - min;
var resolution = this.params.resolution;
if (resolution != 3.4028235E38) ptsPerAngstrom = resolution;
nGrid = Clazz.doubleToInt (Math.floor (range * ptsPerAngstrom)) + 1;
if (nGrid > gridMax) {
if ((this.dataType & 256) > 0) {
if (resolution == 3.4028235E38) {
if (!this.isQuiet) org.jmol.util.Logger.info ("Maximum number of voxels for index=" + index + " exceeded (" + nGrid + ") -- set to " + gridMax);
nGrid = gridMax;
} else {
if (!this.isQuiet) org.jmol.util.Logger.info ("Warning -- high number of grid points: " + nGrid);
}} else if (resolution == 3.4028235E38) {
nGrid = gridMax;
}}ptsPerAngstrom = (nGrid - 1) / range;
if (ptsPerAngstrom < minPointsPerAngstrom) {
ptsPerAngstrom = minPointsPerAngstrom;
nGrid = Clazz.doubleToInt (Math.floor (ptsPerAngstrom * range + 1));
ptsPerAngstrom = (nGrid - 1) / range;
}d = this.volumeData.volumetricVectorLengths[index] = 1 / ptsPerAngstrom;
this.voxelCounts[index] = nGrid;
if (!this.isQuiet) org.jmol.util.Logger.info ("isosurface resolution for axis " + (index + 1) + " set to " + ptsPerAngstrom + " points/Angstrom; " + this.voxelCounts[index] + " voxels");
switch (index) {
case 0:
this.volumetricVectors[0].set (d, 0, 0);
this.volumetricOrigin.x = min;
break;
case 1:
this.volumetricVectors[1].set (0, d, 0);
this.volumetricOrigin.y = min;
break;
case 2:
this.volumetricVectors[2].set (0, 0, d);
this.volumetricOrigin.z = min;
if (this.isEccentric) this.eccentricityMatrix.transform (this.volumetricOrigin);
if (this.center.x != 3.4028235E38) this.volumetricOrigin.add (this.center);
}
if (this.isEccentric) this.eccentricityMatrix.transform (this.volumetricVectors[index]);
return this.voxelCounts[index];
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "readSurfaceData", 
function (isMapData) {
if (this.isProgressive && !isMapData) {
this.nDataPoints = this.volumeData.setVoxelCounts (this.nPointsX, this.nPointsY, this.nPointsZ);
this.voxelData = null;
return;
}if (this.precalculateVoxelData) this.generateCube ();
 else this.readVoxelDataIndividually (isMapData);
}, "~B");
Clazz.defineMethod (c$, "generateCube", 
function () {
org.jmol.util.Logger.info ("data type: user volumeData");
org.jmol.util.Logger.info ("voxel grid origin:" + this.volumetricOrigin);
for (var i = 0; i < 3; ++i) org.jmol.util.Logger.info ("voxel grid vector:" + this.volumetricVectors[i]);

org.jmol.util.Logger.info ("Read " + this.nPointsX + " x " + this.nPointsY + " x " + this.nPointsZ + " data points");
});
Clazz.overrideMethod (c$, "closeReader", 
function () {
});
});
// 
//// org\jmol\jvxl\readers\AtomDataReader.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.VolumeDataReader", "org.jmol.atomdata.AtomData", "org.jmol.util.BitSet", "$.Point3f", "$.Point3i"], "org.jmol.jvxl.readers.AtomDataReader", ["java.lang.Float", "java.util.Date", "org.jmol.atomdata.RadiusData", "org.jmol.constant.EnumVdw", "org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.ArrayUtil", "$.BitSetUtil", "$.Logger", "$.StringXBuilder", "$.TextFormat", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.maxDistance = 0;
this.contactPair = null;
this.fileName = null;
this.fileDotModel = null;
this.modelIndex = 0;
this.atomData = null;
this.atomXyz = null;
this.atomRadius = null;
this.atomProp = null;
this.atomNo = null;
this.atomIndex = null;
this.myIndex = null;
this.atomCount = 0;
this.myAtomCount = 0;
this.nearbyAtomCount = 0;
this.firstNearbyAtom = 0;
this.bsMySelected = null;
this.bsMyIgnored = null;
this.bsNearby = null;
this.doAddHydrogens = false;
this.havePlane = false;
this.doUseIterator = false;
this.minPtsPerAng = 0;
this.thisPlane = null;
this.thisAtomSet = null;
this.thisX = 0;
this.margin = 0;
this.bsSurfaceVoxels = null;
this.validSpheres = null;
this.noFaceSpheres = null;
this.voxelSource = null;
this.ptY0 = null;
this.ptZ0 = null;
this.pt0 = null;
this.pt1 = null;
this.ptXyzTemp = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "AtomDataReader", org.jmol.jvxl.readers.VolumeDataReader);
Clazz.prepareFields (c$, function () {
this.atomData =  new org.jmol.atomdata.AtomData ();
this.bsMySelected =  new org.jmol.util.BitSet ();
this.bsMyIgnored =  new org.jmol.util.BitSet ();
this.ptY0 =  new org.jmol.util.Point3f ();
this.ptZ0 =  new org.jmol.util.Point3f ();
this.pt0 =  new org.jmol.util.Point3i ();
this.pt1 =  new org.jmol.util.Point3i ();
this.ptXyzTemp =  new org.jmol.util.Point3f ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.AtomDataReader, []);
});
Clazz.defineMethod (c$, "init", 
function (sg) {
Clazz.superCall (this, org.jmol.jvxl.readers.AtomDataReader, "init", [sg]);
this.precalculateVoxelData = true;
this.atomDataServer = sg.getAtomDataServer ();
}, "org.jmol.jvxl.readers.SurfaceGenerator");
Clazz.overrideMethod (c$, "setup", 
function (isMapData) {
this.contactPair = this.params.contactPair;
this.doAddHydrogens = (this.sg.getAtomDataServer () != null && this.params.addHydrogens);
this.modelIndex = this.params.modelIndex;
if (this.params.bsIgnore != null) this.bsMyIgnored = this.params.bsIgnore;
if (this.params.volumeData != null) {
this.setVolumeData (this.params.volumeData);
this.setBoundingBox (this.volumeData.volumetricOrigin, 0);
this.ptXyzTemp.setT (this.volumeData.volumetricOrigin);
for (var i = 0; i < 3; i++) this.ptXyzTemp.scaleAdd2 (this.volumeData.voxelCounts[i] - 1, this.volumeData.volumetricVectors[i], this.ptXyzTemp);

this.setBoundingBox (this.ptXyzTemp, 0);
}this.havePlane = (this.params.thePlane != null);
if (this.havePlane) this.volumeData.setPlaneParameters (this.params.thePlane);
}, "~B");
Clazz.defineMethod (c$, "markPlaneVoxels", 
function (p, r) {
for (var i = 0, pt = this.thisX * this.yzCount, pt1 = pt + this.yzCount; pt < pt1; pt++, i++) {
this.volumeData.getPoint (pt, this.ptXyzTemp);
this.thisPlane[i] = this.ptXyzTemp.distance (p) - r;
}
}, "org.jmol.util.Point3f,~N");
Clazz.defineMethod (c$, "setVolumeForPlane", 
function () {
if (this.useOriginStepsPoints) {
this.xyzMin = org.jmol.util.Point3f.newP (this.params.origin);
this.xyzMax = org.jmol.util.Point3f.newP (this.params.origin);
this.xyzMax.x += (this.params.points.x - 1) * this.params.steps.x;
this.xyzMax.y += (this.params.points.y - 1) * this.params.steps.y;
this.xyzMax.z += (this.params.points.z - 1) * this.params.steps.z;
} else {
this.getAtoms (this.params.bsSelected, false, true, false, false, false, false, this.params.mep_marginAngstroms);
if (this.xyzMin == null) {
this.xyzMin = org.jmol.util.Point3f.new3 (-10, -10, -10);
this.xyzMax = org.jmol.util.Point3f.new3 (10, 10, 10);
}}this.setRanges (this.params.plane_ptsPerAngstrom, this.params.plane_gridMax, 0);
});
Clazz.defineMethod (c$, "getAtoms", 
function (bsSelected, doAddHydrogens, getRadii, getMolecules, getAllModels, addNearbyAtoms, getAtomMinMax, marginAtoms) {
if (addNearbyAtoms) getRadii = true;
if (getRadii) {
if (this.params.atomRadiusData == null) this.params.atomRadiusData =  new org.jmol.atomdata.RadiusData (null, 1, org.jmol.atomdata.RadiusData.EnumType.FACTOR, org.jmol.constant.EnumVdw.AUTO);
this.atomData.radiusData = this.params.atomRadiusData;
this.atomData.radiusData.valueExtended = this.params.solventExtendedAtomRadius;
if (doAddHydrogens) this.atomData.radiusData.vdwType = org.jmol.constant.EnumVdw.NOJMOL;
}this.atomData.modelIndex = this.modelIndex;
this.atomData.bsSelected = bsSelected;
this.atomData.bsIgnored = this.bsMyIgnored;
this.sg.fillAtomData (this.atomData, 1 | (getAllModels ? 16 : 0) | (getMolecules ? 4 : 0) | (getRadii ? 2 : 0));
if (this.doUseIterator) this.atomData.bsSelected = null;
this.atomCount = this.atomData.atomCount;
this.modelIndex = this.atomData.firstModelIndex;
var nSelected = 0;
var needRadius = false;
for (var i = 0; i < this.atomCount; i++) {
if ((bsSelected == null || bsSelected.get (i)) && (!this.bsMyIgnored.get (i))) {
if (this.havePlane && Math.abs (this.volumeData.distancePointToPlane (this.atomData.atomXyz[i])) > 2 * (this.atomData.atomRadius[i] = this.getWorkingRadius (i, marginAtoms))) continue;
this.bsMySelected.set (i);
nSelected++;
needRadius = !this.havePlane;
}if (getRadii && (addNearbyAtoms || needRadius)) this.atomData.atomRadius[i] = this.getWorkingRadius (i, marginAtoms);
}
var rH = (getRadii && doAddHydrogens ? this.getWorkingRadius (-1, marginAtoms) : 0);
this.myAtomCount = org.jmol.util.BitSetUtil.cardinalityOf (this.bsMySelected);
var atomSet = org.jmol.util.BitSetUtil.copy (this.bsMySelected);
var nH = 0;
this.atomProp = null;
var props = this.params.theProperty;
if (this.myAtomCount > 0) {
var hAtoms = null;
if (doAddHydrogens) {
this.atomData.bsSelected = atomSet;
this.atomDataServer.fillAtomData (this.atomData, 8);
hAtoms =  new Array (nH = this.atomData.hydrogenAtomCount);
for (var i = 0; i < this.atomData.hAtoms.length; i++) if (this.atomData.hAtoms[i] != null) for (var j = this.atomData.hAtoms[i].length; --j >= 0; ) hAtoms[--nH] = this.atomData.hAtoms[i][j];


nH = hAtoms.length;
org.jmol.util.Logger.info (nH + " attached hydrogens added");
}var n = nH + this.myAtomCount;
if (getRadii) this.atomRadius =  Clazz.newFloatArray (n, 0);
this.atomXyz =  new Array (n);
if (this.params.theProperty != null) this.atomProp =  Clazz.newFloatArray (n, 0);
this.atomNo =  Clazz.newIntArray (n, 0);
this.atomIndex =  Clazz.newIntArray (n, 0);
this.myIndex =  Clazz.newIntArray (this.atomCount, 0);
for (var i = 0; i < nH; i++) {
if (getRadii) this.atomRadius[i] = rH;
this.atomXyz[i] = hAtoms[i];
this.atomNo[i] = -1;
if (this.atomProp != null) this.atomProp[i] = NaN;
}
this.myAtomCount = nH;
for (var i = atomSet.nextSetBit (0); i >= 0; i = atomSet.nextSetBit (i + 1)) {
if (this.atomProp != null) this.atomProp[this.myAtomCount] = (props != null && i < props.length ? props[i] : NaN);
this.atomXyz[this.myAtomCount] = this.atomData.atomXyz[i];
this.atomNo[this.myAtomCount] = this.atomData.atomicNumber[i];
this.atomIndex[this.myAtomCount] = i;
this.myIndex[i] = this.myAtomCount;
if (getRadii) this.atomRadius[this.myAtomCount] = this.atomData.atomRadius[i];
this.myAtomCount++;
}
}this.firstNearbyAtom = this.myAtomCount;
org.jmol.util.Logger.info (this.myAtomCount + " atoms will be used in the surface calculation");
if (this.myAtomCount == 0) {
this.setBoundingBox (org.jmol.util.Point3f.new3 (10, 10, 10), 0);
this.setBoundingBox (org.jmol.util.Point3f.new3 (-10, -10, -10), 0);
}for (var i = 0; i < this.myAtomCount; i++) this.setBoundingBox (this.atomXyz[i], getRadii ? this.atomRadius[i] + 0.5 : 0);

if (!Float.isNaN (this.params.scale)) {
var v = org.jmol.util.Vector3f.newV (this.xyzMax);
v.sub (this.xyzMin);
v.scale (0.5);
this.xyzMin.add (v);
v.scale (this.params.scale);
this.xyzMax.setT (this.xyzMin);
this.xyzMax.add (v);
this.xyzMin.sub (v);
}if (!addNearbyAtoms || this.myAtomCount == 0) return;
var pt =  new org.jmol.util.Point3f ();
this.bsNearby =  new org.jmol.util.BitSet ();
for (var i = 0; i < this.atomCount; i++) {
if (atomSet.get (i) || this.bsMyIgnored.get (i)) continue;
var rA = this.atomData.atomRadius[i];
if (this.params.thePlane != null && Math.abs (this.volumeData.distancePointToPlane (this.atomData.atomXyz[i])) > 2 * rA) continue;
if (this.params.theProperty != null) rA += this.maxDistance;
pt = this.atomData.atomXyz[i];
if (pt.x + rA > this.xyzMin.x && pt.x - rA < this.xyzMax.x && pt.y + rA > this.xyzMin.y && pt.y - rA < this.xyzMax.y && pt.z + rA > this.xyzMin.z && pt.z - rA < this.xyzMax.z) {
this.bsNearby.set (i);
this.nearbyAtomCount++;
}}
var nAtoms = this.myAtomCount;
if (this.nearbyAtomCount != 0) {
nAtoms += this.nearbyAtomCount;
this.atomRadius = org.jmol.util.ArrayUtil.arrayCopyF (this.atomRadius, nAtoms);
this.atomXyz = org.jmol.util.ArrayUtil.arrayCopyObject (this.atomXyz, nAtoms);
if (this.atomIndex != null) this.atomIndex = org.jmol.util.ArrayUtil.arrayCopyI (this.atomIndex, nAtoms);
if (props != null) this.atomProp = org.jmol.util.ArrayUtil.arrayCopyF (this.atomProp, nAtoms);
for (var i = this.bsNearby.nextSetBit (0); i >= 0; i = this.bsNearby.nextSetBit (i + 1)) {
if (props != null) this.atomProp[this.myAtomCount] = props[i];
this.myIndex[i] = this.myAtomCount;
this.atomIndex[this.myAtomCount] = i;
this.atomXyz[this.myAtomCount] = this.atomData.atomXyz[i];
this.atomRadius[this.myAtomCount++] = this.atomData.atomRadius[i];
}
}}, "org.jmol.util.BitSet,~B,~B,~B,~B,~B,~B,~N");
Clazz.defineMethod (c$, "getWorkingRadius", 
($fz = function (i, marginAtoms) {
var r = (i < 0 ? this.atomData.hAtomRadius : this.atomData.atomRadius[i]);
return (Float.isNaN (marginAtoms) ? Math.max (r, 0.1) : r + marginAtoms);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setHeader", 
function (calcType, line2) {
this.jvxlFileHeaderBuffer =  new org.jmol.util.StringXBuilder ();
if (this.atomData.programInfo != null) this.jvxlFileHeaderBuffer.append ("#created by ").append (this.atomData.programInfo).append (" on ").append ("" +  new java.util.Date ()).append ("\n");
this.jvxlFileHeaderBuffer.append (calcType).append ("\n").append (line2).append ("\n");
}, "~S,~S");
Clazz.defineMethod (c$, "setRanges", 
function (ptsPerAngstrom, maxGrid, minPtsPerAng) {
if (this.xyzMin == null) return;
this.ptsPerAngstrom = ptsPerAngstrom;
this.maxGrid = maxGrid;
this.minPtsPerAng = minPtsPerAng;
this.setVolumeData ();
org.jmol.jvxl.data.JvxlCoder.jvxlCreateHeader (this.volumeData, this.jvxlFileHeaderBuffer);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setVolumeData", 
function () {
if (!this.setVolumeDataParams ()) {
this.setVoxelRange (0, this.xyzMin.x, this.xyzMax.x, this.ptsPerAngstrom, this.maxGrid, this.minPtsPerAng);
this.setVoxelRange (1, this.xyzMin.y, this.xyzMax.y, this.ptsPerAngstrom, this.maxGrid, this.minPtsPerAng);
this.setVoxelRange (2, this.xyzMin.z, this.xyzMax.z, this.ptsPerAngstrom, this.maxGrid, this.minPtsPerAng);
}});
Clazz.defineMethod (c$, "fixTitleLine", 
function (iLine) {
if (this.params.title == null) return false;
var line = this.params.title[iLine];
if (line.indexOf ("%F") > 0) line = this.params.title[iLine] = org.jmol.util.TextFormat.formatStringS (line, "F", this.atomData.fileName);
if (line.indexOf ("%M") > 0) this.params.title[iLine] = org.jmol.util.TextFormat.formatStringS (line, "M", this.atomData.modelName);
return true;
}, "~N");
Clazz.defineMethod (c$, "setVertexSource", 
function () {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
if (this.params.vertexSource != null) {
this.params.vertexSource = org.jmol.util.ArrayUtil.arrayCopyI (this.params.vertexSource, this.meshData.vertexCount);
for (var i = 0; i < this.meshData.vertexCount; i++) this.params.vertexSource[i] = Math.abs (this.params.vertexSource[i]) - 1;

}});
Clazz.defineMethod (c$, "resetPlane", 
function (value) {
for (var i = 0; i < this.yzCount; i++) this.thisPlane[i] = value;

}, "~N");
Clazz.defineMethod (c$, "resetVoxelData", 
function (value) {
for (var x = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) this.voxelData[x][y][z] = value;



}, "~N");
Clazz.defineMethod (c$, "getVoxel", 
($fz = function (i, j, k, ipt) {
return (this.isProgressive ? this.thisPlane[ipt % this.yzCount] : this.voxelData[i][j][k]);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.defineMethod (c$, "unsetVoxelData", 
function () {
if (this.isProgressive) for (var i = 0; i < this.yzCount; i++) {
if (this.thisPlane[i] == 3.4028235E38) this.thisPlane[i] = NaN;
}
 else for (var x = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) if (this.voxelData[x][y][z] == 3.4028235E38) this.voxelData[x][y][z] = NaN;



});
Clazz.defineMethod (c$, "setGridLimitsForAtom", 
function (ptA, rA, pt0, pt1) {
rA += this.margin;
this.volumeData.xyzToVoxelPt (ptA.x, ptA.y, ptA.z, pt0);
var x = Clazz.doubleToInt (Math.floor (rA / this.volumeData.volumetricVectorLengths[0]));
var y = Clazz.doubleToInt (Math.floor (rA / this.volumeData.volumetricVectorLengths[1]));
var z = Clazz.doubleToInt (Math.floor (rA / this.volumeData.volumetricVectorLengths[2]));
pt1.set (pt0.x + x, pt0.y + y, pt0.z + z);
pt0.set (pt0.x - x, pt0.y - y, pt0.z - z);
pt0.x = Math.max (pt0.x - 1, 0);
pt0.y = Math.max (pt0.y - 1, 0);
pt0.z = Math.max (pt0.z - 1, 0);
pt1.x = Math.min (pt1.x + 1, this.nPointsX);
pt1.y = Math.min (pt1.y + 1, this.nPointsY);
pt1.z = Math.min (pt1.z + 1, this.nPointsZ);
}, "org.jmol.util.Point3f,~N,org.jmol.util.Point3i,org.jmol.util.Point3i");
Clazz.defineMethod (c$, "getAtomMinMax", 
function (bs, bsAtomMinMax) {
for (var i = 0; i < this.nPointsX; i++) bsAtomMinMax[i] =  new org.jmol.util.BitSet ();

for (var iAtom = this.myAtomCount; --iAtom >= 0; ) {
if (bs != null && !bs.get (iAtom)) continue;
this.setGridLimitsForAtom (this.atomXyz[iAtom], this.atomRadius[iAtom], this.pt0, this.pt1);
for (var i = this.pt0.x; i < this.pt1.x; i++) bsAtomMinMax[i].set (iAtom);

}
}, "org.jmol.util.BitSet,~A");
Clazz.defineMethod (c$, "markSphereVoxels", 
function (r0, distance) {
var isWithin = (distance != 3.4028235E38 && this.point != null);
for (var iAtom = this.thisAtomSet.nextSetBit (0); iAtom >= 0; iAtom = this.thisAtomSet.nextSetBit (iAtom + 1)) {
if (!this.havePlane && this.validSpheres != null && !this.validSpheres.get (iAtom)) continue;
var isSurface = (this.noFaceSpheres != null && this.noFaceSpheres.get (iAtom));
var isNearby = (iAtom >= this.firstNearbyAtom);
var ptA = this.atomXyz[iAtom];
var rA = this.atomRadius[iAtom];
if (isWithin && ptA.distance (this.point) > distance + rA + 0.5) continue;
var rA0 = rA + r0;
this.setGridLimitsForAtom (ptA, rA0, this.pt0, this.pt1);
if (this.isProgressive) {
this.pt0.x = this.thisX;
this.pt1.x = this.thisX + 1;
}this.volumeData.voxelPtToXYZ (this.pt0.x, this.pt0.y, this.pt0.z, this.ptXyzTemp);
for (var i = this.pt0.x; i < this.pt1.x; i++, this.ptXyzTemp.scaleAdd2 (1, this.volumetricVectors[0], this.ptY0)) {
this.ptY0.setT (this.ptXyzTemp);
for (var j = this.pt0.y; j < this.pt1.y; j++, this.ptXyzTemp.scaleAdd2 (1, this.volumetricVectors[1], this.ptZ0)) {
this.ptZ0.setT (this.ptXyzTemp);
for (var k = this.pt0.z; k < this.pt1.z; k++, this.ptXyzTemp.add (this.volumetricVectors[2])) {
var value = this.ptXyzTemp.distance (ptA) - rA;
var ipt = this.volumeData.getPointIndex (i, j, k);
if ((r0 == 0 || value <= rA0) && value < this.getVoxel (i, j, k, ipt)) {
if (isNearby || isWithin && this.ptXyzTemp.distance (this.point) > distance) value = NaN;
this.setVoxel (i, j, k, ipt, value);
if (!Float.isNaN (value)) {
if (this.voxelSource != null) this.voxelSource[ipt] = iAtom + 1;
if (value < 0 && isSurface) this.bsSurfaceVoxels.set (ipt);
}}}
}
}
}
}, "~N,~N");
Clazz.defineMethod (c$, "setVoxel", 
function (i, j, k, ipt, value) {
if (this.isProgressive) this.thisPlane[ipt % this.yzCount] = value;
 else this.voxelData[i][j][k] = value;
}, "~N,~N,~N,~N,~N");
});
// 
//// org\jmol\jvxl\readers\IsoSolventReader.js 
// 
Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.AtomDataReader", "org.jmol.util.Point3f", "$.Point4f", "$.Vector3f"], "org.jmol.jvxl.readers.IsoSolventReader", ["java.lang.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.jvxl.data.MeshData", "org.jmol.util.BitSet", "$.BitSetUtil", "$.Logger", "$.Measure", "$.MeshSurface", "$.Point3i"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cavityRadius = 0;
this.envelopeRadius = 0;
this.dots = null;
this.doCalculateTroughs = false;
this.isCavity = false;
this.isPocket = false;
this.solventRadius = 0;
this.iter = null;
this.bsSurfacePoints = null;
this.bsSurfaceDone = null;
this.bsLocale = null;
this.htEdges = null;
this.vEdges = null;
this.aEdges = null;
this.vFaces = null;
this.vTemp = null;
this.plane = null;
this.ptTemp2 = null;
this.ptS1 = null;
this.ptS2 = null;
this.vTemp2 = null;
this.vTemp3 = null;
this.dPX = 0;
this.p = null;
this.maxRadius = 0;
this.bsAtomMinMax = null;
this.isSurfacePoint = false;
this.iAtomSurface = 0;
if (!Clazz.isClassDefined ("org.jmol.jvxl.readers.IsoSolventReader.Edge")) {
org.jmol.jvxl.readers.IsoSolventReader.$IsoSolventReader$Edge$ ();
}
if (!Clazz.isClassDefined ("org.jmol.jvxl.readers.IsoSolventReader.Face")) {
org.jmol.jvxl.readers.IsoSolventReader.$IsoSolventReader$Face$ ();
}
this.nTest = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers, "IsoSolventReader", org.jmol.jvxl.readers.AtomDataReader);
Clazz.prepareFields (c$, function () {
this.vTemp =  new org.jmol.util.Vector3f ();
this.plane =  new org.jmol.util.Point4f ();
this.ptTemp2 =  new org.jmol.util.Point3f ();
this.ptS1 =  new org.jmol.util.Point3f ();
this.ptS2 =  new org.jmol.util.Point3f ();
this.vTemp2 =  new org.jmol.util.Vector3f ();
this.vTemp3 =  new org.jmol.util.Vector3f ();
this.p =  new org.jmol.util.Point3f ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.IsoSolventReader, []);
});
Clazz.overrideMethod (c$, "readVolumeParameters", 
function (isMapData) {
this.setup (isMapData);
this.initializeVolumetricData ();
if (this.isProgressive) {
this.volumeData.setUnitVectors ();
this.volumeData.getYzCount ();
this.bsAtomMinMax =  new Array (this.nPointsX);
this.getAtomMinMax (null, this.bsAtomMinMax);
this.voxelSource =  Clazz.newIntArray (this.volumeData.nPoints, 0);
}return true;
}, "~B");
Clazz.defineMethod (c$, "setup", 
function (isMapData) {
Clazz.superCall (this, org.jmol.jvxl.readers.IsoSolventReader, "setup", [isMapData]);
if (this.contactPair == null) {
this.cavityRadius = this.params.cavityRadius;
this.envelopeRadius = this.params.envelopeRadius;
this.solventRadius = this.params.solventRadius;
this.point = this.params.point;
this.isCavity = (this.params.isCavity && this.meshDataServer != null);
this.isPocket = (this.params.pocket != null && this.meshDataServer != null);
this.doCalculateTroughs = (!isMapData && this.atomDataServer != null && !this.isCavity && this.solventRadius > 0 && (this.dataType == 1195 || this.dataType == 1203));
this.doUseIterator = this.doCalculateTroughs;
this.getAtoms (this.params.bsSelected, this.doAddHydrogens, true, false, false, true, false, NaN);
if (this.isCavity || this.isPocket) this.dots = this.meshDataServer.calculateGeodesicSurface (this.bsMySelected, this.envelopeRadius);
this.setHeader ("solvent/molecular surface", this.params.calculationType);
if (this.havePlane || !isMapData) {
var minPtsPerAng = 0;
this.setRanges (this.params.solvent_ptsPerAngstrom, this.params.solvent_gridMax, minPtsPerAng);
this.volumeData.getYzCount ();
this.margin = this.volumeData.maxGrid * 2.0;
}if (this.bsNearby != null) this.bsMySelected.or (this.bsNearby);
} else if (!isMapData) {
this.setVolumeData ();
}if (!this.doCalculateTroughs) {
if (isMapData) {
this.precalculateVoxelData = false;
this.volumeData.sr = this;
} else if (!this.isCavity) {
this.isProgressive = this.isXLowToHigh = true;
}}if (this.thisAtomSet == null) this.thisAtomSet = org.jmol.util.BitSetUtil.setAll (this.myAtomCount);
}, "~B");
Clazz.overrideMethod (c$, "generateCube", 
function () {
if (this.isCavity && this.params.theProperty != null) return;
this.getMaxRadius ();
if (this.isCavity && this.dataType != 1205 && this.dataType != 1206) {
this.params.vertexSource = null;
this.newVoxelDataCube ();
this.resetVoxelData (3.4028235E38);
this.markSphereVoxels (this.cavityRadius, this.params.distance);
this.generateSolventCavity ();
this.resetVoxelData (3.4028235E38);
this.markSphereVoxels (0, NaN);
} else {
this.voxelSource =  Clazz.newIntArray (this.volumeData.nPoints, 0);
this.generateSolventCube ();
}this.unsetVoxelData ();
var info = this.params.slabInfo;
if (info != null) for (var i = 0; i < info.size (); i++) if ((info.get (i)[2]).booleanValue () && Clazz.instanceOf (info.get (i)[0], org.jmol.util.Point4f)) {
this.volumeData.capData (info.get (i)[0], this.params.cutoff);
info.remove (i--);
}
});
Clazz.defineMethod (c$, "getSurfacePointAndFraction", 
function (cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA0, vB0, fReturn, ptReturn) {
var vA = this.marchingCubes.getLinearOffset (x, y, z, vA0);
var vB = this.marchingCubes.getLinearOffset (x, y, z, vB0);
this.isSurfacePoint = (this.bsSurfaceVoxels != null && (this.bsSurfaceVoxels.get (vA) || this.bsSurfaceVoxels.get (vB)));
if (org.jmol.jvxl.readers.IsoSolventReader.testLinear || this.voxelSource == null || this.voxelSource[vA] == 0 || this.voxelSource[vA] != this.voxelSource[vB]) return Clazz.superCall (this, org.jmol.jvxl.readers.IsoSolventReader, "getSurfacePointAndFraction", [cutoff, isCutoffAbsolute, valueA, valueB, pointA, edgeVector, x, y, z, vA, vB, fReturn, ptReturn]);
var iAtom = Math.abs (valueA < valueB ? this.voxelSource[vA] : this.voxelSource[vB]);
if (iAtom < 1 || iAtom - 1 >= this.atomIndex.length) System.out.println ("isosolv HHHHHMMMM");
this.iAtomSurface = this.atomIndex[iAtom - 1];
var fraction = fReturn[0] = org.jmol.util.MeshSurface.getSphericalInterpolationFraction ((this.voxelSource[vA] < 0 ? this.solventRadius : this.atomRadius[this.voxelSource[vA] - 1]), valueA, valueB, edgeVector.length ());
ptReturn.scaleAdd2 (fraction, edgeVector, pointA);
var diff = valueB - valueA;
return valueA + fraction * diff;
}, "~N,~B,~N,~N,org.jmol.util.Point3f,org.jmol.util.Vector3f,~N,~N,~N,~N,~N,~A,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "addVertexCopy", 
function (vertexXYZ, value, assocVertex) {
var i = Clazz.superCall (this, org.jmol.jvxl.readers.IsoSolventReader, "addVertexCopy", [vertexXYZ, value, assocVertex]);
if (i < 0) return i;
if (this.isSurfacePoint) this.bsSurfacePoints.set (i);
if (this.params.vertexSource != null) this.params.vertexSource[i] = this.iAtomSurface;
return i;
}, "org.jmol.util.Point3f,~N,~N");
Clazz.overrideMethod (c$, "selectPocket", 
function (doExclude) {
if (this.meshDataServer != null) this.meshDataServer.fillMeshData (this.meshData, 1, null);
var v = this.meshData.vertices;
var nVertices = this.meshData.vertexCount;
var vv = this.meshData.vertexValues;
var nDots = this.dots.length;
for (var i = 0; i < nVertices; i++) {
for (var j = 0; j < nDots; j++) {
if (this.dots[j].distance (v[i]) < this.envelopeRadius) {
vv[i] = NaN;
continue;
}}
}
this.meshData.getSurfaceSet ();
var nSets = this.meshData.nSets;
var pocketSet = org.jmol.util.BitSetUtil.newBitSet (nSets);
var ss;
for (var i = 0; i < nSets; i++) if ((ss = this.meshData.surfaceSet[i]) != null) for (var j = ss.nextSetBit (0); j >= 0; j = ss.nextSetBit (j + 1)) if (Float.isNaN (this.meshData.vertexValues[j])) {
pocketSet.set (i);
break;
}

for (var i = 0; i < nSets; i++) if (this.meshData.surfaceSet[i] != null && pocketSet.get (i) == doExclude) this.meshData.invalidateSurfaceSet (i);

this.updateSurfaceData ();
if (!doExclude) this.meshData.surfaceSet = null;
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 3, null);
this.meshData =  new org.jmol.jvxl.data.MeshData ();
}}, "~B");
Clazz.overrideMethod (c$, "postProcessVertices", 
function () {
this.setVertexSource ();
if (this.doCalculateTroughs && this.bsSurfacePoints != null) {
var bsAll =  new org.jmol.util.BitSet ();
var bsSurfaces = this.meshData.getSurfaceSet ();
var bsSources = null;
var volumes = (this.isPocket ? null : this.meshData.calculateVolumeOrArea (-1, false, false));
var minVolume = (1.5 * 3.141592653589793 * Math.pow (this.solventRadius, 3));
for (var i = 0; i < this.meshData.nSets; i++) {
var bss = bsSurfaces[i];
if (bss.intersects (this.bsSurfacePoints)) {
if (volumes == null || Math.abs (volumes[i]) > minVolume) if (this.params.vertexSource != null) {
var bs =  new org.jmol.util.BitSet ();
if (bsSources == null) bsSources =  new Array (bsSurfaces.length);
for (var j = bss.nextSetBit (0); j >= 0; j = bss.nextSetBit (j + 1)) {
var iatom = this.params.vertexSource[j];
if (iatom < 0) continue;
if (bsAll.get (iatom)) {
this.meshData.invalidateSurfaceSet (i);
break;
}bs.set (iatom);
}
bsAll.or (bs);
continue;
}}this.meshData.invalidateSurfaceSet (i);
}
this.updateSurfaceData ();
if (this.meshDataServer != null) {
this.meshDataServer.fillMeshData (this.meshData, 3, null);
this.meshData =  new org.jmol.jvxl.data.MeshData ();
}}if (this.params.thePlane != null && this.params.slabInfo == null) this.params.addSlabInfo (org.jmol.util.MeshSurface.getSlabWithinRange (-100, 0));
});
Clazz.defineMethod (c$, "generateSolventCavity", 
($fz = function () {
var bs = org.jmol.util.BitSetUtil.newBitSet (this.nPointsX * this.nPointsY * this.nPointsZ);
var i = 0;
var nDots = this.dots.length;
var n = 0;
var d;
var r2 = this.envelopeRadius;
for (var x = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) {
out : for (var z = 0; z < this.nPointsZ; ++z, ++i) if ((d = this.voxelData[x][y][z]) < 3.4028235E38 && d >= this.cavityRadius) {
this.volumeData.voxelPtToXYZ (x, y, z, this.ptXyzTemp);
for (var j = 0; j < nDots; j++) {
if (this.dots[j].distance (this.ptXyzTemp) < r2) continue out;
}
bs.set (i);
n++;
}
}

org.jmol.util.Logger.info ("cavities include " + n + " voxel points");
this.atomRadius =  Clazz.newFloatArray (n, 0);
this.atomXyz =  new Array (n);
for (var x = 0, ipt = 0, apt = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) if (bs.get (ipt++)) {
this.volumeData.voxelPtToXYZ (x, y, z, (this.atomXyz[apt] =  new org.jmol.util.Point3f ()));
this.atomRadius[apt++] = this.voxelData[x][y][z];
}


this.myAtomCount = this.firstNearbyAtom = n;
this.thisAtomSet = org.jmol.util.BitSetUtil.setAll (this.myAtomCount);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateSolventCube", 
($fz = function () {
if (this.dataType == 1205) return;
this.params.vertexSource =  Clazz.newIntArray (this.volumeData.nPoints, 0);
this.bsSurfaceDone =  new org.jmol.util.BitSet ();
this.bsSurfaceVoxels =  new org.jmol.util.BitSet ();
this.bsSurfacePoints =  new org.jmol.util.BitSet ();
if (this.doCalculateTroughs) {
this.iter = this.atomDataServer.getSelectedAtomIterator (this.bsMySelected, true, false, false);
this.vEdges =  new java.util.ArrayList ();
this.bsLocale =  new Array (this.myAtomCount);
this.htEdges =  new java.util.Hashtable ();
this.getEdges ();
org.jmol.util.Logger.info (this.vEdges.size () + " edges");
this.vFaces =  new java.util.ArrayList ();
this.getFaces ();
org.jmol.util.Logger.info (this.vFaces.size () + " faces");
this.vEdges = null;
this.bsLocale = null;
this.htEdges = null;
this.iter.release ();
this.iter = null;
this.newVoxelDataCube ();
this.resetVoxelData (3.4028235E38);
this.markFaceVoxels (true);
this.markToroidVoxels ();
this.aEdges = null;
this.markFaceVoxels (false);
this.vFaces = null;
} else {
this.newVoxelDataCube ();
this.resetVoxelData (3.4028235E38);
}this.markSphereVoxels (0, this.doCalculateTroughs ? 3.4028235E38 : this.params.distance);
this.noFaceSpheres = null;
this.validSpheres = null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getEdges", 
($fz = function () {
for (var iatomA = 0; iatomA < this.myAtomCount; iatomA++) this.bsLocale[iatomA] =  new org.jmol.util.BitSet ();

var dist2 = this.solventRadius + this.maxRadius;
for (var iatomA = 0; iatomA < this.myAtomCount; iatomA++) {
var ptA = this.atomXyz[iatomA];
var rA = this.atomRadius[iatomA] + this.solventRadius;
this.atomDataServer.setIteratorForAtom (this.iter, this.atomIndex[iatomA], rA + dist2);
while (this.iter.hasNext ()) {
var iB = this.iter.next ();
var iatomB = this.myIndex[iB];
if (iatomA >= this.firstNearbyAtom && iatomB >= this.firstNearbyAtom) continue;
var ptB = this.atomXyz[iatomB];
var rB = this.atomRadius[iatomB] + this.solventRadius;
var dAB = ptA.distance (ptB);
if (dAB >= rA + rB) continue;
var edge = Clazz.innerTypeInstance (org.jmol.jvxl.readers.IsoSolventReader.Edge, this, null, iatomA, iatomB);
this.vEdges.add (edge);
this.bsLocale[iatomA].set (iatomB);
this.bsLocale[iatomB].set (iatomA);
this.htEdges.put (edge.toString (), edge);
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "findEdge", 
function (i, j) {
return this.htEdges.get (i < j ? i + "_" + j : j + "_" + i);
}, "~N,~N");
Clazz.defineMethod (c$, "getFaces", 
($fz = function () {
var bs =  new org.jmol.util.BitSet ();
this.validSpheres =  new org.jmol.util.BitSet ();
this.noFaceSpheres = org.jmol.util.BitSetUtil.setAll (this.myAtomCount);
for (var i = this.vEdges.size (); --i >= 0; ) {
var edge = this.vEdges.get (i);
var ia = edge.ia;
var ib = edge.ib;
bs.clearAll ();
bs.or (this.bsLocale[ia]);
bs.and (this.bsLocale[ib]);
for (var ic = bs.nextSetBit (ib + 1); ic >= 0; ic = bs.nextSetBit (ic + 1)) {
if (this.getSolventPoints (ia, ib, ic)) {
var f;
var isOK = false;
if (this.validateFace (f = Clazz.innerTypeInstance (org.jmol.jvxl.readers.IsoSolventReader.Face, this, null, ia, ib, ic, edge, this.ptS1))) {
this.vFaces.add (f);
isOK = true;
}if (this.validateFace (f = Clazz.innerTypeInstance (org.jmol.jvxl.readers.IsoSolventReader.Face, this, null, ia, ib, ic, edge, this.ptS2))) {
this.vFaces.add (f);
isOK = true;
}if (isOK) {
this.noFaceSpheres.clear (ia);
this.noFaceSpheres.clear (ib);
this.noFaceSpheres.clear (ic);
}}}
}
var bsOK =  new org.jmol.util.BitSet ();
for (var i = this.vEdges.size (); --i >= 0; ) if (this.vEdges.get (i).getType () >= 0) bsOK.set (i);

this.aEdges =  new Array (bsOK.cardinality ());
for (var i = bsOK.nextSetBit (0), j = 0; i >= 0; i = bsOK.nextSetBit (i + 1)) this.aEdges[j++] = this.vEdges.get (i);

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSolventPoints", 
($fz = function (ia, ib, ic) {
var dPS = this.getPointP (ia, ib);
var ptC = this.atomXyz[ic];
var rCS = this.atomRadius[ic] + this.solventRadius;
var dCT = org.jmol.util.Measure.distanceToPlane (this.plane, ptC);
if (Math.abs (dCT) >= rCS) return false;
var dST = Math.sqrt (rCS * rCS - dCT * dCT);
this.ptTemp.scaleAdd2 (-dCT, this.vTemp, ptC);
var dpT = this.p.distance (this.ptTemp);
var dsp2 = (dPS * dPS);
var cosTheta = (dsp2 + dpT * dpT - dST * dST) / (2 * dPS * dpT);
if (Math.abs (cosTheta) >= 1) return false;
var vXS = this.vTemp2;
vXS.setT (this.ptTemp);
vXS.sub (this.p);
vXS.normalize ();
this.dPX = (dPS * cosTheta);
this.ptTemp.scaleAdd2 (this.dPX, vXS, this.p);
vXS.cross (this.vTemp, vXS);
vXS.normalize ();
vXS.scale ((Math.sqrt (1 - cosTheta * cosTheta) * dPS));
this.ptS1.setT (this.ptTemp);
this.ptS1.add (vXS);
this.ptS2.setT (this.ptTemp);
this.ptS2.sub (vXS);
return true;
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "validateFace", 
($fz = function (f) {
var dist2 = this.solventRadius + this.maxRadius;
this.atomDataServer.setIteratorForPoint (this.iter, this.modelIndex, f.pS, dist2);
f.isValid = true;
while (this.iter.hasNext ()) {
var ia = this.iter.next ();
var iatom = this.myIndex[ia];
if (iatom == f.ia || iatom == f.ib || iatom == f.ic) continue;
var d = this.atomData.atomXyz[ia].distance (f.pS);
if (d < this.atomData.atomRadius[ia] + this.solventRadius) {
f.isValid = false;
break;
}}
f.setEdges ();
if (!f.isValid) return false;
for (var k = 0; k < 3; k++) {
this.validSpheres.set (f.edges[k].ia);
this.validSpheres.set (f.edges[k].ib);
}
f.edges = null;
return true;
}, $fz.isPrivate = true, $fz), "org.jmol.jvxl.readers.IsoSolventReader.Face");
Clazz.defineMethod (c$, "markFaceVoxels", 
($fz = function (firstPass) {
var bsThisPass =  new org.jmol.util.BitSet ();
for (var fi = this.vFaces.size (); --fi >= 0; ) {
var f = this.vFaces.get (fi);
if (!f.isValid) continue;
this.setGridLimitsForAtom (f.pS, this.solventRadius, this.pt0, this.pt1);
this.volumeData.voxelPtToXYZ (this.pt0.x, this.pt0.y, this.pt0.z, this.ptXyzTemp);
var ptA = this.atomXyz[f.ia];
var ptB = this.atomXyz[f.ib];
var ptC = this.atomXyz[f.ic];
var ptS = f.pS;
if (org.jmol.util.Logger.debugging) {
f.dump ();
}for (var i = this.pt0.x; i < this.pt1.x; i++, this.ptXyzTemp.scaleAdd2 (1, this.volumetricVectors[0], this.ptY0)) {
this.ptY0.setT (this.ptXyzTemp);
for (var j = this.pt0.y; j < this.pt1.y; j++, this.ptXyzTemp.scaleAdd2 (1, this.volumetricVectors[1], this.ptZ0)) {
this.ptZ0.setT (this.ptXyzTemp);
for (var k = this.pt0.z; k < this.pt1.z; k++, this.ptXyzTemp.add (this.volumetricVectors[2])) {
var value = this.solventRadius - this.ptXyzTemp.distance (ptS);
var v = this.voxelData[i][j][k];
var ipt = this.volumeData.getPointIndex (i, j, k);
if (firstPass && value > 0) this.bsSurfaceDone.set (ipt);
if (org.jmol.util.Measure.isInTetrahedron (this.ptXyzTemp, ptA, ptB, ptC, ptS, this.plane, this.vTemp, this.vTemp2, this.vTemp3, false)) {
if (!firstPass ? !this.bsSurfaceDone.get (ipt) && value < 0 && value > -this.volumeData.maxGrid * 1.8 && (value > v) == bsThisPass.get (ipt) : (value > 0 && (v < 0 || v == 3.4028235E38 || (value > v) == bsThisPass.get (ipt)))) {
bsThisPass.set (ipt);
this.setVoxel (i, j, k, ipt, value);
if (this.voxelSource != null) this.voxelSource[ipt] = -1 - f.ia;
if (value > 0) {
this.bsSurfaceVoxels.set (ipt);
}}}}
}
}
}
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "markToroidVoxels", 
($fz = function () {
var ptA0 =  new org.jmol.util.Point3i ();
var ptB0 =  new org.jmol.util.Point3i ();
var ptA1 =  new org.jmol.util.Point3i ();
var ptB1 =  new org.jmol.util.Point3i ();
for (var ei = 0; ei < this.aEdges.length; ei++) {
var edge = this.aEdges[ei];
var ia = edge.ia;
var ib = edge.ib;
var ptA = this.atomXyz[ia];
var ptB = this.atomXyz[ib];
var rAS = this.atomRadius[ia] + this.solventRadius;
var rBS = this.atomRadius[ib] + this.solventRadius;
var dAB = ptB.distance (ptA);
this.setGridLimitsForAtom (ptA, this.atomRadius[ia] + this.solventRadius, ptA0, ptA1);
this.setGridLimitsForAtom (ptB, this.atomRadius[ib] + this.solventRadius, ptB0, ptB1);
org.jmol.jvxl.readers.IsoSolventReader.mergeLimits (ptA0, ptB0, this.pt0, null);
org.jmol.jvxl.readers.IsoSolventReader.mergeLimits (ptA1, ptB1, null, this.pt1);
this.volumeData.voxelPtToXYZ (this.pt0.x, this.pt0.y, this.pt0.z, this.ptXyzTemp);
for (var i = this.pt0.x; i < this.pt1.x; i++, this.ptXyzTemp.scaleAdd2 (1, this.volumetricVectors[0], this.ptY0)) {
this.ptY0.setT (this.ptXyzTemp);
for (var j = this.pt0.y; j < this.pt1.y; j++, this.ptXyzTemp.scaleAdd2 (1, this.volumetricVectors[1], this.ptZ0)) {
this.ptZ0.setT (this.ptXyzTemp);
for (var k = this.pt0.z; k < this.pt1.z; k++, this.ptXyzTemp.add (this.volumetricVectors[2])) {
var dVS = this.checkSpecialVoxel (ptA, rAS, ptB, rBS, dAB, this.ptXyzTemp);
if (Float.isNaN (dVS)) continue;
var value = this.solventRadius - dVS;
if (value < this.voxelData[i][j][k]) {
var ipt = this.volumeData.getPointIndex (i, j, k);
this.setVoxel (i, j, k, ipt, value);
if (this.voxelSource != null) this.voxelSource[ipt] = -1 - ia;
}}
}
}
}
this.validSpheres.or (this.noFaceSpheres);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "unsetVoxelData", 
function () {
if (!this.havePlane) {
Clazz.superCall (this, org.jmol.jvxl.readers.IsoSolventReader, "unsetVoxelData", []);
return;
}if (this.isProgressive) for (var i = 0; i < this.yzCount; i++) {
if (this.thisPlane[i] < 0.001) {
} else {
this.thisPlane[i] = 0.001;
}}
 else for (var x = 0; x < this.nPointsX; ++x) for (var y = 0; y < this.nPointsY; ++y) for (var z = 0; z < this.nPointsZ; ++z) if (this.voxelData[x][y][z] < 0.001) {
} else {
this.voxelData[x][y][z] = 0.001;
}


});
Clazz.defineMethod (c$, "getMaxRadius", 
function () {
this.maxRadius = 0;
for (var iAtom = 0; iAtom < this.myAtomCount; iAtom++) {
var rA = this.atomRadius[iAtom];
if (rA > this.maxRadius) this.maxRadius = rA;
}
});
c$.mergeLimits = Clazz.defineMethod (c$, "mergeLimits", 
($fz = function (ptA, ptB, pt0, pt1) {
if (pt0 != null) {
pt0.x = Math.min (ptA.x, ptB.x);
pt0.y = Math.min (ptA.y, ptB.y);
pt0.z = Math.min (ptA.z, ptB.z);
}if (pt1 != null) {
pt1.x = Math.max (ptA.x, ptB.x);
pt1.y = Math.max (ptA.y, ptB.y);
pt1.z = Math.max (ptA.z, ptB.z);
}}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3i,org.jmol.util.Point3i,org.jmol.util.Point3i,org.jmol.util.Point3i");
Clazz.defineMethod (c$, "checkSpecialVoxel", 
($fz = function (ptA, rAS, ptB, rBS, dAB, ptV) {
var dAV = ptA.distance (ptV);
var dBV = ptB.distance (ptV);
var dVS;
var f = rAS / dAV;
if (f > 1) {
this.p.set (ptA.x + (ptV.x - ptA.x) * f, ptA.y + (ptV.y - ptA.y) * f, ptA.z + (ptV.z - ptA.z) * f);
if (ptB.distance (this.p) >= rBS) return NaN;
dVS = this.solventDistance (rAS, rBS, dAB, dAV, dBV);
return (org.jmol.jvxl.readers.IsoSolventReader.voxelIsInTrough (dVS, rAS * rAS, rBS, dAB, dAV) ? dVS : NaN);
}if ((f = rBS / dBV) > 1) {
this.p.set (ptB.x + (ptV.x - ptB.x) * f, ptB.y + (ptV.y - ptB.y) * f, ptB.z + (ptV.z - ptB.z) * f);
if (ptA.distance (this.p) >= rAS) return NaN;
dVS = this.solventDistance (rBS, rAS, dAB, dBV, dAV);
return (org.jmol.jvxl.readers.IsoSolventReader.voxelIsInTrough (dVS, rBS * rBS, rAS, dAB, dBV) ? dVS : NaN);
}return NaN;
}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f,~N,org.jmol.util.Point3f,~N,~N,org.jmol.util.Point3f");
c$.voxelIsInTrough = Clazz.defineMethod (c$, "voxelIsInTrough", 
($fz = function (dXC, rAC2, rBC, dAB, dAX) {
var cosACBf = (rAC2 + rBC * rBC - dAB * dAB) / rBC;
var cosACXf = (rAC2 + dXC * dXC - dAX * dAX) / dXC;
return (cosACBf < cosACXf);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "solventDistance", 
($fz = function (rAS, rBS, dAB, dAV, dBV) {
var dAV2 = dAV * dAV;
var rAS2 = rAS * rAS;
var dAB2 = dAB * dAB;
var angleVAB = Math.acos ((dAV2 + dAB2 - dBV * dBV) / (2 * dAV * dAB));
var angleBAS = Math.acos ((dAB2 + rAS2 - rBS * rBS) / (2 * dAB * rAS));
var dVS = Math.sqrt (rAS2 + dAV2 - 2 * rAS * dAV * Math.cos (angleBAS - angleVAB));
return dVS;
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getPointP", 
function (ia, ib) {
var ptA = this.atomXyz[ia];
var ptB = this.atomXyz[ib];
var rAS = this.atomRadius[ia] + this.solventRadius;
var rBS = this.atomRadius[ib] + this.solventRadius;
this.vTemp.setT (ptB);
this.vTemp.sub (ptA);
var dAB = this.vTemp.length ();
this.vTemp.normalize ();
var rAS2 = rAS * rAS;
var dAB2 = dAB * dAB;
var cosAngleBAS = (dAB2 + rAS2 - rBS * rBS) / (2 * dAB * rAS);
var angleBAS = Math.acos (cosAngleBAS);
this.p.scaleAdd2 ((cosAngleBAS * rAS), this.vTemp, ptA);
org.jmol.util.Measure.getPlaneThroughPoint (this.p, this.vTemp, this.plane);
return Math.sin (angleBAS) * rAS;
}, "~N,~N");
Clazz.defineMethod (c$, "dumpLine", 
function (pt1, pt2, label, color) {
this.sg.log ("draw ID \"" + label + (this.nTest++) + "\" @{point" + org.jmol.util.Point3f.newP (pt1) + "} @{point" + org.jmol.util.Point3f.newP (pt2) + "} color " + color);
}, "org.jmol.util.Point3f,org.jmol.util.Tuple3f,~S,~S");
Clazz.defineMethod (c$, "dumpLine2", 
function (pt1, pt2, label, d, color1, color2) {
var pt =  new org.jmol.util.Vector3f ();
pt.setT (pt2);
pt.sub (pt1);
pt.normalize ();
pt.scale (d);
pt.add (pt1);
this.sg.log ("draw ID \"" + label + (this.nTest++) + "\" @{point" + org.jmol.util.Point3f.newP (pt1) + "} @{point" + org.jmol.util.Point3f.newP (pt) + "} color " + color1);
this.sg.log ("draw ID \"" + label + (this.nTest++) + "\" @{point" + org.jmol.util.Point3f.newP (pt) + "} @{point" + org.jmol.util.Point3f.newP (pt2) + "} color " + color2);
}, "org.jmol.util.Point3f,org.jmol.util.Point3f,~S,~N,~S,~S");
Clazz.defineMethod (c$, "dumpPoint", 
function (pt, label, color) {
this.sg.log ("draw ID \"" + label + (this.nTest++) + "\" @{point" + org.jmol.util.Point3f.newP (pt) + "} color " + color);
}, "org.jmol.util.Point3f,~S,~S");
Clazz.overrideMethod (c$, "getValueAtPoint", 
function (pt) {
if (this.contactPair != null) return pt.distance (this.contactPair.myAtoms[1]) - this.contactPair.radii[1];
var value = 3.4028235E38;
for (var iAtom = 0; iAtom < this.firstNearbyAtom; iAtom++) {
var r = pt.distance (this.atomXyz[iAtom]) - this.atomRadius[iAtom] - this.solventRadius;
if (r < value) value = r;
}
return (value == 3.4028235E38 ? NaN : value);
}, "org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "getPlane", 
function (x) {
if (this.yzCount == 0) {
this.initPlanes ();
}this.thisX = x;
this.thisPlane = this.yzPlanes[x % 2];
if (this.contactPair == null) {
this.resetPlane (3.4028235E38);
this.thisAtomSet = this.bsAtomMinMax[x];
this.markSphereVoxels (0, this.params.distance);
this.unsetVoxelData ();
} else {
this.markPlaneVoxels (this.contactPair.myAtoms[0], this.contactPair.radii[0]);
}return this.thisPlane;
}, "~N");
c$.$IsoSolventReader$Edge$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ia = 0;
this.ib = 0;
this.nFaces = 0;
this.nInvalid = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers.IsoSolventReader, "Edge");
Clazz.makeConstructor (c$, 
function (a, b) {
this.ia = Math.min (a, b);
this.ib = Math.max (a, b);
}, "~N,~N");
Clazz.defineMethod (c$, "addFace", 
function (a) {
if (a == null) {
this.nInvalid++;
return;
}this.nFaces++;
}, "org.jmol.jvxl.readers.IsoSolventReader.Face");
Clazz.defineMethod (c$, "getType", 
function () {
return (this.nFaces > 0 ? this.nFaces : this.nInvalid > 0 ? -this.nInvalid : 0);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.ia + "_" + this.ib;
});
c$ = Clazz.p0p ();
};
c$.$IsoSolventReader$Face$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ia = 0;
this.ib = 0;
this.ic = 0;
this.isValid = false;
this.pS = null;
this.edges = null;
Clazz.instantialize (this, arguments);
}, org.jmol.jvxl.readers.IsoSolventReader, "Face");
Clazz.prepareFields (c$, function () {
this.edges =  new Array (3);
});
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
this.ia = a;
this.ib = b;
this.ic = c;
this.pS = org.jmol.util.Point3f.newP (e);
this.edges[0] = d;
}, "~N,~N,~N,org.jmol.jvxl.readers.IsoSolventReader.Edge,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setEdges", 
function () {
if (this.edges[1] == null) {
this.edges[1] = this.b$["org.jmol.jvxl.readers.IsoSolventReader"].findEdge (this.ib, this.ic);
this.edges[2] = this.b$["org.jmol.jvxl.readers.IsoSolventReader"].findEdge (this.ic, this.ia);
}var a = (this.isValid ? this : null);
for (var b = 0; b < 3; b++) this.edges[b].addFace (a);

});
Clazz.defineMethod (c$, "dump", 
function () {
return;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"testLinear", false);
});
// 
//// org\jmol\rendersurface\IsosurfaceRenderer.js 
// 
Clazz.declarePackage ("org.jmol.rendersurface");
Clazz.load (["org.jmol.render.MeshRenderer", "org.jmol.util.Point3f", "$.Point3i"], "org.jmol.rendersurface.IsosurfaceRenderer", ["java.lang.Boolean", "$.Float", "org.jmol.util.Colix", "$.Normix", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.iHideBackground = false;
this.isBicolorMap = false;
this.backgroundColix = 0;
this.nError = 0;
this.vertexValues = null;
this.imesh = null;
this.isosurface = null;
this.isNavigationMode = false;
this.iShowNormals = false;
this.showNumbers = false;
this.$showKey = null;
this.hasColorRange = false;
this.ptTemp = null;
this.ptTempi = null;
Clazz.instantialize (this, arguments);
}, org.jmol.rendersurface, "IsosurfaceRenderer", org.jmol.render.MeshRenderer);
Clazz.prepareFields (c$, function () {
this.ptTemp =  new org.jmol.util.Point3f ();
this.ptTempi =  new org.jmol.util.Point3i ();
});
Clazz.defineMethod (c$, "render", 
function () {
this.needTranslucent = false;
this.iShowNormals = this.viewer.getTestFlag (4);
this.showNumbers = this.viewer.getTestFlag (3);
this.isosurface = this.shape;
this.exportPass = (this.isExport ? 2 : 0);
this.isNavigationMode = this.viewer.getNavigationMode ();
var mySlabValue = 2147483647;
var slabValue = this.g3d.getSlab ();
this.$showKey = (this.viewer.getIsosurfaceKey () ? Boolean.TRUE : null);
if (this.isNavigationMode) mySlabValue = Clazz.floatToInt (this.viewer.getNavigationOffset ().z);
this.isosurface.keyXy = null;
for (var i = this.isosurface.meshCount; --i >= 0; ) {
this.imesh = this.isosurface.meshes[i];
if (this.imesh.connections != null && !this.viewer.getModelSet ().atoms[this.imesh.connections[0]].isVisible (0)) continue;
this.hasColorRange = false;
if (this.renderMesh (mySlabValue, slabValue)) {
if (!this.isExport) this.renderInfo ();
if (this.isExport && this.haveBsSlabGhost) {
this.exportPass = 1;
this.renderMesh (mySlabValue, slabValue);
this.exportPass = 2;
}}}
return this.needTranslucent;
});
Clazz.defineMethod (c$, "renderInfo", 
function () {
if (this.hasColorRange && this.imesh.colorEncoder != null && Boolean.TRUE === this.$showKey) this.showKey ();
});
Clazz.defineMethod (c$, "showKey", 
($fz = function () {
this.$showKey = Boolean.FALSE;
var colors = null;
var colixes = null;
var vContours = null;
var n = 0;
var type = 0;
if (this.imesh.showContourLines) {
vContours = this.imesh.getContours ();
if (vContours == null) {
colixes = this.imesh.jvxlData.contourColixes;
if (colixes == null) return;
n = colixes.length;
} else {
n = vContours.length;
type = 1;
}} else {
colors = this.imesh.colorEncoder.getColorSchemeArray (this.imesh.colorEncoder.currentPalette);
n = colors.length;
type = 2;
}if (n < 2) return;
var factor = (this.g3d.isAntialiased () ? 2 : 1);
var height = this.viewer.getScreenHeight () * factor;
var dy = Clazz.doubleToInt (Clazz.doubleToInt (height / 2) / (n - 1));
var y = Clazz.doubleToInt (height / 4) * 3 - dy;
var x = 10 * factor;
var dx = 20 * factor;
this.isosurface.keyXy = [Clazz.doubleToInt (x / factor), 0, Clazz.doubleToInt ((x + dx) / factor), Clazz.doubleToInt ((y + dy) / factor), Clazz.doubleToInt (dy / factor)];
for (var i = 0; i < n; i++, y -= dy) {
switch (type) {
case 0:
if (!this.g3d.setColix (colixes[i])) return;
break;
case 1:
if (!this.g3d.setColix ((vContours[i].get (3))[0])) return;
break;
case 2:
this.g3d.setColor (colors[i]);
break;
}
this.g3d.fillRect (x, y, 5, 5, dx, dy);
}
this.isosurface.keyXy[1] = Clazz.doubleToInt ((y + dy) / factor);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "renderMesh", 
($fz = function (mySlabValue, slabValue) {
this.volumeRender = (this.imesh.jvxlData.colorDensity && this.imesh.jvxlData.allowVolumeRender);
if (!this.isNavigationMode) {
var meshSlabValue = this.imesh.jvxlData.slabValue;
if (meshSlabValue != -2147483648 && this.imesh.jvxlData.isSlabbable) {
var points = this.imesh.jvxlData.boundingBox;
this.pt2f.setT (points[0]);
this.pt2f.add (points[1]);
this.pt2f.scale (0.5);
this.viewer.transformPt3f (this.pt2f, this.pt2f);
var r = this.viewer.scaleToScreen (Clazz.floatToInt (this.pt2f.z), Math.round (points[0].distance (points[1]) * 500));
mySlabValue = Math.round (this.pt2f.z + r * (1 - meshSlabValue / 50));
}}this.g3d.setTranslucentCoverOnly (this.imesh.frontOnly);
this.thePlane = this.imesh.jvxlData.jvxlPlane;
this.vertexValues = this.imesh.vertexValues;
var isOK;
if (mySlabValue != 2147483647 && this.imesh.jvxlData.isSlabbable) {
this.g3d.setSlab (mySlabValue);
isOK = this.renderMesh (this.imesh);
this.g3d.setSlab (slabValue);
} else {
isOK = this.renderMesh (this.imesh);
}this.g3d.setTranslucentCoverOnly (false);
return isOK;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "render2", 
function (isExport) {
if (this.volumeRender) {
this.renderPoints ();
return;
}switch (this.imesh.dataType) {
case 70:
this.renderLonePair (false);
return;
case 71:
this.renderLonePair (true);
return;
}
this.isBicolorMap = this.imesh.jvxlData.isBicolorMap;
Clazz.superCall (this, org.jmol.rendersurface.IsosurfaceRenderer, "render2", [isExport]);
if (!this.g3d.setColix (4)) return;
if (this.imesh.showContourLines) this.renderContourLines ();
}, "~B");
Clazz.defineMethod (c$, "renderLonePair", 
($fz = function (isRadical) {
this.pt2f.setT (this.vertices[1]);
this.viewer.transformPt3f (this.pt2f, this.pt2f);
var r = this.viewer.scaleToScreen (Clazz.floatToInt (this.pt2f.z), 100);
if (r < 1) r = 1;
if (!isRadical) {
var v1 =  new org.jmol.util.Vector3f ();
var v2 =  new org.jmol.util.Vector3f ();
this.pt1f.setT (this.vertices[0]);
this.viewer.transformPt3f (this.pt1f, this.pt1f);
v1.sub2 (this.pt2f, this.pt1f);
v2.set (v1.x, v1.y, v1.z + 1);
v2.cross (v2, v1);
v2.normalize ();
var f = this.viewer.scaleToScreen (Clazz.floatToInt (this.pt1f.z), 100);
v2.scale (f);
this.pt1f.setT (this.pt2f);
this.pt1f.add (v2);
this.pt2f.sub (v2);
this.screens[0].set (Math.round (this.pt1f.x), Math.round (this.pt1f.y), Math.round (this.pt1f.z));
this.g3d.fillSphereI (r, this.screens[0]);
}this.screens[1].set (Math.round (this.pt2f.x), Math.round (this.pt2f.y), Math.round (this.pt2f.z));
this.g3d.fillSphereI (r, this.screens[1]);
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "renderContourLines", 
($fz = function () {
var vContours = this.imesh.getContours ();
if (vContours == null) {
if (this.imesh.jvxlData.contourValues != null) this.hasColorRange = true;
return;
}if (this.imesh.jvxlData.vertexDataOnly) return;
this.hasColorRange = (this.imesh.meshColix == 0);
for (var i = vContours.length; --i >= 0; ) {
var v = vContours[i];
if (v.size () < 6) continue;
this.colix = (this.imesh.meshColix == 0 ? (v.get (3))[0] : this.imesh.meshColix);
if (!this.g3d.setColix (this.colix)) return;
var n = v.size () - 1;
for (var j = 6; j < n; j++) {
var pt1 = v.get (j);
var pt2 = v.get (++j);
this.viewer.transformPtScr (pt1, this.pt1i);
this.viewer.transformPtScr (pt2, this.pt2i);
if (Float.isNaN (pt1.x) || Float.isNaN (pt2.x)) break;
this.pt1i.z -= 2;
this.pt2i.z -= 2;
this.g3d.drawLineAB (this.pt1i, this.pt2i);
}
}
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "renderPoints", 
function () {
try {
if (this.volumeRender) this.g3d.volumeRender (true);
var slabPoints = ((this.volumeRender || this.imesh.polygonCount == 0) && this.haveBsSlabDisplay);
var incr = this.imesh.vertexIncrement;
var diam;
if (this.imesh.diameter <= 0) {
diam = this.viewer.getDotScale ();
this.frontOnly = false;
} else {
diam = Clazz.doubleToInt (this.viewer.getScreenDim () / (this.volumeRender ? 50 : 100));
}var ptSize = Math.round (this.imesh.volumeRenderPointSize * 1000);
if (diam < 1) diam = 1;
var cX = (this.showNumbers ? Clazz.doubleToInt (this.viewer.getScreenWidth () / 2) : 0);
var cY = (this.showNumbers ? Clazz.doubleToInt (this.viewer.getScreenHeight () / 2) : 0);
if (this.showNumbers) this.g3d.setFontFid (this.g3d.getFontFidFS ("Monospaced", 24));
for (var i = (!this.imesh.hasGridPoints || this.imesh.firstRealVertex < 0 ? 0 : this.imesh.firstRealVertex); i < this.vertexCount; i += incr) {
if (this.vertexValues != null && Float.isNaN (this.vertexValues[i]) || this.frontOnly && this.transformedVectors[this.normixes[i]].z < 0 || this.imesh.jvxlData.thisSet >= 0 && this.imesh.vertexSets[i] != this.imesh.jvxlData.thisSet || !this.imesh.isColorSolid && this.imesh.vertexColixes != null && !this.setColix (this.imesh.vertexColixes[i]) || this.haveBsDisplay && !this.imesh.bsDisplay.get (i) || slabPoints && !this.bsSlab.get (i)) continue;
this.hasColorRange = true;
if (this.showNumbers && this.screens[i].z > 10 && Math.abs (this.screens[i].x - cX) < 150 && Math.abs (this.screens[i].y - cY) < 150) {
var s = i + (this.imesh.isColorSolid ? "" : " " + this.imesh.vertexValues[i]);
this.g3d.setColix (4);
this.g3d.drawStringNoSlab (s, null, this.screens[i].x, this.screens[i].y, this.screens[i].z - 30, 0);
}if (this.volumeRender) {
diam = this.viewer.scaleToScreen (this.screens[i].z, ptSize);
this.g3d.volumeRender4 (diam, this.screens[i].x, this.screens[i].y, this.screens[i].z);
} else {
this.g3d.fillSphereI (diam, this.screens[i]);
}}
if (incr == 3) {
this.g3d.setColix (this.isTranslucent ? org.jmol.util.Colix.getColixTranslucent3 (12, true, 0.5) : 12);
for (var i = 1; i < this.vertexCount; i += 3) this.g3d.fillCylinder (3, Clazz.doubleToInt (diam / 4), this.screens[i], this.screens[i + 1]);

this.g3d.setColix (this.isTranslucent ? org.jmol.util.Colix.getColixTranslucent3 (21, true, 0.5) : 21);
for (var i = 1; i < this.vertexCount; i += 3) this.g3d.fillSphereI (diam, this.screens[i]);

this.g3d.setColix (this.isTranslucent ? org.jmol.util.Colix.getColixTranslucent3 (7, true, 0.5) : 7);
for (var i = 2; i < this.vertexCount; i += 3) {
this.g3d.fillSphereI (diam, this.screens[i]);
}
}} catch (e) {
}
if (this.volumeRender) this.g3d.volumeRender (false);
});
Clazz.overrideMethod (c$, "renderTriangles", 
function (fill, iShowTriangles, isExport) {
var polygonIndexes = this.imesh.polygonIndexes;
this.colix = (this.haveBsSlabGhost ? this.imesh.slabColix : !fill && this.imesh.meshColix != 0 ? this.imesh.meshColix : this.imesh.colix);
var vertexColixes = (!fill && this.imesh.meshColix != 0 ? null : this.imesh.vertexColixes);
this.g3d.setColix (this.colix);
var diam = -2147483648;
var generateSet = isExport;
if (generateSet) {
if (this.frontOnly && fill) this.frontOnly = false;
this.bsPolygons.clearAll ();
}if (this.exportType == 1) {
this.frontOnly = false;
}var colorSolid = (this.haveBsSlabGhost && (!this.isBicolorMap) || vertexColixes == null || this.imesh.isColorSolid);
var noColor = (this.haveBsSlabGhost && !this.isBicolorMap || vertexColixes == null || !fill && this.imesh.meshColix != 0);
var isPlane = (this.imesh.jvxlData.jvxlPlane != null);
var colix = this.colix;
if (isPlane && !colorSolid && !fill && this.imesh.fillTriangles) {
colorSolid = true;
colix = 4;
}var colorArrayed = (colorSolid && this.imesh.polygonColixes != null);
if (colorArrayed && !fill && this.imesh.fillTriangles) colorArrayed = false;
var contourColixes = this.imesh.jvxlData.contourColixes;
this.hasColorRange = !colorSolid && !this.isBicolorMap;
for (var i = this.imesh.polygonCount; --i >= 0; ) {
var polygon = polygonIndexes[i];
if (polygon == null || this.haveBsSlabDisplay && !this.bsSlab.get (i)) continue;
var iA = polygon[0];
var iB = polygon[1];
var iC = polygon[2];
if (this.imesh.jvxlData.thisSet >= 0 && this.imesh.vertexSets != null && this.imesh.vertexSets[iA] != this.imesh.jvxlData.thisSet) continue;
if (this.haveBsDisplay && (!this.imesh.bsDisplay.get (iA) || !this.imesh.bsDisplay.get (iB) || !this.imesh.bsDisplay.get (iC))) continue;
var nA = this.normixes[iA];
var nB = this.normixes[iB];
var nC = this.normixes[iC];
var check = this.checkNormals (nA, nB, nC);
if (fill && check == 0) continue;
var colixA;
var colixB;
var colixC;
if (colorSolid) {
if (colorArrayed && i < this.imesh.polygonColixes.length) {
var c = this.imesh.polygonColixes[i];
if (c == 0) continue;
colix = c;
}colixA = colixB = colixC = colix;
} else {
colixA = vertexColixes[iA];
colixB = vertexColixes[iB];
colixC = vertexColixes[iC];
if (this.isBicolorMap) {
if (colixA != colixB || colixB != colixC) continue;
if (this.haveBsSlabGhost) colixA = colixB = colixC = org.jmol.util.Colix.copyColixTranslucency (this.imesh.slabColix, colixA);
}}if (diam == -2147483648) {
if (this.imesh.diameter <= 0) {
diam = this.viewer.getMeshScale ();
} else {
diam = Clazz.doubleToInt (this.viewer.getScreenDim () / 100);
}if (diam < 1) diam = 1;
}if (fill) {
if (generateSet) {
this.bsPolygons.set (i);
continue;
}if (iB == iC) {
this.setColix (colixA);
if (iA == iB) this.g3d.fillSphereI (diam, this.screens[iA]);
 else this.g3d.fillCylinder (3, diam, this.screens[iA], this.screens[iB]);
} else if (iShowTriangles) {
this.g3d.fillTriangle (this.screens[iA], colixA, nA, this.screens[iB], colixB, nB, this.screens[iC], colixC, nC, 0.1);
} else {
this.g3d.fillTriangle3CN (this.screens[iA], colixA, nA, this.screens[iB], colixB, nB, this.screens[iC], colixC, nC);
}if (this.iShowNormals) this.renderNormals ();
} else {
check &= polygon[3];
if (iShowTriangles) check = 7;
if (check == 0) continue;
this.pt1i.setT (this.screens[iA]);
this.pt2i.setT (this.screens[iB]);
this.pt3i.setT (this.screens[iC]);
this.pt1i.z -= 2;
this.pt2i.z -= 2;
this.pt3i.z -= 2;
if (noColor) {
} else if (colorArrayed) {
this.g3d.setColix (this.mesh.fillTriangles ? 4 : contourColixes[polygon[4] % contourColixes.length]);
} else {
this.drawTriangle (this.pt1i, colixA, this.pt2i, colixB, this.pt3i, colixC, check, diam);
continue;
}this.drawTriangle (this.pt1i, colix, this.pt2i, colix, this.pt3i, colix, check, diam);
}}
if (generateSet) this.exportSurface (colorSolid ? colix : 0);
}, "~B,~B,~B");
Clazz.defineMethod (c$, "renderNormals", 
($fz = function () {
if (!this.g3d.setColix (8)) return;
this.g3d.setFontFid (this.g3d.getFontFidFS ("Monospaced", 24));
var vertexVectors = org.jmol.util.Normix.getVertexVectors ();
for (var i = this.vertexCount; --i >= 0; ) {
if (this.vertexValues != null && Float.isNaN (this.vertexValues[i])) continue;
if (i > 100) continue;
this.ptTemp.setT (this.vertices[i]);
var n = this.mesh.normixes[i];
if (n >= 0) {
this.ptTemp.add (vertexVectors[n]);
this.viewer.transformPtScr (this.ptTemp, this.ptTempi);
this.g3d.drawLineAB (this.screens[i], this.ptTempi);
}}
}, $fz.isPrivate = true, $fz));
});
