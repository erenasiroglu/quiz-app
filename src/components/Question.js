import React, { useState, useEffect } from "react";

const Question = ({ question, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { title, body } = question;

  useEffect(() => {
    setSelectedAnswer("");
  }, [question]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelect(answer);
  };

  return (
    <div className="question-container">
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="answer-options">
        <button
          className={`answer-btn ${selectedAnswer === "A" && "selected"}`}
          onClick={() => handleAnswerClick("A")}
        >
          A
        </button>
        <button
          className={`answer-btn ${selectedAnswer === "B" && "selected"}`}
          onClick={() => handleAnswerClick("B")}
        >
          B
        </button>
        <button
          className={`answer-btn ${selectedAnswer === "C" && "selected"}`}
          onClick={() => handleAnswerClick("C")}
        >
          C
        </button>
        <button
          className={`answer-btn ${selectedAnswer === "D" && "selected"}`}
          onClick={() => handleAnswerClick("D")}
        >
          D
        </button>
      </div>
    </div>
  );
};

export default Question;
