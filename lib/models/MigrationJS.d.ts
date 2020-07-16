import Migration from "../types/Migration";
import PersistedMigration from "../types/SavedMigration";
import Run from "../types/Run";
declare class MigrationJS implements Migration {
    filename: string;
    content: string;
    timestamp?: number;
    version?: number;
    up: Run;
    down: Run;
    constructor(filename: string, content: string, up: Run, down: Run, timestamp?: number, version?: number);
    static fromDB({ filename, content, timestamp, version }: PersistedMigration, directory: string): Migration;
    static fromFile(filename: string, directory: string): Migration;
}
export default MigrationJS;
//# sourceMappingURL=MigrationJS.d.ts.map