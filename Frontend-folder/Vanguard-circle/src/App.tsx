import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

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
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>

      <Toaster position="top-right" richColors closeButton duration={3000} />

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
