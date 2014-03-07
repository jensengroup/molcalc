// BH 12/15/2012 1:56:28 PM  adds corezip.z.js and corebio.z.js
// later additions include coresym.z.js, coresurface.z.js, coremenu.z.js
if (!window["java.registered"])
 window["java.registered"] = false;

(function () {

if (window["java.packaged"]) return;
window["java.packaged"] = true;


	ClazzLoader.registerPackages ("java", [
			"io", "lang", 
			//"lang.annotation", 
			"lang.reflect",
			"util", 
			//"util.concurrent", "util.concurrent.atomic", "util.concurrent.locks",
			//"util.jar", "util.logging", "util.prefs", 
			"util.regex",
			"util.zip",
			"net", "text"]);
			
	window["reflect"] = java.lang.reflect;

var	base = ClazzLoader.fastGetJ2SLibBase ();//ClazzLoader.getClasspathFor ("core.*");
	base += "core/"
var	basefile = base + "core.z.js";

	ClazzLoader.ignore([
		"net.sf.j2s.ajax.HttpRequest",
		"java.util.MapEntry.Type",
		"java.net.UnknownServiceException",
		"java.lang.Runtime",
		"java.security.AccessController",
		"java.security.PrivilegedExceptionAction",
		"java.io.File",
		"java.io.FileInputStream",
		"java.io.FileWriter",
		"java.io.OutputStreamWriter",
		"java.util.Calendar", // bypassed in ModelCollection
		"java.text.SimpleDateFormat", // not used
		"java.text.DateFormat", // not used
		//"java.util.zip.ZipOutputStream",
		"java.util.concurrent.Executors"
	])
	
	ClazzLoader.loadZJar (basefile, ClazzLoader.runtimeKeyClass);


	ClazzLoader.jarClasspath (base + "corezip.z.js",	[
		"com.jcraft.jzlib.Checksum", // required by $.CRC32
		"$.CRC32", // required by java.util.zip.CRC32
		"$.InflaterInputStream", // required by java.util.zip.InflaterInputStream
		"$.ZStream", // required by $.Inflater
		"$.Inflater",
		"$.Adler32",
		"$.Tree", // required by $.Deflate
		"$.Deflate",
		"$.GZIPHeader",
		"$.StaticTree",
		"$.Inflate",
		"$.InfTree", // required by $.InfBlocks
		"$.InfBlocks",
		"$.InfCodes",
		"$.Inflater",
		"$.InflaterInputStream", // required by $.GZIPInputStream
		"$.GZIPInputStream",
		"$.Deflater",
		"$.DeflaterOutputStream",

		"org.jmol.api.JmolZipUtility", // required by org.jmol.io2.ZipUtil
		"$.ZInputStream", // required by org.jmol.io2.JmolZipInputStream
		"$.JmolImageCreatorInterface", // required by org.jmol.export.image.GenericImageCreator

		"org.jmol.export.image.GenericCRCEncoder", // required by org.jmol.export.image.GenericPngEncoder
		"$.GenericPngEncoder",
		"$.GenericImageCreator", // required by org.jmol.exportjs.JSImageCreator

		"org.jmol.exportjs.JSImageCreator",
		
		"org.jmol.io2.ZipUtil",
		"$.JpegEncoder",
		"$.JmolZipInputStream",
		

		"java.io.ByteArrayOutputStream",
		"$.PushbackInputStream",
		
		"java.util.zip.CRC32",
		"$.CheckedInputStream",
		"$.GZIPInputStream",
		"$.Inflater",
		"$.InflaterInputStream", // required by $.GZIPInputStream
		"$.ZipException",
		"$.ZipConstants", // required by $.ZipEntry
		"$.ZipEntry",
		"$.ZipConstants64", // required by $.ZipInputStream
		"$.ZipInputStream",
		"$.Deflater",
		"$.DeflaterOutputStream",
		"$.ZipOutputStream"
		
	]);
	
	ClazzLoader.jarClasspath (base + "coresym.z.js",	[
		"org.jmol.api.SymmetryInterface", // required by org.jmol.symmetry.Symmetry
		"org.jmol.symmetry.Symmetry",
		"$.PointGroup",
		"$.SpaceGroup",
		"$.HallInfo",
		"$.HallRotation",
		"$.HallTranslation",
		"$.SymmetryOperation",
		"$.SymmetryInfo",
		"$.UnitCell"
	]);

	ClazzLoader.jarClasspath (base + "coresmiles.z.js",	[
    "org.jmol.api.SmilesMatcherInterface", // required by org.jmol.smiles.SmilesMatcher
    "org.jmol.smiles.SmilesMatcher",
    "$.InvalidSmilesException",
    "$.SmilesSearch", // required by $.SmilesGenerator
    "$.SmilesGenerator",
    "$.SmilesAromatic",
    "$.SmilesAtom",
    "$.SmilesBond",
    "$.SmilesMeasure",
    "$.SmilesParser"
	]);

	ClazzLoader.jarClasspath (base + "coresurface.z.js",	[
		"org.jmol.api.VolumeDataInterface", // required by org.jmol.jvxl.data.VolumeData
		"org.jmol.jvxl.api.VertexDataServer", // required by org.jmol.jvxl.api.MeshDataServer
		"$.MeshDataServer", // required by org.jmol.shapesurface.Isosurface
		"org.jmol.jvxl.calc.MarchingCubes",
		"$.MarchingSquares",
		"org.jmol.jvxl.data.JvxlCoder",
		"$.VolumeData",
		"$.JvxlData",
		"$.MeshData",
		"org.jmol.jvxl.readers.SurfaceGenerator",
		"$.Parameters",
		"$.SurfaceReader",
		"$.VolumeDataReader", // required by org.jmol.jvxl.readers.AtomDataReader
		"$.AtomDataReader", // required by org.jmol.jvxl.readers.IsoSolventReader
		"$.IsoSolventReader",
		"org.jmol.shapesurface.Isosurface",
		"$.IsosurfaceMesh",
		"org.jmol.rendersurface.IsosurfaceRenderer"

	]);

	ClazzLoader.jarClasspath (base + "corebio.z.js",	[
		"org.jmol.adapter.readers.cifpdb.PdbReader",
		"org.jmol.adapter.smarter.Structure",
		"org.jmol.api.JmolBioResolver", // required by org.jmol.modelsetbio.Resolver
		"org.jmol.modelsetbio.Resolver",
		"$.Monomer", // required by $.AlphaMonomer
		"$.AlphaMonomer",
		"$.ProteinStructure", // required by $.Helix
		"$.Helix",
		"$.Sheet",
		"$.Turn",
		"$.BioPolymer", // required by $.AlphaPolymer
		"$.AlphaPolymer",
		"$.AminoMonomer",
		"$.AminoPolymer",
		"$.APBridge",
		"$.BioModel",
		"$.CarbohydrateMonomer",
		"$.CarbohydratePolymer",
		"$.PhosphorusMonomer", // required by $.NucleicMonomer
		"$.NucleicMonomer",
		"$.NucleicPolymer",
		"$.PhosphorusPolymer",
		"org.jmol.shapebio.BioShape",
		"$.BioShapeCollection", // required by $.Rockets
		"$.Rockets", // required by $.Cartoon
		"$.Cartoon",
    "$.Backbone",
    "$.Trace",
		"org.jmol.renderbio.BioShapeRenderer", // required by org.jmol.renderbio.RocketsRenderer
		"$.RocketsRenderer", // required by org.jmol.renderbio.CartoonRenderer
		"$.CartoonRenderer",
    "$.BackboneRenderer",
    "$.TraceRenderer"
	]);

	ClazzLoader.jarClasspath (base + "coremenu.z.js",	[
		"org.jmol.awtjs2d.JSmolPopup",		
		"org.jmol.api.JmolPopupInterface", // -- required by org.jmol.awtjs2d.JSmolPopup
		"org.jmol.popup.JmolAbstractMenu", //  -- required by org.jmol.popup.GenericPopup
		"org.jmol.popup.GenericPopup",
		"org.jmol.awtjs2d.JSPopup", //  -- required by org.jmol.awtjs2d.JSmolPopup
		"org.jmol.awtjs2d.JSmolPopup",
		"org.jmol.popup.PopupResource", //  -- required by org.jmol.popup.MainPopupResourceBundle
		"org.jmol.popup.MainPopupResourceBundle"
	]);

	ClazzLoader.jarClasspath (base + "coreconsole.z.js",	[
		"org.jmol.api.JmolAppConsoleInterface",
		"org.jmol.console.GenericTextArea",
		"$.GenericConsole",
		"org.jmol.consolejs.AppletConsole"
	]);

}) ();
window["java.registered"] = true;



