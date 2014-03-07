// JSmolCore.js -- Jmol core capability  11/28/2012 1:56:34 PM 

// see JmolApi.js for public user-interface. All these are private functions

// BH 1/17/2013 5:20:44 PM: Fixed problem with console not getting initial position if no first click
// 1/13/2013 BH: Fixed MSIE not-reading-local-files problem.
// 11/28/2012 BH: Fixed MacOS Safari binary ArrayBuffer problem
// 11/21/2012 BH: restructuring of files as JS... instead of J...
// 11/20/2012 BH: MSIE9 cannot do a synchronous file load cross-domain. See Jmol._getFileData
// 11/4/2012 BH: RCSB REST format change "<structureId>" to "<dimStructure.structureId>"
// 9/13/2012 BH: JmolCore.js changes for JSmol doAjax() method -- _getFileData()
// 6/12/2012 BH: JmolApi.js: adds Jmol.setInfo(applet, info, isShown) -- third parameter optional 
// 6/12/2012 BH: JmolApi.js: adds Jmol.getInfo(applet) 
// 6/12/2012 BH: JmolApplet.js: Fixes for MSIE 8
// 6/5/2012  BH: fixes problem with Jmol "javascript" command not working and getPropertyAsArray not working
// 6/4/2012  BH: corrects problem with MSIE requiring mouse-hover to activate applet
// 5/31/2012 BH: added JSpecView interface and api -- see JmolJSV.js
//               also changed "jmolJarPath" to just "jarPath"
//               jmolJarFile->jarFile, jmolIsSigned->isSigned, jmolReadyFunction->readyFunction
//               also corrects a double-loading issue
// 5/14/2012 BH: added AJAX queue for ChemDoodle option with multiple canvases 
// 8/12/2012 BH: adds support for MSIE xdr cross-domain request (jQuery.iecors.js)

// allows Jmol applets to be created on a page with more flexibility and extendability
// provides an object-oriented interface for JSpecView and syncing of Jmol/JSpecView

// optional use of infrastructure of ChemDoodle for multiplatform doodlable structures

// required/optional libraries (preferably in the following order):

//		JSmolCore.js      -- required;
//		JSmolApplet.js    -- required; internal functions for _Applet and _Image; must be after JmolCore
//		JSmolControls.js  -- optional; internal functions for buttons, links, menus, etc.; must be after JmolCore
//		JSmolApi.js       -- required; all user functions; must be after JmolCore
//    JSmolTHREE.js     -- WebGL library required for JSmolGLmol.js
//    JSmolGLmol.js     -- WebGL version of JSmol.
//		JSmolJSV.js       -- optional; for creating and interacting with a JSpecView applet 
//                          (requires JSpecViewApplet.jar or JSpecViewAppletSigned.jar
//    JSmol.js

// Allows Jmol-like objects to be displayed on Java-challenged (iPad/iPhone)
// or applet-challenged (Android/iPhone) platforms, with automatic switching to 

// For your installation, you should consider putting JmolData.jar and jsmol.php 
// on your own server. Nothing more than these two files is needed on the server, and this 
// allows more options for MSIE and Chrome when working with cross-domain files (such as RCSB or pubChem) 

// The NCI and RCSB databases are accessed via direct AJAX if available (xhr2/xdr).


if(typeof(jQuery)=="undefined") alert("Note -- JSmoljQuery is required for JSmol, but it's not defined.")

Jmol = (function(document) {
	return {
		_jmolInfo: {
			userAgent:navigator.userAgent, 
			version: version = 'Jmol-JSO 13.0'
		},
		_serverUrl: "http://chemapps.stolaf.edu/jmol/jsmol.jsmol.php",
		_asynchronous: true,
		_document: document,
		_debugAlert: false,
		_isMsie: (navigator.userAgent.toLowerCase().indexOf("msie") >= 0),
		_isXHTML: false,
		_XhtmlElement: null,
		_XhtmlAppendChild: false,
		_applets: {},
		_lastAppletID: null,
		_ajaxQueue: [],
		_execStack: [],
		_execLog: "",
    _mousePageX: null,
		db: {
			_databasePrefixes: "$=:",
			_fileLoadScript: ";if (_loadScript = '' && defaultLoadScript == '' && _filetype == 'Pdb') { select protein or nucleic;cartoons Only;color structure; select * };",
			_nciLoadScript: ";n = ({molecule=1}.length < {molecule=2}.length ? 2 : 1); select molecule=n;display selected;center selected;",
			_pubChemLoadScript: "",
			_DirectDatabaseCalls:{
				"cactus.nci.nih.gov": "%URL",
				"www.rcsb.org": "%URL",
				"pubchem.ncbi.nlm.nih.gov":"%URL",
				"$": "http://cactus.nci.nih.gov/chemical/structure/%FILE/file?format=sdf&get3d=True",
				"$$": "http://cactus.nci.nih.gov/chemical/structure/%FILE/file?format=sdf",
				"=": "http://www.rcsb.org/pdb/files/%FILE.pdb",
				"==": "http://www.rcsb.org/pdb/files/ligand/%FILE.cif",
				":": "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/%FILE/SDF?record_type=3d"
			},
			_restQueryUrl: "http://www.rcsb.org/pdb/rest/search",
			_restQueryXml: "<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>QUERY</keywords></orgPdbQuery>",
			_restReportUrl: "http://www.pdb.org/pdb/rest/customReport?pdbids=IDLIST&customReportColumns=structureId,structureTitle"
		},
		_allowedJmolSize: [25, 2048, 300]   // min, max, default (pixels)
    /*  By setting the Jmol.allowedJmolSize[] variable in the webpage
        before calling Jmol.getApplet(), limits for applet size can be overriden.
        2048 standard for GeoWall (http://geowall.geo.lsa.umich.edu/home.html)
    */		
	}
})(document);

