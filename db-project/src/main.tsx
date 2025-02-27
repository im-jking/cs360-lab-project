import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App.tsx";
import Products from "./components/pages/Products.tsx";
import Cart from "./components/pages/Cart.tsx";
import About from "./components/pages/About.tsx";
import Profile from "./components/pages/Profile.tsx";
import Account from "./components/pages/Account.tsx";
import Logout from "./components/pages/Logout.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
