import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashBoard";

const LandingPage = lazy(() => import("./Pages/LandingPage"));
const Login = lazy(() => import("./Pages/LoginPage"));
const Register = lazy(() => import("./Pages/RegisterPage"));
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardPage/>} />

      </Routes>
    </Suspense>
  );
};

export default App;
