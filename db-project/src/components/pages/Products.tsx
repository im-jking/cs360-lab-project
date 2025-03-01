import { ListingItem } from "../../utility/interfaces";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Modal,
  Typography,
} from "@mui/material";
import "../../App.css";

export default function Products() {
  const [products, setProducts] = useState<ListingItem[] | null>(null);
  const [openProduct, setOpenProduct] = useState<number | null>(null);

  const productData = JSON.parse(localStorage.getItem("products") as string);

  //Arbitrary products, can be edited and added to as needed
  //Begin products -----------------------------------------

  //Add items to the product, stored in browser's local storage; should use DB eventually
  const addProduct = (product: ListingItem | null) => {
    let prevProd = JSON.parse(localStorage.getItem("products") as string);
    let alreadyExists = false;

    if (prevProd) {
      prevProd.forEach((element: ListingItem) => {
        if (JSON.stringify(element) === JSON.stringify(product)) {
          alreadyExists = true;
          return;
        }
      });
      if (!alreadyExists) {
        prevProd.push(product);
      }
    } else {
      prevProd = [product];
    }

    localStorage.setItem("products", JSON.stringify(prevProd));
  };

  const obj1: ListingItem = {
    name: "Bicycle",
    price: 120,
    imageURL: "bike.jpg",
    description:
      "A bicycle, also called a pedal cycle, bike, push-bike or cycle, is a human-powered or motor-assisted, pedal-driven, single-track vehicle, with two wheels attached to a frame, one behind the other. A bicycle rider is called a cyclist, or bicyclist.",
    id: 0,
    in_stock: 100,
  };
  const obj2: ListingItem = {
    name: "Ford F150",
    price: 84000,
    imageURL: "truck.jpg",
    description:
      "The Ford F-Series is a series of light-duty trucks marketed and manufactured by Ford Motor Company since the 1948 model year.",
    id: 1,
    in_stock: 100,
  };
  const obj3: ListingItem = {
    name: "Pogo Stick",
    price: 18,
    imageURL: "pogo.jpg",
    description:
      "A pogo stick is a vehicle for jumping off the ground in a standing position—through the aid of a spring, or new high performance technologies—often used as a toy, exercise equipment or extreme sports instrument.",
    id: 2,
    in_stock: 100,
  };
  const obj4: ListingItem = {
    name: "Shoe",
    price: 55,
    imageURL: "shoe.jpg",
    description:
      "A shoe is an item of footwear intended to protect and comfort the human foot. Though the human foot can adapt to varied terrains and climate conditions, it is vulnerable, and shoes provide protection.",
    id: 3,
    in_stock: 100,
  };
  const obj5: ListingItem = {
    name: "Jet",
    price: 300000000,
    imageURL: "jet.jpg",
    description:
      "A business jet, private jet, or bizjet is a jet aircraft designed for transporting small groups of people, typically business executives and high-ranking associates. Business jets are generally designed for faster air travel and more personal comfort than commercial aircraft, and may be adapted for other roles, such as casualty evacuation or express parcel deliveries, and some are used by public bodies, government officials, VIPs, or even the military.",
    id: 4,
    in_stock: 100,
  };

  useEffect(() => {
    addProduct(obj1);
    addProduct(obj2);
    addProduct(obj3);
    addProduct(obj4);
    addProduct(obj5);
    setProducts([obj1, obj2, obj3, obj4, obj5]);
  }, []);
  //End products -------------------------------------------

  //Add items to the cart, stored in browser's local storage
  const addCartItem = (product: ListingItem) => {
    let prevCart = JSON.parse(localStorage.getItem("cart") as string);
    if (prevCart) {
      prevCart.push(product);
    } else {
      prevCart = [product];
    }
    // const newCart = prevCart ? prevCart.push(product) : [product];

    localStorage.setItem("cart", JSON.stringify(prevCart));
  };

  return (
    <>
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "2%" }}
      >
        Products
      </Typography>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ justifyContent: "center" }}
      >
        {productData && Object.keys(productData).length ? (
          // products.map((product) => (
          productData.map((product: ListingItem) => (
            <Card sx={{ maxWidth: "40%" }} key={product.id}>
              <CardActionArea onClick={() => setOpenProduct(product.id)}>
                <CardMedia
                  component="img"
                  sx={{ width: "100%", maxHeight: "10em", overflow: "hidden" }}
                  image={"/src/assets/" + product.imageURL}
                  title={product.name}
                ></CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{product.name}</div>
                    <div style={{ color: "gold" }}>${product.price}</div>
                  </Typography>

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Modal
                open={openProduct === product.id}
                onClose={() => setOpenProduct(null)}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Card key={product.id}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        maxHeight: "70vh",
                        overflow: "hidden",
                      }}
                      image={"/src/assets/" + product.imageURL}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>{product.name}</div>
                        <div style={{ color: "gold" }}>${product.price}</div>
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => addCartItem(product)}>
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Modal>
            </Card>
          ))
        ) : (
          <Typography component="div" variant="h5">
            No Products Found
          </Typography>
        )}
      </Grid2>
    </>
  );
}
