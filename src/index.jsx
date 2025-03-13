import react from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router";
import { StrictMode } from "react"
import { ResultContextProvider } from "./contexts/ResultContextProvider"
import App from "./App"
import "./index.css"
ReactDOM.createRoot(document.getElementById("root")).render(
    <ResultContextProvider>
        <BrowserRouter>
            <StrictMode>
                <App />
            </StrictMode>
        </BrowserRouter>
    </ResultContextProvider>
)