import React from "react";
import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FilterPanel } from "@/components/filters/filter-panel";
import { type CommentFilters } from "@/lib/domain/comment-query";

function Harness() {
  const [filters, setFilters] = useState<CommentFilters>({});
  return (
    <>
      <FilterPanel filters={filters} onChange={setFilters} />
      <pre data-testid="filters-json">{JSON.stringify(filters)}</pre>
    </>
  );
}

describe("US1 多条件筛选", () => {
  it("应能组合星级与分类筛选", () => {
    render(<Harness />);

    const starSelect = screen.getByLabelText("星级");
    const categorySelect = screen.getByLabelText("分类小类");

    fireEvent.change(starSelect, { target: { value: "4" } });
    fireEvent.change(categorySelect, { target: { value: "餐饮设施" } });

    const json = screen.getByTestId("filters-json").textContent ?? "";
    expect(json).toContain('"star":4');
    expect(json).toContain('"category":"餐饮设施"');
  });
});
