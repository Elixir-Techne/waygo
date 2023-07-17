import StatusReports from "pages/statusReports";
import { OngoingLots } from "pages/ongoingLots";
import HistoricalLots from "pages/historicalLots";
import Statistics from "pages/statistics";
import Technology from "pages/technology";
import DashboardLayout from "layouts/dashboard";
import { useRoutes } from "react-router-dom";

export const routes = [
  {
    element: <DashboardLayout />,
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const content = useRoutes(routes);
  return content;
};

export default index;
