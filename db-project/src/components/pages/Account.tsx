import { Typography } from "@mui/material";

export default function Account() {
  return (
    <>
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
