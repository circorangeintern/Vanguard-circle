import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";

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
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
