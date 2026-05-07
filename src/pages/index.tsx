import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts";
import HomePage from "./home";
import AboutPage from "./about";
import ProjectsPage from "./projects";
import ProjectDetailPage from "./projects/detail";
import LoginPage from "./login";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "./admin/dashboard";
import AdminProjectList from "./admin/projects";
import AdminProjectForm from "./admin/projects/form";
import AdminAchievements from "./admin/achievements";
import AdminProfile from "./admin/profile";
import AdminTech from "./admin/tech";
import { ProtectedRoute } from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetailPage />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "projects", element: <AdminProjectList /> },
          { path: "projects/new", element: <AdminProjectForm /> },
          { path: "projects/edit/:id", element: <AdminProjectForm /> },
          { path: "achievements", element: <AdminAchievements /> },
          { path: "profile", element: <AdminProfile /> },
          { path: "tech", element: <AdminTech /> },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
