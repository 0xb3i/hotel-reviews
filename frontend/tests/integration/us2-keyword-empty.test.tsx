import { matchesKeyword } from "@/lib/search/keyword-normalizer";

describe("US2 关键词无结果", () => {
  it("无匹配时应返回 false", () => {
    const result = matchesKeyword("酒店服务很好", "泳池");
    expect(result).toBe(false);
  });
});
