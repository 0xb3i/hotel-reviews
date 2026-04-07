create table if not exists import_jobs (
  job_id text primary key,
  source_file text not null,
  started_at timestamptz not null,
  ended_at timestamptz,
  total_rows integer not null default 0,
  success_rows integer not null default 0,
  failed_rows integer not null default 0,
  status text not null check (status in ('pending', 'running', 'succeeded', 'failed')),
  error_sample jsonb
);
