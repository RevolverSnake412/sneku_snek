import React from 'react';
import { BrowserRouter as Router, Route, Routes as R } from 'react-router-dom';
import Header from './components/Layout/Header';
import { AuthProvider } from './components/Layout/AuthContext';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
        <R>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </R>
    </Router>
    <Footer />
    </AuthProvider>
  );
}

export default App;
