import Logger from "../types/Logger";
import {resolve} from "path";
import {exit} from "process";
import Client from "../types/Client";

/**
 * Require cassandra client
 */
function loadClient(clientPath: string, logger: Logger): Client{
  const path = resolve(clientPath);

  try {
    return require(path);
  }
  catch(error){
    logger.error("Unable to require client", {clientPath, error});
    exit();
  }
}

export default loadClient;
