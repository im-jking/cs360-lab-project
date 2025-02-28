import { Typography } from "@mui/material";
import Header from "../Header";

export default function Account() {
  return (
    <>
      <Header />
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "2%" }}
      >
        Account
      </Typography>
      <p>
        Put account information here and options for changing username or
        password here.
      </p>
    </>
  );
}
