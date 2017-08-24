const moment = require("moment");
const fs = require("fs");
const {exit} = require("process");

/**
 * Create a template for miration
 *
 * @param  {String} dateString
 * @param  {String} migration
 * @return {String}
 */
const template = (migration) =>
`
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



/**
 * Create filename for migration
 *
 * @param  {String} migration
 * @return {String}
 */
const fileName = (directory, dateString, migration) =>
  `${directory}/${dateString}_${migration}.js`;



/**
 * Create migration file
 *
 * @param  {String} migration
 * @return {void}
 */
function create(env, migration, directory, logger){
  try {
    const date = moment().format("YYYY_MM_DD_HHmm");

    const file = fileName(directory, date, migration);
    const temp = template(migration);

    fs.writeFileSync(
      file,
      temp,
      {flag: "wx", encoding: "utf8"}
    );

    logger.info("Up- Migration created sucessfully", {
      file,
      migration
    });
  }
  catch(error){
    logger.error("Up - Migration failed", {error, migration});
    exit();
  }
}

module.exports = create;

