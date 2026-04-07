import React from "react";
import { render, screen } from "@testing-library/react";
import { ImageGallery } from "@/components/comments/image-gallery";

describe("US3 图片降级", () => {
  it("无图片时应显示友好提示", () => {
    render(<ImageGallery images={[]} />);
    expect(screen.getByText("该评论未提供图片")).toBeInTheDocument();
  });
});
