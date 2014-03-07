del core.z.js
echo coresmiles.z.js
call loadScript org\jmol\api\SmilesMatcherInterface.js -- required by org.jmol.smiles.SmilesMatcher
call loadScript org\jmol\smiles\SmilesMatcher.js
call loadScript org\jmol\smiles\InvalidSmilesException.js
call loadScript org\jmol\smiles\SmilesSearch.js -- required by org.jmol.smiles.SmilesGenerator
call loadScript org\jmol\smiles\SmilesGenerator.js
call loadScript org\jmol\smiles\SmilesAromatic.js
call loadScript org\jmol\smiles\SmilesAtom.js
call loadScript org\jmol\smiles\SmilesBond.js
call loadScript org\jmol\smiles\SmilesMeasure.js
call loadScript org\jmol\smiles\SmilesParser.js
copy core.z.js ..\core\coresmiles.z.js

del core.z.js
echo coreconsole.z.js
type coreconsoletop.js >> core.z.js
call loadScript org\jmol\api\JmolAppConsoleInterface.js -- required by org.jmol.console.GenericConsole
call loadScript org\jmol\console\GenericTextArea.js -- required by org.jmol.consolejs.GenericConsole
call loadScript org\jmol\console\GenericConsole.js -- required by org.jmol.consolejs.AppletConsole
call loadScript org\jmol\consolejs\AppletConsole.js
copy core.z.js ..\core\coreconsole.z.js


del core.z.js
echo coremenu.z.js
type coremenutop.js >> core.z.js

call loadScript org\jmol\api\JmolPopupInterface.js -- required by org.jmol.awtjs2d.JSmolPopup
call loadScript org\jmol\popup\JmolAbstractMenu.js -- required by org.jmol.popup.GenericPopup
call loadScript org\jmol\popup\GenericPopup.js
call loadScript org\jmol\awtjs2d\JSPopup.js -- required by org.jmol.awtjs2d.JSmolPopup
call loadScript org\jmol\awtjs2d\JSmolPopup.js
call loadScript org\jmol\popup\PopupResource.js -- required by org.jmol.popup.MainPopupResourceBundle
call loadScript org\jmol\popup\MainPopupResourceBundle.js
copy core.z.js ..\core\coremenu.z.js


del core.z.js
echo coresurface.z.js
call loadScript org\jmol\jvxl\api\VertexDataServer.js -- required by org.jmol.jvxl.api.MeshDataServer
call loadScript org\jmol\jvxl\api\MeshDataServer.js -- required by org.jmol.shapesurface.Isosurface
call loadScript org\jmol\shapesurface\Isosurface.js
call loadScript org\jmol\jvxl\data\JvxlCoder.js
call loadScript org\jmol\api\VolumeDataInterface.js -- required by org.jmol.jvxl.data.VolumeData
call loadScript org\jmol\jvxl\data\VolumeData.js
call loadScript org\jmol\jvxl\data\JvxlData.js
call loadScript org\jmol\jvxl\data\MeshData.js
call loadScript org\jmol\jvxl\readers\SurfaceGenerator.js
call loadScript org\jmol\jvxl\readers\Parameters.js
call loadScript org\jmol\jvxl\readers\SurfaceReader.js
call loadScript org\jmol\jvxl\calc\MarchingCubes.js
call loadScript org\jmol\jvxl\calc\MarchingSquares.js
call loadScript org\jmol\shapesurface\IsosurfaceMesh.js
call loadScript org\jmol\jvxl\readers\VolumeDataReader.js -- required by org.jmol.jvxl.readers.AtomDataReader
call loadScript org\jmol\jvxl\readers\AtomDataReader.js -- required by org.jmol.jvxl.readers.IsoSolventReader
call loadScript org\jmol\jvxl\readers\IsoSolventReader.js
call loadScript org\jmol\rendersurface\IsosurfaceRenderer.js
copy core.z.js ..\core\coresurface.z.js

