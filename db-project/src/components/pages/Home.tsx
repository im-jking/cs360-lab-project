import { Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "2%" }}
      >
        Home Page
      </Typography>
      <Typography component="div" variant="h5" sx={{ marginLeft: "2%" }}>
        Here is a sleek overview of the site
      </Typography>
    </>
  );
}
