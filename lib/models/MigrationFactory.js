"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MigrationJS = require("./MigrationJS");
var MigrationCQL = require("./MigrationCQL");

var _require = require("path"),
    extname = _require.extname;

var MigrationFactory = function () {
  function MigrationFactory() {
    _classCallCheck(this, MigrationFactory);
  }

  _createClass(MigrationFactory, null, [{
    key: "fromDB",

    /**
     * Create Migration from DB record
     *
     * @param  {Object} migration
     * @param  {String} directory
     * @return {Migration}
     */
    value: function fromDB(migration, directory) {
      var extension = extname(migration.filename);

      if (extension === "JS") {
        return MigrationJS.fromDB(migration, directory);
      }
      if (extension === "CQL") {
        return MigrationCQL.fromDB(migration, directory);
      }

      throw new Error("Unknown migration extension", { extension });
    }

    /**
     * Create Migration from file
     * @param  {String} filename
     * @param  {String} directory
     * @return {Migration}
     */

  }, {
    key: "fromFile",
    value: function fromFile(filename, directory) {
      var extension = extname(filename);

      if (extension === "JS") {
        return MigrationJS.fromFile(filename, directory);
      }
      if (extension === "CQL") {
        return MigrationCQL.fromFile(filename, directory);
      }

      throw new Error("Unknown migration extension", { extension });
    }
  }]);

  return MigrationFactory;
}();

module.exports = MigrationFactory;