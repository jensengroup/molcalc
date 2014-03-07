Clazz.declarePackage ("org.jmol.modelset");
Clazz.load (null, "org.jmol.modelset.LabelToken", ["java.lang.Character", "$.Float", "java.util.Hashtable", "org.jmol.modelset.Atom", "org.jmol.script.Token", "org.jmol.util.Escape", "$.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.key = null;
this.data = null;
this.tok = 0;
this.pt = -1;
this.ch1 = '\0';
this.width = 0;
this.precision = 2147483647;
this.alignLeft = false;
this.zeroPad = false;
this.intAsFloat = false;
Clazz.instantialize (this, arguments);
}, org.jmol.modelset, "LabelToken");
c$.isLabelPropertyTok = Clazz.defineMethod (c$, "isLabelPropertyTok", 
($fz = function (tok) {
for (var i = org.jmol.modelset.LabelToken.labelTokenIds.length; --i >= 0; ) if (org.jmol.modelset.LabelToken.labelTokenIds[i] == tok) return true;

return false;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.makeConstructor (c$, 
($fz = function (text, pt) {
this.text = text;
this.pt = pt;
}, $fz.isPrivate = true, $fz), "~S,~N");
c$.compile = Clazz.defineMethod (c$, "compile", 
function (viewer, strFormat, chAtom, htValues) {
if (strFormat == null || strFormat.length == 0) return null;
if (strFormat.indexOf ("%") < 0 || strFormat.length < 2) return [ new org.jmol.modelset.LabelToken (strFormat, -1)];
var n = 0;
var ich = -1;
var cch = strFormat.length;
while (++ich < cch && (ich = strFormat.indexOf ('%', ich)) >= 0) n++;

var tokens =  new Array (n * 2 + 1);
var ichPercent;
var i = 0;
for (ich = 0; (ichPercent = strFormat.indexOf ('%', ich)) >= 0; ) {
if (ich != ichPercent) tokens[i++] =  new org.jmol.modelset.LabelToken (strFormat.substring (ich, ichPercent), -1);
var lt = tokens[i++] =  new org.jmol.modelset.LabelToken (null, ichPercent);
viewer.autoCalculate (lt.tok);
ich = org.jmol.modelset.LabelToken.setToken (viewer, strFormat, lt, cch, chAtom.charCodeAt (0), htValues);
}
if (ich < cch) tokens[i++] =  new org.jmol.modelset.LabelToken (strFormat.substring (ich), -1);
return tokens;
}, "org.jmol.viewer.Viewer,~S,~S,java.util.Map");
c$.formatLabel = Clazz.defineMethod (c$, "formatLabel", 
function (viewer, atom, strFormat) {
if (strFormat == null || strFormat.length == 0) return null;
var tokens = org.jmol.modelset.LabelToken.compile (viewer, strFormat, '\0', null);
return org.jmol.modelset.LabelToken.formatLabelAtomArray (viewer, atom, tokens, '\0', null);
}, "org.jmol.viewer.Viewer,org.jmol.modelset.Atom,~S");
c$.formatLabelAtomArray = Clazz.defineMethod (c$, "formatLabelAtomArray", 
function (viewer, atom, tokens, chAtom, indices) {
if (atom == null) return null;
var strLabel = (chAtom > '0' ? null :  new org.jmol.util.StringXBuilder ());
if (tokens != null) for (var i = 0; i < tokens.length; i++) {
var t = tokens[i];
if (t == null) break;
if (chAtom > '0' && t.ch1 != chAtom) continue;
if (t.tok <= 0 || t.key != null) {
if (strLabel != null) {
strLabel.append (t.text);
if (t.ch1 != '\0') strLabel.appendC (t.ch1);
}} else {
org.jmol.modelset.LabelToken.appendAtomTokenValue (viewer, atom, t, strLabel, indices);
}}
return (strLabel == null ? null : strLabel.toString ().intern ());
}, "org.jmol.viewer.Viewer,org.jmol.modelset.Atom,~A,~S,~A");
c$.getBondLabelValues = Clazz.defineMethod (c$, "getBondLabelValues", 
function () {
var htValues =  new java.util.Hashtable ();
htValues.put ("#", "");
htValues.put ("ORDER", "");
htValues.put ("TYPE", "");
htValues.put ("LENGTH",  new Float (0));
htValues.put ("ENERGY",  new Float (0));
return htValues;
});
c$.formatLabelBond = Clazz.defineMethod (c$, "formatLabelBond", 
function (viewer, bond, tokens, values, indices) {
values.put ("#", "" + (bond.index + 1));
values.put ("ORDER", "" + bond.getOrderNumberAsString ());
values.put ("TYPE", bond.getOrderName ());
values.put ("LENGTH",  new Float (bond.atom1.distance (bond.atom2)));
values.put ("ENERGY",  new Float (bond.getEnergy ()));
org.jmol.modelset.LabelToken.setValues (tokens, values);
org.jmol.modelset.LabelToken.formatLabelAtomArray (viewer, bond.atom1, tokens, '1', indices);
org.jmol.modelset.LabelToken.formatLabelAtomArray (viewer, bond.atom2, tokens, '2', indices);
return org.jmol.modelset.LabelToken.getLabel (tokens);
}, "org.jmol.viewer.Viewer,org.jmol.modelset.Bond,~A,java.util.Map,~A");
c$.formatLabelMeasure = Clazz.defineMethod (c$, "formatLabelMeasure", 
function (viewer, measurement, label, value, units) {
var htValues =  new java.util.Hashtable ();
htValues.put ("#", "" + (measurement.getIndex () + 1));
htValues.put ("VALUE",  new Float (value));
htValues.put ("UNITS", units);
var tokens = org.jmol.modelset.LabelToken.compile (viewer, label, '\1', htValues);
org.jmol.modelset.LabelToken.setValues (tokens, htValues);
var atoms = measurement.modelSet.atoms;
var indices = measurement.getCountPlusIndices ();
for (var i = indices[0]; i >= 1; --i) if (indices[i] >= 0) org.jmol.modelset.LabelToken.formatLabelAtomArray (viewer, atoms[indices[i]], tokens, String.fromCharCode (48 + i), null);

label = org.jmol.modelset.LabelToken.getLabel (tokens);
return (label == null ? "" : label);
}, "org.jmol.viewer.Viewer,org.jmol.modelset.Measurement,~S,~N,~S");
c$.setValues = Clazz.defineMethod (c$, "setValues", 
function (tokens, values) {
for (var i = 0; i < tokens.length; i++) {
var lt = tokens[i];
if (lt == null) break;
if (lt.key == null) continue;
var value = values.get (lt.key);
lt.text = (Clazz.instanceOf (value, Float) ? lt.format ((value).floatValue (), null, null) : lt.format (NaN, value, null));
}
}, "~A,java.util.Map");
c$.getLabel = Clazz.defineMethod (c$, "getLabel", 
function (tokens) {
var sb =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < tokens.length; i++) {
var lt = tokens[i];
if (lt == null) break;
sb.append (lt.text);
}
return sb.toString ();
}, "~A");
c$.setToken = Clazz.defineMethod (c$, "setToken", 
($fz = function (viewer, strFormat, lt, cch, chAtom, htValues) {
var ich = lt.pt + 1;
var ch;
if (strFormat.charAt (ich) == '-') {
lt.alignLeft = true;
++ich;
}if (ich < cch && strFormat.charAt (ich) == '0') {
lt.zeroPad = true;
++ich;
}while (ich < cch && Character.isDigit (ch = strFormat.charAt (ich))) {
lt.width = (10 * lt.width) + (ch.charCodeAt (0) - 48);
++ich;
}
lt.precision = 2147483647;
var isNegative = false;
if (ich < cch && strFormat.charAt (ich) == '.') {
++ich;
if (ich < cch && (ch = strFormat.charAt (ich)) == '-') {
isNegative = true;
++ich;
}if (ich < cch && Character.isDigit (ch = strFormat.charAt (ich))) {
lt.precision = ch.charCodeAt (0) - 48;
if (isNegative) lt.precision = -1 - lt.precision;
++ich;
}}if (ich < cch && htValues != null) {
var keys = htValues.keySet ().iterator ();
while (keys.hasNext ()) {
var key = keys.next ();
if (strFormat.indexOf (key) == ich) {
lt.key = key;
return ich + key.length;
}}
}if (ich < cch) switch (ch = strFormat.charAt (ich++)) {
case '%':
lt.text = "%";
return ich;
case '[':
var ichClose = strFormat.indexOf (']', ich);
if (ichClose < ich) {
ich = cch;
break;
}var propertyName = strFormat.substring (ich, ichClose).toLowerCase ();
if (propertyName.startsWith ("property_")) {
lt.text = propertyName;
lt.tok = 135270407;
lt.data = viewer.getDataFloat (lt.text);
} else {
var token = org.jmol.script.Token.getTokenFromName (propertyName);
if (token != null && org.jmol.modelset.LabelToken.isLabelPropertyTok (token.tok)) lt.tok = token.tok;
}ich = ichClose + 1;
break;
case '{':
var ichCloseBracket = strFormat.indexOf ('}', ich);
if (ichCloseBracket < ich) {
ich = cch;
break;
}lt.text = strFormat.substring (ich, ichCloseBracket);
lt.data = viewer.getDataFloat (lt.text);
if (lt.data == null) {
lt.data = viewer.getData (lt.text);
if (Clazz.instanceOf (lt.data, Array)) {
lt.data = (lt.data)[1];
if (Clazz.instanceOf (lt.data, String)) lt.data = org.jmol.util.TextFormat.split (lt.data, '\n');
if (!(org.jmol.util.Escape.isAS (lt.data))) lt.data = null;
}lt.tok = (lt.data == null ? 4 : 135266306);
} else {
lt.tok = 135270407;
}ich = ichCloseBracket + 1;
break;
default:
var i;
var i1;
if (ich < cch && (i = "fuv".indexOf (ch)) >= 0 && (i1 = "xyz".indexOf (strFormat.charAt (ich))) >= 0) {
lt.tok = org.jmol.modelset.LabelToken.twoCharLabelTokenIds[i * 3 + i1];
ich++;
} else if ((i = "AaBbCcDEefGgIiLlMmNnoPpQqRrSsTtUuVvWXxYyZz%%%gqW".indexOf (ch)) >= 0) {
lt.tok = org.jmol.modelset.LabelToken.labelTokenIds[i];
}}
lt.text = strFormat.substring (lt.pt, ich);
if (ich < cch && chAtom != 0 && Character.isDigit (ch = strFormat.charAt (ich))) {
ich++;
lt.ch1 = ch;
if (ch.charCodeAt (0) != chAtom && chAtom != 1) lt.tok = 0;
}return ich;
}, $fz.isPrivate = true, $fz), "org.jmol.viewer.Viewer,~S,org.jmol.modelset.LabelToken,~N,~N,java.util.Map");
c$.appendAtomTokenValue = Clazz.defineMethod (c$, "appendAtomTokenValue", 
($fz = function (viewer, atom, t, strLabel, indices) {
var strT = null;
var floatT = NaN;
var ptT = null;
try {
switch (t.tok) {
case 1095761923:
strT = "" + (indices == null ? atom.index : indices[atom.index]);
break;
case 1766856708:
ptT = org.jmol.modelset.Atom.atomPropertyTuple (atom, t.tok);
break;
case 135270407:
if (t.data != null) {
floatT = (t.data)[atom.index];
}break;
case 135266306:
if (t.data != null) {
var sdata = t.data;
strT = (atom.index < sdata.length ? sdata[atom.index] : "");
}break;
case 1632634889:
var formalCharge = atom.getFormalCharge ();
if (formalCharge > 0) strT = "" + formalCharge + "+";
 else if (formalCharge < 0) strT = "" + -formalCharge + "-";
 else strT = "";
break;
case 'g':
strT = "" + atom.getSelectedGroupIndexWithinChain ();
break;
case 1095766028:
strT = atom.getModelNumberForLabel ();
break;
case 1129318401:
strT = "" + org.jmol.modelset.Atom.atomPropertyInt (atom, t.tok);
break;
case 'Q':
floatT = atom.getOccupancy100 () / 100;
break;
case 1666189314:
floatT = org.jmol.modelset.Atom.atomPropertyFloat (viewer, atom, t.tok);
break;
case 'r':
strT = atom.getSeqcodeString ();
break;
case 1087373324:
strT = atom.getStructureId ();
break;
case 1095761939:
var id = atom.getStrucNo ();
strT = (id <= 0 ? "" : "" + id);
break;
case 1112539148:
floatT = atom.getGroupParameter (1112539148);
if (Float.isNaN (floatT)) strT = "null";
break;
case 4:
strT = viewer.getModelAtomProperty (atom, t.text.substring (2, t.text.length - 1));
break;
case 1641025539:
case 1238369286:
strT = org.jmol.modelset.Atom.atomPropertyString (viewer, atom, t.tok);
break;
case 'W':
strT = atom.getIdentityXYZ (false);
break;
default:
switch (t.tok & 1137704960) {
case 1095761920:
if (t.intAsFloat) floatT = org.jmol.modelset.Atom.atomPropertyInt (atom, t.tok);
 else strT = "" + org.jmol.modelset.Atom.atomPropertyInt (atom, t.tok);
break;
case 1112539136:
floatT = org.jmol.modelset.Atom.atomPropertyFloat (viewer, atom, t.tok);
break;
case 1087373312:
strT = org.jmol.modelset.Atom.atomPropertyString (viewer, atom, t.tok);
break;
case 1078984704:
ptT = org.jmol.modelset.Atom.atomPropertyTuple (atom, t.tok);
break;
default:
}
}
} catch (ioobe) {
if (Clazz.exceptionOf (ioobe, IndexOutOfBoundsException)) {
floatT = NaN;
strT = null;
ptT = null;
} else {
throw ioobe;
}
}
strT = t.format (floatT, strT, ptT);
if (strLabel == null) t.text = strT;
 else strLabel.append (strT);
}, $fz.isPrivate = true, $fz), "org.jmol.viewer.Viewer,org.jmol.modelset.Atom,org.jmol.modelset.LabelToken,org.jmol.util.StringXBuilder,~A");
Clazz.defineMethod (c$, "format", 
($fz = function (floatT, strT, ptT) {
if (!Float.isNaN (floatT)) {
return org.jmol.util.TextFormat.formatF (floatT, this.width, this.precision, this.alignLeft, this.zeroPad);
} else if (strT != null) {
return org.jmol.util.TextFormat.formatS (strT, this.width, this.precision, this.alignLeft, this.zeroPad);
} else if (ptT != null) {
if (this.width == 0 && this.precision == 2147483647) {
this.width = 6;
this.precision = 2;
}return org.jmol.util.TextFormat.formatF (ptT.x, this.width, this.precision, false, false) + org.jmol.util.TextFormat.formatF (ptT.y, this.width, this.precision, false, false) + org.jmol.util.TextFormat.formatF (ptT.z, this.width, this.precision, false, false);
} else {
return this.text;
}}, $fz.isPrivate = true, $fz), "~N,~S,org.jmol.util.Tuple3f");
Clazz.defineStatics (c$,
"labelTokenParams", "AaBbCcDEefGgIiLlMmNnoPpQqRrSsTtUuVvWXxYyZz%%%gqW",
"labelTokenIds", [1087373315, 1087375362, 1087375361, 1112541199, 1632634889, 1087373316, 1095761923, 1087373322, 1087375365, 1112539143, 1095761931, 'g', 1112541195, 1095763969, 1095761936, 1095763976, 1095766028, 1087373319, 1095761934, 1087373318, 1089470478, 1112541196, 1112539144, 'Q', 1129318401, 1095761937, 'r', 1095761938, 1087373316, 1112539148, 1112541199, 1087373321, 1112539149, 1649412112, 1146095631, 'W', 1112541188, 1112541185, 1112541189, 1112541186, 1112541190, 1112541187, 1115297793, 1113200642, 1113198595, 1113198596, 1113198597, 1113200646, 1113200647, 1113200649, 1113200650, 1113200652, 1650071565, 1113200654, 1112539137, 1112539138, 1095761922, 1095761924, 1766856708, 1095761930, 1112539139, 1229984263, 1288701960, 1826248715, 1112539141, 1095761933, 1112539140, 1112539142, 1095761935, 1716520973, 1666189314, 1114638350, 1087373323, 1087373320, 1113200651, 1641025539, 1238369286, 1095761939, 1087373324, 1087375373, 1112539150, 1112539151, 1112539152, 1112539153, 1095763988, 1649410065, 1112541202, 1112541203, 1112541204, 1313866247, 1146093582, 1146095627, 1146095626, 1146095629, 1112541191, 1112541192, 1112541193, 1114638346, 1112539145, 1112539146, 1112539147, 1146095628],
"STANDARD_LABEL", "%[identify]",
"twoCharLabelTokenParams", "fuv",
"twoCharLabelTokenIds", [1112541188, 1112541189, 1112541190, 1112539151, 1112539152, 1112539153, 1112541202, 1112541203, 1112541204]);
});
