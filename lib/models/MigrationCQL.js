"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function requireCQL(filePath) {
  var lines = readFileSync(filePath).split(/\r?\n/);

  var upStartLine = lines.findIndex(function (line) {
    return line.includes("-- up");
  });
  var dwStartLine = lines.findIndex(function (line) {
    return line.includes("-- down");
  });

  return {
    up: { query: lines.slice(upStartLine, dwStartLine).join(), params: undefined },
    down: { query: lines.slice(upStartLine).join(), params: undefined }
  };
}

var MigrationCQL = function () {
  function MigrationCQL(filename, content, up, down, timestamp, version) {
    _classCallCheck(this, MigrationCQL);

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

  _createClass(MigrationCQL, null, [{
    key: "fromDB",
    value: function fromDB(_ref, directory) {
      var filename = _ref.filename,
          content = _ref.content,
          timestamp = _ref.timestamp,
          version = _ref.version;

      var filePath = join(directory, filename);

      var _requireCQL = requireCQL(filePath),
          up = _requireCQL.up,
          down = _requireCQL.down;

      return new MigrationCQL(filename, content, up, down, timestamp, version);
    }
  }, {
    key: "fromFile",
    value: function fromFile() {
      var filePath = join(directory, filename);
      var content = readFileSync(filePath);

      var _requireCQL2 = requireCQL(filePath),
          up = _requireCQL2.up,
          down = _requireCQL2.down;

      return new MigrationCQL(filename, content, up, down);
    }
  }]);

  return MigrationCQL;
}();

module.exports = MigrationCQL;