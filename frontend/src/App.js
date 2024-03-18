import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import "./styles/index.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";

function App() {
  const { user } = useSelector((state) => state.auth);

  // const navigate = useNavigate();
  return (
    // <Toaster>
    <div className="App">
      <Router>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route path="/home" element={user ? <Home /> : <Login />} />
        </Routes>
      </Router>
    </div>
    // </Toaster>
  );
}

export default App;
