import Client from "../types/Client";
import Logger from "../types/Logger";
import loadMigrations from "../helpers/loadMigrations";

import Schema from "../models/Schema";
import {exit} from "process";

/**
 * Run outstanding migrations
 *
 * @param  {Client} client
 * @param  {String} directory
 * @param  {Logger} logger
 */
async function up(client: Client, directory: string, logger: Logger){
  const schema = new Schema(client, logger);

  await schema.connect();
  await schema.create();
  await schema.load();

  try {
    for(const migration of loadMigrations(directory, logger)){
      if(schema.has(migration) === false){
        await schema.up(migration);
        await schema.add(migration);
      }
    }
  }
  catch(error){
    logger.error("Migration failed",
      {
        error: {
          message: error.message,
          stack: error.stack
        }
      }
    );
  }
  exit();
}

export default up;
