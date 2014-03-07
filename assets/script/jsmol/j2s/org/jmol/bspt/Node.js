Clazz.declarePackage ("org.jmol.bspt");
Clazz.load (["org.jmol.bspt.Element"], "org.jmol.bspt.Node", ["java.lang.NullPointerException", "org.jmol.bspt.Leaf", "org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dim = 0;
this.minLeft = 0;
this.maxLeft = 0;
this.eleLeft = null;
this.minRight = 0;
this.maxRight = 0;
this.eleRight = null;
Clazz.instantialize (this, arguments);
}, org.jmol.bspt, "Node", org.jmol.bspt.Element);
Clazz.makeConstructor (c$, 
function (bspt, level, leafLeft) {
Clazz.superConstructor (this, org.jmol.bspt.Node, []);
this.bspt = bspt;
if (level == bspt.treeDepth) {
bspt.treeDepth = level + 1;
if (bspt.treeDepth >= 100) org.jmol.util.Logger.error ("BSPT tree depth too great:" + bspt.treeDepth);
}if (leafLeft.count != 2) throw  new NullPointerException ();
this.dim = level % bspt.dimMax;
leafLeft.sort (this.dim);
var leafRight =  new org.jmol.bspt.Leaf (bspt, leafLeft, 1);
this.minLeft = org.jmol.bspt.Node.getDimensionValue (leafLeft.tuples[0], this.dim);
this.maxLeft = org.jmol.bspt.Node.getDimensionValue (leafLeft.tuples[leafLeft.count - 1], this.dim);
this.minRight = org.jmol.bspt.Node.getDimensionValue (leafRight.tuples[0], this.dim);
this.maxRight = org.jmol.bspt.Node.getDimensionValue (leafRight.tuples[leafRight.count - 1], this.dim);
this.eleLeft = leafLeft;
this.eleRight = leafRight;
this.count = 2;
}, "org.jmol.bspt.Bspt,~N,org.jmol.bspt.Leaf");
Clazz.defineMethod (c$, "addTuple", 
function (level, tuple) {
var dimValue = org.jmol.bspt.Node.getDimensionValue (tuple, this.dim);
++this.count;
var addLeft;
if (dimValue < this.maxLeft) {
addLeft = true;
} else if (dimValue > this.minRight) {
addLeft = false;
} else if (dimValue == this.maxLeft) {
if (dimValue == this.minRight) {
if (this.eleLeft.count < this.eleRight.count) addLeft = true;
 else addLeft = false;
} else {
addLeft = true;
}} else if (dimValue == this.minRight) {
addLeft = false;
} else {
if (this.eleLeft.count < this.eleRight.count) addLeft = true;
 else addLeft = false;
}if (addLeft) {
if (dimValue < this.minLeft) this.minLeft = dimValue;
 else if (dimValue > this.maxLeft) this.maxLeft = dimValue;
this.eleLeft = this.eleLeft.addTuple (level + 1, tuple);
} else {
if (dimValue < this.minRight) this.minRight = dimValue;
 else if (dimValue > this.maxRight) this.maxRight = dimValue;
this.eleRight = this.eleRight.addTuple (level + 1, tuple);
}return this;
}, "~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "dump", 
function (level, sb) {
sb.append ("\nnode LEFT" + level);
this.eleLeft.dump (level + 1, sb);
for (var i = 0; i < level; ++i) sb.append ("->");

sb.append (" RIGHT" + level);
this.eleRight.dump (level + 1, sb);
}, "~N,org.jmol.util.StringXBuilder");
Clazz.defineMethod (c$, "toString", 
function () {
return this.eleLeft.toString () + this.dim + ":" + "\n" + this.eleRight.toString ();
});
c$.getDimensionValue = Clazz.defineMethod (c$, "getDimensionValue", 
function (pt, dim) {
return (dim == 0 ? pt.x : dim == 1 ? pt.y : pt.z);
}, "org.jmol.util.Point3f,~N");
});
