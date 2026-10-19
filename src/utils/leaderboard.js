const projectUrl = "https://bconjnfwdmotquwukfsz.supabase.co";
const publicKey = "sb_publishable_BaR2QxJT8FawfhabvRRTDQ_kT-maRga";
const tableName = "flag_quiz_scores";

export const leaderboardConfigured = Boolean(projectUrl && publicKey);

async function requestLeaderboard(path, options = {}) {
    if (!leaderboardConfigured) {
        throw new Error("The shared leaderboard is not configured yet.");
    }

    const response = await fetch(`${projectUrl}/rest/v1/${tableName}${path}`, {
        ...options,
        headers: {
            apikey: publicKey,
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error("The shared leaderboard could not be reached.");
    }

    return response.status === 204 ? null : response.json();
}

export async function fetchLeaderboard(limit = 10) {
    const rows = await requestLeaderboard(
        `?select=id,player_name,score,created_at&order=score.desc,created_at.asc&limit=${limit}`
    );
    return rows ?? [];
}

export async function submitLeaderboardScore(playerName, score) {
    const name = playerName.trim().slice(0, 24);
    if (!name) {
        throw new Error("Enter a name for the leaderboard.");
    }

    const rows = await requestLeaderboard("", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify([{ player_name: name, score }]),
    });
    return rows?.[0] ?? null;
}
