"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MigrationFactory_1 = __importDefault(require("./MigrationFactory"));
const process_1 = require("process");
const lodash_1 = require("lodash");
const createSchemaType = `
CREATE TYPE IF NOT EXISTS schema_migration (
  filename text,
  content text,
  version int,
  timestamp int,
);`;
const createSchemaTable = `
CREATE TABLE IF NOT EXISTS schema_migration (
  filename text,
  content text,
  version int,
  timestamp timestamp,
  PRIMARY KEY(filename)
);`;
const selectSchemaTable = `
SELECT * FROM schema_migration
`;
const removeMigration = `
DELETE FROM schema_migration WHERE filename = ?
`;
class Schema {
    constructor(client, logger) {
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
    async connect() {
        try {
            await this.client.connect();
        }
        catch (error) {
            this.logger.error("Error connecting cassandra", { error });
            process_1.exit();
        }
    }
    /**
     * Create schema table
     *
     * @return {void}
     */
    async create() {
        try {
            await this.client.execute(createSchemaType, { prepare: true });
            await this.client.execute(createSchemaTable, { prepare: true });
        }
        catch (error) {
            this.logger.error("Error creating schema", { error });
            process_1.exit();
        }
    }
    /**
     * Load migrations table
     *
     * @return {Array}
     */
    async load() {
        try {
            const { rows } = await this.client.execute(selectSchemaTable, {
                prepare: true
            });
            this.migrations = rows;
        }
        catch (error) {
            this.logger.error("Error reading schema", { error });
            process_1.exit();
        }
    }
    /**
     * Check if migration exist in schema
     */
    has({ filename }) {
        return this
            .migrations
            .some(migration => migration.filename === filename);
    }
    /**
     * Check if migration is recent
     *
     */
    isRecent({ version }) {
        return this.getVersion() === version;
    }
    /**
     * Get migrations
     */
    getMigrations(directory) {
        return this.migrations
            .map(migration => MigrationFactory_1.default.fromDB(migration, directory));
    }
    /**
     * Get schema version
     *
     * @return {Number}
     */
    getVersion() {
        var _a;
        const migration = lodash_1.last(this.migrations);
        return (_a = migration === null || migration === void 0 ? void 0 : migration.version) !== null && _a !== void 0 ? _a : 0;
    }
    /**
     * Run up statement migration
     *
     */
    async up(migration) {
        migration.timestamp = Date.now();
        const { up: { query, params }, filename } = migration;
        await this
            .client
            .execute(query, params, { prepare: true });
        this.logger.info("Up - Migration successful", { filename });
    }
    /**
     * Run down statement in migration
     */
    async down(migration) {
        const { down: { query, params }, filename } = migration;
        await this
            .client
            .execute(query, params, { prepare: true });
        this.logger.info("Down - Migration successful", { filename });
    }
    /**
     * Add migration to schema
     *
     */
    async add(migration) {
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
            .execute(query, params, { prepare: true });
    }
    /**
     * Remove migration from schema
     */
    async remove({ filename }) {
        try {
            await this.client.execute(removeMigration, [filename]);
        }
        catch (error) {
            this.logger.error("Remove failed", { error });
            process_1.exit();
        }
    }
}
exports.default = Schema;
