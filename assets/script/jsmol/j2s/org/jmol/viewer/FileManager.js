Clazz.declarePackage ("org.jmol.viewer");
Clazz.load (["java.util.Hashtable"], "org.jmol.viewer.FileManager", ["java.io.BufferedInputStream", "$.ByteArrayInputStream", "java.net.URL", "$.URLEncoder", "java.util.ArrayList", "org.jmol.api.Interface", "org.jmol.io.Base64", "$.FileReader", "$.JmolBinary", "org.jmol.util.Escape", "$.Logger", "$.StringXBuilder", "$.TextFormat", "org.jmol.viewer.DataManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.pathForAllFiles = "";
this.nameAsGiven = "zapped";
this.fullPathName = null;
this.fileName = null;
this.appletDocumentBaseURL = null;
this.appletProxy = null;
this.pngjCache = null;
this.spardirCache = null;
this.cache = null;
Clazz.instantialize (this, arguments);
}, org.jmol.viewer, "FileManager");
Clazz.prepareFields (c$, function () {
this.cache =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
this.clear ();
}, "org.jmol.viewer.Viewer");
Clazz.defineMethod (c$, "clear", 
function () {
this.fullPathName = this.fileName = this.nameAsGiven = this.viewer.getZapName ();
this.spardirCache = null;
});
Clazz.defineMethod (c$, "setLoadState", 
($fz = function (htParams) {
if (this.viewer.getPreserveState ()) {
htParams.put ("loadState", this.viewer.getLoadState (htParams));
}}, $fz.isPrivate = true, $fz), "java.util.Map");
Clazz.defineMethod (c$, "getPathForAllFiles", 
function () {
return this.pathForAllFiles;
});
Clazz.defineMethod (c$, "setPathForAllFiles", 
function (value) {
if (value.length > 0 && !value.endsWith ("/") && !value.endsWith ("|")) value += "/";
return this.pathForAllFiles = value;
}, "~S");
Clazz.defineMethod (c$, "setFileInfo", 
function (fileInfo) {
this.fullPathName = fileInfo[0];
this.fileName = fileInfo[1];
this.nameAsGiven = fileInfo[2];
}, "~A");
Clazz.defineMethod (c$, "getFileInfo", 
function () {
return [this.fullPathName, this.fileName, this.nameAsGiven];
});
Clazz.defineMethod (c$, "getFullPathName", 
function () {
return this.fullPathName != null ? this.fullPathName : this.nameAsGiven;
});
Clazz.defineMethod (c$, "getFileName", 
function () {
return this.fileName != null ? this.fileName : this.nameAsGiven;
});
Clazz.defineMethod (c$, "getAppletDocumentBase", 
function () {
return (this.appletDocumentBaseURL == null ? "" : this.appletDocumentBaseURL.toString ());
});
Clazz.defineMethod (c$, "setAppletContext", 
function (documentBase) {
try {
this.appletDocumentBaseURL = (documentBase.length == 0 ? null :  new java.net.URL (Clazz.castNullAs ("java.net.URL"), documentBase, null));
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "setAppletProxy", 
function (appletProxy) {
this.appletProxy = (appletProxy == null || appletProxy.length == 0 ? null : appletProxy);
}, "~S");
Clazz.defineMethod (c$, "getState", 
function (sfunc) {
var commands =  new org.jmol.util.StringXBuilder ();
if (sfunc != null) {
sfunc.append ("  _setFileState;\n");
commands.append ("function _setFileState() {\n\n");
}if (commands.indexOf ("append") < 0 && this.viewer.getModelSetFileName ().equals ("zapped")) commands.append ("  zap;\n");
this.viewer.appendLoadStates (commands);
if (sfunc != null) commands.append ("\n}\n\n");
return commands.toString ();
}, "org.jmol.util.StringXBuilder");
Clazz.defineMethod (c$, "getFileTypeName", 
function (fileName) {
var pt = fileName.indexOf ("::");
if (pt >= 0) return fileName.substring (0, pt);
if (fileName.startsWith ("=")) return "pdb";
var br = this.getUnzippedBufferedReaderOrErrorMessageFromName (fileName, null, true, false, true, true);
if (Clazz.instanceOf (br, java.io.BufferedReader)) return this.viewer.getModelAdapter ().getFileTypeName (br);
if (Clazz.instanceOf (br, org.jmol.api.ZInputStream)) {
var zipDirectory = this.getZipDirectoryAsString (fileName);
if (zipDirectory.indexOf ("JmolManifest") >= 0) return "Jmol";
return this.viewer.getModelAdapter ().getFileTypeName (org.jmol.io.JmolBinary.getBufferedReaderForString (zipDirectory));
}if (org.jmol.util.Escape.isAS (br)) {
return (br)[0];
}return null;
}, "~S");
Clazz.defineMethod (c$, "getZipDirectoryAsString", 
($fz = function (fileName) {
var t = this.getBufferedInputStreamOrErrorMessageFromName (fileName, fileName, false, false, null, false);
return org.jmol.io.JmolBinary.getZipDirectoryAsStringAndClose (t);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "createAtomSetCollectionFromFile", 
function (name, htParams, isAppend) {
if (htParams.get ("atomDataOnly") == null) {
this.setLoadState (htParams);
}name = this.viewer.resolveDatabaseFormat (name);
var pt = name.indexOf ("::");
var nameAsGiven = (pt >= 0 ? name.substring (pt + 2) : name);
var fileType = (pt >= 0 ? name.substring (0, pt) : null);
org.jmol.util.Logger.info ("\nFileManager.getAtomSetCollectionFromFile(" + nameAsGiven + ")" + (name.equals (nameAsGiven) ? "" : " //" + name));
var names = this.classifyName (nameAsGiven, true);
if (names.length == 1) return names[0];
var fullPathName = names[0];
var fileName = names[1];
htParams.put ("fullPathName", (fileType == null ? "" : fileType + "::") + fullPathName.$replace ('\\', '/'));
if (this.viewer.getMessageStyleChime () && this.viewer.getDebugScript ()) this.viewer.scriptStatus ("Requesting " + fullPathName);
var fileReader =  new org.jmol.io.FileReader (this, this.viewer, fileName, fullPathName, nameAsGiven, fileType, null, htParams, isAppend);
fileReader.run ();
return fileReader.getAtomSetCollection ();
}, "~S,java.util.Map,~B");
Clazz.defineMethod (c$, "createAtomSetCollectionFromFiles", 
function (fileNames, htParams, isAppend) {
this.setLoadState (htParams);
var fullPathNames =  new Array (fileNames.length);
var namesAsGiven =  new Array (fileNames.length);
var fileTypes =  new Array (fileNames.length);
for (var i = 0; i < fileNames.length; i++) {
var pt = fileNames[i].indexOf ("::");
var nameAsGiven = (pt >= 0 ? fileNames[i].substring (pt + 2) : fileNames[i]);
var fileType = (pt >= 0 ? fileNames[i].substring (0, pt) : null);
var names = this.classifyName (nameAsGiven, true);
if (names.length == 1) return names[0];
fullPathNames[i] = names[0];
fileNames[i] = names[0].$replace ('\\', '/');
fileTypes[i] = fileType;
namesAsGiven[i] = nameAsGiven;
}
htParams.put ("fullPathNames", fullPathNames);
htParams.put ("fileTypes", fileTypes);
var filesReader = this.newFilesReader (fullPathNames, namesAsGiven, fileTypes, null, htParams, isAppend);
filesReader.run ();
return filesReader.getAtomSetCollection ();
}, "~A,java.util.Map,~B");
Clazz.defineMethod (c$, "createAtomSetCollectionFromString", 
function (strModel, loadScript, htParams, isAppend, isLoadVariable) {
if (!isLoadVariable) org.jmol.viewer.DataManager.getInlineData (loadScript, strModel, isAppend, this.viewer.getDefaultLoadFilter ());
this.setLoadState (htParams);
var isAddH = (strModel.indexOf ("Viewer.AddHydrogens") >= 0);
var fnames = (isAddH ? this.getFileInfo () : null);
var fileReader =  new org.jmol.io.FileReader (this, this.viewer, "string", "string", "string", null, org.jmol.io.JmolBinary.getBufferedReaderForString (strModel), htParams, isAppend);
fileReader.run ();
if (fnames != null) this.setFileInfo (fnames);
if (!isAppend && !(Clazz.instanceOf (fileReader.getAtomSetCollection (), String))) {
this.viewer.zap (false, true, false);
this.fullPathName = this.fileName = (strModel === "1 0 C 0 0" ? "Jmol Model Kit" : "string");
}return fileReader.getAtomSetCollection ();
}, "~S,org.jmol.util.StringXBuilder,java.util.Map,~B,~B");
Clazz.defineMethod (c$, "createAtomSeCollectionFromStrings", 
function (arrayModels, loadScript, htParams, isAppend) {
if (!htParams.containsKey ("isData")) {
var oldSep = "\"" + this.viewer.getDataSeparator () + "\"";
var tag = "\"" + (isAppend ? "append" : "model") + " inline\"";
var sb =  new org.jmol.util.StringXBuilder ();
sb.append ("set dataSeparator \"~~~next file~~~\";\ndata ").append (tag);
for (var i = 0; i < arrayModels.length; i++) {
if (i > 0) sb.append ("~~~next file~~~");
sb.append (arrayModels[i]);
}
sb.append ("end ").append (tag).append (";set dataSeparator ").append (oldSep);
loadScript.appendSB (sb);
}this.setLoadState (htParams);
org.jmol.util.Logger.info ("FileManager.getAtomSetCollectionFromStrings(string[])");
var fullPathNames =  new Array (arrayModels.length);
var readers =  new Array (arrayModels.length);
for (var i = 0; i < arrayModels.length; i++) {
fullPathNames[i] = "string[" + i + "]";
readers[i] = this.newDataReader (arrayModels[i]);
}
var filesReader = this.newFilesReader (fullPathNames, fullPathNames, null, readers, htParams, isAppend);
filesReader.run ();
return filesReader.getAtomSetCollection ();
}, "~A,org.jmol.util.StringXBuilder,java.util.Map,~B");
Clazz.defineMethod (c$, "createAtomSeCollectionFromArrayData", 
function (arrayData, htParams, isAppend) {
org.jmol.util.Logger.info ("FileManager.getAtomSetCollectionFromArrayData(Vector)");
var nModels = arrayData.size ();
var fullPathNames =  new Array (nModels);
var readers =  new Array (nModels);
for (var i = 0; i < nModels; i++) {
fullPathNames[i] = "String[" + i + "]";
readers[i] = this.newDataReader (arrayData.get (i));
}
var filesReader = this.newFilesReader (fullPathNames, fullPathNames, null, readers, htParams, isAppend);
filesReader.run ();
return filesReader.getAtomSetCollection ();
}, "java.util.List,java.util.Map,~B");
Clazz.defineMethod (c$, "newFilesReader", 
($fz = function (fullPathNames, namesAsGiven, fileTypes, readers, htParams, isAppend) {
var fr = org.jmol.api.Interface.getOptionInterface ("io2.FilesReader");
fr.set (this, this.viewer, fullPathNames, namesAsGiven, fileTypes, readers, htParams, isAppend);
return fr;
}, $fz.isPrivate = true, $fz), "~A,~A,~A,~A,java.util.Map,~B");
Clazz.defineMethod (c$, "newDataReader", 
($fz = function (data) {
var reader = (Clazz.instanceOf (data, String) ? "String" : org.jmol.util.Escape.isAS (data) ? "Array" : Clazz.instanceOf (data, java.util.List) ? "List" : null);
if (reader == null) return null;
var dr = org.jmol.api.Interface.getOptionInterface ("io2." + reader + "DataReader");
return dr.setData (data);
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "createAtomSetCollectionFromDOM", 
function (DOMNode, htParams) {
var aDOMReader = org.jmol.api.Interface.getOptionInterface ("io2.DOMReadaer");
aDOMReader.set (this, this.viewer, DOMNode, htParams);
aDOMReader.run ();
return aDOMReader.getAtomSetCollection ();
}, "~O,java.util.Map");
Clazz.defineMethod (c$, "createAtomSetCollectionFromReader", 
function (fullPathName, name, reader, htParams) {
var fileReader =  new org.jmol.io.FileReader (this, this.viewer, name, fullPathName, name, null, reader, htParams, false);
fileReader.run ();
return fileReader.getAtomSetCollection ();
}, "~S,~S,~O,java.util.Map");
Clazz.defineMethod (c$, "getBufferedInputStream", 
function (fullPathName) {
var ret = this.getBufferedReaderOrErrorMessageFromName (fullPathName,  new Array (2), true, true);
return (Clazz.instanceOf (ret, java.io.BufferedInputStream) ? ret : null);
}, "~S");
Clazz.defineMethod (c$, "getBufferedInputStreamOrErrorMessageFromName", 
function (name, fullName, showMsg, checkOnly, outputBytes, allowReader) {
var cacheBytes = (fullName == null || this.pngjCache == null ? null : org.jmol.io.JmolBinary.getCachedPngjBytes (this, fullName));
if (cacheBytes == null) cacheBytes = this.cacheGet (name, true);
var bis = null;
var ret = null;
var errorMessage = null;
try {
if (cacheBytes == null) {
var isPngjBinaryPost = (name.indexOf ("?POST?_PNGJBIN_") >= 0);
var isPngjPost = (isPngjBinaryPost || name.indexOf ("?POST?_PNGJ_") >= 0);
if (name.indexOf ("?POST?_PNG_") > 0 || isPngjPost) {
var o = this.viewer.getImageAs (isPngjPost ? "PNGJ" : "PNG", -1, 0, 0, null, null);
if (!org.jmol.util.Escape.isAB (o)) return o;
if (isPngjBinaryPost) {
outputBytes = o;
name = org.jmol.util.TextFormat.simpleReplace (name, "?_", "=_");
} else {
name =  new org.jmol.util.StringXBuilder ().append (name).append ("=").appendSB (org.jmol.io.Base64.getBase64 (o)).toString ();
}}var iurl = org.jmol.viewer.FileManager.urlTypeIndex (name);
var isURL = (iurl >= 0);
var post = null;
if (isURL && (iurl = name.indexOf ("?POST?")) >= 0) {
post = name.substring (iurl + 6);
name = name.substring (0, iurl);
}var isApplet = (this.appletDocumentBaseURL != null);
var fai = this.viewer.getFileAdapter ();
if (isApplet || isURL) {
if (isApplet && isURL && this.appletProxy != null) name = this.appletProxy + "?url=" + this.urlEncode (name);
var url = (isApplet ?  new java.net.URL (this.appletDocumentBaseURL, name, null) :  new java.net.URL (Clazz.castNullAs ("java.net.URL"), name, null));
if (checkOnly) return null;
name = url.toString ();
if (showMsg && name.toLowerCase ().indexOf ("password") < 0) org.jmol.util.Logger.info ("FileManager opening " + name);
ret = fai.getBufferedURLInputStream (url, outputBytes, post);
if (Clazz.instanceOf (ret, org.jmol.util.StringXBuilder)) {
var sb = ret;
if (allowReader && !org.jmol.io.JmolBinary.isBase64 (sb)) return org.jmol.io.JmolBinary.getBufferedReaderForString (sb.toString ());
ret = org.jmol.io.JmolBinary.getBISForStringXBuilder (sb);
} else if (org.jmol.util.Escape.isAB (ret)) {
ret =  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (ret));
}} else if ((cacheBytes = this.cacheGet (name, true)) == null) {
if (showMsg) org.jmol.util.Logger.info ("FileManager opening " + name);
ret = fai.getBufferedFileInputStream (name);
}if (Clazz.instanceOf (ret, String)) return ret;
}if (cacheBytes == null) bis = ret;
 else bis =  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (cacheBytes));
if (checkOnly) {
bis.close ();
bis = null;
}return bis;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
try {
if (bis != null) bis.close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
errorMessage = "" + e;
} else {
throw e;
}
}
return errorMessage;
}, "~S,~S,~B,~B,~A,~B");
Clazz.defineMethod (c$, "urlEncode", 
($fz = function (name) {
try {
return java.net.URLEncoder.encode (name, "utf-8");
} catch (e) {
if (Clazz.exceptionOf (e, java.io.UnsupportedEncodingException)) {
return name;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getFullPathNameOrError", 
function (filename) {
var names = this.classifyName (filename, true);
if (names == null || names[0] == null || names.length < 2) return [null, "cannot read file name: " + filename];
var name = names[0];
var fullPath = names[0].$replace ('\\', '/');
name = org.jmol.io.JmolBinary.getZipRoot (name);
var errMsg = this.getBufferedInputStreamOrErrorMessageFromName (name, fullPath, false, true, null, false);
return [fullPath, (Clazz.instanceOf (errMsg, String) ? errMsg : null)];
}, "~S");
Clazz.defineMethod (c$, "getBufferedReaderOrErrorMessageFromName", 
function (name, fullPathNameReturn, isBinary, doSpecialLoad) {
var data = this.cacheGet (name, false);
var isBytes = org.jmol.util.Escape.isAB (data);
var bytes = (isBytes ? data : null);
if (name.startsWith ("cache://")) {
if (data == null) return "cannot read " + name;
if (isBytes) {
bytes = data;
} else {
return org.jmol.io.JmolBinary.getBufferedReaderForString (data);
}}var names = this.classifyName (name, true);
if (names == null) return "cannot read file name: " + name;
if (fullPathNameReturn != null) fullPathNameReturn[0] = names[0].$replace ('\\', '/');
return this.getUnzippedBufferedReaderOrErrorMessageFromName (names[0], bytes, false, isBinary, false, doSpecialLoad);
}, "~S,~A,~B,~B");
Clazz.defineMethod (c$, "getEmbeddedFileState", 
function (fileName) {
var dir = null;
dir = this.getZipDirectory (fileName, false);
if (dir.length == 0) {
var state = this.viewer.getFileAsStringBin (fileName, 2147483647, false, true);
return (state.indexOf ("**** Jmol Embedded Script ****") < 0 ? "" : org.jmol.io.JmolBinary.getEmbeddedScript (state));
}for (var i = 0; i < dir.length; i++) if (dir[i].indexOf (".spt") >= 0) {
var data = [fileName + "|" + dir[i], null];
this.getFileDataOrErrorAsString (data, 2147483647, false, false);
return data[1];
}
return "";
}, "~S");
Clazz.defineMethod (c$, "getUnzippedBufferedReaderOrErrorMessageFromName", 
function (name, bytes, allowZipStream, asInputStream, isTypeCheckOnly, doSpecialLoad) {
var subFileList = null;
var info = (bytes == null && doSpecialLoad ? this.getSpartanFileList (name) : null);
var name00 = name;
if (info != null) {
if (isTypeCheckOnly) return info;
if (info[2] != null) {
var header = info[1];
var fileData =  new java.util.Hashtable ();
if (info.length == 3) {
var name0 = this.getObjectAsSections (info[2], header, fileData);
fileData.put ("OUTPUT", name0);
info = org.jmol.io.JmolBinary.spartanFileList (name, fileData.get (name0));
if (info.length == 3) {
name0 = this.getObjectAsSections (info[2], header, fileData);
fileData.put ("OUTPUT", name0);
info = org.jmol.io.JmolBinary.spartanFileList (info[1], fileData.get (name0));
}}var sb =  new org.jmol.util.StringXBuilder ();
if (fileData.get ("OUTPUT") != null) sb.append (fileData.get (fileData.get ("OUTPUT")));
var s;
for (var i = 2; i < info.length; i++) {
name = info[i];
name = this.getObjectAsSections (name, header, fileData);
org.jmol.util.Logger.info ("reading " + name);
s = fileData.get (name);
sb.append (s);
}
s = sb.toString ();
if (this.spardirCache == null) this.spardirCache =  new java.util.Hashtable ();
this.spardirCache.put (name00.$replace ('\\', '/'), s.getBytes ());
return org.jmol.io.JmolBinary.getBufferedReaderForString (s);
}}if (bytes == null && this.pngjCache != null) bytes = org.jmol.io.JmolBinary.getCachedPngjBytes (this, name);
var fullName = name;
if (name.indexOf ("|") >= 0) {
subFileList = org.jmol.util.TextFormat.splitChars (name, "|");
if (bytes == null) org.jmol.util.Logger.info ("FileManager opening " + name);
name = subFileList[0];
}var t = (bytes == null ? this.getBufferedInputStreamOrErrorMessageFromName (name, fullName, true, false, null, !asInputStream) :  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)));
try {
if (Clazz.instanceOf (t, String)) return t;
if (Clazz.instanceOf (t, java.io.BufferedReader)) return t;
var bis = t;
if (org.jmol.io.JmolBinary.isGzipS (bis)) {
do {
bis =  new java.io.BufferedInputStream (org.jmol.io.JmolBinary.newGZIPInputStream (bis));
} while (org.jmol.io.JmolBinary.isGzipS (bis));
}if (org.jmol.io.JmolBinary.isCompoundDocumentStream (bis)) {
var doc = org.jmol.api.Interface.getOptionInterface ("io2.CompoundDocument");
doc.setStream (bis, true);
return org.jmol.io.JmolBinary.getBufferedReaderForString (doc.getAllDataFiles ("Molecule", "Input").toString ());
}bis = org.jmol.io.JmolBinary.checkPngZipStream (bis);
if (org.jmol.io.JmolBinary.isZipStream (bis)) {
if (allowZipStream) return org.jmol.io.JmolBinary.newZipInputStream (bis);
if (asInputStream) return org.jmol.io.JmolBinary.getZipFileContents (bis, subFileList, 1, true);
var s = org.jmol.io.JmolBinary.getZipFileContents (bis, subFileList, 1, false);
bis.close ();
return org.jmol.io.JmolBinary.getBufferedReaderForString (s);
}return (asInputStream ? bis : org.jmol.io.JmolBinary.getBufferedReader (bis));
} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
return ioe.toString ();
} else {
throw ioe;
}
}
}, "~S,~A,~B,~B,~B,~B");
Clazz.defineMethod (c$, "getSpartanFileList", 
($fz = function (name) {
if (name.endsWith (".spt")) return [null, null, null];
if (name.endsWith (".spardir.zip")) return ["SpartanSmol", "Directory Entry ", name + "|output"];
name = name.$replace ('\\', '/');
if (!name.endsWith (".spardir") && name.indexOf (".spardir/") < 0) return null;
var pt = name.lastIndexOf (".spardir");
if (pt < 0) return null;
if (name.lastIndexOf ("/") > pt) {
return ["SpartanSmol", "Directory Entry ", name + "/input", name + "/archive", name + "/Molecule:asBinaryString", name + "/proparc"];
}return ["SpartanSmol", "Directory Entry ", name + "/output"];
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getObjectAsSections", 
($fz = function (name, header, fileData) {
if (name == null) return null;
var subFileList = null;
var asBinaryString = false;
var name0 = name.$replace ('\\', '/');
if (name.indexOf (":asBinaryString") >= 0) {
asBinaryString = true;
name = name.substring (0, name.indexOf (":asBinaryString"));
}var sb = null;
if (fileData.containsKey (name0)) return name0;
if (name.indexOf ("#JMOL_MODEL ") >= 0) {
fileData.put (name0, name0 + "\n");
return name0;
}var fullName = name;
if (name.indexOf ("|") >= 0) {
subFileList = org.jmol.util.TextFormat.splitChars (name, "|");
name = subFileList[0];
}var bis = null;
try {
var t = this.getBufferedInputStreamOrErrorMessageFromName (name, fullName, false, false, null, false);
if (Clazz.instanceOf (t, String)) {
fileData.put (name0, t + "\n");
return name0;
}bis = t;
if (org.jmol.io.JmolBinary.isCompoundDocumentStream (bis)) {
var doc = org.jmol.api.Interface.getOptionInterface ("io2.CompoundDocument");
doc.setStream (bis, true);
doc.getAllDataMapped (name.$replace ('\\', '/'), "Molecule", fileData);
} else if (org.jmol.io.JmolBinary.isZipStream (bis)) {
org.jmol.io.JmolBinary.getAllZipData (bis, subFileList, name.$replace ('\\', '/'), "Molecule", fileData);
} else if (asBinaryString) {
var bd = org.jmol.api.Interface.getOptionInterface ("io2.BinaryDocument");
bd.setStream (bis, false);
sb =  new org.jmol.util.StringXBuilder ();
if (header != null) sb.append ("BEGIN Directory Entry " + name0 + "\n");
try {
while (true) sb.append (Integer.toHexString (bd.readByte () & 0xFF)).appendC (' ');

} catch (e1) {
if (Clazz.exceptionOf (e1, Exception)) {
sb.appendC ('\n');
} else {
throw e1;
}
}
if (header != null) sb.append ("\nEND Directory Entry " + name0 + "\n");
fileData.put (name0, sb.toString ());
} else {
var br = org.jmol.io.JmolBinary.getBufferedReader (org.jmol.io.JmolBinary.isGzipS (bis) ?  new java.io.BufferedInputStream (org.jmol.io.JmolBinary.newGZIPInputStream (bis)) : bis);
var line;
sb =  new org.jmol.util.StringXBuilder ();
if (header != null) sb.append ("BEGIN Directory Entry " + name0 + "\n");
while ((line = br.readLine ()) != null) {
sb.append (line);
sb.appendC ('\n');
}
br.close ();
if (header != null) sb.append ("\nEND Directory Entry " + name0 + "\n");
fileData.put (name0, sb.toString ());
}} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
fileData.put (name0, ioe.toString ());
} else {
throw ioe;
}
}
if (bis != null) try {
bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (!fileData.containsKey (name0)) fileData.put (name0, "FILE NOT FOUND: " + name0 + "\n");
return name0;
}, $fz.isPrivate = true, $fz), "~S,~S,java.util.Map");
Clazz.defineMethod (c$, "getZipDirectory", 
function (fileName, addManifest) {
var t = this.getBufferedInputStreamOrErrorMessageFromName (fileName, fileName, false, false, null, false);
return org.jmol.io.JmolBinary.getZipDirectoryAndClose (t, addManifest);
}, "~S,~B");
Clazz.defineMethod (c$, "getFileAsBytes", 
function (name, os, allowZip) {
if (name == null) return null;
var fullName = name;
var subFileList = null;
if (name.indexOf ("|") >= 0) {
subFileList = org.jmol.util.TextFormat.splitChars (name, "|");
name = subFileList[0];
allowZip = true;
}var t = this.getBufferedInputStreamOrErrorMessageFromName (name, fullName, false, false, null, false);
if (Clazz.instanceOf (t, String)) return "Error:" + t;
try {
var bis = t;
var bytes = (os != null || subFileList == null || subFileList.length <= 1 || !allowZip || !org.jmol.io.JmolBinary.isZipStream (bis) && !org.jmol.io.JmolBinary.isPngZipStream (bis) ? org.jmol.io.JmolBinary.getStreamAsBytes (bis, os) : org.jmol.io.JmolBinary.getZipFileContentsAsBytes (bis, subFileList, 1));
bis.close ();
return bytes;
} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
return ioe.toString ();
} else {
throw ioe;
}
}
}, "~S,java.io.OutputStream,~B");
Clazz.defineMethod (c$, "getFileDataOrErrorAsString", 
function (data, nBytesMax, doSpecialLoad, allowBinary) {
data[1] = "";
var name = data[0];
if (name == null) return false;
var t = this.getBufferedReaderOrErrorMessageFromName (name, data, false, doSpecialLoad);
if (Clazz.instanceOf (t, String)) {
data[1] = t;
return false;
}try {
var br = t;
var sb = org.jmol.util.StringXBuilder.newN (8192);
var line;
if (nBytesMax == 2147483647) {
line = br.readLine ();
if (allowBinary || line != null && line.indexOf ('\0') < 0 && (line.length != 4 || line.charCodeAt (0) != 65533 || line.indexOf ("PNG") != 1)) {
sb.append (line).appendC ('\n');
while ((line = br.readLine ()) != null) sb.append (line).appendC ('\n');

}} else {
var n = 0;
var len;
while (n < nBytesMax && (line = br.readLine ()) != null) {
if (nBytesMax - n < (len = line.length) + 1) line = line.substring (0, nBytesMax - n - 1);
sb.append (line).appendC ('\n');
n += len + 1;
}
}br.close ();
data[1] = sb.toString ();
return true;
} catch (ioe) {
if (Clazz.exceptionOf (ioe, Exception)) {
data[1] = ioe.toString ();
return false;
} else {
throw ioe;
}
}
}, "~A,~N,~B,~B");
Clazz.defineMethod (c$, "loadImage", 
function (name, echoName) {

var image = null;
var fullPathName = "";
while (true) {
if (name == null) break;
var names = this.classifyName (name, true);
if (names == null) {
fullPathName = "cannot read file name: " + name;
break;
}var apiPlatform = this.viewer.apiPlatform;
fullPathName = names[0].$replace ('\\', '/');
if (fullPathName.indexOf ("|") > 0) {
var ret = this.getFileAsBytes (fullPathName, null, true);
if (!org.jmol.util.Escape.isAB (ret)) {
fullPathName = "" + ret;
break;
}image = (this.viewer.isJS ? ret : apiPlatform.createImage (ret));
} else if (this.viewer.isJS) {
} else if (org.jmol.viewer.FileManager.urlTypeIndex (fullPathName) >= 0) {
try {
image = apiPlatform.createImage ( new java.net.URL (Clazz.castNullAs ("java.net.URL"), fullPathName, null));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
fullPathName = "bad URL: " + fullPathName;
break;
} else {
throw e;
}
}
} else {
image = apiPlatform.createImage (fullPathName);
}if (!this.viewer.isJS && image == null) break;
try {

if (!apiPlatform.waitForDisplay ([echoName,fullPathName], image)) {
image = null;
break;
}
return;

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
fullPathName = e.toString () + " opening " + fullPathName;
image = null;
break;
} else {
throw e;
}
}
if (apiPlatform.getImageWidth (image) < 1) {
fullPathName = "invalid or missing image " + fullPathName;
image = null;
break;
}break;
}
this.viewer.loadImageData (image, fullPathName, echoName, null);
}, "~S,~S");
c$.urlTypeIndex = Clazz.defineMethod (c$, "urlTypeIndex", 
function (name) {
for (var i = 0; i < org.jmol.viewer.FileManager.urlPrefixes.length; ++i) {
if (name.startsWith (org.jmol.viewer.FileManager.urlPrefixes[i])) {
return i;
}}
return -1;
}, "~S");
c$.isLocal = Clazz.defineMethod (c$, "isLocal", 
function (fileName) {
if (fileName == null) return false;
var itype = org.jmol.viewer.FileManager.urlTypeIndex (fileName);
return (itype < 0 || itype == 3);
}, "~S");
Clazz.defineMethod (c$, "classifyName", 
function (name, isFullLoad) {
if (name == null) return [null];
var doSetPathForAllFiles = (this.pathForAllFiles.length > 0);
if (name.startsWith ("?")) {
if ((name = this.viewer.dialogAsk ("load", name.substring (1))) == null) return [isFullLoad ? "#CANCELED#" : null];
doSetPathForAllFiles = false;
}var file = null;
var url = null;
var names = null;
if (name.startsWith ("cache://")) {
names =  new Array (3);
names[0] = names[2] = name;
names[1] = org.jmol.viewer.FileManager.stripPath (names[0]);
return names;
}name = this.viewer.resolveDatabaseFormat (name);
if (name.indexOf (":") < 0 && name.indexOf ("/") != 0) name = org.jmol.viewer.FileManager.addDirectory (this.viewer.getDefaultDirectory (), name);
if (this.appletDocumentBaseURL != null) {
try {
if (name.indexOf (":\\") == 1 || name.indexOf (":/") == 1) name = "file:/" + name;
url =  new java.net.URL (this.appletDocumentBaseURL, name, null);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return [isFullLoad ? e.toString () : null];
} else {
throw e;
}
}
} else {
if (org.jmol.viewer.FileManager.urlTypeIndex (name) >= 0 || this.viewer.isRestricted (org.jmol.viewer.Viewer.ACCESS.NONE) || this.viewer.isRestricted (org.jmol.viewer.Viewer.ACCESS.READSPT) && !name.endsWith (".spt") && !name.endsWith ("/")) {
try {
url =  new java.net.URL (Clazz.castNullAs ("java.net.URL"), name, null);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return [isFullLoad ? e.toString () : null];
} else {
throw e;
}
}
} else {
file = this.viewer.apiPlatform.newFile (name);
names = [file.getAbsolutePath (), file.getName (), "file:/" + file.getAbsolutePath ().$replace ('\\', '/')];
}}if (url != null) {
names =  new Array (3);
names[0] = names[2] = url.toString ();
names[1] = org.jmol.viewer.FileManager.stripPath (names[0]);
}if (doSetPathForAllFiles) {
var name0 = names[0];
names[0] = this.pathForAllFiles + names[1];
org.jmol.util.Logger.info ("FileManager substituting " + name0 + " --> " + names[0]);
}if (isFullLoad && (file != null || org.jmol.viewer.FileManager.urlTypeIndex (names[0]) == 3)) {
var path = (file == null ? org.jmol.util.TextFormat.trim (names[0].substring (5), "/") : names[0]);
var pt = path.length - names[1].length - 1;
if (pt > 0) {
path = path.substring (0, pt);
org.jmol.viewer.FileManager.setLocalPath (this.viewer, path, true);
}}return names;
}, "~S,~B");
c$.addDirectory = Clazz.defineMethod (c$, "addDirectory", 
($fz = function (defaultDirectory, name) {
if (defaultDirectory.length == 0) return name;
var ch = (name.length > 0 ? name.charAt (0) : ' ');
var s = defaultDirectory.toLowerCase ();
if ((s.endsWith (".zip") || s.endsWith (".tar")) && ch != '|' && ch != '/') defaultDirectory += "|";
return defaultDirectory + (ch == '/' || ch == '/' || (ch = defaultDirectory.charAt (defaultDirectory.length - 1)) == '|' || ch == '/' ? "" : "/") + name;
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "getDefaultDirectory", 
function (name) {
var names = this.classifyName (name, true);
if (names == null) return "";
name = org.jmol.viewer.FileManager.fixPath (names[0]);
return (name == null ? "" : name.substring (0, name.lastIndexOf ("/")));
}, "~S");
c$.fixPath = Clazz.defineMethod (c$, "fixPath", 
($fz = function (path) {
path = path.$replace ('\\', '/');
path = org.jmol.util.TextFormat.simpleReplace (path, "/./", "/");
var pt = path.lastIndexOf ("//") + 1;
if (pt < 1) pt = path.indexOf (":/") + 1;
if (pt < 1) pt = path.indexOf ("/");
if (pt < 0) return null;
var protocol = path.substring (0, pt);
path = path.substring (pt);
while ((pt = path.lastIndexOf ("/../")) >= 0) {
var pt0 = path.substring (0, pt).lastIndexOf ("/");
if (pt0 < 0) return org.jmol.util.TextFormat.simpleReplace (protocol + path, "/../", "/");
path = path.substring (0, pt0) + path.substring (pt + 3);
}
if (path.length == 0) path = "/";
return protocol + path;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getFilePath", 
function (name, addUrlPrefix, asShortName) {
var names = this.classifyName (name, false);
return (names == null || names.length == 1 ? "" : asShortName ? names[1] : addUrlPrefix ? names[2] : names[0] == null ? "" : names[0].$replace ('\\', '/'));
}, "~S,~B,~B");
c$.getLocalUrl = Clazz.defineMethod (c$, "getLocalUrl", 
function (file) {
if (file.getName ().startsWith ("=")) return file.getName ();
var path = file.getAbsolutePath ().$replace ('\\', '/');
for (var i = 0; i < org.jmol.viewer.FileManager.urlPrefixPairs.length; i++) if (path.indexOf (org.jmol.viewer.FileManager.urlPrefixPairs[i]) == 0) return null;

for (var i = 0; i < org.jmol.viewer.FileManager.urlPrefixPairs.length; i += 2) if (path.indexOf (org.jmol.viewer.FileManager.urlPrefixPairs[i]) > 0) return org.jmol.viewer.FileManager.urlPrefixPairs[i + 1] + org.jmol.util.TextFormat.trim (path.substring (path.indexOf (org.jmol.viewer.FileManager.urlPrefixPairs[i]) + org.jmol.viewer.FileManager.urlPrefixPairs[i].length), "/");

return null;
}, "org.jmol.api.JmolFileInterface");
c$.getLocalDirectory = Clazz.defineMethod (c$, "getLocalDirectory", 
function (viewer, forDialog) {
var localDir = viewer.getParameter (forDialog ? "currentLocalPath" : "defaultDirectoryLocal");
if (forDialog && localDir.length == 0) localDir = viewer.getParameter ("defaultDirectoryLocal");
if (localDir.length == 0) return (viewer.isApplet () ? null : viewer.apiPlatform.newFile (System.getProperty ("user.dir", ".")));
if (viewer.isApplet () && localDir.indexOf ("file:/") == 0) localDir = localDir.substring (6);
var f = viewer.apiPlatform.newFile (localDir);
return f.isDirectory () ? f : f.getParentAsFile ();
}, "org.jmol.api.JmolViewer,~B");
c$.setLocalPath = Clazz.defineMethod (c$, "setLocalPath", 
function (viewer, path, forDialog) {
while (path.endsWith ("/") || path.endsWith ("\\")) path = path.substring (0, path.length - 1);

viewer.setStringProperty ("currentLocalPath", path);
if (!forDialog) viewer.setStringProperty ("defaultDirectoryLocal", path);
}, "org.jmol.api.JmolViewer,~S,~B");
c$.getLocalPathForWritingFile = Clazz.defineMethod (c$, "getLocalPathForWritingFile", 
function (viewer, file) {
if (file.indexOf ("file:/") == 0) return file.substring (6);
if (file.indexOf ("/") == 0 || file.indexOf (":") >= 0) return file;
var dir = org.jmol.viewer.FileManager.getLocalDirectory (viewer, false);
return (dir == null ? file : org.jmol.viewer.FileManager.fixPath (dir.toString () + "/" + file));
}, "org.jmol.api.JmolViewer,~S");
c$.setScriptFileReferences = Clazz.defineMethod (c$, "setScriptFileReferences", 
function (script, localPath, remotePath, scriptPath) {
if (localPath != null) script = org.jmol.viewer.FileManager.setScriptFileReferences (script, localPath, true);
if (remotePath != null) script = org.jmol.viewer.FileManager.setScriptFileReferences (script, remotePath, false);
script = org.jmol.util.TextFormat.simpleReplace (script, "\1\"", "\"");
if (scriptPath != null) {
while (scriptPath.endsWith ("/")) scriptPath = scriptPath.substring (0, scriptPath.length - 1);

for (var ipt = 0; ipt < org.jmol.viewer.FileManager.scriptFilePrefixes.length; ipt++) {
var tag = org.jmol.viewer.FileManager.scriptFilePrefixes[ipt];
script = org.jmol.util.TextFormat.simpleReplace (script, tag + ".", tag + scriptPath);
}
}return script;
}, "~S,~S,~S,~S");
c$.setScriptFileReferences = Clazz.defineMethod (c$, "setScriptFileReferences", 
($fz = function (script, dataPath, isLocal) {
if (dataPath == null) return script;
var noPath = (dataPath.length == 0);
var fileNames =  new java.util.ArrayList ();
org.jmol.io.JmolBinary.getFileReferences (script, fileNames);
var oldFileNames =  new java.util.ArrayList ();
var newFileNames =  new java.util.ArrayList ();
var nFiles = fileNames.size ();
for (var iFile = 0; iFile < nFiles; iFile++) {
var name0 = fileNames.get (iFile);
var name = name0;
if (isLocal == org.jmol.viewer.FileManager.isLocal (name)) {
var pt = (noPath ? -1 : name.indexOf ("/" + dataPath + "/"));
if (pt >= 0) {
name = name.substring (pt + 1);
} else {
pt = name.lastIndexOf ("/");
if (pt < 0 && !noPath) name = "/" + name;
if (pt < 0 || noPath) pt++;
name = dataPath + name.substring (pt);
}}org.jmol.util.Logger.info ("FileManager substituting " + name0 + " --> " + name);
oldFileNames.add ("\"" + name0 + "\"");
newFileNames.add ("\1\"" + name + "\"");
}
return org.jmol.util.TextFormat.replaceStrings (script, oldFileNames, newFileNames);
}, $fz.isPrivate = true, $fz), "~S,~S,~B");
c$.stripPath = Clazz.defineMethod (c$, "stripPath", 
function (name) {
var pt = Math.max (name.lastIndexOf ("|"), name.lastIndexOf ("/"));
return name.substring (pt + 1);
}, "~S");
c$.fixFileNameVariables = Clazz.defineMethod (c$, "fixFileNameVariables", 
function (format, fname) {
var str = org.jmol.util.TextFormat.simpleReplace (format, "%FILE", fname);
if (str.indexOf ("%LC") < 0) return str;
fname = fname.toLowerCase ();
str = org.jmol.util.TextFormat.simpleReplace (str, "%LCFILE", fname);
if (fname.length == 4) str = org.jmol.util.TextFormat.simpleReplace (str, "%LC13", fname.substring (1, 3));
return str;
}, "~S,~S");
Clazz.defineMethod (c$, "clearPngjCache", 
function (fileName) {
if (fileName == null || this.pngjCache != null && this.pngjCache.containsKey (this.getCanonicalName (org.jmol.io.JmolBinary.getZipRoot (fileName)))) this.pngjCache = null;
}, "~S");
Clazz.defineMethod (c$, "cachePut", 
function (key, data) {
key = key.$replace ('\\', '/');
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("cachePut " + key);
if (data == null || data.equals ("")) this.cache.remove (key);
 else this.cache.put (key, data);
}, "~S,~O");
Clazz.defineMethod (c$, "cacheGet", 
function (key, bytesOnly) {
key = key.$replace ('\\', '/');
if (org.jmol.util.Logger.debugging && this.cache.containsKey (key)) org.jmol.util.Logger.info ("cacheGet " + key);
var data = this.cache.get (key);
return (bytesOnly && (Clazz.instanceOf (data, String)) ? null : data);
}, "~S,~B");
Clazz.defineMethod (c$, "cacheClear", 
function () {
this.cache.clear ();
});
Clazz.defineMethod (c$, "cacheFileByName", 
function (fileName, isAdd) {
if (fileName == null || !isAdd && fileName.equalsIgnoreCase ("")) {
this.cacheClear ();
return -1;
}var data;
if (isAdd) {
fileName = this.viewer.resolveDatabaseFormat (fileName);
data = this.getFileAsBytes (fileName, null, true);
if (Clazz.instanceOf (data, String)) return 0;
this.cachePut (fileName, data);
} else {
data = this.cache.remove (fileName.$replace ('\\', '/'));
}return (data == null ? 0 : Clazz.instanceOf (data, String) ? (data).length : (data).length);
}, "~S,~B");
Clazz.defineMethod (c$, "cacheList", 
function () {
var map =  new java.util.Hashtable ();
for (var entry, $entry = this.cache.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) map.put (entry.getKey (), Integer.$valueOf (org.jmol.util.Escape.isAB (entry.getValue ()) ? (entry.getValue ()).length : entry.getValue ().toString ().length));

return map;
});
Clazz.defineMethod (c$, "getCanonicalName", 
function (pathName) {
var names = this.classifyName (pathName, true);
return (names == null ? pathName : names[2]);
}, "~S");
Clazz.defineStatics (c$,
"URL_LOCAL", 3,
"urlPrefixes", ["http:", "https:", "ftp:", "file:"],
"urlPrefixPairs", ["http:", "http://", "www.", "http://www.", "https:", "https://", "ftp:", "ftp://", "file:", "file:///"]);
c$.scriptFilePrefixes = c$.prototype.scriptFilePrefixes = ["/*file*/\"", "FILE0=\"", "FILE1=\""];
});
