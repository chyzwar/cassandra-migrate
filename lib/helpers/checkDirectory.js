"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const process_1 = require("process");
const path_1 = require("path");
/**
 * Check if migration directory exist
 */
function checkDirectory(directory, logger) {
    const path = path_1.resolve(directory);
    if (fs_1.existsSync(path)) {
        return path;
    }
    else {
        logger.error("Directory path do not exist", { path, directory });
        process_1.exit();
    }
}
exports.default = checkDirectory;
