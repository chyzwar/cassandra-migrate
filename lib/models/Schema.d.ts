import Client from "../types/Client";
import Logger from "../types/Logger";
import Migration from "../types/Migration";
declare class Schema {
    private client;
    private logger;
    private migrations;
    constructor(client: Client, logger: Logger);
    /**
     * Connect to Cassandra
     */
    connect(): Promise<void>;
    /**
     * Create schema table
     *
     * @return {void}
     */
    create(): Promise<void>;
    /**
     * Load migrations table
     *
     * @return {Array}
     */
    load(): Promise<void>;
    /**
     * Check if migration exist in schema
     */
    has({ filename }: Migration): boolean;
    /**
     * Check if migration is recent
     *
     */
    isRecent({ version }: Migration): boolean;
    /**
     * Get migrations
     */
    getMigrations(directory: string): Migration[];
    /**
     * Get schema version
     *
     * @return {Number}
     */
    getVersion(): number;
    /**
     * Run up statement migration
     *
     */
    up(migration: Migration): Promise<void>;
    /**
     * Run down statement in migration
     */
    down(migration: Migration): Promise<void>;
    /**
     * Add migration to schema
     *
     */
    add(migration: Migration): Promise<void>;
    /**
     * Remove migration from schema
     */
    remove({ filename }: Migration): Promise<void>;
}
export default Schema;
//# sourceMappingURL=Schema.d.ts.map