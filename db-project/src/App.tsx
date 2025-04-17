import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { StrictMode, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Products from "./components/pages/Products";
import Cart from "./components/pages/Cart";
import About from "./components/pages/About";
import Account from "./components/pages/Account";
import Logout from "./components/pages/Logout";
import Home from "./components/pages/Home";
import Header from "./components/Header";
import Dashboard from "./components/pages/Dashboard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [logInfo, setLogInfo] = useState({
    username: "",
    password: "",
  });
  const [regInfo, setRegInfo] = useState({
    username: "",
    password: "",
    confPass: "",
  });

  return (
    <>
      <BrowserRouter>
        <StrictMode>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              logInfo={logInfo}
              setLogInfo={setLogInfo}
              regInfo={regInfo}
              setRegInfo={setRegInfo}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="cart" element={<Cart />} />
              <Route path="about" element={<About />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="logout" element={<Logout />} />
            </Routes>
          </ThemeProvider>
        </StrictMode>
      </BrowserRouter>
    </>
  );
}
