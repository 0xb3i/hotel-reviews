"use client";

import { type CommentRecord } from "@/lib/domain/comment-query";
import { CommentCard } from "@/components/comments/comment-card";

interface CommentListProps {
  comments: CommentRecord[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <section className="comment-list" aria-label="评论列表">
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </section>
  );
}
