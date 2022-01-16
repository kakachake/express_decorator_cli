import { Request, Response } from "express";
import { getResponseData } from "../utils/util";
import { get, post } from "../decorator";
import { createController } from "../decorator";
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

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
  logout(req: RequestWithBody, res: Response): void {
    if (req.session && req.session.login) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }

  @get("/")
  home(req: RequestWithBody, res: Response): void {
    const isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
      res.send(`
        <body>
          <a href='/logout'>logout</a>
          <a href='/data/getData'>getData</a>
          <a href='/data/showData'>showData</a>
        </body>
      `);
    } else {
      const formHtml = `
      <body>
        <form method='POST' action='/login'>
          <input type='password' name='password'>
          <button>Submit</button>
        </form>
      </body>
      `;
      res.send(formHtml);
    }
  }
}
