import { buildCommentsQueryParams } from "@/lib/insforge/comments-repository";

describe("US2 搜索分页契约", () => {
  it("应正确生成关键词、排序和分页参数", () => {
    const params = buildCommentsQueryParams({
      keyword: "卫生",
      sortBy: "score",
      sortOrder: "asc",
      page: 2,
      pageSize: 50
    });

    expect(params.get("keyword")).toBe("卫生");
    expect(params.get("sort_by")).toBe("score");
    expect(params.get("sort_order")).toBe("asc");
    expect(params.get("page")).toBe("2");
    expect(params.get("page_size")).toBe("50");
  });
});
