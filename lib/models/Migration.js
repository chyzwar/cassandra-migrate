"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require("fs"),
    readFileSync = _require.readFileSync;

var _require2 = require("path"),
    join = _require2.join;

var Migration = function () {
  function Migration(filename, directory) {
    _classCallCheck(this, Migration);

    /**
     * Get filePath
     * @type {String}
     */
    var filePath = join(directory, filename);

    /**
     * Read migration content
     *
     * @type {String}
     */
    this.content = readFileSync(filePath, { encoding: "utf8" });

    /**
     * Load migration module
     *
     * @type {Object}
     */
    this.migration = require(filePath);

    /**
     * Set filePath
     *
     * @type {String}
     */
    this.filename = filename;
  }

  /**
   * Load from database object
   *
   * @param  {String} options.filePath
   * @param  {Number} options.timestamp
   * @param  {Number} options.version
   * @return {Migration}
   */


  _createClass(Migration, null, [{
    key: "load",
    value: function load(_ref, directory) {
      var filename = _ref.filename,
          timestamp = _ref.timestamp,
          version = _ref.version;

      var migration = new Migration(filename, directory);

      migration.timestamp = timestamp;
      migration.version = version;

      return migration;
    }
  }]);

  return Migration;
}();

module.exports = Migration;