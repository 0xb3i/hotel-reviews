import { readFileSync } from "node:fs";
import path from "node:path";

describe("US3 响应式布局一致性", () => {
  it("样式中应包含移动端断点规则", () => {
    const cssPath = path.resolve(process.cwd(), "./app/globals.css");
    const css = readFileSync(cssPath, "utf-8");

    expect(css).toContain("@media (max-width: 900px)");
    expect(css).toContain(".filter-panel");
    expect(css).toContain(".search-bar");
  });
});
