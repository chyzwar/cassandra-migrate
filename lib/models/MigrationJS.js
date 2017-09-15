"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require("path"),
    join = _require.join;

var _require2 = require("fs"),
    readFileSync = _require2.readFileSync;

var MigrationJS = function () {
  function MigrationJS(filename, content, up, down, timestamp, version) {
    _classCallCheck(this, MigrationJS);

    /**
     * Set filePath
     *
     * @type {String}
     */
    this.filename = filename;

    /**
     * Read migration content
     *
     * @type {String}
     */
    this.content = content;

    /**
     * Up statement
     *
     * @type {Object}
     */
    this.up = up;

    /**
     * Down statement
     *
     * @type {Object}
     */
    this.down = down;

    /**
     * Timestamp of migration
     *
     * @type {Data}
     */
    this.timestamp = timestamp,

    /**
     * Migration schema version
     * @type {Nmber}
     */
    this.version = version;
  }

  _createClass(MigrationJS, null, [{
    key: "fromDB",
    value: function fromDB(_ref, directory) {
      var filename = _ref.filename,
          content = _ref.content,
          timestamp = _ref.timestamp,
          version = _ref.version;

      var filePath = join(directory, filename);

      var _require3 = require(filePath),
          up = _require3.up,
          down = _require3.down;

      return new MigrationJS(filename, content, up, down, timestamp, version);
    }
  }, {
    key: "fromFile",
    value: function fromFile(filename, directory) {
      var filePath = join(directory, filename);
      var content = readFileSync(filePath);

      var _require4 = require(filePath),
          up = _require4.up,
          down = _require4.down;

      return new MigrationJS(filename, content, up, down);
    }
  }]);

  return MigrationJS;
}();

module.exports = MigrationJS;