"use strict";

var Migration = require("../models/Migration");

var _require = require("process"),
    exit = _require.exit;

var _require2 = require("fs"),
    readdirSync = _require2.readdirSync;

/**
 * Load migration in directory
 *
 * @param  {String} directory
 * @param  {Logger} logger
 * @return {Array}
 */


function loadMigrations(directory, logger) {
  try {
    return readdirSync(directory).map(function (fileName) {
      return new Migration(fileName, directory);
    });
  } catch (error) {
    logger.error("Error loading migration", { directory, error });
    exit();
  }
}

module.exports = loadMigrations;