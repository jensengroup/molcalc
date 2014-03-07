Clazz.declarePackage ("org.jmol.export.image");
Clazz.load (["org.jmol.api.JmolImageCreatorInterface"], "org.jmol.export.image.GenericImageCreator", ["java.io.BufferedWriter", "$.File", "$.FileOutputStream", "$.IOException", "$.OutputStreamWriter", "java.lang.Error", "org.jmol.export.image.GenericPngEncoder", "org.jmol.io.Base64", "org.jmol.io2.JpegEncoder", "org.jmol.util.Escape", "$.Logger", "org.jmol.viewer.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.privateKey = 0;
Clazz.instantialize (this, arguments);
}, org.jmol["export"].image, "GenericImageCreator", null, org.jmol.api.JmolImageCreatorInterface);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "setViewer", 
function (viewer, privateKey) {
this.viewer = viewer;
this.privateKey = privateKey;
}, "org.jmol.api.JmolViewer,~N");
Clazz.overrideMethod (c$, "createImage", 
function (fileName, type, text, bytes_or_image, scripts, appendix, quality) {
var isBytes = (bytes_or_image != null);
var isText = (!isBytes && quality == -2147483648);
var os = null;
var len = -1;
try {
if (!this.viewer.checkPrivateKey (this.privateKey)) return "NO SECURITY";
if ("OutputStream".equals (type)) return  new java.io.FileOutputStream (fileName);
if (isBytes) {
if (Clazz.instanceOf (bytes_or_image, Array)) {
len = (bytes_or_image).length;
os =  new java.io.FileOutputStream (fileName);
var b = bytes_or_image;
os.write (b, 0, b.length);
os.flush ();
os.close ();
} else {
this.getImageBytes (type, quality, fileName, scripts, bytes_or_image, null, null);
return fileName;
}} else if (isText) {
if (text == null) return "NO DATA";
os =  new java.io.FileOutputStream (fileName);
var osw =  new java.io.OutputStreamWriter (os);
var bw =  new java.io.BufferedWriter (osw, 8192);
len = text.length;
bw.write (text);
bw.close ();
os = null;
} else {
len = 1;
var bytesOrError = this.getImageBytes (type, quality, fileName, scripts, null, appendix, null);
if (Clazz.instanceOf (bytesOrError, String)) return bytesOrError;
var bytes = bytesOrError;
if (bytes != null) return (fileName == null ? bytes :  String.instantialize (bytes));
len = ( new java.io.File (fileName)).length ();
}} catch (exc) {
if (Clazz.exceptionOf (exc, java.io.IOException)) {
org.jmol.util.Logger.errorEx ("IO Exception", exc);
return exc.toString ();
} else {
throw exc;
}
} finally {
if (os != null) {
try {
os.close ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}}
return (len < 0 ? "Creation of " + fileName + " failed: " + this.viewer.getErrorMessageUn () : "OK " + type + " " + len + " " + fileName + (quality == -2147483648 ? "" : "; quality=" + quality));
}, "~S,~S,~S,~O,~A,~O,~N");
Clazz.overrideMethod (c$, "getImageBytes", 
function (type, quality, fileName, scripts, objImage, appendix, os) {
var bytes = null;
var errMsg = null;
type = type.toUpperCase ();
var isPDF = type.equals ("PDF");
var isOsTemp = (os == null && fileName != null && !isPDF);
var asBytes = (os == null && fileName == null && !isPDF);
var isImage = (objImage != null);
var image = (isImage ? objImage : this.viewer.getScreenImageBuffer (null));
try {
if (image == null) {
errMsg = this.viewer.getErrorMessage ();
} else {
var ret = null;
var includeState = (asBytes && type.equals ("PNGJ") || !asBytes && appendix == null);
if (type.equals ("PNGJ") && includeState) ret = this.viewer.getWrappedState (fileName, scripts, true, true, this.viewer.apiPlatform.getImageWidth (image), this.viewer.apiPlatform.getImageHeight (image));
if (isOsTemp) os =  new java.io.FileOutputStream (fileName);
if (type.equals ("JPEG") || type.equals ("JPG")) {
if (quality <= 0) quality = 75;
if (asBytes) {
bytes = org.jmol.io2.JpegEncoder.getBytes (this.viewer.apiPlatform, image, quality, org.jmol.viewer.Viewer.getJmolVersion ());
} else {
var caption = (includeState ? this.viewer.getWrappedState (null, null, true, false, this.viewer.apiPlatform.getImageWidth (image), this.viewer.apiPlatform.getImageHeight (image)) : org.jmol.viewer.Viewer.getJmolVersion ());
org.jmol.io2.JpegEncoder.write (this.viewer.apiPlatform, image, quality, os, caption);
}} else if (type.equals ("JPG64") || type.equals ("JPEG64")) {
if (quality <= 0) quality = 75;
bytes = org.jmol.io2.JpegEncoder.getBytes (this.viewer.apiPlatform, image, quality, org.jmol.viewer.Viewer.getJmolVersion ());
if (asBytes) {
bytes = org.jmol.io.Base64.getBytes64 (bytes);
} else {
org.jmol.io.Base64.write (bytes, os);
bytes = null;
}} else if (type.startsWith ("PNG")) {
if (quality < 0) quality = 2;
 else if (quality > 9) quality = 9;
var bgcolor = (type.equals ("PNGT") ? this.viewer.getBackgroundArgb () : 0);
bytes = org.jmol["export"].image.GenericPngEncoder.getBytesType (this.viewer.apiPlatform, image, quality, bgcolor, type);
var b = null;
if (includeState) {
var nPNG = bytes.length;
b = bytes;
if (ret == null) ret = this.viewer.getWrappedState (null, scripts, true, false, this.viewer.apiPlatform.getImageWidth (image), this.viewer.apiPlatform.getImageHeight (image));
bytes = (org.jmol.util.Escape.isAB (ret) ? ret : (ret).getBytes ());
var nState = bytes.length;
org.jmol["export"].image.GenericPngEncoder.setJmolTypeText (b, nPNG, nState, type);
}if (!asBytes) {
if (b != null) os.write (b, 0, b.length);
os.write (bytes, 0, bytes.length);
b = bytes = null;
} else if (b != null) {
var bt =  Clazz.newByteArray (b.length + bytes.length, 0);
System.arraycopy (b, 0, bt, 0, b.length);
System.arraycopy (bytes, 0, bt, b.length, bytes.length);
bytes = bt;
b = bt = null;
}} else {
var errRet =  new Array (1);
bytes = this.getOtherBytes (fileName, image, type, asBytes, os, errRet);
errMsg = errRet[0];
}if (appendix != null && os != null) {
var b = (org.jmol.util.Escape.isAB (appendix) ? appendix : Clazz.instanceOf (appendix, String) ? (appendix).getBytes () : null);
if (b != null && b.length > 0) os.write (b, 0, b.length);
}if (os != null) os.flush ();
if (isOsTemp) os.close ();
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var e = e$$;
{
if (!isImage) this.viewer.releaseScreenImage ();
throw  new java.io.IOException ("" + e);
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
if (!isImage) this.viewer.releaseScreenImage ();
throw  new Error (er);
}
} else {
throw e$$;
}
}
if (!isImage) this.viewer.releaseScreenImage ();
if (errMsg != null) return errMsg;
return bytes;
}, "~S,~N,~S,~A,~O,~O,java.io.OutputStream");
Clazz.defineMethod (c$, "getOtherBytes", 
function (fileName, objImage, type, asBytes, os, errRet) {
errRet[0] = "file type " + type + " not available on this platform";
return null;
}, "~S,~O,~S,~B,java.io.OutputStream,~A");
Clazz.overrideMethod (c$, "clipImage", 
function (text) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getClipboardText", 
function () {
return null;
});
});
