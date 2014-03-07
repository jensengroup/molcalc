Clazz.declarePackage ("org.jmol.minimize.forcefield");
Clazz.load (["org.jmol.minimize.forcefield.ForceField", "org.jmol.script.Token"], "org.jmol.minimize.forcefield.ForceFieldUFF", ["java.util.ArrayList", "$.Hashtable", "org.jmol.minimize.forcefield.CalculationsUFF", "$.FFParam", "org.jmol.util.Elements", "$.Logger", "$.Parser"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsAromatic = null;
Clazz.instantialize (this, arguments);
}, org.jmol.minimize.forcefield, "ForceFieldUFF", org.jmol.minimize.forcefield.ForceField);
Clazz.makeConstructor (c$, 
function (minimizer) {
Clazz.superConstructor (this, org.jmol.minimize.forcefield.ForceFieldUFF, []);
this.minimizer = minimizer;
this.name = "UFF";
}, "org.jmol.minimize.Minimizer");
Clazz.overrideMethod (c$, "clear", 
function () {
this.bsAromatic = null;
});
Clazz.overrideMethod (c$, "setModel", 
function (bsElements, elemnoMax) {
this.setModelFields ();
org.jmol.util.Logger.info ("minimize: setting atom types...");
if (org.jmol.minimize.forcefield.ForceFieldUFF.atomTypes == null && (($t$ = org.jmol.minimize.forcefield.ForceFieldUFF.atomTypes = this.getAtomTypes (), org.jmol.minimize.forcefield.ForceFieldUFF.prototype.atomTypes = org.jmol.minimize.forcefield.ForceFieldUFF.atomTypes, $t$)) == null) return false;
if (org.jmol.minimize.forcefield.ForceFieldUFF.ffParams == null && (($t$ = org.jmol.minimize.forcefield.ForceFieldUFF.ffParams = this.getFFParameters (), org.jmol.minimize.forcefield.ForceFieldUFF.prototype.ffParams = org.jmol.minimize.forcefield.ForceFieldUFF.ffParams, $t$)) == null) return false;
this.setAtomTypes (bsElements, elemnoMax);
this.calc =  new org.jmol.minimize.forcefield.CalculationsUFF (this, org.jmol.minimize.forcefield.ForceFieldUFF.ffParams, this.minAtoms, this.minBonds, this.minAngles, this.minTorsions, this.minimizer.constraints);
return this.calc.setupCalculations ();
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "setAtomTypes", 
($fz = function (bsElements, elemnoMax) {
var nTypes = org.jmol.minimize.forcefield.ForceFieldUFF.atomTypes.size ();
bsElements.clear (0);
for (var i = 0; i < nTypes; i++) {
var data = org.jmol.minimize.forcefield.ForceFieldUFF.atomTypes.get (i);
var smarts = data[0];
if (smarts == null) continue;
var search = this.getSearch (smarts, elemnoMax, bsElements);
if (bsElements.get (0)) bsElements.clear (0);
 else if (search == null) break;
 else for (var j = this.minimizer.bsAtoms.nextSetBit (0), pt = 0; j < this.minimizer.atoms.length && j >= 0; j = this.minimizer.bsAtoms.nextSetBit (j + 1), pt++) if (search.get (j)) this.minAtoms[pt].sType = data[1].intern ();

}
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "getSearch", 
($fz = function (smarts, elemnoMax, bsElements) {
var search = null;
var len = smarts.length;
search = org.jmol.minimize.forcefield.ForceFieldUFF.tokenTypes[0];
var n = smarts.charCodeAt (len - 2) - 48;
var elemNo = 0;
if (n >= 10) n = 0;
var isAromatic = false;
if (smarts.charAt (1) == '#') {
elemNo = org.jmol.util.Parser.parseInt (smarts.substring (2, len - 1));
} else {
var s = smarts.substring (1, (n > 0 ? len - 3 : len - 1));
if (s.equals (s.toLowerCase ())) {
s = s.toUpperCase ();
isAromatic = true;
}elemNo = org.jmol.util.Elements.elementNumberFromSymbol (s, false);
}if (elemNo > elemnoMax) return null;
if (!bsElements.get (elemNo)) {
bsElements.set (0);
return null;
}switch (smarts.charAt (len - 3)) {
case 'D':
search = org.jmol.minimize.forcefield.ForceFieldUFF.tokenTypes[2];
search[6].intValue = n;
break;
case '^':
search = org.jmol.minimize.forcefield.ForceFieldUFF.tokenTypes[4 + (n - 1)];
break;
case '+':
search = org.jmol.minimize.forcefield.ForceFieldUFF.tokenTypes[1];
search[5].intValue = n;
break;
case '-':
search = org.jmol.minimize.forcefield.ForceFieldUFF.tokenTypes[1];
search[5].intValue = -n;
break;
case 'A':
search = org.jmol.minimize.forcefield.ForceFieldUFF.tokenTypes[6];
break;
}
search[2].intValue = elemNo;
var v = this.minimizer.viewer.evaluateExpression (search);
if (!(Clazz.instanceOf (v, org.jmol.util.BitSet))) return null;
var bs = v;
if (isAromatic && bs.cardinality () > 0) {
if (this.bsAromatic == null) this.bsAromatic = this.minimizer.viewer.evaluateExpression (org.jmol.minimize.forcefield.ForceFieldUFF.tokenTypes[3]);
bs.and (this.bsAromatic);
}if (org.jmol.util.Logger.debugging && bs.cardinality () > 0) org.jmol.util.Logger.debug (smarts + " minimize atoms=" + bs);
return bs;
}, $fz.isPrivate = true, $fz), "~S,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getFFParameters", 
($fz = function () {
var ffParam;
var temp =  new java.util.Hashtable ();
var fileName = "UFF.txt";
var br = null;
try {
br = this.getBufferedReader (fileName);
var line;
while ((line = br.readLine ()) != null) {
var vs = org.jmol.util.Parser.getTokens (line);
if (vs.length < 13) continue;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info (line);
if (line.substring (0, 5).equals ("param")) {
ffParam =  new org.jmol.minimize.forcefield.FFParam ();
temp.put (vs[1], ffParam);
ffParam.dVal =  Clazz.newDoubleArray (11, 0);
ffParam.sVal =  new Array (1);
ffParam.sVal[0] = vs[1];
ffParam.dVal[0] = org.jmol.util.Parser.parseFloatStr (vs[2]);
ffParam.dVal[1] = org.jmol.util.Parser.parseFloatStr (vs[3]) * 0.017453292519943295;
ffParam.dVal[2] = org.jmol.util.Parser.parseFloatStr (vs[4]);
ffParam.dVal[3] = org.jmol.util.Parser.parseFloatStr (vs[5]);
ffParam.dVal[4] = org.jmol.util.Parser.parseFloatStr (vs[6]);
ffParam.dVal[5] = org.jmol.util.Parser.parseFloatStr (vs[7]);
ffParam.dVal[6] = org.jmol.util.Parser.parseFloatStr (vs[8]);
ffParam.dVal[7] = org.jmol.util.Parser.parseFloatStr (vs[9]);
ffParam.dVal[8] = org.jmol.util.Parser.parseFloatStr (vs[10]);
ffParam.dVal[9] = org.jmol.util.Parser.parseFloatStr (vs[11]);
ffParam.dVal[10] = org.jmol.util.Parser.parseFloatStr (vs[12]);
ffParam.iVal =  Clazz.newIntArray (1, 0);
var coord = (vs[1].length > 2 ? vs[1].charAt (2) : '1');
switch (coord) {
case 'R':
coord = '2';
break;
default:
coord = '1';
break;
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
break;
}
ffParam.iVal[0] = coord.charCodeAt (0) - 48;
}}
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + fileName);
try {
br.close ();
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
return null;
} else {
throw e;
}
}
org.jmol.util.Logger.info (temp.size () + " atom types read from " + fileName);
return temp;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAtomTypes", 
($fz = function () {
var types =  new java.util.ArrayList ();
var fileName = "UFF.txt";
try {
var br = this.getBufferedReader (fileName);
var line;
while ((line = br.readLine ()) != null) {
if (line.length > 4 && line.substring (0, 4).equals ("atom")) {
var vs = org.jmol.util.Parser.getTokens (line);
var info = [vs[1], vs[2]];
types.add (info);
}}
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + fileName);
} else {
throw e;
}
}
org.jmol.util.Logger.info (types.size () + " UFF parameters read");
return (types.size () > 0 ? types : null);
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"atomTypes", null,
"ffParams", null,
"TOKEN_ELEMENT_ONLY", 0,
"TOKEN_ELEMENT_CHARGED", 1,
"TOKEN_ELEMENT_CONNECTED", 2,
"TOKEN_AROMATIC", 3,
"TOKEN_ELEMENT_SP", 4,
"TOKEN_ELEMENT_ALLYLIC", 6,
"PT_ELEMENT", 2,
"PT_CHARGE", 5,
"PT_CONNECT", 6);
c$.tokenTypes = c$.prototype.tokenTypes = [[org.jmol.script.Token.tokenExpressionBegin, org.jmol.script.Token.newToken (269484436, 1095763976), org.jmol.script.Token.intToken (0), org.jmol.script.Token.tokenExpressionEnd], [org.jmol.script.Token.tokenExpressionBegin, org.jmol.script.Token.newToken (269484436, 1095763976), org.jmol.script.Token.intToken (0), org.jmol.script.Token.tokenAnd, org.jmol.script.Token.newToken (269484436, 1632634889), org.jmol.script.Token.intToken (0), org.jmol.script.Token.tokenExpressionEnd], [org.jmol.script.Token.tokenExpressionBegin, org.jmol.script.Token.newToken (269484436, 1095763976), org.jmol.script.Token.intToken (0), org.jmol.script.Token.tokenAnd, org.jmol.script.Token.tokenConnected, org.jmol.script.Token.tokenLeftParen, org.jmol.script.Token.intToken (0), org.jmol.script.Token.tokenRightParen, org.jmol.script.Token.tokenExpressionEnd], [org.jmol.script.Token.tokenExpressionBegin, org.jmol.script.Token.newTokenObj (1073741824, "flatring"), org.jmol.script.Token.tokenExpressionEnd], [org.jmol.script.Token.tokenExpressionBegin, org.jmol.script.Token.newToken (269484436, 1095763976), org.jmol.script.Token.intToken (0), org.jmol.script.Token.tokenAnd, org.jmol.script.Token.tokenLeftParen, org.jmol.script.Token.tokenConnected, org.jmol.script.Token.tokenLeftParen, org.jmol.script.Token.intToken (1), org.jmol.script.Token.tokenComma, org.jmol.script.Token.newTokenObj (4, "triple"), org.jmol.script.Token.tokenRightParen, org.jmol.script.Token.tokenOr, org.jmol.script.Token.tokenConnected, org.jmol.script.Token.tokenLeftParen, org.jmol.script.Token.intToken (2), org.jmol.script.Token.tokenComma, org.jmol.script.Token.newTokenObj (4, "double"), org.jmol.script.Token.tokenRightParen, org.jmol.script.Token.tokenRightParen, org.jmol.script.Token.tokenExpressionEnd], [org.jmol.script.Token.tokenExpressionBegin, org.jmol.script.Token.newToken (269484436, 1095763976), org.jmol.script.Token.intToken (0), org.jmol.script.Token.tokenAnd, org.jmol.script.Token.newTokenObj (135266310, "connected"), org.jmol.script.Token.tokenLeftParen, org.jmol.script.Token.intToken (1), org.jmol.script.Token.tokenComma, org.jmol.script.Token.newTokenObj (4, "double"), org.jmol.script.Token.tokenRightParen, org.jmol.script.Token.tokenExpressionEnd], [org.jmol.script.Token.tokenExpressionBegin, org.jmol.script.Token.newToken (269484436, 1095763976), org.jmol.script.Token.intToken (0), org.jmol.script.Token.tokenAnd, org.jmol.script.Token.tokenConnected, org.jmol.script.Token.tokenLeftParen, org.jmol.script.Token.intToken (3), org.jmol.script.Token.tokenRightParen, org.jmol.script.Token.tokenAnd, org.jmol.script.Token.tokenConnected, org.jmol.script.Token.tokenLeftParen, org.jmol.script.Token.tokenConnected, org.jmol.script.Token.tokenLeftParen, org.jmol.script.Token.newTokenObj (4, "double"), org.jmol.script.Token.tokenRightParen, org.jmol.script.Token.tokenRightParen, org.jmol.script.Token.tokenExpressionEnd]];
});
