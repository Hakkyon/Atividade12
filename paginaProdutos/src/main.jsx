import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './pages/Login';
import CriarLogin from './pages/CriarLogin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/criar-login" element={<CriarLogin />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
