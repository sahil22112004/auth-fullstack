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

const productSchema = z.object({
  productName: z.string().min(3, "Name must be at least 3 chars"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(1, "Stock must be at least 1"),
  description: z.string().min(5, "Description required"),
  categoryId: z.string().min(1, "Select a category"),

  photoUrl: z
    .any()
    .refine((files) => files instanceof FileList, "Invalid file input")
    .refine((files) => files.length > 0, "At least 1 image required")
    .refine((files) => files.length <= 5, "Maximum 5 images allowed"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProduct() {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const [categories, setCategories] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const photoFiles = watch("photoUrl");

  useEffect(() => {
    if (photoFiles && photoFiles.length > 0) {
      const previews = Array.from(photoFiles as FileList).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(previews);
    } else {
      setPreviewImages([]);
    }
  }, [photoFiles]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  const onSubmit = async (product: ProductFormData) => {
    const formData = new FormData();
    const userId: any = currentUser?.id ?? "1";

    formData.append("userId", userId);
    formData.append("productName", product.productName);
    formData.append("price", String(product.price));
    formData.append("description", product.description);
    formData.append("stock", String(product.stock));
    formData.append("categoryId", product.categoryId);

    const files = product.photoUrl as FileList;

    Array.from(files).forEach((file: File) => {
      formData.append("photoUrl", file);
    });

    try {
      const response = await addProduct(formData);
      if (response.ok) {
        enqueueSnackbar("Product Added Successfully!", { variant: "success" });
        reset();
        setPreviewImages([]);
        router.push("/dashboard");
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

        <input
          type="number"
          placeholder="Stock"
          {...register("stock", { valueAsNumber: true })}
        />
        {errors.stock && <p className="error">{errors.stock.message}</p>}

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

        <input
          type="file"
          accept="image/*"
          multiple
          {...register("photoUrl")}
        />
        {errors.photoUrl && (
          <p className="error">{errors.photoUrl.message as string}</p>
        )}

        {previewImages.length > 0 && (
          <div className="preview-container">
            {previewImages.map((src, i) => (
              <img key={i} src={src} className="preview-img" />
            ))}
          </div>
        )}

        <button type="submit">Add Product</button>
        <button onClick={()=>router.push('/dashboard')}>Cancel</button>

      </form>
    </div>
  );
}
