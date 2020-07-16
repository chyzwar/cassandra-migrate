import Client from "../types/Client";
import Logger from "../types/Logger";
/**
 * Run outstanding migrations
 *
 * @param  {Client} client
 * @param  {String} directory
 * @param  {Logger} logger
 */
declare function up(client: Client, directory: string, logger: Logger): Promise<void>;
export default up;
//# sourceMappingURL=up.d.ts.map