const BASE_URL = "http://localhost:3000";

export async function fetchProducts(
  offset: number,
  limit: number,
  productName?: string,
  category?: string
) {
  let url = `http://localhost:4000/products?offset=${offset}&limit=${limit}`

  if (productName) url += `&productName=${productName}`
  if (category) url += `&category=${category}`

  const res = await fetch(url)
  const data = await res.json()
  return data.products || []   
}


export async function fetchProductById(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return await res.json();
}

export async function addProduct(payload: any, token: string) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

export async function updateProduct(id: string, payload: any, token: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

export async function deleteProduct(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return await res.json();
}

export async function fetchSubcategories(categoryId: string) {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}/subcategories`);
  return await res.json();
}
