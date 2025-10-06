import React, { useEffect, useState } from "react";
import { ADMIN_URL } from "../../constants/constant";

const API_URL = `${ADMIN_URL}/api/admin/button`; 

const DynamicClientButton = () => {
  const [text, setText] = useState("Loading...");
  const [url, setUrl] = useState("#");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {

        });
        const data = await response.json();
        setText(data.text || "Visit");
        setUrl(data.url || "#");
      } catch (err) {
        console.error("Failed to fetch dynamic button config:", err);
        setText("Help");
        setUrl("#");
      }
    };

    fetchData();
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="d-none d-sm-flex help-button"
    >
      <span>{text}</span>
    </a>
  );
};

export default DynamicClientButton;
