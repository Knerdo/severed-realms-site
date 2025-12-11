import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import './styles.css';

// This imports the main App file we wrote
import App from "./App";

// This finds the main "container" in your HTML and puts your app inside it
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
