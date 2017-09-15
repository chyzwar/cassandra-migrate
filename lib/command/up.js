"use strict";

/**
 * Run outstanding migrations
 *
 * @param  {Client} client
 * @param  {String} directory
 * @param  {Logger} logger
 */
var up = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client, directory, logger) {
    var schema, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, migration;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            schema = new Schema(client, logger);
            _context.next = 3;
            return schema.connect();

          case 3:
            _context.next = 5;
            return schema.create();

          case 5:
            _context.next = 7;
            return schema.load();

          case 7:
            _context.prev = 7;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 11;
            _iterator = loadMigrations(directory, logger)[Symbol.iterator]();

          case 13:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 23;
              break;
            }

            migration = _step.value;

            if (!(schema.has(migration) === false)) {
              _context.next = 20;
              break;
            }

            _context.next = 18;
            return schema.up(migration);

          case 18:
            _context.next = 20;
            return schema.add(migration);

          case 20:
            _iteratorNormalCompletion = true;
            _context.next = 13;
            break;

          case 23:
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](11);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 29:
            _context.prev = 29;
            _context.prev = 30;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 32:
            _context.prev = 32;

            if (!_didIteratorError) {
              _context.next = 35;
              break;
            }

            throw _iteratorError;

          case 35:
            return _context.finish(32);

          case 36:
            return _context.finish(29);

          case 37:
            _context.next = 42;
            break;

          case 39:
            _context.prev = 39;
            _context.t1 = _context["catch"](7);

            logger.error("Migration failed", {
              error: {
                message: _context.t1.message,
                stack: _context.t1.stack
              }
            });

          case 42:
            exit();

          case 43:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 39], [11, 25, 29, 37], [30,, 32, 36]]);
  }));

  return function up(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var loadMigrations = require("../helpers/loadMigrations");
var Schema = require("../models/Schema");

var _require = require("process"),
    exit = _require.exit;

module.exports = up;