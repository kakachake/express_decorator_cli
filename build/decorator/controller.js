"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createController = exports.Methods = void 0;
var router_1 = __importDefault(require("../router"));
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["put"] = "put";
    Methods["del"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
//为路由增加前缀prefix
function createController(prefix) {
    return function controller(target) {
        console.log(target);
        for (var key in target.prototype) {
            console.log(key);
            console.log(Reflect.getMetadata("path", target.prototype, key));
            //获取到每个方法上的元数据，即路由信息
            var path = Reflect.getMetadata("path", target.prototype, key);
            var method = Reflect.getMetadata("method", target.prototype, key);
            var middlewares = Reflect.getMetadata("middlewares", target.prototype, key);
            if (path && method) {
                //如果路由信息存在，则将当前的方法挂载到router的路由上
                var handler = target.prototype[key];
                var fullPath = prefix === "/" ? path : "".concat(prefix).concat(path);
                if (middlewares && middlewares.length) {
                    router_1.default[method].apply(router_1.default, __spreadArray(__spreadArray([fullPath], middlewares, false), [handler], false));
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.createController = createController;
