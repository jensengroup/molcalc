Clazz.declarePackage ("org.jmol.io2");
Clazz.load (["org.jmol.api.JmolZipUtility"], "org.jmol.io2.ZipUtil", ["java.io.BufferedInputStream", "$.BufferedReader", "$.ByteArrayInputStream", "$.ByteArrayOutputStream", "$.FileInputStream", "$.FileOutputStream", "$.StringReader", "java.lang.Character", "$.Long", "java.util.ArrayList", "$.Date", "$.Hashtable", "$.StringTokenizer", "java.util.zip.CRC32", "$.GZIPInputStream", "$.ZipEntry", "$.ZipInputStream", "$.ZipOutputStream", "org.jmol.adapter.smarter.AtomSetCollection", "org.jmol.api.Interface", "$.JmolViewer", "org.jmol.io.JmolBinary", "org.jmol.io2.JmolZipInputStream", "org.jmol.util.Escape", "$.Logger", "$.Parser", "$.StringXBuilder", "$.TextFormat", "org.jmol.viewer.FileManager", "$.JmolConstants", "$.Viewer"], function () {
c$ = Clazz.declareType (org.jmol.io2, "ZipUtil", null, org.jmol.api.JmolZipUtility);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "newZipInputStream", 
function (is) {
return org.jmol.io2.ZipUtil.newZIS (is);
}, "java.io.InputStream");
c$.newZIS = Clazz.defineMethod (c$, "newZIS", 
($fz = function (is) {
return (Clazz.instanceOf (is, org.jmol.api.ZInputStream) ? is : Clazz.instanceOf (is, java.io.BufferedInputStream) ?  new org.jmol.io2.JmolZipInputStream (is) :  new org.jmol.io2.JmolZipInputStream ( new java.io.BufferedInputStream (is)));
}, $fz.isPrivate = true, $fz), "java.io.InputStream");
Clazz.overrideMethod (c$, "getAllZipData", 
function (is, subfileList, name0, binaryFileList, fileData) {
org.jmol.io2.ZipUtil.getAllZipDataStatic (is, subfileList, name0, binaryFileList, fileData);
}, "java.io.InputStream,~A,~S,~S,java.util.Map");
c$.getAllZipDataStatic = Clazz.defineMethod (c$, "getAllZipDataStatic", 
($fz = function (is, subfileList, name0, binaryFileList, fileData) {
var zis = org.jmol.io2.ZipUtil.newZIS (is);
var ze;
var listing =  new org.jmol.util.StringXBuilder ();
binaryFileList = "|" + binaryFileList + "|";
var prefix = org.jmol.util.TextFormat.join (subfileList, '/', 1);
var prefixd = null;
if (prefix != null) {
prefixd = prefix.substring (0, prefix.indexOf ("/") + 1);
if (prefixd.length == 0) prefixd = null;
}try {
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
if (prefix != null && prefixd != null && !(name.equals (prefix) || name.startsWith (prefixd))) continue;
listing.append (name).appendC ('\n');
var sname = "|" + name.substring (name.lastIndexOf ("/") + 1) + "|";
var asBinaryString = (binaryFileList.indexOf (sname) >= 0);
var bytes = org.jmol.io.JmolBinary.getStreamBytes (zis, ze.getSize ());
var str;
if (asBinaryString) {
str = org.jmol.io2.ZipUtil.getBinaryStringForBytes (bytes);
name += ":asBinaryString";
} else {
str = org.jmol.io.JmolBinary.fixUTF (bytes);
}str = "BEGIN Directory Entry " + name + "\n" + str + "\nEND Directory Entry " + name + "\n";
fileData.put (name0 + "|" + name, str);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
fileData.put ("#Directory_Listing", listing.toString ());
}, $fz.isPrivate = true, $fz), "java.io.InputStream,~A,~S,~S,java.util.Map");
c$.getBinaryStringForBytes = Clazz.defineMethod (c$, "getBinaryStringForBytes", 
($fz = function (bytes) {
var ret =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < bytes.length; i++) ret.append (Integer.toHexString (bytes[i] & 0xFF)).appendC (' ');

return ret.toString ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.overrideMethod (c$, "getZipFileContents", 
function (bis, list, listPtr, asBufferedInputStream) {
var ret;
if (list == null || listPtr >= list.length) return this.getZipDirectoryAsStringAndClose (bis);
var fileName = list[listPtr];
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
try {
var isAll = (fileName.equals ("."));
if (isAll || fileName.lastIndexOf ("/") == fileName.length - 1) {
ret =  new org.jmol.util.StringXBuilder ();
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
if (isAll || name.startsWith (fileName)) ret.append (name).appendC ('\n');
}
var str = ret.toString ();
if (asBufferedInputStream) return  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (str.getBytes ()));
return str;
}var asBinaryString = false;
if (fileName.indexOf (":asBinaryString") > 0) {
fileName = fileName.substring (0, fileName.indexOf (":asBinaryString"));
asBinaryString = true;
}while ((ze = zis.getNextEntry ()) != null) {
if (!fileName.equals (ze.getName ())) continue;
var bytes = org.jmol.io.JmolBinary.getStreamBytes (zis, ze.getSize ());
if (org.jmol.io.JmolBinary.isZipFile (bytes)) return this.getZipFileContents ( new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)), list, ++listPtr, asBufferedInputStream);
if (asBufferedInputStream) return  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes));
if (asBinaryString) {
ret =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < bytes.length; i++) ret.append (Integer.toHexString (bytes[i] & 0xFF)).appendC (' ');

return ret.toString ();
}return org.jmol.io.JmolBinary.fixUTF (bytes);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return "";
}, "java.io.BufferedInputStream,~A,~N,~B");
Clazz.overrideMethod (c$, "getZipFileContentsAsBytes", 
function (bis, list, listPtr) {
var ret =  Clazz.newByteArray (0, 0);
var fileName = list[listPtr];
if (fileName.lastIndexOf ("/") == fileName.length - 1) return ret;
try {
bis = org.jmol.io.JmolBinary.checkPngZipStream (bis);
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
while ((ze = zis.getNextEntry ()) != null) {
if (!fileName.equals (ze.getName ())) continue;
var bytes = org.jmol.io.JmolBinary.getStreamBytes (zis, ze.getSize ());
if (org.jmol.io.JmolBinary.isZipFile (bytes) && ++listPtr < list.length) return this.getZipFileContentsAsBytes ( new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)), list, listPtr);
return bytes;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return ret;
}, "java.io.BufferedInputStream,~A,~N");
Clazz.overrideMethod (c$, "getZipDirectoryAsStringAndClose", 
function (bis) {
var sb =  new org.jmol.util.StringXBuilder ();
var s =  new Array (0);
try {
s = this.getZipDirectoryOrErrorAndClose (bis, false);
bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error (e.toString ());
} else {
throw e;
}
}
for (var i = 0; i < s.length; i++) sb.append (s[i]).appendC ('\n');

return sb.toString ();
}, "java.io.BufferedInputStream");
Clazz.overrideMethod (c$, "getZipDirectoryAndClose", 
function (bis, addManifest) {
var s =  new Array (0);
try {
s = this.getZipDirectoryOrErrorAndClose (bis, addManifest);
bis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error (e.toString ());
} else {
throw e;
}
}
return s;
}, "java.io.BufferedInputStream,~B");
Clazz.defineMethod (c$, "getZipDirectoryOrErrorAndClose", 
($fz = function (bis, addManifest) {
bis = org.jmol.io.JmolBinary.checkPngZipStream (bis);
var v =  new java.util.ArrayList ();
var zis =  new java.util.zip.ZipInputStream (bis);
var ze;
var manifest = null;
while ((ze = zis.getNextEntry ()) != null) {
var fileName = ze.getName ();
if (addManifest && org.jmol.io2.ZipUtil.isJmolManifest (fileName)) manifest = org.jmol.io2.ZipUtil.getZipEntryAsString (zis);
 else if (!fileName.startsWith ("__MACOS")) v.add (fileName);
}
zis.close ();
if (addManifest) v.add (0, manifest == null ? "" : manifest + "\n############\n");
return v.toArray ( new Array (v.size ()));
}, $fz.isPrivate = true, $fz), "java.io.BufferedInputStream,~B");
c$.getZipEntryAsString = Clazz.defineMethod (c$, "getZipEntryAsString", 
($fz = function (is) {
return org.jmol.io.JmolBinary.fixUTF (org.jmol.io.JmolBinary.getStreamBytes (is, -1));
}, $fz.isPrivate = true, $fz), "java.io.InputStream");
c$.isJmolManifest = Clazz.defineMethod (c$, "isJmolManifest", 
($fz = function (thisEntry) {
return thisEntry.startsWith ("JmolManifest");
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "cacheZipContents", 
function (bis, fileName, cache) {
var zis = this.newZipInputStream (bis);
var ze;
var listing =  new org.jmol.util.StringXBuilder ();
var n = 0;
try {
while ((ze = zis.getNextEntry ()) != null) {
var name = ze.getName ();
listing.append (name).appendC ('\n');
var nBytes = ze.getSize ();
var bytes = org.jmol.io.JmolBinary.getStreamBytes (zis, nBytes);
n += bytes.length;
cache.put (fileName + "|" + name, bytes);
}
zis.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
try {
zis.close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
return null;
} else {
throw e;
}
}
org.jmol.util.Logger.info ("ZipUtil cached " + n + " bytes from " + fileName);
return listing.toString ();
}, "java.io.BufferedInputStream,~S,java.util.Map");
Clazz.overrideMethod (c$, "getGzippedBytesAsString", 
function (bytes) {
return org.jmol.io2.ZipUtil.staticGetGzippedBytesAsString (bytes);
}, "~A");
c$.staticGetGzippedBytesAsString = Clazz.defineMethod (c$, "staticGetGzippedBytesAsString", 
function (bytes) {
try {
var is =  new java.io.ByteArrayInputStream (bytes);
do {
is =  new java.io.BufferedInputStream ( new java.util.zip.GZIPInputStream (is, 512));
} while (org.jmol.io.JmolBinary.isGzipS (is));
var s = org.jmol.io2.ZipUtil.getZipEntryAsString (is);
is.close ();
return s;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "";
} else {
throw e;
}
}
}, "~A");
Clazz.defineMethod (c$, "getGzippedInputStream", 
function (bytes) {
try {
var is =  new java.io.ByteArrayInputStream (bytes);
do {
is =  new java.io.BufferedInputStream ( new java.util.zip.GZIPInputStream (is, 512));
} while (org.jmol.io.JmolBinary.isGzipS (is));
return is;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "~A");
Clazz.overrideMethod (c$, "newGZIPInputStream", 
function (bis) {
return  new java.util.zip.GZIPInputStream (bis, 512);
}, "java.io.BufferedInputStream");
Clazz.overrideMethod (c$, "addPngFileBytes", 
function (name, ret, iFile, crcMap, isSparDir, newName, ptSlash, v) {
var crc =  new java.util.zip.CRC32 ();
crc.update (ret, 0, ret.length);
var crcValue = Long.$valueOf (crc.getValue ());
if (crcMap.containsKey (crcValue)) {
newName = crcMap.get (crcValue);
} else {
if (isSparDir) newName = newName.$replace ('.', '_');
if (crcMap.containsKey (newName)) {
var pt = newName.lastIndexOf (".");
if (pt > ptSlash) newName = newName.substring (0, pt) + "[" + iFile + "]" + newName.substring (pt);
 else newName = newName + "[" + iFile + "]";
}v.add (name);
v.add (newName);
v.add (ret);
crcMap.put (crcValue, newName);
}return newName;
}, "~S,~A,~N,java.util.Hashtable,~B,~S,~N,java.util.List");
Clazz.overrideMethod (c$, "writeZipFile", 
function (fm, viewer, outFileName, fileNamesAndByteArrays, msg) {
var buf =  Clazz.newByteArray (1024, 0);
var nBytesOut = 0;
var nBytes = 0;
org.jmol.util.Logger.info ("creating zip file " + (outFileName == null ? "" : outFileName) + "...");
var fullFilePath = null;
var fileList = "";
try {
var bos = (outFileName == null || outFileName.startsWith ("http://") ?  new java.io.ByteArrayOutputStream () : null);
var os =  new java.util.zip.ZipOutputStream (bos == null ?  new java.io.FileOutputStream (outFileName) : bos);
for (var i = 0; i < fileNamesAndByteArrays.size (); i += 3) {
var fname = fileNamesAndByteArrays.get (i);
var bytes = null;
if (fname.indexOf ("file:/") == 0) {
fname = fname.substring (5);
if (fname.length > 2 && fname.charAt (2) == ':') fname = fname.substring (1);
} else if (fname.indexOf ("cache://") == 0) {
var data = fm.cacheGet (fname, false);
fname = fname.substring (8);
bytes = (org.jmol.util.Escape.isAB (data) ? data : (data).getBytes ());
}var fnameShort = fileNamesAndByteArrays.get (i + 1);
if (fnameShort == null) fnameShort = fname;
if (bytes == null) bytes = fileNamesAndByteArrays.get (i + 2);
var key = ";" + fnameShort + ";";
if (fileList.indexOf (key) >= 0) {
org.jmol.util.Logger.info ("duplicate entry");
continue;
}fileList += key;
os.putNextEntry ( new java.util.zip.ZipEntry (fnameShort));
var nOut = 0;
if (bytes == null) {
var $in =  new java.io.FileInputStream (fname);
var len;
while ((len = $in.read (buf, 0, 1024)) > 0) {
os.write (buf, 0, len);
nOut += len;
}
$in.close ();
} else {
os.write (bytes, 0, bytes.length);
nOut += bytes.length;
}nBytesOut += nOut;
os.closeEntry ();
org.jmol.util.Logger.info ("...added " + fname + " (" + nOut + " bytes)");
}
os.close ();
org.jmol.util.Logger.info (nBytesOut + " bytes prior to compression");
if (bos != null) {
var bytes = bos.toByteArray ();
if (outFileName == null) return bytes;
fullFilePath = outFileName;
nBytes = bytes.length;
var ret = org.jmol.io.JmolBinary.postByteArray (fm, outFileName, bytes);
if (ret.indexOf ("Exception") >= 0) return ret;
msg += " " + ret;
} else {
var f = viewer.apiPlatform.newFile (outFileName);
fullFilePath = f.getAbsolutePath ().$replace ('\\', '/');
nBytes = f.length ();
}} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
org.jmol.util.Logger.info (e.toString ());
return e.toString ();
} else {
throw e;
}
}
return msg + " " + nBytes + " " + fullFilePath;
}, "org.jmol.viewer.FileManager,org.jmol.viewer.Viewer,~S,java.util.List,~S");
Clazz.overrideMethod (c$, "getSceneScript", 
function (scenes, htScenes, list) {
var iSceneLast = 0;
var iScene = 0;
var sceneScript =  new org.jmol.util.StringXBuilder ().append ("###scene.spt###").append (" Jmol ").append (org.jmol.api.JmolViewer.getJmolVersion ()).append ("\n{\nsceneScripts={");
for (var i = 1; i < scenes.length; i++) {
scenes[i - 1] = org.jmol.util.TextFormat.trim (scenes[i - 1], "\t\n\r ");
var pt =  Clazz.newIntArray (1, 0);
iScene = org.jmol.util.Parser.parseIntNext (scenes[i], pt);
if (iScene == -2147483648) return "bad scene ID: " + iScene;
scenes[i] = scenes[i].substring (pt[0]);
list.add (Integer.$valueOf (iScene));
var key = iSceneLast + "-" + iScene;
htScenes.put (key, scenes[i - 1]);
if (i > 1) sceneScript.append (",");
sceneScript.appendC ('\n').append (org.jmol.util.Escape.escapeStr (key)).append (": ").append (org.jmol.util.Escape.escapeStr (scenes[i - 1]));
iSceneLast = iScene;
}
sceneScript.append ("\n}\n");
if (list.size () == 0) return "no lines 'pause scene n'";
sceneScript.append ("\nthisSceneRoot = '$SCRIPT_PATH$'.split('_scene_')[1];\n").append ("thisSceneID = 0 + ('$SCRIPT_PATH$'.split('_scene_')[2]).split('.')[1];\n").append ("var thisSceneState = '$SCRIPT_PATH$'.replace('.min.png','.all.png') + 'state.spt';\n").append ("var spath = ''+currentSceneID+'-'+thisSceneID;\n").append ("print thisSceneRoot + ' ' + spath;\n").append ("var sscript = sceneScripts[spath];\n").append ("var isOK = true;\n").append ("try{\n").append ("if (thisSceneRoot != currentSceneRoot){\n").append (" isOK = false;\n").append ("} else if (sscript != '') {\n").append (" isOK = true;\n").append ("} else if (thisSceneID <= currentSceneID){\n").append (" isOK = false;\n").append ("} else {\n").append (" sscript = '';\n").append (" for (var i = currentSceneID; i < thisSceneID; i++){\n").append ("  var key = ''+i+'-'+(i + 1); var script = sceneScripts[key];\n").append ("  if (script = '') {isOK = false;break;}\n").append ("  sscript += ';'+script;\n").append (" }\n").append ("}\n}catch(e){print e;isOK = false}\n").append ("if (isOK) {" + org.jmol.io2.ZipUtil.wrapPathForAllFiles ("script inline @sscript", "print e;isOK = false") + "}\n").append ("if (!isOK){script @thisSceneState}\n").append ("currentSceneRoot = thisSceneRoot; currentSceneID = thisSceneID;\n}\n");
return sceneScript.toString ();
}, "~A,java.util.Map,java.util.List");
c$.wrapPathForAllFiles = Clazz.defineMethod (c$, "wrapPathForAllFiles", 
($fz = function (cmd, strCatch) {
var vname = "v__" + ("" + Math.random ()).substring (3);
return "# Jmol script\n{\n\tVar " + vname + " = pathForAllFiles\n\tpathForAllFiles=\"$SCRIPT_PATH$\"\n\ttry{\n\t\t" + cmd + "\n\t}catch(e){" + strCatch + "}\n\tpathForAllFiles = " + vname + "\n}\n";
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.overrideMethod (c$, "createZipSet", 
function (fm, viewer, fileName, script, scripts, includeRemoteFiles) {
var v =  new java.util.ArrayList ();
var fileNames =  new java.util.ArrayList ();
var crcMap =  new java.util.Hashtable ();
var haveSceneScript = (scripts != null && scripts.length == 3 && scripts[1].startsWith ("###scene.spt###"));
var sceneScriptOnly = (haveSceneScript && scripts[2].equals ("min"));
if (!sceneScriptOnly) {
org.jmol.io.JmolBinary.getFileReferences (script, fileNames);
if (haveSceneScript) org.jmol.io.JmolBinary.getFileReferences (scripts[1], fileNames);
}var haveScripts = (!haveSceneScript && scripts != null && scripts.length > 0);
if (haveScripts) {
script = org.jmol.io2.ZipUtil.wrapPathForAllFiles ("script " + org.jmol.util.Escape.escapeStr (scripts[0]), "");
for (var i = 0; i < scripts.length; i++) fileNames.add (scripts[i]);

}var nFiles = fileNames.size ();
if (fileName != null) fileName = fileName.$replace ('\\', '/');
var fileRoot = fileName;
if (fileRoot != null) {
fileRoot = fileName.substring (fileName.lastIndexOf ("/") + 1);
if (fileRoot.indexOf (".") >= 0) fileRoot = fileRoot.substring (0, fileRoot.indexOf ("."));
}var newFileNames =  new java.util.ArrayList ();
for (var iFile = 0; iFile < nFiles; iFile++) {
var name = fileNames.get (iFile);
var isLocal = !viewer.isJS && org.jmol.viewer.FileManager.isLocal (name);
var newName = name;
if (isLocal || includeRemoteFiles) {
var ptSlash = name.lastIndexOf ("/");
newName = (name.indexOf ("?") > 0 && name.indexOf ("|") < 0 ? org.jmol.util.TextFormat.replaceAllCharacters (name, "/:?\"'=&", "_") : org.jmol.viewer.FileManager.stripPath (name));
newName = org.jmol.util.TextFormat.replaceAllCharacters (newName, "[]", "_");
var isSparDir = (fm.spardirCache != null && fm.spardirCache.containsKey (name));
if (isLocal && name.indexOf ("|") < 0 && !isSparDir) {
v.add (name);
v.add (newName);
v.add (null);
} else {
var ret = (isSparDir ? fm.spardirCache.get (name) : fm.getFileAsBytes (name, null, true));
if (!org.jmol.util.Escape.isAB (ret)) return ret;
newName = this.addPngFileBytes (name, ret, iFile, crcMap, isSparDir, newName, ptSlash, v);
}name = "$SCRIPT_PATH$" + newName;
}crcMap.put (newName, newName);
newFileNames.add (name);
}
if (!sceneScriptOnly) {
script = org.jmol.util.TextFormat.replaceQuotedStrings (script, fileNames, newFileNames);
v.add ("state.spt");
v.add (null);
v.add (script.getBytes ());
}if (haveSceneScript) {
if (scripts[0] != null) {
v.add ("animate.spt");
v.add (null);
v.add (scripts[0].getBytes ());
}v.add ("scene.spt");
v.add (null);
script = org.jmol.util.TextFormat.replaceQuotedStrings (scripts[1], fileNames, newFileNames);
v.add (script.getBytes ());
}var sname = (haveSceneScript ? "scene.spt" : "state.spt");
v.add ("JmolManifest.txt");
v.add (null);
var sinfo = "# Jmol Manifest Zip Format 1.1\n# Created " + ( new java.util.Date ()) + "\n" + "# JmolVersion " + org.jmol.viewer.Viewer.getJmolVersion () + "\n" + sname;
v.add (sinfo.getBytes ());
v.add ("Jmol_version_" + org.jmol.viewer.Viewer.getJmolVersion ().$replace (' ', '_').$replace (':', '.'));
v.add (null);
v.add ( Clazz.newByteArray (0, 0));
if (fileRoot != null) {
var bytes = viewer.getImageAsWithComment ("PNG", -1, -1, -1, null, null, null, org.jmol.viewer.JmolConstants.embedScript (script));
if (org.jmol.util.Escape.isAB (bytes)) {
v.add ("preview.png");
v.add (null);
v.add (bytes);
}}return org.jmol.io.JmolBinary.writeZipFile (fm, viewer, fileName, v, "OK JMOL");
}, "org.jmol.viewer.FileManager,org.jmol.viewer.Viewer,~S,~S,~A,~B");
Clazz.overrideMethod (c$, "getAtomSetCollectionOrBufferedReaderFromZip", 
function (adapter, is, fileName, zipDirectory, htParams, subFilePtr, asBufferedReader, asBufferedInputStream) {
var doCombine = (subFilePtr == 1);
htParams.put ("zipSet", fileName);
var subFileList = htParams.get ("subFileList");
if (subFileList == null) subFileList = org.jmol.io2.ZipUtil.checkSpecialInZip (zipDirectory);
var subFileName = (subFileList == null || subFilePtr >= subFileList.length ? null : subFileList[subFilePtr]);
if (subFileName != null && (subFileName.startsWith ("/") || subFileName.startsWith ("\\"))) subFileName = subFileName.substring (1);
var selectedFile = 0;
if (subFileName == null && htParams.containsKey ("modelNumber")) {
selectedFile = (htParams.get ("modelNumber")).intValue ();
if (selectedFile > 0 && doCombine) htParams.remove ("modelNumber");
}var manifest = htParams.get ("manifest");
var useFileManifest = (manifest == null);
if (useFileManifest) manifest = (zipDirectory.length > 0 ? zipDirectory[0] : "");
var haveManifest = (manifest.length > 0);
if (haveManifest) {
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("manifest for  " + fileName + ":\n" + manifest);
}var ignoreErrors = (manifest.indexOf ("IGNORE_ERRORS") >= 0);
var selectAll = (manifest.indexOf ("IGNORE_MANIFEST") >= 0);
var exceptFiles = (manifest.indexOf ("EXCEPT_FILES") >= 0);
if (selectAll || subFileName != null) haveManifest = false;
if (useFileManifest && haveManifest) {
var path = org.jmol.io.JmolBinary.getManifestScriptPath (manifest);
if (path != null) return "NOTE: file recognized as a script file: " + fileName + path + "\n";
}var vCollections =  new java.util.ArrayList ();
var htCollections = (haveManifest ?  new java.util.Hashtable () : null);
var nFiles = 0;
var ret = org.jmol.io2.ZipUtil.checkSpecialData (is, zipDirectory);
if (Clazz.instanceOf (ret, String)) return ret;
var data = ret;
try {
if (data != null) {
var reader =  new java.io.BufferedReader ( new java.io.StringReader (data.toString ()));
if (asBufferedReader) {
return reader;
}ret = adapter.getAtomSetCollectionFromReader (fileName, reader, htParams);
if (Clazz.instanceOf (ret, String)) return ret;
if (Clazz.instanceOf (ret, org.jmol.adapter.smarter.AtomSetCollection)) {
var atomSetCollection = ret;
if (atomSetCollection.errorMessage != null) {
if (ignoreErrors) return null;
return atomSetCollection.errorMessage;
}return atomSetCollection;
}if (ignoreErrors) return null;
return "unknown reader error";
}if (Clazz.instanceOf (is, java.io.BufferedInputStream)) is = org.jmol.io.JmolBinary.checkPngZipStream (is);
var zis = org.jmol.io.JmolBinary.newZipInputStream (is);
var ze;
if (haveManifest) manifest = '|' + manifest.$replace ('\r', '|').$replace ('\n', '|') + '|';
while ((ze = zis.getNextEntry ()) != null && (selectedFile <= 0 || vCollections.size () < selectedFile)) {
if (ze.isDirectory ()) continue;
var thisEntry = ze.getName ();
if (subFileName != null && !thisEntry.equals (subFileName)) continue;
if (subFileName != null) htParams.put ("subFileName", subFileName);
if (org.jmol.io2.ZipUtil.isJmolManifest (thisEntry) || haveManifest && exceptFiles == manifest.indexOf ("|" + thisEntry + "|") >= 0) continue;
var bytes = org.jmol.io.JmolBinary.getStreamBytes (zis, ze.getSize ());
if (org.jmol.io.JmolBinary.isZipFile (bytes)) {
var bis =  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes));
var zipDir2 = org.jmol.io.JmolBinary.getZipDirectoryAndClose (bis, true);
bis =  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes));
var atomSetCollections = this.getAtomSetCollectionOrBufferedReaderFromZip (adapter, bis, fileName + "|" + thisEntry, zipDir2, htParams, ++subFilePtr, asBufferedReader, asBufferedInputStream);
if (Clazz.instanceOf (atomSetCollections, String)) {
if (ignoreErrors) continue;
return atomSetCollections;
} else if (Clazz.instanceOf (atomSetCollections, org.jmol.adapter.smarter.AtomSetCollection) || Clazz.instanceOf (atomSetCollections, java.util.List)) {
if (haveManifest && !exceptFiles) htCollections.put (thisEntry, atomSetCollections);
 else vCollections.add (atomSetCollections);
} else if (Clazz.instanceOf (atomSetCollections, java.io.BufferedReader)) {
if (doCombine) zis.close ();
return atomSetCollections;
} else {
if (ignoreErrors) continue;
zis.close ();
return "unknown zip reader error";
}} else if (asBufferedInputStream) {
if (org.jmol.io.JmolBinary.isGzipB (bytes)) return this.getGzippedInputStream (bytes);
var bis =  new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes));
if (doCombine) zis.close ();
return bis;
} else {
var sData;
if (org.jmol.io.JmolBinary.isCompoundDocumentArray (bytes)) {
var jd = org.jmol.api.Interface.getInterface ("jmol.util.CompoundDocument");
jd.setStream ( new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)), true);
sData = jd.getAllDataFiles ("Molecule", "Input").toString ();
} else if (org.jmol.io.JmolBinary.isGzipB (bytes)) {
sData = org.jmol.io.JmolBinary.getGzippedBytesAsString (bytes);
} else {
sData = org.jmol.io.JmolBinary.fixUTF (bytes);
}var reader =  new java.io.BufferedReader ( new java.io.StringReader (sData));
if (asBufferedReader) {
if (doCombine) zis.close ();
return reader;
}var fname = fileName + "|" + ze.getName ();
ret = adapter.getAtomSetCollectionFromReader (fname, reader, htParams);
if (!(Clazz.instanceOf (ret, org.jmol.adapter.smarter.AtomSetCollection))) {
if (ignoreErrors) continue;
zis.close ();
return "" + ret;
}if (haveManifest && !exceptFiles) htCollections.put (thisEntry, ret);
 else vCollections.add (ret);
var a = ret;
if (a.errorMessage != null) {
if (ignoreErrors) continue;
zis.close ();
return a.errorMessage;
}}}
if (doCombine) zis.close ();
if (haveManifest && !exceptFiles) {
var list = org.jmol.util.TextFormat.split (manifest, '|');
for (var i = 0; i < list.length; i++) {
var file = list[i];
if (file.length == 0 || file.indexOf ("#") == 0) continue;
if (htCollections.containsKey (file)) vCollections.add (htCollections.get (file));
 else if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("manifested file " + file + " was not found in " + fileName);
}
}if (!doCombine) return vCollections;
var result =  new org.jmol.adapter.smarter.AtomSetCollection ("Array", null, null, vCollections);
if (result.errorMessage != null) {
if (ignoreErrors) return null;
return result.errorMessage;
}if (nFiles == 1) selectedFile = 1;
if (selectedFile > 0 && selectedFile <= vCollections.size ()) return vCollections.get (selectedFile - 1);
return result;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
if (ignoreErrors) return null;
org.jmol.util.Logger.error ("" + e);
return "" + e;
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
org.jmol.util.Logger.errorEx (null, er);
return "" + er;
}
} else {
throw e$$;
}
}
}, "org.jmol.api.JmolAdapter,java.io.InputStream,~S,~A,java.util.Map,~N,~B,~B");
c$.checkSpecialData = Clazz.defineMethod (c$, "checkSpecialData", 
($fz = function (is, zipDirectory) {
var isSpartan = false;
for (var i = 1; i < zipDirectory.length; i++) {
if (zipDirectory[i].endsWith (".spardir/") || zipDirectory[i].indexOf ("_spartandir") >= 0) {
isSpartan = true;
break;
}}
if (!isSpartan) return null;
var data =  new org.jmol.util.StringXBuilder ();
data.append ("Zip File Directory: ").append ("\n").append (org.jmol.util.Escape.escapeStrA (zipDirectory, true)).append ("\n");
var fileData =  new java.util.Hashtable ();
org.jmol.io2.ZipUtil.getAllZipDataStatic (is, [], "", "Molecule", fileData);
var prefix = "|";
var outputData = fileData.get (prefix + "output");
if (outputData == null) outputData = fileData.get ((prefix = "|" + zipDirectory[1]) + "output");
data.append (outputData);
var files = org.jmol.io2.ZipUtil.getSpartanFileList (prefix, org.jmol.io2.ZipUtil.getSpartanDirs (outputData));
for (var i = 2; i < files.length; i++) {
var name = files[i];
if (fileData.containsKey (name)) data.append (fileData.get (name));
 else data.append (name + "\n");
}
return data;
}, $fz.isPrivate = true, $fz), "java.io.InputStream,~A");
Clazz.overrideMethod (c$, "spartanFileList", 
function (name, type) {
var dirNums = org.jmol.io2.ZipUtil.getSpartanDirs (type);
if (dirNums.length == 0 && name.endsWith (".spardir.zip") && type.indexOf (".zip|output") >= 0) {
var sname = name.$replace ('\\', '/');
var pt = name.lastIndexOf (".spardir");
pt = sname.lastIndexOf ("/");
sname = name + "|" + name.substring (pt + 1, name.length - 4);
return ["SpartanSmol", sname, sname + "/output"];
}return org.jmol.io2.ZipUtil.getSpartanFileList (name, dirNums);
}, "~S,~S");
c$.getSpartanDirs = Clazz.defineMethod (c$, "getSpartanDirs", 
($fz = function (outputFileData) {
if (outputFileData == null) return [];
if (outputFileData.startsWith ("java.io.FileNotFoundException") || outputFileData.startsWith ("FILE NOT FOUND") || outputFileData.indexOf ("<html") >= 0) return ["M0001"];
var v =  new java.util.ArrayList ();
var token;
var lasttoken = "";
try {
var tokens =  new java.util.StringTokenizer (outputFileData, " \t\r\n");
while (tokens.hasMoreTokens ()) {
if ((token = tokens.nextToken ()).equals (")")) v.add (lasttoken);
 else if (token.equals ("Start-") && tokens.nextToken ().equals ("Molecule")) v.add (org.jmol.util.TextFormat.split (tokens.nextToken (), '"')[1]);
lasttoken = token;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return v.toArray ( new Array (v.size ()));
}, $fz.isPrivate = true, $fz), "~S");
c$.getSpartanFileList = Clazz.defineMethod (c$, "getSpartanFileList", 
($fz = function (name, dirNums) {
var files =  new Array (2 + dirNums.length * 5);
files[0] = "SpartanSmol";
files[1] = "Directory Entry ";
var pt = 2;
name = name.$replace ('\\', '/');
if (name.endsWith ("/")) name = name.substring (0, name.length - 1);
for (var i = 0; i < dirNums.length; i++) {
var path = name + (Character.isDigit (dirNums[i].charAt (0)) ? "/Profile." + dirNums[i] : "/" + dirNums[i]);
files[pt++] = path + "/#JMOL_MODEL " + dirNums[i];
files[pt++] = path + "/input";
files[pt++] = path + "/archive";
files[pt++] = path + "/Molecule:asBinaryString";
files[pt++] = path + "/proparc";
}
return files;
}, $fz.isPrivate = true, $fz), "~S,~A");
c$.checkSpecialInZip = Clazz.defineMethod (c$, "checkSpecialInZip", 
function (zipDirectory) {
var name;
return (zipDirectory.length < 2 ? null : (name = zipDirectory[1]).endsWith (".spardir/") || zipDirectory.length == 2 ? ["", (name.endsWith ("/") ? name.substring (0, name.length - 1) : name)] : null);
}, "~A");
Clazz.overrideMethod (c$, "getCachedPngjBytes", 
function (fm, pathName) {
if (pathName.indexOf (".png") < 0) return null;
org.jmol.util.Logger.info ("FileManager checking PNGJ cache for " + pathName);
var shortName = org.jmol.io2.ZipUtil.shortSceneFilename (pathName);
if (fm.pngjCache == null && !this.cachePngjFile (fm, [pathName, null])) return null;
var pngjCache = fm.pngjCache;
var isMin = (pathName.indexOf (".min.") >= 0);
if (!isMin) {
var cName = fm.getCanonicalName (org.jmol.io.JmolBinary.getZipRoot (pathName));
if (!pngjCache.containsKey (cName) && !this.cachePngjFile (fm, [pathName, null])) return null;
if (pathName.indexOf ("|") < 0) shortName = cName;
}if (pngjCache.containsKey (shortName)) {
org.jmol.util.Logger.info ("FileManager using memory cache " + shortName);
return pngjCache.get (shortName);
}for (var key, $key = pngjCache.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) System.out.println (key);

System.out.println ("FileManager memory cache (" + pngjCache.size () + ") did not find " + pathName + " as " + shortName);
if (!isMin || !this.cachePngjFile (fm, [pathName, null])) return null;
org.jmol.util.Logger.info ("FileManager using memory cache " + shortName);
return pngjCache.get (shortName);
}, "org.jmol.viewer.FileManager,~S");
Clazz.overrideMethod (c$, "cachePngjFile", 
function (fm, data) {
var pngjCache = fm.pngjCache =  new java.util.Hashtable ();
data[1] = null;
if (data[0] == null) return false;
data[0] = org.jmol.io.JmolBinary.getZipRoot (data[0]);
var shortName = org.jmol.io2.ZipUtil.shortSceneFilename (data[0]);
try {
data[1] = this.cacheZipContents (org.jmol.io.JmolBinary.checkPngZipStream (fm.getBufferedInputStreamOrErrorMessageFromName (data[0], null, false, false, null, false)), shortName, fm.pngjCache);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
if (data[1] == null) return false;
var bytes = data[1].getBytes ();
pngjCache.put (fm.getCanonicalName (data[0]), bytes);
if (shortName.indexOf ("_scene_") >= 0) {
pngjCache.put (org.jmol.io2.ZipUtil.shortSceneFilename (data[0]), bytes);
bytes = pngjCache.remove (shortName + "|state.spt");
if (bytes != null) pngjCache.put (org.jmol.io2.ZipUtil.shortSceneFilename (data[0] + "|state.spt"), bytes);
}for (var key, $key = pngjCache.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) System.out.println (key);

return true;
}, "org.jmol.viewer.FileManager,~A");
c$.shortSceneFilename = Clazz.defineMethod (c$, "shortSceneFilename", 
($fz = function (pathName) {
var pt = pathName.indexOf ("_scene_") + 7;
if (pt < 7) return pathName;
var s = "";
if (pathName.endsWith ("|state.spt")) {
var pt1 = pathName.indexOf ('.', pt);
if (pt1 < 0) return pathName;
s = pathName.substring (pt, pt1);
}var pt2 = pathName.lastIndexOf ("|");
return pathName.substring (0, pt) + s + (pt2 > 0 ? pathName.substring (pt2) : "");
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineStatics (c$,
"SCENE_TAG", "###scene.spt###");
});
