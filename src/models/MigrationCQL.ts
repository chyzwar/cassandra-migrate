import { readFileSync } from "fs";
import { join } from "path";
import Migration from "../types/Migration";
import Run from "../types/Run";
import PersistedMigration from "../types/SavedMigration";


function requireCQL(filePath: string): {up: Run, down: Run} {
  const lines = readFileSync(filePath)
    .toString()
    .split(/\r?\n/);

  const upStartLine = lines.findIndex((line) => line.includes("-- up"));
  const dwStartLine = lines.findIndex((line) => line.includes("-- down"));

  return {
    up: {query: lines.slice(upStartLine, dwStartLine).join(), params: undefined},
    down: {query: lines.slice(upStartLine).join(), params: undefined}
  };
}


class MigrationCQL implements Migration{
  filename: string;
  content: string;
  timestamp?: number;
  version?: number;
  up: Run;
  down: Run;

  constructor(filename: string, content: string, up: Run, down: Run, timestamp?: number, version?: number){
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
     */
    this.version = version
  }

  static fromDB({filename, content, timestamp, version}: PersistedMigration, directory: string){
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

  static fromFile(filename: string, directory: string): Migration{
    const filePath = join(directory, filename);
    const content = readFileSync(filePath).toString();

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

export default MigrationCQL;
