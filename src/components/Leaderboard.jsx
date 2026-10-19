import { useEffect, useState } from "react";
import { fetchLeaderboard, leaderboardConfigured } from "../utils/leaderboard";

function Leaderboard({ refreshKey = 0, limit = 10 }) {
    const [scores, setScores] = useState([]);
    const [status, setStatus] = useState(leaderboardConfigured ? "loading" : "unconfigured");

    useEffect(function () {
        let cancelled = false;

        if (!leaderboardConfigured) {
            setStatus("unconfigured");
            return undefined;
        }

        setStatus("loading");
        fetchLeaderboard(limit)
            .then(function (results) {
                if (cancelled) return;
                setScores(results);
                setStatus("ready");
            })
            .catch(function () {
                if (cancelled) return;
                setStatus("error");
            });

        return function () {
            cancelled = true;
        };
    }, [refreshKey, limit]);

    return (
        <section className="leaderboard-card" aria-labelledby="leaderboard-title">
            <div className="leaderboard-heading">
                <div>
                    <p className="quiz-label">PLAYERS EVERYWHERE</p>
                    <h2 id="leaderboard-title">Timed challenge leaderboard</h2>
                </div>
                <span className="leaderboard-badge">TOP {limit}</span>
            </div>

            {status === "unconfigured" && (
                <p className="leaderboard-message">
                    The shared leaderboard will appear here after its database is connected.
                </p>
            )}
            {status === "loading" && <p className="leaderboard-message">Loading scores…</p>}
            {status === "error" && (
                <p className="leaderboard-message">
                    Scores are temporarily unavailable. Please try again later.
                </p>
            )}
            {status === "ready" && scores.length === 0 && (
                <p className="leaderboard-message">No scores yet. Set the first record!</p>
            )}
            {status === "ready" && scores.length > 0 && (
                <ol className="leaderboard-list">
                    {scores.map(function (entry, index) {
                        return (
                            <li className="leaderboard-entry" key={entry.id}>
                                <span className="leaderboard-rank">{String(index + 1).padStart(2, "0")}</span>
                                <span className="leaderboard-player">{entry.player_name}</span>
                                <strong className="leaderboard-score">{entry.score}</strong>
                            </li>
                        );
                    })}
                </ol>
            )}
        </section>
    );
}

export default Leaderboard;
