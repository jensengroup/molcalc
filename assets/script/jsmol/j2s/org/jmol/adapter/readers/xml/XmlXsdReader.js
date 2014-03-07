Clazz.declarePackage ("org.jmol.adapter.readers.xml");
Clazz.load (["org.jmol.adapter.readers.xml.XmlReader", "org.jmol.util.BitSet"], "org.jmol.adapter.readers.xml.XmlXsdReader", ["java.lang.Float", "org.jmol.adapter.smarter.Atom", "org.jmol.util.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsBackbone = null;
this.iChain = -1;
this.iGroup = 0;
this.iAtom = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.xml, "XmlXsdReader", org.jmol.adapter.readers.xml.XmlReader);
Clazz.prepareFields (c$, function () {
this.bsBackbone =  new org.jmol.util.BitSet ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.adapter.readers.xml.XmlXsdReader, []);
});
Clazz.defineMethod (c$, "getDOMAttributes", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
return ["ID", "XYZ", "Connections", "Components", "IsBackboneAtom", "Connects", "Type", "Name"];
});
Clazz.defineMethod (c$, "processXml", 
function (parent, saxReader) {
parent.htParams.put ("backboneAtoms", this.bsBackbone);
Clazz.superCall (this, org.jmol.adapter.readers.xml.XmlXsdReader, "processXml", [parent, saxReader]);
this.atomSetCollection.clearSymbolicMap ();
}, "org.jmol.adapter.readers.xml.XmlReader,~O");
Clazz.overrideMethod (c$, "processStartElement", 
function (localName) {
var tokens;
if ("Molecule".equalsIgnoreCase (localName)) {
this.atomSetCollection.newAtomSet ();
this.atomSetCollection.setAtomSetName (this.atts.get ("Name"));
return;
}if ("LinearChain".equalsIgnoreCase (localName)) {
this.iGroup = 0;
this.iChain++;
}if ("RepeatUnit".equalsIgnoreCase (localName)) {
this.iGroup++;
}if ("Atom3d".equalsIgnoreCase (localName)) {
this.atom =  new org.jmol.adapter.smarter.Atom ();
this.atom.elementSymbol = this.atts.get ("Components");
this.atom.atomName = this.atts.get ("ID");
this.atom.atomSerial = ++this.iAtom;
if (this.iChain >= 0) this.atom.chainID = String.fromCharCode ((this.iChain - 1) % 26 + 65);
this.atom.group3 = "UNK";
if (this.iGroup == 0) this.iGroup = 1;
this.atom.sequenceNumber = this.iGroup;
var xyz = this.atts.get ("XYZ");
if (xyz != null) {
tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (xyz.$replace (',', ' '));
this.atom.set (this.parseFloatStr (tokens[0]), this.parseFloatStr (tokens[1]), this.parseFloatStr (tokens[2]));
}var isBackbone = "1".equals (this.atts.get ("IsBackboneAtom"));
if (isBackbone) this.bsBackbone.set (this.iAtom);
return;
}if ("Bond".equalsIgnoreCase (localName)) {
var atoms = org.jmol.util.TextFormat.split (this.atts.get ("Connects"), ',');
var order = 1;
if (this.atts.containsKey ("Type")) {
var type = this.atts.get ("Type");
if (type.equals ("Double")) order = 2;
 else if (type.equals ("Triple")) order = 3;
}this.atomSetCollection.addNewBondFromNames (atoms[0], atoms[1], order);
return;
}}, "~S");
Clazz.overrideMethod (c$, "processEndElement", 
function (localName) {
if ("Atom3d".equalsIgnoreCase (localName)) {
if (this.atom.elementSymbol != null && !Float.isNaN (this.atom.z)) {
this.parent.setAtomCoord (this.atom);
this.atomSetCollection.addAtomWithMappedName (this.atom);
}this.atom = null;
return;
}this.keepChars = false;
this.chars = null;
}, "~S");
});
