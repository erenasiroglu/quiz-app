import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Question = ({ question, onAnswerSelect, disabled, questionNumber, showNotification, timeLeft }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { title, body } = question;

  useEffect(() => {
    setSelectedAnswer("");
  }, [question]);

  const handleAnswerClick = (answer) => {
    if (timeLeft > 20) {
      showNotification("You cannot answer within the first 10 seconds.");
    } else if (!disabled) {
      setSelectedAnswer(answer);
      onAnswerSelect(answer);
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
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;