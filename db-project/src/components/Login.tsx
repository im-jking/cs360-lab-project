import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
} from "@mui/material";
import React, { SetStateAction, useState } from "react";

export default function Login({
  loginOpen,
  setLoginOpen,
  setIsLoggedIn,
}: {
  loginOpen: boolean;
  setLoginOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [logInfo, setLogInfo] = useState({
    username: "",
    password: "",
  });

  const handleLoginSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //Check if login info is empty
    if (logInfo.username !== "" && logInfo.password !== "") {
      //Dispatch action here - FILL WITH BACKEND/DATABASE INTERACTIONS
      setIsLoggedIn(true);
      setLoginOpen(false);
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
