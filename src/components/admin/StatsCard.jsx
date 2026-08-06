export default function StatsCard({ label, value, icon: Icon, accent = "text-maroon" }) {
  return (
    <div className="card-boutique p-6 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-ink/50 font-body mb-1">{label}</p>
        <p className={`text-3xl font-display ${accent}`}>{value}</p>
      </div>
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
          <Icon className="text-gold-dark" size={22} />
        </div>
      )}
    </div>
  );
}
