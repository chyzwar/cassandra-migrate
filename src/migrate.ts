
import loadClient  from "./helpers/loadClient";
import checkDirectory  from "./helpers/checkDirectory";
import loadLogger  from "./helpers/loadLogger";
import program  from "commander";
import setEnvironment  from "./helpers/setEnvironment";
import validateName  from "./helpers/validateName";
import checkFormat  from "./helpers/checkFormat";

program
  .version("0.2.1")
  .description("Cassandra migration tool");

program
  .command("create <migration>")
  .description("create new migration")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --environment [environment]", "node environment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-f, --format [format]", "migration format", "cql")
  .action((migration, {directory, environment, logger, format}) => {
    const create = require("./command/create");

    environment = setEnvironment(environment);
    logger = loadLogger(logger);
    migration = validateName(migration, logger);
    directory = checkDirectory(directory, logger);
    format = checkFormat(format, logger);

    create(
      environment,
      migration,
      directory,
      logger,
      format
    );
  });

program
  .command("up")
  .description("run outstanding migrations")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --environment [environment]", "node environment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-c, --client [client]", "db client module", "server/db")
  .action(async ({directory, environment, logger, client}) => {
    const up = require("./command/up");

    environment = setEnvironment(environment);
    logger = loadLogger(logger);
    directory = checkDirectory(directory, logger);
    client = loadClient(client, logger);

    await up(
      client,
      directory,
      logger,
      environment
    );
  });

program
  .command("down")
  .description("revert last migrations")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --environment [environment]", "node environment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-l, --client [client]", "db client", "server/db")
  .action(({directory, environment, logger, client}) => {
    const down = require("./command/down");

    environment = setEnvironment(environment);
    logger = loadLogger(logger);
    directory = checkDirectory(directory, logger);
    client = loadClient(client, logger);

    down(
      client,
      directory,
      logger,
      environment
    );
  });

program
  .command("reset")
  .description("run outstanding migrations")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --environment [environment]", "node environment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-l, --client [client]", "db client", "server/db")
  .action(({directory, environment, logger, client}) => {
    const reset = require("./command/reset");

    environment = setEnvironment(environment);
    logger = loadLogger(logger);
    directory = checkDirectory(directory, logger);
    client = loadClient(client, logger);

    reset(
      client,
      directory,
      logger,
      environment
    );
  });


program
  .command("status")
  .description("run outstanding migrations")
  .option("-d, --directory [directory]", "migrations directory", "migrations")
  .option("-e, --environment [environment]", "node environment", "local")
  .option("-l, --logger [logger]", "logger module", "server/logger")
  .option("-l, --client [client]", "db client", "server/db")
  .action(({directory, environment, logger, client}) => {
    const status = require("./command/status");

    environment = setEnvironment(environment);
    logger = loadLogger(logger);
    directory = checkDirectory(directory, logger);
    client = loadClient(client, logger);

    status(
      client,
      directory,
      logger,
      environment
    );
  });

program.parse(process.argv);
