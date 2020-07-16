import Logger from "../types/Logger";
/**
 * Load migration in directory, ignore other files
 *
 */
declare function loadMigrations(directory: string, logger: Logger): import("../types/Migration").default[];
export default loadMigrations;
//# sourceMappingURL=loadMigrations.d.ts.map