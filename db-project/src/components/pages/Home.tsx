import { Typography } from "@mui/material";
import { ListingItem } from "../../utility/interfaces";
import { API_WITH_PORT } from "../../utility/environment";
import { useEffect, useState } from "react";
import { Carousel } from "antd";

export default function Home() {
  const [products, setProducts] = useState<ListingItem[] | null>(null);

  const populateData = async () => {
    const prods: ListingItem[] = await fetch(`${API_WITH_PORT}/products`, {
      // headers: {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      // },
    })
      .then((response) => response.json())
      .catch((error) => console.error(`Error retrieving products: ${error}`));

    const updatedProds = await Promise.all(
      prods.map(async (element) => {
        await fetch(`${API_WITH_PORT}/get_image/${element.imageURL}`)
          .then((res) => res.blob())
          .then(
            (this_image) => (element.imageURL = URL.createObjectURL(this_image))
          )
          .catch((error) => console.error(error));

        return element as ListingItem;
      })
    );

    updatedProds.forEach((element) => {
      if (element.imageURL == "default.jpg") {
        const index = updatedProds.indexOf(element);
        updatedProds.splice(index, 1);
      }
    });

    setProducts(updatedProds);
    return updatedProds;
  };

  useEffect(() => {
    populateData();
  }, []);

  return (
    <>
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "1%" }}
      >
        Home Page
      </Typography>
      <Typography component="div" variant="h3" sx={{ marginLeft: "2%" }}>
        What We Offer
      </Typography>
      <Typography component="div" variant="h5" sx={{ marginLeft: "2%" }}>
        Buy our products, they're obscure and high-quality!
      </Typography>
      {products !== null && products.length > 0 ? (
        <Carousel
          autoplay
          arrows
          style={{
            left: "10%",
            width: "80%",
            backgroundColor: "#303030",
            paddingTop: "2%",
            paddingBottom: "2%",
          }}
        >
          {products.map((item) => (
            <div>
              <img
                src={item.imageURL}
                style={{
                  height: "300px",
                  color: "#fff",
                  lineHeight: "160px",
                  textAlign: "center",
                  background: "#364d79",
                  margin: "auto",
                }}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <></>
      )}
      <Typography component="div" variant="h3" sx={{ marginLeft: "2%" }}>
        Usage
      </Typography>
      <Typography component="div" variant="h5" sx={{ marginLeft: "2%" }}>
        Sign in, add Products, check out at your Cart - it's as simple as that!
        <br />
        View your orders in Account. Sign in to get started!
      </Typography>
    </>
  );
}
