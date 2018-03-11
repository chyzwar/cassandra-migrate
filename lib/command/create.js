"use strict";

var moment = require("moment");
var fs = require("fs");

var _require = require("process"),
    exit = _require.exit;

/**
 * JS migaration format
 *
 * @param  {String} migration
 * @return {String}
 */


var js = function js(migration) {
  return `
const ${migration} = {
  up: {
    query: "",
    params: [],
  },
  down: {
    query: "",
    params: [],
  }
};

module.exports = ${migration};`;
};

/**
 * CQL migartion
 *
 * @param  {String} migration
 * @return {String}
 */
var cql = function cql(migration) {
  return `
-- up ${migration}


-- down ${migration}`;
};

/**
 * Create a template for miration
 *
 * @param  {String} dateString
 * @param  {String} migration
 * @return {String}
 */
var template = function template(migration, format) {
  if (format === "js") {
    return js(migration);
  }
  if (format === "cql") {
    return cql(migration);
  }
};

/**
 * Create filename for migration
 *
 * @param  {String} migration
 * @return {String}
 */
var fileName = function fileName(directory, dateString, migration, format) {
  return `${directory}/${dateString}_${migration}.${format}`;
};

/**
 * Create migration file
 *
 * @param  {String} migration
 * @return {void}
 */
function create(env, migration, directory, logger, format) {
  try {
    var date = moment().format("YYYY_MM_DD_HHmm");

    var file = fileName(directory, date, migration, format);
    var temp = template(migration, format);

    fs.writeFileSync(file, temp, { flag: "wx", encoding: "utf8" });

    logger.info("Up - Migration created sucessfully", {
      file,
      migration
    });
  } catch (error) {
    logger.error("Up - Migration failed", { error, migration });
    exit();
  }
}

module.exports = create;