"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
var use = function (middleware) {
    return function (target, key) {
        var middlewares = Reflect.getMetadata("middlewares", target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata("middlewares", middlewares, target, key);
    };
};
exports.use = use;
