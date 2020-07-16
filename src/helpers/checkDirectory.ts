import Logger from "../types/Logger";
import {existsSync} from "fs";
import {exit} from "process";
import {resolve} from "path";

/**
 * Check if migration directory exist
 */
function checkDirectory(directory: string, logger: Logger) {
  const path = resolve(directory);

  if(existsSync(path)){
    return path;
  }
  else {
    logger.error("Directory path do not exist", {path, directory});
    exit();
  }
}

export default checkDirectory;
