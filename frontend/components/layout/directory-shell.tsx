import { type ReactNode } from "react";

interface DirectoryShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function DirectoryShell({ title, subtitle, children }: DirectoryShellProps) {
  return (
    <main className="review-shell">
      <div className="atmosphere atmosphere-left" aria-hidden="true" />
      <div className="atmosphere atmosphere-right" aria-hidden="true" />
      <div className="review-container">
        <header className="shell-header">
          <p className="shell-kicker">CURATED STAYS</p>
          <h1 className="review-title">{title}</h1>
          <p className="review-subtitle">{subtitle}</p>
        </header>
        {children}
      </div>
    </main>
  );
}
