import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CodeByCSSPicker from './code-by-csspicker';
import AboutUsPage from './aboutuspage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CodeByCSSPicker />} />
      <Route path="/aboutuspage" element={<AboutUsPage />} />
    </Routes>
  );
}

export default App;
