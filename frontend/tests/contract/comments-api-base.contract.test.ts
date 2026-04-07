import { readFileSync } from "node:fs";
import path from "node:path";

describe("评论 API 契约基线", () => {
  it("应包含列表与详情接口", () => {
    const contractPath = path.resolve(
      process.cwd(),
      "../specs/001-hotel-review-browser/contracts/comments-api.yaml"
    );
    const text = readFileSync(contractPath, "utf-8");

    expect(text).toContain("/comments:");
    expect(text).toContain("/comments/{id}:");
    expect(text).toContain("name: keyword");
    expect(text).toContain("name: page");
    expect(text).toContain("name: page_size");
  });
});
