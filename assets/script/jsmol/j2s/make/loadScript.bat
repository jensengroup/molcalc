if not exist ..\%1 goto done
echo // > t
echo //// %1 >> t
echo // >> t
type ..\%1 >> t
type t >> core.z.js
:done 