Clazz.declarePackage ("org.jmol.symmetry");
Clazz.load (null, "org.jmol.symmetry.SymmetryInfo", ["org.jmol.util.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.coordinatesAreFractional = false;
this.isMultiCell = false;
this.spaceGroup = null;
this.symmetryOperations = null;
this.symmetryInfoString = null;
this.cellRange = null;
this.periodicOriginXyz = null;
Clazz.instantialize (this, arguments);
}, org.jmol.symmetry, "SymmetryInfo");
Clazz.defineMethod (c$, "isPeriodic", 
function () {
return this.periodicOriginXyz != null;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setSymmetryInfo", 
function (info) {
this.cellRange = info.get ("unitCellRange");
this.periodicOriginXyz = info.get ("periodicOriginXyz");
this.spaceGroup = info.get ("spaceGroup");
if (this.spaceGroup == null || this.spaceGroup === "") this.spaceGroup = "spacegroup unspecified";
var symmetryCount = info.containsKey ("symmetryCount") ? (info.get ("symmetryCount")).intValue () : 0;
this.symmetryOperations = info.get ("symmetryOperations");
this.symmetryInfoString = "Spacegroup: " + this.spaceGroup;
if (this.symmetryOperations == null) {
this.symmetryInfoString += "\nNumber of symmetry operations: ?\nSymmetry Operations: unspecified\n";
} else {
this.symmetryInfoString += "\nNumber of symmetry operations: " + (symmetryCount == 0 ? 1 : symmetryCount) + "\nSymmetry Operations:";
for (var i = 0; i < symmetryCount; i++) this.symmetryInfoString += "\n" + this.symmetryOperations[i];

}this.symmetryInfoString += "\n";
var notionalUnitcell = info.get ("notionalUnitcell");
if (!org.jmol.util.SimpleUnitCell.isValid (notionalUnitcell)) return null;
this.coordinatesAreFractional = info.containsKey ("coordinatesAreFractional") ? (info.get ("coordinatesAreFractional")).booleanValue () : false;
this.isMultiCell = (this.coordinatesAreFractional && this.symmetryOperations != null);
return notionalUnitcell;
}, "java.util.Map");
});
