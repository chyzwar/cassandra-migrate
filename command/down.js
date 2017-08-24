const Schema = require("../models/Schema");
const {exit} = require("process");

/**
 * Run outstanding migrations
 *
 * @param  {Client} client
 * @param  {String} directory
 * @param  {Logger} logger
 */
async function down(client, directory, logger){
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

module.exports = down;
