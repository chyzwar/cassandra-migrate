const loadClient = require("./helpers/loadClient");
const checkDirectory = require("./helpers/checkDirectory");
const loadLogger = require("./helpers/loadLogger");
const program = require("commander");
const setEnvirotment = require("./helpers/setEnvirotment");
const validateName = require("./helpers/validateName");

program
  .version("0.2.1")
  .description("Cassandra migration tool");

program
  .command("create <migration>")
  .description("create new migration")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --envirotment [envirotment]", "node envirotment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .action((migration, {directory, envirotment, logger}) => {
    const create = require("./command/create");

    envirotment = setEnvirotment(envirotment);
    logger = loadLogger(logger);
    migration = validateName(migration, logger);
    directory = checkDirectory(directory, logger);

    create(
      envirotment,
      migration,
      directory,
      logger
    );
  });

program
  .command("up")
  .description("run outstanding migrations")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --envirotment [envirotment]", "node envirotment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-c, --client [client]", "db client module", "server/db")
  .action(async ({directory, envirotment, logger, client}) => {
    const up = require("./command/up");


    envirotment = setEnvirotment(envirotment);
    logger = loadLogger(logger);
    directory = checkDirectory(directory, logger);
    client = loadClient(client, logger);

    await up(
      client,
      directory,
      logger,
      envirotment
    );
  });

program
  .command("down")
  .description("revert last migrations")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --envirotment [envirotment]", "node envirotment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-l, --client [client]", "db client", "server/db")
  .action(({directory, envirotment, logger, client}) => {
    const down = require("./command/down");

    envirotment = setEnvirotment(envirotment);
    logger = loadLogger(logger);
    directory = checkDirectory(directory, logger);
    client = loadClient(client, logger);

    down(
      client,
      directory,
      logger,
      envirotment
    );
  });

program
  .command("reset")
  .description("run outstanding migrations")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --envirotment [envirotment]", "node envirotment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-l, --client [client]", "db client", "server/db")
  .action(({directory, envirotment, logger, client}) => {
    const reset = require("./command/reset");

    envirotment = setEnvirotment(envirotment);
    logger = loadLogger(logger);
    directory = checkDirectory(directory, logger);
    client = loadClient(client, logger);

    reset(
      client,
      directory,
      logger,
      envirotment
    );
  });


program
  .command("status")
  .description("run outstanding migrations")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --envirotment [envirotment]", "node envirotment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-l, --client [client]", "db client", "server/db")
  .action(({directory, envirotment, logger, client}) => {
    const status = require("./command/status");

    envirotment = setEnvirotment(envirotment);
    logger = loadLogger(logger);
    directory = checkDirectory(directory, logger);
    client = loadClient(client, logger);

    status(
      client,
      directory,
      logger,
      envirotment
    );
  });

program.parse(process.argv);
