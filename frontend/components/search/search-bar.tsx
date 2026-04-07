"use client";

import { FormEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const quickTopics = ["卫生", "服务", "早餐", "隔音", "亲子", "交通"];

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-headline">
        <p className="search-head">搜索意图</p>
        <h3 className="search-title">你最在意酒店的哪一项体验？</h3>
        <p className="search-tip">输入问题导向关键词，快速定位住客评价证据。</p>
      </div>

      <div className="search-row">
        <input
          id="keyword-search"
          aria-label="关键词搜索"
          className="input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="例如：卫生干净、前台效率、早餐品质、家庭亲子"
        />
        <button className="btn btn-primary" type="submit">
          开始检索
        </button>
      </div>

      <div className="search-topics" aria-label="快捷关键词">
        {quickTopics.map((topic) => (
          <button
            key={topic}
            className="topic-btn"
            type="button"
            onClick={() => onChange(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </form>
  );
}
