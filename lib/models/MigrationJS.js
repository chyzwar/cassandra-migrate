"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
class MigrationJS {
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
         *
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
             * @type {Number}
             */
            this.version = version;
    }
    static fromDB({ filename, content, timestamp, version }, directory) {
        const filePath = path_1.join(directory, filename);
        const { up, down } = require(filePath);
        return new MigrationJS(filename, content, up, down, timestamp, version);
    }
    static fromFile(filename, directory) {
        const filePath = path_1.join(directory, filename);
        const content = fs_1.readFileSync(filePath).toString();
        const { up, down } = require(filePath);
        return new MigrationJS(filename, content, up, down);
    }
}
exports.default = MigrationJS;
