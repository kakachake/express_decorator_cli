"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller");
var app = (0, express_1.default)();
var router_1 = __importDefault(require("./router"));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: ["learn"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(router_1.default);
app.listen("3030", function () {
    console.log("server is running in 3030");
});
