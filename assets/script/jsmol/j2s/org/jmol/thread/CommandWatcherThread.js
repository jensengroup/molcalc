Clazz.declarePackage ("org.jmol.thread");
Clazz.load (["org.jmol.thread.JmolThread"], "org.jmol.thread.CommandWatcherThread", ["java.lang.Thread", "org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scriptManager = null;
Clazz.instantialize (this, arguments);
}, org.jmol.thread, "CommandWatcherThread", org.jmol.thread.JmolThread);
Clazz.makeConstructor (c$, 
function (viewer, scriptManager) {
Clazz.superConstructor (this, org.jmol.thread.CommandWatcherThread);
this.setViewer (viewer, "CommmandWatcherThread");
this.scriptManager = scriptManager;
}, "org.jmol.viewer.Viewer,org.jmol.viewer.ScriptManager");
Clazz.overrideMethod (c$, "run", 
function () {
Thread.currentThread ().setPriority (1);
while (!this.stopped) {
try {
Thread.sleep (50);
if (!this.stopped) {
this.scriptManager.runScriptNow ();
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, InterruptedException)) {
var ie = e$$;
{
org.jmol.util.Logger.warn ("CommandWatcher InterruptedException! " + this);
break;
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var ie = e$$;
{
var s = "script processing ERROR:\n\n" + ie.toString ();
for (var i = 0; i < ie.getStackTrace ().length; i++) {
s += "\n" + ie.getStackTrace ()[i].toString ();
}
org.jmol.util.Logger.warn ("CommandWatcher Exception! " + s);
break;
}
} else {
throw e$$;
}
}
}
});
Clazz.overrideMethod (c$, "run1", 
function (mode) {
}, "~N");
Clazz.defineStatics (c$,
"commandDelay", 50);
});
