Clazz.declarePackage ("J.util");
Clazz.load (["J.util.V3"], "J.util.Modulation", ["J.util.P3"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ccos = 0;
this.csin = 0;
this.f = 0;
this.wv = null;
this.twoPIx4 = 0;
Clazz.instantialize (this, arguments);
}, J.util, "Modulation", J.util.V3);
c$.getPointAndOffset = $_M(c$, "getPointAndOffset", 
function (mods, pt, t, scale) {
var pt0 = J.util.P3.newP (pt);
for (var i = mods.length; --i >= 0; ) {
mods[i].addTo (pt, t, scale);
}
return pt.distance (pt0);
}, "~A,J.util.P3,~N,~N");
$_M(c$, "addTo", 
($fz = function (pt, t, scale) {
var theta = t * this.twoPIx4 * this.f;
var v = 0;
if (this.ccos != 0) v += this.ccos * Math.cos (theta);
if (this.csin != 0) v += this.csin * Math.sin (theta);
pt.scaleAdd2 ((v * scale), this.wv, pt);
}, $fz.isPrivate = true, $fz), "J.util.P3,~N,~N");
});
