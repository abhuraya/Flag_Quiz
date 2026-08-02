import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import countries from "../data/countries";

const TOTAL_QUESTIONS = 10;
const QUESTION_TIME = 15;

function shuffle(array) {
    return [...array].sort(function () {
        return Math.random() - 0.5;
    });
}

function createQuestion() {
    const answerOptions = shuffle(countries).slice(0, 4);

    const correctCountry =
        answerOptions[
            Math.floor(Math.random() * answerOptions.length)
        ];

    return {
        correctCountry,
        options: shuffle(answerOptions),
    };
}

export default function Countries() {
    const [question, setQuestion] = useState(createQuestion);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const [isFinished, setIsFinished] = useState(false);
    const [timedOut, setTimedOut] = useState(false);

    const isAnswered = selectedAnswer !== null || timedOut;
    
    useEffect(
            function () {
                if (isFinished || isAnswered) {
                    return;
                }

                if (timeLeft === 0) {
                    setTimedOut(true);
                    return;
                }

                const timer = setTimeout(function () {
                    setTimeLeft(function (currentTime) {
                        return currentTime - 1;
                    });
                }, 1000);

                return function () {
                    clearTimeout(timer);
                };
            },
            [timeLeft, isAnswered, isFinished]
        );

    function handleAnswer(country) {
        if (isAnswered) {
            return;
        }

        setSelectedAnswer(country);

        if (country.name === question.correctCountry.name) {
            setScore(function (currentScore) {
                return currentScore + 1;
            });
        }
    }

    function handleNextQuestion() {
        const isLastQuestion =
            questionNumber === TOTAL_QUESTIONS;

        if (isLastQuestion) {
            setIsFinished(true);
            return;
        }

        setQuestion(createQuestion());
        setSelectedAnswer(null);
        setTimedOut(false);
        setTimeLeft(QUESTION_TIME);

        setQuestionNumber(function (currentNumber) {
            return currentNumber + 1;
        });
    }

    function handleRestart() {
        setQuestion(createQuestion());
        setSelectedAnswer(null);
        setScore(0);
        setQuestionNumber(1);
        setTimeLeft(QUESTION_TIME);
        setIsFinished(false);
        setTimedOut(false);
    }

    if (isFinished) {
        return (
            <>
                <CssBaseline />

                <Box
                    sx={{
                        minHeight: "100vh",
                        background:
                            "linear-gradient(180deg, #071426 0%, #0d2038 100%)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        py: 5,
                    }}
                >
                    <Container maxWidth="sm">
                        <Box
                            sx={{
                                textAlign: "center",
                                backgroundColor:
                                    "rgba(255,255,255,0.07)",
                                border:
                                    "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "24px",
                                px: {
                                    xs: 3,
                                    md: 6,
                                },
                                py: {
                                    xs: 5,
                                    md: 7,
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#5eead4",
                                    fontWeight: 700,
                                    letterSpacing: 2,
                                    textTransform: "uppercase",
                                    mb: 1,
                                }}
                            >
                                Session Complete
                            </Typography>

                            <Typography
                                component="h1"
                                sx={{
                                    fontSize: {
                                        xs: "2.4rem",
                                        md: "3.8rem",
                                    },
                                    fontWeight: 800,
                                    mb: 2,
                                }}
                            >
                                Your Score
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "4rem",
                                        md: "6rem",
                                    },
                                    fontWeight: 800,
                                    lineHeight: 1,
                                    color: "#5eead4",
                                    mb: 2,
                                }}
                            >
                                {score}/{TOTAL_QUESTIONS}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.7)",
                                    mb: 4,
                                }}
                            >
                                You matched {score} countries with their
                                correct flags.
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    justifyContent: "center",
                                    gap: 2,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleRestart}
                                    sx={{
                                        backgroundColor: "#5eead4",
                                        color: "#071426",
                                        fontWeight: 800,
                                        borderRadius: "12px",
                                        px: 4,
                                        py: 1.3,

                                        "&:hover": {
                                            backgroundColor: "#99f6e4",
                                        },
                                    }}
                                >
                                    Play Again
                                </Button>

                                <Button
                                    component={Link}
                                    to="/"
                                    sx={{
                                        color: "white",
                                        border:
                                            "1px solid rgba(255,255,255,0.25)",
                                        borderRadius: "12px",
                                        px: 4,
                                        py: 1.3,

                                        "&:hover": {
                                            borderColor: "#5eead4",
                                            backgroundColor:
                                                "rgba(94,234,212,0.08)",
                                        },
                                    }}
                                >
                                    Home
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </>
        );
    }

    return (
        <>
            <CssBaseline />

            <Box
                sx={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(180deg, #071426 0%, #0d2038 100%)",
                    color: "white",
                    py: {
                        xs: 4,
                        md: 7,
                    },
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 4,
                        }}
                    >
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                color: "rgba(255,255,255,0.75)",
                                border:
                                    "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "12px",
                                px: 2.5,
                                py: 1,

                                "&:hover": {
                                    color: "white",
                                    borderColor: "#5eead4",
                                    backgroundColor:
                                        "rgba(94,234,212,0.08)",
                                },
                            }}
                        >
                            ← Home
                        </Button>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 3,
                                textAlign: "center",
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        color:
                                            "rgba(255,255,255,0.5)",
                                        fontSize: "0.8rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Score
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {score}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        color:
                                            "rgba(255,255,255,0.5)",
                                        fontSize: "0.8rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Question
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {questionNumber}/{TOTAL_QUESTIONS}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        color:
                                            "rgba(255,255,255,0.5)",
                                        fontSize: "0.8rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Time
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: "1.2rem",
                                        color:
                                            timeLeft <= 5
                                                ? "#fb7185"
                                                : "white",
                                    }}
                                >
                                    {timeLeft}s
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            textAlign: "center",
                            mb: 5,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#5eead4",
                                fontWeight: 700,
                                letterSpacing: 2,
                                textTransform: "uppercase",
                                mb: 1,
                            }}
                        >
                            Country Challenge
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{
                                fontSize: {
                                    xs: "2.2rem",
                                    md: "3.6rem",
                                },
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Find the Flag
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.65)",
                                mb: 4,
                            }}
                        >
                            Which flag belongs to this country?
                        </Typography>

                        <Box
                            sx={{
                                display: "inline-flex",
                                backgroundColor:
                                    "rgba(255,255,255,0.08)",
                                border:
                                    "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "18px",
                                px: {
                                    xs: 3,
                                    md: 6,
                                },
                                py: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "2rem",
                                        md: "3rem",
                                    },
                                    fontWeight: 800,
                                }}
                            >
                                {question.correctCountry.name}
                            </Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={3}>
                        {question.options.map(function (country) {
                            const isSelected =
                                selectedAnswer?.name === country.name;

                            const isCorrect =
                                country.name ===
                                question.correctCountry.name;

                            let borderColor =
                                "rgba(255,255,255,0.12)";
                            let backgroundColor =
                                "rgba(255,255,255,0.06)";

                            if (isAnswered && isCorrect) {
                                borderColor = "#4ade80";
                                backgroundColor =
                                    "rgba(74,222,128,0.14)";
                            } else if (
                                isAnswered &&
                                isSelected &&
                                !isCorrect
                            ) {
                                borderColor = "#fb7185";
                                backgroundColor =
                                    "rgba(251,113,133,0.14)";
                            }

                            return (
                                <Grid
                                    key={country.name}
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                    }}
                                >
                                    <Button
                                        fullWidth
                                        onClick={function () {
                                            handleAnswer(country);
                                        }}
                                        disabled={isAnswered}
                                        sx={{
                                            height: {
                                                xs: "180px",
                                                md: "220px",
                                            },
                                            backgroundColor,
                                            border: `2px solid ${borderColor}`,
                                            borderRadius: "18px",
                                            p: 3,
                                            transition:
                                                "transform 0.2s ease, border-color 0.2s ease",
                                            opacity: 1,

                                            "&:hover": {
                                                backgroundColor,
                                                transform:
                                                    isAnswered
                                                        ? "none"
                                                        : "translateY(-5px)",
                                                borderColor:
                                                    isAnswered
                                                        ? borderColor
                                                        : "#5eead4",
                                            },

                                            "&.Mui-disabled": {
                                                color: "white",
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={country.flag}
                                            alt={`${country.name} flag`}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {isAnswered && (
                        <Box
                            sx={{
                                textAlign: "center",
                                mt: 5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1.4rem",
                                    fontWeight: 700,
                                    color:
                                        selectedAnswer?.name ===
                                        question.correctCountry.name
                                            ? "#4ade80"
                                            : "#fb7185",
                                    mb: 3,
                                }}
                            >
                                {timedOut
                                    ? "Time's up!"
                                    : selectedAnswer?.name ===
                                      question.correctCountry.name
                                    ? "Correct!"
                                    : "Not quite"}
                            </Typography>

                            <Button
                                variant="contained"
                                onClick={handleNextQuestion}
                                sx={{
                                    backgroundColor: "#5eead4",
                                    color: "#071426",
                                    fontWeight: 800,
                                    borderRadius: "12px",
                                    px: 4,
                                    py: 1.3,

                                    "&:hover": {
                                        backgroundColor: "#99f6e4",
                                    },
                                }}
                            >
                                {questionNumber === TOTAL_QUESTIONS
                                    ? "View Results"
                                    : "Next Country"}
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
}