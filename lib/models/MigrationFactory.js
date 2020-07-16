"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MigrationJS_1 = __importDefault(require("./MigrationJS"));
const MigrationCQL_1 = __importDefault(require("./MigrationCQL"));
const path_1 = require("path");
class MigrationFactory {
    /**
     * Create Migration from DB record
     *
     * @param  {Object} migration
     * @param  {String} directory
     * @return {Migration}
     */
    static fromDB(migration, directory) {
        const extension = path_1.extname(migration.filename);
        if (extension === "JS") {
            return MigrationJS_1.default.fromDB(migration, directory);
        }
        if (extension === "CQL") {
            return MigrationCQL_1.default.fromDB(migration, directory);
        }
        throw new Error(`Unknown migration extension: ${extension}`);
    }
    /**
     * Create Migration from file
     * @param  {String} filename
     * @param  {String} directory
     * @return {Migration}
     */
    static fromFile(filename, directory) {
        const extension = path_1.extname(filename);
        if (extension === "JS") {
            return MigrationJS_1.default.fromFile(filename, directory);
        }
        if (extension === "CQL") {
            return MigrationCQL_1.default.fromFile(filename, directory);
        }
        throw new Error(`Unknown migration extension: ${extension}`);
    }
}
exports.default = MigrationFactory;
