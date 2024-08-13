import React from 'react';
import { BrowserRouter as Router, Route, Routes as R } from 'react-router-dom';
import Header from './components/Layout/Header';
import { AuthProvider } from './services/AuthContext';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import About from './components/Auth/About';
import './App.css'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
        <div className='mainContent'>
          <R>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
          </R>
        </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
