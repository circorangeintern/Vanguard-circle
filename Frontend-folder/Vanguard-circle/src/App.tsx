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
import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";

const App = () => {
  const { pathname } = useLocation();

  const hideLayout =
    [
      "/login",
      "/signup",
      "/forgot-password",
      "/verify-email",
      "/reset-password",
    ].includes(pathname) || pathname.startsWith("/dashboard");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>

      <Toaster position="top-right" richColors closeButton duration={3000} />

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
