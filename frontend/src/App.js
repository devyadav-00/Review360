import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";


const App = () => {

  const [user, setUser] = useState();




  return (
    <div className="App">
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<HomePage user={user} />}></Route>
          <Route path="/login" element={<LoginPage user={user} setUser={setUser} />}></Route>
          <Route path="/register" element= {<RegisterPage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;