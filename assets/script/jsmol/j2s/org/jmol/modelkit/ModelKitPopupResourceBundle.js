Clazz.declarePackage ("org.jmol.modelkit");
Clazz.load (["org.jmol.popup.PopupResource"], "org.jmol.modelkit.ModelKitPopupResourceBundle", ["org.jmol.i18n.GT"], function () {
c$ = Clazz.declareType (org.jmol.modelkit, "ModelKitPopupResourceBundle", org.jmol.popup.PopupResource);
Clazz.overrideMethod (c$, "getMenuName", 
function () {
return "modelkitMenu";
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.modelkit.ModelKitPopupResourceBundle, [null, null]);
});
Clazz.overrideMethod (c$, "buildStructure", 
function (menuStructure) {
this.addItems (org.jmol.modelkit.ModelKitPopupResourceBundle.menuContents);
this.addItems (org.jmol.modelkit.ModelKitPopupResourceBundle.structureContents);
this.setStructure (menuStructure);
}, "~S");
Clazz.overrideMethod (c$, "getWordContents", 
function () {
var wasTranslating = org.jmol.i18n.GT.getDoTranslate ();
org.jmol.i18n.GT.setDoTranslate (true);
var words = ["atomMenu", "<atoms.png>", "moreAtomMenu", "<dotdotdot.png>", "bondMenu", "<bonds.png>", "optionsMenu", "<dotdotdot.png>", "new", org.jmol.i18n.GT._ ("new"), "undo", org.jmol.i18n.GT._ ("undo (CTRL-Z)"), "redo", org.jmol.i18n.GT._ ("redo (CTRL-Y)"), "center", org.jmol.i18n.GT._ ("center"), "addh", org.jmol.i18n.GT._ ("add hydrogens"), "minimize", org.jmol.i18n.GT._ ("minimize"), "hmin", org.jmol.i18n.GT._ ("fix hydrogens and minimize"), "clearQ", org.jmol.i18n.GT._ ("clear"), "SIGNEDsaveFile", org.jmol.i18n.GT._ ("save file"), "SIGNEDsaveState", org.jmol.i18n.GT._ ("save state"), "invertStereoP!CB", org.jmol.i18n.GT._ ("invert ring stereochemistry"), "assignAtom_XP!CB", org.jmol.i18n.GT._ ("delete atom"), "assignAtom_XxP!CB", org.jmol.i18n.GT._ ("drag to bond"), "dragAtomP!CB", org.jmol.i18n.GT._ ("drag atom"), "dragMinimizeP!CB", org.jmol.i18n.GT._ ("drag atom (and minimize)"), "dragMoleculeP!CB", org.jmol.i18n.GT._ ("drag molecule (SHIFT to rotate)"), "dragMinimizeMoleculeP!CB", org.jmol.i18n.GT._ ("drag and minimize molecule (docking)"), "assignAtom_CP!CB", "C", "assignAtom_HP!CB", "H", "assignAtom_NP!CB", "N", "assignAtom_OP!CB", "O", "assignAtom_FP!CB", "F", "assignAtom_ClP!CB", "Cl", "assignAtom_BrP!CB", "Br", "_??P!CB", "??", "assignAtom_PlP!CB", org.jmol.i18n.GT._ ("increase charge"), "assignAtom_MiP!CB", org.jmol.i18n.GT._ ("decrease charge"), "assignBond_0P!CB", org.jmol.i18n.GT._ ("delete bond"), "assignBond_1P!CB", org.jmol.i18n.GT._ ("single"), "assignBond_2P!CB", org.jmol.i18n.GT._ ("double"), "assignBond_3P!CB", org.jmol.i18n.GT._ ("triple"), "assignBond_pP!CB", org.jmol.i18n.GT._ ("increase order"), "assignBond_mP!CB", org.jmol.i18n.GT._ ("decrease order"), "rotateBondP!CB", org.jmol.i18n.GT._ ("rotate bond (SHIFT-DRAG)"), "exit", org.jmol.i18n.GT._ ("exit modelkit mode")];
org.jmol.i18n.GT.setDoTranslate (wasTranslating);
return words;
});
Clazz.defineStatics (c$,
"MENU_NAME", "modelkitMenu");
c$.menuContents = c$.prototype.menuContents = [["modelkitMenu", "atomMenu bondMenu optionsMenu"], ["optionsMenu", "new center addh minimize hmin  - undo redo - SIGNEDsaveFile SIGNEDsaveState exit"], ["atomMenu", "assignAtom_XP!CB assignAtom_XxP!CB dragAtomP!CB dragMinimizeP!CB dragMoleculeP!CB dragMinimizeMoleculeP!CB invertStereoP!CB - assignAtom_CP!CB assignAtom_HP!CB assignAtom_NP!CB assignAtom_OP!CB assignAtom_FP!CB assignAtom_ClP!CB assignAtom_BrP!CB _??P!CB _??P!CB _??P!CB moreAtomMenu - assignAtom_PlP!CB assignAtom_MiP!CB"], ["moreAtomMenu", "clearQ - _??P!CB _??P!CB _??P!CB _??P!CB _??P!CB _??P!CB "], ["bondMenu", "assignBond_0P!CB assignBond_1P!CB assignBond_2P!CB assignBond_3P!CB - assignBond_pP!CB assignBond_mP!CB - rotateBondP!CB"]];
Clazz.defineStatics (c$,
"structureContents", [["new", "zap"], ["center", "zoomto 0 {visible} 0/1.5"], ["addh", "calculate hydrogens {model=_lastframe}"], ["minimize", "minimize"], ["hmin", "delete hydrogens and model=_lastframe; minimize addhydrogens"], ["SIGNEDsaveFile", "select visible;write COORD '?jmol.mol'"], ["SIGNEDsaveState", "write '?jmol.jpg'"], ["clearQ", "clearQ"], ["undo", "!UNDO"], ["redo", "!REDO"], ["exit", "set modelkitMode false"]]);
});
