
const create_notification_table = {
  up: {
    query: `
    CREATE TABLE IF NOT EXISTS notification (
      uuid uuid,
      subscribtion text,
      content text,
      timestamp timestamp,
      PRIMARY KEY(uuid)
    )
    `
  },
  down: {
    query: `
      DROP TABLE IF EXISTS notification`,
  }
};

module.exports = create_notification_table;
