Clazz.declarePackage ("J.viewer.binding");
Clazz.load (["J.viewer.binding.Binding"], "J.viewer.binding.JmolBinding", null, function () {
c$ = Clazz.declareType (J.viewer.binding, "JmolBinding", J.viewer.binding.Binding);
Clazz.makeConstructor (c$, 
function (name) {
Clazz.superConstructor (this, J.viewer.binding.JmolBinding, [name]);
this.setGeneralBindings ();
this.setSelectBindings ();
}, "~S");
$_M(c$, "setSelectBindings", 
function () {
this.bindAction (528, 30);
this.bindAction (272, 36);
});
$_M(c$, "setGeneralBindings", 
($fz = function () {
this.bindAction (528, 1);
this.bindAction (282, 45);
this.bindAction (262, 45);
this.bindAction (529, 45);
this.bindAction (520, 45);
this.bindAction (272, 25);
this.bindAction (280, 28);
this.bindAction (261, 28);
this.bindAction (273, 29);
this.bindAction (264, 29);
this.bindAction (32, 46);
this.bindAction (272, 40);
this.bindAction (272, 16);
this.bindAction (274, 23);
this.bindAction (260, 23);
this.bindAction (272, 2);
this.bindAction (275, 38);
this.bindAction (531, 6);
this.bindAction (283, 39);
this.bindAction (272, 44);
this.bindAction (272, 41);
this.bindAction (273, 42);
this.bindAction (281, 13);
this.bindAction (273, 14);
this.bindAction (280, 27);
this.bindAction (273, 26);
this.bindAction (273, 10);
this.bindAction (280, 9);
this.bindAction (273, 8);
this.bindAction (529, 24);
this.bindAction (520, 24);
this.bindAction (528, 43);
this.bindAction (272, 7);
this.bindAction (272, 11);
this.bindAction (272, 12);
this.bindAction (272, 17);
this.bindAction (272, 22);
this.bindAction (272, 19);
this.bindAction (272, 20);
this.bindAction (528, 37);
this.bindAction (272, 18);
this.bindAction (275, 21);
this.bindAction (272, 4);
this.bindAction (272, 5);
this.bindAction (272, 3);
this.bindAction (272, 0);
}, $fz.isPrivate = true, $fz));
});
