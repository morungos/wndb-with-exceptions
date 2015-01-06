/*
 * this script will move the exceptions to the WNdb location at install-time
 * Usage: node unpack.js
 */
var log = console.log;

var fs = require("fs");
var path = require("path");
var WNdb = require("WNdb");
var targetDir = WNdb.path;

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

copyFiles(files);
