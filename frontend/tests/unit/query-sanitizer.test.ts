import {
  sanitizeCategory,
  sanitizeDate,
  sanitizeInteger,
  sanitizeKeyword,
  sanitizeSortBy,
  sanitizeSortOrder
} from "@/lib/security/query-sanitizer";

describe("query sanitizer", () => {
  it("应处理关键词和排序回退", () => {
    expect(sanitizeKeyword("  卫生  ")).toBe("卫生");
    expect(sanitizeSortBy("score")).toBe("score");
    expect(sanitizeSortBy("unknown")).toBe("publish_date");
    expect(sanitizeSortOrder("asc")).toBe("asc");
    expect(sanitizeSortOrder("oops")).toBe("desc");
  });

  it("应处理数值和日期边界", () => {
    expect(sanitizeInteger(0, 1, 5, 1)).toBe(1);
    expect(sanitizeInteger(9, 1, 5, 1)).toBe(5);
    expect(sanitizeDate("2025-04-05")).toBe("2025-04-05");
    expect(sanitizeDate("2025/04/05")).toBeUndefined();
    expect(sanitizeCategory("餐饮设施")).toBe("餐饮设施");
    expect(sanitizeCategory("未知分类")).toBeUndefined();
  });
});
