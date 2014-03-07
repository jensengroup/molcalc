Clazz.declarePackage ("org.jmol.viewer.binding");
Clazz.load (["org.jmol.viewer.binding.Binding"], "org.jmol.viewer.binding.JmolBinding", null, function () {
c$ = Clazz.declareType (org.jmol.viewer.binding, "JmolBinding", org.jmol.viewer.binding.Binding);
Clazz.makeConstructor (c$, 
function () {
this.construct ("toggle");
this.setSelectBindings ();
});
Clazz.makeConstructor (c$, 
function (name) {
Clazz.superConstructor (this, org.jmol.viewer.binding.JmolBinding, [name]);
this.setGeneralBindings ();
this.setPickBindings ();
}, "~S");
Clazz.defineMethod (c$, "setSelectBindings", 
($fz = function () {
this.bind (528, 16);
this.bind (272, 21);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setGeneralBindings", 
function () {
this.bind (528, 0);
this.bind (282, 1);
this.bind (262, 1);
this.bind (529, 1);
this.bind (520, 1);
this.bind (272, 2);
this.bind (280, 3);
this.bind (261, 3);
this.bind (273, 4);
this.bind (264, 4);
this.bind (32, 5);
this.bind (272, 6);
this.bind (272, 7);
this.bind (274, 14);
this.bind (260, 14);
this.bind (272, 15);
this.bind (275, 11);
this.bind (531, 12);
this.bind (283, 13);
this.bind (272, 8);
this.bind (272, 10);
this.bind (273, 9);
this.bind (281, 22);
this.bind (273, 24);
this.bind (280, 25);
this.bind (273, 26);
this.bind (273, 30);
this.bind (280, 31);
this.bind (273, 32);
this.bind (529, 44);
this.bind (520, 44);
this.bind (528, 45);
});
Clazz.defineMethod (c$, "setPickBindings", 
function () {
this.bind (272, 27);
this.bind (272, 28);
this.bind (272, 29);
this.bind (272, 33);
this.bind (272, 34);
this.bind (272, 35);
this.bind (272, 36);
this.bind (528, 37);
this.bind (272, 38);
this.bind (275, 39);
this.bind (272, 40);
this.bind (272, 41);
this.bind (272, 42);
this.bind (272, 43);
});
});
