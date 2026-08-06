import { useProducts } from "../../hooks/useProducts.js";
import ProductGrid from "../product/ProductGrid.jsx";
import { Link } from "react-router-dom";

export default function FeaturedCollections() {
  const { products, loading, error } = useProducts({ sort: "newest" });
  const featured = products.slice(0, 8);

  return (
    <section className="section bg-cream">
      <div className="container-boutique">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="zari-rule mb-4" />
            <h2 className="text-3xl sm:text-4xl">Featured Collections</h2>
            <p className="text-ink/60 font-body mt-2">Our latest arrivals, chosen for the season.</p>
          </div>
          <Link to="/catalog" className="hidden sm:inline-block font-body text-sm text-maroon underline underline-offset-4 hover:text-gold-dark">
            View All Sarees
          </Link>
        </div>
        <ProductGrid products={featured} loading={loading} error={error} />
      </div>
    </section>
  );
}
