"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchOrdersByUser } from "../../service/checkOutApi";
import "./trackorder.css";

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

  return (
    <div className="track-wrapper">
      <h2 className="track-title">My Orders</h2>

      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <span className={`status ${order.status}`}>{order.status.toUpperCase()}</span>
              {/* <span className="order-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </span> */}
            </div>

            <div className="order-body">
              <p><b>Product:</b> {order.productname}</p>
              <p><b>Quantity:</b> {order.quantity}</p>
              <p><b>Price:</b> ₹{order.price}</p>
              <p><b>Total:</b> ₹{order.totalamount}</p>
            </div>

            <div className="order-address">
              <h4>Delivery Address</h4>
              <p>{order.address_fullname}</p>
              <p>
                {order.address_city}, {order.address_state}, {order.address_country}
              </p>
              <p>{order.address_phonenumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
