import { RequestHandler } from "express";
import "reflect-metadata";
import { Methods } from "./controller";

//工厂模式创建请求装饰器
function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (target: any, key: string) {
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

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
export const put = getRequestDecorator(Methods.put);
export const del = getRequestDecorator(Methods.del);
