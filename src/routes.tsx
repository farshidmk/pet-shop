import { createBrowserRouter } from 'react-router';
import MainLayout from './layout/MainLayout';
// import AuthLayout from
import LoginPage from './pages/auth/login/LoginPage';
import AppLayout from './layout/AppLayout';
import ErrorPage from './layout/ErrorPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import SignUpPage from './pages/auth/signUp/SignUpPage';
import AuthLayout from './layout/AuthLayout';
import ProfilePage from './pages/profile/ProfilePage';

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            element: <LoginPage />,
            path: 'login',
          },
          {
            path: 'sign-up',
            element: <SignUpPage />,
          },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export default routes;
