import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { SettingsProvider } from "./context/SettingsContext";
import { ToastProvider } from "./components/Toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </SettingsProvider>
  </React.StrictMode>
);
