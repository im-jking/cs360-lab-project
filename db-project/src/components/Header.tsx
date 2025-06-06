//Drawn largely from https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router";
import Login from "./Login";
import Register from "./Register";

const pages = ["Products", "Cart", "About"];

export default function Header({
  isLoggedIn,
  setIsLoggedIn,
  logInfo,
  setLogInfo,
  regInfo,
  setRegInfo,
  setCurUser,
  curUser,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logInfo: { username: string; password: string };
  setLogInfo: React.Dispatch<
    React.SetStateAction<{ username: string; password: string }>
  >;
  regInfo: { username: string; password: string; confPass: string };
  setRegInfo: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
      confPass: string;
    }>
  >;
  setCurUser: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      datetime_created: string;
      funds: number;
      is_admin: boolean;
    } | null>
  >;
  curUser: {
    email: string;
    password: string;
    datetime_created: string;
    funds: number;
    is_admin: boolean;
  } | null;
}) {
  const settings = curUser?.is_admin ? ["Account", "Dashboard"] : ["Account"];

  const [loginOpen, setLoginOpen] = React.useState<boolean>(false);

  const [registerOpen, setRegisterOpen] = React.useState<boolean>(false);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            The Storefront
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography variant="button" sx={{ textAlign: "center" }}>
                    <NavLink
                      to={"/" + page}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        display: "block",
                      }}
                    >
                      {page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            The Storefront
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Typography
                key={page}
                variant="button"
                sx={{ textAlign: "center" }}
              >
                <NavLink
                  to={"/" + page}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    display: "block",
                    marginLeft: "2em",
                    marginRight: "2em",
                  }}
                >
                  {page}
                </NavLink>
              </Typography>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography variant="button" sx={{ textAlign: "center" }}>
                      <NavLink
                        to={"/" + setting}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          display: "block",
                        }}
                      >
                        {setting}
                      </NavLink>
                    </Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem key="Register" onClick={() => setRegisterOpen(true)}>
                  <Typography variant="button" sx={{ textAlign: "center" }}>
                    Register
                  </Typography>
                </MenuItem>
              )}
              <MenuItem
                key="Login"
                //Will need to edit the below with database interactions
                onClick={
                  isLoggedIn
                    ? () => {
                        setIsLoggedIn(false);
                        setCurUser(null);
                      }
                    : () => {
                        setLoginOpen(true);
                        handleCloseUserMenu();
                      }
                }
              >
                <Typography variant="button" sx={{ textAlign: "center" }}>
                  {isLoggedIn ? <>Logout</> : <>Login</>}
                </Typography>
              </MenuItem>
              <Login
                loginOpen={loginOpen}
                setLoginOpen={setLoginOpen}
                setIsLoggedIn={setIsLoggedIn}
                logInfo={logInfo}
                setLogInfo={setLogInfo}
                setCurUser={setCurUser}
              />
              <Register
                registerOpen={registerOpen}
                setRegisterOpen={setRegisterOpen}
                regInfo={regInfo}
                setRegInfo={setRegInfo}
              />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
