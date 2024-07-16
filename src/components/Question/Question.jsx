import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Question = ({ question, onAnswerSelect, disabled, questionNumber, showNotification }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { title, body } = question;

  useEffect(() => {
    setSelectedAnswer("");
  }, [question]);

  const handleAnswerClick = (answer) => {
    if (!disabled) {
      setSelectedAnswer(answer);
      onAnswerSelect(answer);
    } else {
      showNotification("Please wait for the first 10 seconds to answer.");
    }
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionHeader}>
        <h2>Question {questionNumber}</h2>
        <p>{title}</p>
      </div>
      <p>{body}</p>
      <div className={styles.answerOptions}>
        {["A", "B", "C", "D"].map((answer) => (
          <button
            key={answer}
            className={`${styles.answerBtn} ${selectedAnswer === answer ? styles.selected : ""}`}
            onClick={() => handleAnswerClick(answer)}
            disabled={disabled}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
