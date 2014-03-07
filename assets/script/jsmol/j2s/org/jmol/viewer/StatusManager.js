Clazz.declarePackage ("org.jmol.viewer");
Clazz.load (["java.util.Hashtable"], "org.jmol.viewer.StatusManager", ["java.lang.Boolean", "$.Float", "java.util.ArrayList", "$.Collections", "org.jmol.api.Interface", "org.jmol.constant.EnumCallback", "org.jmol.util.Logger", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.jmolStatusListener = null;
this.jmolCallbackListener = null;
this.statusList = "";
this.allowStatusReporting = false;
this.messageQueue = null;
this.statusPtr = 0;
this.jmolScriptCallbacks = null;
this.minSyncRepeatMs = 100;
this.syncingScripts = false;
this.syncingMouse = false;
this.drivingSync = false;
this.isSynced = false;
this.syncDisabled = false;
this.stereoSync = false;
this.qualityJPG = -1;
this.qualityPNG = -1;
this.imageType = null;
Clazz.instantialize (this, arguments);
}, org.jmol.viewer, "StatusManager");
Clazz.prepareFields (c$, function () {
this.messageQueue =  new java.util.Hashtable ();
this.jmolScriptCallbacks =  new java.util.Hashtable ();
});
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
}, "org.jmol.viewer.Viewer");
Clazz.defineMethod (c$, "setAllowStatusReporting", 
function (TF) {
this.allowStatusReporting = TF;
}, "~B");
Clazz.defineMethod (c$, "getStatusList", 
function () {
return this.statusList;
});
Clazz.defineMethod (c$, "getMessageQueue", 
function () {
return this.messageQueue;
});
Clazz.defineMethod (c$, "recordStatus", 
($fz = function (statusName) {
return (this.allowStatusReporting && this.statusList.length > 0 && (this.statusList.equals ("all") || this.statusList.indexOf (statusName) >= 0));
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "setStatusChanged", 
($fz = function (statusName, intInfo, statusInfo, isReplace) {
if (!this.recordStatus (statusName)) return;
var msgRecord =  new java.util.ArrayList ();
msgRecord.add (Integer.$valueOf (++this.statusPtr));
msgRecord.add (statusName);
msgRecord.add (Integer.$valueOf (intInfo));
msgRecord.add (statusInfo);
var statusRecordSet = (isReplace ? null : this.messageQueue.get (statusName));
if (statusRecordSet == null) this.messageQueue.put (statusName, statusRecordSet =  new java.util.ArrayList ());
 else if (statusRecordSet.size () == org.jmol.viewer.StatusManager.MAXIMUM_QUEUE_LENGTH) statusRecordSet.remove (0);
statusRecordSet.add (msgRecord);
}, $fz.isPrivate = true, $fz), "~S,~N,~O,~B");
Clazz.defineMethod (c$, "getStatusChanged", 
function (newStatusList) {
var isRemove = (newStatusList.length > 0 && newStatusList.charAt (0) == '-');
var isAdd = (newStatusList.length > 0 && newStatusList.charAt (0) == '+');
var getList = false;
if (isRemove) {
this.statusList = org.jmol.util.TextFormat.simpleReplace (this.statusList, newStatusList.substring (1, newStatusList.length), "");
} else {
newStatusList = org.jmol.util.TextFormat.simpleReplace (newStatusList, "+", "");
if (this.statusList.equals (newStatusList) || isAdd && this.statusList.indexOf (newStatusList) >= 0) {
getList = true;
} else {
if (!isAdd) this.statusList = "";
this.statusList += newStatusList;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("StatusManager messageQueue = " + this.statusList);
}}var msgList = (getList ? java.util.Collections.list (java.util.Collections.enumeration (this.messageQueue.values ())) :  new java.util.ArrayList ());
this.messageQueue.clear ();
this.statusPtr = 0;
return msgList;
}, "~S");
Clazz.defineMethod (c$, "setJmolStatusListener", 
function (jmolStatusListener, jmolCallbackListener) {
this.jmolStatusListener = jmolStatusListener;
this.jmolCallbackListener = (jmolCallbackListener == null ? jmolStatusListener : jmolCallbackListener);
}, "org.jmol.api.JmolStatusListener,org.jmol.api.JmolCallbackListener");
Clazz.defineMethod (c$, "setJmolCallbackListener", 
function (jmolCallbackListener) {
this.jmolCallbackListener = jmolCallbackListener;
}, "org.jmol.api.JmolCallbackListener");
Clazz.defineMethod (c$, "jmolScriptCallback", 
($fz = function (callback) {
var s = this.jmolScriptCallbacks.get (callback);
if (s != null) this.viewer.evalStringQuietSync (s, true, false);
return s;
}, $fz.isPrivate = true, $fz), "org.jmol.constant.EnumCallback");
Clazz.defineMethod (c$, "setCallbackFunction", 
function (callbackType, callbackFunction) {
var callback = org.jmol.constant.EnumCallback.getCallback (callbackType);
if (callback != null) {
var pt = (callbackFunction == null ? 0 : callbackFunction.length > 7 && callbackFunction.toLowerCase ().indexOf ("script:") == 0 ? 7 : callbackFunction.length > 11 && callbackFunction.toLowerCase ().indexOf ("jmolscript:") == 0 ? 11 : 0);
if (pt == 0) this.jmolScriptCallbacks.remove (callback);
 else this.jmolScriptCallbacks.put (callback, callbackFunction.substring (pt).trim ());
}if (this.jmolCallbackListener != null) this.jmolCallbackListener.setCallbackFunction (callbackType, callbackFunction);
}, "~S,~S");
Clazz.defineMethod (c$, "notifyEnabled", 
($fz = function (type) {
return this.jmolCallbackListener != null && this.jmolCallbackListener.notifyEnabled (type);
}, $fz.isPrivate = true, $fz), "org.jmol.constant.EnumCallback");
Clazz.defineMethod (c$, "setStatusAppletReady", 
function (htmlName, isReady) {
var sJmol = (isReady ? this.jmolScriptCallback (org.jmol.constant.EnumCallback.APPLETREADY) : null);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.APPLETREADY)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.APPLETREADY, [sJmol, htmlName, Boolean.$valueOf (isReady), null]);
}, "~S,~B");
Clazz.defineMethod (c$, "setStatusAtomMoved", 
function (bsMoved) {
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.ATOMMOVED);
this.setStatusChanged ("atomMoved", -1, bsMoved, false);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.ATOMMOVED)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.ATOMMOVED, [sJmol, bsMoved]);
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setStatusAtomPicked", 
function (atomIndex, strInfo) {
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.PICK);
org.jmol.util.Logger.info ("setStatusAtomPicked(" + atomIndex + "," + strInfo + ")");
this.setStatusChanged ("atomPicked", atomIndex, strInfo, false);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.PICK)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.PICK, [sJmol, strInfo, Integer.$valueOf (atomIndex)]);
}, "~N,~S");
Clazz.defineMethod (c$, "setStatusClicked", 
function (x, y, action, clickCount, mode) {
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.CLICK);
if (!this.notifyEnabled (org.jmol.constant.EnumCallback.CLICK)) return action;
var m = [action, mode];
this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.CLICK, [sJmol, Integer.$valueOf (x), Integer.$valueOf (y), Integer.$valueOf (action), Integer.$valueOf (clickCount), m]);
return m[0];
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setStatusResized", 
function (width, height) {
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.RESIZE);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.RESIZE)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.RESIZE, [sJmol, Integer.$valueOf (width), Integer.$valueOf (height)]);
}, "~N,~N");
Clazz.defineMethod (c$, "setStatusAtomHovered", 
function (iatom, strInfo) {
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.HOVER);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.HOVER)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.HOVER, [sJmol, strInfo, Integer.$valueOf (iatom)]);
}, "~N,~S");
Clazz.defineMethod (c$, "setStatusObjectHovered", 
function (id, strInfo, pt) {
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.HOVER);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.HOVER)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.HOVER, [sJmol, strInfo, Integer.$valueOf (-1), id, Float.$valueOf (pt.x), Float.$valueOf (pt.y), Float.$valueOf (pt.z)]);
}, "~S,~S,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "setFileLoadStatus", 
function (fullPathName, fileName, modelName, errorMsg, ptLoad, doCallback, isAsync) {
if (fullPathName == null && "resetUndo".equals (fileName)) {
var appConsole = this.viewer.getProperty ("DATA_API", "getAppConsole", null);
if (appConsole != null) appConsole.zap ();
fileName = this.viewer.getZapName ();
}this.setStatusChanged ("fileLoaded", ptLoad, fullPathName, false);
if (errorMsg != null) this.setStatusChanged ("fileLoadError", ptLoad, errorMsg, false);
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.LOADSTRUCT);
if (doCallback && this.notifyEnabled (org.jmol.constant.EnumCallback.LOADSTRUCT)) {
var name = this.viewer.getParameter ("_smilesString");
if (name.length != 0) fileName = name;
this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.LOADSTRUCT, [sJmol, fullPathName, fileName, modelName, errorMsg, Integer.$valueOf (ptLoad), this.viewer.getParameter ("_modelNumber"), this.viewer.getModelNumberDotted (this.viewer.getModelCount () - 1), isAsync]);
}}, "~S,~S,~S,~S,~N,~B,Boolean");
Clazz.defineMethod (c$, "setStatusFrameChanged", 
function (frameNo, fileNo, modelNo, firstNo, lastNo) {
if (this.viewer.getModelSet () == null) return;
var isAnimationRunning = (frameNo <= -2);
var f = frameNo;
if (isAnimationRunning) f = -2 - f;
this.setStatusChanged ("frameChanged", frameNo, (f >= 0 ? this.viewer.getModelNumberDotted (f) : ""), false);
var entryName = this.viewer.getMenuName (f);
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.ANIMFRAME);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.ANIMFRAME)) {
this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.ANIMFRAME, [sJmol, [frameNo, fileNo, modelNo, firstNo, lastNo], entryName]);
}if (this.viewer.jmolpopup != null && !isAnimationRunning) this.viewer.jmolpopup.jpiUpdateComputedMenus ();
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setScriptEcho", 
function (strEcho, isScriptQueued) {
if (strEcho == null) return;
this.setStatusChanged ("scriptEcho", 0, strEcho, false);
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.ECHO);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.ECHO)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.ECHO, [sJmol, strEcho, Integer.$valueOf (isScriptQueued ? 1 : 0)]);
}, "~S,~B");
Clazz.defineMethod (c$, "setStatusMeasuring", 
function (status, intInfo, strMeasure, value) {
this.setStatusChanged (status, intInfo, strMeasure, false);
var sJmol = null;
if (status.equals ("measureCompleted")) {
org.jmol.util.Logger.info ("measurement[" + intInfo + "] = " + strMeasure);
sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.MEASURE);
} else if (status.equals ("measurePicked")) {
this.setStatusChanged ("measurePicked", intInfo, strMeasure, false);
org.jmol.util.Logger.info ("measurePicked " + intInfo + " " + strMeasure);
}if (this.notifyEnabled (org.jmol.constant.EnumCallback.MEASURE)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.MEASURE, [sJmol, strMeasure, Integer.$valueOf (intInfo), status, Float.$valueOf (value)]);
}, "~S,~N,~S,~N");
Clazz.defineMethod (c$, "notifyError", 
function (errType, errMsg, errMsgUntranslated) {
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.ERROR);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.ERROR)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.ERROR, [sJmol, errType, errMsg, this.viewer.getShapeErrorState (), errMsgUntranslated]);
}, "~S,~S,~S");
Clazz.defineMethod (c$, "notifyMinimizationStatus", 
function (minStatus, minSteps, minEnergy, minEnergyDiff, ff) {
var sJmol = this.jmolScriptCallback (org.jmol.constant.EnumCallback.MINIMIZATION);
if (this.notifyEnabled (org.jmol.constant.EnumCallback.MINIMIZATION)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.MINIMIZATION, [sJmol, minStatus, minSteps, minEnergy, minEnergyDiff, ff]);
}, "~S,Integer,Float,Float,~S");
Clazz.defineMethod (c$, "setScriptStatus", 
function (strStatus, statusMessage, msWalltime, strErrorMessageUntranslated) {
if (msWalltime < -1) {
var iscript = -2 - msWalltime;
this.setStatusChanged ("scriptStarted", iscript, statusMessage, false);
strStatus = "script " + iscript + " started";
} else if (strStatus == null) {
return;
}var sJmol = (msWalltime == 0 ? this.jmolScriptCallback (org.jmol.constant.EnumCallback.SCRIPT) : null);
var isScriptCompletion = (strStatus === "Script completed");
if (this.recordStatus ("script")) {
var isError = (strErrorMessageUntranslated != null);
this.setStatusChanged ((isError ? "scriptError" : "scriptStatus"), 0, strStatus, false);
if (isError || isScriptCompletion) this.setStatusChanged ("scriptTerminated", 1, "Jmol script terminated" + (isError ? " unsuccessfully: " + strStatus : " successfully"), false);
}var data;
if (isScriptCompletion && this.viewer.getMessageStyleChime () && this.viewer.getDebugScript ()) {
data = [null, "script <exiting>", statusMessage, Integer.$valueOf (-1), strErrorMessageUntranslated];
if (this.notifyEnabled (org.jmol.constant.EnumCallback.SCRIPT)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.SCRIPT, data);
this.processScript (data);
strStatus = "Jmol script completed.";
}data = [sJmol, strStatus, statusMessage, Integer.$valueOf (isScriptCompletion ? -1 : msWalltime), strErrorMessageUntranslated];
if (this.notifyEnabled (org.jmol.constant.EnumCallback.SCRIPT)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.SCRIPT, data);
this.processScript (data);
}, "~S,~S,~N,~S");
Clazz.defineMethod (c$, "processScript", 
($fz = function (data) {
var msWalltime = (data[3]).intValue ();
if (this.viewer.scriptEditor != null) {
if (msWalltime > 0) {
this.viewer.scriptEditor.notifyScriptTermination ();
} else if (msWalltime < 0) {
if (msWalltime == -2) this.viewer.scriptEditor.notifyScriptStart ();
} else if (this.viewer.scriptEditor.isVisible () && (data[2]).length > 0) {
this.viewer.scriptEditor.notifyContext (this.viewer.getProperty ("DATA_API", "scriptContext", null), data);
}}if (this.viewer.appConsole != null) {
if (msWalltime == 0) {
var strInfo = (data[1] == null ? null : data[1].toString ());
this.viewer.appConsole.sendConsoleMessage (strInfo);
}}}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "doSync", 
function () {
return (this.isSynced && this.drivingSync && !this.syncDisabled);
});
Clazz.defineMethod (c$, "setSync", 
function (mouseCommand) {
if (this.syncingMouse) {
if (mouseCommand != null) this.syncSend (mouseCommand, "*", 0);
} else if (!this.syncingScripts) this.syncSend ("!" + this.viewer.getMoveToText (this.minSyncRepeatMs / 1000), "*", 0);
}, "~S");
Clazz.defineMethod (c$, "setSyncDriver", 
function (syncMode) {
if (this.stereoSync && syncMode != 4) {
this.syncSend ("SET_GRAPHICS_OFF", "*", 0);
this.stereoSync = false;
}switch (syncMode) {
case 4:
if (!this.syncDisabled) return;
this.syncDisabled = false;
break;
case 3:
this.syncDisabled = true;
break;
case 5:
this.drivingSync = true;
this.isSynced = true;
this.stereoSync = true;
break;
case 1:
this.drivingSync = true;
this.isSynced = true;
break;
case 2:
this.drivingSync = false;
this.isSynced = true;
break;
default:
this.drivingSync = false;
this.isSynced = false;
}
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug (this.viewer.getHtmlName () + " sync mode=" + syncMode + "; synced? " + this.isSynced + "; driving? " + this.drivingSync + "; disabled? " + this.syncDisabled);
}}, "~N");
Clazz.defineMethod (c$, "syncSend", 
function (script, appletName, port) {
if (port != 0 || this.notifyEnabled (org.jmol.constant.EnumCallback.SYNC)) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.SYNC, [null, script, appletName, Integer.$valueOf (port)]);
}, "~S,~S,~N");
Clazz.defineMethod (c$, "getSyncMode", 
function () {
return (!this.isSynced ? 0 : this.drivingSync ? 1 : 2);
});
Clazz.defineMethod (c$, "showUrl", 
function (urlString) {
if (this.jmolStatusListener != null) this.jmolStatusListener.showUrl (urlString);
}, "~S");
Clazz.defineMethod (c$, "clearConsole", 
function () {
if (this.viewer.appConsole != null) {
this.viewer.appConsole.sendConsoleMessage (null);
}if (this.jmolStatusListener != null) this.jmolCallbackListener.notifyCallback (org.jmol.constant.EnumCallback.MESSAGE, null);
});
Clazz.defineMethod (c$, "functionXY", 
function (functionName, nX, nY) {
return (this.jmolStatusListener == null ?  Clazz.newFloatArray (Math.abs (nX), Math.abs (nY), 0) : this.jmolStatusListener.functionXY (functionName, nX, nY));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "functionXYZ", 
function (functionName, nX, nY, nZ) {
return (this.jmolStatusListener == null ?  Clazz.newFloatArray (Math.abs (nX), Math.abs (nY), Math.abs (nY), 0) : this.jmolStatusListener.functionXYZ (functionName, nX, nY, nZ));
}, "~S,~N,~N,~N");
Clazz.defineMethod (c$, "jsEval", 
function (strEval) {
return (this.jmolStatusListener == null ? "" : this.jmolStatusListener.eval (strEval));
}, "~S");
Clazz.defineMethod (c$, "createImage", 
function (fileNameOrError, type, text, bytes, quality) {
return (this.jmolStatusListener == null ? null : this.jmolStatusListener.createImage (fileNameOrError, type, text == null ? bytes : text, quality));
}, "~S,~S,~S,~A,~N");
Clazz.defineMethod (c$, "getRegistryInfo", 
function () {
return (this.jmolStatusListener == null ? null : this.jmolStatusListener.getRegistryInfo ());
});
Clazz.defineMethod (c$, "dialogAsk", 
function (type, fileName) {
var isImage = (type.startsWith ("saveImage"));
var sd = org.jmol.api.Interface.getOptionInterface ("export.dialog.Dialog");
if (sd == null) return null;
sd.setupUI (false);
if (isImage) sd.setImageInfo (this.qualityJPG, this.qualityPNG, this.imageType);
var outputFileName = sd.getFileNameFromDialog (this.viewer, type, fileName);
if (isImage && outputFileName != null) {
this.qualityJPG = sd.getQuality ("JPG");
this.qualityPNG = sd.getQuality ("PNG");
var sType = sd.getType ();
if (sType != null) this.imageType = sType;
}return outputFileName;
}, "~S,~S");
Clazz.defineMethod (c$, "getJspecViewProperties", 
function (myParam) {
return (this.jmolStatusListener == null ? null : this.jmolStatusListener.getProperty ("JSpecView" + (myParam == null || myParam.length == 0 ? "" : ":" + myParam)));
}, "~S");
Clazz.defineStatics (c$,
"MAXIMUM_QUEUE_LENGTH", 16,
"SYNC_OFF", 0,
"SYNC_DRIVER", 1,
"SYNC_SLAVE", 2,
"SYNC_DISABLE", 3,
"SYNC_ENABLE", 4,
"SYNC_STEREO", 5);
});
