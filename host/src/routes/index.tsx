import type { RouteObject } from "react-router-dom";

// Local page components
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import ServiceLoader from "../pages/ServiceLoader";

// Define all routes
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/services/:id",
    element: <ServiceLoader />,
  },
];
