Clazz.declarePackage ("J.viewer.binding");
Clazz.load (["J.viewer.binding.JmolBinding"], "J.viewer.binding.DragBinding", null, function () {
c$ = Clazz.declareType (J.viewer.binding, "DragBinding", J.viewer.binding.JmolBinding);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.viewer.binding.DragBinding, ["drag"]);
});
Clazz.overrideMethod (c$, "setSelectBindings", 
function () {
this.bindAction (272, 30);
this.bindAction (273, 35);
this.bindAction (280, 34);
this.bindAction (281, 32);
this.bindAction (1040, 31);
this.bindAction (272, 13);
this.bindAction (272, 17);
});
});
