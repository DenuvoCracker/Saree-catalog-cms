import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CategoryChart({ categoryCounts }) {
  const data = Object.entries(categoryCounts).map(([category, count]) => ({ category, count }));

  return (
    <div className="card-boutique p-6">
      <h3 className="text-lg font-display text-maroon mb-4">Products per Category</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#5E0F1E1a" />
          <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontFamily: "Manrope, sans-serif", fontSize: 12 }} />
          <Bar dataKey="count" fill="#C7A339" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
