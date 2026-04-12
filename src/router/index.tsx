import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import AboutPage from '../pages/about';
import ProjectsPage from '../pages/projects';
import ProjectDetailPage from '../pages/projects/detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/admin/login',
        element: <LoginPage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/projects',
        element: <ProjectsPage />
      },
      {
        path: '/projects/:id',
        element: <ProjectDetailPage />
      }


    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}