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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var analyzer_1 = __importDefault(require("../utils/analyzer"));
var crowller_1 = __importDefault(require("../utils/crowller"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("../utils/util");
var decorator_1 = require("../decorator");
var decorator_2 = require("../decorator");
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(null, "请先登录"));
    }
};
var test = function (req, res, next) {
    console.log("中间件执行");
    next();
};
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getData = function (req, res) {
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=secretKey";
        var analyzer = analyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.json((0, util_1.getResponseData)(true));
    };
    CrowllerController.prototype.showData = function (req, res) {
        var pos = path_1.default.resolve(__dirname, "../../data/course.json");
        var result = fs_1.default.readFileSync(pos, "utf-8");
        res.json((0, util_1.getResponseData)(JSON.parse(result)));
    };
    __decorate([
        (0, decorator_1.get)("/getData"),
        (0, decorator_2.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        (0, decorator_1.get)("/showData"),
        (0, decorator_2.use)(checkLogin),
        (0, decorator_2.use)(test),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    CrowllerController = __decorate([
        (0, decorator_2.createController)("/data")
    ], CrowllerController);
    return CrowllerController;
}());
