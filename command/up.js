const loadMigrations = require("../helpers/loadMigrations");
const Schema = require("../models/Schema");
const {exit} = require("process");

/**
 * Run outstanding migrations
 *
 * @param  {Client} client
 * @param  {String} directory
 * @param  {Logger} logger
 */
async function up(client, directory, logger){
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
    logger.error("Migration failed", {error});
  }
  exit();
}

module.exports = up;
