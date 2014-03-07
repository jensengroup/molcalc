Clazz.declarePackage ("org.jmol.util");
Clazz.load (["java.util.Hashtable", "org.jmol.util.DefaultLogger"], "org.jmol.util.Logger", ["java.lang.Long", "$.Runtime"], function () {
c$ = Clazz.declareType (org.jmol.util, "Logger");
c$.getProperty = Clazz.defineMethod (c$, "getProperty", 
($fz = function (level, defaultValue) {
try {
var property = System.getProperty ("jmol.logger." + level, null);
if (property != null) {
return (property.equalsIgnoreCase ("true"));
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return defaultValue;
}, $fz.isPrivate = true, $fz), "~S,~B");
c$.setLogger = Clazz.defineMethod (c$, "setLogger", 
function (logger) {
($t$ = org.jmol.util.Logger._logger = logger, org.jmol.util.Logger.prototype._logger = org.jmol.util.Logger._logger, $t$);
($t$ = org.jmol.util.Logger.debugging = org.jmol.util.Logger.isActiveLevel (5) || org.jmol.util.Logger.isActiveLevel (6), org.jmol.util.Logger.prototype.debugging = org.jmol.util.Logger.debugging, $t$);
}, "org.jmol.util.LoggerInterface");
c$.isActiveLevel = Clazz.defineMethod (c$, "isActiveLevel", 
function (level) {
return org.jmol.util.Logger._logger != null && level >= 0 && level < 7 && org.jmol.util.Logger._activeLevels[level];
}, "~N");
c$.setActiveLevel = Clazz.defineMethod (c$, "setActiveLevel", 
function (level, active) {
if (level < 0) level = 0;
if (level >= 7) level = 6;
org.jmol.util.Logger._activeLevels[level] = active;
($t$ = org.jmol.util.Logger.debugging = org.jmol.util.Logger.isActiveLevel (5) || org.jmol.util.Logger.isActiveLevel (6), org.jmol.util.Logger.prototype.debugging = org.jmol.util.Logger.debugging, $t$);
}, "~N,~B");
c$.setLogLevel = Clazz.defineMethod (c$, "setLogLevel", 
function (level) {
for (var i = 7; --i >= 0; ) org.jmol.util.Logger.setActiveLevel (i, i <= level);

}, "~N");
c$.getLevel = Clazz.defineMethod (c$, "getLevel", 
function (level) {
switch (level) {
case 6:
return "DEBUGHIGH";
case 5:
return "DEBUG";
case 4:
return "INFO";
case 3:
return "WARN";
case 2:
return "ERROR";
case 1:
return "FATAL";
}
return "????";
}, "~N");
c$.logLevel = Clazz.defineMethod (c$, "logLevel", 
function () {
return org.jmol.util.Logger._logLevel;
});
c$.doLogLevel = Clazz.defineMethod (c$, "doLogLevel", 
function (log) {
($t$ = org.jmol.util.Logger._logLevel = log, org.jmol.util.Logger.prototype._logLevel = org.jmol.util.Logger._logLevel, $t$);
}, "~B");
c$.debug = Clazz.defineMethod (c$, "debug", 
function (txt) {
if (!org.jmol.util.Logger.debugging) return;
try {
org.jmol.util.Logger._logger.debug (txt);
} catch (t) {
}
}, "~S");
c$.info = Clazz.defineMethod (c$, "info", 
function (txt) {
try {
if (org.jmol.util.Logger.isActiveLevel (4)) {
org.jmol.util.Logger._logger.info (txt);
}} catch (t) {
}
}, "~S");
c$.warn = Clazz.defineMethod (c$, "warn", 
function (txt) {
try {
if (org.jmol.util.Logger.isActiveLevel (3)) {
org.jmol.util.Logger._logger.warn (txt);
}} catch (t) {
}
}, "~S");
c$.warnEx = Clazz.defineMethod (c$, "warnEx", 
function (txt, e) {
try {
if (org.jmol.util.Logger.isActiveLevel (3)) {
org.jmol.util.Logger._logger.warnEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.error = Clazz.defineMethod (c$, "error", 
function (txt) {
try {
if (org.jmol.util.Logger.isActiveLevel (2)) {
org.jmol.util.Logger._logger.error (txt);
}} catch (t) {
}
}, "~S");
c$.errorEx = Clazz.defineMethod (c$, "errorEx", 
function (txt, e) {
try {
if (org.jmol.util.Logger.isActiveLevel (2)) {
org.jmol.util.Logger._logger.errorEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.getLogLevel = Clazz.defineMethod (c$, "getLogLevel", 
function () {
for (var i = 7; --i >= 0; ) if (org.jmol.util.Logger.isActiveLevel (i)) return i;

return 0;
});
c$.fatal = Clazz.defineMethod (c$, "fatal", 
function (txt) {
try {
if (org.jmol.util.Logger.isActiveLevel (1)) {
org.jmol.util.Logger._logger.fatal (txt);
}} catch (t) {
}
}, "~S");
c$.fatalEx = Clazz.defineMethod (c$, "fatalEx", 
function (txt, e) {
try {
if (org.jmol.util.Logger.isActiveLevel (1)) {
org.jmol.util.Logger._logger.fatalEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.startTimer = Clazz.defineMethod (c$, "startTimer", 
function (msg) {
if (msg == null) return;
org.jmol.util.Logger.htTiming.put (msg, Long.$valueOf (System.currentTimeMillis ()));
}, "~S");
c$.checkTimer = Clazz.defineMethod (c$, "checkTimer", 
function (msg, andReset) {
if (msg == null) return -1;
var t = org.jmol.util.Logger.htTiming.get (msg);
if (t == null) return -1;
var time = System.currentTimeMillis () - t.longValue ();
if (!msg.startsWith ("(")) org.jmol.util.Logger.info ("Time for " + msg + ": " + (time) + " ms");
if (andReset) org.jmol.util.Logger.startTimer (msg);
return time;
}, "~S,~B");
c$.checkMemory = Clazz.defineMethod (c$, "checkMemory", 
function () {
var bTotal = 0;
var bFree = 0;
var bMax = 0;
try {
var runtime = Runtime.getRuntime ();
runtime.gc ();
bTotal = runtime.totalMemory ();
bFree = runtime.freeMemory ();
bMax = runtime.maxMemory ();
} catch (e) {
}
org.jmol.util.Logger.info ("Memory: Total-Free=" + (bTotal - bFree) + "; Total=" + bTotal + "; Free=" + bFree + "; Max=" + bMax);
});
c$._logger = c$.prototype._logger =  new org.jmol.util.DefaultLogger ();
Clazz.defineStatics (c$,
"LEVEL_FATAL", 1,
"LEVEL_ERROR", 2,
"LEVEL_WARN", 3,
"LEVEL_INFO", 4,
"LEVEL_DEBUG", 5,
"LEVEL_DEBUGHIGH", 6,
"LEVEL_MAX", 7,
"_activeLevels",  Clazz.newBooleanArray (7, false),
"_logLevel", false,
"debugging", false,
"debuggingHigh", false);
{
org.jmol.util.Logger._activeLevels[6] = org.jmol.util.Logger.getProperty ("debugHigh", false);
org.jmol.util.Logger._activeLevels[5] = org.jmol.util.Logger.getProperty ("debug", false);
org.jmol.util.Logger._activeLevels[4] = org.jmol.util.Logger.getProperty ("info", true);
org.jmol.util.Logger._activeLevels[3] = org.jmol.util.Logger.getProperty ("warn", true);
org.jmol.util.Logger._activeLevels[2] = org.jmol.util.Logger.getProperty ("error", true);
org.jmol.util.Logger._activeLevels[1] = org.jmol.util.Logger.getProperty ("fatal", true);
($t$ = org.jmol.util.Logger._logLevel = org.jmol.util.Logger.getProperty ("logLevel", false), org.jmol.util.Logger.prototype._logLevel = org.jmol.util.Logger._logLevel, $t$);
($t$ = org.jmol.util.Logger.debugging = (org.jmol.util.Logger._logger != null && (org.jmol.util.Logger._activeLevels[5] || org.jmol.util.Logger._activeLevels[6])), org.jmol.util.Logger.prototype.debugging = org.jmol.util.Logger.debugging, $t$);
($t$ = org.jmol.util.Logger.debuggingHigh = (org.jmol.util.Logger.debugging && org.jmol.util.Logger._activeLevels[6]), org.jmol.util.Logger.prototype.debuggingHigh = org.jmol.util.Logger.debuggingHigh, $t$);
}c$.htTiming = c$.prototype.htTiming =  new java.util.Hashtable ();
});
