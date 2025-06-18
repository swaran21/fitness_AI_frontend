import React, { useContext, useEffect } from "react";
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
  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
    <ActivityForm />
    <ActivityList />
  </div>
);

function App() {
  const { token, tokenData } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
    }
  }, [token, tokenData, dispatch]);

  const handleLogout = () => {
    // 1. Clear Redux + localStorage
    dispatch(logoutAction());
    localStorage.clear(); // 👈 full wipe just in case

    // 2. Keycloak logout endpoint
    const keycloakLogoutUrl =
      "http://localhost:8181/realms/fitness-oauth2/protocol/openid-connect/logout";
    const redirectUri = encodeURIComponent("http://localhost:5173/");
    const logoutUrl = `${keycloakLogoutUrl}?redirect_uri=${redirectUri}`;

    // 3. Redirect to Keycloak logout (then back to app)
    window.location.href = logoutUrl;
  };

  return (
    <Router>
      {!token ? (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:8181/realms/fitness-oauth2/protocol/openid-connect/auth?client_id=oauth2-pkce-client&redirect_uri=http://localhost:5173/&scope=openid%20profile%20email%20offline_access&response_type=code")
            }
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded shadow-md transition"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-start bg-gray-100 dark:bg-gray-900 py-10 px-4">
          <div className="w-full max-w-5xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg p-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded transition"
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
