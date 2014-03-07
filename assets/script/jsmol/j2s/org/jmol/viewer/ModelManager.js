Clazz.declarePackage ("org.jmol.viewer");
Clazz.load (null, "org.jmol.viewer.ModelManager", ["org.jmol.modelset.ModelLoader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.modelSet = null;
this.fullPathName = null;
this.fileName = null;
Clazz.instantialize (this, arguments);
}, org.jmol.viewer, "ModelManager");
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
}, "org.jmol.viewer.Viewer");
Clazz.defineMethod (c$, "zap", 
function () {
this.fullPathName = this.fileName = null;
return (this.modelSet = ( new org.jmol.modelset.ModelLoader (this.viewer, this.viewer.getZapName (), null, null, null, null)).getModelSet ());
});
Clazz.defineMethod (c$, "getModelSetFileName", 
function () {
return (this.fileName != null ? this.fileName : this.viewer.getZapName ());
});
Clazz.defineMethod (c$, "getModelSetPathName", 
function () {
return this.fullPathName;
});
Clazz.defineMethod (c$, "createModelSet", 
function (fullPathName, fileName, loadScript, atomSetCollection, bsNew, isAppend) {
var modelSetName = null;
if (isAppend) {
modelSetName = this.modelSet.getModelSetName ();
if (modelSetName.equals ("zapped")) modelSetName = null;
 else if (modelSetName.indexOf (" (modified)") < 0) modelSetName += " (modified)";
} else if (atomSetCollection == null) {
return this.zap ();
} else {
this.fullPathName = fullPathName;
this.fileName = fileName;
}if (atomSetCollection != null) {
if (modelSetName == null) {
modelSetName = this.viewer.getModelAdapter ().getAtomSetCollectionName (atomSetCollection);
if (modelSetName != null) {
modelSetName = modelSetName.trim ();
if (modelSetName.length == 0) modelSetName = null;
}if (modelSetName == null) modelSetName = org.jmol.viewer.ModelManager.reduceFilename (fileName);
}this.modelSet = ( new org.jmol.modelset.ModelLoader (this.viewer, modelSetName, loadScript, atomSetCollection, (isAppend ? this.modelSet : null), bsNew)).getModelSet ();
}if (this.modelSet.getAtomCount () == 0) this.zap ();
return this.modelSet;
}, "~S,~S,org.jmol.util.StringXBuilder,~O,org.jmol.util.BitSet,~B");
c$.reduceFilename = Clazz.defineMethod (c$, "reduceFilename", 
($fz = function (fileName) {
if (fileName == null) return null;
var ichDot = fileName.indexOf ('.');
if (ichDot > 0) fileName = fileName.substring (0, ichDot);
if (fileName.length > 24) fileName = fileName.substring (0, 20) + " ...";
return fileName;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "createAtomDataSet", 
function (atomSetCollection, tokType) {
org.jmol.modelset.ModelLoader.createAtomDataSet (this.viewer, this.modelSet, tokType, atomSetCollection, this.viewer.getSelectionSet (false));
}, "~O,~N");
});
