Clazz.declarePackage ("J.viewer.binding");
Clazz.load (["J.viewer.binding.JmolBinding"], "J.viewer.binding.PfaatBinding", null, function () {
c$ = Clazz.declareType (J.viewer.binding, "PfaatBinding", J.viewer.binding.JmolBinding);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.viewer.binding.PfaatBinding, ["extendedSelect"]);
});
Clazz.overrideMethod (c$, "setSelectBindings", 
function () {
this.bindAction (272, 30);
this.bindAction (272, 33);
this.bindAction (273, 35);
this.bindAction (281, 32);
this.bindAction (280, 34);
});
});
