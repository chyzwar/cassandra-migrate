const {env} = require("process");

/**
 * Set NODE_ENV
 *
 * @param {String} envirotment
 */
function setEnvirotment(envirotment){
  return env.NODE_ENV = envirotment;
}

module.exports = setEnvirotment;
