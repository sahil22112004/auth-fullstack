// const BASE_URL = "http://localhost:3000";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchProducts(
  offset: number,
  limit: number,
  productName?: string,
  category?: string
) {
  let url = `${BASE_URL}/products?offset=${offset}&limit=${limit}`

  if (productName) url += `&productName=${productName}`
  if (category) url += `&categoryId=${category}`

  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  return data.products || []   
}

export async function fetchProductsforseller(
  id:number|string,
  offset: number,
  limit: number,
  productName?: string,
  category?: string
) {
  let url = `${BASE_URL}/products/seller?offset=${offset}&limit=${limit}&id=${id}`

  if (productName) url += `&productName=${productName}`
  if (category) url += `&categoryId=${category}`

  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  return data.products || []   
}


export async function fetchProductById(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return await res.json();
}

export async function addProduct(product: any) {
  console.log("product",...product)
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: product
  });

  return res;
}

export async function updateProduct(id: string, product: FormData) {
  console.log("apiid",id)
  console.log("product",product)

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    body: product,
  });
  return await res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/category`);
  if (!res.ok) throw new Error("Failed to load categories");
  return await res.json();
}

export async function getProductById(id: string | number) {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch product");
  }

  return await res.json();
}


