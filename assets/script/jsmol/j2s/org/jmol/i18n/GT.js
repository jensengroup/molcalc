Clazz.declarePackage ("org.jmol.i18n");
Clazz.load (null, "org.jmol.i18n.GT", ["java.text.MessageFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.doTranslate = true;
Clazz.instantialize (this, arguments);
}, org.jmol.i18n, "GT");
Clazz.makeConstructor (c$, 
function (la) {
}, "~S");
c$.getLanguage = Clazz.defineMethod (c$, "getLanguage", 
function () {
return "en_US";
});
c$.getTextWrapper = Clazz.defineMethod (c$, "getTextWrapper", 
($fz = function () {
return (org.jmol.i18n.GT.$getTextWrapper == null ? ($t$ = org.jmol.i18n.GT.$getTextWrapper =  new org.jmol.i18n.GT (null), org.jmol.i18n.GT.prototype.$getTextWrapper = org.jmol.i18n.GT.$getTextWrapper, $t$) : org.jmol.i18n.GT.$getTextWrapper);
}, $fz.isPrivate = true, $fz));
c$.getLanguageList = Clazz.defineMethod (c$, "getLanguageList", 
function (gt) {
if (org.jmol.i18n.GT.languageList == null) {
if (gt == null) gt = org.jmol.i18n.GT.getTextWrapper ();
gt.createLanguageList ();
}return org.jmol.i18n.GT.languageList;
}, "org.jmol.i18n.GT");
Clazz.defineMethod (c$, "createLanguageList", 
($fz = function () {
var wasTranslating = this.doTranslate;
this.doTranslate = false;
($t$ = org.jmol.i18n.GT.languageList = [], org.jmol.i18n.GT.prototype.languageList = org.jmol.i18n.GT.languageList, $t$);
this.doTranslate = wasTranslating;
}, $fz.isPrivate = true, $fz));
c$.ignoreApplicationBundle = Clazz.defineMethod (c$, "ignoreApplicationBundle", 
function () {
});
c$.setDoTranslate = Clazz.defineMethod (c$, "setDoTranslate", 
function (TF) {
}, "~B");
c$.getDoTranslate = Clazz.defineMethod (c$, "getDoTranslate", 
function () {
return false;
});
c$._ = Clazz.defineMethod (c$, "_", 
function (string) {
return string;
}, "~S");
c$._ = Clazz.defineMethod (c$, "_", 
function (string, item) {
return org.jmol.i18n.GT.getString (string, [item]);
}, "~S,~S");
c$._ = Clazz.defineMethod (c$, "_", 
function (string, item) {
return org.jmol.i18n.GT.getString (string, [Integer.$valueOf (item)]);
}, "~S,~N");
c$._ = Clazz.defineMethod (c$, "_", 
function (string, objects) {
return org.jmol.i18n.GT.getString (string, objects);
}, "~S,~A");
c$._ = Clazz.defineMethod (c$, "_", 
function (string, t) {
return string;
}, "~S,~B");
c$._ = Clazz.defineMethod (c$, "_", 
function (string, item, t) {
return org.jmol.i18n.GT.getString (string, [item]);
}, "~S,~S,~B");
c$._ = Clazz.defineMethod (c$, "_", 
function (string, item, t) {
return org.jmol.i18n.GT.getString (string, [Integer.$valueOf (item)]);
}, "~S,~N,~B");
c$._ = Clazz.defineMethod (c$, "_", 
function (string, objects, t) {
return (objects == null ? string : org.jmol.i18n.GT.getString (string, objects));
}, "~S,~A,~B");
c$.getString = Clazz.defineMethod (c$, "getString", 
($fz = function (string, objects) {
return java.text.MessageFormat.format (string, objects);
}, $fz.isPrivate = true, $fz), "~S,~A");
Clazz.defineStatics (c$,
"$getTextWrapper", null,
"languageList", null);
});
