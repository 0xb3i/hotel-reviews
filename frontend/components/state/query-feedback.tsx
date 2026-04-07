import { ReactNode } from "react";

interface QueryFeedbackProps {
  loading: boolean;
  error?: string;
  hasData: boolean;
  emptyText: string;
  children: ReactNode;
}

export function QueryFeedback({ loading, error, hasData, emptyText, children }: QueryFeedbackProps) {
  if (loading) {
    return <div className="state-card">正在加载评论数据...</div>;
  }

  if (error) {
    return <div className="state-card state-error">{error}</div>;
  }

  if (!hasData) {
    return <div className="state-card">{emptyText}</div>;
  }

  return <>{children}</>;
}
