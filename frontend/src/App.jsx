import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Customize from "./pages/Customize";
import Home from "./pages/Home";
import { userDataContext } from "./context/UserContext";
import { useContext } from "react";
import Customize2 from "./pages/Customize2";

function App() {
  const { userData, setUserData } = useContext(userDataContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName ? (
            <Home />
          ) : (
            <Navigate to={"/customize"} />
          )
        }
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/customize"} />}
      />
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to={"/signup"} />}
      />
      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to={"/signup"} />}
      />
    </Routes>
  );
}
export default App;
