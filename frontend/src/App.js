import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sahi paths (case-sensitive hote hain)
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Category from './pages/Category';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bags" element={<Category category="bags" />} />
          <Route path="/sofas" element={<Category category="sofas" />} />
          <Route path="/cars" element={<Category category="cars" />} />
          <Route path="/bikes" element={<Category category="bikes" />} />
          <Route path="/auto" element={<Category category="auto" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
