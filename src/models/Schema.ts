import Client from "../types/Client";
import Logger from "../types/Logger";
import MigrationFactory from "./MigrationFactory";
import {exit} from "process";
import {last} from "lodash";
import Migration from "../types/Migration";
import PersistedMigration from "../types/SavedMigration";

const createSchemaType =
`
CREATE TYPE IF NOT EXISTS schema_migration (
  filename text,
  content text,
  version int,
  timestamp int,
);`;

const createSchemaTable =
`
CREATE TABLE IF NOT EXISTS schema_migration (
  filename text,
  content text,
  version int,
  timestamp timestamp,
  PRIMARY KEY(filename)
);`;

const selectSchemaTable =
`
SELECT * FROM schema_migration
`;

const removeMigration =
`
DELETE FROM schema_migration WHERE filename = ?
`;



class Schema{
  private client: Client;
  private logger: Logger;
  private migrations!: PersistedMigration[];

  constructor(client: Client, logger: Logger) {
    /**
     * Cassandra Client
     *
     * @type {Client}
     */
    this.client = client;

    /**
     * Logger
     *
     * @type {Logger}
     */
    this.logger = logger;
  }

  /**
   * Connect to Cassandra
   */
  async connect(){
    try{
      await this.client.connect();
    }
    catch(error){
      this.logger.error("Error connecting cassandra", {error});
      exit();
    }
  }

  /**
   * Create schema table
   *
   * @return {void}
   */
  async create(){
    try{
      await this.client.execute(
        createSchemaType, {prepare: true}
      );
      await this.client.execute(
        createSchemaTable, {prepare: true}
      );
    }
    catch(error){
      this.logger.error("Error creating schema", {error});
      exit();
    }
  }

  /**
   * Load migrations table
   *
   * @return {Array}
   */
  async load(){
    try {
      const { rows } = await this.client.execute(
        selectSchemaTable, {
          prepare: true
        }
      )
      this.migrations = rows;
    }
    catch(error){
      this.logger.error("Error reading schema", {error});
      exit();
    }
  }

  /**
   * Check if migration exist in schema
   */
  has({filename}: Migration){
    return this
      .migrations
      .some(migration => migration.filename === filename);
  }

  /**
   * Check if migration is recent
   *
   */
  isRecent({version}: Migration){
    return this.getVersion() === version;
  }

  /**
   * Get migrations
   */
  getMigrations(directory: string){
    return this.migrations
      .map(migration => MigrationFactory.fromDB(migration, directory));
  }


  /**
   * Get schema version
   *
   * @return {Number}
   */
  getVersion(){
    const migration = last(this.migrations);
    return migration?.version ?? 0;
  }

  /**
   * Run up statement migration
   *
   */
  async up(migration: Migration){
    migration.timestamp = Date.now();

    const {
      up: {
        query,
        params
      },
      filename
    } = migration;

    await this
      .client
      .execute(query, params, {prepare: true});

    this.logger.info("Up - Migration successful", {filename});
  }

  /**
   * Run down statement in migration
   */
  async down(migration: Migration){
    const {
      down: {
        query,
        params
      },
      filename
    } = migration;

    await this
      .client
      .execute(query, params, {prepare: true});

    this.logger.info("Down - Migration successful", {filename});
  }

  /**
   * Add migration to schema
   *
   */
  async add(migration: Migration){
    migration.version = this.getVersion() + 1;

    const query = `
      INSERT INTO schema_migration
        (
          filename,
          content,
          version,
          timestamp
        )
      VALUES (?, ?, ?, ?)`;

    const params = [
      migration.filename,
      migration.content,
      migration.version,
      migration.timestamp
    ];

    await this
      .client
      .execute(query, params, {prepare: true});
  }

  /**
   * Remove migration from schema
   */
  async remove({filename}: Migration){
    try{
      await this.client.execute(removeMigration, [filename]);
    }
    catch(error){
      this.logger.error("Remove failed", {error});
      exit();
    }
  }
}

export default Schema;
