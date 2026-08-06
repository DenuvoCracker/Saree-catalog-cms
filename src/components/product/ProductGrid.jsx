import ProductCard from "./ProductCard.jsx";
import { ProductGridSkeleton } from "../ui/Skeleton.jsx";
import EmptyState from "../ui/EmptyState.jsx";

export default function ProductGrid({ products, loading, error }) {
  if (loading) return <ProductGridSkeleton />;

  if (error) {
    return (
      <EmptyState
        title="Couldn't load sarees"
        description="Something went wrong reaching our catalog. Please check your connection and try again."
      />
    );
  }

  if (!products?.length) {
    return (
      <EmptyState
        title="No sarees found"
        description="Try a different search term, category, or clear your filters."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
