import { convertObjectToArray, createSearchParam, createSortParam } from './common';

export function createSearchRequest(
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

export function createSortRequest(
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
