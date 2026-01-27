import axios from "axios";

const API = "http://localhost:3000"; // backend URL

// USERS
export const getAllUsers = async () => {
  const res = await axios.get(`${API}/auth`);
  return res.data;
};

export const updateUserBlock = async (id: number, isBlocked: boolean) => {
  const res = await axios.patch(`${API}/auth/block/${id}`, { isBlocked });
  return res.data;
};

// PRODUCTS
export const getAllProducts = async () => {
  const res = await axios.get(`${API}/products/admin/all`);
  return res.data;
};

export const updateProductBan = async (id: number, isBanned: boolean) => {
  const res = await axios.patch(`${API}/products/ban/${id}`, { isBanned });
  return res.data;
};

// ORDERS
export const getAllOrders = async () => {
  const res = await axios.get(`${API}/orders`);
  return res.data;
};

export const cancelOrder = async (id: number) => {
  const res = await axios.patch(`${API}/orders/cancel/${id}`);
  return res.data;
};
