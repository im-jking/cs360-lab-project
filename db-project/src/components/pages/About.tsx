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
        The Team
      </Typography>
      <ul>
        <li>Enoch Myers - Backend</li>
        <li>Ian King - Frontend</li>
        <li>Shruti Debnath - Database</li>
      </ul>
    </>
  );
}
