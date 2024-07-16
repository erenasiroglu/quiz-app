import React from "react";
import styles from "./styles.module.css";

const Results = ({ questions, answers, onRestart }) => {
  return (
    <div className={styles.resultsContainer}>
      <h2>Results</h2>
      <table className={styles.resultsTable}>
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question.id} className={styles.resultItem}>
              <td>{question.title}</td>
              <td>{answers[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRestart} className={styles.restartBtn}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
