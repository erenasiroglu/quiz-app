import React from "react";

const Results = ({ questions, answers, onRestart }) => {
  return (
    <div className="results-container">
      <h2>Results</h2>
      {questions.map((question, index) => (
        <div key={question.id} className="result-item">
          <p>
            <strong>{question.title}</strong>
          </p>
          <p>
            <em>Answer:</em> {answers[index]}
          </p>
        </div>
      ))}
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
};

export default Results;
