Clazz.declarePackage ("org.jmol.script");
Clazz.load (null, "org.jmol.script.ScriptMathProcessor", ["java.lang.Float", "java.util.ArrayList", "$.Arrays", "$.Date", "$.Hashtable", "java.util.regex.Pattern", "org.jmol.atomdata.RadiusData", "org.jmol.constant.EnumVdw", "org.jmol.modelset.Bond", "$.MeasurementData", "org.jmol.script.ScriptEvaluator", "$.ScriptVariable", "$.ScriptVariableInt", "$.Token", "org.jmol.util.ArrayUtil", "$.AxisAngle4f", "$.BitSet", "$.BitSetUtil", "$.ColorEncoder", "$.ColorUtil", "$.Escape", "$.JmolMolecule", "$.Logger", "$.Matrix3f", "$.Matrix4f", "$.Measure", "$.Parser", "$.Point3f", "$.Point3fi", "$.Point4f", "$.Quaternion", "$.StringXBuilder", "$.TextFormat", "$.Vector3f", "org.jmol.viewer.PropertyManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isSyntaxCheck = false;
this.wasSyntaxCheck = false;
this.logMessages = false;
this.eval = null;
this.viewer = null;
this.oStack = null;
this.xStack = null;
this.ifStack = null;
this.ifPt = -1;
this.oPt = -1;
this.xPt = -1;
this.parenCount = 0;
this.squareCount = 0;
this.braceCount = 0;
this.wasX = false;
this.incrementX = 0;
this.isArrayItem = false;
this.asVector = false;
this.asBitSet = false;
this.ptid = 0;
this.ptx = 2147483647;
this.skipping = false;
this.haveSpaceBeforeSquare = false;
this.equalCount = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.script, "ScriptMathProcessor");
Clazz.prepareFields (c$, function () {
this.oStack =  new Array (8);
this.xStack =  new Array (8);
this.ifStack =  Clazz.newCharArray (8, '\0');
});
Clazz.makeConstructor (c$, 
function (eval, isArrayItem, asVector, asBitSet) {
this.eval = eval;
this.viewer = eval.viewer;
this.logMessages = eval.logMessages;
this.isSyntaxCheck = this.wasSyntaxCheck = eval.isSyntaxCheck;
this.isArrayItem = isArrayItem;
this.asVector = asVector || isArrayItem;
this.asBitSet = asBitSet;
this.wasX = isArrayItem;
if (this.logMessages) org.jmol.util.Logger.info ("initialize RPN");
}, "org.jmol.script.ScriptEvaluator,~B,~B,~B");
Clazz.defineMethod (c$, "getResult", 
function (allowUnderflow) {
var isOK = true;
while (isOK && this.oPt >= 0) isOK = this.operate ();

if (isOK) {
if (this.asVector) {
var result =  new java.util.ArrayList ();
for (var i = 0; i <= this.xPt; i++) result.add (org.jmol.script.ScriptVariable.selectItemVar (this.xStack[i]));

return org.jmol.script.ScriptVariable.newVariable (135198, result);
}if (this.xPt == 0) {
var x = this.xStack[0];
if (x.tok == 10 || x.tok == 7 || x.tok == 4 || x.tok == 11 || x.tok == 12) x = org.jmol.script.ScriptVariable.selectItemVar (x);
if (this.asBitSet && x.tok == 7) x = org.jmol.script.ScriptVariable.newVariable (10, org.jmol.script.ScriptVariable.unEscapeBitSetArray (x.value, false));
return x;
}}if (!allowUnderflow && (this.xPt >= 0 || this.oPt >= 0)) {
this.eval.error (22);
}return null;
}, "~B");
Clazz.defineMethod (c$, "putX", 
($fz = function (x) {
if (this.skipping) return;
if (++this.xPt == this.xStack.length) this.xStack = org.jmol.util.ArrayUtil.doubleLength (this.xStack);
if (this.logMessages) {
org.jmol.util.Logger.info ("\nputX: " + x);
}this.xStack[this.xPt] = x;
this.ptx = ++this.ptid;
}, $fz.isPrivate = true, $fz), "org.jmol.script.ScriptVariable");
Clazz.defineMethod (c$, "putOp", 
($fz = function (op) {
if (++this.oPt >= this.oStack.length) this.oStack = org.jmol.util.ArrayUtil.doubleLength (this.oStack);
this.oStack[this.oPt] = op;
this.ptid++;
}, $fz.isPrivate = true, $fz), "org.jmol.script.Token");
Clazz.defineMethod (c$, "putIf", 
($fz = function (c) {
if (++this.ifPt >= this.ifStack.length) this.ifStack = org.jmol.util.ArrayUtil.doubleLength (this.ifStack);
this.ifStack[this.ifPt] = c;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "addXVar", 
function (x) {
this.putX (x);
return this.wasX = true;
}, "org.jmol.script.ScriptVariable");
Clazz.defineMethod (c$, "addXObj", 
function (x) {
var v = org.jmol.script.ScriptVariable.getVariable (x);
if (v == null) return false;
this.putX (v);
return this.wasX = true;
}, "~O");
Clazz.defineMethod (c$, "addXStr", 
function (x) {
this.putX (org.jmol.script.ScriptVariable.newVariable (4, x));
return this.wasX = true;
}, "~S");
Clazz.defineMethod (c$, "addXBool", 
($fz = function (x) {
this.putX (org.jmol.script.ScriptVariable.getBoolean (x));
return this.wasX = true;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "addXInt", 
($fz = function (x) {
this.putX ( new org.jmol.script.ScriptVariableInt (x));
return this.wasX = true;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "addXList", 
($fz = function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableList (x));
return this.wasX = true;
}, $fz.isPrivate = true, $fz), "java.util.List");
Clazz.defineMethod (c$, "addXMap", 
($fz = function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableMap (x));
return this.wasX = true;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "addXM3", 
($fz = function (x) {
this.putX (org.jmol.script.ScriptVariable.newVariable (11, x));
return this.wasX = true;
}, $fz.isPrivate = true, $fz), "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "addXM4", 
($fz = function (x) {
this.putX (org.jmol.script.ScriptVariable.newVariable (12, x));
return this.wasX = true;
}, $fz.isPrivate = true, $fz), "org.jmol.util.Matrix4f");
Clazz.defineMethod (c$, "addXFloat", 
($fz = function (x) {
if (Float.isNaN (x)) return this.addXStr ("NaN");
this.putX (org.jmol.script.ScriptVariable.newVariable (3, Float.$valueOf (x)));
return this.wasX = true;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "addXBs", 
function (bs) {
this.putX (org.jmol.script.ScriptVariable.newVariable (10, bs));
return this.wasX = true;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "addXPt", 
function (pt) {
this.putX (org.jmol.script.ScriptVariable.newVariable (8, pt));
return this.wasX = true;
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "addXPt4", 
function (pt) {
this.putX (org.jmol.script.ScriptVariable.newVariable (9, pt));
return this.wasX = true;
}, "org.jmol.util.Point4f");
Clazz.defineMethod (c$, "addXNum", 
function (x) {
if (this.wasX) switch (x.tok) {
case 2:
if (x.intValue < 0) {
this.addOp (org.jmol.script.Token.tokenMinus);
x =  new org.jmol.script.ScriptVariableInt (-x.intValue);
}break;
case 3:
var f = (x.value).floatValue ();
if (f < 0 || f == 0 && 1 / f == -Infinity) {
this.addOp (org.jmol.script.Token.tokenMinus);
x = org.jmol.script.ScriptVariable.newVariable (3,  new Float (-f));
}break;
}
this.putX (x);
return this.wasX = true;
}, "org.jmol.script.ScriptVariable");
Clazz.defineMethod (c$, "addXAV", 
function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableAV (x));
return this.wasX = true;
}, "~A");
Clazz.defineMethod (c$, "addXAD", 
function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableAD (x));
return this.wasX = true;
}, "~A");
Clazz.defineMethod (c$, "addXAS", 
function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableAS (x));
return this.wasX = true;
}, "~A");
Clazz.defineMethod (c$, "addXAI", 
function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableAI (x));
return this.wasX = true;
}, "~A");
Clazz.defineMethod (c$, "addXAII", 
function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableAII (x));
return this.wasX = true;
}, "~A");
Clazz.defineMethod (c$, "addXAF", 
function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableAF (x));
return this.wasX = true;
}, "~A");
Clazz.defineMethod (c$, "addXAFF", 
function (x) {
this.putX (org.jmol.script.ScriptVariable.getVariableAFF (x));
return this.wasX = true;
}, "~A");
c$.isOpFunc = Clazz.defineMethod (c$, "isOpFunc", 
($fz = function (op) {
return (org.jmol.script.Token.tokAttr (op.tok, 135266304) && op !== org.jmol.script.Token.tokenArraySquare || op.tok == 269484241 && org.jmol.script.Token.tokAttr (op.intValue, 135266304));
}, $fz.isPrivate = true, $fz), "org.jmol.script.Token");
Clazz.defineMethod (c$, "addOp", 
function (op) {
return this.addOpAllowMath (op, true);
}, "org.jmol.script.Token");
Clazz.defineMethod (c$, "addOpAllowMath", 
function (op, allowMathFunc) {
if (this.logMessages) {
org.jmol.util.Logger.info ("addOp entry\naddOp: " + op);
}var tok0 = (this.oPt >= 0 ? this.oStack[this.oPt].tok : 0);
this.skipping = (this.ifPt >= 0 && (this.ifStack[this.ifPt] == 'F' || this.ifStack[this.ifPt] == 'X'));
if (this.skipping) {
switch (op.tok) {
case 269484048:
this.putOp (op);
return true;
case 269484066:
if (tok0 != 269484066 || this.ifStack[this.ifPt] == 'X') return true;
this.ifStack[this.ifPt] = 'T';
this.wasX = false;
this.skipping = false;
return true;
case 269484049:
if (tok0 == 269484048) {
this.oPt--;
return true;
}if (tok0 != 269484066) {
this.putOp (op);
return true;
}this.wasX = true;
this.ifPt--;
this.oPt -= 2;
this.skipping = false;
return true;
default:
return true;
}
}var newOp = null;
var tok;
var isLeftOp = false;
var isDotSelector = (op.tok == 269484241);
if (isDotSelector && !this.wasX) return false;
var isMathFunc = (allowMathFunc && org.jmol.script.ScriptMathProcessor.isOpFunc (op));
if (this.oPt >= 1 && op.tok != 269484048 && tok0 == 135266319) tok0 = this.oStack[--this.oPt].tok;
var isArgument = (this.oPt >= 1 && tok0 == 269484048);
switch (op.tok) {
case 1073742195:
this.haveSpaceBeforeSquare = true;
return true;
case 269484080:
if (!this.wasX) return false;
break;
case 32:
case 64:
case 96:
case 128:
case 160:
case 192:
case 480:
tok = (this.oPt < 0 ? 0 : tok0);
if (!this.wasX || !(tok == 269484241 || tok == 1678770178 || tok == 1141899265)) return false;
this.oStack[this.oPt].intValue |= op.tok;
return true;
case 269484096:
isLeftOp = true;
if (!this.wasX || this.haveSpaceBeforeSquare) {
this.squareCount++;
op = newOp = org.jmol.script.Token.tokenArraySquare;
this.haveSpaceBeforeSquare = false;
}break;
case 269484097:
break;
case 269484225:
case 269484226:
this.incrementX = (op.tok == 269484226 ? 1 : -1);
if (this.ptid == this.ptx) {
if (this.isSyntaxCheck) return true;
var x = this.xStack[this.xPt];
this.xStack[this.xPt] = org.jmol.script.ScriptVariable.newVariable (4, "").set (x, false);
return x.increment (this.incrementX);
}break;
case 269484192:
if (this.wasX) break;
this.addXInt (0);
op = org.jmol.script.ScriptVariable.newVariable (269484224, "-");
break;
case 269484049:
if (!this.wasX && this.oPt >= 1 && tok0 == 269484048 && !org.jmol.script.ScriptMathProcessor.isOpFunc (this.oStack[this.oPt - 1])) return false;
break;
case 269484144:
case 269484048:
isLeftOp = true;
default:
if (isMathFunc) {
if (!isDotSelector && this.wasX && !isArgument) return false;
newOp = op;
isLeftOp = true;
break;
}if (this.wasX == isLeftOp && tok0 != 269484241) return false;
break;
}
while (this.oPt >= 0 && tok0 != 269484066 && (!isLeftOp || tok0 == 269484241 && (op.tok == 269484241 || op.tok == 269484096)) && org.jmol.script.Token.getPrecedence (tok0) >= org.jmol.script.Token.getPrecedence (op.tok)) {
if (this.logMessages) {
org.jmol.util.Logger.info ("\noperating, oPt=" + this.oPt + " isLeftOp=" + isLeftOp + " oStack[oPt]=" + org.jmol.script.Token.nameOf (tok0) + "        prec=" + org.jmol.script.Token.getPrecedence (tok0) + " pending op=\"" + org.jmol.script.Token.nameOf (op.tok) + "\" prec=" + org.jmol.script.Token.getPrecedence (op.tok));
this.dumpStacks ("operating");
}if (op.tok == 269484049 && tok0 == 269484048) {
if (this.xPt >= 0) this.xStack[this.xPt] = org.jmol.script.ScriptVariable.selectItemVar (this.xStack[this.xPt]);
break;
}if (op.tok == 269484097 && tok0 == 135266306) {
break;
}if (op.tok == 269484097 && tok0 == 269484096) {
if (this.isArrayItem && this.squareCount == 1 && this.equalCount == 0) {
this.addXVar (org.jmol.script.ScriptVariable.newScriptVariableToken (org.jmol.script.Token.tokenArraySelector));
break;
}if (!this.doBitsetSelect ()) return false;
break;
}if (!this.operate ()) return false;
tok0 = (this.oPt >= 0 ? this.oStack[this.oPt].tok : 0);
}
if (newOp != null) this.addXVar (org.jmol.script.ScriptVariable.newVariable (269484436, newOp));
switch (op.tok) {
case 269484048:
this.parenCount++;
this.wasX = false;
break;
case 806354977:
var isFirst = this.getX ().asBoolean ();
if (tok0 == 269484066) this.ifPt--;
 else this.putOp (org.jmol.script.Token.tokenColon);
this.putIf (isFirst ? 'T' : 'F');
this.skipping = !isFirst;
this.wasX = false;
return true;
case 269484066:
if (tok0 != 269484066) return false;
if (this.ifPt < 0) return false;
this.ifStack[this.ifPt] = 'X';
this.wasX = false;
this.skipping = true;
return true;
case 269484049:
this.wasX = true;
if (this.parenCount-- <= 0) return false;
if (tok0 == 269484066) {
this.ifPt--;
this.oPt--;
}this.oPt--;
if (this.oPt < 0) return true;
if (org.jmol.script.ScriptMathProcessor.isOpFunc (this.oStack[this.oPt]) && !this.evaluateFunction (0)) return false;
this.skipping = (this.ifPt >= 0 && this.ifStack[this.ifPt] == 'X');
return true;
case 269484080:
this.wasX = false;
return true;
case 269484096:
this.squareCount++;
this.wasX = false;
break;
case 269484097:
this.wasX = true;
if (this.squareCount-- <= 0 || this.oPt < 0) return false;
if (this.oStack[this.oPt].tok == 135266306) return this.evaluateFunction (269484096);
this.oPt--;
return true;
case 269484241:
this.wasX = (!allowMathFunc || !org.jmol.script.Token.tokAttr (op.intValue, 135266304));
break;
case 1048586:
this.braceCount++;
this.wasX = false;
break;
case 1048590:
if (this.braceCount-- <= 0) return false;
this.wasX = false;
break;
case 269484128:
case 269484112:
if (!this.wasSyntaxCheck && this.xPt < 0) return false;
if (!this.wasSyntaxCheck && this.xStack[this.xPt].tok != 10 && this.xStack[this.xPt].tok != 7) {
var tf = this.getX ().asBoolean ();
this.addXVar (org.jmol.script.ScriptVariable.getBoolean (tf));
if (tf == (op.tok == 269484112)) {
this.isSyntaxCheck = true;
op = (op.tok == 269484112 ? org.jmol.script.Token.tokenOrTRUE : org.jmol.script.Token.tokenAndFALSE);
}}this.wasX = false;
break;
case 269484436:
if (this.squareCount == 0) this.equalCount++;
this.wasX = false;
break;
default:
this.wasX = false;
}
this.putOp (op);
if (op.tok == 269484241 && (op.intValue & -481) == 135368713 && op.intValue != 135368713) {
return this.evaluateFunction (0);
}return true;
}, "org.jmol.script.Token,~B");
Clazz.defineMethod (c$, "doBitsetSelect", 
($fz = function () {
if (this.xPt < 0 || this.xPt == 0 && !this.isArrayItem) {
return false;
}var var1 = this.xStack[this.xPt--];
var $var = this.xStack[this.xPt];
if ($var.tok == 7 && var1.tok == 4 && $var.intValue != 2147483647) {
$var = org.jmol.script.ScriptVariable.selectItemVar2 ($var, -2147483648);
}if ($var.tok == 6) {
var v = $var.mapValue (org.jmol.script.ScriptVariable.sValue (var1));
this.xStack[this.xPt] = (v == null ? org.jmol.script.ScriptVariable.newVariable (4, "") : v);
return true;
}var i = var1.asInt ();
switch ($var.tok) {
default:
$var = org.jmol.script.ScriptVariable.newVariable (4, org.jmol.script.ScriptVariable.sValue ($var));
case 10:
case 7:
case 4:
case 11:
case 12:
this.xStack[this.xPt] = org.jmol.script.ScriptVariable.selectItemVar2 ($var, i);
break;
}
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "dumpStacks", 
function (message) {
org.jmol.util.Logger.info ("\n\n------------------\nRPN stacks: " + message + "\n");
for (var i = 0; i <= this.xPt; i++) org.jmol.util.Logger.info ("x[" + i + "]: " + this.xStack[i]);

org.jmol.util.Logger.info ("\n");
for (var i = 0; i <= this.oPt; i++) org.jmol.util.Logger.info ("o[" + i + "]: " + this.oStack[i] + " prec=" + org.jmol.script.Token.getPrecedence (this.oStack[i].tok));

org.jmol.util.Logger.info (" ifStack = " + ( String.instantialize (this.ifStack)).substring (0, this.ifPt + 1));
}, "~S");
Clazz.defineMethod (c$, "getX", 
($fz = function () {
if (this.xPt < 0) this.eval.error (13);
var v = org.jmol.script.ScriptVariable.selectItemVar (this.xStack[this.xPt]);
this.xStack[this.xPt--] = null;
return v;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "evaluateFunction", 
($fz = function (tok) {
var op = this.oStack[this.oPt--];
if (tok == 0) tok = (op.tok == 269484241 ? op.intValue & -481 : op.tok);
var nParamMax = org.jmol.script.Token.getMaxMathParams (tok);
var nParam = 0;
var pt = this.xPt;
while (pt >= 0 && this.xStack[pt--].value !== op) nParam++;

if (nParamMax > 0 && nParam > nParamMax) return false;
var args =  new Array (nParam);
for (var i = nParam; --i >= 0; ) args[i] = this.getX ();

this.xPt--;
if (this.isSyntaxCheck) return (op.tok == 269484241 ? true : this.addXBool (true));
switch (tok) {
case 135266826:
case 135266819:
case 135266821:
case 135266318:
case 135266820:
case 135266822:
return this.evaluateMath (args, tok);
case 1276118017:
case 1276117504:
case 1276117507:
case 1276117509:
return this.evaluateList (op.intValue, args);
case 135266306:
case 269484096:
return this.evaluateArray (args, tok == 269484096);
case 135266307:
case 135270417:
return this.evaluateQuaternion (args, tok);
case 1276118529:
return this.evaluateBin (args);
case 1276117512:
case 1276117513:
return this.evaluateRowCol (args, tok);
case 1766856708:
return this.evaluateColor (args);
case 135270405:
return this.evaluateCompare (args);
case 135266310:
return this.evaluateConnected (args);
case 135267329:
return this.evaluateCross (args);
case 135270407:
return this.evaluateData (args);
case 135266305:
case 1276118018:
case 1276117505:
case 1746538509:
if ((tok == 1276118018 || tok == 1276117505) && op.tok == 269484241) return this.evaluateDot (args, tok);
return this.evaluateMeasure (args, op.tok);
case 1229984263:
case 135271426:
return this.evaluateLoad (args, tok);
case 1276118532:
return this.evaluateFind (args);
case 135368713:
return this.evaluateUserFunction (op.value, args, op.intValue, op.tok == 269484241);
case 1288701960:
case 1826248715:
return this.evaluateLabel (op.intValue, args);
case 135270410:
return this.evaluateGetProperty (args);
case 137363468:
return this.evaluateHelix (args);
case 135267841:
case 135266319:
case 135267842:
return this.evaluatePlane (args, tok);
case 135287308:
case 135271429:
return this.evaluateScript (args, tok);
case 1276117506:
case 1276117508:
case 1276117510:
return this.evaluateString (op.intValue, args);
case 135266320:
return this.evaluatePoint (args);
case 135304707:
return this.evaluatePrompt (args);
case 135267332:
return this.evaluateRandom (args);
case 1276118019:
return this.evaluateReplace (args);
case 135267335:
case 135267336:
case 1238369286:
return this.evaluateSubstructure (args, tok);
case 135270422:
return this.evaluateCache (args);
case 1276117010:
case 1276117011:
return this.evaluateSort (args, tok);
case 1297090050:
return this.evaluateSymop (args, op.tok == 269484241);
case 135266324:
return this.evaluateWithin (args);
case 135402505:
return this.evaluateContact (args);
case 135270421:
return this.evaluateWrite (args);
}
return false;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "evaluateCache", 
($fz = function (args) {
if (args.length > 0) return false;
return this.addXMap (this.viewer.cacheList ());
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateCompare", 
($fz = function (args) {
if (args.length < 2 || args.length > 5) return false;
var stddev;
var sOpt = org.jmol.script.ScriptVariable.sValue (args[args.length - 1]);
var isStdDev = sOpt.equalsIgnoreCase ("stddev");
var isIsomer = sOpt.equalsIgnoreCase ("ISOMER");
var isSmiles = (!isIsomer && args.length > (isStdDev ? 3 : 2));
var bs1 = (args[0].tok == 10 ? args[0].value : null);
var bs2 = (args[1].tok == 10 ? args[1].value : null);
var smiles1 = (bs1 == null ? org.jmol.script.ScriptVariable.sValue (args[0]) : "");
var smiles2 = (bs2 == null ? org.jmol.script.ScriptVariable.sValue (args[1]) : "");
var m =  new org.jmol.util.Matrix4f ();
stddev = NaN;
var ptsA;
var ptsB;
if (isSmiles) {
if (bs1 == null || bs2 == null) return false;
}if (isIsomer) {
if (args.length != 3) return false;
if (bs1 == null && bs2 == null) return this.addXStr (this.viewer.getSmilesMatcher ().getRelationship (smiles1, smiles2).toUpperCase ());
var mf1 = (bs1 == null ? this.viewer.getSmilesMatcher ().getMolecularFormula (smiles1, false) : org.jmol.util.JmolMolecule.getMolecularFormula (this.viewer.getModelSet ().atoms, bs1, false));
var mf2 = (bs2 == null ? this.viewer.getSmilesMatcher ().getMolecularFormula (smiles2, false) : org.jmol.util.JmolMolecule.getMolecularFormula (this.viewer.getModelSet ().atoms, bs2, false));
if (!mf1.equals (mf2)) return this.addXStr ("NONE");
if (bs1 != null) smiles1 = this.eval.getSmilesMatches ("", null, bs1, null, false, true);
var check;
if (bs2 == null) {
check = (this.viewer.getSmilesMatcher ().areEqual (smiles2, smiles1) > 0);
} else {
check = ((this.eval.getSmilesMatches (smiles1, null, bs2, null, false, true)).nextSetBit (0) >= 0);
}if (!check) {
var s = smiles1 + smiles2;
if (s.indexOf ("/") >= 0 || s.indexOf ("\\") >= 0 || s.indexOf ("@") >= 0) {
if (smiles1.indexOf ("@") >= 0 && (bs2 != null || smiles2.indexOf ("@") >= 0)) {
smiles1 = this.viewer.getSmilesMatcher ().reverseChirality (smiles1);
if (bs2 == null) {
check = (this.viewer.getSmilesMatcher ().areEqual (smiles1, smiles2) > 0);
} else {
check = ((this.eval.getSmilesMatches (smiles1, null, bs2, null, false, true)).nextSetBit (0) >= 0);
}if (check) return this.addXStr ("ENANTIOMERS");
}if (bs2 == null) {
check = (this.viewer.getSmilesMatcher ().areEqual ("/nostereo/" + smiles2, smiles1) > 0);
} else {
var ret = this.eval.getSmilesMatches ("/nostereo/" + smiles1, null, bs2, null, false, true);
check = ((ret).nextSetBit (0) >= 0);
}if (check) return this.addXStr ("DIASTERIOMERS");
}return this.addXStr ("CONSTITUTIONAL ISOMERS");
}if (bs1 == null || bs2 == null) return this.addXStr ("IDENTICAL");
stddev = this.eval.getSmilesCorrelation (bs1, bs2, smiles1, null, null, null, null, false, false);
return this.addXStr (stddev < 0.2 ? "IDENTICAL" : "IDENTICAL or CONFORMATIONAL ISOMERS (RMSD=" + stddev + ")");
} else if (isSmiles) {
ptsA =  new java.util.ArrayList ();
ptsB =  new java.util.ArrayList ();
sOpt = org.jmol.script.ScriptVariable.sValue (args[2]);
var isMap = sOpt.equalsIgnoreCase ("MAP");
isSmiles = (sOpt.equalsIgnoreCase ("SMILES"));
var isSearch = (isMap || sOpt.equalsIgnoreCase ("SMARTS"));
if (isSmiles || isSearch) sOpt = (args.length > 3 ? org.jmol.script.ScriptVariable.sValue (args[3]) : null);
if (sOpt == null) return false;
stddev = this.eval.getSmilesCorrelation (bs1, bs2, sOpt, ptsA, ptsB, m, null, !isSmiles, isMap);
if (isMap) {
var nAtoms = ptsA.size ();
if (nAtoms == 0) return this.addXStr ("");
var nMatch = Clazz.doubleToInt (ptsB.size () / nAtoms);
var ret =  new java.util.ArrayList ();
for (var i = 0, pt = 0; i < nMatch; i++) {
var a = org.jmol.util.ArrayUtil.newInt2 (nAtoms);
ret.add (a);
for (var j = 0; j < nAtoms; j++, pt++) a[j] = [(ptsA.get (j)).index, (ptsB.get (pt)).index];

}
return this.addXList (ret);
}} else {
ptsA = this.eval.getPointVector (args[0], 0);
ptsB = this.eval.getPointVector (args[1], 0);
if (ptsA != null && ptsB != null) stddev = org.jmol.util.Measure.getTransformMatrix4 (ptsA, ptsB, m, null);
}return (isStdDev || Float.isNaN (stddev) ? this.addXFloat (stddev) : this.addXM4 (m));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateSort", 
($fz = function (args, tok) {
if (args.length > 1) return false;
if (tok == 1276117010) {
var n = (args.length == 0 ? 0 : args[0].asInt ());
return this.addXVar (this.getX ().sortOrReverse (n));
}var x = this.getX ();
var match = (args.length == 0 ? null : args[0]);
if (x.tok == 4) {
var n = 0;
var s = org.jmol.script.ScriptVariable.sValue (x);
if (match == null) return this.addXInt (0);
var m = org.jmol.script.ScriptVariable.sValue (match);
for (var i = 0; i < s.length; i++) {
var pt = s.indexOf (m, i);
if (pt < 0) break;
n++;
i = pt;
}
return this.addXInt (n);
}var counts =  new java.util.ArrayList ();
var last = null;
var count = null;
var xList = org.jmol.script.ScriptVariable.getVariable (x.value).sortOrReverse (0).getList ();
if (xList == null) return (match == null ? this.addXStr ("") : this.addXInt (0));
for (var i = 0, nLast = xList.size (); i <= nLast; i++) {
var a = (i == nLast ? null : xList.get (i));
if (match != null && a != null && !org.jmol.script.ScriptVariable.areEqual (a, match)) continue;
if (org.jmol.script.ScriptVariable.areEqual (a, last)) {
count.intValue++;
continue;
} else if (last != null) {
var y =  new java.util.ArrayList ();
y.add (last);
y.add (count);
counts.add (org.jmol.script.ScriptVariable.getVariableList (y));
}count =  new org.jmol.script.ScriptVariableInt (1);
last = a;
}
if (match == null) return this.addXVar (org.jmol.script.ScriptVariable.getVariableList (counts));
if (counts.isEmpty ()) return this.addXInt (0);
return this.addXVar (counts.get (0).getList ().get (1));
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "evaluateSymop", 
($fz = function (args, haveBitSet) {
if (args.length == 0) return false;
var x1 = (haveBitSet ? this.getX () : null);
if (x1 != null && x1.tok != 10) return false;
var bs = (x1 != null ? x1.value : args.length > 2 && args[1].tok == 10 ? args[1].value : this.viewer.getModelUndeletedAtomsBitSet (-1));
var xyz;
switch (args[0].tok) {
case 4:
xyz = org.jmol.script.ScriptVariable.sValue (args[0]);
break;
case 12:
xyz = args[0].escape ();
break;
default:
xyz = null;
}
var iOp = (xyz == null ? args[0].asInt () : 0);
var pt = (args.length > 1 ? this.ptValue (args[1], true) : null);
if (args.length == 2 && !Float.isNaN (pt.x)) return this.addXObj (this.viewer.getSymmetryInfo (bs, xyz, iOp, pt, null, null, 135266320));
var desc = (args.length == 1 ? "" : org.jmol.script.ScriptVariable.sValue (args[args.length - 1])).toLowerCase ();
var tok = 135176;
if (args.length == 1 || desc.equalsIgnoreCase ("matrix")) {
tok = 12;
} else if (desc.equalsIgnoreCase ("array") || desc.equalsIgnoreCase ("list")) {
tok = 1073742001;
} else if (desc.equalsIgnoreCase ("description")) {
tok = 1826248715;
} else if (desc.equalsIgnoreCase ("xyz")) {
tok = 1073741982;
} else if (desc.equalsIgnoreCase ("translation")) {
tok = 1073742178;
} else if (desc.equalsIgnoreCase ("axis")) {
tok = 1073741854;
} else if (desc.equalsIgnoreCase ("plane")) {
tok = 135266319;
} else if (desc.equalsIgnoreCase ("angle")) {
tok = 135266305;
} else if (desc.equalsIgnoreCase ("axispoint")) {
tok = 135266320;
} else if (desc.equalsIgnoreCase ("center")) {
tok = 12289;
}return this.addXObj (this.viewer.getSymmetryInfo (bs, xyz, iOp, pt, null, desc, tok));
}, $fz.isPrivate = true, $fz), "~A,~B");
Clazz.defineMethod (c$, "evaluateBin", 
($fz = function (args) {
if (args.length != 3) return false;
var x1 = this.getX ();
var isListf = (x1.tok == 13);
if (!isListf && x1.tok != 7) return this.addXVar (x1);
var f0 = org.jmol.script.ScriptVariable.fValue (args[0]);
var f1 = org.jmol.script.ScriptVariable.fValue (args[1]);
var df = org.jmol.script.ScriptVariable.fValue (args[2]);
var data;
if (isListf) {
data = x1.value;
} else {
var list = x1.getList ();
data =  Clazz.newFloatArray (list.size (), 0);
for (var i = list.size (); --i >= 0; ) data[i] = org.jmol.script.ScriptVariable.fValue (list.get (i));

}var nbins = Clazz.doubleToInt (Math.floor ((f1 - f0) / df + 0.01));
var array =  Clazz.newIntArray (nbins, 0);
var nPoints = data.length;
for (var i = 0; i < nPoints; i++) {
var v = data[i];
var bin = Clazz.doubleToInt (Math.floor ((v - f0) / df));
if (bin < 0) bin = 0;
 else if (bin >= nbins) bin = nbins - 1;
array[bin]++;
}
return this.addXAI (array);
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateHelix", 
($fz = function (args) {
if (args.length < 1 || args.length > 5) return false;
var pt = (args.length > 2 ? 3 : 1);
var type = (pt >= args.length ? "array" : org.jmol.script.ScriptVariable.sValue (args[pt]));
var tok = org.jmol.script.Token.getTokFromName (type);
if (args.length > 2) {
var pta = this.ptValue (args[0], true);
var ptb = this.ptValue (args[1], true);
if (args[2].tok != 9) return false;
var dq = org.jmol.util.Quaternion.newP4 (args[2].value);
switch (tok) {
case 0:
break;
case 135266320:
case 1073741854:
case 1666189314:
case 135266305:
case 1746538509:
return this.addXObj (org.jmol.util.Measure.computeHelicalAxis (null, tok, pta, ptb, dq));
case 135266306:
var data = org.jmol.util.Measure.computeHelicalAxis (null, 1073742001, pta, ptb, dq);
if (data == null) return false;
return this.addXAS (data);
default:
return this.addXObj (org.jmol.util.Measure.computeHelicalAxis (type, 135176, pta, ptb, dq));
}
} else {
var bs = (Clazz.instanceOf (args[0].value, org.jmol.util.BitSet) ? args[0].value : this.eval.compareInt (1095761937, 269484436, args[0].asInt ()));
switch (tok) {
case 135266320:
return this.addXObj (this.viewer.getHelixData (bs, 135266320));
case 1073741854:
return this.addXObj (this.viewer.getHelixData (bs, 1073741854));
case 1666189314:
return this.addXObj (this.viewer.getHelixData (bs, 1666189314));
case 135266305:
return this.addXFloat ((this.viewer.getHelixData (bs, 135266305)).floatValue ());
case 135176:
case 1746538509:
return this.addXObj (this.viewer.getHelixData (bs, tok));
case 135266306:
var data = this.viewer.getHelixData (bs, 1073742001);
if (data == null) return false;
return this.addXAS (data);
}
}return false;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateDot", 
($fz = function (args, tok) {
if (args.length != 1) return false;
var x1 = this.getX ();
var x2 = args[0];
var pt2 = this.ptValue (x2, true);
var plane2 = this.planeValue (x2);
if (x1.tok == 10 && tok != 1276117505) return this.addXObj (this.eval.getBitsetProperty (org.jmol.script.ScriptVariable.bsSelectVar (x1), 1276118018, pt2, plane2, x1.value, null, false, x1.index, false));
var pt1 = this.ptValue (x1, true);
var plane1 = this.planeValue (x1);
if (tok == 1276117505) {
if (plane1 != null && plane2 != null) return this.addXFloat (plane1.x * plane2.x + plane1.y * plane2.y + plane1.z * plane2.z + plane1.w * plane2.w);
if (plane1 != null) pt1 = org.jmol.util.Point3f.new3 (plane1.x, plane1.y, plane1.z);
if (plane2 != null) pt2 = org.jmol.util.Point3f.new3 (plane2.x, plane2.y, plane2.z);
return this.addXFloat (pt1.x * pt2.x + pt1.y * pt2.y + pt1.z * pt2.z);
}if (plane1 == null) return this.addXFloat (plane2 == null ? pt2.distance (pt1) : org.jmol.util.Measure.distanceToPlane (plane2, pt1));
return this.addXFloat (org.jmol.util.Measure.distanceToPlane (plane1, pt2));
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "ptValue", 
function (x, allowFloat) {
var pt;
if (this.isSyntaxCheck) return  new org.jmol.util.Point3f ();
switch (x.tok) {
case 8:
return x.value;
case 10:
return this.eval.getBitsetProperty (org.jmol.script.ScriptVariable.bsSelectVar (x), 1146095626, null, null, x.value, null, false, 2147483647, false);
case 4:
pt = org.jmol.util.Escape.unescapePoint (org.jmol.script.ScriptVariable.sValue (x));
if (Clazz.instanceOf (pt, org.jmol.util.Point3f)) return pt;
break;
case 7:
pt = org.jmol.util.Escape.unescapePoint ("{" + org.jmol.script.ScriptVariable.sValue (x) + "}");
if (Clazz.instanceOf (pt, org.jmol.util.Point3f)) return pt;
break;
}
if (!allowFloat) return null;
var f = org.jmol.script.ScriptVariable.fValue (x);
return org.jmol.util.Point3f.new3 (f, f, f);
}, "org.jmol.script.ScriptVariable,~B");
Clazz.defineMethod (c$, "planeValue", 
($fz = function (x) {
if (this.isSyntaxCheck) return  new org.jmol.util.Point4f ();
switch (x.tok) {
case 9:
return x.value;
case 7:
case 4:
var pt = org.jmol.util.Escape.unescapePoint (org.jmol.script.ScriptVariable.sValue (x));
return (Clazz.instanceOf (pt, org.jmol.util.Point4f) ? pt : null);
case 10:
break;
}
return null;
}, $fz.isPrivate = true, $fz), "org.jmol.script.Token");
Clazz.defineMethod (c$, "evaluateMeasure", 
($fz = function (args, tok) {
var nPoints = 0;
switch (tok) {
case 1746538509:
var points =  new java.util.ArrayList ();
var rangeMinMax = [3.4028235E38, 3.4028235E38];
var strFormat = null;
var units = null;
var isAllConnected = false;
var isNotConnected = false;
var rPt = 0;
var isNull = false;
var rd = null;
var nBitSets = 0;
var vdw = 3.4028235E38;
var asArray = false;
for (var i = 0; i < args.length; i++) {
switch (args[i].tok) {
case 10:
var bs = args[i].value;
if (bs.length () == 0) isNull = true;
points.add (bs);
nPoints++;
nBitSets++;
break;
case 8:
var v =  new org.jmol.util.Point3fi ();
v.setT (args[i].value);
points.add (v);
nPoints++;
break;
case 2:
case 3:
rangeMinMax[rPt++ % 2] = org.jmol.script.ScriptVariable.fValue (args[i]);
break;
case 4:
var s = org.jmol.script.ScriptVariable.sValue (args[i]);
if (s.equalsIgnoreCase ("vdw") || s.equalsIgnoreCase ("vanderwaals")) vdw = (i + 1 < args.length && args[i + 1].tok == 2 ? args[++i].asInt () : 100) / 100;
 else if (s.equalsIgnoreCase ("notConnected")) isNotConnected = true;
 else if (s.equalsIgnoreCase ("connected")) isAllConnected = true;
 else if (s.equalsIgnoreCase ("minArray")) asArray = (nBitSets >= 1);
 else if (org.jmol.util.Parser.isOneOf (s.toLowerCase (), "nm;nanometers;pm;picometers;angstroms;ang;au")) units = s.toLowerCase ();
 else strFormat = nPoints + ":" + s;
break;
default:
return false;
}
}
if (nPoints < 2 || nPoints > 4 || rPt > 2 || isNotConnected && isAllConnected) return false;
if (isNull) return this.addXStr ("");
if (vdw != 3.4028235E38 && (nBitSets != 2 || nPoints != 2)) return this.addXStr ("");
rd = (vdw == 3.4028235E38 ?  new org.jmol.atomdata.RadiusData (rangeMinMax, 0, null, null) :  new org.jmol.atomdata.RadiusData (null, vdw, org.jmol.atomdata.RadiusData.EnumType.FACTOR, org.jmol.constant.EnumVdw.AUTO));
var md =  new org.jmol.modelset.MeasurementData (this.viewer, points, 0, rd, strFormat, units, null, isAllConnected, isNotConnected, null, true);
return this.addXObj (md.getMeasurements (asArray));
case 135266305:
if ((nPoints = args.length) != 3 && nPoints != 4) return false;
break;
default:
if ((nPoints = args.length) != 2) return false;
}
var pts =  new Array (nPoints);
for (var i = 0; i < nPoints; i++) pts[i] = this.ptValue (args[i], true);

switch (nPoints) {
case 2:
return this.addXFloat (pts[0].distance (pts[1]));
case 3:
return this.addXFloat (org.jmol.util.Measure.computeAngleABC (pts[0], pts[1], pts[2], true));
case 4:
return this.addXFloat (org.jmol.util.Measure.computeTorsion (pts[0], pts[1], pts[2], pts[3], true));
}
return false;
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "evaluateUserFunction", 
($fz = function (name, args, tok, isSelector) {
var x1 = null;
if (isSelector) {
x1 = this.getX ();
if (x1.tok != 10) return false;
}this.wasX = false;
var params =  new java.util.ArrayList ();
for (var i = 0; i < args.length; i++) {
params.add (args[i]);
}
if (isSelector) {
return this.addXObj (this.eval.getBitsetProperty (org.jmol.script.ScriptVariable.bsSelectVar (x1), tok, null, null, x1.value, [name, params], false, x1.index, false));
}var $var = this.eval.runFunctionRet (null, name, params, null, true, true, false);
return ($var == null ? false : this.addXVar ($var));
}, $fz.isPrivate = true, $fz), "~S,~A,~N,~B");
Clazz.defineMethod (c$, "evaluateFind", 
($fz = function (args) {
if (args.length == 0) return false;
var x1 = this.getX ();
var sFind = org.jmol.script.ScriptVariable.sValue (args[0]);
var flags = (args.length > 1 && args[1].tok != 1048589 && args[1].tok != 1048588 ? org.jmol.script.ScriptVariable.sValue (args[1]) : "");
var isSequence = sFind.equalsIgnoreCase ("SEQUENCE");
var isSmiles = sFind.equalsIgnoreCase ("SMILES");
var isSearch = sFind.equalsIgnoreCase ("SMARTS");
var isMF = sFind.equalsIgnoreCase ("MF");
if (isSmiles || isSearch || x1.tok == 10) {
var iPt = (isSmiles || isSearch ? 2 : 1);
var bs2 = (iPt < args.length && args[iPt].tok == 10 ? args[iPt++].value : null);
var isAll = (args[args.length - 1].tok == 1048589);
var ret = null;
switch (x1.tok) {
case 4:
var smiles = org.jmol.script.ScriptVariable.sValue (x1);
if (bs2 != null) return false;
if (flags.equalsIgnoreCase ("mf")) {
ret = this.viewer.getSmilesMatcher ().getMolecularFormula (smiles, isSearch);
if (ret == null) this.eval.evalError (this.viewer.getSmilesMatcher ().getLastException (), null);
} else {
ret = this.eval.getSmilesMatches (flags, smiles, null, null, isSearch, !isAll);
}break;
case 10:
if (isMF) return this.addXStr (org.jmol.util.JmolMolecule.getMolecularFormula (this.viewer.getModelSet ().atoms, x1.value, false));
if (isSequence) return this.addXStr (this.viewer.getSmiles (-1, -1, x1.value, true, isAll, isAll, false));
if (isSmiles || isSearch) sFind = flags;
var bsMatch3D = bs2;
ret = this.eval.getSmilesMatches (sFind, null, x1.value, bsMatch3D, !isSmiles, !isAll);
break;
}
if (ret == null) this.eval.error (22);
return this.addXObj (ret);
}var isReverse = (flags.indexOf ("v") >= 0);
var isCaseInsensitive = (flags.indexOf ("i") >= 0);
var asMatch = (flags.indexOf ("m") >= 0);
var isList = (x1.tok == 7);
var isPattern = (args.length == 2);
if (isList || isPattern) {
var pattern = null;
try {
pattern = java.util.regex.Pattern.compile (sFind, isCaseInsensitive ? 2 : 0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.eval.evalError (e.toString (), null);
} else {
throw e;
}
}
var list = org.jmol.script.ScriptVariable.listValue (x1);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("finding " + sFind);
var bs =  new org.jmol.util.BitSet ();
var ipt = 0;
var n = 0;
var matcher = null;
var v = (asMatch ?  new java.util.ArrayList () : null);
for (var i = 0; i < list.length; i++) {
var what = list[i];
matcher = pattern.matcher (what);
var isMatch = matcher.find ();
if (asMatch && isMatch || !asMatch && isMatch == !isReverse) {
n++;
ipt = i;
bs.set (i);
if (asMatch) v.add (isReverse ? what.substring (0, matcher.start ()) + what.substring (matcher.end ()) : matcher.group ());
}}
if (!isList) {
return (asMatch ? this.addXStr (v.size () == 1 ? v.get (0) : "") : isReverse ? this.addXBool (n == 1) : asMatch ? this.addXStr (n == 0 ? "" : matcher.group ()) : this.addXInt (n == 0 ? 0 : matcher.start () + 1));
}if (n == 1) return this.addXStr (asMatch ? v.get (0) : list[ipt]);
var listNew =  new Array (n);
if (n > 0) for (var i = list.length; --i >= 0; ) if (bs.get (i)) {
--n;
listNew[n] = (asMatch ? v.get (n) : list[i]);
}
return this.addXAS (listNew);
}return this.addXInt (org.jmol.script.ScriptVariable.sValue (x1).indexOf (sFind) + 1);
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateGetProperty", 
($fz = function (args) {
var pt = 0;
var propertyName = (args.length > pt ? org.jmol.script.ScriptVariable.sValue (args[pt++]).toLowerCase () : "");
if (propertyName.startsWith ("$")) {
}var propertyValue;
if (propertyName.equalsIgnoreCase ("fileContents") && args.length > 2) {
var s = org.jmol.script.ScriptVariable.sValue (args[1]);
for (var i = 2; i < args.length; i++) s += "|" + org.jmol.script.ScriptVariable.sValue (args[i]);

propertyValue = s;
pt = args.length;
} else {
propertyValue = (args.length > pt && args[pt].tok == 10 ? org.jmol.script.ScriptVariable.bsSelectVar (args[pt++]) : args.length > pt && args[pt].tok == 4 && org.jmol.viewer.PropertyManager.acceptsStringParameter (propertyName) ? args[pt++].value : "");
}var property = this.viewer.getProperty (null, propertyName, propertyValue);
if (pt < args.length) property = org.jmol.viewer.PropertyManager.extractProperty (property, args, pt);
return this.addXObj (org.jmol.script.ScriptVariable.isVariableType (property) ? property : org.jmol.util.Escape.toReadable (propertyName, property));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluatePlane", 
($fz = function (args, tok) {
if (tok == 135267841 && args.length != 3 || tok == 135267842 && args.length != 2 && args.length != 3 || args.length == 0 || args.length > 4) return false;
var pt1;
var pt2;
var pt3;
var plane;
var norm;
var vTemp;
switch (args.length) {
case 1:
if (args[0].tok == 10) {
var bs = org.jmol.script.ScriptVariable.getBitSet (args[0], false);
if (bs.cardinality () == 3) {
var pts = this.viewer.getAtomPointVector (bs);
var vNorm =  new org.jmol.util.Vector3f ();
var vAB =  new org.jmol.util.Vector3f ();
var vAC =  new org.jmol.util.Vector3f ();
plane =  new org.jmol.util.Point4f ();
org.jmol.util.Measure.getPlaneThroughPoints (pts.get (0), pts.get (1), pts.get (2), vNorm, vAB, vAC, plane);
return this.addXPt4 (plane);
}}var pt = org.jmol.util.Escape.unescapePoint (org.jmol.script.ScriptVariable.sValue (args[0]));
if (Clazz.instanceOf (pt, org.jmol.util.Point4f)) return this.addXPt4 (pt);
return this.addXStr ("" + pt);
case 2:
if (tok == 135267842) {
if (args[1].tok != 9) return false;
pt3 =  new org.jmol.util.Point3f ();
norm =  new org.jmol.util.Vector3f ();
vTemp =  new org.jmol.util.Vector3f ();
plane = args[1].value;
if (args[0].tok == 9) {
var list = org.jmol.util.Measure.getIntersectionPP (args[0].value, plane);
if (list == null) return this.addXStr ("");
return this.addXList (list);
}pt2 = this.ptValue (args[0], false);
if (pt2 == null) return this.addXStr ("");
return this.addXPt (org.jmol.util.Measure.getIntersection (pt2, null, plane, pt3, norm, vTemp));
}case 3:
case 4:
switch (tok) {
case 135267841:
return this.addXPt4 (this.eval.getHklPlane (org.jmol.util.Point3f.new3 (org.jmol.script.ScriptVariable.fValue (args[0]), org.jmol.script.ScriptVariable.fValue (args[1]), org.jmol.script.ScriptVariable.fValue (args[2]))));
case 135267842:
pt1 = this.ptValue (args[0], false);
pt2 = this.ptValue (args[1], false);
if (pt1 == null || pt2 == null) return this.addXStr ("");
var vLine = org.jmol.util.Vector3f.newV (pt2);
vLine.normalize ();
if (args[2].tok == 9) {
pt3 =  new org.jmol.util.Point3f ();
norm =  new org.jmol.util.Vector3f ();
vTemp =  new org.jmol.util.Vector3f ();
pt1 = org.jmol.util.Measure.getIntersection (pt1, vLine, args[2].value, pt3, norm, vTemp);
if (pt1 == null) return this.addXStr ("");
return this.addXPt (pt1);
}pt3 = this.ptValue (args[2], false);
if (pt3 == null) return this.addXStr ("");
var v =  new org.jmol.util.Vector3f ();
org.jmol.util.Measure.projectOntoAxis (pt3, pt1, vLine, v);
return this.addXPt (pt3);
}
switch (args[0].tok) {
case 2:
case 3:
if (args.length == 3) {
var r = org.jmol.script.ScriptVariable.fValue (args[0]);
var theta = org.jmol.script.ScriptVariable.fValue (args[1]);
var phi = org.jmol.script.ScriptVariable.fValue (args[2]);
norm = org.jmol.util.Vector3f.new3 (0, 0, 1);
pt2 = org.jmol.util.Point3f.new3 (0, 1, 0);
var q = org.jmol.util.Quaternion.newVA (pt2, phi);
q.getMatrix ().transform (norm);
pt2.set (0, 0, 1);
q = org.jmol.util.Quaternion.newVA (pt2, theta);
q.getMatrix ().transform (norm);
pt2.setT (norm);
pt2.scale (r);
plane =  new org.jmol.util.Point4f ();
org.jmol.util.Measure.getPlaneThroughPoint (pt2, norm, plane);
return this.addXPt4 (plane);
}break;
case 10:
case 8:
pt1 = this.ptValue (args[0], false);
pt2 = this.ptValue (args[1], false);
if (pt2 == null) return false;
pt3 = (args.length > 2 && (args[2].tok == 10 || args[2].tok == 8) ? this.ptValue (args[2], false) : null);
norm = org.jmol.util.Vector3f.newV (pt2);
if (pt3 == null) {
plane =  new org.jmol.util.Point4f ();
if (args.length == 2 || !args[2].asBoolean ()) {
pt3 = org.jmol.util.Point3f.newP (pt1);
pt3.add (pt2);
pt3.scale (0.5);
norm.sub (pt1);
norm.normalize ();
} else {
pt3 = pt1;
}org.jmol.util.Measure.getPlaneThroughPoint (pt3, norm, plane);
return this.addXPt4 (plane);
}var vAB =  new org.jmol.util.Vector3f ();
var vAC =  new org.jmol.util.Vector3f ();
var nd = org.jmol.util.Measure.getDirectedNormalThroughPoints (pt1, pt2, pt3, (args.length == 4 ? this.ptValue (args[3], true) : null), norm, vAB, vAC);
return this.addXPt4 (org.jmol.util.Point4f.new4 (norm.x, norm.y, norm.z, nd));
}
}
if (args.length != 4) return false;
var x = org.jmol.script.ScriptVariable.fValue (args[0]);
var y = org.jmol.script.ScriptVariable.fValue (args[1]);
var z = org.jmol.script.ScriptVariable.fValue (args[2]);
var w = org.jmol.script.ScriptVariable.fValue (args[3]);
return this.addXPt4 (org.jmol.util.Point4f.new4 (x, y, z, w));
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "evaluatePoint", 
($fz = function (args) {
if (args.length != 1 && args.length != 3 && args.length != 4) return false;
switch (args.length) {
case 1:
if (args[0].tok == 3 || args[0].tok == 2) return this.addXInt (args[0].asInt ());
var s = org.jmol.script.ScriptVariable.sValue (args[0]);
if (args[0].tok == 7) s = "{" + s + "}";
var pt = org.jmol.util.Escape.unescapePoint (s);
if (Clazz.instanceOf (pt, org.jmol.util.Point3f)) return this.addXPt (pt);
return this.addXStr ("" + pt);
case 3:
return this.addXPt (org.jmol.util.Point3f.new3 (args[0].asFloat (), args[1].asFloat (), args[2].asFloat ()));
case 4:
return this.addXPt4 (org.jmol.util.Point4f.new4 (args[0].asFloat (), args[1].asFloat (), args[2].asFloat (), args[3].asFloat ()));
}
return false;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluatePrompt", 
($fz = function (args) {
if (args.length != 1 && args.length != 2 && args.length != 3) return false;
var label = org.jmol.script.ScriptVariable.sValue (args[0]);
var buttonArray = (args.length > 1 && args[1].tok == 7 ? org.jmol.script.ScriptVariable.listValue (args[1]) : null);
var asButtons = (buttonArray != null || args.length == 1 || args.length == 3 && args[2].asBoolean ());
var input = (buttonArray != null ? null : args.length >= 2 ? org.jmol.script.ScriptVariable.sValue (args[1]) : "OK");
var s = this.viewer.prompt (label, input, buttonArray, asButtons);
return (asButtons && buttonArray != null ? this.addXInt (Integer.parseInt (s) + 1) : this.addXStr (s));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateReplace", 
($fz = function (args) {
if (args.length != 2) return false;
var x = this.getX ();
var sFind = org.jmol.script.ScriptVariable.sValue (args[0]);
var sReplace = org.jmol.script.ScriptVariable.sValue (args[1]);
var s = (x.tok == 7 ? null : org.jmol.script.ScriptVariable.sValue (x));
if (s != null) return this.addXStr (org.jmol.util.TextFormat.simpleReplace (s, sFind, sReplace));
var list = org.jmol.script.ScriptVariable.listValue (x);
for (var i = list.length; --i >= 0; ) list[i] = org.jmol.util.TextFormat.simpleReplace (list[i], sFind, sReplace);

return this.addXAS (list);
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateString", 
($fz = function (tok, args) {
if (args.length > 1) return false;
var x = this.getX ();
var s = (tok == 1276117508 && x.tok == 10 || tok == 1276117510 && x.tok == 7 ? null : org.jmol.script.ScriptVariable.sValue (x));
var sArg = (args.length == 1 ? org.jmol.script.ScriptVariable.sValue (args[0]) : tok == 1276117510 ? "" : "\n");
switch (tok) {
case 1276117508:
if (x.tok == 10) {
var bsSelected = org.jmol.script.ScriptVariable.bsSelectVar (x);
sArg = "\n";
var modelCount = this.viewer.getModelCount ();
s = "";
for (var i = 0; i < modelCount; i++) {
s += (i == 0 ? "" : "\n");
var bs = this.viewer.getModelUndeletedAtomsBitSet (i);
bs.and (bsSelected);
s += org.jmol.util.Escape.escape (bs);
}
}return this.addXAS (org.jmol.util.TextFormat.splitChars (s, sArg));
case 1276117506:
if (s.length > 0 && s.charAt (s.length - 1) == '\n') s = s.substring (0, s.length - 1);
return this.addXStr (org.jmol.util.TextFormat.simpleReplace (s, "\n", sArg));
case 1276117510:
if (s != null) return this.addXStr (org.jmol.util.TextFormat.trim (s, sArg));
var list = org.jmol.script.ScriptVariable.listValue (x);
for (var i = list.length; --i >= 0; ) list[i] = org.jmol.util.TextFormat.trim (list[i], sArg);

return this.addXAS (list);
}
return this.addXStr ("");
}, $fz.isPrivate = true, $fz), "~N,~A");
Clazz.defineMethod (c$, "evaluateList", 
($fz = function (tok, args) {
if (args.length != 1 && !(tok == 1276118017 && (args.length == 0 || args.length == 2))) return false;
var x1 = this.getX ();
var x2;
var len;
var sList1 = null;
var sList2 = null;
var sList3 = null;
if (args.length == 2) {
var itab = (args[0].tok == 4 ? 0 : 1);
var tab = org.jmol.script.ScriptVariable.sValue (args[itab]);
sList1 = (x1.tok == 7 ? org.jmol.script.ScriptVariable.listValue (x1) : org.jmol.util.TextFormat.split (org.jmol.script.ScriptVariable.sValue (x1), '\n'));
x2 = args[1 - itab];
sList2 = (x2.tok == 7 ? org.jmol.script.ScriptVariable.listValue (x2) : org.jmol.util.TextFormat.split (org.jmol.script.ScriptVariable.sValue (x2), '\n'));
sList3 =  new Array (len = Math.max (sList1.length, sList2.length));
for (var i = 0; i < len; i++) sList3[i] = (i >= sList1.length ? "" : sList1[i]) + tab + (i >= sList2.length ? "" : sList2[i]);

return this.addXAS (sList3);
}x2 = (args.length == 0 ? org.jmol.script.ScriptVariable.vAll : args[0]);
var isAll = (x2.tok == 1048579);
if (x1.tok != 7 && x1.tok != 4) {
this.wasX = false;
this.addOp (org.jmol.script.Token.tokenLeftParen);
this.addXVar (x1);
switch (tok) {
case 1276118017:
this.addOp (org.jmol.script.Token.tokenPlus);
break;
case 1276117509:
this.addOp (org.jmol.script.Token.tokenMinus);
break;
case 1276117507:
this.addOp (org.jmol.script.Token.tokenTimes);
break;
case 1276117504:
this.addOp (org.jmol.script.Token.tokenDivide);
break;
}
this.addXVar (x2);
return this.addOp (org.jmol.script.Token.tokenRightParen);
}var isScalar = (x2.tok != 7 && org.jmol.script.ScriptVariable.sValue (x2).indexOf ("\n") < 0);
var list1 = null;
var list2 = null;
var alist1 = x1.getList ();
var alist2 = x2.getList ();
if (x1.tok == 7) {
len = alist1.size ();
} else {
sList1 = (org.jmol.util.TextFormat.splitChars (x1.value, "\n"));
list1 =  Clazz.newFloatArray (len = sList1.length, 0);
org.jmol.util.Parser.parseFloatArrayData (sList1, list1);
}if (isAll) {
var sum = 0;
if (x1.tok == 7) {
for (var i = len; --i >= 0; ) sum += org.jmol.script.ScriptVariable.fValue (alist1.get (i));

} else {
for (var i = len; --i >= 0; ) sum += list1[i];

}return this.addXFloat (sum);
}var scalar = null;
if (isScalar) {
scalar = x2;
} else if (x2.tok == 7) {
len = Math.min (len, alist2.size ());
} else {
sList2 = org.jmol.util.TextFormat.splitChars (x2.value, "\n");
list2 =  Clazz.newFloatArray (sList2.length, 0);
org.jmol.util.Parser.parseFloatArrayData (sList2, list2);
len = Math.min (list1.length, list2.length);
}var token = null;
switch (tok) {
case 1276118017:
token = org.jmol.script.Token.tokenPlus;
break;
case 1276117509:
token = org.jmol.script.Token.tokenMinus;
break;
case 1276117507:
token = org.jmol.script.Token.tokenTimes;
break;
case 1276117504:
token = org.jmol.script.Token.tokenDivide;
break;
}
var olist =  new Array (len);
for (var i = 0; i < len; i++) {
if (x1.tok == 7) this.addXVar (alist1.get (i));
 else if (Float.isNaN (list1[i])) this.addXObj (org.jmol.script.ScriptVariable.unescapePointOrBitsetAsVariable (sList1[i]));
 else this.addXFloat (list1[i]);
if (isScalar) this.addXVar (scalar);
 else if (x2.tok == 7) this.addXVar (alist2.get (i));
 else if (Float.isNaN (list2[i])) this.addXObj (org.jmol.script.ScriptVariable.unescapePointOrBitsetAsVariable (sList2[i]));
 else this.addXFloat (list2[i]);
if (!this.addOp (token) || !this.operate ()) return false;
olist[i] = this.xStack[this.xPt--];
}
return this.addXAV (olist);
}, $fz.isPrivate = true, $fz), "~N,~A");
Clazz.defineMethod (c$, "evaluateRowCol", 
($fz = function (args, tok) {
if (args.length != 1) return false;
var n = args[0].asInt () - 1;
var x1 = this.getX ();
var f;
switch (x1.tok) {
case 11:
if (n < 0 || n > 2) return false;
var m = x1.value;
switch (tok) {
case 1276117513:
f =  Clazz.newFloatArray (3, 0);
m.getRow (n, f);
return this.addXAF (f);
case 1276117512:
default:
f =  Clazz.newFloatArray (3, 0);
m.getColumn (n, f);
return this.addXAF (f);
}
case 12:
if (n < 0 || n > 2) return false;
var m4 = x1.value;
switch (tok) {
case 1276117513:
f =  Clazz.newFloatArray (4, 0);
m4.getRow (n, f);
return this.addXAF (f);
case 1276117512:
default:
f =  Clazz.newFloatArray (4, 0);
m4.getColumn (n, f);
return this.addXAF (f);
}
}
return false;
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "evaluateArray", 
($fz = function (args, allowMatrix) {
var len = args.length;
if (allowMatrix && (len == 4 || len == 3)) {
var isMatrix = true;
for (var i = 0; i < len && isMatrix; i++) isMatrix = (args[i].tok == 7 && args[i].getList ().size () == len);

if (isMatrix) {
var m =  Clazz.newFloatArray (len * len, 0);
var pt = 0;
for (var i = 0; i < len && isMatrix; i++) {
var list = args[i].getList ();
for (var j = 0; j < len; j++) {
var x = org.jmol.script.ScriptVariable.fValue (list.get (j));
if (Float.isNaN (x)) {
isMatrix = false;
break;
}m[pt++] = x;
}
}
if (isMatrix) {
if (len == 3) return this.addXM3 (org.jmol.util.Matrix3f.newA (m));
return this.addXM4 (org.jmol.util.Matrix4f.newA (m));
}}}var a =  new Array (args.length);
for (var i = a.length; --i >= 0; ) a[i] = org.jmol.script.ScriptVariable.newScriptVariableToken (args[i]);

return this.addXAV (a);
}, $fz.isPrivate = true, $fz), "~A,~B");
Clazz.defineMethod (c$, "evaluateMath", 
($fz = function (args, tok) {
if (tok == 135266318) {
if (args.length == 1 && args[0].tok == 4) return this.addXStr (( new java.util.Date ()) + "\t" + org.jmol.script.ScriptVariable.sValue (args[0]));
return this.addXInt ((System.currentTimeMillis () & 0x7FFFFFFF) - (args.length == 0 ? 0 : args[0].asInt ()));
}if (args.length != 1) return false;
if (tok == 135266826) {
if (args[0].tok == 2) return this.addXInt (Math.abs (args[0].asInt ()));
return this.addXFloat (Math.abs (args[0].asFloat ()));
}var x = org.jmol.script.ScriptVariable.fValue (args[0]);
switch (tok) {
case 135266819:
return this.addXFloat ((Math.acos (x) * 180 / 3.141592653589793));
case 135266821:
return this.addXFloat (Math.cos (x * 3.141592653589793 / 180));
case 135266820:
return this.addXFloat (Math.sin (x * 3.141592653589793 / 180));
case 135266822:
return this.addXFloat (Math.sqrt (x));
}
return false;
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "evaluateQuaternion", 
($fz = function (args, tok) {
var pt0 = null;
var nArgs = args.length;
var nMax = 2147483647;
var isRelative = false;
if (tok == 135270417) {
if (nArgs > 1 && args[nArgs - 1].tok == 4 && (args[nArgs - 1].value).equalsIgnoreCase ("relative")) {
nArgs--;
isRelative = true;
}if (nArgs > 1 && args[nArgs - 1].tok == 2 && args[0].tok == 10) {
nMax = args[nArgs - 1].asInt ();
if (nMax <= 0) nMax = 2147483646;
nArgs--;
}}switch (nArgs) {
case 0:
case 1:
case 4:
break;
case 2:
if (tok == 135270417) {
if (args[0].tok == 7 && args[1].tok == 7) break;
if (args[0].tok == 10 && (args[1].tok == 2 || args[1].tok == 10)) break;
}if ((pt0 = this.ptValue (args[0], false)) == null || tok != 135270417 && args[1].tok == 8) return false;
break;
case 3:
if (tok != 135270417) return false;
if (args[0].tok == 9) {
if (args[2].tok != 8 && args[2].tok != 10) return false;
break;
}for (var i = 0; i < 3; i++) if (args[i].tok != 8 && args[i].tok != 10) return false;

break;
default:
return false;
}
var q = null;
var qs = null;
var p4 = null;
switch (nArgs) {
case 0:
return this.addXPt4 (org.jmol.util.Quaternion.newQ (this.viewer.getRotationQuaternion ()).toPoint4f ());
case 1:
default:
if (tok == 135270417 && args[0].tok == 7) {
var data1 = org.jmol.script.ScriptMathProcessor.getQuaternionArray (args[0].getList (), 1073742001);
var mean = org.jmol.util.Quaternion.sphereMean (data1, null, 0.0001);
q = (Clazz.instanceOf (mean, org.jmol.util.Quaternion) ? mean : null);
break;
} else if (tok == 135270417 && args[0].tok == 10) {
qs = this.viewer.getAtomGroupQuaternions (args[0].value, nMax);
} else if (args[0].tok == 11) {
q = org.jmol.util.Quaternion.newM (args[0].value);
} else if (args[0].tok == 9) {
p4 = args[0].value;
} else {
var v = org.jmol.util.Escape.unescapePoint (org.jmol.script.ScriptVariable.sValue (args[0]));
if (!(Clazz.instanceOf (v, org.jmol.util.Point4f))) return false;
p4 = v;
}if (tok == 135266307) q = org.jmol.util.Quaternion.newVA (org.jmol.util.Point3f.new3 (p4.x, p4.y, p4.z), p4.w);
break;
case 2:
if (tok == 135270417) {
if (args[0].tok == 7 && args[1].tok == 7) {
var data1 = org.jmol.script.ScriptMathProcessor.getQuaternionArray (args[0].getList (), 1073742001);
var data2 = org.jmol.script.ScriptMathProcessor.getQuaternionArray (args[1].getList (), 1073742001);
qs = org.jmol.util.Quaternion.div (data2, data1, nMax, isRelative);
break;
}if (args[0].tok == 10 && args[1].tok == 10) {
var data1 = this.viewer.getAtomGroupQuaternions (args[0].value, 2147483647);
var data2 = this.viewer.getAtomGroupQuaternions (args[1].value, 2147483647);
qs = org.jmol.util.Quaternion.div (data2, data1, nMax, isRelative);
break;
}}var pt1 = this.ptValue (args[1], false);
p4 = this.planeValue (args[0]);
if (pt1 != null) q = org.jmol.util.Quaternion.getQuaternionFrame (org.jmol.util.Point3f.new3 (0, 0, 0), pt0, pt1);
 else q = org.jmol.util.Quaternion.newVA (pt0, org.jmol.script.ScriptVariable.fValue (args[1]));
break;
case 3:
if (args[0].tok == 9) {
var pt = (args[2].tok == 8 ? args[2].value : this.viewer.getAtomSetCenter (args[2].value));
return this.addXStr ((org.jmol.util.Quaternion.newP4 (args[0].value)).draw ("q", org.jmol.script.ScriptVariable.sValue (args[1]), pt, 1));
}var pts =  new Array (3);
for (var i = 0; i < 3; i++) pts[i] = (args[i].tok == 8 ? args[i].value : this.viewer.getAtomSetCenter (args[i].value));

q = org.jmol.util.Quaternion.getQuaternionFrame (pts[0], pts[1], pts[2]);
break;
case 4:
if (tok == 135270417) p4 = org.jmol.util.Point4f.new4 (org.jmol.script.ScriptVariable.fValue (args[1]), org.jmol.script.ScriptVariable.fValue (args[2]), org.jmol.script.ScriptVariable.fValue (args[3]), org.jmol.script.ScriptVariable.fValue (args[0]));
 else q = org.jmol.util.Quaternion.newVA (org.jmol.util.Point3f.new3 (org.jmol.script.ScriptVariable.fValue (args[0]), org.jmol.script.ScriptVariable.fValue (args[1]), org.jmol.script.ScriptVariable.fValue (args[2])), org.jmol.script.ScriptVariable.fValue (args[3]));
break;
}
if (qs != null) {
if (nMax != 2147483647) {
var list =  new java.util.ArrayList ();
for (var i = 0; i < qs.length; i++) list.add (qs[i].toPoint4f ());

return this.addXList (list);
}q = (qs.length > 0 ? qs[0] : null);
}return this.addXPt4 ((q == null ? org.jmol.util.Quaternion.newP4 (p4) : q).toPoint4f ());
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "evaluateRandom", 
($fz = function (args) {
if (args.length > 2) return false;
var lower = (args.length < 2 ? 0 : org.jmol.script.ScriptVariable.fValue (args[0]));
var range = (args.length == 0 ? 1 : org.jmol.script.ScriptVariable.fValue (args[args.length - 1]));
range -= lower;
return this.addXFloat ((Math.random () * range) + lower);
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateCross", 
($fz = function (args) {
if (args.length != 2) return false;
var x1 = args[0];
var x2 = args[1];
if (x1.tok != 8 || x2.tok != 8) return false;
var a = org.jmol.util.Vector3f.newV (x1.value);
var b = org.jmol.util.Vector3f.newV (x2.value);
a.cross (a, b);
return this.addXPt (org.jmol.util.Point3f.newP (a));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateLoad", 
($fz = function (args, tok) {
if (args.length > 2 || args.length < 1) return false;
var file = org.jmol.script.ScriptVariable.sValue (args[0]);
var nBytesMax = (args.length == 2 ? args[1].asInt () : 2147483647);
return this.addXStr (tok == 135271426 ? this.viewer.getFileAsStringBin (file, nBytesMax, false, false) : this.viewer.getFilePath (file, false));
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "evaluateWrite", 
($fz = function (args) {
if (args.length == 0) return false;
return this.addXStr (this.eval.write (args));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateScript", 
($fz = function (args, tok) {
if (tok == 135287308 && args.length != 1 || args.length == 0 || args.length > 2) return false;
var s = org.jmol.script.ScriptVariable.sValue (args[0]);
var sb =  new org.jmol.util.StringXBuilder ();
switch (tok) {
case 135271429:
var appID = (args.length == 2 ? org.jmol.script.ScriptVariable.sValue (args[1]) : ".");
if (!appID.equals (".")) sb.append (this.viewer.jsEval (appID + "\1" + s));
if (appID.equals (".") || appID.equals ("*")) this.eval.runScriptBuffer (s, sb);
break;
case 135287308:
sb.append (this.viewer.jsEval (s));
break;
}
s = sb.toString ();
var f;
return (Float.isNaN (f = org.jmol.util.Parser.parseFloatStrict (s)) ? this.addXStr (s) : s.indexOf (".") >= 0 ? this.addXFloat (f) : this.addXInt (org.jmol.util.Parser.parseInt (s)));
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "evaluateData", 
($fz = function (args) {
if (args.length != 1 && args.length != 2 && args.length != 4) return false;
var selected = org.jmol.script.ScriptVariable.sValue (args[0]);
var type = (args.length == 2 ? org.jmol.script.ScriptVariable.sValue (args[1]) : "");
if (args.length == 4) {
var iField = args[1].asInt ();
var nBytes = args[2].asInt ();
var firstLine = args[3].asInt ();
var f = org.jmol.util.Parser.extractData (selected, iField, nBytes, firstLine);
return this.addXStr (org.jmol.util.Escape.escapeFloatA (f, false));
}if (selected.indexOf ("data2d_") == 0) {
var f1 = this.viewer.getDataFloat2D (selected);
if (f1 == null) return this.addXStr ("");
if (args.length == 2 && args[1].tok == 2) {
var pt = args[1].intValue;
if (pt < 0) pt += f1.length;
if (pt >= 0 && pt < f1.length) return this.addXStr (org.jmol.util.Escape.escapeFloatA (f1[pt], false));
return this.addXStr ("");
}return this.addXStr (org.jmol.util.Escape.escapeFloatAA (f1, false));
}if (selected.indexOf ("property_") == 0) {
var f1 = this.viewer.getDataFloat (selected);
if (f1 == null) return this.addXStr ("");
var f2 = (type.indexOf ("property_") == 0 ? this.viewer.getDataFloat (type) : null);
if (f2 != null) {
f1 = org.jmol.util.ArrayUtil.arrayCopyF (f1, -1);
for (var i = Math.min (f1.length, f2.length); --i >= 0; ) f1[i] += f2[i];

}return this.addXStr (org.jmol.util.Escape.escapeFloatA (f1, false));
}if (args.length == 1) {
var data = this.viewer.getData (selected);
return this.addXStr (data == null ? "" : "" + data[1]);
}return this.addXStr (this.viewer.getData (selected, type));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateLabel", 
($fz = function (intValue, args) {
var x1 = (args.length < 2 ? this.getX () : null);
var format = (args.length == 0 ? "%U" : org.jmol.script.ScriptVariable.sValue (args[0]));
var asArray = org.jmol.script.Token.tokAttr (intValue, 480);
if (x1 == null) return this.addXStr (org.jmol.script.ScriptVariable.sprintfArray (args));
var bs = org.jmol.script.ScriptVariable.getBitSet (x1, true);
if (bs == null) return this.addXObj (org.jmol.script.ScriptVariable.sprintf (org.jmol.util.TextFormat.formatCheck (format), x1));
return this.addXObj (this.eval.getBitsetIdent (bs, format, x1.value, true, x1.index, asArray));
}, $fz.isPrivate = true, $fz), "~N,~A");
Clazz.defineMethod (c$, "evaluateWithin", 
($fz = function (args) {
if (args.length < 1 || args.length > 5) return false;
var i = args.length;
var distance = 0;
var withinSpec = args[0].value;
var withinStr = "" + withinSpec;
var tok = args[0].tok;
if (tok == 4) tok = org.jmol.script.Token.getTokFromName (withinStr);
var isVdw = (tok == 1649412112);
if (isVdw) {
distance = 100;
withinSpec = null;
}var bs;
var isWithinModelSet = false;
var isWithinGroup = false;
var isDistance = (isVdw || tok == 3 || tok == 2);
var rd = null;
switch (tok) {
case 1048580:
if (i != 3 || !(Clazz.instanceOf (args[1].value, org.jmol.util.BitSet)) || !(Clazz.instanceOf (args[2].value, org.jmol.util.BitSet))) return false;
return this.addXBs (this.viewer.getBranchBitSet ((args[2].value).nextSetBit (0), (args[1].value).nextSetBit (0)));
case 135267336:
case 1238369286:
case 135267335:
var bsSelected = null;
var isOK = true;
switch (i) {
case 2:
break;
case 3:
isOK = (args[2].tok == 10);
if (isOK) bsSelected = args[2].value;
break;
default:
isOK = false;
}
if (!isOK) this.eval.error (22);
return this.addXObj (this.eval.getSmilesMatches (org.jmol.script.ScriptVariable.sValue (args[1]), null, bsSelected, null, tok == 135267335, this.asBitSet));
}
if (Clazz.instanceOf (withinSpec, String)) {
if (tok == 0) {
tok = 1048614;
if (i > 2) return false;
i = 2;
}} else if (isDistance) {
if (!isVdw) distance = org.jmol.script.ScriptVariable.fValue (args[0]);
if (i < 2) return false;
switch (tok = args[1].tok) {
case 1048589:
case 1048588:
isWithinModelSet = args[1].asBoolean ();
i = 0;
break;
case 4:
var s = org.jmol.script.ScriptVariable.sValue (args[1]);
if (s.startsWith ("$")) return this.addXBs (this.eval.getAtomsNearSurface (distance, s.substring (1)));
isWithinGroup = (s.equalsIgnoreCase ("group"));
isVdw = (s.equalsIgnoreCase ("vanderwaals"));
if (isVdw) {
withinSpec = null;
tok = 1649412112;
} else {
tok = 1087373318;
}break;
}
} else {
return false;
}var pt = null;
var plane = null;
switch (i) {
case 1:
switch (tok) {
case 137363468:
case 3145760:
case 1679429641:
return this.addXBs (this.viewer.getAtomBits (tok, null));
case 1073741864:
return this.addXBs (this.viewer.getAtomBits (tok, ""));
case 1048614:
return this.addXBs (this.viewer.getAtomBits (1087373320, withinStr));
}
return false;
case 2:
switch (tok) {
case 1048614:
tok = 1087373320;
break;
case 1087375362:
case 1087375361:
case 1073741864:
case 1087373320:
return this.addXBs (this.viewer.getAtomBits (tok, org.jmol.script.ScriptVariable.sValue (args[args.length - 1])));
}
break;
case 3:
switch (tok) {
case 1048589:
case 1048588:
case 1087373318:
case 1649412112:
case 135266319:
case 135267841:
case 1048582:
break;
case 1087373320:
withinStr = org.jmol.script.ScriptVariable.sValue (args[2]);
break;
default:
return false;
}
break;
}
i = args.length - 1;
if (Clazz.instanceOf (args[i].value, org.jmol.util.Point4f)) {
plane = args[i].value;
} else if (Clazz.instanceOf (args[i].value, org.jmol.util.Point3f)) {
pt = args[i].value;
if (org.jmol.script.ScriptVariable.sValue (args[1]).equalsIgnoreCase ("hkl")) plane = this.eval.getHklPlane (pt);
}if (i > 0 && plane == null && pt == null && !(Clazz.instanceOf (args[i].value, org.jmol.util.BitSet))) return false;
if (plane != null) return this.addXBs (this.viewer.getAtomsNearPlane (distance, plane));
if (pt != null) return this.addXBs (this.viewer.getAtomsNearPt (distance, pt));
bs = (args[i].tok == 10 ? org.jmol.script.ScriptVariable.bsSelectVar (args[i]) : null);
if (tok == 1087373320) return this.addXBs (this.viewer.getSequenceBits (withinStr, bs));
if (bs == null) bs =  new org.jmol.util.BitSet ();
if (!isDistance) return this.addXBs (this.viewer.getAtomBits (tok, bs));
if (isWithinGroup) return this.addXBs (this.viewer.getGroupsWithin (Clazz.floatToInt (distance), bs));
if (isVdw) rd =  new org.jmol.atomdata.RadiusData (null, (distance > 10 ? distance / 100 : distance), (distance > 10 ? org.jmol.atomdata.RadiusData.EnumType.FACTOR : org.jmol.atomdata.RadiusData.EnumType.OFFSET), org.jmol.constant.EnumVdw.AUTO);
return this.addXBs (this.viewer.getAtomsWithinRadius (distance, bs, isWithinModelSet, rd));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateContact", 
($fz = function (args) {
if (args.length < 1 || args.length > 3) return false;
var i = 0;
var distance = 100;
var tok = args[0].tok;
switch (tok) {
case 3:
case 2:
distance = org.jmol.script.ScriptVariable.fValue (args[i++]);
break;
case 10:
break;
default:
return false;
}
if (i == args.length || !(Clazz.instanceOf (args[i].value, org.jmol.util.BitSet))) return false;
var bsA = org.jmol.util.BitSetUtil.copy (org.jmol.script.ScriptVariable.bsSelectVar (args[i++]));
if (this.isSyntaxCheck) return this.addXBs ( new org.jmol.util.BitSet ());
var bsB = (i < args.length ? org.jmol.util.BitSetUtil.copy (org.jmol.script.ScriptVariable.bsSelectVar (args[i])) : null);
var rd =  new org.jmol.atomdata.RadiusData (null, (distance > 10 ? distance / 100 : distance), (distance > 10 ? org.jmol.atomdata.RadiusData.EnumType.FACTOR : org.jmol.atomdata.RadiusData.EnumType.OFFSET), org.jmol.constant.EnumVdw.AUTO);
bsB = this.eval.setContactBitSets (bsA, bsB, true, NaN, rd, false);
bsB.or (bsA);
return this.addXBs (bsB);
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateColor", 
($fz = function (args) {
var colorScheme = (args.length > 0 ? org.jmol.script.ScriptVariable.sValue (args[0]) : "");
if (colorScheme.equalsIgnoreCase ("hsl") && args.length == 2) {
var pt = org.jmol.util.Point3f.newP (org.jmol.script.ScriptVariable.ptValue (args[1]));
var hsl =  Clazz.newFloatArray (3, 0);
org.jmol.util.ColorEncoder.RGBtoHSL (pt.x, pt.y, pt.z, hsl);
pt.set (hsl[0] * 360, hsl[1] * 100, hsl[2] * 100);
return this.addXPt (pt);
}var isIsosurface = colorScheme.startsWith ("$");
var ce = (isIsosurface ? null : this.viewer.getColorEncoder (colorScheme));
if (!isIsosurface && ce == null) return this.addXStr ("");
var lo = (args.length > 1 ? org.jmol.script.ScriptVariable.fValue (args[1]) : 3.4028235E38);
var hi = (args.length > 2 ? org.jmol.script.ScriptVariable.fValue (args[2]) : 3.4028235E38);
var value = (args.length > 3 ? org.jmol.script.ScriptVariable.fValue (args[3]) : 3.4028235E38);
var getValue = (value != 3.4028235E38 || lo != 3.4028235E38 && hi == 3.4028235E38);
var haveRange = (hi != 3.4028235E38);
if (!haveRange && colorScheme.length == 0) {
value = lo;
var range = this.viewer.getCurrentColorRange ();
lo = range[0];
hi = range[1];
}if (isIsosurface) {
var id = colorScheme.substring (1);
var data = [id, null];
if (!this.viewer.getShapePropertyData (23, "colorEncoder", data)) return this.addXStr ("");
ce = data[1];
} else {
ce.setRange (lo, hi, lo > hi);
}var key = ce.getColorKey ();
if (getValue) return this.addXPt (org.jmol.util.ColorUtil.colorPointFromInt2 (ce.getArgb (hi == 3.4028235E38 ? lo : value)));
return this.addXVar (org.jmol.script.ScriptVariable.getVariableMap (key));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateConnected", 
($fz = function (args) {
if (args.length > 5) return false;
var min = -2147483648;
var max = 2147483647;
var fmin = 0;
var fmax = 3.4028235E38;
var order = 65535;
var atoms1 = null;
var atoms2 = null;
var haveDecimal = false;
var isBonds = false;
for (var i = 0; i < args.length; i++) {
var $var = args[i];
switch ($var.tok) {
case 10:
isBonds = (Clazz.instanceOf ($var.value, org.jmol.modelset.Bond.BondSet));
if (isBonds && atoms1 != null) return false;
if (atoms1 == null) atoms1 = org.jmol.script.ScriptVariable.bsSelectVar ($var);
 else if (atoms2 == null) atoms2 = org.jmol.script.ScriptVariable.bsSelectVar ($var);
 else return false;
break;
case 4:
var type = org.jmol.script.ScriptVariable.sValue ($var);
if (type.equalsIgnoreCase ("hbond")) order = 30720;
 else order = org.jmol.script.ScriptEvaluator.getBondOrderFromString (type);
if (order == 131071) return false;
break;
case 3:
haveDecimal = true;
default:
var n = $var.asInt ();
var f = $var.asFloat ();
if (max != 2147483647) return false;
if (min == -2147483648) {
min = Math.max (n, 0);
fmin = f;
} else {
max = n;
fmax = f;
}}
}
if (min == -2147483648) {
min = 1;
max = 100;
fmin = 0.1;
fmax = 1.0E8;
} else if (max == 2147483647) {
max = min;
fmax = fmin;
fmin = 0.1;
}if (atoms1 == null) atoms1 = this.viewer.getModelUndeletedAtomsBitSet (-1);
if (haveDecimal && atoms2 == null) atoms2 = atoms1;
if (atoms2 != null) {
var bsBonds =  new org.jmol.util.BitSet ();
this.viewer.makeConnections (fmin, fmax, order, 1087373321, atoms1, atoms2, bsBonds, isBonds, false, 0);
return this.addXVar (org.jmol.script.ScriptVariable.newVariable (10,  new org.jmol.modelset.Bond.BondSet (bsBonds, this.viewer.getAtomIndices (this.viewer.getAtomBits (1678770178, bsBonds)))));
}return this.addXBs (this.viewer.getAtomsConnected (min, max, order, atoms1));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "evaluateSubstructure", 
($fz = function (args, tok) {
if (args.length == 0) return false;
var bs =  new org.jmol.util.BitSet ();
var pattern = org.jmol.script.ScriptVariable.sValue (args[0]);
if (pattern.length > 0) try {
var bsSelected = (args.length == 2 && args[1].tok == 10 ? org.jmol.script.ScriptVariable.bsSelectVar (args[1]) : null);
bs = this.viewer.getSmilesMatcher ().getSubstructureSet (pattern, this.viewer.getModelSet ().atoms, this.viewer.getAtomCount (), bsSelected, tok != 135267336 && tok != 1238369286, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.eval.evalError (e.toString (), null);
} else {
throw e;
}
}
return this.addXBs (bs);
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "operate", 
($fz = function () {
var op = this.oStack[this.oPt--];
var pt;
var pt4;
var m;
var s;
var f;
if (this.logMessages) {
this.dumpStacks ("operate: " + op);
}if (this.isArrayItem && this.squareCount == 0 && this.equalCount == 1 && this.oPt < 0 && (op.tok == 269484436)) {
return true;
}var x2 = this.getX ();
if (x2 === org.jmol.script.Token.tokenArraySelector) return false;
if (x2.tok == 7 || x2.tok == 11 || x2.tok == 12) x2 = org.jmol.script.ScriptVariable.selectItemVar (x2);
if (op.tok == 269484225 || op.tok == 269484226) {
if (!this.isSyntaxCheck && !x2.increment (this.incrementX)) return false;
this.wasX = true;
this.putX (x2);
return true;
}if (op.tok == 269484144) {
if (this.isSyntaxCheck) return this.addXBool (true);
switch (x2.tok) {
case 9:
return this.addXPt4 ((org.jmol.util.Quaternion.newP4 (x2.value)).inv ().toPoint4f ());
case 11:
m = org.jmol.util.Matrix3f.newM (x2.value);
m.invert ();
return this.addXM3 (m);
case 12:
var m4 = org.jmol.util.Matrix4f.newM (x2.value);
m4.invert ();
return this.addXM4 (m4);
case 10:
return this.addXBs (org.jmol.util.BitSetUtil.copyInvert (org.jmol.script.ScriptVariable.bsSelectVar (x2), (Clazz.instanceOf (x2.value, org.jmol.modelset.Bond.BondSet) ? this.viewer.getBondCount () : this.viewer.getAtomCount ())));
default:
return this.addXBool (!x2.asBoolean ());
}
}var iv = op.intValue & -481;
if (op.tok == 269484241) {
switch (iv) {
case 1073741824:
return this.getAllProperties (x2, op.value);
case 1141899267:
case 1276117011:
case 1141899270:
if (iv == 1141899267 && Clazz.instanceOf (x2.value, org.jmol.modelset.Bond.BondSet)) break;
return this.addXInt (org.jmol.script.ScriptVariable.sizeOf (x2));
case 1141899272:
return this.addXStr (org.jmol.script.ScriptVariable.typeOf (x2));
case 1141899281:
if (x2.tok != 6) return this.addXStr ("");
var keys = (x2.value).keySet ().toArray ();
java.util.Arrays.sort (keys);
var ret =  new Array (keys.length);
for (var i = 0; i < keys.length; i++) ret[i] = keys[i];

return this.addXAS (ret);
case 1141899268:
switch (x2.tok) {
case 11:
case 12:
s = org.jmol.script.ScriptVariable.sValue (x2);
s = org.jmol.util.TextFormat.simpleReplace (s.substring (1, s.length - 1), "],[", "]\n[");
break;
case 4:
s = x2.value;
break;
default:
s = org.jmol.script.ScriptVariable.sValue (x2);
}
s = org.jmol.util.TextFormat.simpleReplace (s, "\n\r", "\n").$replace ('\r', '\n');
return this.addXAS (org.jmol.util.TextFormat.split (s, '\n'));
case 1766856708:
switch (x2.tok) {
case 4:
case 7:
s = org.jmol.script.ScriptVariable.sValue (x2);
pt =  new org.jmol.util.Point3f ();
return this.addXPt (org.jmol.util.ColorUtil.colorPointFromString (s, pt));
case 2:
case 3:
return this.addXPt (this.viewer.getColorPointForPropertyValue (org.jmol.script.ScriptVariable.fValue (x2)));
case 8:
return this.addXStr (org.jmol.util.Escape.escapeColor (org.jmol.util.ColorUtil.colorPtToInt (x2.value)));
default:
}
break;
case 1679429641:
return (this.isSyntaxCheck ? this.addXStr ("x") : this.getBoundBox (x2));
}
if (this.isSyntaxCheck) return this.addXStr (org.jmol.script.ScriptVariable.sValue (x2));
if (x2.tok == 4) {
var v = org.jmol.script.ScriptVariable.unescapePointOrBitsetAsVariable (org.jmol.script.ScriptVariable.sValue (x2));
if (!(Clazz.instanceOf (v, org.jmol.script.ScriptVariable))) return false;
x2 = v;
}if (op.tok == x2.tok) x2 = this.getX ();
return this.getPointOrBitsetOperation (op, x2);
}var x1 = this.getX ();
if (this.isSyntaxCheck) {
if (op === org.jmol.script.Token.tokenAndFALSE || op === org.jmol.script.Token.tokenOrTRUE) this.isSyntaxCheck = false;
return this.addXVar (org.jmol.script.ScriptVariable.newScriptVariableToken (x1));
}switch (op.tok) {
case 269484160:
case 269484128:
switch (x1.tok) {
case 10:
var bs = org.jmol.script.ScriptVariable.bsSelectVar (x1);
switch (x2.tok) {
case 10:
bs = org.jmol.util.BitSetUtil.copy (bs);
bs.and (org.jmol.script.ScriptVariable.bsSelectVar (x2));
return this.addXBs (bs);
case 2:
var x = x2.asInt ();
return (this.addXBool (x < 0 ? false : bs.get (x)));
}
break;
}
return this.addXBool (x1.asBoolean () && x2.asBoolean ());
case 269484112:
switch (x1.tok) {
case 10:
var bs = org.jmol.util.BitSetUtil.copy (org.jmol.script.ScriptVariable.bsSelectVar (x1));
switch (x2.tok) {
case 10:
bs.or (org.jmol.script.ScriptVariable.bsSelectVar (x2));
return this.addXBs (bs);
case 2:
var x = x2.asInt ();
if (x < 0) break;
bs.set (x);
return this.addXBs (bs);
case 7:
var sv = x2.value;
for (var i = sv.size (); --i >= 0; ) {
var b = sv.get (i).asInt ();
if (b >= 0) bs.set (b);
}
return this.addXBs (bs);
}
break;
case 7:
return this.addXVar (org.jmol.script.ScriptVariable.concatList (x1, x2, false));
}
return this.addXBool (x1.asBoolean () || x2.asBoolean ());
case 269484113:
if (x1.tok == 10 && x2.tok == 10) {
var bs = org.jmol.util.BitSetUtil.copy (org.jmol.script.ScriptVariable.bsSelectVar (x1));
bs.xor (org.jmol.script.ScriptVariable.bsSelectVar (x2));
return this.addXBs (bs);
}var a = x1.asBoolean ();
var b = x2.asBoolean ();
return this.addXBool (a && !b || b && !a);
case 269484114:
if (x1.tok != 10 || x2.tok != 10) return false;
return this.addXBs (org.jmol.util.BitSetUtil.toggleInPlace (org.jmol.util.BitSetUtil.copy (org.jmol.script.ScriptVariable.bsSelectVar (x1)), org.jmol.script.ScriptVariable.bsSelectVar (x2)));
case 269484434:
return this.addXBool (x1.asFloat () <= x2.asFloat ());
case 269484433:
return this.addXBool (x1.asFloat () >= x2.asFloat ());
case 269484432:
return this.addXBool (x1.asFloat () > x2.asFloat ());
case 269484435:
return this.addXBool (x1.asFloat () < x2.asFloat ());
case 269484436:
return this.addXBool (org.jmol.script.ScriptVariable.areEqual (x1, x2));
case 269484438:
return this.addXBool (!org.jmol.script.ScriptVariable.areEqual (x1, x2));
case 269484193:
switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () + x2.asFloat ());
case 7:
return this.addXVar (org.jmol.script.ScriptVariable.concatList (x1, x2, true));
case 2:
switch (x2.tok) {
case 4:
if ((s = (org.jmol.script.ScriptVariable.sValue (x2)).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.intValue + x2.asInt ());
break;
case 3:
return this.addXFloat (x1.intValue + x2.asFloat ());
}
return this.addXInt (x1.intValue + x2.asInt ());
case 4:
return this.addXVar (org.jmol.script.ScriptVariable.newVariable (4, org.jmol.script.ScriptVariable.sValue (x1) + org.jmol.script.ScriptVariable.sValue (x2)));
case 9:
var q1 = org.jmol.util.Quaternion.newP4 (x1.value);
switch (x2.tok) {
default:
return this.addXPt4 (q1.add (x2.asFloat ()).toPoint4f ());
case 9:
return this.addXPt4 (q1.mulQ (org.jmol.util.Quaternion.newP4 (x2.value)).toPoint4f ());
}
case 8:
pt = org.jmol.util.Point3f.newP (x1.value);
switch (x2.tok) {
case 8:
pt.add (x2.value);
return this.addXPt (pt);
case 9:
pt4 = x2.value;
pt.add (org.jmol.util.Point3f.new3 (pt4.x, pt4.y, pt4.z));
return this.addXPt (pt);
default:
f = x2.asFloat ();
return this.addXPt (org.jmol.util.Point3f.new3 (pt.x + f, pt.y + f, pt.z + f));
}
case 11:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () + x2.asFloat ());
case 11:
m = org.jmol.util.Matrix3f.newM (x1.value);
m.add (x2.value);
return this.addXM3 (m);
case 8:
return this.addXM4 (org.jmol.script.ScriptMathProcessor.getMatrix4f (x1.value, x2.value));
}
}
case 269484192:
if (x1.tok == 2) {
if (x2.tok == 4) {
if ((s = (org.jmol.script.ScriptVariable.sValue (x2)).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.intValue - x2.asInt ());
} else if (x2.tok != 3) return this.addXInt (x1.intValue - x2.asInt ());
}if (x1.tok == 4 && x2.tok == 2) {
if ((s = (org.jmol.script.ScriptVariable.sValue (x1)).trim ()).indexOf (".") < 0 && s.indexOf ("+") <= 0 && s.lastIndexOf ("-") <= 0) return this.addXInt (x1.asInt () - x2.intValue);
}switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 6:
var ht =  new java.util.Hashtable (x1.value);
ht.remove (org.jmol.script.ScriptVariable.sValue (x2));
return this.addXVar (org.jmol.script.ScriptVariable.getVariableMap (ht));
case 11:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 11:
m = org.jmol.util.Matrix3f.newM (x1.value);
m.sub (x2.value);
return this.addXM3 (m);
}
case 12:
switch (x2.tok) {
default:
return this.addXFloat (x1.asFloat () - x2.asFloat ());
case 12:
var m4 = org.jmol.util.Matrix4f.newM (x1.value);
m4.sub (x2.value);
return this.addXM4 (m4);
}
case 8:
pt = org.jmol.util.Point3f.newP (x1.value);
switch (x2.tok) {
default:
f = x2.asFloat ();
return this.addXPt (org.jmol.util.Point3f.new3 (pt.x - f, pt.y - f, pt.z - f));
case 8:
pt.sub (x2.value);
return this.addXPt (pt);
case 9:
pt4 = x2.value;
pt.sub (org.jmol.util.Point3f.new3 (pt4.x, pt4.y, pt4.z));
return this.addXPt (pt);
}
case 9:
var q1 = org.jmol.util.Quaternion.newP4 (x1.value);
switch (x2.tok) {
default:
return this.addXPt4 (q1.add (-x2.asFloat ()).toPoint4f ());
case 9:
var q2 = org.jmol.util.Quaternion.newP4 (x2.value);
return this.addXPt4 (q2.mulQ (q1.inv ()).toPoint4f ());
}
}
case 269484224:
switch (x2.tok) {
default:
return this.addXFloat (-x2.asFloat ());
case 2:
return this.addXInt (-x2.asInt ());
case 8:
pt = org.jmol.util.Point3f.newP (x2.value);
pt.scale (-1.0);
return this.addXPt (pt);
case 9:
pt4 = org.jmol.util.Point4f.newPt (x2.value);
pt4.scale (-1.0);
return this.addXPt4 (pt4);
case 11:
m = org.jmol.util.Matrix3f.newM (x2.value);
m.transpose ();
return this.addXM3 (m);
case 12:
var m4 = org.jmol.util.Matrix4f.newM (x2.value);
m4.transpose ();
return this.addXM4 (m4);
case 10:
return this.addXBs (org.jmol.util.BitSetUtil.copyInvert (org.jmol.script.ScriptVariable.bsSelectVar (x2), (Clazz.instanceOf (x2.value, org.jmol.modelset.Bond.BondSet) ? this.viewer.getBondCount () : this.viewer.getAtomCount ())));
}
case 269484209:
if (x1.tok == 2 && x2.tok != 3) return this.addXInt (x1.intValue * x2.asInt ());
pt = (x1.tok == 11 ? this.ptValue (x2, false) : x2.tok == 11 ? this.ptValue (x1, false) : null);
pt4 = (x1.tok == 12 ? this.planeValue (x2) : x2.tok == 12 ? this.planeValue (x1) : null);
switch (x2.tok) {
case 11:
if (pt != null) {
var m3b = org.jmol.util.Matrix3f.newM (x2.value);
m3b.transpose ();
m3b.transform (pt);
if (x1.tok == 7) return this.addXVar (org.jmol.script.ScriptVariable.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}if (pt4 != null) {
return this.addXPt4 ((org.jmol.util.Quaternion.newP4 (pt4).mulQ (org.jmol.util.Quaternion.newM (x2.value))).toPoint4f ());
}break;
case 12:
if (pt4 != null) {
var m4b = org.jmol.util.Matrix4f.newM (x2.value);
m4b.transpose ();
m4b.transform4 (pt4);
if (x1.tok == 7) return this.addXVar (org.jmol.script.ScriptVariable.getVariableAF ([pt4.x, pt4.y, pt4.z, pt4.w]));
return this.addXPt4 (pt4);
}break;
}
switch (x1.tok) {
default:
return this.addXFloat (x1.asFloat () * x2.asFloat ());
case 11:
var m3 = x1.value;
if (pt != null) {
m3.transform (pt);
if (x2.tok == 7) return this.addXVar (org.jmol.script.ScriptVariable.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}switch (x2.tok) {
case 11:
m = org.jmol.util.Matrix3f.newM (x2.value);
m.mul2 (m3, m);
return this.addXM3 (m);
case 9:
return this.addXM3 (org.jmol.util.Quaternion.newM (m3).mulQ (org.jmol.util.Quaternion.newP4 (x2.value)).getMatrix ());
default:
f = x2.asFloat ();
var aa =  new org.jmol.util.AxisAngle4f ();
aa.setM (m3);
aa.angle *= f;
var m2 =  new org.jmol.util.Matrix3f ();
m2.setAA (aa);
return this.addXM3 (m2);
}
case 12:
var m4 = x1.value;
if (pt != null) {
m4.transform (pt);
if (x2.tok == 7) return this.addXVar (org.jmol.script.ScriptVariable.getVariableAF ([pt.x, pt.y, pt.z]));
return this.addXPt (pt);
}if (pt4 != null) {
m4.transform4 (pt4);
if (x2.tok == 7) return this.addXVar (org.jmol.script.ScriptVariable.getVariableAF ([pt4.x, pt4.y, pt4.z, pt4.w]));
return this.addXPt4 (pt4);
}switch (x2.tok) {
case 12:
var m4b = org.jmol.util.Matrix4f.newM (x2.value);
m4b.mul2 (m4, m4b);
return this.addXM4 (m4b);
default:
return this.addXStr ("NaN");
}
case 8:
pt = org.jmol.util.Point3f.newP (x1.value);
switch (x2.tok) {
case 8:
var pt2 = (x2.value);
return this.addXFloat (pt.x * pt2.x + pt.y * pt2.y + pt.z * pt2.z);
default:
f = x2.asFloat ();
return this.addXPt (org.jmol.util.Point3f.new3 (pt.x * f, pt.y * f, pt.z * f));
}
case 9:
switch (x2.tok) {
case 9:
return this.addXPt4 (org.jmol.util.Quaternion.newP4 (x1.value).mulQ (org.jmol.util.Quaternion.newP4 (x2.value)).toPoint4f ());
}
return this.addXPt4 (org.jmol.util.Quaternion.newP4 (x1.value).mul (x2.asFloat ()).toPoint4f ());
}
case 269484210:
s = null;
var n = x2.asInt ();
switch (x1.tok) {
case 1048589:
case 1048588:
case 2:
default:
if (n == 0) return this.addXInt (0);
return this.addXInt (x1.asInt () % n);
case 3:
f = x1.asFloat ();
if (n == 0) return this.addXInt (Math.round (f));
s = org.jmol.util.TextFormat.formatDecimal (f, n);
return this.addXStr (s);
case 4:
s = x1.value;
if (n == 0) return this.addXStr (org.jmol.util.TextFormat.trim (s, "\n\t "));
if (n == 9999) return this.addXStr (s.toUpperCase ());
if (n == -9999) return this.addXStr (s.toLowerCase ());
if (n > 0) return this.addXStr (org.jmol.util.TextFormat.formatS (s, n, n, false, false));
return this.addXStr (org.jmol.util.TextFormat.formatS (s, n, n - 1, true, false));
case 7:
var list = org.jmol.script.ScriptVariable.listValue (x1);
for (var i = 0; i < list.length; i++) {
if (n == 0) list[i] = list[i].trim ();
 else if (n > 0) list[i] = org.jmol.util.TextFormat.formatS (list[i], n, n, true, false);
 else list[i] = org.jmol.util.TextFormat.formatS (s, -n, n, false, false);
}
return this.addXAS (list);
case 8:
pt = org.jmol.util.Point3f.newP (x1.value);
this.viewer.toUnitCell (pt, org.jmol.util.Point3f.new3 (n, n, n));
return this.addXPt (pt);
case 9:
pt4 = x1.value;
if (x2.tok == 8) return this.addXPt ((org.jmol.util.Quaternion.newP4 (pt4)).transformPt (x2.value));
if (x2.tok == 9) {
var v4 = org.jmol.util.Point4f.newPt (x2.value);
(org.jmol.util.Quaternion.newP4 (pt4)).getThetaDirected (v4);
return this.addXPt4 (v4);
}switch (n) {
case 0:
return this.addXFloat (pt4.w);
case 1:
return this.addXFloat (pt4.x);
case 2:
return this.addXFloat (pt4.y);
case 3:
return this.addXFloat (pt4.z);
case 4:
return this.addXPt (org.jmol.util.Point3f.newP ((org.jmol.util.Quaternion.newP4 (pt4)).getNormal ()));
case -1:
return this.addXPt (org.jmol.util.Point3f.newP (org.jmol.util.Quaternion.newP4 (pt4).getVector (-1)));
case -2:
return this.addXFloat ((org.jmol.util.Quaternion.newP4 (pt4)).getTheta ());
case -3:
return this.addXPt (org.jmol.util.Point3f.newP ((org.jmol.util.Quaternion.newP4 (pt4)).getVector (0)));
case -4:
return this.addXPt (org.jmol.util.Point3f.newP ((org.jmol.util.Quaternion.newP4 (pt4)).getVector (1)));
case -5:
return this.addXPt (org.jmol.util.Point3f.newP ((org.jmol.util.Quaternion.newP4 (pt4)).getVector (2)));
case -6:
var ax = (org.jmol.util.Quaternion.newP4 (pt4)).toAxisAngle4f ();
return this.addXPt4 (org.jmol.util.Point4f.new4 (ax.x, ax.y, ax.z, (ax.angle * 180 / 3.141592653589793)));
case -9:
return this.addXM3 ((org.jmol.util.Quaternion.newP4 (pt4)).getMatrix ());
default:
return this.addXPt4 (pt4);
}
case 12:
var m4 = x1.value;
switch (n) {
case 1:
var m3 =  new org.jmol.util.Matrix3f ();
m4.getRotationScale (m3);
return this.addXM3 (m3);
case 2:
var v3 =  new org.jmol.util.Vector3f ();
m4.get (v3);
return this.addXPt (org.jmol.util.Point3f.newP (v3));
default:
return false;
}
case 10:
return this.addXBs (org.jmol.script.ScriptVariable.bsSelectRange (x1, n));
}
case 269484208:
if (x1.tok == 2 && x2.tok == 2 && x2.intValue != 0) return this.addXInt (Clazz.doubleToInt (x1.intValue / x2.intValue));
var f2 = x2.asFloat ();
switch (x1.tok) {
default:
var f1 = x1.asFloat ();
return this.addXFloat (f1 / f2);
case 8:
pt = org.jmol.util.Point3f.newP (x1.value);
if (f2 == 0) return this.addXPt (org.jmol.util.Point3f.new3 (NaN, NaN, NaN));
return this.addXPt (org.jmol.util.Point3f.new3 (pt.x / f2, pt.y / f2, pt.z / f2));
case 9:
if (x2.tok == 9) return this.addXPt4 (org.jmol.util.Quaternion.newP4 (x1.value).div (org.jmol.util.Quaternion.newP4 (x2.value)).toPoint4f ());
if (f2 == 0) return this.addXPt4 (org.jmol.util.Point4f.new4 (NaN, NaN, NaN, NaN));
return this.addXPt4 (org.jmol.util.Quaternion.newP4 (x1.value).mul (1 / f2).toPoint4f ());
}
case 269484211:
f = x2.asFloat ();
switch (x1.tok) {
default:
return this.addXInt (f == 0 ? 0 : Clazz.doubleToInt (Math.floor (x1.asFloat () / x2.asFloat ())));
case 9:
if (f == 0) return this.addXPt4 (org.jmol.util.Point4f.new4 (NaN, NaN, NaN, NaN));
if (x2.tok == 9) return this.addXPt4 (org.jmol.util.Quaternion.newP4 (x1.value).divLeft (org.jmol.util.Quaternion.newP4 (x2.value)).toPoint4f ());
return this.addXPt4 (org.jmol.util.Quaternion.newP4 (x1.value).mul (1 / f).toPoint4f ());
}
case 269484227:
f = Math.pow (x1.asFloat (), x2.asFloat ());
return (x1.tok == 2 && x2.tok == 2 ? this.addXInt (Clazz.floatToInt (f)) : this.addXFloat (f));
}
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getAllProperties", 
($fz = function (x2, abbr) {
if (x2.tok != 10) return false;
if (this.isSyntaxCheck) return this.addXStr ("");
var bs = org.jmol.script.ScriptVariable.bsSelectVar (x2);
var tokens;
var n = bs.cardinality ();
if (n == 0 || (tokens = org.jmol.script.Token.getAtomPropertiesLike (abbr.substring (0, abbr.length - 1))) == null) return this.addXStr ("");
var ht =  new java.util.Hashtable ();
var index = (n == 1 ? bs.nextSetBit (0) : 2147483647);
for (var i = tokens.size (); --i >= 0; ) {
var t = tokens.get (i);
var tok = t.tok;
switch (tok) {
case 1095766022:
case 1095761925:
continue;
default:
if (index == 2147483647) tok |= 480;
ht.put (t.value, org.jmol.script.ScriptVariable.getVariable (this.eval.getBitsetProperty (bs, tok, null, null, null, null, false, index, true)));
}
}
return this.addXMap (ht);
}, $fz.isPrivate = true, $fz), "org.jmol.script.ScriptVariable,~S");
c$.getMatrix4f = Clazz.defineMethod (c$, "getMatrix4f", 
function (matRotate, vTranslate) {
return org.jmol.util.Matrix4f.newMV (matRotate, vTranslate == null ?  new org.jmol.util.Vector3f () : org.jmol.util.Vector3f.newV (vTranslate));
}, "org.jmol.util.Matrix3f,org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "getBoundBox", 
($fz = function (x2) {
if (x2.tok != 10) return false;
if (this.isSyntaxCheck) return this.addXStr ("");
var b = this.viewer.getBoxInfo (org.jmol.script.ScriptVariable.bsSelectVar (x2), 1);
var pts = b.getBoundBoxPoints (true);
var list =  new java.util.ArrayList ();
for (var i = 0; i < 4; i++) list.add (pts[i]);

return this.addXList (list);
}, $fz.isPrivate = true, $fz), "org.jmol.script.ScriptVariable");
Clazz.defineMethod (c$, "getPointOrBitsetOperation", 
($fz = function (op, x2) {
switch (x2.tok) {
case 7:
switch (op.intValue) {
case 32:
case 64:
case 96:
case 192:
case 128:
case 160:
return this.addXObj (org.jmol.script.ScriptMathProcessor.getMinMax (x2.getList (), op.intValue));
case 1276117010:
case 1141899269:
return this.addXVar (x2.sortOrReverse (op.intValue == 1141899269 ? -2147483648 : 1));
}
var list2 =  new Array (x2.getList ().size ());
for (var i = 0; i < list2.length; i++) {
var v = org.jmol.script.ScriptVariable.unescapePointOrBitsetAsVariable (x2.getList ().get (i));
if (!(Clazz.instanceOf (v, org.jmol.script.ScriptVariable)) || !this.getPointOrBitsetOperation (op, v)) return false;
list2[i] = this.xStack[this.xPt--];
}
return this.addXAV (list2);
case 8:
switch (op.intValue) {
case 1112541185:
case 1112541205:
return this.addXFloat ((x2.value).x);
case 1112541186:
case 1112541206:
return this.addXFloat ((x2.value).y);
case 1112541187:
case 1112541207:
return this.addXFloat ((x2.value).z);
case 1146095626:
var pt = org.jmol.util.Point3f.newP (x2.value);
this.viewer.toCartesian (pt, true);
return this.addXPt (pt);
case 1112541188:
case 1112541189:
case 1112541190:
case 1146095627:
var ptf = org.jmol.util.Point3f.newP (x2.value);
this.viewer.toFractional (ptf, true);
return (op.intValue == 1146095627 ? this.addXPt (ptf) : this.addXFloat (op.intValue == 1112541188 ? ptf.x : op.intValue == 1112541189 ? ptf.y : ptf.z));
case 1112541191:
case 1112541192:
case 1112541193:
case 1146095629:
var ptfu = org.jmol.util.Point3f.newP (x2.value);
this.viewer.toFractional (ptfu, false);
return (op.intValue == 1146095627 ? this.addXPt (ptfu) : this.addXFloat (op.intValue == 1112541191 ? ptfu.x : op.intValue == 1112541192 ? ptfu.y : ptfu.z));
case 1112539151:
case 1112539152:
case 1112539153:
case 1146093582:
var ptu = org.jmol.util.Point3f.newP (x2.value);
this.viewer.toUnitCell (ptu, null);
this.viewer.toFractional (ptu, false);
return (op.intValue == 1146093582 ? this.addXPt (ptu) : this.addXFloat (op.intValue == 1112539151 ? ptu.x : op.intValue == 1112539152 ? ptu.y : ptu.z));
}
break;
case 9:
switch (op.intValue) {
case 1112541185:
case 1112541205:
return this.addXFloat ((x2.value).x);
case 1112541186:
case 1112541206:
return this.addXFloat ((x2.value).y);
case 1112541187:
case 1112541207:
return this.addXFloat ((x2.value).z);
case 1141899280:
return this.addXFloat ((x2.value).w);
}
break;
case 10:
if (op.intValue == 1678770178 && Clazz.instanceOf (x2.value, org.jmol.modelset.Bond.BondSet)) return this.addXVar (x2);
var bs = org.jmol.script.ScriptVariable.bsSelectVar (x2);
if (bs.cardinality () == 1 && (op.intValue & 480) == 0) op.intValue |= 32;
var val = this.eval.getBitsetProperty (bs, op.intValue, null, null, x2.value, op.value, false, x2.index, true);
if (op.intValue != 1678770178) return this.addXObj (val);
return this.addXVar (org.jmol.script.ScriptVariable.newVariable (10,  new org.jmol.modelset.Bond.BondSet (val, this.viewer.getAtomIndices (bs))));
}
return false;
}, $fz.isPrivate = true, $fz), "org.jmol.script.Token,org.jmol.script.ScriptVariable");
c$.getMinMax = Clazz.defineMethod (c$, "getMinMax", 
($fz = function (floatOrSVArray, tok) {
var data = null;
var sv = null;
var ndata = 0;
while (true) {
if (org.jmol.util.Escape.isAF (floatOrSVArray)) {
data = floatOrSVArray;
ndata = data.length;
if (ndata == 0) break;
} else if (Clazz.instanceOf (floatOrSVArray, java.util.List)) {
sv = floatOrSVArray;
ndata = sv.size ();
if (ndata == 0) break;
var sv0 = sv.get (0);
if (sv0.tok == 4 && (sv0.value).startsWith ("{")) {
var pt = org.jmol.script.ScriptVariable.ptValue (sv0);
if (Clazz.instanceOf (pt, org.jmol.util.Point3f)) return org.jmol.script.ScriptMathProcessor.getMinMaxPoint (sv, tok);
if (Clazz.instanceOf (pt, org.jmol.util.Point4f)) return org.jmol.script.ScriptMathProcessor.getMinMaxQuaternion (sv, tok);
break;
}} else {
break;
}var sum;
switch (tok) {
case 32:
sum = 3.4028235E38;
break;
case 64:
sum = -3.4028235E38;
break;
default:
sum = 0;
}
var sum2 = 0;
var n = 0;
for (var i = ndata; --i >= 0; ) {
var v = (data == null ? org.jmol.script.ScriptVariable.fValue (sv.get (i)) : data[i]);
if (Float.isNaN (v)) continue;
n++;
switch (tok) {
case 160:
case 192:
sum2 += (v) * v;
case 128:
case 96:
sum += v;
break;
case 32:
if (v < sum) sum = v;
break;
case 64:
if (v > sum) sum = v;
break;
}
}
if (n == 0) break;
switch (tok) {
case 96:
sum /= n;
break;
case 192:
if (n == 1) break;
sum = Math.sqrt ((sum2 - sum * sum / n) / (n - 1));
break;
case 32:
case 64:
case 128:
break;
case 160:
sum = sum2;
break;
}
return Float.$valueOf (sum);
}
return "NaN";
}, $fz.isPrivate = true, $fz), "~O,~N");
c$.getMinMaxPoint = Clazz.defineMethod (c$, "getMinMaxPoint", 
($fz = function (pointOrSVArray, tok) {
var data = null;
var sv = null;
var ndata = 0;
if (Clazz.instanceOf (pointOrSVArray, Array)) {
data = pointOrSVArray;
ndata = data.length;
} else if (Clazz.instanceOf (pointOrSVArray, java.util.List)) {
sv = pointOrSVArray;
ndata = sv.size ();
}if (sv != null || data != null) {
var result =  new org.jmol.util.Point3f ();
var fdata =  Clazz.newFloatArray (ndata, 0);
var ok = true;
for (var xyz = 0; xyz < 3 && ok; xyz++) {
for (var i = 0; i < ndata; i++) {
var pt = (data == null ? org.jmol.script.ScriptVariable.ptValue (sv.get (i)) : data[i]);
if (pt == null) {
ok = false;
break;
}switch (xyz) {
case 0:
fdata[i] = pt.x;
break;
case 1:
fdata[i] = pt.y;
break;
case 2:
fdata[i] = pt.z;
break;
}
}
if (!ok) break;
var f = org.jmol.script.ScriptMathProcessor.getMinMax (fdata, tok);
if (Clazz.instanceOf (f, Float)) {
var value = (f).floatValue ();
switch (xyz) {
case 0:
result.x = value;
break;
case 1:
result.y = value;
break;
case 2:
result.z = value;
break;
}
} else {
break;
}}
return result;
}return "NaN";
}, $fz.isPrivate = true, $fz), "~O,~N");
c$.getMinMaxQuaternion = Clazz.defineMethod (c$, "getMinMaxQuaternion", 
($fz = function (svData, tok) {
var data;
switch (tok) {
case 32:
case 64:
case 128:
case 160:
return "NaN";
}
while (true) {
data = org.jmol.script.ScriptMathProcessor.getQuaternionArray (svData, 1073742001);
if (data == null) break;
var retStddev =  Clazz.newFloatArray (1, 0);
var result = org.jmol.util.Quaternion.sphereMean (data, retStddev, 0.0001);
switch (tok) {
case 96:
return result;
case 192:
return  new Float (retStddev[0]);
}
break;
}
return "NaN";
}, $fz.isPrivate = true, $fz), "java.util.List,~N");
c$.getQuaternionArray = Clazz.defineMethod (c$, "getQuaternionArray", 
function (quaternionOrSVData, itype) {
var data;
switch (itype) {
case 135270417:
data = quaternionOrSVData;
break;
case 9:
var pts = quaternionOrSVData;
data =  new Array (pts.length);
for (var i = 0; i < pts.length; i++) data[i] = org.jmol.util.Quaternion.newP4 (pts[i]);

break;
case 1073742001:
var sv = quaternionOrSVData;
data =  new Array (sv.size ());
for (var i = 0; i < sv.size (); i++) {
var pt = org.jmol.script.ScriptVariable.pt4Value (sv.get (i));
if (pt == null) return null;
data[i] = org.jmol.util.Quaternion.newP4 (pt);
}
break;
default:
return null;
}
return data;
}, "~O,~N");
});
