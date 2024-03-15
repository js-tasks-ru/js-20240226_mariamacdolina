/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const arrPath = path.split('.');

    const getter = (obj) => {
        const l = arrPath.length;
        let i = 0;
        let result = undefined;
        if (l === 0) return result;
        result = obj[arrPath[i]];
        i++;
        while (i < l) {
            if (!result) return undefined;
            result = result[arrPath[i]]
            i++;
        } 
        return result;
    }
    return getter
}