echo corezip.z.js
del core.z.js
call loadScript org\jmol\api\JmolZipUtility.js -- required by org.jmol.io2.ZipUtil
call loadScript org\jmol\io2\ZipUtil.js
call loadScript java\io\ByteArrayOutputStream.js
call loadScript java\io\FileInputStream.js
call loadScript com\jcraft\jzlib\Checksum.js -- required by com.jcraft.jzlib.CRC32
call loadScript com\jcraft\jzlib\CRC32.js -- required by java.util.zip.CRC32
call loadScript java\util\zip\CRC32.js
call loadScript com\jcraft\jzlib\InflaterInputStream.js -- required by java.util.zip.InflaterInputStream
call loadScript java\util\zip\InflaterInputStream.js -- required by java.util.zip.GZIPInputStream
call loadScript java\util\zip\GZIPInputStream.js
call loadScript com\jcraft\jzlib\ZStream.js -- required by com.jcraft.jzlib.Inflater
call loadScript com\jcraft\jzlib\Inflater.js
call loadScript com\jcraft\jzlib\Adler32.js
call loadScript com\jcraft\jzlib\Tree.js -- required by com.jcraft.jzlib.Deflate
call loadScript com\jcraft\jzlib\StaticTree.js
call loadScript com\jcraft\jzlib\Deflate.js
call loadScript com\jcraft\jzlib\Deflater.js
call loadScript com\jcraft\jzlib\GZIPHeader.js
call loadScript com\jcraft\jzlib\Inflate.js
call loadScript com\jcraft\jzlib\InfTree.js -- required by com.jcraft.jzlib.InfBlocks
call loadScript com\jcraft\jzlib\InfBlocks.js
call loadScript com\jcraft\jzlib\InfCodes.js
call loadScript java\util\zip\CheckedInputStream.js
call loadScript java\util\zip\Inflater.js
call loadScript java\util\zip\ZipException.js
call loadScript java\util\zip\ZipConstants.js -- required by java.util.zip.ZipEntry
call loadScript java\util\zip\ZipEntry.js
call loadScript java\util\zip\ZipConstants64.js -- required by java.util.zip.ZipInputStream
call loadScript java\util\zip\ZipInputStream.js
call loadScript java\io\PushbackInputStream.js
call loadScript org\jmol\api\ZInputStream.js -- required by org.jmol.io2.JmolZipInputStream
call loadScript org\jmol\io2\JmolZipInputStream.js

call loadScript com\jcraft\jzlib\DeflaterOutputStream.js -- required by java.util.zip.DeflaterOutputStream
call loadScript java\util\zip\Deflater.js
call loadScript java\util\zip\DeflaterOutputStream.js
call loadScript java\util\zip\ZipOutputStream.js
call loadScript org\jmol\io2\JpegEncoder.js
call loadScript org\jmol\export\image\GenericCRCEncoder.js -- required by org.jmol.export.image.GenericPngEncoder
call loadScript org\jmol\export\image\GenericPngEncoder.js
call loadScript org\jmol\api\JmolImageCreatorInterface.js -- required by org.jmol.export.image.GenericImageCreator
call loadScript org\jmol\export\image\GenericImageCreator.js -- required by org.jmol.exportjs.JSImageCreator
call loadScript org\jmol\exportjs\JSImageCreator.js


copy core.z.js ..\core\corezip.z.js

echo coresym.z.js
del core.z.js
call loadScript org\jmol\api\SymmetryInterface.js -- required by org.jmol.symmetry.Symmetry
call loadScript org\jmol\symmetry\Symmetry.js
call loadScript org\jmol\symmetry\PointGroup.js
call loadScript org\jmol\symmetry\SpaceGroup.js
call loadScript org\jmol\symmetry\HallInfo.js
call loadScript org\jmol\symmetry\HallRotation.js
call loadScript org\jmol\symmetry\HallTranslation.js
call loadScript org\jmol\symmetry\SymmetryOperation.js
call loadScript org\jmol\symmetry\SymmetryInfo.js
call loadScript org\jmol\symmetry\UnitCell.js
copy core.z.js ..\core\coresym.z.js

