Clazz.declarePackage ("org.jmol.script");
Clazz.load (["org.jmol.script.Token", "org.jmol.util.Point3f"], "org.jmol.script.ScriptVariable", ["java.lang.Boolean", "$.Float", "java.util.ArrayList", "$.Arrays", "$.Collections", "$.Hashtable", "org.jmol.modelset.Bond", "org.jmol.util.BitSet", "$.BitSetUtil", "$.Escape", "$.Measure", "$.Parser", "$.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.index = 2147483647;
this.flags = 2;
this.myName = null;
if (!Clazz.isClassDefined ("org.jmol.script.ScriptVariable.Sort")) {
org.jmol.script.ScriptVariable.$ScriptVariable$Sort$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.script, "ScriptVariable", org.jmol.script.Token);
Clazz.makeConstructor (c$, 
function (tok) {
Clazz.superConstructor (this, org.jmol.script.ScriptVariable, []);
this.tok = tok;
}, "~N");
c$.newVariable = Clazz.defineMethod (c$, "newVariable", 
function (tok, value) {
var sv =  new org.jmol.script.ScriptVariable (tok);
sv.value = value;
return sv;
}, "~N,~O");
c$.newScriptVariableBs = Clazz.defineMethod (c$, "newScriptVariableBs", 
function (bs, index) {
var sv =  new org.jmol.script.ScriptVariable (10);
sv.value = bs;
if (index >= 0) sv.index = index;
return sv;
}, "org.jmol.util.BitSet,~N");
c$.newScriptVariableToken = Clazz.defineMethod (c$, "newScriptVariableToken", 
function (x) {
var sv =  new org.jmol.script.ScriptVariable (x.tok);
sv.intValue = x.intValue;
sv.value = x.value;
return sv;
}, "org.jmol.script.Token");
c$.newScriptVariableIntValue = Clazz.defineMethod (c$, "newScriptVariableIntValue", 
function (tok, intValue, value) {
var sv =  new org.jmol.script.ScriptVariable (tok);
sv.intValue = intValue;
sv.value = value;
return sv;
}, "~N,~N,~O");
c$.typeOf = Clazz.defineMethod (c$, "typeOf", 
function (x) {
var tok = (x == null ? 0 : x.tok);
switch (tok) {
case 1048589:
case 1048588:
return "boolean";
case 10:
return (Clazz.instanceOf (x.value, org.jmol.modelset.Bond.BondSet) ? "bondset" : "bitset");
case 2:
case 3:
case 8:
case 9:
case 4:
case 7:
case 6:
case 11:
case 12:
return org.jmol.script.Token.astrType[tok];
}
return "?";
}, "org.jmol.script.ScriptVariable");
c$.sizeOf = Clazz.defineMethod (c$, "sizeOf", 
function (x) {
switch (x == null ? 0 : x.tok) {
case 10:
return org.jmol.util.BitSetUtil.cardinalityOf (org.jmol.script.ScriptVariable.bsSelectToken (x));
case 1048589:
case 1048588:
return -1;
case 2:
return -2;
case 3:
return -4;
case 8:
return -8;
case 9:
return -16;
case 11:
return -32;
case 12:
return -64;
case 4:
return (x.value).length;
case 7:
return x.intValue == 2147483647 ? (x).getList ().size () : org.jmol.script.ScriptVariable.sizeOf (org.jmol.script.ScriptVariable.selectItemTok (x));
case 6:
return (x.value).size ();
default:
return 0;
}
}, "org.jmol.script.Token");
c$.isVariableType = Clazz.defineMethod (c$, "isVariableType", 
function (x) {
return (Clazz.instanceOf (x, org.jmol.script.ScriptVariable) || Clazz.instanceOf (x, org.jmol.util.BitSet) || Clazz.instanceOf (x, Boolean) || Clazz.instanceOf (x, Float) || Clazz.instanceOf (x, Integer) || Clazz.instanceOf (x, org.jmol.util.Point3f) || Clazz.instanceOf (x, org.jmol.util.Vector3f) || Clazz.instanceOf (x, org.jmol.util.Point4f) || Clazz.instanceOf (x, org.jmol.util.Quaternion) || Clazz.instanceOf (x, String) || Clazz.instanceOf (x, java.util.Map) || Clazz.instanceOf (x, java.util.List) || Clazz.instanceOf (x, Array) || Clazz.instanceOf (x, Array) || Clazz.instanceOf (x, Array) || Clazz.instanceOf (x, Array) || Clazz.instanceOf (x, Array) || Clazz.instanceOf (x, Array) || Clazz.instanceOf (x, Array) || Clazz.instanceOf (x, Array) || Clazz.instanceOf (x, Array));
}, "~O");
c$.getVariable = Clazz.defineMethod (c$, "getVariable", 
function (x) {
if (x == null) return org.jmol.script.ScriptVariable.newVariable (4, "");
if (Clazz.instanceOf (x, org.jmol.script.ScriptVariable)) return x;
if (Clazz.instanceOf (x, Boolean)) return org.jmol.script.ScriptVariable.getBoolean ((x).booleanValue ());
if (Clazz.instanceOf (x, Integer)) return  new org.jmol.script.ScriptVariableInt ((x).intValue ());
if (Clazz.instanceOf (x, Float)) return org.jmol.script.ScriptVariable.newVariable (3, x);
if (Clazz.instanceOf (x, String)) {
x = org.jmol.script.ScriptVariable.unescapePointOrBitsetAsVariable (x);
if (Clazz.instanceOf (x, org.jmol.script.ScriptVariable)) return x;
return org.jmol.script.ScriptVariable.newVariable (4, x);
}if (Clazz.instanceOf (x, org.jmol.util.Point3f)) return org.jmol.script.ScriptVariable.newVariable (8, x);
if (Clazz.instanceOf (x, org.jmol.util.Vector3f)) return org.jmol.script.ScriptVariable.newVariable (8, org.jmol.util.Point3f.newP (x));
if (Clazz.instanceOf (x, org.jmol.util.BitSet)) return org.jmol.script.ScriptVariable.newVariable (10, x);
if (Clazz.instanceOf (x, org.jmol.util.Point4f)) return org.jmol.script.ScriptVariable.newVariable (9, x);
if (Clazz.instanceOf (x, org.jmol.util.Quaternion)) return org.jmol.script.ScriptVariable.newVariable (9, (x).toPoint4f ());
if (Clazz.instanceOf (x, org.jmol.util.Matrix3f)) return org.jmol.script.ScriptVariable.newVariable (11, x);
if (Clazz.instanceOf (x, org.jmol.util.Matrix4f)) return org.jmol.script.ScriptVariable.newVariable (12, x);
if (org.jmol.util.Escape.isAFloat (x)) return org.jmol.script.ScriptVariable.newVariable (13, x);
if (Clazz.instanceOf (x, java.util.Map)) return org.jmol.script.ScriptVariable.getVariableMap (x);
if (Clazz.instanceOf (x, java.util.List)) return org.jmol.script.ScriptVariable.getVariableList (x);
if (org.jmol.util.Escape.isAI (x)) return org.jmol.script.ScriptVariable.getVariableAI (x);
if (org.jmol.util.Escape.isAF (x)) return org.jmol.script.ScriptVariable.getVariableAF (x);
if (org.jmol.util.Escape.isAD (x)) return org.jmol.script.ScriptVariable.getVariableAD (x);
if (org.jmol.util.Escape.isAII (x)) return org.jmol.script.ScriptVariable.getVariableAII (x);
if (org.jmol.util.Escape.isAFF (x)) return org.jmol.script.ScriptVariable.getVariableAFF (x);
if (org.jmol.util.Escape.isAS (x)) return org.jmol.script.ScriptVariable.getVariableAS (x);
if (org.jmol.util.Escape.isAV (x)) return org.jmol.script.ScriptVariable.getVariableAV (x);
if (org.jmol.util.Escape.isAP (x)) return org.jmol.script.ScriptVariable.getVariableAP (x);
return org.jmol.script.ScriptVariable.newVariable (4, org.jmol.util.Escape.toReadable (null, x));
}, "~O");
c$.getVariableMap = Clazz.defineMethod (c$, "getVariableMap", 
function (x) {
var ht = x;
var e = ht.keySet ().iterator ();
while (e.hasNext ()) {
if (!(Clazz.instanceOf (ht.get (e.next ()), org.jmol.script.ScriptVariable))) {
var x2 =  new java.util.Hashtable ();
for (var entry, $entry = ht.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var o = entry.getValue ();
if (org.jmol.script.ScriptVariable.isVariableType (o)) x2.put (key, org.jmol.script.ScriptVariable.getVariable (o));
 else x2.put (key, org.jmol.script.ScriptVariable.newVariable (4, org.jmol.util.Escape.toReadable (null, o)));
}
x = x2;
}break;
}
return org.jmol.script.ScriptVariable.newVariable (6, x);
}, "~O");
c$.getVariableList = Clazz.defineMethod (c$, "getVariableList", 
function (v) {
var len = v.size ();
if (len > 0 && Clazz.instanceOf (v.get (0), org.jmol.script.ScriptVariable)) return org.jmol.script.ScriptVariable.newVariable (7, v);
var objects =  new java.util.ArrayList ();
for (var i = 0; i < len; i++) objects.add (org.jmol.script.ScriptVariable.getVariable (v.get (i)));

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "java.util.List");
c$.getVariableAV = Clazz.defineMethod (c$, "getVariableAV", 
function (v) {
var objects =  new java.util.ArrayList ();
for (var i = 0; i < v.length; i++) objects.add (v[i]);

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "~A");
c$.getVariableAD = Clazz.defineMethod (c$, "getVariableAD", 
function (f) {
var objects =  new java.util.ArrayList ();
for (var i = 0; i < f.length; i++) objects.add (org.jmol.script.ScriptVariable.newVariable (3, Float.$valueOf (f[i])));

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "~A");
c$.getVariableAS = Clazz.defineMethod (c$, "getVariableAS", 
function (s) {
var objects =  new java.util.ArrayList ();
for (var i = 0; i < s.length; i++) objects.add (org.jmol.script.ScriptVariable.newVariable (4, s[i]));

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "~A");
c$.getVariableAP = Clazz.defineMethod (c$, "getVariableAP", 
function (p) {
var objects =  new java.util.ArrayList ();
for (var i = 0; i < p.length; i++) objects.add (org.jmol.script.ScriptVariable.newVariable (8, p[i]));

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "~A");
c$.getVariableAFF = Clazz.defineMethod (c$, "getVariableAFF", 
function (fx) {
var objects =  new java.util.ArrayList ();
for (var i = 0; i < fx.length; i++) objects.add (org.jmol.script.ScriptVariable.getVariableAF (fx[i]));

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "~A");
c$.getVariableAII = Clazz.defineMethod (c$, "getVariableAII", 
function (ix) {
var objects =  new java.util.ArrayList ();
for (var i = 0; i < ix.length; i++) objects.add (org.jmol.script.ScriptVariable.getVariableAI (ix[i]));

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "~A");
c$.getVariableAF = Clazz.defineMethod (c$, "getVariableAF", 
function (f) {
var objects =  new java.util.ArrayList ();
for (var i = 0; i < f.length; i++) objects.add (org.jmol.script.ScriptVariable.newVariable (3, Float.$valueOf (f[i])));

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "~A");
c$.getVariableAI = Clazz.defineMethod (c$, "getVariableAI", 
function (ix) {
var objects =  new java.util.ArrayList ();
for (var i = 0; i < ix.length; i++) objects.add (org.jmol.script.ScriptVariable.newVariable (2, Integer.$valueOf (ix[i])));

return org.jmol.script.ScriptVariable.newVariable (7, objects);
}, "~A");
Clazz.defineMethod (c$, "set", 
function (v, asCopy) {
this.index = v.index;
this.intValue = v.intValue;
this.tok = v.tok;
this.value = v.value;
if (asCopy) {
switch (this.tok) {
case 6:
this.value =  new java.util.Hashtable (v.value);
break;
case 7:
var o2 =  new java.util.ArrayList ();
var o1 = v.getList ();
for (var i = 0; i < o1.size (); i++) o2.add (o1.get (i));

this.value = o2;
break;
}
}return this;
}, "org.jmol.script.ScriptVariable,~B");
Clazz.defineMethod (c$, "setName", 
function (name) {
this.myName = name;
this.flags |= 1;
return this;
}, "~S");
Clazz.defineMethod (c$, "setGlobal", 
function () {
this.flags &= -3;
return this;
});
Clazz.defineMethod (c$, "canIncrement", 
function () {
return org.jmol.script.Token.tokAttr (this.flags, 1);
});
Clazz.defineMethod (c$, "increment", 
function (n) {
if (!this.canIncrement ()) return false;
switch (this.tok) {
case 2:
this.intValue += n;
break;
case 3:
this.value =  new Float ((this.value).floatValue () + n);
break;
default:
this.value = org.jmol.script.ScriptVariable.nValue (this);
if (Clazz.instanceOf (this.value, Integer)) {
this.tok = 2;
this.intValue = (this.value).intValue ();
} else {
this.tok = 3;
}}
return true;
}, "~N");
Clazz.defineMethod (c$, "asBoolean", 
function () {
return org.jmol.script.ScriptVariable.bValue (this);
});
Clazz.defineMethod (c$, "asInt", 
function () {
return org.jmol.script.ScriptVariable.iValue (this);
});
Clazz.defineMethod (c$, "asFloat", 
function () {
return org.jmol.script.ScriptVariable.fValue (this);
});
Clazz.defineMethod (c$, "asString", 
function () {
return org.jmol.script.ScriptVariable.sValue (this);
});
c$.oValue = Clazz.defineMethod (c$, "oValue", 
function (x) {
switch (x == null ? 0 : x.tok) {
case 1048589:
return Boolean.TRUE;
case 0:
case 1048588:
return Boolean.FALSE;
case 2:
return Integer.$valueOf (x.intValue);
case 10:
case 135266306:
return org.jmol.script.ScriptVariable.selectItemVar (x).value;
default:
return x.value;
}
}, "org.jmol.script.ScriptVariable");
c$.nValue = Clazz.defineMethod (c$, "nValue", 
function (x) {
var iValue;
switch (x == null ? 0 : x.tok) {
case 3:
return x.value;
case 2:
iValue = x.intValue;
break;
case 4:
if ((x.value).indexOf (".") >= 0) return  new Float (org.jmol.script.ScriptVariable.toFloat (x.value));
iValue = Clazz.floatToInt (org.jmol.script.ScriptVariable.toFloat (x.value));
break;
default:
iValue = 0;
}
return Integer.$valueOf (iValue);
}, "org.jmol.script.Token");
c$.bValue = Clazz.defineMethod (c$, "bValue", 
($fz = function (x) {
switch (x == null ? 0 : x.tok) {
case 1048589:
case 6:
return true;
case 1048588:
return false;
case 2:
return x.intValue != 0;
case 3:
case 4:
case 7:
return org.jmol.script.ScriptVariable.fValue (x) != 0;
case 10:
return org.jmol.script.ScriptVariable.iValue (x) != 0;
case 8:
case 9:
case 11:
case 12:
return Math.abs (org.jmol.script.ScriptVariable.fValue (x)) > 0.0001;
default:
return false;
}
}, $fz.isPrivate = true, $fz), "org.jmol.script.Token");
c$.iValue = Clazz.defineMethod (c$, "iValue", 
function (x) {
switch (x == null ? 0 : x.tok) {
case 1048589:
return 1;
case 1048588:
return 0;
case 2:
return x.intValue;
case 3:
case 7:
case 4:
case 8:
case 9:
case 11:
case 12:
return Clazz.floatToInt (org.jmol.script.ScriptVariable.fValue (x));
case 10:
return org.jmol.util.BitSetUtil.cardinalityOf (org.jmol.script.ScriptVariable.bsSelectToken (x));
default:
return 0;
}
}, "org.jmol.script.Token");
c$.fValue = Clazz.defineMethod (c$, "fValue", 
function (x) {
switch (x == null ? 0 : x.tok) {
case 1048589:
return 1;
case 1048588:
return 0;
case 2:
return x.intValue;
case 3:
return (x.value).floatValue ();
case 7:
var i = x.intValue;
if (i == 2147483647) return (x).getList ().size ();
case 4:
return org.jmol.script.ScriptVariable.toFloat (org.jmol.script.ScriptVariable.sValue (x));
case 10:
return org.jmol.script.ScriptVariable.iValue (x);
case 8:
return (x.value).distance (org.jmol.script.ScriptVariable.pt0);
case 9:
return org.jmol.util.Measure.distanceToPlane (x.value, org.jmol.script.ScriptVariable.pt0);
case 11:
var pt =  new org.jmol.util.Point3f ();
(x.value).transform (pt);
return pt.distance (org.jmol.script.ScriptVariable.pt0);
case 12:
var pt1 =  new org.jmol.util.Point3f ();
(x.value).transform (pt1);
return pt1.distance (org.jmol.script.ScriptVariable.pt0);
default:
return 0;
}
}, "org.jmol.script.Token");
c$.sValue = Clazz.defineMethod (c$, "sValue", 
function (x) {
if (x == null) return "";
var i;
var sb;
var map;
switch (x.tok) {
case 1048589:
return "true";
case 1048588:
return "false";
case 2:
return "" + x.intValue;
case 10:
return org.jmol.util.Escape.escapeBs (org.jmol.script.ScriptVariable.bsSelectToken (x), !(Clazz.instanceOf (x.value, org.jmol.modelset.Bond.BondSet)));
case 7:
var sv = (x).getList ();
i = x.intValue;
if (i <= 0) i = sv.size () - i;
if (i != 2147483647) return (i < 1 || i > sv.size () ? "" : org.jmol.script.ScriptVariable.sValue (sv.get (i - 1)));
case 6:
sb =  new org.jmol.util.StringXBuilder ();
map =  new java.util.Hashtable ();
org.jmol.script.ScriptVariable.sValueArray (sb, x, map, 0, false);
return sb.toString ();
case 4:
var s = x.value;
i = x.intValue;
if (i <= 0) i = s.length - i;
if (i == 2147483647) return s;
if (i < 1 || i > s.length) return "";
return "" + s.charAt (i - 1);
case 8:
case 9:
case 11:
case 12:
return org.jmol.util.Escape.escape (x.value);
default:
return x.value.toString ();
}
}, "org.jmol.script.Token");
c$.sValueArray = Clazz.defineMethod (c$, "sValueArray", 
($fz = function (sb, vx, map, level, isEscaped) {
switch (vx.tok) {
case 6:
if (map.containsKey (vx)) {
sb.append (isEscaped ? "{}" : vx.myName == null ? "<circular reference>" : "<" + vx.myName + ">");
break;
}map.put (vx, Boolean.TRUE);
var ht = vx.value;
var keys = ht.keySet ().toArray ();
java.util.Arrays.sort (keys);
if (isEscaped) {
sb.append ("{ ");
var sep = "";
for (var i = 0; i < keys.length; i++) {
var key = keys[i];
sb.append (sep).append (org.jmol.util.Escape.escapeStr (key)).appendC (':');
org.jmol.script.ScriptVariable.sValueArray (sb, ht.get (key), map, level + 1, true);
sep = ", ";
}
sb.append (" }");
break;
}for (var i = 0; i < keys.length; i++) {
sb.append (keys[i]).append ("\t:");
var v = ht.get (keys[i]);
var sb2 =  new org.jmol.util.StringXBuilder ();
org.jmol.script.ScriptVariable.sValueArray (sb2, v, map, level + 1, isEscaped);
var value = sb2.toString ();
sb.append (value.indexOf ("\n") >= 0 ? "\n" : "\t");
sb.append (value).append ("\n");
}
break;
case 7:
if (map.containsKey (vx)) {
sb.append (isEscaped ? "[]" : vx.myName == null ? "<circular reference>" : "<" + vx.myName + ">");
break;
}map.put (vx, Boolean.TRUE);
if (isEscaped) sb.append ("[");
var sx = vx.getList ();
for (var i = 0; i < sx.size (); i++) {
if (isEscaped && i > 0) sb.append (",");
var sv = sx.get (i);
org.jmol.script.ScriptVariable.sValueArray (sb, sv, map, level + 1, isEscaped);
if (!isEscaped) sb.append ("\n");
}
if (isEscaped) sb.append ("]");
break;
default:
if (!isEscaped) for (var j = 0; j < level - 1; j++) sb.append ("\t");

sb.append (isEscaped ? vx.escape () : org.jmol.script.ScriptVariable.sValue (vx));
}
}, $fz.isPrivate = true, $fz), "org.jmol.util.StringXBuilder,org.jmol.script.ScriptVariable,java.util.Map,~N,~B");
c$.ptValue = Clazz.defineMethod (c$, "ptValue", 
function (x) {
switch (x.tok) {
case 8:
return x.value;
case 4:
var o = org.jmol.util.Escape.unescapePoint (x.value);
if (Clazz.instanceOf (o, org.jmol.util.Point3f)) return o;
}
return null;
}, "org.jmol.script.ScriptVariable");
c$.pt4Value = Clazz.defineMethod (c$, "pt4Value", 
function (x) {
switch (x.tok) {
case 9:
return x.value;
case 4:
var o = org.jmol.util.Escape.unescapePoint (x.value);
if (!(Clazz.instanceOf (o, org.jmol.util.Point4f))) break;
return o;
}
return null;
}, "org.jmol.script.ScriptVariable");
c$.toFloat = Clazz.defineMethod (c$, "toFloat", 
($fz = function (s) {
if (s.equalsIgnoreCase ("true")) return 1;
if (s.equalsIgnoreCase ("false") || s.length == 0) return 0;
return org.jmol.util.Parser.parseFloatStrict (s);
}, $fz.isPrivate = true, $fz), "~S");
c$.concatList = Clazz.defineMethod (c$, "concatList", 
function (x1, x2, asNew) {
var v1 = x1.getList ();
var v2 = x2.getList ();
if (!asNew) {
if (v2 == null) v1.add (org.jmol.script.ScriptVariable.newScriptVariableToken (x2));
 else for (var i = 0; i < v2.size (); i++) v1.add (v2.get (i));

return x1;
}var vlist =  new java.util.ArrayList ((v1 == null ? 1 : v1.size ()) + (v2 == null ? 1 : v2.size ()));
if (v1 == null) vlist.add (x1);
 else for (var i = 0; i < v1.size (); i++) vlist.add (v1.get (i));

if (v2 == null) vlist.add (x2);
 else for (var i = 0; i < v2.size (); i++) vlist.add (v2.get (i));

return org.jmol.script.ScriptVariable.getVariableList (vlist);
}, "org.jmol.script.ScriptVariable,org.jmol.script.ScriptVariable,~B");
c$.bsSelectToken = Clazz.defineMethod (c$, "bsSelectToken", 
function (x) {
x = org.jmol.script.ScriptVariable.selectItemTok (x, -2147483648);
return x.value;
}, "org.jmol.script.Token");
c$.bsSelectVar = Clazz.defineMethod (c$, "bsSelectVar", 
function ($var) {
if ($var.index == 2147483647) $var = org.jmol.script.ScriptVariable.selectItemVar ($var);
return $var.value;
}, "org.jmol.script.ScriptVariable");
c$.bsSelectRange = Clazz.defineMethod (c$, "bsSelectRange", 
function (x, n) {
x = org.jmol.script.ScriptVariable.selectItemTok (x);
x = org.jmol.script.ScriptVariable.selectItemTok (x, (n <= 0 ? n : 1));
x = org.jmol.script.ScriptVariable.selectItemTok (x, (n <= 0 ? 2147483646 : n));
return x.value;
}, "org.jmol.script.Token,~N");
c$.selectItemVar = Clazz.defineMethod (c$, "selectItemVar", 
function ($var) {
if ($var.index != 2147483647 || $var.tok == 7 && $var.intValue == 2147483647) return $var;
return org.jmol.script.ScriptVariable.selectItemVar2 ($var, -2147483648);
}, "org.jmol.script.ScriptVariable");
c$.selectItemTok = Clazz.defineMethod (c$, "selectItemTok", 
function ($var) {
return org.jmol.script.ScriptVariable.selectItemTok ($var, -2147483648);
}, "org.jmol.script.Token");
c$.selectItemVar2 = Clazz.defineMethod (c$, "selectItemVar2", 
function ($var, i2) {
return org.jmol.script.ScriptVariable.selectItemTok ($var, i2);
}, "org.jmol.script.ScriptVariable,~N");
c$.selectItemTok = Clazz.defineMethod (c$, "selectItemTok", 
function (tokenIn, i2) {
switch (tokenIn.tok) {
case 11:
case 12:
case 10:
case 7:
case 4:
break;
default:
return tokenIn;
}
var bs = null;
var s = null;
var i1 = tokenIn.intValue;
if (i1 == 2147483647) {
if (i2 == -2147483648) i2 = i1;
var v = org.jmol.script.ScriptVariable.newScriptVariableIntValue (tokenIn.tok, i2, tokenIn.value);
return v;
}var len = 0;
var isInputSelected = (Clazz.instanceOf (tokenIn, org.jmol.script.ScriptVariable) && (tokenIn).index != 2147483647);
var tokenOut = org.jmol.script.ScriptVariable.newScriptVariableIntValue (tokenIn.tok, 2147483647, null);
switch (tokenIn.tok) {
case 10:
if (Clazz.instanceOf (tokenIn.value, org.jmol.modelset.Bond.BondSet)) {
bs =  new org.jmol.modelset.Bond.BondSet (tokenIn.value, (tokenIn.value).getAssociatedAtoms ());
len = org.jmol.util.BitSetUtil.cardinalityOf (bs);
} else {
bs = org.jmol.util.BitSetUtil.copy (tokenIn.value);
len = (isInputSelected ? 1 : org.jmol.util.BitSetUtil.cardinalityOf (bs));
}break;
case 7:
len = (tokenIn).getList ().size ();
break;
case 4:
s = tokenIn.value;
len = s.length;
break;
case 11:
len = -3;
break;
case 12:
len = -4;
break;
}
if (len < 0) {
len = -len;
if (i1 > 0 && Math.abs (i1) > len) {
var col = i1 % 10;
var row = Clazz.doubleToInt ((i1 - col) / 10);
if (col > 0 && col <= len && row <= len) {
if (tokenIn.tok == 11) return org.jmol.script.ScriptVariable.newVariable (3,  new Float ((tokenIn.value).getElement (row - 1, col - 1)));
return org.jmol.script.ScriptVariable.newVariable (3,  new Float ((tokenIn.value).getElement (row - 1, col - 1)));
}return org.jmol.script.ScriptVariable.newVariable (4, "");
}if (Math.abs (i1) > len) return org.jmol.script.ScriptVariable.newVariable (4, "");
var data =  Clazz.newFloatArray (len, 0);
if (len == 3) {
if (i1 < 0) (tokenIn.value).getColumn (-1 - i1, data);
 else (tokenIn.value).getRow (i1 - 1, data);
} else {
if (i1 < 0) (tokenIn.value).getColumn (-1 - i1, data);
 else (tokenIn.value).getRow (i1 - 1, data);
}if (i2 == -2147483648) return org.jmol.script.ScriptVariable.getVariableAF (data);
if (i2 < 1 || i2 > len) return org.jmol.script.ScriptVariable.newVariable (4, "");
return org.jmol.script.ScriptVariable.newVariable (3,  new Float (data[i2 - 1]));
}if (i1 <= 0) i1 = len + i1;
if (i1 < 1) i1 = 1;
if (i2 == 0) i2 = len;
 else if (i2 < 0) i2 = len + i2;
if (i2 > len) i2 = len;
 else if (i2 < i1) i2 = i1;
switch (tokenIn.tok) {
case 10:
tokenOut.value = bs;
if (isInputSelected) {
if (i1 > 1) bs.clearAll ();
break;
}var n = 0;
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) if (++n < i1 || n > i2) bs.clear (j);

break;
case 4:
if (i1 < 1 || i1 > len) tokenOut.value = "";
 else tokenOut.value = s.substring (i1 - 1, i2);
break;
case 7:
if (i1 < 1 || i1 > len || i2 > len) return org.jmol.script.ScriptVariable.newVariable (4, "");
if (i2 == i1) return (tokenIn).getList ().get (i1 - 1);
var o2 =  new java.util.ArrayList ();
var o1 = (tokenIn).getList ();
n = i2 - i1 + 1;
for (var i = 0; i < n; i++) o2.add (org.jmol.script.ScriptVariable.newScriptVariableToken (o1.get (i + i1 - 1)));

tokenOut.value = o2;
break;
}
return tokenOut;
}, "org.jmol.script.Token,~N");
Clazz.defineMethod (c$, "setSelectedValue", 
function (selector, $var) {
if (selector == 2147483647) return false;
var len;
switch (this.tok) {
case 11:
case 12:
len = (this.tok == 11 ? 3 : 4);
if (selector > 10) {
var col = selector % 10;
var row = Clazz.doubleToInt ((selector - col) / 10);
if (col > 0 && col <= len && row <= len) {
if (this.tok == 11) (this.value).setElement (row - 1, col - 1, org.jmol.script.ScriptVariable.fValue ($var));
 else (this.value).setElement (row - 1, col - 1, org.jmol.script.ScriptVariable.fValue ($var));
return true;
}}if (selector != 0 && Math.abs (selector) <= len && $var.tok == 7) {
var sv = $var.getList ();
if (sv.size () == len) {
var data =  Clazz.newFloatArray (len, 0);
for (var i = 0; i < len; i++) data[i] = org.jmol.script.ScriptVariable.fValue (sv.get (i));

if (selector > 0) {
if (this.tok == 11) (this.value).setRowA (selector - 1, data);
 else (this.value).setRow (selector - 1, data);
} else {
if (this.tok == 11) (this.value).setColumnA (-1 - selector, data);
 else (this.value).setColumn (-1 - selector, data);
}return true;
}}return false;
case 4:
var str = this.value;
var pt = str.length;
if (selector <= 0) selector = pt + selector;
if (--selector < 0) selector = 0;
while (selector >= str.length) str += " ";

this.value = str.substring (0, selector) + org.jmol.script.ScriptVariable.sValue ($var) + str.substring (selector + 1);
return true;
case 7:
len = this.getList ().size ();
if (selector <= 0) selector = len + selector;
if (--selector < 0) selector = 0;
if (len <= selector) {
for (var i = len; i <= selector; i++) this.getList ().add (org.jmol.script.ScriptVariable.newVariable (4, ""));

}this.getList ().set (selector, $var);
return true;
}
return false;
}, "~N,org.jmol.script.ScriptVariable");
Clazz.defineMethod (c$, "escape", 
function () {
switch (this.tok) {
case 4:
return org.jmol.util.Escape.escape (this.value);
case 7:
case 6:
var sb =  new org.jmol.util.StringXBuilder ();
var map =  new java.util.Hashtable ();
org.jmol.script.ScriptVariable.sValueArray (sb, this, map, 0, true);
return sb.toString ();
default:
return org.jmol.script.ScriptVariable.sValue (this);
}
});
c$.unescapePointOrBitsetAsVariable = Clazz.defineMethod (c$, "unescapePointOrBitsetAsVariable", 
function (o) {
if (o == null) return o;
var v = null;
var s = null;
if (Clazz.instanceOf (o, org.jmol.script.ScriptVariable)) {
var sv = o;
switch (sv.tok) {
case 8:
case 9:
case 11:
case 12:
case 10:
v = sv.value;
break;
case 4:
s = sv.value;
break;
default:
s = org.jmol.script.ScriptVariable.sValue (sv);
break;
}
} else if (Clazz.instanceOf (o, String)) {
s = o;
}if (s != null && s.length == 0) return s;
if (v == null) v = org.jmol.util.Escape.unescapePointOrBitsetOrMatrixOrArray (s);
if (Clazz.instanceOf (v, org.jmol.util.Point3f)) return (org.jmol.script.ScriptVariable.newVariable (8, v));
if (Clazz.instanceOf (v, org.jmol.util.Point4f)) return org.jmol.script.ScriptVariable.newVariable (9, v);
if (Clazz.instanceOf (v, org.jmol.util.BitSet)) {
if (s != null && s.indexOf ("[{") == 0) v =  new org.jmol.modelset.Bond.BondSet (v);
return org.jmol.script.ScriptVariable.newVariable (10, v);
}if (Clazz.instanceOf (v, org.jmol.util.Matrix3f)) return (org.jmol.script.ScriptVariable.newVariable (11, v));
if (Clazz.instanceOf (v, org.jmol.util.Matrix4f)) return org.jmol.script.ScriptVariable.newVariable (12, v);
return o;
}, "~O");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (value) {
return org.jmol.script.ScriptVariable.newScriptVariableToken (value ? org.jmol.script.ScriptVariable.vT : org.jmol.script.ScriptVariable.vF);
}, "~B");
c$.sprintf = Clazz.defineMethod (c$, "sprintf", 
function (strFormat, $var) {
if ($var == null) return strFormat;
var vd = (strFormat.indexOf ("d") >= 0 || strFormat.indexOf ("i") >= 0 ?  Clazz.newIntArray (1, 0) : null);
var vf = (strFormat.indexOf ("f") >= 0 ?  Clazz.newFloatArray (1, 0) : null);
var ve = (strFormat.indexOf ("e") >= 0 ?  Clazz.newDoubleArray (1, 0) : null);
var getS = (strFormat.indexOf ("s") >= 0);
var getP = (strFormat.indexOf ("p") >= 0 && $var.tok == 8);
var getQ = (strFormat.indexOf ("q") >= 0 && $var.tok == 9);
var of = [vd, vf, ve, null, null, null];
if ($var.tok != 7) return org.jmol.script.ScriptVariable.sprintf (strFormat, $var, of, vd, vf, ve, getS, getP, getQ);
var sv = $var.getList ();
var list2 =  new Array (sv.size ());
for (var i = 0; i < list2.length; i++) list2[i] = org.jmol.script.ScriptVariable.sprintf (strFormat, sv.get (i), of, vd, vf, ve, getS, getP, getQ);

return list2;
}, "~S,org.jmol.script.ScriptVariable");
c$.sprintf = Clazz.defineMethod (c$, "sprintf", 
($fz = function (strFormat, $var, of, vd, vf, ve, getS, getP, getQ) {
if (vd != null) vd[0] = org.jmol.script.ScriptVariable.iValue ($var);
if (vf != null) vf[0] = org.jmol.script.ScriptVariable.fValue ($var);
if (ve != null) ve[0] = org.jmol.script.ScriptVariable.fValue ($var);
if (getS) of[3] = org.jmol.script.ScriptVariable.sValue ($var);
if (getP) of[4] = $var.value;
if (getQ) of[5] = $var.value;
return org.jmol.util.TextFormat.sprintf (strFormat, "IFDspq", of);
}, $fz.isPrivate = true, $fz), "~S,org.jmol.script.ScriptVariable,~A,~A,~A,~A,~B,~B,~B");
c$.sprintfArray = Clazz.defineMethod (c$, "sprintfArray", 
function (args) {
switch (args.length) {
case 0:
return "";
case 1:
return org.jmol.script.ScriptVariable.sValue (args[0]);
}
var format = org.jmol.util.TextFormat.split (org.jmol.util.TextFormat.simpleReplace (org.jmol.script.ScriptVariable.sValue (args[0]), "%%", "\1"), '%');
var sb =  new org.jmol.util.StringXBuilder ();
sb.append (format[0]);
for (var i = 1; i < format.length; i++) {
var ret = org.jmol.script.ScriptVariable.sprintf (org.jmol.util.TextFormat.formatCheck ("%" + format[i]), (i < args.length ? args[i] : null));
if (org.jmol.util.Escape.isAS (ret)) {
var list = ret;
for (var j = 0; j < list.length; j++) sb.append (list[j]).append ("\n");

continue;
}sb.append (ret);
}
return sb.toString ();
}, "~A");
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, org.jmol.script.ScriptVariable, "toString", []) + "[" + this.myName + " index =" + this.index + " intValue=" + this.intValue + "]";
});
c$.getBitSet = Clazz.defineMethod (c$, "getBitSet", 
function (x, allowNull) {
switch (x.tok) {
case 10:
return org.jmol.script.ScriptVariable.bsSelectVar (x);
case 7:
var bs =  new org.jmol.util.BitSet ();
var sv = x.value;
for (var i = 0; i < sv.size (); i++) if (!sv.get (i).unEscapeBitSetArray (bs) && allowNull) return null;

return bs;
}
return (allowNull ? null :  new org.jmol.util.BitSet ());
}, "org.jmol.script.ScriptVariable,~B");
c$.areEqual = Clazz.defineMethod (c$, "areEqual", 
function (x1, x2) {
if (x1 == null || x2 == null) return false;
if (x1.tok == 4 && x2.tok == 4) return org.jmol.script.ScriptVariable.sValue (x1).equalsIgnoreCase (org.jmol.script.ScriptVariable.sValue (x2));
if (x1.tok == 8 && x2.tok == 8) return ((x1.value).distance (x2.value) < 0.000001);
if (x1.tok == 9 && x2.tok == 9) return ((x1.value).distance (x2.value) < 0.000001);
return (Math.abs (org.jmol.script.ScriptVariable.fValue (x1) - org.jmol.script.ScriptVariable.fValue (x2)) < 0.000001);
}, "org.jmol.script.ScriptVariable,org.jmol.script.ScriptVariable");
Clazz.defineMethod (c$, "sortOrReverse", 
function (arrayPt) {
var x = this.getList ();
if (x == null || x.size () < 2) return this;
if (arrayPt == -2147483648) {
var n = x.size ();
for (var i = 0; i < n; i++) {
var v = x.get (i);
x.set (i, x.get (--n));
x.set (n, v);
}
} else {
java.util.Collections.sort (this.getList (), Clazz.innerTypeInstance (org.jmol.script.ScriptVariable.Sort, this, null, --arrayPt));
}return this;
}, "~N");
Clazz.defineMethod (c$, "unEscapeBitSetArray", 
function (bs) {
switch (this.tok) {
case 4:
var bs1 = org.jmol.util.Escape.unescapeBitset (this.value);
if (bs1 == null) return false;
bs.or (bs1);
return true;
case 10:
bs.or (this.value);
return true;
}
return false;
}, "org.jmol.util.BitSet");
c$.unEscapeBitSetArray = Clazz.defineMethod (c$, "unEscapeBitSetArray", 
function (x, allowNull) {
var bs =  new org.jmol.util.BitSet ();
for (var i = 0; i < x.size (); i++) if (!x.get (i).unEscapeBitSetArray (bs) && allowNull) return null;

return bs;
}, "java.util.ArrayList,~B");
c$.listValue = Clazz.defineMethod (c$, "listValue", 
function (x) {
if (x.tok != 7) return [org.jmol.script.ScriptVariable.sValue (x)];
var sv = (x).getList ();
var list =  new Array (sv.size ());
for (var i = sv.size (); --i >= 0; ) list[i] = org.jmol.script.ScriptVariable.sValue (sv.get (i));

return list;
}, "org.jmol.script.Token");
c$.flistValue = Clazz.defineMethod (c$, "flistValue", 
function (x, nMin) {
if (x.tok != 7) return [org.jmol.script.ScriptVariable.fValue (x)];
var sv = (x).getList ();
var list;
list =  Clazz.newFloatArray (Math.max (nMin, sv.size ()), 0);
if (nMin == 0) nMin = list.length;
for (var i = Math.min (sv.size (), nMin); --i >= 0; ) list[i] = org.jmol.script.ScriptVariable.fValue (sv.get (i));

return list;
}, "org.jmol.script.Token,~N");
Clazz.defineMethod (c$, "toArray", 
function () {
var dim;
var m3 = null;
var m4 = null;
switch (this.tok) {
case 11:
m3 = this.value;
dim = 3;
break;
case 12:
m4 = this.value;
dim = 4;
break;
default:
return;
}
this.tok = 7;
var o2 =  new java.util.ArrayList (dim);
for (var i = 0; i < dim; i++) {
var a =  Clazz.newFloatArray (dim, 0);
if (m3 == null) m4.getRow (i, a);
 else m3.getRow (i, a);
o2.set (i, org.jmol.script.ScriptVariable.getVariableAF (a));
}
this.value = o2;
});
Clazz.defineMethod (c$, "mapValue", 
function (key) {
return (this.tok == 6 ? (this.value).get (key) : null);
}, "~S");
Clazz.defineMethod (c$, "getList", 
function () {
return (this.tok == 7 ? this.value : null);
});
c$.$ScriptVariable$Sort$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.arrayPt = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.script.ScriptVariable, "Sort", null, java.util.Comparator);
Clazz.makeConstructor (c$, 
function (a) {
this.arrayPt = a;
}, "~N");
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
if (a.tok != b.tok) {
if (a.tok == 3 || a.tok == 2 || b.tok == 3 || b.tok == 2) {
var c = org.jmol.script.ScriptVariable.fValue (a);
var d = org.jmol.script.ScriptVariable.fValue (b);
return (c < d ? -1 : c > d ? 1 : 0);
}if (a.tok == 4 || b.tok == 4) return org.jmol.script.ScriptVariable.sValue (a).compareTo (org.jmol.script.ScriptVariable.sValue (b));
}switch (a.tok) {
case 4:
return org.jmol.script.ScriptVariable.sValue (a).compareTo (org.jmol.script.ScriptVariable.sValue (b));
case 7:
var c = a.getList ();
var d = b.getList ();
if (c.size () != d.size ()) return (c.size () < d.size () ? -1 : 1);
var e = this.arrayPt;
if (e < 0) e += c.size ();
if (e < 0 || e >= c.size ()) return 0;
return this.compare (c.get (e), d.get (e));
default:
var f = org.jmol.script.ScriptVariable.fValue (a);
var g = org.jmol.script.ScriptVariable.fValue (b);
return (f < g ? -1 : f > g ? 1 : 0);
}
}, "org.jmol.script.ScriptVariable,org.jmol.script.ScriptVariable");
c$ = Clazz.p0p ();
};
c$.vT = c$.prototype.vT = org.jmol.script.ScriptVariable.newScriptVariableIntValue (1048589, 1, "true");
c$.vF = c$.prototype.vF = org.jmol.script.ScriptVariable.newScriptVariableIntValue (1048588, 0, "false");
c$.vAll = c$.prototype.vAll = org.jmol.script.ScriptVariable.newVariable (1048579, "all");
Clazz.defineStatics (c$,
"FLAG_CANINCREMENT", 1,
"FLAG_LOCALVAR", 2);
c$.pt0 = c$.prototype.pt0 =  new org.jmol.util.Point3f ();
});
