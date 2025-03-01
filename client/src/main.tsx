import React from "react";
import ReactDOM from "react-dom/client";
import App from "./SelectHall.tsx";
import ReactMap from "./Map.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ReactMap />
  </React.StrictMode>
);
