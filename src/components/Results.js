import React from "react";

const Results = ({ questions, answers, onRestart }) => {
  const renderResults = () => {
    return questions.map((question, index) => (
      <div key={question.id} className="result-item">
        <p>
          <strong>{question.title}</strong>
        </p>
        <p>
          <em>Answer:</em> {answers[index]}
        </p>
      </div>
    ));
  };

  return (
    <div className="results-container">
      <h2>Results</h2>
      {renderResults()}
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
};

export default Results;
