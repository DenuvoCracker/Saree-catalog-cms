import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { getProductById, getRelatedProducts } from "../services/productService.js";
import ProductGallery from "../components/product/ProductGallery.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import Badge from "../components/ui/Badge.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";
import { buildWhatsAppLink } from "../utils/whatsapp.js";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getProductById(id)
      .then(async (data) => {
        if (!active) return;
        setProduct(data);
        document.title = `${data.name} | India Weaves`;
        const relatedData = await getRelatedProducts(data.category, data.id);
        if (active) setRelated(relatedData);
      })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  if (loading) return <Spinner label="Loading saree details…" />;

  if (error || !product) {
    return (
      <EmptyState
        title="Saree not found"
        description="This product may have been removed. Browse the rest of our catalog instead."
        action={<Link to="/catalog" className="btn-primary">Back to Catalog</Link>}
      />
    );
  }

  const soldOut = product.stock_status === "sold_out";
  const hasDiscount =
    product.original_price &&
    Number(product.original_price) > Number(product.price);

  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(product.original_price) - Number(product.price)) /
          Number(product.original_price)) *
          100
      )
    : 0;

  return (
    <section className="section">
      <div className="container-boutique grid lg:grid-cols-2 gap-12">
        <ProductGallery images={product.image_urls} name={product.name} />

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.new_arrival && <Badge variant="new">New Arrival</Badge>}
            {product.trending && <Badge variant="trending">Trending</Badge>}
            {product.featured && <Badge variant="bestseller">Best Seller</Badge>}
            <Badge variant={soldOut ? "soldOut" : "inStock"}>{soldOut ? "Sold Out" : "In Stock"}</Badge>
          </div>

          <p className="text-xs uppercase tracking-wider text-gold-dark font-body mb-1">{product.category}</p>
          <h1 className="text-3xl sm:text-4xl mb-3">{product.name}</h1>
          <div className="mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-body font-bold text-ink">
                {formatCurrency(product.price)}
              </span>

              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatCurrency(product.original_price)}
                  </span>

                  <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
          </div>
          <p className="text-ink/70 font-body leading-relaxed mb-8">{product.description}</p>

          <a
            href={buildWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-sm font-body font-semibold
            text-base w-full sm:w-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <MessageCircle size={22} fill="white" />
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-boutique mt-20">
          <p className="zari-rule mb-4" />
          <h2 className="text-2xl sm:text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </section>
  );
}
