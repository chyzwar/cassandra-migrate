
const add_index_to_notification = {
  up: {
    query: `
    CREATE INDEX IF NOT EXISTS subscribtion_idx ON notification (subscribtion)`
  },
  down: {
    query: `
    DROP INDEX IF EXISTS subscribtion_idx`,
  }
};

module.exports = add_index_to_notification;
