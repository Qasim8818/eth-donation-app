import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// ✅ Correct (assuming App is inside src/)
import App from "./App"; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
