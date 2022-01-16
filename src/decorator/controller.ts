import { RequestHandler } from "express";
import router from "../router";
export enum Methods {
  get = "get",
  post = "post",
  put = "put",
  del = "delete",
}

//为路由增加前缀prefix
export function createController(prefix: string) {
  return function controller(target: new (...args: any[]) => any) {
    console.log(target);

    for (let key in target.prototype) {
      console.log(key);
      console.log(Reflect.getMetadata("path", target.prototype, key));
      //获取到每个方法上的元数据，即路由信息
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        "middlewares",
        target.prototype,
        key
      );
      if (path && method) {
        //如果路由信息存在，则将当前的方法挂载到router的路由上
        const handler = target.prototype[key];
        const fullPath = prefix === "/" ? path : `${prefix}${path}`;
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
