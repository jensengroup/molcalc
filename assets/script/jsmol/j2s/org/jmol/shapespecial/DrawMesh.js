Clazz.declarePackage ("org.jmol.shapespecial");
Clazz.load (["org.jmol.shape.Mesh", "org.jmol.shapespecial.Draw", "org.jmol.util.BitSet", "$.Vector3f"], "org.jmol.shapespecial.DrawMesh", ["org.jmol.util.ArrayUtil", "$.BitSetUtil", "$.Point3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelFlags = null;
this.drawType = null;
this.drawTypes = null;
this.ptCenters = null;
this.axis = null;
this.axes = null;
this.drawVertexCount = 0;
this.drawVertexCounts = null;
this.isFixed = false;
this.isVector = false;
this.drawArrowScale = 0;
this.noHead = false;
this.isBarb = false;
this.bsMeshesVisible = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shapespecial, "DrawMesh", org.jmol.shape.Mesh);
Clazz.prepareFields (c$, function () {
this.drawType = org.jmol.shapespecial.Draw.EnumDrawType.NONE;
this.axis = org.jmol.util.Vector3f.new3 (1, 0, 0);
this.bsMeshesVisible =  new org.jmol.util.BitSet ();
});
Clazz.defineMethod (c$, "setCenters", 
function () {
if (this.ptCenters == null) this.setCenter (-1);
 else for (var i = this.ptCenters.length; --i >= 0; ) this.setCenter (i);

});
Clazz.defineMethod (c$, "setCenter", 
function (iModel) {
var center = org.jmol.util.Point3f.new3 (0, 0, 0);
var iptlast = -1;
var ipt = 0;
var n = 0;
for (var i = this.polygonCount; --i >= 0; ) {
if (iModel >= 0 && i != iModel || this.polygonIndexes[i] == null) continue;
iptlast = -1;
for (var iV = (this.drawType === org.jmol.shapespecial.Draw.EnumDrawType.POLYGON) ? 3 : this.polygonIndexes[i].length; --iV >= 0; ) {
ipt = this.polygonIndexes[i][iV];
if (ipt == iptlast) continue;
iptlast = ipt;
center.add (this.vertices[ipt]);
n++;
}
if (n > 0 && (i == iModel || i == 0)) {
center.scale (1.0 / n);
if (this.mat4 != null) this.mat4.transform (center);
break;
}}
if (iModel < 0) {
this.ptCenter = center;
} else {
this.ptCenters[iModel] = center;
}}, "~N");
Clazz.defineMethod (c$, "offset", 
function (offset) {
this.rotateTranslate (null, offset, false);
this.setCenters ();
}, "org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "deleteAtoms", 
function (modelIndex) {
if (modelIndex >= this.polygonCount) return;
this.polygonCount--;
this.polygonIndexes = org.jmol.util.ArrayUtil.deleteElements (this.polygonIndexes, modelIndex, 1);
this.drawTypes = org.jmol.util.ArrayUtil.deleteElements (this.drawTypes, modelIndex, 1);
this.drawVertexCounts = org.jmol.util.ArrayUtil.deleteElements (this.drawVertexCounts, modelIndex, 1);
this.ptCenters = org.jmol.util.ArrayUtil.deleteElements (this.ptCenters, modelIndex, 1);
this.axes = org.jmol.util.ArrayUtil.deleteElements (this.axes, modelIndex, 1);
var bs = org.jmol.util.BitSetUtil.newAndSetBit (modelIndex);
org.jmol.util.BitSetUtil.deleteBits (this.modelFlags, bs);
}, "~N");
});
