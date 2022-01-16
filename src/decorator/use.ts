import { RequestHandler } from "express";
import "reflect-metadata";
export const use = function (middleware: RequestHandler) {
  return (target: any, key: string) => {
    const middlewares = Reflect.getMetadata("middlewares", target, key) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata("middlewares", middlewares, target, key);
  };
};
