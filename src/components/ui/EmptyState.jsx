// Friendly empty/error message component, reused for "no products", network errors, etc.
export default function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-16 px-4">
      <h3 className="text-2xl font-display text-maroon mb-2">{title}</h3>
      {description && <p className="text-ink/60 font-body max-w-md mx-auto mb-6">{description}</p>}
      {action}
    </div>
  );
}
