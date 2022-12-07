import { convertObjectToArray, createSearchParam, createSortParam } from './common';

/**
 * Function for creating object with search keys
 * @param searchData - data for search (key/value Array or Object)
 * @param keyField - name key field in item of array. If searchData is Array
 * @param valueField - name value field in item of array. If searchData is Array
 * @param stringifyValue - if true then result value of object keys will be convert to string (Object or Array)
 * @returns {Object} - result object with search keys
 *
 * Example:
 * searchData = {
 *     prop1: "value1",
 *     prop2: "value2"
 * }
 *
 * result = {
 *     search[0][name]: "prop1",
 *     search[0][value]: "value1",
 *     search[1][name]: "prop2",
 *     search[1][value]: "value2"
 * }
 */
export function createSearchParams(
    searchData,
    keyField = 'field',
    valueField = 'value',
    stringifyValue = true,
) {
    const searchRequest = {};
    if (!searchData) {
        return {};
    }
    if (!Array.isArray(searchData) && typeof searchData !== 'object') {
        return {};
    }
    if (typeof searchData === 'object' && !Array.isArray(searchData)) {
        searchData = convertObjectToArray(searchData, keyField, valueField);
    }
    const createParam = (idx, key, value) => {
        if (stringifyValue) {
            return createSearchParam(idx, key, JSON.stringify(value));
        }
        return createSearchParam(idx, key, value);
    };

    searchData.forEach((item, idx) => {
        const key = item[keyField];
        const value = item[valueField];

        if (value === null || value === undefined) {
            return;
        }

        if (Array.isArray(value) && value.length > 0) {
            Object.assign(searchRequest, createParam(idx, key, value));
        } else if (typeof value === 'object' && Object.keys(value).length > 0) {
            Object.assign(searchRequest, createParam(idx, key, value));
        } else {
            Object.assign(searchRequest, createSearchParam(idx, key, value));
        }
    });
    return searchRequest;
}

/**
 * Function for creating object with sort keys
 * @param sortData - data for sort (key/value Array or Object)
 * @param keyField - name key field in item of array. If searchData is Array
 * @param valueField - name value field in item of array. If searchData is Array
 * @returns {Object} - result object with sort keys
 *
 * Example:
 * sortData = {
 *     prop1: "asc",
 *     prop2: "desc"
 * }
 *
 * result = {
 *     order[0][name]: "prop1",
 *     order[0][dir]: "asc",
 *     order[1][name]: "prop2",
 *     order[1][dir]: "desc"
 * }
 */
export function createSortParams(
    sortData,
    keyField = 'field',
    valueField = 'value',
) {
    const sortRequest = {};
    if (!sortData) {
        return {};
    }
    if (!Array.isArray(sortData) && typeof sortData !== 'object') {
        return {};
    }
    if (typeof sortData === 'object' && !Array.isArray(sortData)) {
        sortData = convertObjectToArray(sortData, keyField, valueField);
    }
    sortData.forEach((item, idx) => {
        const key = item[keyField];
        const value = item[valueField];

        if (value === null || value === undefined) {
            return;
        }

        Object.assign(sortRequest, createSortParam(idx, key, value));
    });
    return sortRequest;
}
