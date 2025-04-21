import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
} from "@mui/material";
import React, { SetStateAction } from "react";
import { API_WITH_PORT } from "../utility/environment";

export default function Login({
  loginOpen,
  logInfo,
  setLoginOpen,
  setIsLoggedIn,
  setLogInfo,
  setCurUser,
}: {
  loginOpen: boolean;
  setLoginOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  logInfo: { username: string; password: string };
  setLogInfo: React.Dispatch<
    React.SetStateAction<{ username: string; password: string }>
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
}) {
  const handleLoginSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //Check if login info is empty
    if (logInfo.username !== "" && logInfo.password !== "") {
      await fetch(`${API_WITH_PORT}/one_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: logInfo.username,
          password: logInfo.password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setIsLoggedIn(Object.keys(response).length > 0);
          setLoginOpen(Object.keys(response).length <= 0);
          console.log(response);
          if (Object.keys(response).length > 0) {
            console.log(
              "Log in as user " +
                response[0]["email"] +
                " with password " +
                response[0]["password"]
            );
            setCurUser(response[0]);
          } else {
            console.log("Login failed: user does not exist.");
          }
        });
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
