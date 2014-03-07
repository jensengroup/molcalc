Clazz.declarePackage ("org.jmol.smiles");
Clazz.load (["java.lang.Exception"], "org.jmol.smiles.InvalidSmilesException", null, function () {
c$ = Clazz.declareType (org.jmol.smiles, "InvalidSmilesException", Exception);
c$.getLastError = Clazz.defineMethod (c$, "getLastError", 
function () {
return org.jmol.smiles.InvalidSmilesException.lastError;
});
c$.setLastError = Clazz.defineMethod (c$, "setLastError", 
function (message) {
($t$ = org.jmol.smiles.InvalidSmilesException.lastError = message, org.jmol.smiles.InvalidSmilesException.prototype.lastError = org.jmol.smiles.InvalidSmilesException.lastError, $t$);
}, "~S");
Clazz.makeConstructor (c$, 
function (message) {
Clazz.superConstructor (this, org.jmol.smiles.InvalidSmilesException, [message]);
($t$ = org.jmol.smiles.InvalidSmilesException.lastError = message, org.jmol.smiles.InvalidSmilesException.prototype.lastError = org.jmol.smiles.InvalidSmilesException.lastError, $t$);
this.printStackTrace ();
}, "~S");
Clazz.makeConstructor (c$, 
function (cause) {
Clazz.superConstructor (this, org.jmol.smiles.InvalidSmilesException, [cause]);
($t$ = org.jmol.smiles.InvalidSmilesException.lastError = cause.toString (), org.jmol.smiles.InvalidSmilesException.prototype.lastError = org.jmol.smiles.InvalidSmilesException.lastError, $t$);
}, "Throwable");
Clazz.makeConstructor (c$, 
function (message, cause) {
Clazz.superConstructor (this, org.jmol.smiles.InvalidSmilesException, [message, cause]);
($t$ = org.jmol.smiles.InvalidSmilesException.lastError = message + "\n" + cause.getCause (), org.jmol.smiles.InvalidSmilesException.prototype.lastError = org.jmol.smiles.InvalidSmilesException.lastError, $t$);
}, "~S,Throwable");
Clazz.defineStatics (c$,
"lastError", null);
});
