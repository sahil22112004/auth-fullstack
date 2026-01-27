
export const addToWishlist = async (wishlist: any) => {
  console.log('working',wishlist)
  const res = await fetch('http://localhost:3000/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wishlist),
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'wishlist failed failed');
  return data;
};

export async function fetchonewishlist( id:any) {
  let url = `http://localhost:3000/wishlist/${id}`
  const res = await fetch(url)

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'wishlist failed to get');
  return data
}

export async function fetchwishlist( id:any) {
    console.log('working')
  let url = `http://localhost:3000/wishlist/user/${id}`
  const res = await fetch(url)

  const data = await res.json()
  console.log(data)
  if (!res.ok) throw new Error(data.message || 'wishlist failed to get');
  return data
}
