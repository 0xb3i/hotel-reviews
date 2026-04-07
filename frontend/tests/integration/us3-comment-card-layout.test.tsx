import React from "react";
import { render, screen } from "@testing-library/react";
import { CommentCard } from "@/components/comments/comment-card";
import { ImageGallery } from "@/components/comments/image-gallery";
import { type CommentRecord } from "@/lib/domain/comment-query";

const sampleComment: CommentRecord = {
  _id: "comment-user-0012345",
  comment: "这是一条测试评论。",
  images: [
    "https://example.com/a.jpg",
    "https://example.com/b.jpg",
    "https://example.com/c.jpg",
    "https://example.com/d.jpg",
    "https://example.com/e.jpg"
  ],
  score: 4.9,
  publish_date: "2026-01-24",
  room_type: "高级双床房",
  fuzzy_room_type: "双床房",
  travel_type: "商务出行",
  comment_len: 10,
  log_comment_len: 1,
  useful_count: 1,
  log_useful_count: 1,
  review_count: 3,
  log_review_count: 1,
  quality_score: 0.9,
  categories: ["卫生状况", "房间设施"],
  category1: "卫生状况",
  category2: "房间设施",
  category3: undefined,
  star: 4
};

describe("评论卡片布局", () => {
  it("用户区应只展示 ID，不展示头像节点", () => {
    const { container } = render(<CommentCard comment={sampleComment} />);

    expect(screen.getByText(/^ID:/)).toBeInTheDocument();
    expect(container.querySelector(".review-user-id-icon")).toBeNull();
  });

  it("图片预览应使用统一尺寸卡片样式", () => {
    const { container } = render(<ImageGallery images={sampleComment.images} />);

    const uniformButtons = container.querySelectorAll(".review-image-uniform-btn");
    expect(uniformButtons.length).toBe(4);
    expect(screen.getByText("4/5")).toBeInTheDocument();
  });
});
