import Migration from "../types/Migration";
import MigrationJS from "./MigrationJS";
import MigrationCQL from "./MigrationCQL";
import {extname} from "path";

class MigrationFactory{
  /**
   * Create Migration from DB record
   *
   * @param  {Object} migration
   * @param  {String} directory
   * @return {Migration}
   */
  static fromDB(migration: Migration, directory: string): Migration{
    const extension = extname(migration.filename);

    if(extension === "JS"){
      return MigrationJS.fromDB(migration, directory);
    }
    if(extension === "CQL"){
      return MigrationCQL.fromDB(migration, directory);
    }

    throw new Error(
      `Unknown migration extension: ${extension}`
    );
  }

  /**
   * Create Migration from file
   * @param  {String} filename
   * @param  {String} directory
   * @return {Migration}
   */
  static fromFile(filename: string, directory: string): Migration{
    const extension = extname(filename);

    if(extension === "JS"){
      return MigrationJS.fromFile(filename, directory);
    }
    if(extension === "CQL"){
      return MigrationCQL.fromFile(filename, directory);
    }

    throw new Error(
      `Unknown migration extension: ${extension}`
    );
  }
}

export default MigrationFactory;
