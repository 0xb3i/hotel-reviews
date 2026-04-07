import { buildCommentsQueryParams } from "@/lib/insforge/comments-repository";

describe("US1 筛选参数契约", () => {
  it("应正确生成结构化筛选查询参数", () => {
    const params = buildCommentsQueryParams({
      dateFrom: "2025-04-01",
      dateTo: "2025-04-30",
      star: 4,
      travelType: "家庭亲子",
      fuzzyRoomType: "套房",
      category: "餐饮设施"
    });

    expect(params.get("date_from")).toBe("2025-04-01");
    expect(params.get("date_to")).toBe("2025-04-30");
    expect(params.get("star")).toBe("4");
    expect(params.get("travel_type")).toBe("家庭亲子");
    expect(params.get("fuzzy_room_type")).toBe("套房");
    expect(params.get("category")).toBe("餐饮设施");
  });
});
