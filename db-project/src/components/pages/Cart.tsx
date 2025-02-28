import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid2,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import Header from "../Header";
import { ListingItem } from "../../utility/interfaces";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";

export default function Cart() {
  const cartData = JSON.parse(localStorage.getItem("cart") as string);
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseModal, setPurchaseModal] = useState(false);

  useEffect(() => {
    let price = 0;
    if (cartData) {
      cartData.forEach((item: ListingItem) => {
        price += item.price;
      });
    }
    setTotalPrice(price);
  }, [cartData]);

  const handlePurchase = () => {
    //Placeholder operation
    console.log("Purchased items: " + cartData + " for " + totalPrice);
    localStorage.removeItem("cart");
    setPurchaseModal(false);
  };

  const handleRemove = (id: number) => {
    if (cartData) {
      for (let i = 0; i < Object.keys(cartData).length; i++) {
        if (cartData[i].id === id) {
          //Remove the selected item from cart
          cartData.splice(i, 1);
          localStorage.setItem("cart", JSON.stringify(cartData));

          //Set new price
          let price = 0;
          if (cartData) {
            cartData.forEach((item: ListingItem) => {
              price += item.price;
            });
          }
          setTotalPrice(price);

          //Ensure only one copy of this item is deleted
          return;
        }
      }
    }
  };

  return (
    <>
      <Header />
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "2%" }}
      >
        Your Cart
      </Typography>
      <Grid2
        container
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid2 size={8} sx={{ marginLeft: "2%" }}>
          {cartData && Object.keys(cartData).length ? (
            cartData.map((item: ListingItem) => (
              <Card
                sx={{
                  display: "flex",
                  maxWidth: "100%",
                  marginBottom: "3%",
                  bgcolor: "#252525",
                }}
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
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    <div style={{ display: "flex" }}>
                      {item.name}
                      <Button
                        onClick={() => handleRemove(item.id)}
                        sx={{ alignSelf: "flex-start" }}
                      >
                        <DeleteOutline />
                      </Button>
                    </div>
                    <div style={{ color: "gold" }}>${item.price}</div>
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography component="div" variant="h5">
              No Items in Cart
            </Typography>
          )}
        </Grid2>
        <Grid2 size={3}>
          <Card
            sx={{
              marginRight: "3%",
              position: "relative",
              bottom: "0",
              textAlign: "right",
              verticalAlign: "bottom",
              bgcolor: "#252525",
            }}
          >
            <Typography component="div" variant="h5" sx={{ margin: "2%" }}>
              Total: ${totalPrice}
            </Typography>
            <Button
              onClick={() => setPurchaseModal(true)}
              disabled={!(cartData && Object.keys(cartData).length)}
              variant="contained"
              sx={{
                margin: "2%",
              }}
            >
              Purchase
            </Button>
          </Card>
        </Grid2>
      </Grid2>
      <Modal open={purchaseModal} onClose={() => setPurchaseModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid2 sx={{ marginLeft: "2%" }}>
            {cartData && Object.keys(cartData).length ? (
              cartData.map((item: ListingItem) => (
                <Card
                  sx={{
                    display: "flex",
                    maxWidth: "100%",
                    marginBottom: "3%",
                    bgcolor: "#252525",
                  }}
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
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      <div style={{ display: "flex" }}>{item.name}</div>
                      <div style={{ color: "gold" }}>${item.price}</div>
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography component="div" variant="h5">
                No Items in Cart
              </Typography>
            )}
          </Grid2>
          <div>
            {/* Form input div */}
            <FormControl sx={{ width: "100%", marginBottom: "5%" }}>
              <InputLabel htmlFor="purchaseInput">
                Purchase Input Placeholder
              </InputLabel>
              <Input
                id="purchaseInput"
                name="purchase"
                placeholder="Placeholder input"
                // onChange={handleInput}
              />
            </FormControl>
          </div>
          <Button
            disabled={!(cartData && Object.keys(cartData).length)}
            variant="contained"
            onClick={handlePurchase}
          >
            Confirm Purchase
          </Button>
        </Box>
      </Modal>
    </>
  );
}
