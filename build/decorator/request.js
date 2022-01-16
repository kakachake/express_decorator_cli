"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
var controller_1 = require("./controller");
//工厂模式创建请求装饰器
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            //在target的属性原型上定义元数据，即target.prototype
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
            //'path'  映射的key值
            //path    映射key对应的value值
            //target  映射的类
            //propertyKey 实例上的属性
        };
    };
}
exports.get = getRequestDecorator(controller_1.Methods.get);
exports.post = getRequestDecorator(controller_1.Methods.post);
exports.put = getRequestDecorator(controller_1.Methods.put);
exports.del = getRequestDecorator(controller_1.Methods.del);
