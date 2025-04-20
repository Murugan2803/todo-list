import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import { ThemeProvider } from "./Component/ThemeContext";
import Todopage from "./Component/TodoPage";
const App = () => {
  const [user, setUser] = useState(localStorage.getItem("token"));

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route
            path="/"
            element={user ? <Todopage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
export default App;