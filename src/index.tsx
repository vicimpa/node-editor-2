// import { StrictMode } from "react";
import { WebAudio } from "./components/web-audio";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')!)
  .render(
    // <StrictMode>
    <WebAudio />
    // </StrictMode>
  );