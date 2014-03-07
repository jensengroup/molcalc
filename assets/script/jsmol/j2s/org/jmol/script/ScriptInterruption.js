Clazz.declarePackage ("org.jmol.script");
Clazz.load (["org.jmol.script.ScriptException"], "org.jmol.script.ScriptInterruption", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.willResume = false;
Clazz.instantialize (this, arguments);
}, org.jmol.script, "ScriptInterruption", org.jmol.script.ScriptException);
Clazz.makeConstructor (c$, 
function (eval, why, millis) {
Clazz.superConstructor (this, org.jmol.script.ScriptInterruption, [eval, why, "!", eval.viewer.autoExit]);
this.willResume = (millis != 2147483647);
if (why.equals ("delay")) eval.viewer.delayScript (eval, millis);
}, "org.jmol.script.ScriptEvaluator,~S,~N");
});
