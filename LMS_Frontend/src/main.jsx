import React, { StrictMode } from "react"; // ✅ أضفنا StrictMode هنا
import ReactDOM from "react-dom/client";
import App from "./routes/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
