import Logger from "../types/Logger";
import MigrationFactory from "../models/MigrationFactory";
import {exit} from "process";
import {readdirSync} from "fs";
import {extname} from "path"


function selectByExt(filePath: string){
  const ext = extname(filePath);

  return ext === "js" || ext === "cql";
}

/**
 * Load migration in directory, ignore other files
 *
 */
function loadMigrations(directory: string, logger: Logger){
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


export default loadMigrations;
