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
      <p>Make this a sleek little introduction to the website.</p>
    </>
  );
}
