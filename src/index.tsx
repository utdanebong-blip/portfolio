import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter } from "react-router-dom"; // Use HashRouter for GitHub Pages

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);