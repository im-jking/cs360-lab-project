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
      <Typography component="div" variant="h5" sx={{ marginLeft: "2%" }}>
        Here is a description of the site's functionality.
      </Typography>
      <Typography component="div" variant="h5" sx={{ marginLeft: "2%" }}>
        And here is an introduction to the team!
      </Typography>
    </>
  );
}
