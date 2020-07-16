"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
/**
 * Migration name pattern
 *
 * @type {RegExp}
 */
const NAME = /^[a-z0-9\_]*$/i;
/**
 * Validate migration name
 */
function validateName(migration, logger) {
    if (NAME.test(migration)) {
        return migration;
    }
    else {
        logger.error("Invalid migration name", { migration });
        process_1.exit();
    }
}
exports.default = validateName;
