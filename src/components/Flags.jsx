import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import countries from "../data/countries";
import { createGameSession } from "../utils/quizHelpers";



const QUESTION_COUNT = 10;
const TIMED_MODE_SECONDS = 5 * 60;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

const DIFFICULTIES = {
    easy: {
        label: "Easy",
        time: 20,
        options: 3,
    },
    medium: {
        label: "Medium",
        time: 15,
        options: 4,
    },
    hard: {
        label: "Hard",
        time: 10,
        options: 6,
    },
};

function Flags() {
    const [quizMode, setQuizMode] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);

    const difficultySettings = difficulty
        ? DIFFICULTIES[difficulty]
        : null;

    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [modeTimeLeft, setModeTimeLeft] = useState(TIMED_MODE_SECONDS);
    const modeEndsAtRef = useRef(null);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerHistory, setAnswerHistory] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion =
    questions.length > 0
        ? questions[questionIndex]
        : null;


    const [timeLeft, setTimeLeft] = useState(0);
    const [timedOut, setTimedOut] = useState(false);
    const [bestScore, setBestScore] = useState(function () {
    const savedBestScore = localStorage.getItem("flagQuizBestScore");

    return savedBestScore ? Number(savedBestScore) : 0;
    });

useEffect(
    function () {
        if (
            !difficulty ||
            quizMode === "timed" ||
            !currentQuestion ||
            selectedAnswer !== null ||
            isFinished
        ) {
            return undefined;
        }

        if (timeLeft === 0) {
            setTimedOut(true);
            setSelectedAnswer("TIME_OUT");

            setAnswerHistory(function (currentHistory) {
                return [
                    ...currentHistory,
                    {
                        country:
                            currentQuestion.correctCountry.name,
                        flag:
                            currentQuestion.correctCountry.flag,
                        selectedAnswer: null,
                        isCorrect: false,
                        timedOut: true,
                    },
                ];
            });

            return undefined;
        }

        const timerId = setTimeout(function () {
            setTimeLeft(function (currentTime) {
                return currentTime - 1;
            });
        }, 1000);

        return function () {
            clearTimeout(timerId);
        };
    },
    [
        quizMode,
        difficulty,
        timeLeft,
        selectedAnswer,
        isFinished,
        currentQuestion,
    ]
);

useEffect(function () {
    if (quizMode !== "timed" || !difficulty || isFinished) {
        return undefined;
    }

    if (!modeEndsAtRef.current) {
        modeEndsAtRef.current = Date.now() + TIMED_MODE_SECONDS * 1000;
    }

    function updateModeTimer() {
        const remaining = Math.max(
            0,
            Math.ceil((modeEndsAtRef.current - Date.now()) / 1000)
        );
        setModeTimeLeft(remaining);

        if (remaining === 0) {
            setIsFinished(true);
        }
    }

    updateModeTimer();
    const timerId = window.setInterval(updateModeTimer, 250);

    return function () {
        window.clearInterval(timerId);
    };
}, [quizMode, difficulty, isFinished]);

useEffect(
    function () {
        if (!currentQuestion) {
            return;
        }

        const currentFlag = new Image();
        currentFlag.src = currentQuestion.correctCountry.flag;

        const nextQuestion = questions[questionIndex + 1];

        if (nextQuestion) {
            const nextFlag = new Image();
            nextFlag.src = nextQuestion.correctCountry.flag;
        }
    },
    [currentQuestion, questions, questionIndex]
);

    function handleDifficultySelect(selectedDifficulty) {
    const settings = DIFFICULTIES[selectedDifficulty];

    setDifficulty(selectedDifficulty);
    modeEndsAtRef.current = quizMode === "timed"
        ? Date.now() + TIMED_MODE_SECONDS * 1000
        : null;
    setModeTimeLeft(TIMED_MODE_SECONDS);

    setQuestions(
        createGameSession(
            countries,
            QUESTION_COUNT,
            settings.options
        )
    );

    setQuestionIndex(0);
    setQuestionNumber(1);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerHistory([]);
    setIsFinished(false);
    setTimedOut(false);
    setTimeLeft(settings.time);
}
                                                                
 function startNewGame() {
    modeEndsAtRef.current = quizMode === "timed"
        ? Date.now() + TIMED_MODE_SECONDS * 1000
        : null;
    setModeTimeLeft(TIMED_MODE_SECONDS);
    setQuestions(
        createGameSession(
            countries,
            QUESTION_COUNT,
            difficultySettings.options
        )
    );

    setQuestionIndex(0);
    setQuestionNumber(1);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
    setTimedOut(false);
    setTimeLeft(difficultySettings.time);
    setAnswerHistory([]);
}

