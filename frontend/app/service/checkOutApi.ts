// const BASE_URL = "http://localhost:3000";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function createAddress(addressData: any) {
  const res = await fetch(`${BASE_URL}/address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(addressData),
  });

  if (!res.ok) throw new Error("Failed to create address");
  return await res.json();
}

export async function fetchAddresses() {
  const res = await fetch(`${BASE_URL}/address`);
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return await res.json();
}

export async function fetchUserAddresses(userId: string) {
  const res = await fetch(`${BASE_URL}/address/user/${userId}`);
  if (!res.ok) return [];
  return await res.json();
}

export async function fetchAddressById(id: string) {
  const res = await fetch(`${BASE_URL}/address/${id}`);
  if (!res.ok) throw new Error("Failed to fetch address");
  return await res.json();
}

export async function updateAddress(id: string, addressData: any) {
  const res = await fetch(`${BASE_URL}/address/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(addressData),
  });

  if (!res.ok) throw new Error("Failed to update address");
  return await res.json();
}

export async function deleteAddress(id: string) {
  const res = await fetch(`${BASE_URL}/address/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete address");
  return await res.json();
}



export async function createOrder(orderList: any[]) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderList),
  });

  if (!res.ok) throw new Error("Failed to create order(s)");
  return await res.json();
}

export async function fetchAllOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return await res.json();
}

export async function fetchOrderById(id: string) {
  const res = await fetch(`${BASE_URL}/orders/${id}`);
  if (!res.ok) throw new Error("Failed to fetch order");
  return await res.json();
}

export async function fetchOrdersByUser(userId: string) {
  const res = await fetch(`${BASE_URL}/orders/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user orders");
  return await res.json();
}

export async function fetchOrdersBySeller(sellerId: string) {
  const res = await fetch(`${BASE_URL}/orders/seller/${sellerId}`);
  if (!res.ok) throw new Error("Failed to fetch seller orders");
  return await res.json();
}

export async function updateOrderToShipped(id: string) {
  const res = await fetch(`${BASE_URL}/orders/${id}/shipped`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to update order to shipped");
  return await res.json();
}

export async function updateOrderToDelivered(id: string) {
  const res = await fetch(`${BASE_URL}/orders/${id}/delivered`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to update order to delivered");
  return await res.json();
}

export async function updateOrderToCancelled(id: string) {
  const res = await fetch(`${BASE_URL}/orders/${id}/cancelled`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to cancel order");
  return await res.json();
}

export async function deleteOrder(id: string) {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete order");
  return await res.json();
}
