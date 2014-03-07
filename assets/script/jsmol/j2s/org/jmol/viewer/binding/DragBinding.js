Clazz.declarePackage ("org.jmol.viewer.binding");
Clazz.load (["org.jmol.viewer.binding.JmolBinding"], "org.jmol.viewer.binding.DragBinding", null, function () {
c$ = Clazz.declareType (org.jmol.viewer.binding, "DragBinding", org.jmol.viewer.binding.JmolBinding);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.viewer.binding.DragBinding, ["drag"]);
this.setSelectBindings ();
this.bind (1040, 23);
this.bind (272, 22);
this.bind (272, 33);
});
Clazz.defineMethod (c$, "setSelectBindings", 
($fz = function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.bind (272, 16);
this.bind (273, 18);
this.bind (280, 20);
this.bind (281, 19);
}, $fz.isPrivate = true, $fz));
});
