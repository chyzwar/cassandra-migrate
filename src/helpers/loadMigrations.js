const Migration = require("../models/Migration");
const {exit} = require("process");
const {readdirSync} = require("fs");
const {extname} = require("path")



function selectByExt(filePath){
  const ext = extname(filePath);
  return (extname(filePath) === "js" || extname(filePath) === "cql");
}

function to O

/**
 * Load migration in directory, ignore other files
 *
 * @param  {String} directory
 * @param  {Logger} logger
 * @return {Array}
 */
function loadMigrations(directory, logger){
  try {
    const files = readdirSync(directory);
      .map((fileName) => toObject(fileName, directory))
      .map((fileName) => toMigration());
  }
  catch(error) {
    logger.error("Error loading migration", {directory, error});
    exit();
  }
}


module.exports = loadMigrations;
