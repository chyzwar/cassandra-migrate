"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
/**
 * Try to load logger or fallback to console
 *
 */
function loadLogger(loggerPath) {
    const path = path_1.resolve(loggerPath);
    try {
        return require(path);
    }
    catch (error) {
        return require("console");
    }
}
exports.default = loadLogger;
