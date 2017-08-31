
const create_subscribtion_table = {
  up: {
    query: `
    CREATE TABLE IF NOT EXISTS subscribtion (
      id text,
      PRIMARY KEY(id)
    )
    `
  },
  down: {
    query: `
      DROP TABLE IF EXISTS subscribtion`,
  }
};

module.exports = create_subscribtion_table;
