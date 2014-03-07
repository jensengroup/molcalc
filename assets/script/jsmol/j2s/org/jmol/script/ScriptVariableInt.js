Clazz.declarePackage ("org.jmol.script");
Clazz.load (["org.jmol.script.ScriptVariable"], "org.jmol.script.ScriptVariableInt", null, function () {
c$ = Clazz.declareType (org.jmol.script, "ScriptVariableInt", org.jmol.script.ScriptVariable);
Clazz.makeConstructor (c$, 
function (intValue) {
Clazz.superConstructor (this, org.jmol.script.ScriptVariableInt, [2]);
this.intValue = intValue;
}, "~N");
});
