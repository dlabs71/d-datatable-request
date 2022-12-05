import {createSearchRequest, createSortRequest} from "../../src/request-creators.js";
import {SORT_DIR} from "../../src";

describe("request creator functions tests", () => {
    it("createSearchRequest", () => {
        let searchData = [
            {field: "fieldName1", value: "value1"},
            {field: "fieldName2", value: "value2"},
            {field: "fieldName3", value: "value3"}
        ];

        let searchRequest = createSearchRequest(searchData);
        expect(searchRequest).toBeInstanceOf(Object);
        expect(searchRequest['search[0][name]']).toEqual("fieldName1");
        expect(searchRequest['search[0][value]']).toEqual("value1");
        expect(searchRequest['search[1][name]']).toEqual("fieldName2");
        expect(searchRequest['search[1][value]']).toEqual("value2");
        expect(searchRequest['search[2][name]']).toEqual("fieldName3");
        expect(searchRequest['search[2][value]']).toEqual("value3");

        let searchData1 = {
            fieldName1: "value1",
            fieldName2: "value2",
            fieldName3: "value3"
        }
        let searchRequest1 = createSearchRequest(searchData1);
        expect(searchRequest1).toBeInstanceOf(Object);
        expect(searchRequest1['search[0][name]']).toEqual("fieldName1");
        expect(searchRequest1['search[0][value]']).toEqual("value1");
        expect(searchRequest1['search[1][name]']).toEqual("fieldName2");
        expect(searchRequest1['search[1][value]']).toEqual("value2");
        expect(searchRequest1['search[2][name]']).toEqual("fieldName3");
        expect(searchRequest1['search[2][value]']).toEqual("value3");

        let searchData2 = [
            {value: "fieldName1", title: "value1"},
            {value: "fieldName2", title: "value2"},
            {value: "fieldName3", title: "value3"}
        ];
        let searchRequest2 = createSearchRequest(searchData2, "value", "title");
        expect(searchRequest2).toBeInstanceOf(Object);
        expect(searchRequest2['search[0][name]']).toEqual("fieldName1");
        expect(searchRequest2['search[0][value]']).toEqual("value1");
        expect(searchRequest2['search[1][name]']).toEqual("fieldName2");
        expect(searchRequest2['search[1][value]']).toEqual("value2");
        expect(searchRequest2['search[2][name]']).toEqual("fieldName3");
        expect(searchRequest2['search[2][value]']).toEqual("value3");

        let searchData3 = [
            {
                value: "fieldName1",
                title: {
                    prop1: "prop1",
                    prop2: "prop2",
                    prop3: "prop3"
                }
            },
            {value: "fieldName2", title: "value2"},
            {value: "fieldName3", title: "value3"}
        ];

        let objectFieldValue = {
            prop1: "prop1",
            prop2: "prop2",
            prop3: "prop3"
        };
        let stringFieldValue = JSON.stringify(objectFieldValue);
        let searchRequest3 = createSearchRequest(searchData3, "value", "title");
        expect(searchRequest3).toBeInstanceOf(Object);
        expect(searchRequest3['search[0][name]']).toEqual("fieldName1");
        expect(searchRequest3['search[0][value]']).toEqual(stringFieldValue);

        let searchRequest4 = createSearchRequest(searchData3, "value", "title", false);
        expect(searchRequest4).toBeInstanceOf(Object);
        expect(searchRequest4['search[0][name]']).toEqual("fieldName1");
        expect(searchRequest4['search[0][value]']).toEqual(objectFieldValue);
    });

    it("createSortRequest", () => {
        let sortData = [
            {field: "fieldName1", value: SORT_DIR.ASC},
            {field: "fieldName2", value: SORT_DIR.DESC},
            {field: "fieldName3", value: SORT_DIR.ASC}
        ];

        let sortRequest = createSortRequest(sortData);
        expect(sortRequest).toBeInstanceOf(Object);
        expect(sortRequest['order[0][name]']).toEqual("fieldName1");
        expect(sortRequest['order[0][dir]']).toEqual(SORT_DIR.ASC);
        expect(sortRequest['order[1][name]']).toEqual("fieldName2");
        expect(sortRequest['order[1][dir]']).toEqual(SORT_DIR.DESC);
        expect(sortRequest['order[2][name]']).toEqual("fieldName3");
        expect(sortRequest['order[2][dir]']).toEqual(SORT_DIR.ASC);

        let sortData1 = {
            fieldName1: SORT_DIR.ASC,
            fieldName2: SORT_DIR.DESC,
            fieldName3: SORT_DIR.ASC
        }
        let sortRequest1 = createSortRequest(sortData1);
        expect(sortRequest1).toBeInstanceOf(Object);
        expect(sortRequest1['order[0][name]']).toEqual("fieldName1");
        expect(sortRequest1['order[0][dir]']).toEqual(SORT_DIR.ASC);
        expect(sortRequest1['order[1][name]']).toEqual("fieldName2");
        expect(sortRequest1['order[1][dir]']).toEqual(SORT_DIR.DESC);
        expect(sortRequest1['order[2][name]']).toEqual("fieldName3");
        expect(sortRequest1['order[2][dir]']).toEqual(SORT_DIR.ASC);

        let sortData2 = [
            {value: "fieldName1", title: SORT_DIR.ASC},
            {value: "fieldName2", title: SORT_DIR.DESC},
            {value: "fieldName3", title: SORT_DIR.ASC}
        ];
        let sortRequest2 = createSortRequest(sortData2, "value", "title");
        expect(sortRequest2).toBeInstanceOf(Object);
        expect(sortRequest2['order[0][name]']).toEqual("fieldName1");
        expect(sortRequest2['order[0][dir]']).toEqual(SORT_DIR.ASC);
        expect(sortRequest2['order[1][name]']).toEqual("fieldName2");
        expect(sortRequest2['order[1][dir]']).toEqual(SORT_DIR.DESC);
        expect(sortRequest2['order[2][name]']).toEqual("fieldName3");
        expect(sortRequest2['order[2][dir]']).toEqual(SORT_DIR.ASC);

        let sortData3 = {
            fieldName1: "value1",
            fieldName2: SORT_DIR.DESC,
            fieldName3: false
        }
        let sortRequest3 = createSortRequest(sortData3);
        expect(sortRequest3).toBeInstanceOf(Object);
        expect(sortRequest3['order[0][name]']).toEqual("fieldName1");
        expect(sortRequest3['order[0][dir]']).toEqual(SORT_DIR.ASC);
        expect(sortRequest3['order[1][name]']).toEqual("fieldName2");
        expect(sortRequest3['order[1][dir]']).toEqual(SORT_DIR.DESC);
        expect(sortRequest3['order[2][name]']).toEqual("fieldName3");
        expect(sortRequest3['order[2][dir]']).toEqual(SORT_DIR.DESC);
    });
});