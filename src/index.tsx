import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import { LogedUserProvider } from "./context/logedUserContext";
import { VariablesProvider } from "./context/variablesContext";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <VariablesProvider>
    <LogedUserProvider>
    <App />
    </LogedUserProvider>
    </VariablesProvider>
  </React.StrictMode>
);

reportWebVitals();
