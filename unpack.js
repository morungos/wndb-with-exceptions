/*
 * this script will move the exceptions to the WNdb location at install-time
 * Usage: node unpack.js
 */
var log = console.log;

var fs = require("fs");
var path = require("path");
var tar = require("tar");
var zlib = require("zlib");
var targetDir = path.join(__dirname, "dict");

if (process.argv.length < 3) {
  log('Missing tar.gz file to extract.');
  process.exit(1);
}

var tarball = process.argv[2];

var files = [
  "adj.exc",
  "adv.exc",
  "noun.exc",
  "verb.exc",
];

function copyFile(file, callback) {
  var source = path.join(__dirname, "data", file);
  var target = path.join(targetDir, file);
  var input = fs.createReadStream(source);
  var output = fs.createWriteStream(target);
  input.pipe(output);
  output.on('finish', callback);
};

function copyFiles(files) {
  if (files.length == 0) {
    return;
  } else {
    var file = files.shift();
    copyFile(file, function() {
      copyFiles(files);
    })
  }
};

function extractTarball() {
  var input = fs.createReadStream(tarball);
  var oldTar = typeof tar.Extract !== 'undefined';
  input
    .on("error", log)
    .pipe(zlib.Unzip())
    .pipe(oldTar ? tar.Extract({ path: __dirname }) : tar.x({cwd: __dirname}))
    .on("end", function() {
      copyFiles(files);
    });
}

extractTarball();
