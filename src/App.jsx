import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login-page";
import Register from "./components/register-page";
import Profile from "./components/profile-page";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dentist/register/" element={<Register />} />

          <Route path="/dentist/login/" element={<Login />} />
          <Route path="/dentist/Profile/" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
