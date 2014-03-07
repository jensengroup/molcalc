Clazz.declarePackage ("org.jmol.io2");
Clazz.load (["org.jmol.api.JmolFilesReaderInterface"], "org.jmol.io2.FilesReader", ["org.jmol.api.Interface", "org.jmol.io.JmolBinary", "org.jmol.util.Logger", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fm = null;
this.viewer = null;
this.fullPathNamesIn = null;
this.namesAsGivenIn = null;
this.fileTypesIn = null;
this.atomSetCollection = null;
this.dataReaders = null;
this.htParams = null;
this.isAppend = false;
Clazz.instantialize (this, arguments);
}, org.jmol.io2, "FilesReader", null, org.jmol.api.JmolFilesReaderInterface);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (fileManager, viewer, name, nameAsGiven, types, readers, htParams, isAppend) {
this.fm = fileManager;
this.viewer = viewer;
this.fullPathNamesIn = name;
this.namesAsGivenIn = nameAsGiven;
this.fileTypesIn = types;
this.dataReaders = readers;
this.htParams = htParams;
this.isAppend = isAppend;
}, "org.jmol.viewer.FileManager,org.jmol.viewer.Viewer,~A,~A,~A,~A,java.util.Map,~B");
Clazz.overrideMethod (c$, "run", 
function () {
if (!this.isAppend && this.viewer.displayLoadErrors) this.viewer.zap (false, true, false);
var getReadersOnly = !this.viewer.displayLoadErrors;
this.atomSetCollection = this.viewer.getModelAdapter ().getAtomSetCollectionReaders (this, this.fullPathNamesIn, this.fileTypesIn, this.htParams, getReadersOnly);
this.dataReaders = null;
if (getReadersOnly && !(Clazz.instanceOf (this.atomSetCollection, String))) {
this.atomSetCollection = this.viewer.getModelAdapter ().getAtomSetCollectionFromSet (this.atomSetCollection, null, this.htParams);
}if (Clazz.instanceOf (this.atomSetCollection, String)) {
org.jmol.util.Logger.error ("file ERROR: " + this.atomSetCollection);
return;
}if (!this.isAppend && !this.viewer.displayLoadErrors) this.viewer.zap (false, true, false);
this.fm.fullPathName = this.fm.fileName = this.fm.nameAsGiven = (this.dataReaders == null ? "file[]" : "String[]");
});
Clazz.overrideMethod (c$, "getBufferedReaderOrBinaryDocument", 
function (i, isBinary) {
if (this.dataReaders != null) return (isBinary ? null : this.dataReaders[i].getBufferedReader ());
var name = this.fullPathNamesIn[i];
var subFileList = null;
this.htParams.remove ("subFileList");
if (name.indexOf ("|") >= 0) {
subFileList = org.jmol.util.TextFormat.splitChars (name, "|");
name = subFileList[0];
}var t = this.fm.getUnzippedBufferedReaderOrErrorMessageFromName (name, null, true, isBinary, false, true);
if (Clazz.instanceOf (t, java.util.zip.ZipInputStream)) {
if (subFileList != null) this.htParams.put ("subFileList", subFileList);
var zipDirectory = this.fm.getZipDirectory (name, true);
t = this.fm.getBufferedInputStreamOrErrorMessageFromName (name, this.fullPathNamesIn[i], false, false, null, false);
t = org.jmol.io.JmolBinary.getAtomSetCollectionOrBufferedReaderFromZip (this.viewer.getModelAdapter (), t, name, zipDirectory, this.htParams, true, isBinary);
}if (Clazz.instanceOf (t, java.io.BufferedInputStream)) {
var jd = org.jmol.api.Interface.getOptionInterface ("io2.BinaryDocument");
jd.setStream (t, true);
return jd;
}if (Clazz.instanceOf (t, java.io.BufferedReader) || Clazz.instanceOf (t, org.jmol.api.JmolDocument)) {
return t;
}return (t == null ? "error opening:" + this.namesAsGivenIn[i] : t);
}, "~N,~B");
Clazz.overrideMethod (c$, "getAtomSetCollection", 
function () {
return this.atomSetCollection;
});
});
