import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./Components/Context/CategoryProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId="875529947118-l43lgj1vo8i3a9ju1q7iickfhfoo9icj.apps.googleusercontent.com">
  <CategoryProvider>
    <App />
  </CategoryProvider>
  </GoogleOAuthProvider>
  </BrowserRouter>
);
