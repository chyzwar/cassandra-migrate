import Logger from "../types/Logger";
import {exit} from "process";

/**
 * Migration name pattern
 *
 * @type {RegExp}
 */
const NAME = /^[a-z0-9\_]*$/i;

/**
 * Validate migration name
 */
function validateName(migration: string, logger: Logger): string {
  if(NAME.test(migration)){
    return migration;
  }
  else {
    logger.error("Invalid migration name", {migration});
    exit();
  }
}

export default validateName;
