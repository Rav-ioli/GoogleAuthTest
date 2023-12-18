import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import AppRoutes from "./AppRoutes";
import Home from "./Pages/Home";
import GoogleLogin from "./Pages/GoogleLogin";
import VoegVoorstellingToe from "./Pages/VoegVoorstellingToe";
import Inloggen from "./Pages/Login";
import AdminPanel from "./Pages/AdminPanel";
import PrivateRoute from "./PrivateRoute";
import { UserProvider } from "./UserContext";
import {jwtDecode} from "jwt-decode";
import { useState, useEffect } from "react";


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/adminpanel"
            element={
              <PrivateRoute roles={["AdminOnly"]}>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/google-login" element={<GoogleLogin />} />
          <Route
            path="/voeg-voorstelling-toe"
            element={<VoegVoorstellingToe />}
          />
          <Route path="/login" element={<Inloggen />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
