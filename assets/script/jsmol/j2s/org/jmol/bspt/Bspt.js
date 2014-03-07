Clazz.declarePackage ("org.jmol.bspt");
Clazz.load (null, "org.jmol.bspt.Bspt", ["org.jmol.bspt.CubeIterator", "$.Leaf", "org.jmol.util.Logger", "$.StringXBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.treeDepth = 0;
this.dimMax = 0;
this.index = 0;
this.eleRoot = null;
Clazz.instantialize (this, arguments);
}, org.jmol.bspt, "Bspt");
Clazz.makeConstructor (c$, 
function (dimMax, index) {
this.dimMax = dimMax;
this.index = index;
this.reset ();
}, "~N,~N");
Clazz.defineMethod (c$, "reset", 
function () {
this.eleRoot =  new org.jmol.bspt.Leaf (this, null, 0);
this.treeDepth = 1;
});
Clazz.defineMethod (c$, "addTuple", 
function (tuple) {
this.eleRoot = this.eleRoot.addTuple (0, tuple);
}, "org.jmol.util.Point3f");
Clazz.defineMethod (c$, "stats", 
function () {
});
Clazz.defineMethod (c$, "dump", 
function () {
var sb =  new org.jmol.util.StringXBuilder ();
this.eleRoot.dump (0, sb);
org.jmol.util.Logger.info (sb.toString ());
});
Clazz.defineMethod (c$, "allocateCubeIterator", 
function () {
return  new org.jmol.bspt.CubeIterator (this);
});
Clazz.defineStatics (c$,
"leafCountMax", 2,
"MAX_TREE_DEPTH", 100);
});
