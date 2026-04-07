"use client";

import { useState } from "react";
import { ImageFallback } from "@/components/comments/image-fallback";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (images.length === 0) {
    return <ImageFallback text="该评论未提供图片" />;
  }

  const previewImages = images.slice(0, 4);
  const showCount = images.length > previewImages.length;

  return (
    <>
      <div className="review-image-wrap" aria-label="评论图片证据">
        {previewImages.map((image, index) => (
          <button
            className="review-image-uniform-btn"
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            aria-label="查看大图"
          >
            <img src={image} alt={`评论图片${index + 1}`} loading="lazy" />
            {showCount && index === previewImages.length - 1 ? (
              <span className="review-image-count">{previewImages.length}/{images.length}</span>
            ) : null}
          </button>
        ))}
      </div>

      {activeImage ? (
        <div className="modal-mask" role="dialog" aria-modal="true">
          <div className="modal-card">
            <button className="btn" type="button" onClick={() => setActiveImage(null)}>
              关闭
            </button>
            <img className="modal-image" src={activeImage} alt="评论图片大图" />
          </div>
        </div>
      ) : null}
    </>
  );
}
