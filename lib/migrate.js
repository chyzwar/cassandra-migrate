"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var loadClient = require("./helpers/loadClient");
var checkDirectory = require("./helpers/checkDirectory");
var loadLogger = require("./helpers/loadLogger");
var program = require("commander");
var setEnvirotment = require("./helpers/setEnvirotment");
var validateName = require("./helpers/validateName");

program.version("0.2.1").description("Cassandra migration tool");

program.command("create <migration>").description("create new migration").option("-d, --directory [directory]", "migrations directory", "migrations").option("-e, --envirotment [envirotment]", "node envirotment", "local").option("-l, --logger [logger]", "logger module", "server/logger").action(function (migration, _ref) {
  var directory = _ref.directory,
      envirotment = _ref.envirotment,
      logger = _ref.logger;

  var create = require("./command/create");

  envirotment = setEnvirotment(envirotment);
  logger = loadLogger(logger);
  migration = validateName(migration, logger);
  directory = checkDirectory(directory, logger);

  create(envirotment, migration, directory, logger);
});

program.command("up").description("run outstanding migrations").option("-d, --directory [directory]", "migrations directory", "migrations").option("-e, --envirotment [envirotment]", "node envirotment", "local").option("-l, --logger [logger]", "logger module", "server/logger").option("-l, --client [client]", "db client", "server/db").action(function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var directory = _ref2.directory,
        envirotment = _ref2.envirotment,
        logger = _ref2.logger,
        client = _ref2.client;
    var up;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            up = require("./command/up");


            envirotment = setEnvirotment(envirotment);
            logger = loadLogger(logger);
            directory = checkDirectory(directory, logger);
            client = loadClient(client, logger);

            _context.next = 7;
            return up(client, directory, logger, envirotment);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}());

program.command("down").description("revert last migrations").option("-d, --directory [directory]", "migrations directory", "migrations").option("-e, --envirotment [envirotment]", "node envirotment", "local").option("-l, --logger [logger]", "logger module", "server/logger").option("-l, --client [client]", "db client", "server/db").action(function (_ref4) {
  var directory = _ref4.directory,
      envirotment = _ref4.envirotment,
      logger = _ref4.logger,
      client = _ref4.client;

  var down = require("./command/down");

  envirotment = setEnvirotment(envirotment);
  logger = loadLogger(logger);
  directory = checkDirectory(directory, logger);
  client = loadClient(client, logger);

  down(client, directory, logger, envirotment);
});

program.command("reset").description("run outstanding migrations").option("-d, --directory [directory]", "migrations directory", "migrations").option("-e, --envirotment [envirotment]", "node envirotment", "local").option("-l, --logger [logger]", "logger module", "server/logger").option("-l, --client [client]", "db client", "server/db").action(function (_ref5) {
  var directory = _ref5.directory,
      envirotment = _ref5.envirotment,
      logger = _ref5.logger,
      client = _ref5.client;

  var reset = require("./command/reset");

  envirotment = setEnvirotment(envirotment);
  logger = loadLogger(logger);
  directory = checkDirectory(directory, logger);
  client = loadClient(client, logger);

  reset(client, directory, logger, envirotment);
});

program.command("status").description("run outstanding migrations").option("-d, --directory [directory]", "migrations directory", "migrations").option("-e, --envirotment [envirotment]", "node envirotment", "local").option("-l, --logger [logger]", "logger module", "server/logger").option("-l, --client [client]", "db client", "server/db").action(function (_ref6) {
  var directory = _ref6.directory,
      envirotment = _ref6.envirotment,
      logger = _ref6.logger,
      client = _ref6.client;

  var status = require("./command/status");

  envirotment = setEnvirotment(envirotment);
  logger = loadLogger(logger);
  directory = checkDirectory(directory, logger);
  client = loadClient(client, logger);

  status(client, directory, logger, envirotment);
});

program.parse(process.argv);