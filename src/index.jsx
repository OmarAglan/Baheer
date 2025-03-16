import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { ResultContextProvider } from "./contexts/ResultContextProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ResultContextProvider>
        <BrowserRouter>
            <StrictMode>
                <App />
            </StrictMode>
        </BrowserRouter>
    </ResultContextProvider>
);