echo corebio.z.js
del core.z.js
call loadScript org\jmol\adapter\readers\cifpdb\PdbReader.js
call loadScript org\jmol\adapter\smarter\Structure.js
call loadScript org\jmol\api\JmolBioResolver.js -- required by org.jmol.modelsetbio.Resolver
call loadScript org\jmol\modelsetbio\Resolver.js
call loadScript org\jmol\modelsetbio\Monomer.js -- required by org.jmol.modelsetbio.AlphaMonomer
call loadScript org\jmol\modelsetbio\AlphaMonomer.js
call loadScript org\jmol\modelsetbio\ProteinStructure.js -- required by org.jmol.modelsetbio.Helix
call loadScript org\jmol\modelsetbio\Helix.js
call loadScript org\jmol\modelsetbio\Sheet.js
call loadScript org\jmol\modelsetbio\Turn.js
call loadScript org\jmol\modelsetbio\BioPolymer.js -- required by org.jmol.modelsetbio.AlphaPolymer
call loadScript org\jmol\modelsetbio\AlphaPolymer.js
call loadScript org\jmol\modelsetbio\AminoMonomer.js
call loadScript org\jmol\modelsetbio\AminoPolymer.js
call loadScript org\jmol\modelsetbio\APBridge.js
call loadScript org\jmol\modelsetbio\BioModel.js
call loadScript org\jmol\modelsetbio\CarbohydrateMonomer.js
call loadScript org\jmol\modelsetbio\CarbohydratePolymer.js
call loadScript org\jmol\modelsetbio\PhosphorusMonomer.js -- required by org.jmol.modelsetbio.NucleicMonomer
call loadScript org\jmol\modelsetbio\NucleicMonomer.js
call loadScript org\jmol\modelsetbio\NucleicPolymer.js
call loadScript org\jmol\modelsetbio\PhosphorusPolymer.js
call loadScript org\jmol\shapebio\BioShape.js
call loadScript org\jmol\shapebio\BioShapeCollection.js -- required by org.jmol.shapebio.Rockets
call loadScript org\jmol\shapebio\Rockets.js -- required by org.jmol.shapebio.Cartoon
call loadScript org\jmol\shapebio\Cartoon.js
call loadScript org\jmol\shapebio\Backbone.js
call loadScript org\jmol\shapebio\Trace.js
call loadScript org\jmol\renderbio\BioShapeRenderer.js -- required by org.jmol.renderbio.RocketsRenderer
call loadScript org\jmol\renderbio\RocketsRenderer.js -- required by org.jmol.renderbio.CartoonRenderer
call loadScript org\jmol\renderbio\CartoonRenderer.js
call loadScript org\jmol\renderbio\BackboneRenderer.js
call loadScript org\jmol\renderbio\TraceRenderer.js
copy core.z.js ..\core\corebio.z.js

type ..\org\jmol\Jmol.properties > core.z.js
type coretop.js >> core.z.js

