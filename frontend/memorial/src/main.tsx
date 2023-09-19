import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import initMocks from "./mocks/index.ts";

// if (import.meta.env.VITE_APP_ENV === "development") {
//   await initMocks();
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
