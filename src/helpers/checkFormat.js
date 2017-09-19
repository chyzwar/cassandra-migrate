const {exit} = require("process");

/**
 * Check file format
 *
 * @param  {String} format
 * @param  {Logger} logger
 * @return {String}
 */
function checkFormat(format, logger){
  if(format === "js" || format === "cql"){
    return format;
  }
  else{
    logger.error("Inavlid migration format, expected: js or cql", {format});
    exit();
  }
}


module.exports = checkFormat;
