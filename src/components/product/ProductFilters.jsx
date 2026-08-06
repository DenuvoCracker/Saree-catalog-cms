import { Search } from "lucide-react";
import { CATEGORIES, SORT_OPTIONS } from "../../constants/categories.js";

export default function ProductFilters({ filters, onChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-maroon/40" size={18} />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search sarees by name…"
          aria-label="Search sarees"
          className="w-full pl-10 pr-4 py-3 border border-gold/30 rounded-sm bg-white font-body text-sm
          focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        aria-label="Filter by category"
        className="border border-gold/30 rounded-sm bg-white px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        aria-label="Sort products"
        className="border border-gold/30 rounded-sm bg-white px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
