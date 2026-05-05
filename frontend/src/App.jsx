import Navbar from "./components/Navbar";

import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
  const { theme, initializeTheme } = useThemeStore()

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  console.log({ authUser });

  // if (isCheckingAuth && !authUser) return (
  //   <div className="flex items-center justify-center h-screen">
  //     <Loader className="size-10 animate-spin" />
  //   </div>
  // )
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>

      <Navbar />

      {/* <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

        <Route path="*" element={<NotFound />} />
      </Routes> */}

      <Routes>

        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />

        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />

        <Route path="/forgot-password" element={!authUser ? <ForgotPassword /> : <Navigate to="/" />} />

        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />

    </div>
  );
};
export default App;