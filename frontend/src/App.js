import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load components
const LazyHome = lazy(() => import("./pages/HomePage"));
const LazyLoginPage = lazy(() => import("./pages/LoginPage"));
const LazyRegisterPage = lazy(() => import("./pages/RegisterPage"));
const LazyAboutUs = lazy(() => import("./pages/AboutUs"));
const LazyContactUs = lazy(() => import("./pages/ContactUs"));
const LazyManagerPage = lazy(() => import("./pages/ManagerPage"));
const LazyEmployeePage = lazy(() => import("./pages/EmployeePage"));
const LazyRateEmployeePage = lazy(() => import("./pages/RateEmployeePage"));
const LazyProfilePage = lazy(() => import("./pages/ProfilePage"));
const LazyUpdateProfilePage = lazy(() => import("./pages/UpdateProfilePage"));

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LazyHome />} />
            <Route path="/login" element={<LazyLoginPage />} />
            <Route path="/register" element={<LazyRegisterPage />} />
            <Route path="/about" element={<LazyAboutUs />} />
            <Route path="/contact" element={<LazyContactUs />} />
            <Route path="/manager/dashboard" element={<LazyManagerPage />} />
            <Route path="/employee/dashboard" element={<LazyEmployeePage />} />
            <Route path="/update-profile" element={<LazyUpdateProfilePage />} />
            <Route path="/rate-employee" element={<LazyRateEmployeePage />} />
            <Route path="/my-profile" element={<LazyProfilePage />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
