// 
//// org\jmol\adapter\readers\cifpdb\PdbReader.js 
// 
Clazz.declarePackage ("org.jmol.adapter.readers.cifpdb");
Clazz.load (["org.jmol.adapter.smarter.AtomSetCollectionReader", "java.util.Hashtable"], "org.jmol.adapter.readers.cifpdb.PdbReader", ["java.lang.Boolean", "$.Float", "java.util.ArrayList", "org.jmol.adapter.smarter.Atom", "$.Structure", "org.jmol.api.Interface", "$.JmolAdapter", "org.jmol.constant.EnumStructure", "org.jmol.util.Escape", "$.Logger", "$.Matrix4f", "$.Parser", "$.Point3f", "$.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lineLength = 0;
this.pdbHeader = null;
this.applySymmetry = false;
this.getTlsGroups = false;
this.isMultiModel = false;
this.haveMappedSerials = false;
this.isConnectStateBug = false;
this.isLegacyModelType = false;
this.gromacsWideFormat = false;
this.isPQR = false;
this.htFormul = null;
this.htHetero = null;
this.htSites = null;
this.htElementsInCurrentGroup = null;
this.htMolIds = null;
this.vCompnds = null;
this.vBiomts = null;
this.vBiomolecules = null;
this.vTlsModels = null;
this.sbTlsErrors = null;
this.chainAtomCounts = null;
this.sbIgnored = null;
this.sbSelected = null;
this.sbConect = null;
this.sb = null;
this.atomCount = 0;
this.maxSerial = 0;
this.nUNK = 0;
this.nRes = 0;
this.currentCompnd = null;
this.currentGroup3 = null;
this.currentKey = null;
this.currentResno = -2147483648;
this.configurationPtr = -2147483648;
this.resetKey = true;
this.$compnd = null;
this.conformationIndex = 0;
this.fileAtomIndex = 0;
this.lastAltLoc = '\0';
this.lastAtomData = null;
this.lastAtomIndex = 0;
this.lastGroup = -2147483648;
this.lastInsertion = '\0';
this.lastSourceSerial = -2147483648;
this.lastTargetSerial = -2147483648;
this.tlsGroupID = 0;
this.atomTypePt0 = 0;
this.atomTypeLen = 0;
this.isHexSerial = false;
this.isHexSeq = false;
this.serial = 0;
this.currentChainID = '\0';
this.haveDoubleBonds = false;
this.dataT = null;
this.tlsU = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.readers.cifpdb, "PdbReader", org.jmol.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.htFormul =  new java.util.Hashtable ();
this.dataT =  Clazz.newFloatArray (8, 0);
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.setIsPDB ();
this.pdbHeader = (this.getHeader ?  new org.jmol.util.StringXBuilder () : null);
this.applySymmetry = !this.checkFilterKey ("NOSYMMETRY");
this.getTlsGroups = this.checkFilterKey ("TLS");
if (this.htParams.containsKey ("vTlsModels")) {
this.vTlsModels = this.htParams.remove ("vTlsModels");
}if (this.checkFilterKey ("TYPE ")) {
var s = this.filter.substring (this.filter.indexOf ("TYPE ") + 5).$replace (',', ' ').$replace (';', ' ');
var tokens = org.jmol.util.Parser.getTokens (s);
this.atomTypePt0 = Integer.parseInt (tokens[0]) - 1;
var pt = tokens[1].indexOf ("=");
if (pt >= 0) {
this.filterAtomTypeStr = tokens[1].substring (pt + 1).toUpperCase ();
} else {
pt = tokens[1].length;
}this.atomTypeLen = Integer.parseInt (tokens[1].substring (0, pt));
}if (this.checkFilterKey ("CONF ")) {
this.configurationPtr = this.parseIntAt (this.filter, this.filter.indexOf ("CONF ") + 5);
this.sbIgnored =  new org.jmol.util.StringXBuilder ();
this.sbSelected =  new org.jmol.util.StringXBuilder ();
}this.isLegacyModelType = (this.stateScriptVersionInt < 120000);
this.isConnectStateBug = (this.stateScriptVersionInt >= 120151 && this.stateScriptVersionInt <= 120220 || this.stateScriptVersionInt >= 120300 && this.stateScriptVersionInt <= 120320);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
var ptOption = ((this.lineLength = this.line.length) < 6 ? -1 : "ATOM    HETATM  MODEL   CONECT  HELIX   SHEET   TURN    HET     HETNAM  ANISOU  SITE    CRYST1  SCALE1  SCALE2  SCALE3  EXPDTA  FORMUL  REMARK  HEADER  COMPND  SOURCE  TITLE   ".indexOf (this.line.substring (0, 6))) >> 3;
var isAtom = (ptOption == 0 || ptOption == 1);
var isModel = (ptOption == 2);
this.serial = (isAtom ? this.getSerial () : 0);
var isNewModel = ((this.isTrajectory || this.isSequential) && !this.isMultiModel && isAtom && this.serial == 1);
if (this.getHeader) {
if (isAtom || isModel) this.getHeader = false;
 else this.pdbHeader.append (this.line).appendC ('\n');
}if (isModel || isNewModel) {
this.isMultiModel = isModel;
this.getHeader = false;
var modelNo = (isNewModel ? this.modelNumber + 1 : this.getModelNumber ());
this.modelNumber = (this.bsModels == null ? modelNo : this.modelNumber + 1);
if (!this.doGetModel (this.modelNumber, null)) {
this.handleTlsMissingModels ();
return this.checkLastModel ();
}this.atomSetCollection.connectAll (this.maxSerial, this.isConnectStateBug);
if (this.atomCount > 0) this.applySymmetryAndSetTrajectory ();
this.model (modelNo);
if (this.isLegacyModelType || !isAtom) return true;
}if (this.isMultiModel && !this.doProcessLines) return true;
if (isAtom) {
this.getHeader = false;
this.atom ();
return true;
}switch (ptOption) {
case 3:
this.conect ();
return true;
case 4:
case 5:
case 6:
this.structure ();
return true;
case 7:
this.het ();
return true;
case 8:
this.hetnam ();
return true;
case 9:
this.anisou ();
return true;
case 10:
this.site ();
return true;
case 11:
this.cryst1 ();
return true;
case 12:
case 13:
case 14:
this.scale (ptOption - 11);
return true;
case 15:
this.expdta ();
return true;
case 16:
this.formul ();
return true;
case 17:
if (this.line.contains ("The B-factors in this file hold atomic radii")) {
this.isPQR = true;
return true;
}if (this.line.contains ("This file does not adhere to the PDB standard")) {
this.gromacsWideFormat = true;
return true;
}if (this.line.startsWith ("REMARK 350")) {
this.remark350 ();
return false;
}if (this.line.startsWith ("REMARK 290")) {
this.remark290 ();
return false;
}if (this.getTlsGroups) {
if (this.line.indexOf ("TLS DETAILS") > 0) return this.remarkTls ();
}this.checkCurrentLineForScript ();
return true;
case 18:
this.header ();
return true;
case 19:
case 20:
this.compnd (ptOption == 20);
return true;
case 21:
this.title ();
return true;
}
return true;
});
Clazz.defineMethod (c$, "finalizeReader", 
function () {
this.checkNotPDB ();
this.atomSetCollection.connectAll (this.maxSerial, this.isConnectStateBug);
if (this.vBiomolecules != null && this.vBiomolecules.size () > 0 && this.atomSetCollection.getAtomCount () > 0) {
this.atomSetCollection.setAtomSetAuxiliaryInfo ("biomolecules", this.vBiomolecules);
this.setBiomoleculeAtomCounts ();
if (this.vBiomts != null && this.applySymmetry) {
this.atomSetCollection.applySymmetry (this.vBiomts, this.notionalUnitCell, this.applySymmetryToBonds, this.filter);
this.vTlsModels = null;
}}if (this.vTlsModels != null) {
var symmetry = org.jmol.api.Interface.getOptionInterface ("symmetry.Symmetry");
var n = this.atomSetCollection.getAtomSetCount ();
if (n == this.vTlsModels.size ()) {
for (var i = n; --i >= 0; ) this.setTlsGroups (i, i, symmetry);

} else {
org.jmol.util.Logger.info (n + " models but " + this.vTlsModels.size () + " TLS descriptions");
if (this.vTlsModels.size () == 1) {
org.jmol.util.Logger.info (" -- assuming all models have the same TLS description -- check REMARK 3 for details.");
for (var i = n; --i >= 0; ) this.setTlsGroups (0, i, symmetry);

}}this.checkForResidualBFactors (symmetry);
}if (this.sbTlsErrors != null) {
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("tlsErrors", this.sbTlsErrors.toString ());
this.appendLoadNote (this.sbTlsErrors.toString ());
}Clazz.superCall (this, org.jmol.adapter.readers.cifpdb.PdbReader, "finalizeReader", []);
if (this.vCompnds != null) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("compoundSource", this.vCompnds);
if (this.htSites != null) {
this.addSites (this.htSites);
}if (this.pdbHeader != null) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("fileHeader", this.pdbHeader.toString ());
if (this.configurationPtr > 0) {
org.jmol.util.Logger.info (this.sbSelected.toString ());
org.jmol.util.Logger.info (this.sbIgnored.toString ());
}});
Clazz.defineMethod (c$, "checkForResidualBFactors", 
($fz = function (symmetry) {
var atoms = this.atomSetCollection.getAtoms ();
var isResidual = false;
for (var i = this.atomSetCollection.getAtomCount (); --i >= 0; ) {
var anisou = this.tlsU.get (atoms[i]);
if (anisou == null) continue;
var resid = anisou[7] - (anisou[0] + anisou[1] + anisou[2]) / 3;
if (resid < 0 || Float.isNaN (resid)) {
isResidual = true;
break;
}}
org.jmol.util.Logger.info ("TLS analysis suggests Bfactors are " + (isResidual ? "" : "NOT") + " residuals");
for (var entry, $entry = this.tlsU.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var anisou = entry.getValue ();
var resid = anisou[7];
if (resid == 0) continue;
if (!isResidual) resid -= (anisou[0] + anisou[1] + anisou[2]) / 3;
anisou[0] += resid;
anisou[1] += resid;
anisou[2] += resid;
entry.getKey ().ellipsoid[1] = symmetry.getEllipsoid (anisou);
System.out.println ("TLS-U:  " + org.jmol.util.Escape.escape (anisou));
anisou = (entry.getKey ().anisoBorU);
if (anisou != null) System.out.println ("ANISOU: " + org.jmol.util.Escape.escape (anisou));
}
this.tlsU = null;
}, $fz.isPrivate = true, $fz), "org.jmol.api.SymmetryInterface");
Clazz.defineMethod (c$, "header", 
($fz = function () {
if (this.lineLength < 8) return;
this.appendLoadNote (this.line.substring (7).trim ());
if (this.lineLength >= 66) this.atomSetCollection.setCollectionName (this.line.substring (62, 66));
if (this.lineLength > 50) this.line = this.line.substring (0, 50);
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("CLASSIFICATION", this.line.substring (7).trim ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "title", 
($fz = function () {
if (this.lineLength < 10) return;
this.appendLoadNote (this.line.substring (10).trim ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "compnd", 
($fz = function (isSource) {
if (!isSource) {
if (this.$compnd == null) this.$compnd = "";
 else this.$compnd += " ";
var s = this.line;
if (this.lineLength > 62) s = s.substring (0, 62);
this.$compnd += s.substring (10).trim ();
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("COMPND", this.$compnd);
}if (this.vCompnds == null) {
if (isSource) return;
this.vCompnds =  new java.util.ArrayList ();
this.htMolIds =  new java.util.Hashtable ();
this.currentCompnd =  new java.util.Hashtable ();
this.currentCompnd.put ("select", "(*)");
this.currentKey = "MOLECULE";
this.htMolIds.put ("", this.currentCompnd);
}if (isSource && this.resetKey) {
this.resetKey = false;
this.currentKey = "SOURCE";
this.currentCompnd = this.htMolIds.get ("");
}this.line = this.line.substring (10, Math.min (this.lineLength, 72)).trim ();
var pt = this.line.indexOf (":");
if (pt < 0 || pt > 0 && this.line.charAt (pt - 1) == '\\') pt = this.line.length;
var key = this.line.substring (0, pt).trim ();
var value = (pt < this.line.length ? this.line.substring (pt + 1) : null);
if (key.equals ("MOL_ID")) {
if (value == null) return;
if (isSource) {
this.currentCompnd = this.htMolIds.remove (value);
return;
}this.currentCompnd =  new java.util.Hashtable ();
this.vCompnds.add (this.currentCompnd);
this.htMolIds.put (value, this.currentCompnd);
}if (this.currentCompnd == null) return;
if (value == null) {
value = this.currentCompnd.get (this.currentKey);
if (value == null) value = "";
value += key;
if (this.vCompnds.size () == 0) this.vCompnds.add (this.currentCompnd);
} else {
this.currentKey = key;
}if (value.endsWith (";")) value = value.substring (0, value.length - 1);
this.currentCompnd.put (this.currentKey, value);
if (this.currentKey.equals ("CHAIN")) this.currentCompnd.put ("select", "(:" + org.jmol.util.TextFormat.simpleReplace (org.jmol.util.TextFormat.simpleReplace (value, ", ", ",:"), " ", "") + ")");
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "setBiomoleculeAtomCounts", 
($fz = function () {
for (var i = this.vBiomolecules.size (); --i >= 0; ) {
var biomolecule = this.vBiomolecules.get (i);
var chain = biomolecule.get ("chains");
var nTransforms = (biomolecule.get ("biomts")).size ();
var nAtoms = 0;
for (var j = chain.length - 1; --j >= 0; ) if (chain.charAt (j) == ':') nAtoms += this.chainAtomCounts[chain.charCodeAt (j + 1)];

biomolecule.put ("atomCount", Integer.$valueOf (nAtoms * nTransforms));
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "remark350", 
($fz = function () {
var biomts = null;
this.vBiomolecules =  new java.util.ArrayList ();
this.chainAtomCounts =  Clazz.newIntArray (255, 0);
var title = "";
var chainlist = "";
var iMolecule = 0;
var needLine = true;
var info = null;
var nBiomt = 0;
var mIdent =  new org.jmol.util.Matrix4f ();
mIdent.setIdentity ();
while (true) {
if (needLine) this.readLine ();
 else needLine = true;
if (this.line == null || !this.line.startsWith ("REMARK 350")) break;
try {
if (this.line.startsWith ("REMARK 350 BIOMOLECULE:")) {
if (nBiomt > 0) org.jmol.util.Logger.info ("biomolecule " + iMolecule + ": number of transforms: " + nBiomt);
info =  new java.util.Hashtable ();
biomts =  new java.util.ArrayList ();
iMolecule = this.parseIntStr (this.line.substring (this.line.indexOf (":") + 1));
title = this.line.trim ();
info.put ("molecule", Integer.$valueOf (iMolecule));
info.put ("title", title);
info.put ("chains", "");
info.put ("biomts", biomts);
this.vBiomolecules.add (info);
nBiomt = 0;
}if (this.line.indexOf ("APPLY THE FOLLOWING TO CHAINS:") >= 0) {
if (info == null) {
needLine = false;
this.line = "REMARK 350 BIOMOLECULE: 1  APPLY THE FOLLOWING TO CHAINS:";
continue;
}chainlist = ":" + this.line.substring (41).trim ().$replace (' ', ':');
needLine = false;
while (this.readLine () != null && this.line.indexOf ("BIOMT") < 0 && this.line.indexOf ("350") == 7) chainlist += ":" + this.line.substring (11).trim ().$replace (' ', ':');

if (this.checkFilterKey ("BIOMOLECULE " + iMolecule + ";")) {
this.setFilter (this.filter.$replace (':', '_') + chainlist);
org.jmol.util.Logger.info ("filter set to \"" + this.filter + "\"");
this.vBiomts = biomts;
}info.put ("chains", chainlist);
continue;
}if (this.line.startsWith ("REMARK 350   BIOMT1 ")) {
nBiomt++;
var mat =  Clazz.newFloatArray (16, 0);
for (var i = 0; i < 12; ) {
var tokens = this.getTokens ();
mat[i++] = this.parseFloatStr (tokens[4]);
mat[i++] = this.parseFloatStr (tokens[5]);
mat[i++] = this.parseFloatStr (tokens[6]);
mat[i++] = this.parseFloatStr (tokens[7]);
if (i == 4 || i == 8) this.readLine ();
}
mat[15] = 1;
var m4 =  new org.jmol.util.Matrix4f ();
m4.setA (mat);
if (m4.equals (mIdent)) biomts.add (0, m4);
 else biomts.add (m4);
continue;
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.vBiomts = null;
this.vBiomolecules = null;
return;
} else {
throw e;
}
}
}
if (nBiomt > 0) org.jmol.util.Logger.info ("biomolecule " + iMolecule + ": number of transforms: " + nBiomt);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "remark290", 
($fz = function () {
while (this.readLine () != null && this.line.startsWith ("REMARK 290")) {
if (this.line.indexOf ("NNNMMM   OPERATOR") >= 0) {
while (this.readLine () != null) {
var tokens = this.getTokens ();
if (tokens.length < 4) break;
this.setSymmetryOperator (tokens[3]);
}
}}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSerial", 
($fz = function () {
if (this.isHexSerial) return this.serial = Integer.parseInt (this.line.substring (6, 11), 16);
this.serial = this.parseIntRange (this.line, 6, 11);
if (this.serial == 99999) this.isHexSerial = true;
return this.serial;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSeqNo", 
($fz = function () {
if (this.isHexSeq) return Integer.parseInt (this.line.substring (22, 26), 16);
var n = this.parseIntRange (this.line, 22, 26);
if (n == 9999) this.isHexSeq = true;
return n;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "atom", 
($fz = function () {
var atom =  new org.jmol.adapter.smarter.Atom ();
atom.atomName = this.line.substring (12, 16).trim ();
var ch = this.line.charAt (16);
if (ch != ' ') atom.alternateLocationID = ch;
atom.group3 = this.parseTokenRange (this.line, 17, 20);
ch = this.line.charAt (21);
if (this.chainAtomCounts != null) this.chainAtomCounts[ch.charCodeAt (0)]++;
atom.chainID = ch;
atom.sequenceNumber = this.getSeqNo ();
if (this.isHexSeq && ch != this.currentChainID) {
this.currentChainID = ch;
if (atom.sequenceNumber < 9999) this.isHexSeq = false;
}atom.insertionCode = org.jmol.api.JmolAdapter.canonizeInsertionCode (this.line.charAt (26));
atom.isHetero = this.line.startsWith ("HETATM");
atom.elementSymbol = this.deduceElementSymbol (atom.isHetero);
if (this.atomTypeLen > 0) {
var s = this.line.substring (this.atomTypePt0, this.atomTypePt0 + this.atomTypeLen).trim ();
if (s.length > 0) atom.atomName += "\0" + s;
}if (!this.filterPDBAtom (atom, this.fileAtomIndex++)) return;
atom.atomSerial = this.serial;
if (this.serial > this.maxSerial) this.maxSerial = this.serial;
if (atom.group3 == null) {
if (this.currentGroup3 != null) {
this.currentGroup3 = null;
this.currentResno = -2147483648;
this.htElementsInCurrentGroup = null;
}} else if (!atom.group3.equals (this.currentGroup3) || atom.sequenceNumber != this.currentResno) {
this.currentGroup3 = atom.group3;
this.currentResno = atom.sequenceNumber;
this.htElementsInCurrentGroup = this.htFormul.get (atom.group3);
this.nRes++;
if (atom.group3.equals ("UNK")) this.nUNK++;
}if (this.gromacsWideFormat) {
this.setAtomCoordXYZ (atom, this.parseFloatRange (this.line, 30, 40), this.parseFloatRange (this.line, 40, 50), this.parseFloatRange (this.line, 50, 60));
} else {
var charge = 0;
if (this.lineLength >= 80) {
var chMagnitude = this.line.charAt (78);
var chSign = this.line.charAt (79);
if (chSign >= '0' && chSign <= '7') {
var chT = chSign;
chSign = chMagnitude;
chMagnitude = chT;
}if ((chSign == '+' || chSign == '-' || chSign == ' ') && chMagnitude >= '0' && chMagnitude <= '7') {
charge = chMagnitude.charCodeAt (0) - 48;
if (chSign == '-') charge = -charge;
}}atom.formalCharge = charge;
this.setAtomCoordXYZ (atom, this.parseFloatRange (this.line, 30, 38), this.parseFloatRange (this.line, 38, 46), this.parseFloatRange (this.line, 46, 54));
}this.setAdditionalAtomParameters (atom);
if (this.haveMappedSerials) this.atomSetCollection.addAtomWithMappedSerialNumber (atom);
 else this.atomSetCollection.addAtom (atom);
if (this.atomCount++ == 0) this.atomSetCollection.setAtomSetAuxiliaryInfo ("isPDB", Boolean.TRUE);
if (atom.isHetero) {
if (this.htHetero != null) {
this.atomSetCollection.setAtomSetAuxiliaryInfo ("hetNames", this.htHetero);
this.htHetero = null;
}}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "filterPDBAtom", 
function (atom, iAtom) {
if (!this.filterAtom (atom, iAtom)) return false;
if (this.configurationPtr > 0) {
if (atom.sequenceNumber != this.lastGroup || atom.insertionCode != this.lastInsertion) {
this.conformationIndex = this.configurationPtr - 1;
this.lastGroup = atom.sequenceNumber;
this.lastInsertion = atom.insertionCode;
this.lastAltLoc = '\0';
}if (atom.alternateLocationID != '\0') {
var msg = " atom [" + atom.group3 + "]" + atom.sequenceNumber + (atom.insertionCode == '\0' ? "" : "^" + atom.insertionCode) + (atom.chainID == '\0' ? "" : ":" + atom.chainID) + "." + atom.atomName + "%" + atom.alternateLocationID + "\n";
if (this.conformationIndex >= 0 && atom.alternateLocationID != this.lastAltLoc) {
this.lastAltLoc = atom.alternateLocationID;
this.conformationIndex--;
}if (this.conformationIndex < 0 && atom.alternateLocationID != this.lastAltLoc) {
this.sbIgnored.append ("ignoring").append (msg);
return false;
}this.sbSelected.append ("loading").append (msg);
}}return true;
}, "org.jmol.adapter.smarter.Atom,~N");
Clazz.defineMethod (c$, "setAdditionalAtomParameters", 
function (atom) {
if (this.isPQR) {
if (this.gromacsWideFormat) {
atom.partialCharge = this.parseFloatRange (this.line, 60, 68);
atom.radius = org.jmol.adapter.readers.cifpdb.PdbReader.fixRadius (this.parseFloatRange (this.line, 68, 76));
} else {
var tokens = this.getTokens ();
var pt = tokens.length - 2 - (this.line.length > 75 ? 1 : 0);
atom.partialCharge = this.parseFloatStr (tokens[pt++]);
atom.radius = org.jmol.adapter.readers.cifpdb.PdbReader.fixRadius (this.parseFloatStr (tokens[pt]));
}return;
}var floatOccupancy;
if (this.gromacsWideFormat) {
floatOccupancy = this.parseFloatRange (this.line, 60, 68);
atom.bfactor = org.jmol.adapter.readers.cifpdb.PdbReader.fixRadius (this.parseFloatRange (this.line, 68, 76));
} else {
floatOccupancy = this.parseFloatRange (this.line, 54, 60);
atom.bfactor = this.parseFloatRange (this.line, 60, 66);
}atom.occupancy = (Float.isNaN (floatOccupancy) ? 100 : Clazz.floatToInt (floatOccupancy * 100));
}, "org.jmol.adapter.smarter.Atom");
Clazz.defineMethod (c$, "deduceElementSymbol", 
function (isHetero) {
if (this.lineLength >= 78) {
var ch76 = this.line.charAt (76);
var ch77 = this.line.charAt (77);
if (ch76 == ' ' && org.jmol.adapter.smarter.Atom.isValidElementSymbol (ch77)) return "" + ch77;
if (org.jmol.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (ch76, ch77)) return "" + ch76 + ch77;
}var ch12 = this.line.charAt (12);
var ch13 = this.line.charAt (13);
if ((this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get (this.line.substring (12, 14)) != null) && org.jmol.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (ch12, ch13)) return (isHetero || ch12 != 'H' ? "" + ch12 + ch13 : "H");
if (ch12 == 'H') return "H";
if ((this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get ("" + ch13) != null) && org.jmol.adapter.smarter.Atom.isValidElementSymbol (ch13)) return "" + ch13;
if (ch12 != ' ' && (this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get ("" + ch12) != null) && org.jmol.adapter.smarter.Atom.isValidElementSymbol (ch12)) return "" + ch12;
var ch14 = this.line.charAt (14);
if (ch12 == ' ' && ch13 != 'X' && (this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get (this.line.substring (13, 15)) != null) && org.jmol.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (ch13, ch14)) return "" + ch13 + ch14;
return "Xx";
}, "~B");
Clazz.defineMethod (c$, "conect", 
($fz = function () {
if (this.sbConect == null) {
this.sbConect =  new org.jmol.util.StringXBuilder ();
this.sb =  new org.jmol.util.StringXBuilder ();
} else {
this.sb.setLength (0);
}var sourceSerial = -1;
sourceSerial = this.parseIntRange (this.line, 6, 11);
if (sourceSerial < 0) return;
for (var i = 0; i < 9; i += (i == 5 ? 2 : 1)) {
var offset = i * 5 + 11;
var offsetEnd = offset + 5;
var targetSerial = (offsetEnd <= this.lineLength ? this.parseIntRange (this.line, offset, offsetEnd) : -1);
if (targetSerial < 0) continue;
var isDoubleBond = (sourceSerial == this.lastSourceSerial && targetSerial == this.lastTargetSerial);
if (isDoubleBond) this.haveDoubleBonds = true;
this.lastSourceSerial = sourceSerial;
this.lastTargetSerial = targetSerial;
var isSwapped = (targetSerial < sourceSerial);
var i1;
if (isSwapped) {
i1 = targetSerial;
targetSerial = sourceSerial;
} else {
i1 = sourceSerial;
}var st = ";" + i1 + " " + targetSerial + ";";
if (this.sbConect.indexOf (st) >= 0 && !isDoubleBond) continue;
if (this.haveDoubleBonds) {
var st1 = "--" + st;
if (this.sbConect.indexOf (st1) >= 0) continue;
this.sbConect.append (st);
this.sb.append (st1);
} else {
this.sbConect.append (st);
}this.atomSetCollection.addConnection ([i1, targetSerial, i < 4 ? 1 : 2048]);
}
this.sbConect.appendSB (this.sb);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "structure", 
($fz = function () {
var structureType = org.jmol.constant.EnumStructure.NONE;
var substructureType = org.jmol.constant.EnumStructure.NONE;
var startChainIDIndex;
var startIndex;
var endChainIDIndex;
var endIndex;
var strandCount = 0;
if (this.line.startsWith ("HELIX ")) {
structureType = org.jmol.constant.EnumStructure.HELIX;
startChainIDIndex = 19;
startIndex = 21;
endChainIDIndex = 31;
endIndex = 33;
if (this.line.length >= 40) substructureType = org.jmol.adapter.smarter.Structure.getHelixType (this.parseIntRange (this.line, 38, 40));
} else if (this.line.startsWith ("SHEET ")) {
structureType = org.jmol.constant.EnumStructure.SHEET;
startChainIDIndex = 21;
startIndex = 22;
endChainIDIndex = 32;
endIndex = 33;
strandCount = this.parseIntRange (this.line, 14, 16);
} else if (this.line.startsWith ("TURN  ")) {
structureType = org.jmol.constant.EnumStructure.TURN;
startChainIDIndex = 19;
startIndex = 20;
endChainIDIndex = 30;
endIndex = 31;
} else return;
if (this.lineLength < endIndex + 4) return;
var structureID = this.line.substring (11, 15).trim ();
var serialID = this.parseIntRange (this.line, 7, 10);
var startChainID = this.line.charAt (startChainIDIndex);
var startSequenceNumber = this.parseIntRange (this.line, startIndex, startIndex + 4);
var startInsertionCode = this.line.charAt (startIndex + 4);
var endChainID = this.line.charAt (endChainIDIndex);
var endSequenceNumber = this.parseIntRange (this.line, endIndex, endIndex + 4);
var endInsertionCode = ' ';
if (this.lineLength > endIndex + 4) endInsertionCode = this.line.charAt (endIndex + 4);
if (substructureType === org.jmol.constant.EnumStructure.NONE) substructureType = structureType;
var structure =  new org.jmol.adapter.smarter.Structure (-1, structureType, substructureType, structureID, serialID, strandCount, startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode);
this.atomSetCollection.addStructure (structure);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getModelNumber", 
($fz = function () {
var startModelColumn = 6;
var endModelColumn = 14;
if (endModelColumn > this.lineLength) endModelColumn = this.lineLength;
var iModel = this.parseIntRange (this.line, startModelColumn, endModelColumn);
return (iModel == -2147483648 ? 0 : iModel);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "model", 
($fz = function (modelNumber) {
this.checkNotPDB ();
this.isHexSerial = this.isHexSeq = false;
this.haveMappedSerials = false;
this.sbConect = null;
this.atomSetCollection.newAtomSet ();
this.atomSetCollection.setAtomSetAuxiliaryInfo ("isPDB", Boolean.TRUE);
this.atomSetCollection.setCurrentAtomSetNumber (modelNumber);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "checkNotPDB", 
($fz = function () {
var isPDB = (this.nRes == 0 || this.nUNK != this.nRes);
this.atomSetCollection.setCheckSpecial (!isPDB);
this.atomSetCollection.setAtomSetAuxiliaryInfo ("isPDB", isPDB ? Boolean.TRUE : Boolean.FALSE);
this.nUNK = this.nRes = 0;
this.currentGroup3 = null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "cryst1", 
($fz = function () {
var a = this.getFloat (6, 9);
if (a == 1) a = NaN;
this.setUnitCell (a, this.getFloat (15, 9), this.getFloat (24, 9), this.getFloat (33, 7), this.getFloat (40, 7), this.getFloat (47, 7));
this.setSpaceGroupName (org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 55, 66));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getFloat", 
($fz = function (ich, cch) {
return this.parseFloatRange (this.line, ich, ich + cch);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "scale", 
($fz = function (n) {
var pt = n * 4 + 2;
this.setUnitCellItem (pt++, this.getFloat (10, 10));
this.setUnitCellItem (pt++, this.getFloat (20, 10));
this.setUnitCellItem (pt++, this.getFloat (30, 10));
this.setUnitCellItem (pt++, this.getFloat (45, 10));
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "expdta", 
($fz = function () {
if (this.line.toUpperCase ().indexOf ("NMR") >= 0) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("isNMRdata", "true");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "formul", 
($fz = function () {
var groupName = this.parseTokenRange (this.line, 12, 15);
var formula = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 19, 70);
var ichLeftParen = formula.indexOf ('(');
if (ichLeftParen >= 0) {
var ichRightParen = formula.indexOf (')');
if (ichRightParen < 0 || ichLeftParen >= ichRightParen || ichLeftParen + 1 == ichRightParen) return;
formula = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (formula, ichLeftParen + 1, ichRightParen);
}var htElementsInGroup = this.htFormul.get (groupName);
if (htElementsInGroup == null) this.htFormul.put (groupName, htElementsInGroup =  new java.util.Hashtable ());
this.next[0] = 0;
var elementWithCount;
while ((elementWithCount = this.parseTokenNext (formula)) != null) {
if (elementWithCount.length < 2) continue;
var chFirst = elementWithCount.charAt (0);
var chSecond = elementWithCount.charAt (1);
if (org.jmol.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (chFirst, chSecond)) htElementsInGroup.put ("" + chFirst + chSecond, Boolean.TRUE);
 else if (org.jmol.adapter.smarter.Atom.isValidElementSymbol (chFirst)) htElementsInGroup.put ("" + chFirst, Boolean.TRUE);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "het", 
($fz = function () {
if (this.line.length < 30) {
return;
}if (this.htHetero == null) {
this.htHetero =  new java.util.Hashtable ();
}var groupName = this.parseTokenRange (this.line, 7, 10);
if (this.htHetero.containsKey (groupName)) {
return;
}var hetName = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 30, 70);
this.htHetero.put (groupName, hetName);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hetnam", 
($fz = function () {
if (this.htHetero == null) {
this.htHetero =  new java.util.Hashtable ();
}var groupName = this.parseTokenRange (this.line, 11, 14);
var hetName = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 15, 70);
if (groupName == null) {
org.jmol.util.Logger.error ("ERROR: HETNAM record does not contain a group name: " + this.line);
return;
}var htName = this.htHetero.get (groupName);
if (htName != null) {
hetName = htName + hetName;
}this.htHetero.put (groupName, hetName);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "anisou", 
($fz = function () {
var data =  Clazz.newFloatArray (8, 0);
data[6] = 1;
var serial = this.parseIntRange (this.line, 6, 11);
var index;
if (this.line.substring (6, 26).equals (this.lastAtomData)) {
index = this.lastAtomIndex;
} else {
if (!this.haveMappedSerials) this.atomSetCollection.createAtomSerialMap ();
index = this.atomSetCollection.getAtomIndexFromSerial (serial);
this.haveMappedSerials = true;
}if (index < 0) {
return;
}var atom = this.atomSetCollection.getAtom (index);
for (var i = 28, pt = 0; i < 70; i += 7, pt++) data[pt] = this.parseFloatRange (this.line, i, i + 7);

for (var i = 0; i < 6; i++) {
if (Float.isNaN (data[i])) {
org.jmol.util.Logger.error ("Bad ANISOU record: " + this.line);
return;
}data[i] /= 10000;
}
this.atomSetCollection.setAnisoBorU (atom, data, 12);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "site", 
($fz = function () {
if (this.htSites == null) {
this.htSites =  new java.util.Hashtable ();
}var nResidues = this.parseIntRange (this.line, 15, 17);
var siteID = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, 11, 14);
var htSite = this.htSites.get (siteID);
if (htSite == null) {
htSite =  new java.util.Hashtable ();
htSite.put ("nResidues", Integer.$valueOf (nResidues));
htSite.put ("groups", "");
this.htSites.put (siteID, htSite);
}var groups = htSite.get ("groups");
for (var i = 0; i < 4; i++) {
var pt = 18 + i * 11;
var resName = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, pt, pt + 3);
if (resName.length == 0) break;
var chainID = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, pt + 4, pt + 5);
var seq = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, pt + 5, pt + 9);
var iCode = org.jmol.adapter.smarter.AtomSetCollectionReader.parseTrimmedRange (this.line, pt + 9, pt + 10);
groups += (groups.length == 0 ? "" : ",") + "[" + resName + "]" + seq;
if (iCode.length > 0) groups += "^" + iCode;
if (chainID.length > 0) groups += ":" + chainID;
htSite.put ("groups", groups);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "remarkTls", 
($fz = function () {
var nGroups = 0;
var iGroup = 0;
var components = null;
var tlsGroups = null;
var tlsGroup = null;
var ranges = null;
var range = null;
var remark = this.line.substring (0, 11);
while (this.readLine () != null && this.line.startsWith (remark)) {
try {
var tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line.substring (10).$replace (':', ' '));
if (tokens.length < 2) continue;
org.jmol.util.Logger.info (this.line);
if (tokens[1].equalsIgnoreCase ("GROUP")) {
tlsGroup =  new java.util.Hashtable ();
ranges =  new java.util.ArrayList ();
tlsGroup.put ("ranges", ranges);
tlsGroups.add (tlsGroup);
this.tlsGroupID = this.parseIntStr (tokens[tokens.length - 1]);
tlsGroup.put ("id", Integer.$valueOf (this.tlsGroupID));
} else if (tokens[0].equalsIgnoreCase ("NUMBER")) {
if (tokens[2].equalsIgnoreCase ("COMPONENTS")) {
} else {
nGroups = this.parseIntStr (tokens[tokens.length - 1]);
if (nGroups < 1) break;
if (this.vTlsModels == null) this.vTlsModels =  new java.util.ArrayList ();
tlsGroups =  new java.util.ArrayList ();
this.appendLoadNote (this.line.substring (11).trim ());
}} else if (tokens[0].equalsIgnoreCase ("COMPONENTS")) {
components = this.line;
} else if (tokens[0].equalsIgnoreCase ("RESIDUE")) {
range =  new java.util.Hashtable ();
var chain1;
var chain2;
var res1;
var res2;
if (tokens.length == 6) {
chain1 = tokens[2].charAt (0);
chain2 = tokens[4].charAt (0);
res1 = this.parseIntStr (tokens[3]);
res2 = this.parseIntStr (tokens[5]);
} else {
var toC = components.indexOf (" C ");
var fromC = components.indexOf (" C ", toC + 4);
chain1 = this.line.charAt (fromC);
chain2 = this.line.charAt (toC);
res1 = this.parseIntRange (this.line, fromC + 1, toC);
res2 = this.parseIntStr (this.line.substring (toC + 1));
}if (chain1 == chain2) {
range.put ("chains", "" + chain1 + chain2);
if (res1 <= res2) {
range.put ("residues", [res1, res2]);
ranges.add (range);
} else {
this.tlsAddError (" TLS group residues are not in order (range ignored)");
}} else {
this.tlsAddError (" TLS group chains are different (range ignored)");
}} else if (tokens[0].equalsIgnoreCase ("SELECTION")) {
var chain = '\u0000';
for (var i = 1; i < tokens.length; i++) {
if (tokens[i].toUpperCase ().indexOf ("CHAIN") >= 0) {
chain = tokens[++i].charAt (0);
continue;
}var resno = this.parseIntStr (tokens[i]);
if (resno == -2147483648) continue;
range =  new java.util.Hashtable ();
range.put ("residues", [resno, this.parseIntStr (tokens[++i])]);
if (chain != '\0') range.put ("chains", "" + chain + chain);
ranges.add (range);
}
} else if (tokens[0].equalsIgnoreCase ("ORIGIN")) {
var origin =  new org.jmol.util.Point3f ();
tlsGroup.put ("origin", origin);
if (tokens.length == 8) {
origin.set (this.parseFloatStr (tokens[5]), this.parseFloatStr (tokens[6]), this.parseFloatStr (tokens[7]));
} else {
var n = this.line.length;
origin.set (this.parseFloatRange (this.line, n - 27, n - 18), this.parseFloatRange (this.line, n - 18, n - 9), this.parseFloatRange (this.line, n - 9, n));
}if (Float.isNaN (origin.x) || Float.isNaN (origin.y) || Float.isNaN (origin.z)) {
origin.set (NaN, NaN, NaN);
this.tlsAddError ("invalid origin: " + this.line);
}} else if (tokens[1].equalsIgnoreCase ("TENSOR")) {
var tensorType = tokens[0].charAt (0);
var s = (this.readLine ().substring (10) + this.readLine ().substring (10) + this.readLine ().substring (10)).$replace (tensorType, ' ').$replace (':', ' ');
tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (s);
var tensor =  Clazz.newFloatArray (3, 3, 0);
tlsGroup.put ("t" + tensorType, tensor);
for (var i = 0; i < tokens.length; i++) {
var ti = tokens[i].charCodeAt (0) - 49;
var tj = tokens[i].charCodeAt (1) - 49;
tensor[ti][tj] = this.parseFloatStr (tokens[++i]);
if (ti < tj) tensor[tj][ti] = tensor[ti][tj];
}
for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) if (Float.isNaN (tensor[i][j])) {
this.tlsAddError ("invalid tensor: " + org.jmol.util.Escape.escapeFloatAA (tensor, false));
}

if (tensorType == 'S' && ++iGroup == nGroups) {
org.jmol.util.Logger.info (nGroups + " TLS groups read");
this.readLine ();
break;
}}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
org.jmol.util.Logger.error (this.line + "\nError in TLS parser: ");
System.out.println (e.getMessage ());
tlsGroups = null;
break;
} else {
throw e;
}
}
}
if (tlsGroups != null) {
var groups =  new java.util.Hashtable ();
groups.put ("groupCount", Integer.$valueOf (nGroups));
groups.put ("groups", tlsGroups);
this.vTlsModels.add (groups);
}return (nGroups < 1);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "handleTlsMissingModels", 
($fz = function () {
this.vTlsModels = null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setTlsGroups", 
($fz = function (iGroup, iModel, symmetry) {
org.jmol.util.Logger.info ("TLS model " + (iModel + 1) + " set " + (iGroup + 1));
var tlsGroupInfo = this.vTlsModels.get (iGroup);
var groups = tlsGroupInfo.get ("groups");
var index0 = this.atomSetCollection.getAtomSetAtomIndex (iModel);
var data =  Clazz.newIntArray (this.atomSetCollection.getAtomSetAtomCount (iModel), 0);
var indexMax = index0 + data.length;
var atoms = this.atomSetCollection.getAtoms ();
var nGroups = groups.size ();
for (var i = 0; i < nGroups; i++) {
var group = groups.get (i);
var ranges = group.get ("ranges");
this.tlsGroupID = (group.get ("id")).intValue ();
for (var j = ranges.size (); --j >= 0; ) {
var chains = ranges.get (j).get ("chains");
var residues = ranges.get (j).get ("residues");
var chain0 = chains.charAt (0);
var chain1 = chains.charAt (1);
var res0 = residues[0];
var res1 = residues[1];
var index1 = this.findAtomForRange (index0, indexMax, chain0, res0, false);
var index2 = (index1 >= 0 ? this.findAtomForRange (index1, indexMax, chain1, res1, false) : -1);
if (index2 < 0) {
org.jmol.util.Logger.info ("TLS processing terminated");
return;
}org.jmol.util.Logger.info ("TLS ID=" + this.tlsGroupID + " model atom index range " + index1 + "-" + index2);
var isSameChain = (chain0 == chain1);
for (var iAtom = index0; iAtom < indexMax; iAtom++) {
var atom = atoms[iAtom];
if (isSameChain ? atom.sequenceNumber >= res0 && atom.sequenceNumber <= res1 : atom.chainID > chain0 && atom.chainID < chain1 || atom.chainID == chain0 && atom.sequenceNumber >= res0 || atom.chainID == chain1 && atom.sequenceNumber <= res1) {
data[iAtom - index0] = this.tlsGroupID;
this.setTlsEllipsoid (atom, group, symmetry);
}}
}
}
var sdata =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < data.length; i++) sdata.appendI (data[i]).appendC ('\n');

this.atomSetCollection.setAtomSetAtomProperty ("tlsGroup", sdata.toString (), iModel);
this.atomSetCollection.setAtomSetAuxiliaryInfoForSet ("TLS", tlsGroupInfo, iModel);
this.atomSetCollection.setEllipsoids ();
}, $fz.isPrivate = true, $fz), "~N,~N,org.jmol.api.SymmetryInterface");
Clazz.defineMethod (c$, "findAtomForRange", 
($fz = function (atom1, atom2, chain, resno, isLast) {
var iAtom = this.findAtom (atom1, atom2, chain, resno, true);
return (isLast && iAtom >= 0 ? this.findAtom (iAtom, atom2, chain, resno, false) : iAtom);
}, $fz.isPrivate = true, $fz), "~N,~N,~S,~N,~B");
Clazz.defineMethod (c$, "findAtom", 
($fz = function (atom1, atom2, chain, resno, isTrue) {
var atoms = this.atomSetCollection.getAtoms ();
for (var i = atom1; i < atom2; i++) {
var atom = atoms[i];
if ((atom.chainID == chain && atom.sequenceNumber == resno) == isTrue) return i;
}
if (isTrue) {
org.jmol.util.Logger.warn ("PdbReader findAtom chain=" + chain + " resno=" + resno + " not found");
this.tlsAddError ("atom not found: chain=" + chain + " resno=" + resno);
}return (isTrue ? -1 : atom2);
}, $fz.isPrivate = true, $fz), "~N,~N,~S,~N,~B");
Clazz.defineMethod (c$, "setTlsEllipsoid", 
($fz = function (atom, group, symmetry) {
var origin = group.get ("origin");
if (Float.isNaN (origin.x)) return;
var T = group.get ("tT");
var L = group.get ("tL");
var S = group.get ("tS");
if (T == null || L == null || S == null) return;
var x = (atom.x - origin.x) * 0.017453292;
var y = (atom.y - origin.y) * 0.017453292;
var z = (atom.z - origin.z) * 0.017453292;
var xx = x * x;
var yy = y * y;
var zz = z * z;
var xy = x * y;
var xz = x * z;
var yz = y * z;
this.dataT[0] = T[0][0];
this.dataT[1] = T[1][1];
this.dataT[2] = T[2][2];
this.dataT[3] = T[0][1];
this.dataT[4] = T[0][2];
this.dataT[5] = T[1][2];
this.dataT[6] = 12;
var anisou =  Clazz.newFloatArray (8, 0);
var bresidual = (Float.isNaN (atom.bfactor) ? 0 : atom.bfactor / 78.95683);
anisou[0] = this.dataT[0] + L[1][1] * zz + L[2][2] * yy - 2 * L[1][2] * yz + 2 * S[1][0] * z - 2 * S[2][0] * y;
anisou[1] = this.dataT[1] + L[0][0] * zz + L[2][2] * xx - 2 * L[2][0] * xz - 2 * S[0][1] * z + 2 * S[2][1] * x;
anisou[2] = this.dataT[2] + L[0][0] * yy + L[1][1] * xx - 2 * L[0][1] * xy - 2 * S[1][2] * x + 2 * S[0][2] * y;
anisou[3] = this.dataT[3] - L[2][2] * xy + L[1][2] * xz + L[2][0] * yz - L[0][1] * zz - S[0][0] * z + S[1][1] * z + S[2][0] * x - S[2][1] * y;
anisou[4] = this.dataT[4] - L[1][1] * xz + L[1][2] * xy - L[2][0] * yy + L[0][1] * yz + S[0][0] * y - S[2][2] * y + S[1][2] * z - S[1][0] * x;
anisou[5] = this.dataT[5] - L[0][0] * yz - L[1][2] * xx + L[2][0] * xy + L[0][1] * xz - S[1][1] * x + S[2][2] * x + S[0][1] * y - S[0][2] * z;
anisou[6] = 12;
anisou[7] = bresidual;
if (Float.isNaN (bresidual)) System.out.println ("hmm");
if (this.tlsU == null) this.tlsU =  new java.util.Hashtable ();
this.tlsU.put (atom, anisou);
atom.ellipsoid = [null, null, symmetry.getEllipsoid (this.dataT)];
}, $fz.isPrivate = true, $fz), "org.jmol.adapter.smarter.Atom,java.util.Map,org.jmol.api.SymmetryInterface");
Clazz.defineMethod (c$, "tlsAddError", 
($fz = function (error) {
if (this.sbTlsErrors == null) this.sbTlsErrors =  new org.jmol.util.StringXBuilder ();
this.sbTlsErrors.append (this.fileName).appendC ('\t').append ("TLS group ").appendI (this.tlsGroupID).appendC ('\t').append (error).appendC ('\n');
}, $fz.isPrivate = true, $fz), "~S");
c$.fixRadius = Clazz.defineMethod (c$, "fixRadius", 
function (r) {
return (r < 0.9 ? 1 : r);
}, "~N");
Clazz.defineStatics (c$,
"lineOptions", "ATOM    HETATM  MODEL   CONECT  HELIX   SHEET   TURN    HET     HETNAM  ANISOU  SITE    CRYST1  SCALE1  SCALE2  SCALE3  EXPDTA  FORMUL  REMARK  HEADER  COMPND  SOURCE  TITLE   ",
"RAD_PER_DEG", (0.017453292519943295),
"_8PI2_", (78.95683520871486));
});
// 
//// org\jmol\adapter\smarter\Structure.js 
// 
Clazz.declarePackage ("org.jmol.adapter.smarter");
Clazz.load (["org.jmol.adapter.smarter.AtomSetObject"], "org.jmol.adapter.smarter.Structure", ["org.jmol.constant.EnumStructure"], function () {
c$ = Clazz.decorateAsClass (function () {
this.structureType = null;
this.substructureType = null;
this.structureID = null;
this.serialID = 0;
this.strandCount = 0;
this.startChainID = ' ';
this.startSequenceNumber = 0;
this.startInsertionCode = ' ';
this.endChainID = ' ';
this.endSequenceNumber = 0;
this.endInsertionCode = ' ';
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.smarter, "Structure", org.jmol.adapter.smarter.AtomSetObject);
c$.getHelixType = Clazz.defineMethod (c$, "getHelixType", 
function (type) {
switch (type) {
case 1:
return org.jmol.constant.EnumStructure.HELIXALPHA;
case 3:
return org.jmol.constant.EnumStructure.HELIXPI;
case 5:
return org.jmol.constant.EnumStructure.HELIX310;
}
return org.jmol.constant.EnumStructure.HELIX;
}, "~N");
Clazz.makeConstructor (c$, 
function (modelIndex, structureType, substructureType, structureID, serialID, strandCount, startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode) {
Clazz.superConstructor (this, org.jmol.adapter.smarter.Structure, []);
this.structureType = structureType;
this.substructureType = substructureType;
if (structureID == null) return;
this.atomSetIndex = modelIndex;
this.structureID = structureID;
this.strandCount = strandCount;
this.serialID = serialID;
this.startChainID = startChainID;
this.startSequenceNumber = startSequenceNumber;
this.startInsertionCode = startInsertionCode;
this.endChainID = endChainID;
this.endSequenceNumber = endSequenceNumber;
this.endInsertionCode = endInsertionCode;
}, "~N,org.jmol.constant.EnumStructure,org.jmol.constant.EnumStructure,~S,~N,~N,~S,~N,~S,~S,~N,~S");
});
// 
//// org\jmol\api\JmolBioResolver.js 
// 
Clazz.declarePackage ("org.jmol.api");
Clazz.declareInterface (org.jmol.api, "JmolBioResolver");
// 
//// org\jmol\modelsetbio\Resolver.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.api.JmolBioResolver"], "org.jmol.modelsetbio.Resolver", ["java.lang.Boolean", "$.NullPointerException", "java.util.Arrays", "$.Hashtable", "org.jmol.modelset.Group", "org.jmol.modelsetbio.AlphaMonomer", "$.AlphaPolymer", "$.AminoMonomer", "$.AminoPolymer", "$.BioModel", "$.CarbohydrateMonomer", "$.CarbohydratePolymer", "$.NucleicMonomer", "$.NucleicPolymer", "$.PhosphorusMonomer", "$.PhosphorusPolymer", "org.jmol.util.BitSet", "$.Logger", "$.Measure", "$.Point4f", "$.StringXBuilder", "$.TextFormat", "$.Vector3f", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelLoader = null;
this.modelSet = null;
this.bsAddedHydrogens = null;
this.bsAtomsForHs = null;
this.htBondMap = null;
this.htGroupBonds = null;
this.hNames = null;
this.lastSetH = -2147483648;
this.maxSerial = 0;
this.baseBondIndex = 0;
this.haveHsAlready = false;
this.vAB = null;
this.vAC = null;
this.vNorm = null;
this.plane = null;
if (!Clazz.isClassDefined ("org.jmol.modelsetbio.Resolver.BondSorter")) {
org.jmol.modelsetbio.Resolver.$Resolver$BondSorter$ ();
}
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "Resolver", null, org.jmol.api.JmolBioResolver);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "getBioModel", 
function (modelSet, modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo) {
return  new org.jmol.modelsetbio.BioModel (modelSet, modelIndex, trajectoryBaseIndex, jmolData, modelProperties, modelAuxiliaryInfo);
}, "org.jmol.modelset.ModelSet,~N,~N,~S,java.util.Properties,java.util.Map");
Clazz.overrideMethod (c$, "distinguishAndPropagateGroup", 
function (chain, group3, seqcode, firstAtomIndex, maxAtomIndex, modelIndex, specialAtomIndexes, atoms) {
var lastAtomIndex = maxAtomIndex - 1;
var distinguishingBits = 0;
for (var i = org.jmol.viewer.JmolConstants.ATOMID_MAX; --i >= 0; ) specialAtomIndexes[i] = -2147483648;

for (var i = maxAtomIndex; --i >= firstAtomIndex; ) {
var specialAtomID = atoms[i].getAtomID ();
if (specialAtomID <= 0) continue;
if (specialAtomID < 14) {
distinguishingBits |= (1 << specialAtomID);
}specialAtomIndexes[specialAtomID] = i;
}
if (lastAtomIndex < firstAtomIndex) throw  new NullPointerException ();
var m = null;
if ((distinguishingBits & 14) == 14) m = org.jmol.modelsetbio.AminoMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms);
 else if (distinguishingBits == 4) m = org.jmol.modelsetbio.AlphaMonomer.validateAndAllocateA (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (((distinguishingBits & 8128) == 8128)) m = org.jmol.modelsetbio.NucleicMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (distinguishingBits == 8192) m = org.jmol.modelsetbio.PhosphorusMonomer.validateAndAllocateP (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes);
 else if (org.jmol.viewer.JmolConstants.checkCarbohydrate (group3)) m = org.jmol.modelsetbio.CarbohydrateMonomer.validateAndAllocate (chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
return (m != null && m.leadAtomIndex >= 0 ? m : null);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~N,~A,~A");
Clazz.overrideMethod (c$, "setHaveHsAlready", 
function (b) {
this.haveHsAlready = b;
}, "~B");
Clazz.overrideMethod (c$, "initialize", 
function (modelSet) {
this.modelSet = modelSet;
}, "org.jmol.modelset.ModelSet");
Clazz.overrideMethod (c$, "initializeHydrogenAddition", 
function (modelLoader, bondCount) {
this.modelLoader = modelLoader;
this.baseBondIndex = bondCount;
this.bsAddedHydrogens =  new org.jmol.util.BitSet ();
this.bsAtomsForHs =  new org.jmol.util.BitSet ();
this.htBondMap =  new java.util.Hashtable ();
this.htGroupBonds =  new java.util.Hashtable ();
this.hNames =  new Array (3);
this.vAB =  new org.jmol.util.Vector3f ();
this.vAC =  new org.jmol.util.Vector3f ();
this.vNorm =  new org.jmol.util.Vector3f ();
this.plane =  new org.jmol.util.Point4f ();
}, "org.jmol.modelset.ModelLoader,~N");
Clazz.overrideMethod (c$, "addImplicitHydrogenAtoms", 
function (adapter, iGroup) {
var group3 = this.modelLoader.getGroup3 (iGroup);
var nH;
if (this.haveHsAlready || group3 == null || (nH = org.jmol.viewer.JmolConstants.getStandardPdbHydrogenCount (org.jmol.modelset.Group.lookupGroupID (group3))) == 0) return;
var model = null;
var iFirst = this.modelLoader.getFirstAtomIndex (iGroup);
var atomCount = this.modelSet.getAtomCount ();
if (nH < 0) {
if (atomCount - iFirst == 1) return;
model = this.modelSet.viewer.getLigandModel (group3);
if (model == null) return;
nH = adapter.getHydrogenAtomCount (model);
if (nH < 1) return;
}this.getBondInfo (adapter, group3, model);
this.modelSet.getModels ()[this.modelSet.atoms[iFirst].modelIndex].isPdbWithMultipleBonds = true;
this.bsAtomsForHs.setBits (iFirst, atomCount);
this.bsAddedHydrogens.setBits (atomCount, atomCount + nH);
var isHetero = this.modelSet.atoms[iFirst].isHetero ();
for (var i = 0; i < nH; i++) this.modelSet.addAtom (this.modelSet.atoms[iFirst].modelIndex, this.modelSet.atoms[iFirst].getGroup (), 1, "H", 0, 0, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 0, 0, 1, 0, null, isHetero, 0, null).$delete (null);

}, "org.jmol.api.JmolAdapter,~N");
Clazz.defineMethod (c$, "getBondInfo", 
function (adapter, group3, model) {
if (this.htGroupBonds.get (group3) != null) return;
var bondInfo;
if (model == null) {
bondInfo = this.modelSet.viewer.getPdbBondInfo (group3);
} else {
bondInfo = this.getLigandBondInfo (adapter, model, group3);
}if (bondInfo == null) return;
this.htGroupBonds.put (group3, Boolean.TRUE);
for (var i = 0; i < bondInfo.length; i++) {
if (bondInfo[i] == null) continue;
if (bondInfo[i][1].charAt (0) == 'H') this.htBondMap.put (group3 + "." + bondInfo[i][0], bondInfo[i][1]);
 else this.htBondMap.put (group3 + ":" + bondInfo[i][0] + ":" + bondInfo[i][1], bondInfo[i][2]);
}
}, "org.jmol.api.JmolAdapter,~S,~O");
Clazz.defineMethod (c$, "getLigandBondInfo", 
($fz = function (adapter, model, group3) {
var dataIn = adapter.getBondList (model);
var htAtoms =  new java.util.Hashtable ();
var iterAtom = adapter.getAtomIterator (model);
while (iterAtom.hasNext ()) htAtoms.put (iterAtom.getAtomName (), iterAtom.getXYZ ());

var bondInfo =  new Array (dataIn.length * 2);
var n = 0;
for (var i = 0; i < dataIn.length; i++) {
var b = dataIn[i];
if (b[0].charAt (0) != 'H') bondInfo[n++] = [b[0], b[1], b[2], b[1].startsWith ("H") ? "0" : "1"];
if (b[1].charAt (0) != 'H') bondInfo[n++] = [b[1], b[0], b[2], b[0].startsWith ("H") ? "0" : "1"];
}
java.util.Arrays.sort (bondInfo, Clazz.innerTypeInstance (org.jmol.modelsetbio.Resolver.BondSorter, this, null));
var t;
for (var i = 0; i < n; ) {
t = bondInfo[i];
var a1 = t[0];
var nH = 0;
var nC = 0;
for (; i < n && (t = bondInfo[i])[0].equals (a1); i++) {
if (t[3].equals ("0")) {
nH++;
continue;
}if (t[3].equals ("1")) nC++;
}
var pt = i - nH - nC;
if (nH == 1) continue;
switch (nC) {
case 1:
var sep = (nH == 2 ? '@' : '|');
for (var j = 1; j < nH; j++) {
bondInfo[pt][1] += sep + bondInfo[pt + j][1];
bondInfo[pt + j] = null;
}
continue;
case 2:
if (nH != 2) continue;
var name = bondInfo[pt][0];
var name1 = bondInfo[pt + nH][1];
var name2 = bondInfo[pt + nH + 1][1];
var factor = name1.compareTo (name2);
org.jmol.util.Measure.getPlaneThroughPoints (htAtoms.get (name1), htAtoms.get (name), htAtoms.get (name2), this.vNorm, this.vAB, this.vAC, this.plane);
var d = org.jmol.util.Measure.distanceToPlane (this.plane, htAtoms.get (bondInfo[pt][1])) * factor;
bondInfo[pt][1] = (d > 0 ? bondInfo[pt][1] + "@" + bondInfo[pt + 1][1] : bondInfo[pt + 1][1] + "@" + bondInfo[pt][1]);
bondInfo[pt + 1] = null;
}
}
for (var i = 0; i < n; i++) {
if ((t = bondInfo[i]) != null && t[1].charAt (0) != 'H' && t[0].compareTo (t[1]) > 0) {
bondInfo[i] = null;
continue;
}if (t != null) org.jmol.util.Logger.info (" ligand " + group3 + ": " + bondInfo[i][0] + " - " + bondInfo[i][1] + " order " + bondInfo[i][2]);
}
return bondInfo;
}, $fz.isPrivate = true, $fz), "org.jmol.api.JmolAdapter,~O,~S");
Clazz.overrideMethod (c$, "finalizeHydrogens", 
function () {
this.modelSet.viewer.getLigandModel (null);
this.finalizePdbMultipleBonds ();
if (this.bsAddedHydrogens.nextSetBit (0) >= 0) {
this.finalizePdbCharges ();
var nTotal =  Clazz.newIntArray (1, 0);
var pts = this.modelSet.calculateHydrogens (this.bsAtomsForHs, nTotal, true, false, null);
var groupLast = null;
var ipt = 0;
for (var i = 0; i < pts.length; i++) {
if (pts[i] == null) continue;
var atom = this.modelSet.atoms[i];
var g = atom.getGroup ();
if (g !== groupLast) {
groupLast = g;
ipt = g.lastAtomIndex;
while (this.bsAddedHydrogens.get (ipt)) ipt--;

}var gName = atom.getGroup3 (false);
var aName = atom.getAtomName ();
var hName = this.htBondMap.get (gName + "." + aName);
if (hName == null) continue;
var isChiral = hName.contains ("@");
var isMethyl = (hName.endsWith ("?") || hName.indexOf ("|") >= 0);
var n = pts[i].length;
if (n == 3 && !isMethyl && hName.equals ("H@H2")) {
hName = "H|H2|H3";
isMethyl = true;
isChiral = false;
}if (isChiral && n == 3 || isMethyl != (n == 3)) {
org.jmol.util.Logger.info ("Error adding H atoms to " + gName + g.getResno () + ": " + pts[i].length + " atoms should not be added to " + aName);
continue;
}var pt = hName.indexOf ("@");
switch (pts[i].length) {
case 1:
if (pt > 0) hName = hName.substring (0, pt);
this.setHydrogen (i, ++ipt, hName, pts[i][0]);
break;
case 2:
var hName1;
var hName2;
var d = -1;
var bonds = atom.getBonds ();
if (bonds != null) switch (bonds.length) {
case 2:
var atom1 = bonds[0].getOtherAtom (atom);
var atom2 = bonds[1].getOtherAtom (atom);
var factor = atom1.getAtomName ().compareTo (atom2.getAtomName ());
org.jmol.util.Measure.getPlaneThroughPoints (atom1, atom, atom2, this.vNorm, this.vAB, this.vAC, this.plane);
d = org.jmol.util.Measure.distanceToPlane (this.plane, pts[i][0]) * factor;
break;
}
if (pt < 0) {
org.jmol.util.Logger.info ("Error adding H atoms to " + gName + g.getResno () + ": expected to only need 1 H but needed 2");
hName1 = hName2 = "H";
} else if (d < 0) {
hName2 = hName.substring (0, pt);
hName1 = hName.substring (pt + 1);
} else {
hName1 = hName.substring (0, pt);
hName2 = hName.substring (pt + 1);
}this.setHydrogen (i, ++ipt, hName1, pts[i][0]);
this.setHydrogen (i, ++ipt, hName2, pts[i][1]);
break;
case 3:
var pt1 = hName.indexOf ('|');
if (pt1 >= 0) {
var pt2 = hName.lastIndexOf ('|');
this.hNames[0] = hName.substring (0, pt1);
this.hNames[1] = hName.substring (pt1 + 1, pt2);
this.hNames[2] = hName.substring (pt2 + 1);
} else {
this.hNames[0] = hName.$replace ('?', '1');
this.hNames[1] = hName.$replace ('?', '2');
this.hNames[2] = hName.$replace ('?', '3');
}this.setHydrogen (i, ++ipt, this.hNames[0], pts[i][0]);
this.setHydrogen (i, ++ipt, this.hNames[1], pts[i][2]);
this.setHydrogen (i, ++ipt, this.hNames[2], pts[i][1]);
break;
}
}
this.deleteUnneededAtoms ();
}});
Clazz.defineMethod (c$, "deleteUnneededAtoms", 
($fz = function () {
var bsBondsDeleted =  new org.jmol.util.BitSet ();
for (var i = this.bsAtomsForHs.nextSetBit (0); i >= 0; i = this.bsAtomsForHs.nextSetBit (i + 1)) {
var atom = this.modelSet.atoms[i];
if (!atom.isHetero () || atom.getElementNumber () != 8 || atom.getFormalCharge () != 0 || atom.getCovalentBondCount () != 2) continue;
var bonds = atom.getBonds ();
var atom1 = bonds[0].getOtherAtom (atom);
var atomH = bonds[1].getOtherAtom (atom);
if (atom1.getElementNumber () == 1) {
var a = atom1;
atom1 = atomH;
atomH = a;
}if (atomH.getElementNumber () != 1) continue;
var bonds1 = atom1.getBonds ();
for (var j = 0; j < bonds1.length; j++) {
if (bonds1[j].order == 2) {
var atomO = bonds1[j].getOtherAtom (atom1);
if (atomO.getElementNumber () == 8) {
this.bsAddedHydrogens.set (atomH.index);
atomH.$delete (bsBondsDeleted);
break;
}}}
}
this.modelSet.deleteBonds (bsBondsDeleted, true);
this.modelLoader.deleteAtoms (this.bsAddedHydrogens);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "finalizePdbCharges", 
($fz = function () {
var atoms = this.modelSet.atoms;
for (var i = this.bsAtomsForHs.nextSetBit (0); i >= 0; i = this.bsAtomsForHs.nextSetBit (i + 1)) {
if (atoms[i].getGroup ().getNitrogenAtom () === atoms[i] && atoms[i].getCovalentBondCount () == 1) atoms[i].setFormalCharge (1);
if ((i = this.bsAtomsForHs.nextClearBit (i + 1)) < 0) break;
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "finalizePdbMultipleBonds", 
($fz = function () {
var htKeysUsed =  new java.util.Hashtable ();
var bondCount = this.modelSet.getBondCount ();
var bonds = this.modelSet.getBonds ();
for (var i = this.baseBondIndex; i < bondCount; i++) {
var a1 = bonds[i].getAtom1 ();
var a2 = bonds[i].getAtom2 ();
var g = a1.getGroup ();
if (g !== a2.getGroup ()) continue;
var key =  new org.jmol.util.StringXBuilder ().append (g.getGroup3 ());
key.append (":");
var n1 = a1.getAtomName ();
var n2 = a2.getAtomName ();
if (n1.compareTo (n2) > 0) key.append (n2).append (":").append (n1);
 else key.append (n1).append (":").append (n2);
var skey = key.toString ();
var type = this.htBondMap.get (skey);
if (type == null) continue;
htKeysUsed.put (skey, Boolean.TRUE);
bonds[i].setOrder (Integer.$valueOf (type).intValue ());
}
for (var key, $key = this.htBondMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (htKeysUsed.get (key) != null) continue;
if (key.indexOf (":") < 0) {
htKeysUsed.put (key, Boolean.TRUE);
continue;
}var value = this.htBondMap.get (key);
org.jmol.util.Logger.info ("bond " + key + " was not used; order=" + value);
if (this.htBondMap.get (key).equals ("1")) {
htKeysUsed.put (key, Boolean.TRUE);
continue;
}}
var htKeysBad =  new java.util.Hashtable ();
for (var key, $key = this.htBondMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (htKeysUsed.get (key) != null) continue;
htKeysBad.put (key.substring (0, key.lastIndexOf (":")), this.htBondMap.get (key));
}
if (htKeysBad.isEmpty ()) return;
for (var i = 0; i < bondCount; i++) {
var a1 = bonds[i].getAtom1 ();
var a2 = bonds[i].getAtom2 ();
if (a1.getGroup () === a2.getGroup ()) continue;
var value;
if ((value = htKeysBad.get (a1.getGroup3 (false) + ":" + a1.getAtomName ())) == null && ((value = htKeysBad.get (a2.getGroup3 (false) + ":" + a2.getAtomName ())) == null)) continue;
bonds[i].setOrder (Integer.$valueOf (value).intValue ());
org.jmol.util.Logger.info ("assigning order " + bonds[i].order + " to bond " + bonds[i]);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setHydrogen", 
($fz = function (iTo, iAtom, name, pt) {
if (!this.bsAddedHydrogens.get (iAtom)) return;
var atoms = this.modelSet.atoms;
if (this.lastSetH == -2147483648 || atoms[iAtom].modelIndex != atoms[this.lastSetH].modelIndex) this.maxSerial = (this.modelSet.getModelAuxiliaryInfoValue (atoms[this.lastSetH = iAtom].modelIndex, "PDB_CONECT_firstAtom_count_max"))[2];
this.bsAddedHydrogens.clear (iAtom);
this.modelSet.setAtomName (iAtom, name);
atoms[iAtom].setT (pt);
this.modelSet.setAtomNumber (iAtom, ++this.maxSerial);
atoms[iAtom].setAtomSymmetry (atoms[iTo].getAtomSymmetry ());
this.modelLoader.undeleteAtom (iAtom);
this.modelSet.bondAtoms (atoms[iTo], atoms[iAtom], 1, this.modelSet.getDefaultMadFromOrder (1), null, 0, true, false);
}, $fz.isPrivate = true, $fz), "~N,~N,~S,org.jmol.util.Point3f");
Clazz.overrideMethod (c$, "fixPropertyValue", 
function (bsAtoms, data) {
var aData = org.jmol.util.TextFormat.split (data, '\n');
var atoms = this.modelSet.atoms;
var newData =  new Array (bsAtoms.cardinality ());
var lastData = "";
for (var pt = 0, iAtom = 0, i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i), iAtom++) {
if (atoms[i].getElementNumber () != 1) lastData = aData[pt++];
newData[iAtom] = lastData;
}
return org.jmol.util.TextFormat.join (newData, '\n', 0);
}, "org.jmol.util.BitSet,~S");
c$.allocateBioPolymer = Clazz.defineMethod (c$, "allocateBioPolymer", 
function (groups, firstGroupIndex, checkConnections) {
var previous = null;
var count = 0;
for (var i = firstGroupIndex; i < groups.length; ++i) {
var group = groups[i];
var current;
if (!(Clazz.instanceOf (group, org.jmol.modelsetbio.Monomer)) || (current = group).bioPolymer != null || previous != null && previous.getClass () !== current.getClass () || checkConnections && !current.isConnectedAfter (previous)) break;
previous = current;
count++;
}
if (count == 0) return null;
var monomers =  new Array (count);
for (var j = 0; j < count; ++j) monomers[j] = groups[firstGroupIndex + j];

if (Clazz.instanceOf (previous, org.jmol.modelsetbio.AminoMonomer)) return  new org.jmol.modelsetbio.AminoPolymer (monomers);
if (Clazz.instanceOf (previous, org.jmol.modelsetbio.AlphaMonomer)) return  new org.jmol.modelsetbio.AlphaPolymer (monomers);
if (Clazz.instanceOf (previous, org.jmol.modelsetbio.NucleicMonomer)) return  new org.jmol.modelsetbio.NucleicPolymer (monomers);
if (Clazz.instanceOf (previous, org.jmol.modelsetbio.PhosphorusMonomer)) return  new org.jmol.modelsetbio.PhosphorusPolymer (monomers);
if (Clazz.instanceOf (previous, org.jmol.modelsetbio.CarbohydrateMonomer)) return  new org.jmol.modelsetbio.CarbohydratePolymer (monomers);
org.jmol.util.Logger.error ("Polymer.allocatePolymer() ... no matching polymer for monomor " + previous);
throw  new NullPointerException ();
}, "~A,~N,~B");
c$.$Resolver$BondSorter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio.Resolver, "BondSorter", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (b == null ? (a == null ? 0 : -1) : a == null ? 1 : a[0].compareTo (b[0]) < 0 ? -1 : a[0].compareTo (b[0]) > 0 ? 1 : a[3].compareTo (b[3]) < 0 ? -1 : a[3].compareTo (b[3]) > 0 ? 1 : a[1].compareTo (b[1]) < 0 ? -1 : a[1].compareTo (b[1]) > 0 ? 1 : 0);
}, "~A,~A");
c$ = Clazz.p0p ();
};
});
// 
//// org\jmol\modelsetbio\Monomer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelset.Group"], "org.jmol.modelsetbio.Monomer", ["java.lang.Float", "org.jmol.constant.EnumStructure", "org.jmol.util.Logger", "$.Measure", "$.Point3f", "$.Quaternion", "org.jmol.viewer.JmolConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bioPolymer = null;
this.offsets = null;
this.monomerIndex = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "Monomer", org.jmol.modelset.Group);
c$.have = Clazz.defineMethod (c$, "have", 
function (offsets, n) {
return (offsets[n] & 0xFF) != 0xFF;
}, "~A,~N");
Clazz.makeConstructor (c$, 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, interestingAtomOffsets) {
Clazz.superConstructor (this, org.jmol.modelsetbio.Monomer, [chain, group3, seqcode, firstAtomIndex, lastAtomIndex]);
this.offsets = interestingAtomOffsets;
var offset = this.offsets[0] & 0xFF;
if (offset != 255) this.leadAtomIndex = firstAtomIndex + offset;
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.overrideMethod (c$, "getGroups", 
function () {
return this.bioPolymer.getGroups ();
});
Clazz.defineMethod (c$, "setBioPolymer", 
function (polymer, index) {
this.bioPolymer = polymer;
this.monomerIndex = index;
}, "org.jmol.modelsetbio.BioPolymer,~N");
Clazz.overrideMethod (c$, "getSelectedMonomerCount", 
function () {
return this.bioPolymer.getSelectedMonomerCount ();
});
Clazz.overrideMethod (c$, "getSelectedMonomerIndex", 
function () {
return (this.monomerIndex >= 0 && this.bioPolymer.isMonomerSelected (this.monomerIndex) ? this.monomerIndex : -1);
});
Clazz.defineMethod (c$, "getBioPolymer", 
function () {
return this.bioPolymer;
});
Clazz.overrideMethod (c$, "getBioPolymerLength", 
function () {
return this.bioPolymer == null ? 0 : this.bioPolymer.monomerCount;
});
Clazz.defineMethod (c$, "getMonomerIndex", 
function () {
return this.monomerIndex;
});
Clazz.defineMethod (c$, "getBioPolymerIndexInModel", 
function () {
return (this.bioPolymer == null ? -1 : this.bioPolymer.bioPolymerIndexInModel);
});
c$.scanForOffsets = Clazz.defineMethod (c$, "scanForOffsets", 
function (firstAtomIndex, specialAtomIndexes, interestingAtomIDs) {
var interestingCount = interestingAtomIDs.length;
var offsets =  Clazz.newByteArray (interestingCount, 0);
for (var i = interestingCount; --i >= 0; ) {
var atomIndex;
var atomID = interestingAtomIDs[i];
if (atomID < 0) {
atomIndex = specialAtomIndexes[~atomID];
} else {
atomIndex = specialAtomIndexes[atomID];
if (atomIndex < 0) return null;
}var offset;
if (atomIndex < 0) offset = 255;
 else {
offset = atomIndex - firstAtomIndex;
if (offset < 0 || offset > 254) {
org.jmol.util.Logger.warn ("Monomer.scanForOffsets i=" + i + " atomID=" + atomID + " atomIndex:" + atomIndex + " firstAtomIndex:" + firstAtomIndex + " offset out of 0-254 range. Groups aren't organized correctly. Is this really a protein?: " + offset);
if (atomID < 0) {
offset = 255;
} else {
}}}offsets[i] = offset;
}
return offsets;
}, "~N,~A,~A");
Clazz.defineMethod (c$, "setStructure", 
function (proteinstructure) {
}, "org.jmol.modelsetbio.ProteinStructure");
Clazz.defineMethod (c$, "getProteinStructure", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return org.jmol.constant.EnumStructure.NONE;
});
Clazz.defineMethod (c$, "isHelix", 
function () {
return false;
});
Clazz.defineMethod (c$, "isSheet", 
function () {
return false;
});
Clazz.overrideMethod (c$, "setStrucNo", 
function (id) {
}, "~N");
Clazz.defineMethod (c$, "getAtomFromOffsetIndex", 
function (offsetIndex) {
if (offsetIndex > this.offsets.length) return null;
var offset = this.offsets[offsetIndex] & 0xFF;
if (offset == 255) return null;
return this.chain.getAtom (this.firstAtomIndex + offset);
}, "~N");
Clazz.defineMethod (c$, "getSpecialAtom", 
function (interestingIDs, specialAtomID) {
for (var i = interestingIDs.length; --i >= 0; ) {
var interestingID = interestingIDs[i];
if (interestingID < 0) interestingID = -interestingID;
if (specialAtomID == interestingID) {
var offset = this.offsets[i] & 0xFF;
if (offset == 255) return null;
return this.chain.getAtom (this.firstAtomIndex + offset);
}}
return null;
}, "~A,~N");
Clazz.defineMethod (c$, "getSpecialAtomPoint", 
function (interestingIDs, specialAtomID) {
for (var i = interestingIDs.length; --i >= 0; ) {
var interestingID = interestingIDs[i];
if (interestingID < 0) interestingID = -interestingID;
if (specialAtomID == interestingID) {
var offset = this.offsets[i] & 0xFF;
if (offset == 255) return null;
return this.chain.getAtom (this.firstAtomIndex + offset);
}}
return null;
}, "~A,~N");
Clazz.overrideMethod (c$, "isLeadAtom", 
function (atomIndex) {
return atomIndex == this.leadAtomIndex;
}, "~N");
Clazz.overrideMethod (c$, "getLeadAtom", 
function () {
return this.getAtomFromOffsetIndex (0);
});
Clazz.defineMethod (c$, "getWingAtom", 
function () {
return this.getAtomFromOffsetIndex (1);
});
Clazz.defineMethod (c$, "getInitiatorAtom", 
function () {
return this.getLeadAtom ();
});
Clazz.defineMethod (c$, "getTerminatorAtom", 
function () {
return this.getLeadAtom ();
});
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
}, "~N,~N,~A,~N,~N");
Clazz.overrideMethod (c$, "calcBioParameters", 
function () {
return this.bioPolymer.calcParameters ();
});
Clazz.overrideMethod (c$, "haveParameters", 
function () {
return this.bioPolymer.haveParameters;
});
Clazz.defineMethod (c$, "getMyInfo", 
function () {
var info = Clazz.superCall (this, org.jmol.modelsetbio.Monomer, "getGroupInfo", [this.groupIndex]);
var chainID = this.chain.chainID;
info.put ("chain", (chainID == '\0' ? "" : "" + chainID));
var seqNum = this.getSeqNumber ();
var insCode = this.getInsertionCode ();
if (seqNum > 0) info.put ("sequenceNumber", Integer.$valueOf (seqNum));
if (insCode.charCodeAt (0) != 0) info.put ("insertionCode", "" + insCode);
var f = this.getGroupParameter (1112539143);
if (!Float.isNaN (f)) info.put ("phi",  new Float (f));
f = this.getGroupParameter (1112539144);
if (!Float.isNaN (f)) info.put ("psi",  new Float (f));
f = this.getGroupParameter (1112539140);
if (!Float.isNaN (f)) info.put ("mu",  new Float (f));
f = this.getGroupParameter (1112539150);
if (!Float.isNaN (f)) info.put ("theta",  new Float (f));
var structure = this.getProteinStructure ();
if (structure != null) {
info.put ("structureId", Integer.$valueOf (structure.strucNo));
info.put ("structureType", structure.type.getBioStructureTypeName (false));
}info.put ("shapeVisibilityFlags", Integer.$valueOf (this.shapeVisibilityFlags));
return info;
});
Clazz.overrideMethod (c$, "getStructureId", 
function () {
var structure = this.getProteinStructure ();
return (structure == null ? "" : structure.type.getBioStructureTypeName (false));
});
Clazz.defineMethod (c$, "getConformation", 
function (atoms, bsConformation, conformationIndex) {
var ch = '\u0000';
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) {
var atom = atoms[i];
var altloc = atom.getAlternateLocationID ();
if (altloc == '\0') continue;
if (conformationIndex >= 0 && altloc != ch) {
ch = altloc;
conformationIndex--;
}if (conformationIndex < 0 && altloc != ch) bsConformation.clear (i);
}
}, "~A,org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "updateOffsetsForAlternativeLocations", 
function (atoms, bsSelected) {
for (var offsetIndex = this.offsets.length; --offsetIndex >= 0; ) {
var offset = this.offsets[offsetIndex] & 0xFF;
if (offset == 255) continue;
var iThis = this.firstAtomIndex + offset;
var atom = atoms[iThis];
var thisID = atom.getAtomID ();
if ((atom.getAlternateLocationID ()).charCodeAt (0) == 0) continue;
var nScan = this.lastAtomIndex - this.firstAtomIndex;
for (var i = 1; i <= nScan; i++) {
var iNew = iThis + i;
if (iNew > this.lastAtomIndex) iNew -= nScan + 1;
var offsetNew = iNew - this.firstAtomIndex;
if (offsetNew < 0 || offsetNew > 255 || iNew == iThis || !bsSelected.get (iNew)) continue;
var atomID = atoms[iNew].getAtomID ();
if (atomID != thisID || atomID == 0 && !atoms[iNew].getAtomName ().equals (atom.getAtomName ())) continue;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("Chain.udateOffsetsForAlternativeLocation " + atoms[iNew] + " was " + atom);
this.offsets[offsetIndex] = offsetNew;
break;
}
}
}, "~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getMonomerSequenceAtoms", 
function (bsInclude, bsResult) {
Clazz.superCall (this, org.jmol.modelsetbio.Monomer, "selectAtoms", [bsResult]);
bsResult.and (bsInclude);
}, "org.jmol.util.BitSet,org.jmol.util.BitSet");
c$.checkOptional = Clazz.defineMethod (c$, "checkOptional", 
function (offsets, atom, firstAtomIndex, index) {
if (org.jmol.modelsetbio.Monomer.have (offsets, atom)) return true;
if (index < 0) return false;
offsets[atom] = (index - firstAtomIndex);
return true;
}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "getQuaternionFrameCenter", 
function (qtype) {
return null;
}, "~S");
Clazz.defineMethod (c$, "getHelixData2", 
function (tokType, qType, mStep) {
var iPrev = this.monomerIndex - mStep;
var prev = (mStep < 1 || this.monomerIndex <= 0 ? null : this.bioPolymer.monomers[iPrev]);
var q2 = this.getQuaternion (qType);
var q1 = (mStep < 1 ? org.jmol.util.Quaternion.getQuaternionFrameV (org.jmol.viewer.JmolConstants.axisX, org.jmol.viewer.JmolConstants.axisY, org.jmol.viewer.JmolConstants.axisZ, false) : prev == null ? null : prev.getQuaternion (qType));
if (q1 == null || q2 == null) return Clazz.superCall (this, org.jmol.modelsetbio.Monomer, "getHelixData", [tokType, qType, mStep]);
var a = (mStep < 1 ? org.jmol.util.Point3f.new3 (0, 0, 0) : prev.getQuaternionFrameCenter (qType));
var b = this.getQuaternionFrameCenter (qType);
if (a == null || b == null) return Clazz.superCall (this, org.jmol.modelsetbio.Monomer, "getHelixData", [tokType, qType, mStep]);
return org.jmol.util.Measure.computeHelicalAxis (tokType == 135176 ? "helixaxis" + this.getUniqueID () : null, tokType, a, b, q2.div (q1));
}, "~N,~S,~N");
Clazz.defineMethod (c$, "getUniqueID", 
function () {
var cid = this.getChainID ();
var a = this.getLeadAtom ();
var id = (a == null ? "" : "_" + a.getModelIndex ()) + "_" + this.getResno () + (cid == '\0' ? "" : "" + cid);
cid = (a == null ? '\0' : this.getLeadAtom ().getAlternateLocationID ());
if (cid != '\0') id += cid;
return id;
});
Clazz.overrideMethod (c$, "isCrossLinked", 
function (g) {
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup (i, null, g)) return true;

return false;
}, "org.jmol.modelset.Group");
Clazz.overrideMethod (c$, "getCrossLinkLead", 
function (vReturn) {
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLink (i, vReturn) && vReturn == null) return true;

return false;
}, "java.util.List");
Clazz.defineMethod (c$, "getCrossLink", 
function (i, vReturn) {
return this.getCrossLinkGroup (i, vReturn, null);
}, "~N,java.util.List");
Clazz.defineMethod (c$, "getCrossLinkGroup", 
($fz = function (i, vReturn, group) {
var atom = this.chain.getAtom (i);
var bonds = atom.getBonds ();
var ibp = this.getBioPolymerIndexInModel ();
if (ibp < 0 || bonds == null) return false;
var haveCrossLink = false;
var checkPrevious = (vReturn == null && group == null);
for (var j = 0; j < bonds.length; j++) {
var a = bonds[j].getOtherAtom (atom);
var g = a.getGroup ();
if (group != null && g !== group) continue;
var iPolymer = g.getBioPolymerIndexInModel ();
var igroup = g.getMonomerIndex ();
if (checkPrevious) {
if (iPolymer == ibp && igroup == this.monomerIndex - 1) return true;
} else if (iPolymer >= 0 && igroup >= 0 && (iPolymer != ibp || igroup < this.monomerIndex - 1 || igroup > this.monomerIndex + 1)) {
haveCrossLink = true;
if (group != null) break;
vReturn.add (Integer.$valueOf (g.leadAtomIndex));
}}
return haveCrossLink;
}, $fz.isPrivate = true, $fz), "~N,java.util.List,org.jmol.modelset.Group");
Clazz.overrideMethod (c$, "isConnectedPrevious", 
function () {
return true;
});
});
// 
//// org\jmol\modelsetbio\AlphaMonomer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.Monomer"], "org.jmol.modelsetbio.AlphaMonomer", ["org.jmol.constant.EnumStructure", "org.jmol.modelsetbio.Helix", "$.Sheet", "$.Turn", "org.jmol.util.Quaternion", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.proteinStructure = null;
this.nitrogenHydrogenPoint = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "AlphaMonomer", org.jmol.modelsetbio.Monomer);
Clazz.overrideMethod (c$, "isProtein", 
function () {
return true;
});
c$.validateAndAllocateA = Clazz.defineMethod (c$, "validateAndAllocateA", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
if (firstIndex != lastIndex || specialAtomIndexes[2] != firstIndex) return null;
return  new org.jmol.modelsetbio.AlphaMonomer (chain, group3, seqcode, firstIndex, lastIndex, org.jmol.modelsetbio.AlphaMonomer.alphaOffsets);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.defineMethod (c$, "isAlphaMonomer", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getProteinStructure", 
function () {
return this.proteinStructure;
});
Clazz.overrideMethod (c$, "getStructure", 
function () {
return this.getProteinStructure ();
});
Clazz.overrideMethod (c$, "setStructure", 
function (proteinStructure) {
this.proteinStructure = proteinStructure;
if (proteinStructure == null) this.nitrogenHydrogenPoint = null;
}, "org.jmol.modelsetbio.ProteinStructure");
Clazz.overrideMethod (c$, "setStrucNo", 
function (n) {
if (this.proteinStructure != null) this.proteinStructure.strucNo = n;
}, "~N");
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return this.proteinStructure == null ? org.jmol.constant.EnumStructure.NONE : this.proteinStructure.type;
});
Clazz.overrideMethod (c$, "getProteinStructureSubType", 
function () {
return this.proteinStructure == null ? org.jmol.constant.EnumStructure.NONE : this.proteinStructure.subtype;
});
Clazz.overrideMethod (c$, "getStrucNo", 
function () {
return this.proteinStructure != null ? this.proteinStructure.strucNo : 0;
});
Clazz.overrideMethod (c$, "isHelix", 
function () {
return this.proteinStructure != null && this.proteinStructure.type === org.jmol.constant.EnumStructure.HELIX;
});
Clazz.overrideMethod (c$, "isSheet", 
function () {
return this.proteinStructure != null && this.proteinStructure.type === org.jmol.constant.EnumStructure.SHEET;
});
Clazz.overrideMethod (c$, "setProteinStructureType", 
function (type, monomerIndexCurrent) {
if (monomerIndexCurrent < 0 || monomerIndexCurrent > 0 && this.monomerIndex == 0) {
if (this.proteinStructure != null) {
var nAbandoned = this.proteinStructure.removeMonomer (this.monomerIndex);
if (nAbandoned > 0) this.getBioPolymer ().removeProteinStructure (this.monomerIndex + 1, nAbandoned);
}switch (type) {
case org.jmol.constant.EnumStructure.HELIX:
case org.jmol.constant.EnumStructure.HELIXALPHA:
case org.jmol.constant.EnumStructure.HELIX310:
case org.jmol.constant.EnumStructure.HELIXPI:
this.setStructure ( new org.jmol.modelsetbio.Helix (this.bioPolymer, this.monomerIndex, 1, type));
break;
case org.jmol.constant.EnumStructure.SHEET:
this.setStructure ( new org.jmol.modelsetbio.Sheet (this.bioPolymer, this.monomerIndex, 1, type));
break;
case org.jmol.constant.EnumStructure.TURN:
this.setStructure ( new org.jmol.modelsetbio.Turn (this.bioPolymer, this.monomerIndex, 1));
break;
case org.jmol.constant.EnumStructure.NONE:
this.setStructure (null);
}
} else {
this.setStructure (this.getBioPolymer ().getProteinStructure (monomerIndexCurrent));
if (this.proteinStructure != null) this.proteinStructure.addMonomer (this.monomerIndex);
}return this.monomerIndex;
}, "org.jmol.constant.EnumStructure,~N");
Clazz.defineMethod (c$, "getAtom", 
function (specialAtomID) {
return (specialAtomID == 2 ? this.getLeadAtom () : null);
}, "~N");
Clazz.defineMethod (c$, "getAtomPoint", 
function (specialAtomID) {
return (specialAtomID == 2 ? this.getLeadAtom () : null);
}, "~N");
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var atom1 = this.getLeadAtom ();
var atom2 = possiblyPreviousMonomer.getLeadAtom ();
return atom1.isBonded (atom2) || atom1.distance (atom2) <= 4.2;
}, "org.jmol.modelsetbio.Monomer");
Clazz.overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
switch (qType) {
case 'b':
case 'c':
case 'C':
case 'x':
return this.getLeadAtom ();
default:
case 'a':
case 'n':
case 'p':
case 'P':
case 'q':
return null;
}
}, "~S");
Clazz.overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz.overrideMethod (c$, "getQuaternion", 
function (qType) {
var vA =  new org.jmol.util.Vector3f ();
var vB =  new org.jmol.util.Vector3f ();
var vC = null;
switch (qType) {
default:
case 'a':
case 'n':
case 'p':
case 'q':
return null;
case 'b':
case 'c':
case 'x':
if (this.monomerIndex == 0 || this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var ptCa = this.getLeadAtom ();
var ptCaNext = this.bioPolymer.getLeadPoint (this.monomerIndex + 1);
var ptCaPrev = this.bioPolymer.getLeadPoint (this.monomerIndex - 1);
vA.sub2 (ptCaNext, ptCa);
vB.sub2 (ptCaPrev, ptCa);
break;
}
return org.jmol.util.Quaternion.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
Clazz.defineStatics (c$,
"alphaOffsets", [0]);
});
// 
//// org\jmol\modelsetbio\ProteinStructure.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.util.Vector3f"], "org.jmol.modelsetbio.ProteinStructure", ["org.jmol.util.ArrayUtil", "$.Logger", "$.Point3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.apolymer = null;
this.type = null;
this.subtype = null;
this.monomerIndexFirst = 0;
this.monomerIndexLast = 0;
this.monomerCount = 0;
this.axisA = null;
this.axisB = null;
this.axisUnitVector = null;
this.vectorProjection = null;
this.segments = null;
this.strucNo = 0;
this.structureID = null;
this.serialID = 0;
this.strandCount = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "ProteinStructure");
Clazz.prepareFields (c$, function () {
this.vectorProjection =  new org.jmol.util.Vector3f ();
});
Clazz.makeConstructor (c$, 
function (apolymer, type, monomerIndex, monomerCount) {
this.strucNo = ($t$ = ++ org.jmol.modelsetbio.ProteinStructure.globalStrucNo, org.jmol.modelsetbio.ProteinStructure.prototype.globalStrucNo = org.jmol.modelsetbio.ProteinStructure.globalStrucNo, $t$);
this.apolymer = apolymer;
this.type = type;
this.monomerIndexFirst = monomerIndex;
this.addMonomer (monomerIndex + monomerCount - 1);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("Creating ProteinStructure " + this.strucNo + " " + type.getBioStructureTypeName (false) + " from " + this.monomerIndexFirst + " through " + this.monomerIndexLast + " in polymer " + apolymer);
}, "org.jmol.modelsetbio.AlphaPolymer,org.jmol.constant.EnumStructure,~N,~N");
Clazz.defineMethod (c$, "addMonomer", 
function (index) {
this.monomerIndexFirst = Math.min (this.monomerIndexFirst, index);
this.monomerIndexLast = Math.max (this.monomerIndexLast, index);
this.monomerCount = this.monomerIndexLast - this.monomerIndexFirst + 1;
}, "~N");
Clazz.defineMethod (c$, "removeMonomer", 
function (monomerIndex) {
if (monomerIndex > this.monomerIndexLast || monomerIndex < this.monomerIndexFirst) return 0;
var ret = this.monomerIndexLast - monomerIndex;
this.monomerIndexLast = Math.max (this.monomerIndexFirst, monomerIndex) - 1;
this.monomerCount = this.monomerIndexLast - this.monomerIndexFirst + 1;
return ret;
}, "~N");
Clazz.defineMethod (c$, "calcAxis", 
function () {
});
Clazz.defineMethod (c$, "calcSegments", 
function () {
if (this.segments != null) return;
this.calcAxis ();
this.segments =  new Array (this.monomerCount + 1);
this.segments[this.monomerCount] = this.axisB;
this.segments[0] = this.axisA;
var axis = org.jmol.util.Vector3f.newV (this.axisUnitVector);
axis.scale (this.axisB.distance (this.axisA) / this.monomerCount);
for (var i = 1; i < this.monomerCount; i++) {
var point = this.segments[i] =  new org.jmol.util.Point3f ();
point.setT (this.segments[i - 1]);
point.add (axis);
}
});
Clazz.defineMethod (c$, "lowerNeighborIsHelixOrSheet", 
function () {
if (this.monomerIndexFirst == 0) return false;
return this.apolymer.monomers[this.monomerIndexFirst - 1].isHelix () || this.apolymer.monomers[this.monomerIndexFirst - 1].isSheet ();
});
Clazz.defineMethod (c$, "upperNeighborIsHelixOrSheet", 
function () {
var upperNeighborIndex = this.monomerIndexFirst + this.monomerCount;
if (upperNeighborIndex == this.apolymer.monomerCount) return false;
return this.apolymer.monomers[upperNeighborIndex].isHelix () || this.apolymer.monomers[upperNeighborIndex].isSheet ();
});
Clazz.defineMethod (c$, "getMonomerCount", 
function () {
return this.monomerCount;
});
Clazz.defineMethod (c$, "isWithin", 
function (monomerIndex) {
return (monomerIndex > this.monomerIndexFirst && monomerIndex < this.monomerIndexLast);
}, "~N");
Clazz.defineMethod (c$, "getMonomerIndex", 
function () {
return this.monomerIndexFirst;
});
Clazz.defineMethod (c$, "getIndex", 
function (monomer) {
var monomers = this.apolymer.monomers;
var i;
for (i = this.monomerCount; --i >= 0; ) if (monomers[this.monomerIndexFirst + i] === monomer) break;

return i;
}, "org.jmol.modelsetbio.Monomer");
Clazz.defineMethod (c$, "getSegments", 
function () {
if (this.segments == null) this.calcSegments ();
return this.segments;
});
Clazz.defineMethod (c$, "getAxisStartPoint", 
function () {
this.calcAxis ();
return this.axisA;
});
Clazz.defineMethod (c$, "getAxisEndPoint", 
function () {
this.calcAxis ();
return this.axisB;
});
Clazz.defineMethod (c$, "getStructureMidPoint", 
function (index) {
if (this.segments == null) this.calcSegments ();
return this.segments[index];
}, "~N");
Clazz.defineMethod (c$, "getInfo", 
function (info) {
info.put ("type", this.type.getBioStructureTypeName (false));
var leadAtomIndices = this.apolymer.getLeadAtomIndices ();
var iArray = org.jmol.util.ArrayUtil.arrayCopyRangeI (leadAtomIndices, this.monomerIndexFirst, this.monomerIndexFirst + this.monomerCount);
info.put ("leadAtomIndices", iArray);
this.calcAxis ();
if (this.axisA == null) return;
info.put ("axisA", this.axisA);
info.put ("axisB", this.axisB);
info.put ("axisUnitVector", this.axisUnitVector);
}, "java.util.Map");
Clazz.defineMethod (c$, "resetAxes", 
function () {
this.axisA = null;
this.segments = null;
});
Clazz.defineStatics (c$,
"globalStrucNo", 1000);
});
// 
//// org\jmol\modelsetbio\Helix.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.ProteinStructure"], "org.jmol.modelsetbio.Helix", ["org.jmol.constant.EnumStructure", "org.jmol.util.Measure", "$.Point3f", "$.Vector3f"], function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "Helix", org.jmol.modelsetbio.ProteinStructure);
Clazz.makeConstructor (c$, 
function (apolymer, monomerIndex, monomerCount, subtype) {
Clazz.superConstructor (this, org.jmol.modelsetbio.Helix, [apolymer, org.jmol.constant.EnumStructure.HELIX, monomerIndex, monomerCount]);
this.subtype = subtype;
}, "org.jmol.modelsetbio.AlphaPolymer,~N,~N,org.jmol.constant.EnumStructure");
Clazz.overrideMethod (c$, "calcAxis", 
function () {
if (this.axisA != null) return;
var points =  new Array (this.monomerCount + 1);
for (var i = 0; i <= this.monomerCount; i++) {
points[i] =  new org.jmol.util.Point3f ();
this.apolymer.getLeadMidPoint (this.monomerIndexFirst + i, points[i]);
}
this.axisA =  new org.jmol.util.Point3f ();
this.axisUnitVector =  new org.jmol.util.Vector3f ();
org.jmol.util.Measure.calcBestAxisThroughPoints (points, this.axisA, this.axisUnitVector, this.vectorProjection, 4);
this.axisB = org.jmol.util.Point3f.newP (points[this.monomerCount]);
org.jmol.util.Measure.projectOntoAxis (this.axisB, this.axisA, this.axisUnitVector, this.vectorProjection);
});
});
// 
//// org\jmol\modelsetbio\Sheet.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.ProteinStructure"], "org.jmol.modelsetbio.Sheet", ["org.jmol.constant.EnumStructure", "org.jmol.util.Measure", "$.Point3f", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.alphaPolymer = null;
this.widthUnitVector = null;
this.heightUnitVector = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "Sheet", org.jmol.modelsetbio.ProteinStructure);
Clazz.makeConstructor (c$, 
function (alphaPolymer, monomerIndex, monomerCount, subtype) {
Clazz.superConstructor (this, org.jmol.modelsetbio.Sheet, [alphaPolymer, org.jmol.constant.EnumStructure.SHEET, monomerIndex, monomerCount]);
this.alphaPolymer = alphaPolymer;
this.subtype = subtype;
}, "org.jmol.modelsetbio.AlphaPolymer,~N,~N,org.jmol.constant.EnumStructure");
Clazz.overrideMethod (c$, "calcAxis", 
function () {
if (this.axisA != null) return;
if (this.monomerCount == 2) {
this.axisA = this.alphaPolymer.getLeadPoint (this.monomerIndexFirst);
this.axisB = this.alphaPolymer.getLeadPoint (this.monomerIndexFirst + 1);
} else {
this.axisA =  new org.jmol.util.Point3f ();
this.alphaPolymer.getLeadMidPoint (this.monomerIndexFirst + 1, this.axisA);
this.axisB =  new org.jmol.util.Point3f ();
this.alphaPolymer.getLeadMidPoint (this.monomerIndexFirst + this.monomerCount - 1, this.axisB);
}this.axisUnitVector =  new org.jmol.util.Vector3f ();
this.axisUnitVector.sub2 (this.axisB, this.axisA);
this.axisUnitVector.normalize ();
var tempA =  new org.jmol.util.Point3f ();
this.alphaPolymer.getLeadMidPoint (this.monomerIndexFirst, tempA);
if (this.lowerNeighborIsHelixOrSheet ()) {
} else {
org.jmol.util.Measure.projectOntoAxis (tempA, this.axisA, this.axisUnitVector, this.vectorProjection);
}var tempB =  new org.jmol.util.Point3f ();
this.alphaPolymer.getLeadMidPoint (this.monomerIndexFirst + this.monomerCount, tempB);
if (this.upperNeighborIsHelixOrSheet ()) {
} else {
org.jmol.util.Measure.projectOntoAxis (tempB, this.axisA, this.axisUnitVector, this.vectorProjection);
}this.axisA = tempA;
this.axisB = tempB;
});
Clazz.defineMethod (c$, "calcSheetUnitVectors", 
function () {
if (!(Clazz.instanceOf (this.alphaPolymer, org.jmol.modelsetbio.AminoPolymer))) return;
if (this.widthUnitVector == null) {
var vectorCO =  new org.jmol.util.Vector3f ();
var vectorCOSum =  new org.jmol.util.Vector3f ();
var amino = this.alphaPolymer.monomers[this.monomerIndexFirst];
vectorCOSum.sub2 (amino.getCarbonylOxygenAtom (), amino.getCarbonylCarbonAtom ());
for (var i = this.monomerCount; --i > this.monomerIndexFirst; ) {
amino = this.alphaPolymer.monomers[i];
vectorCO.sub2 (amino.getCarbonylOxygenAtom (), amino.getCarbonylCarbonAtom ());
if (vectorCOSum.angle (vectorCO) < 1.5707964) vectorCOSum.add (vectorCO);
 else vectorCOSum.sub (vectorCO);
}
this.heightUnitVector = vectorCO;
this.heightUnitVector.cross (this.axisUnitVector, vectorCOSum);
this.heightUnitVector.normalize ();
this.widthUnitVector = vectorCOSum;
this.widthUnitVector.cross (this.axisUnitVector, this.heightUnitVector);
}});
Clazz.defineMethod (c$, "getWidthUnitVector", 
function () {
if (this.widthUnitVector == null) this.calcSheetUnitVectors ();
return this.widthUnitVector;
});
Clazz.defineMethod (c$, "getHeightUnitVector", 
function () {
if (this.heightUnitVector == null) this.calcSheetUnitVectors ();
return this.heightUnitVector;
});
});
// 
//// org\jmol\modelsetbio\Turn.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.ProteinStructure"], "org.jmol.modelsetbio.Turn", ["org.jmol.constant.EnumStructure"], function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "Turn", org.jmol.modelsetbio.ProteinStructure);
Clazz.makeConstructor (c$, 
function (apolymer, monomerIndex, monomerCount) {
Clazz.superConstructor (this, org.jmol.modelsetbio.Turn, [apolymer, org.jmol.constant.EnumStructure.TURN, monomerIndex, monomerCount]);
this.subtype = org.jmol.constant.EnumStructure.TURN;
}, "org.jmol.modelsetbio.AlphaPolymer,~N,~N");
});
// 
//// org\jmol\modelsetbio\BioPolymer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.util.Vector3f"], "org.jmol.modelsetbio.BioPolymer", ["java.lang.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.modelset.LabelToken", "org.jmol.util.BitSet", "$.Escape", "$.Logger", "$.Point3f", "$.Quaternion", "$.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.monomers = null;
this.model = null;
this.leadMidpoints = null;
this.leadPoints = null;
this.controlPoints = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.type = 0;
this.bioPolymerIndexInModel = 0;
this.monomerCount = 0;
this.invalidLead = false;
this.invalidControl = false;
this.sheetSmoothing = 0;
this.hasWingPoints = false;
this.unitVectorX = null;
this.selectedMonomerCount = 0;
this.bsSelectedMonomers = null;
this.haveParameters = false;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "BioPolymer");
Clazz.prepareFields (c$, function () {
this.unitVectorX = org.jmol.util.Vector3f.new3 (1, 0, 0);
});
Clazz.defineMethod (c$, "getGroups", 
function () {
return this.monomers;
});
Clazz.makeConstructor (c$, 
function (monomers) {
this.monomers = monomers;
this.monomerCount = monomers.length;
for (var i = this.monomerCount; --i >= 0; ) monomers[i].setBioPolymer (this, i);

this.model = monomers[0].getModel ();
}, "~A");
Clazz.defineMethod (c$, "getRange", 
function (bs) {
if (this.monomerCount == 0) return;
bs.setBits (this.monomers[0].firstAtomIndex, this.monomers[this.monomerCount - 1].lastAtomIndex + 1);
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "clearStructures", 
function () {
for (var i = 0; i < this.monomerCount; i++) this.monomers[i].setStructure (null);

});
Clazz.defineMethod (c$, "removeProteinStructure", 
function (monomerIndex, count) {
var m = this.monomers[monomerIndex];
var type = m.getProteinStructureType ();
var mLast = -1;
for (var i = 0, pt = monomerIndex; i < count && pt < this.monomerCount; i++, pt++) {
this.monomers[pt].setStructure (null);
mLast = this.monomers[pt].setProteinStructureType (type, mLast);
}
}, "~N,~N");
Clazz.defineMethod (c$, "getLeadAtomIndices", 
function () {
if (this.leadAtomIndices == null) {
this.leadAtomIndices =  Clazz.newIntArray (this.monomerCount, 0);
this.invalidLead = true;
}if (this.invalidLead) {
for (var i = this.monomerCount; --i >= 0; ) this.leadAtomIndices[i] = this.monomers[i].leadAtomIndex;

this.invalidLead = false;
}return this.leadAtomIndices;
});
Clazz.defineMethod (c$, "getIndex", 
function (chainID, seqcode) {
var i;
for (i = this.monomerCount; --i >= 0; ) if (this.monomers[i].getChainID () == chainID) if (this.monomers[i].getSeqcode () == seqcode) break;

return i;
}, "~S,~N");
Clazz.defineMethod (c$, "getLeadPoint", 
function (monomerIndex) {
return this.monomers[monomerIndex].getLeadAtom ();
}, "~N");
Clazz.defineMethod (c$, "getInitiatorPoint", 
($fz = function () {
return this.monomers[0].getInitiatorAtom ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getTerminatorPoint", 
($fz = function () {
return this.monomers[this.monomerCount - 1].getTerminatorAtom ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getLeadMidPoint", 
function (groupIndex, midPoint) {
if (groupIndex == this.monomerCount) {
--groupIndex;
} else if (groupIndex > 0) {
midPoint.setT (this.getLeadPoint (groupIndex));
midPoint.add (this.getLeadPoint (groupIndex - 1));
midPoint.scale (0.5);
return;
}midPoint.setT (this.getLeadPoint (groupIndex));
}, "~N,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "getWingPoint", 
function (polymerIndex) {
return this.monomers[polymerIndex].getWingAtom ();
}, "~N");
Clazz.defineMethod (c$, "getConformation", 
function (bsConformation, conformationIndex) {
var atoms = this.model.getModelSet ().atoms;
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].getConformation (atoms, bsConformation, conformationIndex);

this.recalculateLeadMidpointsAndWingVectors ();
}, "org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "setConformation", 
function (bsSelected) {
var atoms = this.model.getModelSet ().atoms;
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].updateOffsetsForAlternativeLocations (atoms, bsSelected);

this.recalculateLeadMidpointsAndWingVectors ();
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
this.invalidLead = this.invalidControl = true;
this.getLeadAtomIndices ();
this.resetHydrogenPoints ();
this.calcLeadMidpointsAndWingVectors ();
});
Clazz.defineMethod (c$, "resetHydrogenPoints", 
function () {
});
Clazz.defineMethod (c$, "getLeadMidpoints", 
function () {
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.leadMidpoints;
});
Clazz.defineMethod (c$, "getLeadPoints", 
function () {
if (this.leadPoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.leadPoints;
});
Clazz.defineMethod (c$, "getControlPoints", 
function (isTraceAlpha, sheetSmoothing, invalidate) {
if (invalidate) this.invalidControl = true;
return (!isTraceAlpha ? this.leadMidpoints : sheetSmoothing == 0 ? this.leadPoints : this.getControlPoints2 (sheetSmoothing));
}, "~B,~N,~B");
Clazz.defineMethod (c$, "getControlPoints2", 
($fz = function (sheetSmoothing) {
if (!this.invalidControl && sheetSmoothing == this.sheetSmoothing) return this.controlPoints;
this.getLeadPoints ();
var v =  new org.jmol.util.Vector3f ();
if (this.controlPoints == null) this.controlPoints =  new Array (this.monomerCount + 1);
if (!Float.isNaN (sheetSmoothing)) this.sheetSmoothing = sheetSmoothing;
for (var i = 0; i < this.monomerCount; i++) this.controlPoints[i] = this.getControlPoint (i, v);

this.controlPoints[this.monomerCount] = this.getTerminatorPoint ();
this.invalidControl = false;
return this.controlPoints;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getControlPoint", 
function (i, v) {
return this.leadPoints[i];
}, "~N,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "getWingVectors", 
function () {
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors ();
return this.wingVectors;
});
Clazz.defineMethod (c$, "calcLeadMidpointsAndWingVectors", 
($fz = function () {
if (this.leadMidpoints == null) {
this.leadMidpoints =  new Array (this.monomerCount + 1);
this.leadPoints =  new Array (this.monomerCount + 1);
this.wingVectors =  new Array (this.monomerCount + 1);
this.sheetSmoothing = 1.4E-45;
}var vectorA =  new org.jmol.util.Vector3f ();
var vectorB =  new org.jmol.util.Vector3f ();
var vectorC =  new org.jmol.util.Vector3f ();
var vectorD =  new org.jmol.util.Vector3f ();
var leadPointPrev;
var leadPoint;
this.leadMidpoints[0] = this.getInitiatorPoint ();
this.leadPoints[0] = leadPoint = this.getLeadPoint (0);
var previousVectorD = null;
for (var i = 1; i < this.monomerCount; ++i) {
leadPointPrev = leadPoint;
this.leadPoints[i] = leadPoint = this.getLeadPoint (i);
var midpoint = org.jmol.util.Point3f.newP (leadPoint);
midpoint.add (leadPointPrev);
midpoint.scale (0.5);
this.leadMidpoints[i] = midpoint;
if (this.hasWingPoints) {
vectorA.sub2 (leadPoint, leadPointPrev);
vectorB.sub2 (leadPointPrev, this.getWingPoint (i - 1));
vectorC.cross (vectorA, vectorB);
vectorD.cross (vectorA, vectorC);
vectorD.normalize ();
if (previousVectorD != null && previousVectorD.angle (vectorD) > 1.5707963267948966) vectorD.scale (-1);
previousVectorD = this.wingVectors[i] = org.jmol.util.Vector3f.newV (vectorD);
}}
this.leadPoints[this.monomerCount] = this.leadMidpoints[this.monomerCount] = this.getTerminatorPoint ();
if (!this.hasWingPoints) {
if (this.monomerCount < 3) {
this.wingVectors[1] = this.unitVectorX;
} else {
var previousVectorC = null;
for (var i = 1; i < this.monomerCount; ++i) {
vectorA.sub2 (this.leadMidpoints[i], this.leadPoints[i]);
vectorB.sub2 (this.leadPoints[i], this.leadMidpoints[i + 1]);
vectorC.cross (vectorA, vectorB);
vectorC.normalize ();
if (previousVectorC != null && previousVectorC.angle (vectorC) > 1.5707963267948966) vectorC.scale (-1);
previousVectorC = this.wingVectors[i] = org.jmol.util.Vector3f.newV (vectorC);
}
}}this.wingVectors[0] = this.wingVectors[1];
this.wingVectors[this.monomerCount] = this.wingVectors[this.monomerCount - 1];
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, mads, myVisibilityFlag, bsNot) {
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & myVisibilityFlag) == 0) continue;
var a = this.monomers[i].getLeadAtom ();
if (!a.isVisible (0) || bsNot != null && bsNot.get (a.index)) continue;
if (mads[i] > 0 || mads[i + 1] > 0) this.monomers[i].findNearestAtomIndex (xMouse, yMouse, closest, mads[i], mads[i + 1]);
}
}, "~N,~N,~A,~A,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getSelectedMonomerCount", 
function () {
return this.selectedMonomerCount;
});
Clazz.defineMethod (c$, "calcSelectedMonomersCount", 
function (bsSelected) {
this.selectedMonomerCount = 0;
if (this.bsSelectedMonomers == null) this.bsSelectedMonomers =  new org.jmol.util.BitSet ();
this.bsSelectedMonomers.clearAll ();
for (var i = 0; i < this.monomerCount; i++) {
if (this.monomers[i].isSelected (bsSelected)) {
++this.selectedMonomerCount;
this.bsSelectedMonomers.set (i);
}}
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "isMonomerSelected", 
function (i) {
return (i >= 0 && this.bsSelectedMonomers.get (i));
}, "~N");
Clazz.defineMethod (c$, "getPolymerPointsAndVectors", 
function (last, bs, vList, isTraceAlpha, sheetSmoothing) {
var points = this.getControlPoints (isTraceAlpha, sheetSmoothing, false);
var vectors = this.getWingVectors ();
var count = this.monomerCount;
for (var j = 0; j < count; j++) if (bs.get (this.monomers[j].leadAtomIndex)) {
vList.add ([points[j], org.jmol.util.Point3f.newP (vectors[j])]);
last = j;
} else if (last != 2147483646) {
vList.add ([points[j], org.jmol.util.Point3f.newP (vectors[j])]);
last = 2147483646;
}
if (last + 1 < count) vList.add ([points[last + 1], org.jmol.util.Point3f.newP (vectors[last + 1])]);
return last;
}, "~N,org.jmol.util.BitSet,java.util.List,~B,~N");
Clazz.defineMethod (c$, "getSequence", 
function () {
var buf =  Clazz.newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount; i++) buf[i] = this.monomers[i].getGroup1 ();

return String.valueOf (buf);
});
Clazz.defineMethod (c$, "getPolymerInfo", 
function (bs) {
var returnInfo =  new java.util.Hashtable ();
var info =  new java.util.ArrayList ();
var structureInfo = null;
var ps;
var psLast = null;
var n = 0;
for (var i = 0; i < this.monomerCount; i++) {
if (bs.get (this.monomers[i].leadAtomIndex)) {
var monomerInfo = this.monomers[i].getMyInfo ();
monomerInfo.put ("monomerIndex", Integer.$valueOf (i));
info.add (monomerInfo);
if ((ps = this.getProteinStructure (i)) != null && ps !== psLast) {
var psInfo =  new java.util.Hashtable ();
(psLast = ps).getInfo (psInfo);
if (structureInfo == null) {
structureInfo =  new java.util.ArrayList ();
}psInfo.put ("index", Integer.$valueOf (n++));
structureInfo.add (psInfo);
}}}
if (info.size () > 0) {
returnInfo.put ("sequence", this.getSequence ());
returnInfo.put ("monomers", info);
if (structureInfo != null) returnInfo.put ("structures", structureInfo);
}return returnInfo;
}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getPolymerSequenceAtoms", 
function (group1, nGroups, bsInclude, bsResult) {
for (var i = Math.min (this.monomerCount, group1 + nGroups); --i >= group1; ) this.monomers[i].getMonomerSequenceAtoms (bsInclude, bsResult);

}, "~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getProteinStructure", 
function (monomerIndex) {
return this.monomers[monomerIndex].getProteinStructure ();
}, "~N");
Clazz.defineMethod (c$, "calcParameters", 
function () {
this.haveParameters = true;
return this.calcEtaThetaAngles () || this.calcPhiPsiAngles ();
});
Clazz.defineMethod (c$, "calcEtaThetaAngles", 
function () {
return false;
});
Clazz.defineMethod (c$, "calcPhiPsiAngles", 
function () {
return false;
});
c$.getPdbData = Clazz.defineMethod (c$, "getPdbData", 
function (viewer, p, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
var calcRamachandranStraightness = (qtype == 'C' || qtype == 'P');
var isRamachandran = (ctype == 'R' || ctype == 'S' && calcRamachandranStraightness);
if (isRamachandran && !p.calcPhiPsiAngles ()) return;
var isAmino = (Clazz.instanceOf (p, org.jmol.modelsetbio.AminoPolymer));
var isRelativeAlias = (ctype == 'r');
var quaternionStraightness = (!isRamachandran && ctype == 'S');
if (derivType == 2 && isRelativeAlias) ctype = 'w';
if (quaternionStraightness) derivType = 2;
var useQuaternionStraightness = (ctype == 'S');
var writeRamachandranStraightness = ("rcpCP".indexOf (qtype) >= 0);
if (org.jmol.util.Logger.debugging && (quaternionStraightness || calcRamachandranStraightness)) {
org.jmol.util.Logger.debug ("For straightness calculation: useQuaternionStraightness = " + useQuaternionStraightness + " and quaternionFrame = " + qtype);
}if (addHeader && !isDraw) {
pdbATOM.append ("REMARK   6    AT GRP CH RESNO  ");
switch (ctype) {
default:
case 'w':
pdbATOM.append ("x*10___ y*10___ z*10___      w*10__       ");
break;
case 'x':
pdbATOM.append ("y*10___ z*10___ w*10___      x*10__       ");
break;
case 'y':
pdbATOM.append ("z*10___ w*10___ x*10___      y*10__       ");
break;
case 'z':
pdbATOM.append ("w*10___ x*10___ y*10___      z*10__       ");
break;
case 'R':
if (writeRamachandranStraightness) pdbATOM.append ("phi____ psi____ theta         Straightness");
 else pdbATOM.append ("phi____ psi____ omega-180    PartialCharge");
break;
}
pdbATOM.append ("    Sym   q0_______ q1_______ q2_______ q3_______");
pdbATOM.append ("  theta_  aaX_______ aaY_______ aaZ_______");
if (ctype != 'R') pdbATOM.append ("  centerX___ centerY___ centerZ___");
if (qtype == 'n') pdbATOM.append ("  NHX_______ NHY_______ NHZ_______");
pdbATOM.append ("\n\n");
}var factor = (ctype == 'R' ? 1 : 10);
bothEnds = false;
for (var j = 0; j < (bothEnds ? 2 : 1); j++, factor *= -1) for (var i = 0; i < (mStep < 1 ? 1 : mStep); i++) org.jmol.modelsetbio.BioPolymer.getData (viewer, i, mStep, p, ctype, qtype, derivType, bsAtoms, bsSelected, isDraw, isRamachandran, calcRamachandranStraightness, useQuaternionStraightness, writeRamachandranStraightness, quaternionStraightness, factor, isAmino, isRelativeAlias, tokens, pdbATOM, pdbCONECT, bsWritten);


}, "org.jmol.viewer.Viewer,org.jmol.modelsetbio.BioPolymer,~S,~S,~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~B,~A,org.jmol.io.OutputStringBuilder,org.jmol.util.StringXBuilder,org.jmol.util.BitSet");
c$.getData = Clazz.defineMethod (c$, "getData", 
($fz = function (viewer, m0, mStep, p, ctype, qtype, derivType, bsAtoms, bsSelected, isDraw, isRamachandran, calcRamachandranStraightness, useQuaternionStraightness, writeRamachandranStraightness, quaternionStraightness, factor, isAmino, isRelativeAlias, tokens, pdbATOM, pdbCONECT, bsWritten) {
var prefix = (derivType > 0 ? "dq" + (derivType == 2 ? "2" : "") : "q");
var q;
var aprev = null;
var qprev = null;
var dq = null;
var dqprev = null;
var qref = null;
var atomLast = null;
var x = 0;
var y = 0;
var z = 0;
var w = 0;
var strExtra = "";
var val1 = NaN;
var val2 = NaN;
var pt = (isDraw ?  new org.jmol.util.Point3f () : null);
var dm = (mStep <= 1 ? 1 : mStep);
for (var m = m0; m < p.monomerCount; m += dm) {
var monomer = p.monomers[m];
if (bsAtoms == null || bsAtoms.get (monomer.leadAtomIndex)) {
var a = monomer.getLeadAtom ();
var id = monomer.getUniqueID ();
if (isRamachandran) {
if (ctype == 'S') monomer.setGroupParameter (1112539148, NaN);
x = monomer.getGroupParameter (1112539143);
y = monomer.getGroupParameter (1112539144);
z = monomer.getGroupParameter (1112539142);
if (z < -90) z += 360;
z -= 180;
if (Float.isNaN (x) || Float.isNaN (y) || Float.isNaN (z)) {
if (bsAtoms != null) bsAtoms.clear (a.getIndex ());
continue;
}var angledeg = (writeRamachandranStraightness ? p.calculateRamachandranHelixAngle (m, qtype) : 0);
var straightness = (calcRamachandranStraightness || writeRamachandranStraightness ? org.jmol.modelsetbio.BioPolymer.getStraightness (Math.cos (angledeg / 2 / 180 * 3.141592653589793)) : 0);
if (ctype == 'S') {
monomer.setGroupParameter (1112539148, straightness);
continue;
}if (isDraw) {
if (bsSelected != null && !bsSelected.get (a.getIndex ())) continue;
var aa = monomer;
pt.set (-x, x, 0.5);
pdbATOM.append ("draw ID \"phi").append (id).append ("\" ARROW ARC ").append (org.jmol.util.Escape.escapePt (aa.getNitrogenAtom ())).append (org.jmol.util.Escape.escapePt (a)).append (org.jmol.util.Escape.escapePt (aa.getCarbonylCarbonAtom ())).append (org.jmol.util.Escape.escapePt (pt)).append (" \"phi = ").append (String.valueOf (Math.round (x))).append ("\" color ").append (org.jmol.modelsetbio.BioPolymer.qColor[2]).append ("\n");
pt.set (0, y, 0.5);
pdbATOM.append ("draw ID \"psi").append (id).append ("\" ARROW ARC ").append (org.jmol.util.Escape.escapePt (a)).append (org.jmol.util.Escape.escapePt (aa.getCarbonylCarbonAtom ())).append (org.jmol.util.Escape.escapePt (aa.getNitrogenAtom ())).append (org.jmol.util.Escape.escapePt (pt)).append (" \"psi = ").append (String.valueOf (Math.round (y))).append ("\" color ").append (org.jmol.modelsetbio.BioPolymer.qColor[1]).append ("\n");
pdbATOM.append ("draw ID \"planeNCC").append (id).append ("\" ").append (org.jmol.util.Escape.escapePt (aa.getNitrogenAtom ())).append (org.jmol.util.Escape.escapePt (a)).append (org.jmol.util.Escape.escapePt (aa.getCarbonylCarbonAtom ())).append (" color ").append (org.jmol.modelsetbio.BioPolymer.qColor[0]).append ("\n");
pdbATOM.append ("draw ID \"planeCNC").append (id).append ("\" ").append (org.jmol.util.Escape.escapePt ((p.monomers[m - 1]).getCarbonylCarbonAtom ())).append (org.jmol.util.Escape.escapePt (aa.getNitrogenAtom ())).append (org.jmol.util.Escape.escapePt (a)).append (" color ").append (org.jmol.modelsetbio.BioPolymer.qColor[1]).append ("\n");
pdbATOM.append ("draw ID \"planeCCN").append (id).append ("\" ").append (org.jmol.util.Escape.escapePt (a)).append (org.jmol.util.Escape.escapePt (aa.getCarbonylCarbonAtom ())).append (org.jmol.util.Escape.escapePt ((p.monomers[m + 1]).getNitrogenAtom ())).append (" color ").append (org.jmol.modelsetbio.BioPolymer.qColor[2]).append ("\n");
continue;
}if (Float.isNaN (angledeg)) {
strExtra = "";
if (writeRamachandranStraightness) continue;
} else {
q = org.jmol.util.Quaternion.newVA (org.jmol.util.Point3f.new3 (1, 0, 0), angledeg);
strExtra = q.getInfo ();
if (writeRamachandranStraightness) {
z = angledeg;
w = straightness;
} else {
w = a.getPartialCharge ();
}}} else {
q = monomer.getQuaternion (qtype);
if (q != null) {
q.setRef (qref);
qref = org.jmol.util.Quaternion.newQ (q);
}if (derivType == 2) monomer.setGroupParameter (1112539148, NaN);
if (q == null) {
qprev = null;
qref = null;
} else if (derivType > 0) {
var anext = a;
var qnext = q;
if (qprev == null) {
q = null;
dqprev = null;
} else {
if (isRelativeAlias) {
dq = qprev.leftDifference (q);
} else {
dq = q.rightDifference (qprev);
}if (derivType == 1) {
q = dq;
} else if (dqprev == null) {
q = null;
} else {
q = dq.rightDifference (dqprev);
val1 = org.jmol.modelsetbio.BioPolymer.getQuaternionStraightness (id, dqprev, dq);
val2 = org.jmol.modelsetbio.BioPolymer.get3DStraightness (id, dqprev, dq);
aprev.getGroup ().setGroupParameter (1112539148, useQuaternionStraightness ? val1 : val2);
}dqprev = dq;
}aprev = anext;
qprev = qnext;
}if (q == null) {
atomLast = null;
continue;
}switch (ctype) {
default:
x = q.q1;
y = q.q2;
z = q.q3;
w = q.q0;
break;
case 'x':
x = q.q0;
y = q.q1;
z = q.q2;
w = q.q3;
break;
case 'y':
x = q.q3;
y = q.q0;
z = q.q1;
w = q.q2;
break;
case 'z':
x = q.q2;
y = q.q3;
z = q.q0;
w = q.q1;
break;
}
var ptCenter = monomer.getQuaternionFrameCenter (qtype);
if (ptCenter == null) ptCenter =  new org.jmol.util.Point3f ();
if (isDraw) {
if (bsSelected != null && !bsSelected.get (a.getIndex ())) continue;
var deg = Clazz.doubleToInt (Math.floor (Math.acos (w) * 360 / 3.141592653589793));
if (derivType == 0) {
pdbATOM.append (q.draw (prefix, id, ptCenter, 1));
if (qtype == 'n' && isAmino) {
var ptH = (monomer).getNitrogenHydrogenPoint ();
if (ptH != null) pdbATOM.append ("draw ID \"").append (prefix).append ("nh").append (id).append ("\" width 0.1 ").append (org.jmol.util.Escape.escapePt (ptH)).append ("\n");
}}if (derivType == 1) {
pdbATOM.append (monomer.getHelixData (135176, qtype, mStep)).append ("\n");
continue;
}pt.set (x * 2, y * 2, z * 2);
pdbATOM.append ("draw ID \"").append (prefix).append ("a").append (id).append ("\" VECTOR ").append (org.jmol.util.Escape.escapePt (ptCenter)).append (org.jmol.util.Escape.escapePt (pt)).append (" \">").append (String.valueOf (deg)).append ("\" color ").append (org.jmol.modelsetbio.BioPolymer.qColor[derivType]).append ("\n");
continue;
}strExtra = q.getInfo () + org.jmol.util.TextFormat.sprintf ("  %10.5p %10.5p %10.5p", "p", [ptCenter]);
if (qtype == 'n' && isAmino) {
strExtra += org.jmol.util.TextFormat.sprintf ("  %10.5p %10.5p %10.5p", "p", [(monomer).getNitrogenHydrogenPoint ()]);
} else if (derivType == 2 && !Float.isNaN (val1)) {
strExtra += org.jmol.util.TextFormat.sprintf (" %10.5f %10.5f", "F", [[val1, val2]]);
}}if (pdbATOM == null) continue;
bsWritten.set ((a.getGroup ()).leadAtomIndex);
pdbATOM.append (org.jmol.modelset.LabelToken.formatLabelAtomArray (viewer, a, tokens, '\0', null));
pdbATOM.append (org.jmol.util.TextFormat.sprintf ("%8.2f%8.2f%8.2f      %6.3f          %2s    %s\n", "ssF", [a.getElementSymbolIso (false).toUpperCase (), strExtra, [x * factor, y * factor, z * factor, w * factor]]));
if (atomLast != null && atomLast.getPolymerIndexInModel () == a.getPolymerIndexInModel ()) {
pdbCONECT.append ("CONECT").append (org.jmol.util.TextFormat.formatStringI ("%5i", "i", atomLast.getAtomNumber ())).append (org.jmol.util.TextFormat.formatStringI ("%5i", "i", a.getAtomNumber ())).appendC ('\n');
}atomLast = a;
}}
}, $fz.isPrivate = true, $fz), "org.jmol.viewer.Viewer,~N,~N,org.jmol.modelsetbio.BioPolymer,~S,~S,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~B,~B,~B,~B,~N,~B,~B,~A,org.jmol.io.OutputStringBuilder,org.jmol.util.StringXBuilder,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "calculateRamachandranHelixAngle", 
function (m, qtype) {
return NaN;
}, "~N,~S");
c$.get3DStraightness = Clazz.defineMethod (c$, "get3DStraightness", 
($fz = function (id, dq, dqnext) {
return dq.getNormal ().dot (dqnext.getNormal ());
}, $fz.isPrivate = true, $fz), "~S,org.jmol.util.Quaternion,org.jmol.util.Quaternion");
c$.getQuaternionStraightness = Clazz.defineMethod (c$, "getQuaternionStraightness", 
($fz = function (id, dq, dqnext) {
return org.jmol.modelsetbio.BioPolymer.getStraightness (dq.dot (dqnext));
}, $fz.isPrivate = true, $fz), "~S,org.jmol.util.Quaternion,org.jmol.util.Quaternion");
c$.getStraightness = Clazz.defineMethod (c$, "getStraightness", 
($fz = function (cosHalfTheta) {
return (1 - 2 * Math.acos (Math.abs (cosHalfTheta)) / 3.141592653589793);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "isDna", 
function () {
return (this.monomerCount > 0 && this.monomers[0].isDna ());
});
Clazz.defineMethod (c$, "isRna", 
function () {
return (this.monomerCount > 0 && this.monomers[0].isRna ());
});
Clazz.defineMethod (c$, "getRangeGroups", 
function (nResidues, bsAtoms, bsResult) {
var bsTemp =  new org.jmol.util.BitSet ();
for (var i = 0; i < this.monomerCount; i++) {
if (!this.monomers[i].isSelected (bsAtoms)) continue;
bsTemp.setBits (Math.max (0, i - nResidues), i + nResidues + 1);
i += nResidues - 1;
}
for (var i = bsTemp.nextSetBit (0); i >= 0 && i < this.monomerCount; i = bsTemp.nextSetBit (i + 1)) this.monomers[i].selectAtoms (bsResult);

}, "~N,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "calculateDssp", 
function (bioPolymers, bioPolymerCount, vHBonds, doReport, dsspIgnoreHydrogens, setStructure) {
return org.jmol.modelsetbio.AminoPolymer.calculateStructuresDssp (bioPolymers, bioPolymerCount, vHBonds, doReport, dsspIgnoreHydrogens, setStructure);
}, "~A,~N,java.util.List,~B,~B,~B");
Clazz.defineMethod (c$, "addStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode) {
}, "org.jmol.constant.EnumStructure,~S,~N,~N,~S,~N,~S,~N");
Clazz.defineMethod (c$, "calculateStructures", 
function (alphaOnly) {
}, "~B");
Clazz.defineMethod (c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
}, "org.jmol.modelsetbio.BioPolymer,org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~N,~A,~B,~B");
Clazz.defineMethod (c$, "setStructureList", 
function (structureList) {
}, "java.util.Map");
Clazz.defineMethod (c$, "getPdbData", 
function (viewer, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
return;
}, "org.jmol.viewer.Viewer,~S,~S,~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~B,~A,org.jmol.io.OutputStringBuilder,org.jmol.util.StringXBuilder,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "calculateStruts", 
function (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple) {
return null;
}, "org.jmol.modelset.ModelSet,org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~N,~N,~B");
Clazz.defineStatics (c$,
"TYPE_NOBONDING", 0,
"TYPE_AMINO", 1,
"TYPE_NUCLEIC", 2,
"TYPE_CARBOHYDRATE", 3,
"qColor", ["yellow", "orange", "purple"]);
});
// 
//// org\jmol\modelsetbio\AlphaPolymer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["java.lang.Enum", "org.jmol.modelsetbio.BioPolymer"], "org.jmol.modelsetbio.AlphaPolymer", ["java.util.ArrayList", "org.jmol.constant.EnumStructure", "org.jmol.modelsetbio.Helix", "$.Sheet", "$.Turn", "org.jmol.util.BitSet", "$.Logger", "$.Measure", "$.Point3f"], function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "AlphaPolymer", org.jmol.modelsetbio.BioPolymer);
Clazz.overrideMethod (c$, "getControlPoint", 
function (i, v) {
if (!this.monomers[i].isSheet ()) return this.leadPoints[i];
v.sub2 (this.leadMidpoints[i], this.leadPoints[i]);
v.scale (this.sheetSmoothing);
var pt = org.jmol.util.Point3f.newP (this.leadPoints[i]);
pt.add (v);
return pt;
}, "~N,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "getPdbData", 
function (viewer, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
org.jmol.modelsetbio.BioPolymer.getPdbData (viewer, this, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten);
}, "org.jmol.viewer.Viewer,~S,~S,~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~B,~A,org.jmol.io.OutputStringBuilder,org.jmol.util.StringXBuilder,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "addStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode) {
var indexStart;
var indexEnd;
if ((indexStart = this.getIndex (startChainID, startSeqcode)) == -1 || (indexEnd = this.getIndex (endChainID, endSeqcode)) == -1) return;
this.addStructureProtected (type, structureID, serialID, strandCount, indexStart, indexEnd);
}, "org.jmol.constant.EnumStructure,~S,~N,~N,~S,~N,~S,~N");
Clazz.defineMethod (c$, "addStructureProtected", 
function (type, structureID, serialID, strandCount, indexStart, indexEnd) {
if (indexEnd < indexStart) {
org.jmol.util.Logger.error ("AlphaPolymer:addSecondaryStructure error:  indexStart:" + indexStart + " indexEnd:" + indexEnd);
return;
}var structureCount = indexEnd - indexStart + 1;
var proteinstructure = null;
if (type == null) System.out.println ("alhapoly null type");
switch (type) {
case org.jmol.constant.EnumStructure.HELIX:
case org.jmol.constant.EnumStructure.HELIXALPHA:
case org.jmol.constant.EnumStructure.HELIX310:
case org.jmol.constant.EnumStructure.HELIXPI:
proteinstructure =  new org.jmol.modelsetbio.Helix (this, indexStart, structureCount, type);
break;
case org.jmol.constant.EnumStructure.SHEET:
proteinstructure =  new org.jmol.modelsetbio.Sheet (this, indexStart, structureCount, type);
break;
case org.jmol.constant.EnumStructure.TURN:
proteinstructure =  new org.jmol.modelsetbio.Turn (this, indexStart, structureCount);
break;
default:
org.jmol.util.Logger.error ("unrecognized secondary structure type");
return;
}
proteinstructure.structureID = structureID;
proteinstructure.serialID = serialID;
proteinstructure.strandCount = strandCount;
for (var i = indexStart; i <= indexEnd; ++i) this.monomers[i].setStructure (proteinstructure);

}, "org.jmol.constant.EnumStructure,~S,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "calculateStruts", 
function (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple) {
return this.calculateStrutsStatic (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple);
}, "org.jmol.modelset.ModelSet,org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~N,~N,~B");
Clazz.defineMethod (c$, "calculateStrutsStatic", 
($fz = function (modelSet, bs1, bs2, vCA, thresh, delta, allowMultiple) {
var vStruts =  new java.util.ArrayList ();
var thresh2 = thresh * thresh;
var n = vCA.size ();
var nEndMin = 3;
var bsStruts =  new org.jmol.util.BitSet ();
var bsNotAvailable =  new org.jmol.util.BitSet ();
var bsNearbyResidues =  new org.jmol.util.BitSet ();
var a1 = vCA.get (0);
var a2;
var nBiopolymers = modelSet.getBioPolymerCountInModel (a1.modelIndex);
var biopolymerStartsEnds =  Clazz.newIntArray (nBiopolymers, nEndMin * 2, 0);
for (var i = 0; i < n; i++) {
a1 = vCA.get (i);
var polymerIndex = a1.getPolymerIndexInModel ();
var monomerIndex = a1.getMonomerIndex ();
var bpt = monomerIndex;
if (bpt < nEndMin) biopolymerStartsEnds[polymerIndex][bpt] = i + 1;
bpt = (a1.getGroup ()).getBioPolymerLength () - monomerIndex - 1;
if (bpt < nEndMin) biopolymerStartsEnds[polymerIndex][nEndMin + bpt] = i + 1;
}
var d2 =  Clazz.newFloatArray (Clazz.doubleToInt (n * (n - 1) / 2), 0);
for (var i = 0; i < n; i++) {
a1 = vCA.get (i);
for (var j = i + 1; j < n; j++) {
var ipt = org.jmol.modelsetbio.AlphaPolymer.strutPoint (i, j, n);
a2 = vCA.get (j);
var resno1 = a1.getResno ();
var polymerIndex1 = a1.getPolymerIndexInModel ();
var resno2 = a2.getResno ();
var polymerIndex2 = a2.getPolymerIndexInModel ();
if (polymerIndex1 == polymerIndex2 && Math.abs (resno2 - resno1) < delta) bsNearbyResidues.set (ipt);
var d = d2[ipt] = a1.distanceSquared (a2);
if (d >= thresh2) bsNotAvailable.set (ipt);
}
}
for (var t = 5; --t >= 0; ) {
thresh2 = (thresh - t) * (thresh - t);
for (var i = 0; i < n; i++) if (allowMultiple || !bsStruts.get (i)) for (var j = i + 1; j < n; j++) {
var ipt = org.jmol.modelsetbio.AlphaPolymer.strutPoint (i, j, n);
if (!bsNotAvailable.get (ipt) && !bsNearbyResidues.get (ipt) && (allowMultiple || !bsStruts.get (j)) && d2[ipt] <= thresh2) org.jmol.modelsetbio.AlphaPolymer.setStrut (i, j, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
}

}
for (var b = 0; b < nBiopolymers; b++) {
for (var k = 0; k < nEndMin * 2; k++) {
var i = biopolymerStartsEnds[b][k] - 1;
if (i >= 0 && bsStruts.get (i)) {
for (var j = 0; j < nEndMin; j++) {
var pt = (Clazz.doubleToInt (k / nEndMin)) * nEndMin + j;
if ((i = biopolymerStartsEnds[b][pt] - 1) >= 0) bsStruts.set (i);
biopolymerStartsEnds[b][pt] = -1;
}
}}
if (biopolymerStartsEnds[b][0] == -1 && biopolymerStartsEnds[b][nEndMin] == -1) continue;
var okN = false;
var okC = false;
var iN = 0;
var jN = 0;
var iC = 0;
var jC = 0;
var minN = 3.4028235E38;
var minC = 3.4028235E38;
for (var j = 0; j < n; j++) for (var k = 0; k < nEndMin * 2; k++) {
var i = biopolymerStartsEnds[b][k] - 1;
if (i == -2) {
k = (Clazz.doubleToInt (k / nEndMin) + 1) * nEndMin - 1;
continue;
}if (j == i || i == -1) continue;
var ipt = org.jmol.modelsetbio.AlphaPolymer.strutPoint (i, j, n);
if (bsNearbyResidues.get (ipt) || d2[ipt] > (k < nEndMin ? minN : minC)) continue;
if (k < nEndMin) {
if (bsNotAvailable.get (ipt)) okN = true;
jN = j;
iN = i;
minN = d2[ipt];
} else {
if (bsNotAvailable.get (ipt)) okC = true;
jC = j;
iC = i;
minC = d2[ipt];
}}

if (okN) org.jmol.modelsetbio.AlphaPolymer.setStrut (iN, jN, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
if (okC) org.jmol.modelsetbio.AlphaPolymer.setStrut (iC, jC, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta);
}
return vStruts;
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.ModelSet,org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~N,~N,~B");
c$.strutPoint = Clazz.defineMethod (c$, "strutPoint", 
($fz = function (i, j, n) {
return (j < i ? Clazz.doubleToInt (j * (2 * n - j - 1) / 2) + i - j - 1 : Clazz.doubleToInt (i * (2 * n - i - 1) / 2) + j - i - 1);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
c$.setStrut = Clazz.defineMethod (c$, "setStrut", 
($fz = function (i, j, n, vCA, bs1, bs2, vStruts, bsStruts, bsNotAvailable, bsNearbyResidues, delta) {
var a1 = vCA.get (i);
var a2 = vCA.get (j);
if (!bs1.get (a1.index) || !bs2.get (a2.index)) return;
vStruts.add ([a1, a2]);
bsStruts.set (i);
bsStruts.set (j);
for (var k1 = Math.max (0, i - delta); k1 <= i + delta && k1 < n; k1++) {
for (var k2 = Math.max (0, j - delta); k2 <= j + delta && k2 < n; k2++) {
if (k1 == k2) {
continue;
}var ipt = org.jmol.modelsetbio.AlphaPolymer.strutPoint (k1, k2, n);
if (!bsNearbyResidues.get (ipt)) {
bsNotAvailable.set (ipt);
}}
}
}, $fz.isPrivate = true, $fz), "~N,~N,~N,java.util.List,org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,org.jmol.util.BitSet,org.jmol.util.BitSet,org.jmol.util.BitSet,~N");
Clazz.overrideMethod (c$, "calculateStructures", 
function (alphaOnly) {
if (this.monomerCount < 4) return;
var angles = this.calculateAnglesInDegrees ();
var codes = this.calculateCodes (angles);
this.checkBetaSheetAlphaHelixOverlap (codes, angles);
var tags = this.calculateRunsFourOrMore (codes);
this.extendRuns (tags);
this.searchForTurns (codes, angles, tags);
this.addStructuresFromTags (tags);
}, "~B");
Clazz.defineMethod (c$, "calculateAnglesInDegrees", 
($fz = function () {
var angles =  Clazz.newFloatArray (this.monomerCount, 0);
for (var i = this.monomerCount - 1; --i >= 2; ) angles[i] = org.jmol.util.Measure.computeTorsion (this.monomers[i - 2].getLeadAtom (), this.monomers[i - 1].getLeadAtom (), this.monomers[i].getLeadAtom (), this.monomers[i + 1].getLeadAtom (), true);

return angles;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "calculateCodes", 
($fz = function (angles) {
var codes =  new Array (this.monomerCount);
for (var i = this.monomerCount - 1; --i >= 2; ) {
var degrees = angles[i];
codes[i] = ((degrees >= 10 && degrees < 120) ? org.jmol.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX : ((degrees >= 120 || degrees < -90) ? org.jmol.modelsetbio.AlphaPolymer.Code.BETA_SHEET : ((degrees >= -90 && degrees < 0) ? org.jmol.modelsetbio.AlphaPolymer.Code.LEFT_HELIX : org.jmol.modelsetbio.AlphaPolymer.Code.NADA)));
}
return codes;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "checkBetaSheetAlphaHelixOverlap", 
($fz = function (codes, angles) {
for (var i = this.monomerCount - 2; --i >= 2; ) if (codes[i] === org.jmol.modelsetbio.AlphaPolymer.Code.BETA_SHEET && angles[i] <= 140 && codes[i - 2] === org.jmol.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX && codes[i - 1] === org.jmol.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 1] === org.jmol.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 2] === org.jmol.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX) codes[i] = org.jmol.modelsetbio.AlphaPolymer.Code.RIGHT_HELIX;

}, $fz.isPrivate = true, $fz), "~A,~A");
Clazz.defineMethod (c$, "calculateRunsFourOrMore", 
($fz = function (codes) {
var tags =  new Array (this.monomerCount);
var tag = org.jmol.constant.EnumStructure.NONE;
var code = org.jmol.modelsetbio.AlphaPolymer.Code.NADA;
var runLength = 0;
for (var i = 0; i < this.monomerCount; ++i) {
if (codes[i] === code && code !== org.jmol.modelsetbio.AlphaPolymer.Code.NADA && code !== org.jmol.modelsetbio.AlphaPolymer.Code.BETA_SHEET) {
++runLength;
if (runLength == 4) {
tag = (code === org.jmol.modelsetbio.AlphaPolymer.Code.BETA_SHEET ? org.jmol.constant.EnumStructure.SHEET : org.jmol.constant.EnumStructure.HELIX);
for (var j = 4; --j >= 0; ) tags[i - j] = tag;

} else if (runLength > 4) tags[i] = tag;
} else {
runLength = 1;
code = codes[i];
}}
return tags;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "extendRuns", 
($fz = function (tags) {
for (var i = 1; i < this.monomerCount - 4; ++i) if (tags[i] === org.jmol.constant.EnumStructure.NONE && tags[i + 1] !== org.jmol.constant.EnumStructure.NONE) tags[i] = tags[i + 1];

tags[0] = tags[1];
tags[this.monomerCount - 1] = tags[this.monomerCount - 2];
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "searchForTurns", 
($fz = function (codes, angles, tags) {
for (var i = this.monomerCount - 1; --i >= 2; ) {
codes[i] = org.jmol.modelsetbio.AlphaPolymer.Code.NADA;
if (tags[i] == null || tags[i] === org.jmol.constant.EnumStructure.NONE) {
var angle = angles[i];
if (angle >= -90 && angle < 0) codes[i] = org.jmol.modelsetbio.AlphaPolymer.Code.LEFT_TURN;
 else if (angle >= 0 && angle < 90) codes[i] = org.jmol.modelsetbio.AlphaPolymer.Code.RIGHT_TURN;
}}
for (var i = this.monomerCount - 1; --i >= 0; ) {
if (codes[i] !== org.jmol.modelsetbio.AlphaPolymer.Code.NADA && codes[i + 1] === codes[i] && tags[i] === org.jmol.constant.EnumStructure.NONE) tags[i] = org.jmol.constant.EnumStructure.TURN;
}
}, $fz.isPrivate = true, $fz), "~A,~A,~A");
Clazz.defineMethod (c$, "addStructuresFromTags", 
($fz = function (tags) {
var i = 0;
while (i < this.monomerCount) {
var tag = tags[i];
if (tag == null || tag === org.jmol.constant.EnumStructure.NONE) {
++i;
continue;
}var iMax;
for (iMax = i + 1; iMax < this.monomerCount && tags[iMax] === tag; ++iMax) {
}
this.addStructureProtected (tag, null, 0, 0, i, iMax - 1);
i = iMax;
}
}, $fz.isPrivate = true, $fz), "~A");
Clazz.pu$h ();
c$ = Clazz.declareType (org.jmol.modelsetbio.AlphaPolymer, "Code", Enum);
Clazz.defineEnumConstant (c$, "NADA", 0, []);
Clazz.defineEnumConstant (c$, "RIGHT_HELIX", 1, []);
Clazz.defineEnumConstant (c$, "BETA_SHEET", 2, []);
Clazz.defineEnumConstant (c$, "LEFT_HELIX", 3, []);
Clazz.defineEnumConstant (c$, "LEFT_TURN", 4, []);
Clazz.defineEnumConstant (c$, "RIGHT_TURN", 5, []);
c$ = Clazz.p0p ();
});
// 
//// org\jmol\modelsetbio\AminoMonomer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.AlphaMonomer", "org.jmol.util.Point3f"], "org.jmol.modelsetbio.AminoMonomer", ["org.jmol.constant.EnumStructure", "org.jmol.util.AxisAngle4f", "$.Escape", "$.Logger", "$.Matrix3f", "$.Quaternion", "$.TextFormat", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nhChecked = false;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "AminoMonomer", org.jmol.modelsetbio.AlphaMonomer);
Clazz.prepareFields (c$, function () {
this.ptTemp =  new org.jmol.util.Point3f ();
});
c$.validateAndAllocate = Clazz.defineMethod (c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms) {
var offsets = org.jmol.modelsetbio.Monomer.scanForOffsets (firstAtomIndex, specialAtomIndexes, org.jmol.modelsetbio.AminoMonomer.interestingAminoAtomIDs);
if (offsets == null) return null;
org.jmol.modelsetbio.Monomer.checkOptional (offsets, 1, firstAtomIndex, specialAtomIndexes[5]);
if (atoms[firstAtomIndex].isHetero () && !org.jmol.modelsetbio.AminoMonomer.isBondedCorrectly (firstAtomIndex, offsets, atoms)) return null;
var aminoMonomer =  new org.jmol.modelsetbio.AminoMonomer (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
return aminoMonomer;
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A,~A");
c$.isBondedCorrectlyRange = Clazz.defineMethod (c$, "isBondedCorrectlyRange", 
($fz = function (offset1, offset2, firstAtomIndex, offsets, atoms) {
var atomIndex1 = firstAtomIndex + (offsets[offset1] & 0xFF);
var atomIndex2 = firstAtomIndex + (offsets[offset2] & 0xFF);
return (atomIndex1 != atomIndex2 && atoms[atomIndex1].isBonded (atoms[atomIndex2]));
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~A,~A");
c$.isBondedCorrectly = Clazz.defineMethod (c$, "isBondedCorrectly", 
($fz = function (firstAtomIndex, offsets, atoms) {
return (org.jmol.modelsetbio.AminoMonomer.isBondedCorrectlyRange (2, 0, firstAtomIndex, offsets, atoms) && org.jmol.modelsetbio.AminoMonomer.isBondedCorrectlyRange (0, 3, firstAtomIndex, offsets, atoms) && (!org.jmol.modelsetbio.Monomer.have (offsets, 1) || org.jmol.modelsetbio.AminoMonomer.isBondedCorrectlyRange (3, 1, firstAtomIndex, offsets, atoms)));
}, $fz.isPrivate = true, $fz), "~N,~A,~A");
Clazz.defineMethod (c$, "isAminoMonomer", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getNitrogenAtom", 
function () {
return this.getAtomFromOffsetIndex (2);
});
Clazz.defineMethod (c$, "getCarbonylCarbonAtom", 
function () {
return this.getAtomFromOffsetIndex (3);
});
Clazz.overrideMethod (c$, "getCarbonylOxygenAtom", 
function () {
return this.getWingAtom ();
});
Clazz.overrideMethod (c$, "getInitiatorAtom", 
function () {
return this.getNitrogenAtom ();
});
Clazz.overrideMethod (c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (org.jmol.modelsetbio.Monomer.have (this.offsets, 4) ? 4 : 3);
});
Clazz.defineMethod (c$, "hasOAtom", 
function () {
return org.jmol.modelsetbio.Monomer.have (this.offsets, 1);
});
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var other = possiblyPreviousMonomer;
return other.getCarbonylCarbonAtom ().isBonded (this.getNitrogenAtom ());
}, "org.jmol.modelsetbio.Monomer");
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var nitrogen = this.getNitrogenAtom ();
var marBegin = (Clazz.doubleToInt (madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (nitrogen.screenZ == 0) return;
var radiusBegin = this.scaleToScreen (nitrogen.screenZ, marBegin);
if (radiusBegin < 4) radiusBegin = 4;
var ccarbon = this.getCarbonylCarbonAtom ();
var marEnd = (Clazz.doubleToInt (madEnd / 2));
if (marEnd < 1200) marEnd = 1200;
var radiusEnd = this.scaleToScreen (nitrogen.screenZ, marEnd);
if (radiusEnd < 4) radiusEnd = 4;
var alpha = this.getLeadAtom ();
if (this.isCursorOnTopOf (alpha, x, y, Clazz.doubleToInt ((radiusBegin + radiusEnd) / 2), competitor) || this.isCursorOnTopOf (nitrogen, x, y, radiusBegin, competitor) || this.isCursorOnTopOf (ccarbon, x, y, radiusEnd, competitor)) closest[0] = alpha;
}, "~N,~N,~A,~N,~N");
Clazz.defineMethod (c$, "resetHydrogenPoint", 
function () {
this.nhChecked = false;
this.nitrogenHydrogenPoint = null;
});
Clazz.defineMethod (c$, "getNitrogenHydrogenPoint", 
function () {
if (this.nitrogenHydrogenPoint == null && !this.nhChecked) {
this.nhChecked = true;
this.nitrogenHydrogenPoint = this.getExplicitNH ();
}return this.nitrogenHydrogenPoint;
});
Clazz.defineMethod (c$, "getExplicitNH", 
function () {
var nitrogen = this.getNitrogenAtom ();
var h = null;
var bonds = nitrogen.getBonds ();
if (bonds == null) return null;
for (var i = 0; i < bonds.length; i++) if ((h = bonds[i].getOtherAtom (nitrogen)).getElementNumber () == 1) return h;

return null;
});
Clazz.defineMethod (c$, "getNHPoint", 
function (aminoHydrogenPoint, vNH, jmolHPoint, dsspIgnoreHydrogens) {
if (this.monomerIndex == 0 || this.groupID == 15) return false;
var nitrogenPoint = this.getNitrogenAtom ();
var nhPoint = this.getNitrogenHydrogenPoint ();
if (nhPoint != null && !dsspIgnoreHydrogens) {
vNH.sub2 (nhPoint, nitrogenPoint);
aminoHydrogenPoint.setT (nhPoint);
return true;
}var prev = this.bioPolymer.monomers[this.monomerIndex - 1];
if (jmolHPoint) {
vNH.sub2 (nitrogenPoint, this.getLeadAtom ());
vNH.normalize ();
var v =  new org.jmol.util.Vector3f ();
v.sub2 (nitrogenPoint, prev.getCarbonylCarbonAtom ());
v.normalize ();
vNH.add (v);
} else {
var oxygen = prev.getCarbonylOxygenAtom ();
if (oxygen == null) return false;
vNH.sub2 (prev.getCarbonylCarbonAtom (), oxygen);
}vNH.normalize ();
aminoHydrogenPoint.add2 (nitrogenPoint, vNH);
this.nitrogenHydrogenPoint = org.jmol.util.Point3f.newP (aminoHydrogenPoint);
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.info ("draw ID \"pta" + this.monomerIndex + "_" + nitrogenPoint.index + "\" " + org.jmol.util.Escape.escapePt (nitrogenPoint) + org.jmol.util.Escape.escapePt (aminoHydrogenPoint) + " # " + nitrogenPoint);
return true;
}, "org.jmol.util.Point3f,org.jmol.util.Vector3f,~B,~B");
Clazz.defineMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
switch (qType) {
default:
case 'a':
case 'b':
case 'c':
case 'C':
return Clazz.superCall (this, org.jmol.modelsetbio.AminoMonomer, "getQuaternionFrameCenter", [qType]);
case 'n':
return this.getNitrogenAtom ();
case 'p':
case 'P':
return this.getCarbonylCarbonAtom ();
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.getGroups ()[this.monomerIndex + 1]);
var pt = org.jmol.util.Point3f.newP (this.getCarbonylCarbonAtom ());
pt.add (mNext.getNitrogenAtom ());
pt.scale (0.5);
return pt;
}
}, "~S");
Clazz.defineMethod (c$, "getQuaternion", 
function (qType) {
var ptC = this.getCarbonylCarbonAtom ();
var ptCa = this.getLeadAtom ();
var vA =  new org.jmol.util.Vector3f ();
var vB =  new org.jmol.util.Vector3f ();
var vC = null;
switch (qType) {
case 'a':
case 'n':
if (this.monomerIndex == 0 || this.groupID == 15) return null;
vC =  new org.jmol.util.Vector3f ();
this.getNHPoint (this.ptTemp, vC, true, false);
vB.sub2 (ptCa, this.getNitrogenAtom ());
vB.cross (vC, vB);
var mat =  new org.jmol.util.Matrix3f ();
mat.setAA (org.jmol.util.AxisAngle4f.newVA (vB, -0.29670596));
mat.transform (vC);
vA.cross (vB, vC);
break;
case 'b':
return Clazz.superCall (this, org.jmol.modelsetbio.AminoMonomer, "getQuaternion", ['b']);
case 'c':
vA.sub2 (ptC, ptCa);
vB.sub2 (this.getNitrogenAtom (), ptCa);
break;
case 'p':
case 'x':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
vA.sub2 (ptCa, ptC);
vB.sub2 ((this.bioPolymer.getGroups ()[this.monomerIndex + 1]).getNitrogenAtom (), ptC);
break;
case 'q':
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.getGroups ()[this.monomerIndex + 1]);
vB.sub2 (mNext.getLeadAtom (), mNext.getNitrogenAtom ());
vA.sub2 (ptCa, ptC);
break;
default:
return null;
}
return org.jmol.util.Quaternion.getQuaternionFrameV (vA, vB, vC, false);
}, "~S");
Clazz.overrideMethod (c$, "isWithinStructure", 
function (type) {
var s = this.getStructure ();
return (s != null && s.isWithin (this.monomerIndex) && s.type === type);
}, "org.jmol.constant.EnumStructure");
Clazz.overrideMethod (c$, "getStructureId", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return "";
return this.proteinStructure.structureID;
});
Clazz.overrideMethod (c$, "getProteinStructureTag", 
function () {
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return null;
var tag = "%3N %3ID";
tag = org.jmol.util.TextFormat.formatStringI (tag, "N", this.proteinStructure.serialID);
tag = org.jmol.util.TextFormat.formatStringS (tag, "ID", this.proteinStructure.structureID);
if (this.proteinStructure.type === org.jmol.constant.EnumStructure.SHEET) tag += org.jmol.util.TextFormat.formatStringI ("%2SC", "SC", this.proteinStructure.strandCount);
return tag;
});
Clazz.defineStatics (c$,
"CA", 0,
"O", 1,
"N", 2,
"C", 3,
"OT", 4,
"interestingAminoAtomIDs", [2, -5, 1, 3, -65],
"beta", (0.29670597283903605));
});
// 
//// org\jmol\modelsetbio\AminoPolymer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.AlphaPolymer"], "org.jmol.modelsetbio.AminoPolymer", ["java.lang.Boolean", "java.util.ArrayList", "$.Hashtable", "org.jmol.constant.EnumStructure", "org.jmol.i18n.GT", "org.jmol.modelset.HBond", "org.jmol.modelsetbio.APBridge", "org.jmol.util.ArrayUtil", "$.BitSet", "$.Escape", "$.Logger", "$.Measure", "$.Point3f", "$.StringXBuilder", "$.TextFormat", "$.Vector3f", "org.jmol.viewer.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.structureList = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "AminoPolymer", org.jmol.modelsetbio.AlphaPolymer);
Clazz.makeConstructor (c$, 
function (monomers) {
Clazz.superConstructor (this, org.jmol.modelsetbio.AminoPolymer, [monomers]);
this.type = 1;
for (var i = 0; i < this.monomerCount; ++i) if (!(monomers[i]).hasOAtom ()) return;

this.hasWingPoints = true;
}, "~A");
Clazz.overrideMethod (c$, "resetHydrogenPoints", 
function () {
var ps;
var psLast = null;
for (var i = 0; i < this.monomerCount; i++) {
if ((ps = this.getProteinStructure (i)) != null && ps !== psLast) (psLast = ps).resetAxes ();
(this.monomers[i]).resetHydrogenPoint ();
}
});
Clazz.overrideMethod (c$, "calcPhiPsiAngles", 
function () {
for (var i = 0; i < this.monomerCount - 1; ++i) this.calcPhiPsiAngles2 (this.monomers[i], this.monomers[i + 1]);

return true;
});
Clazz.defineMethod (c$, "calcPhiPsiAngles2", 
($fz = function (residue1, residue2) {
var nitrogen1 = residue1.getNitrogenAtom ();
var alphacarbon1 = residue1.getLeadAtom ();
var carbon1 = residue1.getCarbonylCarbonAtom ();
var nitrogen2 = residue2.getNitrogenAtom ();
var alphacarbon2 = residue2.getLeadAtom ();
var carbon2 = residue2.getCarbonylCarbonAtom ();
residue2.setGroupParameter (1112539143, org.jmol.util.Measure.computeTorsion (carbon1, nitrogen2, alphacarbon2, carbon2, true));
residue1.setGroupParameter (1112539144, org.jmol.util.Measure.computeTorsion (nitrogen1, alphacarbon1, carbon1, nitrogen2, true));
residue1.setGroupParameter (1112539142, org.jmol.util.Measure.computeTorsion (alphacarbon1, carbon1, nitrogen2, alphacarbon2, true));
}, $fz.isPrivate = true, $fz), "org.jmol.modelsetbio.AminoMonomer,org.jmol.modelsetbio.AminoMonomer");
Clazz.overrideMethod (c$, "calculateRamachandranHelixAngle", 
function (m, qtype) {
var psiLast = (m == 0 ? NaN : this.monomers[m - 1].getGroupParameter (1112539144));
var psi = this.monomers[m].getGroupParameter (1112539144);
var phi = this.monomers[m].getGroupParameter (1112539143);
var phiNext = (m == this.monomerCount - 1 ? NaN : this.monomers[m + 1].getGroupParameter (1112539143));
var psiNext = (m == this.monomerCount - 1 ? NaN : this.monomers[m + 1].getGroupParameter (1112539144));
switch (qtype) {
default:
case 'p':
case 'r':
case 'P':
var dPhi = ((phiNext - phi) / 2 * 3.141592653589793 / 180);
var dPsi = ((psiNext - psi) / 2 * 3.141592653589793 / 180);
return (57.29577951308232 * 2 * Math.acos (Math.cos (dPsi) * Math.cos (dPhi) - Math.sin (dPsi) * Math.sin (dPhi) / 3));
case 'c':
case 'C':
return (psi - psiLast + phiNext - phi);
}
}, "~N,~S");
Clazz.defineMethod (c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
if (polymer == null) polymer = this;
if (!(Clazz.instanceOf (polymer, org.jmol.modelsetbio.AminoPolymer))) return;
var pt =  new org.jmol.util.Point3f ();
var vNH =  new org.jmol.util.Vector3f ();
var source;
var min1 = (min == null ?  Clazz.newIntArray (2, 3, 0) : null);
for (var i = 1; i < this.monomerCount; ++i) {
if (min == null) {
min1[0][0] = min1[1][0] = this.bioPolymerIndexInModel;
min1[0][1] = min1[1][1] = -2147483648;
min1[0][2] = min1[1][2] = 0;
} else {
min1 = min[i];
}if ((source = (this.monomers[i])).getNHPoint (pt, vNH, checkDistances, dsspIgnoreHydrogens)) {
var isInA = (bsA == null || bsA.get (source.getNitrogenAtom ().index));
if (!isInA) continue;
if (!checkDistances && source.getCarbonylOxygenAtom () == null) continue;
this.checkRasmolHydrogenBond (source, polymer, i, pt, (isInA ? bsB : bsA), vHBonds, min1, checkDistances);
}}
}, "org.jmol.modelsetbio.BioPolymer,org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~N,~A,~B,~B");
Clazz.defineMethod (c$, "checkRasmolHydrogenBond", 
($fz = function (source, polymer, indexDonor, hydrogenPoint, bsB, vHBonds, min, checkDistances) {
var sourceAlphaPoint = source.getLeadAtom ();
var sourceNitrogenPoint = source.getNitrogenAtom ();
var nitrogen = source.getNitrogenAtom ();
var m;
for (var i = polymer.monomerCount; --i >= 0; ) {
if (polymer === this && (i == indexDonor || i + 1 == indexDonor)) continue;
var target = polymer.monomers[i];
var oxygen = target.getCarbonylOxygenAtom ();
if (oxygen == null || bsB != null && !bsB.get (oxygen.index)) continue;
var targetAlphaPoint = target.getLeadAtom ();
var dist2 = sourceAlphaPoint.distanceSquared (targetAlphaPoint);
if (dist2 >= 81.0) continue;
var energy = this.calcHbondEnergy (sourceNitrogenPoint, hydrogenPoint, target, checkDistances);
if (energy < min[0][2]) {
m = min[1];
min[1] = min[0];
min[0] = m;
} else if (energy < min[1][2]) {
m = min[1];
} else {
continue;
}m[0] = polymer.bioPolymerIndexInModel;
m[1] = (energy < -500 ? i : -1 - i);
m[2] = energy;
}
if (vHBonds != null) for (var i = 0; i < 2; i++) if (min[i][1] >= 0) this.addResidueHydrogenBond (nitrogen, ((polymer).monomers[min[i][1]]).getCarbonylOxygenAtom (), (polymer === this ? indexDonor : -99), min[i][1], min[i][2] / 1000, vHBonds);

}, $fz.isPrivate = true, $fz), "org.jmol.modelsetbio.AminoMonomer,org.jmol.modelsetbio.BioPolymer,~N,org.jmol.util.Point3f,org.jmol.util.BitSet,java.util.List,~A,~B");
Clazz.defineMethod (c$, "calcHbondEnergy", 
($fz = function (nitrogenPoint, hydrogenPoint, target, checkDistances) {
var targetOxygenPoint = target.getCarbonylOxygenAtom ();
if (targetOxygenPoint == null) return 0;
var distON2 = targetOxygenPoint.distanceSquared (nitrogenPoint);
if (distON2 < 0.25) return 0;
var distOH2 = targetOxygenPoint.distanceSquared (hydrogenPoint);
if (distOH2 < 0.25) return 0;
var targetCarbonPoint = target.getCarbonylCarbonAtom ();
var distCH2 = targetCarbonPoint.distanceSquared (hydrogenPoint);
if (distCH2 < 0.25) return 0;
var distCN2 = targetCarbonPoint.distanceSquared (nitrogenPoint);
if (distCN2 < 0.25) return 0;
var distOH = Math.sqrt (distOH2);
var distCH = Math.sqrt (distCH2);
var distCN = Math.sqrt (distCN2);
var distON = Math.sqrt (distON2);
var energy = org.jmol.modelset.HBond.getEnergy (distOH, distCH, distCN, distON);
var isHbond = (energy < -500 && (!checkDistances || distCN > distCH && distOH <= 3.0));
return (!isHbond && checkDistances || energy < -9900 ? 0 : energy);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.modelsetbio.AminoMonomer,~B");
Clazz.defineMethod (c$, "addResidueHydrogenBond", 
($fz = function (nitrogen, oxygen, indexAminoGroup, indexCarbonylGroup, energy, vHBonds) {
var order;
switch (indexAminoGroup - indexCarbonylGroup) {
case 2:
order = 6144;
break;
case 3:
order = 8192;
break;
case 4:
order = 10240;
break;
case 5:
order = 12288;
break;
case -3:
order = 14336;
break;
case -4:
order = 16384;
break;
default:
order = 4096;
}
vHBonds.add ( new org.jmol.modelset.HBond (nitrogen, oxygen, order, 1, 0, energy));
}, $fz.isPrivate = true, $fz), "org.jmol.modelset.Atom,org.jmol.modelset.Atom,~N,~N,~N,java.util.List");
c$.calculateStructuresDssp = Clazz.defineMethod (c$, "calculateStructuresDssp", 
function (bioPolymers, bioPolymerCount, vHBonds, doReport, dsspIgnoreHydrogens, setStructure) {
if (bioPolymerCount == 0) return "";
var m = bioPolymers[0].model;
var sb =  new org.jmol.util.StringXBuilder ();
sb.append ("Jmol ").append (org.jmol.viewer.Viewer.getJmolVersion ()).append (" DSSP analysis for model ").append (m.getModelNumberDotted ()).append (" - ").append (m.getModelTitle ()).append ("\n");
if (m.modelIndex == 0) sb.append ("\nW. Kabsch and C. Sander, Biopolymers, vol 22, 1983, pp 2577-2637\n").append ("\nWe thank Wolfgang Kabsch and Chris Sander for writing the DSSP software,\n").append ("and we thank the CMBI for maintaining it to the extent that it was easy to\n").append ("re-engineer for our purposes. At this point in time, we make no guarantee\n").append ("that this code gives precisely the same analysis as the code available via license\n").append ("from CMBI at http://swift.cmbi.ru.nl/gv/dssp\n");
if (setStructure && m.modelIndex == 0) sb.append ("\nAll bioshapes have been deleted and must be regenerated.\n");
if (m.nAltLocs > 0) sb.append ("\nNote: This model contains alternative locations. Use  'CONFIGURATION 1' to be consistent with CMBI DSSP.\n");
var labels =  Clazz.newCharArray (bioPolymerCount, '\0');
var bsDone =  new Array (bioPolymerCount);
var bsBad =  new org.jmol.util.BitSet ();
var haveWarned = false;
for (var i = 0; i < bioPolymerCount; i++) {
if (!(Clazz.instanceOf (bioPolymers[i], org.jmol.modelsetbio.AminoPolymer))) continue;
var ap = bioPolymers[i];
if (!haveWarned && (ap.monomers[0]).getExplicitNH () != null) {
if (dsspIgnoreHydrogens) sb.append (org.jmol.i18n.GT._ ("NOTE: Backbone amide hydrogen positions are present and will be ignored. Their positions will be approximated, as in standard DSSP analysis.\nUse {0} to not use this approximation.\n\n", "SET dsspCalculateHydrogenAlways FALSE"));
 else sb.append (org.jmol.i18n.GT._ ("NOTE: Backbone amide hydrogen positions are present and will be used. Results may differ significantly from standard DSSP analysis.\nUse {0} to ignore these hydrogen positions.\n\n", "SET dsspCalculateHydrogenAlways TRUE"));
haveWarned = true;
}bioPolymers[i].recalculateLeadMidpointsAndWingVectors ();
labels[i] =  Clazz.newCharArray (bioPolymers[i].monomerCount, '\0');
bsDone[i] =  new org.jmol.util.BitSet ();
for (var j = 0; j < ap.monomerCount; j++) if ((ap.monomers[j]).getCarbonylOxygenAtom () == null) bsBad.set (ap.monomers[j].leadAtomIndex);

}
var min = org.jmol.modelsetbio.AminoPolymer.getDualHydrogenBondArray (bioPolymers, bioPolymerCount, dsspIgnoreHydrogens);
var bridgesA =  new java.util.ArrayList ();
var bridgesP =  new java.util.ArrayList ();
var htBridges =  new java.util.Hashtable ();
var htLadders =  new java.util.Hashtable ();
org.jmol.modelsetbio.AminoPolymer.getBridges (bioPolymers, min, bridgesA, bridgesP, htBridges, htLadders, bsBad, vHBonds, bsDone);
org.jmol.modelsetbio.AminoPolymer.getSheetStructures (bioPolymers, bridgesA, bridgesP, htBridges, htLadders, labels, bsDone, doReport, setStructure);
var reports =  new Array (bioPolymerCount);
for (var i = 0; i < bioPolymerCount; i++) if (min[i] != null) reports[i] = (bioPolymers[i]).findHelixes (min[i], i, bsDone[i], labels[i], doReport, setStructure, vHBonds, bsBad);

if (doReport) {
var sbSummary =  new org.jmol.util.StringXBuilder ();
sb.append ("\n------------------------------\n");
for (var i = 0; i < bioPolymerCount; i++) if (labels[i] != null) {
var ap = bioPolymers[i];
sbSummary.append (ap.dumpSummary (labels[i]));
sb.append (reports[i]).append (ap.dumpTags ("$.1: " + String.valueOf (labels[i]), bsBad, 2));
}
if (bsBad.nextSetBit (0) >= 0) sb.append ("\nNOTE: '!' indicates a residue that is missing a backbone carbonyl oxygen atom.\n");
sb.append ("\n").append ("SUMMARY:" + sbSummary);
}return sb.toString ();
}, "~A,~N,java.util.List,~B,~B,~B");
c$.getDualHydrogenBondArray = Clazz.defineMethod (c$, "getDualHydrogenBondArray", 
($fz = function (bioPolymers, bioPolymerCount, dsspIgnoreHydrogens) {
var min = org.jmol.util.ArrayUtil.newInt4 (bioPolymerCount);
for (var i = 0; i < bioPolymerCount; i++) {
if (!(Clazz.instanceOf (bioPolymers[i], org.jmol.modelsetbio.AminoPolymer))) continue;
var n = bioPolymers[i].monomerCount;
min[i] =  Clazz.newIntArray (n, 2, 3, 0);
for (var j = 0; j < n; ++j) {
min[i][j][0][1] = min[i][j][1][1] = -2147483648;
min[i][j][0][2] = min[i][j][1][2] = 0;
}
}
for (var i = 0; i < bioPolymerCount; i++) if (min[i] != null) for (var j = 0; j < bioPolymerCount; j++) if (min[j] != null) bioPolymers[i].calcRasmolHydrogenBonds (bioPolymers[j], null, null, null, 2, min[i], false, dsspIgnoreHydrogens);


return min;
}, $fz.isPrivate = true, $fz), "~A,~N,~B");
Clazz.defineMethod (c$, "findHelixes", 
($fz = function (min, iPolymer, bsDone, labels, doReport, setStructure, vHBonds, bsBad) {
if (org.jmol.util.Logger.debugging) for (var j = 0; j < this.monomerCount; j++) org.jmol.util.Logger.debug (iPolymer + "." + this.monomers[j].getResno () + "\t" + org.jmol.util.Escape.escape (min[j]));

var bsTurn =  new org.jmol.util.BitSet ();
var line4 = this.findHelixes2 (4, min, iPolymer, org.jmol.constant.EnumStructure.HELIXALPHA, 10240, bsDone, bsTurn, labels, doReport, setStructure, vHBonds, bsBad);
var line3 = this.findHelixes2 (3, min, iPolymer, org.jmol.constant.EnumStructure.HELIX310, 8192, bsDone, bsTurn, labels, doReport, setStructure, vHBonds, bsBad);
var line5 = this.findHelixes2 (5, min, iPolymer, org.jmol.constant.EnumStructure.HELIXPI, 12288, bsDone, bsTurn, labels, doReport, setStructure, vHBonds, bsBad);
if (setStructure) this.setStructure (bsTurn, org.jmol.constant.EnumStructure.TURN);
if (doReport) {
this.setTag (labels, bsTurn, 'T');
return this.dumpTags ("$.5: " + line5 + "\n" + "$.4: " + line4 + "\n" + "$.3: " + line3, bsBad, 1);
}return "";
}, $fz.isPrivate = true, $fz), "~A,~N,org.jmol.util.BitSet,~A,~B,~B,java.util.List,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "findHelixes2", 
($fz = function (pitch, min, thisIndex, subtype, type, bsDone, bsTurn, labels, doReport, setStructure, vHBonds, bsBad) {
var bsStart =  new org.jmol.util.BitSet ();
var bsNNN =  new org.jmol.util.BitSet ();
var bsX =  new org.jmol.util.BitSet ();
var bsStop =  new org.jmol.util.BitSet ();
var bsHelix =  new org.jmol.util.BitSet ();
var warning = "";
for (var i = pitch; i < this.monomerCount; ++i) {
var i0 = i - pitch;
var bpt = 0;
if (min[i][0][0] == thisIndex && min[i][0][1] == i0 || min[i][bpt = 1][0] == thisIndex && min[i][1][1] == i0) {
var ia = this.monomers[i0].leadAtomIndex;
var ipt = bsBad.nextSetBit (ia);
if (ipt >= ia && ipt <= this.monomers[i].leadAtomIndex) continue;
bsStart.set (i0);
bsNNN.setBits (i0 + 1, i);
bsStop.set (i);
ipt = bsDone.nextSetBit (i0);
var isClear = (ipt < 0 || ipt >= i);
var addH = false;
if (i0 > 0 && bsStart.get (i0 - 1) && (pitch == 4 || isClear)) {
bsHelix.setBits (i0, i);
if (!isClear) warning += "  WARNING! Bridge to helix at " + this.monomers[ipt];
addH = true;
} else if (isClear || bsDone.nextClearBit (ipt) < i) {
addH = true;
}if (bsStop.get (i0)) bsX.set (i0);
if (addH && vHBonds != null) {
org.jmol.modelsetbio.AminoPolymer.addHbond (vHBonds, this.monomers[i], this.monomers[i0], min[i][bpt][2], type, null);
}}}
var taglines;
if (doReport) {
taglines =  Clazz.newCharArray (this.monomerCount, '\0');
this.setTag (taglines, bsNNN, String.fromCharCode (48 + pitch));
this.setTag (taglines, bsStart, '>');
this.setTag (taglines, bsStop, '<');
this.setTag (taglines, bsX, 'X');
} else {
taglines = null;
}bsDone.or (bsHelix);
bsNNN.andNot (bsDone);
bsTurn.or (bsNNN);
bsTurn.andNot (bsHelix);
if (setStructure) this.setStructure (bsHelix, subtype);
if (doReport) {
this.setTag (labels, bsHelix, String.fromCharCode (68 + pitch));
return String.valueOf (taglines) + warning;
}return "";
}, $fz.isPrivate = true, $fz), "~N,~A,~N,org.jmol.constant.EnumStructure,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,~A,~B,~B,java.util.List,org.jmol.util.BitSet");
c$.getBridges = Clazz.defineMethod (c$, "getBridges", 
($fz = function (bioPolymers, min, bridgesA, bridgesP, htBridges, htLadders, bsBad, vHBonds, bsDone) {
var atoms = bioPolymers[0].model.getModelSet ().atoms;
var bridge = null;
var htTemp =  new java.util.Hashtable ();
for (var p1 = 0; p1 < min.length; p1++) if (Clazz.instanceOf (bioPolymers[p1], org.jmol.modelsetbio.AminoPolymer)) {
var ap1 = (bioPolymers[p1]);
var n = min[p1].length - 1;
for (var a = 1; a < n; a++) {
var ia = ap1.monomers[a].leadAtomIndex;
if (bsBad.get (ia)) continue;
for (var p2 = p1; p2 < min.length; p2++) if (Clazz.instanceOf (bioPolymers[p2], org.jmol.modelsetbio.AminoPolymer)) for (var b = (p1 == p2 ? a + 3 : 1); b < min[p2].length - 1; b++) {
var ap2 = bioPolymers[p2];
var ib = ap2.monomers[b].leadAtomIndex;
if (bsBad.get (ib)) continue;
if ((bridge = org.jmol.modelsetbio.AminoPolymer.getBridge (min, p1, a, p2, b, bridgesP, atoms[ia], atoms[ib], ap1, ap2, vHBonds, htTemp, false, htLadders)) != null) {
} else if ((bridge = org.jmol.modelsetbio.AminoPolymer.getBridge (min, p1, a, p2, b, bridgesA, atoms[ia], atoms[ib], ap1, ap2, vHBonds, htTemp, true, htLadders)) != null) {
bridge.isAntiparallel = true;
} else {
continue;
}if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("Bridge found " + bridge);
bsDone[p1].set (a);
bsDone[p2].set (b);
htBridges.put (ia + "-" + ib, bridge);
}

}
}
}, $fz.isPrivate = true, $fz), "~A,~A,java.util.List,java.util.List,java.util.Map,java.util.Map,org.jmol.util.BitSet,java.util.List,~A");
c$.getBridge = Clazz.defineMethod (c$, "getBridge", 
($fz = function (min, p1, a, p2, b, bridges, atom1, atom2, ap1, ap2, vHBonds, htTemp, isAntiparallel, htLadders) {
var b1 = null;
var b2 = null;
var ipt = 0;
var offsets = (isAntiparallel ? org.jmol.modelsetbio.AminoPolymer.sheetOffsets[1] : org.jmol.modelsetbio.AminoPolymer.sheetOffsets[0]);
if ((b1 = org.jmol.modelsetbio.AminoPolymer.isHbonded (a + offsets[0], b + offsets[1], p1, p2, min)) != null && (b2 = org.jmol.modelsetbio.AminoPolymer.isHbonded (b + offsets[2], a + offsets[3], p2, p1, min)) != null || (b1 = org.jmol.modelsetbio.AminoPolymer.isHbonded (a + offsets[ipt = 4], b + offsets[5], p1, p2, min)) != null && (b2 = org.jmol.modelsetbio.AminoPolymer.isHbonded (b + offsets[6], a + offsets[7], p2, p1, min)) != null) {
var bridge =  new org.jmol.modelsetbio.APBridge (atom1, atom2, htLadders);
bridges.add (bridge);
if (vHBonds != null) {
var type = (isAntiparallel ? 14336 : 6144);
org.jmol.modelsetbio.AminoPolymer.addHbond (vHBonds, ap1.monomers[a + offsets[ipt]], ap2.monomers[b + offsets[++ipt]], b1[2], type, htTemp);
org.jmol.modelsetbio.AminoPolymer.addHbond (vHBonds, ap2.monomers[b + offsets[++ipt]], ap1.monomers[a + offsets[++ipt]], b2[2], type, htTemp);
}return bridge;
}return null;
}, $fz.isPrivate = true, $fz), "~A,~N,~N,~N,~N,java.util.List,org.jmol.modelset.Atom,org.jmol.modelset.Atom,org.jmol.modelsetbio.AminoPolymer,org.jmol.modelsetbio.AminoPolymer,java.util.List,java.util.Map,~B,java.util.Map");
c$.addHbond = Clazz.defineMethod (c$, "addHbond", 
($fz = function (vHBonds, donor, acceptor, iEnergy, type, htTemp) {
var nitrogen = (donor).getNitrogenAtom ();
var oxygen = (acceptor).getCarbonylOxygenAtom ();
if (htTemp != null) {
var key = nitrogen.index + " " + oxygen.index;
if (htTemp.containsKey (key)) return;
htTemp.put (key, Boolean.TRUE);
}vHBonds.add ( new org.jmol.modelset.HBond (nitrogen, oxygen, type, 1, 0, iEnergy / 1000));
}, $fz.isPrivate = true, $fz), "java.util.List,org.jmol.modelsetbio.Monomer,org.jmol.modelsetbio.Monomer,~N,~N,java.util.Map");
c$.getSheetStructures = Clazz.defineMethod (c$, "getSheetStructures", 
($fz = function (bioPolymers, bridgesA, bridgesP, htBridges, htLadders, labels, bsDone, doReport, setStructure) {
if (bridgesA.size () == 0 && bridgesP.size () == 0) return;
org.jmol.modelsetbio.AminoPolymer.createLadders (bridgesA, htBridges, htLadders, true);
org.jmol.modelsetbio.AminoPolymer.createLadders (bridgesP, htBridges, htLadders, false);
var bsEEE =  new org.jmol.util.BitSet ();
var bsB =  new org.jmol.util.BitSet ();
var e = htLadders.keySet ().iterator ();
while (e.hasNext ()) {
var ladder = e.next ();
if (ladder[0][0] == ladder[0][1] && ladder[1][0] == ladder[1][1]) {
bsB.set (ladder[0][0]);
bsB.set (ladder[1][0]);
} else {
bsEEE.setBits (ladder[0][0], ladder[0][1] + 1);
bsEEE.setBits (ladder[1][0], ladder[1][1] + 1);
}}
var bsSheet =  new org.jmol.util.BitSet ();
var bsBridge =  new org.jmol.util.BitSet ();
for (var i = bioPolymers.length; --i >= 0; ) {
if (!(Clazz.instanceOf (bioPolymers[i], org.jmol.modelsetbio.AminoPolymer))) continue;
bsSheet.clearAll ();
bsBridge.clearAll ();
var ap = bioPolymers[i];
for (var iStart = 0; iStart < ap.monomerCount; ) {
var index = ap.monomers[iStart].leadAtomIndex;
if (bsEEE.get (index)) {
var iEnd = iStart + 1;
while (iEnd < ap.monomerCount && bsEEE.get (ap.monomers[iEnd].leadAtomIndex)) iEnd++;

bsSheet.setBits (iStart, iEnd);
iStart = iEnd;
} else {
if (bsB.get (index)) bsBridge.set (iStart);
++iStart;
}}
if (doReport) {
ap.setTag (labels[i], bsBridge, 'B');
ap.setTag (labels[i], bsSheet, 'E');
}if (setStructure) {
ap.setStructure (bsSheet, org.jmol.constant.EnumStructure.SHEET);
}bsDone[i].or (bsSheet);
bsDone[i].or (bsBridge);
}
}, $fz.isPrivate = true, $fz), "~A,java.util.List,java.util.List,java.util.Map,java.util.Map,~A,~A,~B,~B");
c$.createLadders = Clazz.defineMethod (c$, "createLadders", 
($fz = function (bridges, htBridges, htLadders, isAntiparallel) {
var dir = (isAntiparallel ? -1 : 1);
var n = bridges.size ();
for (var i = 0; i < n; i++) org.jmol.modelsetbio.AminoPolymer.checkBridge (bridges.get (i), htBridges, htLadders, isAntiparallel, 1, dir);

for (var i = 0; i < n; i++) org.jmol.modelsetbio.AminoPolymer.checkBulge (bridges.get (i), htBridges, htLadders, isAntiparallel, 1);

}, $fz.isPrivate = true, $fz), "java.util.List,java.util.Map,java.util.Map,~B");
c$.checkBridge = Clazz.defineMethod (c$, "checkBridge", 
($fz = function (bridge, htBridges, htLadders, isAntiparallel, n1, n2) {
var b = htBridges.get (bridge.a.getOffsetResidueAtom ("0", n1) + "-" + bridge.b.getOffsetResidueAtom ("0", n2));
return (b != null && bridge.addBridge (b, htLadders));
}, $fz.isPrivate = true, $fz), "org.jmol.modelsetbio.APBridge,java.util.Map,java.util.Map,~B,~N,~N");
c$.checkBulge = Clazz.defineMethod (c$, "checkBulge", 
($fz = function (bridge, htBridges, htLadders, isAntiparallel, dir) {
var dir1 = (isAntiparallel ? -1 : 1);
for (var i = 0; i < 3; i++) for (var j = (i == 0 ? 1 : 0); j < 6; j++) {
org.jmol.modelsetbio.AminoPolymer.checkBridge (bridge, htBridges, htLadders, isAntiparallel, i * dir, j * dir1);
if (j > i) org.jmol.modelsetbio.AminoPolymer.checkBridge (bridge, htBridges, htLadders, isAntiparallel, j * dir, i * dir1);
}

}, $fz.isPrivate = true, $fz), "org.jmol.modelsetbio.APBridge,java.util.Map,java.util.Map,~B,~N");
Clazz.defineMethod (c$, "setStructure", 
($fz = function (bs, type) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
var i2 = bs.nextClearBit (i);
if (i2 < 0) i2 = this.monomerCount;
this.addStructureProtected (type, null, 0, 0, i, i2 - 1);
i = i2;
}
}, $fz.isPrivate = true, $fz), "org.jmol.util.BitSet,org.jmol.constant.EnumStructure");
c$.isHbonded = Clazz.defineMethod (c$, "isHbonded", 
($fz = function (indexDonor, indexAcceptor, pDonor, pAcceptor, min) {
if (indexDonor < 0 || indexAcceptor < 0) return null;
var min1 = min[pDonor];
var min2 = min[pAcceptor];
if (indexDonor >= min1.length || indexAcceptor >= min2.length) return null;
return (min1[indexDonor][0][0] == pAcceptor && min1[indexDonor][0][1] == indexAcceptor ? min1[indexDonor][0] : min1[indexDonor][1][0] == pAcceptor && min1[indexDonor][1][1] == indexAcceptor ? min1[indexDonor][1] : null);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setTag", 
($fz = function (tags, bs, ch) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) tags[i] = ch;

}, $fz.isPrivate = true, $fz), "~A,org.jmol.util.BitSet,~S");
Clazz.defineMethod (c$, "dumpSummary", 
($fz = function (labels) {
var id = this.monomers[0].getLeadAtom ().getChainID ();
var prefix = (id == '\0' ? "" : String.valueOf (id) + ":");
var sb =  new org.jmol.util.StringXBuilder ();
var lastChar = '\u0000';
var insCode1 = '\u0000';
var insCode2 = '\u0000';
var firstResno = -1;
var lastResno = -1;
for (var i = 0; i <= this.monomerCount; i++) {
if (i == this.monomerCount || labels[i] != lastChar) {
if (lastChar != '\0') sb.appendC ('\n').appendC (lastChar).append (" : ").append (prefix).appendI (firstResno).append (insCode1 == '\0' ? "" : String.valueOf (insCode1)).append ("_").append (prefix).appendI (lastResno).append (insCode2 == '\0' ? "" : String.valueOf (insCode2));
if (i == this.monomerCount) break;
lastChar = labels[i];
firstResno = this.monomers[i].getResno ();
insCode1 = this.monomers[i].getInsertionCode ();
}lastResno = this.monomers[i].getResno ();
insCode2 = this.monomers[i].getInsertionCode ();
}
return sb.toString ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "dumpTags", 
($fz = function (lines, bsBad, mode) {
var prefix = this.monomers[0].getLeadAtom ().getChainID () + "." + (this.bioPolymerIndexInModel + 1);
lines = org.jmol.util.TextFormat.simpleReplace (lines, "$", prefix);
var iFirst = this.monomers[0].getResno ();
var pre = "\n" + prefix;
var sb =  new org.jmol.util.StringXBuilder ();
var sb0 =  new org.jmol.util.StringXBuilder ().append (pre + ".8: ");
var sb1 =  new org.jmol.util.StringXBuilder ().append (pre + ".7: ");
var sb2 =  new org.jmol.util.StringXBuilder ().append (pre + ".6: ");
var sb3 =  new org.jmol.util.StringXBuilder ().append (pre + ".0: ");
var i = iFirst;
for (var ii = 0; ii < this.monomerCount; ii++) {
i = this.monomers[ii].getResno ();
sb0.append (i % 100 == 0 ? "" + ((Clazz.doubleToInt (i / 100)) % 100) : " ");
sb1.append (i % 10 == 0 ? "" + ((Clazz.doubleToInt (i / 10)) % 10) : " ");
sb2.appendI (i % 10);
sb3.appendC (bsBad.get (this.monomers[ii].leadAtomIndex) ? '!' : this.monomers[ii].getGroup1 ());
}
if ((mode & 1) == 1) sb.appendSB (sb0).appendSB (sb1).appendSB (sb2);
sb.append ("\n");
sb.append (lines);
if ((mode & 2) == 2) {
sb.appendSB (sb3);
sb.append ("\n\n");
}return sb.toString ().$replace ('\0', '.');
}, $fz.isPrivate = true, $fz), "~S,org.jmol.util.BitSet,~N");
Clazz.overrideMethod (c$, "calculateStructures", 
function (alphaOnly) {
if (alphaOnly) return;
if (this.structureList == null) this.structureList = this.model.getModelSet ().getStructureList ();
var structureTags =  Clazz.newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount - 1; ++i) {
var leadingResidue = this.monomers[i];
var trailingResidue = this.monomers[i + 1];
var phi = trailingResidue.getGroupParameter (1112539143);
var psi = leadingResidue.getGroupParameter (1112539144);
if (this.isHelix (psi, phi)) {
structureTags[i] = (phi < 0 && psi < 25 ? '4' : '3');
} else if (this.isSheet (psi, phi)) {
structureTags[i] = 's';
} else if (this.isTurn (psi, phi)) {
structureTags[i] = 't';
} else {
structureTags[i] = 'n';
}if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ((0 + (this.monomers[0].getChainID ()).charCodeAt (0)) + " aminopolymer:" + i + " " + trailingResidue.getGroupParameter (1112539143) + "," + leadingResidue.getGroupParameter (1112539144) + " " + structureTags[i]);
}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == '4') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == '4'; ++end) {
}
end--;
if (end >= start + 3) {
this.addStructureProtected (org.jmol.constant.EnumStructure.HELIX, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == '3') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == '3'; ++end) {
}
end--;
if (end >= start + 3) {
this.addStructureProtected (org.jmol.constant.EnumStructure.HELIX, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == 's') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == 's'; ++end) {
}
end--;
if (end >= start + 2) {
this.addStructureProtected (org.jmol.constant.EnumStructure.SHEET, null, 0, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == 't') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == 't'; ++end) {
}
end--;
if (end >= start + 2) {
this.addStructureProtected (org.jmol.constant.EnumStructure.TURN, null, 0, 0, start, end);
}start = end;
}}
}, "~B");
Clazz.defineMethod (c$, "isTurn", 
($fz = function (psi, phi) {
return org.jmol.modelsetbio.AminoPolymer.checkPhiPsi (this.structureList.get (org.jmol.constant.EnumStructure.TURN), psi, phi);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "isSheet", 
($fz = function (psi, phi) {
return org.jmol.modelsetbio.AminoPolymer.checkPhiPsi (this.structureList.get (org.jmol.constant.EnumStructure.SHEET), psi, phi);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "isHelix", 
($fz = function (psi, phi) {
return org.jmol.modelsetbio.AminoPolymer.checkPhiPsi (this.structureList.get (org.jmol.constant.EnumStructure.HELIX), psi, phi);
}, $fz.isPrivate = true, $fz), "~N,~N");
c$.checkPhiPsi = Clazz.defineMethod (c$, "checkPhiPsi", 
($fz = function (list, psi, phi) {
for (var i = 0; i < list.length; i += 4) if (phi >= list[i] && phi <= list[i + 1] && psi >= list[i + 2] && psi <= list[i + 3]) return true;

return false;
}, $fz.isPrivate = true, $fz), "~A,~N,~N");
Clazz.overrideMethod (c$, "setStructureList", 
function (structureList) {
this.structureList = structureList;
}, "java.util.Map");
Clazz.defineStatics (c$,
"maxHbondAlphaDistance", 9,
"maxHbondAlphaDistance2", 81.0,
"minimumHbondDistance2", 0.25,
"sheetOffsets", [[0, -1, 1, 0, 1, 0, 0, -1], [0, 0, 0, 0, 1, -1, 1, -1]]);
});
// 
//// org\jmol\modelsetbio\APBridge.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (null, "org.jmol.modelsetbio.APBridge", ["java.lang.Boolean", "org.jmol.util.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.a = null;
this.b = null;
this.ladder = null;
this.isAntiparallel = false;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "APBridge");
Clazz.makeConstructor (c$, 
function (a, b, htLadders) {
this.a = a;
this.b = b;
this.ladder =  Clazz.newIntArray (2, 2, 0);
this.ladder[0][0] = this.ladder[0][1] = Math.min (a.index, b.index);
this.ladder[1][0] = this.ladder[1][1] = Math.max (a.index, b.index);
this.addLadder (htLadders);
}, "org.jmol.modelset.Atom,org.jmol.modelset.Atom,java.util.Map");
Clazz.defineMethod (c$, "addLadder", 
($fz = function (htLadders) {
htLadders.put (this.ladder, (this.isAntiparallel ? Boolean.TRUE : Boolean.FALSE));
}, $fz.isPrivate = true, $fz), "java.util.Map");
Clazz.overrideMethod (c$, "toString", 
function () {
return (this.isAntiparallel ? "a " : "p ") + this.a + " - " + this.b + "\t" + org.jmol.util.Escape.escape (this.ladder);
});
Clazz.defineMethod (c$, "addBridge", 
function (bridge, htLadders) {
if (bridge == null || bridge.isAntiparallel != this.isAntiparallel || !this.canAdd (bridge) || !bridge.canAdd (this)) return false;
this.extendLadder (bridge.ladder[0][0], bridge.ladder[1][0]);
this.extendLadder (bridge.ladder[0][1], bridge.ladder[1][1]);
bridge.ladder = this.ladder;
if (bridge.ladder !== this.ladder) {
htLadders.remove (bridge.ladder);
this.addLadder (htLadders);
}return true;
}, "org.jmol.modelsetbio.APBridge,java.util.Map");
Clazz.defineMethod (c$, "canAdd", 
($fz = function (bridge) {
var index1 = bridge.a.index;
var index2 = bridge.b.index;
return (this.isAntiparallel ? (index1 >= this.ladder[0][1] && index2 <= this.ladder[1][0] || index1 <= this.ladder[0][0] && index2 >= this.ladder[1][1]) : (index1 <= this.ladder[0][0] && index2 <= this.ladder[1][0] || index1 >= this.ladder[0][1] && index2 >= this.ladder[1][1]));
}, $fz.isPrivate = true, $fz), "org.jmol.modelsetbio.APBridge");
Clazz.defineMethod (c$, "extendLadder", 
($fz = function (index1, index2) {
if (this.ladder[0][0] > index1) this.ladder[0][0] = index1;
if (this.ladder[0][1] < index1) this.ladder[0][1] = index1;
if (this.ladder[1][0] > index2) this.ladder[1][0] = index2;
if (this.ladder[1][1] < index2) this.ladder[1][1] = index2;
}, $fz.isPrivate = true, $fz), "~N,~N");
});
// 
//// org\jmol\modelsetbio\BioModel.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelset.Model"], "org.jmol.modelsetbio.BioModel", ["java.lang.Character", "$.Float", "java.util.ArrayList", "$.Hashtable", "org.jmol.constant.EnumStructure", "org.jmol.modelsetbio.Resolver", "org.jmol.util.ArrayUtil", "$.BitSet", "$.BitSetUtil", "$.Escape", "$.StringXBuilder", "$.TextFormat", "org.jmol.viewer.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bioPolymerCount = 0;
this.bioPolymers = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "BioModel", org.jmol.modelset.Model);
Clazz.makeConstructor (c$, 
function (modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo) {
Clazz.superConstructor (this, org.jmol.modelsetbio.BioModel, [modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo]);
this.isBioModel = true;
this.clearBioPolymers ();
}, "org.jmol.modelset.ModelSet,~N,~N,~S,java.util.Properties,java.util.Map");
Clazz.defineMethod (c$, "freeze", 
function () {
Clazz.superCall (this, org.jmol.modelsetbio.BioModel, "freeze", []);
this.bioPolymers = org.jmol.util.ArrayUtil.arrayCopyObject (this.bioPolymers, this.bioPolymerCount);
});
Clazz.overrideMethod (c$, "addSecondaryStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode) {
for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].addStructure (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode);

}, "org.jmol.constant.EnumStructure,~S,~N,~N,~S,~N,~S,~N");
Clazz.overrideMethod (c$, "calculateStructures", 
function (asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha) {
if (this.bioPolymerCount == 0 || !setStructure && !asDSSP) return "";
this.modelSet.proteinStructureTainted = this.structureTainted = true;
if (setStructure) for (var i = this.bioPolymerCount; --i >= 0; ) if (!asDSSP || this.bioPolymers[i].getGroups ()[0].getNitrogenAtom () != null) this.bioPolymers[i].clearStructures ();

if (!asDSSP || includeAlpha) for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].calculateStructures (includeAlpha);

return (asDSSP ? this.bioPolymers[0].calculateDssp (this.bioPolymers, this.bioPolymerCount, null, doReport, dsspIgnoreHydrogen, setStructure) : "");
}, "~B,~B,~B,~B,~B");
Clazz.overrideMethod (c$, "setConformation", 
function (bsConformation) {
if (this.nAltLocs > 0) for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].setConformation (bsConformation);

}, "org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "getPdbConformation", 
function (bsConformation, conformationIndex) {
if (this.nAltLocs > 0) for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].getConformation (bsConformation, conformationIndex);

return true;
}, "org.jmol.util.BitSet,~N");
Clazz.overrideMethod (c$, "getBioPolymerCount", 
function () {
return this.bioPolymerCount;
});
Clazz.overrideMethod (c$, "calcSelectedMonomersCount", 
function (bsSelected) {
for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].calcSelectedMonomersCount (bsSelected);

}, "org.jmol.util.BitSet");
Clazz.defineMethod (c$, "getBioPolymer", 
function (polymerIndex) {
return this.bioPolymers[polymerIndex];
}, "~N");
Clazz.overrideMethod (c$, "getDefaultLargePDBRendering", 
function (sb, maxAtoms) {
var bs =  new org.jmol.util.BitSet ();
if (this.getBondCount () == 0) bs = this.bsAtoms;
if (bs !== this.bsAtoms) for (var i = 0; i < this.bioPolymerCount; i++) this.bioPolymers[i].getRange (bs);

if (bs.nextSetBit (0) < 0) return;
var bs2 =  new org.jmol.util.BitSet ();
if (bs === this.bsAtoms) {
bs2 = bs;
} else {
for (var i = 0; i < this.bioPolymerCount; i++) if (this.bioPolymers[i].getType () == 0) this.bioPolymers[i].getRange (bs2);

}if (bs2.nextSetBit (0) >= 0) sb.append ("select ").append (org.jmol.util.Escape.escape (bs2)).append (";backbone only;");
if (this.atomCount <= maxAtoms) return;
sb.append ("select ").append (org.jmol.util.Escape.escape (bs)).append (" & connected; wireframe only;");
if (bs !== this.bsAtoms) {
bs2.clearAll ();
bs2.or (this.bsAtoms);
bs2.andNot (bs);
if (bs2.nextSetBit (0) >= 0) sb.append ("select " + org.jmol.util.Escape.escape (bs2) + " & !connected;stars 0.5;");
}}, "org.jmol.util.StringXBuilder,~N");
Clazz.defineMethod (c$, "fixIndices", 
function (modelIndex, nAtomsDeleted, bsDeleted) {
Clazz.superCall (this, org.jmol.modelsetbio.BioModel, "fixIndices", [modelIndex, nAtomsDeleted, bsDeleted]);
for (var i = 0; i < this.bioPolymerCount; i++) this.bioPolymers[i].recalculateLeadMidpointsAndWingVectors ();

}, "~N,~N,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "calculateStruts", 
function (modelSet, bs1, bs2) {
var vCA =  new java.util.ArrayList ();
var a1 = null;
var bsCheck;
if (bs1.equals (bs2)) {
bsCheck = bs1;
} else {
bsCheck = org.jmol.util.BitSetUtil.copy (bs1);
bsCheck.or (bs2);
}var atoms = modelSet.atoms;
var viewer = modelSet.viewer;
bsCheck.and (viewer.getModelUndeletedAtomsBitSet (this.modelIndex));
for (var i = bsCheck.nextSetBit (0); i >= 0; i = bsCheck.nextSetBit (i + 1)) if (atoms[i].isVisible (0) && atoms[i].atomID == 2 && atoms[i].getGroupID () != 5) vCA.add ((a1 = atoms[i]));

if (vCA.size () == 0) return 0;
var thresh = viewer.getStrutLengthMaximum ();
var mad = Clazz.floatToShort (viewer.getStrutDefaultRadius () * 2000);
var delta = viewer.getStrutSpacingMinimum ();
var strutsMultiple = viewer.getStrutsMultiple ();
var struts = this.getBioPolymer (a1.getPolymerIndexInModel ()).calculateStruts (modelSet, bs1, bs2, vCA, thresh, delta, strutsMultiple);
for (var i = 0; i < struts.size (); i++) {
var o = struts.get (i);
modelSet.bondAtoms (o[0], o[1], 32768, mad, null, 0, false, true);
}
return struts.size ();
}, "org.jmol.modelset.ModelSet,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setStructureList", 
function (structureList) {
this.bioPolymers = org.jmol.util.ArrayUtil.arrayCopyObject (this.bioPolymers, this.bioPolymerCount);
for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].setStructureList (structureList);

}, "java.util.Map");
Clazz.overrideMethod (c$, "calculateStraightness", 
function (viewer, ctype, qtype, mStep) {
for (var p = 0; p < this.bioPolymerCount; p++) this.bioPolymers[p].getPdbData (viewer, ctype, qtype, mStep, 2, null, null, false, false, false, null, null, null,  new org.jmol.util.BitSet ());

}, "org.jmol.viewer.Viewer,~S,~S,~N");
Clazz.overrideMethod (c$, "getPolymerPointsAndVectors", 
function (bs, vList, isTraceAlpha, sheetSmoothing) {
var last = 2147483646;
for (var ip = 0; ip < this.bioPolymerCount; ip++) last = this.bioPolymers[ip].getPolymerPointsAndVectors (last, bs, vList, isTraceAlpha, sheetSmoothing);

}, "org.jmol.util.BitSet,java.util.List,~B,~N");
Clazz.overrideMethod (c$, "getPolymerLeadMidPoints", 
function (iPolymer) {
return this.bioPolymers[iPolymer].getLeadMidpoints ();
}, "~N");
Clazz.overrideMethod (c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
for (var ip = 0; ip < this.bioPolymerCount; ip++) this.bioPolymers[ip].recalculateLeadMidpointsAndWingVectors ();

});
Clazz.overrideMethod (c$, "getBioBranches", 
function (biobranches) {
var bsBranch;
for (var j = 0; j < this.bioPolymerCount; j++) {
bsBranch =  new org.jmol.util.BitSet ();
this.bioPolymers[j].getRange (bsBranch);
var iAtom = bsBranch.nextSetBit (0);
if (iAtom >= 0) {
if (biobranches == null) biobranches =  new java.util.ArrayList ();
biobranches.add (bsBranch);
}}
return biobranches;
}, "java.util.List");
Clazz.overrideMethod (c$, "getGroupsWithin", 
function (nResidues, bs, bsResult) {
for (var i = this.bioPolymerCount; --i >= 0; ) this.bioPolymers[i].getRangeGroups (nResidues, bs, bsResult);

}, "~N,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "getSequenceBits", 
function (specInfo, bs, bsResult) {
var lenInfo = specInfo.length;
for (var ip = 0; ip < this.bioPolymerCount; ip++) {
var sequence = this.bioPolymers[ip].getSequence ();
var j = -1;
while ((j = sequence.indexOf (specInfo, ++j)) >= 0) this.bioPolymers[ip].getPolymerSequenceAtoms (j, lenInfo, bs, bsResult);

}
}, "~S,org.jmol.util.BitSet,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "selectSeqcodeRange", 
function (seqcodeA, seqcodeB, chainID, bs, caseSensitive) {
var ch;
for (var i = this.chainCount; --i >= 0; ) if (chainID == (ch = this.chains[i].chainID) || chainID == '\t' || !caseSensitive && chainID == Character.toUpperCase (ch)) for (var index = 0; index >= 0; ) index = this.chains[i].selectSeqcodeRange (index, seqcodeA, seqcodeB, bs);


}, "~N,~N,~S,org.jmol.util.BitSet,~B");
Clazz.overrideMethod (c$, "getRasmolHydrogenBonds", 
function (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds) {
var doAdd = (vHBonds == null);
if (doAdd) vHBonds =  new java.util.ArrayList ();
if (nMax < 0) nMax = 2147483647;
var asDSSP = (bsB == null);
var bp;
var bp1;
if (asDSSP && this.bioPolymerCount > 0) {
this.bioPolymers[0].calculateDssp (this.bioPolymers, this.bioPolymerCount, vHBonds, false, dsspIgnoreHydrogens, false);
} else {
for (var i = this.bioPolymerCount; --i >= 0; ) {
bp = this.bioPolymers[i];
var type = bp.getType ();
if ((nucleicOnly || type != 1) && type != 2) continue;
var isRNA = bp.isRna ();
var isAmino = (type == 1);
if (isAmino) bp.calcRasmolHydrogenBonds (null, bsA, bsB, vHBonds, nMax, null, true, false);
for (var j = this.bioPolymerCount; --j >= 0; ) {
if ((bp1 = this.bioPolymers[j]) != null && (isRNA || i != j) && type == bp1.getType ()) {
bp1.calcRasmolHydrogenBonds (bp, bsA, bsB, vHBonds, nMax, null, true, false);
}}
}
}if (vHBonds.size () == 0 || !doAdd) return;
this.hasRasmolHBonds = true;
for (var i = 0; i < vHBonds.size (); i++) {
var bond = vHBonds.get (i);
var atom1 = bond.getAtom1 ();
var atom2 = bond.getAtom2 ();
if (atom1.isBonded (atom2)) continue;
var index = this.modelSet.addHBond (atom1, atom2, bond.order, bond.getEnergy ());
if (bsHBonds != null) bsHBonds.set (index);
}
}, "org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~B,~N,~B,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "clearRasmolHydrogenBonds", 
function (bsAtoms) {
var bsDelete =  new org.jmol.util.BitSet ();
this.hasRasmolHBonds = false;
var models = this.modelSet.getModels ();
var bonds = this.modelSet.getBonds ();
for (var i = this.modelSet.getBondCount (); --i >= 0; ) {
var bond = bonds[i];
var atom1 = bond.getAtom1 ();
var m = models[atom1.modelIndex];
if (!m.isBioModel || m.trajectoryBaseIndex != this.modelIndex || (bond.order & 28672) == 0) continue;
if (bsAtoms != null && !bsAtoms.get (atom1.index)) {
this.hasRasmolHBonds = true;
continue;
}bsDelete.set (i);
}
if (bsDelete.nextSetBit (0) >= 0) this.modelSet.deleteBonds (bsDelete, false);
}, "org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "calculatePolymers", 
function (groups, groupCount, baseGroupIndex, modelsExcluded) {
if (groups == null) {
groups = this.modelSet.getGroups ();
groupCount = groups.length;
}if (modelsExcluded != null) for (var i = 0; i < groupCount; ++i) {
var group = groups[i];
if (Clazz.instanceOf (group, org.jmol.modelsetbio.Monomer)) {
var monomer = group;
if (monomer.getBioPolymer () != null && (!modelsExcluded.get (monomer.getModelIndex ()))) monomer.setBioPolymer (null, -1);
}}
var checkPolymerConnections = !this.modelSet.viewer.isPdbSequential ();
for (var i = baseGroupIndex; i < groupCount; ++i) {
var g = groups[i];
var model = g.getModel ();
if (!model.isBioModel || !(Clazz.instanceOf (g, org.jmol.modelsetbio.Monomer))) continue;
var doCheck = checkPolymerConnections && !this.modelSet.isJmolDataFrameForModel (this.modelSet.atoms[g.firstAtomIndex].modelIndex);
var bp = ((g).getBioPolymer () == null ? org.jmol.modelsetbio.Resolver.allocateBioPolymer (groups, i, doCheck) : null);
if (bp == null || bp.monomerCount == 0) continue;
(model).addBioPolymer (bp);
i += bp.monomerCount - 1;
}
}, "~A,~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "addBioPolymer", 
($fz = function (polymer) {
if (this.bioPolymers.length == 0) this.clearBioPolymers ();
if (this.bioPolymerCount == this.bioPolymers.length) this.bioPolymers = org.jmol.util.ArrayUtil.doubleLength (this.bioPolymers);
polymer.bioPolymerIndexInModel = this.bioPolymerCount;
this.bioPolymers[this.bioPolymerCount++] = polymer;
}, $fz.isPrivate = true, $fz), "org.jmol.modelsetbio.BioPolymer");
Clazz.overrideMethod (c$, "clearBioPolymers", 
function () {
this.bioPolymers =  new Array (8);
this.bioPolymerCount = 0;
});
Clazz.overrideMethod (c$, "getAllPolymerInfo", 
function (bs, finalInfo, modelVector) {
var modelInfo =  new java.util.Hashtable ();
var info =  new java.util.ArrayList ();
for (var ip = 0; ip < this.bioPolymerCount; ip++) {
var polyInfo = this.bioPolymers[ip].getPolymerInfo (bs);
if (!polyInfo.isEmpty ()) info.add (polyInfo);
}
if (info.size () > 0) {
modelInfo.put ("modelIndex", Integer.$valueOf (this.modelIndex));
modelInfo.put ("polymers", info);
modelVector.add (modelInfo);
}}, "org.jmol.util.BitSet,java.util.Map,java.util.List");
Clazz.defineMethod (c$, "getChimeInfo", 
function (sb, nHetero) {
var n = 0;
var models = this.modelSet.getModels ();
var modelCount = this.modelSet.getModelCount ();
var atomCount = this.modelSet.getAtomCount ();
var atoms = this.modelSet.atoms;
sb.append ("\nMolecule name ....... " + this.modelSet.getModelSetAuxiliaryInfoValue ("COMPND"));
sb.append ("\nSecondary Structure . PDB Data Records");
sb.append ("\nBrookhaven Code ..... " + this.modelSet.modelSetName);
for (var i = modelCount; --i >= 0; ) n += models[i].getChainCount (false);

sb.append ("\nNumber of Chains .... " + n);
n = 0;
for (var i = modelCount; --i >= 0; ) n += models[i].getGroupCountHetero (false);

nHetero = 0;
for (var i = modelCount; --i >= 0; ) nHetero += models[i].getGroupCountHetero (true);

sb.append ("\nNumber of Groups .... " + n);
if (nHetero > 0) sb.append (" (" + nHetero + ")");
for (var i = atomCount; --i >= 0; ) if (atoms[i].isHetero ()) nHetero++;

Clazz.superCall (this, org.jmol.modelsetbio.BioModel, "getChimeInfo", [sb, nHetero]);
var nH = 0;
var nS = 0;
var nT = 0;
var id;
var lastid = -1;
for (var i = 0; i < atomCount; i++) {
if (atoms[i].modelIndex != 0) break;
if ((id = atoms[i].getStrucNo ()) != lastid && id != 0) {
lastid = id;
switch (atoms[i].getProteinStructureType ()) {
case org.jmol.constant.EnumStructure.HELIX:
nH++;
break;
case org.jmol.constant.EnumStructure.SHEET:
nS++;
break;
case org.jmol.constant.EnumStructure.TURN:
nT++;
break;
}
}}
sb.append ("\nNumber of Helices ... " + nH);
sb.append ("\nNumber of Strands ... " + nS);
sb.append ("\nNumber of Turns ..... " + nT);
}, "org.jmol.util.StringXBuilder,~N");
Clazz.overrideMethod (c$, "getProteinStructureState", 
function (bsAtoms, taintedOnly, needPhiPsi, mode) {
var showMode = (mode == 3);
var pdbFileMode = (mode == 1);
var scriptMode = (mode == 0);
var bs = null;
var cmd =  new org.jmol.util.StringXBuilder ();
var sbTurn =  new org.jmol.util.StringXBuilder ();
var sbHelix =  new org.jmol.util.StringXBuilder ();
var sbSheet =  new org.jmol.util.StringXBuilder ();
var type = org.jmol.constant.EnumStructure.NONE;
var subtype = org.jmol.constant.EnumStructure.NONE;
var id = 0;
var iLastAtom = 0;
var iLastModel = -1;
var lastId = -1;
var res1 = 0;
var res2 = 0;
var sid = "";
var group1 = "";
var group2 = "";
var chain1 = "";
var chain2 = "";
var n = 0;
var nHelix = 0;
var nTurn = 0;
var nSheet = 0;
var bsTainted = null;
var models = this.modelSet.getModels ();
var atoms = this.modelSet.atoms;
var atomCount = this.modelSet.getAtomCount ();
if (taintedOnly) {
if (!this.modelSet.proteinStructureTainted) return "";
bsTainted =  new org.jmol.util.BitSet ();
for (var i = this.firstAtomIndex; i < atomCount; i++) if (models[atoms[i].modelIndex].isStructureTainted ()) bsTainted.set (i);

bsTainted.set (atomCount);
}for (var i = 0; i <= atomCount; i++) if (i == atomCount || bsAtoms == null || bsAtoms.get (i)) {
if (taintedOnly && !bsTainted.get (i)) continue;
id = 0;
if (i == atomCount || (id = atoms[i].getStrucNo ()) != lastId) {
if (bs != null) {
switch (type) {
case org.jmol.constant.EnumStructure.HELIX:
case org.jmol.constant.EnumStructure.TURN:
case org.jmol.constant.EnumStructure.SHEET:
n++;
if (scriptMode) {
var iModel = atoms[iLastAtom].modelIndex;
var comment = "    \t# model=" + this.modelSet.getModelNumberDotted (iModel);
if (iLastModel != iModel) {
iLastModel = iModel;
cmd.append ("  structure none ").append (org.jmol.util.Escape.escape (this.modelSet.getModelAtomBitSetIncludingDeleted (iModel, false))).append (comment).append (";\n");
}comment += " & (" + res1 + " - " + res2 + ")";
var stype = subtype.getBioStructureTypeName (false);
cmd.append ("  structure ").append (stype).append (" ").append (org.jmol.util.Escape.escape (bs)).append (comment).append (";\n");
} else {
var str;
var nx;
var sb;
switch (type) {
case org.jmol.constant.EnumStructure.HELIX:
nx = ++nHelix;
if (sid == null || pdbFileMode) sid = org.jmol.util.TextFormat.formatStringI ("%3N %3N", "N", nx);
str = "HELIX  %ID %3GROUPA %1CA %4RESA  %3GROUPB %1CB %4RESB";
sb = sbHelix;
var stype = null;
switch (subtype) {
case org.jmol.constant.EnumStructure.HELIX:
case org.jmol.constant.EnumStructure.HELIXALPHA:
stype = "  1";
break;
case org.jmol.constant.EnumStructure.HELIX310:
stype = "  5";
break;
case org.jmol.constant.EnumStructure.HELIXPI:
stype = "  3";
break;
}
if (stype != null) str += stype;
break;
case org.jmol.constant.EnumStructure.SHEET:
nx = ++nSheet;
if (sid == null || pdbFileMode) {
sid = org.jmol.util.TextFormat.formatStringI ("%3N %3A 0", "N", nx);
sid = org.jmol.util.TextFormat.formatStringS (sid, "A", "S" + nx);
}str = "SHEET  %ID %3GROUPA %1CA%4RESA  %3GROUPB %1CB%4RESB";
sb = sbSheet;
break;
case org.jmol.constant.EnumStructure.TURN:
default:
nx = ++nTurn;
if (sid == null || pdbFileMode) sid = org.jmol.util.TextFormat.formatStringI ("%3N %3N", "N", nx);
str = "TURN   %ID %3GROUPA %1CA%4RESA  %3GROUPB %1CB%4RESB";
sb = sbTurn;
break;
}
str = org.jmol.util.TextFormat.formatStringS (str, "ID", sid);
str = org.jmol.util.TextFormat.formatStringS (str, "GROUPA", group1);
str = org.jmol.util.TextFormat.formatStringS (str, "CA", chain1);
str = org.jmol.util.TextFormat.formatStringI (str, "RESA", res1);
str = org.jmol.util.TextFormat.formatStringS (str, "GROUPB", group2);
str = org.jmol.util.TextFormat.formatStringS (str, "CB", chain2);
str = org.jmol.util.TextFormat.formatStringI (str, "RESB", res2);
sb.append (str);
if (showMode) sb.append (" strucno= ").appendI (lastId);
sb.append ("\n");
}}
bs = null;
}if (id == 0 || bsAtoms != null && needPhiPsi && (Float.isNaN (atoms[i].getGroupParameter (1112539143)) || Float.isNaN (atoms[i].getGroupParameter (1112539144)))) continue;
}var ch = atoms[i].getChainID ();
if (ch.charCodeAt (0) == 0) ch = ' ';
if (bs == null) {
bs =  new org.jmol.util.BitSet ();
res1 = atoms[i].getResno ();
group1 = atoms[i].getGroup3 (false);
chain1 = "" + ch;
}type = atoms[i].getProteinStructureType ();
subtype = atoms[i].getProteinStructureSubType ();
sid = atoms[i].getProteinStructureTag ();
bs.set (i);
lastId = id;
res2 = atoms[i].getResno ();
group2 = atoms[i].getGroup3 (false);
chain2 = "" + ch;
iLastAtom = i;
}
if (n > 0) cmd.append ("\n");
return (scriptMode ? cmd.toString () : sbHelix.appendSB (sbSheet).appendSB (sbTurn).appendSB (cmd).toString ());
}, "org.jmol.util.BitSet,~B,~B,~N");
Clazz.overrideMethod (c$, "getFullPDBHeader", 
function () {
if (this.modelIndex < 0) return "";
var info = this.auxiliaryInfo.get ("fileHeader");
if (info != null) return info;
info = this.modelSet.viewer.getCurrentFileAsString ();
var ichMin = info.length;
for (var i = org.jmol.modelsetbio.BioModel.pdbRecords.length; --i >= 0; ) {
var ichFound;
var strRecord = org.jmol.modelsetbio.BioModel.pdbRecords[i];
switch (ichFound = (info.startsWith (strRecord) ? 0 : info.indexOf ("\n" + strRecord))) {
case -1:
continue;
case 0:
this.auxiliaryInfo.put ("fileHeader", "");
return "";
default:
if (ichFound < ichMin) ichMin = ++ichFound;
}
}
info = info.substring (0, ichMin);
this.auxiliaryInfo.put ("fileHeader", info);
return info;
});
Clazz.overrideMethod (c$, "getPdbData", 
function (viewer, type, ctype, isDraw, bsSelected, sb, tokens, pdbCONECT, bsWritten) {
var bothEnds = false;
var qtype = (ctype != 'R' ? 'r' : type.length > 13 && type.indexOf ("ramachandran ") >= 0 ? type.charAt (13) : 'R');
if (qtype == 'r') qtype = viewer.getQuaternionFrame ();
var mStep = viewer.getHelixStep ();
var derivType = (type.indexOf ("diff") < 0 ? 0 : type.indexOf ("2") < 0 ? 1 : 2);
if (!isDraw) {
sb.append ("REMARK   6 Jmol PDB-encoded data: " + type + ";");
if (ctype != 'R') {
sb.append ("  quaternionFrame = \"" + qtype + "\"");
bothEnds = true;
}sb.append ("\nREMARK   6 Jmol Version ").append (org.jmol.viewer.Viewer.getJmolVersion ()).append ("\n");
if (ctype == 'R') sb.append ("REMARK   6 Jmol data min = {-180 -180 -180} max = {180 180 180} unScaledXyz = xyz * {1 1 1} + {0 0 0} plotScale = {100 100 100}\n");
 else sb.append ("REMARK   6 Jmol data min = {-1 -1 -1} max = {1 1 1} unScaledXyz = xyz * {0.1 0.1 0.1} + {0 0 0} plotScale = {100 100 100}\n");
}for (var p = 0; p < this.bioPolymerCount; p++) this.bioPolymers[p].getPdbData (viewer, ctype, qtype, mStep, derivType, this.bsAtoms, bsSelected, bothEnds, isDraw, p == 0, tokens, sb, pdbCONECT, bsWritten);

}, "org.jmol.viewer.Viewer,~S,~S,~B,org.jmol.util.BitSet,org.jmol.io.OutputStringBuilder,~A,org.jmol.util.StringXBuilder,org.jmol.util.BitSet");
Clazz.defineStatics (c$,
"pdbRecords", ["ATOM  ", "MODEL ", "HETATM"]);
});
// 
//// org\jmol\modelsetbio\CarbohydrateMonomer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.Monomer"], "org.jmol.modelsetbio.CarbohydrateMonomer", ["org.jmol.constant.EnumStructure"], function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "CarbohydrateMonomer", org.jmol.modelsetbio.Monomer);
c$.validateAndAllocate = Clazz.defineMethod (c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstIndex, lastIndex) {
return  new org.jmol.modelsetbio.CarbohydrateMonomer (chain, group3, seqcode, firstIndex, lastIndex, org.jmol.modelsetbio.CarbohydrateMonomer.alphaOffsets);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N");
Clazz.overrideMethod (c$, "isCarbohydrate", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return org.jmol.constant.EnumStructure.CARBOHYDRATE;
});
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) for (var j = possiblyPreviousMonomer.firstAtomIndex; j <= possiblyPreviousMonomer.lastAtomIndex; j++) {
var a = this.chain.getAtom (i);
var b = this.chain.getAtom (j);
if (a.getElementNumber () + b.getElementNumber () == 14 && a.distanceSquared (b) < 3.24) return true;
}

return false;
}, "org.jmol.modelsetbio.Monomer");
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var anomericO = this.getLeadAtom ();
var marBegin = (Clazz.doubleToInt (madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (anomericO.screenZ == 0) return;
var radiusBegin = this.scaleToScreen (anomericO.screenZ, marBegin);
if (radiusBegin < 4) radiusBegin = 4;
if (this.isCursorOnTopOf (anomericO, x, y, radiusBegin, competitor)) closest[0] = anomericO;
}, "~N,~N,~A,~N,~N");
Clazz.overrideMethod (c$, "isConnectedPrevious", 
function () {
if (this.monomerIndex <= 0) return false;
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) {
if (this.getCrossLink (i, null)) return true;
}
return false;
});
Clazz.defineStatics (c$,
"alphaOffsets", [0]);
});
// 
//// org\jmol\modelsetbio\CarbohydratePolymer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.BioPolymer"], "org.jmol.modelsetbio.CarbohydratePolymer", null, function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "CarbohydratePolymer", org.jmol.modelsetbio.BioPolymer);
Clazz.makeConstructor (c$, 
function (monomers) {
Clazz.superConstructor (this, org.jmol.modelsetbio.CarbohydratePolymer, [monomers]);
this.type = 3;
}, "~A");
});
// 
//// org\jmol\modelsetbio\PhosphorusMonomer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.Monomer"], "org.jmol.modelsetbio.PhosphorusMonomer", ["org.jmol.constant.EnumStructure", "org.jmol.util.Quaternion", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$isPurine = false;
this.$isPyrimidine = false;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "PhosphorusMonomer", org.jmol.modelsetbio.Monomer);
Clazz.overrideMethod (c$, "isNucleic", 
function () {
return true;
});
c$.validateAndAllocateP = Clazz.defineMethod (c$, "validateAndAllocateP", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
if (firstIndex != lastIndex || specialAtomIndexes[13] != firstIndex) return null;
return  new org.jmol.modelsetbio.PhosphorusMonomer (chain, group3, seqcode, firstIndex, lastIndex, org.jmol.modelsetbio.PhosphorusMonomer.phosphorusOffsets);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.makeConstructor (c$, 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets) {
Clazz.superConstructor (this, org.jmol.modelsetbio.PhosphorusMonomer, [chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets]);
if (group3.indexOf ('T') >= 0) chain.isDna = true;
if (group3.indexOf ('U') + group3.indexOf ('I') > -2) chain.isRna = true;
this.$isPurine = (group3.indexOf ('A') + group3.indexOf ('G') + group3.indexOf ('I') > -3);
this.$isPyrimidine = (group3.indexOf ('T') + group3.indexOf ('C') + group3.indexOf ('U') > -3);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getP", 
function () {
return this.getAtomFromOffsetIndex (0);
});
Clazz.defineMethod (c$, "isPhosphorusMonomer", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isDna", 
function () {
return this.chain.isDna;
});
Clazz.overrideMethod (c$, "isRna", 
function () {
return this.chain.isRna;
});
Clazz.overrideMethod (c$, "isPurine", 
function () {
return this.$isPurine;
});
Clazz.overrideMethod (c$, "isPyrimidine", 
function () {
return this.$isPyrimidine;
});
Clazz.overrideMethod (c$, "getStructure", 
function () {
return this.chain;
});
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return org.jmol.constant.EnumStructure.NONE;
});
Clazz.overrideMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var distance = this.getLeadAtom ().distance (possiblyPreviousMonomer.getLeadAtom ());
return distance <= org.jmol.modelsetbio.PhosphorusMonomer.MAX_ADJACENT_PHOSPHORUS_DISTANCE;
}, "org.jmol.modelsetbio.Monomer");
Clazz.overrideMethod (c$, "getQuaternion", 
function (qType) {
var i = this.monomerIndex;
if (i == 0 || i >= this.bioPolymer.monomerCount - 1) return null;
var ptP = this.bioPolymer.monomers[i].getAtomFromOffsetIndex (0);
var ptA;
var ptB;
ptA = this.bioPolymer.monomers[i + 1].getAtomFromOffsetIndex (0);
ptB = this.bioPolymer.monomers[i - 1].getAtomFromOffsetIndex (0);
if (ptP == null || ptA == null || ptB == null) return null;
var vA =  new org.jmol.util.Vector3f ();
var vB =  new org.jmol.util.Vector3f ();
vA.sub2 (ptA, ptP);
vB.sub2 (ptB, ptP);
return org.jmol.util.Quaternion.getQuaternionFrameV (vA, vB, null, false);
}, "~S");
Clazz.overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
return this.getAtomFromOffsetIndex (0);
}, "~S");
Clazz.overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz.defineStatics (c$,
"P", 0,
"phosphorusOffsets", [0],
"MAX_ADJACENT_PHOSPHORUS_DISTANCE", 8.0);
});
// 
//// org\jmol\modelsetbio\NucleicMonomer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.PhosphorusMonomer", "org.jmol.viewer.JmolConstants"], "org.jmol.modelsetbio.NucleicMonomer", ["org.jmol.constant.EnumStructure", "org.jmol.util.Point3f", "$.Quaternion", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hasRnaO2Prime = false;
this.baseCenter = null;
Clazz.instantialize (this, arguments);
}, org.jmol.modelsetbio, "NucleicMonomer", org.jmol.modelsetbio.PhosphorusMonomer);
c$.validateAndAllocate = Clazz.defineMethod (c$, "validateAndAllocate", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes) {
var offsets = org.jmol.modelsetbio.Monomer.scanForOffsets (firstAtomIndex, specialAtomIndexes, org.jmol.modelsetbio.NucleicMonomer.interestingNucleicAtomIDs);
if (offsets == null) return null;
if (!org.jmol.modelsetbio.Monomer.checkOptional (offsets, 19, firstAtomIndex, specialAtomIndexes[73])) return null;
org.jmol.modelsetbio.Monomer.checkOptional (offsets, 20, firstAtomIndex, specialAtomIndexes[89]);
org.jmol.modelsetbio.Monomer.checkOptional (offsets, 18, firstAtomIndex, specialAtomIndexes[90]);
org.jmol.modelsetbio.Monomer.checkOptional (offsets, 23, firstAtomIndex, specialAtomIndexes[75]);
org.jmol.modelsetbio.Monomer.checkOptional (offsets, 24, firstAtomIndex, specialAtomIndexes[77]);
var nucleicMonomer =  new org.jmol.modelsetbio.NucleicMonomer (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
return nucleicMonomer;
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.makeConstructor (c$, 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets) {
Clazz.superConstructor (this, org.jmol.modelsetbio.NucleicMonomer, [chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets]);
if (!org.jmol.modelsetbio.Monomer.have (offsets, 15)) {
offsets[0] = offsets[19];
var offset = offsets[0] & 0xFF;
if (offset != 255) this.leadAtomIndex = firstAtomIndex + offset;
}this.hasRnaO2Prime = org.jmol.modelsetbio.Monomer.have (offsets, 2);
this.$isPyrimidine = org.jmol.modelsetbio.Monomer.have (offsets, 8);
this.$isPurine = org.jmol.modelsetbio.Monomer.have (offsets, 9) && org.jmol.modelsetbio.Monomer.have (offsets, 10) && org.jmol.modelsetbio.Monomer.have (offsets, 11);
}, "org.jmol.modelset.Chain,~S,~N,~N,~N,~A");
Clazz.defineMethod (c$, "isNucleicMonomer", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isDna", 
function () {
return !this.hasRnaO2Prime;
});
Clazz.overrideMethod (c$, "isRna", 
function () {
return this.hasRnaO2Prime;
});
Clazz.overrideMethod (c$, "isPurine", 
function () {
return this.$isPurine;
});
Clazz.overrideMethod (c$, "isPyrimidine", 
function () {
return this.$isPyrimidine;
});
Clazz.defineMethod (c$, "isGuanine", 
function () {
return org.jmol.modelsetbio.Monomer.have (this.offsets, 17);
});
Clazz.overrideMethod (c$, "getProteinStructureType", 
function () {
return (this.hasRnaO2Prime ? org.jmol.constant.EnumStructure.RNA : org.jmol.constant.EnumStructure.DNA);
});
Clazz.defineMethod (c$, "getC1P", 
function () {
return this.getAtomFromOffsetIndex (25);
});
Clazz.defineMethod (c$, "getC2", 
function () {
return this.getAtomFromOffsetIndex (5);
});
Clazz.defineMethod (c$, "getC4P", 
function () {
return this.getAtomFromOffsetIndex (26);
});
Clazz.defineMethod (c$, "getN1", 
function () {
return this.getAtomFromOffsetIndex (4);
});
Clazz.defineMethod (c$, "getN3", 
function () {
return this.getAtomFromOffsetIndex (6);
});
Clazz.defineMethod (c$, "getN2", 
function () {
return this.getAtomFromOffsetIndex (17);
});
Clazz.defineMethod (c$, "getN4", 
function () {
return this.getAtomFromOffsetIndex (14);
});
Clazz.defineMethod (c$, "getN6", 
function () {
return this.getAtomFromOffsetIndex (16);
});
Clazz.defineMethod (c$, "getO2", 
function () {
return this.getAtomFromOffsetIndex (8);
});
Clazz.defineMethod (c$, "getO4", 
function () {
return this.getAtomFromOffsetIndex (12);
});
Clazz.defineMethod (c$, "getO6", 
function () {
return this.getAtomFromOffsetIndex (13);
});
Clazz.overrideMethod (c$, "getTerminatorAtom", 
function () {
return this.getAtomFromOffsetIndex (org.jmol.modelsetbio.Monomer.have (this.offsets, 20) ? 20 : 21);
});
Clazz.defineMethod (c$, "getBaseRing6Points", 
function (ring6Points) {
for (var i = 6; --i >= 0; ) ring6Points[i] = this.getAtomFromOffsetIndex (org.jmol.modelsetbio.NucleicMonomer.ring6OffsetIndexes[i]);

}, "~A");
Clazz.defineMethod (c$, "maybeGetBaseRing5Points", 
function (ring5Points) {
if (this.$isPurine) for (var i = 5; --i >= 0; ) ring5Points[i] = this.getAtomFromOffsetIndex (org.jmol.modelsetbio.NucleicMonomer.ring5OffsetIndexes[i]);

return this.$isPurine;
}, "~A");
Clazz.defineMethod (c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var myPhosphorusAtom = this.getAtomFromOffsetIndex (15);
if (myPhosphorusAtom == null) return false;
var other = possiblyPreviousMonomer;
if (other.getAtomFromOffsetIndex (21).isBonded (myPhosphorusAtom)) return true;
return Clazz.superCall (this, org.jmol.modelsetbio.NucleicMonomer, "isConnectedAfter", [possiblyPreviousMonomer]);
}, "org.jmol.modelsetbio.Monomer");
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (x, y, closest, madBegin, madEnd) {
var competitor = closest[0];
var lead = this.getLeadAtom ();
var o5prime = this.getAtomFromOffsetIndex (19);
var c3prime = this.getAtomFromOffsetIndex (22);
var mar = (Clazz.doubleToInt (madBegin / 2));
if (mar < 1900) mar = 1900;
var radius = this.scaleToScreen (lead.screenZ, mar);
if (radius < 4) radius = 4;
if (this.isCursorOnTopOf (lead, x, y, radius, competitor) || this.isCursorOnTopOf (o5prime, x, y, radius, competitor) || this.isCursorOnTopOf (c3prime, x, y, radius, competitor)) closest[0] = lead;
}, "~N,~N,~A,~N,~N");
Clazz.defineMethod (c$, "setModelClickability", 
function () {
var atom;
if (this.isAtomHidden (this.leadAtomIndex)) return;
for (var i = 6; --i >= 0; ) {
atom = this.getAtomFromOffsetIndex (org.jmol.modelsetbio.NucleicMonomer.ring6OffsetIndexes[i]);
atom.setClickable (org.jmol.modelsetbio.NucleicMonomer.CARTOON_VISIBILITY_FLAG);
}
if (this.$isPurine) for (var i = 4; --i >= 1; ) {
atom = this.getAtomFromOffsetIndex (org.jmol.modelsetbio.NucleicMonomer.ring5OffsetIndexes[i]);
atom.setClickable (org.jmol.modelsetbio.NucleicMonomer.CARTOON_VISIBILITY_FLAG);
}
});
Clazz.defineMethod (c$, "getN0", 
function () {
return (this.getAtomFromOffsetIndex (this.$isPurine ? 11 : 4));
});
Clazz.overrideMethod (c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz.overrideMethod (c$, "getQuaternionFrameCenter", 
function (qType) {
switch (qType) {
case 'x':
case 'a':
case 'b':
case 'p':
return this.getP ();
case 'c':
if (this.baseCenter == null) {
var n = 0;
this.baseCenter =  new org.jmol.util.Point3f ();
for (var i = 0; i < org.jmol.modelsetbio.NucleicMonomer.heavyAtomIndexes.length; i++) {
var a = this.getAtomFromOffsetIndex (org.jmol.modelsetbio.NucleicMonomer.heavyAtomIndexes[i]);
if (a == null) continue;
this.baseCenter.add (a);
n++;
}
this.baseCenter.scale (1 / n);
}return this.baseCenter;
case 'n':
default:
return this.getN0 ();
}
}, "~S");
Clazz.defineMethod (c$, "getQuaternion", 
function (qType) {
var ptA = null;
var ptB = null;
var ptNorP;
var yBased = false;
var reverseY = false;
switch (qType) {
case 'a':
ptNorP = this.getP ();
if (this.monomerIndex == 0 || ptNorP == null) return null;
yBased = true;
ptA = (this.bioPolymer.monomers[this.monomerIndex - 1]).getC4P ();
ptB = this.getC4P ();
break;
case 'x':
ptNorP = this.getP ();
if (this.monomerIndex == this.bioPolymer.monomerCount - 1 || ptNorP == null) return null;
ptA = (this.bioPolymer.monomers[this.monomerIndex + 1]).getP ();
ptB = this.getC4P ();
break;
case 'b':
return Clazz.superCall (this, org.jmol.modelsetbio.NucleicMonomer, "getQuaternion", [qType]);
case 'c':
case 'n':
ptNorP = this.getN0 ();
if (ptNorP == null) return null;
yBased = true;
reverseY = true;
ptA = this.getAtomFromOffsetIndex (5);
ptB = this.getAtomFromOffsetIndex (25);
break;
case 'p':
ptNorP = this.getP ();
if (ptNorP == null) return null;
var p1 = this.getAtomFromOffsetIndex (23);
var p2 = this.getAtomFromOffsetIndex (24);
var bonds = ptNorP.getBonds ();
if (bonds == null) return null;
var g = ptNorP.getGroup ();
for (var i = 0; i < bonds.length; i++) {
var atom = bonds[i].getOtherAtom (ptNorP);
if (p1 != null && atom.index == p1.index) continue;
if (p2 != null && atom.index == p2.index) continue;
if (atom.getGroup () === g) ptB = atom;
 else ptA = atom;
}
break;
case 'q':
return null;
default:
ptNorP = this.getN0 ();
if (ptNorP == null) return null;
if (this.$isPurine) {
ptA = this.getAtomFromOffsetIndex (5);
ptB = this.getAtomFromOffsetIndex (9);
} else {
ptA = this.getAtomFromOffsetIndex (6);
ptB = this.getAtomFromOffsetIndex (1);
}break;
}
if (ptA == null || ptB == null) return null;
var vA = org.jmol.util.Vector3f.newV (ptA);
vA.sub (ptNorP);
var vB = org.jmol.util.Vector3f.newV (ptB);
vB.sub (ptNorP);
if (reverseY) vB.scale (-1);
return org.jmol.util.Quaternion.getQuaternionFrameV (vA, vB, null, yBased);
}, "~S");
Clazz.overrideMethod (c$, "isCrossLinked", 
function (g) {
if (!(Clazz.instanceOf (g, org.jmol.modelsetbio.NucleicMonomer)) || this.$isPurine == g.isPurine ()) return false;
var otherNucleotide = (this.$isPurine ? g : this);
var myNucleotide = (this.$isPurine ? this : g);
var myN1 = myNucleotide.getN1 ();
var otherN3 = otherNucleotide.getN3 ();
return (myN1.isBonded (otherN3));
}, "org.jmol.modelset.Group");
Clazz.overrideMethod (c$, "getCrossLinkLead", 
function (vReturn) {
var N = (this.$isPurine ? this.getN1 () : this.getN3 ());
var bonds = N.getBonds ();
if (bonds == null) return false;
var haveCrossLinks = false;
for (var i = 0; i < bonds.length; i++) {
if (bonds[i].isHydrogen ()) {
var N2 = bonds[i].getOtherAtom (N);
var g = N2.getGroup ();
if (!(Clazz.instanceOf (g, org.jmol.modelsetbio.NucleicMonomer))) continue;
var m = g;
if ((this.$isPurine ? m.getN3 () : m.getN1 ()) === N2) {
if (vReturn == null) return true;
vReturn.add (Integer.$valueOf (m.leadAtomIndex));
haveCrossLinks = true;
}}}
return haveCrossLinks;
}, "java.util.List");
Clazz.defineMethod (c$, "getEdgePoints", 
function (pts) {
pts[0] = this.getLeadAtom ();
pts[1] = this.getC4P ();
pts[2] = pts[5] = this.getC1P ();
switch (this.getGroup1 ()) {
case 'C':
pts[3] = this.getO2 ();
pts[4] = this.getN4 ();
return true;
case 'A':
pts[3] = this.getC2 ();
pts[4] = this.getN6 ();
return true;
case 'G':
case 'I':
pts[3] = this.getC2 ();
pts[4] = this.getO6 ();
return true;
case 'T':
case 'U':
pts[3] = this.getO2 ();
pts[4] = this.getO4 ();
return true;
default:
return false;
}
}, "~A");
Clazz.defineStatics (c$,
"C6", 1,
"O2Pr", 2,
"C5", 3,
"N1", 4,
"C2", 5,
"N3", 6,
"C4", 7,
"O2", 8,
"N7", 9,
"C8", 10,
"N9", 11,
"O4", 12,
"O6", 13,
"N4", 14,
"NP", 15,
"N6", 16,
"N2", 17,
"H5T", 18,
"O5Pr", 19,
"H3T", 20,
"O3Pr", 21,
"C3Pr", 22,
"O1P", 23,
"O2P", 24,
"C1P", 25,
"C4P", 26,
"interestingNucleicAtomIDs", [-14, 37, -80, 36, 32, 33, 34, 35, -39, -40, -41, -42, -48, -47, -43, -14, -45, -44, -73, -7, -89, 10, 9, -75, -77, -13, -9],
"ring6OffsetIndexes", [3, 1, 4, 5, 6, 7],
"ring5OffsetIndexes", [3, 9, 10, 11, 7],
"heavyAtomIndexes", [3, 1, 4, 5, 6, 7, 11, 10, 9, 16, 14, 8, 12, 17, 13]);
c$.CARTOON_VISIBILITY_FLAG = c$.prototype.CARTOON_VISIBILITY_FLAG = org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (11);
});
// 
//// org\jmol\modelsetbio\NucleicPolymer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.BioPolymer"], "org.jmol.modelsetbio.NucleicPolymer", ["org.jmol.modelset.HBond", "org.jmol.util.Measure", "$.Point4f", "$.Vector3f"], function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "NucleicPolymer", org.jmol.modelsetbio.BioPolymer);
Clazz.makeConstructor (c$, 
function (monomers) {
Clazz.superConstructor (this, org.jmol.modelsetbio.NucleicPolymer, [monomers]);
this.type = 2;
this.hasWingPoints = true;
}, "~A");
Clazz.defineMethod (c$, "getNucleicPhosphorusAtom", 
function (monomerIndex) {
return this.monomers[monomerIndex].getLeadAtom ();
}, "~N");
Clazz.overrideMethod (c$, "calcEtaThetaAngles", 
function () {
var eta = NaN;
for (var i = 0; i < this.monomerCount - 2; ++i) {
var m1 = this.monomers[i];
var m2 = this.monomers[i + 1];
var p1 = m1.getP ();
var c41 = m1.getC4P ();
var p2 = m2.getP ();
var c42 = m2.getC4P ();
if (i > 0) {
var m0 = this.monomers[i - 1];
var c40 = m0.getC4P ();
eta = org.jmol.util.Measure.computeTorsion (c40, p1, c41, p2, true);
}var theta = org.jmol.util.Measure.computeTorsion (p1, c41, p2, c42, true);
if (eta < 0) eta += 360;
if (theta < 0) theta += 360;
m1.setGroupParameter (1112539140, eta);
m1.setGroupParameter (1112539150, theta);
}
return true;
});
Clazz.overrideMethod (c$, "calcRasmolHydrogenBonds", 
function (polymer, bsA, bsB, vAtoms, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens) {
var other = polymer;
var vNorm =  new org.jmol.util.Vector3f ();
var vAB =  new org.jmol.util.Vector3f ();
var vAC =  new org.jmol.util.Vector3f ();
for (var i = this.monomerCount; --i >= 0; ) {
var myNucleotide = this.monomers[i];
if (!myNucleotide.isPurine ()) continue;
var myN3 = myNucleotide.getN3 ();
var isInA = bsA.get (myN3.index);
if (!isInA && !bsB.get (myN3.index)) continue;
var myN1 = myNucleotide.getN1 ();
var myN9 = myNucleotide.getN0 ();
var plane =  new org.jmol.util.Point4f ();
org.jmol.util.Measure.getPlaneThroughPoints (myN3, myN1, myN9, vNorm, vAB, vAC, plane);
var bestN3 = null;
var minDist2 = 25;
var bestNucleotide = null;
for (var j = other.monomerCount; --j >= 0; ) {
var otherNucleotide = other.monomers[j];
if (!otherNucleotide.isPyrimidine ()) continue;
var otherN3 = otherNucleotide.getN3 ();
if (isInA ? !bsB.get (otherN3.index) : !bsA.get (otherN3.index)) continue;
var otherN1 = otherNucleotide.getN0 ();
var dist2 = myN1.distanceSquared (otherN3);
if (dist2 < minDist2 && myN9.distanceSquared (otherN1) > 50 && Math.abs (org.jmol.util.Measure.distanceToPlane (plane, otherN3)) < 1) {
bestNucleotide = otherNucleotide;
bestN3 = otherN3;
minDist2 = dist2;
}}
var n = 0;
if (bestN3 != null) {
n += org.jmol.modelsetbio.NucleicPolymer.addHydrogenBond (vAtoms, myN1, bestN3);
if (n >= nMaxPerResidue) continue;
if (myNucleotide.isGuanine ()) {
n += org.jmol.modelsetbio.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getN2 (), bestNucleotide.getO2 ());
if (n >= nMaxPerResidue) continue;
n += org.jmol.modelsetbio.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getO6 (), bestNucleotide.getN4 ());
if (n >= nMaxPerResidue) continue;
} else {
n += org.jmol.modelsetbio.NucleicPolymer.addHydrogenBond (vAtoms, myNucleotide.getN6 (), bestNucleotide.getO4 ());
}}}
}, "org.jmol.modelsetbio.BioPolymer,org.jmol.util.BitSet,org.jmol.util.BitSet,java.util.List,~N,~A,~B,~B");
c$.addHydrogenBond = Clazz.defineMethod (c$, "addHydrogenBond", 
function (vAtoms, atom1, atom2) {
if (atom1 == null || atom2 == null) return 0;
vAtoms.add ( new org.jmol.modelset.HBond (atom1, atom2, 18432, 1, 0, 0));
return 1;
}, "java.util.List,org.jmol.modelset.Atom,org.jmol.modelset.Atom");
Clazz.defineMethod (c$, "getPdbData", 
function (viewer, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
org.jmol.modelsetbio.BioPolymer.getPdbData (viewer, this, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten);
}, "org.jmol.viewer.Viewer,~S,~S,~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~B,~A,org.jmol.io.OutputStringBuilder,org.jmol.util.StringXBuilder,org.jmol.util.BitSet");
});
// 
//// org\jmol\modelsetbio\PhosphorusPolymer.js 
// 
Clazz.declarePackage ("org.jmol.modelsetbio");
Clazz.load (["org.jmol.modelsetbio.BioPolymer"], "org.jmol.modelsetbio.PhosphorusPolymer", null, function () {
c$ = Clazz.declareType (org.jmol.modelsetbio, "PhosphorusPolymer", org.jmol.modelsetbio.BioPolymer);
Clazz.defineMethod (c$, "getPdbData", 
function (viewer, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten) {
org.jmol.modelsetbio.BioPolymer.getPdbData (viewer, this, ctype, qtype, mStep, derivType, bsAtoms, bsSelected, bothEnds, isDraw, addHeader, tokens, pdbATOM, pdbCONECT, bsWritten);
}, "org.jmol.viewer.Viewer,~S,~S,~N,~N,org.jmol.util.BitSet,org.jmol.util.BitSet,~B,~B,~B,~A,org.jmol.io.OutputStringBuilder,org.jmol.util.StringXBuilder,org.jmol.util.BitSet");
});
// 
//// org\jmol\shapebio\BioShape.js 
// 
Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.modelset.Atom", "org.jmol.modelsetbio.NucleicMonomer", "org.jmol.util.BitSet", "org.jmol.viewer.JmolConstants"], "org.jmol.shapebio.BioShape", ["java.lang.Float", "org.jmol.constant.EnumStructure", "org.jmol.shape.Shape", "org.jmol.util.ArrayUtil", "$.Colix", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelIndex = 0;
this.modelVisibilityFlags = 0;
this.shape = null;
this.bioPolymer = null;
this.meshes = null;
this.meshReady = null;
this.mads = null;
this.colixes = null;
this.colixesBack = null;
this.paletteIDs = null;
this.bsColixSet = null;
this.bsSizeSet = null;
this.bsSizeDefault = null;
this.isActive = false;
this.monomerCount = 0;
this.monomers = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.hasBfactorRange = false;
this.bfactorMin = 0;
this.bfactorMax = 0;
this.range = 0;
this.floatRange = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.shapebio, "BioShape");
Clazz.prepareFields (c$, function () {
this.bsSizeDefault =  new org.jmol.util.BitSet ();
});
Clazz.makeConstructor (c$, 
function (shape, modelIndex, bioPolymer) {
this.shape = shape;
this.modelIndex = modelIndex;
this.bioPolymer = bioPolymer;
this.isActive = shape.isActive;
this.monomerCount = bioPolymer.monomerCount;
if (this.monomerCount > 0) {
this.colixes =  Clazz.newShortArray (this.monomerCount, 0);
this.paletteIDs =  Clazz.newByteArray (this.monomerCount, 0);
this.mads =  Clazz.newShortArray (this.monomerCount + 1, 0);
this.monomers = bioPolymer.getGroups ();
this.meshReady =  Clazz.newBooleanArray (this.monomerCount, false);
this.meshes =  new Array (this.monomerCount);
this.wingVectors = bioPolymer.getWingVectors ();
this.leadAtomIndices = bioPolymer.getLeadAtomIndices ();
}}, "org.jmol.shapebio.BioShapeCollection,~N,org.jmol.modelsetbio.BioPolymer");
Clazz.defineMethod (c$, "calcBfactorRange", 
function () {
this.bfactorMin = this.bfactorMax = this.monomers[0].getLeadAtom ().getBfactor100 ();
for (var i = this.monomerCount; --i > 0; ) {
var bfactor = this.monomers[i].getLeadAtom ().getBfactor100 ();
if (bfactor < this.bfactorMin) this.bfactorMin = bfactor;
 else if (bfactor > this.bfactorMax) this.bfactorMax = bfactor;
}
this.range = this.bfactorMax - this.bfactorMin;
this.floatRange = this.range;
this.hasBfactorRange = true;
});
Clazz.defineMethod (c$, "calcMeanPositionalDisplacement", 
function (bFactor100) {
return Clazz.doubleToShort (Math.sqrt (bFactor100 / 7895.6835208714865) * 1000);
}, "~N");
Clazz.defineMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
this.bioPolymer.findNearestAtomIndex (xMouse, yMouse, closest, this.mads, this.shape.myVisibilityFlag, bsNot);
}, "~N,~N,~A,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setMad", 
function (mad, bsSelected, values) {
if (this.monomerCount < 2) return;
this.isActive = true;
if (this.bsSizeSet == null) this.bsSizeSet =  new org.jmol.util.BitSet ();
var flag = this.shape.myVisibilityFlag;
for (var i = this.monomerCount; --i >= 0; ) {
var leadAtomIndex = this.leadAtomIndices[i];
if (bsSelected.get (leadAtomIndex)) {
if (values != null) {
if (Float.isNaN (values[leadAtomIndex])) continue;
mad = Clazz.floatToShort (values[leadAtomIndex] * 2000);
}var isVisible = ((this.mads[i] = this.getMad (i, mad)) > 0);
this.bsSizeSet.setBitTo (i, isVisible);
this.monomers[i].setShapeVisibility (flag, isVisible);
this.shape.atoms[leadAtomIndex].setShapeVisibility (flag, isVisible);
this.falsifyNearbyMesh (i);
}}
if (this.monomerCount > 1) this.mads[this.monomerCount] = this.mads[this.monomerCount - 1];
}, "~N,org.jmol.util.BitSet,~A");
Clazz.defineMethod (c$, "getMad", 
($fz = function (groupIndex, mad) {
this.bsSizeDefault.setBitTo (groupIndex, mad == -1 || mad == -2);
if (mad >= 0) return mad;
switch (mad) {
case -1:
case -2:
if (mad == -1 && this.shape.madOn >= 0) return this.shape.madOn;
switch (this.monomers[groupIndex].getProteinStructureType ()) {
case org.jmol.constant.EnumStructure.SHEET:
case org.jmol.constant.EnumStructure.HELIX:
return this.shape.madHelixSheet;
case org.jmol.constant.EnumStructure.DNA:
case org.jmol.constant.EnumStructure.RNA:
return this.shape.madDnaRna;
default:
return this.shape.madTurnRandom;
}
case -3:
{
if (!this.hasBfactorRange) this.calcBfactorRange ();
var atom = this.monomers[groupIndex].getLeadAtom ();
var bfactor100 = atom.getBfactor100 ();
var scaled = bfactor100 - this.bfactorMin;
if (this.range == 0) return 0;
var percentile = scaled / this.floatRange;
if (percentile < 0 || percentile > 1) org.jmol.util.Logger.error ("Que ha ocurrido? " + percentile);
return Clazz.floatToShort ((1750 * percentile) + 250);
}case -4:
{
var atom = this.monomers[groupIndex].getLeadAtom ();
return (2 * this.calcMeanPositionalDisplacement (atom.getBfactor100 ()));
}}
org.jmol.util.Logger.error ("unrecognized setMad(" + mad + ")");
return 0;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "falsifyMesh", 
function () {
if (this.meshReady == null) return;
for (var i = 0; i < this.monomerCount; i++) this.meshReady[i] = false;

});
Clazz.defineMethod (c$, "falsifyNearbyMesh", 
($fz = function (index) {
if (this.meshReady == null) return;
this.meshReady[index] = false;
if (index > 0) this.meshReady[index - 1] = false;
if (index < this.monomerCount - 1) this.meshReady[index + 1] = false;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setColixBS", 
function (colix, pid, bsSelected) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex)) {
this.colixes[i] = this.shape.setColix (colix, pid, atomIndex);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = 0;
this.paletteIDs[i] = pid;
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}}
}, "~N,~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setColixBack", 
function (colix, bsSelected) {
for (var i = this.monomerCount; --i >= 0; ) {
var atomIndex = this.leadAtomIndices[i];
if (bsSelected.get (atomIndex)) {
if (this.colixesBack == null) this.colixesBack =  Clazz.newShortArray (this.colixes.length, 0);
if (this.colixesBack.length < this.colixes.length) this.colixesBack = org.jmol.util.ArrayUtil.ensureLengthShort (this.colixesBack, this.colixes.length);
this.colixesBack[i] = colix;
}}
}, "~N,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setTranslucent", 
function (isTranslucent, bsSelected, translucentLevel) {
this.isActive = true;
if (this.bsColixSet == null) this.bsColixSet =  new org.jmol.util.BitSet ();
for (var i = this.monomerCount; --i >= 0; ) if (bsSelected.get (this.leadAtomIndices[i])) {
this.colixes[i] = org.jmol.util.Colix.getColixTranslucent3 (this.colixes[i], isTranslucent, translucentLevel);
if (this.colixesBack != null && this.colixesBack.length > i) this.colixesBack[i] = org.jmol.util.Colix.getColixTranslucent3 (this.colixesBack[i], isTranslucent, translucentLevel);
this.bsColixSet.setBitTo (i, this.colixes[i] != 0);
}
}, "~B,org.jmol.util.BitSet,~N");
Clazz.defineMethod (c$, "setShapeState", 
function (temp, temp2) {
if (!this.isActive || this.bsSizeSet == null && this.bsColixSet == null) return;
var type = org.jmol.viewer.JmolConstants.shapeClassBases[this.shape.shapeID];
for (var i = 0; i < this.monomerCount; i++) {
var atomIndex1 = this.monomers[i].firstAtomIndex;
var atomIndex2 = this.monomers[i].lastAtomIndex;
if (this.bsSizeSet != null && (this.bsSizeSet.get (i) || this.bsColixSet != null && this.bsColixSet.get (i))) {
if (this.bsSizeDefault.get (i)) org.jmol.shape.Shape.setStateInfo (temp, atomIndex1, atomIndex2, type + (this.bsSizeSet.get (i) ? " on" : " off"));
 else org.jmol.shape.Shape.setStateInfo (temp, atomIndex1, atomIndex2, type + " " + (this.mads[i] / 2000));
}if (this.bsColixSet != null && this.bsColixSet.get (i)) org.jmol.shape.Shape.setStateInfo (temp2, atomIndex1, atomIndex2, this.shape.getColorCommand (type, this.paletteIDs[i], this.colixes[i]));
}
}, "java.util.Map,java.util.Map");
Clazz.defineMethod (c$, "setModelClickability", 
function () {
if (!this.isActive || this.wingVectors == null) return;
var isNucleicPolymer = Clazz.instanceOf (this.bioPolymer, org.jmol.modelsetbio.NucleicPolymer);
for (var i = this.monomerCount; --i >= 0; ) {
if (this.mads[i] <= 0) continue;
var iAtom = this.leadAtomIndices[i];
if (this.monomers[i].chain.model.modelSet.isAtomHidden (iAtom)) continue;
this.shape.atoms[iAtom].setClickable (org.jmol.shapebio.BioShape.ALPHA_CARBON_VISIBILITY_FLAG);
if (isNucleicPolymer) (this.monomers[i]).setModelClickability ();
}
});
c$.ALPHA_CARBON_VISIBILITY_FLAG = c$.prototype.ALPHA_CARBON_VISIBILITY_FLAG = org.jmol.modelsetbio.NucleicMonomer.CARTOON_VISIBILITY_FLAG | org.jmol.modelset.Atom.BACKBONE_VISIBILITY_FLAG | org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (10) | org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (12) | org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (13) | org.jmol.viewer.JmolConstants.getShapeVisibilityFlag (14);
Clazz.defineStatics (c$,
"eightPiSquared100", 7895.6835208714865);
});
// 
//// org\jmol\shapebio\BioShapeCollection.js 
// 
Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shape.Shape"], "org.jmol.shapebio.BioShapeCollection", ["java.util.Hashtable", "org.jmol.constant.EnumPalette", "org.jmol.shapebio.BioShape", "org.jmol.util.ArrayUtil", "$.BitSetUtil", "$.Colix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.atoms = null;
this.madOn = -2;
this.madHelixSheet = 3000;
this.madTurnRandom = 800;
this.madDnaRna = 5000;
this.isActive = false;
this.bioShapes = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shapebio, "BioShapeCollection", org.jmol.shape.Shape);
Clazz.overrideMethod (c$, "initModelSet", 
function () {
this.isBioShape = true;
this.atoms = this.modelSet.atoms;
this.initialize ();
});
Clazz.defineMethod (c$, "getSize", 
function (group) {
var m = group;
var groupIndex = m.getGroupIndex ();
var leadAtomIndex = m.getLeadAtom ().getIndex ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
for (var j = 0; j < bioShape.monomerCount; j++) {
if (bioShape.monomers[j].getGroupIndex () == groupIndex && bioShape.monomers[j].getLeadAtom ().getIndex () == leadAtomIndex) return bioShape.mads[j];
}
}
return 0;
}, "org.jmol.modelset.Group");
Clazz.overrideMethod (c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
var mad = size;
this.initialize ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setMad (mad, bsSelected, (rd == null ? null : rd.values));
}
}, "~N,org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (propertyName === "refreshTrajectories") {
var modelIndex = ((value)[0]).intValue ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex == modelIndex) b.falsifyMesh ();
}
return;
}if (propertyName === "deleteModelAtoms") {
this.atoms = (value)[1];
var modelIndex = ((value)[2])[0];
for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
if (b.modelIndex > modelIndex) {
b.modelIndex--;
b.leadAtomIndices = b.bioPolymer.getLeadAtomIndices ();
} else if (b.modelIndex == modelIndex) {
this.bioShapes = org.jmol.util.ArrayUtil.deleteElements (this.bioShapes, i, 1);
}}
return;
}this.initialize ();
if ("color" === propertyName) {
var pid = org.jmol.constant.EnumPalette.pidOf (value);
var colix = org.jmol.util.Colix.getColixO (value);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setColixBS (colix, pid, bsSelected);
}
return;
}if ("colorPhase" === propertyName) {
var twoColors = value;
var colixBack = org.jmol.util.Colix.getColixO (twoColors[0]);
var colix = org.jmol.util.Colix.getColixO (twoColors[1]);
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) {
bioShape.setColixBS (colix, 0, bsSelected);
bioShape.setColixBack (colixBack, bsSelected);
}}
return;
}if ("translucency" === propertyName) {
var isTranslucent = ("translucent".equals (value));
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setTranslucent (isTranslucent, bsSelected, this.translucentLevel);
}
return;
}Clazz.superCall (this, org.jmol.shapebio.BioShapeCollection, "setProperty", [propertyName, value, bsSelected]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
var temp =  new java.util.Hashtable ();
var temp2 =  new java.util.Hashtable ();
for (var i = this.bioShapes.length; --i >= 0; ) {
var bioShape = this.bioShapes[i];
if (bioShape.monomerCount > 0) bioShape.setShapeState (temp, temp2);
}
return "\n" + org.jmol.shape.Shape.getShapeCommandsSel (temp, temp2, this.shapeID == 9 ? "Backbone" : "select");
});
Clazz.defineMethod (c$, "initialize", 
function () {
var modelCount = this.modelSet.getModelCount ();
var models = this.modelSet.getModels ();
var n = this.modelSet.getBioPolymerCount ();
var shapes =  new Array (n--);
for (var i = modelCount; --i >= 0; ) for (var j = this.modelSet.getBioPolymerCountInModel (i); --j >= 0; n--) {
var bp = (models[i]).getBioPolymer (j);
shapes[n] = (this.bioShapes == null || this.bioShapes.length <= n || this.bioShapes[n] == null || this.bioShapes[n].bioPolymer !== bp ?  new org.jmol.shapebio.BioShape (this, i, bp) : this.bioShapes[n]);
}

this.bioShapes = shapes;
});
Clazz.overrideMethod (c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].findNearestAtomIndex (xMouse, yMouse, closest, bsNot);

}, "~N,~N,~A,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setVisibilityFlags", 
function (bs) {
if (this.bioShapes == null) return;
bs = org.jmol.util.BitSetUtil.copy (bs);
for (var i = this.modelSet.getModelCount (); --i >= 0; ) if (bs.get (i) && this.modelSet.isTrajectory (i)) bs.set (this.modelSet.getTrajectoryIndex (i));

for (var i = this.bioShapes.length; --i >= 0; ) {
var b = this.bioShapes[i];
b.modelVisibilityFlags = (bs.get (b.modelIndex) ? this.myVisibilityFlag : 0);
}
}, "org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setModelClickability", 
function () {
if (this.bioShapes == null) return;
for (var i = this.bioShapes.length; --i >= 0; ) this.bioShapes[i].setModelClickability ();

});
Clazz.defineMethod (c$, "getMpsShapeCount", 
function () {
return this.bioShapes.length;
});
Clazz.defineMethod (c$, "getBioShape", 
function (i) {
return this.bioShapes[i];
}, "~N");
});
// 
//// org\jmol\shapebio\Rockets.js 
// 
Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shapebio.BioShapeCollection"], "org.jmol.shapebio.Rockets", null, function () {
c$ = Clazz.declareType (org.jmol.shapebio, "Rockets", org.jmol.shapebio.BioShapeCollection);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapebio.Rockets, "initShape", []);
this.madTurnRandom = 500;
});
});
// 
//// org\jmol\shapebio\Cartoon.js 
// 
Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shapebio.Rockets"], "org.jmol.shapebio.Cartoon", null, function () {
c$ = Clazz.declareType (org.jmol.shapebio, "Cartoon", org.jmol.shapebio.Rockets);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapebio.Cartoon, "initShape", []);
this.madDnaRna = 1000;
});
});
// 
//// org\jmol\shapebio\Backbone.js 
// 
Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shapebio.BioShapeCollection"], "org.jmol.shapebio.Backbone", ["java.lang.Float", "org.jmol.util.BitSet"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsSelected = null;
Clazz.instantialize (this, arguments);
}, org.jmol.shapebio, "Backbone", org.jmol.shapebio.BioShapeCollection);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapebio.Backbone, "initShape", []);
this.madOn = 1;
this.madHelixSheet = 1500;
this.madTurnRandom = 500;
this.madDnaRna = 2000;
this.isActive = true;
});
Clazz.defineMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if ("bitset" === propertyName) {
this.bsSelected = value;
return;
}Clazz.superCall (this, org.jmol.shapebio.Backbone, "setProperty", [propertyName, value, bsSelected]);
}, "~S,~O,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
var mad = size;
this.initialize ();
var useThisBsSelected = (this.bsSelected != null);
if (useThisBsSelected) bsSelected = this.bsSelected;
for (var iShape = this.bioShapes.length; --iShape >= 0; ) {
var bioShape = this.bioShapes[iShape];
if (bioShape.monomerCount == 0) continue;
var bondSelectionModeOr = this.viewer.getBondSelectionModeOr ();
var atomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
var isVisible = (mad != 0);
if (bioShape.bsSizeSet == null) bioShape.bsSizeSet =  new org.jmol.util.BitSet ();
bioShape.isActive = true;
for (var i = bioShape.monomerCount - 1; --i >= 0; ) {
var index1 = atomIndices[i];
var index2 = atomIndices[i + 1];
var isAtom1 = bsSelected.get (index1);
var isAtom2 = bsSelected.get (index2);
if (isAtom1 && isAtom2 || useThisBsSelected && isAtom1 || bondSelectionModeOr && (isAtom1 || isAtom2)) {
bioShape.monomers[i].setShapeVisibility (this.myVisibilityFlag, isVisible);
var atomA = this.modelSet.atoms[index1];
if (rd != null) {
if (Float.isNaN (rd.values[i])) continue;
mad = Clazz.floatToShort (rd.values[i] * 2000);
}var atomB = this.modelSet.atoms[index2];
var wasVisible = (bioShape.mads[i] != 0);
if (wasVisible != isVisible) {
atomA.addDisplayedBackbone (this.myVisibilityFlag, isVisible);
atomB.addDisplayedBackbone (this.myVisibilityFlag, isVisible);
}bioShape.mads[i] = mad;
bioShape.bsSizeSet.setBitTo (i, isVisible);
bioShape.bsSizeDefault.setBitTo (i, mad == -1);
}}
}
if (useThisBsSelected) this.bsSelected = null;
}, "~N,org.jmol.atomdata.RadiusData,org.jmol.util.BitSet");
Clazz.overrideMethod (c$, "setModelClickability", 
function () {
if (this.bioShapes == null) return;
for (var iShape = this.bioShapes.length; --iShape >= 0; ) {
var bioShape = this.bioShapes[iShape];
var atomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
for (var i = bioShape.monomerCount; --i >= 0; ) {
var atom = this.modelSet.atoms[atomIndices[i]];
if (atom.getNBackbonesDisplayed () > 0 && !this.modelSet.isAtomHidden (i)) atom.setClickable (this.myVisibilityFlag);
}
}
});
});
// 
//// org\jmol\shapebio\Trace.js 
// 
Clazz.declarePackage ("org.jmol.shapebio");
Clazz.load (["org.jmol.shapebio.BioShapeCollection"], "org.jmol.shapebio.Trace", null, function () {
c$ = Clazz.declareType (org.jmol.shapebio, "Trace", org.jmol.shapebio.BioShapeCollection);
Clazz.defineMethod (c$, "initShape", 
function () {
Clazz.superCall (this, org.jmol.shapebio.Trace, "initShape", []);
this.madOn = 600;
this.madHelixSheet = 1500;
this.madTurnRandom = 500;
this.madDnaRna = 1500;
});
});
// 
//// org\jmol\renderbio\BioShapeRenderer.js 
// 
Clazz.declarePackage ("org.jmol.renderbio");
Clazz.load (["org.jmol.render.MeshRenderer", "org.jmol.util.AxisAngle4f", "$.BitSet", "$.Matrix3f", "$.Point3f", "$.Point3i", "$.Vector3f"], "org.jmol.renderbio.BioShapeRenderer", ["org.jmol.constant.EnumStructure", "org.jmol.shape.Mesh", "org.jmol.util.Colix", "$.Hermite", "$.Logger", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.invalidateMesh = false;
this.invalidateSheets = false;
this.isHighRes = false;
this.isTraceAlpha = false;
this.ribbonBorder = false;
this.haveControlPointScreens = false;
this.aspectRatio = 0;
this.hermiteLevel = 0;
this.sheetSmoothing = 0;
this.cartoonFancy = false;
this.meshes = null;
this.meshReady = null;
this.bsRenderMesh = null;
this.monomerCount = 0;
this.monomers = null;
this.isNucleic = false;
this.isCarbohydrate = false;
this.bsVisible = null;
this.ribbonTopScreens = null;
this.ribbonBottomScreens = null;
this.controlPoints = null;
this.controlPointScreens = null;
this.leadAtomIndices = null;
this.wingVectors = null;
this.mads = null;
this.colixes = null;
this.colixesBack = null;
this.structureTypes = null;
this.isPass2 = false;
this.pointT = null;
this.iPrev = 0;
this.iNext = 0;
this.iNext2 = 0;
this.iNext3 = 0;
this.diameterBeg = 0;
this.diameterMid = 0;
this.diameterEnd = 0;
this.doCap0 = false;
this.doCap1 = false;
this.colixBack = 0;
this.screenArrowTop = null;
this.screenArrowTopPrev = null;
this.screenArrowBot = null;
this.screenArrowBotPrev = null;
this.controlHermites = null;
this.wingHermites = null;
this.radiusHermites = null;
this.norm = null;
this.wing = null;
this.wing1 = null;
this.wingT = null;
this.aa = null;
this.pt = null;
this.pt1 = null;
this.ptPrev = null;
this.ptNext = null;
this.mat = null;
this.bsTemp = null;
this.norml = null;
Clazz.instantialize (this, arguments);
}, org.jmol.renderbio, "BioShapeRenderer", org.jmol.render.MeshRenderer);
Clazz.prepareFields (c$, function () {
this.bsVisible =  new org.jmol.util.BitSet ();
this.pointT =  new org.jmol.util.Point3f ();
this.screenArrowTop =  new org.jmol.util.Point3i ();
this.screenArrowTopPrev =  new org.jmol.util.Point3i ();
this.screenArrowBot =  new org.jmol.util.Point3i ();
this.screenArrowBotPrev =  new org.jmol.util.Point3i ();
this.norm =  new org.jmol.util.Vector3f ();
this.wing =  new org.jmol.util.Vector3f ();
this.wing1 =  new org.jmol.util.Vector3f ();
this.wingT =  new org.jmol.util.Vector3f ();
this.aa =  new org.jmol.util.AxisAngle4f ();
this.pt =  new org.jmol.util.Point3f ();
this.pt1 =  new org.jmol.util.Point3f ();
this.ptPrev =  new org.jmol.util.Point3f ();
this.ptNext =  new org.jmol.util.Point3f ();
this.mat =  new org.jmol.util.Matrix3f ();
this.norml =  new org.jmol.util.Vector3f ();
});
Clazz.defineMethod (c$, "render", 
function () {
if (this.shape == null) return false;
this.isPass2 = this.g3d.isPass2 ();
this.invalidateMesh = false;
this.needTranslucent = false;
var TF = this.isExport || this.viewer.getHighResolution ();
if (TF != this.isHighRes) this.invalidateMesh = true;
this.isHighRes = TF;
var v = this.viewer.getCartoonFlag (603979820);
if (this.cartoonFancy != v) {
this.invalidateMesh = true;
this.cartoonFancy = v;
}var val1 = this.viewer.getHermiteLevel ();
val1 = (val1 <= 0 ? -val1 : this.viewer.getInMotion () ? 0 : val1);
if (this.cartoonFancy) val1 = Math.max (val1, 3);
if (val1 != this.hermiteLevel) this.invalidateMesh = true;
this.hermiteLevel = Math.min (val1, 8);
var val = this.viewer.getRibbonAspectRatio ();
val = Math.min (Math.max (0, val), 20);
if (this.cartoonFancy && val >= 16) val = 4;
if (this.hermiteLevel == 0) val = 0;
if (val != this.aspectRatio && val != 0 && val1 != 0) this.invalidateMesh = true;
this.aspectRatio = val;
TF = (this.viewer.getTraceAlpha ());
if (TF != this.isTraceAlpha) this.invalidateMesh = true;
this.isTraceAlpha = TF;
this.invalidateSheets = false;
var fval = this.viewer.getSheetSmoothing ();
if (fval != this.sheetSmoothing && this.isTraceAlpha) {
this.sheetSmoothing = fval;
this.invalidateMesh = true;
this.invalidateSheets = true;
}var mps = this.shape;
for (var c = mps.bioShapes.length; --c >= 0; ) {
var bioShape = mps.getBioShape (c);
if ((bioShape.modelVisibilityFlags & this.myVisibilityFlag) == 0) continue;
if (bioShape.monomerCount >= 2 && this.initializePolymer (bioShape)) {
this.bsRenderMesh.clearAll ();
this.renderBioShape (bioShape);
this.renderMeshes ();
this.freeTempArrays ();
}}
return this.needTranslucent;
});
Clazz.defineMethod (c$, "setBioColix", 
function (colix) {
if (this.g3d.setColix (colix)) return true;
this.needTranslucent = true;
return false;
}, "~N");
Clazz.defineMethod (c$, "freeTempArrays", 
($fz = function () {
if (this.haveControlPointScreens) this.viewer.freeTempScreens (this.controlPointScreens);
this.viewer.freeTempEnum (this.structureTypes);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializePolymer", 
($fz = function (bioShape) {
if (this.viewer.isJmolDataFrameForModel (bioShape.modelIndex)) {
this.controlPoints = bioShape.bioPolymer.getControlPoints (true, 0, false);
} else {
this.controlPoints = bioShape.bioPolymer.getControlPoints (this.isTraceAlpha, this.sheetSmoothing, this.invalidateSheets);
}this.monomerCount = bioShape.monomerCount;
this.bsRenderMesh = org.jmol.util.BitSet.newN (this.monomerCount);
this.monomers = bioShape.monomers;
this.leadAtomIndices = bioShape.bioPolymer.getLeadAtomIndices ();
this.bsVisible.clearAll ();
var haveVisible = false;
if (this.invalidateMesh) bioShape.falsifyMesh ();
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & this.myVisibilityFlag) == 0 || this.modelSet.isAtomHidden (this.leadAtomIndices[i])) continue;
var lead = this.modelSet.atoms[this.leadAtomIndices[i]];
if (!this.g3d.isInDisplayRange (lead.screenX, lead.screenY)) continue;
this.bsVisible.set (i);
haveVisible = true;
}
if (!haveVisible) return false;
this.ribbonBorder = this.viewer.getRibbonBorder ();
this.isNucleic = Clazz.instanceOf (bioShape.bioPolymer, org.jmol.modelsetbio.NucleicPolymer);
this.isCarbohydrate = Clazz.instanceOf (bioShape.bioPolymer, org.jmol.modelsetbio.CarbohydratePolymer);
this.haveControlPointScreens = false;
this.wingVectors = bioShape.wingVectors;
this.meshReady = bioShape.meshReady;
this.meshes = bioShape.meshes;
this.mads = bioShape.mads;
this.colixes = bioShape.colixes;
this.colixesBack = bioShape.colixesBack;
this.setStructureTypes ();
return true;
}, $fz.isPrivate = true, $fz), "org.jmol.shapebio.BioShape");
Clazz.defineMethod (c$, "setStructureTypes", 
($fz = function () {
this.structureTypes = this.viewer.allocTempEnum (this.monomerCount + 1);
for (var i = this.monomerCount; --i >= 0; ) {
this.structureTypes[i] = this.monomers[i].getProteinStructureType ();
if (this.structureTypes[i] === org.jmol.constant.EnumStructure.TURN) this.structureTypes[i] = org.jmol.constant.EnumStructure.NONE;
}
this.structureTypes[this.monomerCount] = this.structureTypes[this.monomerCount - 1];
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isHelix", 
function (i) {
return this.structureTypes[i] === org.jmol.constant.EnumStructure.HELIX;
}, "~N");
Clazz.defineMethod (c$, "getScreenControlPoints", 
function () {
this.calcScreenControlPoints (this.controlPoints);
});
Clazz.defineMethod (c$, "calcScreenControlPoints", 
function (points) {
var count = this.monomerCount + 1;
this.controlPointScreens = this.viewer.allocTempScreens (count);
for (var i = count; --i >= 0; ) {
this.viewer.transformPtScr (points[i], this.controlPointScreens[i]);
}
this.haveControlPointScreens = true;
}, "~A");
Clazz.defineMethod (c$, "calcScreens", 
function (offsetFraction) {
var count = this.controlPoints.length;
var screens = this.viewer.allocTempScreens (count);
if (offsetFraction == 0) {
for (var i = count; --i >= 0; ) this.viewer.transformPtScr (this.controlPoints[i], screens[i]);

} else {
var offset_1000 = offsetFraction / 1000;
for (var i = count; --i >= 0; ) this.calc1Screen (this.controlPoints[i], this.wingVectors[i], (this.mads[i] == 0 && i > 0 ? this.mads[i - 1] : this.mads[i]), offset_1000, screens[i]);

}return screens;
}, "~N");
Clazz.defineMethod (c$, "calc1Screen", 
($fz = function (center, vector, mad, offset_1000, screen) {
this.pointT.setT (vector);
var scale = mad * offset_1000;
this.pointT.scaleAdd (scale, center);
this.viewer.transformPtScr (this.pointT, screen);
}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f,org.jmol.util.Vector3f,~N,~N,org.jmol.util.Point3i");
Clazz.defineMethod (c$, "getLeadColix", 
function (i) {
return org.jmol.util.Colix.getColixInherited (this.colixes[i], this.monomers[i].getLeadAtom ().getColix ());
}, "~N");
Clazz.defineMethod (c$, "getLeadColixBack", 
function (i) {
return (this.colixesBack == null || this.colixesBack.length <= i ? 0 : this.colixesBack[i]);
}, "~N");
Clazz.defineMethod (c$, "setNeighbors", 
($fz = function (i) {
this.iPrev = Math.max (i - 1, 0);
this.iNext = Math.min (i + 1, this.monomerCount);
this.iNext2 = Math.min (i + 2, this.monomerCount);
this.iNext3 = Math.min (i + 3, this.monomerCount);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setMads", 
($fz = function (i, thisTypeOnly) {
this.madMid = this.madBeg = this.madEnd = this.mads[i];
if (this.isTraceAlpha) {
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iNext]) {
this.madEnd = this.mads[this.iNext];
if (this.madEnd == 0) {
if (Clazz.instanceOf (this, org.jmol.renderbio.TraceRenderer)) {
this.madEnd = this.madBeg;
} else {
this.madEnd = this.madBeg;
}}this.madMid = ((this.madBeg + this.madEnd) >> 1);
}} else {
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iPrev]) this.madBeg = (((this.mads[this.iPrev] == 0 ? this.madMid : this.mads[this.iPrev]) + this.madMid) >> 1);
if (!thisTypeOnly || this.structureTypes[i] === this.structureTypes[this.iNext]) this.madEnd = (((this.mads[this.iNext] == 0 ? this.madMid : this.mads[this.iNext]) + this.madMid) >> 1);
}this.diameterBeg = this.viewer.scaleToScreen (this.controlPointScreens[i].z, this.madBeg);
this.diameterMid = this.viewer.scaleToScreen (this.monomers[i].getLeadAtom ().screenZ, this.madMid);
this.diameterEnd = this.viewer.scaleToScreen (this.controlPointScreens[this.iNext].z, this.madEnd);
this.doCap0 = (i == this.iPrev || thisTypeOnly && this.structureTypes[i] !== this.structureTypes[this.iPrev]);
this.doCap1 = (this.iNext == this.iNext2 || thisTypeOnly && this.structureTypes[i] !== this.structureTypes[this.iNext]);
return ((this.aspectRatio > 0 && (this.exportType == 1 || this.checkDiameter (this.diameterBeg) || this.checkDiameter (this.diameterMid) || this.checkDiameter (this.diameterEnd))));
}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "checkDiameter", 
($fz = function (d) {
return ( new Boolean ( new Boolean (this.isHighRes & d > 3).valueOf () || d >= 8).valueOf ());
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "renderHermiteCylinder", 
function (screens, i) {
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.setNeighbors (i);
this.g3d.drawHermite4 (this.isNucleic ? 4 : 7, screens[this.iPrev], screens[i], screens[this.iNext], screens[this.iNext2]);
}, "~A,~N");
Clazz.defineMethod (c$, "renderHermiteConic", 
function (i, thisTypeOnly) {
this.setNeighbors (i);
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
if (this.setMads (i, thisTypeOnly) || this.isExport) {
try {
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, this.madBeg, this.madMid, this.madEnd, 1)) return;
this.meshes[i].setColix (this.colix);
this.bsRenderMesh.set (i);
return;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
org.jmol.util.Logger.error ("render mesh error hermiteConic: " + e.toString ());
} else {
throw e;
}
}
}this.g3d.fillHermite (this.isNucleic ? 4 : 7, this.diameterBeg, this.diameterMid, this.diameterEnd, this.controlPointScreens[this.iPrev], this.controlPointScreens[i], this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2]);
}, "~N,~B");
Clazz.defineMethod (c$, "renderHermiteRibbon", 
function (doFill, i, thisTypeOnly) {
this.setNeighbors (i);
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.colixBack = this.getLeadColixBack (i);
if (doFill && (this.aspectRatio != 0 || this.isExport)) {
if (this.setMads (i, thisTypeOnly) || this.isExport) {
try {
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, this.madBeg, this.madMid, this.madEnd, this.aspectRatio)) return;
this.meshes[i].setColix (this.colix);
this.meshes[i].setColixBack (this.colixBack);
this.bsRenderMesh.set (i);
return;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
org.jmol.util.Logger.error ("render mesh error hermiteRibbon: " + e.toString ());
} else {
throw e;
}
}
}}this.g3d.drawHermite7 (doFill, this.ribbonBorder, this.isNucleic ? 4 : 7, this.ribbonTopScreens[this.iPrev], this.ribbonTopScreens[i], this.ribbonTopScreens[this.iNext], this.ribbonTopScreens[this.iNext2], this.ribbonBottomScreens[this.iPrev], this.ribbonBottomScreens[i], this.ribbonBottomScreens[this.iNext], this.ribbonBottomScreens[this.iNext2], Clazz.floatToInt (this.aspectRatio), this.colixBack);
}, "~B,~N,~B");
Clazz.defineMethod (c$, "renderHermiteArrowHead", 
function (i) {
this.colix = this.getLeadColix (i);
if (!this.setBioColix (this.colix)) return;
this.colixBack = this.getLeadColixBack (i);
this.setNeighbors (i);
if (this.setMads (i, false) || this.isExport) {
try {
this.doCap0 = true;
this.doCap1 = false;
if ((this.meshes[i] == null || !this.meshReady[i]) && !this.createMesh (i, Clazz.doubleToInt (Math.floor (this.madBeg * 1.2)), Clazz.doubleToInt (Math.floor (this.madBeg * 0.6)), 0, (this.aspectRatio == 1 ? this.aspectRatio : this.aspectRatio / 2))) return;
this.meshes[i].setColix (this.colix);
this.bsRenderMesh.set (i);
return;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.bsRenderMesh.clear (i);
this.meshes[i] = null;
org.jmol.util.Logger.error ("render mesh error hermiteArrowHead: " + e.toString ());
} else {
throw e;
}
}
}this.calc1Screen (this.controlPoints[i], this.wingVectors[i], this.madBeg, .0007, this.screenArrowTop);
this.calc1Screen (this.controlPoints[i], this.wingVectors[i], this.madBeg, -7.0E-4, this.screenArrowBot);
this.calc1Screen (this.controlPoints[i], this.wingVectors[i], this.madBeg, 0.001, this.screenArrowTopPrev);
this.calc1Screen (this.controlPoints[i], this.wingVectors[i], this.madBeg, -0.001, this.screenArrowBotPrev);
this.g3d.drawHermite7 (true, this.ribbonBorder, this.isNucleic ? 4 : 7, this.screenArrowTopPrev, this.screenArrowTop, this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2], this.screenArrowBotPrev, this.screenArrowBot, this.controlPointScreens[this.iNext], this.controlPointScreens[this.iNext2], Clazz.floatToInt (this.aspectRatio), this.colixBack);
if (this.ribbonBorder && this.aspectRatio == 0) {
this.g3d.fillCylinderXYZ (this.colix, this.colix, 3, (this.exportType == 1 ? 50 : 3), this.screenArrowTop.x, this.screenArrowTop.y, this.screenArrowTop.z, this.screenArrowBot.x, this.screenArrowBot.y, this.screenArrowBot.z);
}}, "~N");
Clazz.defineMethod (c$, "renderCone", 
function (i, pointBegin, pointEnd, screenPtBegin, screenPtEnd) {
var coneDiameter = this.mad + (this.mad >> 2);
coneDiameter = this.viewer.scaleToScreen (Clazz.doubleToInt (Math.floor (screenPtBegin.z)), coneDiameter);
this.g3d.fillConeSceen3f (2, coneDiameter, screenPtBegin, screenPtEnd);
}, "~N,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "createMesh", 
($fz = function (i, madBeg, madMid, madEnd, aspectRatio) {
this.setNeighbors (i);
if (this.controlPoints[i].distance (this.controlPoints[this.iNext]) == 0) return false;
var isEccentric = (aspectRatio != 1 && this.wingVectors != null);
var isFlatMesh = (aspectRatio == 0);
var isElliptical = (this.cartoonFancy || this.hermiteLevel >= 6);
var hermiteLevel = Math.max (this.hermiteLevel, 5);
var nHermites = (hermiteLevel + 1) * 2 + 1;
var nPer = (isFlatMesh ? 4 : (hermiteLevel + 1) * 4 - 2);
var angle = ((isFlatMesh ? 3.141592653589793 / (nPer - 1) : 6.283185307179586 / nPer));
var mesh = this.meshes[i] =  new org.jmol.shape.Mesh ("mesh_" + this.shapeID + "_" + i, 0, i);
var variableRadius = (madBeg != madMid || madMid != madEnd);
if (this.controlHermites == null || this.controlHermites.length < nHermites + 1) {
this.controlHermites =  new Array (nHermites + 1);
}org.jmol.util.Hermite.getHermiteList (this.isNucleic ? 4 : 7, this.controlPoints[this.iPrev], this.controlPoints[i], this.controlPoints[this.iNext], this.controlPoints[this.iNext2], this.controlPoints[this.iNext3], this.controlHermites, 0, nHermites, true);
if (this.wingHermites == null || this.wingHermites.length < nHermites + 1) {
this.wingHermites =  new Array (nHermites + 1);
}this.wing.setT (this.wingVectors[this.iPrev]);
if (madEnd == 0) this.wing.scale (2.0);
org.jmol.util.Hermite.getHermiteList (this.isNucleic ? 4 : 7, this.wing, this.wingVectors[i], this.wingVectors[this.iNext], this.wingVectors[this.iNext2], this.wingVectors[this.iNext3], this.wingHermites, 0, nHermites, false);
var radius1 = madBeg / 2000;
var radius2 = madMid / 2000;
var radius3 = madEnd / 2000;
if (variableRadius) {
if (this.radiusHermites == null || this.radiusHermites.length < ((nHermites + 1) >> 1) + 1) {
this.radiusHermites =  new Array (((nHermites + 1) >> 1) + 1);
}this.ptPrev.set (radius1, radius1, 0);
this.pt.set (radius1, radius2, 0);
this.pt1.set (radius2, radius3, 0);
this.ptNext.set (radius3, radius3, 0);
org.jmol.util.Hermite.getHermiteList (4, this.ptPrev, this.pt, this.pt1, this.ptNext, this.ptNext, this.radiusHermites, 0, (nHermites + 1) >> 1, true);
}var nPoints = 0;
var iMid = nHermites >> 1;
var kpt1 = Clazz.doubleToInt ((nPer + 2) / 4);
var kpt2 = Clazz.doubleToInt ((3 * nPer + 2) / 4);
var mode = (!isEccentric ? 0 : isFlatMesh ? 1 : isElliptical ? 2 : 3);
var useMat = (mode == 0 || mode == 3);
for (var p = 0; p < nHermites; p++) {
this.norm.sub2 (this.controlHermites[p + 1], this.controlHermites[p]);
var scale = (!variableRadius ? radius1 : p < iMid ? this.radiusHermites[p].x : this.radiusHermites[p - iMid].y);
this.wing.setT (this.wingHermites[p]);
this.wing1.setT (this.wing);
switch (mode) {
case 1:
break;
case 2:
this.wing1.cross (this.norm, this.wing);
this.wing1.normalize ();
this.wing1.scale (this.wing.length () / aspectRatio);
break;
case 3:
this.wing.scale (2 / aspectRatio);
this.wing1.sub (this.wing);
break;
case 0:
this.wing.cross (this.wing, this.norm);
this.wing.normalize ();
break;
}
this.wing.scale (scale);
this.wing1.scale (scale);
if (useMat) {
this.aa.setVA (this.norm, angle);
this.mat.setAA (this.aa);
}this.pt1.setT (this.controlHermites[p]);
var theta = (isFlatMesh ? 0 : angle);
for (var k = 0; k < nPer; k++, theta += angle) {
if (useMat && k > 0) this.mat.transform (this.wing);
switch (mode) {
case 1:
this.wingT.setT (this.wing1);
this.wingT.scale (Math.cos (theta));
break;
case 2:
this.wingT.setT (this.wing1);
this.wingT.scale (Math.sin (theta));
this.wingT.scaleAdd2 (Math.cos (theta), this.wing, this.wingT);
break;
case 3:
this.wingT.setT (this.wing);
if (k == kpt1 || k == kpt2) this.wing1.scale (-1);
this.wingT.add (this.wing1);
break;
case 0:
this.wingT.setT (this.wing);
break;
}
this.pt.add2 (this.pt1, this.wingT);
mesh.addVertexCopy (this.pt);
}
if (p > 0) {
var nLast = (isFlatMesh ? nPer - 1 : nPer);
for (var k = 0; k < nLast; k++) {
var a = nPoints - nPer + k;
var b = nPoints - nPer + ((k + 1) % nPer);
var c = nPoints + ((k + 1) % nPer);
var d = nPoints + k;
if (k < Clazz.doubleToInt (nLast / 2)) mesh.addQuad (a, b, c, d);
 else mesh.addQuad (b, c, d, a);
}
}nPoints += nPer;
}
if (!isFlatMesh) {
if (this.doCap0) for (var k = hermiteLevel * 2; --k >= 0; ) mesh.addQuad (k + 2, k + 1, (nPer - k) % nPer, nPer - k - 1);

if (this.doCap1) for (var k = hermiteLevel * 2; --k >= 0; ) mesh.addQuad (nPoints - k - 1, nPoints - nPer + (nPer - k) % nPer, nPoints - nPer + k + 1, nPoints - nPer + k + 2);

}this.meshReady[i] = true;
this.adjustCartoonSeamNormals (i, nPer);
mesh.setVisibilityFlags (1);
return true;
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "adjustCartoonSeamNormals", 
function (i, nPer) {
if (this.bsTemp == null) this.bsTemp = org.jmol.util.Normix.newVertexBitSet ();
if (i == this.iNext - 1 && this.iNext < this.monomerCount && this.monomers[i].getStrucNo () == this.monomers[this.iNext].getStrucNo () && this.meshReady[i] && this.meshReady[this.iNext]) {
try {
var normals2 = this.meshes[this.iNext].getNormalsTemp ();
var normals = this.meshes[i].getNormalsTemp ();
var normixCount = normals.length;
for (var j = 1; j <= nPer; ++j) {
this.norml.add2 (normals[normixCount - j], normals2[nPer - j]);
this.norml.normalize ();
this.meshes[i].normalsTemp[normixCount - j].setT (this.norml);
this.meshes[this.iNext].normalsTemp[nPer - j].setT (this.norml);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}}, "~N,~N");
Clazz.defineMethod (c$, "renderMeshes", 
($fz = function () {
for (var i = this.bsRenderMesh.nextSetBit (0); i >= 0; i = this.bsRenderMesh.nextSetBit (i + 1)) {
if (this.meshes[i].normalsTemp != null) {
this.meshes[i].setNormixes (this.meshes[i].normalsTemp);
this.meshes[i].normalsTemp = null;
} else if (this.meshes[i].normixes == null) {
this.meshes[i].initialize (1073741958, null, null);
}this.renderMesh (this.meshes[i]);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"ABSOLUTE_MIN_MESH_SIZE", 3,
"MIN_MESH_RENDER_SIZE", 8,
"MODE_TUBE", 0,
"MODE_FLAT", 1,
"MODE_ELLIPTICAL", 2,
"MODE_NONELLIPTICAL", 3);
});
// 
//// org\jmol\renderbio\RocketsRenderer.js 
// 
Clazz.declarePackage ("org.jmol.renderbio");
Clazz.load (["org.jmol.renderbio.BioShapeRenderer", "org.jmol.util.Point3f", "$.Vector3f"], "org.jmol.renderbio.RocketsRenderer", ["org.jmol.constant.EnumStructure"], function () {
c$ = Clazz.decorateAsClass (function () {
this.renderArrowHeads = false;
this.cordMidPoints = null;
this.tPending = false;
this.proteinstructurePending = null;
this.startIndexPending = 0;
this.endIndexPending = 0;
this.screenA = null;
this.screenB = null;
this.screenC = null;
this.corners = null;
this.screenCorners = null;
this.pointTipOffset = null;
this.scaledWidthVector = null;
this.scaledHeightVector = null;
this.lengthVector = null;
this.pointCorner = null;
Clazz.instantialize (this, arguments);
}, org.jmol.renderbio, "RocketsRenderer", org.jmol.renderbio.BioShapeRenderer);
Clazz.prepareFields (c$, function () {
this.screenA =  new org.jmol.util.Point3f ();
this.screenB =  new org.jmol.util.Point3f ();
this.screenC =  new org.jmol.util.Point3f ();
this.corners =  new Array (8);
this.screenCorners =  new Array (8);
{
for (var i = 8; --i >= 0; ) {
this.screenCorners[i] =  new org.jmol.util.Point3f ();
this.corners[i] =  new org.jmol.util.Point3f ();
}
}this.pointTipOffset =  new org.jmol.util.Point3f ();
this.scaledWidthVector =  new org.jmol.util.Vector3f ();
this.scaledHeightVector =  new org.jmol.util.Vector3f ();
this.lengthVector =  new org.jmol.util.Vector3f ();
this.pointCorner =  new org.jmol.util.Point3f ();
});
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (!(Clazz.instanceOf (bioShape.bioPolymer, org.jmol.modelsetbio.AminoPolymer))) return;
var val = !this.viewer.getCartoonFlag (603979900);
if (this.renderArrowHeads != val) {
bioShape.falsifyMesh ();
this.renderArrowHeads = val;
}this.calcRopeMidPoints (false);
this.calcScreenControlPoints (this.cordMidPoints);
this.controlPoints = this.cordMidPoints;
this.render1 ();
this.viewer.freeTempPoints (this.cordMidPoints);
}, "org.jmol.shapebio.BioShape");
Clazz.defineMethod (c$, "isSheet", 
function (i) {
return this.structureTypes[i] === org.jmol.constant.EnumStructure.SHEET;
}, "~N");
Clazz.defineMethod (c$, "calcRopeMidPoints", 
function (isNewStyle) {
var midPointCount = this.monomerCount + 1;
this.cordMidPoints = this.viewer.allocTempPoints (midPointCount);
var proteinstructurePrev = null;
var point;
for (var i = 0; i < this.monomerCount; ++i) {
point = this.cordMidPoints[i];
var residue = this.monomers[i];
if (isNewStyle && this.renderArrowHeads) {
point.setT (this.controlPoints[i]);
} else if (this.isHelix (i) || !isNewStyle && this.isSheet (i)) {
var proteinstructure = residue.getProteinStructure ();
point.setT (i - 1 != proteinstructure.getMonomerIndex () ? proteinstructure.getAxisStartPoint () : proteinstructure.getAxisEndPoint ());
proteinstructurePrev = proteinstructure;
} else {
if (proteinstructurePrev != null) point.setT (proteinstructurePrev.getAxisEndPoint ());
 else {
point.setT (this.controlPoints[i]);
}proteinstructurePrev = null;
}}
point = this.cordMidPoints[this.monomerCount];
if (proteinstructurePrev != null) point.setT (proteinstructurePrev.getAxisEndPoint ());
 else {
point.setT (this.controlPoints[this.monomerCount]);
}}, "~B");
Clazz.defineMethod (c$, "render1", 
function () {
this.tPending = false;
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) {
var monomer = this.monomers[i];
if (this.isHelix (i) || this.isSheet (i)) {
this.renderSpecialSegment (monomer, this.getLeadColix (i), this.mads[i]);
} else {
this.renderPending ();
this.renderHermiteConic (i, true);
}}
this.renderPending ();
});
Clazz.defineMethod (c$, "renderSpecialSegment", 
function (monomer, thisColix, thisMad) {
var proteinstructure = monomer.getProteinStructure ();
if (this.tPending) {
if (proteinstructure === this.proteinstructurePending && thisMad == this.mad && thisColix == this.colix && proteinstructure.getIndex (monomer) == this.endIndexPending + 1) {
++this.endIndexPending;
return;
}this.renderPending ();
}this.proteinstructurePending = proteinstructure;
this.startIndexPending = this.endIndexPending = proteinstructure.getIndex (monomer);
this.colix = thisColix;
this.mad = thisMad;
this.tPending = true;
}, "org.jmol.modelsetbio.Monomer,~N,~N");
Clazz.defineMethod (c$, "renderPending", 
function () {
if (!this.tPending) return;
var segments = this.proteinstructurePending.getSegments ();
var tEnd = (this.endIndexPending == this.proteinstructurePending.getMonomerCount () - 1);
if (Clazz.instanceOf (this.proteinstructurePending, org.jmol.modelsetbio.Helix)) this.renderPendingRocketSegment (this.endIndexPending, segments[this.startIndexPending], segments[this.endIndexPending], segments[this.endIndexPending + 1], tEnd);
 else if (Clazz.instanceOf (this.proteinstructurePending, org.jmol.modelsetbio.Sheet)) this.renderPendingSheet (segments[this.startIndexPending], segments[this.endIndexPending], segments[this.endIndexPending + 1], tEnd);
this.tPending = false;
});
Clazz.defineMethod (c$, "renderPendingRocketSegment", 
($fz = function (i, pointStart, pointBeforeEnd, pointEnd, tEnd) {
this.viewer.transformPt3f (pointStart, this.screenA);
this.viewer.transformPt3f (pointEnd, this.screenB);
var zMid = Clazz.doubleToInt (Math.floor ((this.screenA.z + this.screenB.z) / 2));
var diameter = this.viewer.scaleToScreen (zMid, this.mad);
if (tEnd && this.renderArrowHeads) {
this.viewer.transformPt3f (pointBeforeEnd, this.screenC);
if (this.g3d.setColix (this.colix)) {
if (pointBeforeEnd.distance (pointEnd) <= 0.05) this.g3d.fillCylinderBits (2, diameter, this.screenB, this.screenC);
 else this.renderCone (i, pointBeforeEnd, pointEnd, this.screenC, this.screenB);
}if (this.startIndexPending == this.endIndexPending) return;
var t = this.screenB;
this.screenB = this.screenC;
this.screenC = t;
}if (this.g3d.setColix (this.colix)) this.g3d.fillCylinderBits (2, diameter, this.screenA, this.screenB);
}, $fz.isPrivate = true, $fz), "~N,org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,~B");
Clazz.defineMethod (c$, "renderPendingSheet", 
($fz = function (pointStart, pointBeforeEnd, pointEnd, tEnd) {
if (!this.g3d.setColix (this.colix)) return;
if (tEnd && this.renderArrowHeads) {
this.drawArrowHeadBox (pointBeforeEnd, pointEnd);
this.drawBox (pointStart, pointBeforeEnd);
} else {
this.drawBox (pointStart, pointEnd);
}}, $fz.isPrivate = true, $fz), "org.jmol.util.Point3f,org.jmol.util.Point3f,org.jmol.util.Point3f,~B");
Clazz.defineMethod (c$, "buildBox", 
function (pointCorner, scaledWidthVector, scaledHeightVector, lengthVector) {
for (var i = 8; --i >= 0; ) {
var corner = this.corners[i];
corner.setT (pointCorner);
if ((i & 1) != 0) corner.add (scaledWidthVector);
if ((i & 2) != 0) corner.add (scaledHeightVector);
if ((i & 4) != 0) corner.add (lengthVector);
this.viewer.transformPt3f (corner, this.screenCorners[i]);
}
}, "org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f");
Clazz.defineMethod (c$, "buildArrowHeadBox", 
function (pointCorner, scaledWidthVector, scaledHeightVector, pointTip) {
for (var i = 4; --i >= 0; ) {
var corner = this.corners[i];
corner.setT (pointCorner);
if ((i & 1) != 0) corner.add (scaledWidthVector);
if ((i & 2) != 0) corner.add (scaledHeightVector);
this.viewer.transformPt3f (corner, this.screenCorners[i]);
}
this.corners[4].setT (pointTip);
this.viewer.transformPt3f (pointTip, this.screenCorners[4]);
this.corners[5].add2 (pointTip, scaledHeightVector);
this.viewer.transformPt3f (this.corners[5], this.screenCorners[5]);
}, "org.jmol.util.Point3f,org.jmol.util.Vector3f,org.jmol.util.Vector3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "drawBox", 
function (pointA, pointB) {
var sheet = this.proteinstructurePending;
var scale = this.mad / 1000;
this.scaledWidthVector.setT (sheet.getWidthUnitVector ());
this.scaledWidthVector.scale (scale);
this.scaledHeightVector.setT (sheet.getHeightUnitVector ());
this.scaledHeightVector.scale (scale / 4);
this.pointCorner.add2 (this.scaledWidthVector, this.scaledHeightVector);
this.pointCorner.scaleAdd (-0.5, pointA);
this.lengthVector.sub2 (pointB, pointA);
this.buildBox (this.pointCorner, this.scaledWidthVector, this.scaledHeightVector, this.lengthVector);
for (var i = 0; i < 6; ++i) {
var i0 = org.jmol.renderbio.RocketsRenderer.boxFaces[i * 4];
var i1 = org.jmol.renderbio.RocketsRenderer.boxFaces[i * 4 + 1];
var i2 = org.jmol.renderbio.RocketsRenderer.boxFaces[i * 4 + 2];
var i3 = org.jmol.renderbio.RocketsRenderer.boxFaces[i * 4 + 3];
this.g3d.fillQuadrilateral (this.screenCorners[i0], this.screenCorners[i1], this.screenCorners[i2], this.screenCorners[i3]);
}
}, "org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "drawArrowHeadBox", 
function (base, tip) {
var sheet = this.proteinstructurePending;
var scale = this.mad / 1000;
this.scaledWidthVector.setT (sheet.getWidthUnitVector ());
this.scaledWidthVector.scale (scale * 1.25);
this.scaledHeightVector.setT (sheet.getHeightUnitVector ());
this.scaledHeightVector.scale (scale / 3);
this.pointCorner.add2 (this.scaledWidthVector, this.scaledHeightVector);
this.pointCorner.scaleAdd (-0.5, base);
this.pointTipOffset.setT (this.scaledHeightVector);
this.pointTipOffset.scaleAdd (-0.5, tip);
this.buildArrowHeadBox (this.pointCorner, this.scaledWidthVector, this.scaledHeightVector, this.pointTipOffset);
this.g3d.fillTriangle3f (this.screenCorners[0], this.screenCorners[1], this.screenCorners[4], true);
this.g3d.fillTriangle3f (this.screenCorners[2], this.screenCorners[3], this.screenCorners[5], true);
for (var i = 0; i < 12; i += 4) {
var i0 = org.jmol.renderbio.RocketsRenderer.arrowHeadFaces[i];
var i1 = org.jmol.renderbio.RocketsRenderer.arrowHeadFaces[i + 1];
var i2 = org.jmol.renderbio.RocketsRenderer.arrowHeadFaces[i + 2];
var i3 = org.jmol.renderbio.RocketsRenderer.arrowHeadFaces[i + 3];
this.g3d.fillQuadrilateral (this.screenCorners[i0], this.screenCorners[i1], this.screenCorners[i2], this.screenCorners[i3]);
}
}, "org.jmol.util.Point3f,org.jmol.util.Point3f");
Clazz.defineStatics (c$,
"MIN_CONE_HEIGHT", 0.05,
"boxFaces", [0, 1, 3, 2, 0, 2, 6, 4, 0, 4, 5, 1, 7, 5, 4, 6, 7, 6, 2, 3, 7, 3, 1, 5]);
Clazz.defineStatics (c$,
"arrowHeadFaces", [0, 1, 3, 2, 0, 4, 5, 2, 1, 4, 5, 3]);
});
// 
//// org\jmol\renderbio\CartoonRenderer.js 
// 
Clazz.declarePackage ("org.jmol.renderbio");
Clazz.load (["org.jmol.renderbio.RocketsRenderer", "org.jmol.util.Point3f", "$.Point3i"], "org.jmol.renderbio.CartoonRenderer", ["org.jmol.util.Colix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.newRockets = true;
this.renderAsRockets = false;
this.renderEdges = false;
this.ptConnectScr = null;
this.ptConnect = null;
this.ring6Points = null;
this.ring6Screens = null;
this.ring5Points = null;
this.ring5Screens = null;
Clazz.instantialize (this, arguments);
}, org.jmol.renderbio, "CartoonRenderer", org.jmol.renderbio.RocketsRenderer);
Clazz.prepareFields (c$, function () {
this.ptConnectScr =  new org.jmol.util.Point3i ();
this.ptConnect =  new org.jmol.util.Point3f ();
this.ring6Points =  new Array (6);
this.ring6Screens =  new Array (6);
this.ring5Points =  new Array (5);
this.ring5Screens =  new Array (5);
{
this.ring6Screens[5] =  new org.jmol.util.Point3i ();
for (var i = 5; --i >= 0; ) {
this.ring5Screens[i] =  new org.jmol.util.Point3i ();
this.ring6Screens[i] =  new org.jmol.util.Point3i ();
}
}});
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
if (bioShape.wingVectors == null || this.isCarbohydrate) return;
this.getScreenControlPoints ();
if (this.isNucleic) {
this.renderNucleic ();
return;
}var val = this.viewer.getCartoonFlag (603979819);
if (this.renderAsRockets != val) {
bioShape.falsifyMesh ();
this.renderAsRockets = val;
}val = !this.viewer.getCartoonFlag (603979900);
if (this.renderArrowHeads != val) {
bioShape.falsifyMesh ();
this.renderArrowHeads = val;
}this.ribbonTopScreens = this.calcScreens (0.5);
this.ribbonBottomScreens = this.calcScreens (-0.5);
this.calcRopeMidPoints (this.newRockets);
if (!this.renderArrowHeads) {
this.calcScreenControlPoints (this.cordMidPoints);
this.controlPoints = this.cordMidPoints;
}this.render1 ();
this.viewer.freeTempPoints (this.cordMidPoints);
this.viewer.freeTempScreens (this.ribbonTopScreens);
this.viewer.freeTempScreens (this.ribbonBottomScreens);
}, "org.jmol.shapebio.BioShape");
Clazz.defineMethod (c$, "renderNucleic", 
function () {
this.renderEdges = this.viewer.getCartoonFlag (603979818);
var isTraceAlpha = this.viewer.getTraceAlpha ();
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) {
if (isTraceAlpha) {
this.ptConnectScr.set (Clazz.doubleToInt ((this.controlPointScreens[i].x + this.controlPointScreens[i + 1].x) / 2), Clazz.doubleToInt ((this.controlPointScreens[i].y + this.controlPointScreens[i + 1].y) / 2), Clazz.doubleToInt ((this.controlPointScreens[i].z + this.controlPointScreens[i + 1].z) / 2));
this.ptConnect.setT (this.controlPoints[i]);
this.ptConnect.scale (0.5);
this.ptConnect.scaleAdd2 (0.5, this.controlPoints[i + 1], this.ptConnect);
} else {
this.ptConnectScr.setT (this.controlPointScreens[i + 1]);
this.ptConnect.setT (this.controlPoints[i + 1]);
}this.renderHermiteConic (i, false);
this.colix = this.getLeadColix (i);
if (this.setBioColix (this.colix)) this.renderNucleicBaseStep (this.monomers[i], this.mads[i], this.ptConnectScr, this.ptConnect);
}
});
Clazz.overrideMethod (c$, "render1", 
function () {
var lastWasSheet = false;
var lastWasHelix = false;
var previousStructure = null;
var thisStructure;
for (var i = this.monomerCount; --i >= 0; ) {
thisStructure = this.monomers[i].getProteinStructure ();
if (thisStructure !== previousStructure) {
if (this.renderAsRockets) lastWasHelix = false;
lastWasSheet = false;
}previousStructure = thisStructure;
var isHelix = this.isHelix (i);
var isSheet = this.isSheet (i);
var isHelixRocket = (this.renderAsRockets || !this.renderArrowHeads ? isHelix : false);
if (this.bsVisible.get (i)) {
if (isHelixRocket) {
} else if (isSheet || isHelix) {
if (lastWasSheet && isSheet || lastWasHelix && isHelix) {
this.renderHermiteRibbon (true, i, true);
} else {
this.renderHermiteArrowHead (i);
}} else {
this.renderHermiteConic (i, true);
}}lastWasSheet = isSheet;
lastWasHelix = isHelix;
}
if (this.renderAsRockets || !this.renderArrowHeads) this.renderRockets ();
});
Clazz.defineMethod (c$, "renderRockets", 
($fz = function () {
this.tPending = false;
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) if (this.isHelix (i)) this.renderSpecialSegment (this.monomers[i], this.getLeadColix (i), this.mads[i]);

this.renderPending ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "renderNucleicBaseStep", 
($fz = function (nucleotide, thisMad, backboneScreen, ptConnect) {
if (this.renderEdges) {
this.renderLeontisWesthofEdges (nucleotide, thisMad);
return;
}nucleotide.getBaseRing6Points (this.ring6Points);
this.viewer.transformPoints (this.ring6Points, this.ring6Screens);
this.renderRing6 ();
var hasRing5 = nucleotide.maybeGetBaseRing5Points (this.ring5Points);
var stepScreen;
var stepPt;
if (hasRing5) {
this.viewer.transformPoints (this.ring5Points, this.ring5Screens);
this.renderRing5 ();
stepScreen = this.ring5Screens[3];
stepPt = this.ring5Points[3];
} else {
stepScreen = this.ring6Screens[2];
stepPt = this.ring6Points[2];
}this.mad = (thisMad > 1 ? Clazz.doubleToInt (thisMad / 2) : thisMad);
this.g3d.fillCylinderScreen3I (3, this.viewer.scaleToScreen (backboneScreen.z, this.mad), backboneScreen, stepScreen, ptConnect, stepPt, this.mad / 2000);
--this.ring6Screens[5].z;
for (var i = 5; --i >= 0; ) {
--this.ring6Screens[i].z;
if (hasRing5) --this.ring5Screens[i].z;
}
for (var i = 6; --i > 0; ) this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[i], this.ring6Screens[i - 1], this.ring6Points[i], this.ring6Points[i - 1], 0.005);

if (hasRing5) {
for (var i = 5; --i > 0; ) this.g3d.fillCylinderScreen3I (3, 3, this.ring5Screens[i], this.ring5Screens[i - 1], this.ring5Points[i], this.ring5Points[i - 1], 0.005);

} else {
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[5], this.ring6Screens[0], this.ring6Points[5], this.ring6Points[0], 0.005);
}}, $fz.isPrivate = true, $fz), "org.jmol.modelsetbio.NucleicMonomer,~N,org.jmol.util.Point3i,org.jmol.util.Point3f");
Clazz.defineMethod (c$, "renderLeontisWesthofEdges", 
($fz = function (nucleotide, thisMad) {
if (!nucleotide.getEdgePoints (this.ring6Points)) return;
this.viewer.transformPoints (this.ring6Points, this.ring6Screens);
this.renderTriangle ();
this.mad = (thisMad > 1 ? Clazz.doubleToInt (thisMad / 2) : thisMad);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[0], this.ring6Screens[1], this.ring6Points[0], this.ring6Points[1], 0.005);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[1], this.ring6Screens[2], this.ring6Points[1], this.ring6Points[2], 0.005);
var isTranslucent = org.jmol.util.Colix.isColixTranslucent (this.colix);
var tl = org.jmol.util.Colix.getColixTranslucencyLevel (this.colix);
var colixSugarEdge = org.jmol.util.Colix.getColixTranslucent3 (10, isTranslucent, tl);
var colixWatsonCrickEdge = org.jmol.util.Colix.getColixTranslucent3 (11, isTranslucent, tl);
var colixHoogsteenEdge = org.jmol.util.Colix.getColixTranslucent3 (7, isTranslucent, tl);
this.g3d.setColix (colixSugarEdge);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[2], this.ring6Screens[3], this.ring6Points[2], this.ring6Points[3], 0.005);
this.g3d.setColix (colixWatsonCrickEdge);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[3], this.ring6Screens[4], this.ring6Points[3], this.ring6Points[4], 0.005);
this.g3d.setColix (colixHoogsteenEdge);
this.g3d.fillCylinderScreen3I (3, 3, this.ring6Screens[4], this.ring6Screens[5], this.ring6Points[4], this.ring6Points[5], 0.005);
}, $fz.isPrivate = true, $fz), "org.jmol.modelsetbio.NucleicMonomer,~N");
Clazz.defineMethod (c$, "renderTriangle", 
($fz = function () {
this.g3d.setNoisySurfaceShade (this.ring6Screens[2], this.ring6Screens[3], this.ring6Screens[4]);
this.g3d.fillTriangle3i (this.ring6Screens[2], this.ring6Screens[3], this.ring6Screens[4], this.ring6Points[2], this.ring6Points[3], this.ring6Points[4]);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "renderRing6", 
($fz = function () {
this.g3d.setNoisySurfaceShade (this.ring6Screens[0], this.ring6Screens[2], this.ring6Screens[4]);
this.g3d.fillTriangle3i (this.ring6Screens[0], this.ring6Screens[2], this.ring6Screens[4], this.ring6Points[0], this.ring6Points[2], this.ring6Points[4]);
this.g3d.fillTriangle3i (this.ring6Screens[0], this.ring6Screens[1], this.ring6Screens[2], this.ring6Points[0], this.ring6Points[1], this.ring6Points[2]);
this.g3d.fillTriangle3i (this.ring6Screens[0], this.ring6Screens[4], this.ring6Screens[5], this.ring6Points[0], this.ring6Points[4], this.ring6Points[5]);
this.g3d.fillTriangle3i (this.ring6Screens[2], this.ring6Screens[3], this.ring6Screens[4], this.ring6Points[2], this.ring6Points[3], this.ring6Points[4]);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "renderRing5", 
($fz = function () {
this.g3d.fillTriangle3i (this.ring5Screens[0], this.ring5Screens[2], this.ring5Screens[3], this.ring5Points[0], this.ring5Points[2], this.ring5Points[3]);
this.g3d.fillTriangle3i (this.ring5Screens[0], this.ring5Screens[1], this.ring5Screens[2], this.ring5Points[0], this.ring5Points[1], this.ring5Points[2]);
this.g3d.fillTriangle3i (this.ring5Screens[0], this.ring5Screens[3], this.ring5Screens[4], this.ring5Points[0], this.ring5Points[3], this.ring5Points[4]);
}, $fz.isPrivate = true, $fz));
});
// 
//// org\jmol\renderbio\BackboneRenderer.js 
// 
Clazz.declarePackage ("org.jmol.renderbio");
Clazz.load (["org.jmol.renderbio.BioShapeRenderer"], "org.jmol.renderbio.BackboneRenderer", ["org.jmol.util.Colix"], function () {
c$ = Clazz.declareType (org.jmol.renderbio, "BackboneRenderer", org.jmol.renderbio.BioShapeRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
var isDataFrame = this.viewer.isJmolDataFrameForModel (bioShape.modelIndex);
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) {
var atomA = this.modelSet.atoms[this.leadAtomIndices[i]];
var atomB = this.modelSet.atoms[this.leadAtomIndices[i + 1]];
if (atomA.getNBackbonesDisplayed () == 0 || atomB.getNBackbonesDisplayed () == 0 || this.modelSet.isAtomHidden (atomB.getIndex ())) continue;
if (!isDataFrame && atomA.distance (atomB) > 10) continue;
var colixA = org.jmol.util.Colix.getColixInherited (this.colixes[i], atomA.getColix ());
var colixB = org.jmol.util.Colix.getColixInherited (this.colixes[i + 1], atomB.getColix ());
if (!this.isExport && !this.isPass2) {
var doA = !org.jmol.util.Colix.isColixTranslucent (colixA);
var doB = !org.jmol.util.Colix.isColixTranslucent (colixB);
if (!doA || !doB) {
if (!doA && !doB) continue;
this.needTranslucent = true;
}}var xA = atomA.screenX;
var yA = atomA.screenY;
var zA = atomA.screenZ;
var xB = atomB.screenX;
var yB = atomB.screenY;
var zB = atomB.screenZ;
this.mad = this.mads[i];
if (this.mad < 0) {
this.g3d.drawLine (colixA, colixB, xA, yA, zA, xB, yB, zB);
} else {
var width = (this.exportType == 1 ? this.mad : this.viewer.scaleToScreen (Clazz.doubleToInt ((zA + zB) / 2), this.mad));
this.g3d.fillCylinderXYZ (colixA, colixB, 3, width, xA, yA, zA, xB, yB, zB);
}}
}, "org.jmol.shapebio.BioShape");
});
// 
//// org\jmol\renderbio\TraceRenderer.js 
// 
Clazz.declarePackage ("org.jmol.renderbio");
Clazz.load (["org.jmol.renderbio.BioShapeRenderer"], "org.jmol.renderbio.TraceRenderer", null, function () {
c$ = Clazz.declareType (org.jmol.renderbio, "TraceRenderer", org.jmol.renderbio.BioShapeRenderer);
Clazz.overrideMethod (c$, "renderBioShape", 
function (bioShape) {
this.getScreenControlPoints ();
for (var i = this.bsVisible.nextSetBit (0); i >= 0; i = this.bsVisible.nextSetBit (i + 1)) this.renderHermiteConic (i, false);

}, "org.jmol.shapebio.BioShape");
});
