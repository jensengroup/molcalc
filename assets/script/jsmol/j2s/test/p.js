/* private */
window["java.registered"] = false;

(function () {

	ClazzLoader.registerPackages ("java", [
			"io", "lang", "lang.annotation", "lang.reflect",
			"util", "util.concurrent", "util.concurrent.atomic", "util.concurrent.locks",
			"util.jar", "util.logging", "util.prefs", "util.regex", "util.zip",
			"net", "text"]);
			
	window["reflect"] = java.lang.reflect;

	var base = ClazzLoader.getClasspathFor ("java.*");
	
	ClazzLoader.ignore([
		"net.sf.j2s.ajax.HttpRequest",
		"java.util.MapEntry.Type",
		"java.net.UnknownServiceException",
		"java.lang.Runtime",
		"java.security.AccessController",
		"java.security.PrivilegedExceptionAction",
		"java.io.File",
		"java.io.FileWriter",
		"java.io.DataInputStream",
		//"java.util.zip.GZIPInputStream",
		//"java.util.zip.ZipInputStream",
		"java.util.Calendar",
		"java.io.OutputStreamWriter",
		"java.io.InputStreamReader", // for binary documents
		"java.text.DateFormat", // not used
		//"java.util.zip.CRC32",
		//"java.util.zip.ZipEntry",
		"java.util.zip.ZipOutputStream",
		"java.util.concurrent.Executors"
	])
	
	ClazzLoader.loadZJar (base + "jmolcore.z.js", ClazzLoader.runtimeKeyClass);

}) ();

window["java.registered"] = true;

