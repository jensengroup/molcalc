Clazz.declarePackage ("org.jmol.util");
Clazz.load (["org.jmol.util.ArrayUtil"], "org.jmol.util.Shader", ["org.jmol.util.ColorUtil"], function () {
c$ = Clazz.declareType (org.jmol.util, "Shader");
c$.getShades = Clazz.defineMethod (c$, "getShades", 
function (rgb, greyScale) {
var shades =  Clazz.newIntArray (64, 0);
if (rgb == 0) return shades;
var red0 = ((rgb >> 16) & 0xFF);
var grn0 = ((rgb >> 8) & 0xFF);
var blu0 = (rgb & 0xFF);
var red = 0;
var grn = 0;
var blu = 0;
var f = org.jmol.util.Shader.ambientFraction;
while (true) {
red = red0 * f + 0.5;
grn = grn0 * f + 0.5;
blu = blu0 * f + 0.5;
if (f > 0 && red < 4 && grn < 4 && blu < 4) {
red0++;
grn0++;
blu0++;
if (f < 0.1) f += 0.1;
rgb = org.jmol.util.ColorUtil.rgb (Clazz.doubleToInt (Math.floor (red0)), Clazz.doubleToInt (Math.floor (grn0)), Clazz.doubleToInt (Math.floor (blu0)));
continue;
}break;
}
f = (1 - f) / 52;
var redStep = red0 * f;
var grnStep = grn0 * f;
var bluStep = blu0 * f;
var i;
for (i = 0; i < 52; ++i) {
shades[i] = org.jmol.util.ColorUtil.rgb (Clazz.doubleToInt (Math.floor (red)), Clazz.doubleToInt (Math.floor (grn)), Clazz.doubleToInt (Math.floor (blu)));
red += redStep;
grn += grnStep;
blu += bluStep;
}
shades[i++] = rgb;
f = org.jmol.util.Shader.intenseFraction / (64 - i);
redStep = (255.5 - red) * f;
grnStep = (255.5 - grn) * f;
bluStep = (255.5 - blu) * f;
for (; i < 64; i++) {
red += redStep;
grn += grnStep;
blu += bluStep;
shades[i] = org.jmol.util.ColorUtil.rgb (Clazz.doubleToInt (Math.floor (red)), Clazz.doubleToInt (Math.floor (grn)), Clazz.doubleToInt (Math.floor (blu)));
}
if (greyScale) for (; --i >= 0; ) shades[i] = org.jmol.util.ColorUtil.calcGreyscaleRgbFromRgb (shades[i]);

return shades;
}, "~N,~B");
c$.getShadeIndex = Clazz.defineMethod (c$, "getShadeIndex", 
function (x, y, z) {
var magnitude = Math.sqrt (x * x + y * y + z * z);
return Math.round (org.jmol.util.Shader.getFloatShadeIndexNormalized ((x / magnitude), (y / magnitude), (z / magnitude)) * 63);
}, "~N,~N,~N");
c$.getShadeIndexNormalized = Clazz.defineMethod (c$, "getShadeIndexNormalized", 
function (x, y, z) {
return Math.round (org.jmol.util.Shader.getFloatShadeIndexNormalized (x, y, z) * 63);
}, "~N,~N,~N");
c$.getFp8ShadeIndex = Clazz.defineMethod (c$, "getFp8ShadeIndex", 
function (x, y, z) {
var magnitude = Math.sqrt (x * x + y * y + z * z);
return Clazz.doubleToInt (Math.floor (org.jmol.util.Shader.getFloatShadeIndexNormalized ((x / magnitude), (y / magnitude), (z / magnitude)) * 63 * (256)));
}, "~N,~N,~N");
c$.getFloatShadeIndexNormalized = Clazz.defineMethod (c$, "getFloatShadeIndexNormalized", 
($fz = function (x, y, z) {
var NdotL = x * org.jmol.util.Shader.xLight + y * org.jmol.util.Shader.yLight + z * org.jmol.util.Shader.zLight;
if (NdotL <= 0) return 0;
var intensity = NdotL * org.jmol.util.Shader.diffuseFactor;
if (org.jmol.util.Shader.specularOn) {
var k_specular = 2 * NdotL * z - org.jmol.util.Shader.zLight;
if (k_specular > 0) {
if (org.jmol.util.Shader.usePhongExponent) {
k_specular = Math.pow (k_specular, org.jmol.util.Shader.phongExponent);
} else {
for (var n = org.jmol.util.Shader.specularExponent; --n >= 0 && k_specular > .0001; ) k_specular *= k_specular;

}intensity += k_specular * org.jmol.util.Shader.specularFactor;
}}if (intensity > 1) return 1;
return intensity;
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
c$.getDitheredNoisyShadeIndex = Clazz.defineMethod (c$, "getDitheredNoisyShadeIndex", 
function (x, y, z, r) {
var fp8ShadeIndex = Clazz.doubleToInt (Math.floor (org.jmol.util.Shader.getFloatShadeIndexNormalized (x / r, y / r, z / r) * 63 * (256)));
var shadeIndex = fp8ShadeIndex >> 8;
if ((fp8ShadeIndex & 0xFF) > org.jmol.util.Shader.nextRandom8Bit ()) ++shadeIndex;
var random16bit = org.jmol.util.Shader.seed & 0xFFFF;
if (random16bit < 21845 && shadeIndex > 0) --shadeIndex;
 else if (random16bit > 43690 && shadeIndex < 63) ++shadeIndex;
return shadeIndex;
}, "~N,~N,~N,~N");
c$.calcSphereShading = Clazz.defineMethod (c$, "calcSphereShading", 
function () {
var xF = -127.5;
for (var i = 0; i < 256; ++xF, ++i) {
var yF = -127.5;
for (var j = 0; j < 256; ++yF, ++j) {
var shadeIndex = 0;
var z2 = 16900 - xF * xF - yF * yF;
if (z2 > 0) {
var z = Math.sqrt (z2);
shadeIndex = org.jmol.util.Shader.getDitheredNoisyShadeIndex (xF, yF, z, 130);
}org.jmol.util.Shader.sphereShadeIndexes[(j << 8) + i] = shadeIndex;
}
}
($t$ = org.jmol.util.Shader.sphereShadingCalculated = true, org.jmol.util.Shader.prototype.sphereShadingCalculated = org.jmol.util.Shader.sphereShadingCalculated, $t$);
});
c$.nextRandom8Bit = Clazz.defineMethod (c$, "nextRandom8Bit", 
function () {
var t = org.jmol.util.Shader.seed;
($t$ = org.jmol.util.Shader.seed = t = ((t << 16) + (t << 1) + t) & 0x7FFFFFFF, org.jmol.util.Shader.prototype.seed = org.jmol.util.Shader.seed, $t$);
return t >> 23;
});
c$.getEllipsoidShade = Clazz.defineMethod (c$, "getEllipsoidShade", 
function (x, y, z, radius, mDeriv) {
var tx = mDeriv.m00 * x + mDeriv.m01 * y + mDeriv.m02 * z + mDeriv.m03;
var ty = mDeriv.m10 * x + mDeriv.m11 * y + mDeriv.m12 * z + mDeriv.m13;
var tz = mDeriv.m20 * x + mDeriv.m21 * y + mDeriv.m22 * z + mDeriv.m23;
var f = Math.min (radius / 2, 45) / Math.sqrt (tx * tx + ty * ty + tz * tz);
var i = Clazz.floatToInt (-tx * f);
var j = Clazz.floatToInt (-ty * f);
var k = Clazz.floatToInt (tz * f);
var outside = i < -20 || i >= 20 || j < -20 || j >= 20 || k < 0 || k >= 40;
if (outside) {
while (i % 2 == 0 && j % 2 == 0 && k % 2 == 0 && i + j + k > 0) {
i >>= 1;
j >>= 1;
k >>= 1;
}
outside = i < -20 || i >= 20 || j < -20 || j >= 20 || k < 0 || k >= 40;
}if (outside) ($t$ = org.jmol.util.Shader.nOut ++, org.jmol.util.Shader.prototype.nOut = org.jmol.util.Shader.nOut, $t$);
 else ($t$ = org.jmol.util.Shader.nIn ++, org.jmol.util.Shader.prototype.nIn = org.jmol.util.Shader.nIn, $t$);
return (outside ? org.jmol.util.Shader.getShadeIndex (i, j, k) : org.jmol.util.Shader.ellipsoidShades[i + 20][j + 20][k]);
}, "~N,~N,~N,~N,org.jmol.util.Matrix4f");
c$.createEllipsoidShades = Clazz.defineMethod (c$, "createEllipsoidShades", 
function () {
($t$ = org.jmol.util.Shader.ellipsoidShades =  Clazz.newByteArray (40, 40, 40, 0), org.jmol.util.Shader.prototype.ellipsoidShades = org.jmol.util.Shader.ellipsoidShades, $t$);
for (var ii = 0; ii < 40; ii++) for (var jj = 0; jj < 40; jj++) for (var kk = 0; kk < 40; kk++) org.jmol.util.Shader.ellipsoidShades[ii][jj][kk] = org.jmol.util.Shader.getShadeIndex (ii - 20, jj - 20, kk);



});
c$.flushSphereCache = Clazz.defineMethod (c$, "flushSphereCache", 
function () {
for (var i = 128; --i >= 0; ) org.jmol.util.Shader.sphereShapeCache[i] = null;

($t$ = org.jmol.util.Shader.ellipsoidShades = null, org.jmol.util.Shader.prototype.ellipsoidShades = org.jmol.util.Shader.ellipsoidShades, $t$);
});
Clazz.defineStatics (c$,
"shadeIndexMax", 64,
"shadeIndexLast", 63,
"shadeIndexNormal", 52,
"shadeIndexNoisyLimit", 56,
"xLightsource", -1,
"yLightsource", -1,
"zLightsource", 2.5);
c$.magnitudeLight = c$.prototype.magnitudeLight = Math.sqrt (8.25);
c$.xLight = c$.prototype.xLight = -1.0 / org.jmol.util.Shader.magnitudeLight;
c$.yLight = c$.prototype.yLight = -1.0 / org.jmol.util.Shader.magnitudeLight;
c$.zLight = c$.prototype.zLight = 2.5 / org.jmol.util.Shader.magnitudeLight;
Clazz.defineStatics (c$,
"specularOn", true,
"usePhongExponent", false,
"ambientPercent", 45,
"diffusePercent", 84,
"specularExponent", 6,
"specularPercent", 22,
"specularPower", 40,
"phongExponent", 64);
c$.ambientFraction = c$.prototype.ambientFraction = org.jmol.util.Shader.ambientPercent / 100;
c$.diffuseFactor = c$.prototype.diffuseFactor = org.jmol.util.Shader.diffusePercent / 100;
c$.intenseFraction = c$.prototype.intenseFraction = org.jmol.util.Shader.specularPower / 100;
c$.specularFactor = c$.prototype.specularFactor = org.jmol.util.Shader.specularPercent / 100;
Clazz.defineStatics (c$,
"sphereShadingCalculated", false,
"sphereShadeIndexes",  Clazz.newByteArray (65536, 0),
"seed", 0x12345679,
"SLIM", 20,
"SDIM", 40,
"maxSphereCache", 128);
c$.sphereShapeCache = c$.prototype.sphereShapeCache = org.jmol.util.ArrayUtil.newInt2 (128);
Clazz.defineStatics (c$,
"ellipsoidShades", null,
"nOut", 0,
"nIn", 0);
});
