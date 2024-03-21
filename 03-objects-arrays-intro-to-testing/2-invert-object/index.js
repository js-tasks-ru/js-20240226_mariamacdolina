/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    const newObj = {};
    if (obj !== undefined ) {
        for (let [key, val] of Object.entries(obj)) {
            newObj[val] = key;
        };
        return newObj;
    } 
    return undefined;
}
