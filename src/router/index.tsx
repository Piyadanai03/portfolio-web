import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import AboutPage from '../pages/about';
import ProjectsPage from '../pages/projects';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/home',
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
      }


    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}