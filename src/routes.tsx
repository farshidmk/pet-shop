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
import PetsPage from './pages/profile/pets/PetsPage';
import CreatePetPage from './pages/profile/pets/CreatePetPage';
import LostPetPage from './pages/profile/pets/lost/LostPetPage';

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

            children: [
              {
                index: true,
                element: <ProfilePage />,
              },
              {
                path: 'pets',
                children: [
                  {
                    index: true,
                    element: <PetsPage />,
                  },
                  {
                    path: 'new',
                    element: <CreatePetPage />,
                  },
                  {
                    path: ':id',
                    children: [
                      {
                        path: 'lost',
                        element: <LostPetPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
