import React, { useState, useEffect } from "react";
import Question from "../Question/Question";
import Timer from "../Timer/Timer";
import Results from "../Results/Results";
import Notification from "../Notification/Notification";
import { fetchQuestions } from "../../services/api";
import styles from "./styles.module.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [showResults, setShowResults] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

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
        if (prev <= 20) {
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

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      setDisabled(true);
    } else {
      setShowResults(true);
    }
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
    <div className={styles.container}>
      {!showResults && (
        <>
          <Timer timeLeft={timeLeft} />
          <div className={styles.containerInner}>
            {!showResults && questions.length > 0 && (
              <>
                <Question
                  question={questions[currentQuestionIndex]}
                  onAnswerSelect={handleAnswerSelect}
                  disabled={disabled}
                  questionNumber={currentQuestionIndex + 1}
                  showNotification={showNotificationMessage}
                  timeLeft={timeLeft}
                />
                {!disabled && answers[currentQuestionIndex] && (
                  <button
                    className={styles.nextButton}
                    onClick={handleNextQuestion}
                  >
                    Next Question
                  </button>
                )}
              </>
            )}
          </div>
          <p className={styles.info}>
            You can't return to previous questions once you proceed.
          </p>
        </>
      )}
      {showResults && (
        <Results
          questions={questions}
          answers={answers}
          onRestart={restartQuiz}
        />
      )}
      {showNotification && <Notification message={notificationMessage} />}
    </div>
  );
};

export default Quiz;
