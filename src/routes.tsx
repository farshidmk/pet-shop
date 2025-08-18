import { createBrowserRouter } from 'react-router';
import MainLayout from './layout/MainLayout';
import WelcomePage from './pages/welcome/WelcomePage';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/login/Login';
import AppLayout from './layout/AppLayout';
import ErrorPage from './layout/ErrorPage';
import AppRouteLayout from './layout/AppRouteLay';
import Dashboard from './pages/dashboard/Dashboard';
import SignUp from './pages/login/SignUp';

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
            element: <Login />,
            path: 'login',
          },
          {
            path: 'sign-up',
            element: <SignUp />,
          },
          {
            path: 'welcome',
            element: <WelcomePage />,
          },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: '/user-info',
            element: <UserInfoPage />,
          },
          {
            path: '/user-plan',
            element: <UserPlan />,
          },
          {
            path: '/app',
            element: <AppRouteLayout />,
            children: [
              {
                index: true,
                element: <CaptureImage />,
              },
              {
                path: '/app/home',
                element: <CaptureImage />,
              },
              {
                path: '/app/profile',
                element: <Profile />,
              },
              {
                path: '/app/plan',
                element: <AppPlan />,
              },
              {
                path: '/app/history',
                element: <History />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
