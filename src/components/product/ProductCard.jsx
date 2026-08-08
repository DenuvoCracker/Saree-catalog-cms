import { Link } from "react-router-dom";
import Badge from "../ui/Badge.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function ProductCard({ product }) {
  const { id, name, category, price, original_price, image_urls, stock_status, new_arrival, trending, featured } = product;
  const soldOut = stock_status === "sold_out";
  const hasDiscount = original_price && Number(original_price) > Number(price);
  const discountPercentage = hasDiscount
    ? Math.round(
      ((Number(original_price) - Number(price)) / Number(original_price)) * 100
      )
    : 0;

  return (
    <Link
      to={`/product/${id}`}
      className="card-boutique group block overflow-hidden animate-fadeUp"
      aria-label={`View details for ${name}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-maroon/5">
        <img
          src={image_urls?.[0]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {soldOut && (
          <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
            <span className="text-cream font-display text-lg tracking-wide">Sold Out</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {new_arrival && <Badge variant="new">New Arrival</Badge>}
          {trending && <Badge variant="trending">Trending</Badge>}
          {featured && <Badge variant="bestseller">Best Seller</Badge>}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-gold-dark font-body mb-1">{category}</p>
        <h3 className="font-display text-lg text-maroon leading-snug">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-body font-semibold text-ink text-lg">
                {formatCurrency(price)}
              </span>

              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {formatCurrency(original_price)}
                  </span>

                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          <Badge variant={soldOut ? "soldOut" : "inStock"}>
            {soldOut ? "Sold Out" : "In Stock"}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
