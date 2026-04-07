import { NextResponse } from "next/server";
import { findCommentById } from "@/lib/server/comments-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params;
  const comment = findCommentById(id);

  if (!comment) {
    return NextResponse.json({ message: "评论不存在" }, { status: 404 });
  }

  return NextResponse.json(comment);
}
