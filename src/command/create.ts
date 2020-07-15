import moment from "moment";
import fs from "fs";
import { exit } from "process";
import Logger from "../types/Logger";
import Format from "../constants/Format";

/**
 * JS migration format
 *
 * @param  {String} migration
 * @return {String}
 */
const js = (migration: string): string =>
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
 * CQL migration
 *
 * @param  {String} migration
 * @return {String}
 */
const cql = (migration: string): string =>
`
-- up ${migration}


-- down ${migration}`;


/**
 * Create a template for migration
 *
 * @param  {String} dateString
 * @param  {String} migration
 * @return {String}
 */
const template = (migration: string, format: Format): string =>{
  if (format === Format.JS) {
    return js(migration)
  }else {
    return cql(migration)
  }
}


/**
 * Create filename for migration
 *
 * @param  {String} migration
 * @return {String}
 */
const fileName = (directory: string, dateString: string, migration: string, format: string) =>
  `${directory}/${dateString}_${migration}.${format}`;



/**
 * Create migration file
 *
 * @param  {String} migration
 * @return {void}
 */
function create(env: string, migration: string, directory: string, logger: Logger, format: Format){
  try {
    const date = moment().format("YYYY_MM_DD_HHmm");

    const file = fileName(directory, date, migration, format);
    const temp = template(migration, format);

    fs.writeFileSync(
      file,
      temp,
      {flag: "wx", encoding: "utf8"}
    );

    logger.info("Up - Migration created successfully", {
      file,
      migration
    });
  }
  catch(error){
    logger.error("Up - Migration failed", {error, migration});
    exit();
  }
}

export default create;

