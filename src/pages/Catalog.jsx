import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts.js";
import ProductFilters from "../components/product/ProductFilters.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";

export default function Catalog() {
  const [filters, setFilters] = useState({ search: "", category: "", sort: "newest" });
  const { products, loading, error } = useProducts(filters);

  useEffect(() => {
    document.title = "Saree Catalog | Meera Silks";
  }, []);

  return (
    <section className="section">
      <div className="container-boutique">
        <p className="zari-rule mb-4" />
        <h1 className="text-3xl sm:text-4xl mb-2">Our Collection</h1>
        <p className="text-ink/60 font-body mb-8">Browse the full catalog. Tap any saree to enquire on WhatsApp.</p>
        <ProductFilters filters={filters} onChange={setFilters} />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </section>
  );
}
