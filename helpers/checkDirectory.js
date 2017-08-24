const {existsSync} = require("fs");
const {exit} = require("process");
const {resolve} = require("path");


/**
 * Check if migratin directory exist
 *
 * @param  {String} directory
 * @param  {Logger} logger
 * @return {String}
 */
function checkDirectory(directory, logger) {
  const path = resolve(directory);

  if(existsSync(path)){
    return path;
  }
  else {
    logger.error("Directory path do not exist", {path, directory});
    exit();
  }
}

module.exports = checkDirectory;
