# Shared leaderboard setup

The quiz uses the Supabase project configured in `src/utils/leaderboard.js`.

To create its table and enable the public leaderboard:

1. Open the project's Supabase Dashboard.
2. Go to **SQL Editor** and start a new query.
3. Copy the contents of `leaderboard.sql` into the editor and run it.

The script creates the score table, adds row-level security, and grants visitors read and score-submission access. The browser uses only the project's publishable key; do not add a Supabase secret or service-role key to this project.
