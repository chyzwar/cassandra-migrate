const {readFileSync} = require("fs");
const {join} = require("path");

class Migration{
  constructor(filename, directory) {
    /**
     * Get filePath
     * @type {String}
     */
    const filePath = join(directory, filename);

    /**
     * Read migration content
     *
     * @type {String}
     */
    this.content = readFileSync(
      filePath,
      {encoding: "utf8"}
    );

    /**
     * Load migration module
     *
     * @type {Object}
     */
    this.migration = require(
      filePath
    );

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
  static load({filename, timestamp, version}, directory){
    const migration = new Migration(filename, directory);

    migration.timestamp = timestamp;
    migration.version = version;

    return migration;
  }
}


module.exports = Migration;
