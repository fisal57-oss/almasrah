import React from 'react';
import ReactDOM from 'react-dom/client';
import BeneficiaryApp from './BeneficiaryApp.jsx';
import './index.css';

const rootElement = document.getElementById('beneficiary-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BeneficiaryApp />
    </React.StrictMode>
  );
}
