import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ActiveFilters } from "@/components/filters/active-filters";

describe("US1 筛选重置", () => {
  it("应支持一键清空筛选", () => {
    const onReset = vi.fn();

    render(
      <ActiveFilters
        filters={{ star: 5, category: "整体满意度", travelType: "家庭亲子" }}
        onReset={onReset}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "清空筛选" }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
