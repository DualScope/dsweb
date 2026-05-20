import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CodeByCSSPicker from './code-by-csspicker';
import AboutUsPage from './aboutuspage';
import ServicesPage from './ServicesPage';
import ContactsPage from './ContactsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CodeByCSSPicker />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/aboutuspage" element={<Navigate to="/about" replace />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
    </Routes>
  );
}

export default App;
