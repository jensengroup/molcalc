Clazz.declarePackage ("org.jmol.shapesurface");
Clazz.load (["org.jmol.shapesurface.Isosurface"], "org.jmol.shapesurface.MolecularOrbital", ["java.lang.Boolean", "$.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.constant.EnumQuantumShell", "org.jmol.jvxl.data.JvxlCoder", "org.jmol.util.ArrayUtil", "$.Escape", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.moTranslucency = null;
this.moTranslucentLevel = null;
this.moPlane = null;
this.moCutoff = null;
this.moResolution = null;
this.moScale = null;
this.moColorPos = null;
this.moColorNeg = null;
this.moMonteCarloCount = null;
this.moIsPositiveOnly = false;
this.moSquareData = null;
this.moSquareLinear = null;
this.moRandomSeed = null;
this.moFill = 1073742046;
this.moMesh = 1073742018;
this.moDots = 1073742042;
this.moFrontOnly = 1073741960;
this.moTitleFormat = null;
this.moDebug = false;
this.myColorPt = 0;
this.strID = null;
this.$moNumber = 0;
this.$moLinearCombination = null;
this.htModels = null;
this.thisModel = null;
this.moSlab = null;
this.moSlabValue = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shapesurface, "MolecularOrbital", org.jmol.shapesurface.Isosurface);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "initShape", []);
this.myType = "mo";
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["thisID", "mo", null]);
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bs) {
if ("init" === propertyName) {
this.myColorPt = 0;
this.moDebug = false;
var modelIndex = (value).intValue ();
this.strID = this.getId (modelIndex);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["init", null, null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["modelIndex", Integer.$valueOf (modelIndex), null]);
if (this.htModels == null) this.htModels =  new java.util.Hashtable ();
if (!this.htModels.containsKey (this.strID)) this.htModels.put (this.strID,  new java.util.Hashtable ());
this.thisModel = this.htModels.get (this.strID);
this.$moNumber = (!this.thisModel.containsKey ("moNumber") ? 0 : (this.thisModel.get ("moNumber")).intValue ());
this.$moLinearCombination = this.thisModel.get ("moLinearCombination");
this.moSquareData = this.moSquareLinear = null;
return;
}if ("slab" === propertyName) {
if (Clazz.instanceOf (value, Integer)) {
this.thisModel.put ("slabValue", value);
} else {
var slabInfo = value;
var tok = (slabInfo[0]).intValue ();
this.moSlab = this.thisModel.get ("slab");
if (this.moSlab == null) this.thisModel.put ("slab", this.moSlab =  new java.util.ArrayList ());
if (tok == 1048587) {
this.moSlab = null;
this.thisModel.remove ("slab");
return;
}this.moSlab.add (value);
}return;
}if ("cutoff" === propertyName) {
this.thisModel.put ("moCutoff", value);
this.thisModel.put ("moIsPositiveOnly", Boolean.FALSE);
return;
}if ("scale" === propertyName) {
this.thisModel.put ("moScale", value);
return;
}if ("squareData" === propertyName) {
this.thisModel.put ("moSquareData", Boolean.TRUE);
this.moSquareData = Boolean.TRUE;
return;
}if ("squareLinear" === propertyName) {
this.thisModel.put ("moSquareLinear", Boolean.TRUE);
this.moSquareLinear = Boolean.TRUE;
return;
}if ("cutoffPositive" === propertyName) {
this.thisModel.put ("moCutoff", value);
this.thisModel.put ("moIsPositiveOnly", Boolean.TRUE);
return;
}if ("resolution" === propertyName) {
this.thisModel.put ("moResolution", value);
return;
}if ("titleFormat" === propertyName) {
this.moTitleFormat = value;
return;
}if ("color" === propertyName) {
if (!(Clazz.instanceOf (value, Integer))) return;
this.thisModel.remove ("moTranslucency");
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["color", value, bs]);
propertyName = "colorRGB";
this.myColorPt = 0;
}if ("colorRGB" === propertyName) {
this.moColorPos = value;
if (this.myColorPt++ == 0) this.moColorNeg = this.moColorPos;
this.thisModel.put ("moColorNeg", this.moColorNeg);
this.thisModel.put ("moColorPos", this.moColorPos);
return;
}if ("plane" === propertyName) {
if (value == null) this.thisModel.remove ("moPlane");
 else this.thisModel.put ("moPlane", value);
return;
}if ("monteCarloCount" === propertyName) {
this.thisModel.put ("monteCarloCount", value);
return;
}if ("randomSeed" === propertyName) {
if (value == null) this.thisModel.remove ("randomSeed");
 else this.thisModel.put ("randomSeed", value);
return;
}if ("molecularOrbital" === propertyName) {
if (Clazz.instanceOf (value, Integer)) {
this.$moNumber = (value).intValue ();
this.thisModel.put ("moNumber", value);
this.thisModel.remove ("moLinearCombination");
this.$moLinearCombination = null;
} else {
this.$moNumber = 0;
this.$moLinearCombination = value;
this.thisModel.put ("moNumber", Integer.$valueOf (0));
this.thisModel.put ("moLinearCombination", this.$moLinearCombination);
}if (this.moSquareData === Boolean.TRUE) this.thisModel.put ("moSquareData", Boolean.TRUE);
 else this.thisModel.remove ("moSquareData");
if (this.moSquareLinear === Boolean.TRUE) this.thisModel.put ("moSquareLinear", Boolean.TRUE);
 else this.thisModel.remove ("moSquareLinear");
this.setOrbital (this.$moNumber, this.$moLinearCombination);
return;
}if ("translucentLevel" === propertyName) {
if (this.thisModel == null) {
if (this.currentMesh == null) return;
this.thisModel = this.htModels.get (this.currentMesh.thisID);
}this.thisModel.put ("moTranslucentLevel", value);
}if ("delete" === propertyName) {
this.htModels.remove (this.strID);
this.$moNumber = 0;
this.$moLinearCombination = null;
}if ("token" === propertyName) {
var tok = (value).intValue ();
switch (tok) {
case 1113198595:
case 1073742042:
this.moDots = tok;
break;
case 1073741938:
case 1073742046:
this.moFill = tok;
break;
case 1073742018:
case 1073742052:
this.moMesh = tok;
break;
case 1073741960:
case 1073742058:
this.moFrontOnly = tok;
break;
}
}if ("translucency" === propertyName) {
if (this.thisModel == null) {
if (this.currentMesh == null) return;
this.thisModel = this.htModels.get (this.currentMesh.thisID);
}this.thisModel.put ("moTranslucency", value);
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var htModelsNew =  new java.util.Hashtable ();
for (var i = this.meshCount; --i >= 0; ) {
if (this.meshes[i] == null) continue;
if (this.meshes[i].modelIndex == modelIndex) {
this.meshCount--;
if (this.meshes[i] === this.currentMesh) {
this.currentMesh = null;
this.thisModel = null;
}this.meshes = org.jmol.util.ArrayUtil.deleteElements (this.meshes, i, 1);
continue;
}var htModel = this.htModels.get (this.meshes[i].thisID);
if (this.meshes[i].modelIndex > modelIndex) {
this.meshes[i].modelIndex--;
this.meshes[i].thisID = this.getId (this.meshes[i].modelIndex);
}htModelsNew.put (this.meshes[i].thisID, htModel);
}
this.htModels = htModelsNew;
return;
}Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", [propertyName, value, bs]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getId", 
($fz = function (modelIndex) {
return "mo_model" + this.viewer.getModelNumberDotted (modelIndex);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getProperty", 
function (propertyName, param) {
if (propertyName.equals ("list")) {
var s = Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "getProperty", ["list", param]);
if (s.length > 1) s += "cutoff = " + Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "getProperty", ["cutoff", 0]) + "\n";
return this.viewer.getMoInfo (-1) + "\n" + s;
}if (propertyName === "moNumber") return Integer.$valueOf (this.$moNumber);
if (propertyName === "moLinearCombination") return this.$moLinearCombination;
if (propertyName === "showMO") {
var str =  new org.jmol.util.StringXBuilder ();
var mos = (this.sg.getMoData ().get ("mos"));
var nOrb = (mos == null ? 0 : mos.size ());
var thisMO = param;
var currentMO = this.$moNumber;
var isShowCurrent = (thisMO == -2147483648);
if (thisMO == 2147483647) {
thisMO = currentMO;
}if (nOrb == 0 || isShowCurrent && currentMO == 0) return "";
var doOneMo = (thisMO != 0);
if (currentMO == 0) thisMO = 0;
var haveHeader = false;
var nTotal = (thisMO > 0 ? 1 : nOrb);
var i0 = (nTotal == 1 && currentMO > 0 ? currentMO : 1);
for (var i = i0; i <= nOrb; i++) if (thisMO == 0 || thisMO == i || !doOneMo && i == currentMO) {
if (!doOneMo) {
var params = this.sg.getParams ();
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["init", params, null]);
this.setOrbital (i, null);
}this.jvxlData.moleculeXml = this.viewer.getModelCml (this.viewer.getModelUndeletedAtomsBitSet (this.thisMesh.modelIndex), 100, true);
if (!haveHeader) {
str.append (org.jmol.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, null, null, "HEADERONLY", true, nTotal, null, null));
haveHeader = true;
}str.append (org.jmol.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, null, this.jvxlData.title, null, false, 1, this.thisMesh.getState ("mo"), (this.thisMesh.scriptCommand == null ? "" : this.thisMesh.scriptCommand)));
if (!doOneMo) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["delete", "mo_show", null]);
if (nTotal == 1) break;
}
str.append (org.jmol.jvxl.data.JvxlCoder.jvxlGetFile (this.jvxlData, null, null, "TRAILERONLY", true, 0, null, null));
return str.toString ();
}return Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "getProperty", [propertyName, param]);
}, "~S,~N");
Clazz.overrideMethod (c$, "clearSg", 
function () {
});
Clazz.defineMethod (c$, "getSettings", 
($fz = function (strID) {
this.thisModel = this.htModels.get (strID);
if (this.thisModel == null || this.thisModel.get ("moNumber") == null) return false;
this.moTranslucency = this.thisModel.get ("moTranslucency");
this.moTranslucentLevel = this.thisModel.get ("moTranslucentLevel");
this.moPlane = this.thisModel.get ("moPlane");
this.moCutoff = this.thisModel.get ("moCutoff");
if (this.moCutoff == null) this.moCutoff = this.sg.getMoData ().get ("defaultCutoff");
if (this.moCutoff == null) {
this.moCutoff =  new Float (0.05);
}this.thisModel.put ("moCutoff",  new Float (this.moCutoff.floatValue ()));
this.moResolution = this.thisModel.get ("moResolution");
this.moScale = this.thisModel.get ("moScale");
this.moColorPos = this.thisModel.get ("moColorPos");
this.moColorNeg = this.thisModel.get ("moColorNeg");
this.moSquareData = this.thisModel.get ("moSquareData");
this.moSquareLinear = this.thisModel.get ("moSquareLinear");
this.moMonteCarloCount = this.thisModel.get ("monteCarloCount");
this.moRandomSeed = this.thisModel.get ("randomSeed");
this.moSlabValue = this.thisModel.get ("slabValue");
this.moSlab = this.thisModel.get ("slab");
if (this.moRandomSeed == null) this.thisModel.put ("randomSeed", this.moRandomSeed = Integer.$valueOf ((-System.currentTimeMillis ()) % 10000));
this.$moNumber = (this.thisModel.get ("moNumber")).intValue ();
this.$moLinearCombination = this.thisModel.get ("moLinearCombination");
var b = this.thisModel.get ("moIsPositiveOnly");
this.moIsPositiveOnly = (b != null && ((b)).booleanValue ());
return true;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "setOrbital", 
($fz = function (moNumber, linearCombination) {
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["reset", this.strID, null]);
if (this.moDebug) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["debug", Boolean.TRUE, null]);
this.getSettings (this.strID);
if (this.moScale != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["scale", this.moScale, null]);
if (this.moResolution != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["resolution", this.moResolution, null]);
if (this.moPlane != null) {
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["plane", this.moPlane, null]);
if (this.moCutoff != null) {
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["red",  new Float (-this.moCutoff.floatValue ()), null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["blue", this.moCutoff, null]);
}} else {
if (this.moCutoff != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", [(this.moIsPositiveOnly ? "cutoffPositive" : "cutoff"), this.moCutoff, null]);
if (this.moColorNeg != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["colorRGB", this.moColorNeg, null]);
if (this.moColorPos != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["colorRGB", this.moColorPos, null]);
if (this.moMonteCarloCount != null) {
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["randomSeed", this.moRandomSeed, null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["monteCarloCount", this.moMonteCarloCount, null]);
}}Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["squareData", this.moSquareData, null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["squareLinear", this.moSquareLinear, null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["title", this.moTitleFormat, null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["fileName", this.viewer.getFileName (), null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["molecularOrbital", linearCombination == null ? Integer.$valueOf (moNumber) : linearCombination, null]);
if (this.moPlane != null && this.moColorNeg != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["colorRGB", this.moColorNeg, null]);
if (this.moPlane != null && this.moColorPos != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["colorRGB", this.moColorPos, null]);
this.currentMesh.isColorSolid = false;
if (this.moSlabValue != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["slab", this.moSlabValue, null]);
if (this.moSlab != null) for (var i = 0; i < this.moSlab.size (); i++) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["slab", this.moSlab.get (i), null]);

if (this.moTranslucentLevel != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["translucenctLevel", this.moTranslucentLevel, null]);
if (this.moTranslucency != null) Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["translucency", this.moTranslucency, null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["token", Integer.$valueOf (this.moFill), null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["token", Integer.$valueOf (this.moMesh), null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["token", Integer.$valueOf (this.moDots), null]);
Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "setProperty", ["token", Integer.$valueOf (this.moFrontOnly), null]);
this.thisModel.put ("mesh", this.currentMesh);
return;
}, $fz.isPrivate = true, $fz), "~N,~A");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
if (this.htModels == null) return "";
var s =  new org.jmol.util.StringXBuilder ();
var modelCount = this.viewer.getModelCount ();
for (var i = 0; i < modelCount; i++) s.append (this.getMoState (i));

return s.toString ();
});
Clazz.defineMethod (c$, "getMoState", 
($fz = function (modelIndex) {
this.strID = this.getId (modelIndex);
if (!this.getSettings (this.strID)) return "";
var s =  new org.jmol.util.StringXBuilder ();
var modelCount = this.viewer.getModelCount ();
if (modelCount > 1) org.jmol.shape.Shape.appendCmd (s, "frame " + this.viewer.getModelNumberDotted (modelIndex));
if (this.moCutoff != null) org.jmol.shape.Shape.appendCmd (s, "mo cutoff " + (this.sg.getIsPositiveOnly () ? "+" : "") + this.moCutoff);
if (this.moScale != null) org.jmol.shape.Shape.appendCmd (s, "mo scale " + this.moScale);
if (this.moMonteCarloCount != null) org.jmol.shape.Shape.appendCmd (s, "mo points " + this.moMonteCarloCount + " " + this.moRandomSeed);
if (this.moResolution != null) org.jmol.shape.Shape.appendCmd (s, "mo resolution " + this.moResolution);
if (this.moPlane != null) org.jmol.shape.Shape.appendCmd (s, "mo plane {" + this.moPlane.x + " " + this.moPlane.y + " " + this.moPlane.z + " " + this.moPlane.w + "}");
if (this.moTitleFormat != null) org.jmol.shape.Shape.appendCmd (s, "mo titleFormat " + org.jmol.util.Escape.escapeStr (this.moTitleFormat));
if (this.moColorNeg != null) org.jmol.shape.Shape.appendCmd (s, "mo color " + org.jmol.util.Escape.escapeColor (this.moColorNeg.intValue ()) + (this.moColorNeg.equals (this.moColorPos) ? "" : " " + org.jmol.util.Escape.escapeColor (this.moColorPos.intValue ())));
if (this.moSlab != null) {
if (this.thisMesh.slabOptions != null) org.jmol.shape.Shape.appendCmd (s, this.thisMesh.slabOptions.toString ());
if (this.thisMesh.jvxlData.slabValue != -2147483648) org.jmol.shape.Shape.appendCmd (s, "mo slab " + this.thisMesh.jvxlData.slabValue);
}if (this.$moLinearCombination == null) {
org.jmol.shape.Shape.appendCmd (s, "mo " + (this.moSquareData === Boolean.TRUE ? "squared " : "") + this.$moNumber);
} else {
org.jmol.shape.Shape.appendCmd (s, "mo " + org.jmol.constant.EnumQuantumShell.getMOString (this.$moLinearCombination) + (this.moSquareLinear === Boolean.TRUE ? " squared" : ""));
}if (this.moTranslucency != null) org.jmol.shape.Shape.appendCmd (s, "mo translucent " + this.moTranslucentLevel);
org.jmol.shape.Shape.appendCmd (s, (this.thisModel.get ("mesh")).getState ("mo"));
return s.toString ();
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "merge", 
function (shape) {
var mo = shape;
this.moColorNeg = mo.moColorNeg;
this.moColorPos = mo.moColorPos;
this.moCutoff = mo.moCutoff;
this.moPlane = mo.moPlane;
this.moResolution = mo.moResolution;
this.moScale = mo.moScale;
this.moSlab = mo.moSlab;
this.moSlabValue = mo.moSlabValue;
this.moTitleFormat = mo.moTitleFormat;
this.moTranslucency = mo.moTranslucency;
if (this.htModels == null) this.htModels =  new java.util.Hashtable ();
var ht = mo.htModels;
if (ht != null) {
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
this.htModels.put (key, entry.getValue ());
}
}Clazz.superCall (this, org.jmol.shapesurface.MolecularOrbital, "merge", [shape]);
}, "org.jmol.shape.Shape");
});
