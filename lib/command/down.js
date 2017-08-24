"use strict";

/**
 * Run outstanding migrations
 *
 * @param  {Client} client
 * @param  {String} directory
 * @param  {Logger} logger
 */
var down = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client, directory, logger) {
    var schema, migrations, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, migration;

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
            migrations = schema.getMigrations(directory);
            _context.prev = 8;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;
            _iterator = migrations[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 24;
              break;
            }

            migration = _step.value;

            if (!schema.isRecent(migration)) {
              _context.next = 21;
              break;
            }

            _context.next = 19;
            return schema.down(migration);

          case 19:
            _context.next = 21;
            return schema.remove(migration);

          case 21:
            _iteratorNormalCompletion = true;
            _context.next = 14;
            break;

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 30:
            _context.prev = 30;
            _context.prev = 31;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 33:
            _context.prev = 33;

            if (!_didIteratorError) {
              _context.next = 36;
              break;
            }

            throw _iteratorError;

          case 36:
            return _context.finish(33);

          case 37:
            return _context.finish(30);

          case 38:
            _context.next = 43;
            break;

          case 40:
            _context.prev = 40;
            _context.t1 = _context["catch"](8);

            logger.error("Migration failed", { error: _context.t1 });

          case 43:
            exit();

          case 44:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 40], [12, 26, 30, 38], [31,, 33, 37]]);
  }));

  return function down(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Schema = require("../models/Schema");

var _require = require("process"),
    exit = _require.exit;

module.exports = down;