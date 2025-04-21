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
      <Typography
        component="p"
        sx={{ marginLeft: "2%", marginBottom: "1em", fontStyle: "italic" }}
      >
        This project was developed for the fulfillment of course requirements in
        the lab section of CS 360: Database Systems at the University of Idaho.
        <br />
        See more at https://github.com/im-jking/cs360-lab-project
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
