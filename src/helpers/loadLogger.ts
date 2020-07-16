import Logger from "../types/Logger";
import {resolve} from "path";

/**
 * Try to load logger or fallback to console
 *
 */
function loadLogger(loggerPath: string): Logger {
  const path = resolve(loggerPath);

  try {
    return require(path);
  }
  catch(error){
    return require("console");
  }
}

export default loadLogger;
