
const create_subscription_table = {
  up: {
    query: `
    CREATE TABLE IF NOT EXISTS subscription (
      id text,
      PRIMARY KEY(id)
    )
    `
  },
  down: {
    query: `
      DROP TABLE IF EXISTS subscription`,
  }
};

module.exports = create_subscription_table;
