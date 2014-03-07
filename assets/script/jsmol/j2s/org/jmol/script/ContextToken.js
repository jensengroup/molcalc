Clazz.declarePackage ("org.jmol.script");
Clazz.load (["org.jmol.script.Token"], "org.jmol.script.ContextToken", ["java.util.Hashtable", "org.jmol.script.ScriptCompiler"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contextVariables = null;
this.name0 = null;
Clazz.instantialize (this, arguments);
}, org.jmol.script, "ContextToken", org.jmol.script.Token);
Clazz.makeConstructor (c$, 
function (tok, intValue, value) {
Clazz.superConstructor (this, org.jmol.script.ContextToken, [tok]);
this.intValue = intValue;
this.value = value;
}, "~N,~N,~O");
Clazz.makeConstructor (c$, 
function (tok, value) {
Clazz.superConstructor (this, org.jmol.script.ContextToken, [tok]);
this.value = value;
if (tok == 102410) this.addName ("_var");
}, "~N,~O");
Clazz.defineMethod (c$, "addName", 
function (name) {
if (this.contextVariables == null) this.contextVariables =  new java.util.Hashtable ();
org.jmol.script.ScriptCompiler.addContextVariable (this.contextVariables, name);
}, "~S");
});
