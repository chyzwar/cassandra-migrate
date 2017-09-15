"use strict";

var MigrationFactory = require("../models/MigrationFactory");

var _require = require("process"),
    exit = _require.exit;

var _require2 = require("fs"),
    readdirSync = _require2.readdirSync;

var _require3 = require("path"),
    extname = _require3.extname;

function selectByExt(filePath) {
  var ext = extname(filePath);
  return extname(filePath) === "js" || extname(filePath) === "cql";
}

/**
 * Load migration in directory, ignore other files
 *
 * @param  {String} directory
 * @param  {Logger} logger
 * @return {Array}
 */
function loadMigrations(directory, logger) {
  try {
    return readdirSync(directory).filter(selectByExt).map(function (fileName) {
      return MigrationFactory.fromFile(fileName, directory);
    });
  } catch (error) {
    logger.error("Error loading migration", { directory, error });
    exit();
  }
}

module.exports = loadMigrations;