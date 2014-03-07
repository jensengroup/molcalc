Clazz.declarePackage ("org.jmol.parallel");
Clazz.load (["org.jmol.api.JmolParallelProcessor", "org.jmol.script.ScriptFunction", "java.util.ArrayList"], "org.jmol.parallel.ScriptParallelProcessor", ["java.util.concurrent.Executors", "org.jmol.parallel.ScriptProcess", "$.ScriptProcessRunnable", "org.jmol.util.Logger", "org.jmol.viewer.ShapeManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.counter = 0;
this.error = null;
this.lock = null;
this.processes = null;
Clazz.instantialize (this, arguments);
}, org.jmol.parallel, "ScriptParallelProcessor", org.jmol.script.ScriptFunction, org.jmol.api.JmolParallelProcessor);
Clazz.prepareFields (c$, function () {
this.lock =  new JavaObject ();
this.processes =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.parallel.ScriptParallelProcessor, []);
});
Clazz.overrideMethod (c$, "getExecutor", 
function () {
return java.util.concurrent.Executors.newCachedThreadPool ();
});
Clazz.overrideMethod (c$, "runAllProcesses", 
function (viewer) {
if (this.processes.size () == 0) return;
this.viewer = viewer;
var inParallel = !viewer.isParallel () && viewer.setParallel (true);
var vShapeManagers =  new java.util.ArrayList ();
this.error = null;
this.counter = 0;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("running " + this.processes.size () + " processes on " + org.jmol.viewer.Viewer.nProcessors + " processesors inParallel=" + inParallel);
this.counter = this.processes.size ();
for (var i = this.processes.size (); --i >= 0; ) {
var shapeManager = null;
if (inParallel) {
shapeManager =  new org.jmol.viewer.ShapeManager (viewer, viewer.getModelSet ());
vShapeManagers.add (shapeManager);
}this.runProcess (this.processes.remove (0), shapeManager);
}
{
while (this.counter > 0) {
try {
this.lock.wait ();
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
if (this.error != null) throw this.error;
}
}this.mergeResults (vShapeManagers);
viewer.setParallel (false);
}, "org.jmol.viewer.Viewer");
Clazz.defineMethod (c$, "mergeResults", 
function (vShapeManagers) {
try {
for (var i = 0; i < vShapeManagers.size (); i++) this.viewer.mergeShapes (vShapeManagers.get (i).getShapes ());

} catch (e) {
if (Clazz.exceptionOf (e, Error)) {
throw e;
} else {
throw e;
}
} finally {
this.counter = -1;
vShapeManagers = null;
}
}, "java.util.List");
Clazz.defineMethod (c$, "clearShapeManager", 
function (er) {
{
this.error = er;
this.notifyAll ();
}}, "Error");
Clazz.overrideMethod (c$, "addProcess", 
function (name, context) {
this.processes.add ( new org.jmol.parallel.ScriptProcess (name, context));
}, "~S,org.jmol.script.ScriptContext");
Clazz.defineMethod (c$, "runProcess", 
($fz = function (process, shapeManager) {
var r =  new org.jmol.parallel.ScriptProcessRunnable (this, process, this.lock, shapeManager);
var exec = (shapeManager == null ? null : this.viewer.getExecutor ());
if (exec != null) {
exec.execute (r);
} else {
r.run ();
}}, $fz.isPrivate = true, $fz), "org.jmol.parallel.ScriptProcess,org.jmol.viewer.ShapeManager");
Clazz.defineMethod (c$, "eval", 
function (context, shapeManager) {
this.viewer.evalParallel (context, shapeManager);
}, "org.jmol.script.ScriptContext,org.jmol.viewer.ShapeManager");
});
