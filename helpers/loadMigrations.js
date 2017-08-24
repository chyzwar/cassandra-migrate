const Migration = require("../models/Migration");
const {exit} = require("process");
const {readdirSync} = require("fs");

/**
 * Load migration in directory
 *
 * @param  {String} directory
 * @param  {Logger} logger
 * @return {Array}
 */
function loadMigrations(directory, logger){
  try {
    return readdirSync(directory)
      .map((fileName) => new Migration(fileName, directory));
  }
  catch(error) {
    logger.error("Error loading migration", {directory, error});
    exit();
  }
}


module.exports = loadMigrations;
