import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ImageGallery } from "@/components/comments/image-gallery";

describe("US3 图片预览", () => {
  it("点击缩略图后应打开大图弹层", () => {
    render(
      <ImageGallery
        images={["https://example.com/a.jpg", "https://example.com/b.jpg"]}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: "查看大图" })[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
