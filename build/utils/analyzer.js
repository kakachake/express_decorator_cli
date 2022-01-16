"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.getInstance = function () {
        return this.instance ? this.instance : (this.instance = new DellAnalyzer());
    };
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var items = $(".course-link");
        var courseInfo = [];
        items.map(function (i, element) {
            var desc = $(element).find(".course-desc");
            var imgs = $(element).find(".course-img");
            var title = desc.eq(0).text();
            var count = parseInt(desc.eq(1).text().split("：")[1]);
            var img = imgs.eq(0).attr("src") || "";
            courseInfo.push({
                link: element.attribs.href,
                title: title,
                count: count,
                img: img,
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfo,
        };
    };
    DellAnalyzer.prototype.generateJsonContent = function (courseResult, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courseResult.time] = courseResult.data;
        return fileContent;
    };
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html);
        var fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
