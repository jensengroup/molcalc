@source http://chemapps.stolaf.edu/jmol/jsmol
@author hansonr@stolaf.edu project started 8/26/2012

revision 1/17/2013 6:00:50 PM -- SMILES matching compare({*},{*},"isomer") fails (Java new int[n][] in SmilesMatcher)

revision 9:22 AM 1/15/2013 -- Full writing of PNG, PNGJ, JMOL, ZIP and general WRITE command; requires jsmol.php on server currently
                           -- JavaScript version completely switched to double precision; subtle differences with Jmol may arise.

revision 7:45 PM 1/2/2013  -- Chrome displaying default popup menu with menu right-mouse click

revision 12/24/2012 9:48:49 PM -- JavaScript popup menu and (preliminary) console

revision 6:48 AM 12/7/2012   -- threading work complete -- script queuing, !quit, !exit, TRY/CATCH, FUNCTION, DELAY, MOVE, etc.

revision 5:46 AM 11/26/2012  -- clean, ordered execution solves multithreading issues in Firefox and for multiple applets

revision 8:12 PM 11/23/2012  -- adds MO homo SQUARED

revision 12:23 PM 11/24/2012 -- j2sjmol.js code trimming, Jmol.clearConsole(applet), 
				automatic switching of consoles between applets on mouseClick and scipting,
                                better handling of console vs information

revision 8:11 AM 11/22/2012  -- color Labels fix; adds _version information; adds Jmol.debugCode (true to skip core.z.js)

revision 11/21/2012 10:26:18 AM  -- Spartan binary file reading, measurements working

revision 9:20 PM 11/18/2012  -- full threading -- hover, spin, animation, vibration, timeout, delay, moveto

revision 1:19 PM 11/13/2012  -- full binary file reading on all tested browsers

revision 12:32 PM 11/2/2012  -- java/jmolcore.z.js

revision 10/29/2012 2:18:47 PM

JSmol -- Java(Script) web-based molecular viewer

see jmol.sourceforge.net  jsmol.sourceforge.net

http://chemapps.stolaf.edu/jmol/jsmol/jsmol.htm

This zip directory contains the work in progress toward
a complete Java->JavaScript code conversion for Jmol. 

Note that JSmol is not a <i>different</i> program than Jmol.
JSmol <i>is</i> Jmol, just compiled into JavaScript as well as Java byte code.
All development is done working with the trunk Jmol Java source, 
but compilation of that code creates both Java .class files and equivalent JavaScript .js files 

As such, JSmol has just about all of the features of Jmol: 

 full file reading (including binary formats)
 full Jmol scripting (including atom selection and Jmol Math)
 full Jmol shape object support
  
Status:

 complete Jmol code implementation in JavaScript
 Java2Script js compiler adapted successfully
 WebGL: full, fast rendering, including cartoons and isosurfaces (vdw, sasurface)
 HTML5: slower rendering; but a full implementation of Jmol, including translucency and labels
 color-mapped isosurfaces working
 cartoons all working
 full scripting capability
 full cross-domain database access using jQuery and JmolJSO
 full text support for HTML5-only option
 load performance enhanced using packaging of JavaScript classes
 binary file loading works in FF, MSIE, and Chrome
 threads working for hover, delay, animation, vibration, spin, moveto, timeout

To do:

 WebGL option is limited; still no text, for example

What's here:

The main test page is jsmol.htm.
jsmol.htm is a general test of the integration of JSmol with  JmolJSO

This Jmol page will automatically switch to different modes
depending upon browser capabilities. It is set to use JAVA if available or HTML5 if not.

It uses the signed Jmol applet, the unsigned Jmol applet
with server-side help, or <a href="jsmol.sourceforge.net">JSmol</a> using 
HTML5 when WebGL is not available (iPad/iPhone/Android).
JSmol implements <a href="java2script.sourceforge.net">Java2Script</a> 
to recreate the entire Jmol Java applet in JavaScript.

On the server side, it uses jmolcd2.php for 
delivering cross-domain models into the viewer. 

Credits:

Jmol code conversion to JavaScript by Bob Hanson. 
GLmol interface written by Takanori Nakane. 
Java2Script written by Zhou Renjian, et al.
Jzlib written by Atsuhiko Yamanaka.
Testing assistance by Duncan Blue, St. Olaf '17


