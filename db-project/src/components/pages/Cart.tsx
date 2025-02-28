import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import Header from "../Header";
import { ListingItem } from "../../utility/interfaces";
import { useEffect, useState } from "react";

export default function Cart() {
  const cartData = JSON.parse(localStorage.getItem("cart") as string);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    cartData.forEach((item: ListingItem) => {
      price += item.price;
    });
    setTotalPrice(price);
  });

  const handlePurchase = () => {};
  const handleRemove = () => {};

  return (
    <>
      <Header />
      <h1>Your Cart</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid2>
          {cartData ? (
            cartData.map((item: ListingItem) => (
              <Card
                sx={{ display: "flex", maxWidth: "100%", marginBottom: "3%" }}
                key={item.id}
              >
                <CardMedia
                  component="img"
                  sx={{
                    maxWidth: "50%",
                    maxHeight: "10em",
                    overflow: "hidden",
                  }}
                  image={"/src/assets/" + item.imageURL}
                  title={item.name}
                ></CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    // sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{item.name}</div>
                    <div style={{ color: "gold" }}>${item.price}</div>
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </Grid2>
        <div style={{}}>
          <Typography component="p">Total: ${totalPrice}</Typography>
          <Button onClick={handlePurchase}>Purchase</Button>
        </div>
      </div>
    </>
  );
}
