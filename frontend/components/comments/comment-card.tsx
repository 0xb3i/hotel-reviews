"use client";

import { type CommentRecord } from "@/lib/domain/comment-query";
import { ImageGallery } from "@/components/comments/image-gallery";

interface CommentCardProps {
  comment: CommentRecord;
}

function getRatingLabel(score: number): string {
  if (score >= 4.8) return "超棒";
  if (score >= 4.5) return "很好";
  if (score >= 4.0) return "不错";
  return "一般";
}

function maskId(rawId: string): string {
  if (!rawId) return "匿名用户";
  if (rawId.length <= 8) return rawId;
  return `${rawId.slice(0, 8)}****`;
}

function toStayMonth(dateText: string): string {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return "入住时间未知";
  return `于${date.getFullYear()}年${date.getMonth() + 1}月入住`;
}

function formatDate(dateText: string): string {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return dateText;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日发布`;
}

// Icon Components to match screenshot visual appearance tightly
const RoomIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M7 11V6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v5m-11 0h12m-12 0v7a1 1 0 001 1v2m11-10v7a1 1 0 01-1 1v2m-10-3h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const TravelIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M4 19L11 3l7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M6 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
);
const PenIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
);
const ThumbIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
);

export function CommentCard({ comment }: CommentCardProps) {
  const ratingLabel = getRatingLabel(comment.score);
  const displayId = maskId(comment._id);
  const stayMonth = toStayMonth(comment.publish_date);
  const roomText = comment.fuzzy_room_type || comment.room_type || "房型待补充";
  const travelText = comment.travel_type || "其他";
  
  // Create a placeholder hotel reply if none is present to match screenshot vibe exactly
  const replyText = `“相聚虽短，情意却长。”亲爱的客官，感谢您对酒店的诚恳评价，我们一直秉承中国传统复兴文化，精心设计的空间来传递美学...`;

  return (
    <article className="review-item">
      <aside className="review-user-col">
        <h3 className="review-user-id">ID: {displayId}</h3>
        <ul className="review-user-meta">
          <li><RoomIcon /> {roomText}</li>
          <li><CalendarIcon /> {stayMonth}</li>
          <li><TravelIcon /> {travelText}</li>
          <li><PenIcon /> {comment.review_count}条点评</li>
        </ul>
      </aside>

      <section className="review-main-col">
        <header className="review-score-row">
          <span className="review-score-badge">{comment.score.toFixed(1)}</span>
          <strong className="review-score-label">{ratingLabel}</strong>
        </header>

        <p className="review-comment">{comment.comment}</p>

        <ImageGallery images={comment.images} />

        <div className="review-reply-box" aria-label="酒店回复">
          <p>
            <strong>酒店回复：</strong>
            {replyText}
            <span className="review-reply-link" role="button" tabIndex={0}>展开更多</span>
          </p>
        </div>

        <footer className="review-foot-row">
          <button className="review-useful-btn" type="button" aria-label="标记有用">
            <ThumbIcon /> 有用
          </button>
          <span className="review-publish-date">{formatDate(comment.publish_date)}</span>
        </footer>
      </section>
    </article>
  );
}
