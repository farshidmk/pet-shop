import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import WelcomePage from "./pages/welcome/WelcomePage";
import UserInfoPage from "./pages/userInfo/UserInfo";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/Login";
import AppLayout from "./layout/AppLayout";
import ErrorPage from "./layout/ErrorPage";
import CaptureImage from "./pages/capture/CaptureImage";
import AppRouteLayout from "./layout/AppRouteLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import SignUp from "./pages/login/SignUp";
import UserPlan from "./pages/userPlan/UserPlan";
import Profile from "./pages/profile/Profile";
import AppPlan from "./pages/appPlan/AppPlan";
import History from "./pages/history/History";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            element: <Login />,
            path: "login",
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
          {
            path: "welcome",
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
            path: "/user-info",
            element: <UserInfoPage />,
          },
          {
            path: "/user-plan",
            element: <UserPlan />,
          },
          {
            path: "/app",
            element: <AppRouteLayout />,
            children: [
              {
                index: true,
                element: <CaptureImage />,
              },
              {
                path: "/app/home",
                element: <CaptureImage />,
              },
              {
                path: "/app/profile",
                element: <Profile />,
              },
              {
                path: "/app/plan",
                element: <AppPlan />,
              },
              {
                path: "/app/history",
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
