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

export default function Register({
  registerOpen,
  setRegisterOpen,
  regInfo,
  setRegInfo,
}: {
  registerOpen: boolean;
  setRegisterOpen: React.Dispatch<SetStateAction<boolean>>;
  regInfo: { username: string; password: string; confPass: string };
  setRegInfo: React.Dispatch<
    SetStateAction<{ username: string; password: string; confPass: string }>
  >;
}) {
  const handleRegSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //Check if login info is empty
    if (
      regInfo.username !== "" &&
      regInfo.password !== "" &&
      regInfo.confPass == regInfo.password
    ) {
      //Dispatch action here - FILL WITH BACKEND/DATABASE INTERACTIONS
      await fetch(`${API_WITH_PORT}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: regInfo.username,
          password: regInfo.password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response["message"] == "User created") {
            // setIsLoggedIn(true);
            setRegisterOpen(false);
          }
        })
        .catch((error) => console.error(error));

      console.log(
        "Register user " +
          regInfo.username +
          " with password " +
          regInfo.password
      );
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
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
        <br />
        <FormControl sx={{ width: "100%", marginBottom: "5%" }}>
          <InputLabel>Confirm Password</InputLabel>
          <Input
            type="password"
            id="confPass"
            name="confPass"
            onChange={handleInput}
          />
        </FormControl>
        <Button onClick={handleRegSubmit}>Submit</Button>
      </Box>
    </Modal>
  );
}
