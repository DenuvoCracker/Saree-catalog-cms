import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useProducts } from "../../hooks/useProducts.js";
import ProductTable from "../../components/admin/ProductTable.jsx";
import ProductFilters from "../../components/product/ProductFilters.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";

export default function ProductsList() {
  const [filters, setFilters] = useState({ search: "", category: "", sort: "newest" });
  const { products, loading, error, refetch } = useProducts(filters);

  useEffect(() => {
    document.title = "Manage Products | Meera Silks";
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl">Manage Products</h1>
        <Link to="/admin/products/add" className="btn-primary">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <ProductFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <Spinner label="Loading products…" />
      ) : error ? (
        <EmptyState title="Couldn't load products" description="Please check your connection and try again." />
      ) : (
        <ProductTable products={products} onDeleted={refetch} />
      )}
    </div>
  );
}
