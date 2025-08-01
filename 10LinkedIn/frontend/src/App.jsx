import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserContextProvider, { UserDataContext } from "./context/UserContext";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { useContext } from "react";

const AppRoutes = () => {
  let { userData } = useContext(UserDataContext);

  return (
    <Routes>
      <Route
        path="/signup"
        element={userData ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/"
        element={userData ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={userData ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <UserContextProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserContextProvider>
    </AuthProvider>
  );
};

export default App;
