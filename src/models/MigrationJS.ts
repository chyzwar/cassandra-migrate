import {join} from "path";
import {readFileSync} from "fs";
import Migration from "../types/Migration";

class MigrationJS implements Migration{
  constructor(filename, content, up: string, down: string, timestamp, version) {
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
     * @type {Number}
     */
    this.version = version
  }
  filename: string;
  content: string;
  timestamp: number;
  version: string;

  static fromDB({filename, content, timestamp, version}: Migration, directory: string){
    const filePath = join(directory, filename);

    const {
      up,
      down
    } = require(filePath);

    return new MigrationJS(
      filename,
      content,
      up,
      down,
      timestamp,
      version,
    );
  }

  static fromFile(filename: string, directory: string){
    const filePath = join(directory, filename);
    const content = readFileSync(filePath);

    const {
      up,
      down
    } = require(filePath);

    return new MigrationJS(
      filename,
      content,
      up,
      down
    );
  }
}


export default MigrationJS;
