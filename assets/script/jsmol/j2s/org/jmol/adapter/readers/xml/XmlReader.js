Clazz.declarePackage ("org.jmol.adapter.readers.xml");
Clazz.load (["org.jmol.adapter.smarter.AtomSetCollectionReader"], "org.jmol.adapter.readers.xml.XmlReader", ["java.util.Hashtable", "org.jmol.adapter.smarter.AtomSetCollection", "$.Resolver", "org.jmol.api.Interface", "org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atom = null;
this.domAttributes = null;
this.parent = null;
this.atts = null;
this.keepChars = false;
this.chars = null;
this.domObj = null;
this.attribs = null;
this.attArgs = null;
this.nullObj = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.xml, "XmlReader", org.jmol.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.domObj =  new Array (1);
this.nullObj =  new Array (0);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.atts =  new java.util.Hashtable ();
this.setMyError (this.parseXML ());
this.continuing = false;
});
Clazz.defineMethod (c$, "setMyError", 
($fz = function (err) {
if (err != null && (this.atomSetCollection == null || this.atomSetCollection.errorMessage == null)) {
this.atomSetCollection =  new org.jmol.adapter.smarter.AtomSetCollection ("xml", this, null, null);
this.atomSetCollection.errorMessage = err;
}}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "parseXML", 
($fz = function () {
var saxReader = null;
{
}return this.selectReaderAndGo (saxReader);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "selectReaderAndGo", 
($fz = function (saxReader) {
this.atomSetCollection =  new org.jmol.adapter.smarter.AtomSetCollection (this.readerName, this, null, null);
var className = null;
var thisReader = null;
try {
var pt = this.readerName.indexOf ("(");
var name = (pt < 0 ? this.readerName : this.readerName.substring (0, pt));
className = org.jmol.adapter.smarter.Resolver.getReaderClassBase (name);
var atomSetCollectionReaderClass = Class.forName (className);
thisReader = atomSetCollectionReaderClass.newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "File reader was not found: " + className;
} else {
throw e;
}
}
try {
thisReader.processXml (this, saxReader);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "Error reading XML: " + e.getMessage ();
} else {
throw e;
}
}
return null;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "processXml", 
function (parent, saxReader) {
this.parent = parent;
this.atomSetCollection = parent.atomSetCollection;
this.reader = parent.reader;
this.atts = parent.atts;
if (saxReader == null) {
this.domAttributes = this.getDOMAttributes ();
this.attribs =  new Array (1);
this.attArgs =  new Array (1);
this.domObj =  new Array (1);
{
this.domObj[0] =
parent.viewer.applet._createDomNode("xmlReader"
,this.reader.lock.lock);
}this.walkDOMTree ();
{
parent.viewer.applet._createDomNode("xmlReader",null);
}} else {
var saxHandler = org.jmol.api.Interface.getOptionInterface ("adapter.readers.xml.XmlHandler");
saxHandler.parseXML (this, saxReader, this.reader);
}}, "org.jmol.adapter.readers.xml.XmlReader,~O");
Clazz.defineMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
try {
if (this.parent == null) Clazz.superCall (this, org.jmol.adapter.readers.xml.XmlReader, "applySymmetryAndSetTrajectory", []);
 else this.parent.applySymmetryAndSetTrajectory ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.getMessage ());
org.jmol.util.Logger.error ("applySymmetry failed: " + e);
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "processDOM", 
function (DOMNode) {
this.domObj = [DOMNode];
this.setMyError (this.selectReaderAndGo (null));
}, "~O");
Clazz.defineMethod (c$, "getDOMAttributes", 
function () {
return ["id"];
});
Clazz.defineMethod (c$, "processStartElement", 
function (localName) {
}, "~S");
Clazz.defineMethod (c$, "setKeepChars", 
function (TF) {
this.keepChars = TF;
this.chars = null;
}, "~B");
Clazz.defineMethod (c$, "processEndElement", 
function (localName) {
}, "~S");
Clazz.defineMethod (c$, "walkDOMTree", 
($fz = function () {
var localName;
{
localName = this.jsObjectGetMember(this.domObj,
"nodeName").toLowerCase();
}if (localName.equals ("#text")) {
if (this.keepChars) this.chars = this.jsObjectGetMember (this.domObj, "data");
return;
}this.attribs[0] = this.jsObjectGetMember (this.domObj, "attributes");
this.getDOMAttributes (this.attribs);
this.processStartElement (localName);
var haveChildren;
{
haveChildren = this.jsObjectCall(this.domObj, "hasChildNodes",
null);
}if (haveChildren) {
var nextNode = this.jsObjectGetMember (this.domObj, "firstChild");
while (nextNode != null) {
this.domObj[0] = nextNode;
this.walkDOMTree ();
this.domObj[0] = nextNode;
nextNode = this.jsObjectGetMember (this.domObj, "nextSibling");
}
}this.processEndElement (localName);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getDOMAttributes", 
($fz = function (attributes) {
this.atts.clear ();
if (attributes == null) {
return;
}{
if (!this.jsObjectGetMember(attributes, "length")) return;
}var name;
for (var i = this.domAttributes.length; --i >= 0; ) {
this.attArgs[0] = name = this.domAttributes[i];
var att = this.jsObjectCall (attributes, "getNamedItem", this.attArgs);
if (att != null) {
this.attArgs[0] = att;
var attValue = this.jsObjectGetMember (this.attArgs, "value");
if (attValue != null) this.atts.put (name, attValue);
}}
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "jsObjectCall", 
($fz = function (jsObject, method, args) {
return this.parent.viewer.getJsObjectInfo (jsObject, method, args == null ? this.nullObj : args);
}, $fz.isPrivate = true, $fz), "~A,~S,~A");
Clazz.defineMethod (c$, "jsObjectGetMember", 
($fz = function (jsObject, name) {
return this.parent.viewer.getJsObjectInfo (jsObject, name, null);
}, $fz.isPrivate = true, $fz), "~A,~S");
});
