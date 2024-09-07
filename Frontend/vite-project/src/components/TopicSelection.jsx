import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopicSelection = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          "https://quizzapp-jih9.onrender.com/api/topics/select"
        );
        // Ensure topics are unique
        const uniqueTopics = Array.from(
          new Set(response.data.map((topic) => topic.topic))
        ).map((topic) => {
          return {
            topic: topic,
            // Find the first entry with this topic (if there are duplicates, keep only one)
            ...response.data.find((t) => t.topic === topic),
          };
        });
        setTopics(uniqueTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  const handleTopicSelection = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic.");
    } else {
      navigate("/questions", { state: { selectedTopics } }); // Passing selectedTopics to QuizPage
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">
        Select Topics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.topic}
            className={`p-6 border border-gray-700 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
              selectedTopics.includes(topic.topic)
                ? "bg-blue-700 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => handleTopicSelection(topic.topic)}
          >
            <h3 className="text-lg font-semibold text-center">{topic.topic}</h3>
            <p className="mt-2 text-sm text-center">Click to select</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default TopicSelection;
