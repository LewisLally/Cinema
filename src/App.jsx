import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.css';

import { Home } from './Home';
import { ContactUs } from './ContactUs';
import { MovieDetail } from './MovieDetail';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="background" />

      <div className="navigation">
        <nav>
          <button onClick={() => navigate('/')}>Home Page</button>
          <button onClick={() => navigate('/ContactUs')}>Contact Us</button>
        </nav>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;