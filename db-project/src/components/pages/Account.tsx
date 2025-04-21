import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { API_WITH_PORT } from "../../utility/environment";
import { useEffect, useState } from "react";
import { OrderRecord } from "../../utility/interfaces";

export default function Account({
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
  const [orderData, setOrderData] = useState<OrderRecord[]>([]);

  const fillInfo = async () => {
    await fetch(`${API_WITH_PORT}/orders/${curUser?.email}`, {
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

  return (
    <>
      <Typography
        component="div"
        variant="h1"
        sx={{ bgcolor: "#202020", paddingLeft: "2%", marginBottom: "2%" }}
      >
        Account
      </Typography>
      <div style={{ marginLeft: "2%" }}>
        <Typography component="div" variant="h4">
          Your Orders
        </Typography>
        {orderData && Object.keys(orderData).length ? (
          <Table>
            <TableHead style={{ fontWeight: "bold" }}>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Purchaser</TableCell>
                <TableCell>Products</TableCell>
              </TableRow>
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
      </div>
    </>
  );
}
