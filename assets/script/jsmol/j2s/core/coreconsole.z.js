// coreconsole.z.js
// BH 1/5/2013 12:45:19 PM

Jmol.Console = {
	buttons:{},
	buttonWidth:100,
	click:function(id) {
		Jmol.Console.buttons[id].console.appletConsole.doAction(Jmol.Console.buttons[id]);
	}	
}

Jmol.Console.JSConsole = function(appletConsole) {
	this.applet = appletConsole.viewer.applet;
	var id = this.id = this.applet._id+"_console";
	var console = this;
	Jmol.Console.buttons[console.id] = console;
	console.appletConsole = appletConsole;
	console.input = appletConsole.input = new Jmol.Console.Input(console);
	console.output = appletConsole.output = new Jmol.Console.Output(console);

	// set up this.appletConsole.input, this.appletconsole.output
	// set up buttons, which are already made by this time: 	
  
  // I would prefer NOT to use jQueryUI for this - just simple buttons with simple actions

	// create and insert HTML code here

	var s = '<div id="$ID" class="jmolConsole" style="display:block;background-color:yellow;width:600px;height:330px;position:absolute"><div id=$ID_title></id><div id=$ID_label1></div><div id=$ID_outputdiv></div><div id=$ID_inputdiv></div><div id=$ID_buttondiv></div></div>'

	var setBtn = function(console, btn) {
		btn.console = console;
		btn.id = id + "_" + btn.label.replace(/\s/g,"_");
		Jmol.Console.buttons[btn.id] = btn;
		return btn.html();
	}
	s = s.replace(/\$ID/g,id)
	$("body").after(s);
	
	console.setContainer($('#' + id));
	console.setPosition();
	console.dragBind(true);
	s = "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:Jmol.Console.buttons['"+id+"'].setVisible(false)\">close</a>";
	$("#" + id + "_label1").html(s);
	$("#" + id + "_inputdiv").html('<textarea id="' + id + '_input" style="width:590px;height:100px"></textarea>');
	$("#" + id + "_outputdiv").html('<textarea id="' + id + '_output" style="width:590px;height:200px"></textarea>');
	
	s = setBtn(console, appletConsole.runButton)
		+ setBtn(console, appletConsole.loadButton)
		+ setBtn(console, appletConsole.clearInButton)
		+ setBtn(console, appletConsole.clearOutButton)
		+ setBtn(console, appletConsole.historyButton)
		+ setBtn(console, appletConsole.stateButton);
	$("#" + id + "_buttondiv").html(s);
	$("#" + id + "_input").bind("keypress", function(event) { console.input.keyPressed(event) });
	$("#" + id + "_input").bind("keyup", function(event) { console.input.keyReleased(event) });
	$("#" + id + "_input").bind("mousedown touchstart", function(event) { console.ignoreMouse=true });
	$("#" + id + "_output").bind("mousedown touchstart", function(event) { console.ignoreMouse=true });

	console.setButton = function(text) {
		return new Jmol.Console.Button(this, text);
	}  

	console.setVisible = function(b) {	
		if (b)
			this.container.show();
		else
			this.container.hide();
		this.dragBind(b);
	}
	
	console.setTitle = function(title) {
		$("#" + this.id + "_title").html() = title;
	}
}

Jmol._setDraggable(Jmol.Console.JSConsole);

Jmol.Console.Input = function(console) {

	this.console = console;
	
	// something like this....

	this.getText = function() {
		return $("#" + this.console.id + "_input").val();
	}

	this.setText = function(text) {
		if (text == null)
			text = "";
		$("#" + this.console.id + "_input").val(text);
	}

	this.keyPressed = function(ev) {
		var kcode = ev.which;
		var isCtrl = ev.ctrlKey;
		var mode = this.console.appletConsole.processKey(kcode, 401/*java.awt.event.KeyEvent.KEY_PRESSED*/, isCtrl);
		if ((mode & 1) == 1)
			ev.preventDefault();
		if ((mode & 2) == 2) {
			//TODO: handling CTRL-ENTER
		}
	}

	this.keyReleased = function(ev) {
		var kcode = ev.which;
		var isCtrl = ev.ctrlKey;
		var mode = this.console.appletConsole.processKey(kcode, 402/*java.awt.event.KeyEvent.KEY_RELEASED*/, isCtrl);
		if ((mode & 1) == 1)
			ev.preventDefault();
		if ((mode & 2) == 2) {
			//TODO: handling CTRL-ENTER
		}
	}

  this.getCaretPosition = function() {
    var el = $(this).get(0);
    if('selectionStart' in el)
      return el.selectionStart;
		if(!('selection' in document))
			return 0;
    el.focus();
    var sel = document.selection.createRange();
    var len = document.selection.createRange().text.length;
    sel.moveStart('character', -el.value.length);
    return sel.text.length - len;
	}

}