(function (Jmol) {

	// Jmol core functionality

	Jmol._registerApplet = function(id, applet) {
		return Jmol._applets[id] = Jmol._applets[applet] = applet;
	}	

  Jmol._readyCallback = function (a,b,c,d) {
	  var app = a.split("_object")[0];
		// necessary for MSIE in strict mode -- apparently, we can't call 
		// jmol._readyCallback, but we can call Jmol._readyCallback. Go figure...
		Jmol._applets[app]._readyCallback(a,b,c,d);
	}


	Jmol._ajax = function(info) {


	  if (!info.async) {
    
	  	return jQuery.ajax(info).responseText;
	  }
		Jmol._ajaxQueue.push(info)
		if (Jmol._ajaxQueue.length == 1)
			Jmol._ajaxDone()
	}
	Jmol._ajaxDone = function() {
		var info = Jmol._ajaxQueue.shift();
		info && jQuery.ajax(info);
	}
	
	Jmol._grabberOptions = [
	  ["$", "NCI(small molecules)"],
	  [":", "PubChem(small molecules)"],
	  ["=", "RCSB(macromolecules)"]
	];
	
	Jmol._getGrabberOptions = function(applet, note) {
		// feel free to adjust this look to anything you want
		if (!jQuery || Jmol._grabberOptions.length == 0)
			return ""
		var s = '<input type="text" id="ID_query" onkeypress="13==event.which&&Jmol._applets[\'ID\']._search()" size="32" value="" />';
		var b = '<button id="ID_submit" onclick="Jmol._applets[\'ID\']._search()">Search</button></nobr>'
		if (Jmol._grabberOptions.length == 1) {
			s = '<nobr>' + s + '<span style="display:none">';
			b = '</span>' + b;
		} else {
			s += '<br /><nobr>'
		}
		s += '<select id="ID_select">'
		for (var i = 0; i < Jmol._grabberOptions.length; i++) {
			var opt = Jmol._grabberOptions[i];
		 	s += '<option value="' + opt[0] + '" ' + (i == 0 ? 'selected' : '') + '>' + opt[1] + '</option>';
		}
		s = (s + '</select>' + b).replace(/ID/g, applet._id) + (note ? note : "");
		return '<br />' + s;
	}

	Jmol._getWrapper = function(applet, isHeader) {
		var height = applet._height;
		var width = applet._width;
		if (typeof height !== "string" || height.indexOf("%") < 0)
			height += "px";
		if (typeof width !== "string" || width.indexOf("%") < 0)
			width += "px";
			
			// id_appletinfotablediv
			//     id_appletdiv
			//     id_appletcoverdiv
			//     id_infotablediv
			//       id_infoheaderdiv
			//          id_infoheaderspan
			//          id_infocheckboxspan
			//       id_infodiv
			
			
			// for whatever reason, without DOCTYPE, with MSIE, "height:auto" does not work, 
			// and the text scrolls off the page.
			// So I'm using height:95% here.
			// The table was a fix for MSIE with no DOCTYPE tag to fix the miscalculation
			// in height of the div when using 95% for height. 
			// But it turns out the table has problems with DOCTYPE tags, so that's out. 
			// The 95% is a compromise that we need until the no-DOCTYPE MSIE solution is found. 
			// (100% does not work with the JME linked applet)
			var img = (applet._img ? "<div id=\"ID_appletcoverdiv\" style=\"width:Wx;height:Hpx;display:block;position:relative\"><img src=\"" + applet._img + "\" style=\"width:100%;height:100%\"></div>" : "");
			var sform = (!isHeader && !Jmol._formdiv ? 
			 '<div id="__jsmolformdiv__" style="display:none">\
				<form id="__jsmolform__" method="post" target="_blank" action="">\
				<input name="call" value="saveFile"/>\
				<input id="__jsmolmimetype__" name="mimetype" value=""/>\
				<input id="__jsmolencoding__" name="encoding" value=""/>\
				<input id="__jsmolfilename__" name="filename" value=""/>\
				<input id="__jsmoldata__" name="data" value=""/>\
				</form>\
				</div>': ""); 
			if (sform)
				Jmol._formdiv = "__jsmolform__";
			var s = (isHeader ? "<div id=\"ID_appletinfotablediv\" style=\"width:Wpx;height:Hpx\"><div id=\"ID_appletdiv\" style=\"width:100%;height:100%;\">"
				: "</div>IMG<div id=\"ID_infotablediv\" style=\"width:100%;height:100%;position:relative\">\
			<div id=\"ID_infoheaderdiv\" style=\"height:20px;width:100%;display:background:yellow\"><span id=\"ID_infoheaderspan\"></span><span id=\"ID_infocheckboxspan\" style=\"position:absolute;text-align:right;right:1px;\"><a href=\"javascript:Jmol.showInfo(ID,false)\">[x]</a></span></div>\
			<div id=\"ID_infodiv\" style=\"position:absolute;top:20px;bottom:0;width:100%;height:95%;overflow:auto\"></div></div></div>"+sform);
		return s.replace(/Hpx/g, height).replace(/Wpx/g, width).replace(/IMG/, img).replace(/ID/g, applet._id);
		
/*  				
		var s = (isHeader ? "<table style=\"width:Wpx;height:Hpx\" cellpadding=\"0\" cellspacing=\"0\"><tr><td><div id=\"ID_appletinfotablediv\" style=\"width:100%;height:100%\"><div id=\"ID_appletdiv\" style=\"width:100%;height:100%\">"
				: "</div><div id=\"ID_infotablediv\" style=\"width:100%;height:100%;display:none;position:relative\">\
			<div id=\"ID_infoheaderdiv\" style=\"height:20px;width:100%;background:yellow\"><span id=\"ID_infoheaderspan\"></span><span id=\"ID_infocheckboxspan\" style=\"position:absolute;width:10px;right:10px\"><a href=\"javascript:Jmol.showInfo(ID,false)\">[x]</a></span></div>\
			<div id=\"ID_infodiv\" style=\"position:absolute;top:20px;bottom:0px;width:100%;height:95%;overflow:auto\"></div></div></div></td></tr></table>");
		if (width.indexOf("px") >= 0)
			s = s.replace(/width:100%/g, "width:" + width);
		if (height.indexOf("px") >= 0)
			s = s.replace(/height:100%/g, "height:" + height);
		return s.replace(/Hpx/g, height).replace(/Wpx/g, width).replace(/ID/g, applet._id);
	*/	
	}

	Jmol._saveFile = function(filename, mimetype, data, encoding) {
		var url = Jmol._serverUrl;
		if (!url) {
			// do something local here;
			return;
		}
		$("#__jsmolform__").attr("action", url + "?" + (new Date()).getMilliseconds());
		$("#__jsmoldata__").val(data);
		$("#__jsmolfilename__").val(filename);
		$("#__jsmolmimetype__").val(mimetype);
		$("#__jsmolencoding__").val(encoding);
		$("#__jsmolform__").submit();
		$("#__jsmoldata__").val("");
	}
	
	Jmol._getScriptForDatabase = function(database) {
		return (database == "$" ? Jmol.db._nciLoadScript : database == ":" ? Jmol.db._pubChemLoadScript : Jmol.db._fileLoadScript);
	}
	
   //   <dataset><record><structureId>1BLU</structureId><structureTitle>STRUCTURE OF THE 2[4FE-4S] FERREDOXIN FROM CHROMATIUM VINOSUM</structureTitle></record><record><structureId>3EUN</structureId><structureTitle>Crystal structure of the 2[4Fe-4S] C57A ferredoxin variant from allochromatium vinosum</structureTitle></record></dataset>
      
	Jmol._setInfo = function(applet, database, data) {
		var info = [];
		var header = "";
		if (data.indexOf("ERROR") == 0)
			header = data;
		else
			switch (database) {
			case "=":
				var S = data.split("<dimStructure.structureId>");
				var info = ["<table>"];
				for (var i = 1; i < S.length; i++) {
					info.push("<tr><td valign=top><a href=\"javascript:Jmol.search(" + applet._id + ",'=" + S[i].substring(0, 4) + "')\">" + S[i].substring(0, 4) + "</a></td>");
					info.push("<td>" + S[i].split("Title>")[1].split("</")[0] + "</td></tr>");
				}
				info.push("</table>");
				header = (S.length - 1) + " matches";
				break;			
			case "$": // NCI
			case ":": // pubChem
			break;
			default:
				return;
		}
		applet._infoHeader = header;
		applet._info = info.join("");
		applet._showInfo(true);
	}
	
	Jmol._loadSuccess = function(a, fSuccess) {
	  if (!fSuccess)
	    return;
		Jmol._ajaxDone();
		fSuccess(a);
	}

	Jmol._loadError = function(fError){
		Jmol._ajaxDone();
		Jmol.say("Error connecting to server.");	
		null!=fError&&fError()
	}
	
	Jmol._isDatabaseCall = function(query) {
		return (Jmol.db._databasePrefixes.indexOf(query.substring(0, 1)) >= 0);
	}
	
	Jmol._getDirectDatabaseCall = function(query, checkXhr2) {
		if (checkXhr2 && !Jmol.featureDetection.supportsXhr2())
			return query;
		var pt = 2;
		var db;
		var call = Jmol.db._DirectDatabaseCalls[query.substring(0,pt)];
		if (!call)
			call = Jmol.db._DirectDatabaseCalls[db = query.substring(0,--pt)];
		if (call && db == ":") {
			var ql = query.toLowerCase();
			if (!isNaN(parseInt(query.substring(1)))) {
				query = ":cid/" + query.substring(1);
			} else if (ql.indexOf(":smiles:") == 0) {
				call += "?POST?smiles=" + query.substring(8);
				query = ":smiles";
			} else if (ql.indexOf(":cid:") == 0) {
				query = ":cid/" + query.substring(5);
			} else {
				if (ql.indexOf(":name:") == 0)
					query = query.substring(5);
				else if (ql.indexOf(":cas:") == 0)
					query = query.substring(4);
				query = ":name/" + encodeURIComponent(query.substring(1));
			}
		}
		query = (call ? call.replace(/\%FILE/, query.substring(pt)) : query);
		return query;
	}
	
	Jmol._getRawDataFromServer = function(database,query,fSuccess,fError,asBase64,noScript){
		var s = 
			"?call=getRawDataFromDatabase&database=" + database
				+ "&query=" + encodeURIComponent(query)
				+ (asBase64 ? "&encoding=base64" : "")
				+ (noScript ? "" : "&script=" + encodeURIComponent(Jmol._getScriptForDatabase(database)));
		return Jmol._contactServer(s, fSuccess, fError);
	}
	
	Jmol._getInfoFromDatabase = function(applet, database, query){
		if (database == "====") {
			var data = Jmol.db._restQueryXml.replace(/QUERY/,query);
			var info = {
				dataType: "text",
				type: "POST",
				contentType:"application/x-www-form-urlencoded",
				url: Jmol.db._restQueryUrl,
				data: encodeURIComponent(data) + "&req=browser",
				success: function(data) {Jmol._ajaxDone();Jmol._extractInfoFromRCSB(applet, database, query, data)},
				error: function() {Jmol._loadError(null)},
				async: Jmol._asynchronous
			}
			return Jmol._ajax(info);
		}		
		query = "?call=getInfoFromDatabase&database=" + database
				+ "&query=" + encodeURIComponent(query);
		return Jmol._contactServer(query, function(data) {Jmol._setInfo(applet, database, data)});
	}
	
	Jmol._extractInfoFromRCSB = function(applet, database, query, output) {
		var n = output.length/5;
		if (n == 0)
			return;	
		if (query.length == 4 && n != 1) {
			var QQQQ = query.toUpperCase();
			var pt = output.indexOf(QQQQ);
			if (pt > 0 && "123456789".indexOf(QQQQ.substring(0, 1)) >= 0)
				output = QQQQ + "," + output.substring(0, pt) + output.substring(pt + 5);
			if (n > 50)
				output = output.substring(0, 250);
			output = output.replace(/\n/g,",");
			var url = Jmol._restReportUrl.replace(/IDLIST/,output);
			Jmol._loadFileData(applet, url, function(data) {Jmol._setInfo(applet, database, data) });		
		}
	}

	Jmol._loadFileData = function(applet, fileName, fSuccess, fError){
		if (Jmol._isDatabaseCall(fileName)) {
			Jmol._setQueryTerm(applet, fileName);
			fileName = Jmol._getDirectDatabaseCall(fileName, true);
			
			if (Jmol._isDatabaseCall(fileName)) {
				// xhr2 not supported (MSIE)
				fileName = Jmol._getDirectDatabaseCall(fileName, false);
				Jmol._getRawDataFromServer("_",fileName,fSuccess,fError);		
				return;
			}
		}	
		var info = {
			dataType: "text",
			url: fileName,
			async: Jmol._asynchronous,
			success: function(a) {Jmol._loadSuccess(a, fSuccess)},
			error: function() {Jmol._loadError(fError)}
		}
		var pt = fileName.indexOf("?POST?");
		if (pt > 0) {
			info.url = fileName.substring(0, pt);
			info.data = fileName.substring(pt + 6);
			info.type = "POST";
			info.contentType = "application/x-www-form-urlencoded";
		}
		Jmol._ajax(info);
	}
	
	Jmol._contactServer = function(data,fSuccess,fError){
		var info = {
			dataType: "text",
			type: "GET",
//			data: data,
			url: Jmol._serverUrl + data,
			success: function(a) {Jmol._loadSuccess(a, fSuccess)},
			error:function() { Jmol._loadError(fError) },
			async:fSuccess ? Jmol._asynchronous : false
		}
		return Jmol._ajax(info);
	}
	
	Jmol._setQueryTerm = function(applet, query) {
		if (!query || !applet._hasOptions || query.substring(0, 7) == "http://")
			return;
		if (Jmol._isDatabaseCall(query)) {
			var database = query.substring(0, 1);
			query = query.substring(1);
			if (database == "=" && query.length == 4 && query.substring(0, 1) == "=")
				query = query.substring(1);
			var d = Jmol._getElement(applet, "select");
			if (d.options)
				for (var i = 0; i < d.options.length; i++)
					if (d[i].value == database)
						d[i].selected = true;
		}
		Jmol._getElement(applet, "query").value = query;
	}

	Jmol._getElement = function(applet, what) {
		var d = document.getElementById(applet._id + "_" + what);
		return (d || {});
	}	

	Jmol.featureDetection = (function(document, window) {
		
		var features = {};
		features.ua = navigator.userAgent.toLowerCase()
		
		features.os = function(){
			var osList = ["linux","unix","mac","win"]
			var i = osList.length;
			
			while (i--){
				if (features.ua.indexOf(osList[i])!=-1) return osList[i]
			}
			return "unknown";
		}
		
		features.browser = function(){
			var ua = features.ua;
			var browserList = ["konqueror","webkit","omniweb","opera","webtv","icab","msie","mozilla"];
			for (var i=browserList.length; --i >= 0;)
				if (ua.indexOf(browserList[i])>=0) 
					return browserList[i];
			return "unknown";
		}
		features.browserName = features.browser();
	  features.browserVersion= parseFloat(features.ua.substring(features.ua.indexOf(features.browserName)+features.browserName.length+1));
	  
		features.supportsXhr2 = function() {return jQuery && (jQuery.support.cors || jQuery.support.iecors)}

		features._webGLtest = 0;
		
		features.supportsWebGL = function() {
			if (!Jmol.featureDetection._webGLtest) { 
				var canvas;
				Jmol.featureDetection._webGLtest = ( 
					window.WebGLRenderingContext 
						&& ((canvas = document.createElement("canvas")).getContext("webgl") 
							|| canvas.getContext("experimental-webgl")) ? 1 : -1);
			}
			return (Jmol.featureDetection._webGLtest > 0);
		};
		
		features.supportsJava = function() {
			if (!Jmol.featureDetection._javaEnabled) {
				if (Jmol._isMsie) {
				  return true;
				  // sorry just can't deal with intentionally turning off Java in MSIE
				} else {
				  Jmol.featureDetection._javaEnabled = (navigator.javaEnabled() ? 1 : -1);
				}
			}
			return (Jmol.featureDetection._javaEnabled > 0);
    };
			
		features.compliantBrowser = function() {
			var a = !!document.getElementById;
			var os = features.os()
			// known exceptions (old browsers):
	  		if (features.browserName == "opera" && features.browserVersion <= 7.54 && os == "mac"
			      || features.browserName == "webkit" && features.browserVersion < 125.12
			      || features.browserName == "msie" && os == "mac"
			      || features.browserName == "konqueror" && features.browserVersion <= 3.3
			    ) a = false;
			return a;
		}
		
		features.isFullyCompliant = function() {
			return features.compliantBrowser() && features.supportsJava();
		}
	  	
	  	features.useIEObject = (features.os() == "win" && features.browserName == "msie" && features.browserVersion >= 5.5);
	  	features.useHtml4Object = (features.browserName == "mozilla" && features.browserVersion >= 5) ||
	   		(features.browserName == "opera" && features.browserVersion >= 8) ||
	   		(features.browserName == "webkit" && features.browserVersion >= 412.2);
	
		return features;
		
	})(document, window);


/// Bob's ADDITIONS  24.4.2012:

	Jmol._documentWrite = function(text) {
		if (Jmol._document) {
			if (Jmol._isXHTML && !Jmol._XhtmlElement) {
				var s = document.getElementsByTagName("script");
				Jmol._XhtmlElement = s.item(s.length - 1);
				Jmol._XhtmlAppendChild = false;
			}
			if (Jmol._XhtmlElement)
				Jmol._domWrite(text);
			else
				Jmol._document.write(text);
			return null;
		}
		return text;
	}

	Jmol._domWrite = function(data) {
	  var pt = 0
	  var Ptr = []
	  Ptr[0] = 0
	  while (Ptr[0] < data.length) {
	    var child = Jmol._getDomElement(data, Ptr);
	    if (!child)
				break;
	    if (Jmol._XhtmlAppendChild)
	      Jmol._XhtmlElement.appendChild(child);
	    else
	      Jmol._XhtmlElement.parentNode.insertBefore(child, _jmol.XhtmlElement);
	  }
	}
	
	Jmol._getDomElement = function(data, Ptr, closetag, lvel) {

		// there is no "document.write" in XHTML
	
		var e = document.createElement("span");
		e.innerHTML = data;
		Ptr[0] = data.length;

		return e;

	// unnecessary ?	

		closetag || (closetag = "");
		lvel || (lvel = 0);
		var pt0 = Ptr[0];
		var pt = pt0;
		while (pt < data.length && data.charAt(pt) != "<") 
			pt++
		if (pt != pt0) {
			var text = data.substring(pt0, pt);
			Ptr[0] = pt;
			return document.createTextNode(text);
		}
		pt0 = ++pt;
		var ch;
		while (pt < data.length && "\n\r\t >".indexOf(ch = data.charAt(pt)) < 0) 
			pt++;
		var tagname = data.substring(pt0, pt);
		var e = (tagname == closetag	|| tagname == "/" ? ""
			: document.createElementNS ? document.createElementNS('http://www.w3.org/1999/xhtml', tagname)
			: document.createElement(tagname));
		if (ch == ">") {
			Ptr[0] = ++pt;
			return e;
		}
		while (pt < data.length && (ch = data.charAt(pt)) != ">") {
			while (pt < data.length && "\n\r\t ".indexOf(ch = data.charAt(pt)) >= 0) 
				pt++;
			pt0 = pt;
			while (pt < data.length && "\n\r\t =/>".indexOf(ch = data.charAt(pt)) < 0) 
				pt++;
			var attrname = data.substring(pt0, pt).toLowerCase();
			if (attrname && ch != "=")
				e.setAttribute(attrname, "true");
			while (pt < data.length && "\n\r\t ".indexOf(ch = data.charAt(pt)) >= 0) 
				pt++;
			if (ch == "/") {
				Ptr[0] = pt + 2;
				return e;
			} else if (ch == "=") {
				var quote = data.charAt(++pt);
				pt0 = ++pt;
				while (pt < data.length && (ch = data.charAt(pt)) != quote) 
					pt++;
				var attrvalue = data.substring(pt0, pt);
				e.setAttribute(attrname, attrvalue);
				pt++;
			}
		}
		Ptr[0] = ++pt;
		while (Ptr[0] < data.length) {
			var child = Jmol._getDomElement(data, Ptr, "/" + tagname, lvel+1);
			if (!child)
				break;
			e.appendChild(child);
		}
		return e;
	}
	
	Jmol._evalJSON = function(s,key){
		s = s + "";
		if(!s)
			return [];
		if(s.charAt(0) != "{") {
			if(s.indexOf(" | ") >= 0)
				s = s.replace(/\ \|\ /g, "\n");
			return s;
		}
		var A = (new Function( "return " + s ) )();
		return (!A ? null : key && A[key] != undefined ? A[key] : A);
	}

	Jmol._sortMessages = function(A){
		/*
		 * private function
		 */
		function _sortKey0(a,b){
			return (a[0]<b[0]?1:a[0]>b[0]?-1:0);
		}

		if(!A || typeof (A) != "object")
			return [];
		var B = [];
		for(var i = A.length - 1; i >= 0; i--)
			for(var j = 0, jj= A[i].length; j < jj; j++)
				B[B.length] = A[i][j];
		if(B.length == 0)
			return;
		B = B.sort(_sortKey0);
		return B;
	}

  /////////  general start-up syncing and Jmol/JSpecView sync support ///////
  
	Jmol._syncedApplets = [];
	Jmol._syncedCommands = [];
	Jmol._syncedReady = [];
	Jmol._syncReady = false;
  Jmol._isJmolJSVSync = false;

  Jmol._setReady = function(applet) {
    Jmol._syncedReady[applet] = 1;
    var n = 0;
    for (var i = 0; i < Jmol._syncedApplets.length; i++) {
      if (Jmol._syncedApplets[i] == applet._id) {
        Jmol._syncedApplets[i] = applet;
        Jmol._syncedReady[i] = 1;
      } else if (!Jmol._syncedReady[i]) {
        continue;
      }
      n++;
		}
		if (n != Jmol._syncedApplets.length)
			return;
		Jmol._setSyncReady();
	}
	
	Jmol._setSyncReady = function() {
	  Jmol._syncReady = true;
	  var s = ""
    for (var i = 0; i < Jmol._syncedApplets.length; i++)
    	if (Jmol._syncedCommands[i])
        s += "Jmol.script(Jmol._syncedApplets[" + i + "], Jmol._syncedCommands[" + i + "]);"
    setTimeout(s, 50);  
	}

	Jmol._mySyncCallback = function(app,msg) {
	  if (!Jmol._syncReady || !Jmol._isJmolJSVSync)
	  	return 1; // continue processing and ignore me
    for (var i = 0; i < Jmol._syncedApplets.length; i++) {
      if (msg.indexOf(Jmol._syncedApplets[i]._syncKeyword) >= 0) {
        Jmol._syncedApplets[i]._syncScript(msg);
      }
    }
	  return 0 // prevents further Jmol sync processing	
	}

	Jmol._setObject = function(obj, id, Info) {
		obj._id = id;
		obj._width = Info.width;
		obj._height = Info.height;
		obj._containerWidth = obj._width + ((obj._width==parseFloat(obj._width))? "px":"");
		obj._containerHeight = obj._height + ((obj._height==parseFloat(obj._height))? "px":"");
		obj._info = "";
		obj._infoHeader = obj._jmolType + ' "' + obj._id + '"'
		obj._hasOptions = (Info.addSelectionOptions && jQuery);
		obj._defaultModel = Info.defaultModel;
		obj._readyScript = (Info.script ? Info.script : "");
		obj._src = Info.src;
	}

	Jmol._addDefaultInfo = function(Info, DefaultInfo) {
		for (x in DefaultInfo)
		  if (typeof Info[x] == "undefined")
		  	Info[x] = DefaultInfo[x];
	}
	
	Jmol._cleanFileData = function(data) {
		if (data.indexOf("\r") >= 0 && data.indexOf("\n") >= 0) {
			return data.replace(/\r\n/g,"\n");
		}
		if (data.indexOf("\r") >= 0) {
			return data.replace(/\r/g,"\n");
		}
		return data;
	};

	Jmol._getFileType = function(name) {
		var database = name.substring(0, 1);
		if (database == "$" || database == ":")
			return "MOL";
		if (database == "=")
			return (name.substring(1,2) == "=" ? "LCIF" : "PDB");
		// just the extension, which must be PDB, XYZ..., CIF, or MOL
		name = name.split('.').pop().toUpperCase();
		return name.substring(0, Math.min(name.length, 3));
	};

	Jmol._searchDatabase = function(applet, query, database, script) {
		applet._showInfo(false);
		if (query.indexOf("?") >= 0) {
			Jmol._getInfoFromDatabase(applet, database, query.split("?")[0]);
			return true;
		}
		if (Jmol.db._DirectDatabaseCalls[database]) {
			applet._loadFile(database + query, script);
			return true;
		}
		return false;
	}
	
	Jmol._syncBinaryOK="?";
	
	Jmol._canSyncBinary = function() {
		if (self.VBArray) return (Jmol._syncBinaryOK = false);
	  if (Jmol._syncBinaryOK != "?") return Jmol._syncBinaryOK;
	  Jmol._syncBinaryOK = true;
		try {
			var xhr = new window.XMLHttpRequest();
		  xhr.open( "text", "http://google.com", false );
		  if (xhr.hasOwnProperty("responseType")) {
		    xhr.responseType = "arraybuffer";
		  } else if (xhr.overrideMimeType) {
		    xhr.overrideMimeType('text/plain; charset=x-user-defined');
		  }
		} catch( e ) {
      System.out.println("JmolCore.js: synchronous binary file transfer is not available");
			return Jmol._syncBinaryOK = false;
		}
		return true;	
	}

	Jmol._binaryTypes = [".gz",".jpg",".png",".zip",".jmol",".bin",".smol",".spartan",".mrc"]; // mrc? O? others?
	
  Jmol._isBinaryUrl = function(url) {
  	for (var i = Jmol._binaryTypes.length; --i >= 0;)
  		if (url.indexOf(Jmol._binaryTypes[i]) >= 0) return true;
  	return false;
  }
  
  Jmol._getFileData = function(fileName) {
  	// use host-server PHP relay if not from this host
    var type = (Jmol._isBinaryUrl(fileName) ? "binary" : "text");
    var asBase64 = ((type == "binary") && !Jmol._canSyncBinary());
    var isPost = (fileName.indexOf("?POST?") >= 0);
    if (fileName.indexOf("file:/") == 0 && fileName.indexOf("file:///") != 0)
      fileName = "file://" + fileName.substring(5);      /// fixes IE problem
    var isMyHost = (fileName.indexOf("://") < 0 || fileName.indexOf(document.location.protocol) == 0 && fileName.indexOf(document.location.host) >= 0);
    var isDirectCall = Jmol._isDirectCall(fileName);
    var cantDoSynchronousLoad = (!isMyHost && jQuery.support.iecors);
  	if (cantDoSynchronousLoad || asBase64 || !isMyHost && !isDirectCall) {
		  var s = Jmol._getRawDataFromServer("_",fileName, null, null, asBase64, true);
		  return s
		}
    
		var info = {dataType:type,async:false};
		if (isPost) {
			info.type = "POST";
			info.url = fileName.split("?POST?")[0]
			info.data = fileName.split("?POST?")[1]
		} else {
			info.url = fileName;
		}
		var xhr = jQuery.ajax(info);
		if (Clazz.instanceOf(xhr.response, self.ArrayBuffer)) {
		  // Safari
		  return xhr.response;
		} 
		return xhr.responseText;
	}
	
	Jmol._isDirectCall = function(url) {
		for (var key in Jmol.db._DirectDatabaseCalls) {
			if (key.indexOf(".") >= 0 && url.indexOf(key) >= 0)
				return true;
		}
		return false;
	}

Jmol._setDraggable = function(Obj) {
	var proto = Obj.prototype;
	// for menus and console
	proto.setContainer = function(container) {
		this.container = container;
		this.isDragging = false;
		this.ignoreMouse = false;
		var me = this;
		container.bind('mousedown touchstart', function(ev) {
			if (me.ignoreMouse) {
				me.ignoreMouse = false;
				return true;
			}
		  me.isDragging = true;
		  me.pageX = ev.pageX;
		  me.pageY = ev.pageY;
		  return false;
		});
		container.bind('mousemove touchmove', function(ev) {
			if (me.isDragging) {
				me.mouseMove(ev);
				return false;
			}
		});
		container.bind('mouseup touchend', function(ev) {
			me.mouseUp(ev);
		});
	};

	proto.mouseUp = function(ev) {
		if (this.isDragging) {
			this.pageX0 += (ev.pageX - this.pageX);
			this.pageY0 += (ev.pageY - this.pageY);
		  this.isDragging = false;
		  return false;
		}
	}
	
	proto.setPosition = function() {
    if (Jmol._mousePageX === null) {
      var id = this.applet._id + "_" + (this.applet._is2D ? "canvas2d" : "canvas");
      var offsets = $("#" + id).offset();
      Jmol._mousePageX = offsets.left;
      Jmol._mousePageY = offsets.top;
    }
		this.pageX0 = Jmol._mousePageX;
		this.pageY0 = Jmol._mousePageY;
		var pos = { top: Jmol._mousePageY + 'px', left: Jmol._mousePageX + 'px' };
		this.container.css(pos);
	};
	
	proto.mouseMove = function(ev) {
		if (!this.isDragging)
			return;
		var x = this.pageX0 + (ev.pageX - this.pageX);
		var y = this.pageY0 + (ev.pageY - this.pageY);
		this.container.css({ top: y + 'px', left: x + 'px' })
	};
		
	proto.dragBind = function(isBind) {
		this.container.unbind('mousemoveoutjsmol');
		this.container.unbind('touchmoveoutjsmol');
		this.container.unbind('mouseupoutjsmol');
		this.container.unbind('touchendoutjsmol');
		if (isBind) {
			var me = this;
			this.container.bind('mousemoveoutjsmol touchmoveoutjsmol', function(evspecial, target, ev) {
			  me.mouseMove(ev);
			});
			this.container.bind('mouseupoutjsmol touchendoutjsmol', function(evspecial, target, ev) {
				me.mouseUp(ev);
			});
		}
	};
}

})(Jmol);

/*
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * modified by Bob Hanson to streamline and to add parameter reference to actual jQuery event
 *   
 */
(function($,c,b){
$.map("click mousemove mouseup touchmove touchend".split(" "),function(d){a(d)});
function a(g){
	var e=g+b;
	var d=$(),h=g+"."+e+"-special-event";
	$.event.special[e]={
		setup:function(){
			d=d.add(this);
			if(d.length===1){
				$(c).bind(h,f)
			}
		},
		teardown:function(){
			d=d.not(this);
			if(d.length===0){
				$(c).unbind(h)
			}
		},
		add:function(i){
			var j=i.handler;
			i.handler=function(l,k){
				l.target=k;
				j.apply(this,arguments)
			}
		}
	};
	function f(ev){
		$(d).each(function(){
			var j=$(this);
			if(this!==ev.target&&!j.has(ev.target).length){
	//BH: adds ev to pass that along to our handler as well.
				j.triggerHandler(e,[ev.target, ev])
			}
		}
		)
	}
}
})(jQuery,document,"outjsmol");