call loadScript java\util\MapEntry.js ------- java.util.Hashtable
call loadScript java\util\Dictionary.js ------- java.util.Hashtable
call loadScript java\util\Hashtable.js ------- java.net.URL
call loadScript java\net\URLConnection.js ------- org.jmol.awtjs.JmolURLConnection
call loadScript org\jmol\awtjs\JmolURLConnection.js
call loadScript org\jmol\awtjs2d\JmolURLConnection.js
call loadScript java\lang\AbstractStringBuilder.js ------- java.lang.StringBuffer
call loadScript java\lang\StringBuffer.js
call loadScript java\lang\StringBuilder.js
call loadScript java\util\AbstractCollection.js
call loadScript java\util\AbstractList.js ------- java.util.ArrayList
call loadScript java\util\ArrayList.js
call loadScript java\util\AbstractSet.js
call loadScript java\util\Arrays.js
call loadScript java\util\AbstractMap.js ------- java.util.Collections
call loadScript java\util\SortedMap.js ------- java.util.Collections
call loadScript java\util\SortedSet.js ------- java.util.Collections
call loadScript java\util\Collections.js
call loadScript java\util\Random.js
call loadScript org\jmol\awtjs2d\JmolURLConnection.js
call loadScript org\jmol\api\JmolCallbackListener.js ------- org.jmol.api.JmolStatusListener
call loadScript org\jmol\api\JmolStatusListener.js ------- org.jmol.appletjs.Jmol
call loadScript org\jmol\api\JmolSyncInterface.js ------- org.jmol.appletjs.Jmol
call loadScript org\jmol\appletjs\Jmol.js
call loadScript org\jmol\appletjs\JmolAppletRegistry.js
call loadScript java\lang\Enum.js ------- org.jmol.constant.EnumCallback
call loadScript org\jmol\constant\EnumCallback.js
call loadScript org\jmol\i18n\GT.js
call loadScript org\jmol\util\Escape.js
call loadScript org\jmol\util\LoggerInterface.js ------- org.jmol.util.DefaultLogger
call loadScript org\jmol\util\DefaultLogger.js ------- org.jmol.util.Logger
call loadScript org\jmol\util\Logger.js
call loadScript org\jmol\util\Parser.js
call loadScript org\jmol\util\TextFormat.js
call loadScript org\jmol\util\StringXBuilder.js
call loadScript java\text\MessageFormat.js
call loadScript org\jmol\script\Token.js ------- org.jmol.script.ScriptVariable
call loadScript org\jmol\util\Point3f.js ------- org.jmol.script.ScriptVariable
call loadScript org\jmol\script\ScriptVariable.js
call loadScript org\jmol\util\ArrayUtil.js
call loadScript org\jmol\util\BitSet.js ------- org.jmol.util.BitSetUtil
call loadScript org\jmol\util\BitSetUtil.js
call loadScript org\jmol\util\Matrix3f.js
call loadScript org\jmol\util\Matrix4f.js
call loadScript org\jmol\util\JmolEdge.js ------- org.jmol.modelset.Bond
call loadScript org\jmol\modelset\Bond.js
call loadScript org\jmol\util\Measure.js
call loadScript org\jmol\util\Tuple3f.js
call loadScript org\jmol\util\Tuple4f.js ------- org.jmol.util.Point4f
call loadScript org\jmol\util\Point4f.js
call loadScript org\jmol\io\Encoding.js
call loadScript java\io\FilterInputStream.js ------- java.io.BufferedInputStream
call loadScript java\io\BufferedInputStream.js ------- org.jmol.viewer.JmolConstants
call loadScript java\util\Properties.js ------- org.jmol.viewer.JmolConstants
call loadScript org\jmol\util\Elements.js ------- org.jmol.viewer.JmolConstants
call loadScript org\jmol\util\Vector3f.js ------- org.jmol.viewer.JmolConstants
call loadScript org\jmol\viewer\JmolConstants.js
call loadScript org\jmol\util\Int2IntHash.js ------- org.jmol.util.Colix
call loadScript org\jmol\util\Colix.js
call loadScript org\jmol\util\Eigen.js
call loadScript org\jmol\util\Quaternion.js
call loadScript org\jmol\constant\EnumPalette.js
call loadScript org\jmol\util\ColorUtil.js
call loadScript org\jmol\util\Shader.js
call loadScript org\jmol\util\Quadric.js
call loadScript org\jmol\util\AxisAngle4f.js
call loadScript org\jmol\api\JmolViewer.js ------- org.jmol.viewer.Viewer
call loadScript org\jmol\atomdata\AtomDataServer.js ------- org.jmol.viewer.Viewer
call loadScript org\jmol\constant\EnumVdw.js ------- org.jmol.atomdata.RadiusData
call loadScript org\jmol\atomdata\RadiusData.js ------- org.jmol.viewer.Viewer
call loadScript org\jmol\util\CommandHistory.js ------- org.jmol.viewer.Viewer
call loadScript org\jmol\util\Dimension.js ------- org.jmol.viewer.Viewer
call loadScript org\jmol\viewer\Viewer.js
call loadScript java\io\InputStream.js ------- java.io.FilterInputStream
call loadScript java\io\OutputStream.js ------- java.io.FilterOutputStream
call loadScript java\io\FilterOutputStream.js ------- java.io.BufferedOutputStream
call loadScript java\io\BufferedOutputStream.js
call loadScript java\io\Reader.js ------- java.io.BufferedReader
call loadScript java\io\BufferedReader.js
call loadScript java\io\Writer.js ------- java.io.BufferedWriter
call loadScript java\io\BufferedWriter.js
call loadScript java\io\StringReader.js
call loadScript java\lang\Thread.js
call loadScript org\jmol\constant\EnumQuantumShell.js ------- org.jmol.api.JmolAdapter
call loadScript org\jmol\api\JmolAdapter.js ------- org.jmol.adapter.smarter.SmarterJmolAdapter
call loadScript org\jmol\adapter\smarter\SmarterJmolAdapter.js
call loadScript org\jmol\api\Interface.js
call loadScript java\lang\ThreadGroup.js
call loadScript org\jmol\constant\EnumAxesMode.js
call loadScript org\jmol\constant\EnumFileStatus.js
call loadScript org\jmol\api\JmolAdapterAtomIterator.js ------- org.jmol.adapter.smarter.AtomIterator
call loadScript org\jmol\adapter\smarter\AtomIterator.js
call loadScript org\jmol\adapter\smarter\AtomSetCollection.js
call loadScript org\jmol\api\JmolAdapterBondIterator.js ------- org.jmol.adapter.smarter.BondIterator
call loadScript org\jmol\adapter\smarter\BondIterator.js
call loadScript org\jmol\adapter\smarter\Resolver.js
call loadScript org\jmol\api\JmolAdapterStructureIterator.js ------- org.jmol.adapter.smarter.StructureIterator
call loadScript org\jmol\adapter\smarter\StructureIterator.js
call loadScript org\jmol\modelset\Group.js
call loadScript org\jmol\adapter\smarter\Atom.js
call loadScript org\jmol\adapter\smarter\AtomSetObject.js ------- org.jmol.adapter.smarter.Bond
call loadScript org\jmol\adapter\smarter\Bond.js
call loadScript org\jmol\util\Tuple3i.js ------- org.jmol.util.Point3i
call loadScript org\jmol\util\Point3i.js
call loadScript org\jmol\constant\EnumStructure.js
call loadScript java\util\StringTokenizer.js
call loadScript org\jmol\adapter\smarter\AtomSetCollectionReader.js


