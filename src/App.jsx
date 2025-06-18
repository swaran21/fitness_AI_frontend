import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { setCredentials, logout as logoutAction } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => (
  <div className="space-y-8">
    <ActivityForm />
    <ActivityList />
  </div>
);

function App() {
  const { token, tokenData } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
    }
    // Simulate initial loading
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [token, tokenData, dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.clear();

    const keycloakLogoutUrl =
      "http://localhost:8181/realms/fitness-oauth2/protocol/openid-connect/logout";
    const redirectUri = encodeURIComponent("http://localhost:5173/");
    const logoutUrl = `${keycloakLogoutUrl}?redirect_uri=${redirectUri}`;
    window.location.href = logoutUrl;
  };

  return (
    <Router>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-pink-500 border-opacity-50"></div>
        </div>
      ) : !token ? (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">
            Welcome to Fitness AI 🏃‍♀️
          </h1>
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:8181/realms/fitness-oauth2/protocol/openid-connect/auth?client_id=oauth2-pkce-client&redirect_uri=http://localhost:5173/&scope=openid%20profile%20email%20offline_access&response_type=code")
            }
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all"
          >
            Login with Keycloak
          </button>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 flex justify-center">
          <div className="w-full max-w-6xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Dashboard
              </h2>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-5 rounded-lg transition shadow-sm"
              >
                Logout
              </button>
            </div>

            <Routes>
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/" element={<Navigate to="/activities" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
