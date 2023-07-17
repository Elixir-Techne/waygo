import StatusReports from "pages/statusReports";
import { OngoingLots } from "pages/ongoingLots";
import HistoricalLots from "pages/historicalLots";
import Statistics from "pages/statistics";
import Technology from "pages/technology";
import DashboardLayout from "layouts/dashboard";
import { Navigate, useRoutes } from "react-router-dom";
import SignIn from "layouts/authentication/sign-in";

export const routes = (loggedIn = false) => [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    element: loggedIn ? (
      <DashboardLayout />
    ) : (
      <Navigate to={"/sign-in"} replace />
    ),
    path: "/",
    children: [
      {
        path: "/",
        element: <StatusReports />,
      },
      {
        path: "/ongoing-lots",
        element: <OngoingLots />,
      },
      {
        path: "/historical-lots",
        element: <HistoricalLots />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/technology",
        element: <Technology />,
      },
    ],
  },
];

const index = () => {
  const loggedIn =
    localStorage.getItem("refresh_token") ||
    localStorage.getItem("access_token")
      ? true
      : false;
  const appRoutes = routes(loggedIn);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const content = useRoutes(appRoutes);
  return content;
};

export default index;
