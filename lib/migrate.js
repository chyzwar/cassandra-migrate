"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadClient_1 = __importDefault(require("./helpers/loadClient"));
const checkDirectory_1 = __importDefault(require("./helpers/checkDirectory"));
const loadLogger_1 = __importDefault(require("./helpers/loadLogger"));
const commander_1 = __importDefault(require("commander"));
const setEnvironment_1 = __importDefault(require("./helpers/setEnvironment"));
const validateName_1 = __importDefault(require("./helpers/validateName"));
const checkFormat_1 = __importDefault(require("./helpers/checkFormat"));
commander_1.default
    .version("0.2.1")
    .description("Cassandra migration tool");
commander_1.default
    .command("create <migration>")
    .description("create new migration")
    .option("-d, --directory [directory]", "migrations directory", "migrations")
    .option("-e, --environment [environment]", "node environment", "local")
    .option("-l, --logger [logger]", "logger module", "server/logger")
    .option("-f, --format [format]", "migration format", "cql")
    .action((migration, { directory, environment, logger, format }) => {
    const create = require("./command/create");
    environment = setEnvironment_1.default(environment);
    logger = loadLogger_1.default(logger);
    migration = validateName_1.default(migration, logger);
    directory = checkDirectory_1.default(directory, logger);
    format = checkFormat_1.default(format, logger);
    create(environment, migration, directory, logger, format);
});
commander_1.default
    .command("up")
    .description("run outstanding migrations")
    .option("-d, --directory [directory]", "migrations directory", "migrations")
    .option("-e, --environment [environment]", "node environment", "local")
    .option("-l, --logger [logger]", "logger module", "server/logger")
    .option("-c, --client [client]", "db client module", "server/db")
    .action(async ({ directory, environment, logger, client }) => {
    const up = require("./command/up");
    environment = setEnvironment_1.default(environment);
    logger = loadLogger_1.default(logger);
    directory = checkDirectory_1.default(directory, logger);
    client = loadClient_1.default(client, logger);
    await up(client, directory, logger, environment);
});
commander_1.default
    .command("down")
    .description("revert last migrations")
    .option("-d, --directory [directory]", "migrations directory", "migrations")
    .option("-e, --environment [environment]", "node environment", "local")
    .option("-l, --logger [logger]", "logger module", "server/logger")
    .option("-l, --client [client]", "db client", "server/db")
    .action(({ directory, environment, logger, client }) => {
    const down = require("./command/down");
    environment = setEnvironment_1.default(environment);
    logger = loadLogger_1.default(logger);
    directory = checkDirectory_1.default(directory, logger);
    client = loadClient_1.default(client, logger);
    down(client, directory, logger, environment);
});
commander_1.default
    .command("reset")
    .description("run outstanding migrations")
    .option("-d, --directory [directory]", "migrations directory", "migrations")
    .option("-e, --environment [environment]", "node environment", "local")
    .option("-l, --logger [logger]", "logger module", "server/logger")
    .option("-l, --client [client]", "db client", "server/db")
    .action(({ directory, environment, logger, client }) => {
    const reset = require("./command/reset");
    environment = setEnvironment_1.default(environment);
    logger = loadLogger_1.default(logger);
    directory = checkDirectory_1.default(directory, logger);
    client = loadClient_1.default(client, logger);
    reset(client, directory, logger, environment);
});
commander_1.default
    .command("status")
    .description("run outstanding migrations")
    .option("-d, --directory [directory]", "migrations directory", "migrations")
    .option("-e, --environment [environment]", "node environment", "local")
    .option("-l, --logger [logger]", "logger module", "server/logger")
    .option("-l, --client [client]", "db client", "server/db")
    .action(({ directory, environment, logger, client }) => {
    const status = require("./command/status");
    environment = setEnvironment_1.default(environment);
    logger = loadLogger_1.default(logger);
    directory = checkDirectory_1.default(directory, logger);
    client = loadClient_1.default(client, logger);
    status(client, directory, logger, environment);
});
commander_1.default.parse(process.argv);
