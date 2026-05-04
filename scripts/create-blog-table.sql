-- Run this in your Supabase SQL editor

create table if not exists blog_posts (
  id                  uuid default gen_random_uuid() primary key,
  created_at          timestamptz default now() not null,
  title               text not null,
  summary             text,
  body                text not null,
  tags                text[] default '{}',
  read_minutes        integer default 2,
  score_clarity       numeric,
  score_relevance     numeric,
  score_engagement    numeric,
  score_accuracy      numeric,
  score_average       numeric,
  score_notes         text,
  ethics_approved     boolean default false,
  ethics_flags        text[] default '{}',
  ethics_suggestions  text[] default '{}',
  published           boolean default false,
  research_brief      text
);

-- Public can read published posts (anon key is fine for the website)
alter table blog_posts enable row level security;

create policy "Public reads published posts"
  on blog_posts for select
  using (published = true);

-- Index for fast queries
create index blog_posts_published_created on blog_posts (published, created_at desc);
