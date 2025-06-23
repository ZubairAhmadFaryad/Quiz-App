import React, { useState } from "react";
import { questions } from "../data";
import Question from "./Question";
import Result from "./Result";

const Quiz = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (selected) => {
    const currentQuestion = questions[currentIndex];
    if (selected === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handleEndQuiz = () => {
    setFinished(true);
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setFinished(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="start-screen">
        <h2>Welcome to the Quiz</h2>
        <button onClick={() => setStarted(true)}>Start Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {finished ? (
        <Result
          score={score}
          total={questions.length}
          onRestart={restartQuiz}
        />
      ) : (
        <>
          <Question
            questionData={questions[currentIndex]}
            onAnswer={handleAnswer}
            timer={15}
          />
          <button onClick={handleEndQuiz} style={{ marginTop: "20px" }}>
            ❌ End Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
