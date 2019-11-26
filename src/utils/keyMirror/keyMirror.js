/**
 * Return an object of key:key.
 * 
 * @example
 * const actions = keyMirror(
 *      "USERS_FETCH", 
 *      "MESSAGE_SEND", 
 *      "ROOM_CREATE"
 * );
 * console.log(actions.USERS_FETCH); // => "USERS_FETCH"
 * 
 * @param {String} keys
 * @return {Object} Object
 */
export default (...keys) => keys.reduce((obj, key) => ({ ...obj, [key]: key }));