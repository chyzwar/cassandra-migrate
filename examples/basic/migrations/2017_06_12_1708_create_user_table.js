
const users_table = {
  up: {
    query: `
    CREATE TABLE IF NOT EXISTS user (
      username text,
      timestamp timestamp,
      subscribtions set<text>,
      PRIMARY KEY(username)
    )`,
  },
  down: {
    query: `
    DROP TABLE IF EXISTS user`,
  }
};

module.exports = users_table;
