import { NextFunction, Request, Response } from "express";
import { getResponseData } from "../utils/util";
import { get, post, use, createController } from "../decorator";
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const test = (
  req: RequestWithBody,
  res: Response,
  next: NextFunction
): void => {
  console.log("中间件执行");
  next();
};

@createController("/")
class LoginController {
  @post("/login")
  login(req: Request, res: Response): void {
    const { password } = req.body;
    const isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
      res.json(getResponseData(false, "已经登陆"));
    } else if (password === "123") {
      if (req.session) {
        req.session.login = true;
        res.json(getResponseData(true));
      }
    } else {
      res.json(getResponseData(false, "密码错误"));
    }
  }

  @get("/logout")
  //中间件
  @use(test)
  logout(req: RequestWithBody, res: Response): void {
    if (req.session && req.session.login) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }

  @get("/")
  home(req: RequestWithBody, res: Response): void {
    res.send("hello world");
  }
}
