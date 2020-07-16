"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
/**
 * Check file format
 *
 * @param  {String} format
 * @param  {Logger} logger
 * @return {String}
 */
function checkFormat(format, logger) {
    if (format === "js" || format === "cql") {
        return format;
    }
    else {
        logger.error("Invalid migration format, expected: js or cql", { format });
        process_1.exit();
    }
}
exports.default = checkFormat;
