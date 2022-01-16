import cheerio from "cheerio";
import fs from "fs";
import path from "path";
interface CourseInfo {
  link: string;
  title: string;
  count: number;
  img: string;
}

interface CourseResult {
  time: number;
  data: CourseInfo[];
}
interface Content {
  [propName: number]: CourseInfo[];
}

export default class DellAnalyzer {
  private static instance: DellAnalyzer;

  static getInstance() {
    return this.instance ? this.instance : (this.instance = new DellAnalyzer());
  }

  private getCourseInfo(html: any) {
    const $ = cheerio.load(html);
    const items = $(".course-link");
    let courseInfo: CourseInfo[] = [];
    items.map((i, element) => {
      const desc = $(element).find(".course-desc");
      const imgs = $(element).find(".course-img");
      const title = desc.eq(0).text();
      const count = parseInt(desc.eq(1).text().split("：")[1]);
      const img = imgs.eq(0).attr("src") || "";
      courseInfo.push({
        link: element.attribs.href,
        title,
        count,
        img,
      });
    });
    return {
      time: new Date().getTime(),
      data: courseInfo,
    };
  }

  private generateJsonContent(courseResult: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseResult.time] = courseResult.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}
