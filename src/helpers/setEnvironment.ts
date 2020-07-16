import {env} from "process";

/**
 * Set NODE_ENV
 */
function setEnvironment(environment: string){
  return env.NODE_ENV = environment;
}

export default setEnvironment;
