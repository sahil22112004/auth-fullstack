
// const BASE_URL = "http://localhost:3000";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;



export const addToWishlist = async (wishlist: any) => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wishlist),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to add wishlist');
  return data;
};

export const removeFromWishlist = async (userId: any, productId: any) => {
  const res = await fetch(`${BASE_URL}/wishlist/${userId}/${productId}`, {
    method: 'DELETE'
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to remove wishlist');
  return data;
};

export const fetchwishlist = async (userId: any) => {
  const res = await fetch(`${BASE_URL}/wishlist/user/${userId}`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch wishlist');
  return data;
};

export const isInWishlist = async (userId: any, productId: any) => {
  const res = await fetch(`${BASE_URL}/wishlist/user/${userId}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Failed to check wishlist');

  return data.some((item: any) => item.productId === productId);
};
