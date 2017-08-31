

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
