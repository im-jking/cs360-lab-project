import Header from "../Header";
import { ListingItem } from "../../utility/interfaces";
import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import "../../App.css";

export default function Products() {
  const [products, setProducts] = useState<ListingItem[]>([]);

  //Arbitrary products, can be edited and added to as needed
  //Begin products -----------------------------------------

  const obj1: ListingItem = {
    name: "Bicycle",
    price: 120,
    imageURL: "bike.jpg",
    description:
      "A bicycle, also called a pedal cycle, bike, push-bike or cycle, is a human-powered or motor-assisted, pedal-driven, single-track vehicle, with two wheels attached to a frame, one behind the other. A bicycle rider is called a cyclist, or bicyclist.",
    id: 0,
  };
  const obj2: ListingItem = {
    name: "Ford F150",
    price: 84000,
    imageURL: "truck.jpg",
    description:
      "The Ford F-Series is a series of light-duty trucks marketed and manufactured by Ford Motor Company since the 1948 model year.",
    id: 1,
  };
  const obj3: ListingItem = {
    name: "Pogo Stick",
    price: 18,
    imageURL: "pogo.jpg",
    description:
      "A pogo stick is a vehicle for jumping off the ground in a standing position—through the aid of a spring, or new high performance technologies—often used as a toy, exercise equipment or extreme sports instrument.",
    id: 2,
  };
  const obj4: ListingItem = {
    name: "Shoe",
    price: 55,
    imageURL: "shoe.jpg",
    description:
      "A shoe is an item of footwear intended to protect and comfort the human foot. Though the human foot can adapt to varied terrains and climate conditions, it is vulnerable, and shoes provide protection.",
    id: 3,
  };
  const obj5: ListingItem = {
    name: "Jet",
    price: 300000000,
    imageURL: "jet.jpg",
    description:
      "A business jet, private jet, or bizjet is a jet aircraft designed for transporting small groups of people, typically business executives and high-ranking associates. Business jets are generally designed for faster air travel and more personal comfort than commercial aircraft, and may be adapted for other roles, such as casualty evacuation or express parcel deliveries, and some are used by public bodies, government officials, VIPs, or even the military.",
    id: 4,
  };

  useEffect(() => {
    setProducts([obj1, obj2, obj3, obj4, obj5]);
  }, []);
  //End products -------------------------------------------

  return (
    <>
      <Header />
      <h1>Products</h1>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ justifyContent: "center" }}
      >
        {products.map((product) => (
          <Card sx={{ maxWidth: "40%" }} key={product.id}>
            <CardActionArea>
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
          </Card>
        ))}
      </Grid2>
    </>
  );
}
