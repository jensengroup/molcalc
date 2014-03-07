Clazz.declarePackage ("org.jmol.adapter.smarter");
Clazz.load (["org.jmol.util.StringXBuilder"], "org.jmol.adapter.smarter.AtomSetCollectionReader", ["java.lang.Boolean", "$.Character", "$.Float", "java.util.ArrayList", "org.jmol.adapter.smarter.Atom", "$.AtomSetCollection", "org.jmol.api.Interface", "$.JmolAdapter", "org.jmol.util.BitSet", "$.BitSetUtil", "$.Logger", "$.Matrix3f", "$.Parser", "$.Point3f", "$.Quaternion", "$.TextFormat", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isBinary = false;
this.atomSetCollection = null;
this.reader = null;
this.doc = null;
this.readerName = null;
this.htParams = null;
this.trajectorySteps = null;
this.line = null;
this.prevline = null;
this.next = null;
this.ptLine = 0;
this.latticeCells = null;
this.doProcessLines = false;
this.iHaveUnitCell = false;
this.iHaveSymmetryOperators = false;
this.continuing = true;
this.viewer = null;
this.doApplySymmetry = false;
this.ignoreFileSymmetryOperators = false;
this.isTrajectory = false;
this.applySymmetryToBonds = false;
this.doCheckUnitCell = false;
this.getHeader = false;
this.isSequential = false;
this.templateAtomCount = 0;
this.modelNumber = 0;
this.vibrationNumber = 0;
this.desiredVibrationNumber = -2147483648;
this.bsModels = null;
this.havePartialChargeFilter = false;
this.calculationType = "?";
this.spaceGroup = null;
this.ignoreFileUnitCell = false;
this.ignoreFileSpaceGroupName = false;
this.notionalUnitCell = null;
this.desiredModelNumber = -2147483648;
this.symmetry = null;
this.os = null;
this.iHaveFractionalCoordinates = false;
this.doPackUnitCell = false;
this.strSupercell = null;
this.ptSupercell = null;
this.loadNote = null;
this.doConvertToFractional = false;
this.fileCoordinatesAreFractional = false;
this.merging = false;
this.symmetryRange = 0;
this.firstLastStep = null;
this.lastModelNumber = 2147483647;
this.desiredSpaceGroupIndex = -1;
this.fileScaling = null;
this.fileOffset = null;
this.fileOffsetFractional = null;
this.unitCellOffset = null;
this.unitCellOffsetFractional = false;
this.filePath = null;
this.fileName = null;
this.stateScriptVersionInt = 2147483647;
this.haveModel = false;
this.previousSpaceGroup = null;
this.previousUnitCell = null;
this.nMatrixElements = 0;
this.matUnitCellOrientation = null;
this.bsFilter = null;
this.filter = null;
this.haveAtomFilter = false;
this.filterAltLoc = false;
this.filterGroup3 = false;
this.filterChain = false;
this.filterAtomName = false;
this.filterAtomType = false;
this.filterAtomTypeStr = null;
this.filterElement = false;
this.filterHetero = false;
this.filterEveryNth = false;
this.filterN = 0;
this.nFiltered = 0;
this.doSetOrientation = false;
this.doCentralize = false;
this.addVibrations = false;
this.useAltNames = false;
this.doReadMolecularOrbitals = false;
this.reverseModels = false;
this.nameRequired = null;
this.doCentroidUnitCell = false;
this.centroidPacked = false;
this.filter1 = null;
this.filter2 = null;
this.matrixRotate = null;
this.previousScript = null;
this.siteScript = null;
Clazz.instantialize (this, arguments);
}, org.jmol.adapter.smarter, "AtomSetCollectionReader");
Clazz.prepareFields (c$, function () {
this.next =  Clazz.newIntArray (1, 0);
this.loadNote =  new org.jmol.util.StringXBuilder ();
});
Clazz.defineMethod (c$, "setup", 
function (fullPath, htParams, reader) {
this.htParams = htParams;
this.filePath = fullPath.$replace ('\\', '/');
var i = this.filePath.lastIndexOf ('/');
this.fileName = this.filePath.substring (i + 1);
if (Clazz.instanceOf (reader, java.io.BufferedReader)) this.reader = reader;
 else if (Clazz.instanceOf (reader, org.jmol.api.JmolDocument)) this.doc = reader;
}, "~S,java.util.Map,~O");
Clazz.defineMethod (c$, "readData", 
function () {
this.initialize ();
this.atomSetCollection =  new org.jmol.adapter.smarter.AtomSetCollection (this.readerName, this, null, null);
try {
this.initializeReader ();
if (this.doc == null) {
if (this.line == null && this.continuing) this.readLine ();
while (this.line != null && this.continuing) if (this.checkLine ()) this.readLine ();

} else {
this.processBinaryDocument (this.doc);
}this.finalizeReader ();
} catch (e) {
this.setError (e);
}
if (this.reader != null) this.reader.close ();
if (this.doc != null) this.doc.close ();
return this.finish ();
});
Clazz.defineMethod (c$, "readDataObject", 
function (node) {
this.initialize ();
this.atomSetCollection =  new org.jmol.adapter.smarter.AtomSetCollection (this.readerName, this, null, null);
this.initializeReader ();
this.processDOM (node);
return this.finish ();
}, "~O");
Clazz.defineMethod (c$, "processDOM", 
function (DOMNode) {
}, "~O");
Clazz.defineMethod (c$, "processBinaryDocument", 
function (doc) {
}, "org.jmol.api.JmolDocument");
Clazz.defineMethod (c$, "initializeReader", 
function () {
});
Clazz.defineMethod (c$, "checkLine", 
function () {
return true;
});
Clazz.defineMethod (c$, "checkLastModel", 
function () {
if (this.isLastModel (this.modelNumber) && this.doProcessLines) {
this.continuing = false;
return false;
}this.doProcessLines = false;
return true;
});
Clazz.defineMethod (c$, "isLastModel", 
function (modelNumber) {
return (this.desiredModelNumber > 0 || modelNumber >= this.lastModelNumber);
}, "~N");
Clazz.defineMethod (c$, "appendLoadNote", 
function (info) {
this.loadNote.append (info).append ("\n");
}, "~S");
Clazz.defineMethod (c$, "initializeTrajectoryFile", 
function () {
this.atomSetCollection.addAtom ( new org.jmol.adapter.smarter.Atom ());
this.trajectorySteps = this.htParams.get ("trajectorySteps");
if (this.trajectorySteps == null) this.htParams.put ("trajectorySteps", this.trajectorySteps =  new java.util.ArrayList ());
});
Clazz.defineMethod (c$, "finalizeReader", 
function () {
this.applySymmetryAndSetTrajectory ();
if (this.loadNote.length () > 0) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("modelLoadNote", this.loadNote.toString ());
if (this.doCentralize) this.atomSetCollection.centralize ();
});
Clazz.defineMethod (c$, "setIsPDB", 
function () {
this.atomSetCollection.setGlobalBoolean (4);
this.atomSetCollection.setAtomSetAuxiliaryInfo ("isPDB", Boolean.TRUE);
if (this.htParams.get ("pdbNoHydrogens") != null) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("pdbNoHydrogens", this.htParams.get ("pdbNoHydrogens"));
});
Clazz.defineMethod (c$, "setPdb", 
function () {
});
Clazz.defineMethod (c$, "finish", 
($fz = function () {
var s = this.htParams.get ("loadState");
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("loadState", s == null ? "" : s);
s = this.htParams.get ("smilesString");
if (s != null) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("smilesString", s);
if (!this.htParams.containsKey ("templateAtomCount")) this.htParams.put ("templateAtomCount", Integer.$valueOf (this.atomSetCollection.getAtomCount ()));
if (this.htParams.containsKey ("bsFilter")) this.htParams.put ("filteredAtomCount", Integer.$valueOf (org.jmol.util.BitSetUtil.cardinalityOf (this.htParams.get ("bsFilter"))));
if (!this.calculationType.equals ("?")) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("calculationType", this.calculationType);
var name = this.atomSetCollection.getFileTypeName ();
var fileType = name;
if (fileType.indexOf ("(") >= 0) fileType = fileType.substring (0, fileType.indexOf ("("));
for (var i = this.atomSetCollection.getAtomSetCount (); --i >= 0; ) {
this.atomSetCollection.setAtomSetAuxiliaryInfoForSet ("fileName", this.filePath, i);
this.atomSetCollection.setAtomSetAuxiliaryInfoForSet ("fileType", fileType, i);
}
this.atomSetCollection.freeze (this.reverseModels);
if (this.atomSetCollection.errorMessage != null) return this.atomSetCollection.errorMessage + "\nfor file " + this.filePath + "\ntype " + name;
if ((this.atomSetCollection.bsAtoms == null ? this.atomSetCollection.getAtomCount () : this.atomSetCollection.bsAtoms.cardinality ()) == 0 && fileType.indexOf ("DataOnly") < 0) return "No atoms found\nfor file " + this.filePath + "\ntype " + name;
return this.atomSetCollection;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setError", 
($fz = function (e) {
var s;
{
if (e.getMessage)
s = e.getMessage()
else
s = e.toString();
}if (this.line == null) this.atomSetCollection.errorMessage = "Error reading file at end of file \n" + s;
 else this.atomSetCollection.errorMessage = "Error reading file at line " + this.ptLine + ":\n" + this.line + "\n" + s;
}, $fz.isPrivate = true, $fz), "Throwable");
Clazz.defineMethod (c$, "initialize", 
($fz = function () {
var o = this.htParams.get ("supercell");
if (Clazz.instanceOf (o, String)) this.strSupercell = o;
 else this.ptSupercell = o;
this.initializeSymmetry ();
this.viewer = this.htParams.remove ("viewer");
if (this.htParams.containsKey ("stateScriptVersionInt")) this.stateScriptVersionInt = (this.htParams.get ("stateScriptVersionInt")).intValue ();
this.merging = this.htParams.containsKey ("merging");
this.getHeader = this.htParams.containsKey ("getHeader");
this.isSequential = this.htParams.containsKey ("isSequential");
this.readerName = this.htParams.get ("readerName");
if (this.htParams.containsKey ("OutputStream")) this.os = this.htParams.get ("OutputStream");
if (this.htParams.containsKey ("vibrationNumber")) this.desiredVibrationNumber = (this.htParams.get ("vibrationNumber")).intValue ();
 else if (this.htParams.containsKey ("modelNumber")) this.desiredModelNumber = (this.htParams.get ("modelNumber")).intValue ();
this.applySymmetryToBonds = this.htParams.containsKey ("applySymmetryToBonds");
this.bsFilter = this.htParams.get ("bsFilter");
this.setFilter (null);
var ptFile = (this.htParams.containsKey ("ptFile") ? (this.htParams.get ("ptFile")).intValue () : -1);
this.isTrajectory = this.htParams.containsKey ("isTrajectory");
if (ptFile > 0 && this.htParams.containsKey ("firstLastSteps")) {
var val = (this.htParams.get ("firstLastSteps")).get (ptFile - 1);
if (Clazz.instanceOf (val, org.jmol.util.BitSet)) {
this.bsModels = val;
} else {
this.firstLastStep = val;
}} else if (this.htParams.containsKey ("firstLastStep")) {
this.firstLastStep = this.htParams.get ("firstLastStep");
} else if (this.htParams.containsKey ("bsModels")) {
this.bsModels = this.htParams.get ("bsModels");
}if (this.htParams.containsKey ("templateAtomCount")) this.templateAtomCount = (this.htParams.get ("templateAtomCount")).intValue ();
if (this.bsModels != null || this.firstLastStep != null) this.desiredModelNumber = -2147483648;
if (this.bsModels == null && this.firstLastStep != null) {
if (this.firstLastStep[0] < 0) this.firstLastStep[0] = 0;
if (this.firstLastStep[2] == 0 || this.firstLastStep[1] < this.firstLastStep[0]) this.firstLastStep[1] = -1;
if (this.firstLastStep[2] < 1) this.firstLastStep[2] = 1;
this.bsModels = org.jmol.util.BitSetUtil.newAndSetBit (this.firstLastStep[0]);
if (this.firstLastStep[1] > this.firstLastStep[0]) {
for (var i = this.firstLastStep[0]; i <= this.firstLastStep[1]; i += this.firstLastStep[2]) this.bsModels.set (i);

}}if (this.bsModels != null && (this.firstLastStep == null || this.firstLastStep[1] != -1)) this.lastModelNumber = this.bsModels.length ();
this.symmetryRange = (this.htParams.containsKey ("symmetryRange") ? (this.htParams.get ("symmetryRange")).floatValue () : 0);
this.latticeCells =  Clazz.newIntArray (3, 0);
if (this.htParams.containsKey ("lattice")) {
var pt = (this.htParams.get ("lattice"));
this.latticeCells[0] = Clazz.floatToInt (pt.x);
this.latticeCells[1] = Clazz.floatToInt (pt.y);
this.latticeCells[2] = Clazz.floatToInt (pt.z);
this.doCentroidUnitCell = (this.htParams.containsKey ("centroid"));
this.centroidPacked = this.doCentroidUnitCell && this.htParams.containsKey ("packed");
this.doPackUnitCell = !this.doCentroidUnitCell && (this.htParams.containsKey ("packed") || this.latticeCells[2] < 0);
}this.doApplySymmetry = (this.latticeCells[0] > 0 && this.latticeCells[1] > 0);
if (!this.doApplySymmetry) {
this.latticeCells[0] = 0;
this.latticeCells[1] = 0;
this.latticeCells[2] = 0;
}if (this.htParams.containsKey ("spaceGroupIndex")) {
this.desiredSpaceGroupIndex = (this.htParams.get ("spaceGroupIndex")).intValue ();
if (this.desiredSpaceGroupIndex == -2) this.spaceGroup = this.htParams.get ("spaceGroupName");
this.ignoreFileSpaceGroupName = (this.desiredSpaceGroupIndex == -2 || this.desiredSpaceGroupIndex >= 0);
this.ignoreFileSymmetryOperators = (this.desiredSpaceGroupIndex != -1);
}if (this.htParams.containsKey ("unitCellOffset")) {
this.fileScaling = org.jmol.util.Point3f.new3 (1, 1, 1);
this.fileOffset = this.htParams.get ("unitCellOffset");
this.fileOffsetFractional = org.jmol.util.Point3f.newP (this.fileOffset);
this.unitCellOffsetFractional = this.htParams.containsKey ("unitCellOffsetFractional");
}if (this.htParams.containsKey ("unitcell")) {
var fParams = this.htParams.get ("unitcell");
if (this.merging) this.setFractionalCoordinates (true);
if (fParams.length == 9) {
this.addPrimitiveLatticeVector (0, fParams, 0);
this.addPrimitiveLatticeVector (1, fParams, 3);
this.addPrimitiveLatticeVector (2, fParams, 6);
} else {
this.setUnitCell (fParams[0], fParams[1], fParams[2], fParams[3], fParams[4], fParams[5]);
}this.ignoreFileUnitCell = this.iHaveUnitCell;
if (this.merging && !this.iHaveUnitCell) this.setFractionalCoordinates (false);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "doGetModel", 
function (modelNumber, title) {
if (title != null && this.nameRequired != null && this.nameRequired.length > 0 && title.toUpperCase ().indexOf (this.nameRequired) < 0) return false;
var isOK = (this.bsModels == null ? this.desiredModelNumber < 1 || modelNumber == this.desiredModelNumber : modelNumber > this.lastModelNumber ? false : modelNumber > 0 && this.bsModels.get (modelNumber - 1) || this.haveModel && this.firstLastStep != null && this.firstLastStep[1] < 0 && (this.firstLastStep[2] < 2 || (modelNumber - 1 - this.firstLastStep[0]) % this.firstLastStep[2] == 0));
if (isOK && this.desiredModelNumber == 0) this.atomSetCollection.discardPreviousAtoms ();
this.haveModel = new Boolean (this.haveModel | isOK).valueOf ();
if (isOK) this.doProcessLines = true;
return isOK;
}, "~N,~S");
Clazz.defineMethod (c$, "initializeSymmetry", 
function () {
this.previousSpaceGroup = this.spaceGroup;
this.previousUnitCell = this.notionalUnitCell;
this.iHaveUnitCell = this.ignoreFileUnitCell;
if (!this.ignoreFileUnitCell) {
this.notionalUnitCell =  Clazz.newFloatArray (25, 0);
for (var i = 25; --i >= 0; ) this.notionalUnitCell[i] = NaN;

if (this.ptSupercell != null) {
this.notionalUnitCell[22] = Math.max (1, Clazz.floatToInt (this.ptSupercell.x));
this.notionalUnitCell[23] = Math.max (1, Clazz.floatToInt (this.ptSupercell.y));
this.notionalUnitCell[24] = Math.max (1, Clazz.floatToInt (this.ptSupercell.z));
}this.symmetry = null;
}if (!this.ignoreFileSpaceGroupName) this.spaceGroup = "unspecified!";
this.doCheckUnitCell = false;
});
Clazz.defineMethod (c$, "newAtomSet", 
function (name) {
if (this.atomSetCollection.getCurrentAtomSetIndex () >= 0) {
this.atomSetCollection.newAtomSet ();
this.atomSetCollection.setCollectionName ("<collection of " + (this.atomSetCollection.getCurrentAtomSetIndex () + 1) + " models>");
} else {
this.atomSetCollection.setCollectionName (name);
}this.atomSetCollection.setAtomSetAuxiliaryInfoForSet ("name", name, Math.max (0, this.atomSetCollection.getCurrentAtomSetIndex ()));
}, "~S");
Clazz.defineMethod (c$, "cloneLastAtomSet", 
function (atomCount, pts) {
var lastAtomCount = this.atomSetCollection.getLastAtomSetAtomCount ();
this.atomSetCollection.cloneLastAtomSetFromPoints (atomCount, pts);
if (this.atomSetCollection.haveUnitCell) {
this.iHaveUnitCell = true;
this.doCheckUnitCell = true;
this.spaceGroup = this.previousSpaceGroup;
this.notionalUnitCell = this.previousUnitCell;
}return lastAtomCount;
}, "~N,~A");
Clazz.defineMethod (c$, "setSpaceGroupName", 
function (name) {
if (this.ignoreFileSpaceGroupName) return;
this.spaceGroup = name.trim ();
org.jmol.util.Logger.info ("Setting space group name to " + this.spaceGroup);
}, "~S");
Clazz.defineMethod (c$, "setSymmetryOperator", 
function (xyz) {
if (this.ignoreFileSymmetryOperators) return;
this.atomSetCollection.setLatticeCells (this.latticeCells, this.applySymmetryToBonds, this.doPackUnitCell, this.doCentroidUnitCell, this.centroidPacked, this.strSupercell, this.ptSupercell);
if (!this.atomSetCollection.addSpaceGroupOperation (xyz)) org.jmol.util.Logger.warn ("Skipping symmetry operation " + xyz);
this.iHaveSymmetryOperators = true;
}, "~S");
Clazz.defineMethod (c$, "initializeCartesianToFractional", 
($fz = function () {
for (var i = 0; i < 16; i++) if (!Float.isNaN (this.notionalUnitCell[6 + i])) return;

for (var i = 0; i < 16; i++) this.notionalUnitCell[6 + i] = ((i % 5 == 0 ? 1 : 0));

this.nMatrixElements = 0;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "clearUnitCell", 
function () {
if (this.ignoreFileUnitCell) return;
for (var i = 6; i < 22; i++) this.notionalUnitCell[i] = NaN;

this.checkUnitCell (6);
});
Clazz.defineMethod (c$, "setUnitCellItem", 
function (i, x) {
if (this.ignoreFileUnitCell) return;
if (i == 0 && x == 1 || i == 3 && x == 0) return;
if (!Float.isNaN (x) && i >= 6 && Float.isNaN (this.notionalUnitCell[6])) this.initializeCartesianToFractional ();
this.notionalUnitCell[i] = x;
if (org.jmol.util.Logger.debugging) {
org.jmol.util.Logger.debug ("setunitcellitem " + i + " " + x);
}if (i < 6 || Float.isNaN (x)) this.iHaveUnitCell = this.checkUnitCell (6);
 else if (++this.nMatrixElements == 12) this.checkUnitCell (22);
}, "~N,~N");
Clazz.defineMethod (c$, "setUnitCell", 
function (a, b, c, alpha, beta, gamma) {
if (this.ignoreFileUnitCell) return;
this.clearUnitCell ();
this.notionalUnitCell[0] = a;
this.notionalUnitCell[1] = b;
this.notionalUnitCell[2] = c;
if (alpha != 0) this.notionalUnitCell[3] = alpha;
if (beta != 0) this.notionalUnitCell[4] = beta;
if (gamma != 0) this.notionalUnitCell[5] = gamma;
this.iHaveUnitCell = this.checkUnitCell (6);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addPrimitiveLatticeVector", 
function (i, xyz, i0) {
if (this.ignoreFileUnitCell) return;
if (i == 0) for (var j = 0; j < 6; j++) this.notionalUnitCell[j] = 0;

i = 6 + i * 3;
this.notionalUnitCell[i++] = xyz[i0++];
this.notionalUnitCell[i++] = xyz[i0++];
this.notionalUnitCell[i] = xyz[i0];
if (Float.isNaN (this.notionalUnitCell[0])) {
for (i = 0; i < 6; i++) this.notionalUnitCell[i] = -1;

}this.iHaveUnitCell = this.checkUnitCell (15);
}, "~N,~A,~N");
Clazz.defineMethod (c$, "checkUnitCell", 
($fz = function (n) {
for (var i = 0; i < n; i++) if (Float.isNaN (this.notionalUnitCell[i])) return false;

this.getSymmetry ().setUnitCell (this.notionalUnitCell);
if (this.doApplySymmetry) this.doConvertToFractional = !this.fileCoordinatesAreFractional;
this.checkUnitCellOffset ();
return true;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "checkUnitCellOffset", 
($fz = function () {
if (this.symmetry == null || this.fileOffsetFractional == null) return;
this.fileOffset.setT (this.fileOffsetFractional);
if (this.unitCellOffsetFractional != this.fileCoordinatesAreFractional) {
if (this.unitCellOffsetFractional) this.symmetry.toCartesian (this.fileOffset, false);
 else this.symmetry.toFractional (this.fileOffset, false);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSymmetry", 
function () {
this.symmetry = org.jmol.api.Interface.getOptionInterface ("symmetry.Symmetry");
return this.symmetry;
});
Clazz.defineMethod (c$, "setFractionalCoordinates", 
function (TF) {
this.iHaveFractionalCoordinates = this.fileCoordinatesAreFractional = TF;
this.checkUnitCellOffset ();
}, "~B");
Clazz.defineMethod (c$, "setFilter", 
function (filter0) {
if (filter0 == null) {
filter0 = this.htParams.get ("filter");
} else {
this.bsFilter = null;
}if (filter0 != null) filter0 = filter0.toUpperCase ();
this.filter = filter0;
this.doSetOrientation = !this.checkFilterKey ("NOORIENT");
this.doCentralize = (!this.checkFilterKey ("NOCENTER") && this.checkFilterKey ("CENTER"));
this.addVibrations = !this.checkFilterKey ("NOVIB");
this.doReadMolecularOrbitals = !this.checkFilterKey ("NOMO");
this.useAltNames = this.checkFilterKey ("ALTNAME");
this.reverseModels = this.checkFilterKey ("REVERSEMODELS");
if (this.checkFilterKey ("NAME=")) {
this.nameRequired = this.filter.substring (this.filter.indexOf ("NAME=") + 5);
if (this.nameRequired.startsWith ("'")) this.nameRequired = org.jmol.util.TextFormat.splitChars (this.nameRequired, "'")[1];
 else if (this.nameRequired.startsWith ("\"")) this.nameRequired = org.jmol.util.TextFormat.splitChars (this.nameRequired, "\"")[1];
filter0 = this.filter = org.jmol.util.TextFormat.simpleReplace (this.filter, this.nameRequired, "");
filter0 = this.filter = org.jmol.util.TextFormat.simpleReplace (this.filter, "NAME=", "");
}if (this.filter == null) return;
this.filterAtomName = this.checkFilterKey ("*.") || this.checkFilterKey ("!.");
this.filterElement = this.checkFilterKey ("_");
this.filterHetero = this.checkFilterKey ("HETATM");
this.filterGroup3 = this.checkFilterKey ("[");
this.filterChain = this.checkFilterKey (":");
this.filterAltLoc = this.checkFilterKey ("%");
this.filterEveryNth = this.checkFilterKey ("/=");
if (this.filterEveryNth) this.filterN = this.parseIntStr (this.filter.substring (this.filter.indexOf ("/=") + 2));
 else this.filterAtomType = this.checkFilterKey ("=");
if (this.filterN == -2147483648) this.filterEveryNth = false;
this.haveAtomFilter = this.filterAtomName || this.filterAtomType || this.filterElement || this.filterGroup3 || this.filterChain || this.filterAltLoc || this.filterHetero || this.filterEveryNth || this.checkFilterKey ("/=");
if (this.bsFilter == null) {
this.bsFilter =  new org.jmol.util.BitSet ();
this.htParams.put ("bsFilter", this.bsFilter);
this.filter = (";" + this.filter + ";").$replace (',', ';');
org.jmol.util.Logger.info ("filtering with " + this.filter);
if (this.haveAtomFilter) {
var ipt;
this.filter1 = this.filter;
if ((ipt = this.filter.indexOf ("|")) >= 0) {
this.filter1 = this.filter.substring (0, ipt).trim () + ";";
this.filter2 = ";" + this.filter.substring (ipt).trim ();
}}}}, "~S");
Clazz.defineMethod (c$, "checkFilterKey", 
function (key) {
return (this.filter != null && this.filter.indexOf (key) >= 0);
}, "~S");
Clazz.defineMethod (c$, "filterAtom", 
function (atom, iAtom) {
if (!this.haveAtomFilter) return true;
var isOK = this.checkFilter (atom, this.filter1);
if (this.filter2 != null) isOK = new Boolean (isOK | this.checkFilter (atom, this.filter2)).valueOf ();
if (isOK && this.filterEveryNth) isOK = (((this.nFiltered++) % this.filterN) == 0);
this.bsFilter.setBitTo (iAtom >= 0 ? iAtom : this.atomSetCollection.getAtomCount (), isOK);
return isOK;
}, "org.jmol.adapter.smarter.Atom,~N");
Clazz.defineMethod (c$, "checkFilter", 
($fz = function (atom, f) {
return (!this.filterGroup3 || atom.group3 == null || !this.filterReject (f, "[", atom.group3.toUpperCase () + "]")) && (!this.filterAtomName || atom.atomName == null || !this.filterReject (f, ".", atom.atomName.toUpperCase () + (this.filterAtomTypeStr == null ? ";" : "\0"))) && (this.filterAtomTypeStr == null || atom.atomName == null || atom.atomName.toUpperCase ().indexOf ("\0" + this.filterAtomTypeStr) >= 0) && (!this.filterElement || atom.elementSymbol == null || !this.filterReject (f, "_", atom.elementSymbol.toUpperCase () + ";")) && (!this.filterChain || atom.chainID == '\0' || !this.filterReject (f, ":", "" + atom.chainID)) && (!this.filterAltLoc || atom.alternateLocationID == '\0' || !this.filterReject (f, "%", "" + atom.alternateLocationID)) && (!this.filterHetero || !this.filterReject (f, "HETATM", atom.isHetero ? "HETATM" : "ATOM"));
}, $fz.isPrivate = true, $fz), "org.jmol.adapter.smarter.Atom,~S");
Clazz.defineMethod (c$, "filterReject", 
function (f, code, atomCode) {
return (f.indexOf (code) >= 0 && (f.indexOf ("!" + code) >= 0 ? f.indexOf (code + atomCode) >= 0 : f.indexOf (code + atomCode) < 0));
}, "~S,~S,~S");
Clazz.defineMethod (c$, "set2D", 
function () {
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("is2D", Boolean.TRUE);
if (!this.checkFilterKey ("NOMIN")) this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("doMinimize", Boolean.TRUE);
});
Clazz.defineMethod (c$, "doGetVibration", 
function (vibrationNumber) {
return this.addVibrations && (this.desiredVibrationNumber <= 0 || vibrationNumber == this.desiredVibrationNumber);
}, "~N");
Clazz.defineMethod (c$, "setTransform", 
function (x1, y1, z1, x2, y2, z2, x3, y3, z3) {
if (this.matrixRotate != null || !this.doSetOrientation) return;
this.matrixRotate =  new org.jmol.util.Matrix3f ();
var v =  new org.jmol.util.Vector3f ();
v.set (x1, y1, z1);
v.normalize ();
this.matrixRotate.setColumnV (0, v);
v.set (x2, y2, z2);
v.normalize ();
this.matrixRotate.setColumnV (1, v);
v.set (x3, y3, z3);
v.normalize ();
this.matrixRotate.setColumnV (2, v);
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("defaultOrientationMatrix", org.jmol.util.Matrix3f.newM (this.matrixRotate));
var q = org.jmol.util.Quaternion.newM (this.matrixRotate);
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("defaultOrientationQuaternion", q);
org.jmol.util.Logger.info ("defaultOrientationMatrix = " + this.matrixRotate);
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomCoordXYZ", 
function (atom, x, y, z) {
atom.set (x, y, z);
this.setAtomCoord (atom);
}, "org.jmol.adapter.smarter.Atom,~N,~N,~N");
Clazz.defineMethod (c$, "setAtomCoord", 
function (atom) {
if (this.fileScaling != null) {
atom.x = atom.x * this.fileScaling.x + this.fileOffset.x;
atom.y = atom.y * this.fileScaling.y + this.fileOffset.y;
atom.z = atom.z * this.fileScaling.z + this.fileOffset.z;
}if (this.doConvertToFractional && !this.fileCoordinatesAreFractional && this.symmetry != null) {
if (!this.symmetry.haveUnitCell ()) this.symmetry.setUnitCell (this.notionalUnitCell);
this.symmetry.toFractional (atom, false);
this.iHaveFractionalCoordinates = true;
}this.doCheckUnitCell = true;
}, "org.jmol.adapter.smarter.Atom");
Clazz.defineMethod (c$, "addSites", 
function (htSites) {
this.atomSetCollection.setAtomSetAuxiliaryInfo ("pdbSites", htSites);
var sites = "";
for (var entry, $entry = htSites.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var name = entry.getKey ();
var htSite = entry.getValue ();
var ch;
for (var i = name.length; --i >= 0; ) if (!Character.isLetterOrDigit (ch = name.charAt (i)) && ch != '\'') name = name.substring (0, i) + "_" + name.substring (i + 1);

var groups = htSite.get ("groups");
if (groups.length == 0) continue;
this.addSiteScript ("@site_" + name + " " + groups);
this.addSiteScript ("site_" + name + " = \"" + groups + "\".split(\",\")");
sites += (sites === "" ? "" : ",") + "site_" + name;
}
this.addSiteScript ("site_list = \"" + sites + "\".split(\",\")");
}, "java.util.Map");
Clazz.defineMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
if (this.iHaveUnitCell && this.doCheckUnitCell) {
this.atomSetCollection.setCoordinatesAreFractional (this.iHaveFractionalCoordinates);
this.atomSetCollection.setNotionalUnitCell (this.notionalUnitCell, this.matUnitCellOrientation, this.unitCellOffset);
this.atomSetCollection.setAtomSetSpaceGroupName (this.spaceGroup);
this.atomSetCollection.setSymmetryRange (this.symmetryRange);
if (this.doConvertToFractional || this.fileCoordinatesAreFractional) {
this.atomSetCollection.setLatticeCells (this.latticeCells, this.applySymmetryToBonds, this.doPackUnitCell, this.doCentroidUnitCell, this.centroidPacked, this.strSupercell, this.ptSupercell);
if (this.ignoreFileSpaceGroupName || !this.iHaveSymmetryOperators) {
if (!this.merging || this.symmetry == null) this.getSymmetry ();
if (this.symmetry.createSpaceGroup (this.desiredSpaceGroupIndex, (this.spaceGroup.indexOf ("!") >= 0 ? "P1" : this.spaceGroup), this.notionalUnitCell)) {
this.atomSetCollection.setAtomSetSpaceGroupName (this.symmetry.getSpaceGroupName ());
this.atomSetCollection.applySymmetryUsing (this.symmetry);
}} else {
this.atomSetCollection.applySymmetry ();
}}if (this.iHaveFractionalCoordinates && this.merging && this.symmetry != null) {
this.atomSetCollection.toCartesian (this.symmetry);
this.atomSetCollection.setCoordinatesAreFractional (false);
this.addVibrations = false;
}}if (this.isTrajectory) this.atomSetCollection.setTrajectory ();
this.initializeSymmetry ();
});
Clazz.defineMethod (c$, "setMOData", 
function (moData) {
this.atomSetCollection.setAtomSetAuxiliaryInfo ("moData", moData);
if (moData == null) return;
var orbitals = moData.get ("mos");
if (orbitals != null) org.jmol.util.Logger.info (orbitals.size () + " molecular orbitals read in model " + this.atomSetCollection.getAtomSetCount ());
}, "java.util.Map");
c$.getElementSymbol = Clazz.defineMethod (c$, "getElementSymbol", 
function (elementNumber) {
return org.jmol.api.JmolAdapter.getElementSymbol (elementNumber);
}, "~N");
Clazz.defineMethod (c$, "fillDataBlockFixed", 
function (data, col0, colWidth, minLineLen) {
if (colWidth == 0) {
this.fillDataBlock (data, minLineLen);
return;
}var nLines = data.length;
for (var i = 0; i < nLines; i++) {
this.discardLinesUntilNonBlank ();
var nFields = Clazz.doubleToInt ((this.line.length - col0 + 1) / colWidth);
data[i] =  new Array (nFields);
for (var j = 0, start = col0; j < nFields; j++, start += colWidth) data[i][j] = this.line.substring (start, Math.min (this.line.length, start + colWidth));

}
}, "~A,~N,~N,~N");
Clazz.defineMethod (c$, "fillDataBlock", 
function (data, minLineLen) {
var nLines = data.length;
for (var i = 0; i < nLines; i++) {
data[i] = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.discardLinesUntilNonBlank ());
if (data[i].length < minLineLen) --i;
}
}, "~A,~N");
Clazz.defineMethod (c$, "fillFloatArray", 
function (s, width, data) {
var tokens =  new Array (0);
var pt = 0;
for (var i = 0; i < data.length; i++) {
while (tokens != null && pt >= tokens.length) {
if (s == null) s = this.readLine ();
if (width == 0) {
tokens = org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (s);
} else {
tokens =  new Array (Clazz.doubleToInt (s.length / width));
for (var j = 0; j < tokens.length; j++) tokens[j] = s.substring (j * width, (j + 1) * width);

}s = null;
pt = 0;
}
if (tokens == null) break;
data[i] = this.parseFloatStr (tokens[pt++]);
}
return data;
}, "~S,~N,~A");
Clazz.defineMethod (c$, "fillFrequencyData", 
function (iAtom0, atomCount, modelAtomCount, ignore, isWide, col0, colWidth, atomIndexes, minLineLen) {
var withSymmetry = (modelAtomCount != atomCount);
if (atomIndexes != null) atomCount = atomIndexes.length;
var nLines = (isWide ? atomCount : atomCount * 3);
var nFreq = ignore.length;
var data =  new Array (nLines);
this.fillDataBlockFixed (data, col0, colWidth, minLineLen);
for (var i = 0, atomPt = 0; i < nLines; i++, atomPt++) {
var values = data[i];
var valuesY = (isWide ? null : data[++i]);
var valuesZ = (isWide ? null : data[++i]);
var dataPt = values.length - (isWide ? nFreq * 3 : nFreq) - 1;
for (var j = 0, jj = 0; jj < nFreq; jj++) {
++dataPt;
var x = values[dataPt];
if (x.charAt (0) == ')') x = x.substring (1);
var vx = this.parseFloatStr (x);
var vy = this.parseFloatStr (isWide ? values[++dataPt] : valuesY[dataPt]);
var vz = this.parseFloatStr (isWide ? values[++dataPt] : valuesZ[dataPt]);
if (ignore[jj]) continue;
var iAtom = (atomIndexes == null ? atomPt : atomIndexes[atomPt]);
if (iAtom < 0) continue;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug ("atom " + iAtom + " vib" + j + ": " + vx + " " + vy + " " + vz);
this.atomSetCollection.addVibrationVectorWithSymmetry (iAtom0 + modelAtomCount * j++ + iAtom, vx, vy, vz, withSymmetry);
}
}
}, "~N,~N,~N,~A,~B,~N,~N,~A,~N");
Clazz.defineMethod (c$, "readLines", 
function (nLines) {
for (var i = nLines; --i >= 0; ) this.readLine ();

return this.line;
}, "~N");
Clazz.defineMethod (c$, "discardLinesUntilStartsWith", 
function (startsWith) {
while (this.readLine () != null && !this.line.startsWith (startsWith)) {
}
return this.line;
}, "~S");
Clazz.defineMethod (c$, "discardLinesUntilContains", 
function (containsMatch) {
while (this.readLine () != null && this.line.indexOf (containsMatch) < 0) {
}
return this.line;
}, "~S");
Clazz.defineMethod (c$, "discardLinesUntilContains2", 
function (s1, s2) {
while (this.readLine () != null && this.line.indexOf (s1) < 0 && this.line.indexOf (s2) < 0) {
}
return this.line;
}, "~S,~S");
Clazz.defineMethod (c$, "discardLinesUntilBlank", 
function () {
while (this.readLine () != null && this.line.trim ().length != 0) {
}
});
Clazz.defineMethod (c$, "discardLinesUntilNonBlank", 
function () {
while (this.readLine () != null && this.line.trim ().length == 0) {
}
return this.line;
});
Clazz.defineMethod (c$, "checkLineForScript", 
function (line) {
this.line = line;
this.checkCurrentLineForScript ();
}, "~S");
Clazz.defineMethod (c$, "checkCurrentLineForScript", 
function () {
if (this.line.indexOf ("Jmol") >= 0) {
if (this.line.indexOf ("Jmol PDB-encoded data") >= 0) {
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("jmolData", this.line);
if (!this.line.endsWith ("#noautobond")) this.line += "#noautobond";
}if (this.line.indexOf ("Jmol data min") >= 0) {
org.jmol.util.Logger.info (this.line);
var data =  Clazz.newFloatArray (15, 0);
this.parseStringInfestedFloatArray (this.line.substring (10).$replace ('=', ' ').$replace ('{', ' ').$replace ('}', ' '), data);
var minXYZ = org.jmol.util.Point3f.new3 (data[0], data[1], data[2]);
var maxXYZ = org.jmol.util.Point3f.new3 (data[3], data[4], data[5]);
this.fileScaling = org.jmol.util.Point3f.new3 (data[6], data[7], data[8]);
this.fileOffset = org.jmol.util.Point3f.new3 (data[9], data[10], data[11]);
var plotScale = org.jmol.util.Point3f.new3 (data[12], data[13], data[14]);
if (plotScale.x <= 0) plotScale.x = 100;
if (plotScale.y <= 0) plotScale.y = 100;
if (plotScale.z <= 0) plotScale.z = 100;
if (this.fileScaling.y == 0) this.fileScaling.y = 1;
if (this.fileScaling.z == 0) this.fileScaling.z = 1;
this.setFractionalCoordinates (true);
this.latticeCells =  Clazz.newIntArray (3, 0);
this.atomSetCollection.setLatticeCells (this.latticeCells, true, false, false, false, null, null);
this.setUnitCell (plotScale.x * 2 / (maxXYZ.x - minXYZ.x), plotScale.y * 2 / (maxXYZ.y - minXYZ.y), plotScale.z * 2 / (maxXYZ.z == minXYZ.z ? 1 : maxXYZ.z - minXYZ.z), 90, 90, 90);
this.unitCellOffset = org.jmol.util.Point3f.newP (plotScale);
this.unitCellOffset.scale (-1);
this.symmetry.toFractional (this.unitCellOffset, false);
this.unitCellOffset.scaleAdd2 (-1.0, minXYZ, this.unitCellOffset);
this.symmetry.setOffsetPt (this.unitCellOffset);
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("jmolDataScaling", [minXYZ, maxXYZ, plotScale]);
}}if (this.line.endsWith ("#noautobond")) {
this.line = this.line.substring (0, this.line.lastIndexOf ('#')).trim ();
this.atomSetCollection.setNoAutoBond ();
}var pt = this.line.indexOf ("jmolscript:");
if (pt >= 0) {
var script = this.line.substring (pt + 11, this.line.length);
if (script.indexOf ("#") >= 0) {
script = script.substring (0, script.indexOf ("#"));
}this.addJmolScript (script);
this.line = this.line.substring (0, pt).trim ();
}});
Clazz.defineMethod (c$, "addJmolScript", 
function (script) {
org.jmol.util.Logger.info ("#jmolScript: " + script);
if (this.previousScript == null) this.previousScript = "";
 else if (!this.previousScript.endsWith (";")) this.previousScript += ";";
this.previousScript += script;
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("jmolscript", this.previousScript);
}, "~S");
Clazz.defineMethod (c$, "addSiteScript", 
function (script) {
if (this.siteScript == null) this.siteScript = "";
 else if (!this.siteScript.endsWith (";")) this.siteScript += ";";
this.siteScript += script;
this.atomSetCollection.setAtomSetCollectionAuxiliaryInfo ("sitescript", this.siteScript);
}, "~S");
Clazz.defineMethod (c$, "readLine", 
function () {
this.prevline = this.line;
this.line = this.reader.readLine ();
if (this.os != null && this.line != null) {
var b = this.line.getBytes ();
this.os.write (b, 0, b.length);
{
this.os.writeByteAsInt(0x0A);
}}this.ptLine++;
if (org.jmol.util.Logger.debugging) org.jmol.util.Logger.debug (this.line);
return this.line;
});
c$.getStrings = Clazz.defineMethod (c$, "getStrings", 
function (sinfo, nFields, width) {
var fields =  new Array (nFields);
for (var i = 0, pt = 0; i < nFields; i++, pt += width) fields[i] = sinfo.substring (pt, pt + width);

return fields;
}, "~S,~N,~N");
Clazz.defineMethod (c$, "getTokens", 
function () {
return org.jmol.util.Parser.getTokens (this.line);
});
Clazz.defineMethod (c$, "parseStringInfestedFloatArray", 
function (s, data) {
org.jmol.util.Parser.parseStringInfestedFloatArray (s, null, data);
}, "~S,~A");
c$.getTokensFloat = Clazz.defineMethod (c$, "getTokensFloat", 
function (s, f, n) {
if (f == null) f =  Clazz.newFloatArray (n, 0);
org.jmol.util.Parser.parseFloatArrayDataN (org.jmol.adapter.smarter.AtomSetCollectionReader.getTokensStr (s), f, n);
return f;
}, "~S,~A,~N");
c$.getTokensStr = Clazz.defineMethod (c$, "getTokensStr", 
function (s) {
return org.jmol.util.Parser.getTokens (s);
}, "~S");
c$.getTokensAt = Clazz.defineMethod (c$, "getTokensAt", 
function (s, iStart) {
return org.jmol.util.Parser.getTokensAt (s, iStart);
}, "~S,~N");
Clazz.defineMethod (c$, "parseFloat", 
function () {
return org.jmol.util.Parser.parseFloatNext (this.line, this.next);
});
Clazz.defineMethod (c$, "parseFloatStr", 
function (s) {
this.next[0] = 0;
return org.jmol.util.Parser.parseFloatNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseFloatRange", 
function (s, iStart, iEnd) {
this.next[0] = iStart;
return org.jmol.util.Parser.parseFloatRange (s, iEnd, this.next);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "parseInt", 
function () {
return org.jmol.util.Parser.parseIntNext (this.line, this.next);
});
Clazz.defineMethod (c$, "parseIntStr", 
function (s) {
this.next[0] = 0;
return org.jmol.util.Parser.parseIntNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseIntAt", 
function (s, iStart) {
this.next[0] = iStart;
return org.jmol.util.Parser.parseIntNext (s, this.next);
}, "~S,~N");
Clazz.defineMethod (c$, "parseIntRange", 
function (s, iStart, iEnd) {
this.next[0] = iStart;
return org.jmol.util.Parser.parseIntRange (s, iEnd, this.next);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "parseToken", 
function () {
return org.jmol.util.Parser.parseTokenNext (this.line, this.next);
});
Clazz.defineMethod (c$, "parseTokenStr", 
function (s) {
this.next[0] = 0;
return org.jmol.util.Parser.parseTokenNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseTokenNext", 
function (s) {
return org.jmol.util.Parser.parseTokenNext (s, this.next);
}, "~S");
Clazz.defineMethod (c$, "parseTokenRange", 
function (s, iStart, iEnd) {
this.next[0] = iStart;
return org.jmol.util.Parser.parseTokenRange (s, iEnd, this.next);
}, "~S,~N,~N");
c$.parseTrimmedAt = Clazz.defineMethod (c$, "parseTrimmedAt", 
function (s, iStart) {
return org.jmol.util.Parser.parseTrimmedAt (s, iStart);
}, "~S,~N");
c$.parseTrimmedRange = Clazz.defineMethod (c$, "parseTrimmedRange", 
function (s, iStart, iEnd) {
return org.jmol.util.Parser.parseTrimmedRange (s, iStart, iEnd);
}, "~S,~N,~N");
c$.getFortranFormatLengths = Clazz.defineMethod (c$, "getFortranFormatLengths", 
function (s) {
var vdata =  new java.util.ArrayList ();
var n = 0;
var c = 0;
var factor = 1;
var inN = false;
var inCount = true;
s += ",";
for (var i = 0; i < s.length; i++) {
var ch = s.charAt (i);
switch (ch) {
case '.':
inN = false;
continue;
case ',':
for (var j = 0; j < c; j++) vdata.add (Integer.$valueOf (n * factor));

inN = false;
inCount = true;
c = 0;
continue;
case 'X':
n = c;
c = 1;
factor = -1;
continue;
}
var isDigit = Character.isDigit (ch);
if (isDigit) {
if (inN) n = n * 10 + ch.charCodeAt (0) - 48;
 else if (inCount) c = c * 10 + ch.charCodeAt (0) - 48;
} else if (Character.isLetter (ch)) {
n = 0;
inN = true;
inCount = false;
factor = 1;
} else {
inN = false;
}}
return vdata;
}, "~S");
Clazz.defineMethod (c$, "read3Vectors", 
function (isBohr) {
var vectors =  new Array (3);
var f =  Clazz.newFloatArray (3, 0);
for (var i = 0; i < 3; i++) {
if (i > 0 || Float.isNaN (this.parseFloatStr (this.line))) {
this.readLine ();
if (i == 0 && this.line != null) {
i = -1;
continue;
}}this.fillFloatArray (this.line, 0, f);
vectors[i] =  new org.jmol.util.Vector3f ();
vectors[i].setA (f);
if (isBohr) vectors[i].scale (0.5291772);
}
return vectors;
}, "~B");
Clazz.defineMethod (c$, "setElementAndIsotope", 
function (atom, str) {
var isotope = this.parseIntStr (str);
if (isotope == -2147483648) {
atom.elementSymbol = str;
} else {
str = str.substring (("" + isotope).length);
atom.elementNumber = (str.length == 0 ? isotope : ((isotope << 7) + org.jmol.api.JmolAdapter.getElementNumber (str)));
}}, "org.jmol.adapter.smarter.Atom,~S");
Clazz.defineStatics (c$,
"ANGSTROMS_PER_BOHR", 0.5291772);
});
