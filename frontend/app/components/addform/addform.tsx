"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { enqueueSnackbar } from "notistack";


const productSchema = z.object({
  productName: z.string().min(3, "Name must be at least 3 chars"),
  price: z.number().min(1, "Price must be greater than 0"),
  description: z.string().min(5, "Description required"),
  photoUrl: z.string().url("Invalid image URL"),
  categoryId: z.string().min(1, "Select a category"),
  userId: z.string().min(1, "User ID required"), // Will be auto-filled later
});

type ProductFormData = z.infer<typeof productSchema>;



async function fetchCategories() {
  const res = await fetch("http://localhost:4000/category");
  if (!res.ok) throw new Error("Failed to load categories");
  return await res.json();
}

async function addProduct(data: ProductFormData) {
  const res = await fetch("http://localhost:4000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to add product");
  return await res.json();
}


export default function AddProduct() {
  const [categories, setCategories] = useState<any[]>([]);

  const { register, handleSubmit, setValue, formState: { errors }, reset } =
    useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
      defaultValues: { userId: "" }
    });

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));

  }, []);

  const onSubmit = async (data: ProductFormData) => {
    try {
      await addProduct(data);
      enqueueSnackbar("Product Added Successfully!", { variant: "success" });
      reset();
    } catch (err: any) {
      enqueueSnackbar(err.message || "Failed to add product", { variant: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2>Add Product</h2>

      <input placeholder="Product Name" {...register("productName")} />
      {errors.productName && <p style={styles.error}>{errors.productName.message}</p>}

      <input
        type="number"
        placeholder="Price"
        {...register("price", { valueAsNumber: true })}
      />
      {errors.price && <p style={styles.error}>{errors.price.message}</p>}

      <input placeholder="Photo URL" {...register("photoUrl")} />
      {errors.photoUrl && <p style={styles.error}>{errors.photoUrl.message}</p>}

      <textarea placeholder="Description" {...register("description")} />
      {errors.description && <p style={styles.error}>{errors.description.message}</p>}

      <select {...register("categoryId")}>
        <option value="">Select Category</option>
        {categories.map((c: any) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      {errors.categoryId && <p style={styles.error}>{errors.categoryId.message}</p>}

      <button type="submit">Add Product</button>
    </form>
  );
}

const styles = {
  form: {
    width: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "-8px"
  }
} as const;
