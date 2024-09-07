import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTopics } = location.state; // Only selectedTopics is passed via state

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          "https://quizzapp-jih9.onrender.com/api/questions",
          { topics: selectedTopics }
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [selectedTopics]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      // Retrieve the userId from localStorage
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "https://quizzapp-jih9.onrender.com/api/submit-quiz",
        {
          userId, // Pass the userId from localStorage
          answers: selectedAnswers, // Pass the selected answers
          selectedTopics, // Pass the selected topics
        }
      );

      // Navigate to the results page with the quiz results
      navigate("/results", {
        state: {
          score: response.data.score,
          correctAnswers: response.data.correctAnswers,
          userAnswers: selectedAnswers,
        },
      });
    } catch (error) {
      console.error(
        "Error submitting quiz:",
        error.response?.data?.message || error.message
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  if (questions.length === 0)
    return <div>No questions available for the selected topics.</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-2xl font-bold mb-4">{`Question ${
        currentQuestionIndex + 1
      }/${questions.length}`}</h2>
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <p className="text-lg">{currentQuestion.question}</p>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border cursor-pointer ${
                selectedAnswers[currentQuestion._id] === option
                  ? "bg-blue-700"
                  : "bg-gray-700"
              }`}
              onClick={() => handleAnswerSelect(currentQuestion._id, option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNextQuestion}
        className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
      >
        {currentQuestionIndex < questions.length - 1
          ? "Next Question"
          : "Submit Quiz"}
      </button>
    </div>
  );
};

export default QuizPage;
