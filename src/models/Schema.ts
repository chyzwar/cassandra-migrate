import Client from "../types/Client";
import Logger from "../types/Logger";
import MigrationFactory from "./MigrationFactory";
import {exit} from "process";
import {last} from "lodash";
import Migration from "../types/Migration";

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


interface Migration{

}

class Schema{
  private client: Client;
  private logger: Logger;
  private migrations!: MigrationDB[];

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
      this.migrations = await this.client.execute(
        selectSchemaTable, {prepare: true}
      );
    }
    catch(error){
      this.logger.error("Error reading schema", {error});
      exit();
    }
  }

  /**
   * Check if migration exist in schema
   */
  has({filename}){
    return this
      .migrations
      .rows
      .some(migration => migration.filename === filename);
  }

  /**
   * Check if migration is recent
   *
   */
  isRecent({version}){
    return this.getVersion() === version;
  }

  /**
   * Get migrations
   */
  getMigrations(directory){
    return this.migrations
      .rows
      .map(migration => MigrationFactory.fromDB(migration, directory));
  }


  /**
   * Get schema version
   *
   * @return {Number}
   */
  getVersion(){
    const migration = last(this.migrations.rows);

    if(migration){
      return migration.version;
    }
    else {
      return 0;
    }
  }

  /**
   * Run up statement migration
   *
   * @param  {Migration} migration
   * @return {void}
   */
  async up(migration){
    migration.timestamp = new Date();

    const {
      up: {
        query,
        params
      },
      filename
    } = migration;

    await this.client
      .execute(query, params, {prepare: true});

    this.logger.info("Up - Migration successfull", {filename});
  }

  /**
   * Run down statement in migration
   *
   * @param  {Migration} migration
   * @return {void}
   */
  async down(migration){
    const {
      down: {
        query,
        params
      },
      filename
    } = migration;

    await this.client
      .execute(query, params, {prepare: true});

    this.logger.info("Down - Migration succesfull", {filename});
  }

  /**
   * Migration history for current version
   *
   * @return {Array}
   */
  getHistory(){
    return this.history || (this.history = []);
  }

  /**
   * Add migration to schema
   *
   * @param {Migration} migration
   */
  async add(migration){
    migration.version = this.getVersion() + 1;

    this.getHistory().push(migration);

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
   *
   * @param  {Migration} migration
   */
  async remove({filename}){
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
