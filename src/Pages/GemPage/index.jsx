import React, { useState, useEffect } from "react";
import HeroSection from "../../Components/GemPageComponents/HeroSection";
import SavePatients from "../../Components/GemPageComponents/SavePatients";
import WhatMakesGemDiffer from "../../Components/GemPageComponents/WhatMakesGemDiffer";
import GemSlider from "../../Components/GemPageComponents/GemSlider";
import "../../Components/GemPageComponents/style.css";
import { FaHeartbeat } from "react-icons/fa";
import DonateMonthlyModal from "../../Components/GemPageComponents/DonateMonthlyModal";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

const GemPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/flash-card/get-all`);
        const flashcards = response.data || [];

        const formattedMessages = flashcards.map(card =>
          `${card.name} from ${card.city} started donating ₹ ${card.amount} monthly`
        );

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Failed to load flashcard messages:", error);
      }
    };

    fetchMessages();
  }, []);


  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
        setFade(true);
      }, 500); // Duration of the fade out transition
    }, 2000); // Change content every 3 seconds
    return () => clearInterval(interval);
  }, [messages]);


  return (
    <div>
      <HeroSection />
      <SavePatients />
      <WhatMakesGemDiffer />
      <GemSlider />
      {messages.length > 0 && (
        <div className={`discount-strip ${fade ? "fade-in" : "fade-out"}`}>
          <div>
            <FaHeartbeat size={30} style={{ color: "#ffe15f" }} />
          </div>
          <div>{messages[currentMessage]}</div>
        </div>
      )}
      <DonateMonthlyModal />
    </div>
  );
};

export default GemPage;
