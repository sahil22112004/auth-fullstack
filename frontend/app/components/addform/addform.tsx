"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { enqueueSnackbar } from "notistack";
import "./addform.css";
import { useRouter } from "next/navigation";
import { addProduct, fetchCategories } from "../../service/productApi";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const productSchema = z.object({
    productName: z.string().min(3, "Name must be at least 3 chars"),
    price: z.number().min(1, "Price must be greater than 0"),
    description: z.string().min(5, "Description required"),
    photoUrl: z
      .any()
      .refine((files) => files instanceof FileList && files.length > 0, {
        message: "Photo required",
      })
      .optional(),
    categoryId: z.string().min(1, "Select a category"),
  });

  type ProductFormData = z.infer<typeof productSchema>;

  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const [categories, setCategories] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {},
  });

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  const onSubmit = async (product: ProductFormData) => {
    const formData = new FormData();
    const userId :any = currentUser?.id || "1";

    formData.append("userId", userId);
    formData.append("productName", product.productName);
    formData.append("price", String(product.price));
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);

    const files = product.photoUrl as unknown as FileList;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("photoUrl", file);
      });
    }
    console.log(formData)

    try {
      const response = await addProduct(formData);
      if (response.ok) {
        enqueueSnackbar("Product Added Successfully!", { variant: "success" });
        router.push("/dashboard");
        reset();
      } else {
        enqueueSnackbar("Failed to add product", { variant: "error" });
      }
    } catch (err: any) {
      enqueueSnackbar(err.message || "Failed to add product", {
        variant: "error",
      });
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Add Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          {...register("productName")}
        />
        {errors.productName && (
          <p className="error">{errors.productName.message}</p>
        )}

        <input
          type="number"
          placeholder="Price"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p className="error">{errors.price.message}</p>}

        <input type="file" accept="image/*" multiple {...register("photoUrl")} />
        {errors.photoUrl && (
          <p className="error">{errors.photoUrl.message as string}</p>
        )}

        <textarea placeholder="Description" {...register("description")} />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <select {...register("categoryId")}>
          <option value="">Select Category</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="error">{errors.categoryId.message}</p>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
