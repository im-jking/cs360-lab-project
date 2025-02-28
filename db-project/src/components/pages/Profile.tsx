import { Typography } from "@mui/material";
import Header from "../Header";

export default function Profile() {
  return (
    <>
      <Header />
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "2%" }}
      >
        Profile
      </Typography>
      <p>Show user, purchases, option to add things to the market?</p>
    </>
  );
}
