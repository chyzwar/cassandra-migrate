const MigrationFactory = require("../models/MigrationFactory");
const {exit} = require("process");
const {readdirSync} = require("fs");
const {extname} = require("path")



function selectByExt(filePath){
  const ext = extname(filePath);
  return (extname(filePath) === "js" || extname(filePath) === "cql");
}

/**
 * Load migration in directory, ignore other files
 *
 * @param  {String} directory
 * @param  {Logger} logger
 * @return {Array}
 */
function loadMigrations(directory, logger){
  try {
    return readdirSync(directory)
      .filter(selectByExt)
      .map((fileName) => MigrationFactory.fromFile(fileName, directory));
  }
  catch(error) {
    logger.error("Error loading migration", {directory, error});
    exit();
  }
}


module.exports = loadMigrations;
