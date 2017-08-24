"use strict";

var _require = require("process"),
    exit = _require.exit;

/**
 * Migration name pattern
 *
 * @type {RegExp}
 */


var NAME = /^[a-z0-9\_]*$/i;

/**
 * Validate migration name
 *
 * @param  {String} migration
 * @param  {Logger} logger
 * @return {String}
 */
function validateName(migration, logger) {
  if (NAME.test(migration)) {
    return migration;
  } else {
    logger.error("Invalid migration name", { migration });
    exit();
  }
}

module.exports = validateName;