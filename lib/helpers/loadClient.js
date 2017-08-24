"use strict";

var _require = require("path"),
    resolve = _require.resolve;

var _require2 = require("process"),
    exit = _require2.exit;

/**
 * Require cassandra client
 *
 * @param  {String} client
 * @param  {Logger} logger
 * @return {Object}
 */


function loadClient(client, logger) {
  var path = resolve(client);

  try {
    return require(path);
  } catch (error) {
    logger.error("Unable to require client", { client, error });
    exit();
  }
}

module.exports = loadClient;