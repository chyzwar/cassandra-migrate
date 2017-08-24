"use strict";

var _require = require("path"),
    resolve = _require.resolve;

/**
 * Try to load logger or fallback to console
 *
 * @param  {String} logger
 * @return {Object}
 */


function loadLogger(logger) {
  var path = resolve(logger);

  try {
    return require(path);
  } catch (error) {
    return require("console");
  }
}

module.exports = loadLogger;