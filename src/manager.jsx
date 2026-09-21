import React from 'react';
import ReactDOM from 'react-dom/client';
import ManagerPortal from './components/ManagerPortal.jsx';
import './index.css';

const rootElement = document.getElementById('manager-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ManagerPortal />
    </React.StrictMode>
  );
}
