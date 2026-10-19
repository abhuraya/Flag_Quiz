import { Link } from "react-router-dom";
import Leaderboard from "./Leaderboard";

function Landing() {
    return (
        <main className="landing-page">
            <section className="landing-hero">
                <div className="landing-copy">
                    <p className="landing-eyebrow">
                        TEST YOUR GEOGRAPHY
                    </p>

                    <h1>
                        How many flags
                        <span> can you recognize?</span>
                    </h1>

                    <p className="landing-description">
                        Race against the clock, identify national
                        flags, build your score, and improve with
                        every session.
                    </p>

                    <div className="landing-actions">
                        <Link
                            className="landing-primary-button"
                            to="/flags"
                        >
                            Start flag challenge
                        </Link>

                        <Link
                            className="landing-secondary-button"
                            to="/countries"
                        >
                            Find the flag
                        </Link>
                    </div>

                    <div className="landing-stats">
                        <div>
                            <strong>10</strong>
                            <span>Classic questions</span>
                        </div>

                        <div>
                            <strong>5 min</strong>
                            <span>Timed mode</span>
                        </div>

                        <div>
                            <strong>Global</strong>
                            <span>Shared scores</span>
                        </div>
                    </div>
                </div>

                <div className="landing-preview">
                    <div className="preview-orbit orbit-one" />
                    <div className="preview-orbit orbit-two" />

                    <div className="preview-card">
                        <div className="preview-card-top">
                            <span>FLAG CHALLENGE</span>
                            <strong>7s</strong>
                        </div>

                        <div className="preview-flag">
                            <div className="sample-flag">
                                <span />
                            </div>
                        </div>

                        <p>Which country has this flag?</p>

                        <div className="preview-options">
                            <span>Japan</span>
                            <span>Bangladesh</span>
                            <span>Palau</span>
                            <span>Laos</span>
                        </div>
                    </div>
                </div>
            </section>

            <Leaderboard />

            <section className="landing-features">
                <article>
                    <span>01</span>
                    <h2>Fast-paced sessions</h2>
                    <p>
                        Every game contains ten randomized questions
                        with a fifteen-second countdown.
                    </p>
                </article>

                <article>
                    <span>02</span>
                    <h2>Immediate feedback</h2>
                    <p>
                        See the correct answer instantly and learn
                        from every missed flag.
                    </p>
                </article>

                <article>
                    <span>03</span>
                    <h2>Track improvement</h2>
                    <p>
                        Timed challenge scores can be shared on a leaderboard
                        with players on other devices.
                    </p>
                </article>
            </section>
        </main>
    );
}

export default Landing;