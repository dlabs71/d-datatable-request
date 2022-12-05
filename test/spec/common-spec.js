import {convertDataToSortDir, convertObjectToArray, createSearchParam, createSortParam} from "../../src/common.js";
import {SORT_DIR} from "../../src/constants.js";

describe("common functions tests", () => {

    it("convertObjectToArray", () => {
        let sourceObj = {
            param1: "value1",
            param2: "value2",
            param3: "value3",
        }

        let array1 = convertObjectToArray(sourceObj);
        expect(array1.length).toEqual(3);

        expect(array1[0].field).toBeDefined();
        expect(array1[0].value).toBeDefined();
        expect(array1[0].field).toEqual("param1");
        expect(array1[0].value).toEqual("value1");

        expect(array1[1].field).toBeDefined();
        expect(array1[1].value).toBeDefined();
        expect(array1[1].field).toEqual("param2");
        expect(array1[1].value).toEqual("value2");

        expect(array1[2].field).toBeDefined();
        expect(array1[2].value).toBeDefined();
        expect(array1[2].field).toEqual("param3");
        expect(array1[2].value).toEqual("value3");

        let array2 = convertObjectToArray(sourceObj, "value", "title");
        expect(array2.length).toEqual(3);

        expect(array2[0].value).toBeDefined();
        expect(array2[0].title).toBeDefined();
        expect(array2[0].value).toEqual("param1");
        expect(array2[0].title).toEqual("value1");

        expect(array2[1].value).toBeDefined();
        expect(array2[1].title).toBeDefined();
        expect(array2[1].value).toEqual("param2");
        expect(array2[1].title).toEqual("value2");

        expect(array2[2].value).toBeDefined();
        expect(array2[2].title).toBeDefined();
        expect(array2[2].value).toEqual("param3");
        expect(array2[2].title).toEqual("value3");
    });

    it("createSearchParam", () => {
        let searchParam = createSearchParam(0, "fieldName", "data");
        expect(searchParam).toBeInstanceOf(Object);
        expect(searchParam["search[0][name]"]).toBeDefined();
        expect(searchParam["search[0][value]"]).toBeDefined();
        expect(searchParam["search[0][name]"]).toEqual("fieldName");
        expect(searchParam["search[0][value]"]).toEqual("data");
    });

    it("convertDataToSortDir", () => {
        expect(convertDataToSortDir(SORT_DIR.ASC)).toEqual(SORT_DIR.ASC);
        expect(convertDataToSortDir(SORT_DIR.DESC)).toEqual(SORT_DIR.DESC);
        expect(convertDataToSortDir(true)).toEqual(SORT_DIR.ASC);
        expect(convertDataToSortDir(false)).toEqual(SORT_DIR.DESC);
        expect(convertDataToSortDir(1234)).toEqual(SORT_DIR.ASC);
        expect(convertDataToSortDir(0)).toEqual(SORT_DIR.DESC);
        expect(convertDataToSortDir("asdasdasd")).toEqual(SORT_DIR.ASC);
        expect(convertDataToSortDir(null)).toEqual(SORT_DIR.DESC);
    });

    it("createSortParam", () => {
        let sortParam = createSortParam(0, "fieldName", SORT_DIR.DESC);
        expect(sortParam).toBeInstanceOf(Object);
        expect(sortParam["order[0][name]"]).toBeDefined();
        expect(sortParam["order[0][dir]"]).toBeDefined();
        expect(sortParam["order[0][name]"]).toEqual("fieldName");
        expect(sortParam["order[0][dir]"]).toEqual(SORT_DIR.DESC);

        let sortParam1 = createSortParam(1, "fieldName", 0);
        expect(sortParam1).toBeInstanceOf(Object);
        expect(sortParam1["order[1][name]"]).toEqual("fieldName");
        expect(sortParam1["order[1][dir]"]).toEqual(SORT_DIR.DESC);

        let sortParam2 = createSortParam(2, "fieldName", 123);
        expect(sortParam2).toBeInstanceOf(Object);
        expect(sortParam2["order[2][name]"]).toEqual("fieldName");
        expect(sortParam2["order[2][dir]"]).toEqual(SORT_DIR.ASC);

        let sortParam3 = createSortParam(3, "fieldName", "asljdnaklsjd");
        expect(sortParam3).toBeInstanceOf(Object);
        expect(sortParam3["order[3][name]"]).toEqual("fieldName");
        expect(sortParam3["order[3][dir]"]).toEqual(SORT_DIR.ASC);

        let sortParam4 = createSortParam(4, "fieldName", false);
        expect(sortParam4).toBeInstanceOf(Object);
        expect(sortParam4["order[4][name]"]).toEqual("fieldName");
        expect(sortParam4["order[4][dir]"]).toEqual(SORT_DIR.DESC);

        let sortParam5 = createSortParam(5, "fieldName", true);
        expect(sortParam5).toBeInstanceOf(Object);
        expect(sortParam5["order[5][name]"]).toEqual("fieldName");
        expect(sortParam5["order[5][dir]"]).toEqual(SORT_DIR.ASC);
    });
});