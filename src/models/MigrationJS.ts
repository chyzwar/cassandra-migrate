import {join} from "path";
import {readFileSync} from "fs";
import Migration from "../types/Migration";
import PersistedMigration from "../types/SavedMigration";
import Run from "../types/Run";

class MigrationJS implements Migration{
  filename: string;
  content: string;
  timestamp?: number;
  version?: number;
  up: Run;
  down: Run;

  constructor(filename: string, content: string, up: Run, down: Run, timestamp?: number, version?: number) {
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
     */
    this.up = up;

    /**
     * Down statement
     */
    this.down = down;

    /**
     * Timestamp of migration
     */
    this.timestamp = timestamp,

    /**
     * Migration schema version
     * @type {Number}
     */
    this.version = version
  }

  static fromDB({filename, content, timestamp, version}: PersistedMigration, directory: string): Migration{
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

  static fromFile(filename: string, directory: string): Migration{
    const filePath = join(directory, filename);
    const content = readFileSync(filePath).toString();

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
