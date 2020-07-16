"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadMigrations_1 = __importDefault(require("../helpers/loadMigrations"));
const Schema_1 = __importDefault(require("../models/Schema"));
const process_1 = require("process");
/**
 * Run outstanding migrations
 *
 * @param  {Client} client
 * @param  {String} directory
 * @param  {Logger} logger
 */
async function up(client, directory, logger) {
    const schema = new Schema_1.default(client, logger);
    await schema.connect();
    await schema.create();
    await schema.load();
    try {
        for (const migration of loadMigrations_1.default(directory, logger)) {
            if (schema.has(migration) === false) {
                await schema.up(migration);
                await schema.add(migration);
            }
        }
    }
    catch (error) {
        logger.error("Migration failed", {
            error: {
                message: error.message,
                stack: error.stack
            }
        });
    }
    process_1.exit();
}
exports.default = up;
