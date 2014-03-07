Clazz.declarePackage ("org.jmol.util");
Clazz.load (null, "org.jmol.util.Matrix3f", ["java.lang.ArrayIndexOutOfBoundsException", "org.jmol.util.Tuple3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.m00 = 0;
this.m01 = 0;
this.m02 = 0;
this.m10 = 0;
this.m11 = 0;
this.m12 = 0;
this.m20 = 0;
this.m21 = 0;
this.m22 = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.util, "Matrix3f", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function () {
});
c$.newA = Clazz.defineMethod (c$, "newA", 
function (v) {
var m =  new org.jmol.util.Matrix3f ();
m.setA (v);
return m;
}, "~A");
c$.newM = Clazz.defineMethod (c$, "newM", 
function (m1) {
var m =  new org.jmol.util.Matrix3f ();
m.m00 = m1.m00;
m.m01 = m1.m01;
m.m02 = m1.m02;
m.m10 = m1.m10;
m.m11 = m1.m11;
m.m12 = m1.m12;
m.m20 = m1.m20;
m.m21 = m1.m21;
m.m22 = m1.m22;
return m;
}, "org.jmol.util.Matrix3f");
Clazz.overrideMethod (c$, "toString", 
function () {
return "[\n  [" + this.m00 + "\t" + this.m01 + "\t" + this.m02 + "]" + "\n  [" + this.m10 + "\t" + this.m11 + "\t" + this.m12 + "]" + "\n  [" + this.m20 + "\t" + this.m21 + "\t" + this.m22 + "] ]";
});
Clazz.defineMethod (c$, "setIdentity", 
function () {
this.m00 = 1.0;
this.m01 = 0.0;
this.m02 = 0.0;
this.m10 = 0.0;
this.m11 = 1.0;
this.m12 = 0.0;
this.m20 = 0.0;
this.m21 = 0.0;
this.m22 = 1.0;
});
Clazz.defineMethod (c$, "setElement", 
function (row, column, value) {
if (row == 0) if (column == 0) this.m00 = value;
 else if (column == 1) this.m01 = value;
 else if (column == 2) this.m02 = value;
 else throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
 else if (row == 1) if (column == 0) this.m10 = value;
 else if (column == 1) this.m11 = value;
 else if (column == 2) this.m12 = value;
 else throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
 else if (row == 2) if (column == 0) this.m20 = value;
 else if (column == 1) this.m21 = value;
 else if (column == 2) this.m22 = value;
 else throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
 else throw  new ArrayIndexOutOfBoundsException ("row must be 0 to 2 and is " + row);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getElement", 
function (row, column) {
if (row == 0) if (column == 0) return this.m00;
 else if (column == 1) return this.m01;
 else if (column == 2) return this.m02;
 else throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
 else if (row == 1) if (column == 0) return this.m10;
 else if (column == 1) return this.m11;
 else if (column == 2) return this.m12;
 else throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
 else if (row == 2) if (column == 0) return this.m20;
 else if (column == 1) return this.m21;
 else if (column == 2) return this.m22;
 else throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
 else throw  new ArrayIndexOutOfBoundsException ("row must be 0 to 2 and is " + row);
}, "~N,~N");
Clazz.defineMethod (c$, "setRow", 
function (row, x, y, z) {
if (row == 0) {
this.m00 = x;
this.m01 = y;
this.m02 = z;
} else if (row == 1) {
this.m10 = x;
this.m11 = y;
this.m12 = z;
} else if (row == 2) {
this.m20 = x;
this.m21 = y;
this.m22 = z;
} else {
throw  new ArrayIndexOutOfBoundsException ("row must be 0 to 2 and is " + row);
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setRowV", 
function (row, v) {
if (row == 0) {
this.m00 = v.x;
this.m01 = v.y;
this.m02 = v.z;
} else if (row == 1) {
this.m10 = v.x;
this.m11 = v.y;
this.m12 = v.z;
} else if (row == 2) {
this.m20 = v.x;
this.m21 = v.y;
this.m22 = v.z;
} else {
throw  new ArrayIndexOutOfBoundsException ("row must be 0 to 2 and is " + row);
}}, "~N,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "getRow", 
function (row, v) {
if (row == 0) {
v[0] = this.m00;
v[1] = this.m01;
v[2] = this.m02;
} else if (row == 1) {
v[0] = this.m10;
v[1] = this.m11;
v[2] = this.m12;
} else if (row == 2) {
v[0] = this.m20;
v[1] = this.m21;
v[2] = this.m22;
} else {
throw  new ArrayIndexOutOfBoundsException ("row must be 0 to 2 and is " + row);
}}, "~N,~A");
Clazz.defineMethod (c$, "setRowA", 
function (row, v) {
if (row == 0) {
this.m00 = v[0];
this.m01 = v[1];
this.m02 = v[2];
} else if (row == 1) {
this.m10 = v[0];
this.m11 = v[1];
this.m12 = v[2];
} else if (row == 2) {
this.m20 = v[0];
this.m21 = v[1];
this.m22 = v[2];
} else {
throw  new ArrayIndexOutOfBoundsException ("row must be 0 to 2 and is " + row);
}}, "~N,~A");
Clazz.defineMethod (c$, "setColumn", 
function (column, x, y, z) {
if (column == 0) {
this.m00 = x;
this.m10 = y;
this.m20 = z;
} else if (column == 1) {
this.m01 = x;
this.m11 = y;
this.m21 = z;
} else if (column == 2) {
this.m02 = x;
this.m12 = y;
this.m22 = z;
} else {
throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setColumnV", 
function (column, v) {
if (column == 0) {
this.m00 = v.x;
this.m10 = v.y;
this.m20 = v.z;
} else if (column == 1) {
this.m01 = v.x;
this.m11 = v.y;
this.m21 = v.z;
} else if (column == 2) {
this.m02 = v.x;
this.m12 = v.y;
this.m22 = v.z;
} else {
throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
}}, "~N,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "setColumnA", 
function (column, v) {
if (column == 0) {
this.m00 = v[0];
this.m10 = v[1];
this.m20 = v[2];
} else if (column == 1) {
this.m01 = v[0];
this.m11 = v[1];
this.m21 = v[2];
} else if (column == 2) {
this.m02 = v[0];
this.m12 = v[1];
this.m22 = v[2];
} else {
throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
}}, "~N,~A");
Clazz.defineMethod (c$, "getColumnV", 
function (column, v) {
if (column == 0) {
v.x = this.m00;
v.y = this.m10;
v.z = this.m20;
} else if (column == 1) {
v.x = this.m01;
v.y = this.m11;
v.z = this.m21;
} else if (column == 2) {
v.x = this.m02;
v.y = this.m12;
v.z = this.m22;
} else {
throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
}}, "~N,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "getColumn", 
function (column, v) {
if (column == 0) {
v[0] = this.m00;
v[1] = this.m10;
v[2] = this.m20;
} else if (column == 1) {
v[0] = this.m01;
v[1] = this.m11;
v[2] = this.m21;
} else if (column == 2) {
v[0] = this.m02;
v[1] = this.m12;
v[2] = this.m22;
} else {
throw  new ArrayIndexOutOfBoundsException ("column must be 0 to 2 and is " + column);
}}, "~N,~A");
Clazz.defineMethod (c$, "add", 
function (m1) {
this.m00 += m1.m00;
this.m01 += m1.m01;
this.m02 += m1.m02;
this.m10 += m1.m10;
this.m11 += m1.m11;
this.m12 += m1.m12;
this.m20 += m1.m20;
this.m21 += m1.m21;
this.m22 += m1.m22;
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "sub", 
function (m1) {
this.m00 -= m1.m00;
this.m01 -= m1.m01;
this.m02 -= m1.m02;
this.m10 -= m1.m10;
this.m11 -= m1.m11;
this.m12 -= m1.m12;
this.m20 -= m1.m20;
this.m21 -= m1.m21;
this.m22 -= m1.m22;
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "transpose", 
function () {
var tmp = this.m01;
this.m01 = this.m10;
this.m10 = tmp;
tmp = this.m02;
this.m02 = this.m20;
this.m20 = tmp;
tmp = this.m12;
this.m12 = this.m21;
this.m21 = tmp;
});
Clazz.defineMethod (c$, "transposeM", 
function (m1) {
this.setM (m1);
this.transpose ();
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "setAA", 
function (a1) {
this.setFromAxisAngle (a1.x, a1.y, a1.z, a1.angle);
}, "org.jmol.util.AxisAngle4f");
Clazz.defineMethod (c$, "setFromAxisAngle", 
($fz = function (x, y, z, angle) {
var n = Math.sqrt (x * x + y * y + z * z);
n = 1 / n;
x *= n;
y *= n;
z *= n;
var c = Math.cos (angle);
var s = Math.sin (angle);
var omc = 1.0 - c;
this.m00 = (c + x * x * omc);
this.m11 = (c + y * y * omc);
this.m22 = (c + z * z * omc);
var tmp1 = x * y * omc;
var tmp2 = z * s;
this.m01 = (tmp1 - tmp2);
this.m10 = (tmp1 + tmp2);
tmp1 = x * z * omc;
tmp2 = y * s;
this.m02 = (tmp1 + tmp2);
this.m20 = (tmp1 - tmp2);
tmp1 = y * z * omc;
tmp2 = x * s;
this.m12 = (tmp1 - tmp2);
this.m21 = (tmp1 + tmp2);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setM", 
function (m1) {
this.m00 = m1.m00;
this.m01 = m1.m01;
this.m02 = m1.m02;
this.m10 = m1.m10;
this.m11 = m1.m11;
this.m12 = m1.m12;
this.m20 = m1.m20;
this.m21 = m1.m21;
this.m22 = m1.m22;
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "setA", 
function (m) {
this.m00 = m[0];
this.m01 = m[1];
this.m02 = m[2];
this.m10 = m[3];
this.m11 = m[4];
this.m12 = m[5];
this.m20 = m[6];
this.m21 = m[7];
this.m22 = m[8];
}, "~A");
Clazz.defineMethod (c$, "invertM", 
function (m1) {
this.setM (m1);
this.invert ();
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "invert", 
function () {
var s = this.determinant ();
if (s == 0.0) return;
s = 1 / s;
this.set (this.m11 * this.m22 - this.m12 * this.m21, this.m02 * this.m21 - this.m01 * this.m22, this.m01 * this.m12 - this.m02 * this.m11, this.m12 * this.m20 - this.m10 * this.m22, this.m00 * this.m22 - this.m02 * this.m20, this.m02 * this.m10 - this.m00 * this.m12, this.m10 * this.m21 - this.m11 * this.m20, this.m01 * this.m20 - this.m00 * this.m21, this.m00 * this.m11 - this.m01 * this.m10);
this.mulf (s);
});
Clazz.defineMethod (c$, "determinant", 
function () {
return this.m00 * (this.m11 * this.m22 - this.m21 * this.m12) - this.m01 * (this.m10 * this.m22 - this.m20 * this.m12) + this.m02 * (this.m10 * this.m21 - this.m20 * this.m11);
});
Clazz.defineMethod (c$, "setScale", 
function (scale) {
this.m00 = scale;
this.m01 = 0.0;
this.m02 = 0.0;
this.m10 = 0.0;
this.m11 = scale;
this.m12 = 0.0;
this.m20 = 0.0;
this.m21 = 0.0;
this.m22 = scale;
}, "~N");
Clazz.defineMethod (c$, "rotX", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = 1.0;
this.m01 = 0.0;
this.m02 = 0.0;
this.m10 = 0.0;
this.m11 = c;
this.m12 = -s;
this.m20 = 0.0;
this.m21 = s;
this.m22 = c;
}, "~N");
Clazz.defineMethod (c$, "rotY", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = c;
this.m01 = 0.0;
this.m02 = s;
this.m10 = 0.0;
this.m11 = 1.0;
this.m12 = 0.0;
this.m20 = -s;
this.m21 = 0.0;
this.m22 = c;
}, "~N");
Clazz.defineMethod (c$, "rotZ", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = c;
this.m01 = -s;
this.m02 = 0.0;
this.m10 = s;
this.m11 = c;
this.m12 = 0.0;
this.m20 = 0.0;
this.m21 = 0.0;
this.m22 = 1.0;
}, "~N");
Clazz.defineMethod (c$, "mulf", 
function (scalar) {
this.m00 *= scalar;
this.m01 *= scalar;
this.m02 *= scalar;
this.m10 *= scalar;
this.m11 *= scalar;
this.m12 *= scalar;
this.m20 *= scalar;
this.m21 *= scalar;
this.m22 *= scalar;
}, "~N");
Clazz.defineMethod (c$, "mul", 
function (m1) {
this.mul2 (this, m1);
}, "org.jmol.util.Matrix3f");
Clazz.defineMethod (c$, "mul2", 
function (m1, m2) {
this.set (m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20, m1.m00 * m2.m01 + m1.m01 * m2.m11 + m1.m02 * m2.m21, m1.m00 * m2.m02 + m1.m01 * m2.m12 + m1.m02 * m2.m22, m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20, m1.m10 * m2.m01 + m1.m11 * m2.m11 + m1.m12 * m2.m21, m1.m10 * m2.m02 + m1.m11 * m2.m12 + m1.m12 * m2.m22, m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20, m1.m20 * m2.m01 + m1.m21 * m2.m11 + m1.m22 * m2.m21, m1.m20 * m2.m02 + m1.m21 * m2.m12 + m1.m22 * m2.m22);
}, "org.jmol.util.Matrix3f,org.jmol.util.Matrix3f");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, org.jmol.util.Matrix3f))) return false;
var m = o;
return this.m00 == m.m00 && this.m01 == m.m01 && this.m02 == m.m02 && this.m10 == m.m10 && this.m11 == m.m11 && this.m12 == m.m12 && this.m20 == m.m20 && this.m21 == m.m21 && this.m22 == m.m22;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return org.jmol.util.Tuple3f.floatToIntBits0 (this.m00) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.m01) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.m02) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.m10) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.m11) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.m12) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.m20) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.m21) ^ org.jmol.util.Tuple3f.floatToIntBits0 (this.m22);
});
Clazz.defineMethod (c$, "setZero", 
function () {
this.m00 = 0.0;
this.m01 = 0.0;
this.m02 = 0.0;
this.m10 = 0.0;
this.m11 = 0.0;
this.m12 = 0.0;
this.m20 = 0.0;
this.m21 = 0.0;
this.m22 = 0.0;
});
Clazz.defineMethod (c$, "transform", 
function (t) {
this.transform2 (t, t);
}, "org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "transform2", 
function (t, result) {
result.set (this.m00 * t.x + this.m01 * t.y + this.m02 * t.z, this.m10 * t.x + this.m11 * t.y + this.m12 * t.z, this.m20 * t.x + this.m21 * t.y + this.m22 * t.z);
}, "org.jmol.util.Tuple3f,org.jmol.util.Tuple3f");
Clazz.defineMethod (c$, "set", 
($fz = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
this.m00 = m00;
this.m01 = m01;
this.m02 = m02;
this.m10 = m10;
this.m11 = m11;
this.m12 = m12;
this.m20 = m20;
this.m21 = m21;
this.m22 = m22;
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N,~N,~N,~N,~N");
});
