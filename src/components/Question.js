import React, { useState, useEffect } from "react";

const Question = ({ question, onAnswerSelect, disabled }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { title, body } = question;

  useEffect(() => {
    setSelectedAnswer("");
  }, [question]);

  const handleAnswerClick = (answer) => {
    if (!disabled) {
      setSelectedAnswer(answer);
      onAnswerSelect(answer);
    }
  };

  return (
    <div className="question-container">
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="answer-options">
        <button
          className={`answer-btn ${selectedAnswer === "A" && "selected"}`}
          onClick={() => handleAnswerClick("A")}
          disabled={disabled}
        >
          A
        </button>
        <button
          className={`answer-btn ${selectedAnswer === "B" && "selected"}`}
          onClick={() => handleAnswerClick("B")}
          disabled={disabled}
        >
          B
        </button>
        <button
          className={`answer-btn ${selectedAnswer === "C" && "selected"}`}
          onClick={() => handleAnswerClick("C")}
          disabled={disabled}
        >
          C
        </button>
        <button
          className={`answer-btn ${selectedAnswer === "D" && "selected"}`}
          onClick={() => handleAnswerClick("D")}
          disabled={disabled}
        >
          D
        </button>
      </div>
    </div>
  );
};

export default Question;
