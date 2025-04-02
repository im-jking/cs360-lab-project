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
import { useState } from "react";
import { ListingItem, OrderRecord } from "../../utility/interfaces";
import { CloudUpload } from "@mui/icons-material";

export default function Dashboard() {
  const [prodFormData, setProdFormData] = useState<ListingItem | null>(null);

  const orderData = JSON.parse(localStorage.getItem("orders") as string);

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

  //Submit a new product; CHANGE FOR DB INTEGRATION
  const handleProductSubmit = () => {
    if (prodFormData) {
      prodFormData["id"] = 1;
      prodFormData["imageURL"] = "bike.jpg";
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
            <InputLabel htmlFor="nameInput">Name</InputLabel>
            <Input
              id="nameInput"
              name="name"
              placeholder="Name"
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
              name="inStock"
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
                onChange={(event) => console.log(event.target.files)}
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
