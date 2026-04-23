import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts";
import HomePage from "../pages/home";
import AboutPage from "../pages/about";
import ProjectsPage from "../pages/projects";
import ProjectDetailPage from "../pages/projects/detail";
import LoginPage from "../pages/login";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/dashboard";
import AdminProjectList from "../pages/admin/projects";
import AdminProjectForm from "../pages/admin/projects/form";
import AdminAchievements from "../pages/admin/achievements";
import AdminProfile from "../pages/admin/profile";
import AdminTech from "../pages/admin/tech";
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
          { index: true, element: <AdminDashboard /> },
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
