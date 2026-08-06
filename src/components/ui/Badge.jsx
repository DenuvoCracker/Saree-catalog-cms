// Small pill labels used for product badges (New Arrival, Trending, Best Seller) and stock status
const VARIANTS = {
  new: "bg-gold/90 text-maroon-dark",
  trending: "bg-maroon text-cream",
  bestseller: "bg-ink text-cream",
  inStock: "bg-green-100 text-green-800 border border-green-300",
  soldOut: "bg-red-100 text-red-700 border border-red-300",
};

export default function Badge({ variant = "new", children }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-[11px] font-body font-semibold uppercase tracking-wider rounded-sm ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
