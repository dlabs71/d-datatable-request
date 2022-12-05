import { SORT_DIR } from './constants';

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

export function createSearchParam(idx, key, value) {
    const searchRequest = {};
    searchRequest[`search[${idx}][name]`] = key;
    searchRequest[`search[${idx}][value]`] = value;
    return searchRequest;
}

export function convertDataToSortDir(value) {
    if ([SORT_DIR.ASC, SORT_DIR.DESC].includes(value)) {
        return value;
    }
    if (!value) {
        return SORT_DIR.DESC;
    }
    return SORT_DIR.ASC;
}

export function createSortParam(idx, key, value) {
    const searchRequest = {};
    searchRequest[`order[${idx}][name]`] = key;
    searchRequest[`order[${idx}][dir]`] = convertDataToSortDir(value);
    return searchRequest;
}
