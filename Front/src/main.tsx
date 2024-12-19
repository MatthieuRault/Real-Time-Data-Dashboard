import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./App.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
