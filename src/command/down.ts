import Logger from "../types/Logger";
import Schema from "../models/Schema";
import {exit} from "process";
import Client from "../types/Client";

/**
 * Run outstanding migrations
 */
async function down(client: Client, directory: string, logger: Logger){
  const schema = new Schema(client, logger);

  await schema.connect();
  await schema.create();
  await schema.load();

  const migrations = schema.getMigrations(directory);

  try {
    for(const migration of migrations){
      if(schema.isRecent(migration)){
        await schema.down(migration);
        await schema.remove(migration);
      }
    }
  }
  catch(error){
    logger.error("Migration failed", {error});
  }
  exit();
}

export default down;
