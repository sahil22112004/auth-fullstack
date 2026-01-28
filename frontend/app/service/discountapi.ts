import axios from "axios";

// const BASE_URL = "http://localhost:3000";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const applyPromoCode = async (code: string) => {
  const res = await axios.get(`${BASE_URL}/discounts/${code}`);
  return res.data;  
};
