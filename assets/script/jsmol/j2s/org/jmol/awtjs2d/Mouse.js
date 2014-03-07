Clazz.declarePackage ("org.jmol.awtjs2d");
Clazz.load (["org.jmol.api.JmolMouseInterface", "$.Event"], "org.jmol.awtjs2d.Mouse", ["java.lang.Character", "org.jmol.util.Escape", "$.Logger", "$.Vector3f"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
this.actionManager = null;
this.keyBuffer = "";
this.isMouseDown = false;
this.xWhenPressed = 0;
this.yWhenPressed = 0;
this.modifiersWhenPressed10 = 0;
Clazz.instantialize (this, arguments);
}, org.jmol.awtjs2d, "Mouse", null, org.jmol.api.JmolMouseInterface);
Clazz.makeConstructor (c$, 
function (viewer, actionManager) {
this.viewer = viewer;
this.actionManager = actionManager;
}, "org.jmol.viewer.Viewer,org.jmol.viewer.ActionManager");
Clazz.overrideMethod (c$, "clear", 
function () {
});
Clazz.overrideMethod (c$, "dispose", 
function () {
this.actionManager.dispose ();
});
Clazz.overrideMethod (c$, "handleOldJvm10Event", 
function (id, x, y, modifiers, time) {
if (id != -1) modifiers = org.jmol.awtjs2d.Mouse.applyLeftMouse (modifiers);
switch (id) {
case -1:
this.mouseWheel (time, x, modifiers | 32);
break;
case 501:
this.xWhenPressed = x;
this.yWhenPressed = y;
this.modifiersWhenPressed10 = modifiers;
this.mousePressed (time, x, y, modifiers, false);
break;
case 506:
this.mouseDragged (time, x, y, modifiers);
break;
case 504:
this.mouseEntered (time, x, y);
break;
case 505:
this.mouseExited (time, x, y);
break;
case 503:
this.mouseMoved (time, x, y, modifiers);
break;
case 502:
this.mouseReleased (time, x, y, modifiers);
if (x == this.xWhenPressed && y == this.yWhenPressed && modifiers == this.modifiersWhenPressed10) {
this.mouseClicked (time, x, y, modifiers, 1);
}break;
default:
return false;
}
return true;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "processTwoPointGesture", 
function (touches) {
if (touches[0].length < 2) return;
var t1 = touches[0];
var t2 = touches[1];
var t10 = t1[0];
var t11 = t1[t2.length - 1];
var x10 = t10[0];
var x11 = t11[0];
var dx1 = x11 - x10;
var y10 = t10[1];
var y11 = t11[1];
var dy1 = y11 - y10;
var v1 = org.jmol.util.Vector3f.new3 (dx1, dy1, 0);
var d1 = v1.length ();
var t20 = t2[0];
var t21 = t2[t2.length - 1];
var x20 = t20[0];
var x21 = t21[0];
var dx2 = x21 - x20;
var y20 = t20[1];
var y21 = t21[1];
var dy2 = y21 - y20;
var v2 = org.jmol.util.Vector3f.new3 (dx2, dy2, 0);
var d2 = v2.length ();
if (d1 < 3 || d2 < 3) return;
v1.normalize ();
v2.normalize ();
var cos12 = (v1.dot (v2));
if (cos12 > 0.8) {
var deltaX = Clazz.floatToInt (x11 - t1[t1.length - 2][0]);
var deltaY = Clazz.floatToInt (y11 - t1[t1.length - 2][1]);
this.viewer.translateXYBy (deltaX, deltaY);
} else if (cos12 < -0.8) {
v1 = org.jmol.util.Vector3f.new3 (x20 - x10, y20 - y10, 0);
v2 = org.jmol.util.Vector3f.new3 (x21 - x11, y21 - y11, 0);
var dx = v2.length () - v1.length ();
this.mouseWheel (System.currentTimeMillis (), dx < 0 ? -1 : 1, 32);
}}, "~A");
Clazz.defineMethod (c$, "mouseClicked", 
function (e) {
this.mouseClicked (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.getClickCount ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseEntered", 
function (e) {
this.mouseEntered (e.getWhen (), e.getX (), e.getY ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseExited", 
function (e) {
this.mouseExited (e.getWhen (), e.getX (), e.getY ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mousePressed", 
function (e) {
this.mousePressed (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.isPopupTrigger ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseReleased", 
function (e) {
this.mouseReleased (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseDragged", 
function (e) {
var modifiers = e.getModifiers ();
if ((modifiers & 28) == 0) modifiers |= 16;
this.mouseDragged (e.getWhen (), e.getX (), e.getY (), modifiers);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseMoved", 
function (e) {
this.mouseMoved (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseWheelMoved", 
function (e) {
e.consume ();
this.mouseWheel (e.getWhen (), e.getWheelRotation (), e.getModifiers () | 32);
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "keyTyped", 
function (ke) {
ke.consume ();
if (!this.viewer.menuEnabled ()) return;
var ch = ke.getKeyChar ();
var modifiers = ke.getModifiers ();
if (org.jmol.util.Logger.debuggingHigh) org.jmol.util.Logger.debug ("MouseManager keyTyped: " + ch + " " + (0 + ch.charCodeAt (0)) + " " + modifiers);
if (modifiers != 0 && modifiers != 1) {
switch (ch) {
case String.fromCharCode (11):
case 'k':
var isON = !this.viewer.getBooleanProperty ("allowKeyStrokes");
switch (modifiers) {
case 2:
this.viewer.setBooleanProperty ("allowKeyStrokes", isON);
this.viewer.setBooleanProperty ("showKeyStrokes", true);
break;
case 10:
case 8:
this.viewer.setBooleanProperty ("allowKeyStrokes", isON);
this.viewer.setBooleanProperty ("showKeyStrokes", false);
break;
}
this.clearKeyBuffer ();
this.viewer.refresh (3, "showkey");
break;
case 22:
case 'v':
switch (modifiers) {
case 2:
break;
}
break;
case 26:
case 'z':
switch (modifiers) {
case 2:
this.viewer.undoMoveAction (4165, 1);
break;
case 3:
this.viewer.undoMoveAction (4139, 1);
break;
}
break;
case 25:
case 'y':
switch (modifiers) {
case 2:
this.viewer.undoMoveAction (4139, 1);
break;
}
break;
}
return;
}if (!this.viewer.getBooleanProperty ("allowKeyStrokes")) return;
this.addKeyBuffer (ke.getModifiers () == 1 ? Character.toUpperCase (ch) : ch);
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyPressed", 
function (ke) {
if (this.viewer.isApplet ()) ke.consume ();
this.actionManager.keyPressed (ke.getKeyCode (), ke.getModifiers ());
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyReleased", 
function (ke) {
ke.consume ();
this.actionManager.keyReleased (ke.getKeyCode ());
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "clearKeyBuffer", 
($fz = function () {
if (this.keyBuffer.length == 0) return;
this.keyBuffer = "";
if (this.viewer.getBooleanProperty ("showKeyStrokes")) this.viewer.evalStringQuiet ("!set echo _KEYSTROKES; set echo bottom left;echo \"\"");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "addKeyBuffer", 
($fz = function (ch) {
if (ch.charCodeAt (0) == 10) {
this.sendKeyBuffer ();
return;
}if (ch.charCodeAt (0) == 8) {
if (this.keyBuffer.length > 0) this.keyBuffer = this.keyBuffer.substring (0, this.keyBuffer.length - 1);
} else {
this.keyBuffer += ch;
}if (this.viewer.getBooleanProperty ("showKeyStrokes")) this.viewer.evalStringQuiet ("!set echo _KEYSTROKES; set echo bottom left;echo " + org.jmol.util.Escape.escapeStr ("\1" + this.keyBuffer));
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "sendKeyBuffer", 
($fz = function () {
var kb = this.keyBuffer;
if (this.viewer.getBooleanProperty ("showKeyStrokes")) this.viewer.evalStringQuiet ("!set echo _KEYSTROKES; set echo bottom left;echo " + org.jmol.util.Escape.escapeStr (this.keyBuffer));
this.clearKeyBuffer ();
this.viewer.script (kb);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "mouseEntered", 
($fz = function (time, x, y) {
this.actionManager.mouseEntered (time, x, y);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "mouseExited", 
($fz = function (time, x, y) {
this.actionManager.mouseExited (time, x, y);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "mouseClicked", 
($fz = function (time, x, y, modifiers, clickCount) {
this.clearKeyBuffer ();
this.actionManager.mouseAction (2, time, x, y, 1, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "mouseMoved", 
($fz = function (time, x, y, modifiers) {
this.clearKeyBuffer ();
if (this.isMouseDown) this.actionManager.mouseAction (1, time, x, y, 0, org.jmol.awtjs2d.Mouse.applyLeftMouse (modifiers));
 else this.actionManager.mouseAction (0, time, x, y, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.defineMethod (c$, "mouseWheel", 
($fz = function (time, rotation, modifiers) {
this.clearKeyBuffer ();
this.actionManager.mouseAction (3, time, 0, rotation, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "mousePressed", 
($fz = function (time, x, y, modifiers, isPopupTrigger) {
this.clearKeyBuffer ();
this.isMouseDown = true;
this.actionManager.mouseAction (4, time, x, y, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "mouseReleased", 
($fz = function (time, x, y, modifiers) {
this.isMouseDown = false;
this.actionManager.mouseAction (5, time, x, y, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.defineMethod (c$, "mouseDragged", 
($fz = function (time, x, y, modifiers) {
if ((modifiers & 20) == 20) modifiers = modifiers & -5 | 2;
this.actionManager.mouseAction (1, time, x, y, 0, modifiers);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
c$.applyLeftMouse = Clazz.defineMethod (c$, "applyLeftMouse", 
($fz = function (modifiers) {
return ((modifiers & 28) == 0) ? (modifiers | 16) : modifiers;
}, $fz.isPrivate = true, $fz), "~N");
});
