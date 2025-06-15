// src/App.js
import React, { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { setCredentials } from "./store/authSlice";
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
  const { token, tokenData, logIn, logOut } = useContext(AuthContext); // ✅ added logOut
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
          <button
            onClick={logIn}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded shadow-md transition"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-start bg-gray-100 dark:bg-gray-900 py-10 px-4">
          <div className="w-full max-w-5xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg p-6">
            {/* ✅ Logout button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={logOut}
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
