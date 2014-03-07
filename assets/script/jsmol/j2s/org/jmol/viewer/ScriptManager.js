Clazz.declarePackage ("org.jmol.viewer");
Clazz.load (["java.util.ArrayList"], "org.jmol.viewer.ScriptManager", ["java.lang.Boolean", "$.Thread", "org.jmol.thread.CommandWatcherThread", "$.ScriptQueueThread", "org.jmol.util.Logger", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.queueThreads = null;
this.scriptQueueRunning = null;
this.commandWatcherThread = null;
this.scriptQueue = null;
this.useCommandWatcherThread = false;
Clazz.instantialize (this, arguments);
}, org.jmol.viewer, "ScriptManager");
Clazz.prepareFields (c$, function () {
this.queueThreads =  new Array (2);
this.scriptQueueRunning =  Clazz.newBooleanArray (2, false);
this.scriptQueue =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
}, "org.jmol.viewer.Viewer");
Clazz.defineMethod (c$, "clear", 
function () {
this.startCommandWatcher (false);
this.interruptQueueThreads ();
});
Clazz.defineMethod (c$, "addScript", 
function (strScript, isScriptFile, isQuiet) {
return this.addScript ("String", strScript, "", isScriptFile, isQuiet);
}, "~S,~B,~B");
Clazz.defineMethod (c$, "addScript", 
($fz = function (returnType, strScript, statusList, isScriptFile, isQuiet) {
{
this.useCommandWatcherThread = false;
//return this.viewer.evalStringWaitStatus(returnType, strScript, statusList, isScriptFile, isQuiet, true);
}if (!this.viewer.usingScriptQueue ()) {
this.clearQueue ();
this.viewer.haltScriptExecution ();
}if (this.commandWatcherThread == null && this.useCommandWatcherThread) this.startCommandWatcher (true);
if (this.commandWatcherThread != null && strScript.indexOf ("/*SPLIT*/") >= 0) {
var scripts = org.jmol.util.TextFormat.splitChars (strScript, "/*SPLIT*/");
for (var i = 0; i < scripts.length; i++) this.addScript (returnType, scripts[i], statusList, isScriptFile, isQuiet);

return "split into " + scripts.length + " sections for processing";
}var useCommandThread = (this.commandWatcherThread != null && (strScript.indexOf ("javascript") < 0 || strScript.indexOf ("#javascript ") >= 0));
var scriptItem =  new java.util.ArrayList ();
scriptItem.add (strScript);
scriptItem.add (statusList);
scriptItem.add (returnType);
scriptItem.add (isScriptFile ? Boolean.TRUE : Boolean.FALSE);
scriptItem.add (isQuiet ? Boolean.TRUE : Boolean.FALSE);
scriptItem.add (Integer.$valueOf (useCommandThread ? -1 : 1));
this.scriptQueue.add (scriptItem);
this.startScriptQueue (false);
return "pending";
}, $fz.isPrivate = true, $fz), "~S,~S,~S,~B,~B");
Clazz.defineMethod (c$, "clearQueue", 
function () {
this.scriptQueue.clear ();
});
Clazz.defineMethod (c$, "waitForQueue", 
function () {
if (this.viewer.isSingleThreaded) return;
var n = 0;
while (this.queueThreads[0] != null || this.queueThreads[1] != null) {
try {
Thread.sleep (100);
if (((n++) % 10) == 0) if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.info ("...scriptManager waiting for queue: " + this.scriptQueue.size () + " thread=" + Thread.currentThread ().getName ());
}} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
});
Clazz.defineMethod (c$, "flushQueue", 
function (command) {
for (var i = this.scriptQueue.size (); --i >= 0; ) {
var strScript = (this.scriptQueue.get (i).get (0));
if (strScript.indexOf (command) == 0) {
this.scriptQueue.remove (i);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug (this.scriptQueue.size () + " scripts; removed: " + strScript);
}}
}, "~S");
Clazz.defineMethod (c$, "startScriptQueue", 
($fz = function (startedByCommandWatcher) {
var pt = (startedByCommandWatcher ? 1 : 0);
if (this.scriptQueueRunning[pt]) return;
this.scriptQueueRunning[pt] = true;
this.queueThreads[pt] =  new org.jmol.thread.ScriptQueueThread (this, this.viewer, startedByCommandWatcher, pt);
this.queueThreads[pt].start ();
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "getScriptItem", 
function (watching, isByCommandWatcher) {
if (this.viewer.isSingleThreaded && this.viewer.queueOnHold) return null;
var scriptItem = this.scriptQueue.get (0);
var flag = ((scriptItem.get (5)).intValue ());
var isOK = (watching ? flag < 0 : isByCommandWatcher ? flag == 0 : flag == 1);
return (isOK ? scriptItem : null);
}, "~B,~B");
Clazz.defineMethod (c$, "startCommandWatcher", 
function (isStart) {
this.useCommandWatcherThread = isStart;
if (isStart) {
if (this.commandWatcherThread != null) return;
this.commandWatcherThread =  new org.jmol.thread.CommandWatcherThread (this.viewer, this);
this.commandWatcherThread.start ();
} else {
if (this.commandWatcherThread == null) return;
this.clearCommandWatcherThread ();
}if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.info ("command watcher " + (isStart ? "started" : "stopped") + this.commandWatcherThread);
}}, "~B");
Clazz.defineMethod (c$, "interruptQueueThreads", 
function () {
for (var i = 0; i < this.queueThreads.length; i++) {
if (this.queueThreads[i] != null) this.queueThreads[i].interrupt ();
}
});
Clazz.defineMethod (c$, "clearCommandWatcherThread", 
function () {
if (this.commandWatcherThread == null) return;
this.commandWatcherThread.interrupt ();
this.commandWatcherThread = null;
});
Clazz.defineMethod (c$, "queueThreadFinished", 
function (pt) {
this.queueThreads[pt].interrupt ();
this.scriptQueueRunning[pt] = false;
this.queueThreads[pt] = null;
this.viewer.setSyncDriver (4);
}, "~N");
Clazz.defineMethod (c$, "runScriptNow", 
function () {
if (this.scriptQueue.size () > 0) {
var scriptItem = this.getScriptItem (true, true);
if (scriptItem != null) {
scriptItem.set (5, Integer.$valueOf (0));
this.startScriptQueue (true);
}}});
});
