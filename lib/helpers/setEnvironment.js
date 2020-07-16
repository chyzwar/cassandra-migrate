"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
/**
 * Set NODE_ENV
 */
function setEnvironment(environment) {
    return process_1.env.NODE_ENV = environment;
}
exports.default = setEnvironment;
