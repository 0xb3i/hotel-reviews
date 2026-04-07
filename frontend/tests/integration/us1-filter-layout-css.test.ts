import { readFileSync } from "node:fs";
import path from "node:path";

describe("筛选栏布局样式", () => {
  it("筛选与排序应保持单行，且下拉箭头与右边缘有间距", () => {
    const cssPath = path.resolve(process.cwd(), "./app/globals.css");
    const css = readFileSync(cssPath, "utf-8");

    expect(css).toContain(".ota-filter-row");
    expect(css).toContain("flex-wrap: nowrap");
    expect(css).toContain(".ota-filter-label");
    expect(css).toContain("white-space: nowrap");
    expect(css).toContain("padding: 0 38px 0 12px");
    expect(css).toContain("background-position: calc(100% - 14px) center");
  });
});
