import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#2f7d3f", "#b91c1c"];

export default function StockChart({ inStock, soldOut }) {
  const data = [
    { name: "In Stock", value: inStock },
    { name: "Sold Out", value: soldOut },
  ];

  return (
    <div className="card-boutique p-6">
      <h3 className="text-lg font-display text-maroon mb-4">Stock Availability</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip contentStyle={{ fontFamily: "Manrope, sans-serif", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontFamily: "Manrope, sans-serif", fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
