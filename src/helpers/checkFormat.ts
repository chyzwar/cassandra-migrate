import { exit } from "process";
import Logger from "../types/Logger";
import Format from "../constants/Format";

/**
 * Check file format
 *
 * @param  {String} format
 * @param  {Logger} logger
 * @return {String}
 */
function checkFormat(format: Format, logger: Logger){
  if(format === "js" || format === "cql"){
    return format;
  }
  else{
    logger.error("Invalid migration format, expected: js or cql", {format});
    exit();
  }
}


export default checkFormat;
