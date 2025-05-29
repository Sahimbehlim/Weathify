import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WeatherProvider from "./context/WeatherContext.jsx";

createRoot(document.getElementById("root")).render(
  <WeatherProvider>
    <App />
  </WeatherProvider>
);
