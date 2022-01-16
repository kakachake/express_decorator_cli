import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controller";
const app = express();

import router from "./router";
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["learn"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(router);

app.listen("3030", () => {
  console.log("server is running in 3030");
});
