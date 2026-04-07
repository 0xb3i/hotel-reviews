"use client";

interface ImageFallbackProps {
  text?: string;
}

export function ImageFallback({ text = "暂无可用图片" }: ImageFallbackProps) {
  return (
    <div className="image-fallback" role="img" aria-label={text}>
      <span>{text}</span>
    </div>
  );
}
