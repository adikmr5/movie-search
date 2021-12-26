import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute component={HomePage} />}
            ></Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login></Login>} />
          </Routes>
        </AuthProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
