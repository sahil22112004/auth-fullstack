"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchOrdersByUser } from "../../service/checkOutApi";
import "./trackorder.css";

import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Chip,
  Typography,
  Paper,
} from "@mui/material";

export default function TrackOrderPage() {
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) loadOrders();
  }, [user]);

  async function loadOrders() {
    try {
      const data = await fetchOrdersByUser(String(user?.id));
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <h3 className="loading">Loading orders...</h3>;

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>No Orders Found</h2>
        <p>You haven't placed any orders yet.</p>
      </div>
    );
  }

  const getStepIndex = (status: string) => {
    switch (status) {
      case "processing":
        return 0;
      case "shipped":
        return 1;
      case "delivered":
        return 2;
      default:
        return 0;
    }
  };

  return (
    <div className="track-wrapper">
      <h2 className="track-title">My Orders</h2>

      <div className="order-list">
        {orders.map((order, index) => (
          <Paper elevation={2} className="order-card" key={index}>
            {order.status !== "cancelled" ? (
              <Box sx={{ mb: 1 }}>
                <Stepper
                  activeStep={getStepIndex(order.status)}
                  alternativeLabel
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": { color: "#1976d2" },
                    "& .MuiStepLabel-root .Mui-active": { color: "#1976d2" },
                  }}
                >
                  <Step><StepLabel>Ordered</StepLabel></Step>
                  <Step><StepLabel>Shipped</StepLabel></Step>
                  <Step><StepLabel>Delivered</StepLabel></Step>
                </Stepper>
              </Box>
            ) : (
              <Chip
                label="ORDER CANCELLED"
                color="error"
                sx={{ width: "fit-content", mb: 1, fontWeight: "bold" }}
              />
            )}

            <div className="order-body">
              <Typography><b>Product:</b> {order.productname}</Typography>
              <Typography><b>Quantity:</b> {order.quantity}</Typography>
              <Typography><b>Price:</b> ₹{order.price}</Typography>
              <Typography><b>Total:</b> ₹{order.totalamount}</Typography>
            </div>

            <div className="order-address">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Delivery Address
              </Typography>
              <Typography>{order.address_fullname}</Typography>
              <Typography>
                {order.address_city}, {order.address_state}, {order.address_country}
              </Typography>
              <Typography>{order.address_phonenumber}</Typography>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}
