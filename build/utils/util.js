"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
var getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            data: data,
            errMsg: errMsg,
        };
    }
    else {
        return {
            success: true,
            data: data,
        };
    }
};
exports.getResponseData = getResponseData;
