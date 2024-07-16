import React from "react";

const Results = ({ questions, answers, onRestart }) => {
  return (
    <div className="results-container">
      <h2>Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question.id} className="result-item">
              <td>{question.title}</td>
              <td>{answers[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRestart} className="restart-btn">
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
