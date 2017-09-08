const {join, extname} = require("path");
const {readFileSync} = require("fs");

class Migration{
  constructor(filename, directory) {
    /**
     * Get filePath
     * @type {String}
     */
    const filePath = join(directory, filename);
    const extension = extname(filePath);
    /**
     * Set filePath
     *
     * @type {String}
     */
    this.filename = filename;



    if(extname(filePath) === "js"){
      this.loadModule()
    }

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
  }

  /**
   * Load from database object
   *
   * @param  {String} options.filePath
   * @param  {Number} options.timestamp
   * @param  {Number} options.version
   * @return {Migration}
   */
  static fromRow({filename, timestamp, version}, directory){
    const filePath = join(directory, filename);

    const migration = new Migration(filename, directory);

    migration.timestamp = timestamp;
    migration.version = version;

    return migration;
  }

  static fromFile(fileName, directory){
    const filePath = join(directory, filename);

    if(extname(fileName) === "js"){

    }
    if(extname(fileName) === "cql"){

    }
  }
}


module.exports = Migration;
