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

