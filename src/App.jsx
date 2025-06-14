import { useContext, useEffect, useState } from "react";
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
import ActivityDetail from "./components/ActivityDetail"; // Uncomment if available

const ActivitiesPage = () => {
  return (
    <section className="p-4 border border-dashed border-gray-400 rounded-md">
      <ActivityForm onActivitiesAdded={() => window.location.reload()} />
      <ActivityList />
    </section>
  );
};

function App() {
  const { token, tokenData, logIn, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <div className="flex justify-center items-center h-screen">
          <button
  onClick={logIn}
  className="bg-pink-600 text-white font-semibold py-2 px-6 rounded hover:bg-pink-700 transition"
>
  Login
</button>

        </div>
      ) : (
        <section className="p-4 border border-dashed border-gray-400 rounded-md m-4">
           <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={token?<Navigate to = "/activities" replace /> : <div>Welcome pls login</div>}/>
          </Routes>
        </section>
      )}
    </Router>
  );
};

export default App;
