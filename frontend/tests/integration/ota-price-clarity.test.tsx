import { render, screen } from "@testing-library/react";
import { ComparisonHint } from "@/components/layout/comparison-hint";

describe("OTA 比价清晰度提示", () => {
  it("应明确说明当前比较维度与价格数据状态", () => {
    render(<ComparisonHint />);

    expect(screen.getByText(/评分、有用数、历史评论数/)).toBeInTheDocument();
    expect(screen.getByText(/价格数据未接入/)).toBeInTheDocument();
  });
});
