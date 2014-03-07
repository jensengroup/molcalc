echo min.bat
cd ..\..\
type JSmoljQuery.js > min.js
type JSmolCore.js >> min.js
type JSmol.js >> min.js
type JSmolApplet.js >> min.js
type JSmolControls.js >> min.js
type JSmolApi.js >> min.js
type j2s\j2sjmol.js >> min.js


clipp min.js
del min.js
echo now compress clipboard to JSmol.min.js

