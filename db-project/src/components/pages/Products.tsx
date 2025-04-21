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
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import "../../App.css";
import { API_WITH_PORT, filterCats } from "../../utility/environment";

export default function Products() {
  const [products, setProducts] = useState<ListingItem[] | null>(null);
  const [openProduct, setOpenProduct] = useState<number | null>(null);
  const [search, setSearch] = useState<ListingItem[] | null>(null);

  const populateData = async () => {
    const prods: ListingItem[] = await fetch(`${API_WITH_PORT}/products`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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

    setProducts(updatedProds);
    return updatedProds;
  };

  // const productData = JSON.parse(localStorage.getItem("products") as string);
  useEffect(() => {
    populateData();
  }, []);

  //Add items to the cart, stored in browser's local storage
  const addCartItem = (product: ListingItem) => {
    let prevCart = JSON.parse(localStorage.getItem("cart") as string);
    if (prevCart) {
      //Ensure item is not already in cart
      prevCart.forEach((element: ListingItem) => {
        if (element["id"] == product.id) {
          return;
        }
      });
      prevCart.push(product);
    } else {
      prevCart = [product];
    }

    localStorage.setItem("cart", JSON.stringify(prevCart));
  };

  //Filter searched items
  const handleSearch = (searchTerm: string) => {
    if (searchTerm == "") {
      setSearch(null);
    } else {
      const newSearch: ListingItem[] = [];
      products?.forEach((product) => {
        if (product.title.includes(searchTerm)) {
          newSearch.push(product);
          // setSearch((prev) => ({ ...prev, product } as ListingItem[]));
        }
      });
      setSearch(newSearch);
    }
  };

  //Filter by category
  const handleCat = async (searchCat: string) => {
    const curProds = await populateData();

    if (searchCat !== "all") {
      const filteredProds: ListingItem[] = [];
      curProds?.forEach((product) => {
        if (product.category === searchCat) {
          filteredProds.push(product);
        }
      });
      setProducts(filteredProds);
    }
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
      <TextField
        id="search-field"
        label="Search"
        type="search"
        variant="filled"
        sx={{ marginBottom: "1.5em", marginLeft: "3em" }}
        onBlur={(e) => handleSearch(e.target.value)}
      />
      <TextField
        id="select-category"
        select
        label="Filter"
        defaultValue="all"
        helperText="Please select a filter category"
        variant="filled"
        sx={{ marginLeft: "1.5em" }}
        onBlur={(e) => handleCat(e.target.value)}
      >
        {filterCats.map((option) => (
          <MenuItem key={option.base_str} value={option.base_str}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      {search === null ? (
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ justifyContent: "center" }}
        >
          {products !== null && Object.keys(products).length > 0 ? (
            products.map((product: ListingItem) => (
              <Card sx={{ width: "30%" }} key={product.id}>
                <CardActionArea onClick={() => setOpenProduct(product.id)}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      maxHeight: "10em",
                      overflow: "hidden",
                    }}
                    image={product.imageURL}
                    title={product.title}
                  ></CardMedia>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <div>{product.title}</div>
                      <div style={{ color: "gold" }}>${product.price}</div>
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
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
                        image={product.imageURL}
                        title={product.title}
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
                          <div>{product.title}</div>
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
      ) : (
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ justifyContent: "center" }}
        >
          {Object.keys(search).length > 0 ? (
            search.map((product: ListingItem) => (
              <Card sx={{ width: "30%" }} key={product.id}>
                <CardActionArea onClick={() => setOpenProduct(product.id)}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      maxHeight: "10em",
                      overflow: "hidden",
                    }}
                    image={product.imageURL}
                    title={product.title}
                  ></CardMedia>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <div>{product.title}</div>
                      <div style={{ color: "gold" }}>${product.price}</div>
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
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
                        image={product.imageURL}
                        title={product.title}
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
                          <div>{product.title}</div>
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
              No Search Results Found
            </Typography>
          )}
        </Grid2>
      )}
    </>
  );
}
