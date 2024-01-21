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
import UserPortal from "./Pages/UserPortal";
import Register from "./Pages/Register";
import UserHome from "./Pages/UserHome";
import Onderzoeken from "./Pages/Onderzoeken";
import GedetaileerdOnderzoek from "./Pages/GedetailleerdOnderzoek";
import SetupChat from "./Pages/Chat/SetupChat";
import Gegevens from "./Pages/Gegevens";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/adminportal"
            element={
              <PrivateRoute roles={["AdminOnly"]}>
                <AdminPanel />
              </PrivateRoute>            }          />
          <Route path="/home" element={<Home />} />
          <Route
            path="/ervaringsdeskundigeportal"
            element={
              <PrivateRoute roles={["UserOnly"]}>
                <UserPortal />
              </PrivateRoute>            }          />
            <Route path="/chat" element= {<SetupChat/>}/>
                          <Route path="/UserHome/Gegevens" element={<PrivateRoute roles={["UserOnly"]}><Gegevens/></PrivateRoute>} />

              <Route path="/UserHome/Onderzoeken" element={<PrivateRoute roles={["UserOnly"]}><Onderzoeken/></PrivateRoute>} />
              <Route path="/UserHome/Onderzoeken/Onderzoek" element={<PrivateRoute roles={["UserOnly"]}><GedetaileerdOnderzoek/></PrivateRoute>} />
          <Route path="/*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/GoogleLogin" element={<GoogleLogin />} />
          <Route
            path="/voeg-voorstelling-toe"
            element={<VoegVoorstellingToe />}          />
          <Route path="/login" element={<GoogleLogin />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/UserHome" element={<UserHome />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
