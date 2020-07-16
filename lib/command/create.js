"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const process_1 = require("process");
const Format_1 = __importDefault(require("../constants/Format"));
/**
 * JS migration format
 *
 * @param  {String} migration
 * @return {String}
 */
const js = (migration) => `
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
const cql = (migration) => `
-- up ${migration}


-- down ${migration}`;
/**
 * Create a template for migration
 *
 * @param  {String} dateString
 * @param  {String} migration
 * @return {String}
 */
const template = (migration, format) => {
    if (format === Format_1.default.JS) {
        return js(migration);
    }
    else {
        return cql(migration);
    }
};
/**
 * Create filename for migration
 *
 * @param  {String} migration
 * @return {String}
 */
const fileName = (directory, dateString, migration, format) => `${directory}/${dateString}_${migration}.${format}`;
/**
 * Create migration file
 *
 * @param  {String} migration
 * @return {void}
 */
function create(env, migration, directory, logger, format) {
    try {
        const date = moment_1.default().format("YYYY_MM_DD_HHmm");
        const file = fileName(directory, date, migration, format);
        const temp = template(migration, format);
        fs_1.default.writeFileSync(file, temp, { flag: "wx", encoding: "utf8" });
        logger.info("Up - Migration created successfully", {
            file,
            migration
        });
    }
    catch (error) {
        logger.error("Up - Migration failed", { error, migration });
        process_1.exit();
    }
}
exports.default = create;
