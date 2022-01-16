"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../utils/util");
var decorator_1 = require("../decorator");
var decorator_2 = require("../decorator");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = !!(req.session ? req.session.login : false);
        if (isLogin) {
            res.json((0, util_1.getResponseData)(false, "已经登陆"));
        }
        else if (password === "123") {
            if (req.session) {
                req.session.login = true;
                res.json((0, util_1.getResponseData)(true));
            }
        }
        else {
            res.json((0, util_1.getResponseData)(false, "密码错误"));
        }
    };
    LoginController.prototype.logout = function (req, res) {
        if (req.session && req.session.login) {
            req.session.login = undefined;
        }
        res.json((0, util_1.getResponseData)(true));
    };
    LoginController.prototype.home = function (req, res) {
        var isLogin = !!(req.session ? req.session.login : false);
        if (isLogin) {
            res.send("\n        <body>\n          <a href='/logout'>logout</a>\n          <a href='/data/getData'>getData</a>\n          <a href='/data/showData'>showData</a>\n        </body>\n      ");
        }
        else {
            var formHtml = "\n      <body>\n        <form method='POST' action='/login'>\n          <input type='password' name='password'>\n          <button>Submit</button>\n        </form>\n      </body>\n      ";
            res.send(formHtml);
        }
    };
    __decorate([
        (0, decorator_1.post)("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        (0, decorator_1.get)("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    __decorate([
        (0, decorator_1.get)("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    LoginController = __decorate([
        (0, decorator_2.createController)("/")
    ], LoginController);
    return LoginController;
}());