function handleChangeDifficulty() {
    modeEndsAtRef.current = null;
    setQuizMode(null);
    setDifficulty(null);
    setQuestions([]);
    setQuestionIndex(0);
    setQuestionNumber(1);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerHistory([]);
    setIsFinished(false);
    setTimedOut(false);
    setTimeLeft(0);
    setModeTimeLeft(TIMED_MODE_SECONDS);
}

  function handleAnswer(countryName) {
        if (selectedAnswer !== null) {
            return;
        }

        const isCorrect =
            countryName === currentQuestion.correctCountry.name;

        setSelectedAnswer(countryName);

        setAnswerHistory(function (currentHistory) {
            return [
                ...currentHistory,
                {
                    country: currentQuestion.correctCountry.name,
                    flag: currentQuestion.correctCountry.flag,
                    selectedAnswer: countryName,
                    isCorrect,
                    timedOut: false
                }
            ];
        });

            if (isCorrect) {
                setScore(function (currentScore) {
                    return currentScore + 1;
                });
            }
    }

    function handleNextQuestion() {
        const isLastQuestion =
            questionIndex === questions.length - 1;

        if (quizMode === "timed" && isLastQuestion) {
            setQuestions(createGameSession(countries, QUESTION_COUNT, difficultySettings.options));
            setQuestionIndex(0);
        } else if (isLastQuestion) {
            if (score > bestScore) {
                setBestScore(score);
                localStorage.setItem(
                    "flagQuizBestScore",
                    String(score)
                );
            }

            setIsFinished(true);
            return;
        }

        if (!(quizMode === "timed" && isLastQuestion)) {
            setQuestionIndex(function (currentIndex) {
                return currentIndex + 1;
            });
        }
        setQuestionNumber(function (currentNumber) {
            return currentNumber + 1;
        });

        setSelectedAnswer(null);
        setTimedOut(false);
        if (quizMode !== "timed") {
            setTimeLeft(difficultySettings.time);
        }
    }

    function getAnswerClass(countryName) {
        if (selectedAnswer === null) {
            return "answer-button";
        }

        if (countryName === currentQuestion.correctCountry.name) {
            return "answer-button correct-answer";
        }

        if (countryName === selectedAnswer) {
            return "answer-button incorrect-answer";
        }

        return "answer-button disabled-answer";
    }

    if (!quizMode) {
        return (
            <main className="quiz-page">
                <section className="results-card">
                    <p className="quiz-label">FLAG CHALLENGE</p>
                    <h1>Choose a game mode</h1>
                    <p>Play a focused ten-question round or race the clock for five minutes.</p>
                    <div className="difficulty-options game-mode-options">
                        <button className="difficulty-card difficulty-medium" onClick={() => setQuizMode("classic")}>
                            <div className="difficulty-card-top">
                                <span className="difficulty-name">Classic</span>
                                <span className="difficulty-arrow">→</span>
                            </div>
                            <p>Ten flags with a timer for each question.</p>
                            <span className="difficulty-details">Choose your difficulty</span>
                        </button>
                        <button className="difficulty-card difficulty-hard" onClick={() => setQuizMode("timed")}>
                            <div className="difficulty-card-top">
                                <span className="difficulty-name">5-minute challenge</span>
                                <span className="difficulty-arrow">→</span>
                            </div>
                            <p>Answer as many flags as you can before time runs out.</p>
                            <span className="difficulty-details">Five minutes total</span>
                        </button>
                    </div>
                    <Link className="secondary-action difficulty-home-link" to="/">Back home</Link>
                </section>
            </main>
        );
    }

    if (!difficulty) {
        return (
            <main className="quiz-page">
                <section className="results-card">
                    <p className="quiz-label">FLAG CHALLENGE</p>

                    <h1>Choose difficulty</h1>

                    <p>
                        {quizMode === "timed"
                            ? "Pick how many countries appear for each flag. The five-minute clock keeps running between questions."
                            : "Higher difficulties give you less time and more countries to choose from."}
                    </p>

                    <div className="difficulty-options">
    {Object.entries(DIFFICULTIES).map(
        function ([key, settings]) {
            return (
                <button
                    key={key}
                    className={`difficulty-card difficulty-${key}`}
                    onClick={function () {
                        handleDifficultySelect(key);
                    }}
                >
                    <div className="difficulty-card-top">
                                            <span className="difficulty-name">
                                                {settings.label}
                                            </span>

                                            <span className="difficulty-arrow">
                                                →
                                            </span>
                                        </div>

                                        <p>
                                            {quizMode === "timed"
                                                ? "Five minutes total"
                                                : `${settings.time} seconds per question`}
                                        </p>

                                        <span className="difficulty-details">
                                            {settings.options} answer choices
                                        </span>
                                    </button>
                                );
                            }
                        )}
                    </div>

                    <Link
                        className="secondary-action difficulty-home-link"
                        to="/"
                    >
                        Back home
                    </Link>
                </section>
            </main>
        );
    }

    if (isFinished) {
        return (
            <main className="quiz-page">
                <section className="results-card">
                    <p className="quiz-label">SESSION COMPLETE</p>

                    <h1>Nice work!</h1>

                    <p className="final-score">
                        {quizMode === "timed" ? (
                            <>You scored <strong>{score} correct</strong> in five minutes.</>
                        ) : (
                            <>You scored <strong>{score} out of {questions.length}</strong></>
                        )}
                    </p>

                    <p>
                        {quizMode === "timed"
                            ? answerHistory.length > 0
                                ? `Accuracy: ${Math.round((score / answerHistory.length) * 100)}% of answered flags.`
                                : "No flags were answered this round."
                            : `That is ${Math.round((score / questions.length) * 100)}% correct.`}
                    </p>
                    {quizMode === "classic" && (
                        <p className="best-score">
                            Best score: <strong>{bestScore}/{questions.length}</strong>
                        </p>
                    )}
                    <div className="answer-review">
                        <h2>Question review</h2>

                        <div className="review-list">
                            {answerHistory.map(function (answer, index) {
                                return (
                                    <article
                                        className={
                                            answer.isCorrect
                                                ? "review-item review-correct"
                                                : "review-item review-incorrect"
                                        }
                                        key={`${answer.country}-${index}`}
                                    >
                                        <img
                                            src={answer.flag}
                                            alt={`Flag of ${answer.country}`}
                                        />

                                        <div className="review-details">
                                            <div className="review-heading">
                                                <span>Question {index + 1}</span>

                                                <strong>
                                                    {answer.isCorrect
                                                        ? "Correct"
                                                        : answer.timedOut
                                                        ? "Timed out"
                                                        : "Incorrect"}
                                                </strong>
                                            </div>

                                            <p>
                                                Correct answer:{" "}
                                                <strong>{answer.country}</strong>
                                            </p>

                                            {!answer.isCorrect && !answer.timedOut && (
                                                <p>
                                                    Your answer:{" "}
                                                    <strong>
                                                        {answer.selectedAnswer}
                                                    </strong>
                                                </p>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions">
                       <button
                            className="primary-action"
                            onClick={startNewGame}
                        >
                            Play again
                        </button>

                        <button
                            className="secondary-action"
                            onClick={handleChangeDifficulty}
                        >
                            Change game mode
                        </button>

                        <Link className="secondary-action" to="/">
                            Back home
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="quiz-page">
            <section className="quiz-container">
                <header className="quiz-header">
                    <div>
                        <p className="quiz-label">FLAG CHALLENGE</p>

                        <h1>Which country has this flag?</h1>
                    </div>

                    <div className="quiz-stats">
                        <div>
                            <span>{quizMode === "timed" ? "Question" : "Question"}</span>
                            <strong>
                                {quizMode === "timed" ? questionNumber : `${questionIndex + 1}/${questions.length}`}
                            </strong>
                        </div>

                        <div>
                            <span>Score</span>
                            <strong>{score}</strong>
                        </div>
                        <div className={(quizMode === "timed" ? modeTimeLeft : timeLeft) <= 10 ? "timer timer-warning" : "timer"}>
                            <span>{quizMode === "timed" ? "Time left" : "Time"}</span>
                            <strong>{quizMode === "timed" ? formatTime(modeTimeLeft) : `${timeLeft}s`}</strong>
                        </div>
                    </div>
                </header>

                <div className="progress-track">
                    <div
                        className="progress-value"
                        style={{
                            width: `${
                                quizMode === "timed"
                                    ? ((TIMED_MODE_SECONDS - modeTimeLeft) / TIMED_MODE_SECONDS) * 100
                                    : ((questionIndex + 1) / questions.length) * 100
                            }%`
                        }}
                    />
                </div>

                <div className="flag-card">
                    <img
                        src={currentQuestion.correctCountry.flag}
                        alt="Identify this national flag"
                    />
                </div>

                <div className="answer-grid">
                    {currentQuestion.options.map(function (country) {
                        return (
                            <button
                                key={country.name}
                                className={getAnswerClass(
                                    country.name
                                )}
                                onClick={function () {
                                    handleAnswer(country.name);
                                }}
                                disabled={selectedAnswer !== null}
                            >
                                {country.name}
                            </button>
                        );
                    })}
                </div>

                {selectedAnswer !== null && (
                    <div className="feedback-area">
                        <p>
                            {timedOut
                                ? `Time expired. The correct answer is ${currentQuestion.correctCountry.name}.`
                                : selectedAnswer === currentQuestion.correctCountry.name
                                ? "Correct!"
                                : `The correct answer is ${currentQuestion.correctCountry.name}.`}
                        </p>

                        <button
                            className="primary-action"
                            onClick={handleNextQuestion}
                        >
                            {quizMode === "timed"
                                ? "Next question"
                                : questionIndex === questions.length - 1
                                ? "See results"
                                : "Next question"}
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Flags;