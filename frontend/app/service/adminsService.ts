import axios from "axios";

// const BASE_URL = "http://localhost:3000"; 

const BASE_URL = process.env.NEXT_PUBLIC_API_URL


export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/auth`);
  return res.data;
};

export const updateUserBlock = async (id: number, isBlocked: boolean) => {
  const res = await axios.patch(`${BASE_URL}/auth/block/${id}`, { isBlocked });
  return res.data;
};

export const getAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products/admin/all`);
  return res.data;
};

export const updateProductBan = async (id: number, isBanned: boolean) => {
  const res = await axios.patch(`${BASE_URL}/products/ban/${id}`, { isBanned });
  return res.data;
};

export const getAllOrders = async () => {
  const res = await axios.get(`${BASE_URL}/orders`);
  return res.data;
};

export const cancelOrder = async (id: number) => {
  const res = await axios.patch(`${BASE_URL}/orders/cancel/${id}`);
  return res.data;
};
