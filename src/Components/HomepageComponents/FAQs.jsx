import React, { useState, useEffect } from "react";
import "../../assets/styles/FAQs.css";
import { FaStar } from "react-icons/fa6";

const FAQs = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(true);

  const questions = [
    "What is crowdfunding?",
    "Is crowdfunding legal in India?",
    "How much does it cost to raise funds on Fund for Bharat?",
    "Do we need to return the funds raised on donation-based crowdfunding platforms?",
    "What do I need to start a fundraiser on Fund for Bharat?",
  ];

  const answers = [
    "Crowdfunding is a quick and easy way to raise money using the internet and social media. Using an online fundraising platform, you can raise the required amounts through donations from across India to fund any social, medical, personal or creative cause. Campaigners have used online crowdfunding platforms to raise funds for medical treatments such as cancer care, transplants, rare diseases, accident injuries and more. visit here.",
    "Crowdfunding is legal in India. However, the legality depends on the type of crowdfunding and the specific regulations governing it. For example, donation-based and reward-based crowdfunding are generally legal, but equity-based crowdfunding has more stringent regulations.",
    "Fund for Bharat charges a platform fee for the services provided. The cost to raise funds includes this platform fee, payment gateway charges, and GST. The specific amount may vary based on the fundraiser's location and other factors.",
    "No, on donation-based crowdfunding platforms, the funds raised do not need to be returned. These platforms facilitate donations where donors give money without expecting a return. The raised funds are typically used for the stated cause or project.",
    "To start a fundraiser on Fund for Bharat, you need to create an account, set up your campaign by providing details about the cause, upload necessary documents, and promote your campaign to reach potential donors.",
  ];

  const handleQuestionClick = (index) => {
    setAnswerVisible(false);
    setTimeout(() => {
      setActiveQuestion(index);
      setAnswerVisible(true);
    }, 300);
  };

  return (
    <div className="faq-main-container">
      <div className="faq-container my-4">
        <div className="questions-container">
          <ul>
            <h3>FAQs</h3>
            {questions.map((question, index) => (
              <li
                key={index}
                className={activeQuestion === index ? "active-faq" : ""}
                onClick={() => handleQuestionClick(index)}
              >
                {question}
                {activeQuestion === index && (
                  <FaStar size={20} style={{ color: "#ee530b",width:'30px' }} />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`answer-container ${answerVisible ? "visible" : "hidden"}`}
        >
          <h3>Answer</h3>
          <p>{answers[activeQuestion]}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
