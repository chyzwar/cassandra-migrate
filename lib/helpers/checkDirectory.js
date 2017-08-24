"use strict";

var _require = require("fs"),
    existsSync = _require.existsSync;

var _require2 = require("process"),
    exit = _require2.exit;

var _require3 = require("path"),
    resolve = _require3.resolve;

/**
 * Check if migratin directory exist
 *
 * @param  {String} directory
 * @param  {Logger} logger
 * @return {String}
 */


function checkDirectory(directory, logger) {
  var path = resolve(directory);

  if (existsSync(path)) {
    return path;
  } else {
    logger.error("Directory path do not exist", { path, directory });
    exit();
  }
}

module.exports = checkDirectory;