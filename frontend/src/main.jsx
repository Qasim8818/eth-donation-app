import React from 'react';
import ReactDOM from 'react-dom/client';
// ✅ Correct (assuming App is inside src/)
import App from "./App"
import './index.css'; // or './App.css' if you added it there


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
