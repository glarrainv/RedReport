import React from "react";
import ReactDOM from "react-dom/client";
import App from "./SelectHall.tsx";
import ReactMap from "./Map.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/map" element={<ReactMap />} />
      <Route path="/client" element={<App />} />
      <Route path="/client/map" element={<ReactMap />} />
    </Routes>
  </BrowserRouter>
);
