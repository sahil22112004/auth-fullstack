export async function fetchProducts(
  offset: number,
  limit: number,
  productName?: string,
  category?: string
) {
  let url = `http://localhost:3000/products?offset=${offset}&limit=${limit}`

  if (productName) url += `&productName=${productName}`
  if (category) url += `&categoryId=${category}`

  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  return data.products || []   
}


export async function fetchProductById(id: string) {
  const res = await fetch(`http://localhost:3000/products/${id}`);
  return await res.json();
}

export async function addProduct(product: any) {
  const res = await fetch(`http://localhost:3000/products`, {
    method: "POST",
    body: product
  });

  return res;
}

export async function updateProduct(id: string, product: any) {
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product)
  });
  return await res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function fetchCategories() {
  const res = await fetch("http://localhost:3000/category");
  if (!res.ok) throw new Error("Failed to load categories");
  return await res.json();
}

