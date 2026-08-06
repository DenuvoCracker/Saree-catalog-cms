import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="font-display text-7xl text-gold mb-2">404</p>
      <h1 className="text-2xl sm:text-3xl mb-3">Page Not Found</h1>
      <p className="text-ink/60 font-body mb-6 max-w-md">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
