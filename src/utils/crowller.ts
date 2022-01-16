import fs from "fs";
import path from "path";
import superagent from "superagent";
import DellAnalyzer from "./analyzer";

export default class Crowller {
  private filePath = path.resolve(__dirname, "../../data/course.json");
  constructor(private url: string, private analyzer: DellAnalyzer) {
    this.initSpiderProcess();
  }
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
}

const url = "http://www.dell-lee.com/typescript/demo.html?secret=secretKey";

const analyzer = DellAnalyzer.getInstance();

new Crowller(url, analyzer);
