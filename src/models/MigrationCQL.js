
function requireCQL(filePath){
  const content = readFileSync(filePath);

  const up =  content.split("-- up")

  return {up, down};
}


class MigrationCQL
  constructor(filename, content, up, down, timestamp, version){
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
    this.content = content

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
    this.version = version
  }

  static fromDB({filename, content, timestamp, version}, directory){
    const filePath = join(directory, filename);

    const {
      up,
      down
    } = requireCQL(filePath);

    return new MigrationCQL(
      filename,
      content,
      up,
      down,
      timestamp,
      version,
    );
  }

  static fromFile(){
    const filePath = join(directory, filename);
    const content = readFileSync(filePath);

    const {
      up,
      down
    } = requireCQL(filePath);

    return new MigrationCQL(
      filename,
      content,
      up,
      down
    );
  }
}

module.exports = MigrationCQL;
