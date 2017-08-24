"use strict";

var moment = require("moment");
var fs = require("fs");

var _require = require("process"),
    exit = _require.exit;

/**
 * Create a template for miration
 *
 * @param  {String} dateString
 * @param  {String} migration
 * @return {String}
 */


var template = function template(migration) {
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
 * Create filename for migration
 *
 * @param  {String} migration
 * @return {String}
 */
var fileName = function fileName(directory, dateString, migration) {
  return `${directory}/${dateString}_${migration}.js`;
};

/**
 * Create migration file
 *
 * @param  {String} migration
 * @return {void}
 */
function create(env, migration, directory, logger) {
  try {
    var date = moment().format("YYYY_MM_DD_HHmm");

    var file = fileName(directory, date, migration);
    var temp = template(migration);

    fs.writeFileSync(file, temp, { flag: "wx", encoding: "utf8" });

    logger.info("Up- Migration created sucessfully", {
      file,
      migration
    });
  } catch (error) {
    logger.error("Up - Migration failed", { error, migration });
    exit();
  }
}

module.exports = create;