Clazz.declarePackage ("org.jmol.jvxl.readers");
Clazz.load (["org.jmol.jvxl.readers.PmeshReader"], "org.jmol.jvxl.readers.ObjReader", ["java.util.Hashtable", "org.jmol.util.BitSet", "$.ColorUtil", "$.Parser", "$.Point3f"], function () {
c$ = Clazz.declareType (org.jmol.jvxl.readers, "ObjReader", org.jmol.jvxl.readers.PmeshReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.jvxl.readers.ObjReader, []);
});
Clazz.defineMethod (c$, "init2", 
function (sg, br) {
Clazz.superCall (this, org.jmol.jvxl.readers.ObjReader, "init2", [sg, br]);
this.type = "obj";
this.setHeader ();
}, "org.jmol.jvxl.readers.SurfaceGenerator,java.io.BufferedReader");
Clazz.overrideMethod (c$, "readVertices", 
function () {
this.pmeshError = "pmesh ERROR: invalid vertex/face list";
var pt =  new org.jmol.util.Point3f ();
var color = 0;
var ia;
var ib;
var ic;
var id = 0;
var i = 0;
var nPts = 0;
var htPymol =  new java.util.Hashtable ();
var ipt = null;
var spt = null;
var pymolMap =  Clazz.newIntArray (3, 0);
var bsOK =  new org.jmol.util.BitSet ();
while (this.readLine () != null) {
if (this.line.length < 2 || this.line.charAt (1) != ' ') {
if (this.params.readAllData && this.line.startsWith ("usemtl")) color = org.jmol.util.ColorUtil.getArgbFromString ("[x" + this.line.substring (8) + "]");
continue;
}switch (this.line.charAt (0)) {
case 'v':
this.next[0] = 2;
pt.set (org.jmol.util.Parser.parseFloatNext (this.line, this.next), org.jmol.util.Parser.parseFloatNext (this.line, this.next), org.jmol.util.Parser.parseFloatNext (this.line, this.next));
var addHt = false;
if (htPymol == null) {
i = this.nVertices;
} else if ((ipt = htPymol.get (spt = "" + pt)) == null) {
addHt = true;
i = this.nVertices;
} else {
i = ipt.intValue ();
}var j = i;
if (i == this.nVertices) {
if (this.isAnisotropic) this.setVertexAnisotropy (pt);
j = this.addVertexCopy (pt, 0, this.nVertices++);
if (j >= 0) bsOK.set (i);
}pymolMap[nPts % 3] = j;
if (addHt) htPymol.put (spt, Integer.$valueOf (i));
nPts++;
if (htPymol != null && nPts > 3) htPymol = null;
break;
case 'f':
if (nPts == 3 && this.line.indexOf ("//") < 0) htPymol = null;
nPts = 0;
this.nPolygons++;
var tokens = org.jmol.util.Parser.getTokens (this.line);
var vertexCount = tokens.length - 1;
if (vertexCount == 4) htPymol = null;
if (htPymol == null) {
ia = org.jmol.util.Parser.parseInt (tokens[1]) - 1;
ib = org.jmol.util.Parser.parseInt (tokens[2]) - 1;
ic = org.jmol.util.Parser.parseInt (tokens[3]) - 1;
this.pmeshError = " " + ia + " " + ib + " " + ic + " " + this.line;
if (!bsOK.get (ia) || !bsOK.get (ib) || !bsOK.get (ic)) continue;
if (vertexCount == 4) {
id = org.jmol.util.Parser.parseInt (tokens[4]) - 1;
var isOK = (bsOK.get (id));
this.nTriangles = this.addTriangleCheck (ia, ib, ic, (isOK ? 3 : 7), 0, false, color);
if (isOK) this.nTriangles = this.addTriangleCheck (ia, ic, id, 6, 0, false, color);
continue;
}} else {
ia = pymolMap[0];
ib = pymolMap[1];
ic = pymolMap[2];
if (ia < 0 || ib < 0 || ic < 0) continue;
}this.nTriangles = this.addTriangleCheck (ia, ib, ic, 7, 0, false, color);
break;
case 'g':
htPymol = null;
if (this.params.readAllData) color = org.jmol.util.ColorUtil.getArgbFromString ("[x" + this.line.substring (3) + "]");
break;
}
}
this.pmeshError = null;
return true;
});
Clazz.overrideMethod (c$, "readPolygons", 
function () {
return true;
});
});
