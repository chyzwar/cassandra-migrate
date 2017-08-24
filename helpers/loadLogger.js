const {resolve} = require("path");

/**
 * Try to load logger or fallback to console
 *
 * @param  {String} logger
 * @return {Object}
 */
function loadLogger(logger) {
  const path = resolve(logger);

  try {
    return require(path);
  }
  catch(error){
    return require("console");
  }
}

module.exports = loadLogger;
