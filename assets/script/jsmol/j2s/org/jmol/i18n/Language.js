Clazz.declarePackage ("org.jmol.i18n");
Clazz.load (null, "org.jmol.i18n.Language", ["org.jmol.i18n.GT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.code = null;
this.language = null;
this.nativeLanguage = null;
this.display = false;
Clazz.instantialize (this, arguments);
}, org.jmol.i18n, "Language");
c$.getLanguageList = Clazz.defineMethod (c$, "getLanguageList", 
function () {
return [ new org.jmol.i18n.Language ("ar", org.jmol.i18n.GT._ ("Arabic"), "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©", false),  new org.jmol.i18n.Language ("ast", org.jmol.i18n.GT._ ("Asturian"), "Asturian", false),  new org.jmol.i18n.Language ("az", org.jmol.i18n.GT._ ("Azerbaijani"), "azÉ™rbaycan dili", false),  new org.jmol.i18n.Language ("bs", org.jmol.i18n.GT._ ("Bosnian"), "bosanski jezik", false),  new org.jmol.i18n.Language ("ca", org.jmol.i18n.GT._ ("Catalan"), "CatalÃ ", true),  new org.jmol.i18n.Language ("cs", org.jmol.i18n.GT._ ("Czech"), "ÄŒeÅ¡tina", true),  new org.jmol.i18n.Language ("da", org.jmol.i18n.GT._ ("Danish"), "Dansk", true),  new org.jmol.i18n.Language ("de", org.jmol.i18n.GT._ ("German"), "Deutsch", true),  new org.jmol.i18n.Language ("el", org.jmol.i18n.GT._ ("Greek"), "Î•Î»Î»Î·Î½Î¹ÎºÎ¬", false),  new org.jmol.i18n.Language ("en_AU", org.jmol.i18n.GT._ ("Australian English"), "Australian English", false),  new org.jmol.i18n.Language ("en_GB", org.jmol.i18n.GT._ ("British English"), "British English", true),  new org.jmol.i18n.Language ("en_US", org.jmol.i18n.GT._ ("American English"), "American English", true),  new org.jmol.i18n.Language ("es", org.jmol.i18n.GT._ ("Spanish"), "EspaÃ±ol", true),  new org.jmol.i18n.Language ("et", org.jmol.i18n.GT._ ("Estonian"), "Eesti", false),  new org.jmol.i18n.Language ("eu", org.jmol.i18n.GT._ ("Basque"), "Euskara", true),  new org.jmol.i18n.Language ("fi", org.jmol.i18n.GT._ ("Finnish"), "Suomi", true),  new org.jmol.i18n.Language ("fo", org.jmol.i18n.GT._ ("Faroese"), "FÃ¸royskt", false),  new org.jmol.i18n.Language ("fr", org.jmol.i18n.GT._ ("French"), "FranÃ§ais", true),  new org.jmol.i18n.Language ("fy", org.jmol.i18n.GT._ ("Frisian"), "Frysk", false),  new org.jmol.i18n.Language ("gl", org.jmol.i18n.GT._ ("Galician"), "Galego", false),  new org.jmol.i18n.Language ("hr", org.jmol.i18n.GT._ ("Croatian"), "Hrvatski", false),  new org.jmol.i18n.Language ("hu", org.jmol.i18n.GT._ ("Hungarian"), "Magyar", true),  new org.jmol.i18n.Language ("hy", org.jmol.i18n.GT._ ("Armenian"), "Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶", false),  new org.jmol.i18n.Language ("id", org.jmol.i18n.GT._ ("Indonesian"), "Indonesia", true),  new org.jmol.i18n.Language ("it", org.jmol.i18n.GT._ ("Italian"), "Italiano", true),  new org.jmol.i18n.Language ("ja", org.jmol.i18n.GT._ ("Japanese"), "æ—¥æœ¬èªž", true),  new org.jmol.i18n.Language ("jv", org.jmol.i18n.GT._ ("Javanese"), "Basa Jawa", false),  new org.jmol.i18n.Language ("ko", org.jmol.i18n.GT._ ("Korean"), "í•œêµ­ì–´", true),  new org.jmol.i18n.Language ("ms", org.jmol.i18n.GT._ ("Malay"), "Bahasa Melayu", true),  new org.jmol.i18n.Language ("nb", org.jmol.i18n.GT._ ("Norwegian Bokmal"), "Norsk BokmÃ¥l", false),  new org.jmol.i18n.Language ("nl", org.jmol.i18n.GT._ ("Dutch"), "Nederlands", true),  new org.jmol.i18n.Language ("oc", org.jmol.i18n.GT._ ("Occitan"), "Occitan", false),  new org.jmol.i18n.Language ("pl", org.jmol.i18n.GT._ ("Polish"), "Polski", false),  new org.jmol.i18n.Language ("pt", org.jmol.i18n.GT._ ("Portuguese"), "PortuguÃªs", false),  new org.jmol.i18n.Language ("pt_BR", org.jmol.i18n.GT._ ("Brazilian Portuguese"), "PortuguÃªs brasileiro", true),  new org.jmol.i18n.Language ("ru", org.jmol.i18n.GT._ ("Russian"), "Ð ÑƒÑ�Ñ�ÐºÐ¸Ð¹", false),  new org.jmol.i18n.Language ("sl", org.jmol.i18n.GT._ ("Slovenian"), "SlovenÅ¡Ä�ina", false),  new org.jmol.i18n.Language ("sr", org.jmol.i18n.GT._ ("Serbian"), "Ñ�Ñ€Ð¿Ñ�ÐºÐ¸ Ñ˜ÐµÐ·Ð¸Ðº", false),  new org.jmol.i18n.Language ("sv", org.jmol.i18n.GT._ ("Swedish"), "Svenska", true),  new org.jmol.i18n.Language ("ta", org.jmol.i18n.GT._ ("Tamil"), "à®¤à®®à®¿à®´à¯�", false),  new org.jmol.i18n.Language ("te", org.jmol.i18n.GT._ ("Telugu"), "à°¤à±†à°²à±�à°—à±�", false),  new org.jmol.i18n.Language ("tr", org.jmol.i18n.GT._ ("Turkish"), "TÃ¼rkÃ§e", true),  new org.jmol.i18n.Language ("ug", org.jmol.i18n.GT._ ("Uyghur"), "UyÆ£urqÉ™", false),  new org.jmol.i18n.Language ("uk", org.jmol.i18n.GT._ ("Ukrainian"), "Ð£ÐºÑ€Ð°Ñ—Ð½Ñ�ÑŒÐºÐ°", true),  new org.jmol.i18n.Language ("uz", org.jmol.i18n.GT._ ("Uzbek"), "O'zbek", false),  new org.jmol.i18n.Language ("zh_CN", org.jmol.i18n.GT._ ("Simplified Chinese"), "ç®€ä½“ä¸­æ–‡", true),  new org.jmol.i18n.Language ("zh_TW", org.jmol.i18n.GT._ ("Traditional Chinese"), "ç¹�é«”ä¸­æ–‡", true)];
});
Clazz.makeConstructor (c$, 
($fz = function (code, language, nativeLanguage, display) {
this.code = code;
this.language = language;
this.nativeLanguage = nativeLanguage;
this.display = display;
}, $fz.isPrivate = true, $fz), "~S,~S,~S,~B");
c$.getSupported = Clazz.defineMethod (c$, "getSupported", 
function (list, code) {
for (var i = list.length; --i >= 0; ) if (list[i].code.equalsIgnoreCase (code)) return list[i].code;

for (var i = list.length; --i >= 0; ) if (list[i].code.startsWith (code)) return list[i].code;

return null;
}, "~A,~S");
});
