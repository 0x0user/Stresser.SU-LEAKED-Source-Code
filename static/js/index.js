import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/font.css'
import './assets/reset.css';
import './assets/bootstrap-grid.min.css';
import './assets/perfect-scrollbar.css';
import './assets/main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
