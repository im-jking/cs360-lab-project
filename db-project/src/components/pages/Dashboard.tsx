import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ListingItem, OrderRecord } from "../../utility/interfaces";
import { CloudUpload } from "@mui/icons-material";
import { API_WITH_PORT } from "../../utility/environment";

const API_URL = "http://127.0.0.1:8000";

export default function Dashboard() {
  const [prodFormData, setProdFormData] = useState<ListingItem | null>(null);
  const [products, setProducts] = useState<ListingItem[]>([]);
  const [orderData, setOrderData] = useState<OrderRecord[]>([]);

  const fillInfo = async () => {
    await fetch(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setProducts(response))
      .catch((error) => console.error(`Error retrieving products: ${error}`));

    await fetch(`${API_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setOrderData(response))
      .catch((error) => console.error(`Error retrieving orders: ${error}`));
  };

  useEffect(() => {
    fillInfo();
  }, []);

  //Add items to the DB product table,
  const addProduct = async (product: ListingItem | null) => {
    // let prevProd = JSON.parse(localStorage.getItem("products") as string);
    let alreadyExists = false;

    if (products) {
      products.forEach((element: ListingItem) => {
        if (JSON.stringify(element) === JSON.stringify(product)) {
          alreadyExists = true;
          return;
        }
      });
      if (!alreadyExists) {
        console.log(JSON.stringify(product));
        // prevProd.push(product);
        await fetch(`${API_URL}/products`, {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => console.log(response))
          .then(() => setProdFormData(null))
          .catch((error) => console.error(error));
      }
    }

    // localStorage.setItem("products", JSON.stringify(prevProd));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProdFormData(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as ListingItem)
    );
  };

  //Submit a new product
  const handleProductSubmit = () => {
    if (prodFormData) {
      prodFormData["id"] = null;
      prodFormData["imageURL"] = prodFormData["imageURL"]
        ? prodFormData["imageURL"]
        : "default.jpg";
      addProduct(prodFormData);
    } else {
      console.error("Product form not filled");
    }
  };

  //Component for file upload
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  //Function for file upload
  const addImage = async (file: File | null) => {
    if (file === null) {
      return;
    }
    //Add the imageURL to the data
    setProdFormData(
      (prev) => ({ ...prev, imageURL: file.name } as ListingItem)
    );
    //Create the file in the project folder
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`${API_WITH_PORT}/add_image`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "2%" }}
      >
        Admin Dashboard
      </Typography>
      <div style={{ marginLeft: "2%" }}>
        <Typography component="div" variant="h4">
          Previous Purchases
        </Typography>
        {orderData && Object.keys(orderData).length ? (
          <Table>
            <TableHead style={{ fontWeight: "bold" }}>
              <TableCell>Order ID</TableCell>
              <TableCell>Purchaser</TableCell>
              <TableCell>Products</TableCell>
            </TableHead>
            <TableBody>
              {orderData.map((order: OrderRecord) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.purchaser_email}</TableCell>
                  <TableCell>{order.product_id.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography component="p">No Orders Found</Typography>
        )}
        <br />
        <Typography component="div" variant="h4">
          Add Products
        </Typography>
        {/* Form for product addition */}
        <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <FormControl>
            <InputLabel htmlFor="titleInput">Title</InputLabel>
            <Input
              id="titleInput"
              name="title"
              placeholder="Title"
              onChange={handleInput}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="priceInput">Price</InputLabel>
            <Input
              id="priceInput"
              name="price"
              placeholder="Price"
              onChange={handleInput}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="inStockInput">Number in Stock</InputLabel>
            <Input
              id="inStockInput"
              name="in_stock"
              placeholder="Number in Stock"
              onChange={handleInput}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="titleInput">Description</InputLabel>
            <Input
              id="descInput"
              name="description"
              placeholder="Description"
              onChange={handleInput}
            />
          </FormControl>
          <FormControl>
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) =>
                  addImage(event.target.files ? event.target.files[0] : null)
                }
              />
            </Button>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            onClick={handleProductSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
