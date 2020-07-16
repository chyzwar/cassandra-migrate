const winston = require("winston");

/**
 * Initialize application logger
 *
 * @type {Logger}
 */
const logger  = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: "all",
      prettyPrint: true,
      level: "silly",
    })
  ]
});


module.exports = logger;
