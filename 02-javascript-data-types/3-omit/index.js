/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const filteredObj = {};
    const args = [...fields];
    if (args.length) {
        for (let key of Object.keys(obj)) {
            if (args.indexOf(key) === -1) {
                filteredObj[key] = obj[key];
            }
        }
        return filteredObj;
    }
    return filteredObj;
};