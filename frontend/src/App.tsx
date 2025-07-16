import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReviewDetails from './pages/ReviewDetails';
import SiteHeader from './components/SiteHeader';

function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/review/:documentId" element={<ReviewDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
