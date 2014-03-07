Clazz.declarePackage ("org.jmol.bspt");
Clazz.load (["org.jmol.bspt.Element"], "org.jmol.bspt.Leaf", ["org.jmol.bspt.Node", "org.jmol.util.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tuples = null;
Clazz.instantialize (this, arguments);
}, org.jmol.bspt, "Leaf", org.jmol.bspt.Element);
Clazz.makeConstructor (c$, 
function (bspt, leaf, countToKeep) {
Clazz.superConstructor (this, org.jmol.bspt.Leaf, []);
this.bspt = bspt;
this.count = 0;
this.tuples =  new Array (2);
if (leaf == null) return;
for (var i = countToKeep; i < 2; ++i) {
this.tuples[this.count++] = leaf.tuples[i];
leaf.tuples[i] = null;
}
leaf.count = countToKeep;
}, "org.jmol.bspt.Bspt,org.jmol.bspt.Leaf,~N");
Clazz.defineMethod (c$, "sort", 
function (dim) {
for (var i = this.count; --i > 0; ) {
var champion = this.tuples[i];
var championValue = org.jmol.bspt.Node.getDimensionValue (champion, dim);
for (var j = i; --j >= 0; ) {
var challenger = this.tuples[j];
var challengerValue = org.jmol.bspt.Node.getDimensionValue (challenger, dim);
if (challengerValue > championValue) {
this.tuples[i] = challenger;
this.tuples[j] = champion;
champion = challenger;
championValue = challengerValue;
}}
}
}, "~N");
Clazz.overrideMethod (c$, "addTuple", 
function (level, tuple) {
if (this.count < 2) {
this.tuples[this.count++] = tuple;
return this;
}var node =  new org.jmol.bspt.Node (this.bspt, level, this);
return node.addTuple (level, tuple);
}, "~N,org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "dump", 
function (level, sb) {
for (var i = 0; i < this.count; ++i) {
var t = this.tuples[i];
for (var j = 0; j < level; ++j) sb.append (".");

sb.append (org.jmol.util.Escape.escape (t)).append ("Leaf ").appendI (i).append (": ").append ((t).getInfo ());
}
}, "~N,org.jmol.util.StringXBuilder");
Clazz.overrideMethod (c$, "toString", 
function () {
return "leaf:" + this.count + "\n";
});
});
