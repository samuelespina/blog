import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
