Clazz.declarePackage ("org.jmol.script");
Clazz.load (["java.lang.Exception"], "org.jmol.script.ScriptException", ["org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.eval = null;
this.message = null;
this.untranslated = null;
Clazz.instantialize (this, arguments);
}, org.jmol.script, "ScriptException", Exception);
Clazz.makeConstructor (c$, 
function (scriptEvaluator, msg, untranslated, isError) {
Clazz.superConstructor (this, org.jmol.script.ScriptException, []);
this.eval = scriptEvaluator;
this.message = msg;
if (!isError) return;
this.eval.errorType = msg;
this.eval.iCommandError = this.eval.pc;
this.untranslated = (untranslated == null ? msg : untranslated);
if (this.message == null) {
this.message = "";
return;
}var s = this.eval.getScriptContext ().getContextTrace (null, true).toString ();
while (this.eval.thisContext != null && !this.eval.thisContext.isTryCatch) this.eval.popContext (false, false);

this.message += s;
this.untranslated += s;
if (this.eval.thisContext != null || this.eval.isSyntaxCheck || msg.indexOf ("file recognized as a script file:") >= 0) return;
org.jmol.util.Logger.error ("eval ERROR: " + this.toString ());
if (this.eval.viewer.autoExit) this.eval.viewer.exitJmol ();
}, "org.jmol.script.ScriptEvaluator,~S,~S,~B");
Clazz.defineMethod (c$, "getErrorMessageUntranslated", 
function () {
return this.untranslated;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.message;
});
});
