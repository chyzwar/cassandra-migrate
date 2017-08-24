"use strict";

var _require = require("process"),
    env = _require.env;

/**
 * Set NODE_ENV
 *
 * @param {String} envirotment
 */


function setEnvirotment(envirotment) {
  return env.NODE_ENV = envirotment;
}

module.exports = setEnvirotment;