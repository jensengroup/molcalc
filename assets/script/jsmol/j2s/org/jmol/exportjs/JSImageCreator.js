Clazz.declarePackage ("org.jmol.exportjs");
Clazz.load (["org.jmol.export.image.GenericImageCreator"], "org.jmol.exportjs.JSImageCreator", null, function () {
c$ = Clazz.declareType (org.jmol.exportjs, "JSImageCreator", org.jmol["export"].image.GenericImageCreator);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.exportjs.JSImageCreator, []);
});
});
