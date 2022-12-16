import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SocketProvider } from './context-providers/socket.provider';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketProvider>
      <App />
  </SocketProvider>
);


