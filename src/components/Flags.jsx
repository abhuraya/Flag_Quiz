import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import countries from "../data/countries";
import { createGameSession } from "../utils/quizHelpers";



const QUESTION_COUNT = 10;
const QUESTION_TIME = 15;

function Flags() {
   const initialQuestions = useMemo(function () {
    return createGameSession(countries, QUESTION_COUNT);
    }, []);

    const [questions, setQuestions] = useState(initialQuestions);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerHistory, setAnswerHistory] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = questions[questionIndex];
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const [timedOut, setTimedOut] = useState(false);
    const [bestScore, setBestScore] = useState(function () {
    const savedBestScore = localStorage.getItem("flagQuizBestScore");

    return savedBestScore ? Number(savedBestScore) : 0;
    });

    useEffect(function () {
    if (selectedAnswer !== null || isFinished) {
        return undefined;
    }

    if (timeLeft === 0) {
        setTimedOut(true);
        setSelectedAnswer("TIME_OUT");

        setAnswerHistory(function (currentHistory) {
            return [
                ...currentHistory,
                {
                    country: currentQuestion.correctCountry.name,
                    flag: currentQuestion.correctCountry.flag,
                    selectedAnswer: null,
                    isCorrect: false,
                    timedOut: true
                }
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
    }, [timeLeft, 
        selectedAnswer, 
        isFinished, 
        currentQuestion]);
                                                                
    function startNewGame() {
        setQuestions(createGameSession(countries, QUESTION_COUNT));
        setQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsFinished(false);
        setTimedOut(false);
        setTimeLeft(QUESTION_TIME);
        setAnswerHistory([]);
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

         if (isLastQuestion) {
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

        setQuestionIndex(function (currentIndex) {
            return currentIndex + 1;
        });

        setSelectedAnswer(null);
        setTimedOut(false);
        setTimeLeft(QUESTION_TIME);
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

    if (isFinished) {
        return (
            <main className="quiz-page">
                <section className="results-card">
                    <p className="quiz-label">SESSION COMPLETE</p>

                    <h1>Nice work!</h1>

                    <p className="final-score">
                        You scored{" "}
                        <strong>
                            {score} out of {questions.length}
                        </strong>
                    </p>

                    <p>
                        That is{" "}
                        {Math.round(
                            (score / questions.length) * 100
                        )}
                        % correct.
                    </p>
                    <p className="best-score">
                        Best score: <strong>{bestScore}/{questions.length}</strong>
                    </p>
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
                            <span>Question</span>
                            <strong>
                                {questionIndex + 1}/{questions.length}
                            </strong>
                        </div>

                        <div>
                            <span>Score</span>
                            <strong>{score}</strong>
                        </div>
                        <div className={timeLeft <= 5 ? "timer timer-warning" : "timer"}>
                            <span>Time</span>
                            <strong>{timeLeft}s</strong>
                        </div>
                    </div>
                </header>

                <div className="progress-track">
                    <div
                        className="progress-value"
                        style={{
                            width: `${
                                ((questionIndex + 1) /
                                    questions.length) *
                                100
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
                            {questionIndex === questions.length - 1
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