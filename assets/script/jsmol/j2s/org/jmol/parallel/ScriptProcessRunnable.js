Clazz.declarePackage ("org.jmol.parallel");
Clazz.load (null, "org.jmol.parallel.ScriptProcessRunnable", ["org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parallelProcessor = null;
this.process = null;
this.processLock = null;
this.shapeManager = null;
Clazz.instantialize (this, arguments);
}, org.jmol.parallel, "ScriptProcessRunnable", null, Runnable);
Clazz.makeConstructor (c$, 
function (parallelProcessor, process, lock, shapeManager) {
this.parallelProcessor = parallelProcessor;
this.process = process;
this.processLock = lock;
this.shapeManager = shapeManager;
}, "org.jmol.parallel.ScriptParallelProcessor,org.jmol.parallel.ScriptProcess,~O,org.jmol.viewer.ShapeManager");
Clazz.overrideMethod (c$, "run", 
function () {
try {
if (this.parallelProcessor.error == null) {
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("Running process " + this.process.processName + " " + this.process.context.pc + " - " + (this.process.context.pcEnd - 1));
this.parallelProcessor.eval (this.process.context, this.shapeManager);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("Process " + this.process.processName + " complete");
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
if (this.parallelProcessor.tok != 364558) e.printStackTrace ();
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.parallelProcessor.clearShapeManager (er);
}
} else {
throw e$$;
}
} finally {
{
--this.parallelProcessor.counter;
this.processLock.notifyAll ();
}}
});
});
