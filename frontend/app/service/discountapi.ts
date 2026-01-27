import axios from "axios";

const API = "http://localhost:3000";

export const applyPromoCode = async (code: string) => {
  const res = await axios.get(`${API}/discounts/${code}`);
  return res.data;  
};
