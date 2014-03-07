Clazz.declarePackage ("com.jcraft.jzlib");
Clazz.load (null, "com.jcraft.jzlib.ZStream", ["com.jcraft.jzlib.Adler32", "$.Deflate", "$.Inflate"], function () {
c$ = Clazz.decorateAsClass (function () {
this.next_in = null;
this.next_in_index = 0;
this.avail_in = 0;
this.total_in = 0;
this.next_out = null;
this.next_out_index = 0;
this.avail_out = 0;
this.total_out = 0;
this.msg = null;
this.dstate = null;
this.istate = null;
this.data_type = 0;
this.checksum = null;
Clazz.instantialize (this, arguments);
}, com.jcraft.jzlib, "ZStream");
Clazz.makeConstructor (c$, 
function () {
this.construct ( new com.jcraft.jzlib.Adler32 ());
});
Clazz.makeConstructor (c$, 
function (adler) {
this.checksum = adler;
}, "com.jcraft.jzlib.Checksum");
Clazz.defineMethod (c$, "inflateInit", 
function () {
return this.inflateInit (15);
});
Clazz.defineMethod (c$, "inflateInit", 
function (nowrap) {
return this.inflateInit (15, nowrap);
}, "~B");
Clazz.defineMethod (c$, "inflateInit", 
function (w) {
return this.inflateInit (w, false);
}, "~N");
Clazz.defineMethod (c$, "inflateInit", 
function (w, nowrap) {
this.istate =  new com.jcraft.jzlib.Inflate (this);
return this.istate.inflateInit (nowrap ? -w : w);
}, "~N,~B");
Clazz.defineMethod (c$, "inflate", 
function (f) {
if (this.istate == null) return -2;
return this.istate.inflate (f);
}, "~N");
Clazz.defineMethod (c$, "inflateEnd", 
function () {
if (this.istate == null) return -2;
var ret = this.istate.inflateEnd ();
return ret;
});
Clazz.defineMethod (c$, "inflateSync", 
function () {
if (this.istate == null) return -2;
return this.istate.inflateSync ();
});
Clazz.defineMethod (c$, "inflateSyncPoint", 
function () {
if (this.istate == null) return -2;
return this.istate.inflateSyncPoint ();
});
Clazz.defineMethod (c$, "inflateSetDictionary", 
function (dictionary, dictLength) {
if (this.istate == null) return -2;
return this.istate.inflateSetDictionary (dictionary, dictLength);
}, "~A,~N");
Clazz.defineMethod (c$, "inflateFinished", 
function () {
return this.istate.mode == 12;
});
Clazz.defineMethod (c$, "deflateInit", 
function (level) {
return this.deflateInit (level, 15);
}, "~N");
Clazz.defineMethod (c$, "deflateInit", 
function (level, nowrap) {
return this.deflateInit (level, 15, nowrap);
}, "~N,~B");
Clazz.defineMethod (c$, "deflateInit", 
function (level, bits) {
return this.deflateInit (level, bits, false);
}, "~N,~N");
Clazz.defineMethod (c$, "deflateInit", 
function (level, bits, memlevel) {
this.dstate =  new com.jcraft.jzlib.Deflate (this);
return this.dstate.deflateInit3 (level, bits, memlevel);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "deflateInit", 
function (level, bits, nowrap) {
this.dstate =  new com.jcraft.jzlib.Deflate (this);
return this.dstate.deflateInit2 (level, nowrap ? -bits : bits);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "deflate", 
function (flush) {
if (this.dstate == null) {
return -2;
}return this.dstate.deflate (flush);
}, "~N");
Clazz.defineMethod (c$, "deflateEnd", 
function () {
if (this.dstate == null) return -2;
var ret = this.dstate.deflateEnd ();
this.dstate = null;
return ret;
});
Clazz.defineMethod (c$, "deflateParams", 
function (level, strategy) {
if (this.dstate == null) return -2;
return this.dstate.deflateParams (level, strategy);
}, "~N,~N");
Clazz.defineMethod (c$, "deflateSetDictionary", 
function (dictionary, dictLength) {
if (this.dstate == null) return -2;
return this.dstate.deflateSetDictionary (dictionary, dictLength);
}, "~A,~N");
Clazz.defineMethod (c$, "flush_pending", 
function () {
var len = this.dstate.pending;
if (len > this.avail_out) len = this.avail_out;
if (len == 0) return;
if (this.dstate.pending_buf.length <= this.dstate.pending_out || this.next_out.length <= this.next_out_index || this.dstate.pending_buf.length < (this.dstate.pending_out + len) || this.next_out.length < (this.next_out_index + len)) {
}System.arraycopy (this.dstate.pending_buf, this.dstate.pending_out, this.next_out, this.next_out_index, len);
this.next_out_index += len;
this.dstate.pending_out += len;
this.total_out += len;
this.avail_out -= len;
this.dstate.pending -= len;
if (this.dstate.pending == 0) {
this.dstate.pending_out = 0;
}});
Clazz.defineMethod (c$, "read_buf", 
function (buf, start, size) {
var len = this.avail_in;
if (len > size) len = size;
if (len == 0) return 0;
this.avail_in -= len;
if (this.dstate.wrap != 0) {
this.checksum.update (this.next_in, this.next_in_index, len);
}System.arraycopy (this.next_in, this.next_in_index, buf, start, len);
this.next_in_index += len;
this.total_in += len;
return len;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "getAdler", 
function () {
return this.checksum.getValue ();
});
Clazz.defineMethod (c$, "free", 
function () {
this.next_in = null;
this.next_out = null;
this.msg = null;
});
Clazz.defineMethod (c$, "setOutput", 
function (buf) {
this.setOutput (buf, 0, buf.length);
}, "~A");
Clazz.defineMethod (c$, "setOutput", 
function (buf, off, len) {
this.next_out = buf;
this.next_out_index = off;
this.avail_out = len;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "setInput", 
function (buf) {
this.setInput (buf, 0, buf.length, false);
}, "~A");
Clazz.defineMethod (c$, "setInput", 
function (buf, append) {
this.setInput (buf, 0, buf.length, append);
}, "~A,~B");
Clazz.defineMethod (c$, "setInput", 
function (buf, off, len, append) {
if (len <= 0 && append && this.next_in != null) return;
if (this.avail_in > 0 && append) {
var tmp =  Clazz.newByteArray (this.avail_in + len, 0);
System.arraycopy (this.next_in, this.next_in_index, tmp, 0, this.avail_in);
System.arraycopy (buf, off, tmp, this.avail_in, len);
this.next_in = tmp;
this.next_in_index = 0;
this.avail_in += len;
} else {
this.next_in = buf;
this.next_in_index = off;
this.avail_in = len;
}}, "~A,~N,~N,~B");
Clazz.defineMethod (c$, "getNextIn", 
function () {
return this.next_in;
});
Clazz.defineMethod (c$, "setNextIn", 
function (next_in) {
this.next_in = next_in;
}, "~A");
Clazz.defineMethod (c$, "getNextInIndex", 
function () {
return this.next_in_index;
});
Clazz.defineMethod (c$, "setNextInIndex", 
function (next_in_index) {
this.next_in_index = next_in_index;
}, "~N");
Clazz.defineMethod (c$, "getAvailIn", 
function () {
return this.avail_in;
});
Clazz.defineMethod (c$, "setAvailIn", 
function (avail_in) {
this.avail_in = avail_in;
}, "~N");
Clazz.defineMethod (c$, "getNextOut", 
function () {
return this.next_out;
});
Clazz.defineMethod (c$, "setNextOut", 
function (next_out) {
this.next_out = next_out;
}, "~A");
Clazz.defineMethod (c$, "getNextOutIndex", 
function () {
return this.next_out_index;
});
Clazz.defineMethod (c$, "setNextOutIndex", 
function (next_out_index) {
this.next_out_index = next_out_index;
}, "~N");
Clazz.defineMethod (c$, "getAvailOut", 
function () {
return this.avail_out;
});
Clazz.defineMethod (c$, "setAvailOut", 
function (avail_out) {
this.avail_out = avail_out;
}, "~N");
Clazz.defineMethod (c$, "getTotalOut", 
function () {
return this.total_out;
});
Clazz.defineMethod (c$, "getTotalIn", 
function () {
return this.total_in;
});
Clazz.defineMethod (c$, "getMessage", 
function () {
return this.msg;
});
Clazz.defineMethod (c$, "end", 
function () {
return 0;
});
Clazz.defineMethod (c$, "finished", 
function () {
return false;
});
c$.getBytes = Clazz.defineMethod (c$, "getBytes", 
function (s) {
{
var x = [];
for (var i = 0; i < s.length;i++) {
var pt = s.charCodeAt(i);
if (pt <= 0x7F) {
x.push(pt);
} else if (pt <= 0x7FF) {
x.push(0xC0|((pt>>6)&0x1F));
x.push(0x80|(pt&0x3F));
} else if (pt <= 0xFFFF) {
x.push(0xE0|((pt>>12)&0xF));
x.push(0x80|((pt>>6)&0x3F));
x.push(0x80|(pt&0x3F));
} else {
x.push(0x3F); // '?'
}
}
return (Int32Array != Array ? new Int32Array(x) : x);
}}, "~S");
Clazz.defineStatics (c$,
"MAX_WBITS", 15,
"DEF_WBITS", 15,
"Z_OK", 0,
"Z_STREAM_ERROR", -2);
});
