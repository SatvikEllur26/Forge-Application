import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CarDetail from "./CarDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
        {/* Car Detail Page */}
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
