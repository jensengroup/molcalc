Clazz.declarePackage ("org.jmol.viewer");
Clazz.load (null, "org.jmol.viewer.PropertyManager", ["java.lang.Float", "java.util.ArrayList", "$.Arrays", "$.Hashtable", "org.jmol.script.ScriptEvaluator", "$.ScriptVariable", "$.ScriptVariableInt", "$.Token", "org.jmol.util.Escape", "$.Logger", "$.Parser", "$.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.declareType (org.jmol.viewer, "PropertyManager");
c$.getPropertyNumber = Clazz.defineMethod (c$, "getPropertyNumber", 
function (infoType) {
if (infoType == null) return -1;
for (var i = 0; i < 39; i++) if (infoType.equalsIgnoreCase (org.jmol.viewer.PropertyManager.getPropertyName (i))) return i;

return -1;
}, "~S");
c$.getDefaultParam = Clazz.defineMethod (c$, "getDefaultParam", 
function (propID) {
if (propID < 0) return "";
return org.jmol.viewer.PropertyManager.propertyTypes[propID * 3 + 2];
}, "~N");
c$.acceptsStringParameter = Clazz.defineMethod (c$, "acceptsStringParameter", 
function (name) {
var propID = org.jmol.viewer.PropertyManager.getPropertyNumber (name);
var type = org.jmol.viewer.PropertyManager.getParamType (propID);
return (type.length > 0 && type !== "<atom selection>");
}, "~S");
c$.getProperty = Clazz.defineMethod (c$, "getProperty", 
function (viewer, returnType, infoType, paramInfo) {
if (org.jmol.viewer.PropertyManager.propertyTypes.length != 117) org.jmol.util.Logger.warn ("propertyTypes is not the right length: " + org.jmol.viewer.PropertyManager.propertyTypes.length + " != " + 117);
var info;
if (infoType.indexOf (".") >= 0 || infoType.indexOf ("[") >= 0) {
info = org.jmol.viewer.PropertyManager.getModelProperty (viewer, infoType, paramInfo);
} else {
info = org.jmol.viewer.PropertyManager.getPropertyAsObject (viewer, infoType, paramInfo, returnType);
}if (returnType == null) return info;
var requestedReadable = returnType.equalsIgnoreCase ("readable");
if (requestedReadable) returnType = (org.jmol.viewer.PropertyManager.isReadableAsString (infoType) ? "String" : "JSON");
if (returnType.equalsIgnoreCase ("String")) return (info == null ? "" : info.toString ());
if (requestedReadable) return org.jmol.util.Escape.toReadable (infoType, info);
 else if (returnType.equalsIgnoreCase ("JSON")) return "{" + org.jmol.util.Escape.toJSON (infoType, info) + "}";
return info;
}, "org.jmol.viewer.Viewer,~S,~S,~O");
c$.getModelProperty = Clazz.defineMethod (c$, "getModelProperty", 
function (viewer, propertyName, propertyValue) {
propertyName = propertyName.$replace (']', ' ').$replace ('[', ' ').$replace ('.', ' ');
propertyName = org.jmol.util.TextFormat.simpleReplace (propertyName, "  ", " ");
var names = org.jmol.util.TextFormat.splitChars (org.jmol.util.TextFormat.trim (propertyName, " "), " ");
var args =  new Array (names.length);
propertyName = names[0];
var n;
for (var i = 1; i < names.length; i++) {
if ((n = org.jmol.util.Parser.parseInt (names[i])) != -2147483648) args[i] =  new org.jmol.script.ScriptVariableInt (n);
 else args[i] = org.jmol.script.ScriptVariable.newVariable (4, names[i]);
}
return org.jmol.viewer.PropertyManager.extractProperty (org.jmol.viewer.PropertyManager.getProperty (viewer, null, propertyName, propertyValue), args, 1);
}, "org.jmol.viewer.Viewer,~S,~O");
c$.extractProperty = Clazz.defineMethod (c$, "extractProperty", 
function (property, args, ptr) {
if (ptr >= args.length) return property;
var pt;
var arg = args[ptr++];
switch (arg.tok) {
case 2:
pt = arg.asInt () - 1;
if (Clazz.instanceOf (property, java.util.List)) {
var v = property;
if (pt < 0) pt += v.size ();
if (pt >= 0 && pt < v.size ()) return org.jmol.viewer.PropertyManager.extractProperty (v.get (pt), args, ptr);
return "";
}if (Clazz.instanceOf (property, org.jmol.util.Matrix3f)) {
var m = property;
var f = [[m.m00, m.m01, m.m02], [m.m10, m.m11, m.m12], [m.m20, m.m21, m.m22]];
if (pt < 0) pt += 3;
if (pt >= 0 && pt < 3) return org.jmol.viewer.PropertyManager.extractProperty (f, args, --ptr);
return "";
}if (org.jmol.util.Escape.isAI (property)) {
var ilist = property;
if (pt < 0) pt += ilist.length;
if (pt >= 0 && pt < ilist.length) return Integer.$valueOf (ilist[pt]);
return "";
}if (org.jmol.util.Escape.isAF (property)) {
var flist = property;
if (pt < 0) pt += flist.length;
if (pt >= 0 && pt < flist.length) return  new Float (flist[pt]);
return "";
}if (org.jmol.util.Escape.isAII (property)) {
var iilist = property;
if (pt < 0) pt += iilist.length;
if (pt >= 0 && pt < iilist.length) return org.jmol.viewer.PropertyManager.extractProperty (iilist[pt], args, ptr);
return "";
}if (org.jmol.util.Escape.isAFF (property)) {
var fflist = property;
if (pt < 0) pt += fflist.length;
if (pt >= 0 && pt < fflist.length) return org.jmol.viewer.PropertyManager.extractProperty (fflist[pt], args, ptr);
return "";
}if (org.jmol.util.Escape.isAS (property)) {
var slist = property;
if (pt < 0) pt += slist.length;
if (pt >= 0 && pt < slist.length) return slist[pt];
return "";
}if (Clazz.instanceOf (property, Array)) {
var olist = property;
if (pt < 0) pt += olist.length;
if (pt >= 0 && pt < olist.length) return olist[pt];
return "";
}break;
case 4:
var key = arg.asString ();
if (Clazz.instanceOf (property, java.util.Map)) {
var h = property;
if (key.equalsIgnoreCase ("keys")) {
var keys =  new java.util.ArrayList ();
var e = h.keySet ().iterator ();
while (e.hasNext ()) keys.add (e.next ());

return org.jmol.viewer.PropertyManager.extractProperty (keys, args, ptr);
}if (!h.containsKey (key)) {
var e = h.keySet ().iterator ();
var newKey = "";
while (e.hasNext ()) if ((newKey = e.next ()).equalsIgnoreCase (key)) {
key = newKey;
break;
}
}if (h.containsKey (key)) return org.jmol.viewer.PropertyManager.extractProperty (h.get (key), args, ptr);
return "";
}if (Clazz.instanceOf (property, java.util.List)) {
var v = property;
var v2 =  new java.util.ArrayList ();
ptr--;
for (pt = 0; pt < v.size (); pt++) {
var o = v.get (pt);
if (Clazz.instanceOf (o, java.util.Map)) v2.add (org.jmol.viewer.PropertyManager.extractProperty (o, args, ptr));
}
return v2;
}break;
}
return property;
}, "~O,~A,~N");
c$.getPropertyName = Clazz.defineMethod (c$, "getPropertyName", 
($fz = function (propID) {
if (propID < 0) return "";
return org.jmol.viewer.PropertyManager.propertyTypes[propID * 3];
}, $fz.isPrivate = true, $fz), "~N");
c$.getParamType = Clazz.defineMethod (c$, "getParamType", 
($fz = function (propID) {
if (propID < 0) return "";
return org.jmol.viewer.PropertyManager.propertyTypes[propID * 3 + 1];
}, $fz.isPrivate = true, $fz), "~N");
c$.isReadableAsString = Clazz.defineMethod (c$, "isReadableAsString", 
($fz = function (infoType) {
for (var i = org.jmol.viewer.PropertyManager.readableTypes.length; --i >= 0; ) if (infoType.equalsIgnoreCase (org.jmol.viewer.PropertyManager.readableTypes[i])) return true;

return false;
}, $fz.isPrivate = true, $fz), "~S");
c$.getPropertyAsObject = Clazz.defineMethod (c$, "getPropertyAsObject", 
($fz = function (viewer, infoType, paramInfo, returnType) {
if (infoType.equals ("tokenList")) {
return org.jmol.script.Token.getTokensLike (paramInfo);
}var id = org.jmol.viewer.PropertyManager.getPropertyNumber (infoType);
var iHaveParameter = (paramInfo != null && paramInfo.toString ().length > 0);
var myParam = (iHaveParameter ? paramInfo : org.jmol.viewer.PropertyManager.getDefaultParam (id));
switch (id) {
case 0:
return viewer.getAppletInfo ();
case 5:
return viewer.getAnimationInfo ();
case 13:
return viewer.getAtomBitSetVector (myParam);
case 14:
return viewer.getAllAtomInfo (myParam);
case 24:
return viewer.getAuxiliaryInfo (myParam);
case 15:
return viewer.getAllBondInfo (myParam);
case 25:
return viewer.getBoundBoxInfo ();
case 10:
return viewer.getRotationCenter ();
case 16:
return viewer.getAllChainInfo (myParam);
case 37:
return viewer.getProperty ("DATA_API", "consoleText", null);
case 38:
return viewer.getJspecViewProperties (myParam);
case 26:
return viewer.getData (myParam.toString ());
case 33:
return viewer.getErrorMessageUn ();
case 28:
return org.jmol.script.ScriptEvaluator.evaluateExpression (viewer, myParam.toString (), false);
case 20:
return viewer.getModelExtract (myParam, true, "MOL");
case 32:
return org.jmol.viewer.PropertyManager.getFileInfo (viewer.getFileData (), myParam.toString ());
case 1:
return viewer.getFullPathName ();
case 2:
return viewer.getFileHeader ();
case 4:
case 3:
if (iHaveParameter) return viewer.getFileAsString (myParam.toString ());
return viewer.getCurrentFileAsString ();
case 27:
var params = myParam.toString ();
var height = -1;
var width = -1;
var pt;
if ((pt = params.indexOf ("height=")) >= 0) height = org.jmol.util.Parser.parseInt (params.substring (pt + 7));
if ((pt = params.indexOf ("width=")) >= 0) width = org.jmol.util.Parser.parseInt (params.substring (pt + 6));
if (width < 0 && height < 0) height = width = -1;
 else if (width < 0) width = height;
 else height = width;
return viewer.getImageAs (returnType == null ? "JPEG" : "JPG64", -1, width, height, null, null);
case 35:
return viewer.getShapeProperty (23, "getInfo");
case 36:
return viewer.getShapeProperty (23, "getData");
case 21:
return viewer.getStatusChanged (myParam.toString ());
case 22:
return viewer;
case 7:
return viewer.getLigandInfo (myParam);
case 9:
return viewer.getMeasurementInfo ();
case 29:
return viewer.getMenu (myParam.toString ());
case 23:
return viewer.getMessageQueue ();
case 30:
return viewer.getMinimizationInfo ();
case 6:
return viewer.getModelInfo (myParam);
case 18:
return viewer.getMoleculeInfo (myParam);
case 34:
return viewer.getMouseInfo ();
case 11:
return viewer.getOrientationInfo ();
case 31:
return viewer.getPointGroupInfo (myParam);
case 17:
return viewer.getAllPolymerInfo (myParam);
case 8:
return viewer.getShapeInfo ();
case 19:
return viewer.getStateInfo (myParam.toString (), 0, 0);
case 12:
return viewer.getMatrixRotate ();
}
var data =  new Array (39);
for (var i = 0; i < 39; i++) {
var paramType = org.jmol.viewer.PropertyManager.getParamType (i);
var paramDefault = org.jmol.viewer.PropertyManager.getDefaultParam (i);
var name = org.jmol.viewer.PropertyManager.getPropertyName (i);
data[i] = (name.charAt (0) == 'X' ? "" : name + (paramType !== "" ? " " + org.jmol.viewer.PropertyManager.getParamType (i) + (paramDefault !== "" ? " #default: " + org.jmol.viewer.PropertyManager.getDefaultParam (i) : "") : ""));
}
java.util.Arrays.sort (data);
var info =  new org.jmol.util.StringXBuilder ();
info.append ("getProperty ERROR\n").append (infoType).append ("?\nOptions include:\n");
for (var i = 0; i < 39; i++) if (data[i].length > 0) info.append ("\n getProperty ").append (data[i]);

return info.toString ();
}, $fz.isPrivate = true, $fz), "org.jmol.viewer.Viewer,~S,~O,~S");
c$.getFileInfo = Clazz.defineMethod (c$, "getFileInfo", 
function (objHeader, type) {
var ht =  new java.util.Hashtable ();
if (objHeader == null) return ht;
var haveType = (type != null && type.length > 0);
if (Clazz.instanceOf (objHeader, java.util.Map)) {
return (haveType ? (objHeader).get (type) : objHeader);
}var lines = org.jmol.util.TextFormat.split (objHeader, '\n');
var keyLast = "";
var sb =  new org.jmol.util.StringXBuilder ();
if (haveType) type = type.toUpperCase ();
var key = "";
for (var i = 0; i < lines.length; i++) {
var line = lines[i];
if (line.length < 12) continue;
key = line.substring (0, 6).trim ();
var cont = line.substring (7, 10).trim ();
if (key.equals ("REMARK")) {
key += cont;
}if (!key.equals (keyLast)) {
if (haveType && keyLast.equals (type)) return sb.toString ();
if (!haveType) {
ht.put (keyLast, sb.toString ());
sb =  new org.jmol.util.StringXBuilder ();
}keyLast = key;
}if (!haveType || key.equals (type)) sb.append (line.substring (10).trim ()).appendC ('\n');
}
if (!haveType) {
ht.put (keyLast, sb.toString ());
}if (haveType) return (key.equals (type) ? sb.toString () : "");
return ht;
}, "~O,~S");
Clazz.defineStatics (c$,
"atomExpression", "<atom selection>");
c$.propertyTypes = c$.prototype.propertyTypes = ["appletInfo", "", "", "fileName", "", "", "fileHeader", "", "", "fileContents", "<pathname>", "", "fileContents", "", "", "animationInfo", "", "", "modelInfo", "<atom selection>", "{*}", "ligandInfo", "<atom selection>", "{*}", "shapeInfo", "", "", "measurementInfo", "", "", "centerInfo", "", "", "orientationInfo", "", "", "transformInfo", "", "", "atomList", "<atom selection>", "(visible)", "atomInfo", "<atom selection>", "(visible)", "bondInfo", "<atom selection>", "(visible)", "chainInfo", "<atom selection>", "(visible)", "polymerInfo", "<atom selection>", "(visible)", "moleculeInfo", "<atom selection>", "(visible)", "stateInfo", "<state type>", "all", "extractModel", "<atom selection>", "(visible)", "jmolStatus", "statusNameList", "", "jmolViewer", "", "", "messageQueue", "", "", "auxiliaryInfo", "<atom selection>", "{*}", "boundBoxInfo", "", "", "dataInfo", "<data type>", "types", "image", "", "", "evaluate", "<expression>", "", "menu", "<type>", "current", "minimizationInfo", "", "", "pointGroupInfo", "<atom selection>", "(visible)", "fileInfo", "<type>", "", "errorMessage", "", "", "mouseInfo", "", "", "isosurfaceInfo", "", "", "isosurfaceData", "", "", "consoleText", "", "", "jspecView", "<key>", ""];
Clazz.defineStatics (c$,
"PROP_APPLET_INFO", 0,
"PROP_FILENAME", 1,
"PROP_FILEHEADER", 2,
"PROP_FILECONTENTS_PATH", 3,
"PROP_FILECONTENTS", 4,
"PROP_ANIMATION_INFO", 5,
"PROP_MODEL_INFO", 6,
"PROP_LIGAND_INFO", 7,
"PROP_SHAPE_INFO", 8,
"PROP_MEASUREMENT_INFO", 9,
"PROP_CENTER_INFO", 10,
"PROP_ORIENTATION_INFO", 11,
"PROP_TRANSFORM_INFO", 12,
"PROP_ATOM_LIST", 13,
"PROP_ATOM_INFO", 14,
"PROP_BOND_INFO", 15,
"PROP_CHAIN_INFO", 16,
"PROP_POLYMER_INFO", 17,
"PROP_MOLECULE_INFO", 18,
"PROP_STATE_INFO", 19,
"PROP_EXTRACT_MODEL", 20,
"PROP_JMOL_STATUS", 21,
"PROP_JMOL_VIEWER", 22,
"PROP_MESSAGE_QUEUE", 23,
"PROP_AUXILIARY_INFO", 24,
"PROP_BOUNDBOX_INFO", 25,
"PROP_DATA_INFO", 26,
"PROP_IMAGE", 27,
"PROP_EVALUATE", 28,
"PROP_MENU", 29,
"PROP_MINIMIZATION_INFO", 30,
"PROP_POINTGROUP_INFO", 31,
"PROP_FILE_INFO", 32,
"PROP_ERROR_MESSAGE", 33,
"PROP_MOUSE_INFO", 34,
"PROP_ISOSURFACE_INFO", 35,
"PROP_ISOSURFACE_DATA", 36,
"PROP_CONSOLE_TEXT", 37,
"PROP_JSPECVIEW", 38,
"PROP_COUNT", 39,
"readableTypes", ["", "stateinfo", "extractmodel", "filecontents", "fileheader", "image", "menu", "minimizationInfo"]);
});