Jmol.Console.Output = function(console) {
	this.console = console;
		
	this.getText = function() {
		return $("#" + this.console.id + "_output").val();
	}

	this.setText = function(text) {
		if (text == null)
			text = "";
		$("#" + this.console.id + "_output").val(text);
	}
	
  this.append = function(message, att) {
		this.setText(this.getText() + message); 		 
  }
}

Jmol.Console.Button = function(text) {
	this.label = text;
}

Jmol.Console.Button.prototype.addConsoleListener = function(appletConsole) {
	this.appletConsole = appletConsole;
	Jmol.Console.buttons[this.id] = this;
}
  
Jmol.Console.Button.prototype.html = function() {
	var s = '<input type="button" id="' + this.id + '" style="width:' + Jmol.Console.buttonWidth + 'px" value="' + this.label + '" onClick="Jmol.Console.click(\'' + this.id + '\')"/>'
	return s;
}

// 
//// org\jmol\api\JmolAppConsoleInterface.js 
// 
Clazz.declarePackage ("org.jmol.api");
Clazz.declareInterface (org.jmol.api, "JmolAppConsoleInterface");
// 
//// org\jmol\console\GenericTextArea.js 
// 
Clazz.declarePackage ("org.jmol.console");
Clazz.declareInterface (org.jmol.console, "GenericTextArea");
// 
//// org\jmol\console\GenericConsole.js 
// 
Clazz.declarePackage ("org.jmol.console");
Clazz.load (["org.jmol.api.JmolAppConsoleInterface", "$.JmolCallbackListener", "java.util.Hashtable"], "org.jmol.console.GenericConsole", ["java.lang.Boolean", "org.jmol.api.JmolViewer", "org.jmol.constant.EnumCallback", "org.jmol.i18n.GT", "org.jmol.script.ScriptCompiler", "$.Token", "org.jmol.util.TextFormat"], function () {
c$ = Clazz.decorateAsClass (function () {
this.input = null;
this.output = null;
this.viewer = null;
this.labels = null;
this.menuMap = null;
this.editButton = null;
this.runButton = null;
this.historyButton = null;
this.stateButton = null;
this.clearOutButton = null;
this.clearInButton = null;
this.loadButton = null;
this.defaultMessage = null;
this.label1 = null;
this.nTab = 0;
this.incompleteCmd = null;
Clazz.instantialize (this, arguments);
}, org.jmol.console, "GenericConsole", null, [org.jmol.api.JmolAppConsoleInterface, org.jmol.api.JmolCallbackListener]);
Clazz.prepareFields (c$, function () {
this.menuMap =  new java.util.Hashtable ();
});
Clazz.defineMethod (c$, "addButton", 
function (b, label) {
b.addConsoleListener (this);
this.menuMap.put (label, b);
return b;
}, "org.jmol.api.JmolAbstractButton,~S");
Clazz.defineMethod (c$, "getLabel1", 
function () {
return null;
});
Clazz.defineMethod (c$, "setupLabels", 
function () {
this.labels.put ("help", org.jmol.i18n.GT._ ("&Help"));
this.labels.put ("search", org.jmol.i18n.GT._ ("&Search..."));
this.labels.put ("commands", org.jmol.i18n.GT._ ("&Commands"));
this.labels.put ("functions", org.jmol.i18n.GT._ ("Math &Functions"));
this.labels.put ("parameters", org.jmol.i18n.GT._ ("Set &Parameters"));
this.labels.put ("more", org.jmol.i18n.GT._ ("&More"));
this.labels.put ("Editor", org.jmol.i18n.GT._ ("Editor"));
this.labels.put ("State", org.jmol.i18n.GT._ ("State"));
this.labels.put ("Run", org.jmol.i18n.GT._ ("Run"));
this.labels.put ("Clear Output", org.jmol.i18n.GT._ ("Clear Output"));
this.labels.put ("Clear Input", org.jmol.i18n.GT._ ("Clear Input"));
this.labels.put ("History", org.jmol.i18n.GT._ ("History"));
this.labels.put ("Load", org.jmol.i18n.GT._ ("Load"));
this.labels.put ("label1", org.jmol.i18n.GT._ ("press CTRL-ENTER for new line or paste model data and press Load"));
this.labels.put ("default", org.jmol.i18n.GT._ ("Messages will appear here. Enter commands in the box below. Click the console Help menu item for on-line help, which will appear in a new browser window."));
});
Clazz.defineMethod (c$, "setLabels", 
function () {
var doTranslate = org.jmol.i18n.GT.getDoTranslate ();
org.jmol.i18n.GT.setDoTranslate (true);
this.editButton = this.setButton ("Editor");
this.stateButton = this.setButton ("State");
this.runButton = this.setButton ("Run");
this.clearOutButton = this.setButton ("Clear Output");
this.clearInButton = this.setButton ("Clear Input");
this.historyButton = this.setButton ("History");
this.loadButton = this.setButton ("Load");
this.defaultMessage = this.getLabel ("default");
this.setTitle ();
org.jmol.i18n.GT.setDoTranslate (false);
{
this.defaultMessage = this.getLabel("default").split("Click")[0];
}org.jmol.i18n.GT.setDoTranslate (doTranslate);
this.defaultMessage = this.getLabel ("default");
});
Clazz.defineMethod (c$, "getLabel", 
function (key) {
if (this.labels == null) {
this.labels =  new java.util.Hashtable ();
this.labels.put ("title", org.jmol.i18n.GT._ ("Jmol Script Console") + " " + org.jmol.api.JmolViewer.getJmolVersion ());
this.setupLabels ();
}return this.labels.get (key);
}, "~S");
Clazz.defineMethod (c$, "displayConsole", 
function () {
this.layoutWindow (null);
this.outputMsg (this.defaultMessage);
});
Clazz.defineMethod (c$, "updateLabels", 
function () {
return;
});
Clazz.defineMethod (c$, "completeCommand", 
function (thisCmd) {
if (thisCmd.length == 0) return null;
var strCommand = (this.nTab <= 0 || this.incompleteCmd == null ? thisCmd : this.incompleteCmd);
this.incompleteCmd = strCommand;
var splitCmd = org.jmol.script.ScriptCompiler.splitCommandLine (thisCmd);
if (splitCmd == null) return null;
var asCommand = splitCmd[2] == null;
var notThis = splitCmd[asCommand ? 1 : 2];
var s = splitCmd[1];
if (notThis.length == 0) return null;
splitCmd = org.jmol.script.ScriptCompiler.splitCommandLine (strCommand);
var cmd = null;
if (!asCommand && (notThis.charAt (0) == '"' || notThis.charAt (0) == '\'')) {
var q = notThis.charAt (0);
notThis = org.jmol.util.TextFormat.trim (notThis, "\"\'");
var stub = org.jmol.util.TextFormat.trim (splitCmd[2], "\"\'");
cmd = this.nextFileName (stub, this.nTab);
if (cmd != null) cmd = splitCmd[0] + splitCmd[1] + q + cmd + q;
} else {
var map = null;
if (!asCommand) {
notThis = s;
if (splitCmd[2].startsWith ("$") || s.equalsIgnoreCase ("isosurface ") || s.equalsIgnoreCase ("contact ") || s.equalsIgnoreCase ("draw ")) {
map =  new java.util.Hashtable ();
this.viewer.getObjectMap (map, splitCmd[2].startsWith ("$"));
}}cmd = org.jmol.script.Token.completeCommand (map, s.equalsIgnoreCase ("set "), asCommand, asCommand ? splitCmd[1] : splitCmd[2], this.nTab);
cmd = splitCmd[0] + (cmd == null ? notThis : asCommand ? cmd : splitCmd[1] + cmd);
}return (cmd == null || cmd.equals (strCommand) ? null : cmd);
}, "~S");
Clazz.defineMethod (c$, "doAction", 
function (source) {
if (source === this.runButton) {
this.execute (null);
} else if (source === this.editButton) {
this.viewer.getProperty ("DATA_API", "scriptEditor", null);
} else if (source === this.historyButton) {
this.clearContent (this.viewer.getSetHistory (2147483647));
} else if (source === this.stateButton) {
this.clearContent (this.viewer.getStateInfo ());
} else if (source === this.clearInButton) {
this.input.setText ("");
return;
}if (source === this.clearOutButton) {
this.output.setText ("");
return;
}if (source === this.loadButton) {
this.viewer.loadInline (this.input.getText (), false);
return;
}if (this.isMenuItem (source)) {
this.execute ((source).getName ());
return;
}}, "~O");
Clazz.defineMethod (c$, "execute", 
function (strCommand) {
var cmd = (strCommand == null ? this.input.getText () : strCommand);
if (strCommand == null) this.input.setText (null);
var strErrorMessage = this.viewer.script (cmd + "\u0001## EDITOR_IGNORE ##");
if (strErrorMessage != null && !strErrorMessage.equals ("pending")) this.outputMsg (strErrorMessage);
}, "~S");
Clazz.defineMethod (c$, "destroyConsole", 
function () {
if (this.viewer.isApplet ()) this.viewer.getProperty ("DATA_API", "getAppConsole", Boolean.FALSE);
});
c$.setAbstractButtonLabels = Clazz.defineMethod (c$, "setAbstractButtonLabels", 
function (menuMap, labels) {
var e = menuMap.keySet ().iterator ();
while (e.hasNext ()) {
var key = e.next ();
var m = menuMap.get (key);
var label = labels.get (key);
if (key.indexOf ("Tip") == key.length - 3) {
m.setToolTipText (labels.get (key));
} else {
var mnemonic = org.jmol.console.GenericConsole.getMnemonic (label);
if (mnemonic != ' ') m.setMnemonic (mnemonic);
label = org.jmol.console.GenericConsole.getLabelWithoutMnemonic (label);
m.setText (label);
}}
}, "java.util.Map,java.util.Map");
c$.getLabelWithoutMnemonic = Clazz.defineMethod (c$, "getLabelWithoutMnemonic", 
function (label) {
if (label == null) {
return null;
}var index = label.indexOf ('&');
if (index == -1) {
return label;
}return label.substring (0, index) + ((index < label.length - 1) ? label.substring (index + 1) : "");
}, "~S");
c$.getMnemonic = Clazz.defineMethod (c$, "getMnemonic", 
function (label) {
if (label == null) {
return ' ';
}var index = label.indexOf ('&');
if ((index == -1) || (index == label.length - 1)) {
return ' ';
}return label.charAt (index + 1);
}, "~S");
c$.map = Clazz.defineMethod (c$, "map", 
function (button, key, label, menuMap) {
var mnemonic = org.jmol.console.GenericConsole.getMnemonic (label);
if (mnemonic != ' ') (button).setMnemonic (mnemonic);
menuMap.put (key, button);
}, "~O,~S,~S,java.util.Map");
Clazz.overrideMethod (c$, "notifyEnabled", 
function (type) {
switch (type) {
case org.jmol.constant.EnumCallback.ECHO:
case org.jmol.constant.EnumCallback.MEASURE:
case org.jmol.constant.EnumCallback.MESSAGE:
case org.jmol.constant.EnumCallback.PICK:
return true;
case org.jmol.constant.EnumCallback.ANIMFRAME:
case org.jmol.constant.EnumCallback.APPLETREADY:
case org.jmol.constant.EnumCallback.ATOMMOVED:
case org.jmol.constant.EnumCallback.CLICK:
case org.jmol.constant.EnumCallback.ERROR:
case org.jmol.constant.EnumCallback.EVAL:
case org.jmol.constant.EnumCallback.HOVER:
case org.jmol.constant.EnumCallback.LOADSTRUCT:
case org.jmol.constant.EnumCallback.MINIMIZATION:
case org.jmol.constant.EnumCallback.RESIZE:
case org.jmol.constant.EnumCallback.SCRIPT:
case org.jmol.constant.EnumCallback.SYNC:
break;
}
return false;
}, "org.jmol.constant.EnumCallback");
Clazz.overrideMethod (c$, "getText", 
function () {
return this.output.getText ();
});
Clazz.overrideMethod (c$, "sendConsoleEcho", 
function (strEcho) {
if (strEcho == null) {
this.updateLabels ();
this.outputMsg (null);
strEcho = this.defaultMessage;
}this.outputMsg (strEcho);
}, "~S");
Clazz.defineMethod (c$, "outputMsg", 
($fz = function (message) {
if (message == null || message.length == 0) {
this.output.setText ("");
return;
}if (message.charAt (message.length - 1) != '\n') message += "\n";
this.output.append (message);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "clearContent", 
function (text) {
this.output.setText (text);
}, "~S");
Clazz.overrideMethod (c$, "sendConsoleMessage", 
function (strInfo) {
if (strInfo != null && this.output.getText ().startsWith (this.defaultMessage)) this.outputMsg (null);
this.outputMsg (strInfo);
}, "~S");
Clazz.overrideMethod (c$, "notifyCallback", 
function (type, data) {
var strInfo = (data == null || data[1] == null ? null : data[1].toString ());
switch (type) {
case org.jmol.constant.EnumCallback.ECHO:
this.sendConsoleEcho (strInfo);
break;
case org.jmol.constant.EnumCallback.MEASURE:
var mystatus = data[3];
if (mystatus.indexOf ("Picked") >= 0 || mystatus.indexOf ("Sequence") >= 0) this.sendConsoleMessage (strInfo);
 else if (mystatus.indexOf ("Completed") >= 0) this.sendConsoleEcho (strInfo.substring (strInfo.lastIndexOf (",") + 2, strInfo.length - 1));
break;
case org.jmol.constant.EnumCallback.MESSAGE:
this.sendConsoleMessage (data == null ? null : strInfo);
break;
case org.jmol.constant.EnumCallback.PICK:
this.sendConsoleMessage (strInfo);
break;
}
}, "org.jmol.constant.EnumCallback,~A");
Clazz.overrideMethod (c$, "setCallbackFunction", 
function (callbackType, callbackFunction) {
}, "~S,~S");
Clazz.overrideMethod (c$, "zap", 
function () {
});
Clazz.defineMethod (c$, "recallCommand", 
function (up) {
var cmd = this.viewer.getSetHistory (up ? -1 : 1);
if (cmd == null) return;
this.input.setText (cmd);
}, "~B");
Clazz.defineMethod (c$, "processKey", 
function (kcode, kid, isControlDown) {
var mode = 0;
switch (kid) {
case 401:
switch (kcode) {
case 9:
mode = 1;
if (this.input.getCaretPosition () == this.input.getText ().length) {
var cmd = this.completeCommand (this.getText ());
if (cmd != null) this.input.setText (cmd.$replace ('\t', ' '));
this.nTab++;
return mode;
}break;
case 27:
mode = 1;
this.input.setText ("");
break;
}
this.nTab = 0;
if (kcode == 10 && !isControlDown) {
this.execute (null);
return mode;
}if (kcode == 38 || kcode == 40) {
this.recallCommand (kcode == 38);
return mode;
}break;
case 402:
if (kcode == 10 && !isControlDown) return mode;
break;
}
return mode | 2;
}, "~N,~N,~B");
});
// 
//// org\jmol\consolejs\AppletConsole.js 
// 
Clazz.declarePackage ("org.jmol.consolejs");
Clazz.load (["org.jmol.console.GenericConsole"], "org.jmol.consolejs.AppletConsole", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.jsConsole = null;
Clazz.instantialize (this, arguments);
}, org.jmol.consolejs, "AppletConsole", org.jmol.console.GenericConsole);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.jmol.consolejs.AppletConsole, []);
});
Clazz.overrideMethod (c$, "start", 
function (viewer) {
this.viewer = viewer;
this.setLabels ();
this.displayConsole ();
}, "org.jmol.api.JmolViewer");
Clazz.overrideMethod (c$, "layoutWindow", 
function (enabledButtons) {
{
this.jsConsole = new Jmol.Console.JSConsole(this);
}this.setTitle ();
}, "~S");
Clazz.overrideMethod (c$, "setTitle", 
function () {
});
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
{
this.jsConsole.setVisible(visible);
}}, "~B");
Clazz.overrideMethod (c$, "setButton", 
function (text) {
{
return new Jmol.Console.Button(text);
}}, "~S");
Clazz.overrideMethod (c$, "dispose", 
function () {
this.setVisible (false);
});
Clazz.overrideMethod (c$, "isMenuItem", 
function (source) {
return false;
}, "~O");
Clazz.overrideMethod (c$, "getScriptEditor", 
function () {
return null;
});
Clazz.overrideMethod (c$, "nextFileName", 
function (stub, nTab) {
return null;
}, "~S,~N");
});
