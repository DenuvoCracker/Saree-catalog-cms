import { useEffect } from "react";
import ProductForm from "../../components/admin/ProductForm.jsx";

export default function AddProduct() {
  useEffect(() => {
    document.title = "Add Product | Meera Silks";
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-8">Add New Saree</h1>
      <ProductForm />
    </div>
  );
}