call loadScript org\jmol\thread\JmolThread.js ------- org.jmol.thread.ScriptDelayThread
call loadScript org\jmol\thread\ScriptDelayThread.js
call loadScript org\jmol\io\LimitedLineReader.js
call loadScript org\jmol\constant\EnumStereoMode.js
call loadScript org\jmol\io\Base64.js
call loadScript org\jmol\io\CifDataReader.js
call loadScript org\jmol\io\JmolBinary.js
call loadScript org\jmol\io\OutputStringBuilder.js
call loadScript org\jmol\script\ScriptCompilationTokenParser.js ------- org.jmol.script.ScriptCompiler
call loadScript org\jmol\script\ScriptCompiler.js
call loadScript org\jmol\script\ScriptInterruption.js
call loadScript org\jmol\script\ScriptEvaluator.js
call loadScript org\jmol\script\ScriptVariableInt.js
call loadScript org\jmol\shape\Shape.js
call loadScript java\io\ByteArrayInputStream.js
call loadScript java\io\InputStreamReader.js
call loadScript org\jmol\viewer\FileManager.js
call loadScript java\io\OutputStreamWriter.js
call loadScript org\jmol\script\ContextToken.js
call loadScript org\jmol\script\ScriptContext.js
call loadScript org\jmol\constant\EnumAnimationMode.js
call loadScript org\jmol\io\FileReader.js
call loadScript org\jmol\viewer\DataManager.js
call loadScript org\jmol\util\JmolNode.js ------- org.jmol.modelset.Atom
call loadScript org\jmol\util\Point3fi.js ------- org.jmol.modelset.Atom
call loadScript org\jmol\modelset\Atom.js
call loadScript org\jmol\modelset\AtomCollection.js
call loadScript org\jmol\modelset\LabelToken.js
call loadScript org\jmol\api\JmolMeasurementClient.js ------- org.jmol.modelset.MeasurementData
call loadScript org\jmol\modelset\MeasurementData.js
call loadScript org\jmol\util\BoxInfo.js ------- org.jmol.modelset.ModelCollection
call loadScript org\jmol\modelset\BondCollection.js ------- org.jmol.modelset.ModelCollection
call loadScript org\jmol\modelset\ModelCollection.js
call loadScript org\jmol\atomdata\AtomData.js ------- org.jmol.geodesic.EnvelopeCalculation
call loadScript org\jmol\geodesic\EnvelopeCalculation.js
call loadScript org\jmol\modelset\Measurement.js
call loadScript org\jmol\util\Geodesic.js
call loadScript org\jmol\util\Normix.js
call loadScript org\jmol\modelset\BondIterator.js ------- org.jmol.modelset.BondIteratorSelected
call loadScript org\jmol\modelset\BondIteratorSelected.js
call loadScript org\jmol\modelset\HBond.js
call loadScript org\jmol\util\TriangleData.js
call loadScript org\jmol\bspt\Bspf.js
call loadScript org\jmol\io\XmlUtil.js
call loadScript org\jmol\api\AtomIndexIterator.js ------- org.jmol.modelset.AtomIteratorWithinModel
call loadScript org\jmol\modelset\AtomIteratorWithinModel.js
call loadScript org\jmol\modelset\AtomIteratorWithinModelSet.js
call loadScript org\jmol\bspt\Bspt.js
call loadScript org\jmol\util\JmolMolecule.js
call loadScript org\jmol\modelset\TickInfo.js
call loadScript org\jmol\script\ScriptException.js
call loadScript org\jmol\bspt\CubeIterator.js
call loadScript org\jmol\bspt\Element.js ------- org.jmol.bspt.Leaf
call loadScript org\jmol\bspt\Leaf.js
call loadScript org\jmol\script\ScriptMathProcessor.js
call loadScript org\jmol\shape\Object2d.js
call loadScript org\jmol\util\ColorEncoder.js
call loadScript org\jmol\api\JmolGraphicsInterface.js ------- org.jmol.util.GData
call loadScript org\jmol\util\GData.js
call loadScript org\jmol\bspt\Node.js
call loadScript java\util\regex\Pattern.js
call loadScript org\jmol\viewer\PropertyManager.js
call loadScript org\jmol\util\JmolFont.js
call loadScript org\jmol\util\MeshSurface.js
call loadScript java\util\regex\MatchResult.js ------- java.util.regex.Matcher
call loadScript java\util\regex\Matcher.js
call loadScript org\jmol\util\Rectangle.js ------- org.jmol.viewer.ActionManager
call loadScript org\jmol\viewer\MouseState.js ------- org.jmol.viewer.ActionManager
call loadScript org\jmol\viewer\ActionManager.js
echo call loadScript java\io\OutputStreamWriter.js ------- w3c script failed
call loadScript org\jmol\viewer\StateManager.js
call loadScript org\jmol\script\ScriptFlowContext.js
call loadScript org\jmol\script\ScriptFunction.js
call loadScript org\jmol\modelset\MeasurementPending.js
call loadScript org\jmol\thread\HoverWatcherThread.js
call loadScript org\jmol\viewer\binding\Binding.js
call loadScript org\jmol\viewer\binding\DragBinding.js
call loadScript org\jmol\viewer\binding\JmolBinding.js
call loadScript org\jmol\thread\TimeoutThread.js
call loadScript org\jmol\util\TempArray.js
call loadScript org\jmol\viewer\AnimationManager.js
call loadScript org\jmol\viewer\ColorManager.js
call loadScript org\jmol\viewer\ShapeManager.js
call loadScript org\jmol\thread\AnimationThread.js
call loadScript org\jmol\viewer\ModelManager.js
call loadScript org\jmol\viewer\ScriptManager.js
call loadScript org\jmol\viewer\SelectionManager.js
call loadScript org\jmol\viewer\StatusManager.js
call loadScript org\jmol\viewer\TransformManager.js ------- org.jmol.viewer.TransformManager10
#call loadScript org\jmol\viewer\TransformManager10.js
call loadScript org\jmol\modelset\ModelLoader.js
call loadScript org\jmol\thread\CommandWatcherThread.js
call loadScript org\jmol\thread\ScriptQueueThread.js
call loadScript org\jmol\viewer\TransformManager11.js
call loadScript org\jmol\modelset\Chain.js
call loadScript org\jmol\modelset\Model.js
call loadScript org\jmol\modelset\ModelSet.js
call loadScript org\jmol\util\Hermite.js
call loadScript org\jmol\thread\MoveThread.js
call loadScript org\jmol\thread\MoveToThread.js
call loadScript org\jmol\thread\SpinThread.js
call loadScript org\jmol\thread\VibrationThread.js
call loadScript org\jmol\api\ApiPlatform.js ------- org.jmol.awtjs2d.Platform
call loadScript org\jmol\awtjs2d\Platform.js
call loadScript org\jmol\awtjs2d\AjaxURLStreamHandlerFactory.js
call loadScript org\jmol\awtjs2d\AjaxURLStreamHandler.js
call loadScript org\jmol\awtjs2d\Display.js
call loadScript org\jmol\awtjs2d\Font.js
call loadScript org\jmol\awtjs2d\Image.js
call loadScript org\jmol\api\JmolFileInterface.js ------- org.jmol.awtjs2d.JmolFile
call loadScript org\jmol\awtjs2d\JmolFile.js
call loadScript org\jmol\api\JmolFileAdapterInterface.js ------- org.jmol.awtjs2d.JmolFileAdapter
call loadScript org\jmol\awtjs2d\JmolFileAdapter.js
call loadScript org\jmol\api\JmolMouseInterface.js ------- org.jmol.awtjs2d.Mouse
call loadScript org\jmol\api\Event.js ------- org.jmol.awtjs2d.Mouse
call loadScript org\jmol\awtjs2d\Mouse.js
call loadScript org\jmol\api\JmolRendererInterface.js ------- org.jmol.g3d.Graphics3D
call loadScript org\jmol\g3d\Graphics3D.js
call loadScript org\jmol\g3d\CircleRenderer.js
call loadScript org\jmol\g3d\CylinderRenderer.js
call loadScript org\jmol\g3d\HermiteRenderer.js
call loadScript org\jmol\g3d\ImageRenderer.js
call loadScript org\jmol\g3d\LineRenderer.js
call loadScript org\jmol\g3d\Pixelator.js
call loadScript org\jmol\g3d\PixelatorShaded.js
call loadScript org\jmol\g3d\Platform3D.js
call loadScript org\jmol\g3d\SphereRenderer.js
call loadScript org\jmol\g3d\TextRenderer.js
call loadScript org\jmol\g3d\TextSorter.js
call loadScript org\jmol\g3d\TextString.js
call loadScript org\jmol\util\Rgb16.js ------- org.jmol.g3d.TriangleRenderer
call loadScript org\jmol\g3d\TriangleRenderer.js
call loadScript org\jmol\api\JmolRepaintInterface.js ------- org.jmol.render.RepaintManager
call loadScript org\jmol\render\RepaintManager.js
call loadScript org\jmol\shape\AtomShape.js ------- org.jmol.shape.Balls
call loadScript org\jmol\shape\Balls.js
call loadScript org\jmol\shape\Sticks.js
call loadScript org\jmol\shape\Measures.js
call loadScript org\jmol\shape\FontShape.js ------- org.jmol.shape.FontLineShape
call loadScript org\jmol\shape\FontLineShape.js
call loadScript org\jmol\shape\Bbcage.js
call loadScript org\jmol\shape\Uccage.js
call loadScript org\jmol\shape\Frank.js
call loadScript org\jmol\render\ShapeRenderer.js ------- org.jmol.render.BallsRenderer
call loadScript org\jmol\render\BallsRenderer.js
call loadScript org\jmol\render\SticksRenderer.js
call loadScript org\jmol\render\FontLineShapeRenderer.js ------- org.jmol.render.MeasuresRenderer
call loadScript org\jmol\render\MeasuresRenderer.js
call loadScript org\jmol\util\SimpleUnitCell.js
call loadScript org\jmol\render\CageRenderer.js ------- org.jmol.render.BbcageRenderer
call loadScript org\jmol\render\BbcageRenderer.js
call loadScript org\jmol\render\UccageRenderer.js
call loadScript org\jmol\render\FrankRenderer.js
call loadScript org\jmol\adapter\readers\molxyz\MolReader.js
call loadScript org\jmol\adapter\readers\molxyz\XyzReader.js
call loadScript org\jmol\shape\Object2dShape.js -- required by org.jmol.shape.TextShape
call loadScript org\jmol\shape\TextShape.js -- required by org.jmol.shape.Echo
call loadScript org\jmol\shape\Axes.js
call loadScript org\jmol\shape\Echo.js
call loadScript org\jmol\shape\Text.js
call loadScript org\jmol\shape\Halos.js
call loadScript org\jmol\shape\Labels.js
call loadScript org\jmol\shape\Hover.js
call loadScript org\jmol\shape\Mesh.js
call loadScript org\jmol\shape\MeshCollection.js
call loadScript org\jmol\render\AxesRenderer.js
call loadScript org\jmol\render\EchoRenderer.js
call loadScript org\jmol\render\TextRenderer.js
call loadScript org\jmol\render\HalosRenderer.js
call loadScript org\jmol\render\LabelsRenderer.js
call loadScript org\jmol\render\HoverRenderer.js
call loadScript org\jmol\render\MeshRenderer.js

call loadScript org\jmol\exportjs\Export3D.js -- required by org.jmol.exportjs.JSExporter
call loadScript org\jmol\exportjs\Exporter.js -- required by org.jmol.exportjs.JSExporter
call loadScript org\jmol\exportjs\CartesianExporter.js -- required by org.jmol.exportjs.JSExporter
call loadScript org\jmol\exportjs\JSExporter.js
call loadScript org\jmol\exportjs\UseTable.js
call loadScript java\io\FileOutputStream.js
call loadScript org\jmol\awtjs\Platform.js
call loadScript org\jmol\awtjs\Font.js
call loadScript org\jmol\awtjs\Image.js

type corebottom.js >> core.z.js
copy core.z.js ..\core\core.z.js

del core.z.js
del t

call zip.bat

:EXIT

