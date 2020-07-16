"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function requireCQL(filePath) {
    const lines = fs_1.readFileSync(filePath)
        .toString()
        .split(/\r?\n/);
    const upStartLine = lines.findIndex((line) => line.includes("-- up"));
    const dwStartLine = lines.findIndex((line) => line.includes("-- down"));
    return {
        up: { query: lines.slice(upStartLine, dwStartLine).join(), params: undefined },
        down: { query: lines.slice(upStartLine).join(), params: undefined }
    };
}
class MigrationCQL {
    constructor(filename, content, up, down, timestamp, version) {
        /**
         * Set filePath
         *
         * @type {String}
         */
        this.filename = filename;
        /**
         * Read migration content
         *
         * @type {String}
         */
        this.content = content;
        /**
         * Up statement
         */
        this.up = up;
        /**
         * Down statement
         */
        this.down = down;
        /**
         * Timestamp of migration
         */
        this.timestamp = timestamp,
            /**
             * Migration schema version
             */
            this.version = version;
    }
    static fromDB({ filename, content, timestamp, version }, directory) {
        const filePath = path_1.join(directory, filename);
        const { up, down } = requireCQL(filePath);
        return new MigrationCQL(filename, content, up, down, timestamp, version);
    }
    static fromFile(filename, directory) {
        const filePath = path_1.join(directory, filename);
        const content = fs_1.readFileSync(filePath).toString();
        const { up, down } = requireCQL(filePath);
        return new MigrationCQL(filename, content, up, down);
    }
}
exports.default = MigrationCQL;
