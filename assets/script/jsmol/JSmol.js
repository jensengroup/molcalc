// BH 1/3/2013 4:54:01 AM mouse binding should return false -- see d.bind(...), and d.bind("contextmenu") is not necessary

// JSmol.js -- Jmol pure JavaScript version
// author: Bob Hanson, hansonr@stolaf.edu	4/16/2012
// author: Takanori Nakane biochem_fan 6/12/2012

// This library requires
//
//	JSmoljQuery.js
//	JSmolCore.js
//  JSmolApplet.js
//  JSmolApi.js
//  j2s/j2sjmol.js    (Clazz and associated classes)
// prior to JSmol.js

// these two:
//
//  JSmolThree.js
//  JSmolGLmol.js
//  
//  are optional 

;(function (Jmol) {

	Jmol._getCanvas = function(id, Info, checkOnly, checkWebGL, checkHTML5) {
		// overrides the function in JmolCore.js
		var canvas = null;
		if (checkWebGL && Jmol.featureDetection.supportsWebGL()) {
			Jmol._Canvas3D.prototype = Jmol._jsSetPrototype(new Jmol._Applet(id,Info, "", true));
			GLmol.setRefresh(Jmol._Canvas3D.prototype);
			canvas = new Jmol._Canvas3D(id, Info, null, checkOnly);
		}
		if (checkHTML5 && canvas == null) {
			Jmol._Canvas2D.prototype = Jmol._jsSetPrototype(new Jmol._Applet(id,Info, "", true));
			canvas = new Jmol._Canvas2D(id, Info, null, checkOnly);
		}
		return canvas;
	};

	Jmol._Canvas2D = function(id, Info, caption, checkOnly){
		this._syncId = ("" + Math.random()).substring(3);
		this._id = id;
		this._is2D = true;
		this._aaScale = 1; // antialias scaling
		this._jmolType = "Jmol._Canvas2D (JSmol)";
		this._platform = "org.jmol.awtjs2d.Platform";
		if (checkOnly)
			return this;
		window[id] = this;
		this._create2D(id, Info, caption);
		this._setupJS(id, Info);
		this._showInfo(true); 
		if (Info.disableInitialConsole)
			this._showInfo(false);
		return this;
	};

	Jmol._jsGetMouseModifiers = function(ev) {
		var modifiers = 0;
		switch (ev.button) {
		case 0:
		  modifiers = org.jmol.api.Event.MOUSE_LEFT;
		  break;
		case 1:
		  modifiers = org.jmol.api.Event.MOUSE_MIDDLE;
		  break;
		case 2:
		  modifiers = org.jmol.api.Event.MOUSE_RIGHT;
		  break;
		}
		if (ev.shiftKey)
		  modifiers += org.jmol.api.Event.SHIFT_MASK;
		if (ev.altKey)
		  modifiers += org.jmol.api.Event.ALT_MASK;
		if (ev.ctrlKey)
		  modifiers += org.jmol.api.Event.CTRL_MASK;
		return modifiers;
	}

	Jmol._jsGetXY = function(canvas, ev) {
		ev.preventDefault();
		var offsets = $("#" + canvas.id).offset();
		var x, y;
		var oe = ev.originalEvent;
		Jmol._mousePageX = ev.pageX;
		Jmol._mousePageY = ev.pageY;
		if (oe.targetTouches && oe.targetTouches[0]) {
			x = oe.targetTouches[0].pageX - offsets.left;
			y = oe.targetTouches[0].pageY - offsets.top;
		} else if (oe.changedTouches) {
			x = oe.changedTouches[0].pageX - offsets.left;
			y = oe.changedTouches[0].pageY - offsets.top;
		} else {
      x = ev.pageX - offsets.left;
      y = ev.pageY - offsets.top;
		}
		return (x == undefined ? null : [Math.round(x), Math.round(y), Jmol._jsGetMouseModifiers(ev)]);
	}

  Jmol._gestureUpdate = function(canvas, ev) {
   	ev.stopPropagation();
  	ev.preventDefault();
    var oe = ev.originalEvent;
    
    if (!oe.touches || oe.touches.length != 2) return false;
    switch (ev.type) {
    case "touchstart":
      canvas._touches = [[],[]];
      break;
    case "touchmove":
			var offsets = $("#" + canvas.id).offset();
	    canvas._touches[0].push([oe.touches[0].pageX - offsets.left, oe.touches[0].pageY - offsets.top]);
	    canvas._touches[1].push([oe.touches[1].pageX - offsets.left, oe.touches[1].pageY - offsets.top]);
	    if (canvas._touches[0].length >= 2)
				canvas.applet._applet.viewer.mouse.processTwoPointGesture(canvas._touches);
      break;
    }
    return true;
  }
  
	Jmol._jsSetMouse = function(canvas) {
		var d = $(canvas);
		d.bind('mousedown touchstart', function(ev) {
	   	ev.stopPropagation();
	  	ev.preventDefault();
		  canvas.isDragging = true;
      if ((ev.type == "touchstart") && Jmol._gestureUpdate(canvas, ev))
        return false;
			Jmol._setConsoleDiv(canvas.applet.console);
			var xym = Jmol._jsGetXY(canvas, ev);
			if(!xym)
        return false;
			
			if (ev.button != 2 && canvas.applet._popups)
				Jmol.Menu.hidePopups(canvas.applet.popups);

			canvas.applet._applet.viewer.handleOldJvm10Event(org.jmol.api.Event.MOUSE_DOWN,xym[0],xym[1],xym[2],System.currentTimeMillis());
			return false;
		});
		d.bind('mousemove touchmove', function(ev) { // touchmove
     	ev.stopPropagation();
	  	ev.preventDefault();
      var isTouch = (ev.type == "touchmove");
	    if (isTouch && Jmol._gestureUpdate(canvas, ev))
        return false;
			var xym = Jmol._jsGetXY(canvas, ev);
			if(!xym) return false;
      //if (isTouch)
        //xym[2] = org.jmol.api.Event.MOUSE_LEFT;
      //System.out.println(canvas.isDragging + " " + ev.type + xym[0] + " " + xym[1] + " " + xym[2] + " " + System.currentTimeMillis())

			canvas.applet._applet.viewer.handleOldJvm10Event(
				(canvas.isDragging ? org.jmol.api.Event.MOUSE_DRAG : org.jmol.api.Event.MOUSE_MOVE),
				xym[0], xym[1], (canvas.isDragging ? xym[2] : 0), System.currentTimeMillis()
			);
			return false;
		});
		d.bind('mouseout', function(ev) {
      canvas.applet._applet.viewer.startHoverWatcher(false);
		});
		d.bind('mouseenter', function(ev) {
      canvas.applet._applet.viewer.startHoverWatcher(true);
		});
		d.bind('mouseup touchend', function(ev) {
	   	ev.stopPropagation();
	  	ev.preventDefault();
		  canvas.isDragging = false;
      if (ev.type == "touchend" && Jmol._gestureUpdate(canvas, ev))
        return false;
			var xym = Jmol._jsGetXY(canvas, ev);
			if(!xym) return false;
			canvas.applet._applet.viewer.handleOldJvm10Event(org.jmol.api.Event.MOUSE_UP,xym[0],xym[1],xym[2],System.currentTimeMillis());
			return false;

		});
		
		d.bind('DOMMouseScroll mousewheel', function(ev) { // Zoom
	   	ev.stopPropagation();
	  	ev.preventDefault();
			// Webkit or Firefox
		  canvas.isDragging = false;
		  var oe = ev.originalEvent;
			var scroll = (oe.detail ? oe.detail : oe.wheelDelta);
			var modifiers = Jmol._jsGetMouseModifiers(ev);
			canvas.applet._applet.viewer.handleOldJvm10Event(-1,scroll < 0 ? -1 : 1,0,modifiers,System.currentTimeMillis());
			return false;
		});

		// context menu is fired on mouse down, not up, and it's handled already anyway.
				
		d.bind("contextmenu", function() {return false;});
		
		$('body').bind('mouseup touchend', function(ev) {
			canvas.isDragging = false;
		});

		d.bind('mouseenter', function(ev) {
		if (ev.buttons === 0 || ev.which === 0) {
		  canvas.isDragging = false;
			var xym = Jmol._jsGetXY(canvas, ev);
			canvas.applet._applet.viewer.handleOldJvm10Event(org.jmol.api.Event.MOUSE_UP,xym[0],xym[1],xym[2],System.currentTimeMillis());
		}
		});


	}

	Jmol._jsSetPrototype = function(proto) {
		proto._create = function(id, Info, caption) {
			Jmol._setObject(this, id, Info);
			var t = Jmol._getWrapper(this, true);
			//console.log(this);
			this._GLmol = new GLmol;
			this._GLmol.applet = this;

			if (Jmol._document) {
				Jmol._documentWrite(t);
				this._GLmol.create(id, true);
				t = "";
			} else {
				t += '<script type="text/javascript">' 
					+ id + '._GLmol.create("'+id+'",true);' 
				if (Info.defaultModel)
					t += id + "._search(" + id + "._defaultModel);";
				if (this._readyScript)
					t += id + '._script(' + id + '._readyScript);' + "id" + "._showInfo(false)";
				t += '</script>';
			}
			t += Jmol._getWrapper(this, false);
			if (Info.addSelectionOptions)
				t += Jmol._getGrabberOptions(this, caption);
			if (Jmol._debugAlert && !Jmol._document)
				alert(t);
			this._code = Jmol._documentWrite(t);
		};
		
		proto._create2D = function(id, Info, caption) {
			Jmol._setObject(this, id, Info);
			var t = Jmol._getWrapper(this, true);
			//console.log(this);
			if (Jmol._document) {
				Jmol._documentWrite(t);
				this._createCanvas2d(id);
				t = "";
			} else {
				t += '<script type="text/javascript">' 
					+ id + '._createCanvas2d("'+id+'");' 
				if (Info.defaultModel)
					t += id + "._search(" + id + "._defaultModel);";
				if (this._readyScript)
					t += id + '._script(' + id + '._readyScript);' + "id" + "._showInfo(false)";
				t += '</script>';
			}
			t += Jmol._getWrapper(this, false);
			if (Info.addSelectionOptions)
				t += Jmol._getGrabberOptions(this, caption);
			if (Jmol._debugAlert && !Jmol._document)
				alert(t);
			this._code = Jmol._documentWrite(t);
		};
		
		proto._createCanvas2d = function(id) {
			var container = $('#' + id + "_appletdiv");
			var w = Math.round(container.width());
			var h = Math.round(container.height());
			var canvas = document.createElement( 'canvas' );
			canvas.applet = this;
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			canvas.width = w;
			canvas.height = h; // w and h used in setScreenDimension
			canvas.id = id + "_canvas2d";
			container.append(canvas);
      Jmol._jsSetMouse(canvas);
		}
		
		proto._setupJS = function(id, Info) {
			if (!Info.console)
				Info.console = id + "_infodiv";
			if (Info.console == "none")
				Info.console = null;
			this.console = Info.console;
			this.__Info = Info;
			this._color = Info.color;
			this._noMonitor = Info.disableJ2SLoadMonitor;
			this._j2sPath = Info.j2sPath;
			window["j2s.lib"] = {
				base : Info.j2sPath + "/",
				alias : ".",
				console : Info.console
			};
			
			var es = Jmol._execStack;
			var doStart = (es.length == 0);
			es.push([this, Jmol.__loadClazz, null, "loadClazz"])
			if (!this._is2D) {
	   		es.push([this, Jmol.__loadClass, "org.jmol.exportjs.JSExporter","load JSExporter"])
				es.push([this, this.__addExportHook, null, "addExportHook"])
			}			 			
			if (Jmol.debugCode) {
        //es.push([this.__checkLoadStatus, null,"checkLoadStatus"])
        es.push([this, Jmol.__loadClass, "org.jmol.appletjs.Jmol", "load Jmol"])
      }
			es.push([this, this.__createApplet, null,"createApplet"])

			this._isSigned = true; // access all files via URL hook
			this._readyFunction = Info.readyFunction;
			this._ready = false; 
			this._applet = null;
			this._canScript = function(script) {return true;};
			this._savedOrientations = [];
			this._syncKeyword = "Select:";
			Jmol._execLog += ("execStack loaded by " + this._id + " len=" + Jmol._execStack.length + "\n")
			if (!doStart)return;
			Jmol.__nextExecution();
		};

//	  proto.__checkLoadStatus = function(applet) {
//	  return;
//		  if (org.jmol.appletjs && org.jmol.appletjs.Jmol) {
//		    Jmol.__nextExecution();
//		  	return;
//		}
//			// spin wheels until core.z.js is processed
//			setTimeout(applet._id + ".__checkLoadStatus(" + applet._id + ")",100);
//		}


		proto.__addExportHook = function(applet) {
		  GLmol.addExportHook(applet);
			Jmol.__nextExecution();
		};

		proto.__createApplet = function(applet) {
		
			var viewerOptions =  new java.util.Hashtable ();
			var availableValues = "'messagecallback','pickcallback','animframecallback','appletreadycallback','atommovedcallback',\
									'echocallback','evalcallback','hovercallback','language','loadstru','measurecallback',\
									'minimizationcallback','resizecallback','scriptcallback','statusform','statustext','statustextarea',\
									'synccallback'";
			for (var i in applet.__Info)
				if(availableValues.indexOf("'" + i.toLowerCase() + "'") >= 0)
					viewerOptions.put(i, applet.__Info[i]);
			viewerOptions.put("appletReadyCallback","Jmol._readyCallback");
			viewerOptions.put("applet", true);
			viewerOptions.put("name", applet._id + "_object");
			viewerOptions.put("syncId", applet._syncId);
			viewerOptions.put("script", "if(!_is2D){set multipleBondSpacing 0.35};" + (!applet._color ? "" :
			  "background " + 
					(applet._color.indexOf("#") == 0 ? "[0x" + applet._color.substring(1) + "]" : applet._color)))

			viewerOptions.put("signedApplet", "true");
			viewerOptions.put("platform", applet._platform);
			if (applet._is2D)
				viewerOptions.put("display",applet._id + "_canvas2d");
				
			//viewerOptions.put("repaintManager", "org.jmol.render");
			viewerOptions.put("documentBase", document.location.href);
			var base = document.location.href.split("?")[0].split("#")[0].split("/")
			base[base.length - 1] = window["j2s.lib"].base
			viewerOptions.put ("codeBase", base.join("/"));
			Jmol._registerApplet(applet._id, applet)
			applet._applet = new org.jmol.appletjs.Jmol(viewerOptions);
			if (!applet._is2D)
				applet._GLmol.applet = applet;
			applet._jsSetScreenDimensions();
			if(applet.aaScale && applet.aaScale != 1)
				applet._applet.viewer.actionManager.setMouseDragFactor(applet.aaScale)
			Jmol.__nextExecution();
		};
		
		proto._jsSetScreenDimensions = function() {
				if (!this._applet)return
				// strangely, if CTRL+/CTRL- are used repeatedly, then the
        // applet div can be not the same size as the canvas if there
        // is a border in place.
				var d = Jmol._getElement(this, (this._is2D ? "canvas2d" : "canvas"));
				this._applet.viewer.setScreenDimension(
				d.width, d.height);
//				Math.floor($(Jmol._getElement(this, "appletdiv")).height()));

		};

		proto._loadModel = function(mol, params) {
			var script = 'load DATA "model"\n' + mol + '\nEND "model" ' + params;
			this._script(script);
			this._showInfo(false);
		};
	
		
		proto._showInfo = function(tf) {
				Jmol._getElement(this, "infoheaderspan").innerHTML = this._infoHeader;
			if (this._info)
				Jmol._getElement(this, "infodiv").innerHTML = this._info;
			if ((!this._isInfoVisible) == (!tf))
				return;
			this._isInfoVisible = tf;
			if (this._infoObject) {
				this._infoObject._showInfo(tf);
			} else {
				Jmol._getElement(this, "infotablediv").style.display = (tf ? "block" : "none");
			}
			this._show(!tf);
		}
		
		proto._show = function(tf) {
			Jmol._getElement(this,"appletdiv").style.display = (tf ? "block" : "none");
			if (tf)
				Jmol._repaint(this, true);
		};
		
		proto._canScript = function(script) {return true};
		
		proto._delay = function(eval, sc, millis) {
		// does not take into account that scripts may be added after this and need to be cached.
			this._delayID = setTimeout(function(){eval.resumeEval(sc,false)}, millis);		
		}
		
		proto._loadFile = function(fileName, params){
			this._showInfo(false);
			params || (params = "");
			this._thisJmolModel = "" + Math.random();
			this._fileName = fileName;
			this._script("zap;set echo middle center;echo Retrieving data...");
			//if (false && this._isSigned) {
				this._script("load \"" + fileName + "\"" + params);
				//return;
			//}
			//var self = this;
			//System.out.println("Jmol._loadFileData: " + fileName) 
			//Jmol._loadFileData(this, fileName, function(data){self._loadModel(data, params)});
		};
		
		proto._createDomNode = function(id, data) {
			id = this._id + "_" + id;
			var d = document.getElementById(id);
			if (d)
				document.body.removeChild(d);
			if (!data)
				return;
			if (data.indexOf("<?") == 0)
				data = data.substring(data.indexOf("<", 1));
			if (data.indexOf("/>") >= 0) {
				// no doubt there is a more efficient way to do this.
				// Firefox, at least, does not recognize "/>" in HTML blocks
				// that are added this way.
				var D = data.split("/>");
				for (var i = D.length - 1; --i >= 0;) {
					var s = D[i];
					var pt = s.lastIndexOf("<") + 1;
					var pt2 = pt;
					var len = s.length;
					var name = "";
					while (++pt2 < len) {
					  if (" \t\n\r".indexOf(s.charAt(pt2))>= 0) {
							var name = s.substring(pt, pt2);
							D[i] = s + "></"+name+">";
							break;
						}	  	
					}
				}
				data = D.join('');
			}
			d = document.createElement("_xml")
			d.id = id;
			d.innerHTML = data;
			d.style.display = "none";
			document.body.appendChild(d);
			return d;
		}		
	
		proto.equals = function(a) { return this == a };
		proto.clone = function() { return this };
		proto.hashCode = function() { return parseInt(this._syncId) };  
			

    return proto;
	};
	
	
	
  Jmol._repaint = function(applet, asNewThread) {
    // asNewThread: true is from RepaintManager.repaintNow()
    //              false is from Repaintmanager.requestRepaintAndWait()
    //
    // requires rebuilding via methods of classes in org.jmol.exportjs, which will come back from updateJS
	  // could check for resize here
		//System.out.println("Jmol._repaint " + applet._id + " " + asNewThread)
		
		if (!applet._applet)return;
		
		//asNewThread = false;
		var container = $('#' + applet._id + "_appletdiv");
		var w = Math.round(container.width());
		var h = Math.round(container.height());

		//alert("injsmol" + w + " " + h)

		applet._applet.viewer.setScreenDimension(w, h);

		if (asNewThread) {
      setTimeout(function(){ applet._applet.viewer.updateJS(0,0)});
  	} else {
  		applet._applet.viewer.updateJS(0,0);
  	}
  	//System.out.println(applet._applet.fullName)
	}

	Jmol._getHiddenCanvas = function(applet, id, width, height, forceNew) {
		id = applet._id + "_" + id;
		var d = document.getElementById(id);
    if (d && forceNew) {
      //$("body").removeChild(d);
      d = null;
    }
		if (!d)
	    d = document.createElement( 'canvas' );
	    // for some reason both these need to be set, or maybe just d.width?
		d.width = d.style.width = width;
		d.height = d.style.height = height;
		//d.style.display = "none";
		if (d.id != id) {
			d.id = id;
	  	//$("body").append(d);
	  }
	  return d;
	}

	Jmol._setConsoleDiv = function (d) {
		if (!self.Clazz)return;
		Clazz.setConsoleDiv(d);
	}

	Jmol.__loadClass = function(applet, javaClass) {
	  ClazzLoader.loadClass(javaClass, function() {Jmol.__nextExecution()});
	};

	Jmol.__nextExecution = function(trigger) {
		var es = Jmol._execStack;
	  if (es.length == 0)
	  	return;
	  if (!trigger) {
			Jmol._execLog += ("settimeout for " + es[0][0]._id + " " + es[0][3] + " len=" + es.length + "\n")
		  setTimeout("Jmol.__nextExecution(true)",10)
	  	return;
	  }
	  var e = es.shift();
	  Jmol._execLog += "executing " + e[0]._id + " " + e[3] + "\n"
		e[1](e[0],e[2]);	
	};

	Jmol.__loadClazz = function(applet) {
		// problems with multiple applets?
	  if (!Jmol.__clazzLoaded) {
  		Jmol.__clazzLoaded = true;
			LoadClazz();
			if (applet._noMonitor)
				ClassLoaderProgressMonitor.showStatus = function() {}
			LoadClazz = null;

			ClazzLoader.globalLoaded = function (file) {
       // not really.... just nothing more yet to do yet
      	ClassLoaderProgressMonitor.showStatus ("Application loaded.", true);
  			if (!Jmol.debugCode || !Jmol.haveCore) {
  				Jmol.haveCore = true;
    			Jmol.__nextExecution();
    		}
      };
			ClazzLoader.packageClasspath ("java", null, true);
			ClazzLoader.setPrimaryFolder (applet._j2sPath); // where org.jsmol.test.Test is to be found
			ClazzLoader.packageClasspath (applet._j2sPath); // where the other files are to be found
  		//if (!Jmol.debugCode)
			  return;
		}
		Jmol.__nextExecution();
	};

	Jmol._doAjax = function(url, postOut, bytesOut) {
    url = url.toString();
    
    if (bytesOut != null) {
    	bytesOut = org.jmol.io.Base64.getBase64(bytesOut).toString();
    	var filename = url.substring(url.lastIndexOf("/") + 1);
    	var mimetype = (filename.indexOf(".png") >= 0 ? "image/png" : filename.indexOf(".jpg") >= 0 ? "image/jpg" : "");
    	Jmol._saveFile(filename, mimetype, bytesOut, "base64");
    	return "OK";
    }
    if (postOut)
      url += "?POST?" + postOut;
    data = Jmol._getFileData(url)
    return Jmol._processData(data, Jmol._isBinaryUrl(url));
	}

  Jmol._processData = function(data, isBinary) {
    if (typeof data == "undefined") {
      data = "";
      isBinary = false;
    }
    isBinary &= Jmol._canSyncBinary();
    if (!isBinary)
  		return org.jmol.util.StringXBuilder.newS(data);
  	var b;
		if (Clazz.instanceOf(data, self.ArrayBuffer)) {
			data = new Uint8Array(data);
    	b = Clazz.newByteArray(data.length, 0);
	    for (var i = data.length; --i >= 0;)
  	    b[i] = data[i];
    //alert("Jmol._processData len=" + b.length + " b[0-5]=" + b[0] + " " + b[1]+ " " + b[2] + " " + b[3]+ " " + b[4] + " " + b[5])
    	return b;
						
		}
    b = Clazz.newByteArray(data.length, 0);
    for (var i = data.length; --i >= 0;)
      b[i] = data.charCodeAt(i) & 0xFF;
    //alert("Jmol._processData len=" + b.length + " b[0-5]=" + b[0] + " " + b[1]+ " " + b[2] + " " + b[3]+ " " + b[4] + " " + b[5])
    return b;
  };


  Jmol._loadImage = function(platform, echoNameAndPath, bytes, fOnload, image) {
  // bytes would be from a ZIP file -- will have to reflect those back from server as an image after conversion to base64
  // ah, but that's a problem, because that image would be needed to be posted, but you can't post an image call. 
  // so we would have to go with <image data:> which does not work in all browsers. Hmm. 
  
    var path = echoNameAndPath[1];
    
    if (image == null) {
      var image = new Image();
      image.onload = function() {Jmol._loadImage(platform, echoNameAndPath, null, fOnload, image)};

      if (bytes != null) {      
        bytes = org.jmol.io.Base64.getBase64(bytes).toString();      
        var filename = path.substring(url.lastIndexOf("/") + 1);                                                           
        var mimetype = (filename.indexOf(".png") >= 0 ? "image/png" : filename.indexOf(".jpg") >= 0 ? "image/jpg" : "");
    	   // now what?
      }
      image.src = path;
      return true; // as far as we can tell!
    }
    var width = image.width;
    var height = image.height; 
    var id = "echo_" + echoNameAndPath[0];
    var canvas = Jmol._getHiddenCanvas(platform.viewer.applet, id, width, height, true);
    canvas.imageWidth = width;
    canvas.imageHeight = height;
    canvas.id = id;
    canvas.image=image;
    Jmol._setCanvasImage(canvas, width, height);
    // return a null canvas and the error in path if there is a problem
    fOnload(canvas,path);
  };

  Jmol._setCanvasImage = function(canvas, width, height) {
    canvas.buf32 = null;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(canvas.image, 0, 0, width, height);
  };
		
})(Jmol);
