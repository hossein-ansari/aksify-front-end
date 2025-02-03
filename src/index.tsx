import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WpCustomProductWoo from './WpCustomProductWoo'; // Base component
import reportWebVitals from "./reportWebVitals";
import { AllDataProvider } from "./_context/context";

// Find the DOM element first
const targetElement = document.getElementById("wp-custom-product-woo");

if (targetElement) {
    const root = ReactDOM.createRoot(targetElement);

    root.render(
        <React.StrictMode>
            <AllDataProvider>
                <WpCustomProductWoo />
            </AllDataProvider>
        </React.StrictMode>
    );
} else {
    console.error("#wp-custom-product-woo element not found. Make sure the div exists in your HTML.");
}

// Optionally measure performance
reportWebVitals();
