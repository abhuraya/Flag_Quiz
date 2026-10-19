create table if not exists public.flag_quiz_scores (
    id bigint generated always as identity primary key,
    player_name text not null check (char_length(trim(player_name)) between 1 and 24),
    score integer not null check (score between 0 and 300),
    created_at timestamptz not null default now()
);

create index if not exists flag_quiz_scores_leaderboard_idx
    on public.flag_quiz_scores (score desc, created_at asc);

alter table public.flag_quiz_scores enable row level security;

drop policy if exists "Anyone can read flag quiz scores" on public.flag_quiz_scores;
create policy "Anyone can read flag quiz scores"
    on public.flag_quiz_scores for select
    to anon
    using (true);

drop policy if exists "Anyone can submit a flag quiz score" on public.flag_quiz_scores;
create policy "Anyone can submit a flag quiz score"
    on public.flag_quiz_scores for insert
    to anon
    with check (
        char_length(trim(player_name)) between 1 and 24
        and score between 0 and 300
    );

grant select, insert on public.flag_quiz_scores to anon;
grant usage, select on sequence public.flag_quiz_scores_id_seq to anon;
