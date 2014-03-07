Clazz.declarePackage ("org.jmol.adapter.smarter");
Clazz.load (null, "org.jmol.adapter.smarter.Resolver", ["java.lang.Character", "$.Float", "java.util.StringTokenizer", "org.jmol.adapter.smarter.AtomSetCollectionReader", "org.jmol.io.LimitedLineReader", "org.jmol.util.Logger", "$.Parser"], function () {
c$ = Clazz.declareType (org.jmol.adapter.smarter, "Resolver");
c$.getReaderClassBase = Clazz.defineMethod (c$, "getReaderClassBase", 
function (type) {
var name = type + "Reader";
if (type.startsWith ("Xml")) return "org.jmol.adapter.readers." + "xml." + name;
var key = ";" + type + ";";
for (var i = 1; i < org.jmol.adapter.smarter.Resolver.readerSets.length; i += 2) if (org.jmol.adapter.smarter.Resolver.readerSets[i].indexOf (key) >= 0) return "org.jmol.adapter.readers." + org.jmol.adapter.smarter.Resolver.readerSets[i - 1] + name;

return "org.jmol.adapter.readers." + "???." + name;
}, "~S");
c$.getFileType = Clazz.defineMethod (c$, "getFileType", 
function (br) {
try {
return org.jmol.adapter.smarter.Resolver.determineAtomSetCollectionReader (br, false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "java.io.BufferedReader");
c$.getAtomCollectionReader = Clazz.defineMethod (c$, "getAtomCollectionReader", 
function (fullName, type, bufferedReader, htParams, ptFile) {
var atomSetCollectionReader = null;
var readerName;
fullName = fullName.$replace ('\\', '/');
var errMsg = null;
if (type != null) {
readerName = org.jmol.adapter.smarter.Resolver.getReaderFromType (type);
if (readerName == null) errMsg = "unrecognized file format type " + type;
 else org.jmol.util.Logger.info ("The Resolver assumes " + readerName);
} else {
readerName = org.jmol.adapter.smarter.Resolver.determineAtomSetCollectionReader (bufferedReader, true);
if (readerName.charAt (0) == '\n') {
type = htParams.get ("defaultType");
if (type != null) {
type = org.jmol.adapter.smarter.Resolver.getReaderFromType (type);
if (type != null) readerName = type;
}}if (readerName.charAt (0) == '\n') errMsg = "unrecognized file format for file " + fullName + "\n" + readerName;
 else if (readerName.equals ("spt")) errMsg = "NOTE: file recognized as a script file: " + fullName + "\n";
 else if (!fullName.equals ("ligand")) org.jmol.util.Logger.info ("The Resolver thinks " + readerName);
}if (errMsg != null) {
bufferedReader.close ();
return errMsg;
}htParams.put ("ptFile", Integer.$valueOf (ptFile));
if (ptFile <= 0) htParams.put ("readerName", readerName);
if (readerName.indexOf ("Xml") == 0) readerName = "Xml";
var className = null;
var atomSetCollectionReaderClass;
var err = null;
try {
try {
className = org.jmol.adapter.smarter.Resolver.getReaderClassBase (readerName);
atomSetCollectionReaderClass = Class.forName (className);
atomSetCollectionReader = atomSetCollectionReaderClass.newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
err = "File reader was not found:" + className;
org.jmol.util.Logger.error (err);
return err;
} else {
throw e;
}
}
return atomSetCollectionReader;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
err = "uncaught error in file loading for " + className;
org.jmol.util.Logger.error (err);
System.out.println (e.getMessage ());
return err;
} else {
throw e;
}
}
}, "~S,~S,java.io.BufferedReader,java.util.Map,~N");
c$.DOMResolve = Clazz.defineMethod (c$, "DOMResolve", 
function (DOMNode, htParams) {
var className = null;
var atomSetCollectionReaderClass;
var atomSetCollectionReader;
var atomSetCollectionReaderName = org.jmol.adapter.smarter.Resolver.getXmlType (htParams.get ("nameSpaceInfo"));
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("The Resolver thinks " + atomSetCollectionReaderName);
}htParams.put ("readerName", atomSetCollectionReaderName);
try {
className = "org.jmol.adapter.readers.xml.XmlReader";
atomSetCollectionReaderClass = Class.forName (className);
atomSetCollectionReader = atomSetCollectionReaderClass.newInstance ();
return atomSetCollectionReader;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
var err = "File reader was not found:" + className;
org.jmol.util.Logger.errorEx (err, e);
return err;
} else {
throw e;
}
}
}, "~O,java.util.Map");
c$.determineAtomSetCollectionReader = Clazz.defineMethod (c$, "determineAtomSetCollectionReader", 
($fz = function (bufferedReader, returnLines) {
var llr =  new org.jmol.io.LimitedLineReader (bufferedReader, 16384);
var leader = llr.getHeader (64).trim ();
for (var i = 0; i < org.jmol.adapter.smarter.Resolver.fileStartsWithRecords.length; ++i) {
var recordTags = org.jmol.adapter.smarter.Resolver.fileStartsWithRecords[i];
for (var j = 1; j < recordTags.length; ++j) {
var recordTag = recordTags[j];
if (leader.startsWith (recordTag)) return recordTags[0];
}
}
if (leader.indexOf ("PNG") == 1 && leader.indexOf ("PNGJ") >= 0) return "pngj";
if (leader.indexOf ("PNG") == 1 || leader.indexOf ("JPG") == 1 || leader.indexOf ("JFIF") == 6) return "spt";
if (leader.startsWith ("##TITLE")) return "Jcampdx";
var lines =  new Array (16);
var nLines = 0;
for (var i = 0; i < lines.length; ++i) {
lines[i] = llr.readLineWithNewline ();
if (lines[i].length > 0) nLines++;
}
var readerName;
if ((readerName = org.jmol.adapter.smarter.Resolver.checkSpecial (nLines, lines, false)) != null) return readerName;
if ((readerName = org.jmol.adapter.smarter.Resolver.checkLineStarts (lines)) != null) return readerName;
if ((readerName = org.jmol.adapter.smarter.Resolver.checkHeaderContains (llr.getHeader (0))) != null) return readerName;
if ((readerName = org.jmol.adapter.smarter.Resolver.checkSpecial (nLines, lines, true)) != null) return readerName;
return (returnLines ? "\n" + lines[0] + "\n" + lines[1] + "\n" + lines[2] + "\n" : null);
}, $fz.isPrivate = true, $fz), "java.io.BufferedReader,~B");
c$.checkHeaderContains = Clazz.defineMethod (c$, "checkHeaderContains", 
($fz = function (header) {
for (var i = 0; i < org.jmol.adapter.smarter.Resolver.headerContainsRecords.length; ++i) {
var recordTags = org.jmol.adapter.smarter.Resolver.headerContainsRecords[i];
for (var j = 1; j < recordTags.length; ++j) {
var recordTag = recordTags[j];
if (header.indexOf (recordTag) < 0) continue;
var type = recordTags[0];
return (!type.equals ("Xml") ? type : header.indexOf ("<!DOCTYPE HTML PUBLIC") < 0 && header.indexOf ("XHTML") < 0 && (header.indexOf ("xhtml") < 0 || header.indexOf ("<cml") >= 0) ? org.jmol.adapter.smarter.Resolver.getXmlType (header) : null);
}
}
return null;
}, $fz.isPrivate = true, $fz), "~S");
c$.checkLineStarts = Clazz.defineMethod (c$, "checkLineStarts", 
($fz = function (lines) {
for (var i = 0; i < org.jmol.adapter.smarter.Resolver.lineStartsWithRecords.length; ++i) {
var recordTags = org.jmol.adapter.smarter.Resolver.lineStartsWithRecords[i];
for (var j = 1; j < recordTags.length; ++j) {
var recordTag = recordTags[j];
for (var k = 0; k < lines.length; ++k) {
if (lines[k].startsWith (recordTag)) return recordTags[0];
}
}
}
return null;
}, $fz.isPrivate = true, $fz), "~A");
c$.getXmlType = Clazz.defineMethod (c$, "getXmlType", 
($fz = function (header) {
if (header.indexOf ("http://www.molpro.net/") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[18][0];
}if (header.indexOf ("odyssey") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[19][0];
}if (header.indexOf ("C3XML") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[17][0];
}if (header.indexOf ("arguslab") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[15][0];
}if (header.indexOf ("jvxl") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[16][0];
}if (header.indexOf ("http://www.xml-cml.org/schema") >= 0 || header.indexOf ("cml:") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[16][0];
}if (header.indexOf ("XSD") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[20][0];
}if (header.indexOf (">vasp") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[21][0];
}if (header.indexOf ("<GEOMETRY_INFO>") >= 0) {
return org.jmol.adapter.smarter.Resolver.specialTags[22][0];
}return org.jmol.adapter.smarter.Resolver.specialTags[16][0] + "(unidentified)";
}, $fz.isPrivate = true, $fz), "~S");
c$.getReaderFromType = Clazz.defineMethod (c$, "getReaderFromType", 
($fz = function (type) {
type = type.toLowerCase ();
var base = null;
if ((base = org.jmol.adapter.smarter.Resolver.checkType (org.jmol.adapter.smarter.Resolver.specialTags, type)) != null) return base;
if ((base = org.jmol.adapter.smarter.Resolver.checkType (org.jmol.adapter.smarter.Resolver.fileStartsWithRecords, type)) != null) return base;
if ((base = org.jmol.adapter.smarter.Resolver.checkType (org.jmol.adapter.smarter.Resolver.lineStartsWithRecords, type)) != null) return base;
return org.jmol.adapter.smarter.Resolver.checkType (org.jmol.adapter.smarter.Resolver.headerContainsRecords, type);
}, $fz.isPrivate = true, $fz), "~S");
c$.checkType = Clazz.defineMethod (c$, "checkType", 
($fz = function (typeTags, type) {
for (var i = 0; i < typeTags.length; ++i) if (typeTags[i][0].toLowerCase ().equals (type)) return typeTags[i][0];

return null;
}, $fz.isPrivate = true, $fz), "~A,~S");
c$.checkSpecial = Clazz.defineMethod (c$, "checkSpecial", 
($fz = function (nLines, lines, isEnd) {
if (isEnd) {
if (org.jmol.adapter.smarter.Resolver.checkGromacs (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[13][0];
if (org.jmol.adapter.smarter.Resolver.checkCrystal (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[12][0];
if (org.jmol.adapter.smarter.Resolver.checkCastep (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[10][0];
} else {
if (nLines == 1 && lines[0].length > 0 && Character.isDigit (lines[0].charAt (0))) return org.jmol.adapter.smarter.Resolver.specialTags[0][0];
if (org.jmol.adapter.smarter.Resolver.checkMopacGraphf (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[1][0];
if (org.jmol.adapter.smarter.Resolver.checkOdyssey (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[3][0];
if (org.jmol.adapter.smarter.Resolver.checkMol (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[4][0];
if (org.jmol.adapter.smarter.Resolver.checkXyz (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[5][0];
if (org.jmol.adapter.smarter.Resolver.checkAlchemy (lines[0])) return org.jmol.adapter.smarter.Resolver.specialTags[8][0];
if (org.jmol.adapter.smarter.Resolver.checkFoldingXyz (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[6][0];
if (org.jmol.adapter.smarter.Resolver.checkCube (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[7][0];
if (org.jmol.adapter.smarter.Resolver.checkWien2k (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[9][0];
if (org.jmol.adapter.smarter.Resolver.checkAims (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[11][0];
if (org.jmol.adapter.smarter.Resolver.checkGenNBO (lines)) return org.jmol.adapter.smarter.Resolver.specialTags[14][0];
}return null;
}, $fz.isPrivate = true, $fz), "~N,~A,~B");
c$.checkAims = Clazz.defineMethod (c$, "checkAims", 
($fz = function (lines) {
for (var i = 0; i < lines.length; i++) {
if (lines[i].startsWith ("mol 1")) return false;
var tokens = org.jmol.util.Parser.getTokens (lines[i]);
if (tokens.length == 0) continue;
if (tokens[0].startsWith ("atom") && tokens.length >= 5 || tokens[0].startsWith ("multipole") && tokens.length >= 6 || tokens[0].startsWith ("lattice_vector") && tokens.length >= 4) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~A");
c$.checkAlchemy = Clazz.defineMethod (c$, "checkAlchemy", 
($fz = function (line) {
var pt;
if ((pt = line.indexOf ("ATOMS")) >= 0 && line.indexOf ("BONDS") > pt) try {
var n = Integer.parseInt (line.substring (0, pt).trim ());
return (n > 0);
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
return false;
}, $fz.isPrivate = true, $fz), "~S");
c$.checkCastep = Clazz.defineMethod (c$, "checkCastep", 
($fz = function (lines) {
for (var i = 0; i < lines.length; i++) {
if (lines[i].indexOf ("Frequencies in         cm-1") == 1 || lines[i].contains ("CASTEP") || lines[i].toUpperCase ().startsWith ("%BLOCK LATTICE_ABC") || lines[i].toUpperCase ().startsWith ("%BLOCK LATTICE_CART") || lines[i].toUpperCase ().startsWith ("%BLOCK POSITIONS_FRAC") || lines[i].toUpperCase ().startsWith ("%BLOCK POSITIONS_ABS") || lines[i].contains ("<-- E")) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~A");
c$.checkCrystal = Clazz.defineMethod (c$, "checkCrystal", 
($fz = function (lines) {
var s = lines[1].trim ();
if (s.equals ("SLAB") || s.equals ("MOLECULE") || s.equals ("CRYSTAL") || s.equals ("POLYMER") || (s = lines[3]).equals ("SLAB") || s.equals ("MOLECULE") || s.equals ("POLYMER")) return true;
for (var i = 0; i < lines.length; i++) {
if (lines[i].trim ().equals ("OPTGEOM")) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~A");
c$.checkCube = Clazz.defineMethod (c$, "checkCube", 
($fz = function (lines) {
try {
var tokens2 =  new java.util.StringTokenizer (lines[2]);
if (tokens2.countTokens () != 4) return false;
Integer.parseInt (tokens2.nextToken ());
for (var i = 3; --i >= 0; )  new Float (tokens2.nextToken ());

var tokens3 =  new java.util.StringTokenizer (lines[3]);
if (tokens3.countTokens () != 4) return false;
Integer.parseInt (tokens3.nextToken ());
for (var i = 3; --i >= 0; ) if (( new Float (tokens3.nextToken ())).floatValue () < 0) return false;

return true;
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
return false;
}, $fz.isPrivate = true, $fz), "~A");
c$.checkFoldingXyz = Clazz.defineMethod (c$, "checkFoldingXyz", 
($fz = function (lines) {
var tokens =  new java.util.StringTokenizer (lines[0].trim (), " \t");
if (tokens.countTokens () < 2) return false;
try {
Integer.parseInt (tokens.nextToken ().trim ());
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
return false;
} else {
throw nfe;
}
}
var secondLine = lines[1].trim ();
if (secondLine.length == 0) secondLine = lines[2].trim ();
tokens =  new java.util.StringTokenizer (secondLine, " \t");
if (tokens.countTokens () == 0) return false;
try {
Integer.parseInt (tokens.nextToken ().trim ());
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
return false;
} else {
throw nfe;
}
}
return true;
}, $fz.isPrivate = true, $fz), "~A");
c$.checkGenNBO = Clazz.defineMethod (c$, "checkGenNBO", 
($fz = function (lines) {
return (lines[1].startsWith (" Basis set information needed for plotting orbitals") || lines[1].indexOf ("s in the AO basis:") >= 0 || lines[2].indexOf (" N A T U R A L   A T O M I C   O R B I T A L") >= 0);
}, $fz.isPrivate = true, $fz), "~A");
c$.checkGromacs = Clazz.defineMethod (c$, "checkGromacs", 
($fz = function (lines) {
if (org.jmol.util.Parser.parseInt (lines[1]) == -2147483648) return false;
var len = -1;
for (var i = 2; i < 16 && len != 0; i++) if ((len = lines[i].length) != 69 && len != 45 && len != 0) return false;

return true;
}, $fz.isPrivate = true, $fz), "~A");
c$.checkMol = Clazz.defineMethod (c$, "checkMol", 
($fz = function (lines) {
var line4trimmed = ("X" + lines[3]).trim ().toUpperCase ();
if (line4trimmed.length < 7 || line4trimmed.indexOf (".") >= 0) return false;
if (line4trimmed.endsWith ("V2000") || line4trimmed.endsWith ("V3000")) return true;
try {
var n1 = Integer.parseInt (lines[3].substring (0, 3).trim ());
var n2 = Integer.parseInt (lines[3].substring (3, 6).trim ());
return (n1 > 0 && n2 >= 0 && lines[0].indexOf ("@<TRIPOS>") != 0 && lines[1].indexOf ("@<TRIPOS>") != 0 && lines[2].indexOf ("@<TRIPOS>") != 0);
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
return false;
}, $fz.isPrivate = true, $fz), "~A");
c$.checkMopacGraphf = Clazz.defineMethod (c$, "checkMopacGraphf", 
($fz = function (lines) {
return (lines[0].indexOf ("MOPAC-Graphical data") > 2);
}, $fz.isPrivate = true, $fz), "~A");
c$.checkOdyssey = Clazz.defineMethod (c$, "checkOdyssey", 
($fz = function (lines) {
var i;
for (i = 0; i < lines.length; i++) if (!lines[i].startsWith ("C ") && lines[i].length != 0) break;

if (i >= lines.length || lines[i].charAt (0) != ' ' || (i = i + 2) + 1 >= lines.length) return false;
try {
var spin = Integer.parseInt (lines[i].substring (2).trim ());
var charge = Integer.parseInt (lines[i].substring (0, 2).trim ());
var atom1 = Integer.parseInt (lines[++i].substring (0, 2).trim ());
if (spin < 0 || spin > 5 || atom1 <= 0 || charge > 5) return false;
var atomline = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensFloat (lines[i], null, 5);
return !Float.isNaN (atomline[1]) && !Float.isNaN (atomline[2]) && !Float.isNaN (atomline[3]) && Float.isNaN (atomline[4]);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return false;
}, $fz.isPrivate = true, $fz), "~A");
c$.checkWien2k = Clazz.defineMethod (c$, "checkWien2k", 
($fz = function (lines) {
return (lines[2].startsWith ("MODE OF CALC=") || lines[2].startsWith ("             RELA") || lines[2].startsWith ("             NREL"));
}, $fz.isPrivate = true, $fz), "~A");
c$.checkXyz = Clazz.defineMethod (c$, "checkXyz", 
($fz = function (lines) {
try {
Integer.parseInt (lines[0].trim ());
return true;
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
return false;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineStatics (c$,
"classBase", "org.jmol.adapter.readers.");
c$.readerSets = c$.prototype.readerSets = ["cifpdb.", ";Cif;Pdb;", "molxyz.", ";Mol3D;Mol;Xyz;", "more.", ";BinaryDcd;Gromacs;Jcampdx;MdCrd;MdTop;Mol2;Pqr;P2n;TlsDataOnly;", "quantum.", ";Adf;Csf;Dgrid;GamessUK;GamessUS;Gaussian;GausianWfn;Jaguar;Molden;MopacGraphf;GenNBO;NWChem;Odyssey;Psi;Qchem;Spartan;SpartanSmol;WebMO;", "simple.", ";Alchemy;Ampac;Cube;FoldingXyz;GhemicalMM;HyperChem;Jme;Mopac;MopacArchive;ZMatrix;", "xtal.", ";Aims;Castep;Crystal;Dmol;Espresso;Gulp;MagRes;Shelx;Siesta;VaspOutcar;Wien2k;"];
Clazz.defineStatics (c$,
"CML_NAMESPACE_URI", "http://www.xml-cml.org/schema",
"SPECIAL_JME", 0,
"SPECIAL_MOPACGRAPHF", 1,
"SPECIAL_ODYSSEY", 3,
"SPECIAL_MOL", 4,
"SPECIAL_XYZ", 5,
"SPECIAL_FOLDINGXYZ", 6,
"SPECIAL_CUBE", 7,
"SPECIAL_ALCHEMY", 8,
"SPECIAL_WIEN", 9,
"SPECIAL_CASTEP", 10,
"SPECIAL_AIMS", 11,
"SPECIAL_CRYSTAL", 12,
"SPECIAL_GROMACS", 13,
"SPECIAL_GENNBO", 14,
"SPECIAL_ARGUS_XML", 15,
"SPECIAL_CML_XML", 16,
"SPECIAL_CHEM3D_XML", 17,
"SPECIAL_MOLPRO_XML", 18,
"SPECIAL_ODYSSEY_XML", 19,
"SPECIAL_XSD_XML", 20,
"SPECIAL_VASP_XML", 21,
"SPECIAL_QE_XML", 22,
"SPECIAL_ARGUS_DOM", 23,
"SPECIAL_CML_DOM", 24,
"SPECIAL_CHEM3D_DOM", 25,
"SPECIAL_MOLPRO_DOM", 26,
"SPECIAL_ODYSSEY_DOM", 27,
"SPECIAL_XSD_DOM", 28,
"SPECIAL_VASP_DOM", 29,
"specialTags", [["Jme"], ["MopacGraphf"], ["Mol3D"], ["Odyssey"], ["Mol"], ["Xyz"], ["FoldingXyz"], ["Cube"], ["Alchemy"], ["Wien2k"], ["Castep"], ["Aims"], ["Crystal"], ["Gromacs"], ["GenNBO"], ["XmlArgus"], ["XmlCml"], ["XmlChem3d"], ["XmlMolpro"], ["XmlOdyssey"], ["XmlXsd"], ["XmlVasp"], ["XmlQE"], ["XmlArgus(DOM)"], ["XmlCml(DOM)"], ["XmlChem3d(DOM)"], ["XmlMolpro(DOM)"], ["XmlOdyssey(DOM)"], ["XmlXsd(DOM)"], ["XmlVasp(DOM)"], ["MdCrd"]],
"LEADER_CHAR_MAX", 64,
"sptContainsRecords", ["spt", "# Jmol state", "# Jmol script"],
"cubeFileStartRecords", ["Cube", "JVXL", "#JVXL"],
"mol2Records", ["Mol2", "mol2", "@<TRIPOS>"],
"webmoFileStartRecords", ["WebMO", "[HEADER]"],
"moldenFileStartRecords", ["Molden", "[Molden"],
"dcdFileStartRecords", ["BinaryDcd", "T\0\0\0CORD", "\0\0\0TCORD"],
"tlsDataOnlyFileStartRecords", ["TlsDataOnly", "REFMAC\n\nTL", "REFMAC\r\n\r\n", "REFMAC\r\rTL"],
"zMatrixFileStartRecords", ["ZMatrix", "#ZMATRIX"],
"magResFileStartRecords", ["MagRes", "# magres"]);
c$.fileStartsWithRecords = c$.prototype.fileStartsWithRecords = [org.jmol.adapter.smarter.Resolver.sptContainsRecords, org.jmol.adapter.smarter.Resolver.cubeFileStartRecords, org.jmol.adapter.smarter.Resolver.mol2Records, org.jmol.adapter.smarter.Resolver.webmoFileStartRecords, org.jmol.adapter.smarter.Resolver.moldenFileStartRecords, org.jmol.adapter.smarter.Resolver.dcdFileStartRecords, org.jmol.adapter.smarter.Resolver.tlsDataOnlyFileStartRecords, org.jmol.adapter.smarter.Resolver.zMatrixFileStartRecords, org.jmol.adapter.smarter.Resolver.magResFileStartRecords];
Clazz.defineStatics (c$,
"pqrLineStartRecords", ["Pqr", "REMARK   1 PQR"],
"p2nLineStartRecords", ["P2n", "REMARK   1 P2N"],
"pdbLineStartRecords", ["Pdb", "HEADER", "OBSLTE", "TITLE ", "CAVEAT", "COMPND", "SOURCE", "KEYWDS", "EXPDTA", "AUTHOR", "REVDAT", "SPRSDE", "JRNL  ", "REMARK ", "DBREF ", "SEQADV", "SEQRES", "MODRES", "HELIX ", "SHEET ", "TURN  ", "CRYST1", "ORIGX1", "ORIGX2", "ORIGX3", "SCALE1", "SCALE2", "SCALE3", "ATOM  ", "HETATM", "MODEL ", "LINK  "],
"shelxLineStartRecords", ["Shelx", "TITL ", "ZERR ", "LATT ", "SYMM ", "CELL "],
"cifLineStartRecords", ["Cif", "data_", "_publ"],
"ghemicalMMLineStartRecords", ["GhemicalMM", "!Header mm1gp", "!Header gpr"],
"jaguarLineStartRecords", ["Jaguar", "  |  Jaguar version"],
"mdlLineStartRecords", ["Mol", "$MDL "],
"spartanSmolLineStartRecords", ["SpartanSmol", "INPUT="],
"csfLineStartRecords", ["Csf", "local_transform"],
"mdTopLineStartRecords", ["MdTop", "%FLAG TITLE"],
"hyperChemLineStartRecords", ["HyperChem", "mol 1"],
"vaspOutcarLineStartRecords", ["VaspOutcar", " vasp.", " INCAR:"]);
c$.lineStartsWithRecords = c$.prototype.lineStartsWithRecords = [org.jmol.adapter.smarter.Resolver.cifLineStartRecords, org.jmol.adapter.smarter.Resolver.pqrLineStartRecords, org.jmol.adapter.smarter.Resolver.p2nLineStartRecords, org.jmol.adapter.smarter.Resolver.pdbLineStartRecords, org.jmol.adapter.smarter.Resolver.shelxLineStartRecords, org.jmol.adapter.smarter.Resolver.ghemicalMMLineStartRecords, org.jmol.adapter.smarter.Resolver.jaguarLineStartRecords, org.jmol.adapter.smarter.Resolver.mdlLineStartRecords, org.jmol.adapter.smarter.Resolver.spartanSmolLineStartRecords, org.jmol.adapter.smarter.Resolver.csfLineStartRecords, org.jmol.adapter.smarter.Resolver.mol2Records, org.jmol.adapter.smarter.Resolver.mdTopLineStartRecords, org.jmol.adapter.smarter.Resolver.hyperChemLineStartRecords, org.jmol.adapter.smarter.Resolver.vaspOutcarLineStartRecords];
Clazz.defineStatics (c$,
"xmlContainsRecords", ["Xml", "<?xml", "<atom", "<molecule", "<reaction", "<cml", "<bond", ".dtd\"", "<list>", "<entry", "<identifier", "http://www.xml-cml.org/schema/cml2/core"],
"gaussianContainsRecords", ["Gaussian", "Entering Gaussian System", "Entering Link 1", "1998 Gaussian, Inc."],
"ampacContainsRecords", ["Ampac", "AMPAC Version"],
"mopacContainsRecords", ["Mopac", "MOPAC 93 (c) Fujitsu", "MOPAC FOR LINUX (PUBLIC DOMAIN VERSION)", "MOPAC:  VERSION  6", "MOPAC   7", "MOPAC2", "MOPAC (PUBLIC"],
"qchemContainsRecords", ["Qchem", "Welcome to Q-Chem", "A Quantum Leap Into The Future Of Chemistry"],
"gamessUKContainsRecords", ["GamessUK", "GAMESS-UK", "G A M E S S - U K"],
"gamessUSContainsRecords", ["GamessUS", "GAMESS"],
"spartanBinaryContainsRecords", ["SpartanSmol", "|PropertyArchive", "_spartan", "spardir", "BEGIN Directory Entry Molecule"],
"spartanContainsRecords", ["Spartan", "Spartan"],
"adfContainsRecords", ["Adf", "Amsterdam Density Functional"],
"dgridContainsRecords", ["Dgrid", "BASISFILE   created by DGrid"],
"dmolContainsRecords", ["Dmol", "DMol^3"],
"gulpContainsRecords", ["Gulp", "GENERAL UTILITY LATTICE PROGRAM"],
"psiContainsRecords", ["Psi", "    PSI  3", "PSI3:"],
"nwchemContainsRecords", ["NWChem", " argument  1 = "],
"uicrcifContainsRecords", ["Cif", "Crystallographic Information File"],
"crystalContainsRecords", ["Crystal", "*                                CRYSTAL"],
"espressoContainsRecords", ["Espresso", "Program PWSCF", "Program PHONON"],
"siestaContainsRecords", ["Siesta", "MD.TypeOfRun", "SolutionMethod", "MeshCutoff", "WELCOME TO SIESTA"],
"mopacArchiveContainsRecords", ["MopacArchive", "SUMMARY OF PM"]);
c$.headerContainsRecords = c$.prototype.headerContainsRecords = [org.jmol.adapter.smarter.Resolver.sptContainsRecords, org.jmol.adapter.smarter.Resolver.xmlContainsRecords, org.jmol.adapter.smarter.Resolver.gaussianContainsRecords, org.jmol.adapter.smarter.Resolver.ampacContainsRecords, org.jmol.adapter.smarter.Resolver.mopacContainsRecords, org.jmol.adapter.smarter.Resolver.qchemContainsRecords, org.jmol.adapter.smarter.Resolver.gamessUKContainsRecords, org.jmol.adapter.smarter.Resolver.gamessUSContainsRecords, org.jmol.adapter.smarter.Resolver.spartanBinaryContainsRecords, org.jmol.adapter.smarter.Resolver.spartanContainsRecords, org.jmol.adapter.smarter.Resolver.mol2Records, org.jmol.adapter.smarter.Resolver.adfContainsRecords, org.jmol.adapter.smarter.Resolver.psiContainsRecords, org.jmol.adapter.smarter.Resolver.nwchemContainsRecords, org.jmol.adapter.smarter.Resolver.uicrcifContainsRecords, org.jmol.adapter.smarter.Resolver.dgridContainsRecords, org.jmol.adapter.smarter.Resolver.crystalContainsRecords, org.jmol.adapter.smarter.Resolver.dmolContainsRecords, org.jmol.adapter.smarter.Resolver.gulpContainsRecords, org.jmol.adapter.smarter.Resolver.espressoContainsRecords, org.jmol.adapter.smarter.Resolver.siestaContainsRecords, org.jmol.adapter.smarter.Resolver.mopacArchiveContainsRecords];
});
