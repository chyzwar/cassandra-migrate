const cassandra = require("cassandra-driver");
const logger = require("./logger");


const {keyspace, contactPoints} = {
    keyspace: "notifications",
    contactPoints: ["127.0.0.1", "127.0.0.2", "127.0.0.3", "127.0.0.4"],
    protocolOptions: {
      port: "9042"
    }
};

/**
 * Create Cassandra client
 *
 * @type {Client}
 */
const client = new cassandra.Client({
  contactPoints, keyspace
});


/**
 * Connect to Cassandra cluster
 *
 * @type {Promise}
 */
client
  .connect()
  .then(() =>
    logger.info("Cassandra connected successfuly", {
      client: {
        hosts: client.hosts.length,
        keys: client.hosts.keys()
      }
    })
  )
  .catch((error) =>
    logger.error("Cassandra connection error", {
      error
    })
  );


/**
 * Add conatant for prepared statements
 *
 * @type {Object}
 */
client.PREPARE = {prepare: true};


module.exports = client;
