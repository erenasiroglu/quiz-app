import React, { useState, useEffect } from "react";
import Question from "./Question";
import Timer from "./Timer";
import Results from "./Results";
import { fetchQuestions } from "../services/api";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const questionsData = await fetchQuestions();
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestionsData();
  }, []);

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 30000);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 30000);
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    fetchQuestions();
  };

  return (
    <div className="quiz-container">
      {!showResults && questions.length > 0 && (
        <>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
          />
          <Timer />
        </>
      )}
      {showResults && (
        <Results
          questions={questions}
          answers={answers}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
};

export default Quiz;
