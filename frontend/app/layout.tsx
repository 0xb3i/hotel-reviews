import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import "@/styles/theme.css";

export const metadata: Metadata = {
  title: "花园酒店评论浏览",
  description: "支持筛选、关键词搜索和图片查看的评论浏览页面"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
