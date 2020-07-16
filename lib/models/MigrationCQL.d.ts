import Migration from "../types/Migration";
import Run from "../types/Run";
import PersistedMigration from "../types/SavedMigration";
declare class MigrationCQL implements Migration {
    filename: string;
    content: string;
    timestamp?: number;
    version?: number;
    up: Run;
    down: Run;
    constructor(filename: string, content: string, up: Run, down: Run, timestamp?: number, version?: number);
    static fromDB({ filename, content, timestamp, version }: PersistedMigration, directory: string): MigrationCQL;
    static fromFile(filename: string, directory: string): Migration;
}
export default MigrationCQL;
//# sourceMappingURL=MigrationCQL.d.ts.map