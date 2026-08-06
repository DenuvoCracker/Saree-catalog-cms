import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm.jsx";
import { getProductById } from "../../services/productService.js";
import Spinner from "../../components/ui/Spinner.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Edit Product | Meera Silks";
    getProductById(id)
      .then(setProduct)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner label="Loading product…" />;
  if (error || !product) return <EmptyState title="Product not found" description="It may have already been deleted." />;

  return (
    <div>
      <h1 className="text-3xl mb-8">Edit Saree</h1>
      <ProductForm product={product} />
    </div>
  );
}
