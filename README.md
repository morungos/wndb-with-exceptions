WNdb-exclusions
===============

A drop-in replacement for WNdb, providing morphology exception lists.

In an ideal world this would be a plugin for WNdb, but npm is broken with
the timing of peer dependencies, so it can't be. Also, it's fixed to 3.0
WordNet for now (even though the morphology exception lists are not tied
to WordNet versions).

In practice, this is intended more as a development dependency than a 
production one, where you might want to add additional files. 



Usage
-------

```js
var wndb = require('wndb-with-exceptions');
```


Properties
------------

wndb.path (string) -- the path to the installed WordNet DB files

wndb.files (array) -- list of file names under the path

wndb.version (string) -- version string of WordNet database file


Acknowledgement
---------------

Derived from the WNdb package:
Copyright (c) 2012, 2014, mooster@42at.com
(The MIT License)

License
-------

See LICENSE file for complete Princeton University WordNet(r) License.
