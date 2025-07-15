import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages for code splitting
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./Pages/Home"));

const routes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
];

export default routes;
