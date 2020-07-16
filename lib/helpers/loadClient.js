"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
/**
 * Require cassandra client
 */
function loadClient(clientPath, logger) {
    const path = path_1.resolve(clientPath);
    try {
        return require(path);
    }
    catch (error) {
        logger.error("Unable to require client", { clientPath, error });
        process_1.exit();
    }
}
exports.default = loadClient;
