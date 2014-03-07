Clazz.declarePackage ("org.jmol.constant");
Clazz.load (["java.lang.Enum"], "org.jmol.constant.EnumHBondType", null, function () {
c$ = Clazz.declareType (org.jmol.constant, "EnumHBondType", Enum);
c$.getType = Clazz.defineMethod (c$, "getType", 
function (atom) {
var group = atom.getGroup ();
var groupID = group.getGroupID ();
var considerHydrogens = !atom.isHetero ();
switch (atom.getElementNumber ()) {
default:
return org.jmol.constant.EnumHBondType.NOT;
case 1:
if (atom.getCovalentBondCount () == 0) return org.jmol.constant.EnumHBondType.DONOR;
var bonds = atom.getBonds ();
if (bonds == null) return org.jmol.constant.EnumHBondType.NOT;
switch (bonds[0].getOtherAtom (atom).getElementNumber ()) {
case 7:
case 8:
case 16:
return org.jmol.constant.EnumHBondType.DONOR;
}
return org.jmol.constant.EnumHBondType.NOT;
case 7:
if (atom === group.getNitrogenAtom ()) return org.jmol.constant.EnumHBondType.DONOR;
if (groupID == 9) return org.jmol.constant.EnumHBondType.UNKNOWN;
if (atom.getCovalentHydrogenCount () > 0) return org.jmol.constant.EnumHBondType.DONOR;
if (considerHydrogens) return org.jmol.constant.EnumHBondType.ACCEPTOR;
switch (groupID) {
case 2:
case 3:
case 12:
case 6:
case 19:
return org.jmol.constant.EnumHBondType.DONOR;
}
return org.jmol.constant.EnumHBondType.UNKNOWN;
case 8:
if (atom === group.getCarbonylOxygenAtom () || atom.getFormalCharge () == -1) return org.jmol.constant.EnumHBondType.ACCEPTOR;
if (atom.getCovalentBondCount () == 0 || atom.getCovalentHydrogenCount () > 0) return org.jmol.constant.EnumHBondType.UNKNOWN;
if (considerHydrogens) return org.jmol.constant.EnumHBondType.ACCEPTOR;
switch (groupID) {
case 4:
case 7:
return org.jmol.constant.EnumHBondType.ACCEPTOR;
}
return org.jmol.constant.EnumHBondType.UNKNOWN;
}
}, "org.jmol.modelset.Atom");
c$.isPossibleHBond = Clazz.defineMethod (c$, "isPossibleHBond", 
function (typeA, typeB) {
return (typeA === org.jmol.constant.EnumHBondType.NOT || typeB === org.jmol.constant.EnumHBondType.NOT ? false : typeA === org.jmol.constant.EnumHBondType.UNKNOWN || typeA !== typeB);
}, "org.jmol.constant.EnumHBondType,org.jmol.constant.EnumHBondType");
Clazz.defineEnumConstant (c$, "NOT", 0, []);
Clazz.defineEnumConstant (c$, "ACCEPTOR", 1, []);
Clazz.defineEnumConstant (c$, "DONOR", 2, []);
Clazz.defineEnumConstant (c$, "UNKNOWN", 3, []);
});
