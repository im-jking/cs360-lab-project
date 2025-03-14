import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
} from "@mui/material";
import React, { SetStateAction } from "react";

export default function Login({
  loginOpen,
  logInfo,
  setLoginOpen,
  setIsLoggedIn,
  setLogInfo,
}: {
  loginOpen: boolean;
  setLoginOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  logInfo: { username: string; password: string };
  setLogInfo: React.Dispatch<
    React.SetStateAction<{ username: string; password: string }>
  >;
}) {
  const handleLoginSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //Check if login info is empty
    if (logInfo.username !== "" && logInfo.password !== "") {
      //Dispatch action here - FILL WITH BACKEND/DATABASE INTERACTIONS
      setIsLoggedIn(true);
      setLoginOpen(false);
      console.log(
        "Log in as user " +
          logInfo.username +
          " with password " +
          logInfo.password
      );
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <FormControl sx={{ width: "100%", marginBottom: "5%" }}>
          <InputLabel htmlFor="usernameInput">Username</InputLabel>
          <Input
            id="usernameInput"
            name="username"
            placeholder="Username"
            onChange={handleInput}
          />
        </FormControl>
        <br />
        <FormControl sx={{ width: "100%", marginBottom: "5%" }}>
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
          />
        </FormControl>
        <Button onClick={handleLoginSubmit}>Submit</Button>
      </Box>
    </Modal>
  );
}
