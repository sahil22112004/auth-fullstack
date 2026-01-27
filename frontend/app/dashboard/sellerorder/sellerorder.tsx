"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchOrdersBySeller, updateOrderToShipped, updateOrderToDelivered, updateOrderToCancelled,} from "../../service/checkOutApi";
import { useSnackbar } from "notistack";
import "./sellerorder.css";
import { colors } from "@mui/material";

export default function SellerOrdersPage() {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadOrders() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await fetchOrdersBySeller(String(user.id));
      console.log(res)
      setOrders(res);
    } catch (err) {
      enqueueSnackbar("Failed to load seller orders", { variant: "error" });
    }
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, [user]);

  async function handleShip(id: string) {
    try {
      await updateOrderToShipped(id);
      enqueueSnackbar("Order marked as shipped", { variant: "success" });
      loadOrders();
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  }

  async function handleDeliver(id: string) {
    try {
      await updateOrderToDelivered(id);
      enqueueSnackbar("Order delivered successfully", { variant: "success" });
      loadOrders();
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  }

  async function handleCancel(id: string) {
    try {
      await updateOrderToCancelled(id);
      enqueueSnackbar("Order cancelled", { variant: "success" });
      loadOrders();
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  }

  if (!user || user?.role !== "seller") {
    return <p style={{ textAlign: "center" }}>Not authorized</p>;
  }

  return (
    <div className="seller-orders-wrapper">
      <h2>Seller Orders</h2>

      {loading && <p>Loading...</p>}

      {!loading && orders.length === 0 && (
        <p>No orders found for your products.</p>
      )}

      <div className="orders-list">
        {orders.map((order: any) => (
          <div className="order-card" key={order.id}>
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Status:</b> {order.status.toUpperCase()}</p>
            <p><b>Product:</b> {order.productname}</p>
            <p><b>Qty:</b> {order.quantity}</p>
            <p><b>Price:</b> ₹{order.price}</p>

            <p><b>Customer Address:</b></p>
            <p>{order.address_fullName}</p>
            <p>{order.address_street}, {order.address_city}</p>
            <p>{order.address_state} - {order.address_zipCode}</p>
            <p>{order.address_country}</p>
            <p><b>Phone:</b> {order.address_phonenumber}</p>

            <div className="order-actions">
              {order.status === "processing" && (
                <button className="ship-btn" onClick={() => handleShip(order.id)}>
                  Mark Shipped
                </button>
              )}

              {order.status === "shipped" && (
                <button className="deliver-btn" onClick={() => handleDeliver(order.id)}>
                  Mark Delivered
                </button>
              )}

              {(order.status !== "delivered" && order.status !== "cancelled") && (
                <button className="cancel-btn" onClick={() => handleCancel(order.id)}>
                  Cancel Order
                </button>
              )}
              {order.status === "cancelled" && 
              <h3 style={{ color: "red" }}>Order Cancelled</h3>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
