import Logger from "../types/Logger";
import Client from "../types/Client";
/**
 * Run outstanding migrations
 */
declare function down(client: Client, directory: string, logger: Logger): Promise<void>;
export default down;
//# sourceMappingURL=down.d.ts.map