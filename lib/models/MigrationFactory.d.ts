import Migration from "../types/Migration";
import PersistedMigration from "../types/SavedMigration";
declare class MigrationFactory {
    /**
     * Create Migration from DB record
     *
     * @param  {Object} migration
     * @param  {String} directory
     * @return {Migration}
     */
    static fromDB(migration: PersistedMigration, directory: string): Migration;
    /**
     * Create Migration from file
     * @param  {String} filename
     * @param  {String} directory
     * @return {Migration}
     */
    static fromFile(filename: string, directory: string): Migration;
}
export default MigrationFactory;
//# sourceMappingURL=MigrationFactory.d.ts.map