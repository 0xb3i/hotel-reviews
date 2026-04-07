import { matchesKeyword } from "@/lib/search/keyword-normalizer";

describe("US2 关键词命中", () => {
  it("应能命中评论文本中的关键词", () => {
    const result = matchesKeyword("酒店卫生非常好，早餐也很丰富", "卫生");
    expect(result).toBe(true);
  });
});
