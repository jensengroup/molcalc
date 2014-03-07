Clazz.declarePackage ("org.jmol.adapter.readers.xml");
Clazz.load (["org.jmol.adapter.readers.xml.JmolXmlHandler", "org.xml.sax.helpers.DefaultHandler"], "org.jmol.adapter.readers.xml.XmlHandler", ["org.jmol.util.Logger", "org.xml.sax.InputSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xmlReader = null;
this.debugContext = "";
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.xml, "XmlHandler", org.xml.sax.helpers.DefaultHandler, org.jmol.adapter.readers.xml.JmolXmlHandler);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.adapter.readers.xml.XmlHandler, []);
});
Clazz.overrideMethod (c$, "parseXML", 
function (xmlReader, saxReaderObj, reader) {
this.xmlReader = xmlReader;
var saxReader = saxReaderObj;
saxReader.setFeature ("http://xml.org/sax/features/validation", false);
saxReader.setFeature ("http://xml.org/sax/features/namespaces", true);
saxReader.setEntityResolver (this);
saxReader.setContentHandler (this);
saxReader.setErrorHandler (this);
var is =  new org.xml.sax.InputSource (reader);
is.setSystemId ("foo");
saxReader.parse (is);
}, "org.jmol.adapter.readers.xml.XmlReader,~O,java.io.BufferedReader");
Clazz.overrideMethod (c$, "startDocument", 
function () {
});
Clazz.overrideMethod (c$, "endDocument", 
function () {
});
Clazz.overrideMethod (c$, "startElement", 
function (namespaceURI, localName, qName, attributes) {
this.xmlReader.atts.clear ();
for (var i = attributes.getLength (); --i >= 0; ) this.xmlReader.atts.put (attributes.getLocalName (i), attributes.getValue (i));

if (org.jmol.util.Logger.debugging) {
this.debugContext += " " + localName;
org.jmol.util.Logger.debug (this.debugContext);
}this.xmlReader.processStartElement (localName);
}, "~S,~S,~S,org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "endElement", 
function (uri, localName, qName) {
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("");
this.debugContext = this.debugContext.substring (0, this.debugContext.lastIndexOf (" "));
}this.xmlReader.processEndElement (localName);
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "characters", 
function (ch, start, length) {
if (this.xmlReader.keepChars) {
if (this.xmlReader.chars == null) {
this.xmlReader.chars =  String.instantialize (ch, start, length);
} else {
this.xmlReader.chars +=  String.instantialize (ch, start, length);
}}}, "~A,~N,~N");
Clazz.defineMethod (c$, "resolveEntity", 
function (name, publicId, baseURI, systemId) {
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("Not resolving this:\n      name: " + name + "\n  systemID: " + systemId + "\n  publicID: " + publicId + "\n   baseURI: " + baseURI);
}return null;
}, "~S,~S,~S,~S");
Clazz.defineMethod (c$, "resolveEntity", 
function (publicID, systemID) {
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("Jmol SAX EntityResolver not resolving:\n  publicID: " + publicID + "\n  systemID: " + systemID);
}return null;
}, "~S,~S");
Clazz.overrideMethod (c$, "error", 
function (exception) {
org.jmol.util.Logger.error ("SAX ERROR:" + exception.getMessage ());
}, "org.xml.sax.SAXParseException");
Clazz.overrideMethod (c$, "fatalError", 
function (exception) {
org.jmol.util.Logger.error ("SAX FATAL:" + exception.getMessage ());
}, "org.xml.sax.SAXParseException");
Clazz.overrideMethod (c$, "warning", 
function (exception) {
org.jmol.util.Logger.warn ("SAX WARNING:" + exception.getMessage ());
}, "org.xml.sax.SAXParseException");
});
