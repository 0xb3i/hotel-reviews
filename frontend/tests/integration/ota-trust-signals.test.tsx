import { render, screen } from "@testing-library/react";
import { TrustStrip } from "@/components/layout/trust-strip";

describe("OTA 信任信号条", () => {
  it("应展示关键可信说明", () => {
    render(<TrustStrip />);

    expect(screen.getByText("已验证评论数据")).toBeInTheDocument();
    expect(screen.getByText("近 30 天持续更新")).toBeInTheDocument();
    expect(screen.getByText("排序规则透明可见")).toBeInTheDocument();
  });
});
