export default function Spinner({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10" role="status" aria-live="polite">
      <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-maroon/70 font-body">{label}</p>
    </div>
  );
}
