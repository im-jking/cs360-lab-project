import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Modal,
  Typography,
} from "@mui/material";
import { ListingItem, OrderRecord } from "../../utility/interfaces";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const API_URL = "http://localhost:8000";

export default function Cart({
  curUser,
}: {
  curUser: {
    email: string;
    password: string;
    datetime_created: string;
    funds: number;
    is_admin: boolean;
  } | null;
}) {
  const cartData = JSON.parse(localStorage.getItem("cart") as string);
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseModal, setPurchaseModal] = useState(false);

  // const payPalOptions = {
  //   clientId: "test",
  //   currency: "USD",
  //   intent: "capture",
  // };

  useEffect(() => {
    let price = 0;
    if (cartData) {
      cartData.forEach((item: ListingItem) => {
        price += Number(item.price);
      });
    }
    setTotalPrice(price);
  }, [cartData]);

  const handlePurchase = async () => {
    console.log(cartData);

    //Add new order(s, since we need to store each item ordered)
    await Promise.all(
      cartData.map(async (element: ListingItem) => {
        const newOrd: OrderRecord = {
          order_id: null,
          purchaser_email: curUser ? curUser.email : "guest",
          product_id: element["id"] as number,
        };

        console.log(newOrd);

        await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrd),
        })
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      })
    );
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
                  image={item.imageURL}
                  title={item.title}
                ></CardMedia>
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    <div style={{ display: "flex" }}>
                      {item.title}
                      <Button
                        onClick={() => handleRemove(item.id as number)}
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
                    image={item.imageURL}
                    title={item.title}
                  ></CardMedia>
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      <div>{item.title}</div>
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
            <Typography>Total: ${totalPrice}</Typography>
            <br />
          </Grid2>
          {/* <PayPalScriptProvider options={payPalOptions}> */}
          <Button
            disabled={
              !(cartData && Object.keys(cartData).length && curUser !== null)
            }
            variant="contained"
            onClick={handlePurchase}
            sx={{ marginBottom: "1em" }}
          >
            Confirm Purchase
          </Button>
          {/* <PayPalButtons />
          </PayPalScriptProvider> */}
        </Box>
      </Modal>
    </>
  );
}
