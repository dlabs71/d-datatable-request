import { SORT_DIR } from './constants';

/**
 * Function for convert JS object to Array of key/value objects
 * Example:
 * object = {
 *     prop1: "value1",
 *     prop2: "value2"
 * }
 * created array = [
 *      {filed: "prop1", value: "value1"},
 *      {filed: "prop2", value: "value2"}
 * ]
 * @param data - source object
 * @param keyField - name key field in result object (item of result array)
 * @param valueField - name value field in result object (item of result array)
 * @returns {Array} - result array
 */
export function convertObjectToArray(data, keyField = 'field', valueField = 'value') {
    const array = [];
    Object.entries(data).forEach(([key, value]) => {
        array.push({
            [keyField]: key,
            [valueField]: value,
        });
    });
    return array;
}

/**
 * Function for create object with search keys
 * @param idx - index of parameter
 * @param key - name of parameter
 * @param value - value of parameter
 * @returns {Object} - result object
 */
export function createSearchParam(idx, key, value) {
    const searchRequest = {};
    searchRequest[`search[${idx}][name]`] = key;
    searchRequest[`search[${idx}][value]`] = value;
    return searchRequest;
}

/**
 * Function for converting any value to sort direction {@see SORT_DIR}
 * @param value - value for converting
 * @returns {string} - sort direction
 */
export function convertDataToSortDir(value) {
    if ([SORT_DIR.ASC, SORT_DIR.DESC].includes(value)) {
        return value;
    }
    if (!value) {
        return SORT_DIR.DESC;
    }
    return SORT_DIR.ASC;
}

/**
 * Function for create object with sort keys
 * @param idx - index of parameter
 * @param key - name of parameter
 * @param value - sort direction {@see SORT_DIR}
 * @returns {Object} - result object
 */
export function createSortParam(idx, key, value) {
    const searchRequest = {};
    searchRequest[`order[${idx}][name]`] = key;
    searchRequest[`order[${idx}][dir]`] = convertDataToSortDir(value);
    return searchRequest;
}
