"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("../models/Schema"));
const process_1 = require("process");
/**
 * Run outstanding migrations
 */
async function down(client, directory, logger) {
    const schema = new Schema_1.default(client, logger);
    await schema.connect();
    await schema.create();
    await schema.load();
    const migrations = schema.getMigrations(directory);
    try {
        for (const migration of migrations) {
            if (schema.isRecent(migration)) {
                await schema.down(migration);
                await schema.remove(migration);
            }
        }
    }
    catch (error) {
        logger.error("Migration failed", { error });
    }
    process_1.exit();
}
exports.default = down;
