"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MigrationFactory_1 = __importDefault(require("../models/MigrationFactory"));
const process_1 = require("process");
const fs_1 = require("fs");
const path_1 = require("path");
function selectByExt(filePath) {
    const ext = path_1.extname(filePath);
    return ext === "js" || ext === "cql";
}
/**
 * Load migration in directory, ignore other files
 *
 */
function loadMigrations(directory, logger) {
    try {
        return fs_1.readdirSync(directory)
            .filter(selectByExt)
            .map((fileName) => MigrationFactory_1.default.fromFile(fileName, directory));
    }
    catch (error) {
        logger.error("Error loading migration", { directory, error });
        process_1.exit();
    }
}
exports.default = loadMigrations;
