import { readFileSync } from "node:fs";
import path from "node:path";

describe("导入契约校验", () => {
  it("应包含 json/date 与派生字段规则", () => {
    const contractPath = path.resolve(
      process.cwd(),
      "../insforge/contracts/comments-import-contract.md"
    );
    const text = readFileSync(contractPath, "utf-8");

    expect(text).toContain("| images | images | json |");
    expect(text).toContain("| categories | categories | json |");
    expect(text).toContain("| publish_date | publish_date | date |");
    expect(text).toContain("| category1 | string |");
    expect(text).toContain("| category2 | string |");
    expect(text).toContain("| category3 | string |");
    expect(text).toContain("| star | integer |");
  });
});
