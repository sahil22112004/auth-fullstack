export const addToWishlist = async (wishlist: any) => {
  const res = await fetch(`http://localhost:3000/wishlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wishlist),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to add wishlist');
  return data;
};

export const removeFromWishlist = async (userId: any, productId: any) => {
  const res = await fetch(`http://localhost:3000/wishlist/${userId}/${productId}`, {
    method: 'DELETE'
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to remove wishlist');
  return data;
};

export const fetchwishlist = async (userId: any) => {
  const res = await fetch(`http://localhost:3000/wishlist/user/${userId}`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch wishlist');
  return data;
};

export const isInWishlist = async (userId: any, productId: any) => {
  const res = await fetch(`http://localhost:3000/wishlist/user/${userId}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Failed to check wishlist');

  return data.some((item: any) => item.productId === productId);
};
