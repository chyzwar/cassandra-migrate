
const create_cluster_table = {
  up: {
    query: `
    CREATE TABLE IF NOT EXISTS cluster (
      id text,
      PRIMARY KEY(id)
    )
    `
  },
  down: {
    query: `
      DROP TABLE IF EXISTS cluster`,
  }
};

module.exports = create_cluster_table;
