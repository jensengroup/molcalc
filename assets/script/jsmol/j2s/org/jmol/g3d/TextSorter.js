Clazz.declarePackage ("org.jmol.g3d");
c$ = Clazz.declareType (org.jmol.g3d, "TextSorter", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (a == null || b == null ? 0 : a.z > b.z ? -1 : a.z < b.z ? 1 : 0);
}, "org.jmol.g3d.TextString,org.jmol.g3d.TextString");
