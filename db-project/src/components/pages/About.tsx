import { Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "2%" }}
      >
        About
      </Typography>
      <p>
        Talk about the team here, as well as website operations and whatnot.
      </p>
    </>
  );
}
