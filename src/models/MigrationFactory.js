const MigrationJS = require("./MigrationJS");
const MigrationCQL = require("./MigrationCQL");
const {extname} = require("path");

class MigrationFactory{
  /**
   * Create Migration from DB record
   *
   * @param  {Object} migration
   * @param  {String} directory
   * @return {Migration}
   */
  static fromDB(migration, directory){
    const extension = extname(migration.filename);

    if(extension === "JS"){
      return MigrationJS.fromDB(migration, directory);
    }
    if(extension === "CQL"){
      return MigrationCQL.fromDB(migration, directory);
    }

    throw new Error(
      "Unknown migration extension", {extension}
    );
  }

  /**
   * Create Migration from file
   * @param  {String} filename
   * @param  {String} directory
   * @return {Migration}
   */
  static fromFile(filename, directory){
    const extension = extname(filename);

    if(extension === "JS"){
      return MigrationJS.fromFile(filename, directory);
    }
    if(extension === "CQL"){
      return MigrationCQL.fromFile(filename, directory);
    }

    throw new Error(
      "Unknown migration extension", {extension}
    );
  }
}

module.exports = MigrationFactory;
