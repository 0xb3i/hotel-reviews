import { createCommentsRepository, type CommentsRepository } from "@/lib/insforge/comments-repository";
import {
  DEFAULT_QUERY,
  type CommentListResponse,
  type CommentQuery,
  type CommentRecord
} from "@/lib/domain/comment-query";

export interface CommentsListService {
  list(query: CommentQuery): Promise<CommentListResponse>;
  getById(id: string): Promise<CommentRecord>;
}

class DefaultCommentsListService implements CommentsListService {
  constructor(private readonly repository: CommentsRepository) {}

  list(query: CommentQuery): Promise<CommentListResponse> {
    return this.repository.list({
      ...DEFAULT_QUERY,
      ...query
    });
  }

  getById(id: string): Promise<CommentRecord> {
    return this.repository.getById(id);
  }
}

export function createCommentsListService(repository?: CommentsRepository): CommentsListService {
  return new DefaultCommentsListService(repository ?? createCommentsRepository());
}
