import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Outlet } from "react-router-dom";
import Sidenav from "examples/Sidenav";
import { useArgonController, setMiniSidenav } from "context";
import { useState } from "react";
import { routes } from "routes";
import waygoPng from "assets/images/waygo.png";
import { Box } from "@mui/material";

function Default() {
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const [controller, dispatch] = useArgonController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    darkSidenav,
    darkMode,
  } = controller;

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  return (
    <>
      <DashboardLayout>
        <Sidenav
          color={sidenavColor}
          brand={waygoPng}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <DashboardNavbar />
        <Box height="calc(100%-100px)">
          <Outlet />
        </Box>
      </DashboardLayout>
    </>
  );
}

export default Default;
