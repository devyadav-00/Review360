import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import Footer from "./components/Footer";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          {/* <Route path="/login" element={<LoginPage />}></Route> */}
          {/* <Route path="/register" element= {<RegisterPage />}></Route> */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;