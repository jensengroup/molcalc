Clazz.declarePackage ("org.jmol.viewer.binding");
Clazz.load (["org.jmol.viewer.binding.JmolBinding"], "org.jmol.viewer.binding.RasmolBinding", null, function () {
c$ = Clazz.declareType (org.jmol.viewer.binding, "RasmolBinding", org.jmol.viewer.binding.JmolBinding);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.viewer.binding.RasmolBinding, ["selectOrToggle"]);
this.setSelectBindings ();
});
Clazz.defineMethod (c$, "setSelectBindings", 
($fz = function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.bind (272, 16);
this.bind (273, 18);
}, $fz.isPrivate = true, $fz));
});
