const {resolve} = require("path");
const {exit} = require("process");

/**
 * Require cassandra client
 *
 * @param  {String} client
 * @param  {Logger} logger
 * @return {Object}
 */
function loadClient(client, logger){
  const path = resolve(client);

  try {
    return require(path);
  }
  catch(error){
    logger.error("Unable to require client", {client, error});
    exit();
  }
}

module.exports = loadClient;
