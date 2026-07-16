import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";

const App = () => {
  const { pathname } = useLocation();

  const hideLayout = [
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
    "/reset-password",
  ].includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyOtpPage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
