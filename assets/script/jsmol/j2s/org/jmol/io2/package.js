var path = ClazzLoader.getClasspathFor ("org.jmol.io2.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "JpegEncoder.js", [
"org.jmol.io2.Huffman",
"$.JpegEncoder",
"$.JpegInfo",
"$.DCT"]);
