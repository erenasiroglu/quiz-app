import React, { useState, useEffect } from "react";
import Question from "./Question";
import Timer from "./Timer";
import Results from "./Results";
import { fetchQuestions } from "../services/api";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [showResults, setShowResults] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(30);
            setDisabled(true);
          } else {
            setShowResults(true);
          }
          return 0;
        }
        if (prev === 20) {
          setDisabled(false);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions.length]);

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const restartQuiz = async () => {
    try {
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
      setCurrentQuestionIndex(0);
      setAnswers(Array(10).fill(""));
      setShowResults(false);
      setDisabled(true);
      setTimeLeft(30);
    } catch (error) {
      console.error("error ", error);
    }
  };

  return (
    <div className="quiz-container">
      {!showResults && questions.length > 0 && (
        <>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            disabled={disabled}
          />
          <Timer timeLeft={timeLeft} />
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
