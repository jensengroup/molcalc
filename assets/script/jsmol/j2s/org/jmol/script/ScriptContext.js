Clazz.declarePackage ("org.jmol.script");
Clazz.load (null, "org.jmol.script.ScriptContext", ["org.jmol.script.ScriptEvaluator", "org.jmol.util.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fullpath = "";
this.scriptFileName = null;
this.parallelProcessor = null;
this.functionName = null;
this.script = null;
this.lineNumbers = null;
this.lineIndices = null;
this.aatoken = null;
this.statement = null;
this.statementLength = 0;
this.pc = 0;
this.pcEnd = 2147483647;
this.lineEnd = 2147483647;
this.iToken = 0;
this.outputBuffer = null;
this.contextVariables = null;
this.isFunction = false;
this.isStateScript = false;
this.isTryCatch = false;
this.errorMessage = null;
this.errorMessageUntranslated = null;
this.iCommandError = -1;
this.errorType = null;
this.scriptLevel = 0;
this.isSyntaxCheck = false;
this.executionStepping = false;
this.executionPaused = false;
this.scriptExtensions = null;
this.contextPath = " >> ";
this.parentContext = null;
this.token = null;
this.mustResumeEval = false;
this.isJSThread = false;
this.allowJSThreads = false;
this.displayLoadErrorsSave = false;
this.tryPt = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.script, "ScriptContext");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getContextTrace", 
function (sb, isTop) {
if (sb == null) sb =  new org.jmol.util.StringXBuilder ();
sb.append (org.jmol.script.ScriptEvaluator.setErrorLineMessage (this.functionName, this.scriptFileName, this.lineNumbers[this.pc], this.pc, org.jmol.script.ScriptEvaluator.statementAsString (this.statement, (isTop ? this.iToken : 9999), false)));
if (this.parentContext != null) this.parentContext.getContextTrace (sb, false);
return sb;
}, "org.jmol.util.StringXBuilder,~B");
});
