import React, { useEffect, useState } from "react";

const Question = ({ questionData, onAnswer, timer }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(timer);

  useEffect(() => {
    setShuffledOptions(
      [...questionData.options].sort(() => Math.random() - 0.5)
    );
    setSecondsLeft(timer);
  }, [questionData, timer]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          onAnswer(null); // auto skip
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [onAnswer]);

  return (
    <div className="question-card">
      <h3>{questionData.question}</h3>
      <div className="options">
        {shuffledOptions.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <p>⏱️ Time left: {secondsLeft}s</p>
    </div>
  );
};

export default Question;
