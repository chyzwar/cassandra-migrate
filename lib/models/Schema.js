"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require("process"),
    exit = _require.exit;

var MigrationFactory = require("./MigrationFactory");

var _require2 = require("lodash"),
    last = _require2.last;

var createSchemaType = `
CREATE TYPE IF NOT EXISTS schema_migration (
  filename text,
  content text,
  version int,
  timestamp int,
);`;

var createSchemaTable = `
CREATE TABLE IF NOT EXISTS schema_migration (
  filename text,
  content text,
  version int,
  timestamp timestamp,
  PRIMARY KEY(filename)
);`;

var selectSchemaTable = `
SELECT * FROM schema_migration
`;

var removeMigration = `
DELETE FROM schema_migration WHERE filename = ?
`;

var Schema = function () {
  function Schema(client, logger) {
    _classCallCheck(this, Schema);

    /**
     * Cassandra Client
     *
     * @type {Client}
     */
    this.client = client;

    /**
     * Logger
     *
     * @type {Logger}
     */
    this.logger = logger;
  }

  /**
   * Connect to Cassandra
   */


  _createClass(Schema, [{
    key: "connect",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.client.connect();

              case 3:
                _context.next = 9;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);

                this.logger.error("Error connecting cassandra", { error: _context.t0 });
                exit();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()

    /**
     * Create schema table
     *
     * @return {void}
     */

  }, {
    key: "create",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.client.execute(createSchemaType, { prepare: true });

              case 3:
                _context2.next = 5;
                return this.client.execute(createSchemaTable, { prepare: true });

              case 5:
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);

                this.logger.error("Error creating schema", { error: _context2.t0 });
                exit();

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function create() {
        return _ref2.apply(this, arguments);
      }

      return create;
    }()

    /**
     * Load migrations table
     *
     * @return {Array}
     */

  }, {
    key: "load",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.client.execute(selectSchemaTable, { prepare: true });

              case 3:
                this.migrations = _context3.sent;
                _context3.next = 10;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);

                this.logger.error("Error reading schema", { error: _context3.t0 });
                exit();

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 6]]);
      }));

      function load() {
        return _ref3.apply(this, arguments);
      }

      return load;
    }()

    /**
     * Chceck if migration exist in schema
     *
     * @param  {String}  migration.filename
     * @return {Boolean}
     */

  }, {
    key: "has",
    value: function has(_ref4) {
      var filename = _ref4.filename;

      return this.migrations.rows.some(function (migration) {
        return migration.filename === filename;
      });
    }

    /**
     * Check if migration is recent
     *
     * @param  {Number} options.version
     * @return {Boolean}
     */

  }, {
    key: "isRecent",
    value: function isRecent(_ref5) {
      var version = _ref5.version;

      return this.getVersion() === version;
    }

    /**
     * Get migrations
     *
     * @return {Migrations}
     */

  }, {
    key: "getMigrations",
    value: function getMigrations(directory) {
      return this.migrations.rows.map(function (migration) {
        return MigrationFactory.fromDB(migration, directory);
      });
    }

    /**
     * Get schema version
     *
     * @return {Number}
     */

  }, {
    key: "getVersion",
    value: function getVersion() {
      var migration = last(this.migrations.rows);

      if (migration) {
        return migration.version;
      } else {
        return 0;
      }
    }

    /**
     * Run up statement migration
     *
     * @param  {Migration} migration
     * @return {void}
     */

  }, {
    key: "up",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(migration) {
        var _migration$up, query, params, filename;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                migration.timestamp = new Date();

                _migration$up = migration.up, query = _migration$up.query, params = _migration$up.params, filename = migration.filename;
                _context4.next = 4;
                return this.client.execute(query, params, { prepare: true });

              case 4:

                this.logger.info("Up - Migration succesfull", { filename });

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function up(_x) {
        return _ref6.apply(this, arguments);
      }

      return up;
    }()

    /**
     * Run down statement in migration
     *
     * @param  {Migration} migration
     * @return {void}
     */

  }, {
    key: "down",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(migration) {
        var _migration$down, query, params, filename;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _migration$down = migration.down, query = _migration$down.query, params = _migration$down.params, filename = migration.filename;
                _context5.next = 3;
                return this.client.execute(query, params, { prepare: true });

              case 3:

                this.logger.info("Down - Migration succesfull", { filename });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function down(_x2) {
        return _ref7.apply(this, arguments);
      }

      return down;
    }()

    /**
     * Migration history for current version
     *
     * @return {Array}
     */

  }, {
    key: "getHistory",
    value: function getHistory() {
      return this.history || (this.history = []);
    }

    /**
     * Add migration to schema
     *
     * @param {Migration} migration
     */

  }, {
    key: "add",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(migration) {
        var query, params;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                migration.version = this.getVersion() + 1;

                this.getHistory().push(migration);

                query = `
      INSERT INTO schema_migration
        (
          filename,
          content,
          version,
          timestamp
        )
      VALUES (?, ?, ?, ?)`;
                params = [migration.filename, migration.content, migration.version, migration.timestamp];
                _context6.next = 6;
                return this.client.execute(query, params, { prepare: true });

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function add(_x3) {
        return _ref8.apply(this, arguments);
      }

      return add;
    }()

    /**
     * Remove migration from schema
     *
     * @param  {Migration} migration
     */

  }, {
    key: "remove",
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref9) {
        var filename = _ref9.filename;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this.client.execute(removeMigration, [filename]);

              case 3:
                _context7.next = 9;
                break;

              case 5:
                _context7.prev = 5;
                _context7.t0 = _context7["catch"](0);

                this.logger.error("Remove failed", { error: _context7.t0 });
                exit();

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 5]]);
      }));

      function remove(_x4) {
        return _ref10.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return Schema;
}();

module.exports = Schema;