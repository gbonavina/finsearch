import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Ativo from "./pages/ativo";
import "./styles/home.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ativo/:ticker" element={<Ativo />}/>
      </Routes>
    </Router>
  );
}

export default App;