import { useState, useEffect } from "react";

// react-router components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import Breadcrumbs from "examples/Breadcrumbs";

import PublicIcon from "@mui/icons-material/Public";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarDesktopMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Argon Dashboard 2 MUI context
import {
  useArgonController,
  setTransparentNavbar,
  setMiniSidenav,
} from "context";

// Images
import DarkModeSwitcher from "components/DarkModeSwitcher";
import { MenuItem, Stack } from "@mui/material";
import { setDarkSidenav } from "context";
import { setDarkMode } from "context";
import { getUser } from "utils/helper";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [controller, dispatch] = useArgonController();
  const { user, company } = getUser();

  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  const handleDarkMode = () => {
    setDarkSidenav(dispatch, !darkMode);
    setDarkMode(dispatch, !darkMode);
  };
  const handleGlobal = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <ArgonBox
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ArgonBox display="flex" flexDirection="row-reverse">
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={transparentNavbar ? light : false}
          />
          <Icon
            fontSize="medium"
            sx={
              (navbarDesktopMenu,
              { color: !darkMode ? "black" : "lightgray", marginRight: "1rem" })
            }
            onClick={handleMiniSidenav}
          >
            {!miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </ArgonBox>
        <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
          {isMini ? null : (
            <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>
              <ArgonTypography
                variant="button"
                fontWeight="medium"
                color={light && transparentNavbar ? "white" : "dark"}
                fontSize="1.3rem"
              >
                {user.username}
              </ArgonTypography>
              <ArgonTypography
                variant="button"
                fontWeight="medium"
                color={light && transparentNavbar ? "white" : "dark"}
                fontSize="1.3rem"
              >
                {company.name}
              </ArgonTypography>
              <ArgonTypography
                variant="button"
                fontWeight="medium"
                color={light && transparentNavbar ? "white" : "dark"}
              >
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleGlobal}
                >
                  <PublicIcon
                    fontSize="medium"
                    sx={{
                      fill: transparentNavbar ? "#fff" : "#344767",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    width: "6rem",
                    "& . hover": {
                      width: "10rem",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose} sx={{ width: "100%" }}>
                    EN
                  </MenuItem>
                  <MenuItem onClick={handleClose}>VI</MenuItem>
                </Menu>
              </ArgonTypography>
              <Stack direction="row" spacing={1} alignItems="center">
                <DarkModeSwitcher
                  checked={darkMode}
                  onChange={handleDarkMode}
                />
                <ArgonTypography
                  variant="button"
                  fontWeight="medium"
                  color={light && transparentNavbar ? "white" : "dark"}
                  fontSize="1rem"
                >
                  Dark Mode
                </ArgonTypography>
              </Stack>
            </ArgonBox>
          )}
        </Toolbar>
      </ArgonBox>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
