import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader.jsx";
import { CATEGORIES, STOCK_STATUS } from "../../constants/categories.js";
import { createProduct, updateProduct } from "../../services/productService.js";

// Shared by AddProduct and EditProduct pages — takes an optional `product` for edit mode
export default function ProductForm({ product }) {
  const isEdit = !!product;
  const navigate = useNavigate();
  const [images, setImages] = useState(product?.image_urls || []);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: product?.name || "",
      original_price: product?.original_price || "", 
      price: product?.price || "",
      description: product?.description || "",
      category: product?.category || CATEGORIES[0],
      stock_status: product?.stock_status || STOCK_STATUS.IN_STOCK,
      new_arrival: product?.new_arrival || false,
      trending: product?.trending || false,
      featured: product?.featured || false,
    },
  });

  async function onSubmit(formData) {
    if (!images.length) {
      toast.error("Please upload at least one product image");
      return;
    }
    if (
      formData.original_price &&
      Number(formData.original_price) < Number(formData.price)
    ) {
      toast.error(
        "Original price must be greater than or equal to selling price."
      );
      return;
    }
    setSaving(true);
    const payload = {
      ...formData,
      price: Number(formData.price),
      original_price: formData.original_price
        ? Number(formData.original_price)
        : null,
      image_urls: images,
    };
    try {
      if (isEdit) {
        await updateProduct(product.id, payload);
        toast.success("Product updated");
      } else {
        await createProduct(payload);
        toast.success("Product added");
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error("Couldn't save product. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl" noValidate>
      <ImageUploader images={images} onChange={setImages} />

      <div>
        <label htmlFor="name" className="block text-sm font-body mb-1.5">Saree Name</label>
        <input
          id="name"
          {...register("name", { required: "Product name is required" })}
          className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="original_price"
              className="block text-sm font-body mb-1.5"
            >
              Original Price (₹)
            </label>

            <input
              id="original_price"
              type="number"
              min="0"
              step="1"
              {...register("original_price", {
                min: {
                  value: 0,
                  message: "Price must be positive",
                },
              })}
              className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />

            {errors.original_price && (
              <p className="text-red-600 text-xs mt-1">
                {errors.original_price.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-body mb-1.5"
            >
              Selling Price (₹)
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="1"
              {...register("price", {
                required: "Selling price is required",
                min: {
                  value: 0,
                  message: "Price must be positive",
                },
              })}
              className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />

            {errors.price && (
              <p className="text-red-600 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-body mb-1.5">Category</label>
          <select
            id="category"
            {...register("category")}
            className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-body mb-1.5">Description</label>
        <textarea
          id="description"
          rows={4}
          {...register("description", { required: "Description is required" })}
          className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
        {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="stock_status" className="block text-sm font-body mb-1.5">Stock Status</label>
        <select
          id="stock_status"
          {...register("stock_status")}
          className="w-full sm:w-64 border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option value={STOCK_STATUS.IN_STOCK}>In Stock</option>
          <option value={STOCK_STATUS.SOLD_OUT}>Sold Out</option>
        </select>
      </div>

      <fieldset className="flex flex-wrap gap-6">
        <legend className="text-sm font-body mb-2 w-full">Badges</legend>
        <label className="flex items-center gap-2 font-body text-sm">
          <input type="checkbox" {...register("new_arrival")} className="accent-gold" /> New Arrival
        </label>
        <label className="flex items-center gap-2 font-body text-sm">
          <input type="checkbox" {...register("trending")} className="accent-gold" /> Trending
        </label>
        <label className="flex items-center gap-2 font-body text-sm">
          <input type="checkbox" {...register("featured")} className="accent-gold" /> Best Seller
        </label>
      </fieldset>

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
        {saving ? "Saving…" : isEdit ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
