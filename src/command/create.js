const moment = require("moment");
const fs = require("fs");
const {exit} = require("process");

/**
 * JS migaration format
 *
 * @param  {String} migration
 * @return {String}
 */
const js = (migration) =>
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
 * CQL migartion
 *
 * @param  {String} migration
 * @return {String}
 */
const cql = (migration) =>
`
-- up ${migration}


-- dw ${migration}`;


/**
 * Create a template for miration
 *
 * @param  {String} dateString
 * @param  {String} migration
 * @return {String}
 */
const template = (migration, format) =>{
  if(format === "js"){
    return js(migration)
  }
  if(format === cql){
    return cql(migration)
  }
}


/**
 * Create filename for migration
 *
 * @param  {String} migration
 * @return {String}
 */
const fileName = (directory, dateString, migration, format) =>
  `${directory}/${dateString}_${migration}.${format}`;



/**
 * Create migration file
 *
 * @param  {String} migration
 * @return {void}
 */
function create(env, migration, directory, logger, format){
  try {
    const date = moment().format("YYYY_MM_DD_HHmm");

    const file = fileName(directory, date, migration, format);
    const temp = template(migration, format);

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

