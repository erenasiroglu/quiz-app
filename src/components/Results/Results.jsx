import React from "react";
import styles from "./styles.module.css";

const Results = ({ questions, answers, onRestart }) => {
  const correctAnswers = questions.filter((q, index) => q.correctAnswer === answers[index]).length;
  const totalQuestions = questions.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.resultsTitle}>Quiz Results</h2>
      <div className={styles.scoreCard}>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreText}>{score}%</span>
        </div>
        <p className={styles.scoreDescription}>
          You got {correctAnswers} out of {totalQuestions} questions correct.
        </p>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id} className={styles.resultItem}>
                <td>{question.title}</td>
                <td className={question.correctAnswer === answers[index] ? styles.correct : styles.incorrect}>
                  {answers[index] || "-"}
                </td>
                <td>{question.correctAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onRestart} className={styles.restartBtn}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;