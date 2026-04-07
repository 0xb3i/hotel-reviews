import { fireEvent, render, screen } from "@testing-library/react";
import { MobileFilterDrawer } from "@/components/layout/mobile-filter-drawer";

describe("OTA 移动端筛选抽屉", () => {
  it("打开时应可关闭并触发关闭回调", () => {
    const onClose = vi.fn();

    render(
      <MobileFilterDrawer
        open
        filters={{}}
        onClose={onClose}
        onChange={() => undefined}
        onReset={() => undefined}
      />
    );

    expect(screen.getByRole("dialog", { name: "移动端筛选抽屉" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "关闭筛选" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
