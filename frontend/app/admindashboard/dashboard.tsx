"use client";

import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserBlock,
  getAllProducts,
  updateProductBan,
  getAllOrders,
  cancelOrder,
} from "../service/adminsService";
import "./dashboard.css";
import { updateOrderToCancelled } from "../service/checkOutApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

export default function AdminDashboard() {
    const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [tab, setTab] = useState<"users" | "products" | "orders">("users");
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [tab]);

  async function loadData() {
    try {
      if (tab === "users") {
        const data = await getAllUsers();
        setUsers(data);
      }
      if (tab === "products") {
        const data = await getAllProducts();
        setProducts(data.products || data);
      }
      if (tab === "orders") {
        const data = await getAllOrders();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  }
  console.log(users)
  console.log(orders)
  

  const handleBlockUser = async (id: number, isBlocked: boolean) => {
    await updateUserBlock(id, !isBlocked);
    loadData();
  };

  const handleBanProduct = async (id: number, isBanned: boolean) => {
    await updateProductBan(id, !isBanned);
    loadData();
  };

    async function handleCancel(id: string) {
        try {
          await updateOrderToCancelled(id);
          loadData();
        } catch (err: any) {
            console.log(err)
                }
      }
      const handleLogout = () => {
          dispatch(logout())
          router.push("/auth/login")
        }

        return (
  <div className="admin-container">

    {/* HEADER */}
    <div className="admin-header">
      <h2>Welcome Admin</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>

    {/* SECTION TABS */}
    <div className="admin-tabs">
      <button className={tab === "users" ? "active" : ""} onClick={() => setTab("users")}>
        Users
      </button>
      <button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>
        Products
      </button>
      <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>
        Orders
      </button>
    </div>

    {/* REST IS SAME */}
    {tab === "users" && (
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className={u.isBlocked ? "unblock-btn" : "block-btn"}
                    onClick={() => handleBlockUser(u.id, u.isBlocked)}
                  >
                    {u.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {tab === "products" && (
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id}>
                <td>{p.productName}</td>
                <td>{p.price}</td>
                <td>
                  <button
                    className={p.isBanned ? "unblock-btn" : "block-btn"}
                    onClick={() => handleBanProduct(p.id, p.isBanned)}
                  >
                    {p.isBanned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {tab === "orders" && (
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o) => (
              <tr key={o.id}>
                <td>{o.productname}</td>
                <td>{o.userid}</td>
                <td>{o.totalamount}</td>
                <td>{o.status}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>
                  {o.status !== "delivered" && o.status !== "cancelled" && (
                    <button className="cancel-btn" onClick={() => handleCancel(o.id)}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

  </div>
);

}
