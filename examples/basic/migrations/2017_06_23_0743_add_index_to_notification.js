
const add_index_to_notification = {
  up: {
    query: `
    CREATE INDEX IF NOT EXISTS subscription_idx ON notification (subscription)`
  },
  down: {
    query: `
    DROP INDEX IF EXISTS subscription_idx`,
  }
};

module.exports = add_index_to_notification;
