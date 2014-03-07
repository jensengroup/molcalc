// JSmoljQueryExt.js
;(function($) {

  // adds support for synchronous binary file reading
  // incorporates jquery.iecors MSIE asynchronous cross-domain request

  $.extend( $.support, { iecors: !!window.XDomainRequest });

  if ($.support.iecors) {
    // source: https://github.com/dkastner/jquery.iecors
    // author: Derek Kastner dkastner@gmail.com http://dkastner.github.com    
    $.ajaxTransport(function(s) {
      return {
        send: function( headers, complete ) {
          // Note that xdr is not synchronous.
          // This is only being used in JSmol for transport of java code packages.
          var xdr = new window.XDomainRequest();
          xdr.onload = function() {          
            var headers = { 'Content-Type': xdr.contentType };
            complete(200, 'OK', { text: xdr.responseText }, headers);
          };
					if ( s.xhrFields ) {
            xdr.onerror = s.xhrFields.error;
            xdr.ontimeout = s.xhrFields.timeout;
					}
          xdr.open( s.type, s.url );
          xdr.send( ( s.hasContent && s.data ) || null );
        },
        abort: function() {        
          xdr.abort();
        }
      };
    });
  } else {
    $.ajaxSetup({
      accepts: { binary: "text/plain; charset=x-user-defined" }
    })
    $.ajaxTransport('binary', function(s) {
      return {
        // synchronous binary transfer only
    		send: function( headers, complete ) {
    			var xhr = s.xhr();
    			xhr.open( s.type, s.url, false ); // not asynchronous
          if (xhr.hasOwnProperty("responseType")) {
            xhr.responseType = "arraybuffer";
          } else if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
          }
    			if ( !s.crossDomain && !headers["X-Requested-With"] ) {
    				headers["X-Requested-With"] = "XMLHttpRequest";
    			}
    			try {
    				for (var i in headers )
    					xhr.setRequestHeader( i, headers[ i ] );
    			} catch(_) {}
    			xhr.send( ( s.hasContent && s.data ) || null );
    			try {
    				var responses = {},
    				  status = xhr.status,
    			    statusText = "",
    				  responseHeaders = xhr.getAllResponseHeaders(),
              responses = {};
              responses.text = (typeof xhr.responseText === "string" ? xhr.responseText : null);
						try { statusText = xhr.statusText; } catch( _ ) {}
						if ( !status && s.isLocal && !s.crossDomain ) {
							status = responses.text ? 200 : 404;
						} else if ( status === 1223 ) {
							status = 204;
						}
    				complete( status, statusText, responses, responseHeaders );
  				} catch( firefoxAccessException ) {
  					complete( -1, firefoxAccessException );
  				}
    		},
    		abort: function() {}
    	};
    });
  }
})( jQuery );
   
/*
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * Modified by Bob Hanson for JSmol-specific events and to add parameter reference to actual jQuery event.
 * Used for closing the pop-up menu.
 *   
 */

;(function($,doc,eventList,id){  
  // was 'click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'
  $.map(
    eventList.split(' '),
    function( event_name ) { jq_addOutsideEvent( event_name ); }
  );
  jq_addOutsideEvent( 'focusin',  'focus' + id );
  jq_addOutsideEvent( 'focusout', 'blur' + id );
  function jq_addOutsideEvent( event_name, outside_event_name ) {
    outside_event_name = outside_event_name || event_name + id;
    var elems = $(),
      event_namespaced = event_name + '.' + outside_event_name + '-special-event';
    $.event.special[ outside_event_name ] = {    
      setup: function(){
        elems = elems.add( this );
        if ( elems.length === 1 ) {
          $(doc).bind( event_namespaced, handle_event );
        }
      },
      teardown: function(){
        elems = elems.not( this );
        if ( elems.length === 0 ) {
          $(doc).unbind( event_namespaced );
        }
      },
      add: function( handleObj ) {
        var old_handler = handleObj.handler;
        handleObj.handler = function( event, elem ) {
          event.target = elem;
          old_handler.apply( this, arguments );
        };
      }
    };
    function handle_event( event ) {
      $(elems).each(function(){
        var elem = $(this);
        if ( this !== event.target && !elem.has(event.target).length ) {
        	//BH: adds event to pass that along to our handler as well.
          elem.triggerHandler( outside_event_name, [ event.target, event ] );
        }
      });
    };
  };
})(jQuery,document,"click mousemove mouseup touchmove touchend", "outjsmol");
  

