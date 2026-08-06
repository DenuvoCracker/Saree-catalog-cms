import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, CheckCircle2, XCircle, LayoutGrid } from "lucide-react";
import { getDashboardStats, getProducts } from "../../services/productService.js";
import StatsCard from "../../components/admin/StatsCard.jsx";
import CategoryChart from "../../components/admin/CategoryChart.jsx";
import StockChart from "../../components/admin/StockChart.jsx";
import ProductCard from "../../components/product/ProductCard.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin Dashboard | India Weaves";
    Promise.all([getDashboardStats(), getProducts({ sort: "newest" })])
      .then(([statsData, products]) => {
        setStats(statsData);
        setRecent(products.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading dashboard…" />;

  return (
    <div>
      <h1 className="text-3xl mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatsCard label="Total Sarees" value={stats.totalSarees} icon={Package} />
        <StatsCard label="In Stock" value={stats.inStock} icon={CheckCircle2} accent="text-green-700" />
        <StatsCard label="Sold Out" value={stats.soldOut} icon={XCircle} accent="text-red-600" />
        <StatsCard label="Categories" value={stats.categories} icon={LayoutGrid} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        <CategoryChart categoryCounts={stats.categoryCounts} />
        <StockChart inStock={stats.inStock} soldOut={stats.soldOut} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Recent Products</h2>
        <Link to="/admin/products" className="text-sm font-body text-maroon underline underline-offset-4 hover:text-gold-dark">
          Manage All
        </Link>
      </div>
      {recent.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recent.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="font-body text-ink/60">No products yet — add your first saree to see it here.</p>
      )}
    </div>
  );
}
